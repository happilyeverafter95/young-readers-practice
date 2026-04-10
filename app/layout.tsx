import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ProgressProvider } from "@/components/progress-context";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-nunito"
});

export const metadata: Metadata = {
  title: "Young Readers Practice",
  description: "Kindergarten reading comprehension activities"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable}>
      <body>
        <ProgressProvider>{children}</ProgressProvider>
      </body>
    </html>
  );
}
