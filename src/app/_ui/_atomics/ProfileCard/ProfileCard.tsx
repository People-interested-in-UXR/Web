import Image from "next/image";
import { Icon } from "../Icon";

export interface IProfileCard {
  name: string;
  job: string;
  introduce: string;
}

const ProfileCard = ({ name, job, introduce }: IProfileCard) => (
  <div className="relative w-[380px] h-[460px] bg-secondary p-2 rounded-3xl flex flex-col items-center drop-shadow-lg">
    <div className="absolute z-10 right-4 top-6 grid grid-cols-1 gap-4">
      <Icon
        src={"/icon/common/email.svg"}
        alt={"email icon"}
        height={36}
        width={36}
      />
      <Icon
        src={"/icon/common/sns.svg"}
        alt={"sns icon"}
        height={36}
        width={36}
      />
    </div>
    <Image
      src={"/sample.png"}
      alt={"profile image"}
      width={364}
      height={320}
      className="rounded-3xl"
    />
    <div className="p-4 text-sub w-full">
      <div className="flex gap-2 mt-2">
        <span className="h3-700-20 text-title">{name}</span>
        <span className="b2-600-16 ">{job}</span>
      </div>
      <div className="flex text-[8px] mt-2">
        <div className="b2-400-16  w-full break-words line-clamp-2 text-sub">
          {introduce}
        </div>
      </div>
    </div>
  </div>
);

export default ProfileCard;
