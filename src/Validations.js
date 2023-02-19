/* Funciones  */

function isValidEmail(email) {
  return email.match(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  );
}

function isValidName(name) {
  return name.match(/^[a-zA-Z\s]+$/);
}

function isValidAdress(adress) {
  return adress.match(/^[a-zA-Z\s]+$/);
}

function isValidFirst(username) {
  return username.match(/^[a-zA-Z\s]+$/);
}

function isValidNumber(input) {
  return input.match(/^[0-9]+$/);
}

/* Validaciones del login , registro y profile */

/* Validacion del correo */

export const validateEmail = (email) => {
  let result = {
    result: false,
    message: "",
  };
  if (isValidEmail(email)) {
    result.result = true;
    result.message = "¡Se ve bien!";
    return result;
  } else {
    result.result = false;
    result.message = "El correo ingresado no es válido";
    return result;
  }
};

/* Validacion de numero convencional */
export const validatePhoneNumberConvencional = (phoneNumber) => {
  let result = {
    result: false,
    message: "",
  };

  if (!isValidNumber(phoneNumber)) {
    result.result = false;
    result.message = "Solo debe ingresar números";
    return result;
  }
  if (phoneNumber.startsWith("02")) {
    if (phoneNumber.length != 9) {
      result.result = false;
      result.message = "Debe ingresar 9 dígitos";
      return result;
    }
    result.result = true;
    result.message = "¡Se ve bien!";
    return result;
  } else {
    result.result = false;
    result.message = "El número de celular convencional debe empezar con 02";
    return result;
  }
};

/* Validacion de numero celular */
export const validatePhoneNumber = (phoneNumber) => {
  let result = {
    result: false,
    message: "",
  };

  if (!isValidNumber(phoneNumber)) {
    result.result = false;
    result.message = "Solo debe ingresar números";
    return result;
  }
  if (phoneNumber.startsWith("09")) {
    if (phoneNumber.length != 10) {
      result.result = false;
      result.message = "Debe ingresar 10 dígitos";
      return result;
    }
    result.result = true;
    result.message = "¡Se ve bien!";
    return result;
  } else {
    result.result = false;
    result.message = "El número de celular debe empezar con 09";
    return result;
  }
};

/* Validacion de la cedula */

export const validateDNI= (dni) => {
  let result = {
    result: false,
    message: "",
  };

  if (!isValidNumber(dni)) {
    result.result = false;
    result.message = "Solo debe ingresar números";
    return result;
  }
    if (dni.length != 10) {
      result.result = false;
      result.message = "Debe ingresar 10 dígitos";
      return result;
    }
    result.result = true;
    result.message = "¡Se ve bien!";
    return result;
  
};

/* Validacion de username */
export const validateFirst = (username) => {
  let result = {
    result: false,
    message: "",
  };

  if (username.length < 5 || username.length > 20) {
    result.result = false;
    result.message =
      "El nombre de usuario debe ser minimo de 5 caracteres y maximo de 20";
    return result;
  }

  if (isValidFirst(username)) {
    result.result = true;
    result.message = "¡Se ve bien!";
    return result;
  } else {
    result.result = false;
    result.message = "Solo es permitido letras";
    return result;
  }
};

/* Validacion de nombre */
export const validateNames = (name) => {
  let result = {
    result: false,
    message: "",
  };
  if (name.length < 3 || name.length > 35) {
    result.result = false;
    result.message =
      "Los nombres y apellidos deben ser minimo de 3 caracteres y maximo de 35";
    return result;
  }

  if (isValidName(name)) {
    result.result = true;
    result.message = "¡Se ve bien!";
    return result;
  } else {
    result.result = false;
    result.message = "Solo es permitido letras";
    return result;
  }
};

/* Validacion de fecha */
export const validateDate = (date) => {
  date = new Date(date);
  let result = {
    result: false,
    message: "",
  };
  let actualDate = new Date();

  if (
    actualDate.getFullYear() - date.getFullYear() < 16 ||
    actualDate.getFullYear() - date.getFullYear() > 90
  ) {
    result.result = false;
    result.message = "Debe tener una edad entre 16 y 90 años";
  } else {
    result.result = true;
    result.message = "¡Se ve bien!";
  }
  return result;
};


export const validatAdress = (adress) => {
  let result = {
    result: false,
    message: "",
  };
  if (adress.length < 5 || adress.length > 50) {
    result.result = false;
    result.message =
      "La direcciòn deben ser minimo de 5 caracteres y maximo de 50";
    return result;
  }

  if (isValidAdress(adress)) {
    result.result = true;
    result.message = "¡Se ve bien!";
    return result;
  } else {
    result.result = false;
    result.message = "Solo es permitido letras";
    return result;
  }
};


/* Validacion de contraseña */
export const validatePassword = (password) => {
  let result = {
    result: false,
    message: "",
  };

  let validate = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/gm;

  if (password.length < 5 || password.length > 10) {
    result.result = false;
    result.message =
      "La contraseña debe ser minimo de 5 caracteres y maximo de 10";
    return result;
  }

  let resultValidation = validate.test(password);

  if (resultValidation) {
    result.result = true;
    result.message = "¡Se ve bien!";
    console.log(validate.test(password));
  } else {
    result.result = false;
    result.message =
      "La contraseña debe tener un numero, letras mayusculas , minusculas , numero y un caracter especial.";
  }

  return result;
};
