import { getT } from "../../i18n/server";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const { t } = await getT("common", lang);

  const itemCount = 5;

  return (
    <main>
      <h1>{t("home.title")}</h1>
      <p>{t("home.description")}</p>
      <p>{t("home.welcomeUser", { name: "Иван" })}</p>
      <p>{t("home.itemsCount", { count: itemCount })}</p>
    </main>
  );
}
