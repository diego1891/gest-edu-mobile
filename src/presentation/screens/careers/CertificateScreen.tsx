import React, {useEffect, useState} from 'react';
import {View, Button, Alert} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {gestEduApi} from '../../../config/api/GestEduApi';
import {RootStackParams} from '../../navigation/StackNavigator';
import {RouteProp, useRoute} from '@react-navigation/native';
import {CertificateResponse} from '../../../domain/entities/CertificateResponse';

type CertificateScreenRouteProp = RouteProp<RootStackParams, 'Certificate'>;

const CertificateScreen = () => {
  const [data, setData] = useState<CertificateResponse | null>(null);
  const route = useRoute<CertificateScreenRouteProp>();
  const [selectedCareerId, setSelectedCareerId] = useState<number | null>(null);

  useEffect(() => {
    if (route.params?.career?.id) {
      setSelectedCareerId(route.params.career.id);
      fetchCertificateData(route.params.career.id);
    }
  }, [route.params]);

  const fetchCertificateData = async (careerId: number) => {
    try {
      const response = await gestEduApi.get<CertificateResponse>(
        `/estudiantes/${careerId}/certificado`,
      );
      if (response.status === 200) {
        setData(response.data);
      } else {
        Alert.alert('Error', 'No se pudo obtener el certificado.');
      }
    } catch (error) {
      console.error('Error fetching certificate data:', error);
      Alert.alert('Error', 'Ocurrió un error al obtener el certificado.');
    }
  };

  const generatePDF = async () => {
    if (!data) {
      Alert.alert('Error', 'No hay datos para generar el PDF');
      return;
    }

    const {estudiante, carrera, fecha, codigoValidacion} = data;

    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            h1 {
              color: #802C2C;
              text-align: center;
            }
            p {
              font-size: 14px;
              color: #000;
              margin: 10px 0;
            }
            .label {
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <h1>Certificado de Estudiante</h1>
          <p><span class="label">Nombre:</span> ${estudiante.nombre} ${estudiante.apellido}</p>
          <p><span class="label">CI:</span> ${estudiante.ci}</p>
          <p><span class="label">Carrera:</span> ${carrera}</p>
          <p><span class="label">Fecha:</span> ${new Date(fecha).toLocaleDateString()}</p>
          <p><span class="label">Código de Validación:</span> ${codigoValidacion}</p>
        </body>
      </html>
    `;

    const options = {
      html: htmlContent,
      fileName: 'certificado',
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
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Generar PDF" onPress={generatePDF} />
    </View>
  );
};

export default CertificateScreen;
