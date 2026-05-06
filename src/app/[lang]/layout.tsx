import type { Metadata } from "next";
import { LANGUAGES } from "../../i18n/constants";

export const metadata: Metadata = {
  title: "My App",
  description: "Next.js App with i18n",
};

export function generateStaticParams() {
  return LANGUAGES.map((lang) => ({ lang }));
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  return <>{children}</>;
}
