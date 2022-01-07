var cargaEmisionC = (function(){
	
	var cargarArchivoEmision = function(){
		var formData = new FormData();
		formData.append("file", $('#fileInput')[0].files[0]);
		
		$.ajax({
			url: "reservas/cargarArchivoEmision",
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
					
				}
					
				
				
			},
			complete: function(){
				$('#btnCargarArchivoAgrupador').prop('disabled', true);
				util.loadingEnd();
			}
		});
	};
	

return {
		cargarArchivoEmision : cargarArchivoEmision
	}
})();