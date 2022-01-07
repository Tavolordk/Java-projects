var nivelesAccesoC = (function() {
	
	var guardarNivelesAcceso = function() {
		var formData = {};
		
    	//iterate over form elements   
		$.each($('input, select', '#formNivelesAccesoNuevo'),function(k, v){
	        formData[$(this).attr("name")] = $(this).val();
	    });
		console.log(formData);
		$.ajax({
			url : "nivelesAccesoC/guardarNivelesAcceso",
			method: "POST",
			data: JSON.stringify(formData),
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				console.log(dataSet.mensaje);
				if(dataSet.mensaje==="OK"){
					nivelesAccesoC.obtenerNivelesAcceso();
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$('#formNivelesAccesoNuevo')[0].reset();
					$('#nuevoNivelAccesoModal').modal('hide');
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

	var obtenerNivelesAcceso = function() {
		$.ajax({
			url : "nivelesAccesoC/obtenerNivelesAcceso",
			method : "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				var columnas = [
						{
							title : "Perfil de Acceso",
							data : "ct1OpcionesMenu"
						},
						{
							title : "Descipción Acceso",
							data : "ct1DescripcionAcceso"
						},
						{
							title : "Opciones Menu",
							data : "ct1OpcionesMenu"
						},
						{
							title : "Lectura",
							data : "ct1Lectura"
						},
						
						{
							title : "Alta/Baja",
							data : "ct1AltaBaja"
						},
						
						{
							title : "Modifica",
							data : "ct1Modifica"
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
						}*/
						];
				console.log(dataSet);
				if (dataSet.mensaje === "OK") {
					tabla.iniciarTabla("#tablaNivelAcceso", dataSet.dataExtra, columnas);
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
		guardarNivelesAcceso : guardarNivelesAcceso,
		obtenerNivelesAcceso : obtenerNivelesAcceso
		
		
	}
})();