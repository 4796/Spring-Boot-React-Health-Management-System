const GrayCard = ({
  title,
  content,
  addCssStyle = "",
}: {
  title: string;
  content: any[];
  addCssStyle?: string;
}) => {
  const listMoreItems: boolean = content.length > 1;
  return (
    <div
      className={`bg-neutral-100 border-[1px] border-black p-4 rounded-md ${addCssStyle}`}
    >
      <span className="font-bold">{title}</span>
      {!listMoreItems && content[0]}
      {listMoreItems && (
        <>
          <hr className="border-black" />
          <div>
            {content?.map((element, index) => (
              <div className="indent-4" key={index}>
                {element}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GrayCard;
