import type { Metadata } from "next";
import "@fontsource/bricolage-grotesque/latin-600.css";
import "@fontsource/bricolage-grotesque/latin-700.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "./globals.css";
import { Shell } from "@/components/Shell";
export const metadata: Metadata = {
  title: {
    default: "De Groeitafel — Schuif aan. Bouw samen.",
    template: "%s · De Groeitafel",
  },
  description:
    "Een concept voor 2027: lokale ondernemers en jonge makers wisselen kennis en creativiteit uit en maken samen iets bruikbaars.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
