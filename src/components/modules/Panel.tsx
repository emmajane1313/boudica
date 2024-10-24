import { INFURA_GATEWAY } from "@/lib/constants";
import Image from "next/legacy/image";
import { Dictionary } from "../types/principal.types";
import { AiOutlineLoading } from "react-icons/ai";
import { Profile } from "../../../graphql/generated";

const Panel = ({
  manejarIdioma,
  manejarGuemara,
  dict,
  manejarPublicacion,
  manejarLens,
  lensCargando,
  manejarSalir,
  openConnectModal,
  isConnected,
  manejarRecentrar,
  guemara,
}: {
  manejarIdioma: () => void;
  manejarGuemara: () => void;
  manejarPublicacion: () => void;
  manejarLens: () => Promise<void>;
  lensCargando: boolean;
  guemara: boolean;
  dict: Dictionary;
  manejarSalir: () => void;
  openConnectModal: (() => void) | undefined;
  isConnected: boolean;
  manejarRecentrar: () => void;
}) => {
  return (
    <div
      className={`absolute top-5 right-5 flex items-center justify-center bg-none flex p-2 flex-col gap-6 w-fit h-fit items-center justify-center`}
    >
      {[
        {
          imagen: "QmTJbcdJWMkiGuo8hNFtEnYSukGSq6m8Y7D38GweSoEEta",
          titulo: dict.Home.idioma,
          funcion: () => manejarIdioma(),
          activo: !guemara,
        },
        {
          imagen: "QmXM8hbdzWnqQNFFatuTqNvvc2UNggH5WwnoyzUCib8MPJ",
          titulo: dict.Home.recentrar,
          funcion: () => manejarRecentrar(),
          activo: !guemara,
        },
        {
          imagen: "QmarDKzwhbgnw6gdkDmbyEtJYia9889foeHobexLhvCjz1",
          titulo: dict.Home.guemara,
          funcion: () => manejarGuemara(),
          activo: true,
        },
        {
          imagen: "QmWkAoCCBLSkK4ZhRo6Q3ZPrMHYDfuFQWMThgbREWwVMj7",
          titulo: dict.Home.publicacion,
          funcion: () => manejarPublicacion(),
          activo: true,
        },
        {
          imagen: "QmZv4CX3VxiUdZHcNXBX6BuYJgc5JFFU5eJmZr1uAg4u5k",
          titulo: dict.Home.billetera,
          funcion: isConnected ? () => manejarSalir() : openConnectModal,
          activo: true,
        },
        {
          imagen: "QmcjvfCkKaXqq2wpWEu7rjQmomraPrZUxaYzwDTsihjf2i",
          titulo: dict.Home.lens,
          funcion: () => manejarLens(),
          loader: lensCargando,
          activo: isConnected ? true : false,
        },
      ].map(
        (
          elemento: {
            imagen: string;
            titulo: string;
            funcion: (() => void) | undefined;
            loader?: boolean;
            activo: boolean;
          },
          indice: number
        ) => {
          return (
            <div
              className={`relative  hover:opacity-80 w-fit h-fit flex items-center justify-center ${
                elemento?.activo && "cursor-pointer active:scale-95"
              }`}
              title={elemento.titulo}
              key={indice}
              onClick={() =>
                elemento?.activo && !elemento?.loader && elemento.funcion?.()
              }
            >
              <div
                className={`relative w-8 h-8 flex items-center justify-center ${
                  elemento?.loader && "animate-spin"
                }`}
              >
                {elemento?.loader ? (
                  <AiOutlineLoading size={8} color="white" />
                ) : (
                  <Image
                    layout="fill"
                    objectFit="contain"
                    draggable={false}
                    src={`${INFURA_GATEWAY}/ipfs/${elemento.imagen}`}
                  />
                )}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default Panel;
