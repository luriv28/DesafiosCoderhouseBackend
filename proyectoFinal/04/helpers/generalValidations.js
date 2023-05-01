export function isMongoId(str) {
  // Expresión regular que valida si el string solo contiene caracteres hexadecimales
  const hexRegex = /^[0-9a-fA-F]+$/;

  // Si el string cumple con la expresión regular, es hexadecimal
  if (hexRegex.test(str) && str.length == 24) {
    return true;
  } else {
    return false;
  }
}
