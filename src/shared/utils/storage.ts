export const saveToken = (token: string, remember: boolean) => {
    if (remember) {
      localStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("token", token);
    }
  };
  
  export const getToken = (): string | null => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };
  
  export const clearToken = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  };