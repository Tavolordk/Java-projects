var sesaIncendioC= (function(){
	/*** METODO GENERA REPORTE Incendio***/
	var reporteAnualIncendio = function(){
		
		var ramo = $('#tipoRamo').val()
	    var anio= $('#tipoAnio').val()
		var calcula= $('#tipoDes').val()
		
		console.log(anio)
		console.log(ramo)
		if(ramo ===  null || ramo === '0'){
			return mensajes.modalAlert('success', 'Información', 'Seleccione ramo del reporte');
		}
		
		if(anio === null || anio === '0'){
			return mensajes.modalAlert('success', 'Información', 'Seleccione año de reporte');
		}
		if(calcula === null || calcula === '0'){
			return mensajes.modalAlert('success', 'Información', 'Seleccione tipo de acción');
		}	
		$.ajax({

			url : "ReportesSesaC/reporteAnualIncendio/"+anio+"/"+ramo+"/"+calcula,
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
				
				return mensajes.modalAlert('success', 'Información', 'Se genero archivo ' + dataSet.detalleMensaje);

				
			}else{
				
				return mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
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
				
				if(ramo === 'Incendio'){
					
					mensajes.modalAlert('success', 'Información', 'Generando validaciones para' + ramo);
				
					descargaValidacionSesa();					
				}
				else{
					mensajes.modalAlert('success', 'Información', 'Validaciones aún no definidas' + ramo);
				}

			}
		});
		
	}
	
	
		var descargaValidacionSesa = function(){
		
		var ramo =$('#tipoRamo').val();
	    var anio= $('#tipoAnio').val()
	
		console.log(ramo)
		console.log(anio)
		
		$.ajax({

			url : "ReportesSesaC/validarSesa",
			type: "GET",
			dataType : 'json',
			data : {
					ramo  : ramo ,
					anio : anio
			},
			contentType : 'application/json',
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
				
				return mensajes.modalAlert('success', 'Información', ' ' + dataSet.detalleMensaje);
				//alert('success', 'Información', 'Se Genero Archivo ' + dataSet.detalleMensaje)
			}else{
				return mensajes.modalAlert('success', 'Información', ' ' +dataSet.detalleMensaje);
				//alert('success', 'Información', 'No se Ecnontraron Registros Para el Reporte')
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
	
	
	//******devuelve metodos a carga */
	return{
		reporteAnualIncendio: reporteAnualIncendio,
		descargaValidacionSesa:descargaValidacionSesa
	}
	
})();