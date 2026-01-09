"use client";

import { logoutAction } from "@/actions/auth/logout-action";
import { LogOutIcon } from "lucide-react";

export default function LogoutLink() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        name="logout"
        className="flex gap-2 items-center text-start font-semibold px-6 py-2 rounded-md w-full bg-red-300 hover:bg-red-400 hover:cursor-pointer transition"
      >
        <LogOutIcon size={20} /> Sair
      </button>
    </form>
  );
}
