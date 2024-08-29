"use client";
import { FunctionComponent, useContext } from "react";
import { PrincipalProps } from "../types/principal.types";
import useEnfoque from "../hooks/useEnfoque";
import { COVERS, INFURA_GATEWAY } from "@/lib/constants";
import Image from "next/legacy/image";
import { usePathname, useRouter } from "next/navigation";
import { PiArrowFatLinesRightFill } from "react-icons/pi";
import PostBox from "./PostBox";
import { ModalContext } from "@/app/providers";

const Principal: FunctionComponent<PrincipalProps> = ({ dict }) => {
  const {
    nivelZoom,
    arrastrando,
    posicion,
    bookRef,
    gemara,
    setGemara,
    containerRef,
  } = useEnfoque();
  const path = usePathname();
  const router = useRouter();
  const context = useContext(ModalContext);
  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-offBlack items-center justify-center flex"
      ref={containerRef}
      style={{
        cursor: arrastrando ? "grabbing" : "default",
      }}
    >
      <div
        className={`absolute cursor-pointer w-20 h-8 top-5 right-5 z-50 rounded-sm font-conso text-xs flex items-center justify-center ${
          gemara ? "bg-white text-black" : "border border-white text-white"
        }`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setGemara(!gemara);
        }}
      >
        <div className="relative w-fit h-fit flex items-center justify-center">
          {dict.Home.gemara}
        </div>
      </div>
      <div className={`relative`}>
        <div
          className="relative w-full transition-transform duration-300 ease-out h-full flex items-center justify-center"
          ref={bookRef}
          style={{
            transform: `translate(${posicion.x}px, ${posicion.y}px) scale(${nivelZoom})`,
            transformOrigin: "center",
            cursor: arrastrando ? "grabbing" : "grab",
          }}
        >
          {(COVERS?.find((co) => path.includes(`/${co.locale}/`))
            ? COVERS?.find((co) => path.includes(`/${co.locale}/`))
            : COVERS?.find((co) => co.locale == "en")
          )?.imagenes?.map((pagina: string, indice: number) => (
            <div
              key={indice}
              className="page relative flex items-center justify-center w-full h-full"
            >
              <Image
                src={`${INFURA_GATEWAY}/ipfs/${pagina}`}
                objectFit="contain"
                draggable={false}
                width={1072}
                height={1344}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-5 right-5 w-fit h-fit flex items-center justify-center flex-row gap-2">
        <div className="relative flex items-center justify-center w-fit h-fit flex items-center justify-center font-conso text-xs text-white">
          {path.includes("/es/")
            ? "es"
            : path.includes("/he/")
            ? "א"
            : path.includes("/pt/")
            ? "br"
            : path.includes("/ar/")
            ? "ع"
            : path.includes("/fa/")
            ? "د"
            : path.includes("/uk/")
            ? "уk"
            : path.includes("/yi/")
            ? "yi"
            : path.includes("/fr/")
            ? "fr"
            : path.includes("/ja/")
            ? "あ"
            : "en"}
        </div>
        <div
          className="relative flex items-center justify-center w-fit h-fit active:scale-95 cursor-pointer"
          onClick={() =>
            router.push(
              path.includes("/es/")
                ? path.replace("/es/", "/en/")
                : path.includes("/en/")
                ? path.replace("/en/", "/pt/")
                : path.includes("/pt/")
                ? path.replace("/pt/", "/ar/")
                : path.includes("/ar/")
                ? path.replace("/ar/", "/fa/")
                : path.includes("/fa/")
                ? path.replace("/fa/", "/uk/")
                : path.includes("/uk/")
                ? path.replace("/uk/", "/he/")
                : path.includes("/he/")
                ? path.replace("/he/", "/yi/")
                : path.includes("/yi/")
                ? path.replace("/yi/", "/ja/")
                : path.includes("/ja/")
                ? path.replace("/ja/", "/fr/")
                : path.replace("/fr/", "/es/")
            )
          }
        >
          <PiArrowFatLinesRightFill size={8} color={"white"} />
        </div>
      </div>
      {gemara && <PostBox dict={dict} lensConectado={context?.lensConectado} />}
    </div>
  );
};

export default Principal;
