import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Footer from "@/components/footer";
import HeaderLogoLink from "@/components/header-logo-link";
import { createClient } from "@/utils/supabase/server";
import { GoogleAnalytics } from "@next/third-parties/google";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "QuickForm Pro",
  description: "The fastest way to create legal documents online.",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-[#1E3A5F]">
                <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm ">
                  <HeaderLogoLink user={user} />{" "}
                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </div>
              </nav>
              <div className="flex flex-col min-h-[400px] w-full align-center">{children}</div>
              <Footer />
            </div>
          </main>
        </ThemeProvider>
      </body>
      {process.env.VERCEL_ENV === "production" && <GoogleAnalytics gaId="G-399R1XXJVR" />}
    </html>
  );
}
