agentesC.archivos();
$(document).ready(function() {

	agentesC.obtenerAgentes();
	$('#btnNuevoAgente').click(function(){
		agentesC.btnNuevoAgente();
	});
	
	
	$('#formAgente .codigoPostal').focusin(function() {
		agentesC.autoCompletarCodigoPostal('formAgente');
	});
	
	//Accion guardar Agentesd
	$('#btnGuardarAgente').click(function(){
		agentesC.guardarAgentes();
	});
	
	$('#fisicaMoral').click(function() {
		if($('#fisicaMoral').val() === 'M'){
			$("#apeM").hide();
			$("#apeP").hide();
            //$("#apePaterno").prop("hide", true);
            //$("#apeMaterno").prop("hide", true);
            
		} else{
			$("#apeM").show();
			$("#apeP").show();
			//$("#apePaterno").prop("disabled", false);
            //$("#apeMaterno").prop("disabled", false);
            }
		
	});
	
	
	$('#colonia').blur(function() {
		if($('#colonia').val() !== null && $('#colonia').val() !== ''){
			$('#colonia').val('');
			mensajes.modalAlert('warning', 'Valor no valido', 'Debe ingresar la colonia.');
		}		
	});
	
	$('#nombre').blur(function() {
		if($('#nombre').val() !== null && $('#nombre').val() !== ''){
			$('#nombre').val('');
			mensajes.modalAlert('warning', 'Valor no valido', 'Debe ingresar nombre del Agente.');
		}		
	});

	
	
/*	
	$('#fechaAlta').ready(function() {
		$('#fechaAlta').val(new Date().toDateInputValue());
	});
	
	$('#fechaAlta').blur(function() {
		if($('#fechaAlta').val() !== null && $('#fechaAlta').val() !== ''){
			//$('#fechaAlta').val('');
			$('#fechaAlta').val(new Date().toDateInputValue());
			mensajes.modalAlert('warning', 'Valor no valido', 'Debe ingresar la fecha de Alta.');
		}		
	});
	
	$('#fechaAlta').on('hidden.bs.modal', function (e) {
		$('#formProveedor')[0].reset();
		$('.currentDate').bootstrapDP('setDate', new Date());
	})
	*/
	
	
	
	
	$('#iniVigFia').blur(function() {
		if($('#iniVigFia').val() !== null && $('#iniVigFia').val() !== '' && $('#terVigFia').val() !== null && $('#terVigFia').val() !== '') {
			var inicio = new Date($('#iniVigFia').val());
			var termino = new Date($('#terVigFia').val());
			if(inicio > termino) {
				$('#iniVigFia').val('');
				mensajes.modalAlert('warning', 'Valor no valido', 'La fecha de inicio debe ser menor o igual a la fecha de termino.');
			}
		}
		if($('#iniVigFia').val() !== null && $('#iniVigFia').val() !== '') {
			var inicio = new Date($('#iniVigFia').val());
			var year = inicio.getFullYear();
			var month = inicio.getMonth();
			var day = inicio.getDate();
			var c = new Date(year + 1, month, day+1);
			$('#terVigFia').bootstrapDP('setDate', c);
		}
	});
	
	$('#terVigFia').blur(function() {
		if($('#iniVigFia').val() !== null && $('#iniVigFia').val() !== '' && $('#terVigFia').val() !== null && $('#terVigFia').val() !== '') {
			var inicio = new Date($('#iniVigFia').val());
			var termino = new Date($('#terVigFia').val());
			if(inicio > termino) {
				$('#terVigFia').val('');
				mensajes.modalAlert('warning', 'Valor no valido', 'La fecha de termino debe ser mayor o igual a la fecha de inicio.');
			}
		}
	});
	
	$('#iniVigPol').blur(function() {
		if($('#iniVigPol').val() !== null && $('#iniVigPol').val() !== '' && $('#terVigPol').val() !== null && $('#terVigPol').val() !== '') {
			var inicio = new Date($('#iniVigPol').val());
			var termino = new Date($('#terVigPol').val());
			if(inicio > termino) {
				$('#iniVigPol').val('');
				mensajes.modalAlert('warning', 'Valor no valido', 'La fecha de inicio debe ser menor o igual a la fecha de termino.');
			}
		}
		if($('#iniVigPol').val() !== null && $('#iniVigPol').val() !== '') {
			var inicio = new Date($('#iniVigPol').val());
			var year = inicio.getFullYear();
			var month = inicio.getMonth();
			var day = inicio.getDate();
			var c = new Date(year + 1, month, day+1);
			$('#terVigPol').bootstrapDP('setDate', c);
		}
	});
	
	$('#terVigPol').blur(function() {
		if($('#iniVigPol').val() !== null && $('#iniVigPol').val() !== '' && $('#terVigPol').val() !== null && $('#terVigPol').val() !== '') {
			var inicio = new Date($('#iniVigPol').val());
			var termino = new Date($('#terVigPol').val());
			if(inicio > termino) {
				$('#terVigPol').val('');
				mensajes.modalAlert('warning', 'Valor no valido', 'La fecha de termino debe ser mayor o igual a la fecha de inicio.');
			}
		}
	});
	
});