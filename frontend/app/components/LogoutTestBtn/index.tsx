"use client";

import { logoutAction } from "@/actions/auth/logout-action";

export default function LogoutLink() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        name="logout"
        className="text-start font-semibold px-6 py-2 rounded-md w-full bg-red-300 hover:bg-red-400 transition"
      >
        Logout
      </button>
    </form>
  );
}
