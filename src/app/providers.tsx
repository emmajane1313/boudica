"use client";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { polygon } from "wagmi/chains";
import { createContext, SetStateAction, useState } from "react";
import { Profile } from "../../graphql/generated";
import { ErrorTipo, Indexar } from "@/components/types/principal.types";

const config = getDefaultConfig({
  appName: "Boudica",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
  chains: [polygon],
  transports: {
    [polygon.id]: http(
      `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export const ModalContext = createContext<
  | {
      lensConectado: Profile | undefined;
      setLensConectado: (e: SetStateAction<Profile | undefined>) => void;
      indexar: Indexar;
      setIndexar: (e: SetStateAction<Indexar>) => void;
      errorInteraccion: ErrorTipo;
      setErrorInteraccion: (e: SetStateAction<ErrorTipo>) => void;
      mostrarDetalles: string | undefined;
      setMostrarDetalles: (e: SetStateAction<string | undefined>) => void;
    }
  | undefined
>(undefined);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [lensConectado, setLensConectado] = useState<Profile | undefined>();
  const [indexar, setIndexar] = useState<Indexar>(Indexar.Inactivo);
  const [errorInteraccion, setErrorInteraccion] = useState<ErrorTipo>(
    ErrorTipo.Inactivo
  );
  const [mostrarDetalles, setMostrarDetalles] = useState<string | undefined>();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ModalContext.Provider
            value={{
              lensConectado,
              setLensConectado,
              indexar,
              setIndexar,
              errorInteraccion,
              setErrorInteraccion,
              mostrarDetalles,
              setMostrarDetalles,
            }}
          >
            {children}
          </ModalContext.Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
