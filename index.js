
document.addEventListener("DOMContentLoaded", function() {
    const listaProductos = document.getElementById("productos");
    const listaItemsCarro = document.getElementById("carro-productos");
    const totalCarro = document.getElementById("total-carro");
  
  let carroDeCompras= JSON.parse(localStorage.getItem("carro-de-compras")) || [];
  
    // Mostrar productos Carro de Compras

    listaProductos.addEventListener("click", function(event) {
      if (event.target.classList.contains("agregar-al-carro")) {
        const productoId = event.target.getAttribute("data-id");
        const producto =  traerProductoId (productoId);
        if (producto) {
          agregarAlCarro(producto);
        }
      }
    });
  
    // Función agregar productos al carro
    function agregarAlCarro(producto) {
        carroDeCompras.push(producto);
      localStorage.setItem("carro-de-compras", JSON.stringify(carroDeCompras));
      actualizarCarro();
    }
  
    //Función Retirar productos del carro
    function removerDelCarroCompras(index) {
        carroDeCompras.splice(index, 1);
      localStorage.setItem("carro-de-compras", JSON.stringify(carroDeCompras));
      actualizarCarro();
    }
  
    // Función traer productos por el ID
    function traerProductoId (id) {
      const productos = document.querySelectorAll("#productos li");
      for (let producto of productos) {
        if (producto.getAttribute("data-id") === id) {
          return {
            id: id,
            nombre: producto.getAttribute("data-name"),
            precio: parseInt(producto.getAttribute("data-price"))
          };
        }
      }
      return null;
    }
  
    // Función actualizar carro
    function actualizarCarro() {
        listaItemsCarro.innerHTML = "";
        totalCarro.textContent = calcularTotal();
  
      carroDeCompras.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - $${item.precio}`;
        const botonRemoverProducto = document.createElement("button");
        botonRemoverProducto.textContent = "Remover producto";
        botonRemoverProducto.addEventListener("click", function() {
            removerDelCarroCompras(index);
        });
        botonRemoverProducto.classList.add("remover-producto");
        li.appendChild(botonRemoverProducto);
        listaItemsCarro.appendChild(li);
      });
    }

   // Función Calcular precio

   function calcularTotal() {
    let total = 0;
    for (let item of carroDeCompras) {
      total += item.precio;
    }
    return total;
  }

   actualizarCarro();
  });

