$(document).ready(function () {
	historicoC.obtenerHistorico();
	$('#btnDescargarHistorico').click(function () {
			historicoC.descargarHistorico();
	});
});