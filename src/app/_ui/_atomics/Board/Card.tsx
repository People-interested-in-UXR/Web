import Image from "next/image";

export interface ICard {
  imageUrl?: string;
  title: string;
  author: string;
  category: string;
  description: string;
  pages: unknown;
}

const Card = (data: any) => {
  console.log(data);
  return (
    <div className="bg-muted rounded-3xl shadow-md sm:h-[360px] sm:aspect-[4/3] flex flex-col">
      <Image
        className="h-[252px] w-full rounded-tl-3xl rounded-tr-3xl"
        src={"/bg_sample.jpg"}
        alt={"card image"}
        width={480}
        height={252}
      />
      <div className="bg-secondary  rounded-br-3xl rounded-bl-3xl w-full ">
        <div className="h-[108px] p-6 flex flex-col gap-2 justify-center">
          <div className="flex justify-between">
            <h2 className="sm:h3-700-20 h4-700-16 text-title">
              {data?.properties["제목"]?.title[0]?.plain_text}
            </h2>
            <div className="sm:b2-600-16 b1-500-12 text-sub">
              {data?.author} · {data?.properties["카테고리"]?.select?.name}
            </div>
          </div>
          <p className="text-sub sm:b2-400-16 b1-400-12 text-ellipsis line-clamp-1">
            {data?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
