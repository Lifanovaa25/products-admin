import React from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "../model/useLogin";

type LoginFormData = {
  username: string;
  password: string;
  remember: boolean;
};

export const LoginForm = () => {
  const { login, isLoading, error } = useLogin();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => login(data);

  return (
    <div className="login-card">
      <h2>Добро пожаловать!</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Логин</label>
        <input {...register("username", { required: "Введите логин" })} />
        {errors.username && <p className="error">{errors.username.message}</p>}

        <label>Пароль</label>
        <input type="password" {...register("password", { required: "Введите пароль" })} />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <div className="remember">
          <input type="checkbox" {...register("remember")} />
          <span>Запомнить данные</span>
        </div>

        {error && <p className="error">{error}</p>}

        <button disabled={isLoading}>{isLoading ? "Загрузка..." : "Войти"}</button>
      </form>
    </div>
  );
};