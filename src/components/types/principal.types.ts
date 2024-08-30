export type PrincipalProps = {
  dict: Dictionary;
};

export type Dictionary = {
  Home: {
    gemara: string;
    idioma: string;
    publicacion: string;
    billetera: string;
    lens: string;
    error: string;
    send: string;
  };
  "404": {
    nada: string;
  };
};

export enum Indexar {
  Inactivo = "inactivo",
  Exito = "success",
  Indexando = "indexing",
}
