const GrayCard = ({ title, content }: { title: string; content: any[] }) => {
  const listMoreItems: boolean = content.length > 1;
  return (
    <div className="bg-neutral-100 border-[1px] border-black p-4 rounded-md my-4">
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
