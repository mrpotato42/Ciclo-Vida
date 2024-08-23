/**Key for acces */
const FORM_SPREADSHEET = "18hOtUWao7YCDoxg5LGr2zofXpIpOfSpLKK-8yqhkGZ0";
const FOLDER_IMAGES = "1PYQxVtdFkAuPhbS9bT2m6uCutipssXiReejwgqWbdSHX2VcLb0jVwb2HL0r9Y95lXj5x24if";
const DOC_TEMPLATE_ID = "1vCpjWX3skc7kAFyqNsHbQbxtvRGq5NHxLFjnIpbwE2U";
const FOLDER_DOCUMENTS = "1vvNIfchREpxodzNk_Kb0D2nFshAK6NjC";
/**Spreadsheet instanceded*/
const formResource = SpreadsheetApp.openById(FORM_SPREADSHEET)
const DOC_TEMPLATE = DocumentApp.openById(DOC_TEMPLATE_ID);

/**------------------------------Forms----------------------------------*/
/**Instancia de variables */
// ID del archivo formato-subido-prueba
const ID_ARCHIVO_ORIGEN = "1_wMUHxYolrW9_dPORy4RKLJvIAOkOWrJ4o_5aN6taRU"



/** Instancias de los archivos y hojas*/
// Abrir el archivo de origen usando su ID
const sourceSpreadsheet = SpreadsheetApp.openById(ID_ARCHIVO_ORIGEN)
// Obtener la hoja de cálculo activa del archivo de origen
const sourceSheet = sourceSpreadsheet.getActiveSheet()


/**------------------------------Images---------------------------------- */
/**repository id*/


/**Spreadsheet instanceded*/

// Obtener la hoja de cálculo activa del archivo de origen
