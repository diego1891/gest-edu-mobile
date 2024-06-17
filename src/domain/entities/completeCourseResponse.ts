export interface CompleteCourseResponse {
    cursoId:               string;
    fechaInicio:      Date;
    fechaFin:         Date;
    diasPrevInsc:     number;
    estado:           string;
    asignaturaNombre: string;
    docenteNombre:    string;
    docenteApellido:  string;
    horarios:         any[];
}
