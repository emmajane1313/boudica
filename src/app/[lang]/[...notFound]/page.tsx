import Link from "next/link";
import { getDictionary } from "../dictionaries";
import { usePathname } from "next/navigation";

export default async function NotFound({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);
  const path = usePathname();
  return (
    <div
      className={`relative w-full h-screen flex items-center justify-center text-center text-2xl text-white break-words ${
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
      <Link
        className="cursor-pointer w-fit h-fit flex items-center justify-center"
        href="/"
      >
        {dict[404].nada}
      </Link>
    </div>
  );
}
