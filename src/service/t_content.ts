"use server";
import prisma from "@/db";
import { safeData } from "./index";
import { Prisma } from "@prisma/client";

export const getContentStructure = async (props?: any) => {
  const q = Prisma.validator<Prisma.t_contentFindManyArgs>()(props);
  return await prisma.t_content
    .findMany({
      orderBy: {
        id: "desc",
      },
      ...q,
      include: {
        t_field: true,
        map_t_content_t_taxonomy: {
          include: {
            t_taxonomy: true,
          },
        },
      },
    })
    .then((data: any[]) => {
      return data.map((d) => ({
        ...d,
        t_taxonomy: d.map_t_content_t_taxonomy?.map((t: any) => t.t_taxonomy),
        // t_taxonomy_ids: d.map_t_content_t_taxonomy.map(
        //   (t: any) => t.t_taxonomy_id
        // ),
        map_t_content_t_taxonomy: undefined,
      }));
    })
    .catch((e) => {
      throw new Error(e);
    })
    .finally(() => {
      prisma.$disconnect();
    });
};
export const createContentType = async ({ data }: any) => {
  const q = {
    data: {
      ...(await safeData("t_content", data)),
      t_field: {
        createMany: {
          data: data.t_field.map(
            ({ name, data_type }: { name: string; data_type: string }) => ({
              name,
              data_type,
            })
          ),
        },
      },
      map_t_content_t_taxonomy: {
        createMany: {
          data:
            data.t_taxonomy_ids?.map((id: number) => ({
              t_taxonomy_id: id,
            })) || [],
        },
      },
    },
  };
  return await prisma.t_content
    .create(q as Prisma.t_contentCreateArgs)
    .then((d) => {
      return getContentStructure({
        where: {
          id: d.id,
        },
      });
    })
    .catch((e) => {
      throw new Error(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};
// updateContentType;

interface UpdateContentType {
  where: Prisma.t_contentWhereUniqueInput;
  data: any;
}
export const updateContentType = async ({ where, data }: UpdateContentType) => {
  const inputs = {
    where,
    data: {
      ...(await safeData("t_content", data)),
      t_field: {
        deleteMany: {},
        createMany: {
          data: data.t_field.map(({ name, data_type }: any) => ({
            name,
            data_type,
          })),
        },
      },
      map_t_content_t_taxonomy: {
        deleteMany: {},
        ...(data?.t_taxonomy_ids?.length > 0 && {
          createMany: {
            data: data.t_taxonomy_ids?.map((id: number) => ({
              t_taxonomy_id: id,
            })),
          },
        }),
      },
    },
  };
  return await prisma.t_content
    .update(inputs as Prisma.t_contentUpdateArgs)
    .then((d) => {
      console.log({ d });
      return getContentStructure({
        where: {
          id: d.id,
        },
      });
    })
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};
export const deleteContentType = async ({
  where,
}: Prisma.t_contentDeleteArgs) => {
  return await prisma.t_content
    .delete({
      where,
    })
    .then((d) => {
      return d;
    })
    .catch((e) => {
      throw new Error(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};
