"use client";

import {AnimatePresence, motion, MotionConfig} from "framer-motion";
import {ArrowLeftIcon} from "lucide-react";
import {memo, RefAttributes, useEffect, useId, useRef, useState} from "react";
import {createPortal} from "react-dom";

import {ChordSelector} from "./chord-selector";

import {Button} from "@/components/ui/button";
import useClickOutside from "@/hooks/use-click-outside";
import {Chord} from "@/interface/chord";

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

export function ChordMarker({chord, onSelectChordAction, readonly}: Props) {
  const uniqueId = useId();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState<null | string>(null);

  const [isDoc, setIsDoc] = useState(false);

  const [position, setPosition] = useState<{x: number; y: number} | null>(null);

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

    setPosition({x, y});
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
          className="cursor-pointer text-xs"
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
            closeMenu={closeMenu}
            formContainerRef={formContainerRef}
            isOpen={isOpen}
            note={note}
            position={position}
            uniqueId={uniqueId}
            onSelectChord={onSelectChordAction}
          />,
          document.body,
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
  formContainerRef: RefAttributes<HTMLDivElement>["ref"] | undefined;
  uniqueId: string;
  closeMenu: () => void;
  note: string | null;
  onSelectChord: (chord: Chord | "") => void;
  position: {x: number; y: number} | null;
}) {
  return (
    <AnimatePresence custom={TRANSITION}>
      {isOpen && (
        <motion.div
          ref={formContainerRef}
          animate={{opacity: 1, y: 0}}
          className="bg-card fixed z-50 flex h-[300px] w-[364px] flex-col overflow-hidden border p-4 outline-hidden"
          exit={{opacity: 0, y: 10}}
          initial={{opacity: 0, y: 10}}
          style={{
            borderRadius: 12,
            pointerEvents: "auto",
            left: position?.x,
            top: position?.y,
          }}
        >
          <div className="flex w-full flex-row items-center justify-start">
            <button
              aria-label="Close popover"
              className="flex items-center"
              type="button"
              onClick={closeMenu}
            >
              <ArrowLeftIcon className="text-zinc-900 dark:text-zinc-100" size={16} />
            </button>
            <motion.span
              aria-hidden="true"
              className="my-auto ml-2 text-sm text-zinc-500 select-none dark:text-zinc-400"
              style={{
                opacity: note ? 0 : 1,
              }}
            >
              Add Chord
            </motion.span>

            <Button
              aria-label="Submit note"
              className="ml-auto"
              size="sm"
              type="submit"
              variant="outline"
              onClick={() => {
                onSelectChord("");
                closeMenu();
              }}
            >
              {" "}
              Delete Chord
            </Button>
          </div>

          <div className="h-full w-full">
            <ChordSelector
              onSelectChord={(chord) => {
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
