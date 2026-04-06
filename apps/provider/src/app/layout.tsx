import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./styles/globals.css"; // We'll need to ensure this exists or create it
import { ProviderDataProvider } from "./context/ProviderDataContext";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "ServEase | Provider Portal",
  description: "Manage your service business with ServEase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <ProviderDataProvider>
          {children}
          <Toaster position="top-right" richColors />
        </ProviderDataProvider>
      </body>
    </html>
  );
}
