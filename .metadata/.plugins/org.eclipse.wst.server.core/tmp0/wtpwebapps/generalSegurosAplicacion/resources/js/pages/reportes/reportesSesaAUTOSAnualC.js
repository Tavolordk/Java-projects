var reportesSesaAnualC= (function(){
	

	/*** METODO GENERA REPORTE CORS Y ORS ***/
	var reporteAnual = function(){
		
		var ramo = $('#tipoRamo').val()
	    var anioReporte = $('#ejercicioSesa').val()
		
		console.log(anioReporte)
		console.log(ramo)
		
		if(ramo ===  null || ramo === '0'){
			return mensajes.modalAlert('success', 'Información', 'Es Necesario elegir el Ramo del Reporte');
		}
		
		if(anioReporte === null || anioReporte === '0'){
			return mensajes.modalAlert('success', 'Información', 'Es Necesario elegir Año de Reporte');
		}
		
		$.ajax({
			url : "ReportesSesaC/reporteAnual/"+anioReporte+"/"+ramo,
			type: "GET",
			contentType : false,
			beforeSend  : function(){
				util.loadingStart();
			},
			success : function(dataSet){
				console.log(dataSet)
			if(dataSet.dataExtra !== null){
				var url  = URL.createObjectURL(utils(dataSet.dataExtra.bytes, "application/zip"));
				var blob = utils(dataSet.dataExtra.bytes, "application/zip");
				
				if (window.navigator.msSaveBlob) { // // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
				    window.navigator.msSaveOrOpenBlob(blob, dataSet.dataExtra.nombre);
				}else {
				    var a  = window.document.createElement("a");
				    a.href = window.URL.createObjectURL(blob, { type: "application/zip" });
				    a.download = dataSet.dataExtra.nombre;
				   
				    document.body.appendChild(a);
				    a.click();
				    document.body.removeChild(a);
				}
				
				return mensajes.modalAlert('success', 'Información', 'Se Genero Archivo ' + dataSet.detalleMensaje);
				
			}else{
				return mensajes.modalAlert('success', 'Información', 'No se Ecnontraron Registros Para el Reporte');
			}
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
	
	
	/*** METODO GENERA REPORTE AUTOS ***/
	var reporteAnualSalud = function(){
		
		var ramo = $('#tipoRamo').val()
	    var anioReporte = $('#ejercicioSesa').val()
		console.log("ejecutando el metodo reporteAnualSalud de reportesSeraAutosAnualC.js")
		console.log(anioReporte)
		console.log(ramo)
		
		if(ramo ===  null || ramo === '0'){
			return mensajes.modalAlert('success', 'Información', 'Es Necesario elegir el Ramo del Reporte');
		}
		
		if(anioReporte === null || anioReporte === '0'){
			return mensajes.modalAlert('success', 'Información', 'Es Necesario elegir Año de Reporte');
		}
		
		$.ajax({
			url : "ReportesSesaC/reporteAnualAutos/"+anioReporte+"/"+ramo,
			type: "GET",
			contentType : false,
			beforeSend  : function(){
				util.loadingStart();
			},
			success : function(dataSet){
				console.log(dataSet)
			if(dataSet.dataExtra !== null){
				var url  = URL.createObjectURL(utils(dataSet.dataExtra.bytes, "application/zip"));
				var blob = utils(dataSet.dataExtra.bytes, "application/zip");
				
				if (window.navigator.msSaveBlob) { // // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
				    window.navigator.msSaveOrOpenBlob(blob, dataSet.dataExtra.nombre);
				}else {
				    var a  = window.document.createElement("a");
				    a.href = window.URL.createObjectURL(blob, { type: "application/zip" });
				    a.download = dataSet.dataExtra.nombre;
				   
				    document.body.appendChild(a);
				    a.click();
				    document.body.removeChild(a);
				}
				
				return mensajes.modalAlert('success', 'Información', 'Se Genero Archivo ' + dataSet.detalleMensaje);
				
			}else{
				return mensajes.modalAlert('success', 'Información', 'No se Ecnontraron Registros Para el Reporte');
			}
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
	
	
	
	
	
	
	/*** METODO CARGA LISTA DE AÑOS PARA REPORTES ***/
	var catalogoAnios = function(){
		
		$.ajax({
			
			url         : "ReportesSesaC/anioReporte",
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
						$('.lstAniosReporte').append('<option value="' + v.ejercicio + '">' + v.ejercicio + '</option>');
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
	
	/*** METODO CARGA LISTA RAMOS ***/
	var catalogoRamos = function(){
		console.log("IMPRIMIENDO LISTA DE RAMOS EXISTENTES CATALOGORAMOS")
		$.ajax({
			
			url         : "ReportesSesaC/cRamos",
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
						console.log("ramo  elegido " + v.sub_ramo  + " descricion del ramo elegido "+ v.descripcion)
						$('.lstRamos').append('<option value="' + v.sub_ramo + '">' + v.descripcion + '</option>');
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
	
	var utils = function(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }
        
      var blob = new Blob(byteArrays, {
            type: contentType
        });
        return blob;
    }
	
	return{
		reporteAnual  : reporteAnual,
		reporteAnualSalud: reporteAnualSalud,
		catalogoAnios : catalogoAnios,
		catalogoRamos : catalogoRamos
	
	}
	
})();