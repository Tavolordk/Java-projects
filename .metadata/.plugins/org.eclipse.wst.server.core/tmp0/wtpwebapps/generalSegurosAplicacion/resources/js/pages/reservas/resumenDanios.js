$(document).ready(function () {
	resumenDaniosC.getChartPoliza();
	resumenDaniosC.getChartB();
	resumenDaniosC.getChartC();
	resumenDaniosC.getChartD();
	$('#btnResumenVida').click(
		function () {
			resumenDaniosC.obtenerResumenDanios();
		});
});