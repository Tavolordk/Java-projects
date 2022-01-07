var RR6trimdC = (function() {
	var validaciones = function() {
		if($('#anyo').val().trim()==""){
			//alert("Llenar el campo Año.");
			return mensajes.modalAlert('warning', 'Información', 'Es necesario llenar el campo Año.');
		}
		if($('#trimestre').val()==0){
			//alert("Llenar el campo Trimestre.");
			return mensajes.modalAlert('warning', 'Información', 'Es necesario llenar el campo Trimestre.');
		}
		
		var model = {};
		model["anyo"] = $('#anyo').val().trim();
		model["trimestre"] = $('#trimestre').find(':selected').text();
		$.ajax({
			url : "reaseguro/validacionReporteRegulatorioRR6trimd",
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