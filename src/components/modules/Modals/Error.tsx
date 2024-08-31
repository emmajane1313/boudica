"use client";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";
import { Dictionary, ErrorTipo } from "@/components/types/principal.types";
import { SetStateAction } from "react";

function Error({
  setErrorInteraccion,
  errorInteraccion,
  dict,
  path,
}: {
  dict: Dictionary;
  setErrorInteraccion: (e: SetStateAction<ErrorTipo>) => void;
  errorInteraccion: ErrorTipo;
  path: string;
}) {
  return (
    <div
      className="inset-0 justify-center fixed z-200 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-pointer"
      onClick={() => setErrorInteraccion(ErrorTipo.Inactivo)}
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
            className={`absolute top-0 right-0 w-full h-full flex flex-col items-center py-10 px-4 gap-5 text-black justify-center overflow-y-scroll text-xs sm:text-sm ${
              path?.includes("/ar/")
                ? "font-ruw"
                : path?.includes("/uk/")
                ? "font-ad"
                : path?.includes("/ja/")
                ? "font-gen"
                : path?.includes("/he/") || path?.includes("/yi/")
                ? "font-noto"
                : path?.includes("/fa/")
                ? "font-zar"
                : "font-conso"
            }`}
          >
            <div className="relative w-1/2 md:w-3/4 break-words h-fit flex text-center justify-center items-center">
              {errorInteraccion == ErrorTipo.Lens
                ? dict.Home.lensHandle
                : dict.Home.error}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error;
