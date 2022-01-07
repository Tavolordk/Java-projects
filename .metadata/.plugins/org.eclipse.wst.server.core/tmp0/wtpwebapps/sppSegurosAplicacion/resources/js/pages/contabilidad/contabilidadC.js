var contabilidadC = (function () {
	
	var generarContabilidad = function() {
		var $modulo = $('#modulo').val();
		var $fecha = $('#fecha').val();
	
		if($fecha === ''){
			return mensajes.modalAlert('warning', 'Información', 'Es Necesario Indicar Fecha para Generar Contabilidad');
		}
		
		$.ajax({
			url: "generar",
			type: "POST",
			data: {
				fecha : $fecha,
				modulo : $modulo
			},
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {console.log(dataSet);
				if (dataSet.mensaje === 'OK') {
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					 $('#fecha').val("");
				} else {
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}

	return {
		generarContabilidad: generarContabilidad,
	}
})();