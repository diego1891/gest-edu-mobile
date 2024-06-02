export interface CertificateResponse {
    id:               number;
    estudiante:       Estudiante;
    codigoValidacion: string;
    carrera:          string;
    fecha:            Date;
}

export interface Estudiante {
    id:        number;
    ci:        string;
    nombre:    string;
    apellido:  string;
    email:     string;
    password:  null;
    telefono:  string;
    domicilio: string;
    fechaNac:  null;
    imagen:    null;
}
