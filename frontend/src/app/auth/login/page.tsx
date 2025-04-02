import FormLogin from "@/features/auth/components/FormLogin";
import AuthLayout from "@/shared/layouts/AuthLayout";

export default function Login() {
  return (
    <AuthLayout>
      <div id="wilme" className="w-full flex flex-col gap-3">
        <FormLogin />
        <p className="text-end">
          Don&apos;t have an account?{" "}
          <a
            href="/auth/register"
            className="text-foreground font-semibold underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
