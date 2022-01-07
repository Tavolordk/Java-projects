var cargaMovimientosC = (function(){
	
	var cargarArchivoMovimientos = function(){
		var formData = new FormData();
		formData.append("file", $('#fileInput')[0].files[0]);
		
		$.ajax({
			url: "reservas/cargarArchivoMovimientos",
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
					mensajes.modalAlert('info', dataSet.mensaje, dataSet.detalleMensaje);
				}else{
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
				}
				
			},
			complete: function(){
				$('#btnCargarArchivoAgrupador').prop('disabled', true);
				util.loadingEnd();
			}
		});
	};
return {
		cargarArchivoMovimientos : cargarArchivoMovimientos
	}
})();