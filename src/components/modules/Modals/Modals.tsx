import {
  Dictionary,
  ErrorTipo,
  Indexar,
} from "@/components/types/principal.types";
import { FunctionComponent, SetStateAction } from "react";
import Index from "./Index";
import Error from "./Error";

const Modals: FunctionComponent<{
  dict: Dictionary;
  indexar: Indexar;
  errorInteraccion: ErrorTipo;
  setErrorInteraccion: (e: SetStateAction<ErrorTipo>) => void;
  path: string;
}> = ({
  dict,
  errorInteraccion,
  indexar,
  setErrorInteraccion,
  path,
}): JSX.Element => {
  return (
    <>
      {indexar !== Indexar.Inactivo && (
        <Index path={path} dict={dict} tipo={indexar!} />
      )}
      {errorInteraccion !== ErrorTipo.Inactivo && (
        <Error
          errorInteraccion={errorInteraccion}
          dict={dict}
          setErrorInteraccion={setErrorInteraccion!}
          path={path}
        />
      )}
    </>
  );
};

export default Modals;
