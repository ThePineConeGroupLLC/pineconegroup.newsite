import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Pine Cone Group | Strategic Growth Agency",
  description: "Premium branding, web design, and digital strategy for ambitious brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        <ErrorReporter />
        <Script id="resize-observer-fix" strategy="afterInteractive">{`
          window.addEventListener('error', function(e) {
            if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
              e.stopImmediatePropagation();
            }
          });
        `}</Script>
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        <div className="elfsight-app-3afba921-b9e6-4385-b856-5f22794da764" data-elfsight-app-lazy></div>
        <Script
          src="https://elfsightcdn.com/platform.js"
          strategy="afterInteractive"
        />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
