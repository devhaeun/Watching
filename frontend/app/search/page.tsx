"use client";

import MovieCard from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSearchMovies from "@/hooks/useSearchMovies";
import { TMovie } from "@/types/movie-types";
import { useEffect, useState } from "react";

export default function Page() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchDebouncedValue, setSearchDebouncedValue] = useState<string>("");
  const { data: movies } = useSearchMovies(searchDebouncedValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchDebouncedValue(searchValue);
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchValue]);

  return (
    <>
      <div className="flex gap-5 mb-5">
        <Input
          type="search"
          value={searchValue}
          onChange={onChange}
          placeholder="영화 제목을 입력해주세요"
          className="bg-white"
        />
        <Button className="bg-red-500">검색</Button>
      </div>
      <div>
        <div className="flex flex-wrap gap-x-4 gap-y-3">
          {movies?.results.map((movie: TMovie) => (
            <MovieCard
              key={movie.id}
              posterPath={movie.poster_path}
              title={movie.title}
              releaseDate={movie.release_date}
              movieId={movie.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
