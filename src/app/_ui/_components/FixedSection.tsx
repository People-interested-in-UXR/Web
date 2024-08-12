"use client";
import { Fragment, ReactNode, useState } from "react";
import { Icon, RegisterButton, Toast } from "../_atomics";
import { createPortal } from "react-dom";

interface IProperty {
  propKey: Array<ReactNode>;
  propValue: Array<ReactNode> | string;
}
const Property = ({ propKey, propValue }: IProperty) => {
  return (
    <div className="grid gap-16 grid-cols-2 items-center">
      <div className="flex gap-2 px-4 py-2 b1-500-20 text-muted">
        {propKey.map((key, index) => (
          <Fragment key={index}>{key}</Fragment>
        ))}
      </div>
      <div className="flex gap-4">
        {typeof propValue === "string" ? (
          <div className="b2-600-16 text-muted">{propValue}</div>
        ) : (
          propValue.map((value, index) => (
            <Fragment key={index}>{value}</Fragment>
          ))
        )}
      </div>
    </div>
  );
};

interface IChip {
  value: string;
  active: boolean;
}
const Chip = ({ value, active }: IChip) => {
  return (
    <button
      className={`${active ? "bg-icon-default text-accent " : "bg-muted text-sub hover:border-icon-default active:bg-icon-default active:text-accent"} px-2 py-1 b2-600-16 flex items-center justify-center rounded-lg border-2 border-transparent`}
    >
      {value}
    </button>
  );
};

interface IFixedSection {
  breadcrumb: string[];
}
export default function FixedSection({ breadcrumb }: IFixedSection) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="max-w-[640px] w-full sticky sm:bottom-[84px] bottom-4 flex sm:flex-col flex-col-reverse items-center sm:gap-5 gap-4 px-4">
      {/* TODO: 로그인 상태에 따른 메세지 토글 */}
      <Toast>
        <div>로그인 해야 글을 작성할 수 있어요!</div>
      </Toast>

      <RegisterButton onClick={openModal}>
        <Icon
          src={"/icon/common/pencil.svg"}
          alt={"plus icon"}
          height={24}
          width={24}
        />
        <span className="h4-600-18">글 작성하기</span>
      </RegisterButton>

      {showModal &&
        createPortal(
          <div
            className="top-0 fixed w-full h-full bg-brown-800 bg-opacity-60"
            // onClick={closeModal}
            onClick={closeModal}
          >
            {/* Modal Menu */}
            <div
              className="fixed max-w-[900px] w-3/4  bg-white z-20 left-0 right-0 mx-auto my-0 top-10 rounded-3xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="w-full h-full flex flex-col  items-center px-6">
                <div className="flex justify-between w-full py-6 h3-700-20 text-default">
                  <div></div>
                  <div>글 작성하기</div>
                  <Icon
                    src={"/icon/common/cancel.svg"}
                    alt={"cancel button"}
                    className="cursor-pointer"
                    height={14}
                    width={14}
                    onClick={closeModal}
                  />
                </div>
                <div className="px-10 py-8 w-full flex flex-col items-start">
                  <div className="b1-500-20 text-muted">
                    {breadcrumb.join(" > ")}
                  </div>
                  <div className="mt-[45px] h0-700-40 text-muted">
                    제목을 작성해주세요
                  </div>
                  <div className="flex flex-col gap-4 mt-8">
                    <Property
                      propKey={[
                        <Icon
                          src={"/icon/writingProp/note_taking.svg"}
                          alt={"writing property note_taking status icon"}
                          height={24}
                          width={24}
                          key={1}
                        />,
                        <div key={2}>노트테이킹</div>,
                      ]}
                      propValue={[
                        <Chip value={"chips"} active={true} key={1} />,
                        <Chip value={"불가능"} active={false} key={2} />,
                      ]}
                    />
                    <Property
                      propKey={[
                        <Icon
                          src={"/icon/writingProp/date.svg"}
                          alt={"writing property date icon"}
                          height={24}
                          width={24}
                          key={1}
                        />,
                        <div key={2}>날짜</div>,
                      ]}
                      propValue={["2023", "07", "12"].join(" / ")}
                    />
                    <Property
                      propKey={[
                        <Icon
                          src={"/icon/writingProp/category.svg"}
                          alt={"writing property category icon"}
                          height={24}
                          width={24}
                          key={1}
                        />,
                        <div key={2}>모임 유형</div>,
                      ]}
                      propValue={[
                        <Chip value={"chips"} active={true} key={1} />,
                        <Chip value={"북스터디"} active={false} key={2} />,
                        <Chip value={"토론"} active={false} key={3} />,
                        <Chip value={"추천"} active={false} key={4} />,
                      ]}
                    />
                    <Property
                      propKey={[
                        <Icon
                          src={"/icon/writingProp/progress.svg"}
                          alt={"writing property progress icon"}
                          height={24}
                          width={24}
                          key={1}
                        />,
                        <div key={2}>진행 상태</div>,
                      ]}
                      propValue={[
                        <Chip value={"진행예정"} active={false} key={1} />,
                        <Chip value={"진행중"} active={true} key={2} />,
                        <Chip value={"완료"} active={false} key={3} />,
                      ]}
                    />
                  </div>
                  <div className="w-full mt-[45px] h-[340px]">
                    <textarea
                      name=""
                      id=""
                      className="p-6 rounded-3xl bg-default w-full outline-none b1-400-20 text-sub h-full"
                    ></textarea>
                  </div>
                  <div>
                    <button>완료</button>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
