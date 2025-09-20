
export let cotizacionDolar = [];

export function getDolarValue() {
  return fetch('https://criptoya.com/api/dolar')
    .then(r => r.json())
    .then(data => {
      cotizacionDolar = data;   // actualizo el export
      return data;              // ¡importante retornar!
    })
    .catch(error => {
      console.error("Error cargando JSON", error);
      throw error;              // propago el error para poder manejarlo afuera
    });
}
