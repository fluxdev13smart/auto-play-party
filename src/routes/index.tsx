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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const v = videoRef.current;
    if (!v) return;
    setPlaying(true);
    v.volume = 1;
    v.muted = false;
    v.loop = true;
    // Fire synchronously inside the user gesture
    const fsEl = v as HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
      webkitRequestFullscreen?: () => Promise<void>;
    };
    const fsPromise = fsEl.requestFullscreen?.() ?? fsEl.webkitRequestFullscreen?.();
    if (fsPromise && typeof fsPromise.catch === "function") fsPromise.catch(() => {});
    else fsEl.webkitEnterFullscreen?.();

    const p = v.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        v.muted = true;
        v.play().then(() => {
          v.muted = false;
        }).catch(() => {});
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <a
        href="#"
        onClick={handleClick}
        className={`text-2xl font-medium text-primary underline underline-offset-4 hover:opacity-80 ${playing ? "hidden" : ""}`}
      >
        click here
      </a>
      <video
        ref={videoRef}
        src="/distorted-cena.mp4"
        loop
        playsInline
        preload="auto"
        className={`bg-black ${playing ? "h-screen w-screen object-contain" : "hidden"}`}
      />
    </div>
  );
}
