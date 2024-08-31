"use client";

import { Dictionary } from "@/components/types/principal.types";

function Index({
  dict,
  tipo,
  path,
}: {
  dict: Dictionary;
  tipo: string;
  path: string;
}) {
  return (
    <div className="fixed bottom-5 right-5 w-fit h-fit z-200">
      <div className="w-fit h-10 sm:h-16 flex items-center justify-center text-white rounded-md bg-black">
        <div
          className={`relative w-fit h-fit flex items-center justify-center px-4 py-2 text-xs ${
            path?.includes("/ar/")
              ? "font-ruw"
              : path?.includes("/uk/")
              ? "font-ad"
              : path?.includes("/ja/")
              ? "font-gen"
              : path?.includes("/he/") || path?.includes("/yi/")
              ? "font-noto"
              : path?.includes("/fa/")
              ? "font-zar"
              : "font-conso"
          }`}
        >
          {dict.Home?.[tipo as unknown as keyof typeof dict.Home]}
        </div>
      </div>
    </div>
  );
}

export default Index;
