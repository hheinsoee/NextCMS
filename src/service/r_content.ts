"use server";
import prisma from "@/db";
import { safeData } from "./index";
import { Prisma } from "@prisma/client";
import { Content, Field, Taxonomy } from "@schema";
// #region contentPretty
const contentPretty = (d: any) => {
  const prettyContent: Content = {
    ...d,
    sfd: "sd",
    fields: d.field,
    taxonomies: d.contentType?.mapContentTypeTaxonomyType.map((obj: any) => {
      return {
        ...obj.taxonomyType,
        recordIds: d.mapContentTaxonomy
          .filter(
            (map: any) => map.taxonomy.taxonomyTypeId === obj.taxonomyType.id
          )
          .map((o: any) => o.taxonomy.id),
      };
    }, {}),
    field: undefined,
    mapContentTaxonomy: undefined,
    contentType: undefined,
  };
  return prettyContent;
};

// #region getContents
export const getContents = async (props?: Prisma.contentFindManyArgs) =>
  await prisma.content
    .findMany({
      orderBy: {
        id: "desc",
      },
      ...props,
      include: {
        contentType: {
          select: {
            mapContentTypeTaxonomyType: {
              select: {
                taxonomyType: true,
              },
            },
          },
        },
        mapContentTaxonomy: {
          include: {
            taxonomy: true,
          },
        },
        field: true,
      },
    })
    .then((data) => {
      return data.map((d) => contentPretty(d));
    })
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

function flatten2DArray<T>(arr: T[][]): T[] {
  return arr.flatMap((row) => row);
}
// #region getContent
export const getContent = async (props?: Prisma.contentFindFirstArgs) =>
  await prisma.content
    .findFirstOrThrow({
      orderBy: {
        id: "desc",
      },
      ...props,
      include: {
        contentType: {
          select: {
            mapContentTypeTaxonomyType: {
              select: {
                taxonomyType: true,
              },
            },
          },
        },
        mapContentTaxonomy: {
          include: {
            taxonomy: true,
          },
        },
        field: true,
      },
    })
    .then((data) => {
      return contentPretty(data);
    })
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
// #region createContent
export const createContent = async ({ data }: { data: Content }) => {
  console.dir(data);
  const q = {
    data: {
      ...(await safeData("content", data)),
      field: {
        createMany: {
          data: data.fields
            .map(({ name, value }: Field) => ({
              name: name,
              value: value,
            }))
            .filter((item: any) => item !== undefined),
        },
      },
      mapContentTaxonomy: {
        createMany: {
          data: data.taxonomies
            .flatMap((row: Taxonomy) =>
              row.recordIds.map((num) => ({ taxonomyId: num }))
            )
            .filter((item: any) => item !== undefined),
        },
      },
    },
  };
  return await prisma.content
    .create(q as Prisma.contentCreateArgs)
    .then((d) => {
      return getContent({
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
// #region updatecontent
export const updateContent = async ({
  where,
  data,
}: {
  where: Prisma.contentWhereUniqueInput;
  data: Content;
}) => {
  const q = {
    where: {
      ...where,
    },
    data: {
      ...(await safeData("content", data)),
      field: {
        deleteMany: {},
        createMany: {
          data: data.fields
            .map(({ name, value }: Field) => ({
              name: name,
              value: value,
            }))
            .filter((item: any) => item !== undefined),
        },
      },
      mapContentTaxonomy: {
        deleteMany: {},
        createMany: {
          data: data.taxonomies
            .flatMap((row: Taxonomy) =>
              row.recordIds.map((num) => ({ taxonomyId: num }))
            )
            .filter((item: any) => item !== undefined),
        },
      },
    },
  };

  console.dir(q, { depth: null });
  return await prisma.content
    .update(q as Prisma.contentUpdateArgs)
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
// #region deleteContent
export const deleteContent = async ({ where }: Prisma.contentDeleteArgs) => {
  return await prisma.content
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
