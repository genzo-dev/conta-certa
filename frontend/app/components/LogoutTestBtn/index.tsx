"use client";

import { logoutAction } from "@/actions/auth/logout-action";

export default function LogoutLink() {
  return (
    <form action={logoutAction}>
      <button type="submit" name="logout">
        Logout
      </button>
    </form>
  );
}
