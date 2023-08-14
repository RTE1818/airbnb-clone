import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useLoginModal from "./useLoginModal";
import prisma from "@/app/libs/prismadb";
import { airbnbUser } from "@prisma/client";

interface IUseFavorite {
  listingId: string;
  currentUser?: airbnbUser | null;
}

const useFavorite = ({ listingId, currentUser}: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasFavorited) {
        request = () => axios.delete(`/api/favorites/${listingId}`)
      } else {
        request = () => axios.post(`/api/favorites/${listingId}`)
      }

      await request();
      router.refresh();
      toast.success("Favorites Updated")
    } catch (error) {
      toast.error("Something went wrong! Please try again.")
    }
  }, [currentUser, hasFavorited, listingId, loginModal, router])

  return {
    hasFavorited,
    toggleFavorite
  }
}

export default useFavorite;

