import { useMovieCredits, useMovieVideos } from "@/hooks/useMovieDetail";
import Image from "next/image";

export default function ContentsInfo({ id }: { id: string }) {
  const { data: videos, isLoading, isError } = useMovieVideos(id);
  const { data: casts } = useMovieCredits(id);

  if (isLoading) return <div className="text-white">로딩 중...</div>;
  if (isError)
    return (
      <div className="text-white">동영상을 불러오는 중 문제가 발생했습니다</div>
    );

  return (
    <>
      <h2 className="text-white text-xl mb-2">관련 동영상</h2>
      <ul className="mb-8">
        {videos?.results.slice(0, 4).map((vid) => (
          <div
            key={vid.id}
            className="rounded-sm mr-3 mb-3 inline-block overflow-hidden align-middle h-36 hover:cursor-pointer"
          >
            <Image
              src={`https://img.youtube.com/vi/${vid.key}/0.jpg`}
              alt={`${vid.name} 동영상 바로가기`}
              width={260}
              height={195}
              onClick={() =>
                window.open(`https://www.youtube.com/watch?v=${vid.key}`)
              }
              className="relative -top-[25px]"
            />
          </div>
        ))}
      </ul>
      <h2 className="text-white text-xl mb-2">감독/출연</h2>
      <ul className="grid-y-5 grid-cols-2">
        {casts?.cast.map((cast) => (
          <ul key={cast.id}>
            <div></div>
            <div>
              <div>{cast.name}</div>
              <div>{cast.character}</div>
            </div>
          </ul>
        ))}
      </ul>
    </>
  );
}
