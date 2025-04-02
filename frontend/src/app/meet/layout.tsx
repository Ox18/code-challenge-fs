import Image from "next/image";
import CovertAuth from "@/assets/images/cover-auth.png";
import CenteredCovert from "@/assets/images/centered-cover.png";
import VContainer from "@/shared/components/ui/container/VContainer";
import Logo from "@/shared/components/logo/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen  grid grid-cols-2 max-lg:flex max-lg:flex-col ">
      <VContainer className="h-full">
        <div className="py-10 px-20 flex flex-col gap-50 justify-start items-start  w-full max-md:px-5">
          <div className="w-full max-lg:flex max-lg:justify-center max-lg:pt-10">
            <Logo className="w-40" />
          </div>
          {children}
        </div>
      </VContainer>
      <VContainer className="bg-[#3db183] max-lg:hidden">
        <div className="h-full flex flex-col justify-between select-none">
          <div className="flex justify-end">
            <Image src={CovertAuth} alt="cover" className="w-[220px]" />
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col gap-3 w-90 justify-center items-center">
              <Image src={CenteredCovert} alt="cover" className="w-[520px]" />
              <h3 className="text-3xl font-bold text-center text-[#fff] max-md:text-2xl">
                Very simple and very easy to use
              </h3>
              <p className="text-[#fff] text-center max-md:text-sm">
                The voice call platform is the easiest and fastest to use
              </p>
            </div>
          </div>
          <div>
            <Image
              src={CovertAuth}
              alt="cover"
              className="rotate-180 w-[220px]"
            />
          </div>
        </div>
      </VContainer>
    </div>
  );
}
