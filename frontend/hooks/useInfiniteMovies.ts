import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMovies } from "./useMovies";

const useInfiniteMovies = ({ category }: { category: string }) => {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => fetchMovies({ category, pageParam }),
    queryKey: ["movies", category],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastMovie = lastPage.results.at(-1);
      return lastMovie ? allPages?.length + 1 : undefined;
    },
  });
};

export default useInfiniteMovies;
