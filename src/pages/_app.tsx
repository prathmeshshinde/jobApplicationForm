import "@/styles/globals.css";
import "@radix-ui/themes/styles.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Theme } from "@radix-ui/themes";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Theme>
      <main className={`${inter.className}`}>
        <Toaster position="top-center" />
        <Component {...pageProps} />
      </main>
    </Theme>
  );
}
