var reportesC = (function () {
	
	var rr6trimeGenerar = function() {
		var $fecha = $('#fecha').val();
		
		if($fecha === '') {
			return mensajes.modalAlert('warning', 'Información', 'Es necesario indicar fecha');
		}
		$.ajax({
			url: "rr6trime/generar",
			type: "POST",
			data: {
				anio : $fecha,
				trimestre : $('#trimestre').val()
			},
			xhrFields: {
	            responseType: 'blob'
	        },
			beforeSend: function() {
				util.loadingStart();
			},
			success: function (dataSet, textStatus, jqXHR ) {
				if(jqXHR.getResponseHeader('generado') === "OK"){
					var a = document.createElement('a');
					var url = window.URL.createObjectURL(dataSet);
					a.href = url;
			        a.download = 'rr6_trime.zip';
			        document.body.append(a);
			        a.click();
			        a.remove();
			        window.URL.revokeObjectURL(url);
			        
					mensajes.modalAlert('success', 'Información', 'RR6TRIME generados correctamente');
				}else{
					mensajes.modalAlert('warning', 'Información', 'Error en la descarga');
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var rr6trimdGenerar = function() {
		var $fecha = $('#fecha').val();
	
		if($fecha === ''){
			return mensajes.modalAlert('warning', 'Información', 'Es necesario indicar fecha');
		}
		$.ajax({
			url: "rr6trimd/generar",
			type: "POST",
			data: {
				anio : $fecha,
				trimestre : $('#trimestre').val()
			},
			xhrFields: {
	            responseType: 'blob'
	        },
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet, textStatus, jqXHR) {console.log(dataSet);
				
				if(jqXHR.getResponseHeader('generado') === "OK"){
					var a = document.createElement('a');
					var url = window.URL.createObjectURL(dataSet);
					a.href = url;
					a.download = jqXHR.getResponseHeader('nombreArchivo');
			        document.body.append(a);
			        a.click();
			        a.remove();
			        window.URL.revokeObjectURL(url);
			        
					mensajes.modalAlert('success', 'Información', 'RR6TRIMD generados correctamente');
					 $('#fecha').val("");
				}else{
					mensajes.modalAlert('warning', 'Información', 'Error en la descarga');
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var btnCalcularProp = function() {
		var idContrato = $('#contratos').val();
		
		var fechaDe = $('#fechaDe').val();
		var fechaHasta = $('#fechaHasta').val();
	
		if(fechaDe === '' || fechaHasta === '') {
			return mensajes.modalAlert('danger', 'Información', 'Todos los campos son obligatorios');
		}
		
		$.ajax({
			url: "porporcional/generar",
			type: "POST",
			data: {
				de : fechaDe,
				hasta : fechaHasta,
				idContrato : idContrato
			},
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				console.log(dataSet);
				var columnas = [];
				columnas.push({ title: "Agrupador", data: "nombreAgrupador" });
				columnas.push({ title: "Contratante", data: "nombreContratante" });
				columnas.push({ title: "Poliza", data: "numeroPoliza" });
				columnas.push({ title: "Asegurado", data: "nombreAsegurado" });
				columnas.push({ title: "Cobertura", data: "nombreCobertura" });
				columnas.push({ title: "Suma asegurada", data: "sumaAsegurada", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) });
				columnas.push({ title: "Prima de Riesgo", data: "primaRiesgo", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) });
				columnas.push({ title: "Fecha de ocurrido del siniestro", data: "fechaSinOcurrido" });
				columnas.push({ title: "Siniestros ocurridos", data: "siniestrosOcurridos", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) });
				columnas.push({ title: "Siniestros pagados", data: "siniestrosPagados", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) });
				columnas.push({ title: "Siniestros pendientes", data: "siniestrosPendientes", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) });
				columnas.push({ title: "Prima cedida", data: "primaCedida", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) });
				columnas.push({ title: "Comsión reaseguro", data: "comisionReaseguro", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) });
				columnas.push({ title: "Corretaje", data: "corretaje", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) });
				columnas.push({ title: "Siniestros recuperados", data: "siniestrosRecuperados", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) });
				columnas.push({ title: "Siniestros ocurridos recuperados", data: "siniestrosOcurridosRecuperados", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) });
				columnas.push({ title: "PTU", data: "ptu", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) });
				
				tabla.iniciarTablaNoHeaderNoOrderExporToExcel('#resultadoBusqueda', dataSet.dataExtra, columnas, 'PrimasProporcional'+$("#contratos option:selected").text()+util.fechaActual(), 'Periodo de ' + fechaDe +' al ' + fechaHasta);
				$('.background-tabla').css('display', 'block');
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var btnCalcularNoProp = function() {
		var idContrato = $('#contratosNP').val();
		var fechaDe = $('#fechaDe').val();
		var fechaHasta = $('#fechaHasta').val();
	
		if(fechaDe === '' || fechaHasta === '') {
			return mensajes.modalAlert('danger', 'Información', 'Todos los campos son obligatorios');
		}
		$.ajax({
			url: "noporporcional/generar",
			type: "POST",
			data: {
				de : fechaDe,
				hasta : fechaHasta,
				idContrato : idContrato
			},
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {console.log("eduardo", dataSet);
				if (dataSet.mensaje === 'OK') {
					$.each( dataSet.dataExtra, function(k, v) {

						if(k === "primasRetenidas" && v === null){
							$('#' + k).val("N/A");
						}else{
							$('#' + k + ':text').val(v);
						}
						
					});
					if(dataSet.dataExtra.primaAjustada > 0) {
						$('#btnContabilidadNoP').attr('disabled', false);
					}
				} else {
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var btnContabilidadNoP = function() {
		var idContrato = $('#contratosNP').val();
		var primaAjustada = $('#primaAjustada').inputmask('unmaskedvalue');
	
		$.ajax({
			url: util.getPath()+"/contabilidad/generar/noproporcional",
			type: "POST",
			data: {
				idContrato : idContrato,
				importe : primaAjustada
			},
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {console.log(dataSet);
				if (dataSet.mensaje === 'OK') {
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
				} else {
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var btnContabilidadP = function() {
		var idContrato = $('#contratos').val();
		var fechaDe = $('#fechaDe').val();
		var fechaHasta = $('#fechaHasta').val();
		$.ajax({
			url: util.getPath()+"/contabilidad/generar/proporcional",
			type: "POST",
			data: {
				de : fechaDe,
				hasta : fechaHasta,
				idContrato : idContrato
			},
			xhrFields: {
	            responseType: 'blob'
	        },
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet, textStatus, jqXHR) {console.log(dataSet);
			if(jqXHR.getResponseHeader('generado') === "OK"){
				var a = document.createElement('a');
				var url = window.URL.createObjectURL(dataSet);
				a.href = url;
		        a.download = jqXHR.getResponseHeader('nombreArchivo');
		        document.body.append(a);
		        a.click();
		        a.remove();
		        window.URL.revokeObjectURL(url);
		        
				mensajes.modalAlert('success', 'Información', 'Contabilidad generada');
			}else{
				mensajes.modalAlert('warning', 'Información', 'Error en la descarga');
			}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var btnBorderoSin = function() {
		//tablaMuestra();
		var fechaDe = $('#fechaDe').val();
		var fechaHasta = $('#fechaHasta').val();
		var ramo = $('#contratosSiniestros').val();
	
		if(fechaDe === '' || fechaHasta === '') {
			return mensajes.modalAlert('danger', 'Información', 'Todos los campos son obligatorios');
		}
		$.ajax({
			url: "siniestros/generar",
			type: "POST",
			data: {
				de : fechaDe,
				ramo : ramo,
				hasta : fechaHasta
			},
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {console.log(dataSet);
				if (dataSet.mensaje === 'OK') {
						dataSet.dataExtra[0] = {
								asegurado: "JOEL MORENA", 
								certificado: "1", 
								comisionCedida: 0, 
								comisionDirecta: 0, 
								comisionRetenida: 0, 
								fechaSiniestro: "2030-07-02", 
								fechaRegistro: "2030-07-02", 
								numSiniestro: 1, 
								causaSiniestro: "Desconocida",
								cobertura: "Total",
								estatusSin: "Verificando",
								saldoInicial: 0,
								sa: 50000,
								ajustesPositivos: 0,
								ajustesNegativos: 0,
								pagoTotal: 30000,
								idRamo: "EXTENSION_10", 
								nombreAgrupador: "", 
								nombreContratante: "OCTAVIO ANTONIO", 
								poliza: "00000031", 
								nombreContrato: "PRUEBA", 
								ramo: "SEGURO DE DAÑOS", 
								saldoActual: 10000,
								recuperacion: ""
						};
						dataSet.dataExtra[1] = {
								asegurado: "MARIO MORENA", 
								certificado: "1", 
								comisionCedida: 0, 
								comisionDirecta: 0, 
								comisionRetenida: 0, 
								fechaSiniestro: "2030-07-02", 
								fechaRegistro: "2030-07-02", 
								numSiniestro: 1, 
								causaSiniestro: "Robo",
								cobertura: "Total condicionada",
								estatusSin: "Aprobado",
								saldoInicial: 0,
								sa: 40000,
								ajustesPositivos: 0,
								ajustesNegativos: 10,
								pagoTotal: 35000,
								idRamo: "EXTENSION_10", 
								nombreAgrupador: "", 
								nombreContratante: "OCTAVIO ANTONIO", 
								poliza: "00000032", 
								nombreContrato: "PRUEBA 2", 
								ramo: "SEGURO DE DAÑOS", 
								saldoActual: 0,
								recuperacion: "Ninguna"
						};
						dataSet.dataExtra[2] = {
								asegurado: "JACINTO RAMIREZ", 
								certificado: "1", 
								comisionCedida: 0, 
								comisionDirecta: 0, 
								comisionRetenida: 0, 
								fechaSiniestro: "2020-07-02", 
								fechaRegistro: "2020-07-02", 
								numSiniestro: 1, 
								causaSiniestro: "Accidente",
								cobertura: "Condicionada",
								estatusSin: "Pagado",
								saldoInicial: 1000,
								sa: 27000,
								ajustesPositivos: 10,
								ajustesNegativos: 0,
								pagoTotal: 15000,
								idRamo: "EXTENSION_10", 
								nombreAgrupador: "", 
								nombreContratante: "OCTAVIO ANTONIO", 
								poliza: "00000025", 
								nombreContrato: "PRUEBA 3", 
								ramo: "SEGURO DE DAÑOS", 
								saldoActual: 500,
								recuperacion: ""
						};
						var columnas = [
							{ title: "Ramo", data: "ramo" },
							{ title: "Agrupador", data: "nombreAgrupador" },
							{ title: "Contratante", data: "nombreContratante" },
							{ title: "Num. Póliza", data: "poliza" },
							{ title: "Asegurado", data: "asegurado" },
							{ title: "Contrato", data: "nombreContrato" },
							{ title: "Fec. Siniestro", data: "fechaSiniestro" },
							{ title: "Fec. Registro", data: "fechaRegistro" },
							{ title: "Siniestro", data: "numSiniestro" },
							{ title: "Causa Siniestro", data: "causaSiniestro" },
							{ title: "Descripción Cobertura", data: "cobertura" },
							{ title: "Estatus al corte", data: "estatusSin" },
							{ title: "Saldo Inicial", data: "saldoInicial", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
							{ title: "Suma aseg.", data: "sa", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
							{ title: "Ajustes (+)", data: "ajustesPositivos", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
							{ title: "Ajustes (-)", data: "ajustesNegativos", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
							{ title: "Pago Total", data: "pagoTotal", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
							{ title: "Saldo Actual", data: "saldoActual", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
							{ title: "Recuperación", data: null, render: function( data ){
								console.log("dataSEt", data);
								if(data.tipoContratoReaseguro === "NO PROPORCIONAL"){
									return "N/A";
								}else{
									return $.fn.dataTable.render.number( ',', '.', 2, '$' ).display(data.recuperacion);
								}
							} },
						];
						
					tabla.iniciarTablaNoHeaderNoOrderExporToExcel("#resultadoBusqueda", dataSet.dataExtra, columnas, "SiniestrosBordero"+util.fechaActual(), 'Periodo de ' + fechaDe +' al ' + fechaHasta);
					$('.background-tabla').css('display', 'block');
				} else {
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
					$("#resultadoBusqueda").DataTable().destroy();
					$('.background-tabla').css('display', 'none');
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
		});/**/
	}
	
	var btnBorderoPrimas = function() {
		var fechaDe = $('#fechaDe').val();
		var fechaHasta = $('#fechaHasta').val();
		var idContrato = $('#contratosBordereauxPrimas').val();
	
		if(fechaDe === '' || fechaHasta === '') {
			return mensajes.modalAlert('danger', 'Información', 'Todos los campos son obligatorios');
		}
		$.ajax({
			url: "primas/generar",
			type: "POST",
			data: {
				de : fechaDe,
				hasta : fechaHasta,
				idContrato : idContrato
			},
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				console.log(dataSet);
					var columnas = [];
					columnas.push({ title: "Ramo", data: "ramo" });
					columnas.push({ title: "Producto", data: "idRamo" });
					columnas.push({ title: "Agrupador", data: "nombreAgrupador" });
					columnas.push({ title: "Contratante", data: "nombreContratante" });
					columnas.push({ title: "Num. Póliza", data: "poliza" });
					columnas.push({ title: "Contrato", data: "nombreContrato" });
					columnas.push({ title: "Certificado", data: "certificado" });
					columnas.push({ title: "inivig", data: "inivig" });
					columnas.push({ title: "finvig", data: "finvig" });
					columnas.push({ title: "asegurado", data: "asegurado" });
					columnas.push({ title: "Cobertura ", data: "nombreCobertura" });
					columnas.push({ title: "SA directa", data: "sumaDirecta", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) });
					columnas.push({ title: "SA cedida", data: "sumaCedida", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) });
					columnas.push({ title: "SA retenida", data: "sumaRetenida", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) });
					columnas.push({ title: "Prima directa", data: "primaDirecta", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) });
					columnas.push({ title: "Prima cedida", data: "primaCedida", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) });
					columnas.push({ title: "Prima retenida", data: "primaRetenida", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) });
					//columnas.push({ title: "Com directa", data: "comisionDirecta", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) });
					columnas.push({ title: "Com ced", data: "comisionCedida", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) });
					columnas.push({ title: "Com ret", data: "comisionRetenida", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) });
					
					var $dataExtraSize = dataSet.dataExtra.length;
					console.log("$dataExtraSize", $dataExtraSize);
					tabla.iniciarTablaNoHeaderNoOrderExporToExcel("#resultadoBusqueda", dataSet.dataExtra.splice(0, ($dataExtraSize - 1)), columnas, "PrimasBordero"+$("#contratos option:selected").text()+util.fechaActual(), 'Periodo de ' + fechaDe +' al ' + fechaHasta);
					$('.background-tabla').css('display', 'block');
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var tablaMuestra = function(){
		var tabla = '<table id="resultadoBusqueda" class="table table-sm table-hover table-bordered estiloTablas"><thead><tr role="row"><th class="sorting_disabled" rowspan="1" colspan="1" style="width: 37.4px;">Ramo</th><th class="sorting_disabled" rowspan="1" colspan="1" style="width: 59px;">Producto</th><th class="sorting_disabled" rowspan="1" colspan="1" style="width: 70.2px;">Agrupador</th><th class="sorting_disabled" rowspan="1" colspan="1" style="width: 76.6px;">Contratante</th><th class="sorting_disabled" rowspan="1" colspan="1" style="width: 38.2px;">Num. Póliza</th><th class="sorting_disabled" rowspan="1" colspan="1" style="width: 57.4px;">Contrato</th><th class="sorting_disabled" rowspan="1" colspan="1" style="width: 71px;">Certificado</th><th class="sorting_disabled" rowspan="1" colspan="1" style="width: 35.8px;">inivig</th><th class="sorting_disabled" rowspan="1" colspan="1" style="width: 37.4px;">finvig</th><th class="sorting_disabled" rowspan="1" colspan="1" style="width: 67px;">asegurado</th><th class="sorting_disabled" rowspan="1" colspan="1" style="width: 65.4px;">Cobertura </th><th class="sorting_disabled" rowspan="1" colspan="1" style="width: 44.6px;">SA directa</th><th class="sorting_disabled" rowspan="1" colspan="1" style="width: 42.2px;">SA cedida</th><th class="sorting_disabled" rowspan="1" colspan="1" style="width: 53.4px;">SA retenida</th><th class="sorting_disabled" rowspan="1" colspan="1" style="width: 44.6px;">Prima directa</th><th class="sorting_disabled" rowspan="1" colspan="1" style="width: 42.2px;">Prima cedida</th><th class="sorting_disabled" rowspan="1" colspan="1" style="width: 53.4px;">Prima retenida</th><th class="sorting_disabled" rowspan="1" colspan="1" style="width: 29.4px;">Com ced</th><th class="sorting_disabled" rowspan="1" colspan="1" style="width: 29.6px;">Com ret</th></tr></thead><tbody><tr class="odd"><td valign="top" colspan="19" class="dataTables_empty">No data available in table</td></tr></tbody></table>';
		document.getElementById("tablaEjemplo").innerHTML = tabla;
		document.getElementById("btnExportar").style.display = "inline";
	}
	
	var cargaContratosProporcionlesCuotaParte = function() {
		$.ajax({
			url : "obtener/contratos/proporcionales/cuotaparte",
			method : "get",
			dataType : 'json',
			contentType : 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				if (dataSet.mensaje === 'OK') {
					$.each(dataSet.dataExtra, function(i, v) {
						$('#contratos').append('<option value="' + v.id +'">' + v.nombreContrato + '</option>');
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
	
	var cargaContratosProporcionles = function() {
		$.ajax({
			url : "obtener/contratos/bordereauxPrimas",
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
	
	var cargaContratosNoProporcionles = function() {
		$.ajax({
			url : "obtener/contratos/noproporcionales",
			method : "get",
			dataType : 'json',
			contentType : 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				if (dataSet.mensaje === 'OK') {
					$.each(dataSet.dataExtra, function(i, v) {
						$('#contratosNP').append('<option value="' + v.id +'">' + v.nombreContrato + '</option>');
					});
				} else {
					mensajes.modalAlert('danger', 'No hay contratos.', 'Primero capture un contrato No proporcional.');
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
	
	var generarRR6Anual = function() {
		var $fecha = $('#fecha').val();
		
		if($fecha === '') {
			return mensajes.modalAlert('warning', 'Información', 'Es necesario indicar año');
		}
		$.ajax({
			url: "generarAnual",
			type: "GET",
			data: {
				ejercicio : $fecha,
			},
			beforeSend: function() {
				util.loadingStart();
			},
			xhrFields: {
	            responseType: 'blob'
	        },
			success: function (dataSet, textStatus, jqXHR ) {
			if(jqXHR.getResponseHeader('generado') === "OK"){
				var a = document.createElement('a');
				var url = window.URL.createObjectURL(dataSet);
				a.href = url;
		        a.download = jqXHR.getResponseHeader('nombreArchivo');
		        document.body.append(a);
		        a.click();
		        a.remove();
		        window.URL.revokeObjectURL(url);
		        
				mensajes.modalAlert('success', 'Información', 'RR6 Anual generado correctamente');
			}else{
				mensajes.modalAlert('warning', 'Información', 'Error en la descarga');
			}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var cargaContratosBordereauxPrimas = function() {
		$.ajax({
			url : "obtener/contratos/bordereauxPrimas",
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
							$('#contratosBordereauxPrimas').append('<option value="' + v.id +'">' + v.nombreContrato + '</option>');
						}
					});
				} else {
					mensajes.modalAlert('danger', 'No hay contratos.', 'Primero capture un contrato.');
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
	};
	
	var cargaContratosBordereauxSiniestros = function() {
		$.ajax({
			url : "obtener/contratos/bordereauxPrimas",
			method : "get",
			dataType : 'json',
			contentType : 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				if (dataSet.mensaje === 'OK') {
					$('#contratosSiniestros').html('');
					$.each(dataSet.dataExtra, function(i, v) {
						$('#contratosSiniestros').append('<option value="' + v.id +'">' + v.nombreContrato + '</option>');
					});
				} else {
					mensajes.modalAlert('danger', 'No hay contratos.', 'Primero capture un contrato.');
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
		rr6trimeGenerar : rr6trimeGenerar,
		rr6trimdGenerar : rr6trimdGenerar,
		btnCalcularProp : btnCalcularProp,
		btnCalcularNoProp : btnCalcularNoProp,
		btnContabilidadNoP : btnContabilidadNoP,
		btnContabilidadP : btnContabilidadP,
		btnBorderoSin : btnBorderoSin,
		btnBorderoPrimas : btnBorderoPrimas,
		cargaContratosProporcionlesCuotaParte : cargaContratosProporcionlesCuotaParte,
		cargaContratosNoProporcionles : cargaContratosNoProporcionles,
		cargaContratosProporcionles : cargaContratosProporcionles,
		generarRR6Anual : generarRR6Anual,
		cargaContratosBordereauxPrimas : cargaContratosBordereauxPrimas,
		cargaContratosBordereauxSiniestros : cargaContratosBordereauxSiniestros
	}
})();