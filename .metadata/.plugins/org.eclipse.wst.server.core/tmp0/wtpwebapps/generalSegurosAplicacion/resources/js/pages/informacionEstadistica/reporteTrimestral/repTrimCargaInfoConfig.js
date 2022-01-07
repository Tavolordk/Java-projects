var repTrimCargaInfoConfig = (function() {
	

	var cargarArchivoZip = function(){
		
		var formData = new FormData();
//		var tipoInsercion = $('#insercionM').find(':selected').val();
//		var fechaDesde = $('#fecDesde').val();
//		var fechaHasta = $('#fecHasta').val();
		//alert("Vamos al metodo desde el js")
//		alert("tipoInsercion  " + tipoInsercion)
//		alert("fechaDesde " + fechaDesde)
//		alert("fechaHasta " + fechaHasta)
		
		formData.append("file", $('#fileInput')[0].files[0]);
//		formData.append("tipoInsercion", new Blob([JSON.stringify(tipoInsercion)], { type: 'application/json' }));
//		formData.append("fechaDesde", new Blob([JSON.stringify(fechaDesde)], { type: 'application/json' }));
//		formData.append("fechaHasta", new Blob([JSON.stringify(fechaHasta)], { type: 'application/json' }));
//		
//	if (fechaDesde === '' || fechaHasta === '') {
//		console.log ("Hola estoy entrando en la validacion " + fechaDesde + "  $('#fecHasta').val() " + $('#fecHasta').val())
//		 return mensajes.modalAlert('warning', 'Informacion',
//					'Es necesario que se ingresen ambas fechas');
//		} else {
			
		$.ajax({
			url: "reporteTrimestralHipotesis/lecturaArchivoZip",
			type: "POST",
			data: formData,
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			cache: false,
			
			beforeSend: function(){
				util.loadingStart();
			},
			
			success: function (dataSet) {
				if (dataSet.mensaje === 'OK') {
//					mensajes.modalAlert('info', dataSet.mensaje, 
//							dataSet.detalleMensaje);
					alert(' Información ' + dataSet.mensaje + 
							dataSet.detalleMensaje);
					
					
				}
//				else if (dataSet.mensaje === 'ERROR ') {
//					mensajes.modalAlert('info', dataSet.mensaje, 
//							dataSet.detalleMensaje);
//					console.log('info' +"  "+ dataSet.mensaje + 
//							dataSet.detalleMensaje);
//					alert('info' + dataSet.mensaje + 
//							dataSet.detalleMensaje);
//				}
//				else {
//					mensajes.modalAlert('warning', 'Informacion',
//							dataSet.detalleMensaje);
//				}
			},
			
			complete: function(){
				//$('#btnCargarArchivoAgrupador').prop('disabled', true);
				util.loadingEnd();
				location.reload();
			}
		}).fail(function(jqXHR, textStatus, errorThrown) {

			if (jqXHR.status === 0) {
				alert('Sin conexión: Verifique que el equipo se encuentra conectado a una red de internet.');
			} else if (jqXHR.status == 404) {
				alert('La pagina que esta solicitando no existe. Error: [404]');
			} else if (jqXHR.status == 500) {
				alert('Error interno del servidor. Valide con su proveedor del servicio [500].');
			} else if (textStatus === 'parsererror') {
				alert('JSON conversión fallida.');
			} else if (textStatus === 'timeout') {
				alert('Tiempo de espera agotado.');
			} else if (textStatus === 'abort') {
				alert('Ajax request aborted.');
			} else {
				alert('Uncaught Error: ' + jqXHR.responseText);
			}

		});
//	}
	}
	

return {
	cargarArchivoZip : cargarArchivoZip
	}


})();
