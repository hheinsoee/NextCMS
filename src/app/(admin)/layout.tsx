import "./../globals.css";
import Loading from "@components/Loading";
import { Suspense } from "react";

import StyledComponentsRegistry from "@/components/AntdRegistry";
import { ThemeProvider } from "@/context/theme";
import { getContentTypes } from "@/service/t_content";
import { getTaxonomyTypes } from "@/service/t_taxonomy";
import RepoProvider from "./admin/_private/context/repo";
import { prettyTaxonomy, prettyType } from "./admin/_private/prittier";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contentTypes = await getContentTypes();
  const taxonomyTypes = await getTaxonomyTypes({ taxonomy: true });
  return (
    <StyledComponentsRegistry>
      <Suspense fallback={<Loading />}>
        <RepoProvider
          init={{
            contentTypes: contentTypes.map((d) => prettyType(d)),
            taxonomyTypes: taxonomyTypes.map((d) => prettyTaxonomy(d)),
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </RepoProvider>
      </Suspense>
    </StyledComponentsRegistry>
  );
}
