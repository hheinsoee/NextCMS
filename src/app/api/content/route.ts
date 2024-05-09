import { getContents } from "@/service/r_content";
import { getContentStructure } from "@/service/t_content";
import { QueryJson } from "@/utility/nextQuery";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { t_content_id } = QueryJson(request);
  return await getContents({
    ...(t_content_id && {
      where: {
        t_content_id: {
          equals: Number(t_content_id),
        },
      },
    }),
  })
    .then((data) => {
      return NextResponse.json(data);
    })
    .catch((error) => {
      console.log(error);
      return NextResponse.json(
        { error: "Method not allowed" },
        {
          status: 405,
        }
      );
    });
}
