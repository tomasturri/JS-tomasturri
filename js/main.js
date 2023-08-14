alert(`
Hola! \n
Bienvenido a Bartolo Bar!
`);

const nombre = prompt('Por favor, introduzca su nombre aquí:');

let userRoll = '';
let nombreCompleto = '';
let numeroTelefono = '';
let email = '';
let contraseña = '';

const productos = [
  { nombre: 'Pizza', precio: 2000, cantidad: 20 },
  { nombre: 'Hamburguesa', precio: 1500, cantidad: 20 },
  { nombre: 'Empanadas', precio: 500, cantidad: 36 },
];

const setRoll = function (nombre = '') {
  const roll = prompt(`
Hola ${nombre} \n
Estamos encantados de que nos elijas.

¿Qué deseas realizar? Elija la opción: \n
    1. Encargar pedido
    2. Reservar mesa`);

  switch (roll) {
    case '1':
      alert('¡Excelente, ahora vamos a tomar su pedido!');
      break;
    case '2':
      alert('¡Excelente, ahora vamos a reservar su mesa!');
      break;
    default:
      alert('Por favor, seleccione una opción válida.');
      setRoll(nombre);
      break;
  }
  userRoll = roll;
  return roll;
};

const acceptContract = () => {
  const acceptTerm = prompt(`
    

    ${setRoll(nombre) === '1'
    ? 'Al encargar su pedido se realizará una recarga del 5% por el uso de la aplicación.'
    : 'Recuerde que las reservas se mantienen hasta las 22hs.'}
    ¿Está de acuerdo con los términos y continuar a crear su perfil?
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
      alert('Por favor, seleccione una opción válida (1 o 2).');
      acceptContract();
      break;
  }
  return respuesta;
};

if (acceptContract()) {
  alert(`
    ¡Genial!
    Ahora vamos a crear tu perfil.`);
  createProfile();
} else {
  alert(`
    ¡Qué lástima! Ya casi terminábamos.

    Sin embargo, puedes regresar cuando lo desees.`);
}

function createProfile() {
  nombreCompleto = prompt('Ingrese su nombre completo:');
  numeroTelefono = prompt('Ingrese su número de teléfono:');
  email = prompt('Ingrese su correo electrónico:');
  contraseña = prompt('Ingrese su contraseña:');

  alert(`
    ¡Su perfil ha sido creado con éxito!

    Nombre Completo: ${nombreCompleto}
    Número telefónico: ${numeroTelefono}
    Correo electrónico: ${email}`);

  if (userRoll === '1') {
    showProductOptions(); // Mostrar opciones de productos
  } else if (userRoll === '2') {
    const personasReserva = prompt('¿Para cuántas personas es la reserva?');
    alert(`Se ha realizado la reserva de ${personasReserva} personas. ¡Los esperamos!`);
  }
}

function showProductOptions() {
  const productsAdded = [];

  while (true) {
    mostrarOpcionesProductos(); // Mostrar las opciones de productos disponibles
    const opcion = prompt("Elija su producto:\n1. Pizza\n2. Empanadas\n3. Hamburguesa\nEscriba 'salir' para terminar:").toLowerCase();

    if (opcion === 'salir') {
      break;
    }

    const opcionNumerica = parseInt(opcion);
    if (opcionNumerica >= 1 && opcionNumerica <= 3) {
      const nombreProducto = obtenerNombreProducto(opcionNumerica.toString());
      const productoSeleccionado = productos.find(prod => prod.nombre === nombreProducto);

      if (productoSeleccionado) {
        const cantidadProducto = parseInt(prompt(`Agrega la cantidad de ${productoSeleccionado.nombre}:`));

        if (isNaN(cantidadProducto) || cantidadProducto <= 0) {
          alert('La cantidad debe ser un número positivo.');
          continue;
        }

        if (cantidadProducto > productoSeleccionado.cantidad) {
          alert('No hay suficiente cantidad disponible.');
          continue;
        }

        productsAdded.push({ nombre: productoSeleccionado.nombre, precio: productoSeleccionado.precio, cantidad: cantidadProducto });
        actualizarCantidadProducto(productoSeleccionado.nombre, cantidadProducto);

        alert(`¡${cantidadProducto} ${productoSeleccionado.nombre}(s) agregado(s) a su pedido!`);
      } else {
        alert('Opción inválida. Por favor, elija una opción válida.');
      }
    } else {
      alert('Opción inválida. Por favor, elija una opción válida.');
    }
  }

  showFinalOrder(productsAdded);
}

function mostrarOpcionesProductos() {
  console.log('Opciones de productos disponibles:');
  console.log('1. Pizza');
  console.log('2. Empanadas');
  console.log('3. Hamburguesa');
}

function obtenerNombreProducto(opcion) {
  switch (opcion) {
    case '1':
      return 'Pizza';
    case '2':
      return 'Empanadas';
    case '3':
      return 'Hamburguesa';
    default:
      return '';
  }
}

function actualizarCantidadProducto(nombreProducto, cantidad) {
  const producto = productos.find(prod => prod.nombre.toLowerCase() === nombreProducto.toLowerCase());
  if (producto) {
    producto.cantidad -= cantidad;
  }
}

function showFinalOrder(productsAdded) {
  alert('Resumen de la compra:');
  let totalCompra = 0;

  for (const product of productsAdded) {
    const subtotal = product.precio * product.cantidad;
    const recargo = subtotal * 0.05; // 5% de recargo
    const totalProducto = subtotal + recargo;

    totalCompra += totalProducto;

    alert(`${product.cantidad} ${product.nombre}(s) - Subtotal: $${subtotal.toFixed(2)} (+ 5% de recargo: $${recargo.toFixed(2)}) - Total: $${totalProducto.toFixed(2)}`);
  }

  alert(`Total de la compra: $${totalCompra.toFixed(2)}\nGracias por su compra! Su pedido estará listo en aproximadamente 45 minutos.`);
}

