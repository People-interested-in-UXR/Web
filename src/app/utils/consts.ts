export const NAV = {
  HOME: "홈",
  ABOUT_US: "모임 소개",
  MEMBERS: "맴버 소개",
  SCHEDULE: "모임 일정",
  MEETUPS: "오프라인 모임",
  ARCHIVE: "아카이브",
  BOARD: "게시판",
  PROFILE: "프로필",
  SIGN_UP: "로그인",
  SIGN_OUT: "로그아웃",

  HEADER_HEIGHT: "95px",

  URL: {
    HOME: "/",
    ABOUT_US: "/about-us",
    MEMBERS: "/member",
    SCHEDULE: "/schedule",
    MEETUPS: "/meet-up",
    ARCHIVE: "/archive",
    BOARD: "/board",
    SIGN_UP: "/sign-up",
    // SIGN_OUT: "/",
  },
};
export type MemberCategory =
  | "전체"
  | "UX Researcher"
  | "Product Designer"
  | "PO/PM"
  | "Data Analyst"
  | "Developer"
  | "Maketer"
  | "Student"
  | "기타";
export const POSITIONS: Array<MemberCategory> = [
  "UX Researcher",
  "Product Designer",
  "PO/PM",
  "Data Analyst",
  "Developer",
  "Maketer",
  "Student",
  "기타",
];

export const COOKIE = {
  USER: "_ui",
  GOOGLE: "_gt",
  KAKAO: "_kt",
};

export const TOAST = {
  MESSAGE: {
    EMAIL: "이메일",
    SNS: "SNS계정",
  },
  EMAIL: "email",
  SNS: "sns",
};

export type ToastMessageType = "email" | "sns" | "";
// TODO: Record<string, string> 타입으로 변경
export type Chips = "전체";

interface INotion {
  DATABASE_ID: {
    BOARD: string;
    ARCHIVE: string;
    MEET_UP: string;
    SCHEDULE: string;
  };
  KEY: {
    BOARD: "board";
    ARCHIVE: "archive";
    MEET_UP: "meet-up";
    MEMBER: "member";
  };
  VALUE: {
    BOARD: "자유 게시판";
    ARCHIVE: "아카이브";
    MEET_UP: "모임 일정";
    MEMBER: "맴버 소개";
  };
}

export const NOTION: INotion = {
  DATABASE_ID: {
    BOARD: "d45fa5365c054b549d0a56b9a4ed5070",
    ARCHIVE: "2a3a7fdc75d64c4d8251c09354cd572d",
    MEET_UP: "2a3a7fdc75d64c4d8251c09354cd572d",
    SCHEDULE: "2a3a7fdc75d64c4d8251c09354cd572d",
  },
  KEY: {
    BOARD: "board",
    ARCHIVE: "archive",
    MEET_UP: "meet-up",
    MEMBER: "member",
  },
  VALUE: {
    BOARD: "자유 게시판",
    ARCHIVE: "아카이브",
    MEET_UP: "모임 일정",
    MEMBER: "맴버 소개",
  },
};
