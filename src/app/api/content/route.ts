import { getContents } from "@/service/r_content";
import { QueryJson } from "@/utility/nextQuery";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { contentTypeId } = QueryJson(request);
  return await getContents({
    ...(contentTypeId && {
      where: {
        contentTypeId: {
          equals: Number(contentTypeId),
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
