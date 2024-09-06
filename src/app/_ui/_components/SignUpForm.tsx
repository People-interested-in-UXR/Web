"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Icon } from "../_atomics";
import Image from "next/image";
import { User } from "@/app/utils/types/user/user";
import { revalidateTag } from "next/cache";

interface ISignUpForm {
  user?: User;
}
const SignUpForm = ({ user }: ISignUpForm) => {
  const [profile, setProfile] = useState(user?.profile || "");
  const [file, setFile] = useState<File>();
  const [name, setName] = useState(user?.name || "");
  const nameRef = useRef<HTMLInputElement>(null);
  const [position, setPosition] = useState(user?.position || "");
  const [positionToggle, setPositionToggle] = useState(false);
  const [introduce, setIntroduce] = useState(user?.introduce || "");
  const introduceRef = useRef<HTMLTextAreaElement>(null);
  const [email, setEmail] = useState(user?.secondary_email || "");
  const emailRef = useRef<HTMLInputElement>(null);
  const [sns, setSns] = useState(user?.sns || "");
  const snsRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const INTRODUCE_MAX_LENGTH = 55;

  const positions = [
    "UX Researcher",
    "Product Designer",
    "PO/PM",
    "Data Analyst",
    "Developer",
    "Maketer",
    "Student",
    "ETC",
  ];

  useEffect(() => {
    if (
      nameRef.current &&
      introduceRef.current &&
      emailRef.current &&
      snsRef.current
    ) {
      nameRef.current.value = user?.name || "";
      introduceRef.current.value = user?.introduce || "";
      emailRef.current.value = user?.secondary_email || "";
      snsRef.current.value = user?.sns || "";

      (async () => {
        const response = await fetch(profile);
        const blob = await response.blob();
        const file = new File([blob], "업로드 이미지", { type: blob.type });

        setFile(file);
      })();
    }
  }, [
    nameRef,
    introduceRef,
    emailRef,
    snsRef,
    profile,
    user?.name,
    user?.introduce,
    user?.secondary_email,
    user?.sns,
  ]);

  // * Function
  const uploadUserProfile = async (file: File) => {
    // * 스토리지 업로드
    const image = new FormData();
    image.append("file", file, file.name);

    const { publicUrl } = await (
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/s3/user/profile`, {
        method: "POST",
        cache: "no-cache",
        body: image,
      })
    ).json();

    // * 프로필 업데이트
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/profile`, {
      method: "PATCH",
      body: JSON.stringify({
        profile: publicUrl,
      }),
    });
  };
  const insertUserInfo = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/info`, {
      method: "PATCH",
      body: JSON.stringify({
        name,
        position,
        introduce,
        secondary_email: email,
        sns,
      }),
    });
  };

  //* Event
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) return;
    const file = event.target.files[0];
    setProfile(URL?.createObjectURL(file));
    setFile(file);
  };

  return (
    <>
      {profile && (
        <div className="flex items-center flex-col gap-4">
          <h2 className="text-sub b2-400-16">
            입력하신 정보는 Members에서 이렇게 보여요!
          </h2>
          <div className="relative w-[182px] bg-secondary p-1 rounded-2xl">
            <div className="absolute z-10 right-2 top-2 flex flex-col gap-2">
              {email && (
                <Icon
                  src={"/icon/common/email.svg"}
                  alt={"email icon"}
                  height={18}
                  width={18}
                />
              )}
              {sns && (
                <Icon
                  src={"/icon/common/sns.svg"}
                  alt={"sns icon"}
                  height={18}
                  width={18}
                />
              )}
            </div>
            <div className=" w-full  flex justify-center">
              <div className="relative w-[182px] h-[160px] rounded-2xl">
                <Image
                  src={profile}
                  alt={"profile image"}
                  fill
                  className="rounded-xl absolute top-0 left-0 object-cover "
                />
              </div>
            </div>
            <div className="p-2 text-sub mt-1">
              <div className="flex gap-2 items-center">
                <div className="text-title font-bold text-[10px]">
                  {name ? name : "홍길동"}
                </div>
                <div className="font-semibold text-[8px] flex items-center">
                  {position ? position : "UX Researcher"}
                </div>
              </div>
              <div className="flex text-[8px] mt-1">
                <div className="text-start w-full break-words line-clamp-2 text-sub">
                  {introduce}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <form
        className="flex flex-col w-full px-[84px] gap-6 mt-2"
        onSubmit={async (event) => {
          //TODO: SeverAction으로 리팩토링
          event.preventDefault();

          if (!file) return alert("파일을 업로드해주세요.");

          await uploadUserProfile(file);
          await insertUserInfo();

          // * Router
          //! <주의> 현재 server revalidateTag user-info(/api/user/info에서 실행)를 사용 중
          //! Front간 데이터 차이가 있어 query를 붙여 강제로 useEffect를 이용해 refresh (구현은 현재 PIXRHeader 쪽에)
          user?.id
            ? router.push("/?refresh=true")
            : router.push("/sign-up/complete/?refresh=true");
        }}
      >
        {/* 프로필 사진 */}
        <div className="flex flex-col items-start w-full gap-2">
          <div className="b2-600-16 text-default gap-2">
            프로필 사진 <span className="text-primary-red">*</span>
          </div>
          <div
            className={`${file || user?.id ? "border-teriary" : "border-secondary"} w-full border rounded-lg px-4 py-[11px] bg-white flex justify-between items-center`}
          >
            <div
              className={`${file || user?.id ? "text-default" : "text-muted"} b2-400-16 flex w-[260px]`}
            >
              <p className="truncate">
                {file
                  ? file.name
                  : user?.id
                    ? "업로드 이미지"
                    : "사진을 선택해주세요"}
              </p>
            </div>
            <label
              htmlFor="photo"
              className={`${file ? "text-default bg-secondary" : "text-sub bg-muted"} w-24 h-[34px] c1-400-12 flex items-center justify-center cursor-pointer p-2 rounded-lg`}
            >
              사진 가져오기
            </label>
            <input
              type="file"
              id="photo"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
        {/* 성함 */}
        <div className="flex flex-col items-start w-full gap-2">
          <label htmlFor="name" className="b2-600-16 text-default gap-2">
            성함 <span className="text-primary-red">*</span>
          </label>

          <input
            id={"name"}
            ref={nameRef}
            type="text"
            className={`${name ? "border-teriary" : "border-secondary"} b2-400-16 w-full border rounded-lg px-4 py-[11px] bg-white flex justify-between items-center h-[58px] outline-none placeholder:text-muted`}
            placeholder="홍길동"
            onChange={(event) => {
              setName(event.currentTarget.value);
            }}
            maxLength={16}
          />
        </div>
        {/* 직함 */}
        <div className="flex flex-col items-start w-full gap-2 relative">
          <label htmlFor="job" className="b2-600-16 text-default gap-2">
            직함 <span className="text-primary-red">*</span>
          </label>

          <div className="w-full relative flex items-center flex-col">
            <div className="w-full">
              <input
                id="job"
                type="text"
                name="job"
                className="hidden"
                // value={job}
              />
              <div
                className={`${position ? "border-teriary" : "border-secondary"} bg-white w-full  border rounded-lg p-4 flex justify-between`}
                onClick={(event) => {
                  setPositionToggle((prev) => !prev);
                }}
              >
                {position ? (
                  <div>{position}</div>
                ) : (
                  <div className="text-muted b2-400-16">
                    담당 직군을 선택해 주세요.
                  </div>
                )}

                <Icon
                  src={"/icon/common/bottom_point_arrows.svg"}
                  alt={"bottom pointer arrow"}
                  className={`transition ${positionToggle ? "rotate-180" : ""}`}
                  height={20}
                  width={20}
                />
              </div>
            </div>
            {positionToggle && (
              <ul className="w-full rounded-lg bg-white grid grid-cols-1 divide-y divide-muted mt-2 border border-muted">
                {positions.map((el, index) => (
                  <button
                    key={index}
                    className="p-4 text-start w-full hover:bg-muted hover:text-sub active:bg-brown-800 active:text-accent b2-400-16 active:rounded-lg"
                    onClick={() => {
                      setPosition(el);
                      setPositionToggle((prev) => !prev);
                    }}
                  >
                    <li className="w-full">{el}</li>
                  </button>
                ))}
              </ul>
            )}
            {/* <select
                  id={"job"}
                  className={`${job ? "border-teriary" : "border-secondary text-muted"} b2-400-16 w-full border rounded-lg px-4 py-[11px]  h-[58px] outline-none appearance-none relative`}
                  onChange={(event) => setJob(event.currentTarget.value)}
                >
                  <option className="text-muted" value="">
                    담장 직군을 선택해 주세요
                  </option>
                  <option value="pm/po">PM/PO</option>
                  <option value="designer">UX/UI Designer</option>
                  <option value="researcher">UX Researcher</option>
                </select> */}
            {/* <div className="absolute right-4">
                  <Icon
                    src={"/icon/common/bottom_point_arrows.svg"}
                    alt={"bottom pointer arrow"}
                    height={20}
                    width={20}
                  />
                </div> */}
          </div>
        </div>
        {/* 자기소개 */}
        <div className="flex flex-col items-start w-full gap-2">
          <label htmlFor="introduce" className="b2-600-16 text-default gap-2">
            자기소개 <span className="text-primary-red">*</span>{" "}
            <span
              className={`ml-2 b2-600-16 ${introduce.length >= INTRODUCE_MAX_LENGTH ? "text-primary-red" : "text-default"}`}
            >
              ({introduce.length}/{INTRODUCE_MAX_LENGTH})
            </span>
          </label>

          <textarea
            id={"introduce"}
            ref={introduceRef}
            className={`${introduce ? "border-teriary" : "border-secondary"} b2-400-16 w-full border rounded-lg px-4 py-[11px] bg-white flex justify-between items-center h-[104px] outline-none resize-none placeholder:text-muted ${introduce.length >= INTRODUCE_MAX_LENGTH ? "border-primary-red" : ""}`}
            placeholder="자신을 제일 잘 나타낼 수 있는 한 줄 소개를 작성해주세요"
            maxLength={INTRODUCE_MAX_LENGTH}
            onChange={(event) => setIntroduce(event.currentTarget.value)}
          />
          {introduce.length >= INTRODUCE_MAX_LENGTH && (
            <div className="c1-400-12 text-primary-red">
              최대 입력 글자수를 초과했어요
            </div>
          )}
        </div>
        {/* 이메일 */}
        <div className="relative flex flex-col items-start w-full gap-2">
          <label
            htmlFor="email"
            className="b2-600-16 text-default gap-1 flex flex-col items-start"
          >
            <p>이메일</p>
            <p className="c1-400-12 text-sub">
              입력 시 네트워킹, 커피챗, 모임 소식 등을 받을 수 있어요
            </p>
          </label>

          <div className="relative w-full flex items-center">
            {!email && (
              <div className="absolute pl-2">
                <Icon
                  src={"/icon/common/email.svg"}
                  alt={"email icon"}
                  height={36}
                  width={36}
                />
              </div>
            )}
            <input
              id={"email"}
              ref={emailRef}
              type="email"
              className={`${email ? "border-teriary pl-4" : "border-secondary pl-12"} b2-400-16 w-full border rounded-lg pr-4 py-[11px] bg-white flex justify-between items-center h-[58px] outline-none placeholder:text-muted`}
              placeholder="piiuxr.official@gmail.com"
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
          </div>
        </div>
        {/* 대표 SNS */}
        <div className="relative flex flex-col items-start w-full gap-2">
          <label htmlFor="name" className="b2-600-16 text-default ">
            대표 SNS
          </label>

          <div className="relative w-full flex items-center">
            {!sns && (
              <div className="absolute pl-2">
                <Icon
                  src={"/icon/common/sns.svg"}
                  alt={"sns icon"}
                  height={36}
                  width={36}
                />
              </div>
            )}
            <input
              ref={snsRef}
              id={"name"}
              type="sns"
              className={`${sns ? "border-teriary pl-4" : "border-secondary pl-12"} b2-400-16 w-full border rounded-lg pr-4 py-[11px] bg-white flex justify-between items-center h-[58px] outline-none placeholder:text-muted`}
              placeholder="링크드인, 브런치, 페이스북 등 기타 SNS 주소"
              onChange={(event) => setSns(event.currentTarget.value)}
            />
          </div>
        </div>
        <button
          className={`mt-16 w-full p-4 text-muted bg-brown-600 rounded-2xl h4-600-18 ${
            ![file?.name, name, position, introduce].every((value) => value)
              ? "text-muted bg-brown-600"
              : "text-white bg-btn-default"
          }`}
          type="submit"
          disabled={
            ![file?.name, name, position, introduce].every((value) => value)
          }
        >
          {user?.id ? "저장하기" : "등록하기"}
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
