

var solicitudCabeceraC = (function(){
	
	
	var guardarSolicitudCabecera = function() {
		var numSolTitle = $('#numSolicitud').text();
		
		console.log('NUMERO SOLICITUD')
		console.log(numSolTitle)
		
		var tipoSol = window.location.pathname;
		
		var j = tipoSol.indexOf("CapturaSolicitudManualAP");
		if($('#idSucursal').val() === '0'){
			return 	mensajes.modalAlert('warning', 'Información','Es Obligatorio Capturar Sucursal');
		}
		var formData = {};
		$.each($('input, select', '#formCapturaNuevo'),function(k, v){
			if($(this).attr("name") !== undefined){
				
				if($(this).attr("name") != "user-type"){
					var val = '';
					if($(this).attr("name") == "agente1" || $(this).attr("name") == "agente2" || $(this).attr("name") == "agente3" 
					                                     || $(this).attr("name") == "contratante"){
						val = $(this).val();
						var res = val.split(" - ");
						
						formData[$(this).attr("name")] = res[0];
						
					}else if(($(this).attr("name") == "primaNeta"     || $(this).attr("name") == "recargoPagoFraccionado" 
						   || $(this).attr("name") == "derechoPoliza" || $(this).attr("name") == "impuestoTotal" || $(this).attr("name") == "primaCobroTotal" 
						   || $(this).attr("name") == "comisionPrima" || $(this).attr("name") == "comisionRecargo") 
						   && numSolTitle =="" ){
						
						formData[$(this).attr("name")] = 0;
						
					}else if($(this).attr("name") == "fechaIniVigencia" || $(this).attr("name") == "fechaFinVigencia" || $(this).attr("name") == "fechaEmision"){
						var myd = new Date($(this).val());
						var myn = myd.toUTCString();
							 
						var now_utc =  Date.UTC(myd.getUTCFullYear(), myd.getUTCMonth(), myd.getUTCDate(),
				                       myd.getUTCHours(), myd.getUTCMinutes(), myd.getUTCSeconds());
						
						formData[$(this).attr("name")] = new Date(now_utc);
					}else{						
						formData[$(this).attr("name")] = $(this).val();
					}					
				}
				
			}
	    });
		//console.log(JSON.stringify(formData));		
		if(j == -1){
			formData["tipoSolicitud"] = "D";
		}else{
			formData["tipoSolicitud"] = "AP";
		}
		
		if(numSolTitle == ""){
			// guardado nuevo
			console.log("guardado nuevo");
			console.log(JSON.stringify(formData));
			$.ajax({
				url : "SolicitudCabeceraC/guardarSolicitudCabecera",
				method: "POST",
				data: JSON.stringify(formData),
				dataType: 'json',
				contentType: 'application/json',
				beforeSend: function(){
					util.loadingStart();
				},
				success : function(dataSet) {
					console.log(dataSet.mensaje);
					if(dataSet.mensaje === "OK"){				
						var ns = dataSet.detalleMensaje.split(" -- ");
						
						mensajes.modalAlert('success', dataSet.mensaje, ns[0] +" "+ ns[1]);
						
						$("#numSolicitud").text( "No. Solicitud: "+ ns[1]);
						$("#btnGuardarSolicitudCabecera").attr('disabled','true')
					}
				},			
				error: function (request, status, error) {
	                console.log(request.responseText);
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
		}else{
			// guardado nuevo
			console.log("actualizacion");
			var nsF = numSolTitle.split(": ");
			formData["numeroSolicitud"] = nsF[1];
			console.log(JSON.stringify(formData));
			
			$.ajax({
				url : "SolicitudCabeceraC/actualizarSolicitudCabecera",
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
						mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					}
				},			
				error: function (request, status, error) {
	                console.log(request.responseText);
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
	}
	
	var callbackEditarCabecera = function(callback){
		var numSolTitle = $('#numSolicitud').text();		
		var tipoSol     = window.location.pathname;		
		var j           = tipoSol.indexOf("CapturaSolicitudManualAP");		
		var formData    = {};
		$.each($('input, select', '#formCapturaNuevo'),function(k, v){
			if($(this).attr("name")!== undefined){
				
				if($(this).attr("name")!="user-type"){
					var val='';
					if($(this).attr("name")=="agente1"||$(this).attr("name")=="agente2"||$(this).attr("name")=="agente3"||$(this).attr("name")=="contratante"){
						val=$(this).val();
						var res=val.split(" - ");
						
						formData[$(this).attr("name")] = res[0];
					}else if(($(this).attr("name") == "primaNeta" || $(this).attr("name") == "recargoPagoFraccionado" || $(this).attr("name") == "derechoPoliza" || $(this).attr("name") == "impuestoTotal" || $(this).attr("name") == "primaCobroTotal" 
						   || $(this).attr("name") == "comisionPrima" || $(this).attr("name") == "comisionRecargo") && numSolTitle=="" ){
					  	formData[$(this).attr("name")] = 0;
					}else{						
						formData[$(this).attr("name")] = $(this).val();
					}					
				}				
			}
	    });		
		if(j==-1){
			formData["tipoSolicitud"] = "D";
			console.log('SOLICITUD D')
		}else{
			formData["tipoSolicitud"] = "AP";
			console.log('SOLICITUD AP')
		}		
		console.log("actualizacion");
		var nsF=numSolTitle.split(": ");
		formData["numeroSolicitud"] = nsF[1];
		console.log(JSON.stringify(formData));		
		$.ajax({
			url : "SolicitudCabeceraC/actualizarSolicitudCabecera",
			method: "POST",
			data: JSON.stringify(formData),
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				callback(dataSet);				
			},			
			error: function (request, status, error) {
                console.log(request.responseText);
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
	
	var obtenerSolicitudCabecera = function() {		
		//console.log("busqueda");
		var formData = new FormData();
		
		var tipoSol=window.location.pathname;
		
		var j=tipoSol.indexOf("AP");
		
		if(j==-1){
			//daños
			$.ajax({
				url : "SolicitudCabeceraC/obtenerTodosSolicitudCabeceraByTipoSolicitud/D",
				method : "GET",
				beforeSend : function() {
					util.loadingStart();
				},
				success : function(dataSet) {
					console.log(dataSet);
					for(var i=0;i<dataSet.dataExtra.length;i++){
						dataSet.dataExtra[i].fechaRegistro=convertTimeStampToDate(dataSet.dataExtra[i].fechaRegistro);
						dataSet.dataExtra[i].fechaEmision=convertTimeStampToDate(dataSet.dataExtra[i].fechaEmision);
						dataSet.dataExtra[i].fechaIniVigencia=convertTimeStampToDate(dataSet.dataExtra[i].fechaIniVigencia);
						dataSet.dataExtra[i].fechaFinVigencia=convertTimeStampToDate(dataSet.dataExtra[i].fechaFinVigencia);
						
					}
					var columnas = [ 
					{
						title : "Número de Solicitud",
						data : "numeroSolicitud"
					},
					{
						title : "Cliente",
						data : "cliente"
					},	
					{
						title : "Producto",
						data : "producto"
					},	
					{
						title : "Fecha Registro de Solicitud",
						data : "fechaRegistro"
					},
					{
						title : "Fecha Emision de Solicitud",
						data : "fechaEmision"
					},
					{
						title : "Fecha Inicio de Vigencia",
						data : "fechaIniVigencia"
					},	
					{
						title : "Fecha Fin de Vigencia",
						data : "fechaFinVigencia"
					},	
					{
						title : "Editar",
						data : null,
						defaultContent : "<span data-toggle='collapse' class='btnEditarSolicitudCabecera' id='editarSolicitudCabecera'><i class='fas fa-edit'></i></span>",
						orderable : false
					}];
					console.log(dataSet);
					if (dataSet.mensaje === "OK") {
						tabla.iniciarTabla("#resultadoSolicitudCabecera", dataSet.dataExtra,columnas);
						$('.background-tabla').css('display', 'block');
						tablaSolicitudCabecera();
						
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
		}else{
			//AP
			$.ajax({
				url : "SolicitudCabeceraC/obtenerTodosSolicitudCabeceraByTipoSolicitud/AP",
				method : "GET",
				beforeSend : function() {
					util.loadingStart();
				},
				success : function(dataSet) {
					console.log(dataSet);
					for(var i=0;i<dataSet.dataExtra.length;i++){
						dataSet.dataExtra[i].fechaRegistro=convertTimeStampToDate(dataSet.dataExtra[i].fechaRegistro);
						dataSet.dataExtra[i].fechaEmision=convertTimeStampToDate(dataSet.dataExtra[i].fechaEmision);
						dataSet.dataExtra[i].fechaIniVigencia=convertTimeStampToDate(dataSet.dataExtra[i].fechaIniVigencia);
						dataSet.dataExtra[i].fechaFinVigencia=convertTimeStampToDate(dataSet.dataExtra[i].fechaFinVigencia);
						
					}
					
						var columnas = [ 
							{
								title : "Número de Solicitud",
								data : "numeroSolicitud"
							},
							{
								title : "Cliente",
								data : "cliente"
							},	
							{
								title : "Producto",
								data : "producto"
							},	
							{
								title : "Fecha Registro de Solicitud",
								data : "fechaRegistro"
							},
							{
								title : "Fecha Emision de Solicitud",
								data : "fechaEmision"
							},
							{
								title : "Fecha Inicio de Vigencia",
								data : "fechaIniVigencia"
							},	
							{
								title : "Fecha Fin de Vigencia",
								data : "fechaFinVigencia"
							},							
					{
						title : "Editar",
						data : null,
						defaultContent : "<span data-toggle='collapse' class='btnEditarSolicitudCabecera' id='editarSolicitudCabecera'><i class='fas fa-edit'></i></span>",
						orderable : false
					}];
					console.log(dataSet);
					if (dataSet.mensaje === "OK") {
						tabla.iniciarTabla("#resultadoSolicitudCabecera", dataSet.dataExtra,columnas);
						$('.background-tabla').css('display', 'block');
						tablaSolicitudCabecera();
						
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
		
	}

	var llenarSolicitudCabeceraById = function(id) {		
		var formData = new FormData();
		var numeroSolicitud = 1;
		var grupo = 8;
		var tipoSol=window.location.pathname;
		
		var j=tipoSol.indexOf("buscaSolicitudManualAP");
		$.ajax({
			url : "SolicitudCabeceraC/id/" + id,
			method : "GET",
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				console.log("mio",dataSet);
				dataSet.dataExtra.fechaRegistro=convertTimeStampToDate(dataSet.dataExtra.fechaRegistro);
				dataSet.dataExtra.fechaEmision=convertTimeStampToDate(dataSet.dataExtra.fechaEmision);
				dataSet.dataExtra.fechaIniVigencia=convertTimeStampToDate(dataSet.dataExtra.fechaIniVigencia);
				dataSet.dataExtra.fechaFinVigencia=convertTimeStampToDate(dataSet.dataExtra.fechaFinVigencia);
				console.log(dataSet.dataExtra);
				
				$("#numSolicitud").text( "N° Solicitud: "+ dataSet.dataExtra.numeroSolicitud);
				//$("#idSucursal").val(dataSet.dataExtra.idSucursal)
				sucursalC.extraerSucursal(dataSet.dataExtra.idSucursal);
				ramoC.ramo(dataSet.dataExtra.idRamo,dataSet.dataExtra.producto);
				//$("#idRamo").val(dataSet.dataExtra.idRamo).change();
//				productoC.producto(dataSet.dataExtra.producto);
				//$("#producto").val(dataSet.dataExtra.producto).change();;
				monedaC.extraerMonedaByProducto(dataSet.dataExtra.producto,dataSet.dataExtra.cveMoneda);
				
				clientesC.obtenerClientesById(dataSet.dataExtra.contratante);
				$("#polizaNuevaRenovacion").val(dataSet.dataExtra.polizaNuevaRenovacion);
				if(dataSet.dataExtra.polizaNuevaRenovacion!=""){
					$( "#writer" ).prop( "checked", true );
					$( "#writer" ).click();
				}
				else{
					$( "#enabler" ).prop( "checked", true );
				}
					

				//$("#cveMoneda").val(dataSet.dataExtra.cveMoneda);
				$("#fechaIniVigencia").val(dataSet.dataExtra.fechaIniVigencia);
				$("#fechaFinVigencia").val(dataSet.dataExtra.fechaFinVigencia);

			   $("#idFormaPago").val(dataSet.dataExtra.idFormaPago);
			   
			   if(dataSet.dataExtra.agente1!=""){
				   agentesC.obtenerAgentesByCveAgente(dataSet.dataExtra.agente1,"agente1");

				   $("#porcentajeComision").val(dataSet.dataExtra.porcentajeComision);				   
			   }
			
			   if(dataSet.dataExtra.agente2!=""){
				   agentesC.obtenerAgentesByCveAgente(dataSet.dataExtra.agente2,"agente2");

				   $("#porcentajeComision2").val(dataSet.dataExtra.porcentajeComision2);
			   }

			   if(dataSet.dataExtra.agente3!=""){
				   agentesC.obtenerAgentesByCveAgente(dataSet.dataExtra.agente3,"agente3");
				   $("#porcentajeComision3").val(dataSet.dataExtra.porcentajeComision3);
			   }

			   $("#idFrecuenciaPago").val(dataSet.dataExtra.frecuenciaPago);
			   //$("#idConductoCobro").val(dataSet.dataExtra.idConductoCobro);
			   $("#fechaEmision").val(dataSet.dataExtra.fechaEmision);
			   $("#idAgrupador").val(dataSet.dataExtra.idAgrupador);
			   $("#primaNeta").val(dataSet.dataExtra.primaNeta);
			   $("#recargoPagoFraccionado").val(dataSet.dataExtra.recargoPagoFraccionado);
			   $("#derechoPoliza").val(dataSet.dataExtra.derechoPoliza);
			   $("#impuestoTotal").val(dataSet.dataExtra.impuestoTotal);
			   $("#primaCobroTotal").val(dataSet.dataExtra.primaCobroTotal);
			   $("#comisionPrima").val(dataSet.dataExtra.comisionPrima);
			   $("#comisionRecargo").val(dataSet.dataExtra.comisionRecargo);
			   //Valido si ya tiene coberturas asignadas 
				solicitudCabeceraC.obtenerCalculosSolicitud();
//			   solicitudCertificadosDaniosC.obtenerSolicitudCertificadosDanios();
				if(j != -1){
					coberturaDaniosC.certificadosCobertura();
				} 
				validaGenerarPoliza();
//				if(poliza == '1'){
//					validarPoliza();	
//				}
				
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
		
	var tablaSolicitudCabecera = function() {
		
		var table = $("#resultadoSolicitudCabecera").DataTable();
				
		$('#resultadoSolicitudCabecera tbody').on('click', '.btnEditarSolicitudCabecera', function(){
			var data = table.row( $(this).parents('tr') ).data();
			console.log('DATOS PARA EDITAR SOLICITUD')
			console.log(data);
			
			var tipoSol=window.location.pathname;
			
			var j=tipoSol.indexOf("buscaSolicitudManualAP");
			
			if(j==-1){
				$(location).attr('href', './capturaSolicitudManualA?id='+data.idSolicitudCabecera);
			}else{
				$(location).attr('href', './CapturaSolicitudManualAPA?id='+data.idSolicitudCabecera);
			}
			
			//$('#EditarGrupoModal').modal('show');
			//obtenerGrupos(data.numeroSolicitud,data.idSoLGrupoAP);
		});
	}
	
	var obtenerCalculosSolicitud  = function(){
		var numeroSolicitudTitulo = $("#numSolicitud").text();
		var splitnumero           = numeroSolicitudTitulo.split(" ");
		var numeroSolicitud       = splitnumero[2];
		var tipoSol               = window.location.pathname;		
		var j                     = tipoSol.indexOf("CapturaSolicitudManualAP");
		
		if(numeroSolicitud){
			if(j != -1){
				coberturaC.coberturas(function(dataSet){
					console.log('ENTRA CALCULOS_1');
//					obtenerDatosPrimaCabeceraAP
					if(dataSet.dataExtra.length > 0){
						calculos(function(calculos){
						console.log('CALCULOS_1_ TAMAÑO_')
							$("#primaNeta").val(calculos.dataExtra[0].primaNeta);
						    $("#recargoPagoFraccionado").val(Number(calculos.dataExtra[0].cargoFraccionado).toFixed(2));
						    $("#derechoPoliza").val(calculos.dataExtra[0].derechoPoliza);
						    $("#impuestoTotal").val(Number(calculos.dataExtra[0].impuestoTotal).toFixed(2));
						    $("#primaCobroTotal").val(Number(calculos.dataExtra[0].primaTotal).toFixed(2));
						    $("#comisionPrima").val(Number(calculos.dataExtra[0].comisionPrima).toFixed(2));
						})
					}
				})
			}else{
				coberturaDaniosC.coberturas(function(dataSet){
					console.log('ENTRA CALCULOS_2_TAMAÑO_');
					if(dataSet.dataExtra.length > 0){
						calculos(function(calculos){
							console.log('CALCULOS_2')
							console.log(calculos)
							$("#primaNeta").val(calculos.dataExtra[0].primaNeta);
							$("#recargoPagoFraccionado").val(Number(calculos.dataExtra[0].cargoFraccionado).toFixed(2));
						    $("#derechoPoliza").val(calculos.dataExtra[0].derechoPoliza);
						    $("#impuestoTotal").val(Number(calculos.dataExtra[0].impuestoTotal).toFixed(2));
						    $("#primaCobroTotal").val(calculos.dataExtra[0].primaTotal);
						    $("#comisionPrima").val(Number(calculos.dataExtra[0].comisionPrima).toFixed(2));
						})
					}
				})
			}			
		}
		
	}
		
	var calculos = function(callback){
		var numeroSolicitudTitulo = $("#numSolicitud").text();
		var splitnumero = numeroSolicitudTitulo.split(" ");
		var idSolicitud =splitnumero[2];
		var tipoSol=window.location.pathname;		
		var j=tipoSol.indexOf("CapturaSolicitudManualAP");
		var url = "";
		if(j != -1){
			url = "solicitudCoberturasC/obtenerDatosPrimaCabeceraAP/"
		}else{
			url = "solicitudCoberturasC/obtenerDatosPrimaCabeceraDanios/"
		}
		
		$.ajax({
			url : url + idSolicitud,
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
	var validaGenerarPoliza = function(){
		var tipoSol=window.location.pathname;
		var j=tipoSol.indexOf("CapturaSolicitudManualAP");
		if(j != -1){
			btnGenerarPolizaAP();
		}  else{
			btnGenerarPolizaD();
			
		}
		
	}
	var btnGenerarPolizaD = function() {		
		var numeroSolicitudTitulo = $("#numSolicitud").text();
		var splitnumero = numeroSolicitudTitulo.split(" ");
		var idSolicitud =splitnumero[2];
		$.ajax({
			url : "SolicitudCabeceraC/validaPolizaDanios/"+ idSolicitud,
			method : "get",
			dataType : 'json',
			contentType : 'application/json',
			success : function(dataSet) {
				console.log("POLIZA D", dataSet);
				if(dataSet.dataExtra == "0"){
					
					$("#btnGenerarPoliza").show();
					validarPoliza();
				}else{
					
					$("#btnGenerarPoliza").hide();
					
					
				}
				
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			}
		});
	}
	var btnGenerarPolizaAP = function() {
		var numeroSolicitudTitulo = $("#numSolicitud").text();
		var splitnumero = numeroSolicitudTitulo.split(" ");
		var idSolicitud =splitnumero[2];
		
		if(idSolicitud === undefined ){console.log('NO EXISTE NUMERO DE ID SOLICITUD(validaPolizaAP)'); return}
		
		$.ajax({
			url : "SolicitudCabeceraC/validaPolizaAP/"+ idSolicitud,
			method : "get",
			dataType : 'json',
			contentType : 'application/json',
			success : function(dataSet) {
				console.log("PLIZA AP", dataSet);
				if(dataSet.dataExtra == 1){
					$("#btnGenerarPoliza").show();
					validarPoliza();									
				}else{
					
					$("#btnGenerarPoliza").hide();
				}
				
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			}
		});
	}
	var generarPoliza = function() {
		callbackEditarCabecera(function(solicitudCabecera){
			
			if(solicitudCabecera.mensaje==="OK"){																
				var numeroSolicitudTitulo = $("#numSolicitud").text();
				var splitnumero = numeroSolicitudTitulo.split(" ");
				var idSolicitud =splitnumero[2];
				$.ajax({
					url : "SolicitudCabeceraC/generarPoliza/"+ idSolicitud,
					method : "get",
					dataType : 'json',
					contentType : 'application/json',
					success : function(dataSet) {
						console.log("mi respuesta", dataSet);
						if (dataSet.mensaje === "OK") {
							mensajes.modalAlert('success', dataSet.mensaje,
									dataSet.detalleMensaje + ': ' + dataSet.dataExtra);
							validarPoliza();
						}
					},
					statusCode : {
						404 : function() {
							console.log("page not found");
						}
					}
				});
			}
		});		
	}
	
	var validarPoliza = function(){
		var tipoSol=window.location.pathname;
		var j=tipoSol.indexOf("CapturaSolicitudManualAP");
		if(j != -1){
			btnGuardarSolicitudConPolizaAP();
		}  else{
			btnGuardarSolicitudConPolizaD();
			
		}
		
	}
	
	var btnGuardarSolicitudConPolizaD = function() {		
		var numeroSolicitudTitulo = $("#numSolicitud").text();
		var splitnumero = numeroSolicitudTitulo.split(" ");
		var idSolicitud =splitnumero[2];
		$.ajax({
			url : "SolicitudCabeceraC/validarPoliza/"+ idSolicitud,
			method : "get",
			dataType : 'json',
			contentType : 'application/json',
			success : function(dataSet) {
				console.log("POLIZA DAÑOS", dataSet);
				if(dataSet.dataExtra == "0" ){
					$("#btnGenerarPoliza").show();
				}else{
					$("#btnGenerarPoliza").hide();
					
					$('button[id=btnGuardarCertificado]').hide();
					$("#btnGuardarSolicitudCabecera").hide();
					$("#btnCertificadoCobertura").hide();
					$("#numPoliza").text( "N° Poliza: "+ dataSet.dataExtra);
				}
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			}
		});
	}
	var btnGuardarSolicitudConPolizaAP = function() {
		var numeroSolicitudTitulo = $("#numSolicitud").text();
		var splitnumero = numeroSolicitudTitulo.split(" ");
		var idSolicitud =splitnumero[2];
		$.ajax({
			url : "SolicitudCabeceraC/validarPoliza/"+ idSolicitud,
			method : "get",
			dataType : 'json',
			contentType : 'application/json',
			success : function(dataSet) {
				console.log("POLIZA AP", dataSet);
				if(dataSet.dataExtra == "0" ){
					$("#btnGenerarPoliza").show();
				}else{
					$("#btnGenerarPoliza").hide();
					$("#btnCargarGrupo").hide();
					$("#btnGuardarSolicitudCabecera").hide();
									
					$("#numPoliza").text( "N° Poliza: "+ dataSet.dataExtra);
				}
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			}
		});
	}
	
	return {
		guardarSolicitudCabecera :guardarSolicitudCabecera,
		obtenerSolicitudCabecera :obtenerSolicitudCabecera,
		llenarSolicitudCabeceraById : llenarSolicitudCabeceraById,
		obtenerCalculosSolicitud : obtenerCalculosSolicitud,
		generarPoliza:generarPoliza,
		validaGenerarPoliza : validaGenerarPoliza,
		validarPoliza : validarPoliza
		
	}
})();

function convertTimeStampToDate(timestamp) {
	  var date = new Date(                          // Convert to date
	    parseInt(                                   // Convert to integer
	      timestamp
	    )
	  );
	  return [
		date.getFullYear(),                          // Get full year		    
	    ("0" + (date.getMonth()+1)).slice(-2),      // Get month and pad it with zeroes
	    ("0" + date.getDate()).slice(-2)           // Get day and pad it with zeroes
	  ].join('-');                                  // Glue the pieces together
	}