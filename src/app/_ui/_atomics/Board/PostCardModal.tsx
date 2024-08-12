import { Icon } from "../Icon";
import { Property } from "../Propperty";
interface IPostCardModal {
  breadcrumb: string[];
  page: any;
  closeModal: () => void;
}
const PostCardModal = ({ closeModal, breadcrumb, page }: IPostCardModal) => {
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
          <div className="sm:px-10 px-4 py-8 w-full flex flex-col items-start ">
            <div className="b1-500-20 text-muted">{breadcrumb.join(" > ")}</div>
            <h1 className="mt-[45px] h0-700-40 placeholder:text-muted text-title outline-1 outline-zinc-500 w-full">
              {page?.properties["제목"]?.title[0]?.plain_text}
            </h1>

            <div className="flex flex-col gap-4 mt-8">
              {Object.keys(page?.properties).map((propKey: any, index: any) => {
                if (propKey === "모임 유형") {
                  return (
                    <>
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
                            key={page?.properties["모임 유형"]?.id + "category"}
                            className={`${"bg-icon-default text-accent "} px-2 py-1 sm:b2-600-16 b3-600-14 flex items-center justify-center rounded-lg border-2 border-transparent`}
                          >
                            {page?.properties["모임 유형"]?.select?.name ||
                              "없음"}
                          </button>,
                        ]}
                      />
                    </>
                  );
                }
                if (propKey === "진행 상태") {
                  return (
                    <>
                      <Property
                        propKey={[
                          <Icon
                            src={"/icon/writingProp/progress.svg"}
                            alt={"writing property progress icon"}
                            height={24}
                            width={24}
                            key={page.id + "progressIcon"}
                          />,
                          <div key={propKey + "progressKey"}>{propKey}</div>,
                        ]}
                        propValue={[
                          <button
                            key={page?.properties["진행 상태"].id + "progress"}
                            className={`${"bg-icon-default text-accent "} px-2 py-1 sm:b2-600-16 b3-600-14 flex items-center justify-center rounded-lg border-2 border-transparent`}
                          >
                            {page?.properties["진행 상태"]?.select?.name ||
                              "대기"}
                          </button>,
                        ]}
                      />
                    </>
                  );
                }
                if (propKey === "날짜") {
                  return (
                    <>
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
                            {page?.properties["날짜"]?.date?.start || "미정"}
                          </div>,
                        ]}
                      />
                    </>
                  );
                }
              })}
            </div>
          </div>
          <div className="w-full my-[45px] h-full">
            <div className="p-6 rounded-3xl bg-default w-full outline-none b1-400-20 text-sub h-full">
              {page?.contents.map((content: any) =>
                content?.paragraph?.rich_text
                  ?.map((block: any) => block?.text?.content)
                  .join("\r\n")
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCardModal;
