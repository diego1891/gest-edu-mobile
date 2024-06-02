export interface ExamResponse {
    content:          Content[];
    pageable:         Pageable;
    last:             boolean;
    totalElements:    number;
    totalPages:       number;
    size:             number;
    number:           number;
    sort:             Sort;
    numberOfElements: number;
    first:            boolean;
    empty:            boolean;
}

export interface Content {
    id:           number;
    fecha:        Date;
    diasPrevInsc: number;
    asignatura:   Asignatura;
    docentes:     Docente[];
}

export interface Asignatura {
    id:                  number;
    nombre:              string;
    descripcion:         string;
    creditos:            number;
    semestrePlanEstudio: number;
    carreraId:           number;
}

export interface Docente {
    id:        number;
    documento: string;
    nombre:    string;
    apellido:  string;
}

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}
