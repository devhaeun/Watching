"use client";

import { useQuery } from "@tanstack/react-query";

const fetchMovies = async ({
  category,
  pageParam,
}: {
  category: string;
  pageParam: number;
}) => {
  const res = await fetch(
    `/api/movies/category?category=${category}&pageParam=${pageParam}`
  );

  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

const useMovies = ({
  category,
  pageParam,
}: {
  category: string;
  pageParam: number;
}) => {
  return useQuery({
    queryKey: ["movies", category],
    queryFn: () => fetchMovies({ category, pageParam }),
  });
};

export default useMovies;
