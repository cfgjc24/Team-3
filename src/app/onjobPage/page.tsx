'use client'
import Image from "next/image";

export default function Home() {
  const handleRecordMeeting = () => {
    // Logic for starting to record the meeting
    console.log("Meeting recording started.");
  };

  const handleEmergencyAlert = () => {
    // Logic for sending an emergency alert
    console.log("Emergency alert sent!");
  };

  const handleEndSession = () => {
    // Logic for ending the session
    console.log("Session ended.");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <LocationComponent />
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div className="flex flex-col gap-4 items-center sm:items-start">
          <h1 className="text-xl font-bold">Childcare Volunteer Session</h1>

          <button
            onClick={handleRecordMeeting}
            className="rounded-full bg-blue-500 text-white hover:bg-blue-700 transition-colors text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Record Meeting
          </button>

          <button
            onClick={handleEmergencyAlert}
            className="rounded-full bg-red-500 text-white hover:bg-red-700 transition-colors text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Emergency Alert
          </button>

          <button
            onClick={handleEndSession}
            className="rounded-full bg-green-500 text-white hover:bg-green-700 transition-colors text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            End Session
          </button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
      </footer>
    </div>
  );
}
