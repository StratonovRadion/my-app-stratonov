import { getT } from "../../../../../i18n/server";

export default async function CommentsPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  const { t } = await getT("common", lang);

  return (
    <main>
      <h1>{t("products.comments")}</h1>
      <p>Product ID: {id}</p>
    </main>
  );
}
