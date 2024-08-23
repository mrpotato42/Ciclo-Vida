function imagesTemplateCopy() {
  try {
    const file = DriveApp.getFileById(DOC_TEMPLATE_ID);
    const folder  = DriveApp.getFolderById(FOLDER_DOCUMENTS);
    const templateCopy = file.makeCopy("Nuevo archivo", folder);
    return templateCopy;

  }catch (e){
    Logger.log("Error en imagesTemplateCopy: " + e.toString());
    throw e;
  }
}

function addImage() {
  const body = DOC_TEMPLATE.getBody();
  console.log(body.getText());
  const placeHolderImage = body.findText("{image 1}");
  const removePlaceHolder = placeHolderImage.getElement();
        removePlaceHolder.asText().setText('');
}

function main(){
  const matrix = folderAccess();
  loopToMatrix(matrix);
}