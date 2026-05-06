"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter, useParams } from "next/navigation";
import { Trans } from "react-i18next";
import { useT } from "../../../i18n/useT";

export default function RegistrationPage() {
  const router = useRouter();
  const { lang } = useParams() as { lang: string };
  const { t } = useT("auth");

  const schema = yup
    .object({
      user_name: yup.string().required(t("errors.userNameRequired")),
      email: yup
        .string()
        .email(t("errors.emailInvalid"))
        .required(t("errors.emailRequired")),
      age: yup
        .number()
        .positive(t("errors.agePositive"))
        .integer()
        .required(t("errors.ageRequired")),
      password: yup
        .string()
        .required(t("errors.passwordRequired"))
        .min(6, t("errors.passwordMin")),
      confirm_password: yup
        .string()
        .oneOf([yup.ref("password")], t("errors.confirmPasswordMatch"))
        .required(t("errors.confirmPasswordRequired")),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    console.log(t("registration.successMessage", { name: data.user_name }));
    router.push(`/${lang}/posts`);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{t("registration.title")}</h1>

      {/* Trans component - advanced interpolation with embedded React elements */}
      <p>
        <Trans
          i18nKey="registration.agreementText"
          ns="auth"
          components={{
            termsLink: <a href={`/${lang}/terms`} style={{ color: "blue" }} />,
            privacyLink: <a href={`/${lang}/privacy`} style={{ color: "blue" }} />,
          }}
        />
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "300px" }}
      >
        <div>
          <input {...register("user_name")} placeholder={t("registration.userName")} />
          {errors.user_name && <p style={{ color: "red", margin: 0 }}>{errors.user_name.message}</p>}
        </div>

        <div>
          <input {...register("email")} placeholder={t("registration.email")} type="email" />
          {errors.email && <p style={{ color: "red", margin: 0 }}>{errors.email.message}</p>}
        </div>

        <div>
          <input {...register("age")} placeholder={t("registration.age")} type="number" />
          {errors.age && <p style={{ color: "red", margin: 0 }}>{errors.age.message}</p>}
        </div>

        <div>
          <input {...register("password")} placeholder={t("registration.password")} type="password" />
          {errors.password && <p style={{ color: "red", margin: 0 }}>{errors.password.message}</p>}
        </div>

        <div>
          <input {...register("confirm_password")} placeholder={t("registration.confirmPassword")} type="password" />
          {errors.confirm_password && <p style={{ color: "red", margin: 0 }}>{errors.confirm_password.message}</p>}
        </div>

        <button type="submit">{t("registration.submit")}</button>
      </form>
    </div>
  );
}
