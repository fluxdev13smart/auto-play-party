import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: ":>" },
      { name: "description", content: ":>" },
      { property: "og:title", content: ":>" },
      { property: "og:description", content: ":>" },
    ],
  }),
  component: Index,
});

function Index() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const handleClick = () => {
    setStarted(true);
    requestAnimationFrame(() => {
      const v = videoRef.current;
      if (!v) return;
      v.loop = true;
      v.muted = false;
      v.volume = 1;
      v.play().catch(() => {});
    });
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      {!started && (
        <button
          onClick={handleClick}
          className="px-8 py-4 text-lg font-medium text-black rounded-md transition bg-black"
        >
          click here
        </button>
      )}
      {started && (
        <video
          ref={videoRef}
          src="/distorted-cena.mp4"
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
