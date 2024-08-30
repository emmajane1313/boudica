import { FunctionComponent } from "react";
import usePostBox from "../hooks/usePostBox";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";
import createProfilePicture from "@/lib/helpers/createProfilePicture";
import manejarBuscarPerfiles from "@/lib/helpers/manejarBuscarPerfiles";
import { Profile } from "../../../graphql/generated";
import { Dictionary } from "../types/principal.types";
import { AiOutlineLoading } from "react-icons/ai";
import { PublicClient } from "viem";

const PostBox: FunctionComponent<{
  dict: Dictionary;
  lensConectado: Profile | undefined;
  manejarLens: () => Promise<void>;
  publicClient: PublicClient;
}> = ({ dict, lensConectado, manejarLens, publicClient }): JSX.Element => {
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
  } = usePostBox(manejarLens, publicClient);

  return (
    <div className="absolute w-fit h-fit flex items-center justify-center top-5 left-5">
      <div className="relative w-[28rem] h-[28rem] flex items-start justify-center">
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
          className={`relative w-3/4 h-[13rem] flex flex-col items-center text-black justify-start`}
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
            className="relative font-type p-1 bg-[#E2D5C1] text-base w-full h-full break-words focus:outline-none border-2 border-[#49483F]"
            style={{
              resize: "none",
            }}
          ></textarea>
          <div
            className={`absolute font-vcr bottom-2 right-2 flex items-center justify-center font-conso w-fit text-xs h-fit ${
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
              className={`absolute w-40 border border-white max-h-40 h-fit flex flex-col overflow-y-auto items-start justify-start z-100`}
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
                    className={`relative border-y border-white w-full h-10 px-3 py-2 bg-black flex flex-row gap-3 cursor-pointer items-center justify-center break-all`}
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
                    <div className="relative flex flex-row w-full h-full text-white font-aust items-center justify-center gap-2">
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
