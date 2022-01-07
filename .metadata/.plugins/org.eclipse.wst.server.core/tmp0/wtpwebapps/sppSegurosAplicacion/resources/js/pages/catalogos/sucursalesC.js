var sucursalC = (function() {

//	var extraerSucursal = function(){
//		$.ajax({
//			url : "sucursalC/obtenerSucursales",
//			method: "get",
//			dataType: 'json',
//			contentType: 'application/json',
//			success : function(dataSet) {
//				//console.log(dataSet);
//				$('#idSucursal, .idSucursal').html("");
//				//console.log(dataSet);
//				if(dataSet.mensaje === 'OK'){
//					$('#idSucursal, .idSucursal').append('<option value="0">Seleccione Sucursal...</option>');
//					$.each(dataSet.dataExtra, function(i, v){
//						$('#idSucursal, .idSucursal').append('<option value="' + v.ct19ClaveSurcursal +'">' + v.ct19Descripcion + '</option>');
//					});
//				}
//			},
//			statusCode : {
//				
//				404 : function() {
//					console.log(this.url);
//					console.log("page not found");
//				}
//			}
//		});
//	}
	
	var extraerSucursal = function(idSucursal) {
		prueba(function(sucursal) {
			var dataSet = sucursal;
			
			if(dataSet.mensaje === 'OK'){
				$('#idSucursal, .idSucursal').append('<option value="0">Seleccione Sucursal...</option>');
				$.each(dataSet.dataExtra, function(i, v){
					$('#idSucursal, .idSucursal').append('<option value="' + v.ct19ClaveSurcursal +'">' + v.ct19Descripcion + '</option>');
				});
			}
			if(idSucursal){
				$("#idSucursal").val(idSucursal);
				
			}
				
		});
		function prueba(callback) {
			$.ajax({
				url : "sucursalC/obtenerSucursales",
				method: "get",
				dataType: 'json',
				contentType: 'application/json',
				success : function(dataSet) {
					callback(dataSet)
				},
				statusCode : {
					404 : function() {
						console.log("page not found");
					}
				}
			});
		}
	}
	
	
	
	
	
	


	return {		
		extraerSucursal : extraerSucursal
	}
})();