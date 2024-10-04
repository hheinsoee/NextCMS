import prisma from "@/db";
import { getContents } from "@/service/r_content";
import { getContentTypes } from "@/service/t_content";
import { getTaxonomyTypes } from "@/service/t_taxonomy";
import { errorResponse } from "@/utility/errRexponse";
import { QueryJson } from "@/utility/nextQuery";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return await prisma.test
    .findMany({
      include: {
        test2: true,
      },
    })
    .then((data) => {
      return NextResponse.json(data);
    })
    .catch((error) => errorResponse(error));

  //   return await prisma.test
  //     .create({
  //       data: {
  //         name: "test C",
  //         test2: {
  //           create: {
  //             name: "test2 C",
  //           },
  //         },
  //       },
  //     })
  //     .then((data) => {
  //       return NextResponse.json(data);
  //     })
  //     .catch((error) => errorResponse(error));
}
