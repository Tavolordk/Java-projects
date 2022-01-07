$(document).ready(function () {
	reportesC.cargaContratosProporcionles();
	reportesC.cargaContratosProporcionlesCuotaParte
	reportesC.cargaContratosNoProporcionles();
	reportesC.cargaContratosBordereauxPrimas();
	reportesC.cargaContratosBordereauxSiniestros();
	
	$('#rr6trimeGenerar').click(function () {
		reportesC.rr6trimeGenerar();
	});
	
	$('#rr6trimdGenerar').click(function () {
		reportesC.rr6trimdGenerar();
	});
	
	$('#btnCalcularProp').click(function () {
		reportesC.btnCalcularProp();
	});
	
	$('#btnCalcularNoProp').click(function () {
		reportesC.btnCalcularNoProp();
	});
	
	$('#btnContabilidadNoP').click(function () {
		reportesC.btnContabilidadNoP();
	});
	
	$('#btnContabilidadP').click(function () {
		reportesC.btnContabilidadP();
	});
	
	$('#btnBorderoSin').click(function () {
		reportesC.btnBorderoSin();
	});
	
	$('#btnBorderoPrimas').click(function () {
		reportesC.btnBorderoPrimas();
	});
	
	$('#rr6AnualGenerar').click(function () {
		reportesC.generarRR6Anual();
	});
	
	$('#btnExportar').click(function () {
		$("#tablaEjemplo").tableExport({
			formats: ["xlsx"], //Tipo de archivos a exportar ("xlsx","txt", "csv", "xls")
			position: 'bottom',  // Posicion que se muestran los botones puedes ser: (top, bottom)
			bootstrap: true,//Usar lo estilos de css de bootstrap para los botones (true, false)
			fileName: "Primas",    //Nombre del archivo 
		});
	});
});