import Loading from "@components/Loading";
import { Suspense } from "react";
import RepoProvider from "./_private/context/repo";
import prisma from "@/db";
import AdminLayout from "./_private/components/AdminLayout";
import { getContentStructure } from "../../../service/t_content";
import { getTaxonomyTypes } from "../../../service/t_taxonomy";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Rename the context variable

  const ls_content_type = await getContentStructure();
  const ls_taxonomy_type = await getTaxonomyTypes({ r_taxonomy: true });
  return (
    <Suspense fallback={<Loading />}>
      <RepoProvider repo={{ ls_content_type, ls_taxonomy_type }}>
        <AdminLayout>{children}</AdminLayout>
      </RepoProvider>
    </Suspense>
  );
}
