import { Suspense } from "react";
import { AuthToasts } from "../AuthToasts";

type PageTemplateProps = {
  pageTitle: string;
  children: React.ReactNode;
};

export default function PageTemplate({
  pageTitle,
  children,
}: PageTemplateProps) {
  return (
    <section>
      <Suspense fallback={null}>
        <AuthToasts />
      </Suspense>

      <>
        <h1 className="font-extrabold text-3xl mb-4">{pageTitle}</h1>
        <div>{children}</div>
      </>
    </section>
  );
}
