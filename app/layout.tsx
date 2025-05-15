
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import I18nProvider  from "../app/provider/i18n-provider";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Work2Gether",
  description: "Work2Gether",
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
            <I18nProvider>
                {children}
            </I18nProvider>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
