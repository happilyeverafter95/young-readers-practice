import type { Metadata } from "next";
import { ProgressProvider } from "@/components/progress-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Young Readers Practice",
  description: "Kindergarten reading comprehension activities"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ProgressProvider>{children}</ProgressProvider>
      </body>
    </html>
  );
}
