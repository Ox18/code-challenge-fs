import { useRouter } from "next/navigation";

export const useMenu = () => {
  const router = useRouter();

  const to = (path: string) => {
    router.push(path);
  };

  return {
    to,
  };
};
