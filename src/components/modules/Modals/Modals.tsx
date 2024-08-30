import { Dictionary, Indexar } from "@/components/types/principal.types";
import { FunctionComponent, SetStateAction } from "react";
import { Profile } from "../../../../graphql/generated";
import Index from "./Index";
import Error from "./Error";

const Modals: FunctionComponent<{
  dict: Dictionary;
  indexar: Indexar;
  errorInteraccion: boolean;
  setErrorInteraccion: (e: SetStateAction<boolean>) => void;
}> = ({
  dict,
  errorInteraccion,
  indexar,
  setErrorInteraccion,
}): JSX.Element => {
  return (
    <>
      {indexar !== Indexar.Inactivo && <Index dict={dict} tipo={indexar!} />}
      {errorInteraccion && (
        <Error dict={dict} setErrorInteraccion={setErrorInteraccion!} />
      )}
    </>
  );
};

export default Modals;
