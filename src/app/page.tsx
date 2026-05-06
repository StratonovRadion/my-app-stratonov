import { redirect } from "next/navigation";
import { FALLBACK_LANG } from "../i18n/constants";

export default function RootPage() {
  redirect(`/${FALLBACK_LANG}`);
}
