import type { Metadata } from "next";
import "./globals.css";
import { PwaRegistrar } from "@/components/pwa/PwaRegistrar";
import { AppShell } from "@/components/layout/AppShell";
import { assertContentRelations } from "@/lib/contentValidation";

if (process.env.NODE_ENV !== "production") {
  assertContentRelations();
}

export const metadata: Metadata = {
  title: "Noema",
  description: "Comparison-first philosophy learning",
  manifest: "/manifest.webmanifest",
  applicationName: "Noema",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Noema",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport = {
  themeColor: "#0a0b24",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <PwaRegistrar />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
