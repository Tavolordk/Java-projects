$(document).ready(function () {
	resumenVidaC.getChart();
	$('#btnResumenVida').click(
		function () {
			resumenVidaC.obtenerResumenVida();
		});
});