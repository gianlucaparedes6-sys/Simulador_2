
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

 function ocultarSecciones(){
  let secciones = document.querySelectorAll("section");

  for(let i = 0; i < secciones.length; i++){
    secciones[i].classList.remove("activa");
  }
}
function mostrarSeccion(id){
  ocultarSecciones();

  let seccion = document.getElementById(id);
  seccion.classList.add("activa");
}
function guardarTasa(){
  let valor = recuperaraTexto("tasaInteres");
  let tasa = parseFloat(valor);
  if(tasa >= 10 && tasa <= 20){
    mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + tasa + "%");
  }else{
    mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
  }
}









//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios