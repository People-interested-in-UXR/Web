"use client";
import { Container, PIXRHeader } from "@/app/_containers";
import { useState } from "react";

export default function Page({}) {
  const [fileName, setFileName] = useState("");
  const [name, setName] = useState("");
  return (
    <Container>
      <PIXRHeader />
      <div className="w-full h-calc-header bg-default flex justify-center items-center">
        <div className="flex flex-col justify-center text-center gap-10">
          <h1 className="text-brown-900 h1-700-32">
            Members에 등록할 프로필을 만들어 볼까요?
          </h1>
          <div className="flex flex-col w-full px-[84px] gap-6">
            <div className="flex flex-col items-start w-full gap-2">
              <div className="b2-600-16 text-default gap-2">
                프로필 사진 <span className="text-primary-red">*</span>
              </div>
              <div
                className={`${fileName ? "border-teriary" : "border-secondary"} w-full border rounded-lg px-4 py-[11px] bg-white flex justify-between items-center`}
              >
                <div
                  className={`${fileName ? "text-default" : "text-muted"} b2-400-16`}
                >
                  {fileName ? fileName : "사진을 선택해주세요"}
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
                  onChange={(event) =>
                    setFileName(
                      event.currentTarget.value.split("\\")[
                        event.currentTarget.value.split("\\").length - 1
                      ]
                    )
                  }
                />
              </div>
            </div>
            <div className="flex flex-col items-start w-full gap-2">
              <label htmlFor="name" className="b2-600-16 text-default gap-2">
                성함 <span className="text-primary-red">*</span>
              </label>

              <input
                type="text"
                className={`${name ? "border-teriary" : "border-secondary"} b2-400-16 w-full border rounded-lg px-4 py-[11px] bg-white flex justify-between items-center h-[58px] outline-none`}
                placeholder="홍길동"
                onChange={(event) => setName(event.currentTarget.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
