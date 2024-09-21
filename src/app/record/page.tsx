// // pages/index.tsx
// 'use client'
// import React, { useState, useRef, useEffect } from 'react';
// import { createClient, LiveTranscriptionEvents, LiveClient } from '@deepgram/sdk';

// const deepgramApiKey = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY;

// export default function Home() {
//   const [isRecording, setIsRecording] = useState(false);
//   const [transcript, setTranscript] = useState('');
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
//       console.log('Requesting microphone access...');
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       console.log('Microphone access granted.');
//       const mediaRecorder = new MediaRecorder(stream);
//       mediaRecorderRef.current = mediaRecorder;

//       const deepgram = createClient(deepgramApiKey!);
//       const deepgramLive = deepgram.listen.live({
//         model: 'nova-2',
//         punctuate: true,
//         language: 'en-US',
//       });
//       deepgramLiveRef.current = deepgramLive;

//       deepgramLive.addListener(LiveTranscriptionEvents.Open, () => {
//         console.log('Connection opened');
//       });

//       deepgramLive.addListener(LiveTranscriptionEvents.Transcript, (data) => {
//         const transcriptData = data.channel.alternatives[0];
//         if (transcriptData.transcript && data.is_final) {
//           setTranscript((prev) => prev + ' ' + transcriptData.transcript);
//         }
//       });

//       deepgramLive.addListener(LiveTranscriptionEvents.Error, (error) => {
//         console.error('Deepgram error:', error);
//       });

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0 && deepgramLive.getReadyState() === WebSocket.OPEN) {
//           deepgramLive.send(event.data);
//         }
//       };

//       mediaRecorder.start(250);
//       setIsRecording(true);
//       console.log('Recording started.');
//     } catch (error) {
//       console.error('Error accessing microphone:', error);
//     }
//   };

//   const stopRecording = () => {
//     try {
//       if (mediaRecorderRef.current) {
//         mediaRecorderRef.current.stop();
//         console.log('Recording stopped.');
//         setIsRecording(false);
//       }
//       if (deepgramLiveRef.current) {
//         deepgramLiveRef.current.requestClose();
//       }
//     } catch (error) {
//       console.error('Error stopping recording:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
//       <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-4">Real-time Audio Transcription</h1>
//         <button
//           onClick={isRecording ? stopRecording : startRecording}
//           className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
//             isRecording
//               ? 'bg-red-500 hover:bg-red-600'
//               : 'bg-blue-500 hover:bg-blue-600'
//           }`}
//         >
//           {isRecording ? 'Stop Recording' : 'Start Recording'}
//         </button>
//         {transcript && (
//           <div className="mt-4">
//             <h2 className="text-lg font-semibold mb-2">Transcript:</h2>
//             <p className="bg-gray-100 p-3 rounded-md">{transcript}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

'use client'
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { createClient, LiveTranscriptionEvents, LiveClient } from '@deepgram/sdk';

const deepgramApiKey = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY;
const chatgptApiKey = process.env.NEXT_PUBLIC_CHATGPT_API_KEY;

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
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
      console.log('Requesting microphone access...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Microphone access granted.');
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const deepgram = createClient(deepgramApiKey!);
      const deepgramLive = deepgram.listen.live({
        model: 'nova-2',
        punctuate: true,
        language: 'en-US',
      });
      deepgramLiveRef.current = deepgramLive;

      deepgramLive.addListener(LiveTranscriptionEvents.Open, () => {
        console.log('Connection opened');
      });

      deepgramLive.addListener(LiveTranscriptionEvents.Transcript, (data) => {
        const transcriptData = data.channel.alternatives[0];
        if (transcriptData.transcript && data.is_final) {
          setTranscript((prev) => prev + ' ' + transcriptData.transcript);
        }
      });

      deepgramLive.addListener(LiveTranscriptionEvents.Error, (error) => {
        console.error('Deepgram error:', error);
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0 && deepgramLive.getReadyState() === WebSocket.OPEN) {
          deepgramLive.send(event.data);
        }
      };

      mediaRecorder.start(250);
      setIsRecording(true);
      console.log('Recording started.');
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    try {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        console.log('Recording stopped.');
        setIsRecording(false);
      }
      if (deepgramLiveRef.current) {
        deepgramLiveRef.current.requestClose();
      }
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  const summarizeTranscript = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
          prompt: `Summarize the following text:\n\n${transcript}\n\nSummary:`,
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${chatgptApiKey}`,
          },
        }
      );

      const summaryText = response.data.choices[0].text.trim();
      setSummary(summaryText);
    } catch (error) {
      console.error('Error summarizing transcript:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Real-time Audio Transcription</h1>
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
            isRecording
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        {transcript && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Transcript:</h2>
            <p className="bg-gray-100 p-3 rounded-md">{transcript}</p>
          </div>
        )}
        <button
          onClick={summarizeTranscript}
          className="w-full py-2 px-4 rounded-md text-white font-semibold bg-green-500 hover:bg-green-600 mt-4"
        >
          Summarize Transcript
        </button>
        {summary && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Summary:</h2>
            <p className="bg-gray-100 p-3 rounded-md">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}