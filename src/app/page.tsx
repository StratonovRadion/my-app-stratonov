"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";


const schema = yup.object({
  user_name: yup.string().required("Имя пользователя обязательно"),
  email: yup.string().email("Неверный формат email").required("Email обязателен"),
  age: yup.number().positive("Возраст должен быть положительным").integer().required("Возраст обязателен"),
  password: yup.string().required("Пароль обязателен").min(6, "Пароль должен быть не менее 6 символов"),
  confirm_password: yup.string()
    .oneOf([yup.ref("password")], "Пароли должны совпадать")
    .required("Подтверждение пароля обязательно"),
}).required();

export default function RegistrationPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: any) => {
    console.log("Успешная регистрация:", data);
    router.push("/posts");
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
        
        <div>
          <input {...register("user_name")} placeholder="User Name" />
          {errors.user_name && <p style={{color: 'red', margin: 0}}>{errors.user_name.message}</p>}
        </div>

        <div>
          <input {...register("email")} placeholder="Email" type="email" />
          {errors.email && <p style={{color: 'red', margin: 0}}>{errors.email.message}</p>}
        </div>

        <div>
          <input {...register("age")} placeholder="Age" type="number" />
          {errors.age && <p style={{color: 'red', margin: 0}}>{errors.age.message}</p>}
        </div>

        <div>
          <input {...register("password")} placeholder="Password" type="password" />
          {errors.password && <p style={{color: 'red', margin: 0}}>{errors.password.message}</p>}
        </div>

        <div>
          <input {...register("confirm_password")} placeholder="Confirm Password" type="password" />
          {errors.confirm_password && <p style={{color: 'red', margin: 0}}>{errors.confirm_password.message}</p>}
        </div>

        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}