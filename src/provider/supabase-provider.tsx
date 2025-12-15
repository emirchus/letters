"use client";

import {SupabaseContextProvider} from "@emirchus/use-supabase";
import React from "react";

import {supabase} from "@/lib/supabase/client";

interface SupabaseClientProviderProps {
  children: React.ReactNode;
}

export function SupabaseClientProvider({children}: SupabaseClientProviderProps) {
  return <SupabaseContextProvider client={supabase}>{children}</SupabaseContextProvider>;
}
