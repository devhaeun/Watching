import { NextResponse } from "next/server";

export default async function GET({
  params,
}: {
  params: { movieId: string; detail: string };
}) {
  const { movieId, detail } = params;

  // 허용된 항목인지 검증
  const allowedDetails = ["videos", "credits", "similar"];
  if (!allowedDetails.includes(detail)) {
    return NextResponse.json(
      { error: "Invalid Detailed Category" },
      { status: 400 }
    );
  }

  let url = `${process.env.NEXT_PUBLIC_MOVIE_API_URL}/movie/${movieId}/${detail}?language=ko-KR`;

  if (detail === "similar") {
    url += "&page=1";
  }

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "TMDB API Error" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
