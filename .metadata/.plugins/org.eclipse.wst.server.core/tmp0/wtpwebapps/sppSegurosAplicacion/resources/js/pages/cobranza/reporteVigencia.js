$(document).ready(function() {
	var fecha = new Date();
    var anio = fecha.getFullYear();
    var dia = fecha.getDate();
    var _mes = fecha.getMonth();//viene con valores de 0 al 11
    _mes = _mes + 1;//ahora lo tienes de 1 al 12
    if (_mes < 10)//ahora le agregas un 0 para el formato date
    { var mes = "0" + _mes;}
    else
    { var mes = _mes.toString;}
    document.getElementById("fecha").min = anio+'-'+mes+'-'+dia; 
	vigenciaC.btnconsultarVigecia();
});