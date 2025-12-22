import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category");
  const pageParam = searchParams.get("pageParam") || "1";

  const token = process.env.TMDB_TOKEN;

  console.log("token exists?: ", !!token);
  console.log("Requesting:", category, pageParam);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MOVIE_API_URL}/movie/${category}?language=ko&page=${pageParam}`,
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
      console.error("TMDB API Error: ", errorData);
      return NextResponse.json(
        { error: "TMDB 요청 실패" },
        { status: response.status }
      );
    }

    console.log(response);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "서버 내부 오류" }, { status: 500 });
    // return NextResponse.json({ error }, { status: 500 });
  }
}
