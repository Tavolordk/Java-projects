$(document).ready(function () {
	ramoC.ramoDefault(null);
	$('#btnBusca').click(function () {
		polizasC.buscaPolizasXFechaRegistro();
	});
	
	$('#btnFechaRegistroDe').click(function () {
		polizasC.buscaPolizasXFechaRegistro();
	});
	
	$('#btnXFechaRegistroHasta').click(function () {
		polizasC.buscaPolizasXFechaRegistro();
	});
});