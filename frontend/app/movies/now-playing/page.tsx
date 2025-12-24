"use client";

import MovieCard from "@/components/MovieCard";
import { Spinner } from "@/components/ui/spinner";
import useInfiniteMovies from "@/hooks/useInfiniteMovies";
import { TMovie } from "@/types/movie-types";
import { useEffect, useRef } from "react";

export default function Page() {
  const {
    data: movies,
    isLoading,
    isError,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteMovies({ category: "now_playing" });

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bottomRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(bottomRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, isFetching]);

  if (isLoading) return <div className="text-white">로딩중</div>;
  if (isError) return <div className="text-white">문제가 발생했습니다</div>;

  return (
    <>
      <div className="text-white text-2xl mb-6 block font-bold">
        현재 상영중인
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-3">
        {movies?.pages.map((page) =>
          page.results.map((movie: TMovie) => (
            <MovieCard
              key={movie.id}
              posterPath={movie.poster_path}
              title={movie.title}
              releaseDate={movie.release_date}
              movieId={movie.id}
            />
          ))
        )}
      </div>
      <div ref={bottomRef} className="w-full flex justify-center p-5">
        {isFetching && <Spinner className="size-6 text-white" />}
      </div>
    </>
  );
}
