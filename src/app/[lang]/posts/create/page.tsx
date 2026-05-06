"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter, useParams } from "next/navigation";
import { Trans } from "react-i18next";
import { createPostAction } from "../actions";
import { useT } from "../../../../i18n/useT";

export default function CreatePostPage() {
  const router = useRouter();
  const { lang } = useParams() as { lang: string };
  const { t } = useT("auth");

  const schema = yup.object({
    title: yup.string().required(t("createPost.titleRequired")),
    body: yup.string().required(t("createPost.bodyRequired")),
  }).required();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      await createPostAction(data);
      router.push(`/${lang}/posts`);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{t("createPost.title")}</h1>

      {/* Trans component example for rich text interpolation */}
      <p>
        <Trans
          i18nKey="registration.agreementText"
          ns="auth"
          components={{
            termsLink: <a href={`/${lang}/terms`} />,
            privacyLink: <a href={`/${lang}/privacy`} />,
          }}
        />
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "300px",
        }}
      >
        <div>
          <input
            {...register("title")}
            placeholder={t("createPost.titleField")}
          />
          {errors.title && (
            <p style={{ color: "red", margin: 0 }}>{errors.title.message}</p>
          )}
        </div>

        <div>
          <textarea
            {...register("body")}
            placeholder={t("createPost.bodyField")}
            rows={5}
          />
          {errors.body && (
            <p style={{ color: "red", margin: 0 }}>{errors.body.message}</p>
          )}
        </div>

        <button type="submit">{t("createPost.submit")}</button>
      </form>
    </div>
  );
}
