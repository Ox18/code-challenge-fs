export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((row) => row.startsWith(`${name}=`));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
};

export const setCookie = (name: string, value: string) => {
  const encodedValue = encodeURIComponent(value);

  document.cookie = `${name}=${encodedValue}; path=/; max-age=${
    7 * 24 * 60 * 60
  }; SameSite=Lax`;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
};