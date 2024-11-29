"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ArrowLeftIcon } from "lucide-react";
import { LegacyRef, memo, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import useClickOutside from "@/hooks/use-click-outside";
import { Chord } from "@/interface/chord";
import { ChordSelector } from "./chord-selector";

const TRANSITION = {
  type: "spring",
  bounce: 0.05,
  duration: 0.3,
};

interface Props {
  chord: Chord | React.ReactNode;
  onRemove: () => void;
  onSelectChordAction: (chord: Chord | "") => void;
  readonly?: boolean;
}

export function ChordMarker({ chord, onSelectChordAction, readonly }: Props) {
  const uniqueId = useId();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState<null | string>(null);

  const [isDoc, setIsDoc] = useState(false);

  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen(true);

    const rightSpace = window.innerWidth - e.clientX;
    const leftSpace = e.clientX;
    const bottomSpace = window.innerHeight - e.clientY;
    const topSpace = e.clientY;

    const MODAL_WIDTH = 365;
    const MODAL_HEIGHT = 300;

    let x = e.clientX - 10;
    if (rightSpace < MODAL_WIDTH && leftSpace > MODAL_WIDTH) {
      x = e.clientX - MODAL_WIDTH;
    }
    x = Math.min(Math.max(x, 0), window.innerWidth - MODAL_WIDTH);

    let y = e.clientY - 10;
    if (bottomSpace < MODAL_HEIGHT && topSpace > MODAL_HEIGHT) {
      y = e.clientY - MODAL_HEIGHT;
    }
    y = Math.min(Math.max(y, 0), window.innerHeight - MODAL_HEIGHT);

    setPosition({ x, y });
  };

  const closeMenu = () => {
    setIsOpen(false);
    setNote(null);
  };

  useClickOutside(formContainerRef, () => {
    closeMenu();
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      setIsDoc(true);
    }
  }, []);

  if (!isDoc) return null;

  return (
    <MotionConfig transition={TRANSITION}>
      <div className="relative flex items-center justify-center">
        <motion.button
          key="button"
          className="text-xs"
          style={{
            borderRadius: 8,
            pointerEvents: "auto",
          }}
          onClick={readonly ? undefined : openMenu}
        >
          {chord}
        </motion.button>

        {createPortal(
          <ChordsPopover
            isOpen={isOpen}
            formContainerRef={formContainerRef}
            uniqueId={uniqueId}
            closeMenu={closeMenu}
            note={note}
            onSelectChord={onSelectChordAction}
            position={position}
          />,
          document.body
        )}
      </div>
    </MotionConfig>
  );
}

const ChordsPopover = memo(function renderChordPopover({
  formContainerRef,
  closeMenu,
  note,
  onSelectChord,
  position,
  isOpen,
}: {
  isOpen: boolean;
  formContainerRef: LegacyRef<HTMLDivElement> | undefined;
  uniqueId: string;
  closeMenu: () => void;
  note: string | null;
  onSelectChord: (chord: Chord | "") => void;
  position: { x: number; y: number } | null;
}) {
  console.log("RENDER");
  return (
    <AnimatePresence custom={TRANSITION}>
      {isOpen && (
        <motion.div
          ref={formContainerRef}
          className="fixed z-50 flex h-[300px] w-[364px] flex-col overflow-hidden border border-zinc-950/10 bg-white p-4 outline-none dark:bg-zinc-700"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          style={{
            borderRadius: 12,
            pointerEvents: "auto",
            left: position?.x,
            top: position?.y,
          }}
        >
          <div className="flex w-full flex-row items-center justify-start">
            <button type="button" className="flex items-center" onClick={closeMenu} aria-label="Close popover">
              <ArrowLeftIcon size={16} className="text-zinc-900 dark:text-zinc-100" />
            </button>
            <motion.span
              aria-hidden="true"
              style={{
                opacity: note ? 0 : 1,
              }}
              className="my-auto ml-2 select-none text-sm text-zinc-500 dark:text-zinc-400"
            >
              Add Chord
            </motion.span>
            <button
              className="relative ml-auto flex h-8 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 bg-transparent px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:text-zinc-50 dark:hover:bg-zinc-800"
              type="submit"
              aria-label="Submit note"
              onClick={() => {
                onSelectChord("");
                closeMenu();
              }}
            >
              Delete Chord
            </button>
          </div>

          <div className="h-full w-full">
            <ChordSelector
              onSelectChord={chord => {
                closeMenu();
                onSelectChord(chord);
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
