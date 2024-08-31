import { FunctionComponent, MutableRefObject, SetStateAction } from "react";
import { Profile } from "../../../graphql/generated";
import { Dictionary } from "../types/principal.types";
import useGuemara from "../hooks/useGuemara";
import { PageFlip } from "page-flip";
import descripcionRegex from "@/lib/helpers/descripcionRegex";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";

const Guemara: FunctionComponent<{
  dict: Dictionary;
  lensConectado: Profile | undefined;
  pageFlipRef: MutableRefObject<PageFlip | null>;
  guemara: boolean;
  path: string;
  setMostrarDetalles: (e: SetStateAction<string | undefined>) => void;
  mostrarDetalles: string | undefined;
}> = ({
  dict,
  lensConectado,
  pageFlipRef,
  guemara,
  path,
  setMostrarDetalles,
  mostrarDetalles,
}): JSX.Element => {
  const {
    guemaraActual,
    guemaraCargando,
    guemaraUbi,
    masGuemaraCargando,
    setIndice,
    indice,
    detallesIndice,
    setDetallesIndice,
    detallesUbi,
    detallesActual,
  } = useGuemara(
    pageFlipRef,
    lensConectado,
    guemara,
    mostrarDetalles,
    setMostrarDetalles
  );

  return (
    <div
      className={`absolute top-0 left-0 w-full h-full flex items-start justify-between flex-col gap-3 px-20 py-8 ${
        guemaraCargando || (masGuemaraCargando && "animate-pulse")
      }`}
      id={guemaraCargando || masGuemaraCargando ? "juego" : ""}
    >
      <div className="relative w-full h-full flex items-center justify-start flex-row gap-3 overflow-y-scroll">
        {(mostrarDetalles
          ? detallesActual?.slice(0 + 10 * indice, 6 + 10 * indice)
          : guemaraActual?.slice(0 + 10 * indice, 3 + 10 * indice)
        )?.map((g, i) => {
          return (
            <div
              key={i}
              className={`relative  w-full h-full flex text-white overflow-y-scroll text-justify text-xs	whitespace-inline ${
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
              dangerouslySetInnerHTML={{
                __html: descripcionRegex(g?.metadata?.content, false, g?.id),
              }}
            ></div>
          );
        })}
      </div>
      <div className="relative w-full h-3/4 flex items-center justify-between flex-row gap-3 overflow-y-scroll">
        <div className="relative w-full h-full flex items-start justify-start flex-col gap-3">
          {(mostrarDetalles
            ? detallesActual?.slice(6 + 10 * indice, 10 + 10 * indice)
            : guemaraActual?.slice(3 + 10 * indice, 5 + 10 * indice)
          )?.map((g, i) => {
            return (
              <div
                key={i}
                className={`relative w-full h-full flex text-white overflow-y-scroll text-justify	whitespace-inline  ${
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
                dangerouslySetInnerHTML={{
                  __html: descripcionRegex(g?.metadata?.content, false, g?.id),
                }}
              ></div>
            );
          })}
        </div>
        <div className="relative w-1/2 h-full flex"></div>
        <div className="relative w-full h-full flex items-end justify-start flex-col gap-3">
          {(mostrarDetalles
            ? detallesActual?.slice(10 + 10 * indice, 14 + 10 * indice)
            : guemaraActual?.slice(5 + 10 * indice, 7 + 10 * indice)
          )?.map((g, i) => {
            return (
              <div
                key={i}
                className={`relative w-full h-full flex text-white overflow-y-scroll text-justify  whitespace-inline ${
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
                dangerouslySetInnerHTML={{
                  __html: descripcionRegex(g?.metadata?.content, false, g?.id),
                }}
              ></div>
            );
          })}
        </div>
      </div>
      <div className="relative w-full h-full flex items-center justify-start flex-row gap-6 overflow-y-scroll">
        {(mostrarDetalles
          ? detallesActual?.slice(14 + 10 * indice, 20 + 10 * indice)
          : guemaraActual?.slice(7 + 10 * indice, 10 + 10 * indice)
        )?.map((g, i) => {
          return (
            <div
              key={i}
              className={`relative w-full h-full flex text-white overflow-y-scroll  text-justify text-lg whitespace-inline ${
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
              dangerouslySetInnerHTML={{
                __html: descripcionRegex(g?.metadata?.content, false, g?.id),
              }}
            ></div>
          );
        })}
      </div>
      {mostrarDetalles && (
        <div className="absolute left-5 top-5 w-fit h-fit flex flex-row gap-3 items-center justify-center">
          <div
            onClick={() => setMostrarDetalles(undefined)}
            className="relative rotate-180 hover:opacity-80 flex w-12 h-8 cursor-pointer"
          >
            <Image
              src={`${INFURA_GATEWAY}/ipfs/QmSDRCusdR5zgpx4TfMymyLwYuQCyoAaprW8YmYvfbLGGE`}
              draggable={false}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      )}
      <div className="absolute right-5 bottom-5 w-fit h-fit flex flex-row gap-3 items-center justify-center">
        {(mostrarDetalles ? detallesIndice > 0 : indice > 0) && (
          <div
            onClick={() =>
              !masGuemaraCargando &&
              (mostrarDetalles
                ? setDetallesIndice(detallesIndice - 1)
                : setIndice(indice - 1))
            }
            className="relative rotate-180 hover:opacity-80 flex w-12 h-8 cursor-pointer"
          >
            <Image
              src={`${INFURA_GATEWAY}/ipfs/QmSDRCusdR5zgpx4TfMymyLwYuQCyoAaprW8YmYvfbLGGE`}
              draggable={false}
              layout="fill"
              objectFit="contain"
            />
          </div>
        )}
        {(mostrarDetalles ? detallesUbi : guemaraUbi) && (
          <div
            onClick={() =>
              !masGuemaraCargando &&
              (mostrarDetalles
                ? setDetallesIndice(detallesIndice + 1)
                : setIndice(indice + 1))
            }
            className="relative flex w-12 hover:opacity-80 h-8 cursor-pointer"
          >
            <Image
              src={`${INFURA_GATEWAY}/ipfs/QmSDRCusdR5zgpx4TfMymyLwYuQCyoAaprW8YmYvfbLGGE`}
              draggable={false}
              layout="fill"
              objectFit="contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Guemara;
