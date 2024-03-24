"use client";

import { signOut } from "next-auth/react";
import { useState, useCallback, useRef, useEffect } from "react";
import useRegisterModal from "@/hooks/useRegisterModal";
import { IoMenu } from "react-icons/io5";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useLoginModal from "@/hooks/useLoginModel";
import { SafeUser } from "@/types";
import useRentModal from "@/hooks/useRentModel";
import { useRouter } from "next/navigation";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const UserMenu = ({ currentUser }: NavbarProps) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onCloseLogin = useCallback(() => {
    setIsOpen(false);
    loginModal.onOpen();
  }, [loginModal]);

  const onCloseSignUp = useCallback(() => {
    setIsOpen(false);
    registerModal.onOpen();
  }, [registerModal]);

  const onRent = () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  };

  const handleClick = (path: string) => {
    if (path === "airbnb") {
      rentModal.onOpen();
      setIsOpen(false);
      return;
    }
    router.push(path);
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <IoMenu />
          <div className="hidden md:block">
             <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <>
              {!currentUser?.id ? (
                <>
                  <MenuItem onClick={onCloseLogin} label="Login" />
                  <MenuItem onClick={onCloseSignUp} label="Sign up" />
                </>
              ) : (
                <>
                  <MenuItem
                    onClick={() => handleClick("/trip")}
                    label="My trips"
                  />
                  <MenuItem
                    onClick={() => handleClick("/favorites")}
                    label="My favorites"
                  />
                  <MenuItem
                    onClick={() => handleClick("/reservations")}
                    label="My reservations"
                  />
                  <MenuItem
                    onClick={() => handleClick("/properties")}
                    label="My properties"
                  />
                  <MenuItem
                    onClick={() => handleClick("airbnb")}
                    label="Airbnb your home"
                  />
                  <hr />
                  <MenuItem onClick={() => signOut()} label="Logout" />
                </>
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
