var cargaCfdiC = (function() {

	/** ********************************************** */
	/** *** METODO PARA CARGAR ARCHIVO PAGOS BANCO *** */
	/** ********************************************** */
	var cargaRespuestaCFDI = function() {

		var formData = new FormData();
		
		console.log($('#fileInputCargaCFDI')[0].files[0])
		
		if($('#fileInputCargaCFDI').val() === ''){
			return mensajes.modalAlert('warning', 'Información','No se Encontro Archivo para Cargar Información');
		}else{
			formData.append('file', $('#fileInputCargaCFDI')[0].files[0]);
		}
		
		$.ajax({

			url : "capturaLiquidacionesC/respuestaCFDI",
			type : "POST",
			data : formData,
			enctype : 'multipart/form-data',
			processData : false,
			contentType : false,
			cache : false,
			beforeSend : function() {
				util.loadingStart();
			},

			success : function(dataSet) {
				console.log('RESPUESTA CARGA CFDI');
				console.log(dataSet);
				if (dataSet.mensaje === 'OK') {
					mensajes.modalAlert('success', 'Información',dataSet.detalleMensaje);
					$('#cargaCFDI')[0].reset();
				} else {
					mensajes.modalAlert('warning', 'Información',dataSet.detalleMensaje);
					$('#cargaCFDI')[0].reset();
				}
			},
			statusCode : {
				404 : function() {
					console.log("");
				}
			},
			error : function(xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete : function() {

				util.loadingEnd();
			}
		});

	}

	return {
		cargaRespuestaCFDI : cargaRespuestaCFDI
	}

})();