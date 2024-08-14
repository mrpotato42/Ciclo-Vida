// Función principal
function main(templateId, folderDestinoId, templateType) {
  try {
    // Obtiene la hoja de origen (primera hoja de la hoja de cálculo)
    const sourceSheet = getSourceSheet();
    // Obtiene la última fila con datos de la hoja de origen
    const lastRow = sourceSheet.getLastRow();

    // Itera sobre cada fila, comenzando desde la segunda (ignorando encabezados)
    for (let i = 2; i <= lastRow; i++) {
      // Obtiene los datos de la fila actual
      const rowData = getRowData(sourceSheet, i);
      // Extrae nombre completo y dirección de los datos de la fila
      const nombreCompleto = rowData[0];
      const direccion = rowData[1];

      // Si no hay nombre completo, significa que no hay más datos, por lo que termina el proceso
      if (!nombreCompleto) {
        console.log("El programa ha finalizado satisfactoriamente");
        return true;
      }

      // Obtiene los datos de comuna y mes de la cabecera de la hoja de origen
      const { comuna, mes } = getHeaderData(sourceSheet);
      // Crea una copia de la plantilla con el nombre del archivo basado en los datos
      const archivoCopia = createTemplateCopy(nombreCompleto, mes, templateId, folderDestinoId, templateType);
      // Abre la hoja de cálculo copiada como una instancia de SpreadsheetApp
      const templateSpreadsheet = SpreadsheetApp.openById(archivoCopia.getId());

      // Copia datos específicos de la hoja de origen a la plantilla (implementación no mostrada)
      copyDataToTemplate(sourceSheet, templateSpreadsheet);
      // Rellena los datos básicos en la plantilla (nombre completo, dirección, comuna, mes)
      fillTemplate(templateSpreadsheet, { nombreCompleto, direccion, comuna, mes });
    }
  } catch (e) {
    Logger.log("Error en la función main: " + e.toString());
  }
}

// Obtiene la primera hoja de la hoja de cálculo de origen
function getSourceSheet() {
  const sourceSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return sourceSpreadsheet.getSheets()[0];
}

// Obtiene los valores de una fila específica de la hoja de origen
function getRowData(sheet, row) {
  return sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];
}

// Obtiene los valores de comuna y mes de la segunda fila de la hoja de origen
function getHeaderData(sheet) {
  const comuna = sheet.getRange(2, 4).getValue() || 'Comuna no especificada';
  const mes = sheet.getRange(2, 6).getValue() || 'ENERO';
  return { comuna, mes };
}

// Crea una copia de la plantilla con un nombre específico
function createTemplateCopy(nombreCompleto, mes, templateId, folderDestinoId, templateType) {
  try {
    Logger.log("Template ID: " + templateId + " Template Type: " + templateType);
    const fileTemplate = DriveApp.getFileById(templateId);
    Logger.log("Plantilla obtenida correctamente.");
    let nombreArchivo;
    if (templateType === "Inicial") {
      nombreArchivo = `${nombreCompleto} - CRONOGRAMA E INFORME INICIAL - ${mes} - 2024.xlsx`;
    } else if (templateType === "Final") {
      nombreArchivo = `${nombreCompleto} - CRONOGRAMA E INFORME FINAL - ${mes} - 2024.xlsx`;
    } else {
      throw new Error("Template ID desconocido");
    }

    const folderDestino = DriveApp.getFolderById(folderDestinoId); // Reemplaza con el ID de tu carpeta de destino
    return fileTemplate.makeCopy(nombreArchivo, folderDestino);
  } catch (e) {
    Logger.log("Error en createTemplateCopy: " + e.toString());
    throw e;
  }
}

// Rellena los campos específicos de la plantilla con los datos proporcionados
function fillTemplate(templateSpreadsheet, data) {
  const templateSheet = templateSpreadsheet.getActiveSheet();
  templateSheet.getRange('M11').setValue(data.nombreCompleto);
  templateSheet.getRange('C15').setValue(data.direccion);
  templateSheet.getRange('D10').setValue(data.comuna);
  templateSheet.getRange('U10').setValue(data.mes);
}

// Copia datos específicos de la hoja de origen a las diferentes hojas de la plantilla
function copyDataToTemplate(sourceSheet, templateSpreadsheet) {
  const semanas = getSemanas(sourceSheet);

  // Obtén el número total de hojas en la plantilla
  const totalSheets = templateSpreadsheet.getSheets().length;

  // Itera sobre todas las hojas excepto la última
  for (let i = 0; i < totalSheets - 1; i++) {
    const sheet = templateSpreadsheet.getSheets()[i]; // Accede a la hoja actual
    sheet.getRange('C9').setValue(semanas[i]); // Asigna el valor correspondiente a la semana
  }
}

// Obtiene los valores de las semanas de la hoja de origen
function getSemanas(sheet) {
  return [
    sheet.getRange(2, 8).getValue() || '',
    sheet.getRange(2, 9).getValue() || '',
    sheet.getRange(2, 10).getValue() || '',
    sheet.getRange(2, 11).getValue() || '',
    sheet.getRange(2, 12).getValue() || ''
  ];
}
