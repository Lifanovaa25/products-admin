import { useState } from "react";
import axios from "axios";
import { saveToken } from "@/shared/utils/storage";

type LoginData = {
  username: string;
  password: string;
  remember: boolean;
};

export const useLogin = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginData) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post("https://dummyjson.com/auth/login", {
        username: data.username,
        password: data.password,
      });

      saveToken(res.data.token, data.remember);

      // редирект на страницу товаров
      window.location.href = "/products";
    } catch (e: any) {
      setError("Неверный логин или пароль");
    } finally {
      setLoading(false);
    }
  };

  return { login, isLoading, error };
};