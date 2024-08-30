"use client";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";
import { Dictionary } from "@/components/types/principal.types";
import { SetStateAction } from "react";

function Error({
  setErrorInteraccion,
  dict,
}: {
  dict: Dictionary;
  setErrorInteraccion: (e: SetStateAction<boolean>) => void;
}) {
  return (
    <div
      className="inset-0 justify-center fixed z-200 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-pointer"
      onClick={() => setErrorInteraccion(false)}
    >
      <div
        className="relative flex w-fit h-fit overflow-y-scroll place-self-center cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative relative w-[100vw] max-w-[64rem] h-[calc(100vw*(40/64))] max-h-[40rem] flex items-center justify-center">
          <Image
            src={`${INFURA_GATEWAY}/ipfs/QmaX2iAYpULKxvf2hq2z5Vo7bxjAN1y4cqMkWixCSGWf1X`}
            draggable={false}
            layout="fill"
            objectFit="contain"
          />
          <div
            className={`absolute top-0 right-0 w-full h-full flex flex-col items-center py-10 px-4 gap-5 text-black font-conso justify-center overflow-y-scroll text-xs sm:text-sm`}
          >
            <div className="relative w-1/2 md:w-3/4 break-words h-fit flex text-center justify-center items-center">
              {dict.Home.error}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error;
