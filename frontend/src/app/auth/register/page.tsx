import FormRegister from "@/features/auth/components/FormRegister";
import AuthLayout from "@/shared/layouts/AuthLayout";

export default function Login() {
  return (
    <AuthLayout>
      <div className="w-full flex flex-col gap-3">
        <FormRegister />
        <p className="text-end">
          You already have an account?{" "}
          <a
            href="/auth/login"
            className="text-foreground font-semibold underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
