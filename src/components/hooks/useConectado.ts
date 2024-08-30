import {
  getAuthenticationToken,
  isAuthExpired,
  refreshAuth,
  removeAuthenticationToken,
  setAuthenticationToken,
} from "@/lib/utils";
import { SetStateAction, useEffect, useState } from "react";
import getDefaultProfile from "../../../graphql/lens/queries/default";
import generateChallenge from "../../../graphql/lens/queries/challenge";
import authenticate from "../../../graphql/lens/mutations/authenticate";
import { Profile } from "../../../graphql/generated";
import { useSignMessage } from "wagmi";

const useConectado = (
  address: `0x${string}` | undefined,
  isConnected: boolean,
  setLensConectado: (e: SetStateAction<Profile | undefined>) => void,
  openAccountModal: (() => void) | undefined,
  lensConectado: Profile | undefined
) => {
  const { signMessageAsync } = useSignMessage();
  const [lensCargando, setLensCargando] = useState<boolean>(false);

  const manejarSalir = () => {
    if (openAccountModal) {
      openAccountModal();
    }
    removeAuthenticationToken();
    setLensConectado(undefined);
  };

  const manejarLens = async () => {
    setLensCargando(true);
    try {
      const profile = await getDefaultProfile(
        {
          for: address,
        },
        lensConectado?.id
      );

      if (profile?.data?.defaultProfile?.id) {
        const challengeResponse = await generateChallenge({
          for: profile?.data?.defaultProfile?.id,
          signedBy: address,
        });
        const signature = await signMessageAsync({
          message: challengeResponse.data?.challenge.text!,
        });
        const accessTokens = await authenticate({
          id: challengeResponse.data?.challenge.id,
          signature: signature,
        });
        if (accessTokens) {
          setAuthenticationToken({ token: accessTokens.data?.authenticate! });
          setLensConectado(profile?.data?.defaultProfile as Profile);
        }
      } else {
        setLensConectado(undefined);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setLensCargando(false);
  };

  const manejarRefrescarPerfil = async (): Promise<void> => {
    try {
      const profile = await getDefaultProfile(
        {
          for: address,
        },
        lensConectado?.id
      );
      if (profile?.data?.defaultProfile) {
        setLensConectado(profile?.data?.defaultProfile as Profile);
      } else {
        removeAuthenticationToken();
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (!isConnected) {
      setLensConectado(undefined);
    }
  }, [isConnected]);

  useEffect(() => {
    const manejarAutenticicacion = async () => {
      const token = getAuthenticationToken();
      if (isConnected && !token) {
        setLensConectado(undefined);
        removeAuthenticationToken();
      } else if (isConnected && token) {
        if (isAuthExpired(token?.exp)) {
          const refreshedAccessToken = await refreshAuth();
          if (!refreshedAccessToken) {
            removeAuthenticationToken();
          }
        }
        await manejarRefrescarPerfil();
      }
    };

    manejarAutenticicacion();
  }, [isConnected, address]);

  return {
    lensCargando,
    manejarLens,
    manejarSalir
  };
};

export default useConectado;
