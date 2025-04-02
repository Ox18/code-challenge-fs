export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "primary" | "danger";
  block?: boolean;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
};
