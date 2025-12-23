"use client";

import { useQuery } from "@tanstack/react-query";

const fetchSearch = async (keyword: string) => {
  const response = await fetch(`/api/movies/search?keyword=${keyword}`);

  if (!response.ok) throw new Error("fetchSearch response not ok");
  return response.json();
};

const useSearchMovies = (keyword: string) => {
  return useQuery({
    queryKey: ["movies", keyword],
    queryFn: () => fetchSearch(keyword),
  });
};

export default useSearchMovies;
