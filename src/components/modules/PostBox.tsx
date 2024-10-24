import { FunctionComponent, MutableRefObject } from "react";
import usePostBox from "../hooks/usePostBox";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";
import createProfilePicture from "@/lib/helpers/createProfilePicture";
import manejarBuscarPerfiles from "@/lib/helpers/manejarBuscarPerfiles";
import { Profile } from "../../../graphql/generated";
import { Dictionary } from "../types/principal.types";
import { AiOutlineLoading } from "react-icons/ai";
import { PublicClient } from "viem";
import { PageFlip } from "page-flip";

const PostBox: FunctionComponent<{
  dict: Dictionary;
  lensConectado: Profile | undefined;
  manejarLens: () => Promise<void>;
  publicClient: PublicClient;
  path: string;
  pageFlipRef: MutableRefObject<PageFlip | null>;
  comentarioId: string | undefined;
}> = ({
  dict,
  lensConectado,
  manejarLens,
  publicClient,
  path,
  pageFlipRef,
  comentarioId,
}): JSX.Element => {
  const {
    descripcion,
    setDescripcion,
    elementoTexto,
    setCaretCoord,
    setPerfilesAbiertos,
    setMencionarPerfiles,
    cargandoConexion,
    mencionarPerfiles,
    hacerPublicacion,
    caretCoord,
    perfilesAbiertos,
  } = usePostBox(manejarLens, publicClient, pageFlipRef, comentarioId);

  return (
    <div
      className={`absolute w-full sm:w-fit h-fit flex items-center justify-center top-1/3 sm:top-5 left-0 sm:left-5 ${
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
      <div className="relative w-full h-[24rem] sm:w-[28rem] sm:h-[28rem] flex items-start justify-center">
        <div className="absolute top-0 left-0 flex w-full h-full">
          <Image
            layout="fill"
            objectFit="contain"
            draggable={false}
            src={`${INFURA_GATEWAY}/ipfs/QmSG41NVPbwZgUSan7HdnAEztLnPJC4UWGnAJk2747eY4E`}
            priority
          />
        </div>
        <div
          className={`relative w-5/6 sm:w-3/4 h-[13rem] flex flex-col items-center text-black justify-start`}
        >
          <textarea
            value={descripcion || ""}
            onChange={(e) => {
              setDescripcion(e.target.value);
              manejarBuscarPerfiles(
                e,
                setPerfilesAbiertos,
                setMencionarPerfiles,
                0,
                lensConectado,
                setCaretCoord,
                elementoTexto
              );
            }}
            ref={elementoTexto as any}
            className={`relative bg-crema text-base w-full h-full break-words focus:outline-none border-2 border-[#49483F] ${
              path?.includes("/uk/")
                ? "font-cor"
                : path?.includes("/ar/") || path?.includes("/fa/")
                ? "font-dav"
                : path?.includes("/ja/")
                ? "font-mat"
                : path?.includes("/he/") || path?.includes("/yi/")
                ? "font-rub"
                : "font-type"
            } ${comentarioId ? "px-1 pb-1 pt-5" : "p-1"}`}
            style={{
              resize: "none",
            }}
          ></textarea>
          {comentarioId && (
            <div className="absolute top-3 right-3 text-xxs text-black">
              {dict.Home.comentario + ` ${comentarioId}`}
            </div>
          )}
          <div
            className={`absolute bottom-2 right-2 flex items-center justify-center w-fit text-xs h-fit ${
              !cargandoConexion &&
              "cursor-pointer active:scale-95 hover:opacity-70"
            }`}
            onClick={() => !cargandoConexion && hacerPublicacion()}
          >
            {cargandoConexion ? (
              <div
                className={`relative w-fit h-fit flex items-center justify-center ${
                  cargandoConexion && "animate-spin"
                }`}
              >
                <AiOutlineLoading size={15} color="black" />
              </div>
            ) : (
              dict.Home.send
            )}
          </div>
          {mencionarPerfiles?.length > 0 && perfilesAbiertos && (
            <div
              className={`absolute w-40 max-h-40 h-fit flex flex-col overflow-y-auto items-start justify-start z-100`}
              style={{
                top: caretCoord[0].y + 30,
                left: caretCoord[0].x,
              }}
            >
              {mencionarPerfiles?.map((user: Profile, indexTwo: number) => {
                const profileImage = createProfilePicture(
                  user?.metadata?.picture
                );
                return (
                  <div
                    key={indexTwo}
                    className={`relative w-full h-10 px-3 py-2 bg- flex flex-row gap-3 cursor-pointer bg-crema items-center justify-center break-all`}
                    onClick={() => {
                      setPerfilesAbiertos((prev) => {
                        const arr = [...prev];
                        arr[0] = false;
                        return arr;
                      });

                      setDescripcion(
                        (prev) =>
                          prev?.substring(0, prev?.lastIndexOf("@")) +
                          `${user?.handle?.suggestedFormatted?.localName}`
                      );
                    }}
                  >
                    <div
                      className={`relative flex flex-row w-full h-full items-center justify-center gap-2 hover:opacity-70 ${
                        path?.includes("/uk/")
                          ? "font-cor"
                          : path?.includes("/ar/") || path?.includes("/fa/")
                          ? "font-dav"
                          : path?.includes("/ja/")
                          ? "font-mat"
                          : path?.includes("/he/") || path?.includes("/yi/")
                          ? "font-rub"
                          : "font-type"
                      }`}
                    >
                      <div
                        className={`relative rounded-full flex bg-black w-3 h-3 items-center justify-center`}
                        id="pfp"
                      >
                        {profileImage && (
                          <Image
                            src={profileImage}
                            objectFit="cover"
                            alt="pfp"
                            layout="fill"
                            className="relative w-fit h-fit rounded-full items-center justify-center flex"
                            draggable={false}
                          />
                        )}
                      </div>
                      <div className="relative items-center justify-center w-fit h-fit text-xs flex break-all">
                        {user?.handle?.suggestedFormatted?.localName}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostBox;
