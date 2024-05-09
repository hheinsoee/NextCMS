import { getContent } from "@/service/r_content";
import { getContentStructure } from "@/service/t_content";

export async function GET(
  request: Request,
  { params }: { params: { t_content_id: number } }
) {
  return await getContent({
    where: {
      t_content_id: {
        equals: Number(params.t_content_id),
      },
    },
  })
    .then((data) => {
      return Response.json(data);
    })
    .catch((error) => {
      console.log(error);
      return Response.json({ error });
    });
}
