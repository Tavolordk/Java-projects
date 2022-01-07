$(document).ready(function(){
	ramoC.ramoDefault(5);
	
	$('#buscarCertificado').click(function(){
		incrementoSA.buscarCertificado();
	});
	
	$('#actualizarSA').click(function(){
		incrementoSA.actualizarSA();
	});
});