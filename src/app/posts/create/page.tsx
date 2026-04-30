"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { createPostAction } from "../actions";

const schema = yup.object({
  title: yup.string().required("Поле Title обязательно"),
  body: yup.string().required("Поле Body обязательно"),
}).required();

export default function CreatePostPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: any) => {
    try {
      await createPostAction(data);
      
      console.log("Пост успешно создан, кеш сброшен");
      
      router.push("/posts");
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Создать пост</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
        <div>
          <input {...register("title")} placeholder="Title" />
          {errors.title && <p style={{color: 'red', margin: 0}}>{errors.title.message}</p>}
        </div>

        <div>
          <textarea {...register("body")} placeholder="Body" rows={5} />
          {errors.body && <p style={{color: 'red', margin: 0}}>{errors.body.message}</p>}
        </div>

        <button type="submit">Отправить и вернуться</button>
      </form>
    </div>
  );
}