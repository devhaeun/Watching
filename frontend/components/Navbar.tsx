"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const nickname = "익명";

  return (
    <div className="bg-black h-17 flex justify-between items-center grow pt-1">
      <span className="ml-10">
        <Link href="/">
          <span className="text-red-500 text-xl font-bold p-1">WATCHING</span>
        </Link>
        <span className="ml-10">
          <Link href="/search">
            <span className="text-white">검색</span>
          </Link>
          <Link href="/movies">
            <span className="text-white">카테고리</span>
          </Link>
        </span>
      </span>
      <div className="mr-10">
        {isAuthenticated ? (
          <>
            <span className="text-white">{nickname}님 환영합니다</span>
            <Button>로그아웃</Button>
          </>
        ) : (
          <div className="flex gap-3">
            <Link href={"/sign-in"}>
              <Button variant="outline">로그인</Button>
            </Link>
            <Link href={"/sign-up"}>
              <Button variant="outline">회원가입</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
