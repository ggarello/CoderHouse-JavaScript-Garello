// Simulador de stock utilizando solo JavaScript en la consola

// Inventario inicial (objeto vacío)
let inventario = {};

// Agregar stock
function agregarStock(producto, cantidad) {
  if (!producto || isNaN(cantidad) || cantidad <= 0) {
    console.log("Por favor, ingrese un producto y una cantidad válida.");
    return;
  }

  if (inventario[producto]) {
    inventario[producto] += cantidad;
  } else {
    inventario[producto] = cantidad;
  }

  console.log(`${cantidad} unidades de "${producto}" han sido agregadas al inventario.`);
  mostrarInventario();
}

// Quitar stock
function quitarStock(producto, cantidad) {
  if (!producto || isNaN(cantidad) || cantidad <= 0 || !inventario[producto] || inventario[producto] < cantidad) {
    console.log("No se puede quitar esa cantidad. Verifique el producto o la cantidad.");
    return;
  }

  inventario[producto] -= cantidad;

  if (inventario[producto] === 0) {
    delete inventario[producto];
  }

  console.log(`${cantidad} unidades de "${producto}" han sido quitadas del inventario.`);
  mostrarInventario();
}

// Mostrar el inventario
function mostrarInventario() {
  console.log("\nInventario Actual:");
  for (const [producto, cantidad] of Object.entries(inventario)) {
    console.log(`${producto}: ${cantidad} unidades`);
  }
}

// TEST
agregarStock("Manzanas", 50);  
agregarStock("Banans", 30);  
quitarStock("Manzanas", 20);  
agregarStock("Peras", 40); 
quitarStock("Autos", 10);
