var recibosC = (function(){
	
	/*** FUNCION PARA TRUNCAR TEXTO EN CELDAS DE DATA TABLE***/
	var cellTruncaTex = function(cutoff){
		$.fn.dataTable.render.ellipsis = function ( cutoff ) {
		    return function ( data, type, row ) {
		        return type === 'display' && data.length > cutoff ?
		            data.substr( 0, cutoff ) +'…' :
		            data;
		    }
		};
	}
	
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
	/***********************************************************/
	/**** METODOS PARA OBTENER LISTA DE RECIBOS PENDIENTES *****/
	/***********************************************************/
	var muestraRecibosPendientes = function(){
		
		$.when(recibosPendientes()).then(function(listaRecibo){
			
			if(listaRecibo !== undefined && listaRecibo.dataExtra !== null){
				llenaTablaRecibos(listaRecibo)
			}else if (listaRecibo !== undefined){
				mensajes.modalAlert('warning','Informacion',listaRecibo.detalleMensaje);
				$('#lbRecibosPendientes').css('display','none');
				$('#idTablePrimasDeposito').css('display','none');
			}
			
		})
		
	}
	
	/**** METODOS PARA OBTENER LISTA DE RECIBOS PENDIENTES *****/
	var recibosPendientes = function(){
		
		var tipoReporte = $('#tipoReporte').val()
		var fechaReporteFin = $('#txtFechaFin').val()
		
		if(tipoReporte === ''){
			return mensajes.modalAlert('warning','Informacion','Es Necesario Elegir Tipo Reporte');
		}
		
		if(fechaReporteFin === ''){
			return mensajes.modalAlert('warning','Informacion','Es Necesario Elegir Fecha Fin del Reporte');
		}
		
//		if(tipoReporte !== '2'){
//			fechaReporteFin = fechaActual()
//		}
		
	return($.ajax({
			url         : "capturaLiquidacionesC/recibos/pendientes/"+tipoReporte+"/"+fechaReporteFin,
			type        : "GET",
			dataType    : 'json',
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){
				console.log('LISA DE RECIBOS')
				console.log(dataSet.dataExtra)
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
		}));
		
	}
	
	/**** METODOS PARA LLENA DATA TABLE CON LISTA DE RECIBOS PENDIENTES *****/
	var llenaTablaRecibos = function(listaRecibo){
		console.log('LLENA TABLA RECIBOS')
		console.log(listaRecibo.dataExtra)
		
		var tipoReporte = $('#tipoReporte').val()
		var fechaReporte = $('#txtFechaFin').val()
		console.log('Fecha Reporte Retroactivo')
		console.log(fechaReporte)
		
		if(listaRecibo.dataExtra.length > 0){
		var columnas = [
				
				{title: "Cliente",             data:"clienteBean",render: function ( data, type, row, meta ) {
													 if(data.nombreCliente.length > 0){
														 return data.nombreCliente 
														        + " " + data.apellidoPaterno 
																+ " " + data.apellidoMaterno;
													 }else{
														 return data.denominacion
													 }
											   }
				},
				{title: "Poliza",      		   data:"polizaBean.numeroPoliza"},
				{title: "Num.Credito",    	   data: null, render: function ( data, type, row, meta ) {
														 if(data.certificadoBean != null ){
															 return data.certificadoBean.numeroCredito;
														 }else{
															 return data.numCreditAP
														 }
			   }},
				{title: "Ramo", 			   data:"ramoBean.cT8Descripcion"},
				{title: "Ramo Contable",	   data:"ramoBean.claveContable"},
				{title: "Endoso",    		   data:"endoso"},
				{title: "T.Endoso", 		   data:"tipoEndoso"},
				{title: "Sucursal",     	   data:"sucursalBean.ct19Descripcion"},
				{title: "Num.Recibo",    	   data:"recibo"},
				{title: "Prducto",             data:"polizaBean.producto.nombre"},
				{title: "Certificado", 		   data:"endoso"},
				{title: "Cve Agente",		   data:"polizaBean.agente1.cveAgente"},
				{title: "Nom Agente",		   data:"polizaBean.agente1.nombre"},
				{title: "Tipo Agente",		   data:"polizaBean.agente1.fisicaMoral", defaultContent:""},
				{title: "Estatus",             data:"estatusRecibo.ct2Descripcion"},
				{title: "Fecha Estatus",       data:"fechaEstatus"},
				{title: "Emision",             data:"fechaEmision"},
				{title: "Inicio Vigencia",     data:"inicioVigencia"},
				{title: "Fin Vigencia",        data:"finVigencia"},
				{title: "Moneda",   	       data:"monedaBean.ct16MonedaNombre"},
				{title: "Comision Agente",     data:"comisionagente1", render: $.fn.dataTable.render.number( ',', '.', 2 ),
																		function (data, type, row) {
																			return  type === 'export' ? data.replace( /[$,]/g, '' ) : data;
														               }, 
				},
				{title: "OV",				   data:"polizaBean.cuv.idOrdenVerificacion", defaultContent:""},
				{title: "CUV",				   data:"certificadoBean.cuv", defaultContent:""},
				{title: "Prima Neta",          data:"primaNeta", render: $.fn.dataTable.render.number( ',', '.', 2 ),
																		function (data, type, row) {
																			return  type === 'export' ? data.replace( /[$,]/g, '' ) : data;
																			 
														               },
				},
				{title: "Recargo Pago Fracc",  data:"recargoPagoFracc",render: $.fn.dataTable.render.number( ',', '.', 2 ),
																	   function (data, type, row) {
																			return  type === 'export' ? data.replace( /[$,]/g, '' ) : data;
														               },
				},
				{title: "Derecho Poliza",      data:"derechoPoliza", render: $.fn.dataTable.render.number( ',', '.', 2),
																	   function (data, type, row) {
																			return  type === 'export' ? data.replace( /[$,]/g, '' ) : data;
														               },
				},
				{title: "IVA",                 data:"impuestoTotal", render: $.fn.dataTable.render.number( ',', '.', 2 ),
																		function (data, type, row) {
																			return  type === 'export' ? data.replace( /[$,]/g, '' ) : data;
														               },
				},
				{title: "Prima Total",         data:"primaTotal", render: $.fn.dataTable.render.number( ',', '.', 2 ),
																        function (data, type, row) {
																			return  type === 'export' ? data.replace( /[$,]/g, '' ) : data ;
														               },
				},

				];
		
			var archivoPeriodo = (tipoReporte !== '1' ? 'Periodo al ' + fechaReporte : 'Periodo al ' + fechaActual())
			var archivo = (tipoReporte !== '3' ? 'Reporte Deudor Por Prima ' : 'Reporte Acreedor Polizas Canceladas ')
			
			tabla.iniciarTablaExport("#tableRecibosPendientes", listaRecibo.dataExtra, columnas, archivo + fechaReporte, archivoPeriodo);
			$('#lbRecibosPendientes').css('display','block');
			$('#idTablePrimasDeposito').css('display','block');
		}else{
			$('#lbRecibosPendientes').css('display','none');
			$('#idTablePrimasDeposito').css('display','none');
		}
		
	}
	
	/***********************************************************/
	/**** METODOS PARA OBTENER LISTA DE RECIBOS POR POLIZA *****/
	/***********************************************************/
	
	/**** METODOS PARA MOSTRAR RECIBOS POR POLIZA *****/
	var muestraRecibosPoliza = function(){
		
		$.when(obtieneRecibosPoliza()).then(function(listaRecibo){
			
			if(listaRecibo.mensaje === 'OK') {
				llenaRecibosPoliza(listaRecibo)
			}else{
				mensajes.modalAlert('warning','Informacion',listaRecibo.detalleMensaje);
			}
		})
	}
	
	/**** METODOS PARA OBTENER LISTA DE RECIBOS POR POLIZA *****/
	var obtieneRecibosPoliza = function(){
		
		var numPoliza = $('#numeroPoliza').val();
		var ramo = $('#ramo option:selected').text()
		
		console.log('RAMO SELECCIONADO')
		console.log(ramo)
		
		if(numPoliza === ''){
			mensajes.modalAlert('warning','Informacion','Es Obligatorio Capturar Número de Póliza');
			return null
		}
		console.log('POLIZA A BUSCAR')
		console.log(numPoliza)
		
		return($.ajax({
			
			url         : "capturaLiquidacionesC/recibos/buscar",
			type        : "GET",
			data        : {numPoliza : numPoliza,
						   ramo      : ramo					
						  },
			dataType    : 'json',
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){
				console.log('MENSAJE DE RECIBOS POLIZA')
				console.log(dataSet.mensaje)
				if(dataSet.mensaje !== 'OK'){
					mensajes.modalAlert('warning','Informacion',dataSet.detalleMensaje);
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
			
		}));
	}
	
	/**** METODOS PARA LLENAR DATA TABLE CON RECIBOS DE LA POLIZA ****/
	var llenaRecibosPoliza = function(listaRecibo){
		console.log('LLENA TABLA RECIBOS POR POLIZA')
		console.log(listaRecibo.dataExtra)
		
		var btnDetalleRecibo = "btnDetalleRecibo";
		var btnDetalleAgente = "btnDetalleAgente";
		
		if(listaRecibo.dataExtra !== null && listaRecibo.dataExtra.length > 0){
			var dato = listaRecibo.dataExtra[0]
			
			var cliente = dato.clienteBean.nombreCliente !== '' ? dato.clienteBean.nombreCliente 
					   +" "+ dato.clienteBean.apellidoPaterno +" "+ dato.clienteBean.apellidoMaterno : dato.clienteBean.denominacion

			$('#clienteGral').val(cliente)
			var columnas = [

					{title: "Poliza",      		   data:"polizaBean.numeroPoliza"},
					{title: "Num.Credito",    	   data: null, render: function(data,type, full){
														 if(data.certificadoBean != null ){
															 return data.certificadoBean.numeroCredito;
														 }else{
															 return data.numCreditAP
														 }
												   }
					},
					{title: "Endoso",        	   data:"endoso"},
					{title: "Recibo",    		   data:"recibo"},
					{title: "T.Endoso", 		   data:"tipoEndoso"},
					{title: "Fec. Inicio",    	   data:"inicioVigencia"},
					{title: "Fec. Termino",    	   data:"finVigencia"},
					{title: "Prima Total",         data:"primaTotal", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ),
																function (data, type, full) {
															         return parseFloat(data).toFixed(2);
															    }
					},				
					{title: "Estatus",             data:"estatusRecibo.ct2Descripcion"},
					
					{
					 title: "Ver Detalle",     	   
					 data:null,
					 defaultContent: "<span data-toggle='collapse' class='"+btnDetalleRecibo+"'>"
					 			+    "  <i class='fas fa-id-card-alt' style='color:#2E2EFE;font-size: 20px'>" 
					 			+	 "</i></span>" 
					 			+	 "<span data-toggle='collapse' class='"+btnDetalleAgente+"'>"
					 			+    "  <i class='fas fa-address-card' style='color:#2E2EFE;font-size: 20px'>" 
					 			+	 "</i></span>",
					}
					
					
	//				{title: "Emision",             data:"fechaEmision"},
	//				{title: "Inicio Vigencia",     data:"inicioVigencia"},
	//				{title: "Fin Vigencia",        data:"finVigencia"},
	//				{title: "Moneda",   	       data:"monedaBean.ct16MonedaNombre"},
	//				{title: "Prima Neta",          data:"primaNeta"},
	//				{title: "Recargo Pago Fracc",  data:"primaTotal"},
	//				{title: "Derecho Poliza",      data:"derechoPoliza"},
	//				{title: "Impuesto Total",      data:"derechoPoliza"},
					];
			
			tabla.iniciarTabla("#tableRecibos", listaRecibo.dataExtra, columnas);
			$('#lbRecibos').css('display','block');
			$('#idTableRecibos').css('display','block');
			modalDetalleRecibo();
			modalDetalleAgente();
						
		}else{
			
			$('#lbRecibos').css('display','none');
			$('#idTableRecibos').css('display','none');
		}
		
	}
	
	/*** METODO PARA MOSTRAR DETALLE DEL RECIBO ****/
	var modalDetalleRecibo = function(){
		var table = $('#tableRecibos').DataTable()
		var detalle
		
		$('#tableRecibos tBody').on('click','.btnDetalleRecibo', function(){
			
			$('#detalleReciboModal').modal({show:true, backdrop:'static'});
			detalle = table.row($(this).parents('tr')).data();
			console.log('DETALLE REGISTRO')
			console.log(detalle)
//			
//			var cliente = detalle.clienteBean.nombreCliente !== '' ? detalle.clienteBean.nombreCliente 
//															   +" "+ detalle.clienteBean.apellidoMaterno
//															   +" "+ detalle.clienteBean.apellidoPaterno : detalle.clienteBean.denominacion
//			
			var comisionAgente = (detalle.comisionagente1 !== null ? detalle.comisionagente1 : 0.00
							   + detalle.comisionagente2 !== null ? detalle.comisionagente2 : 0.00
							   + detalle.comisionagente3 !== null ? detalle.comisionagente3 : 0.00)
								
			console.log('DETALLE COMISION AGENTE')
			console.log(comisionAgente)
			$('#sumaAsegurada').val(detalle.certificadoBean !== null ? detalle.certificadoBean.sumaAsegurada :detalle.polizaBean.sumaAsegurada )
			$('#recargoPago').val(detalle.recargoPagoFracc)
			$('#derechoPoliza').val(detalle.derechoPoliza)
			$('#iva').val(detalle.impuestoTotal)
			$('#comisionPrima').val(comisionAgente)/*detalle.comisionPrima*/
			$('#estatus').val(detalle.descripcionEndoso).removeClass("bg-info text-white font-weight-bold").addClass("bg-info text-white font-weight-bold");
			$('#fechaEmision').val(detalle.fechaEmision)
			$('#fechaEstatus').val(detalle.fechaEstatus)
			$('#fechaVigencia').val(detalle.inicioVigencia +" - "+ detalle.finVigencia)
			$('#moneda').val(detalle.monedaBean.ct16MonedaNombre)
			$('#primaNeta').val(detalle.primaNeta)
			$('#primaTotal').val(detalle.primaTotal)
		})
		
	}
	
	/*** METODO PARA MOSTRAR DETALLE DEL AGENTE ****/
	var modalDetalleAgente = function(){
		var table = $('#tableRecibos').DataTable()
		var detalle
		
		$('#tableRecibos tBody').on('click','.btnDetalleAgente', function(){
			
			$('#detalleAgenteModal').modal({show:true, backdrop:'static'});
			detalle = table.row($(this).parents('tr')).data();
			console.log(detalle)
			
			$('#formDetalleAgente #agente').val(detalle.polizaBean.agente1.nombre 
						+" "+ detalle.polizaBean.agente1.apePaterno
						+" "+ detalle.polizaBean.agente1.apeMaterno)
			$('#formDetalleAgente #clave').val(detalle.polizaBean.agente1.cveAgente)
			$('#formDetalleAgente #rfc').val(detalle.polizaBean.agente1.rfc)
			$('#formDetalleAgente #cedula').val(detalle.polizaBean.agente1.numeroCedula)
			$('#formDetalleAgente #tipoCed').val(detalle.polizaBean.agente1.tipoCedula)
			$('#formDetalleAgente #vigenciaCed').val(detalle.polizaBean.agente1.vigenciaCedula)
			$('#formDetalleAgente #telOficina').val(detalle.polizaBean.agente1.telefonoOficina)
			$('#formDetalleAgente #celular').val(detalle.polizaBean.agente1.telefonoCelular)
			$('#formDetalleAgente #email').val(detalle.polizaBean.agente1.correoElectronico)
			
			if(detalle.polizaBean.agente2 !== null){
				
				$('#detalleAgenteModalLabel2').css('display','block')
				$('#formDetalleAgente2').css('display','block')
				
				$('#formDetalleAgente2 #agente').val(detalle.polizaBean.agente2.nombre 
							+" "+ detalle.polizaBean.agente2.apePaterno
							+" "+ detalle.polizaBean.agente2.apeMaterno)
				$('#formDetalleAgente2 #clave').val(detalle.polizaBean.agente2.cveAgente)
				$('#formDetalleAgente2 #rfc').val(detalle.polizaBean.agente2.rfc)
				$('#formDetalleAgente2 #cedula').val(detalle.polizaBean.agente2.numeroCedula)
				$('#formDetalleAgente2 #tipoCed').val(detalle.polizaBean.agente2.tipoCedula)
				$('#formDetalleAgente2 #vigenciaCed').val(detalle.polizaBean.agente2.vigenciaCedula)
				$('#formDetalleAgente2 #telOficina').val(detalle.polizaBean.agente2.telefonoOficina)
				$('#formDetalleAgente2 #celular').val(detalle.polizaBean.agente2.telefonoCelular)
				$('#formDetalleAgente2 #email').val(detalle.polizaBean.agente2.correoElectronico)
			}else{
				$('#detalleAgenteModalLabel2').css('display','none')
				$('#formDetalleAgente2').css('display','none')
			   
				$('#formDetalleAgente2 :input').each(function(){
			        $(this).val('');
			    });
			}
			
			if(detalle.polizaBean.agente3 !== null){
				$('#detalleAgenteModalLabel3').css('display','block')
				$('#formDetalleAgente3').css('display','block')
				
				$('#formDetalleAgente3 #agente').val(detalle.polizaBean.agente3.nombre 
													+" "+ detalle.polizaBean.agente3.apePaterno
													+" "+ detalle.polizaBean.agente3.apeMaterno)
				$('#formDetalleAgente3 #clave').val(detalle.polizaBean.agente3.cveAgente)
				$('#formDetalleAgente3 #rfc').val(detalle.polizaBean.agente3.rfc)
				$('#formDetalleAgente3 #cedula').val(detalle.polizaBean.agente3.numeroCedula)
				$('#formDetalleAgente3 #tipoCed').val(detalle.polizaBean.agente3.tipoCedula)
				$('#formDetalleAgente3 #vigenciaCed').val(detalle.polizaBean.agente3.vigenciaCedula)
				$('#formDetalleAgente3 #telOficina').val(detalle.polizaBean.agente3.telefonoOficina)
				$('#formDetalleAgente3 #celular').val(detalle.polizaBean.agente3.telefonoCelular)
				$('#formDetalleAgente3 #email').val(detalle.polizaBean.agente3.correoElectronico)
			}else{
				$('#detalleAgenteModalLabel3').css('display','none')
				$('#formDetalleAgente3').css('display','none')
				
				$('#formDetalleAgente3 :input').each(function(){
				        $(this).val('');
				 });
			}
		})
		
	}
	
	/*** METODO PARA PARA GENERAR REPORTE DEUD ***/
	var reporteDeud = function(){
//		var fechaIni = $('#fechaDeudIni').val()
		var fechaFin = $('#fechaDeudFin').val()
		
//		if(fechaIni === undefined || fechaIni === ''){
//			return mensajes.modalAlert('warning','Informacion','Es Necesario Elegir Fecha Inicio');
//		}
		
		if(fechaFin === undefined || fechaFin === ''){
			return  mensajes.modalAlert('warning','Informacion','Es Necesario Elegir Fecha'); 
		}
		
         $.ajax({
			
			url         : "capturaLiquidacionesC/reporte/deud/"+fechaFin,
			type   	    : "GET",
			dataType    : "json",
			contentType : "application/json",
			beforeSend  : function(){
				util.loadingStart();
			},
			success : function(dataSet){
				console.log('REPORTE DEUD')
				console.log(dataSet.dataExtra)
				
				if(dataSet.mensaje === 'OK'){
					if(dataSet.dataExtra.length > 0){
						var columnas = [
								
								{title: "NIVEL_1",                 data:"NIVEL_1"},
								{title: "NIVEL_2",                 data:"NIVEL_2"},
								{title: "NIVEL_3",                 data:"NIVEL_3"},
								{title: "NIVEL_4",                 data:"NIVEL_4"},
								{title: "MONEDA",                  data:"MONEDA"},
								{title: "CONSECUTIVO",             data:"CONSECUTIVO"},
								{title: "OPERACION",               data:"OPERACION"},
								{title: "CVE_RAMO",                data:"CVE_RAMO"},
								{title: "PLAZO",                   data:"PLAZO"},
								{title: "AFECTACION",              data:"AFECTACION"},
								{title: "PRIMAS_POR_COBRAR_TOTAL", data:"PRIMAS_POR_COBRAR_TOTAL", render: $.fn.dataTable.render.number( ',', '.', 2)},
								{title: "RECARGOS",                data:"RECARGOS", render: $.fn.dataTable.render.number( ',', '.', 2)},
								{title: "IMPUESTOS",               data:"IMPUESTOS", render: $.fn.dataTable.render.number( ',', '.', 2)},
								{title: "DERECHOS_POLIZA",         data:"DERECHOS_POLIZA", render: $.fn.dataTable.render.number( ',', '.', 2)},
								{title: "RECARGOS_DEV",            data:"RECARGOS_DEV", render: $.fn.dataTable.render.number( ',', '.', 2)},
								{title: "DERECHOS_POLIZA_DEV",     data:"DERECHOS_POLIZA_DEV", render: $.fn.dataTable.render.number( ',', '.', 2)},
								{title: "COMI_X_DEV",              data:"COMI_X_DEV", render: $.fn.dataTable.render.number( ',', '.', 2)},
								{title: "PRIMAS_POR_COBRAR_AFECTO",data:"PRIMAS_POR_COBRAR_AFECTO", render: $.fn.dataTable.render.number( ',', '.', 2)},
								];
							
							tabla.iniciarTablaExport("#tableReporteDeud", dataSet.dataExtra, columnas,'Reporte DEUD al ' + fechaFin,'');
							$('#lbReporteDeud').css('display','block');
							$('#idTableReporteDeud').css('display','block');
							
						}else{
							
							$('#lbReporteDeud').css('display','none');
							$('#idTableReporteDeud').css('display','none');
						}
					
				}else{
					mensajes.modalAlert('warning','Informacion',dataSet.detalleMensaje);
					$('#lbReporteDeud').css('display','none');
					$('#idTableReporteDeud').css('display','none');
				}
				
			},
			statusCode: {
				404: function () {
					console.log("Error Al Generar Reporte DEUD");
				}
			},
			complete: function(){
				util.loadingEnd();
			}
			
		})
    }
	
	/*** METODO PARA PARA MOSTRAR CORTE DE CAJA ***/
	var corteCaja = function(){
		var fecha = $('#fecha').val();
		console.log('fecha corte de caja')
		console.log(fecha)
		if(fecha === ''){
			mensajes.modalAlert('warning','Informacion','Es Necesario Captrar la Fecha');
			return
		}
		
         $.ajax({
			
			url         : "capturaLiquidacionesC/corteCaja/" + fecha,
			type   	    : "GET",
			dataType    : "json",
			contentType : "application/json",
			beforeSend  : function(){
				util.loadingStart();
			},
			success : function(dataSet){
				console.log('CORTE CAJA')
				console.log(dataSet.dataExtra)
				
				if(dataSet.mensaje === 'OK'){
					if(dataSet.dataExtra.length > 0){
						var columnas = [
								
								{title: "Fecha Aplicado",  data:"FECHA_APLICADO"},
								{title: "Cantidad",        data:"CANTIDAD"},
								{title: "Forma Pago",      data:"FORMA_PAGO"},
								{title: "Total Pago",      data:"TOTAL_PAGO", render: $.fn.dataTable.render.number( ',', '.', 2)},
								];
							
							tabla.iniciarTablaExport("#tableCorteCaja", dataSet.dataExtra, columnas,'CORTE_CAJA_'+fechaActual(),'');
							$('#lbCorteCaja').css('display','block');
							$('#idTableCorteCaja').css('display','block');
							
						}else{
							$('#lbCorteCaja').css('display','none');
							$('#idTableCorteCaja').css('display','none');
						}
					
				}else{
					mensajes.modalAlert('warning','Informacion',dataSet.detalleMensaje);
				}
				
			},
			statusCode: {
				404: function () {
					console.log("Error Al Realizar Corte de Caja");
				}
			},
			complete: function(){
				util.loadingEnd();
			}
			
		})
    }
	
	return {
		  muestraRecibosPendientes : muestraRecibosPendientes,
		  muestraRecibosPoliza	   : muestraRecibosPoliza,
		  corteCaja                : corteCaja,
		  reporteDeud              : reporteDeud
		}
	
})();