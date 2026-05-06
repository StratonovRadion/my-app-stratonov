import { cache } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { getT } from "../../../../i18n/server";

type Props = {
  params: Promise<{ id: string; lang: string }>;
};

export const getPost = cache(async (id: string) => {
  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  ).then((res) => res.json());
  return post;
});

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);
  return {
    title: post.title,
    description: post.body,
  };
}

export default async function DynamicPage({ params }: Props) {
  const { id, lang } = await params;
  const { t } = await getT("common", lang);
  const post = await getPost(id);

  return (
    <main>
      <h1>{t("products.dynamicRoute")}</h1>
      <p>
        {t("products.paramValue")}: {id}
      </p>
      <p>
        {t("products.userId")}: {post.userId}
      </p>
      <p>
        {t("products.id")}: {post.id}
      </p>
      <p>
        {t("products.name")}: {post.title}
      </p>
      <p>
        {t("products.body")}: {post.body}
      </p>
      <Link href={`/${lang}/products/${id}/comments`}>
        {t("products.viewComments")}
      </Link>
      <br />
      <Link href={`/${lang}/products`}>{t("products.backToProducts")}</Link>
    </main>
  );
}
