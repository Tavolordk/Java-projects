/**
 * 
 */
$(document).ready(function(){
	$("#btnSiguiente").on('click',function(){
	//$('#btnSiguiente').click(function(){
		nuevosContratosC.siguienteTab();
		nuevosContratosC.validarFormularioTipoContrato();
	});	
	nuevosContratosC.obtenerTabActivo();
    nuevosContratosC.comboTipoContrato();
    nuevosContratosC.llenaCatalogoRamo();
    nuevosContratosC.llenaCatalogoProducto();
    nuevosContratosC.obtenerMoneda();
    	$('.tipoContrato').change(function(){
		var $data = $(this).find(":selected").data();
		
		$('.tipoReaseguro').html('');
		$('.tipoCobertura').html('');
		$('.tipoProteccion').html('');
		
		$('.tipoReaseguro').append('<option value="' + $data.tipo_reaseguro + '">' + $data.tipo_reaseguro + '</option>');
		$('.tipoCobertura').append('<option value="' + $data.tipo_cobertura + '">' + $data.tipo_cobertura + '</option>');
		$('.tipoProteccion').append('<option value="' + $data.tipo_proteccion + '">' + $data.tipo_proteccion + '</option>');
		
		$('#reonlytipoReaseguro').val($data.tipo_reaseguro);
		$('#reonlytipoProteccion').val($data.tipo_proteccion);
		
		
		var tipoRea = $('#tipoReaseguro').val();
		console.log('Tipo Reaseguro:', tipoRea)
		if(tipoRea === 'NO PROPORCIONAL'){
			$('#calculoUtilidades').attr('disabled', true)
			$('#porcentajePTU').attr('disabled', true)
			$('#formulaUtilidades').attr('disabled', true)
			$('#aniosDesface').attr('disabled', true)
			$('#aniosDesface').val('0')
			
		}

	});
	
});