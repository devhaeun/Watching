"use client";

import ContentsInfo from "@/components/movie-detail/ContentsInfo";
import SimilarContents from "@/components/movie-detail/SimilarContents";
import { Button } from "@/components/ui/button";
import { useMovieDetails } from "@/hooks/useMovieDetail";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: movieId } = use(params);

  const { data: movieInfo, isLoading, isError } = useMovieDetails(movieId);

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "details";

  const onTabChange = (tabName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabName);

    router.push(`?${params.toString()}`);
  };

  if (!movieInfo || isLoading) {
    return <div className="text-white">로딩중</div>;
  }
  if (isError) {
    return <div className="text-white">문제가 발생했습니다</div>;
  }

  return (
    <>
      <div className="flex justify-between mb-5">
        <div className="w-110 pt-7">
          <div className="text-4xl mb-3 text-white block font-bold">
            {movieInfo.title}
          </div>
          <div className="mb-4 text-sm">
            <span className="text-[lightgrey]">
              평균 {movieInfo.vote_average.toFixed(1)} |{" "}
            </span>
            <span className="text-[lightgrey]">
              {movieInfo.release_date} |{" "}
            </span>
            <span className="text-[lightgrey]">{movieInfo.runtime}분</span>
          </div>
          <div className="mb-4 text-sm text-[lightgrey]">
            {movieInfo.overview}
          </div>
          <div className="flex gap-3">
            <Button variant={"outline"}>구매하기</Button>
            <Button variant={"outline"}>선물하기</Button>
          </div>
        </div>
        <div className="relative">
          <Image
            src={process.env.NEXT_PUBLIC_BASE_PATH + movieInfo.backdrop_path}
            alt="영화 포스터 이미지"
            width={500}
            height={300}
          />
          <div className="absolute inset-0">
            <ul className="flex absolute right-0 bottom-[10px] z-1">
              <Button>보고싶어요</Button>
              <Button>평가하기</Button>
              <Button>친구와왓칭</Button>
              <Button>더보기</Button>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div className="h-12 flex justify-center sticky top-[70px] bg-black mb-6 z-1">
          <Button onClick={() => onTabChange("details")}>콘텐츠 정보</Button>
          <Button onClick={() => onTabChange("similar")}>관련 콘텐츠</Button>
        </div>
        {currentTab === "details" ? (
          <ContentsInfo id={movieId} />
        ) : (
          <SimilarContents id={movieId} />
        )}
      </div>
    </>
  );
}
