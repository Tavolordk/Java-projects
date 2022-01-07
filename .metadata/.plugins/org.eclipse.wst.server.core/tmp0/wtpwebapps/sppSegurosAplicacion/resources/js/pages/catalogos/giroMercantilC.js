var giroMercantilC = (function() {

	// Obtener listado de todas las identificaciones
	var obtenerGirosMercantiles = function() {
		$.ajax({
			url : "giroMercantilC/obtenerGirosMercantiles",
			method : "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				$('.giroMercantil').html("");
				if (dataSet.mensaje === 'OK') {
					$('.giroMercantil').append(
							'<option value="">Seleccione opción...</option>');
					$.each(dataSet.dataExtra, function(i, v) {
						var giro = v.ct15Giro;
						if(v.ct15Giro.length > 25){
							giro = v.ct15Giro.substring(0, 35);
						}
						$('.giroMercantil').append(
								'<option value="' + v.ct15Cve + '" class="wrap" title="' + v.ct15Giro + '">'
										+ giro + '</option>');
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
		obtenerGirosMercantiles : obtenerGirosMercantiles
	}
})();