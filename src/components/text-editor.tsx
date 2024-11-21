"use client";

import * as React from "react";

import { useEditor } from "@/provider/editor-provider";
import { ChordMarker } from "./chord-marker";

export function ChordEditor() {
  const { text, setText, textareaRef, chords, setChord } = useEditor();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value.replace(/\r\n?/g, "\n");
    setText(newText);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.currentTarget;
      const newText = `${text.slice(0, selectionStart)}\t${text.slice(selectionEnd)}`;
      setText(newText);
      e.currentTarget.setSelectionRange(selectionStart + 1, selectionStart + 1);
    }

    // if (e.code === "Backspace") {
    //   const { selectionStart, selectionEnd } = e.currentTarget;
    //   const textsTotal = text
    //     .split("\n")
    //     .map(line => line.length)
    //     .reduce((acc, len) => acc + len, 0);
    //   const texts = text.split("\n").map(line => line.length);

    //   let currentTextLine = 0;
    //   let totalTextSize = 0;
    //   for (let i = 0; i < texts.length; i++) {
    //     totalTextSize += texts[i];
    //     if (totalTextSize > selectionStart) {
    //       currentTextLine = i;
    //       break;
    //     }
    //   }

    //   if (selectionStart === selectionEnd) {
    //     const lineStart = text.lastIndexOf("\n", selectionStart - 1);
    //     const lineEnd = text.indexOf("\n", selectionStart);
    //     const word = text.slice(lineStart + 1, lineEnd);

    //     const numMarkers = Math.max(1, Math.floor(word.length / 2));

    //     // const absoluteIndex = lineStart + word.length + numMarkers + ;

    //     console.log(selectionStart);

    //     setChord(selectionStart - 1, "");
    //   }
    // }
  };

  const renderChordMarkers = (line: string, lineIndex: number) => {
    const words = line.split(" ");
    const markers: React.ReactNode[] = [];
    let charCount = 0;

    words.forEach((word, wordIndex) => {
      if (word.trim().length > 0) {
        const lineStart = text.split("\n").slice(0, lineIndex).join("\n").length + lineIndex;
        const wordMarkers: React.ReactNode[] = [];
        const numMarkers = Math.max(1, Math.floor(word.length / 2));

        for (let i = 0; i < numMarkers; i++) {
          const absoluteIndex = lineStart + charCount + word.length + i;
          console.log(absoluteIndex);

          wordMarkers.push(
            <ChordMarker
              key={`market-${lineIndex}-${wordIndex}-${i}-${absoluteIndex}`}
              chord={
                chords[absoluteIndex] || (
                  <div className="mx-auto aspect-square h-[10px] w-[10px] rounded-full bg-border"></div>
                )
              }
              onRemove={() => {}}
              onSelectChord={chord => {
                setChord(absoluteIndex, chord);
              }}
            />
          );
        }

        markers.push(
          <div
            key={`word-${word}-${lineIndex}-${wordIndex}`}
            className="absolute flex h-6 min-w-[1rem] items-center justify-evenly"
            style={{
              left: `${charCount}ch`,
              width: `${word.length}ch`,
              top: "-.5rem",
              pointerEvents: "none",
            }}
          >
            {wordMarkers}
          </div>
        );
      }

      charCount += word.length + 1; // +1 for the space
    });

    return markers;
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  React.useEffect(() => {
    adjustTextareaHeight();
  }, [text]);

  return (
    <div className="relative h-full w-full font-mono text-base">
      <div className="pointer-events-none absolute z-10 space-y-[1.5rem]">
        {text.split("\n").map((line, lineIndex) => (
          <div key={lineIndex} className="group relative">
            {renderChordMarkers(line, lineIndex)}
            <div className="pointer-events-none whitespace-pre-wrap break-words opacity-0">{"\u00A0"}</div>
          </div>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleTextChange}
        onKeyDown={handleOnKeyDown}
        className="inset-0 h-full w-full resize-none appearance-none bg-transparent font-mono text-base leading-[3rem] outline-none"
        aria-label="Editor de letras y acordes"
      />
    </div>
  );
}
