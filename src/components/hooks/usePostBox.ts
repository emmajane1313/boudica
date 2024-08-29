import { useRef, useState } from "react";
import { Profile } from "../../../graphql/generated";

const usePostBox = () => {
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
    setCargandoConexion(true);
    try {
    } catch (err: any) {
      console.error(err.message);
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
    hacerPublicacion
  };
};

export default usePostBox;
