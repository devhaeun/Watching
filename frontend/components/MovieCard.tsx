import Image from "next/image";
import Link from "next/link";

export default function MovieCard({
  posterPath,
  title,
  releaseDate,
  movieId,
}: {
  posterPath: string;
  title: string;
  releaseDate: string;
  movieId: number;
}) {
  return (
    <div className="h-57 w-30">
      <Link href={`/movies/${movieId}`}>
        <Image
          src={process.env.NEXT_PUBLIC_BASE_PATH + posterPath}
          alt={`영화 ${title}의 포스터`}
          width={120}
          height={173}
        />
      </Link>
      <div className="max-w-37 text-white font-bold text-[0.8em] ml-1">
        {title}
      </div>
      <div className="text-white text-xs ml-1">{releaseDate}</div>
    </div>
  );
}
