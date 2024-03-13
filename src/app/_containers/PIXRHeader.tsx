import { Header, Logo } from "../_ui";
import { NAV } from "../utils/consts";

const PIXRHeader = ({}) => {
  return (
    <Header>
      <div className="flex items-center gap-4">
        <Logo theme="light" />
        <p className="h3-700-20 ">UX 리서치에 관심 있는 사람</p>
      </div>
      <div className="flex gap-16 b2-400-16 items-center">
        <div>{NAV.HOME}</div>
        <div>{NAV.ABOUT_US}</div>
        <div>{NAV.MEMBERS}</div>
        <div>{NAV.SCHEDULE}</div>
        <div>{NAV.MEETUPS}</div>
        <div>{NAV.ARCHIVE}</div>
        <div>{NAV.BOARD}</div>
        <div className="text-primary-red b2-600-16">{NAV.SIGN_UP}</div>
      </div>
    </Header>
  );
};

export default PIXRHeader;
