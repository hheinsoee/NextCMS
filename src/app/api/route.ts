import { getContentStructure } from "@/service/t_content";

export async function GET(request: Request) {
  return await getContentStructure()
    .then((data) => {
        return Response.json({ data });
    })
    .catch((error) => {
      console.log(error);
      return Response.json({ error });
    });
}
