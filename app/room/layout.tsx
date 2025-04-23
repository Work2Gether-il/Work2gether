// app/room/layout.tsx
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "@/app/globals.css";

const geist = Geist({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Room - Work2Gether",
};

export default function RoomLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className} suppressHydrationWarning>
      <body className="h-screen bg-black text-white overflow-hidden m-0 p-0">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

