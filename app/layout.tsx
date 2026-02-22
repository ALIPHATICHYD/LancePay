import type { Metadata } from "next";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import { DevModeBanner } from "@/components/DevModeBanner";
import { getNonce } from "@/lib/csp-nonce";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lancepay - Get Paid in Minutes, Not Days",
  description:
    "The fastest way for Nigerian freelancers to receive international payments.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nonce = await getNonce();
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
        <Toaster position="top-right" richColors />
        <DevModeBanner nonce={nonce} />
      </body>
    </html>
  );
}
