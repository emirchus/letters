"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ArrowLeft, Folder, MessageCircle, Search, User, WalletCards } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";

import useClickOutside from "@/hooks/use-click-outside";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

const transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.25,
};

function Button({
  children,
  onClick,
  disabled,
  ariaLabel,
  active,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  active: boolean;
}) {
  return (
    <button
      className={cn(
        "group relative flex h-9 w-9 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg bg-sidebar-accent transition-all hover:bg-sidebar-primary/10 hover:text-sidebar-accent-foreground focus-visible:ring-2 active:scale-[0.98]",
        active ? "bg-sidebar-border text-sidebar-primary" : ""
      )}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

const ITEMS = [
  {
    id: 1,
    label: "User",
    title: <User className="h-5 w-5" />,
    content: (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-1 text-zinc-700">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-400" />
          <span>Ibelick</span>
        </div>
        <button
          className="relative h-8 w-full scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98]"
          type="button"
        >
          Edit Profile
        </button>
      </div>
    ),
  },
  {
    id: 2,
    label: "Messages",
    title: <MessageCircle className="h-5 w-5" />,
    content: (
      <div className="flex flex-col space-y-4">
        <div className="text-zinc-700">You have 3 new messages.</div>
        <button
          className="relative h-8 w-full scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98]"
          type="button"
        >
          View more
        </button>
      </div>
    ),
  },
  {
    id: 3,
    label: "Documents",
    title: <Folder className="h-5 w-5" />,
    content: (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col text-zinc-700">
          <div className="space-y-1">
            <div>Project_Proposal.pdf</div>
            <div>Meeting_Notes.docx</div>
            <div>Financial_Report.xls</div>
          </div>
        </div>
        <button
          className="relative h-8 w-full scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98]"
          type="button"
        >
          Manage documents
        </button>
      </div>
    ),
  },
  {
    id: 4,
    label: "Wallet",
    title: <WalletCards className="h-5 w-5" />,
    content: (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col text-zinc-700">
          <span>Current Balance</span>
          <span>$1,250.32</span>
        </div>
        <button
          className="relative h-8 w-full scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98]"
          type="button"
        >
          View Transactions
        </button>
      </div>
    ),
  },
];

export default function ToolbarExpandable() {
  const [active, setActive] = useState<number | null>(null);
  const [contentRef, { height: heightContent }] = useMeasure();
  const [menuRef, { width: widthContainer }] = useMeasure();
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState(0);

  const [isSearching, setIsSearching] = useState(false);

  useClickOutside(ref, () => {
    setIsOpen(false);
    setIsSearching(false);
    setActive(null);
  });

  useEffect(() => {
    if (!widthContainer || maxWidth > 0) return;

    setMaxWidth(widthContainer);
  }, [widthContainer, maxWidth]);

  return (
    <MotionConfig transition={transition}>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 transform" ref={ref}>
        <div className="h-full w-full rounded-xl border border-sidebar-border bg-sidebar">
          <div className="overflow-hidden">
            <AnimatePresence initial={false} mode="sync">
              {isOpen ? (
                <motion.div
                  key="content"
                  initial={{ height: 0 }}
                  animate={{ height: heightContent || 0 }}
                  exit={{ height: 0 }}
                  style={{
                    width: maxWidth,
                  }}
                >
                  <div ref={contentRef} className="p-2">
                    {ITEMS.map(item => {
                      const isSelected = active === item.id;

                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isSelected ? 1 : 0 }}
                          exit={{ opacity: 0 }}
                          className=""
                        >
                          <div className={cn("px-2 pt-2 text-sm", isSelected ? "block" : "hidden")}>{item.content}</div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          <div className="flex space-x-2 p-2" ref={menuRef}>
            {ITEMS.map(item => (
              <Button
                key={item.id}
                ariaLabel={item.label}
                active={active === item.id}
                onClick={() => {
                  if (!isOpen) setIsOpen(true);
                  if (active === item.id) {
                    setIsOpen(false);
                    setActive(null);
                    return;
                  }

                  setActive(item.id);
                }}
              >
                <div className="group-hover:scale-110">{item.title}</div>
              </Button>
            ))}
            <Separator orientation="vertical" className="my-auto h-4" />
            <motion.div
              animate={{
                width: isSearching ? "300px" : "46px",
              }}
              initial={false}
            >
              {!isSearching ? (
                <Button
                  onClick={() => {
                    setIsSearching(true);
                    setIsOpen(false);
                    setActive(null);
                  }}
                  ariaLabel="Search notes"
                  active={false}
                >
                  <Search className="h-5 w-5" />
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button active={false} onClick={() => setIsSearching(false)} ariaLabel="Back">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <div className="relative w-full">
                    <Input
                      className="rounded-lg  h-9 w-full focus:outline-none focus:ring-0 border-accent/10 bg-sidebar-border"
                      autoFocus
                      placeholder="Search notes"
                    />
                    <div className="absolute right-1 top-0 flex h-full items-center justify-center"></div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
