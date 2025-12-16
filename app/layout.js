import { JetBrains_Mono } from "next/font/google"
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"]
})


export const metadata = {
  title: "Price Tracker",
  description: "put any product link if you want to check when it's price decreases",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jetBrainsMono.variable}  antialiased`}
      >
        <Toaster richColors />
        {children}
      </body>
    </html>
  );
}
