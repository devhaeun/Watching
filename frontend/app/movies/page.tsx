import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="text-white text-2xl mb-6 block font-bold">카테고리</div>
      <div className="flex flex-wrap gap-x-4 gap-y-3">
        <Link href={"/movies/now-playing"} className="text-white">
          현재 상영중인
        </Link>
        <Link href={"/movies/popular"} className="text-white">
          인기있는
        </Link>
        <Link href={"/movies/top-rated"} className="text-white">
          높은 평가를 받은
        </Link>
        <Link href={"/movies/upcoming"} className="text-white">
          개봉 예정인
        </Link>
      </div>
    </>
  );
}
