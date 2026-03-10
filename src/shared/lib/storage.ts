export const setToken = (token: string, remember: boolean) => {
    if (remember) localStorage.setItem("token", token)
    else sessionStorage.setItem("token", token)
  }
  
  export const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token")