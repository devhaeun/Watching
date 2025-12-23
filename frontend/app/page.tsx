"use client";

import useMovies from "@/hooks/useMovies";
import { TMovie } from "@/types/movie-types";

export default function Home() {
  const {
    data: movies,
    isLoading,
    isError,
  } = useMovies({ category: "popular", pageParam: 1 });

  if (isLoading) return <div className="text-white">로딩 중</div>;
  if (isError) return <div className="text-white">에러 발생</div>;

  return (
    <div>
      <div className="text-white">Home</div>
      <div>
        {movies?.results.slice(0, 8).map((movie: TMovie) => (
          <div key={movie.id} className="text-white">
            {movie.title}
          </div>
        ))}
      </div>
    </div>
  );
}
