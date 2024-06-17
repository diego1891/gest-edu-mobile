export interface EscolaridadResponse {
  estudiante: Estudiante;
  carrera: Carrera;
  creditosAprobados: number;
  semestres: Semestre[];
}

export interface Carrera {
  id: number;
  nombre: string;
  descripcion: string;
  duracionAnios: number;
  creditos: number;
  existePlanEstudio: boolean;
}

export interface Estudiante {
  id: number;
  ci: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  domicilio: string;
  fechaNac: Date;
  imagen: string;
  tipoUsuario: string;
}

export interface Semestre {
  anio: number;
  semestre: number;
  asignaturas: Asignatura[];
}

export interface Asignatura {
  id: number;
  nombre: string;
  creditos: number;
  cursos: Curso[];
  examenes: Examen[];
}

export interface Curso {
  id: number;
  fechaFinCurso: Date;
  calificacion: string;
}

export interface Examen {
  id: number;
  fechaExamen: Date;
  calificacion: string;
}
