function folderAccess() {
  const folder = DriveApp.getFolderById(FOLDER_IMAGES);
  var matrix = {};

  try {
    // Lista los nombres de los archivos en la carpeta
    var files = folder.getFiles();

    while (files.hasNext()) {
      var file = files.next();
      var fileId = file.getId();
      var fileName = file.getName();

      // Separar el nombre base y el número de foto
      var fileSplit = fileName.split('-');
      var key = fileSplit[0].trim();
      const valueO = fileSplit[1].trim().replace('.jpg', '').replace('.png', '') + ": " + fileId; // Remover extensiones 
      var value = valueO;
      // Agregar el número de foto al array correspondiente en el objeto
      if (!matrix[key]) {
        matrix[key] = [];
      }
      matrix[key].push(value);
      matrix[key].sort();
    }

    // Imprimir el resultado para verificar
    //Logger.log(matrix);

    return matrix;
  } catch (e) {
    Logger.log("Error en folderAccess" + e.toString());
    throw e;
  }
}

function loopToMatrix(object) {
  for (var key in object) {
    Logger.log("Nombre base: " + key);
    var value = object[key];
    for (var i = 0; i < value.length; i++) {
      Logger.log("  Número de foto: " + value[i]);
    }
  }
}