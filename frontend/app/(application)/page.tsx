import { AuthToasts } from "../components/AuthToasts";
import Nav from "../components/Nav";
import { Suspense } from "react";
import Menu from "../components/Menu";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <AuthToasts />
      </Suspense>

      <div className="flex justify-between items-center">
        <h1 className="font-extrabold text-3xl mb-4">Dashboard</h1>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1 border border-gray-500 px-3 rounded-full">
            <ChevronDownIcon size={20} /> Janeiro
          </label>

          <label className="flex items-center gap-1 border border-gray-500 px-3 rounded-full">
            <ChevronDownIcon size={20} /> 2026
          </label>
        </div>
      </div>
      <div>
        <div className="flex gap-4">
          <div className="bg-linear-to-l to-blue-600 from-blue-900 h-32 w-76 rounded-lg text-slate-300 font-bold text-xl p-4">
            <div>
              <h3 className="text-2xl">Receita:</h3> <label>R$ 10.542,00</label>
            </div>
            <Link href="#" className="text-xs">
              Verifique todas as suas receitas
            </Link>
          </div>
          <div className="bg-linear-to-l to-red-600 from-red-900 h-32 w-76 rounded-lg"></div>
          <div className="bg-linear-to-l to-green-600 from-green-900 h-32 w-76 rounded-lg"></div>
        </div>

        <div className="backdrop-blur-md bg-black/80 h-82 w-full rounded-lg mt-4"></div>
      </div>
    </>
  );
}
