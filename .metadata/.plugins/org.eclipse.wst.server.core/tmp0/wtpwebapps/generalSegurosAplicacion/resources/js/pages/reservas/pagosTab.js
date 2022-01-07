$(document).ready(function () {
	pagosTabC.obtenerPagos();
	$('#btnDescargarHistorico').click(function () {
		pagosTabC.descargarPagos();
	});
	$('#btnNuevoPago').click(function () {
		pagosTabC.btnNuevoPago();
	});
	$('#btnGuardarPago').click(function () {
		pagosTabC.guardarPago();
	});
});