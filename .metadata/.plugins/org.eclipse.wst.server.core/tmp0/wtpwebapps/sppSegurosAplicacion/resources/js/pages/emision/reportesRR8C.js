var reportesRR8C = (function() {
	
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
	 
	var reporteCorsOrs = function(){
		var tipoReporte = $('#tipoReporte').val()
		var numTrimestre = $('#numTrimestre').val()
		var anioReporte = $('#ejercicio').val()
		
		if(tipoReporte === ''){
			return mensajes.modalAlert('warning', 'Informacion','Es Necesario Elegir el Tipo de Reporte');
		}
		
		if(numTrimestre === ''){
			return mensajes.modalAlert('warning', 'Informacion','Es Necesario Elegir Trimestre para Generar el Reporte');
		}
		
		if(anioReporte === null || anioReporte === ''){
			return mensajes.modalAlert('warning','Información', 'Es Necesario Elegir Año del Reporte')
		}
		
		$.ajax({
			url : "capturaLiquidacionesC/rr8TrimestralCorsOrs/"+numTrimestre+"/"+tipoReporte+"/"+anioReporte,
			type : "POST",
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success: function(dataSet){
				
				if(dataSet.mensaje === 'OK'){
					mensajes.modalAlert('success', 'Informacion',dataSet.detalleMensaje);
				}else{
					mensajes.modalAlert('warning', 'Informacion',dataSet.detalleMensaje);
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
	
	/*** METODO PARA GENERAR REPORTES FES ***/
	var reporteFes = function(){
		var tipoReporte = $('#tipoReporte').val()
		var anioReporte = $('#ejercicio').val()
		
		if(tipoReporte === ''){
		   return mensajes.modalAlert('warning','Información', 'Es Necesario Elegir Tipo de Reporte')
		}
		
		if(anioReporte === null || anioReporte === ''){
			return mensajes.modalAlert('warning','Información', 'Es Necesario Elegir Año del Reporte')
		}
		
		$.ajax({
			url : "capturaLiquidacionesC/rr8Fes/"+anioReporte+"/"+tipoReporte,
			type : "POST",
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success: function(dataSet){
				if(dataSet.mensaje === 'OK'){
					mensajes.modalAlert('success', 'Informacion',dataSet.detalleMensaje);
				}else{
					mensajes.modalAlert('warning', 'Informacion',dataSet.detalleMensaje);
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
	
	return {
		reporteCorsOrs : reporteCorsOrs,
		catalogoAnios  : catalogoAnios,
		reporteFes     :  reporteFes
	}
})();