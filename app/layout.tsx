import { BrandThemeProvider } from "@/components/brand/BrandThemeProvider";
import { atkinson, inter, lexend, nunito, openDyslexic } from "@/app/fonts";
import { getRequestBrandConfig } from "@/lib/brand/server";
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getRequestBrandConfig();
  return {
    title: {
      default: brand.displayName,
      template: `%s · ${brand.displayName}`,
    },
    description: brand.copy.homeLead,
    applicationName: brand.displayName,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const brand = await getRequestBrandConfig();

  return (
    <html
      lang="en"
      data-brand={brand.id}
      className={`${nunito.variable} ${lexend.variable} ${openDyslexic.variable} ${atkinson.variable} ${inter.variable}`}
    >
      <body className="font-chrome antialiased">
        <Suspense fallback={null}>
          <BrandThemeProvider initialBrandId={brand.id}>
            {children}
          </BrandThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
