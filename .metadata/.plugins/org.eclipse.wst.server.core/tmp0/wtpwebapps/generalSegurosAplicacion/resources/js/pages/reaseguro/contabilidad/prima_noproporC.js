var prima_noproporC = (function() {
	var validaciones = function() {
		if($('#contratos').val()==0){
			return mensajes.modalAlert('warning', 'Información', 'Es necesario llenar el campo Contratos.');
		}
		if($('#desde').val().trim()==""){
			return mensajes.modalAlert('warning', 'Información', 'Es necesario llenar el campo Desde.');
		}
		if($('#hasta').val().trim()==""){
			return mensajes.modalAlert('warning', 'Información', 'Es necesario llenar el campo Hasta.');
		}
		if(new Date($('#desde').val().trim())>new Date($('#hasta').val().trim())){
			return mensajes.modalAlert('warning', 'Información', 'Fecha "Desde" debe ser menor o igual a fecha "Hasta".');
		}
		
		var model = {};
		model["contratos"] = $('#contratos').find(':selected').text();
		model["desde"] = $('#desde').val().trim();
		model["hasta"] = $('#hasta').val().trim();
		$.ajax({
			url : "reaseguro/validacionContabilidadPrimaNoProporcional",
			type : "POST",
			data        : JSON.stringify(model),
			dataType    : 'json',
			contentType : 'application/json',

			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet){
				funcionesAjax.successAjax(dataSet);
				$('#pmd').val("0");
				$('#factor').val("0");
				$('#prima').val("0");
				$('#prim_ret').val("0");
				$('#prim_aj').val("0");
				$( "#btnContabilidad" ).prop( "disabled", false );
			},
			complete : function() {
				util.loadingEnd();
			}
		})
		.fail(funcionesAjax.failAjax);
	}

	return {
		validaciones : validaciones
	}
})();