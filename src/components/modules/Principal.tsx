"use client";
import { FunctionComponent, useContext } from "react";
import { PrincipalProps } from "../types/principal.types";
import useEnfoque from "../hooks/useEnfoque";
import { COVERS, INFURA_GATEWAY } from "@/lib/constants";
import Image from "next/legacy/image";
import { usePathname } from "next/navigation";
import PostBox from "./PostBox";
import { ModalContext } from "@/app/providers";
import Panel from "./Panel";
import Guemara from "./Guemara";
import useConectado from "../hooks/useConectado";
import { useAccount } from "wagmi";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";

const Principal: FunctionComponent<PrincipalProps> = ({ dict }) => {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { address, isConnected } = useAccount();
  const {
    nivelZoom,
    arrastrando,
    posicion,
    bookRef,
    gemara,
    setGemara,
    containerRef,
    manejarIdioma,
    publicacion,
    setPublicacion,
  } = useEnfoque();
  const path = usePathname();
  const context = useContext(ModalContext);
  const { manejarLens, lensCargando, manejarSalir } = useConectado(
    address,
    isConnected,
    context?.setLensConectado!,
    openAccountModal,
    context?.lensConectado!
  );
  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-offBlack items-center justify-center flex"
      ref={containerRef}
      style={{
        cursor: arrastrando ? "grabbing" : "default",
      }}
    >
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
      <Panel
        dict={dict}
        manejarIdioma={manejarIdioma}
        manejarPublicacion={() => setPublicacion(!publicacion)}
        manejarGemara={() => setGemara(!gemara)}
        lensCargando={lensCargando}
        manejarLens={manejarLens}
        manejarSalir={manejarSalir}
        openConnectModal={openConnectModal}
        isConnected={isConnected}
        lensConectado={context?.lensConectado}
      />
      {publicacion && (
        <PostBox dict={dict} lensConectado={context?.lensConectado} />
      )}
      {gemara && <Guemara dict={dict} lensConectado={context?.lensConectado} />}
    </div>
  );
};

export default Principal;
