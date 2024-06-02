export interface GuideStep {
    id: string;
    title: string;
    description: string;
    //image: any; // Puedes ajustar el tipo según tu manejo de imágenes
  }
  
  export interface Guide {
    id: string;
    title: string;
    summary: string;
    //image: any;
    steps: GuideStep[];
  }
  
  export const guides: Guide[] = [
    {
      id: '1',
      title: 'Inscribirse a Carrera',
      summary: 'Sigue estos pasos para inscribirte en una carrera.',
      //image: require('../../../assets/instructions/enroll.png'),
      steps: [
        { id: '1', title: 'Paso 1: Selecciona "Carrera"', description: 'En el menú principal, selecciona la opción de carrera.'},
        { id: '2', title: 'Paso 2: Selecciona "Inscripción a Carrera"', description: 'En el nuevo menú, selecciona la opción de inscripción.'},
        { id: '3', title: 'Paso 3: Elige tu Carrera', description: 'Selecciona la carrera a la que deseas inscribirte.' },
        { id: '4', title: 'Paso 4: Confirma tu Inscripción', description: 'Revisa los detalles y confirma tu inscripción.'},
      ],
    },
    {
      id: '2',
      title: 'Editar Perfil',
      summary: 'Sigue estos pasos para editar tu perfil.',
      //image: require('../../../assets/instructions/enroll.png'),
      steps: [
        { id: '1', title: 'Paso 1: Selecciona "Perfil"', description: 'En el menú principal, selecciona la opción de perfil.'},
        { id: '2', title: 'Paso 2: Selecciona la opción de editar datos', description: 'Selecciona el botón para editar los datos.' },
        { id: '3', title: 'Paso 3: Edita los datos y confirma', description: 'Revisa los detalles y confirma la edición.'},
      ],
    },
    {
      id: '3',
      title: 'Inscribirse a Examen',
      summary: 'Sigue estos pasos para inscribirte en un examen.',
      //image: require('../../../assets/instructions/enroll.png'),
      steps: [
        { id: '1', title: 'Paso 1: Selecciona "Examen"', description: 'En el menú principal, selecciona la opción de examen.'},
        { id: '2', title: 'Paso 2: Selecciona "Inscripción a Examen"', description: 'En el nuevo menú, selecciona la opción de inscripción.'},
        { id: '3', title: 'Paso 3: Elige tu Carrera', description: 'Selecciona la carrera que corresponde el examen.' },
        { id: '4', title: 'Paso 4: Elige tu Asignatura', description: 'Selecciona la asignatura que le corresponde el examen.' },
        { id: '5', title: 'Paso 5: Confirma tu Inscripción', description: 'Selecciona el examen y confirma tu inscripción.'},
      ],
    },
  ];
  