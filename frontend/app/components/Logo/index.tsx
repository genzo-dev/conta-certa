import Image from "next/image";

type LogoProps = {
  mode: "auth" | "nav";
};

export default function Logo({ mode }: LogoProps) {
  return (
    <>
      {mode === "auth" && (
        <div>
          <div className="flex gap-2 items-center justify-center">
            <Image
              src="/imgs/conta-certa-logo.svg"
              alt="logo"
              width="112"
              height="112"
              priority
              className="w-14 h-14 lg:w-24 lg:h-24"
            />
            <h1 className="text-4xl lg:text-6xl">
              Conta <label className="font-bold">Certa</label>
            </h1>
          </div>
        </div>
      )}

      {mode === "nav" && (
        <div>
          <div className="flex gap-1 sm:gap-2 items-center">
            <Image
              src="/imgs/conta-certa-logo.svg"
              alt="logo"
              width="112"
              height="112"
              priority
              className="w-5 h-5 sm:w-8 sm:h-8  lg:w-12 lg:h-12"
            />
            <h1 className="text sm:text-2xl lg:text-4xl">
              Conta<label className="font-bold">Certa</label>
            </h1>
          </div>
        </div>
      )}
    </>
  );
}
