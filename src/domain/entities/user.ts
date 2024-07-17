export interface User {
    ci: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    domicilio: string;
    fechaNac: Date | string;
    imagen?: string;
    password?: string;
  }
  