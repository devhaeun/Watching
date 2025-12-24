import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ movieId: string }>;
  }
) {
  const resolvedParams = await params;
  const movieId = resolvedParams.movieId;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MOVIE_API_URL}/movie/${movieId}?language=ko-KR&append_to_response=images`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
          accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "TMDB API Error" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
