"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DishCard from "./DishCard";
import { useDishRealtime } from "@/hooks/useDishRealtime";

interface Dish {
  dishId: string;
  dishName: string;
  imageUrl: string;
  isPublished: boolean;
}

interface DashboardProps {
  initialDishes: Dish[];
}

export default function Dashboard({ initialDishes }: DashboardProps) {
  const [dishes, setDishes] = useState<Dish[]>(initialDishes);
  const [connected, setConnected] = useState(false);

  const handleToggle = useCallback((id: string, newStatus: boolean) => {
    setDishes((prev) =>
      prev.map((d) => (d.dishId === id ? { ...d, isPublished: newStatus } : d))
    );
  }, []);

  const handleRealtimeUpdate = useCallback((updated: Dish) => {
    setDishes((prev) =>
      prev.map((d) => (d.dishId === updated.dishId ? updated : d))
    );
  }, []);

  useDishRealtime(handleRealtimeUpdate, setConnected);

  const publishedCount = dishes.filter((d) => d.isPublished).length;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <header className="sticky top-0 z-10 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🍽</span>
            <h1 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
              NoshBoard
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {publishedCount} / {dishes.length} published
            </span>
            <div className="flex items-center gap-1.5">
              <motion.span
                animate={connected ? { scale: [1, 1.3, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
                className={`w-2 h-2 rounded-full ${
                  connected ? "bg-emerald-500" : "bg-neutral-400"
                }`}
              />
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                {connected ? "Live" : "Connecting..."}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Dish Management
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Toggle dish visibility. Changes reflect live across all clients.
          </p>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {dishes.map((dish) => (
              <DishCard key={dish.dishId} dish={dish} onToggle={handleToggle} />
            ))}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}
