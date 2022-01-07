var cargoC = (function(){
	
	var comboCargos = function(){
		
		$.ajax({
			url : "cargoC/obtenerCargos",
			method: "GET",
			dataType: 'json',
			contentType: 'application/json',
			success : function(dataSet) {
				$('.cargo').html("");
				if(dataSet.mensaje === 'OK'){
					$('.cargo').append('<option value="">Seleccione opción...</option>');
					$.each(dataSet.dataExtra, function(i, v){
						var cargo = v.cargo;
						if(v.cargo.length > 25){
							cargo = v.cargo.substring(0, 35);
						}
						$('.cargo').append(
								'<option value="' + v.idCargo + '" class="wrap" title="' + v.cargoo + '">'
										+ cargo + '</option>');
					});
				}
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			}
		});
	}
	
	return {
		comboCargos : comboCargos
	}
})();