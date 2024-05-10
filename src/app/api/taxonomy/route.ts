import { getContents } from "@/service/r_content";
import { getContentTypes } from "@/service/t_content";
import { getTaxonomyTypes } from "@/service/t_taxonomy";
import { errorResponse } from "@/utility/errRexponse";
import { QueryJson } from "@/utility/nextQuery";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return await getTaxonomyTypes({})
    .then((data) => {
      return NextResponse.json(data);
    })
    .catch((error) => errorResponse(error, 500));
}
