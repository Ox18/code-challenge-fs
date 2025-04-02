import Image from "next/image";
import logo from "@/assets/images/logo.png";

export default function Logo({ ...props }: { [key: string]: any }) {
  return <Image src={logo} alt="logo" {...props} />;
}
