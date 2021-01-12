export const SingleCaseItem = ({ item, link, getMetaLink, type, docId }) => {
  const handleMouseEnter = () => {
    getMetaLink(link);
  };

  return (
    <>
      {item ? (
        <div
          className="single_case_item"
          link={item.link}
          onMouseEnter={handleMouseEnter}
        >
          {type === "image" ? (
            <img className="single_case-image" src={item.link} />
          ) : type === "video" ? (
            <video className="single_case-video" src={item.link} />
          ) : null}

          <div
            className="fb-share-button"
            onMouseEnter={() => {
              console.log("Mouse down");
            }}
            data-size="large"
            data-href={`https://powerful-thicket-90466.herokuapp.com?docId=${docId}`}
          ></div>
        </div>
      ) : null}
    </>
  );
};
