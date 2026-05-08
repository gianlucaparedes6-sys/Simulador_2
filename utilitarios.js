function recuperarTexto(idComponente){
    let componente;
    let valorIngresado;
    componente=document.getElementById(idComponente);
    valorIngresado=componente.value;
    return valorIngresado;
    }
    
    function recuperarInt(idComponente){
        let valorCaja=recuperarTexto(idComponente);
        let valorEntero=parseInt(valorCaja);
        return valorEntero;
    }
    function recuperarFloat(idComponente){
        let valorCaja=recuperarTexto(idComponente);
        let valorFlotante=parseFloat(valorCaja);
        return valorFlotante;
    }
    function mostrarTexto(idComponente,mensaje){
        let componente;
        componente=document.getElementById(idComponente);
        componente.innerText=mensaje;
    }
    function mostrarTextoEnCaja(idComponente,mensaje){
        let componente;
        componente=document.getElementById(idComponente);
        componente.value=mensaje;
    }
    
    function mostrarImagen(idComponente,rutaImagen){
        let componente;
        componente=document.getElementById(idComponente);
        componente.src = rutaImagen;
    
    }
    //funciones del archivo simulador1

   function calcularDisponible(ingresos, egresos) {   
let disponible = ingresos - egresos;

    if (disponible < 0) {
        return 0;
    }

    return disponible;
}
function calcularCapacidadPago(montoDisponible) {
    let capacidadPago = montoDisponible * 0.5;
    return capacidadPago;
}
function calcularInteresSimple(monto, tasa, plazo) {
    let interes = monto * (tasa/100) * plazo;
    return interes;
}
function calcularTotalPagar(monto, interes) {
    let totalPagar = (monto + interes)+100;
    return totalPagar;
}
function calcularCuotaMensual(totalPagar, plazo) {
    let meses = plazo * 12;
    let cuotaMensual = totalPagar / meses;
    return cuotaMensual;
}
function aprobarCredito(capacidadPago, cuotaMensual) {
    if (capacidadPago >= cuotaMensual) {
        return "APROBADO";
    } else {
        return "RECHAZADO";
    }   
}