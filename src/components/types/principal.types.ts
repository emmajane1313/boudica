export type PrincipalProps = {
  dict: Dictionary;
};

export type Dictionary = {
  Home: {
    guemara: string;
    idioma: string;
    publicacion: string;
    billetera: string;
    lensHandle: string;
    lens: string;
    error: string;
    comentario: string;
    send: string;
    recentrar: string;
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

export enum ErrorTipo {
  Todo,
  Lens,
  Inactivo,
}
