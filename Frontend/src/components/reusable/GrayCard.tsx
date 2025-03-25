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
      className={`border-b-[1px] border-r-[1px] border-primary border-opacity-30 bg-primary bg-opacity-10 p-4 rounded-md ${addCssStyle}`}
    >
      <span className="font-bold">{title}</span>
      {!listMoreItems && content[0]}
      {listMoreItems && (
        <>
          <hr />
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
