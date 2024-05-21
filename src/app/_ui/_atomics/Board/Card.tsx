import Image from "next/image";

export interface ICard {
  imageUrl?: string;
  title: string;
  author: string;
  category: string;
  description: string;
}

const Card = ({
  imageUrl = "/bg_sample.jpg",
  title,
  author,
  category,
  description,
}: ICard) => {
  return (
    <div className="bg-muted rounded-3xl shadow-md h-[360px] aspect-[4/3] flex flex-col">
      <Image
        className="h-[252px] w-full rounded-tl-3xl rounded-tr-3xl"
        src={imageUrl}
        alt={"card image"}
        width={480}
        height={252}
      />
      <div className="bg-secondary  rounded-br-3xl rounded-bl-3xl w-full ">
        <div className="h-[108px] p-6 flex flex-col gap-2 justify-center">
          <div className="flex justify-between">
            <h2 className="h3-700-20 text-title">{title}</h2>
            <div className="b2-600-16 text-sub">
              {author} · {category}
            </div>
          </div>
          <p className="text-sub b2-400-16 text-ellipsis line-clamp-1">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
