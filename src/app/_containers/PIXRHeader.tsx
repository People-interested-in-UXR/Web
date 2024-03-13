import { Header, Logo } from "../_ui";
import { HEADER } from "../utils/consts";

const PIXRHeader = ({}) => {
  return (
    <Header>
      <div className="flex items-center gap-4">
        <Logo />
        <p className="h3-700-20 ">UX 리서치에 관심 있는 사람</p>
      </div>
      <div className="flex gap-16 b2-400-16 items-center">
        <div>{HEADER.HOME}</div>
        <div>{HEADER.ABOUT_US}</div>
        <div>{HEADER.MEMBERS}</div>
        <div>{HEADER.SCHEDULE}</div>
        <div>{HEADER.MEETUPS}</div>
        <div>{HEADER.ARCHIVE}</div>
        <div>{HEADER.BOARD}</div>
        <div className="text-primary-red b2-600-16">{HEADER.SIGN_UP}</div>
      </div>
    </Header>
  );
};

export default PIXRHeader;
