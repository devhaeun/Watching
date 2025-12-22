"use client";

import useMovies from "@/hooks/useMovies";
import { TMovie } from "@/types/movie-types";

export default function Home() {
  const {
    data: movies,
    isLoading,
    isError,
  } = useMovies({ category: "popular", pageParam: 1 });

  if (isLoading) return <div>로딩 중</div>;
  if (isError) return <div>에러 발생</div>;

  return (
    <div>
      <div>Home</div>
      <div>
        {movies?.results.slice(0, 8).map((movie: TMovie) => (
          <div key={movie.id}>{movie.title}</div>
        ))}
      </div>
    </div>
  );
}
