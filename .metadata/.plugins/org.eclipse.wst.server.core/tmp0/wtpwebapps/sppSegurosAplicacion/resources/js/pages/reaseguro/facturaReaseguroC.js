var facturaReaseguroC = (function() {
	
	/*** METODO MUESTRA SOLO FECHA ACTUAL ***/
	 var anioActual = function(){
			var d = new Date();
			var fecha = d.getFullYear()
			
			return fecha
	 }
	
	 /*** METODO MUESTRA SOLO FECHA ACTUAL ***/
	 var fechaActual = function(){
			var d = new Date();
			var month = d.getMonth()+1;
			var day = d.getDate();
			
			var fecha = d.getFullYear()
			    + '-' + (month < 10 ? '0' : '') + month
			    + '-' + (day   < 10 ? '0' : '') + day;
			
			return fecha
		}
	 
	 /***** METODO PARA GENERAR FACTURA DE REASEGURO ***/
	 /*var facturaReaseguro = function(){
		 
		 	var trimestre = $('#numTrimestre').val()
		 	var anio      = $('#ejercicio').val()
		 	var ramo      =  $('#idRamo').val()

				 
		if (ramo === null || ramo === '') {
			return mensajes.modalAlert('warning', 'Información','Es necesario Seleccionar Ramo');
		}

		if (trimestre === null || trimestre == '') {
			return mensajes.modalAlert('warning', 'Información','Es necesario Seleccionar Periodo del Trimestre');
		}

		if (anio === null || anio == '') {
			return mensajes.modalAlert('warning', 'Información','Es necesario Seleccionar Año del Trimestre');
		}

		 $.ajax({
				
				url         : "capturaLiquidacionesC/facturaReaSeguro/"+trimestre+"/"+anio+"/"+ramo,
				type        : "GET",
				dataType    : 'json',
				contentType : 'application/json',
				beforeSend  : function(){
					util.loadingStart();
				},
				success: function(dataSet){
					if(dataSet.mensaje === "OK"){
						mensajes.modalAlert('success', 'Información', dataSet.detalleMensaje);
					}else{
						mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
					}
				},
				statusCode: {
					404: function () {
						console.log("");
					}
				},
				error: function (xhr, status, error) {
					var err = xhr.responseText;
					console.log(xhr);
				},
				complete: function(){
					util.loadingEnd();
				}
				
			})
	 }*/
	 
	 /***** METODO PARA CARGAR CATALOGO DE RAMOS ****/
		var llenaCatalogoRamo = function(){
			
			$.ajax({
				
				url         : "capturaLiquidacionesC/ramoCatalogo",
				type        : "GET",
				dataType    : 'json',
				contentType : 'application/json',
				beforeSend  : function(){
					util.loadingStart();
				},
				success: function(dataSet){

					if(dataSet.mensaje === "OK"){
						$('.lstRamos').html("");
						
						$('.lstRamos').append('<option value="0" selected disabled>Seleccione Ramo...</option>');
						
						$.each(dataSet.dataExtra, function(i, v) {
							$('.lstRamos').append('<option value="' + v.cveRamo + '">' + v.cT8Descripcion + '</option>');
						});
						
					}else{
						mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
					}
				},
				statusCode: {
					404: function () {
						console.log("");
					}
				},
				error: function (xhr, status, error) {
					var err = xhr.responseText;
					console.log(xhr);
				},
				complete: function(){
					util.loadingEnd();
				}
				
			})
			
		}
	
	/*** METODO CARGA LISRA DE AÑOS PARA REPORTES ***/
	var catalogoAnios = function(){
		
		$.ajax({
			
			url         : "capturaLiquidacionesC/anioReporte",
			type        : "GET",
			dataType    : 'json',
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){

				if(dataSet.mensaje === "OK"){
					$('.lstAniosReporte').html("");
					
					$('.lstAniosReporte').append('<option value="0" selected disabled>Seleccione Año...</option>');
					
					$.each(dataSet.dataExtra, function(i, v) {
						$('.lstAniosReporte').append('<option value="' + v.anioEjercicio + '">' + v.anioEjercicio + '</option>');
					});
					
				}else{
					mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("");
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
			
		})
		
		
		
	}
	
	
	/***** METODO PARA GENERAR FACTURA DE REASEGURO ***/
	 var facturaReaseguro = function(){
		 
		 	var trimestre = $('#numTrimestre').val()
		 	var anio      = $('#ejercicio').val()
		 	var idContrato      =  $('#contratos').val()

				 
		if (idContrato === null || idContrato === '') {
			return mensajes.modalAlert('warning', 'Información','Es necesario Seleccionar Ramo');
		}

		if (trimestre === null || trimestre == '') {
			return mensajes.modalAlert('warning', 'Información','Es necesario Seleccionar Periodo del Trimestre');
		}

		if (anio === null || anio == '') {
			return mensajes.modalAlert('warning', 'Información','Es necesario Seleccionar Año del Trimestre');
		}

		 $.ajax({
				
				url         : "capturaLiquidacionesC/facturaReaSeguro/" + trimestre + "/" + anio + "/" + idContrato,
				type        : "GET",
				//dataType    : 'json',
				//contentType : 'application/json',
				xhrFields: {
		            responseType: 'blob'
		        },
				beforeSend  : function(){
					util.loadingStart();
				},
				success: function(dataSet, textStatus, jqXHR ){console.log(jqXHR);
				
					if(jqXHR.getResponseHeader('generado') === "OK"){
						var a = document.createElement('a');
						var url = window.URL.createObjectURL(dataSet);
						a.href = url;
				        a.download = 'estados_de_cuenta.zip';
				        document.body.append(a);
				        a.click();
				        a.remove();
				        window.URL.revokeObjectURL(url);
				        
						mensajes.modalAlert('success', 'Información', 'Estado(s) de cuenta generados');
					}else{
						mensajes.modalAlert('warning', 'Información', jqXHR.getResponseHeader('descripcion'));
					}
				},
				statusCode: {
					404: function () {
						console.log("");
					}
				},
				error: function (xhr, status, error) {
					var err = xhr.responseText;
					console.log(xhr);
				},
				complete: function(){
					util.loadingEnd();
				}
				
			})
	 };
	 
	 var cargaContratosProporcionles = function() {console.log("deberia");
			$.ajax({
				url : "reaseguro/reportes/bordereaux/obtener/contratos/bordereauxPrimas",
				method : "get",
				dataType : 'json',
				contentType : 'application/json',
				beforeSend: function(){
					util.loadingStart();
				},
				success : function(dataSet) {
					if (dataSet.mensaje === 'OK') {
						$.each(dataSet.dataExtra, function(i, v) {
							
							if(v.tipoContrato.tipoReaseguro !== 'NO PROPORCIONAL'){
								$('#contratos').append('<option value="' + v.id +'">' + v.nombreContrato + '</option>');
							}
						});
					} else {
						mensajes.modalAlert('danger', 'No hay contratos.', 'Primero capture un contrato proporcional.');
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
			llenaCatalogoRamo : llenaCatalogoRamo,
			catalogoAnios     : catalogoAnios,
			facturaReaseguro  : facturaReaseguro,
			cargaContratosProporcionles :cargaContratosProporcionles
	}
})();