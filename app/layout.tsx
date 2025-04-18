import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Newspaper, Pencil, Scale, Scroll } from "lucide-react";
import Footer from "@/components/footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Quick Form Pro",
  description: "The fastest way to create legal documents online.",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
                  <div className="flex align-center text-lg tracking-wide logo-wrap text-white">
                    <img
                      className="inline mr-2 color-white"
                      alt="Quick Form Pro Header Logo"
                      src="/images/logo.png"
                      style={{
                        width: 30,
                      }}
                    />

                    <p>Quick Form Pro</p>
                  </div>{" "}
                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </div>
              </nav>
              <div className="flex flex-col min-h-[400px] w-full align-center">{children}</div>
              <Footer />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
