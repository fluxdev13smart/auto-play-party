import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Distorted" },
      { name: "description", content: "." },
    ],
  }),
  component: Index,
});

function Index() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.loop = true;
    v.volume = 1;

    const tryUnmuted = async () => {
      v.muted = false;
      try {
        await v.play();
      } catch {
        // Browser blocked unmuted autoplay — start muted, unmute on first interaction
        v.muted = true;
        try {
          await v.play();
        } catch {
          /* ignore */
        }
        const unmute = () => {
          v.muted = false;
          v.volume = 1;
          v.play().catch(() => {});
          window.removeEventListener("pointerdown", unmute);
          window.removeEventListener("keydown", unmute);
          window.removeEventListener("touchstart", unmute);
        };
        window.addEventListener("pointerdown", unmute);
        window.addEventListener("keydown", unmute);
        window.addEventListener("touchstart", unmute);
      }
    };

    tryUnmuted();
  }, []);

  return (
    <div className="fixed inset-0 bg-black">
      <video
        ref={videoRef}
        src="/distorted-cena.mp4"
        autoPlay
        loop
        playsInline
        className="h-full w-full object-contain"
      />
    </div>
  );
}
