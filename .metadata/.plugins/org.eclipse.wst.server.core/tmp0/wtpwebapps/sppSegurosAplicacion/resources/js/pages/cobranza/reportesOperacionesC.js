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
	
	/*** BUSCA REPORTES RELEVANTES ***/
	 var muestraOpRelevantes = function(){
		
		$.when(buscaRelevantes()).then(function(datosReporte){
			
			if(datosReporte !== undefined && datosReporte !== null){
				llenaTablaRelevantes(datosReporte.dataExtra)
			}else if(datosReporte !== undefined){
				mensajes.modalAlert('warning','Informacion',datosReporte.detalleMensaje);
			}
			
		})
	 }
	
     var buscaRelevantes = function(){
    	 
    	return( $.ajax({
 			url         : "capturaLiquidacionesC/operacion/busca/relevante",
 			type   	    : "GET",
 			dataType    : "json",
 			contentType : "application/json",
 			beforeSend  : function(){
 				util.loadingStart();
 			},
 			success : function(dataSet){
 				if(dataSet.mensaje == 'OK'){
 					console.log('datos relevantes')
 					console.log(dataSet.dataExtra)
 					mensajes.modalAlert('success','Informacion',dataSet.detalleMensaje);
 					$('#btnReporteOperaciones').removeAttr('disabled')
 				}else {
 					mensajes.modalAlert('warning','Informacion',dataSet.detalleMensaje);
 					$('#btnReporteOperaciones').attr('disabled')
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

 			}));
    	 
     }
     
     var llenaTablaRelevantes = function(datosReporte){
    	 
    	 nombreArchivo = 'Operaciones Relevantes al ' + fechaActual()
    	 console.log('DATOS PARA TABLA RELEVANTE')
    	 console.log(datosReporte)   
    	 columnas =[
				{title: "Poliza", 	data: "numero_poliza"},
				{title: "Cliente",  data: "cliente" },
				{title: "Recibo",   data: "recibo"},
			];
    	 
    	tabla.iniciarTablaExport("#tableReporteOperaciones", datosReporte, columnas, nombreArchivo,'');
 		$('#idTablerOperaciones').css('display', 'block');
 		$('#lbReporteOperaiones').css('display', 'block');
 		$('#tableReporteOperaciones').css('display', 'block'); 
     }
     
	/*** REPORTE OPERACIONES RELEVANTES ***/
	var reporteRelevanteOperaciones = function(tipoReporte){
	
		$.ajax({
			url         : "capturaLiquidacionesC/operacion/relevante/"+tipoReporte,
			type   	    : "GET",
			dataType    : "json",
			contentType : "application/json",
			beforeSend  : function(){
				util.loadingStart();
			},
			success : function(dataSet){
				if(dataSet.mensaje == 'OK'){
					mensajes.modalAlert('success','Informacion',dataSet.detalleMensaje);
				}else {
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
	
	/*** BUSCA REPORTES RELEVANTES ***/
	var muestraOpInusuales = function(){
		
		$.when(buscaInusuales()).then(function(datosReporte){
			
			if(datosReporte !== undefined && datosReporte !== null){
				llenaTablaInusuales(datosReporte.dataExtra)
			}else if(datosReporte !== undefined){
				mensajes.modalAlert('warning','Informacion',datosReporte.detalleMensaje);
			}
			
		})
	 }
	
    var buscaInusuales = function(){
   	 
   	return( $.ajax({
			url         : "capturaLiquidacionesC/operacion/busca/inusual",
			type   	    : "GET",
			dataType    : "json",
			contentType : "application/json",
			beforeSend  : function(){
				util.loadingStart();
			},
			success : function(dataSet){
				if(dataSet.mensaje == 'OK'){
					console.log('datos relevantes')
					console.log(dataSet.dataExtra)
					mensajes.modalAlert('success','Informacion',dataSet.detalleMensaje);
					$('#btnReporteOperaciones').removeAttr('disabled')
				}else {
					mensajes.modalAlert('warning','Informacion',dataSet.detalleMensaje);
					$('#btnReporteOperaciones').attr('disabled')
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

			}));
   	 
    }
    
    var llenaTablaInusuales = function(datosReporte){
   	 
   	 nombreArchivo = 'Operaciones Inusuales al ' + fechaActual()
   	 console.log('DATOS PARA TABLA Inusuales')
   	 console.log(datosReporte)   
   	 columnas =[
				{title: "Cliente", 	   data: "nombre_cliente"},
				{title: "RFC",         data: "RFC" },
				{title: "Operaciones", data: "numero_operacion"},
				{title: "Monto Max.",  data: "monto_maximo", render : $.fn.dataTable.render.number( ',', '.', 2)},
				{title: "Num. Poliza", data: "poliza"},
				{title: "Ramo",        data: "ramo"},
				{title: "Monto",       data: "monto", render: $.fn.dataTable.render.number( ',', '.', 2)},
				{title: "Num Mov",     data: "num_Mov"},
				{title: "Forma Pago",  data: "forma_pago"},
				{title: "Pago Recibo", data: "pago"},
				
			];
   	 
   	tabla.iniciarTablaExport("#tableReporteOperaciones", datosReporte, columnas, nombreArchivo);
		$('#idTablerOperaciones').css('display', 'block');
		$('#lbReporteOperaiones').css('display', 'block');
		$('#tableReporteOperaciones').css('display', 'block'); 
    }
    
	/*** REPORTE OPERACIONES INUSUALES ***/
	var reporteOperacionesInusuales = function(tipoReporte, numPoliza, razon, ramo, descOperacion){
		
		if(numPoliza === ''){
			return mensajes.modalAlert('warning','Información','Es Necesario Capturar Póliza')
		}else if(ramo === '0'){
			return mensajes.modalAlert('warning','Información','Es Necesario Capturar Ramo')
		} else if(descOperacion === ''){
			return mensajes.modalAlert('warning','Información','Es Necesario Capturar Descripción de la Operación')
		} else if(razon === ''){
			return mensajes.modalAlert('warning','Información','Es Necesario Capturar Razón del Reporte')
		}
	
		$.ajax({
			url         : "capturaLiquidacionesC/operacion/inusual/"+tipoReporte+"/"+numPoliza+"/"+razon+"/"+ramo+"/"+descOperacion,
			type   	    : "GET",
			dataType    : "json",
			contentType : "application/json",
			beforeSend  : function(){
				util.loadingStart();
			},
			success : function(dataSet){
				if(dataSet.mensaje == 'OK'){
					console.log(dataSet.dataExtra)
					mensajes.modalAlert('success','Informacion',dataSet.detalleMensaje);
					$('.clnCampos').val('')
					$('#ramo').val('0')
				}else {
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
	
	/*** METODO PARA BUSCAR POLIZA ***/
	var busquedaPoliza = function(){
		
		var numPoliza = $('#numeroPoliza').val();
		var ramo = $('#ramo').val();
		
		if(numPoliza === ''){
			return mensajes.modalAlert('warning','Informacion','Es Necesario Capturar Poliza');
		}else if(ramo === '0'){
			return mensajes.modalAlert('warning','Informacion','Es Necesario Capturar Ramo');
		}
	
		$.ajax({
			url         : "capturaLiquidacionesC/poliza/"+numPoliza+"/"+ramo,
			type   	    : "GET",
			dataType    : "json",
			contentType : "application/json",
			beforeSend  : function(){
				util.loadingStart();
			},
			success : function(dataSet){
				if(dataSet.mensaje == 'OK'){
					console.log(dataSet.dataExtra)
					var cliente = dataSet.dataExtra.contratante.nombreCliente
					        +" "+ dataSet.dataExtra.contratante.apellidoPaterno
					        +" "+ dataSet.dataExtra.contratante.apellidoMaterno
					             
					$('#cliente').val(cliente)
					$('#numeroPoliza').val(dataSet.dataExtra.numeroPoliza)
				}else {
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
	
	/*** GENERA REPORTE PARA CFDI ***/
	var reporteCFDI = function(){
		
		var tipoReporte = $('#reporte').val()
		var fechaInicio = $('#fechaInicio').val()
		var fechaFin    = $('#fechaFin').val()
		
		if(tipoReporte === ''){
			return mensajes.modalAlert('warning','Informacion','Es necesario Elegir Tipo de CFDI');
		}
		
		if(fechaInicio === ''){
			return mensajes.modalAlert('warning','Informacion','Es necesario Capturar Fecha Inicio');
		}
		
		if(fechaFin === ''){
			return mensajes.modalAlert('warning','Informacion','Es necesario Capturar Fecha Fin');
		}
		
		$.ajax({
			url         : "capturaLiquidacionesC/generaCfdi",
			data        : {tipoReporte : tipoReporte,
						   fechaIncio  : fechaInicio,
				           fechaFin    : fechaFin
				           },
			type   	    : "GET",
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
	
	var muestraTableCFDI = function(datos, tipoReporte){
		var columnasMovimientos = []
	    var nombreArchivo
	    var fechaInicio = $('#fechaInicio').val()
		var fechaFin    = $('#fechaFin').val()
	    
		if(tipoReporte === '1'){
			nombreArchivo = 'CFDI Ingresos al ' + fechaActual()
			columnasMovimientos =[
				{title: "RFC_Cliente", 	       data: "RFC"},
				{title: "Nombre_Razon_Social", data: "NOM_RAZON_SOCIAL" },
				{title: "Forma_Pago",          data: "FORMA_PAGO"},
				{title: "Ramo",                data: "RAMO"},
				{title: "Descripcion", 		   data: "DESCRIPCION"},												
				{title: "Prima_Neta",          data: "PRIMA_NETA"},						
				{title: "Derechos",            data: "DERECHOS"},
				{title: "Recargos",            data: "RECARGO_PAGO_FRACC"},
				{title: "SubTotal",            data: "SUBTOTAL"},
				{title: "IVA",                 data: "IMPUESTO_TOTAL"},
				{title: "Total",               data: "PRIMA_TOTAL"},
				{title: "Poliza",              data: "NUM_POLIZA"},
				{title: "Certificado",         data: "NUM_CERTIFICADO"},
				{title: "Fecha_Certificado",   data: "FECHA_CERTIFICADO"},
				{title: "Estatus",             data: "ESTATUS"},
				{title: "Ov",                  data: "OV"},
			];
			
		}else if(tipoReporte === '2'){
			nombreArchivo = 'CFDI Egresos al ' + fechaActual()
			columnasMovimientos =[
				{title: "RFC_Cliente", 	       data: "RFC"},
				{title: "Nombre_Razon_Social", data: "NOM_RAZON_SOCIAL" },
				{title: "Ramo",                data: "RAMO"},
				{title: "Descripcion", 		   data: "DESCRIPCION"},
				{title: "UUID_CFDI_INGRESO",   data: "UUID_CFDI_INGRESO", defaultContent : ""},
				{title: "Forma_Pago",          data: "FORMA_PAGO"},
				{title: "SubTotal",            data: "SUBTOTAL"},
				{title: "IVA",                 data: "IMPUESTO_TOTAL"},
				{title: "Total",               data: "PRIMA_TOTAL"},
				{title: "Poliza",              data: "NUM_POLIZA"},
				{title: "Certificado",         data: "NUM_CERTIFICADO"},
				{title: "Fecha_Certificado",   data: "FECHA_CERTIFICADO"},
				{title: "Estatus",             data: "ESTATUS"},
				{title: "Ov",                  data: "OV"},
			];
		}else{
			nombreArchivo = 'CFDI Complemento Pago al ' + fechaActual()
			columnasMovimientos =[
				{title: "RFC_Cliente", 	       data: "RFC"},
				{title: "Nombre_Razon_Social", data: "NOM_RAZON_SOCIAL" },
				{title: "Ramo",                data: "RAMO"},
				{title: "Descripcion", 		   data: "DESCRIPCION"},
				{title: "UUID_CFDI_INGRESO",   data: "UUID_CFDI_INGRESO", defaultContent : ""},
				{title: "Forma_Pago",          data: "FORMA_PAGO"},
				{title: "SubTotal",            data: "SUBTOTAL"},
				{title: "IVA",                 data: "IMPUESTO_TOTAL"},
				{title: "Total",               data: "PRIMA_TOTAL"},
				{title: "Poliza",              data: "NUM_POLIZA"},
				{title: "Certificado",         data: "NUM_CERTIFICADO"},
				{title: "Fecha_Certificado",   data: "FECHA_CERTIFICADO"},
				{title: "Fecha_Pago",          data: "FECHA_PAGO"},
				{title: "Estatus",             data: "ESTATUS"},
				{title: "Ov",                  data: "OV"},
			];
		}

		tabla.iniciarTablaExport("#tableReporteCFDI", datos, columnasMovimientos, nombreArchivo,'Periodo de ' + fechaInicio +' al ' + fechaFin);
		$('#idTableReporteCFDI').css('display', 'block');
		$('#lbReporteCFDI').css('display', 'block');
		$('#tableReporteCFDI').css('display', 'block'); 
	}
	
	return {
		  reporteRelevanteOperaciones : reporteRelevanteOperaciones,
		  reporteOperacionesInusuales : reporteOperacionesInusuales,
		  busquedaPoliza              : busquedaPoliza,
		  reporteCFDI                 : reporteCFDI,
		  muestraOpRelevantes         : muestraOpRelevantes,
		  muestraOpInusuales          : muestraOpInusuales
		}
	
})();