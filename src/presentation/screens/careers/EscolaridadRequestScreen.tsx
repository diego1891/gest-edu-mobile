import React, { useState, useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { gestEduApi } from '../../../config/api/GestEduApi';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';
import { EscolaridadResponse } from '../../../domain/entities/EscolaridadResponse';
import { Spinner } from '@ui-kitten/components';

type EscolaridadRequestScreenRouteProp = RouteProp<RootStackParams, 'Escolaridad'>;

const EscolaridadRequestScreen = () => {
  const [data, setData] = useState<EscolaridadResponse | null>(null);
  const route = useRoute<EscolaridadRequestScreenRouteProp>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEscolaridadData = async () => {
      try {
        const response = await gestEduApi.get<EscolaridadResponse>(
          `/estudiantes/${route.params.career.id}/escolaridad`
        );
        setData(response.data);
      } catch (error) {
        Alert.alert('Error', 'Ocurrió un error al obtener la escolaridad.');
      } finally {
        setLoading(false);
      }
    };

    fetchEscolaridadData();
  }, [route.params.career.id]);

  const generatePDF = async () => {
    if (!data) {
      Alert.alert('Error', 'No hay datos para generar el PDF');
      return;
    }

    const { estudiante, carrera, creditosAprobados, semestres } = data;

    let htmlContent = `
      <h1>Informe de Escolaridad</h1>
      <h2>Información del Estudiante</h2>
      <p>Nombre: ${estudiante.nombre} ${estudiante.apellido}</p>
      <p>CI: ${estudiante.ci}</p>
      <p>Email: ${estudiante.email}</p>
      <p>Teléfono: ${estudiante.telefono}</p>
      <p>Domicilio: ${estudiante.domicilio}</p>
      <p>Fecha de Nacimiento: ${new Date(estudiante.fechaNac).toLocaleDateString()}</p>
      
      <h2>Información de la Carrera</h2>
      <p>Nombre: ${carrera.nombre}</p>
      <p>Descripción: ${carrera.descripcion}</p>
      <p>Duración: ${carrera.duracionAnios} Años</p>
      <p>Créditos Totales: ${carrera.creditos}</p>
      
      <h2>Créditos Aprobados</h2>
      <p>${creditosAprobados}</p>
      
      <h2>Detalle por Semestre</h2>
    `;

    semestres.forEach((semestre) => {
      htmlContent += `<h3>Año: ${semestre.anio}, Semestre: ${semestre.semestre}</h3>`;
      semestre.asignaturas.forEach((asignatura) => {
        htmlContent += `<h4>Asignatura: ${asignatura.nombre}</h4>`;
        htmlContent += `<p>Créditos: ${asignatura.creditos}</p>`;
        htmlContent += `<p><strong>Cursos</strong></p><ul>`;
        asignatura.cursos.forEach((curso) => {
          htmlContent += `<li>Fecha Fin: ${new Date(curso.fechaFinCurso).toLocaleDateString()}, Calificación: ${curso.calificacion}</li>`;
        });
        htmlContent += `</ul>`;
        htmlContent += `<p><strong>Exámenes</strong></p><ul>`;
        asignatura.examenes.forEach((examen) => {
          htmlContent += `<li>Fecha: ${new Date(examen.fechaExamen).toLocaleDateString()}, Calificación: ${examen.calificacion}</li>`;
        });
        htmlContent += `</ul>`;
      });
    });

    const options = {
      html: htmlContent,
      fileName: 'escolaridad',
      directory: 'Documents',
    };

    try {
      const pdf = await RNHTMLtoPDF.convert(options);
      Alert.alert(
        'PDF Generado',
        `El PDF ha sido guardado en: ${pdf.filePath}`,
      );
    } catch (error) {
      console.error('Error al generar el PDF', error);
      Alert.alert('Error', 'No se pudo generar el PDF');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      {loading ? (
        <Spinner size="large" />
      ) : (
        <Button title="Generar PDF" onPress={generatePDF} />
      )}
    </View>
  );
};

export default EscolaridadRequestScreen;
