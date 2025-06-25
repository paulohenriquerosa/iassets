"use client";

import { useEffect, useRef } from "react";

interface ParticleBackgroundProps {
  particleCount?: number;
  minDistance?: number;
  shape?: "rectangle" | "circle";
  className?: string;
}

export function ClientParticleBackground({
  particleCount = 50,
  className = ""
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Simple animated background
    let animationId: number;
    let time = 0;

    const animate = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Create simple floating particles
      for (let i = 0; i < particleCount; i++) {
        const x = (width / particleCount) * i + Math.sin(time * 0.01 + i) * 50;
        const y = height * 0.3 + Math.cos(time * 0.015 + i) * 100;
        
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${0.1 + Math.sin(time * 0.02 + i) * 0.1})`;
        ctx.fill();
      }

      time += 1;
      animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    handleResize();
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
} 