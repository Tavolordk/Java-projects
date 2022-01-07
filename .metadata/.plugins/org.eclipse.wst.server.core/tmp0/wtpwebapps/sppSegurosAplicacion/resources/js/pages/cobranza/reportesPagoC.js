var reportesOperacionesC = (function(){
	
	/*** FUNCION PARA MOSTRAR FECHA ACTUAL ***/
	var fechaActual = function(){
		var d = new Date();
		var month = d.getMonth()+1;
		var day = d.getDate();
		
		var fecha = d.getFullYear()
		    + '-' + (month < 10 ? '0' : '') + month
		    + '-' + (day   < 10 ? '0' : '') + day;
		
		return fecha
	}
	
	var fechaActualHrs = function(){
		var d     = new Date();
		var month = d.getMonth() + 1;
		var day   = d.getDate();
		var hora  = d.getHours();
		var min   = d.getMinutes();
	    var seg   = d.getSeconds();
	    	
		var fecha = d.getFullYear() 
		+ (month < 10 ? '0' : '') + month 
		+ (day   < 10 ? '0' : '') + day + hora + min + seg;
		
		return fecha
	}
	
	var reportesPagos = function(){
		var tipoReporte = $('#tipoReporte').val()
		var fecha = $('#txtFechaEmision').val()
		
		if(tipoReporte === null || tipoReporte === ''){
			return mensajes.modalAlert('warning','Informacion', 'Es Necesario Seleccionar Tipo de Reporte');
		}
		
		if(fecha === null || fecha === ''){
			return mensajes.modalAlert('warning','Informacion', 'Es Necesario Seleccionar Fecha de Reporte');
		}
		
	$.ajax({
		url         : "capturaLiquidacionesC/exportarDatosPago/"+ tipoReporte + "/" + fecha,
		type   	    : "POST",
		dataType    : "json",
		contentType : "application/json",
		beforeSend  : function(){
			util.loadingStart();
		},
		success : function(dataSet){

			if(dataSet.mensaje === 'OK'){
				mensajes.modalAlert('success','Informacion',dataSet.detalleMensaje);
			}else{
				mensajes.modalAlert('warning','Informacion',dataSet.detalleMensaje);
			}
				
		},
		complete: function(){
			util.loadingEnd();
		}
		
	}).fail( function( jqXHR, textStatus, errorThrown ) {

		  if (jqXHR.status === 0) {
		    alert('Not connect: Verify Network.');
		  } else if (jqXHR.status == 404) {
		    alert('Requested page not found [404]');
		  } else if (jqXHR.status == 500) {
		    alert('Internal Server Error [500].');
		  } else if (textStatus === 'parsererror') {
		    alert('Requested JSON parse failed.');
		  } else if (textStatus === 'timeout') {
		    alert('Time out error.');
		  } else if (textStatus === 'abort') {
		    alert('Ajax request aborted.');
		  } else {
		    alert('Uncaught Error: ' + jqXHR.responseText);
		  }

		});
	}
	
	/*** REPORTE TRAZABILIDAD DAÑOS Y AP ***/
	var reportesTrazabilidad = function(){
		var tipoReporte = $('#tipoReporte').val()
		var poliza      = $('#numeroPoliza').val()
		var certificado = $('#numeroCertificado').val()
		
		if(tipoReporte === null || tipoReporte === ''){
			return mensajes.modalAlert('warning','Informacion', 'Es Necesario Seleccionar Tipo de Reporte');
		}
		
		if(poliza === null || poliza === ''){
			return mensajes.modalAlert('warning','Informacion', 'Es Necesario Capturar Numero de Poliza');
		}
		
		if(tipoReporte === '5'){
			if(certificado === null || certificado === ''){
				return mensajes.modalAlert('warning','Informacion', 'Es necesario Capturar numero de Certificado');
			}
		}else{
			certificado = 0;
		}
		
		
	$.ajax({
		url         : "capturaLiquidacionesC/trazabilidad/"+ tipoReporte +"/"+ poliza+"/"+certificado,
		type   	    : "GET",
		contentType : false,
		beforeSend  : function(){
			util.loadingStart();
		},
		success : function(dataSet){

			console.log('Respuesta Excel Trazabilidad')
			console.log(dataSet.dataExtra)
			if (dataSet.dataExtra != null) {
				console.log(dataSet)
				var urlExcel = URL.createObjectURL(utils(dataSet.dataExtra, "application/vnd.ms-excel"));
				var blob = utils(dataSet.dataExtra, "application/vnd.ms-excel");
				
				if (window.navigator.msSaveBlob) { 
				    window.navigator.msSaveOrOpenBlob(blob, "Trazabilidad-" + reporte + '-' + poliza + '-' + fechaActualHrs() + ".xlsx");
				} else {
				    var a = window.document.createElement("a");
				    
				    for(var i = 0 ; 8 < poliza.length ; i++){
				    	poliza = '0'.concat(poliza)
				    }
				    
				    a.href = window.URL.createObjectURL(blob, { type: "application/vnd.ms-excel" });
				    a.download = 'Trazabilidad-' + (tipoReporte === '5' ?'Daños' : 'AP') + '-' + poliza + '-' + fechaActualHrs() + ".xlsx";
				   
				    document.body.appendChild(a);
				    a.click();  
				    document.body.removeChild(a);
				}
			}else{
				
				return mensajes.modalAlert('warning','Informacion', 'No hay Datos para el Archivo');
			}
		},
		complete: function(){
			util.loadingEnd();
		}
		
	}).fail( function( jqXHR, textStatus, errorThrown ) {

		  if (jqXHR.status === 0) {
		    alert('Not connect: Verify Network.');
		  } else if (jqXHR.status == 404) {
		    alert('Requested page not found [404]');
		  } else if (jqXHR.status == 500) {
		    alert('Internal Server Error [500].');
		  } else if (textStatus === 'parsererror') {
		    alert('Requested JSON parse failed.');
		  } else if (textStatus === 'timeout') {
		    alert('Time out error.');
		  } else if (textStatus === 'abort') {
		    alert('Ajax request aborted.');
		  } else {
		    alert('Uncaught Error: ' + jqXHR.responseText);
		  }

		});
	}
	
	var llenaTablaTrazabilidad = function(dataSet){
		var tipoReporte = $('#tipoReporte').val()
		var columnas

			if(tipoReporte === '1'){
				columnas = [
				    {title: "Poliza"          , data:"poliza"},
					{title: "Certificado"     , data:"certificado"},
					{title: "Asegurado"       , data:"asegurado"},
					{title: "Cliente"         , data:"cliente"},
					{title: "Recibo"          , data:"recibo"},
					{title: "T. Endoso"       , data:"tipoEndoso"},
					{title: "Estatus"         , data:"estatus"},
					{title: "Siniestro"       , data:"siniestro"},
					{title: "Importe"         , data:"importe_siniestro"},
					{title: "Iva"             , data:"ivaSiniestro"},
					{title: "Fecha Siniestro" , data:"fechaSiniestros"},
					{title: "Movimiento"      , data:"operacionRecibo"},
					{title: "Fecha Operacion" , data:"fechaOperacion"},
					{title: "Descripcion"     , data:"descripcionOperacion"},
				]
			}else if(tipoReporte === '2'){
				columnas = [
				    {title: "Poliza"          , data:"poliza"},
					{title: "Certificado"     , data:"certificado"},
					{title: "Cliente"         , data:"cliente"},
					{title: "Recibo"          , data:"recibo"},
					{title: "T. Endoso"       , data:"tipoEndoso"},
					{title: "Estatus"         , data:"estatus"},
					{title: "Siniestro"       , data:"siniestro"},
					{title: "Importe"         , data:"importe_siniestro"},
					{title: "Iva"             , data:"ivaSiniestro"},
					{title: "Fecha Siniestro" , data:"fechaSiniestros"},
					{title: "Movimiento"      , data:"operacionRecibo"},
					{title: "Fecha Operacion" , data:"fechaOperacion"},
					{title: "Descripcion"     , data:"descripcionOperacion"},
				]
			}
		
		
		
		tabla.iniciarTablaExport("#tableTrazabilidad", dataSet, columnas,'REPORTE_TRAZABILIDAD'+fechaActual());
		$('#lbTrazabilidad').css('display','block');
		$('#idTableTrazabilidad').css('display','block');
		
	}
	
	var muestraTrazablidad = function(){
		$.when(reportesTrazabilidad()).then(function(dataSet){
			console.log('TRAZABILIDAD')
			console.log(dataSet)
			
			if(dataSet.dataExtra !== null){
				llenaTablaTrazabilidad(dataSet.dataExtra)
			}else{
				mensajes.modalAlert('success','Informacion',dataSet.detalleMensaje);
				$('#lbTrazabilidad').css('display','none');
				$('#idTableTrazabilidad').css('display','none');
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
	
	return {
			  reportesPagos        : reportesPagos,
			  muestraTrazablidad   : muestraTrazablidad,
			  reportesTrazabilidad : reportesTrazabilidad
		}
	
})();