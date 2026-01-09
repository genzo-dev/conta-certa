"use client";

import {
  ArrowLeftRightIcon,
  CircleDollarSignIcon,
  CircleUserIcon,
  ClipboardPenIcon,
  DollarSignIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import LogoutTestBtn from "../LogoutTestBtn";
import Link from "next/link";
import MenuLink from "../MenuLink";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {!isOpen && (
        <button
          className="ml-4 sm:ml-6 md:ml-12 mt-5 border p-1 rounded-md hover:cursor-pointer hover:bg-green-200 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon />
        </button>
      )}

      {isOpen && (
        <div className="h-screen w-1/4 bg-gray-300 border-r border-gray-400">
          <div className="h-full flex flex-col pt-8 px-6">
            <div className="flex justify-between items-center  mb-12">
              <strong className="text-sm sm:text-base md:text-lg lg:text-xl">
                Menu
              </strong>

              <button
                className="border p-1 rounded-md hover:cursor-pointer hover:bg-red-200 transition"
                onClick={() => setIsOpen(!isOpen)}
              >
                <XIcon />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <MenuLink
                href="/"
                linkName="Dashboard"
                icon={CircleDollarSignIcon}
              />

              <MenuLink
                href="/"
                linkName="Gerenciar categorias"
                icon={ClipboardPenIcon}
              />

              <MenuLink
                href="/"
                linkName="Informar transação"
                icon={ArrowLeftRightIcon}
              />

              <MenuLink href="/" linkName="Perfil" icon={CircleUserIcon} />
              <LogoutTestBtn />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
