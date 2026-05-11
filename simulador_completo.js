
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;
  let plazoIngresado = 0;

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
    tasaInteres = tasa; // 

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

  if(clienteSeleccionado == null){
    let cliente = {
      cedula: cedula,
      nombre: nombre,
      apellido: apellido,
      ingresos: ingresos,
      egresos: egresos
    };

    clientes.push(cliente);

  } else {
    clienteSeleccionado.nombre = nombre;
    clienteSeleccionado.apellido = apellido;
    clienteSeleccionado.ingresos = ingresos;
    clienteSeleccionado.egresos = egresos;
  }

  pintarClientes();
  limpiar();
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

    contenido += "<td>";
    contenido += '<button onclick="seleccionarCliente(\'' + cliente.cedula + '\')">Actualizar</button>';
    contenido += '<button onclick="eliminarCliente(\'' + cliente.cedula + '\')">Eliminar</button>';
    contenido += "</td>";

    contenido += "</tr>";
  }

  document.getElementById("tablaClientes").innerHTML = contenido;
}

function pintarCreditos(listaCreditos){

  let contenido = "";

  for(let i = 0; i < listaCreditos.length; i++){

    let credito = listaCreditos[i];

    contenido += "<tr>";

    contenido += "<td>" + credito.cedula + "</td>";
    contenido += "<td>" + credito.nombre + "</td>";
    contenido += "<td>" + credito.apellido + "</td>";
    contenido += "<td>" + credito.monto + "</td>";
    contenido += "<td>" + credito.tasa + "%</td>";
    contenido += "<td>" + credito.plazo + "</td>";
    contenido += "<td>" + credito.cuota.toFixed(2) + "</td>";

    contenido += "</tr>";
  }

  document.getElementById("tablaCreditos").innerHTML = contenido;
}
function buscarCreditos(cedula){

  let creditosCliente = [];

  for(let i = 0; i < creditos.length; i++){

    let credito = creditos[i];

    if(credito.cedula == cedula){
      creditosCliente.push(credito);
    }
  }

  return creditosCliente;
}
function buscarCreditosCliente(){

  let cedula = recuperarTexto("buscarCedulaCredito");

  let listaCreditos = buscarCreditos(cedula);

  pintarCreditos(listaCreditos);
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
function eliminarCliente(cedula){
  for(let i = 0; i < clientes.length; i++){
    if(clientes[i].cedula == cedula){
      clientes.splice(i,1);
      break;
    }
  }

  pintarClientes();
}
function seleccionarCliente(cedula){
let cliente = buscarCliente(cedula);
    if (cliente == null) {
        alert("Cliente no encontrado");
    } else {
      clienteSeleccionado = cliente;
      alert("Cliente seleccionado: " + cliente.nombre);
        mostrarTextoEnCaja("txtcedula", cliente.cedula);
        mostrarTextoEnCaja("txtnombre", cliente.nombre);
        mostrarTextoEnCaja("txtapellido", cliente.apellido);
        mostrarTextoEnCaja("txtingresos", cliente.ingresos);
        mostrarTextoEnCaja("txtegresos", cliente.egresos);

    }
}

function limpiar(){
  mostrarTextoEnCaja("txtcedula", "");
  mostrarTextoEnCaja("txtnombre", "");
  mostrarTextoEnCaja("txtapellido", "");
  mostrarTextoEnCaja("txtingresos", "");
  mostrarTextoEnCaja("txtegresos", "");

  clienteSeleccionado = null;
}

let clienteCredito = null;

function buscarClienteCredito(){
  let cedula = recuperarTexto("buscarCedulaCredito");

  if(cedula == ""){
    mostrarTexto("datosClienteCredito", "Ingrese una cédula");
    return;
  }

  let cliente = buscarCliente(cedula);

  if(cliente == null){
    mostrarTexto("datosClienteCredito", "Cliente no encontrado");
    clienteCredito = null;
  } else {
    clienteCredito = cliente;
    clienteSeleccionado = cliente;

    let info = `
  <h3>Datos del Cliente</h3>
  <p><strong>Cédula:</strong> ${cliente.cedula}</p>
  <p><strong>Nombre:</strong> ${cliente.nombre}</p>
  <p><strong>Apellido:</strong> ${cliente.apellido}</p>
  <p><strong>Ingresos:</strong> ${cliente.ingresos}</p>
  <p><strong>Egresos:</strong> ${cliente.egresos}</p>
`;

document.getElementById("datosClienteCredito").innerHTML = info;
  }
}

function calcularCredito(){

  if(clienteCredito == null){
    mostrarTexto("resultadoCredito", "Primero busque un cliente");
    return;
  }

  let monto = recuperarFloat("montoCredito");
  let plazo = recuperarInt("plazoCredito");
  plazoIngresado = plazo;

  if(isNaN(monto) || monto <= 0){
    mostrarTexto("resultadoCredito", "Ingrese un monto válido");
    return;
  }

  if(isNaN(plazo) || plazo <= 0){
    mostrarTexto("resultadoCredito", "Ingrese un plazo válido");
    return;
  }


  let disponible = calcularDisponible(clienteCredito.ingresos, clienteCredito.egresos);
  let capacidadPago = calcularCapacidadPago(disponible);

  let interes = calcularInteresSimple(monto, tasaInteres, plazo);
  let totalPagar = calcularTotalPagar(monto, interes);

  let cuotaMensual = calcularCuotaMensual(totalPagar, plazo);

  let estado = aprobarCredito(capacidadPago, cuotaMensual);

  montoCalculado = monto;
  plazoCalculado = plazo;
  cuotaCalculada = cuotaMensual;

  let resultado = `
    <div class="${estado === 'APROBADO' ? 'aprobado' : 'rechazado'}">
      <p><strong>Capacidad de pago:</strong> ${capacidadPago.toFixed(2)}</p>
      <p><strong>Total a pagar:</strong> ${totalPagar.toFixed(2)}</p>
      <p><strong>Cuota mensual:</strong> ${cuotaMensual.toFixed(2)}</p>
      <p><strong>Resultado:</strong> ${estado}</p>
    </div>
  `;

let resultadoDiv = document.getElementById("resultadoCredito");

resultadoDiv.innerHTML = `
  <p><strong>Capacidad de pago:</strong> ${capacidadPago.toFixed(2)}</p>
  <p><strong>Total a pagar:</strong> ${totalPagar.toFixed(2)}</p>
  <p><strong>Cuota mensual:</strong> ${cuotaMensual.toFixed(2)}</p>
  <p><strong>Resultado:</strong> ${estado}</p>
`;


if(estado === "APROBADO"){
  resultadoDiv.className = "aprobado";
} else {
  resultadoDiv.className = "rechazado";
}

  creditoAprobado = (estado === "APROBADO");
  document.getElementById("btnAsignarCredito").disabled = !creditoAprobado;
}
function solicitarCredito(){

  if(!creditoAprobado){
    mostrarTexto("resultadoCredito", "El crédito no está aprobado");
    return;
  }
  let credito = {
    cedula: clienteCredito.cedula,
    monto: montoCalculado,
    plazo: plazoCalculado,
    cuota: cuotaCalculada
  }
  creditos.push(credito);
  mostrarTexto("resultadoCredito", "Crédito registrado correctamente");
 document.getElementById("btnAsignarCredito").disabled = true;
}
function asignarCredito(){

  if(!creditoAprobado){
    mostrarTexto("resultadoCredito", "El crédito no está aprobado");
    return;
  }

  
  let credito = {
    cedula: clienteSeleccionado.cedula,
    nombre: clienteSeleccionado.nombre,
    apellido: clienteSeleccionado.apellido,
    monto: montoCalculado,
    tasa: tasaInteres,
    plazo: plazoIngresado,
    cuota: cuotaCalculada
  };

  creditos.push(credito);

  mostrarTexto("resultadoCredito", "Crédito asignado correctamente");

  document.getElementById("btnAsignarCredito").disabled = true;
}