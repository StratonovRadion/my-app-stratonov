import Link from "next/link";
import { getT } from "../../../i18n/server";

export default async function PostsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const { t } = await getT("common", lang);
  const date = new Date().toISOString();

  return (
    <div>
      <h1>{t("posts.title")}</h1>
      <span>
        {t("posts.date")}: {date}
      </span>
      <br />
      <Link href={`/${lang}/posts/create`}>{t("posts.createPost")}</Link>
    </div>
  );
}
