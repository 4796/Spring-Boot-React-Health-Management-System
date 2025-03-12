const Container = ({
  children,
  styleCssOverride,
  containerCssAdd,
}: {
  children: React.ReactNode;
  styleCssOverride?: string;
  containerCssAdd?: string;
}) => {
  return (
    <div className={styleCssOverride ? styleCssOverride : "p-4 my-8"}>
      <div
        className={`container max-w-[1000px] my-0 mx-auto ${
          containerCssAdd ? containerCssAdd : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
