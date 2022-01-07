$(document).ready(function(){
	$('#contrato-tab').bind('click', false);
	$('#reasegurador-tab').bind('click', false);
	$('#capas-tab').bind('click', false);
	
	$('#btnSiguienteTipoContrato').click(
			function () {
				$('#contrato-tab').unbind('click', false);
				$('#contrato-tab').click();
			});
	$('#btnSiguienteContrato').click(
			function () {
				$('#reasegurador-tab').unbind('click', false);
				$('#reasegurador-tab').click();
			});
	$('#btnSiguienteReasegurador').click(
			function () {
				$('#capas-tab').unbind('click', false);
				$('#capas-tab').click();
			});
	$('#btnFinalizar').click(
			function () {
				alert("Finalizado");
			});
});