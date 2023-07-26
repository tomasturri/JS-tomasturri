alert(`
Hola! \n
Bienvenido a Bartolo Bar!
        `);

const nombre = prompt('Por favor, introduzca su nombre aqui:');

let userRoll = '';
let nombreCompleto = '';
let numeroTelefono = '';
let email = '';
let contraseña = '';

let nombreProducto = '';
let precioProducto = '';
let cantidadProducto = '';

const setRoll = function (nombre = '') {
  const roll = prompt(`
Hola ${nombre} \n
Estamos encantados de que nos elijas.

Que desear realizar?. Elija la opcion: \n
    1. Encargar pedido
    2. Reservar mesa`);

  switch (roll) {
    case '1':
      alert('Exelente, ahora vamos tomar su pedido');
      break;
    case '2':
      alert('Excelente, ahora vamos a reservar su mesa');
      break;

    default:
      alert('Por favor, seleccione una opcion valida');
      setRoll(nombre);
      break;
  }
  userRoll = roll;
  return roll;
};

const acceptContract = () => {
  const acceptTerm = prompt(`
    

    ${setRoll(nombre) === '1'
    ? 'Al encargar su pedido: se realiza una recarga del 10% a su pedido por el uso de la aplicacion'
    : 'Para reservar su mesa: las reservas se mantienen hasta las 22hs'}
    Estas de acuerdo con los terminos y continuar a crear su perfil?
        1. Si
        2. No`).toLowerCase();
  let respuesta;
  switch (acceptTerm) {
    case '1':
      respuesta = true;
      break;
    case '2':
      respuesta = false;
      break;
    default:
      alert('Por favor, seleccione una opcion valida (1 o 2)');
      acceptContract();
      break;
  }
  return respuesta;
};

if (acceptContract()) {
  alert(`
    Genial!
    ahora vamos a crear tu perfil`);
  createProfile();
} else {
  alert(`
    Qué lástima, Ya casi terminabamos.

    Sin embargo puedes regresar cuando lo desees.`);
}

function createProfile() {
  if (userRoll === '1') {
    nombreCompleto = prompt('Ingrese su nombre completo:').toLowerCase();
    numeroTelefono = prompt('Ingrese su numero de telefono:').toLowerCase();
    email = prompt('Ingrese su email:').toLowerCase();
    contraseña = prompt('Ingrese su contraseña:').toLowerCase();

    alert(`
    Su perfil ha sido creado con exito!

    Nombre Completo: ${nombreCompleto}
    Numero telefonico: ${numeroTelefono}
    Email: ${email}`);
  }

  if (userRoll === '2') {
    nombreCompleto = prompt('Ingrese su nombre completo:').toLowerCase();
    numeroTelefono = prompt('Ingrese su numero de telefono:').toLowerCase();
    email = prompt('Ingrese su email:').toLowerCase();
    contraseña = prompt('Ingrese su contraseña:').toLowerCase();

    alert(`
    Su perfil ha sido creado con exito!

    Nombre Completo: ${nombreCompleto}
    Numero telefonico: ${numeroTelefono}
    Email: ${email}`);

    const personasReserva = prompt('¿Para cuántas personas es la reserva?');
    alert(`Se ha realizado la reserva de ${personasReserva} personas, ¡los esperamos!`);
  }
}


let totalCompra = 0;

if (userRoll === '1') {
  let añadirProducto = prompt('Quieres añadir un producto \n 1. Si \n 2. No').toLowerCase();
  while (añadirProducto !== '1' && añadirProducto !== '2') {
    alert("Agrega una respuesta valida");
    añadirProducto = prompt('Quieres añadir un producto \n 1. Si \n 2. No').toLowerCase();
  }
  if (añadirProducto === '1') {
    addProduct();
  } else {
    alert('Puedes volver cuando quieras');
  }
}

function addProduct() {
  while (true) { // Bucle infinito para agregar productos hasta que el usuario decida salir
    nombreProducto = prompt("Agrega el nombre del producto (o escribe 'Salir' para terminar):").toLowerCase();
    if (nombreProducto === 'Salir') {
      break; // Si el usuario ingresa 'salir', se sale del bucle
    }
    precioProducto = prompt("Agrega el precio del producto:").toLowerCase();
    cantidadProducto = prompt("Agrega la cantidad :").toLowerCase();
    if (isNaN(precioProducto) || isNaN(cantidadProducto)) {
      alert('El precio y la cantidad deben ser números');
      continue; // Si el usuario ingresó datos no numéricos, se vuelve a pedir los datos del producto
    }
    printCalculation(nombreProducto, precioProducto, cantidadProducto);
  }
  alert(`
    Muchas Gracias por su compra!

    El total de la compra es: $${totalCompra}

    Su pedido estara listo en aproximadamente 45 minutos.
  `);
}

function printCalculation(nombreProducto, precioProducto, cantidadProducto) {
  const recargaTotal = (precioProducto * cantidadProducto) * 0.1;
  const compraTotal = (precioProducto * cantidadProducto) + recargaTotal;
  totalCompra += compraTotal; // Se actualiza el total de la compra

  alert(`
    Producto: ${nombreProducto}
    Cantidad: ${cantidadProducto} unidades
    Uso de aplicación (10%) = $${recargaTotal.toFixed(2)}
    Total del producto = $${compraTotal.toFixed(2)}
  `);
}



