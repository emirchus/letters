"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { setCaretToEnd } from "@/lib/caret-utils";
import { cn } from "@/lib/utils";
import { useEditor } from "@/provider/editor-provider";
import { ChordMarker } from "./chord-marker";

interface Props {
  readonly?: boolean;
  className?: string;
}

export function ChordEditor({ readonly = false }: Props) {
  const { text, setText, textareaRef, chords, setChord } = useEditor();
  const [blocks, setBlocks] = useState<{ id: string; content: string }[]>(
    text.split("\n").map((line, index) => ({ id: `block-${index}`, content: line }))
  );
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setBlocks(text.split("\n").map((line, index) => ({ id: `block-${index}`, content: line })));
  }, [text]);

  // Manejador del teclado
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const currentBlock = blocks[index];

      // Detecto si el cursor está al final del bloque
      const sel = document.getSelection();
      const range = sel!.getRangeAt(0);
      const offset = range.startOffset;

      // Si el cursor no está al final del bloque, divido el bloque según el cursor
      if (offset !== currentBlock.content.length) {
        const before = currentBlock.content.slice(0, offset);
        const after = currentBlock.content.slice(offset);
        const updatedBlocks = [...blocks];
        updatedBlocks[index] = { ...currentBlock, content: before };
        updatedBlocks.splice(index + 1, 0, { id: "block-" + Date.now(), content: after });
        setText(updatedBlocks.map(block => block.content).join("\n"));

        requestAnimationFrame(() => {
          const nextBlockElem = e.currentTarget.nextElementSibling;
          console.log(updatedBlocks[index + 1].id);
          if (nextBlockElem) {
            setCaretToEnd(nextBlockElem);
          }
        });
      }
    }

    if (e.key === "Backspace") {
      const currentBlock = blocks[index];
      if (currentBlock.content === "" && blocks.length > 1) {
        e.preventDefault();
        // Eliminar bloque vacío y mover el cursor al final del bloque anterior
        const updatedBlocks = [...blocks];
        updatedBlocks.splice(index, 1);
        const prevBlock = updatedBlocks[index - 1];
        setText(updatedBlocks.map(block => block.content).join("\n"));

        requestAnimationFrame(() => {
          const prevBlockElem = document.getElementById(prevBlock.id);
          setCaretToEnd(prevBlockElem!);
        });
      }
    }

    if (e.key === "a" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();

      // Seleccionar todo el contenido del editor
      const editor = editorRef.current;
      if (!editor) return;

      const range = document.createRange();
      range.selectNodeContents(editor);
      const sel = window.getSelection();
      sel!.removeAllRanges();
      sel!.addRange(range);
    }
  };

  // Manejador del input, se llama cuando el contenido editable cambia
  const handleInput = (e: React.FormEvent<HTMLDivElement>, index: number) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].content = e.currentTarget.textContent || "";
    setCaretToEnd(e.currentTarget);
    setText(updatedBlocks.map(block => block.content).join("\n"));
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

          wordMarkers.push(
            <ChordMarker
              key={`market-${lineIndex}-${wordIndex}-${i}-${absoluteIndex}`}
              readonly={readonly}
              chord={
                chords[absoluteIndex] || (
                  <div className="mx-auto aspect-square h-[10px] w-[10px] rounded-full bg-border" />
                )
              }
              onRemove={() => {}}
              onSelectChordAction={chord => {
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

  const adjustTextareaHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [textareaRef]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [adjustTextareaHeight, text]);

  return (
    <div className="relative h-full w-full font-mono text-base">
      <div className="pointer-events-none absolute z-10 space-y-[1.5rem]">
        {text.split("\n").map((line, lineIndex) => (
          <div key={lineIndex} className={cn("group relative", readonly && "pointer-events-none")}>
            {renderChordMarkers(line, lineIndex)}
            <div className="pointer-events-none whitespace-pre-wrap break-words opacity-0">{"\u00A0"}</div>
          </div>
        ))}
      </div>
      <div className="absolute left-0 top-0 flex flex-col items-end pr-4 text-zinc-400">
        {text.split("\n").map((_, i) => (
          <div key={i} className="h-[3rem] select-none">
            {i + 1}
          </div>
        ))}
      </div>
      <div ref={editorRef} className="relative h-full w-full font-mono text-base">
        {blocks.map((block, index) => (
          <div
            key={block.id}
            id={block.id}
            className="leading-[3rem] outline-none"
            contentEditable
            suppressContentEditableWarning
            onKeyDown={e => handleKeyDown(e, index)}
            onInput={e => handleInput(e, index)}
          >
            {block.content}
          </div>
        ))}
      </div>
    </div>
  );
}
