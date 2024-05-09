import "./../globals.css";
import Loading from "@components/Loading";
import { Suspense } from "react";

import StyledComponentsRegistry from "@/components/AntdRegistry";
import { ThemeProvider } from "@/context/theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledComponentsRegistry>
      <Suspense fallback={<Loading />}>
        <ThemeProvider>{children}</ThemeProvider>
      </Suspense>
    </StyledComponentsRegistry>
  );
}
