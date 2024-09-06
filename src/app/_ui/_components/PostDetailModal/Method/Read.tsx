import {
  Icon,
  Property,
  PropertyChip,
  RegisterButton,
  Toast,
} from "@/app/_ui/_atomics";
import debounce from "@/app/utils/debounce";
import { IDatabase } from "@/app/utils/types/notion/database";
import { usePathname, useRouter } from "next/navigation";

import { ChangeEvent, Fragment, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ICreate {
  breadcrumb: Array<string>;
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  database: IDatabase;
}

const Read = ({
  breadcrumb,
  showModal,
  openModal,
  closeModal,
  database,
}: ICreate) => {
  const [_, pathname] = usePathname().split("/");
  const router = useRouter();

  const [modal, setModal] = useState({
    page: pathname,
    content: {
      title: "",
      progress: "",
      date: new Date(),
      category: "",
      text: "",
      cover: "",
    },
  });

  const debouncedOnChange = useCallback(
    debounce((event) => {
      setModal((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          text: event.target.value,
        },
      }));
    }, 100),
    []
  );

  useEffect(() => {
    if (!window.document) return;

    const storedModal = localStorage.getItem(pathname);
    if (storedModal && showModal) {
      const json = JSON.parse(storedModal);
      setModal(json);

      const {
        content: { title, text, date },
      } = json;
      const domTitle = document.getElementById("title") as HTMLInputElement;
      domTitle.value = title;
      const domTextarea = document.getElementById(
        "textarea"
      ) as HTMLTextAreaElement;
      domTextarea.value = text;
      const domDate = document.getElementById("date") as HTMLDataElement;
      domDate.value = date.split("T")[0];
    }
  }, [pathname, showModal]);

  // TODO: 로컬스토리지에 저장
  useEffect(() => {
    if (!showModal) return;
    localStorage.setItem(pathname, JSON.stringify(modal));
  }, [modal, pathname, showModal]);

  const handleSubmit = async () => {
    /**
     * TODO: 서버로 데이터 전송
     * 1. 서버로 데이터를 전송하고, 성공적으로 전송되었을 때
     * 2. 로컬스토리지에 저장된 데이터를 삭제한다.
     */

    const { ok } = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/notion/board/${database.id}`,
      { method: "POST", body: JSON.stringify(modal) }
    );

    if (!ok) return alert("에러가 발생했습니다! 나중에 시도해주세요!");

    closeModal();
    localStorage.removeItem(pathname);
    router.refresh();
  };

  return (
    <div className="max-w-[640px] w-full fixed sm:bottom-[40px] bottom-4 flex sm:flex-col flex-col-reverse items-center sm:gap-5 gap-4 px-4">
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
          style={{ width: 24, height: 24 }}
        />
        <span className="h4-600-18">글 작성하기</span>
      </RegisterButton>

      {showModal &&
        createPortal(
          <div
            className="top-0 fixed w-full h-full bg-brown-800 bg-opacity-60 z-10"
            onClick={closeModal}
          >
            {/* Modal Menu */}
            <div
              className="fixed max-w-[900px] sm:w-3/4 w-10/12 bg-white z-20 left-0 right-0 mx-auto my-0 top-32  rounded-3xl overflow-y-auto h-3/4 scrollbar-hide overflow-x-hidden"
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
                <div className="sm:px-10 px-4 py-8 w-full flex flex-col items-start ">
                  <div className="b1-500-20 text-muted">
                    {breadcrumb.join(" > ")}
                  </div>
                  <input
                    id="title"
                    type="text"
                    className="mt-[45px] h0-700-40 placeholder:text-muted text-title outline-1 outline-zinc-500 w-full"
                    placeholder="제목을 작성해주세요"
                    maxLength={30}
                    onChange={(event) =>
                      setModal((prev) => ({
                        ...prev,
                        content: {
                          ...prev.content,
                          title: event.target.value,
                        },
                      }))
                    }
                  />

                  <div className="flex flex-col gap-4 mt-8">
                    {database?.props.map((prop, index) => {
                      if (prop.type === "title") return;
                      if (prop.type === "select") {
                        if (prop.name === "모임유형") {
                          return (
                            <Fragment key={index}>
                              <Property
                                propKey={[
                                  <Icon
                                    src={"/icon/writingProp/category.svg"}
                                    alt={"writing property category icon"}
                                    height={24}
                                    width={24}
                                    key={index}
                                  />,
                                  <div key={index}>{prop.name}</div>,
                                ]}
                                propValue={prop.select.options?.map(
                                  (option) => (
                                    <PropertyChip
                                      key={option.id}
                                      type={prop.name}
                                      value={option.name}
                                      setModal={setModal}
                                      active={
                                        modal.content.category === option.name
                                      }
                                    />
                                  )
                                )}
                              />
                            </Fragment>
                          );
                        }
                        if (prop.name === "진행여부") {
                          return (
                            <Fragment key={index}>
                              <Property
                                propKey={[
                                  <Icon
                                    src={"/icon/writingProp/progress.svg"}
                                    alt={"writing property progress icon"}
                                    height={24}
                                    width={24}
                                    key={index}
                                  />,
                                  <div key={index}>{prop.name}</div>,
                                ]}
                                propValue={prop.select.options?.map(
                                  (option) => (
                                    <PropertyChip
                                      key={option.id}
                                      type={prop.name}
                                      value={option.name}
                                      setModal={setModal}
                                      active={
                                        modal.content.progress === option.name
                                      }
                                    />
                                  )
                                )}
                              />
                            </Fragment>
                          );
                        }
                      }
                      if (prop.type === "date") {
                        return (
                          <Fragment key={index}>
                            <Property
                              propKey={[
                                <Icon
                                  src={"/icon/writingProp/date.svg"}
                                  alt={"writing property date icon"}
                                  height={24}
                                  width={24}
                                  key={index}
                                />,
                                <div key={index}>날짜</div>,
                              ]}
                              propValue={[
                                <input
                                  id="date"
                                  key={index}
                                  type="date"
                                  className="outline-1 outline-zinc-500"
                                  onChange={(event) =>
                                    setModal((prev) => ({
                                      ...prev,
                                      content: {
                                        ...prev.content,
                                        date: new Date(event.target.value),
                                      },
                                    }))
                                  }
                                />,
                              ]}
                            />
                          </Fragment>
                        );
                      }
                    })}
                  </div>
                  <div className="w-full mt-[45px] h-[340px]">
                    <textarea
                      name=""
                      id="textarea"
                      className="p-6 rounded-3xl bg-default w-full outline-none b1-400-20 text-sub h-full"
                      placeholder="내용을 작성해주세요"
                      onChange={debouncedOnChange}
                    />
                  </div>
                  <div className="flex justify-center w-full mt-8">
                    <button
                      className="disabled:bg-btn-disabled disabled:text-muted rounded-2xl h4-600-18 px-10 py-4 cursor-pointer text-white bg-primary-red"
                      onClick={handleSubmit}
                    >
                      완료
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document?.body
        )}
    </div>
  );
};

export default Read;
