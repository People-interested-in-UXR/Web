"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FormEvent,
  ReactNode,
  Ref,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";

interface ICustomCheckBox {
  id: keyof Inputs;
  children: ReactNode;
  getCheckBoxs: Array<keyof Inputs>;
  handleCheckBox: (e: FormEvent<HTMLInputElement>) => void;
}

// eslint-disable-next-line react/display-name
const CustomCheckBox = forwardRef(
  (
    { id, children, handleCheckBox, getCheckBoxs }: ICustomCheckBox,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <div className="flex items-center">
        <label
          className="relative flex items-center rounded-full cursor-pointer ml-4"
          htmlFor={id}
        >
          <input
            ref={ref}
            type="checkbox"
            className={`before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-[4px] border-2 border-secondary bg-background-default transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-brown-600 before:opacity-0 before:transition-opacity checked:border-primary-red checked:bg-primary-red checked:before:bg-primary-red hover:border-brown-600 hover:before:opacity-0`}
            id={id}
            onChange={(event) => handleCheckBox(event)}
            checked={getCheckBoxs.includes(id)}
          />
          <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </label>
        {children}
      </div>
    );
  }
);

type Inputs = {
  all: string;
  terms: string;
  "personal-information": string;
  age: string;
  marketing: string;
};

export const PrivacyConsentForm = () => {
  const allRef = useRef<HTMLInputElement>(null);
  const [getCheckBoxs, setCheckBoxs] = useState<Array<keyof Inputs>>([]);
  const router = useRouter();

  useEffect(() => {
    if (allRef?.current) {
      if (allRef?.current?.checked) {
      }
    }
  }, [allRef, getCheckBoxs]);

  const handleSelect = (e: FormEvent<HTMLInputElement>) => {
    // 선택된 건 나중에 추가가 된다.
    const target = e?.currentTarget?.id as keyof Inputs;

    if (!target) return;

    // 전체 동의를 누른 상태에서 all 말고 다른거 눌렀을 때
    if (target !== "all" && getCheckBoxs.length === 5) {
      return setCheckBoxs((prev) =>
        [...prev]
          .filter((checkbox) => target !== checkbox)
          .filter((value) => value !== "all")
      );
    }

    // 전체 동의를 누른 경우
    if (target === "all" && getCheckBoxs.length !== 5)
      return setCheckBoxs((prev) => [
        "all",
        "terms",
        "personal-information",
        "age",
        "marketing",
      ]);

    setCheckBoxs((prev) =>
      prev.includes(target)
        ? prev.filter((checkbox) => checkbox !== target)
        : [...prev, target]
    );
  };

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/term`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isMarketing: getCheckBoxs.includes("marketing"),
          }),
        });

        router.push("/sign-up");
      }}
      className="flex flex-col gap-10"
    >
      <div>
        <div className="w-full flex bg-background-muted rounded-lg h-14">
          <CustomCheckBox
            ref={allRef}
            id={`all`}
            handleCheckBox={handleSelect}
            getCheckBoxs={getCheckBoxs}
          >
            <div className="flex items-center gap-2 text-title ml-2 b3-400-14">
              <p>
                <strong className="b3-600-14">전체 동의</strong>
              </p>
              <Link href="" className="text-sub">
                선택항목에 대한 동의 포함
              </Link>
            </div>
          </CustomCheckBox>
        </div>

        <div className="flex flex-col gap-6 py-4">
          <CustomCheckBox
            id={`terms`}
            handleCheckBox={handleSelect}
            getCheckBoxs={getCheckBoxs}
          >
            <div className="flex items-center gap-2 text-title ml-2 b3-400-14">
              <p>(필수) 이용약관 </p>
              <Link href="" className="text-sub">
                더보기
              </Link>
            </div>
          </CustomCheckBox>

          <CustomCheckBox
            id={`personal-information`}
            handleCheckBox={handleSelect}
            getCheckBoxs={getCheckBoxs}
          >
            <div className="flex items-center gap-2 text-title ml-2 b3-400-14">
              <p>(필수) 개인정보수집 및 이용동의 </p>
              <Link href="" className="text-sub">
                더보기
              </Link>
            </div>
          </CustomCheckBox>

          <CustomCheckBox
            id={`age`}
            handleCheckBox={handleSelect}
            getCheckBoxs={getCheckBoxs}
          >
            <div className="flex items-center gap-2 text-title ml-2 b3-400-14">
              <p>(필수) 만 14세 이상입니다 </p>
              <Link href="" className="text-sub">
                더보기
              </Link>
            </div>
          </CustomCheckBox>

          <CustomCheckBox
            id={`marketing`}
            handleCheckBox={handleSelect}
            getCheckBoxs={getCheckBoxs}
          >
            <div className="flex items-center gap-2 text-title ml-2 b3-400-14">
              <p>(선택) 개인정보 마케팅 활용 동의 </p>
              <Link href="" className="text-sub">
                더보기
              </Link>
            </div>
          </CustomCheckBox>
        </div>
      </div>

      <button
        className={`${
          ["terms", "personal-information", "age"].every((value) =>
            getCheckBoxs.includes(value as keyof Inputs)
          )
            ? "w-full bg-primary-red rounded-2xl flex items-center justify-center text-accent h4-600-18 py-4"
            : "w-full bg-brown-600 rounded-2xl flex items-center justify-center text-muted h4-600-18 py-4"
        }`}
        type="submit"
        disabled={
          !["terms", "personal-information", "age"].every((value) =>
            getCheckBoxs.includes(value as keyof Inputs)
          )
        }
      >
        다음
      </button>
    </form>
  );
};
