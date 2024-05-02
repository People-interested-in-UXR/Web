import Link from "next/link";
import { Footer, Icon, Logo } from "../_ui";
import { NAV } from "../utils/consts";

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
            />
          </Link>
          <Link href={"https://discord.gg/RH7p5PbM"} target="_blank">
            <Icon
              width={32}
              height={32}
              src={`/icon/sns/discord.svg`}
              alt={"디스코드 아이콘"}
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
              src={`/icon/sns/LinkedIn.svg`}
              alt={"링크드인 아이콘"}
            />
          </Link>
        </div>
      </div>
      <div className="flex gap-16 text-muted b2-400-16">
        <div>{NAV.HOME}</div>
        <div>{NAV.ABOUT_US}</div>
        <div>{NAV.MEMBERS}</div>
        <div className="flex flex-col gap-4">
          <div>{NAV.ARCHIVE}</div>
          <div>스터디</div>
          <div>모임 일정</div>
          <div>추천/책사이트</div>
        </div>
        <div className="flex flex-col gap-4">
          <div>{NAV.BOARD}</div>
          <div>공지</div>
          <div>자유 게시판</div>
          <div>의견 남기기</div>
        </div>
        <div className="b2-600-16 text-primary-red">{NAV.SIGN_UP}</div>
      </div>
    </Footer>
  );
}
