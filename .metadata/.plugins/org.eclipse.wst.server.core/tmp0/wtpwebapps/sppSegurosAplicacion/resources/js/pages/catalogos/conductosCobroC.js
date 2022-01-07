var conductosCobroC = (function() {

	var obtenerConductosCobroSolicitud = function() {
		
		$.ajax({
			url : "conductoCobroC/obtenerConductosCobros",
			method : "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				$('.idConductoCobro').html("");
				if (dataSet.mensaje === 'OK') {
					$('.idConductoCobro').append(
							'<option value="">Seleccione opción...</option>');
					$.each(dataSet.dataExtra, function(i, v) {
						$('.idConductoCobro').append(
								'<option value="' + v.ct25Id + '">'
										+ v.ct25Descripcion + '</option>');
					});
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
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
		
		obtenerConductosCobroSolicitud : obtenerConductosCobroSolicitud
	}
})();