import { useEffect, useRef, useState } from "react";
import { PageFlip } from "page-flip";
import { COVERS } from "@/lib/constants";

const useEnfoque = () => {
  const [nivelZoom, setNivelZoom] = useState<number>(0.5);
  const containerRef = useRef<HTMLDivElement>(null);
  const [gemara, setGemara] = useState<boolean>(false);
  const [posicion, setPosicion] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [empezarArrastre, setEmpezarArrastre] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const pageFlipRef = useRef<PageFlip | null>(null);
  const [arrastrando, setArrastrando] = useState<boolean>(false);

  useEffect(() => {
    const manejarRueda = (e: WheelEvent) => {
      e.preventDefault();
      setNivelZoom((prevZoom) => {
        const zoomNuevo = prevZoom * (1 - e.deltaY * 0.001);
        return Math.min(Math.max(zoomNuevo, 0.3), 5);
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

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", manejarRueda);
      container.addEventListener("mousedown", manejarMouseDown);
      container.addEventListener("mousemove", manejarMouseMove);
      container.addEventListener("mouseup", manejarMouseUp);
      container.addEventListener("mouseleave", manejarMouseUp);
      container.addEventListener("touchstart", manejarTouchStart);
      container.addEventListener("touchmove", manejarTouchMove);
      container.addEventListener("touchend", manejarMouseUp);
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", manejarRueda);
        container.removeEventListener("mousedown", manejarMouseDown);
        container.removeEventListener("mousemove", manejarMouseMove);
        container.removeEventListener("mouseup", manejarMouseUp);
        container.removeEventListener("mouseleave", manejarMouseUp);
        container.removeEventListener("touchstart", manejarTouchStart);
        container.removeEventListener("touchmove", manejarTouchMove);
        container.removeEventListener("touchend", manejarMouseUp);
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
          width: 453,
          height: 320,
          maxShadowOpacity: 0.5,
          showCover: true,
          mobileScrollSupport: true,
          showPageCorners: true,
          autoSize: true,
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

  return {
    nivelZoom,
    containerRef,
    arrastrando,
    posicion,
    imageRef,
    bookRef,
    gemara,
    setGemara,
  };
};

export default useEnfoque;
