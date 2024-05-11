import { getContents } from "@/service/r_content";
import { getContentType } from "@/service/t_content";
import { getTaxonomyTypes } from "@/service/t_taxonomy";
import { errorResponse } from "@/utility/errRexponse";
import { QueryJson } from "@/utility/nextQuery";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  return await getTaxonomyTypes({ where: { id: Number(params.id) } })
    .then((data) => {
      return NextResponse.json(data[0]);
    })
    .catch((error) => errorResponse(error));
}
