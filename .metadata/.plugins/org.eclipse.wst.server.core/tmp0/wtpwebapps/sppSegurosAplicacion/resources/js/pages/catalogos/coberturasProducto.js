$(document).ready(function() {
	ramoC.ramo(null, null);
	//productoC.extraerProducto();
	coberturasProdC.obtenerCobProd();
	
	$('.btn-nuevaCoberturaProducto').click(function() {
		//$('#formPerfilEditar')[0].reset();
		$('#editarCobProdModal').modal({show:true, backdrop:'static'});
		datepicker.customConfig();
	})

	$('#btnGuardarCobProd').click(function(){
		coberturasProdC.guardarCobProd('#formCobProdNueva','#nuevaCobProdModal');
	});
	
	var currentPage = (window.location.pathname.split('/'))[2];
	if(currentPage === 'coberturasProducto'){
		$('.ramo').change(function(){
			coberturasProdC.extraerProductoXRamo($(this).val());
			$('.cobertura').html('');
			coberturasProdC.validarCamposIndemnizacionPerdidas();
		});
		
		$('.producto').change(function(){
			coberturasProdC.extraerCoberturaXRamo($(".ramo").val());
			coberturasProdC.validarCamposIndemnizacionPerdidas();
		});
		
		$('.cobertura').change(function(){
			coberturasProdC.validarCamposIndemnizacionPerdidas();
		});
	}
	
	$('#primaRiesgo').blur(function() {
		coberturasProdC.calculaTarifa();
	});
	
	$('#gastosAdq').blur(function() {
		coberturasProdC.calculaTarifa();
	});
	
	$('#gastosAdq').blur(function() {
		if(($("#idRamo").val() === '5')){
			/*if($('#gastosAdq').val() === null || $('#gastosAdq').val() === '' || $('#gastosAdq').val() > 35){
				$('#gastosAdq').val('');
				mensajes.modalAlert('warning', 'Valor no valido', 'El porcentaje de Gtos. de Adquisicion. debe ser menor o igual a 35');
			}*/
		if($('#gastosAdq').val() === null || $('#gastosAdq').val() === '' || $('#gastosAdq').val() > 40){
			$('#gastosAdq').val('');
			mensajes.modalAlert('warning', 'Valor no valido', 'El porcentaje de Gtos. de Adquisicion. debe ser menor o igual a 40');
		}else{
			coberturasProdC.calculaTarifa();
		}
		}else{
			/*if(($('#gastosAdq').val() === null || $('#gastosAdq').val() === '' || $('#gastosAdq').val() > 25)){
				$('#gastosAdq').val('');
				mensajes.modalAlert('warning', 'Valor no valido', 'El porcentaje de Gtos. de Adquisicion. debe ser menor o igual a 25');
			}*/

				if(($('#gastosAdq').val() === null || $('#gastosAdq').val() === '' || $('#gastosAdq').val() > 35)){
					$('#gastosAdq').val('');
					mensajes.modalAlert('warning', 'Valor no valido', 'El porcentaje de Gtos. de Adquisicion. debe ser menor o igual a 35');
				}else{
					coberturasProdC.calculaTarifa();
				}
	
		}
	});
		
	$('#gastosAdm').blur(function() {
		if(($("#idRamo").val() === '5')){
			/*if($('#gastosAdm').val() === null || $('#gastosAdm').val() === '' || $('#gastosAdm').val() < 20){
				$('#gastosAdm').val('');
				mensajes.modalAlert('warning', 'Valor no valido', 'El porcentaje de Gtos. de Admon. debe ser mayor o igual a 20');
			}*/
		if($('#gastosAdm').val() === null || $('#gastosAdm').val() === '' || $('#gastosAdm').val() > 25){
			$('#gastosAdm').val('');
			mensajes.modalAlert('warning', 'Valor no valido', 'El porcentaje de Gtos. de Admon. debe ser menor o igual a 25');
		}else{
			coberturasProdC.calculaTarifa();
		}
		}else{
			/*if(($('#gastosAdm').val() === null || $('#gastosAdm').val() === '' || $('#gastosAdm').val() !== '18')){
				$('#gastosAdm').val('');
				mensajes.modalAlert('warning', 'Valor no valido', 'El porcentaje de Gtos. de Admon. debe ser igual a 18');
			}*/
				if(($('#gastosAdm').val() === null || $('#gastosAdm').val() === '' || $('#gastosAdm').val() > 25)){
					$('#gastosAdm').val('');
					mensajes.modalAlert('warning', 'Valor no valido', 'El porcentaje de Gtos. de Admon. debe ser menor o igual a 25');
				}else{
				coberturasProdC.calculaTarifa();
				}
		}
	});
	
	$('#utilidad').blur(function() {
		if(($("#idRamo").val() === '5')){
			/*if($('#utilidad').val() === null || $('#utilidad').val() === '' || $('#utilidad').val() < 5){
				$('#utilidad').val('');
				mensajes.modalAlert('warning', 'Valor no valido', 'El porcentaje de la utilidad debe ser mayor o igual a 5');
			}*/
		if($('#utilidad').val() === null || $('#utilidad').val() === '' || $('#utilidad').val() > 25){
			$('#utilidad').val('');
			mensajes.modalAlert('warning', 'Valor no valido', 'El porcentaje de la utilidad debe ser menor o igual a 25');
		}else{
			coberturasProdC.calculaTarifa();
		}
		}else{
			/*if($('#utilidad').val() === null || $('#utilidad').val() === '' || $('#utilidad').val() > 19){
				$('#utilidad').val('');
				mensajes.modalAlert('warning', 'Valor no valido', 'El porcentaje de la utilidad debe ser menor o igual a 19');
			}*/
				if($('#utilidad').val() === null || $('#utilidad').val() === '' || $('#utilidad').val() > 25){
					$('#utilidad').val('');
					mensajes.modalAlert('warning', 'Valor no valido', 'El porcentaje de la utilidad debe ser menor o igual a 25');
				}else{
					coberturasProdC.calculaTarifa();
				}
		}
	});
		
	$('#idTarifa').blur(function() {
		if($('.tipoCobertura1:checked').val() === 0){
		if($('#primaRiesgo').val() === null || $('#primaRiesgo').val() === '' 
			|| $('#gastosAdq').val() === null || $('#gastosAdq').val() === ''
				|| $('#gastosAdm').val() === null || $('#gastosAdm').val() === ''
					||$('#utilidad').val() === null || $('#utilidad').val() === ''
		){
		//	$('#idTarifa').val('');
			mensajes.modalAlert('warning', 'Valor no valido', 'Debe ingresar los datos completos.');
		}	
		}
	});
	
	$('#btnEditCobProd').click(function(){
		coberturasProdC.guardarCobProd('#formCobProdEditar','#editarCobProdModal');
	});
	
	$('.cobertura').change(function(){
		//Bloquear campos si es Asistencia
		coberturasProdC.validarTipoCobertura();
	});
});