export type styleType = "REGULAR" | "DANGER";
const Button = ({
  type = "button",
  onClick,
  style = "REGULAR",
  children,
}: {
  type?: "submit" | "reset" | "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  style?: styleType;
  children: React.ReactNode;
}) => {
  const stylings: { style: "REGULAR" | "DANGER"; styling: string }[] = [
    {
      style: "REGULAR",
      styling: "bg-sky-600 text-white",
    },
    {
      style: "DANGER",
      styling: "bg-red-600 text-white",
    },
  ];

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        stylings.find((s) => s.style === style)?.styling
      } px-4 py-1 rounded-md`}
    >
      {children}
    </button>
  );
};

export default Button;
