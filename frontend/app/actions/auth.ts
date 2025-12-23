"use server";

import { SignInInput } from "@/lib/sign-in-validation";

export async function signInAction(data: SignInInput) {
  await new Promise((res) => setTimeout(res, 1000));

  if (data.email === "test@test.com" && data.password === "pass1234") {
    return { success: true, message: "로그인 성공!" };
  } else {
    return { success: false, message: "이메일 또는 비밀번호가 틀렸습니다." };
  }
}
