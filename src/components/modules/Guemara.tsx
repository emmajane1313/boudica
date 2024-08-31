import { FunctionComponent } from "react";
import { Profile } from "../../../graphql/generated";
import { Dictionary } from "../types/principal.types";

const Guemara: FunctionComponent<{
  dict: Dictionary;
  lensConectado: Profile | undefined;
}> = ({ dict, lensConectado }): JSX.Element => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-start justify-between flex-col gap-3 p-4">
      <div className="relative w-full h-full flex items-center justify-start flex-row gap-3">
        <div className="relative w-full h-full flex border border-white"></div>
        <div className="relative w-full h-full flex border border-white"></div>

        <div className="relative w-full h-full flex border border-white"></div>
      </div>
      <div className="relative w-full h-full flex items-center justify-between flex-row gap-3">
        <div className="relative w-full h-full flex items-start justify-start flex-col gap-3">
          <div className="relative w-3/4 h-full flex border border-white"></div>
          <div className="relative w-3/4 h-full flex border border-white"></div>
        </div>
        <div className="relative w-full h-full flex items-end justify-start flex-col gap-3">
          <div className="relative w-3/4 h-full flex border border-white"></div>
          <div className="relative w-3/4 h-full flex border border-white"></div>
        </div>
      </div>
      <div className="relative w-full h-full flex items-center justify-start flex-row gap-3">
        <div className="relative w-full h-full flex border border-white"></div>

        <div className="relative w-full h-full flex border border-white"></div>

        <div className="relative w-full h-full flex border border-white"></div>
      </div>
    </div>
  );
};

export default Guemara;
