import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Click the link" },
      { name: "description", content: "Click the link." },
    ],
  }),
  component: Index,
});

function Index() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setPlaying(true);
    // wait a tick for video to mount
    requestAnimationFrame(async () => {
      const v = videoRef.current;
      if (!v) return;
      v.volume = 1;
      v.muted = false;
      try {
        if (v.requestFullscreen) await v.requestFullscreen();
        // @ts-expect-error webkit
        else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
      } catch {}
      try {
        await v.play();
      } catch {
        v.muted = true;
        await v.play();
        v.muted = false;
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      {!playing && (
        <a
          href="#"
          onClick={handleClick}
          className="text-2xl font-medium text-primary underline underline-offset-4 hover:opacity-80"
        >
          click here
        </a>
      )}
      {playing && (
        <video
          ref={videoRef}
          src="/distorted-cena.mp4"
          loop
          autoPlay
          playsInline
          className="h-screen w-screen object-contain bg-black"
        />
      )}
    </div>
  );
}
