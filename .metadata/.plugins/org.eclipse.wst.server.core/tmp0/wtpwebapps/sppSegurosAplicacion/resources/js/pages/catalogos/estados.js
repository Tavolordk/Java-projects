/**
 * 
 */

$(document).ready(function() {

	estadosC.extraerEstados();
	
	//Accion guardar Estados
	$('#btnGuardarEstado').click(function(){
		estadosC.guardarEstados('#formEstadosNuevo','#nuevoEstadoModal');
	});
	
	$('#btnEditEstados').click(function(){
		estadosC.guardarEstados('#formEstadosEditar','#editarEstadosModal');
	});
	
	 $("input").attr("required", true); 
/*
	$('#nombreEstado').blur(function() {
		if($('#nombreEstado').val() !== null && $('#nombreEstado').val() !== ''){
			$('#nombreEstado').val('');
			mensajes.modalAlert('warning', 'Valor no valido', 'Debe ingresar el nombre del Estado.');
		}	
	});
	*/
});

