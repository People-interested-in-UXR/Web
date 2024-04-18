"use client";
import { Container, PIXRHeader } from "@/app/_containers";
import { Icon } from "@/app/_ui";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Page({}) {
  const [profile, setProfile] = useState("");
  const [fileName, setFileName] = useState("");
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [email, setEmail] = useState("");
  const [sns, setSns] = useState("");

  return (
    <Container className="h-screen bg-default flex flex-col w-full">
      <PIXRHeader />
      <div className="w-full  bg-default flex justify-center mt-12">
        <div className="flex flex-col justify-center text-center gap-8">
          <h1 className="text-brown-900 h1-700-32">
            Members에 등록할 프로필을 만들어 볼까요?
          </h1>
          {profile && (
            <div className="flex items-center flex-col gap-4">
              <h2 className="text-sub b2-400-16">
                입력하신 정보는 Members에서 이렇게 보여요!
              </h2>
              <div className="w-[182px] bg-secondary p-1 rounded-2xl">
                <Image
                  src={"/sample.png"}
                  alt={"profile image"}
                  width={182}
                  height={160}
                  className="rounded-xl"
                />
                <div>
                  <div>
                    <span>홍길동</span>
                    <span>UX Researcher</span>
                  </div>
                  <p className="w-full truncate overflow-hidden">
                    안녕하세요! 3년 차 스타트업에서 1인 리서처로 있는 정윤경
                    입니다.만약에 더 작성하게 되면 ... 처리로 줄여야 할 것
                    같은데 몇자까지?
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col w-full px-[84px] gap-6 mt-2">
            {/* 프로필 사진 */}
            <div className="flex flex-col items-start w-full gap-2">
              <div className="b2-600-16 text-default gap-2">
                프로필 사진 <span className="text-primary-red">*</span>
              </div>
              <div
                className={`${fileName ? "border-teriary" : "border-secondary"} w-full border rounded-lg px-4 py-[11px] bg-white flex justify-between items-center`}
              >
                <div
                  className={`${fileName ? "text-default" : "text-muted"} b2-400-16 flex w-[260px]`}
                >
                  <p className="truncate">
                    {fileName ? fileName : "사진을 선택해주세요"}
                  </p>
                </div>
                <label
                  htmlFor="photo"
                  className={`${fileName ? "text-default bg-secondary" : "text-sub bg-muted"} w-24 h-[34px] c1-400-12 flex items-center justify-center cursor-pointer p-2 rounded-lg`}
                >
                  사진 가져오기
                </label>
                <input
                  type="file"
                  id="photo"
                  className="hidden"
                  onChange={(event) => {
                    if (event.currentTarget.files) {
                      setProfile(
                        URL.createObjectURL(event.currentTarget.files[0])
                      );
                    }
                    setFileName(
                      event.currentTarget.value.split("\\")[
                        event.currentTarget.value.split("\\").length - 1
                      ]
                    );
                  }}
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
                type="text"
                className={`${name ? "border-teriary" : "border-secondary"} b2-400-16 w-full border rounded-lg px-4 py-[11px] bg-white flex justify-between items-center h-[58px] outline-none placeholder:text-muted`}
                placeholder="홍길동"
                onChange={(event) => setName(event.currentTarget.value)}
              />
            </div>
            {/* 직함 */}
            <div className="flex flex-col items-start w-full gap-2 relative">
              <label htmlFor="job" className="b2-600-16 text-default gap-2">
                직함 <span className="text-primary-red">*</span>
              </label>

              <div className="w-full relative flex items-center">
                <select
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
                </select>
                <div className="absolute right-4">
                  <Icon
                    src={"/icon/common/bottom_point_arrows.svg"}
                    alt={"bottom pointer arrow"}
                    height={20}
                    width={20}
                  />
                </div>
              </div>
            </div>
            {/* 자기소개 */}
            <div className="flex flex-col items-start w-full gap-2">
              <label
                htmlFor="introduce"
                className="b2-600-16 text-default gap-2"
              >
                자기소개 <span className="text-primary-red">*</span>{" "}
                <span className="ml-2">({introduce.length}/100)</span>
              </label>

              <textarea
                id={"introduce"}
                className={`${introduce ? "border-teriary" : "border-secondary"} b2-400-16 w-full border rounded-lg px-4 py-[11px] bg-white flex justify-between items-center h-[104px] outline-none resize-none placeholder:text-muted`}
                placeholder="자신을 제일 잘 나타낼 수 있는 한 줄 소개룰 작성해주세요~"
                maxLength={100}
                onChange={(event) => setIntroduce(event.currentTarget.value)}
              />
            </div>
            {/* 이메일 */}
            <div className="relative flex flex-col items-start w-full gap-2">
              <label
                htmlFor="name"
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
                  id={"name"}
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
                  id={"name"}
                  type="sns"
                  className={`${sns ? "border-teriary pl-4" : "border-secondary pl-12"} b2-400-16 w-full border rounded-lg pr-4 py-[11px] bg-white flex justify-between items-center h-[58px] outline-none placeholder:text-muted`}
                  placeholder="링크드인, 브런치, 페이스북 등 기타 SNS 주소"
                  onChange={(event) => setSns(event.currentTarget.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
