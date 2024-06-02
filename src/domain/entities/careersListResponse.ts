export interface Careers {
    content:          Content[];
    pageable:         Pageable;
    last:             boolean;
    totalElements:    number;
    totalPages:       number;
    first:            boolean;
    numberOfElements: number;
    size:             number;
    number:           number;
    sort:             Sort;
    empty:            boolean;
}

export interface Content {
    id:                number;
    nombre:            string;
    descripcion:       string;
    duracionAnios:     number;
    creditos:          number;
    existePlanEstudio: boolean;
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
    sorted:   boolean;
    unsorted: boolean;
    empty:    boolean;
}
