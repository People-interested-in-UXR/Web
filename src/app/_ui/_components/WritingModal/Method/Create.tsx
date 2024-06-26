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
  userInfo?: {
    name: string;
    value: string;
  };
}

const Create = ({
  breadcrumb,
  showModal,
  openModal,
  closeModal,
  database,
  userInfo,
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
    },
  });
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    }
  }, [showToast]);

  const debouncedOnChange = useCallback(
    debounce((event: ChangeEvent<HTMLTextAreaElement>) => {
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

  useEffect(() => {
    if (!showModal) return;
    localStorage.setItem(pathname, JSON.stringify(modal));
  }, [modal, pathname, showModal]);

  const handleSubmit = async () => {
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
      {showToast && (
        <Toast>
          <div>로그인 해야 글을 작성할 수 있어요!</div>
        </Toast>
      )}

      <RegisterButton
        onClick={() => {
          if (!userInfo) return setShowToast(true);
          openModal();
        }}
      >
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
                        if (prop.name === "모임 유형") {
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
                        if (prop.name === "진행 상태") {
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
                    {/* <Property
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
                          <Chip value={"가능"} active={true} key={1} />,
                          <Chip value={"불가능"} active={false} key={2} />,
                        ]}
                      /> */}
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
                      disabled={
                        modal?.content?.title?.trim() === "" ||
                        modal?.content?.text?.trim() === "" ||
                        modal?.content?.progress?.trim() === "" ||
                        modal?.content?.category?.trim() === "" ||
                        modal?.content?.date === undefined
                      }
                    >
                      완료
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document?.body,
          "create"
        )}
    </div>
  );
};

export default Create;
