import { INFURA_GATEWAY } from "@/lib/constants";
import Image from "next/legacy/image";
import { Dictionary } from "../types/principal.types";

const Panel = ({
  manejarIdioma,
  manejarGemara,
  dict,
  manejarPublicacion,
}: {
  manejarIdioma: () => void;
  manejarGemara: () => void;
  manejarPublicacion: () => void;
  dict: Dictionary;
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
        },
        {
          imagen: "QmWkAoCCBLSkK4ZhRo6Q3ZPrMHYDfuFQWMThgbREWwVMj7",
          titulo: dict.Home.gemara,
          funcion: () => manejarGemara(),
        },
        {
          imagen: "QmarDKzwhbgnw6gdkDmbyEtJYia9889foeHobexLhvCjz1",
          titulo: dict.Home.publicacion,
          funcion: () => manejarPublicacion(),
        },
      ].map(
        (
          elemento: {
            imagen: string;
            titulo: string;
            funcion: () => void;
          },
          indice: number
        ) => {
          return (
            <div
              className="relative w-fit h-fit flex items-center justify-center cursor-pointer active:scale-95"
              title={elemento.titulo}
              key={indice}
              onClick={() => elemento.funcion()}
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                <Image
                  layout="fill"
                  objectFit="contain"
                  draggable={false}
                  src={`${INFURA_GATEWAY}/ipfs/${elemento.imagen}`}
                />
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default Panel;
