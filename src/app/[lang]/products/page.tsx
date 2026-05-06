import { getT } from "../../../i18n/server";
import Link from "next/link";

interface Product {
  id: number;
  userId: number;
  title: string;
  body: string;
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
  return res.json();
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const { t } = await getT("common", lang);
  const products = await getProducts();

  return (
    <main>
      <h1>{t("products.title")}</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/${lang}/products/${product.id}`}>
              {product.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
