
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
  let cedula = recuperarTexto("txtcedula");
  let nombre = recuperarTexto("txtnombre");
  let apellido = recuperarTexto("txtapellido");
  let ingresos = recuperarFloat("txtingresos");
  let egresos = recuperarFloat("txtegresos");

  // Buscar si ya existe
  let clienteExistente = buscarCliente(cedula);

  if(clienteExistente == null){
    // ✔ NO existe → crear nuevo
    let cliente = {
      cedula: cedula,
      nombre: nombre,
      apellido: apellido,
      ingresos: ingresos,
      egresos: egresos
    };

    clientes.push(cliente);

  }else{
    // ✔ SI existe → actualizar (menos cédula)
    clienteExistente.nombre = nombre;
    clienteExistente.apellido = apellido;
    clienteExistente.ingresos = ingresos;
    clienteExistente.egresos = egresos;
  }

  // Pintar tabla siempre
  pintarClientes();

  // Limpiar selección
  clienteSeleccionado = null;
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
contenido += '<td><button onclick="seleccionarCliente(\'' + cliente.cedula + '\')">Actualizar</button></td>';  }

  document.getElementById("tablaClientes").innerHTML = contenido;
}
function buscarCliente(cedula) {

    let elementoCliente;
    let clienteEncontrado = null;
    for (let i = 0; i < clientes.length; i++) {
        elementoCliente = clientes[i];
        if (elementoCliente.cedula == cedula) {
            clienteEncontrado = elementoCliente;
            break
        }
    }
    return clienteEncontrado ;
}
function seleccionarCliente(cedula){
  let valorCedula = recuperarTexto("txtcedula");
    let cliente = buscarCliente(valorCedula);
    if (cliente == null) {
        alert("Cliente no encontrado");
    } else {
      alert("Cliente seleccionado: " + cliente.nombre);
        mostrarTextoEnCaja("txtcedula", cliente.cedula);
        mostrarTextoEnCaja("txtnombre", cliente.nombre);
        mostrarTextoEnCaja("txtapellido", cliente.apellido);
        mostrarTextoEnCaja("txtingresos", cliente.ingresos);
        mostrarTextoEnCaja("txtegresos", cliente.egresos);

    }
}
function limpiar(){
  mostrarTextoEnCaja("cedula", "");
  mostrarTextoEnCaja("nombre", "");
  mostrarTextoEnCaja("apellido", "");
  mostrarTextoEnCaja("ingresos", "");
  mostrarTextoEnCaja("egresos", "");

  clienteSeleccionado = null;
}