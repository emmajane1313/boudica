import { FunctionComponent } from "react";
import { Profile } from "../../../graphql/generated";
import { Dictionary } from "../types/principal.types";

const Guemara: FunctionComponent<{
  dict: Dictionary;
  lensConectado: Profile | undefined;
}> = ({ dict, lensConectado }): JSX.Element => {
  return <div></div>;
};

export default Guemara;
