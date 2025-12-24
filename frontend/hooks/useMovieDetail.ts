import {
  CreditResponse,
  DetailsResponse,
  SimilarResponse,
  VideoResponse,
} from "@/types/movie-detail-types";
import { useQuery } from "@tanstack/react-query";

const fetchDetail = async <T>(movieId: string, detail?: string): Promise<T> => {
  const res = detail
    ? await fetch(`/api/movies/${movieId}/${detail}`)
    : await fetch(`/api/movies/${movieId}`);
  if (!res.ok) throw new Error("Fetch Failed");

  const res_json = await res.json();
  console.log(res_json);
  return res_json;
};

export const useMovieDetails = (movieId: string) => {
  return useQuery({
    queryKey: ["moive", movieId, "details"],
    queryFn: () => fetchDetail<DetailsResponse>(movieId),
  });
};

export const useMovieVideos = (movieId: string) => {
  return useQuery({
    queryKey: ["movie", movieId, "videos"],
    queryFn: () => fetchDetail<VideoResponse>(movieId, "videos"),
  });
};

export const useMovieCredits = (movieId: string) => {
  return useQuery({
    queryKey: ["movie", movieId, "credits"],
    queryFn: () => fetchDetail<CreditResponse>(movieId, "credits"),
  });
};

export const useMovieSimilar = (movieId: string) => {
  return useQuery({
    queryKey: ["movie", movieId, "similar"],
    queryFn: () => fetchDetail<SimilarResponse>(movieId, "similar"),
  });
};
