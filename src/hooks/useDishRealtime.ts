"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";

interface Dish {
  dishId: string;
  dishName: string;
  imageUrl: string;
  isPublished: boolean;
}

export function useDishRealtime(
  onUpdate: (dish: Dish) => void,
  setConnected: (v: boolean) => void
) {
  const channelRef = useRef<ReturnType<
    ReturnType<typeof createClient>["channel"]
  > | null>(null);

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const channel = supabase
      .channel("dish-changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "Dish" },
        (payload) => {
          const updated = payload.new as Dish;
          onUpdate(updated);
          toast.info(
            `"${updated.dishName}" was ${updated.isPublished ? "published" : "unpublished"} externally`
          );
        }
      )
      .subscribe((status) => {
        setConnected(status === "SUBSCRIBED");
      });

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [onUpdate, setConnected]);
}
