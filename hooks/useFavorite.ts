import { SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import useLoginModal from "./useLoginModel";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const LoginModal = useLoginModal();

  const hasFavorite = useMemo(() => {
    const list = currentUser?.fevoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        console.log(listingId);

        return LoginModal.onOpen();
      }
      try {
        let request;
        if (hasFavorite) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }
        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [currentUser, hasFavorite, listingId, LoginModal, router]
  );
  return { hasFavorite, toggleFavorite };
};

export default useFavorite;
