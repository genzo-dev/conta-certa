import { CircleUserIcon } from "lucide-react";
import FormLogin from "../components/FormLogin";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import Links from "../components/Links";
import Logo from "../components/Logo";

export default function LoginPage() {
  return (
    // TODO: organizar código e css com cslx
    <section
      className={clsx(
        "flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-center h-screen px-6 lg:px-0"
      )}
    >
      <div className="flex flex-col items-center justify-center lg:w-3/5 lg:h-full lg:bg-[#6DB571]">
        <Image
          src="/money-logo.svg"
          alt="logo"
          width="577"
          height="866"
          className="hidden lg:block mb-10"
          priority
        />

        {/* TODO: transformar em logo com mode: auth | nav */}
        {/* <div className="flex gap-2 items-center justify-center">
          <Image
            src="/conta-certa-logo.svg"
            alt="logo"
            width="112"
            height="112"
            className="w-14 h-14 lg:w-24 lg:h-24"
          />
          <h1 className="text-4xl lg:text-6xl">
            Conta <label className="font-bold">Certa</label>
          </h1>
        </div> */}
        <Logo mode="auth" />
      </div>
      <div className="lg:w-2/5 lg:px-8 xl:px-12">
        <div
          className={clsx(
            "flex flex-col gap-4 items-center justify-center bg-[#D9D9D9] rounded-lg px-5 lg:px-10 py-11 lg:py-16"
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
                  "md:text-lg",
                  "lg:text-start"
                )}
              >
                Entre na sua conta, informe suas transações e veja como está
                usando seu dinheiro!
              </p>
            </div>
          </div>

          <FormLogin />

          <p>
            Não tem conta? <Links href="#" textLink="Criar conta" />
          </p>

          <Links href="#" textLink="Esqueceu a senha?" />
        </div>
      </div>
    </section>
  );
}
