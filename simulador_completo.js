
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
  let valor = recuperarTexto("tasaInteres");
  let tasa = parseFloat(valor);
  if(tasa >= 10 && tasa <= 20){
    mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + tasa + "%");
  }else{
    mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
  }
}

function guardarCliente(){
  // Obtener valores
  let cedula = recuperarTexto("txtcedula");
  let nombre = recuperarTexto("txtnombre");
  let apellido = recuperarTexto("txtapellido");
  let ingresos = recuperarFloat("txtingresos");
  let egresos = recuperarFloat("txtegresos");

  // Crear objeto cliente
  let cliente = {
    cedula: cedula,
    nombre: nombre,
    apellido: apellido,
    ingresos: ingresos,
    egresos: egresos
  };

  // Guardar en arreglo
  clientes.push(cliente);

  // Pintar tabla
  pintarClientes();
}
function pintarClientes(){
  let contenido = "";

  for(let i = 0; i < clientes.length; i++){
    let cliente = clientes[i];

    contenido += "<tr>";
    contenido += "<td>" + cliente.cedula + "</td>";
    contenido += "<td>" + cliente.nombre + "</td>";
    contenido += "<td>" + cliente.apellido + "</td>";
    contenido += "<td>" + cliente.ingresos + "</td>";
    contenido += "<td>" + cliente.egresos + "</td>";
    contenido += "<td><button>Actualizar</button></td>";
    contenido += "</tr>";
  }

  document.getElementById("tablaClientes").innerHTML = contenido;
}