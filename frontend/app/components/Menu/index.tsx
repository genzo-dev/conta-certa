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
import clsx from "clsx";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {!isOpen && (
        <button
          className={clsx(
            "absolute left-0 ml-4 sm:ml-6 md:ml-12 mt-5 border p-1 rounded-md hover:cursor-pointer",
            "hover:bg-gray-200 transition"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
      )}

      {isOpen && (
        <div
          className={clsx(
            "absolute h-full w-screen sm:w-96 z-40",
            "bg-gray-300 border-r border-gray-400"
          )}
        >
          <div className="h-full flex flex-col pt-8 px-6">
            <div className="flex justify-between items-center mb-12">
              <strong className="text-sm sm:text-base md:text-lg lg:text-xl">
                Menu
              </strong>

              <button
                className={clsx(
                  "border p-1 rounded-md hover:cursor-pointer transition",
                  "hover:bg-gray-200"
                )}
                onClick={() => setIsOpen(!isOpen)}
              >
                <XIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <MenuLink
                href="/"
                linkName="Dashboard"
                icon={CircleDollarSignIcon}
              />

              <MenuLink
                href="/categories"
                linkName="Gerenciar categorias"
                icon={ClipboardPenIcon}
              />

              <MenuLink
                href="/transactions"
                linkName="Informar transação"
                icon={ArrowLeftRightIcon}
              />

              <MenuLink
                href="/profile"
                linkName="Perfil"
                icon={CircleUserIcon}
              />
              <LogoutTestBtn />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
