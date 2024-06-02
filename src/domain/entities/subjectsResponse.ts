export interface SubjectsResponse {
    content: Subject[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    first: boolean;
    numberOfElements: number;
    size: number;
    number: number;
    sort: Sort;
    empty: boolean;
  }
  
  export interface Subject {
    id: number;
    nombre: string;
    descripcion: string;
    creditos: number;
    semestrePlanEstudio: number;
    carreraId: number;
  }
  
  export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  }
  
  export interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  }
  