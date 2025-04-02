import { ButtonProps } from "./props";
import { buttonVariants } from "./variants";

export default function VButton({
  children,
  className,
  variant = "default",
  block = false,
  size = "md",
  disabled = false,
  loading = false,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={buttonVariants({ variant, block, size, className })}
      style={
        variant === "default"
          ? {
              background:
                "linear-gradient(241deg, rgba(62,178,129,1) 0%, rgba(9,126,174,1) 87%)",
            }
          : undefined
      }
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
}
