import { MutableRefObject, SetStateAction, useEffect, useState } from "react";
import getPublications from "../../../graphql/lens/queries/publications";
import {
  Comment,
  LimitType,
  Post,
  Profile,
  PublicationType,
  Quote,
} from "../../../graphql/generated";
import { PageFlip } from "page-flip";

const useGuemara = (
  pageFlipRef: MutableRefObject<PageFlip | null>,
  lensConectado: Profile | undefined,
  guemara: boolean,
  mostrarDetalles: string | undefined,
  setMostrarDetalles: (e: SetStateAction<string | undefined>) => void
) => {
  const [guemaraCargando, setGuemaraCargando] = useState<boolean>(false);
  const [masGuemaraCargando, setMasGuemaraCargando] = useState<boolean>(false);
  const [guemaraActual, setGuemaraActual] = useState<Post[]>([]);
  const [guemaraUbi, setGuemaraUbi] = useState<string | undefined>();
  const [indice, setIndice] = useState<number>(0);
  const [detallesIndice, setDetallesIndice] = useState<number>(0);
  const [detallesActual, setDetallesActual] = useState<(Comment | Quote)[]>([]);
  const [detallesUbi, setDetallesUbi] = useState<{
    commentarios: string | undefined;
    citas: string | undefined;
  }>({
    commentarios: undefined,
    citas: undefined,
  });

  const llamarGuemara = async () => {
    setGuemaraCargando(true);
    try {
      const { data } = await getPublications(
        {
          limit: LimitType.Ten,
          where: {
            publicationTypes: [PublicationType.Post],
            metadata: {
              publishedOn: ["npcStudio"],
              //   publishedOn: ["boudica"],
              tags: {
                all: ["npcStudio"],
                // all: [
                //   "boudica",
                //   "page" + pageFlipRef?.current?.getCurrentPageIndex()?.toString(),
                // ],
              },
            },
          },
        },
        lensConectado?.id
      );

      setGuemaraActual(
        [...(data?.publications?.items || [])]?.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ) as Post[]
      );
      setGuemaraUbi(
        data?.publications?.items?.length !== 10
          ? undefined
          : data?.publications?.pageInfo?.next
      );
    } catch (err: any) {
      console.error(err.message);
    }
    setGuemaraCargando(false);
  };

  const llamarMasGuemara = async () => {
    if (!guemaraUbi) return;
    setMasGuemaraCargando(true);
    try {
      const { data } = await getPublications(
        {
          limit: LimitType.Ten,
          cursor: guemaraUbi,
          where: {
            publicationTypes: [PublicationType.Post],
            metadata: {
              publishedOn: ["npcStudio"],
              //   publishedOn: ["boudica"],
              tags: {
                all: ["npcStudio"],
                // all: [
                //   "boudica",
                //   "page" + pageFlipRef?.current?.getCurrentPageIndex()?.toString(),
                // ],
              },
            },
          },
        },
        lensConectado?.id
      );

      setGuemaraActual(
        [...guemaraActual, ...(data?.publications?.items || [])]?.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ) as Post[]
      );
      setGuemaraUbi(
        data?.publications?.items?.length !== 10
          ? undefined
          : data?.publications?.pageInfo?.next
      );
    } catch (err: any) {
      console.error(err.message);
    }
    setMasGuemaraCargando(false);
  };

  const llamarDetalles = async () => {
    setMasGuemaraCargando(true);

    try {
      const comentarios = await getPublications(
        {
          where: {
            commentOn: {
              id: mostrarDetalles,
            },
          },
          limit: LimitType.Ten,
        },
        lensConectado?.id
      );

      const citas = await getPublications(
        {
          where: {
            quoteOn: mostrarDetalles,
          },
          limit: LimitType.Ten,
        },
        lensConectado?.id
      );

      setDetallesActual(
        [
          ...([...(comentarios?.data?.publications?.items || [])]?.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ) as Comment[]),

          ...([...(citas?.data?.publications?.items || [])]?.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ) as Quote[]),
        ].sort(() => 0.5 - Math.random())
      );

      setDetallesUbi({
        commentarios:
          comentarios?.data?.publications?.items?.length !== 10
            ? undefined
            : comentarios?.data?.publications?.pageInfo?.next,
        citas:
          citas?.data?.publications?.items?.length !== 10
            ? undefined
            : citas?.data?.publications?.pageInfo?.next,
      });
    } catch (err: any) {
      console.error(err.message);
    }
    setMasGuemaraCargando(false);
  };

  const llamarMasDetalles = async () => {
    if (!detallesUbi?.citas && !detallesUbi?.commentarios) return;
    setMasGuemaraCargando(true);
    try {
      let comentarios, citas;
      if (detallesUbi?.commentarios) {
        comentarios = await getPublications(
          {
            where: {
              commentOn: {
                id: mostrarDetalles,
              },
            },
            limit: LimitType.Ten,
            cursor: detallesUbi?.commentarios,
          },
          lensConectado?.id
        );
      }

      if (detallesUbi?.citas) {
        citas = await getPublications(
          {
            where: {
              quoteOn: mostrarDetalles,
            },
            limit: LimitType.Ten,
            cursor: detallesUbi?.citas,
          },
          lensConectado?.id
        );
      }

      setDetallesActual([
        ...detallesActual,
        ...[
          ...([...(comentarios?.data?.publications?.items || [])]?.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ) as Comment[]),

          ...([...(citas?.data?.publications?.items || [])]?.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ) as Quote[]),
        ].sort(() => 0.5 - Math.random()),
      ]);

      setDetallesUbi({
        commentarios:
          comentarios?.data?.publications?.items?.length !== 10
            ? undefined
            : comentarios?.data?.publications?.pageInfo?.next,
        citas:
          citas?.data?.publications?.items?.length !== 10
            ? undefined
            : citas?.data?.publications?.pageInfo?.next,
      });
    } catch (err: any) {
      console.error(err.message);
    }
    setMasGuemaraCargando(false);
  };

  useEffect(() => {
    if (guemaraActual?.length < 1 && guemara) {
      llamarGuemara();
    }
  }, []);

  useEffect(() => {
    if (guemaraUbi) {
      llamarMasGuemara();
    }
  }, [indice]);

  useEffect(() => {
    if (mostrarDetalles) {
      llamarDetalles();
    }
  }, [mostrarDetalles]);

  useEffect(() => {
    if (detallesUbi && mostrarDetalles) {
      llamarMasDetalles();
    }
  }, [detallesIndice]);

  useEffect(() => {
    (window as any).mostrarDetallesHandler = (id: string) =>
      setMostrarDetalles(id);
  }, [setMostrarDetalles]);

  return {
    guemaraCargando,
    guemaraActual,
    guemaraUbi,
    indice,
    setIndice,
    masGuemaraCargando,
    setMostrarDetalles,
    detallesIndice,
    setDetallesIndice,
    mostrarDetalles,
    detallesUbi,
    detallesActual,
  };
};

export default useGuemara;
