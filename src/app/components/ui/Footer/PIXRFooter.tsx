import Link from "next/link";

import { NAV } from "../../../utils/consts";
import Footer from "./Footer";
import { Logo } from "../Logo/Logo";
import { Icon } from "../Icon/Icon";

export default function PIXRFooter({}) {
  return (
    <Footer>
      <div className="flex flex-col justify-between gap-[65px]">
        <Logo theme="dark" />
        <div className="flex gap-10">
          <Link href={"https://open.kakao.com/o/gVEK8SXc"} target="_blank">
            <Icon
              width={32}
              height={32}
              src={`/icon/sns/kakao/kakao_talk.svg`}
              alt={"카카오톡 아이콘"}
              style={{ width: "32px", height: "32px" }}
            />
          </Link>
          <Link href={"https://discord.gg/RH7p5PbM"} target="_blank">
            <Icon
              width={32}
              height={32}
              src={`/icon/sns/discord.svg`}
              alt={"디스코드 아이콘"}
              style={{ width: 32, height: 32 }}
            />
          </Link>
          <Link
            href={
              "https://www.notion.so/pyoux/UX-Research-7e2710f0dd1140fc8680381d139b2fe8"
            }
            target="_blank"
          >
            <Icon
              width={32}
              height={32}
              src={`/icon/sns/notion.svg`}
              alt={"노션 아이콘"}
            />
          </Link>
          <Link
            href={"https://www.linkedin.com/groups/14110093/"}
            target="_blank"
          >
            <Icon
              width={32}
              height={32}
              src={`/icon/sns/linkedIn.svg`}
              alt={"링크드인 아이콘"}
            />
          </Link>
        </div>
      </div>
      <div className="flex gap-16 text-muted b2-400-16">
        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}${NAV.URL.HOME}`}>
          {NAV.HOME}
        </Link>
        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}${NAV.URL.ABOUT_US}`}>
          {NAV.ABOUT_US}
        </Link>
        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}${NAV.URL.MEMBERS}`}>
          {NAV.MEMBERS}
        </Link>
        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}${NAV.URL.MEMBERS}`}>
          {NAV.SCHEDULE}
        </Link>
        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}${NAV.URL.MEMBERS}`}>
          {NAV.MEETUPS}
        </Link>

        <div className="flex flex-col gap-4">
          <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}${NAV.URL.ARCHIVE}`}>
            {NAV.ARCHIVE}
          </Link>
          <div>스터디</div>
          <div>추천/책사이트</div>
        </div>
        <div className="flex flex-col gap-4">
          <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}${NAV.URL.BOARD}`}>
            {NAV.BOARD}
          </Link>
          <div>공지</div>
          <div>자유 게시판</div>
          <div>의견 남기기</div>
        </div>
      </div>
    </Footer>
  );
}
