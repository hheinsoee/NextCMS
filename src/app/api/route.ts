import { getContentType } from "@/service/t_content";
import { errorResponse } from "@/utility/errRexponse";

export async function GET(request: Request) {
  await getContentType()
    .then((data) => {
      return Response.json({ data });
    })
    .catch((error) => {
      return errorResponse(error.code || 500);
    });
}
