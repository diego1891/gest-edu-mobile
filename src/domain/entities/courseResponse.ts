export interface CourseResponse {
    id:           number;
    fechaInicio:  Date;
    fechaFin:     Date;
    diasPrevInsc: number;
    estado:       string;
    asignaturaId: number;
    docenteId:    number;
}
