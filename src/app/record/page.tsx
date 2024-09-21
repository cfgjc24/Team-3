"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  createClient,
  LiveTranscriptionEvents,
  LiveClient,
} from "@deepgram/sdk";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, MicOff, FileText } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const deepgramApiKey = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY;
const chatgptApiKey = process.env.NEXT_PUBLIC_CHATGPT_API_KEY;

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const deepgramLiveRef = useRef<LiveClient | null>(null);

  useEffect(() => {
    return () => {
      if (deepgramLiveRef.current) {
        deepgramLiveRef.current.requestClose();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      console.log("Requesting microphone access...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Microphone access granted.");
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const deepgram = createClient(deepgramApiKey!);
      const deepgramLive = deepgram.listen.live({
        model: "nova-2",
        punctuate: true,
        language: "en-US",
      });
      deepgramLiveRef.current = deepgramLive;

      deepgramLive.addListener(LiveTranscriptionEvents.Open, () => {
        console.log("Connection opened");
      });

      deepgramLive.addListener(LiveTranscriptionEvents.Transcript, (data) => {
        const transcriptData = data.channel.alternatives[0];
        if (transcriptData.transcript && data.is_final) {
          setTranscript((prev) => prev + " " + transcriptData.transcript);
        }
      });

      deepgramLive.addListener(LiveTranscriptionEvents.Error, (error) => {
        console.error("Deepgram error:", error);
        setError("Error during transcription. Please try again.");
      });

      mediaRecorder.ondataavailable = (event) => {
        if (
          event.data.size > 0 &&
          deepgramLive.getReadyState() === WebSocket.OPEN
        ) {
          deepgramLive.send(event.data);
        }
      };

      mediaRecorder.start(250);
      setIsRecording(true);
      setError(null);
      console.log("Recording started.");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setError("Error accessing microphone. Please check your permissions and try again.");
    }
  };

  const stopRecording = () => {
    try {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        console.log("Recording stopped.");
        setIsRecording(false);
      }
      if (deepgramLiveRef.current) {
        deepgramLiveRef.current.requestClose();
      }
    } catch (error) {
      console.error("Error stopping recording:", error);
      setError("Error stopping recording. Please try again.");
    }
  };

  const summarizeTranscript = async () => {
    try {
      if (!transcript.trim()) {
        setError("No transcript to summarize. Please record some audio first.");
        return;
      }

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that summarizes text.",
            },
            {
              role: "user",
              content: `Summarize the following text:\n\n${transcript}`,
            },
          ],
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${chatgptApiKey}`,
          },
        }
      );

      const summaryText = response.data.choices[0].message.content.trim();
      setSummary(summaryText);
      setError(null);
    } catch (error) {
      console.error("Error summarizing transcript:", error);
      setError("Error generating summary. Please check your API key and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Real-time Audio Transcription
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            className="w-full"
            variant={isRecording ? "destructive" : "default"}
          >
            {isRecording ? (
              <>
                <MicOff className="mr-2 h-4 w-4" /> Stop Recording
              </>
            ) : (
              <>
                <Mic className="mr-2 h-4 w-4" /> Start Recording
              </>
            )}
          </Button>
          {transcript && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Transcript:</h2>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                {transcript}
              </ScrollArea>
            </div>
          )}
          <Button
            onClick={summarizeTranscript}
            className="w-full"
            variant="secondary"
          >
            <FileText className="mr-2 h-4 w-4" /> Summarize Transcript
          </Button>
          {summary && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Summary:</h2>
              <ScrollArea className="h-[100px] w-full rounded-md border p-4">
                {summary}
              </ScrollArea>
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}