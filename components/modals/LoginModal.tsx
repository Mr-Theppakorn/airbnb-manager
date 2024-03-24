"use client";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useState, useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModel";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const router = useRouter();
  const registerModel = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success("Login successful");
        router.refresh();
        loginModal.onClose();
      }
    });
  };

  const handleSwitch = () => {
    loginModal.onClose();
    registerModel.onOpen();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account" center />
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Github"
        icon={FaGithub}
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Do not have account yet?</div>

          <div
            onClick={handleSwitch}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Sign up
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Login"
      title="Login"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
