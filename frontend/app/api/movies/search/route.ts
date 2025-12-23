import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const keyword = searchParams.get("keyword");

  const token = process.env.TMDB_TOKEN;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MOVIE_API_URL}/search/movie?query=${keyword}&include_adult=false&language=ko&page=1`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("TMDB SEARCH API ERROR:", errorData);
      return NextResponse.json(
        { error: "TMDB 검색 실패" },
        { status: response.status }
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "서버 내부 오류" }, { status: 500 });
  }
}
