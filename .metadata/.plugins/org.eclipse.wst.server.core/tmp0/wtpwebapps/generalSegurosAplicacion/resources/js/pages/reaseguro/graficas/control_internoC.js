var control_internoC = (function() {
	var validaciones = function() {
		if($('#lmr').val().trim()==""){
			//alert("Llenar el campo LMR.");
			return mensajes.modalAlert('warning', 'Información', 'Es necesario llenar el campo LMR.');
		}
		if($('#vigor').val().trim()==""){
			//alert("Llenar el campo Vigor.");
			return mensajes.modalAlert('warning', 'Información', 'Es necesario llenar el campo Vigor.');
		}
		if($('#ramo').val()==0){
			//alert("Llenar el campo Ramo.");
			return mensajes.modalAlert('warning', 'Información', 'Es necesario llenar el campo Ramo.');
		}
		if($('#rango').val().trim()==""){
			//alert("Llenar el campo Rango.");
			return mensajes.modalAlert('warning', 'Información', 'Es necesario llenar el campo Rango.');
		}
		//alert("Validaciones finalizadas.");
		
		var model = {};
		model["lmr"] = $('#lmr').val().trim();
		model["vigor"] = $('#vigor').val().trim();
		model["ramo"] = $('#ramo').find(':selected').text();
		model["rango"] = $('#rango').val().trim();
		$.ajax({
			url : "reaseguro/validacionGraficaControlInterno",
			type : "POST",
			data        : JSON.stringify(model),
			dataType    : 'json',
			contentType : 'application/json',

			beforeSend : function() {
				util.loadingStart();
			},
			success : funcionesAjax.successAjax,
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