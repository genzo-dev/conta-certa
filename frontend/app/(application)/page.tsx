import { AuthToasts } from "../components/AuthToasts";
import Nav from "../components/Nav";
import { Suspense } from "react";
import Menu from "../components/Menu";

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <AuthToasts />
      </Suspense>
    </>
  );
}
