import clsx from "clsx";
import { useId } from "react";

type InputTextProps = {
  labelText?: string;
} & React.ComponentProps<"input">;

export default function InputText({ labelText, ...props }: InputTextProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1">
      {labelText && <label htmlFor={id}>{labelText}</label>}

      <input
        {...props}
        className={clsx(
          "bg-white placeholder-[#878787] border-transparent focus:border-[#6DB571] text-black",
          "px-2 rounded-sm outline-none border-2",
          "disabled:border-2 disabled:border-gray-600 disabled:bg-gray-700 disabled:cursor-not-allowed"
        )}
        id={id}
      />
    </div>
  );
}
