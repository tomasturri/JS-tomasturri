// Definimos un objeto para almacenar los productos en el carrito
let carrito = {};

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio, cantidad) {
    if (carrito[nombre]) {
        carrito[nombre].cantidad += cantidad;
    } else {
        carrito[nombre] = { precio, cantidad };
    }
}

// Función para actualizar la vista del carrito en el HTML
function actualizarCarrito() {
    const carritoContainer = document.getElementById('carrito');
    carritoContainer.innerHTML = '';

    let total = 0;

    for (const nombre in carrito) {
        const producto = carrito[nombre];
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        const productoHTML = `
            <div class="carrito-item">
                <span>${nombre}</span>
                <span>Cantidad: ${producto.cantidad}</span>
                <span>Subtotal: $${subtotal.toFixed(2)}</span>
            </div>
        `;
        carritoContainer.innerHTML += productoHTML;
    }

    const totalHTML = `<p>Total: $${total.toFixed(2)}</p>`;
    carritoContainer.innerHTML += totalHTML;
}

// Evento para agregar productos al carrito cuando se hace clic en el botón "Agregar al Carrito"
const botonesAgregar = document.querySelectorAll('.add-to-cart');
botonesAgregar.forEach((boton) => {
    boton.addEventListener('click', () => {
        const nombre = boton.getAttribute('data-name');
        const precio = parseFloat(boton.getAttribute('data-price'));
        const cantidadElement = document.getElementById(`cantidad${nombre}`);
        const cantidad = parseInt(cantidadElement.value, 10);
        if (cantidad > 0) {
            agregarAlCarrito(nombre, precio, cantidad);
            actualizarCarrito();
        }
    });
});

// Evento para mostrar/ocultar el carrito cuando se hace clic en el botón "Mostrar Carrito"
const mostrarCarritoButton = document.getElementById('mostrarCarrito');
mostrarCarritoButton.addEventListener('click', () => {
    const carritoContainer = document.getElementById('carrito');
    carritoContainer.classList.toggle('mostrar-carrito');
});

// Llama a actualizarCarrito para mostrar el carrito vacío al cargar la página
actualizarCarrito();

