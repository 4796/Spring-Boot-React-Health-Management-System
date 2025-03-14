export type styleType = "REGULAR" | "DANGER" | "DANGER_OUTLINE";
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
  const stylings: {
    style: styleType;
    styling: string;
  }[] = [
    {
      style: "REGULAR",
      styling: "bg-sky-600 text-white",
    },
    {
      style: "DANGER",
      styling: "bg-red-600 text-white",
    },
    {
      style: "DANGER_OUTLINE",
      styling: "bg-inherit text-red-600 border-2 border-red-600 ",
    },
  ];

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        stylings.find((s) => s.style === style)?.styling
      } px-4 py-1 rounded-md font-semibold`}
    >
      {children}
    </button>
  );
};

export default Button;
