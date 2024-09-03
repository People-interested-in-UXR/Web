import { User } from "@/app/utils/types/user/user";
import { Icon } from "../Icon";
import { Property, PropertyChip } from "../Propperty";
import { ChangeEvent, Fragment, useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import debounce from "@/app/utils/debounce";
import Image from "next/image";
interface IPostCardModal {
  mode: "create" | "edit" | "read";
  breadcrumb: string[];
  database: any;
  page: any;
  closeModal: () => void;
  loggedInUser?: User;
}
const PostCardModal = ({
  mode,
  closeModal,
  database,
  breadcrumb,
  page,
  loggedInUser,
}: IPostCardModal) => {
  const pathname = usePathname().replace("/", "");

  // 여기서 선택권은 페이지 prop을 다시 요청한다 안한다 ?????

  const pageTextParser = (page: any) => {
    return page?.contents.map((content: any) =>
      content?.paragraph?.rich_text
        ?.map((block: any) => block?.text?.content)
        .join("\r\n")
    );
  };
  console.log(pageTextParser(page));

  const router = useRouter();
  const [modal, setModal] = useState({
    content: {
      title: page?.properties?.["제목"]?.title[0]?.plain_text || "",
      progress: page?.properties?.["진행여부"]?.select?.name || "",
      date: new Date(page?.properties?.["날짜"]?.date?.start) || new Date(),
      category: page?.properties?.["모임유형"]?.select?.name || "",
      text: pageTextParser(page) || "",
      // cover는 이미지를 업로드한 이후 supabase url 값을 저장
      cover: page?.cover?.external?.url || "",
    },
  });
  const [file, setFile] = useState<File | null>(
    page?.cover?.external?.url || null
  );

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

  //* Submit
  const handleSubmit = async () => {
    if (!file) return alert("커버를 업로드 해주세요.");
    if (page?.cover?.external?.url !== file) {
      const image = new FormData();
      image.append("cover", file, file?.name);

      const { publicUrl } = await (
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/s3/notion/cover`, {
          method: "POST",
          cache: "no-cache",
          body: image,
        })
      ).json();

      setModal((prev) => ({
        ...prev,
        content: { ...prev.content, cover: publicUrl },
      }));
    }

    const { ok } = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/notion/page/${page?.id}?block_id=${page?.contents[0]?.id}`,
      { method: "PATCH", body: JSON.stringify({ modal }) }
    );

    if (!ok) return alert("에러가 발생했습니다! 나중에 시도해주세요!");

    setModal({
      content: {
        title: "",
        progress: "",
        date: new Date(),
        category: "",
        text: "",
        cover: "",
      },
    });
    setFile(null);
    closeModal();

    router.refresh();
  };

  return (
    <div
      className="top-0 fixed w-full h-full bg-brown-800 bg-opacity-60"
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
            <div></div>
            <Icon
              src={"/icon/common/cancel.svg"}
              alt={"cancel button"}
              className="cursor-pointer"
              height={14}
              width={14}
              onClick={closeModal}
            />
          </div>

          {mode === "read" && (
            <>
              <div className="sm:px-10 px-4 py-8 w-full flex flex-col items-start ">
                <div className="b1-500-20 text-muted">
                  {breadcrumb.join(" > ")}
                </div>
                <h1 className="mt-[45px] h0-700-40 placeholder:text-muted text-title outline-1 outline-zinc-500 w-full">
                  {page?.properties?.["제목"]
                    ? page?.properties?.["제목"]?.title[0]?.plain_text
                    : page?.properties?.["주제"]?.title[0]?.plain_text}
                </h1>

                <div className="flex flex-col gap-4 mt-8">
                  {Object.keys(page?.properties).map(
                    (propKey: any, index: any) => {
                      if (propKey === "모임유형") {
                        return (
                          <div key={page?.id + "categoryKey"}>
                            <Property
                              propKey={[
                                <Icon
                                  src={"/icon/writingProp/category.svg"}
                                  alt={"writing property category icon"}
                                  height={24}
                                  width={24}
                                  key={page.id + "categoryIcon"}
                                />,
                                <div key={propKey + "categoryPropKey"}>
                                  {propKey}
                                </div>,
                              ]}
                              propValue={[
                                <button
                                  key={
                                    page?.properties["모임유형"]?.id +
                                    "category"
                                  }
                                  className={`${"bg-icon-default text-accent "} px-2 py-1 sm:b2-600-16 b3-600-14 flex items-center justify-center rounded-lg border-2 border-transparent`}
                                >
                                  {page?.properties["모임유형"]?.select?.name ||
                                    "없음"}
                                </button>,
                              ]}
                            />
                          </div>
                        );
                      }
                      if (propKey === "진행여부") {
                        return (
                          <div key={page?.id + "progressKey"}>
                            <Property
                              propKey={[
                                <Icon
                                  src={"/icon/writingProp/progress.svg"}
                                  alt={"writing property progress icon"}
                                  height={24}
                                  width={24}
                                  key={page.id + "progressIcon"}
                                />,
                                <div key={propKey + "progressKey"}>
                                  {propKey}
                                </div>,
                              ]}
                              propValue={[
                                <button
                                  key={
                                    page?.properties["진행여부"].id + "progress"
                                  }
                                  className={`${"bg-icon-default text-accent "} px-2 py-1 sm:b2-600-16 b3-600-14 flex items-center justify-center rounded-lg border-2 border-transparent`}
                                >
                                  {page?.properties?.["진행여부"]?.select
                                    ?.name ||
                                    page?.properties?.["진행여부"]?.status
                                      ?.name ||
                                    "대기"}
                                </button>,
                              ]}
                            />
                          </div>
                        );
                      }
                      if (propKey === "날짜") {
                        return (
                          <div key={page?.id + "dateKey"}>
                            <Property
                              propKey={[
                                <Icon
                                  src={"/icon/writingProp/date.svg"}
                                  alt={"writing property date icon"}
                                  height={24}
                                  width={24}
                                  key={page.id + "icon"}
                                />,
                                <div key={page.id + "text"}>날짜</div>,
                              ]}
                              propValue={[
                                <div
                                  id={page?.properties["날짜"]?.id}
                                  key={page?.properties["날짜"]?.id}
                                  className="outline-1 outline-zinc-500 flex items-center"
                                >
                                  {page?.properties["날짜"]?.date?.start ||
                                    "미정"}
                                </div>,
                              ]}
                            />
                          </div>
                        );
                      }
                    }
                  )}
                </div>
              </div>
              <div className="w-full my-[45px] h-full ">
                <div className="p-6 rounded-3xl bg-default w-full outline-none b1-400-20 text-sub h-full text-pretty break-words">
                  {pageTextParser(page)}
                </div>
              </div>
            </>
          )}
          {mode === "edit" && (
            <>
              <div className=" py-8 w-full flex flex-col items-start grow-0">
                <div className="b1-500-20 text-muted">
                  {breadcrumb.join(" > ")}
                </div>
                <input
                  id="title"
                  type="text"
                  className="mt-[45px] h0-700-40 placeholder:text-muted text-title outline-1 outline-zinc-500 w-full"
                  placeholder="제목을 작성해주세요"
                  maxLength={30}
                  value={modal?.content?.title}
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

                <div className="flex flex-col gap-4 mt-8 grow-0">
                  {database?.props?.map((prop, index) => {
                    if (prop.type === "title") return;
                    if (prop.type === "select") {
                      if (prop.name === "모임유형") {
                        return (
                          <Fragment key={index + "categoryKey"}>
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
                                (option: any) => (
                                  <PropertyChip
                                    key={option.id + "chip_option"}
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
                                (option: any) => (
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
                                value={
                                  modal?.content?.date
                                    ?.toISOString()
                                    .split("T")[0]
                                }
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

                  <Property
                    propKey={[
                      <div
                        className="flex gap-2 justify-start items-start"
                        key={"cover_key"}
                      >
                        <Icon
                          src={"/icon/writingProp/cover.svg"}
                          alt={"writing property date icon"}
                          height={24}
                          width={24}
                        />
                        <div>커버 이미지</div>
                      </div>,
                    ]}
                    propValue={[
                      <div className={""} key={"cover_value"}>
                        {file ? (
                          <div className="w-[480px] h-[252px] relative border-primary-red border-[3px] ">
                            <div className="absolute top-0 left-0 h-6 w-11 text-white bg-primary-red flex justify-center items-center">
                              커버
                            </div>

                            <Image
                              src={
                                typeof file === "string"
                                  ? file
                                  : URL.createObjectURL(file)
                              }
                              className="w-full h-full object-cover p-1"
                              alt={""}
                              width={480}
                              height={252}
                            />

                            <Image
                              className="absolute right-0 top-0"
                              src={"/icon/common/ic_close.svg"}
                              alt={""}
                              width={24}
                              height={24}
                              onClick={(event) => {
                                event.preventDefault();
                                setFile(null);
                              }}
                            />
                          </div>
                        ) : (
                          <label
                            htmlFor="photo"
                            className={"b2-600-16 text-sub cursor-pointer"}
                          >
                            + 사진 추가
                          </label>
                        )}

                        <input
                          type="file"
                          id="photo"
                          className="hidden"
                          onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            if (!event.target.files || !event.target.files[0])
                              return;
                            const file = event.target.files[0];

                            setFile(file);
                          }}
                        />
                      </div>,
                    ]}
                  />

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
              </div>
              <div className="w-full mt-2 h-full grow">
                <textarea
                  name=""
                  id="textarea"
                  defaultValue={modal?.content?.text}
                  className="p-6 rounded-3xl bg-default w-full outline-none b1-400-20 text-sub min-h-full "
                  placeholder="내용을 작성해주세요"
                  onChange={debouncedOnChange}
                />
              </div>
              <div className="flex justify-center w-full py-10">
                <button
                  className="disabled:bg-btn-disabled disabled:text-muted rounded-2xl h4-600-18 px-10 py-4 cursor-pointer text-white bg-primary-red"
                  onClick={handleSubmit}
                  disabled={
                    modal?.content?.title?.trim() === "" ||
                    modal?.content?.text === "" ||
                    modal?.content?.progress?.trim() === "" ||
                    modal?.content?.category?.trim() === "" ||
                    modal?.content?.date === undefined
                  }
                >
                  수정하기
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCardModal;
