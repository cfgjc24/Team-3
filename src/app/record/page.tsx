// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import {
//   createClient,
//   LiveTranscriptionEvents,
//   LiveClient,
// } from "@deepgram/sdk";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Mic, MicOff, FileText } from "lucide-react";
// import { Alert, AlertDescription } from "@/components/ui/alert";

// const deepgramApiKey = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY;
// const chatgptApiKey = process.env.NEXT_PUBLIC_CHATGPT_API_KEY;

// export default function Home() {
//   const [isRecording, setIsRecording] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const [summary, setSummary] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const deepgramLiveRef = useRef<LiveClient | null>(null);

//   useEffect(() => {
//     return () => {
//       if (deepgramLiveRef.current) {
//         deepgramLiveRef.current.requestClose();
//       }
//     };
//   }, []);

//   const startRecording = async () => {
//     try {
//       console.log("Requesting microphone access...");
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       console.log("Microphone access granted.");
//       const mediaRecorder = new MediaRecorder(stream);
//       mediaRecorderRef.current = mediaRecorder;

//       const deepgram = createClient(deepgramApiKey!);
//       const deepgramLive = deepgram.listen.live({
//         model: "nova-2",
//         punctuate: true,
//         language: "en-US",
//       });
//       deepgramLiveRef.current = deepgramLive;

//       deepgramLive.addListener(LiveTranscriptionEvents.Open, () => {
//         console.log("Connection opened");
//       });

//       deepgramLive.addListener(LiveTranscriptionEvents.Transcript, (data) => {
//         const transcriptData = data.channel.alternatives[0];
//         if (transcriptData.transcript && data.is_final) {
//           setTranscript((prev) => prev + " " + transcriptData.transcript);
//         }
//       });

//       deepgramLive.addListener(LiveTranscriptionEvents.Error, (error) => {
//         console.error("Deepgram error:", error);
//         setError("Error during transcription. Please try again.");
//       });

//       mediaRecorder.ondataavailable = (event) => {
//         if (
//           event.data.size > 0 &&
//           deepgramLive.getReadyState() === WebSocket.OPEN
//         ) {
//           deepgramLive.send(event.data);
//         }
//       };

//       mediaRecorder.start(250);
//       setIsRecording(true);
//       setError(null);
//       console.log("Recording started.");
//     } catch (error) {
//       console.error("Error accessing microphone:", error);
//       setError(
//         "Error accessing microphone. Please check your permissions and try again.",
//       );
//     }
//   };

//   const stopRecording = () => {
//     try {
//       if (mediaRecorderRef.current) {
//         mediaRecorderRef.current.stop();
//         console.log("Recording stopped.");
//         setIsRecording(false);
//       }
//       if (deepgramLiveRef.current) {
//         deepgramLiveRef.current.requestClose();
//       }
//     } catch (error) {
//       console.error("Error stopping recording:", error);
//       setError("Error stopping recording. Please try again.");
//     }
//   };

//   const summarizeTranscript = async () => {
//     try {
//       if (!transcript.trim()) {
//         setError("No transcript to summarize. Please record some audio first.");
//         return;
//       }

//       const response = await axios.post(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           model: "gpt-3.5-turbo",
//           messages: [
//             {
//               role: "system",
//               content: "You are a helpful assistant that summarizes text.",
//             },
//             {
//               role: "user",
//               content: `Summarize the following text:\n\n${transcript}`,
//             },
//           ],
//           max_tokens: 150,
//           temperature: 0.7,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${chatgptApiKey}`,
//           },
//         },
//       );

//       const summaryText = response.data.choices[0].message.content.trim();
//       setSummary(summaryText);
//       setError(null);
//     } catch (error) {
//       console.error("Error summarizing transcript:", error);
//       setError(
//         "Error generating summary. Please check your API key and try again.",
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background flex items-center justify-center p-4">
//       <Card className="w-full max-w-lg">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold">
//             Real-time Audio Transcription
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <Button
//             onClick={isRecording ? stopRecording : startRecording}
//             className="w-full"
//             variant={isRecording ? "destructive" : "default"}
//           >
//             {isRecording ? (
//               <>
//                 <MicOff className="mr-2 h-4 w-4" /> Stop Recording
//               </>
//             ) : (
//               <>
//                 <Mic className="mr-2 h-4 w-4" /> Start Recording
//               </>
//             )}
//           </Button>
//           {transcript && (
//             <div>
//               <h2 className="text-lg font-semibold mb-2">Transcript:</h2>
//               <ScrollArea className="h-[200px] w-full rounded-md border p-4">
//                 {transcript}
//               </ScrollArea>
//             </div>
//           )}
//           <Button
//             onClick={summarizeTranscript}
//             className="w-full"
//             variant="secondary"
//           >
//             <FileText className="mr-2 h-4 w-4" /> Summarize Transcript
//           </Button>
//           {summary && (
//             <div>
//               <h2 className="text-lg font-semibold mb-2">Summary:</h2>
//               <ScrollArea className="h-[100px] w-full rounded-md border p-4">
//                 {summary}
//               </ScrollArea>
//             </div>
//           )}
//           {error && (
//             <Alert variant="destructive">
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  createClient,
  LiveTranscriptionEvents,
  LiveClient,
} from "@deepgram/sdk";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, MicOff, FileText } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
 
const deepgramApiKey = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY;
const chatgptApiKey = process.env.NEXT_PUBLIC_CHATGPT_API_KEY;

// List of supported languages with their ISO codes
const supportedLanguages = [
  { name: "English", code: "en-US" },
  { name: "Spanish", code: "es" },
  { name: "French", code: "fr" },
  { name: "German", code: "de" },
  { name: "Italian", code: "it" },
  { name: "Portuguese", code: "pt" },
  { name: "Japanese", code: "ja" },
  { name: "Korean", code: "ko" },
  { name: "Mandarin Chinese", code: "zh" },
  { name: "Hindi", code: "hi" },
  // Add more languages as needed
];

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US"); // Default language
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
        model: "nova",
        punctuate: true,
        language: selectedLanguage, // Use the selected language
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
      setError(
        "Error accessing microphone. Please check your permissions and try again."
      );
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
              content: `Summarize the following text in ENGLISH:\n\n${transcript}`,
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
      setError(
        "Error generating summary. Please check your API key and try again."
      );
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
          {/* Language Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Language:
            </label>
            {/* <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              disabled={isRecording} // Disable changing language while recording
            > */}
                <Select value={selectedLanguage} disabled={isRecording} onValueChange={(value) => {setSelectedLanguage(value)}}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Language</SelectLabel>
                      {supportedLanguages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

 
            {/* </select> */}
          </div>

          {/* Start/Stop Recording Button */}
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

          {/* Transcript Display */}
          {transcript && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Transcript:</h2>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                {transcript}
              </ScrollArea>
            </div>
          )}

          {/* Summarize Button */}
          <Button
            onClick={summarizeTranscript}
            className="w-full"
            variant="secondary"
          >
            <FileText className="mr-2 h-4 w-4" /> Summarize Transcript
          </Button>

          {/* Summary Display */}
          {summary && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Summary:</h2>
              <ScrollArea className="h-[100px] w-full rounded-md border p-4">
                {summary}
              </ScrollArea>
            </div>
          )}

          {/* Error Alert */}
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
