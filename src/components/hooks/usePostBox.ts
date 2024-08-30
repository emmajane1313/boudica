import { useContext, useRef, useState } from "react";
import { Profile } from "../../../graphql/generated";
import { custom, useAccount } from "wagmi";
import { ModalContext } from "@/app/providers";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { polygon } from "viem/chains";
import { Indexar } from "../types/principal.types";
import { createWalletClient, PublicClient } from "viem";
import subirContenido from "@/lib/helpers/subirContenido";
import publicarLens from "@/lib/helpers/publicarLens";

const usePostBox = (
  manejarLens: () => Promise<void>,
  publicClient: PublicClient
) => {
  const { address, isConnected } = useAccount();
  const context = useContext(ModalContext);
  const { openConnectModal } = useConnectModal();
  const [caretCoord, setCaretCoord] = useState<
    {
      x: number;
      y: number;
    }[]
  >([]);
  const [perfilesAbiertos, setPerfilesAbiertos] = useState<boolean[]>([]);
  const [mencionarPerfiles, setMencionarPerfiles] = useState<Profile[]>([]);
  const elementoTexto = useRef<HTMLTextAreaElement | null>(null);
  const [descripcion, setDescripcion] = useState<string>("");
  const [cargandoConexion, setCargandoConexion] = useState<boolean>(false);

  const hacerPublicacion = async () => {
    if (!context?.lensConectado?.id) {
      if (isConnected) {
        manejarLens();
      } else {
        openConnectModal && openConnectModal();
      }
      return;
    }

    if (descripcion.trim() == "") return;
    setCargandoConexion(true);
    try {
      const contentURI = await subirContenido(descripcion, [], [], []);

      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      await publicarLens(
        contentURI!,
        [
          {
            collectOpenAction: {
              simpleCollectOpenAction: {
                followerOnly: false,
              },
            },
          },
        ],
        address as `0x${string}`,
        clientWallet,
        publicClient,
        context?.setIndexar,
        context?.setErrorInteraccion,
        () => setCargandoConexion(false)
      );
      setDescripcion("");
    } catch (err: any) {
      if (
        !err?.messages?.includes("Block at number") &&
        !err?.message?.includes("could not be found")
      ) {
        context?.setErrorInteraccion(true);
        console.error(err.message);
      } else {
        context?.setIndexar(Indexar.Exito);

        setTimeout(() => {
          context?.setIndexar(Indexar.Inactivo);
        }, 3000);
      }
    }
    setCargandoConexion(false);
  };

  return {
    caretCoord,
    descripcion,
    setDescripcion,
    setCaretCoord,
    elementoTexto,
    mencionarPerfiles,
    setMencionarPerfiles,
    perfilesAbiertos,
    setPerfilesAbiertos,
    cargandoConexion,
    hacerPublicacion,
  };
};

export default usePostBox;
