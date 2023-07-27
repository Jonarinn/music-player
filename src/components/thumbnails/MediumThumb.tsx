import { BsPlay } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect } from "react";

type MediumThumbnailProps = {
  image: string;
  name: string;
  type: "artist" | "album";
  id: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  i: number;
};

const MediumThumbnail: React.FC<MediumThumbnailProps> = ({
  image,
  name,
  type,
  id,
  setLoading,
  i,
}) => {
  const handleLinkClick = (e: React.MouseEvent) => {
    setLoading(true);
  };

  return (
    <article className="artist__bio__container__item">
      <div className="img__container">
        <Link
          to={`/${type}/${id}`}
          onClick={handleLinkClick}
          data-to={`${type}/${id}`}
        >
          <img
            src={image}
            alt="Artist Banner"
            className={`image-${i} album-image`}
          />
        </Link>

        <div className="play__button__container">
          <button>
            <BsPlay />
          </button>
        </div>
      </div>
      <Link to={`/${type}/${id}`} data-to={`${type}/${id}`}>
        <h3 className={`heading-${i}`}>{name}</h3>
      </Link>
    </article>
  );
};

export default MediumThumbnail;
