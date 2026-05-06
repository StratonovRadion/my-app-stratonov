import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "My Blog",
  keywords: ["Next.js", "React", "JavaScript"],
  description: "Lorem sljkdjfjkjhfdkh ksafkh",
};

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>Шапка сайта</header>
      <main>{children}</main>
      <footer>Подвал сайта</footer>
    </>
  );
}
