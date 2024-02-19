"use client";

import useFavorite from "@/hooks/useFavorite";
import { SafeUser } from "@/types";
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {
  const { hasFavorite, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <CiHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <IoMdHeart
        size={24}
        className={hasFavorite ? "fill-red-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
