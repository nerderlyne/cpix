'use client'
import { useEffect, useRef, useState } from "react";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

const hexToRgb = (hex: string) => {
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
};

export const HexImage = ({ hex }: { hex: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Remove the '0x' prefix if present
    hex = hex.replace(/^0x/, "");

    // Calculate the dimensions of the image based on the hex data length
    const dataLength = hex.length;
    const canvasWidth = Math.ceil(Math.sqrt(dataLength / 6));
    const canvasHeight = Math.ceil(dataLength / (canvasWidth * 6));

    // Set the canvas dimensions
    canvas.width = canvasWidth * scale;
    canvas.height = canvasHeight * scale;

    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Iterate over the hex data and set pixel colors
    for (let i = 0; i < dataLength; i += 6) {
      const hexColor = hex.substring(i, i + 6);
      const { r, g, b } = hexToRgb(hexColor);
      const x = (i / 6) % canvasWidth;
      const y = Math.floor(i / 6 / canvasWidth);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fillRect(x * scale, y * scale, scale, scale);
    }
  }, [hex, scale]);

  return (
    <>
      <canvas ref={canvasRef} />
      <div className="fixed bottom-0 right-0 m-5 flex flex-row space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full p-1"
          onClick={() => setScale((scale) => scale - 1)}
        >
          <MinusIcon />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full p-1"
          onClick={() => setScale((scale) => scale + 1)}
        >
          <PlusIcon />
        </Button>
        <ModeToggle />
      </div>
    </>
  );
};