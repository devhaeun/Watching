"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { signInAction } from "../actions/auth";
import { SignInInput, signInSchema } from "@/lib/sign-in-validation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInInput) => {
    const result = await signInAction(data);

    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="text-center absolute left-[50%] pt-[5em] translate-x-[-50%]">
      <div className="text-white text-2xl mb-6 block font-bold">로그인</div>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          placeholder="이메일을 입력해주세요"
          {...register("email")}
          className="text-white w-[25em] mb-1"
        />
        <div className="mt-1 mb-2 text-red-500">{errors.email?.message}</div>

        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          {...register("password")}
          className="text-white w-[25em] mb-1"
        />
        <div className="mt-1 mb-2 text-red-500">{errors.password?.message}</div>

        <Input
          type="submit"
          disabled={!isValid}
          className="bg-red-500 border-0 w-[25em]"
        />
      </form>
    </div>
  );
}
