import { getContent } from "@service/r_content";
import { QueryJson } from "@utility/nextQuery";
import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "@utility/errRexponse";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const query = QueryJson(request);

  return await getContent({
    where: {
      id: {
        equals: Number(params.id),
      },
    },
  })
    .then((data) => {
      return NextResponse.json({ data });
    })
    .catch((error) => {
      console.log(error);
      return errorResponse(error, error.code);
    });
}
