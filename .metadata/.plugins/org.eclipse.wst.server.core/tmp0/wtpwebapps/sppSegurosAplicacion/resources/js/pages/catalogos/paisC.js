var paisC = (function() {

	// Obtener listado de todos los paises
	var obtenerPaises = function() {
		$.ajax({
			url : "paisC/obtenerPaises",
			method : "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				$('.pais').html("");
				if (dataSet.mensaje === 'OK') {
					$('.pais').append(
							'<option value="">Seleccione opción...</option>');
					$.each(dataSet.dataExtra, function(i, v) {
						$('.pais').append(
								'<option value="' + v.ct17Cve + '">'
										+ v.ct17PaisNombre + '</option>');
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
		obtenerPaises : obtenerPaises
	}
})();