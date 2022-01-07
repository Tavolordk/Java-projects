
var clienteC = (function() {
	var extraerCliente = function(){
		console.log("obtener Clientes");
		$.ajax({
			url : "clientesC/obtenerClientes",
			method: "get",
			dataType: 'json',
			contentType: 'application/json',
			success : function(dataSet) {
				console.log(dataSet);
				$('#cliente, .cliente').html("");
				console.log("traje clientes",dataSet);
				if(dataSet.mensaje === 'OK'){
					$('#cliente, .cliente').append('<option value="0">Seleccione Cliente...</option>');
					$.each(dataSet.dataExtra, function(i, v){
						$('#cliente, .cliente').append('<option value="' + v[0] +'">' + v[1] + '</option>');
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
	
	var extraerProducto = function(){
		$.ajax({
			url : "productoC/obtenerProducto",
			method: "get",
			dataType: 'json',
			contentType: 'application/json',
			success : function(dataSet) {
				$('#claveProducto, .producto').html("");
				console.log("traje producto",dataSet);
				if(dataSet.mensaje === 'OK'){
					$('#claveProducto, .producto').append('<option value="0">Seleccione Producto...</option>');
					$.each(dataSet.dataExtra, function(i, v){
						$('#claveProducto, .producto').append('<option data-plazo="' + v.plazoPlan +'" value="' + v.cveProducto +'">' + v.nombre + '</option>');
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
		
		extraerCliente : extraerCliente,
		extraerProducto: extraerProducto
	}
})();