var identificacionC = (function() {

	// Obtener listado de todas las identificaciones
	var obtenerIdentificaciones = function() {
		$.ajax({
			url : "identificacionC/obtenerIdentificaciones",
			method : "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				$('.tipoIdentificacion').html("");
				if (dataSet.mensaje === 'OK') {
					$('.tipoIdentificacion').append(
							'<option value="">Seleccione opción...</option>');
					$.each(dataSet.dataExtra, function(i, v) {
						$('.tipoIdentificacion').append(
								'<option value="' + v.ct14Cve + '">'
										+ v.ct14Descripcion + '</option>');
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
		obtenerIdentificaciones : obtenerIdentificaciones
	}
})();