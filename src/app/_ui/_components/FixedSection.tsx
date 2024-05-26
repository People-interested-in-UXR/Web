"use client";
import { useState } from "react";
import { Icon, RegisterButton, Toast } from "../_atomics";
import { createPortal } from "react-dom";

export default function FixedSection() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="max-w-[640px] w-full fixed sm:bottom-[84px] bottom-4 flex sm:flex-col flex-col-reverse items-center sm:gap-5 gap-4 px-4">
      <Toast>
        <div>로그인 해야 글을 작성할 수 있어요!</div>
        {/* <button className="flex text-btn-default cursor-pointer">
        <div>Members 바로가기</div>
        <Icon
          src={"/icon/common/bottom_point_arrows_red.svg"}
          alt={"bottom pointer arrow"}
          className="rotate-[270deg] fill-btn-default"
          height={20}
          width={20}
        />
      </button> */}
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
              className="fixed max-w-[900px] w-3/4  bg-white z-20 left-0 right-0 mx-auto my-0 top-10"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="w-full h-full flex flex-col  items-center">
                <div>
                  <div>글 작성하기</div>
                  <div>X</div>
                </div>
                <div>
                  <div>ARCHIVE {">"} 지식 저장소</div>
                  <div>제목을 작성해주세요</div>
                  <div>
                    <div>노트테이킹</div>
                    <div>chips</div>
                    <div>불가능</div>
                  </div>
                  <div>
                    <textarea name="" id=""></textarea>
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
