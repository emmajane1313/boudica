"use client";
import { FunctionComponent } from "react";
import { PrincipalProps } from "../types/principal.types";
import useEnfoque from "../hooks/useEnfoque";
import { COVERS, INFURA_GATEWAY } from "@/lib/constants";
import Image from "next/legacy/image";
import { usePathname } from "next/navigation";

const Principal: FunctionComponent<PrincipalProps> = ({ dict }) => {
  const { nivelZoom, containerRef, arrastrando, posicion, imageRef, bookRef } =
    useEnfoque();
  const router = usePathname();

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-offBlack items-center justify-center flex"
    >
      <div
        className={`relative transition-transform duration-300 ease-out w-full h-full`}
        style={{
          transform: `translate(${posicion.x}px, ${posicion.y}px) scale(${nivelZoom})`,
          transformOrigin: "center",
          cursor: arrastrando ? "grabbing" : "grab",
        }}
        ref={imageRef}
      >
        <div
          className="relative w-full h-full flex items-center justify-center"
          ref={bookRef}
        >
          {(COVERS?.find((co) => router.includes(`/${co.locale}/`))
            ? COVERS?.find((co) => router.includes(`/${co.locale}/`))
            : COVERS?.find((co) => co.locale == "en")
          )?.imagens?.map((pagina: string, indice: number) => (
            <div
              key={indice}
              className="page relative flex items-center justify-center w-full h-full"
            >
              <Image
                src={`${INFURA_GATEWAY}/ipfs/${pagina}`}
                layout="fill"
                objectFit="contain"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className={`absolute bottom-20 w-full items-center justify-center h-fit flex break-words font-futur text-3xl sm:text-5xl text-center ${
          nivelZoom < 0.7 ? "flex" : "hidden"
        } text-white`}
      ></div>
    </div>
  );
};

export default Principal;
