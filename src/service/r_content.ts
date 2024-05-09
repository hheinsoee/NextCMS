"use server";
import prisma from "@/db";
import { safeData } from "./index";
import { Prisma } from "@prisma/client";

export const getContent = async (props?: Prisma.r_contentFindManyArgs) =>
  await prisma.r_content
    .findMany({
      orderBy: {
        id: "desc",
      },
      ...props,
      include: {
        t_content: {
          select: {
            map_t_content_t_taxonomy: {
              select: {
                t_taxonomy: true,
              },
            },
          },
        },
        map_r_content_r_taxonomy: {
          include: {
            r_taxonomy: true,
          },
        },
        r_field: true,
      },
    })
    .then((data) => {
      return data.map((d) => ({
        ...d,
        fields: Object.assign(
          {},
          ...d.r_field?.map(({ name, value }) => ({
            [String(name)]: String(value),
          }))
        ),
        t_taxonomy: d.t_content?.map_t_content_t_taxonomy.reduce(
          (acc: any, obj) => {
            const rTaxonomyIds = d.map_r_content_r_taxonomy
              .filter(
                (map) => map.r_taxonomy.t_taxonomy_id === obj.t_taxonomy.id
              )
              .map((o) => o.r_taxonomy.id);
            acc[obj.t_taxonomy.name] = rTaxonomyIds;
            return acc;
          },
          {}
        ),
        r_field: undefined,
        map_r_content_r_taxonomy: undefined,
        t_content: undefined,
      }));
    })
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

interface CreateContent {
  data: any;
}
export const createContent = async ({ data }: CreateContent) => {
  console.dir("create");
  const q = {
    data: {
      ...(await safeData("r_content", data)),
      r_field: {
        createMany: {
          data: Object.entries(data.fields).map(([key, value]) => ({
            name: String(key),
            value: String(value),
          })),
        },
      },
      map_r_content_r_taxonomy: {
        createMany: {
          data: Object.entries(data.t_taxonomy).flatMap(([key, value]) =>
            value.map((num) => ({ r_taxonomy_id: Number(num) }))
          ),
        },
      },
    },
  };
  return await prisma.r_content
    .create(q as Prisma.r_contentCreateArgs)
    .then((d) => {
      return getContent({
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
export const updateContent = async ({
  where,
  data,
}: {
  where: Prisma.r_contentWhereUniqueInput;
  data: any;
}) => {
  const q = {
    where: {
      ...where,
    },
    data: {
      ...(await safeData("r_content", data)),
      r_field: {
        deleteMany: {},
        createMany: {
          data: Object.entries(data.fields).map(([key, value]) => ({
            name: String(key),
            value: String(value),
          })),
        },
      },
      map_r_content_r_taxonomy: {
        deleteMany: {},
        createMany: {
          data: Object.entries(data.t_taxonomy).flatMap(([key, value]) =>
            value.map((num) => ({ r_taxonomy_id: num }))
          ),
        },
      },
    },
  };
  return await prisma.r_content
    .update(q as Prisma.r_contentUpdateArgs)
    .then((d) => {
      return getContent({
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

export const deleteContent = async ({ where }: Prisma.r_contentDeleteArgs) => {
  return await prisma.r_content
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
