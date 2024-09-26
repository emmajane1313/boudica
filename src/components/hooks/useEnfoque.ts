import { useEffect, useRef, useState } from "react";
import { PageFlip } from "page-flip";
import { COVERS } from "@/lib/constants";
import { usePathname, useRouter } from "next/navigation";

const useEnfoque = () => {
  const router = useRouter();
  const path = usePathname();
  const [nivelZoom, setNivelZoom] = useState<number>(0.1);
  const [guemara, setGuemara] = useState<boolean>(false);
  const [publicacion, setPublicacion] = useState<boolean>(false);
  const [posicion, setPosicion] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [empezarArrastre, setEmpezarArrastre] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const bookRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageFlipRef = useRef<PageFlip | null>(null);
  const [arrastrando, setArrastrando] = useState<boolean>(false);

  const manejarRecentrar = () => {
    setPosicion({
      x: 0,
      y: 0,
    });
    setNivelZoom(0.1);
  };

  useEffect(() => {
    const manejarRueda = (e: WheelEvent) => {
      e.preventDefault();
      setNivelZoom((prevZoom) => {
        const zoomNuevo = prevZoom * (1 - e.deltaY * 0.001);
        return Math.min(Math.max(zoomNuevo, 0.1), 5);
      });
    };

    const manejarMouseDown = (e: MouseEvent) => {
      setArrastrando(true);
      setEmpezarArrastre({
        x: e.clientX - posicion.x,
        y: e.clientY - posicion.y,
      });
    };

    const manejarMouseMove = (e: MouseEvent) => {
      if (arrastrando) {
        setPosicion({
          x: e.clientX - empezarArrastre.x,
          y: e.clientY - empezarArrastre.y,
        });
      }
    };

    const manejarMouseUp = () => {
      setArrastrando(false);
    };

    const manejarTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      setArrastrando(true);
      setEmpezarArrastre({
        x: touch.clientX - posicion.x,
        y: touch.clientY - posicion.y,
      });
    };

    const manejarTouchMove = (e: TouchEvent) => {
      if (arrastrando) {
        const touch = e.touches[0];
        setPosicion({
          x: touch.clientX - empezarArrastre.x,
          y: touch.clientY - empezarArrastre.y,
        });
      }
    };

    const container = bookRef.current;
    const container1 = containerRef.current;
    if (container && container1) {
      container.addEventListener("wheel", manejarRueda);
      container.addEventListener("mousedown", manejarMouseDown);
      container1.addEventListener("mousemove", manejarMouseMove);
      container1.addEventListener("mouseup", manejarMouseUp);
      container1.addEventListener("mouseleave", manejarMouseUp);
      container1.addEventListener("touchstart", manejarTouchStart);
      container1.addEventListener("touchmove", manejarTouchMove);
      container1.addEventListener("touchend", manejarMouseUp);
    }

    return () => {
      if (container && container1) {
        container.removeEventListener("wheel", manejarRueda);
        container.removeEventListener("mousedown", manejarMouseDown);
        container1.removeEventListener("mousemove", manejarMouseMove);
        container1.removeEventListener("mouseup", manejarMouseUp);
        container1.removeEventListener("mouseleave", manejarMouseUp);
        container1.removeEventListener("touchstart", manejarTouchStart);
        container1.removeEventListener("touchmove", manejarTouchMove);
        container1.removeEventListener("touchend", manejarMouseUp);
      }
    };
  }, [arrastrando, empezarArrastre, posicion]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setNivelZoom(0.3);
    }
  }, []);

  useEffect(() => {
    if (bookRef.current && !pageFlipRef.current && COVERS?.length > 0) {
      const padre = document.getElementById("padre");
      if (padre) {
        pageFlipRef.current = new PageFlip(bookRef.current, {
          width: 1072,
          height: 1344,
          maxShadowOpacity: 0.5,
          showCover: true,
          mobileScrollSupport: true,
          showPageCorners: true,
          autoSize: true,
          useMouseEvents: true,
        });

        pageFlipRef.current.loadFromHTML(document.querySelectorAll(".page"));
      }
    }

    return () => {
      if (pageFlipRef.current) {
        pageFlipRef.current.destroy();
        pageFlipRef.current = null;
      }
    };
  }, []);

  const manejarIdioma = () => {
    router.push(
      path.includes("/es/")
        ? path.replace("/es/", "/en/")
        : path.includes("/en/")
        ? path.replace("/en/", "/pt/")
        : path.includes("/pt/")
        ? path.replace("/pt/", "/ar/")
        : path.includes("/ar/")
        ? path.replace("/ar/", "/fa/")
        : path.includes("/fa/")
        ? path.replace("/fa/", "/uk/")
        : path.includes("/uk/")
        ? path.replace("/uk/", "/he/")
        : path.includes("/he/")
        ? path.replace("/he/", "/yi/")
        : path.includes("/yi/")
        ? path.replace("/yi/", "/ja/")
        : path.includes("/ja/")
        ? path.replace("/ja/", "/fr/")
        : path.includes("/fr/")
        ? path.replace("/fr/", "/hu/")
        : path.includes("/hu/")
        ? path.replace("/hu/", "/ym/")
        : path.includes("/ym/")
        ? path.replace("/ym/", "/tu/")
        : path.replace("/tu/", "/es/")
    );
  };

  return {
    nivelZoom,
    arrastrando,
    posicion,
    bookRef,
    guemara,
    setGuemara,
    pageFlipRef,
    containerRef,
    manejarIdioma,
    publicacion,
    setPublicacion,
    manejarRecentrar,
  };
};

export default useEnfoque;
