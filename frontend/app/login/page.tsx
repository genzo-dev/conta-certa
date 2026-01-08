import { CircleUserIcon } from "lucide-react";
import FormLogin from "../components/FormLogin";
import Image from "next/image";
import clsx from "clsx";
import Links from "../components/Links";
import Logo from "../components/Logo";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <section
      className={clsx(
        "flex flex-col items-center justify-center h-screen",
        "lg:flex-row gap-4 lg:gap-0 px-6 lg:px-0"
      )}
    >
      <div
        className={clsx(
          "flex flex-col items-center justify-center",
          "lg:w-3/5 lg:h-full lg:bg-[#6DB571]"
        )}
      >
        <Image
          src="/imgs/money-logo.svg"
          alt="logo"
          width="577"
          height="866"
          className="hidden lg:block mb-10"
          priority
        />
        <Logo mode="auth" />
      </div>
      <div className="lg:w-2/5 lg:px-8 xl:px-12">
        <div
          className={clsx(
            "flex flex-col gap-4 items-center justify-center rounded-lg",
            "bg-[#D9D9D9] px-5 lg:px-10 py-11 lg:py-16"
          )}
        >
          <div className="flex flex-col gap-2 lg:gap-4 lg:mb-4">
            <div className="flex gap-2 justify-center items-center lg:justify-start">
              <CircleUserIcon className="lg:w-10 lg:h-10" />
              <h1 className="text-2xl lg:text-3xl font-semibold">Login</h1>
            </div>
            <div>
              <p
                className={clsx(
                  "text-sm text-center",
                  "sm:text-base",
                  "lg:text-start"
                )}
              >
                Entre na sua conta, informe suas transações e veja como está
                usando seu dinheiro!
              </p>
            </div>
          </div>

          <Suspense fallback={null}>
            <FormLogin />
          </Suspense>

          <p>
            Não tem conta? <Links href="/register" textLink="Criar conta" />
          </p>

          <Links href="#" textLink="Esqueceu a senha?" />
        </div>
      </div>
    </section>
  );
}
