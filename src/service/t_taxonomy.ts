"use server";
import prisma from "@/db";
import { Prisma } from "@prisma/client";
import { safeData } from "./index";
interface TaxonomyQueryOptions {
  r_taxonomy?: boolean;
  where?: any; // Adjust type according to your schema
}
export const getTaxonomyTypes = async ({
  r_taxonomy,
  where,
}: TaxonomyQueryOptions) =>
  await prisma.t_taxonomy
    .findMany({
      where,
      include: {
        r_taxonomy,
      },
    })
    .then((d) => {
      return d;
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

export const createTaxonomy = async ({ data }: any) => {
  const q = Prisma.validator<Prisma.t_taxonomyCreateArgs>()({
    data: {
      ...data,
      r_taxonomy: {
        createMany: {
          data: data.r_taxonomy.map(({ name }: { name: string }) => ({
            name,
          })),
        },
      },
    },
  });
  return await prisma.t_taxonomy
    .create(q)
    .then((d) => {
      return getTaxonomyTypes({
        r_taxonomy: true,
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
export const updateTaxonomy = async ({ where, data }: any) => {
  const q = Prisma.validator<Prisma.t_taxonomyUpdateArgs>()({
    where,
    data: {
      ...data,
      r_taxonomy: {
        deleteMany: {},
        createMany: {
          data: data.r_taxonomy.map(({ name }: any) => ({
            name,
          })),
        },
      },
    },
  });
  return await prisma.t_taxonomy
    .update(q)
    .then((d) => {
      return getTaxonomyTypes({
        r_taxonomy: true,
        where: {
          id: d.id,
        },
      });
    })
    .catch((e) => {
      throw (e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};
export const deleteTaxonomyType = async ({ where }: any) => {
  return await prisma.t_taxonomy
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
