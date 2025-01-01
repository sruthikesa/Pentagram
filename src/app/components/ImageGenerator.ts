"use client";
import React from 'react'
import { useState } from "react";
import { generateImage } from "../actions/generateImage";
import { Interface } from 'readline';

interface ImageGeneratorProps {
    generateImage: (
        text:string)
        => Promise<{success:boolean, imageURl?: string, error?:string}>
}

export default function ImageGenerator({generateImage} : ImageGeneratorProps) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await generateImage(inputText)
      if (!result.success) {
        throw new Error(
          `Failed to generate image HTTP error, status: ${result.status}`
        );
      }
      const data = await result.json();
      console.log("", data);
      if (!data.success) {
        throw new Error(data.error || "Failed to generate image");
      }

      if (data.imageURL) {
        const img = new Image();
        img.onload = () => {
          setImageURL(data.imageURL);
        };
        img.src = data.imageURL;
      }
      console.log(data);
      setInputText("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // TODO: Update the UI here to show the images generated

    <div className="min-h-screen flex flex-col justify-between p-8">
      <main className="flex-1">{/* Main content can go here */}</main>

      {imageURL && (
        <div className="w-full max-w-2xl rounded-lg overflow-hidden shadow-lg">
          <img
            src={imageURL}
            alt="Generated artwork"
            className="w-full h-auto"
          />
        </div>
      )}
      <footer className="w-full max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className="flex-1 p-3 rounded-lg bg-black/[.05] dark:bg-white/[.06] border border-black/[.08] dark:border-white/[.145] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              placeholder="Describe the image you want to generate..."
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 rounded-lg bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors disabled:opacity-50"
            >
              {isLoading ? "Generating..." : "Generate"}
            </button>
          </div>
        </form>
      </footer>
    </div>
  );
}
