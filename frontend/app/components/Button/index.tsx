type ButtonProps = {
  textButton: string;
} & React.ComponentProps<"button">;

export default function Button({ textButton, ...props }: ButtonProps) {
  return <button {...props}>{textButton}</button>;
}
