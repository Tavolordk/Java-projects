
var coloniasC = (function() {
	
	var guardarColonias = function() {
		var formData = {};
    	//iterate over form elements   
		$.each($('input, select', '#formColoniasNuevo'),function(k, v){
	        formData[$(this).attr("name")] = $(this).val();
	    });
		console.log(formData);
		$.ajax({
			url : "coloniasC/guardarColonias",
			method: "POST",
			data: JSON.stringify(formData),
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				console.log(dataSet.mensaje);
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

	var obtenerColonias = function() {
		$.ajax({
			url : "coloniasC/obtenerAllColonias",
			method : "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				var columnas = [
						{
							title : "Codigo Postal",
							data : "codigoPostal"
						},
						
						{
							title : "Colonia",
							data : "nombreColonia"
						},
						
						{
							title : "Municipio",
							data : "municipio.nombreMunicipio"
						},
						
						{
							title : "Estado",
							data : "municipio.estado.nombreEstado"
						},
						
						{
							title : "",
							data : null,
							defaultContent : "<span data-toggle='collapse'><i class='fas fa-edit'></i></span>",
							orderable : false
						}/*,
						{
							title : "",
							data : null,
							defaultContent : "<span data-toggle='collapse'><i class='fas fa-trash-alt'></i></span>",
							orderable : false
						} */
						];
					if (dataSet.mensaje === "OK") {
						console.log(dataSet);
						tabla.iniciarTabla("#tablaColonia", dataSet.dataExtra, columnas);
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
		
	var obtenerColoniasByCodigoPostal = function(cp) {		

		$.ajax({
			url : "coloniasC/obtenerColoniasByCP/" + cp,
			method : "GET",
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				
				
				console.log(dataSet);
				
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			},

			error : function(request, status, error) {
				console.log(request.responseText);
			},
			complete : function() {
				util.loadingEnd();
			}
		});
	}
	
	
	return {
		guardarColonias : guardarColonias,
		obtenerColonias : obtenerColonias,
		obtenerColoniasByCodigoPostal : obtenerColoniasByCodigoPostal
	}
})();