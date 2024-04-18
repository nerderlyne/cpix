'use client'
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getHexImage } from "@/lib/getHexImage";
import { useEffect, useState } from "react";
import Image from "next/image";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export const HexImage = ({ hex }: { hex: string}) => {
    const [image, setImage] = useState('');
    const [width, setWidth] = useState(50);
  
    useEffect(() => {
      const generatedImage = getHexImage(hex);
      if (!generatedImage) {
        toast.error('Could not generate image from hex data');
        return;
      };
      setImage(generatedImage);
    }, []);

    
    return (<><div style={{
        width,
      }}>
        <AspectRatio>
          <Image src={image} alt="Image" layout="fill" />
        </AspectRatio>
      </div>
      <div className="fixed bottom-0 right-0 m-5 flex flex-row space-x-2">
        <Button variant="outline" size="icon" className="rounded-full p-1" onClick={() => setWidth(width => width - 10)}>
          <MinusIcon />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full p-1" onClick={() => setWidth(width => width + 10)}>
            <PlusIcon />
        </Button>
        <ModeToggle />
        </div></>)
}