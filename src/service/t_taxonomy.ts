"use server";
import prisma from "@/db";
import { Prisma } from "@prisma/client";
import { TaxonomyType } from "@schema";
import { safeData } from ".";

// #region getMany
interface TaxonomyQueryOptions {
  taxonomy?: boolean;
  where?: any; // Adjust type according to your schema
}
export const getTaxonomyTypes = async ({
  taxonomy,
  where,
}: TaxonomyQueryOptions) =>
  await prisma.taxonomyType
    .findMany({
      where,
      include: {
        taxonomy,
      },
    })
    .then((d) => {
      return d.map((d) => ({
        ...d,
        taxonomies: d.taxonomy,
        taxonomy: undefined,
      }));
    })
    .catch((e) => {
      throw new Error(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
      // process.exit(1);
    });

// interface ab {
//   name: string;
// }

// #region Create
export const createTaxonomy = async ({ data }: { data: TaxonomyType }) => {
  const q: Prisma.taxonomyTypeCreateArgs = {
    data: {
      ...(await safeData("taxonomyType", data)),
      taxonomy: {
        createMany: {
          data: data.taxonomies.map(({ name }: { name: string }) => ({
            name,
          })),
        },
      },
    } as Prisma.taxonomyTypeCreateInput,
  };
  return await prisma.taxonomyType
    .create(q)
    .then((d) => {
      return getTaxonomyTypes({
        taxonomy: true,
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
// #region  Update
export const updateTaxonomy = async ({ where, data }: any) => {
  const q = Prisma.validator<Prisma.taxonomyTypeUpdateArgs>()({
    where,
    data: {
      ...(await safeData("taxonomyType", data)),
      taxonomy: {
        deleteMany: {},
        createMany: {
          data: data.taxonomies.map(({ name }: any) => ({
            name,
          })),
        },
      },
    },
  });
  return await prisma.taxonomyType
    .update(q)
    .then((d) => {
      return getTaxonomyTypes({
        taxonomy: true,
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
// #region Delete
export const deleteTaxonomyType = async ({ where }: any) => {
  return await prisma.taxonomyType
    .delete({
      where,
    })
    .then((d) => {
      return d;
    })
    .catch((e) => {
      throw new Error(e.meta.cause);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};
