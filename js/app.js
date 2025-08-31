let cartera = [];
let movId = 0;

// Importo la carter desde el archivo de JSON
fetch('./json/cartera.json')
  .then(respuesta => respuesta.json())
  .then(data => {
    cartera = data;
    movId = cartera.length+1; 


    renderCarteras();

    resumenDeCuentas();
  })
  .catch(error => console.error("Error cargando JSON ", error))



//Seteo de variables

const form = document.getElementById("formulario");
const tablaARS = document.getElementById("tabla_ARS");
const tablaUSD = document.getElementById("tabla_USD");


//Event listener para el formulario

form.addEventListener("submit", function(event) {

  event.preventDefault();

  const fecha = document.getElementById("fecha").value;
  const tipo = document.getElementById("tipo").value;
  const categoria = document.getElementById("categoria").value;
  const moneda = document.getElementById("moneda").value;
  const monto = document.getElementById("monto").value;
  const observaciones = document.getElementById("observaciones").value;

  const movimiento = {
    id: movId++,
    fecha: fecha,
    tipo: tipo,
    categoria: categoria, // <-- corregido aquí
    moneda: moneda,
    monto: monto,
    observaciones: observaciones
  };

  cartera.push(movimiento);
  renderCarteras();
  resumenDeCuentas();
  form.reset();
  console.log(movimiento);
});

// Funciones 

function renderCarteras() {

  const tituloARS = tablaARS.querySelector('.titulo');
  const tituloUSD = tablaUSD.querySelector('.titulo');

  tablaARS.innerHTML = '';
  tablaUSD.innerHTML = '';
  if (tituloARS) tablaARS.appendChild(tituloARS);
  if (tituloUSD) tablaUSD.appendChild(tituloUSD);

  cartera.forEach((movimiento) => {
    const movDiv = document.createElement("div");
    movDiv.classList.add("fila");

    movDiv.innerHTML = `
      <div class="colId"><p>${movimiento.id}</p></div>
      <div class="colFecha"><p>${movimiento.fecha}</p></div>
      <div class="colTipo"><p>${movimiento.tipo}</p></div>
      <div class="colCategoria"><p>${movimiento.categoria}</p></div>
      <div class="colMonto"><p>${formatCurrency(movimiento.monto, movimiento.moneda)}</p></div>
      <div class="colObservaciones"><p>${movimiento.observaciones}</p></div>
    `;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => deleteElement(movimiento.id));

    movDiv.appendChild(deleteButton);

    if (movimiento.moneda === "ARS") {
      tablaARS.appendChild(movDiv);
    } else if (movimiento.moneda === "USD") {
      tablaUSD.appendChild(movDiv);
    }
  });

  
}

//PAra aplicar formato currency

function deleteElement(id) {
  cartera = cartera.filter(movimiento => movimiento.id !== id);
  renderCarteras();
  resumenDeCuentas();
}

function formatCurrency(valor, moneda) {
  let locale = "es-AR";
  let currency = moneda === "USD" ? "USD" : "ARS";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2
  }).format(valor);
}

//FILTRO DE MOTIVO EN BASE A QUÉ TIPO DE MOVIMIENTO ES
const tipoSelector = document.getElementById("tipo");
const categoriaSelector = document.getElementById("categoria");

const categorias = {
  ingreso: [
    "Honorarios",
    "Otros"
  ],
  egreso:[
    "Mantenimeintos",
    "Supermercados",
    "Licencias",
    "Otros"
  ]
};

tipoSelector.addEventListener("change", function(){
  filterSelectorOptions()
});

// Pero me sucede que esto no sucede a menos que cambie, por lo que al inicio debo hacerlo si o si.

function filterSelectorOptions(){
  const tipo = tipoSelector.value;
  let opciones = [];

  if ( tipo === "ingreso"){
    opciones = categorias.ingreso;
  } else if (tipo === "egreso") {
    opciones = categorias.egreso;
  } else {
    opciones = [];
  }

  categoriaSelector.innerHTML = "";
  opciones.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoriaSelector.appendChild(option)
  });
}



//RESUMEN DE CUENTAS

function resumenDeCuentas(){

  const mon = [... new Set(cartera.map(el => el.moneda))];
  console.log(mon)

  const filaDiv = document.getElementById("tablaResumen")
  filaDiv.innerText = ``

  mon.forEach(elemento => {
    const monDiv = document.createElement("div");
    monDiv.classList.add("filaResumen");


    const el = {
      moneda: elemento,
      monto: cartera
        .filter(c => c.moneda === elemento)
        .reduce((v,t) => {
          if (t.tipo === "ingreso") { 
            return v + Number(t.monto)
          } else if (t.tipo === "egreso") { 
            return v - Number(t.monto)
          } 
          return v 
        },0)
    }

    monDiv.innerHTML = `
      <div class="colMoneda__resumen"><p>${el.moneda}</p></div>
      <div class="colMonto__resumen"><p>${formatCurrency(el.monto, el.moneda)}</p></div>
    `

    filaDiv.appendChild(monDiv)

  }
  )
}




//EJECUCIÓN DE TODO PARA INICIAR
filterSelectorOptions();
renderCarteras();
resumenDeCuentas();