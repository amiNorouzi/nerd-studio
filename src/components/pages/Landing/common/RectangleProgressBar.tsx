"use client";
import React, { useEffect, useRef } from "react";

interface RectangleProgressBarProps {
  label: string;
  progress: number; // Progress from 0 to 100
  width: number; // Width of the rectangle in pixels
  height: number; // Height of the rectangle in pixels
  borderRadius?: number;
}

const RectangleProgressBar: React.FC<RectangleProgressBarProps> = ({
  label,
  progress,
  width,
  height,
  borderRadius,
}) => {
  // const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;

      const drawProgress = (currentProgress: number) => {
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
          ctx.lineWidth = 4; // set size border
          ctx.strokeStyle = "#BBA9EE"; // Background border
          ctx.strokeRect(2, 2, width - 4, height - 4);

          ctx.strokeStyle = "#9373EE"; // Progress border
          const totalLength = 2 * (width + height) - 2; // Total path length
          const progressLength = (totalLength * currentProgress) / 100;
          ctx.beginPath();
          if (progressLength <= width - 4) {
            ctx.moveTo(2, 2);
            ctx.lineTo(2 + progressLength, 2);
          } else if (progressLength <= width + height - 6) {
            ctx.moveTo(2, 2);
            ctx.lineTo(width - 2, 2);
            ctx.lineTo(width - 2, 2 + (progressLength - (width - 4)));
          } else if (progressLength <= 2 * width + height - 10) {
            ctx.moveTo(2, 2);
            ctx.lineTo(width - 2, 2);
            ctx.lineTo(width - 2, height - 2);
            ctx.lineTo(
              width - 2 - (progressLength - (width + height - 6)),
              height - 2,
            );
          } else {
            ctx.moveTo(2, 2);
            ctx.lineTo(width - 2, 2);
            ctx.lineTo(width - 2, height - 2);
            ctx.lineTo(2, height - 2);
            ctx.lineTo(2, 2 + (totalLength - progressLength));
          }
          ctx.stroke();
        }
      };

      drawProgress(progress);
    }
  }, [progress, width, height]);

  return (
    <div
      style={{ position: "relative", display: "inline-block", width, height }}
    >
      <button
        // ref={buttonRef}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          background: "#d9cece",
          position: "relative",
          zIndex: 1,
          fontSize: "1rem",
          cursor: "pointer",
          borderRadius: `${borderRadius}px`,
        }}
      >
        {label}
      </button>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}
      />
    </div>
  );
};

export default RectangleProgressBar;
