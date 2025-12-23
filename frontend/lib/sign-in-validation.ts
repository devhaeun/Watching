import z from "zod";

export const signInSchema = z.object({
  email: z.string().email("이메일 형식이 유효하지 않습니다."),
  password: z
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .max(16, "비밀번호는 16자 이하여야 합니다."),
});

export type SignInInput = z.infer<typeof signInSchema>;
