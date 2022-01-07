var reporterr8C = (function () {
	
	var generarReporte = function() {
		var $fecha = $('#fecha').val();
		var $tipoReporte = $('#tipoReporte').val();
		var $url = "";
		
		if($fecha === ''){
			return mensajes.modalAlert('warning', 'Información', 'Es necesario indicar fecha para generar reporte');
		}
		
		if($tipoReporte == 1){
			$url = "reportes_rr8/reporteDatosGenerales";
		}else if($tipoReporte == 2){
			$url = "reportes_rr8/reporteEmision";
		}else if($tipoReporte == 3){
			$url = "reportes_rr8/reporteSiniestros";
		}
		
		$.ajax({
			url: $url,
			type: "POST",
			data: {
				fecha : $fecha,
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
		generarReporte: generarReporte,
	}
})();