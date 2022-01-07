$(document).ready(function(){
	$('#formBajaAsegurado #btnBuscarAsegurados').click(function(){
		endososAP.buscarAseguradosAP('D');
	});
	
	$('#formCambioBeneficiario #btnBuscarAsegurados').click(function(){
		endososAP.buscarAseguradosAP('B');
	});
	
	$('#btnAceptar').click(function(){
		endososAP.bajaAseguradoAP('aceptar');
	});
	
	$('#btnTerminarEdicion').click(function(){
		endososAP.guardarBeneficiario();
	});
	
	endososAP.iniciarTablaBeneficiariosNuevo();
	
	$('#btnGuardarAseguradoAp').click(function(){
		endososAP.guardarAseguradoAp();
	});
});