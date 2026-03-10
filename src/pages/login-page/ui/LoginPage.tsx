import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/shared/ui/Input"
import { Button } from "@/shared/ui/Button"
import { useAuth } from "@/features/auth/model/useAuth"
import s from './LoginPage.module.scss'
import logo from '@/assets/images/logo.webp'
import user from '@/assets/icons/i-user.svg'
import x from '@/assets/icons/x-icon.svg'
import pas from '@/assets/icons/pas.svg'
import eye from '@/assets/icons/eye.svg'
import eyeClosed from '@/assets/icons/eyeClosed.svg'
import checkbox from "@/assets/icons/checkbox.svg"
import checkboxChecked from "@/assets/icons/checkbox-checked.svg"
import { Loader } from "@/shared/ui/Loader/Loader"

export const LoginPage = () => {
  const navigate = useNavigate()
  const { login, error, isLoading, getToken } = useAuth()

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState<boolean>(false)
  const [fieldError, setFieldError] = useState<{ username: boolean; password: boolean }>({
    username: false,
    password: false
  })

  useEffect(() => {
    const savedUsername = localStorage.getItem("username") || sessionStorage.getItem("username")
    const tokenInLocal = localStorage.getItem("token")
    if (savedUsername) setUsername(savedUsername)
    if (tokenInLocal) setRemember(true)
  }, [])

  const handleCheckbox = () => setRemember(prev => !prev)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const usernameError = username.trim() === ""
    const passwordError = password.trim() === ""
    setFieldError({ username: usernameError, password: passwordError })
    if (usernameError || passwordError) return

    await login(username, password, remember)

    // После успешного логина проверяем токен и редиректим
    const token = getToken()
    if (token) navigate("/products")
  }

  return (
    <div className={s.container}>
      {isLoading && <Loader isLoading={isLoading} />}
      <div className={s.card}>
        <div className={s.card__content}>
          <img src={logo} alt="logo" className={s.logo} />
          <div className={s.title_block}>
            <h2 className={s.title}>Добро пожаловать!</h2>
            <h3 className={s.subtitle}>Пожалуйста, авторизируйтесь</h3>
          </div>

          <form className={s.form} onSubmit={handleSubmit}>
            <div className={s.inputGroup}>
              <label className={s.label}>Логин</label>
              <div className={`${s.input} ${fieldError.username || error ? s.inputError : ""}`}>
                <img src={user} alt="user" />
                <Input
                  className={s.input__text}
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Username"
                />
                <img src={x} alt="x" className={s.clearIcon} onClick={() => setUsername("")} />
              </div>
            </div>

            <div className={s.inputGroup}>
              <label className={s.label}>Пароль</label>
              <div className={`${s.input} ${fieldError.password || error ? s.inputError : ""}`}>
                <img src={pas} alt="password" />
                <Input
                  type={showPassword ? "text" : "password"}
                  className={s.input__text}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <img
                  src={showPassword ? eye : eyeClosed}
                  alt={showPassword ? "Скрыть пароль" : "Показать пароль"}
                  className={s.clearIcon}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>

            <div className={s.checkboxRow} onClick={handleCheckbox}>
              <img src={remember ? checkboxChecked : checkbox} alt="checkbox" className={s.checkboxIcon} />
              <input type="checkbox" checked={remember} readOnly className={s.hiddenCheckbox} />
              <span>Запомнить данные</span>
            </div>

            <div className={s.error_block}>{error && <p style={{ color: "red" }}>{error}</p>}</div>

            <Button type="submit" className={s.button} disabled={isLoading}>
              Войти
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}