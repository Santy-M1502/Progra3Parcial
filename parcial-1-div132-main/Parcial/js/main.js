/*  
    Instrucciones del Parcial

    - Responde los puntos en orden.
    - Se valorará:
        * Código limpio
        * Comentarios claros
        * Separación en bloques funcionales
        * Buen uso de funciones/modularización

    IMPORTANTE:
    - El trabajo debe desarrollarse utilizando buenas prácticas de programación en JavaScript.
*/

/*  
    Punto 1 _________________________

    Este parcial consiste en crear el frontend de una tienda de frutas.
    Para ello ya se dispone del HTML y deberás programar el JavaScript necesario.

    1. Almacena tus datos personales (nombre, apellido, DNI) en un objeto y:
        - Imprime tu nombre y apellido en la etiqueta del <nav> (donde corresponda).
        - Imprímelo también en la consola.
*/

/*  
    Punto 2 _________________________

    Simula la carga de datos desde un archivo `db.json`. Este debe tener objetos con esta estructura:
    {
        "id": 1,
        "nombre": "arandano",
        "precio": 5000,
        "img": "img/arandano.jpg"
    }
*/

/*  
    Punto 3 _________________________

    Imprime los productos en pantalla al cargar la página.
    Agrega esta funcionalidad dentro de la función `init()`.

    El HTML que debes agregar por cada producto es el siguiente:

        <div class="product-card">
            <img src="ruta" alt="nombre">
            <h3>Nombre del producto</h3>
            <p>$Precio</p>
            <button class="add-to-cart">Agregar a carrito</button>
        </div>
*/

/*  
    Punto 4 _________________________

    Crea la función `filtro()` para filtrar los productos por nombre.
    - Asocia esta función al evento `keyup` de un campo `<input>`.
    - Cada vez que se escriba una letra, deben mostrarse solo los productos que coincidan con el texto ingresado.
*/

/*  
    Punto 5 _________________________

    Agrega la funcionalidad de carrito:
    - Crea un array `carrito` que almacene los productos seleccionados.
    - Al presionar “Agregar a carrito”, el producto debe aparecer en el listado con id `cart-items`.

    El HTML del carrito debe tener el siguiente formato:

        <li class="item-block">
            <p class="item-name">nombreproducto - $precioproducto</p>
            <button class="delete-button">Eliminar</button>
        </li>
*/

/*  
    Punto 6 _________________________

    Guarda los productos del carrito en `localStorage`.
    - Asegúrate de que al recargar la página el carrito se recupere automáticamente desde `localStorage`.
*/

var carrito = []
// Ejercicio 1
const escribirNombre = (user) =>{
    var nombre = document.querySelector(".nombreAlumno")
    nombre.innerHTML = `
        <h3>${user.nombre}-${user.apellido}</h3>
        `
    console.log(user.nombre, user.apellido)
  }
const user = {
    "nombre" : "santiago",
    "apellido" : "martinez"
  }

escribirNombre(user)
// Ejercicio 1


// Ejercicio 2 y 3
const escribirProductos = (filtro = "")=>{
    fetch('db.json')
    .then(res => {
        return res.json();
    })
    .then(productos => {
    const product_grid = document.querySelector(".product-grid")
    product_grid.innerHTML = ""
    productos.forEach(producto => {
        const name = producto.nombre
        if (name.toLowerCase().includes(filtro.toLowerCase())) {
        const div = document.createElement("div")
        div.classList.add("product-card")
        div.innerHTML = `
            <img src="${producto.img}" alt="nombre">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
        `
        const boton = document.createElement('button');
                    boton.textContent = 'Agregar a carrito';
                    boton.classList.add('add-to-cart');
                    boton.addEventListener('click', () => {
                        carrito.push(producto);
                        console.log("Producto agregado:", producto.nombre)
                        cargarCarrito()
                    });

                    div.appendChild(boton)
        product_grid.appendChild(div)
        }

    })
    
})
}
// Ejercicio 2 y 3


// Ejercicio 4
const inputNav = document.querySelector(".search-bar")
inputNav.addEventListener("keyup", (e)=>{
    escribirProductos(e.target.value)
})
// Ejercicio 4


// Ejercicio 5 y 6
const cargarCarrito = () => {
        const product_cart = document.getElementById("cart-items")
        var total = 0
        const precio = document.getElementById("total-price")
        product_cart.innerHTML = ""
        carrito.forEach((element, index) => {
        const name = element.nombre
        const li = document.createElement("li")
        li.classList.add("item-block")
        li.innerHTML = `
            <p class="item-name">${element.nombre} - $${element.precio}</p>
        `
        total += element.precio

        const boton = document.createElement('button');
        boton.textContent = 'Eliminar';
        boton.classList.add('delete-button')
        boton.addEventListener('click', () => {
            carrito.splice(index, 1)
            cargarCarrito()
        });
        li.appendChild(boton)

        product_cart.appendChild(li)
    })
    precio.innerHTML = `$${total}.00`
    localStorage.setItem("carrito", JSON.stringify(carrito))}


// Ejercicio 5 y 6



// Función inicializadora
function init() {
  // Aquí deben invocarse todas las funciones necesarias para que la aplicación comience a funcionar
  const carritoGuardado = localStorage.getItem("carrito");

    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        cargarCarrito();
    }

    escribirNombre(user);
    escribirProductos();
  
}
