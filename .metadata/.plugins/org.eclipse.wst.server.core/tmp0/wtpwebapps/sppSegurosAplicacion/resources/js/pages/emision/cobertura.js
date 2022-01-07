$(document).ready(function() {
	//coberturaC.obtenerCoberturas();
	//ramoC.extraerRamo();
	//tarifasC.extraerTarifa();
	//productoC.extraerProducto();
	
});

$('#tabCoberturas').click(function(){
	coberturaC.gruposCobertura();
	coberturaC.obtenerCoberturas();
	});
//$('#btnCargarGrupoCoberturas').click(function(){
//	coberturaC.obtenerCoberturas();
//});

//Accion guardar Coberturas
$('#btnGuardarCobertura').click(function(){
	coberturasC.guardarCoberturas();
});
//
//$('#btnCargarCoberturaE').click(function(){
//	coberturaC.obtenerCoberturas();
//});

