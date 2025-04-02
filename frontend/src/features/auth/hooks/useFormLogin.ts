import { LoginFormSchema } from "@/features/auth/schemas";
import { useAuth } from "@/shared/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthService } from "../services/auth";
import { useRouter } from "next/navigation";
import { HTTP_STATUS_CODE } from "@/shared/constants/http";

export const useFormLogin = () => {
  const router = useRouter();
  const auth = useAuth();
  const authService = useAuthService();
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    resolver: zodResolver(LoginFormSchema),
    mode: "onChange",
  });

  const submit = methods.handleSubmit(async (data) => {
    setLoading(true);
    try {
      const { token } = await authService.login(data.email, data.password);
      auth.setToken(token);

      const user = await authService.me();
      auth.setMe(user);
      router.push("/calls");
    } catch (ex: any) {
      const status = ex?.response?.status;

      if (status === HTTP_STATUS_CODE.UNAUTHORIZED) {
        methods.setError("root", {
          type: "manual",
          message: "Credenciales inválidas",
        });
      } else {
        methods.setError("root", {
          type: "manual",
          message: "Error inesperado. Intentá de nuevo.",
        });
      }
    } finally {
      setLoading(false);
    }
  });

  const [disabledSubmit, setDisabledSubmit] = useState(false);

  useEffect(() => {
    setDisabledSubmit(!methods.formState.isValid);
  }, [methods.formState.isValid]);

  useEffect(() => {
    const subscription = methods.watch(() => {
      if (methods.formState.errors.root) {
        methods.clearErrors("root");
      }
    });

    return () => subscription.unsubscribe();
  }, [methods]);

  return {
    disabledSubmit,
    methods,
    loading,
    submit,
  };
};
