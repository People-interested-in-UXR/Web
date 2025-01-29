"use client";
import Image from "next/image";
import { Icon } from "../../../../_ui/_atomics/Icon";
import { User } from "@/app/utils/types/user/user";

const ProfileCard = ({
  email,
  introduce,
  name,
  position,
  profile,
  secondary_email,
  sns,
  onClick = () => {},
}: User) => {
  return (
    <div className="relative w-[380px] h-[460px] bg-secondary p-2 rounded-3xl flex flex-col items-center drop-shadow-lg mt-10">
      <div className="absolute z-10 right-4 top-6 grid grid-cols-1 gap-4">
        {secondary_email && (
          <Icon
            src={"/icon/common/email.svg"}
            alt={"email icon"}
            height={36}
            width={36}
            className="cursor-pointer"
            onClick={() => {
              onClick("email");
              navigator.clipboard.writeText(secondary_email);
            }}
          />
        )}
        {sns && (
          <Icon
            src={"/icon/common/sns.svg"}
            alt={"sns icon"}
            height={36}
            width={36}
            className="cursor-pointer"
            onClick={() => {
              onClick("sns");
              navigator.clipboard.writeText(sns);
            }}
          />
        )}
      </div>
      {profile ? (
        <div className="relative w-[364px] h-[320px] rounded-2xl">
          <Image
            src={profile}
            alt={"profile image"}
            fill
            className="rounded-2xl object-cover "
            sizes="100%"
            loading="lazy"
          />
        </div>
      ) : (
        <Image
          src={"/sample.png"}
          alt={"profile image"}
          width={364}
          height={320}
          className="rounded-3xl"
          style={{ width: "364px", height: "320px" }}
          loading="lazy"
        />
      )}
      <div className="p-4 text-sub w-full">
        <div className="flex gap-2 mt-2">
          <span className="h3-700-20 text-title">{name ? name : "홍길동"}</span>
          <span className="b2-600-16 flex items-center ">
            {position ? position : "UX Researcher"}
          </span>
        </div>
        <div className="flex text-[8px] mt-2">
          <div className="b2-400-16  w-full break-words line-clamp-2 text-sub">
            {introduce ? introduce : `PIXR에 오신 것을 환영합니다!`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
