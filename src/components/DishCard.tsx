"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface Dish {
  dishId: string;
  dishName: string;
  imageUrl: string;
  isPublished: boolean;
}

interface DishCardProps {
  dish: Dish;
  onToggle: (id: string, newStatus: boolean) => void;
}

export default function DishCard({ dish, onToggle }: DishCardProps) {
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    try {
      const res = await fetch(`/api/dishes/${dish.dishId}/toggle`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Failed to toggle");
      const updated: Dish = await res.json();
      onToggle(dish.dishId, updated.isPublished);
      toast.success(
        `${dish.dishName} is now ${updated.isPublished ? "published" : "unpublished"}`
      );
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={dish.imageUrl}
          alt={dish.dishName}
          fill
          className={`object-cover transition-all duration-500 group-hover:scale-105 ${
            !dish.isPublished ? "grayscale opacity-60" : ""
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3">
          <AnimatePresence mode="wait">
            <motion.span
              key={dish.isPublished ? "published" : "unpublished"}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                dish.isPublished
                  ? "bg-emerald-500 text-white"
                  : "bg-neutral-700 text-neutral-300"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  dish.isPublished ? "bg-white animate-pulse" : "bg-neutral-400"
                }`}
              />
              {dish.isPublished ? "Published" : "Unpublished"}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <h2 className="text-base font-semibold text-neutral-900 dark:text-white truncate">
          {dish.dishName}
        </h2>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleToggle}
          disabled={loading}
          className={`w-full py-2 rounded-xl text-sm font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
            dish.isPublished
              ? "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900"
              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-400 dark:hover:bg-emerald-900"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Updating...
            </span>
          ) : dish.isPublished ? (
            "Unpublish"
          ) : (
            "Publish"
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
