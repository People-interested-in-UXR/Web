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
    HOME: "/home",
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

export const NOTION: {
  DATABASE_ID: {
    BOARD: string;
    ARCHIVE: string;
    MEET_UP: string;
    MEMBER: string;
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
} = {
  DATABASE_ID: {
    BOARD: "d45fa5365c054b549d0a56b9a4ed5070",
    ARCHIVE: "adeb1a098e544852ad96e6d7380a98f4",
    MEET_UP: "d45fa5365c054b549d0a56b9a4ed5070",
    MEMBER: "d45fa5365c054b549d0a56b9a4ed5070",
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
