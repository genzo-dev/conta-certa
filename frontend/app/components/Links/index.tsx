import Link from "next/link";

type LinksProps = {
  href: string;
  className?: string;
  textLink: string;
};

export default function Links({ href, className, textLink }: LinksProps) {
  return (
    <Link
      href={href}
      className={`underline decoration-2 decoration-green-500 hover:decoration-green-700 ${className}`}
    >
      {textLink}
    </Link>
  );
}
