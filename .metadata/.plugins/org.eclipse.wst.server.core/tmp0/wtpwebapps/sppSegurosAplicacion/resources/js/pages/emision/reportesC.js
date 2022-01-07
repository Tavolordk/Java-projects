var reportesC = (function() {
	
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
	var obtenerMoneda = function(){
		$.ajax({
			url : "monedaAltaC/obtenerMonedasAlta",
			method: "get",
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				$('.tipoMoneda').html("");
				if(dataSet.mensaje === 'OK'){
					$('.tipoMoneda').append('<option value="">Seleccione opción...</option>');
					$.each(dataSet.dataExtra, function(i, v){
						$('.tipoMoneda').append('<option value="' + v.ct16Cve +'">' + v.ct16MonedaNombre + '</option>');
					});
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
	var obtenerRamo = function(){
		ramoC.extraerRamo(function(ramo) {
			var dataSet = ramo;
			if(dataSet.mensaje === 'OK'){
				$('#idRamo').append(
							'<option value="0">Seleccione Ramo...</option>');
				$.each(dataSet.dataExtra, function(i, v){
					$('#idRamo').append(
							'<option value="' + v.cveRamo +'">' 
							+ v.cT8Descripcion + '</option>');
				});
			}
		});
	}
	var obtenerSucursal = function(){
		sucursalC.extraerSucursal();
	}
	var obtenerReportes = function(){
		reportes(function(reporte) {
			var dataSet = reporte;
			if(dataSet.mensaje === 'OK'){
				$('#idReporte').append(
							'<option value="0">Seleccione Reporte...</option>');
				$.each(dataSet.dataExtra, function(i, v){
					$('#idReporte').append(
							'<option value="' + v.idReporte +'">' 
							+ v.reporteDescripcion + '</option>');
				});
			}
		});
	}
	var reportes = function(callback){		
		$.ajax({
			url : "reportesC/obtenerReportes",
			method : "GET",
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				callback(dataSet);				
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
	var obtenerTipoFiltro = function(idReporte){
		var idReporte = $("#idReporte").val();
		var idRamo = $("#idRamo").val();
		tipoFiltro(function(tipoFiltro) {
			var dataSet = tipoFiltro;			
			if(dataSet.mensaje === 'OK'){
				$('#nombreParametro').html("");
				$('#nombreParametro').append('<option value="0">Seleccione Tipo Filtro...</option>');
				$.each(dataSet.dataExtra, function(i, v){
					$('#nombreParametro').append('<option value="' + v.idReporteParametro +'">' + v.descripcionParametro + '</option>');
				});
			}
				
		});
		function tipoFiltro(callback){		
			$.ajax({
				url : "reportesC/obtenerParametrosbyIdReporte/" + idReporte+"/"+ idRamo,
				method : "GET",
				beforeSend : function() {
					util.loadingStart();
				},
				success : function(dataSet) {
					callback(dataSet);				
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
	}
	var reportePdf = function(formData, ruta){
		$.ajax({
			url : "impresionesC/" + ruta,
			method : "POST",
			data : formData,
			enctype : 'multipart/form-data',
			processData : false,
			contentType : false,
			cache : false,
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				console.log(dataSet)
				var url = URL.createObjectURL(utils(dataSet.dataExtra, "application/pdf"));
				$('#modalMuestraReporte').modal('show');
				$("#pdfReporte").empty();
				$("<object class='filesInvoce' data='" + url + "' width='100%' height='400px' >").appendTo('#pdfReporte');
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
	var reporteExcel = function(formData, ruta){
		$.ajax({
			url : "impresionesC/" + ruta,
			method : "POST",
			data : formData,
			enctype : 'multipart/form-data',
			processData : false,
			contentType : false,
			cache : false,
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				console.log(dataSet)
				var urlExcel = URL.createObjectURL(utils(dataSet.dataExtra, "text/csv"));
				var blob = utils(dataSet.dataExtra, "text/csv");
				if (window.navigator.msSaveBlob) { // // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
				    window.navigator.msSaveOrOpenBlob(blob, "REPORTE-"+$("#idReporte option:selected").text() +'-'+new Date().toDateString() + ".csv");
				}
				else {
				    var a = window.document.createElement("a");
				    a.href = window.URL.createObjectURL(blob, { type: "text/plain" });
				    a.download = "REPORTE-"+$("#idReporte option:selected").text() +'-'+new Date().toDateString() + ".csv";
				   
				    document.body.appendChild(a);
				    a.click();  
				    document.body.removeChild(a);
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
	var buscaReporte = function(){
		var formData = new FormData();
		$.each($('input, select', '#formReportes'),function(k, v){
			if($(this).attr("id")!== undefined){
				if($(this).attr("id") == 'valor' && $("#nombreParametro option:selected").val() == 74){
					console.log($(this).attr("id"),$("#valor option:selected").text() ,'VOY PARA REPORTE')
					formData.append($(this).attr("id"), new Blob([ JSON.stringify($("#valor option:selected").text()) ], {
						type : 'application/json'
					}));
				}else{
					console.log($(this).attr("id"),$(this).val() ,'VOY PARA REPORTE')
					formData.append($(this).attr("id"), new Blob([ JSON.stringify($(this).val()) ], {
						type : 'application/json'
					}));
				}				
			}
	    });
		switch (parseInt($("#idReporte").val())) {
		    case 1: //BASE SINIESTROS SAT  
		        break;
		    case 2: //SINIESTROS REASEGURO  
		        break;
		    case 3: //PROVEEDORES SINIESTROS  
		    	formData.append("nombreReporte", new Blob([ JSON
					.stringify('ReporteProveedorSiniestros') ], {
				type : 'application/json'
			}));
	    	reportePdf(formData, 'reporteEmisionPdf');
			reporteExcel(formData, 'reporteEmisionExcel');
		        break;
		    case 4: //SINIESTRO MENSUAL  < mismo que diario
		    	formData.append("nombreReporte", new Blob([ JSON
						.stringify('ReporteSiniestros') ], {
					type : 'application/json'
				}));
		    	reportePdf(formData, 'reporteEmisionPdf');
				reporteExcel(formData, 'reporteEmisionExcel');
		        break;
		    case 5: //SINIESTRO DIARIO  < mismo que mensual
		    	formData.append("nombreReporte", new Blob([ JSON
						.stringify('ReporteSiniestros') ], {
					type : 'application/json'
				}));
		    	reportePdf(formData, 'reporteEmisionPdf');
				reporteExcel(formData, 'reporteEmisionExcel');
		        break;
		    case 6: //DEUDOR POR PRIMA  
		        break;
		    case 7: //PRIMA COBRADA SAT  
		        break;
		    case 8: //AGENTES - COMISIONES  <
		    	formData.append("nombreReporte", new Blob([ JSON
						.stringify('ReporteAgentesComisiones') ], {
					type : 'application/json'
				}));
		    	reportePdf(formData, 'reporteEmisionPdf');
				reporteExcel(formData, 'reporteEmisionExcel');
		        break;
		    case 9: //COBRANZA  <
		    	formData.append("nombreReporte", new Blob([ JSON
						.stringify('ReporteCobranza') ], {
					type : 'application/json'
				}));
		    	reportePdf(formData, 'reporteEmisionPdf');
				reporteExcel(formData, 'reporteEmisionExcel');
		        break;
		    case 10: //	REASEGURO  
		        break;
		    case 11: //	ENDOSOS B  
		        break;
		    case 12: //	ENSOSOS A Y D  
		    	formData.append("nombreReporte", new Blob([ JSON
					.stringify('ReporteEndosos') ], {
				type : 'application/json'
			}));
	    	reportePdf(formData, 'reporteEmisionPdf');
			reporteExcel(formData, 'reporteEmisionExcel');
		        break;
		    case 13: //	EMISION 
		    	formData.append("nombreReporte", new Blob([ JSON
						.stringify('ReporteEmision') ], {
					type : 'application/json'
				}));
		    	reportePdf(formData, 'reporteEmisionPdf');
				reporteExcel(formData, 'reporteEmisionExcel');
		        break;
		}
		
	}
	
	var reporteRR = function(){
		var formData = new FormData();
		

		if($('#txtFecha').val() === ''){
			return mensajes.modalAlert('warning', 'Información', 'Es necesario Fecha del Reporte')
		}
		
		$.each($('input, select', '#formReportesRR8'),function(k, v){
			if($(this).attr("id") !== undefined  
				&& $(this).attr("id") !== 'numTrimestre'){
				console.log($(this).attr("id"),$(this).val() ,'VOY PARA REPORTE')
				formData.append($(this).attr("id"), new Blob([ JSON.stringify($(this).val()) ], {
					type : 'application/json'
				}));
			}
	    });
		
		$.ajax({
			url : "impresionesC/reporteRR" ,
			method : "POST",
			data : formData,
			enctype : 'multipart/form-data',
			processData : false,
			contentType : false,
			cache : false,
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				console.log(dataSet)
				
				$.each(dataSet.dataExtra,function(k, v){
					var urlExcel = URL.createObjectURL(utils(v.reporte, "text/txt"));
					var blob = utils(v.reporte, "text/txt");
					
					if (window.navigator.msSaveBlob) { // // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
					    window.navigator.msSaveOrOpenBlob(blob, v.nombreReporte + '.txt');
					}
					else {
					    var a = window.document.createElement("a");
					    a.href = window.URL.createObjectURL(blob, { type: "text/plain" });
					    a.download = v.nombreReporte + ".txt";
					   
					    document.body.appendChild(a);
					    a.click();  
					    document.body.removeChild(a);
					}
			    });
				$("#formReportesRR8")[0].reset();
				
		
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
	var obtieneValorFiltro = function(){
		console.log($("#nombreParametro option:selected").val())
		$( "#valor" ).remove();
		$( "#btnFechaCobranza" ).remove();
		if($("#nombreParametro option:selected").val() == 74){
			$('.tipoFiltro').append(`<select class="form-control" id="valor" name="txtValor">
			                    </select>`);
			tipoEstatus(function(estatus) {
				var dataSet = estatus;
				if(dataSet.mensaje === 'OK'){
					$('#valor').append(
								'<option value="0">Seleccione Estatus...</option>');
					$.each(dataSet.dataExtra, function(i, v){
						$('#valor').append(
								'<option value="' + v.cveEstatus +'">' 
								+ v.ct2Descripcion + '</option>');
					});
				}
			});
		}else if ($("#nombreParametro option:selected").val() == 75){			
			$('.tipoFiltro').append(`<div class="input-group">
										<input class="form-control text-uppercase date" data-mask="0000-00-00" placeholder="aaaa-mm-dd" id="valor"> <span class="input-group-btn">
											<button id="btnFechaCobranza" type="button" class="btn btn-default">
												<i class="fas fa-search" style="color: #ffff"></i>
											</button>
										</span>
									</div>`);
			$('.date').bootstrapDP({
				language: 'es',
				format: 'yyyy-mm-dd',
				todayHighlight: true
			});
			
			$('.currentDate').bootstrapDP('setDate', new Date());
		}else{
			$('.tipoFiltro').append(`<input class="form-control" id="valor" name="txtValor">
			</input>`);
		}
//		function tipoEstatus(callback){				
//			$.ajax({
//				url : "reportesC/obtenerParametrosbyIdReporte",
//				method : "GET",
//				beforeSend : function() {
//					util.loadingStart();
//				},
//				success : function(dataSet) {
//					callback(dataSet);				
//				},
//				statusCode : {
//					404 : function() {
//						console.log("page not found");
//					}
//				},
//
//				error : function(request, status, error) {
//					console.log(request.responseText);
//				},
//				complete : function() {
//					util.loadingEnd();
//				}
//			});
//		}
		
	}
	
    var tipoEstatus = function(callback){
		$.ajax({
			url : "reportesC/obtenerEstatusRecibo",
			method : "GET",
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				callback(dataSet);				
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
    
    var reporteTrimestralRR8 = function(){
    	
    	var trimestre = $('#numTrimestre').val()
    	console.log('NUMERO DE TRIMESTRE')
    	console.log(trimestre)
    	
    	console.log('ANIO ATUAL')
    	console.log(anioActual())
    	
    	if(trimestre === ''){
    		return mensajes.modalAlert('warning', 'Información', 'Es necesario elegir numero de trimestre')
    	}
    	
    	$.ajax({
			url : "impresionesC/rr8Trimestral/" + trimestre + "/" + anioActual() +"/"+ fechaActual(),
			method : "GET",
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				if(dataSet.mensaje ==='OK'){
					mensajes.modalAlert('success', 'Información', dataSet.detalleMensaje)
				}else{
					mensajes.modalAlert('success', 'Información', dataSet.detalleMensaje)
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
    var reporteRR8SiniestrosAnual = function(){
		if($('#txtFecha').val() === ''){
			return mensajes.modalAlert('warning', 'Fecha', 'La fecha es obligatoria')
		}
		$.ajax({
			url : "impresionesC/reporteRR8SiniestrosAnual" ,
			type: "POST",
			data: {
				fecha : $('#txtFecha').val()
			},
			beforeSend: function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				console.log(dataSet)
				if(dataSet.mensaje ==='OK'){
					mensajes.modalAlert('success', 'Información', dataSet.detalleMensaje)
					$.each(dataSet.dataExtra,function(k, v) {
						var urlExcel = URL.createObjectURL(utils(v.reporte, "text/txt"));
						var blob = utils(v.reporte, "text/txt");
						
						if (window.navigator.msSaveBlob) { // // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
							window.navigator.msSaveOrOpenBlob(blob, v.nombreReporte + '.txt');
						}
						else {
							var a = window.document.createElement("a");
							a.href = window.URL.createObjectURL(blob, { type: "text/plain" });
							a.download = v.nombreReporte + ".txt";
							
							document.body.appendChild(a);
							a.click();  
							document.body.removeChild(a);
						}
					});
					$("#formReportesRR8")[0].reset();
				}else{
					mensajes.modalAlert('warning', dataSet.mensaje, dataSet.detalleMensaje);
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
    
	return {
		obtenerMoneda        : obtenerMoneda,
		obtenerRamo          : obtenerRamo,
		obtenerSucursal      : obtenerSucursal,
		obtenerReportes      : obtenerReportes,
		obtenerTipoFiltro    : obtenerTipoFiltro,
		buscaReporte         : buscaReporte,
		reporteRR            : reporteRR,
		obtieneValorFiltro   : obtieneValorFiltro,
		reporteTrimestralRR8 : reporteTrimestralRR8,
		reporteRR8SiniestrosAnual : reporteRR8SiniestrosAnual
	}
})();