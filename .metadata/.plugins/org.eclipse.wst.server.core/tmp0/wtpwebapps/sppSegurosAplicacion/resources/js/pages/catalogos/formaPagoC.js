var formaPagoC = (function() {

	// Obtener listado de todas las identificaciones
	var obtenerFormasPago = function() {
		$.ajax({
			url : "formaPagoC/obtenerFormasPago",
			method : "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				$('.metodoUsualPago').html("");
				if (dataSet.mensaje === 'OK') {
					$('.metodoUsualPago').append(
							'<option value="">Seleccione opción...</option>');
					$.each(dataSet.dataExtra, function(i, v) {
						$('.metodoUsualPago').append(
								'<option value="' + v.ct18Cve + '">'
										+ v.ct18Descripcion + '</option>');
					});
				}
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}

	var obtenerFormasPagoSolicitud = function() {
		$.ajax({
			url : "formaPagoC/obtenerFormasPago",
			method : "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				$('.idFormaPago').html("");
				if (dataSet.mensaje === 'OK') {
					$('.idFormaPago').append(
							'<option value="">Seleccione opción...</option>');
					$.each(dataSet.dataExtra, function(i, v) {
						$('.idFormaPago').append(
								'<option value="' + v.ct18Cve + '">'
										+ v.ct18Descripcion + '</option>');
					});
				}
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}

	return {
		obtenerFormasPago : obtenerFormasPago,
		obtenerFormasPagoSolicitud : obtenerFormasPagoSolicitud
	}
})();