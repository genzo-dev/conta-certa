import clsx from "clsx";

type ButtonProps = {
  textButton: string;
} & React.ComponentProps<"button">;

export default function Button({ textButton, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "py-2 rounded-sm w-full mt-2",
        "bg-[#6DB571] text-black",
        "disabled:bg-[#477149] disabled:cursor-not-allowed"
      )}
    >
      {textButton}
    </button>
  );
}
