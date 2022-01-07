var siniestrosC = (function () {
	var idSiniestro = 0;
	var idProveedor = 0;
	var idBeneficiario = 0;
	var esPersonaMoral = 0;
	var tipoRamo

	var archivosSiniestros = function () {
		var extensions = ["jpg", "png", "pdf"];
		fileinput.inicializarFileinputSiniestros(null, "input[type='file']", extensions);
	};
	
	var guardarSiniestro = function () {
		var formData = new FormData();
		var model = { }
		var estimaciones = [];
		var estimacion = {idCobertura:'', cobertura:'', importe:'', limiteSA:''};
		var i = 0;
		var error=false;
		var ramo = $('#ramo').val()
		

		$.each($('input, select', "#formSiniestro"), function (k, v) {
			
			if ($(this).attr("name") !== undefined) {
			
				if($(this).hasClass("cobertura")) {
					
					if($(this).hasClass("moneda")) {
						
						console.log('CAMPO -> ', $(this).attr("name"), ' VALOR -> ', $(this).val())
						estimacion[$(this).attr("name")] = $(this).inputmask('unmaskedvalue');
						
					}else{

						console.log('CAMPO -> ', $(this).attr("name"), ' VALOR -> ', $(this).val())
						
						estimacion[$(this).attr("name")] = $(this).val().toUpperCase();
						estimacion['cveCobertura'] = cvCo;
						estimacion['idCobertura']  = $(this).val();
						estimacion['limiteSA']     = $(this).find(':selected').attr("data-limite");
						estimacion['coberturaSA']  = $(this).find(':selected').attr("data-sa");
						
					}
				
					if((estimacion['importe'] === '' && estimacion['concepto'] == '')) {
						error = true;
					}
					
					if(estimacion['cobertura'] !== '' && estimacion['importe'] !== '') {
						error = false;
						
//						console.log('ID COBERTURA -> ', $(this).val())
//						console.log('LIMITE COBERTURA -> ', $(this).attr("data-limite"))
						
						if($(this).val() === '0'){
							mensajes.modalAlert('warning','Informacion','Es necesarion elegir Cobertura a Afectar');
							return false
						}
						
						var cvCo = $(this).attr("id");
					
						if($(this).attr("idMov")!== undefined) {
							estimacion['idMovimiento'] = $(this).attr("idMov");
						} else {
							estimacion['idMovimiento'] = 0;
						}
						
						estimaciones[i] = estimacion;
//						estimacion = {idCobertura:'', cveCobertura:'', cobertura:'', importe:'', concepto:'', limiteSA:''};
//						i++;
//						console.log('ESTIMACIONES PARA GUARDAR: ', estimacion)
					}
				} else {
					if (v.type === 'file') {
						
						if (v.files.length > 0) {
						
							for(j = 0; j < v.files.length; j++) {
								formData.append("documentos[]", v.files[j], $(this).attr("id")+"|"+v.files[j].name);
							}
						}
					} else {
						
					if($(this).attr("name") !== ''){
						
						if($(this).hasClass("moneda")) {
							model[$(this).attr("name")] = $(this).inputmask('unmaskedvalue');
						} else {
							
							model[$(this).attr("name")] = $(this).val().toUpperCase();
						}
					}
					
					}
				}
			}
		});
		
		if(error){
			mensajes.modalAlert('danger', 'ERROR', 'Faltan concepto o importe para estimacion');
			return;
		}
		
		model['estimacionesModel'] = estimaciones;

		if(ramo === '1'){
			model['idAsegurado'] = $('#asegurados').find(':selected').attr("data-idAseg")
			model['grupoAP'] = $('#asegurados').find(':selected').attr("data-idGrupo")
			model['sumaAsegurada'] = $('#coberturas').find(':selected').attr("data-sa")
		}
		
		if(idSiniestro !== 0) {
			model['idSiniestro'] = idSiniestro;
		}
		
		console.log('Modelo -> ', model)
		
		formData.append("model", new Blob([JSON.stringify(model)], { type: 'application/json' }));
		
		console.log('Form Data -> ', formData)
		
		$.ajax({
			url: "captura/guardaSiniestro",
			type: "POST",
			data: formData,
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			cache: false,
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				if (dataSet.mensaje === 'OK') {
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$('#formSiniestro')[0].reset();
					$('.currentDate').bootstrapDP('setDate', new Date());
					$('#fotosBloque').empty();
					idSiniestro = 0;
				} else {
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
					$.each( dataSet.dataExtra, function(k, v){
						console.log('ERROR -> ', dataSet.dataExtra)
						var campo = $('[name=' + k + ']').addClass("is-invalid");
						$(campo).parent().append('<div class="invalid-tooltip">' + v + '</div>');
					});
				}
			},
			statusCode: {
				404: function () {
					console.log("page not found");
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
				console.log(model);
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var btnBusqueda= function () {
		
		return($.ajax({
			url: "consulta/id/" + $('#noSiniestro').val(),
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				
				if (dataSet.mensaje === 'OK') {
					var documentos = dataSet.dataExtra.docs;
//					console.log("dataSet.dataExtra");
//					console.log(dataSet.dataExtra);

					if(dataSet.dataExtra.ramo === 1){
//						console.log('Entra Documento AP')
						$('.diversos').css('display','none')
						$('.lstAsegurados').css('display','block')
						
					}else{
//						console.log('Entra Documento Daños')
						$('.diversos').css('display','block')
						$('.lstAsegurados').css('display','none')
					}
					
					if(documentos !== null && documentos !== undefined) {
						$('#fotosBloque').empty();
						var uldWrapper = $('<ul>');
						
						$.each(documentos, function(k, v){
							var liWrapper = $('<li>');
							var tipoDocumento = '[Foto]';
							
							if(v.tipoDocumento === 'cartaReclamacion') {
								tipoDocumento = '[Carta reclamacion]';
								$('#cartaReclamacionBloque').hide();
							} else if(v.tipoDocumento === 'identificacionOficial') {
								tipoDocumento = '[Identificacion oficial]';
								$('#identificacionOficialBloque').hide();
							} else if(v.tipoDocumento === 'comprobanteDomicilio') {
								tipoDocumento = '[Comprobante de domicilio]'
								$('#comprobanteDomicilioBloque').hide();
							} else if(v.tipoDocumento === 'presupuestoReparacion') {
								tipoDocumento = '[Presupuesto]'
								$('#presupuestoReparacionBloque').hide();
							}  else if(v.tipoDocumento === 'documento') {
								tipoDocumento = '[Documento]'
							}
							
							var aArchivo = $('<a class="verArchivo" href="archivo/' + v.id + '" target="_blank">Ver documento '+tipoDocumento+': '+v.nombreDocumento+'</a>');
							liWrapper.append(aArchivo);
							uldWrapper.append(liWrapper);
						})
						$("#fotosBloque").append(uldWrapper);
					}
					
					$.each( dataSet.dataExtra, function(k, v) {
						$('#' + k + ':text').val(v);
						if(dataSet.dataExtra['estatusSiniestro']==11 || dataSet.dataExtra['estatusSiniestro']==27 || dataSet.dataExtra['estatusSiniestro']==29) {
							$('#' + k).attr('disabled', 'disabled');
							$('#input-b6').attr('disabled', 'disabled');
							$('#cargaCoberturas').attr('disabled', 'disabled');
							$('#cartaReclamacionBloque').hide();
							$('#identificacionOficialBloque').hide();
							$('#comprobanteDomicilioBloque').hide();
							$('#presupuestoReparacionBloque').hide();
						} else {
							$('.editable').attr('disabled', false);
						}
						if(k==='estatusSiniestro' || k==='causa') {
							$('#' + k).val(v);
						}
					});
					
					$('#sucursal').append(new Option(dataSet.dataExtra['sucursal'], dataSet.dataExtra['idSucursal']));
					$('#ramo').append(new Option(dataSet.dataExtra['ramoDesc'], dataSet.dataExtra['ramo']));
					$('#ramo').val(dataSet.dataExtra['ramo'])
					
					if(dataSet.dataExtra['estatusSiniestro']==27 || dataSet.dataExtra['estatusSiniestro']==29) {
						$('#estatusSiniestro').attr('disabled', true);
						$('#guardaSiniestro').attr('disabled', true);
					} else {
						$('#estatusSiniestro').attr('disabled', false);
						$('#guardaSiniestro').attr('disabled', false);
					}
				
					
					idSiniestro =  dataSet.dataExtra['idSiniestro'];
					
					var ramo = $('#ramo').val();
					
//					if(ramo === '5') {
//						$('.bloqueArchivosExtra').show();
//					} else {
//						$('.bloqueArchivosExtra').hide();
//					}
					
//					console.log('ID SINIESTRO -> ', idSiniestro);
				} else {
					mensajes.modalAlert('warning', dataSet.mensaje, dataSet.detalleMensaje);
				}
				
				$('#noSiniestro').attr('disabled', false);
				
				if(dataSet.dataExtra['causa'] !== null){
					cargaCT19_7CausaSiniestro($('#ramo').val(), dataSet.dataExtra['causa']);
				}
				
				
			},
			statusCode: {
				404: function (a, b, c){
			        console.log("Error:", a, b, c);
					console.log("No encuentra reporte.");
					console.log(this.url);
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		}));
	}
	
	var btnCargaCoberturas = function () {
		var numSin = '';
		
		if( $('#noSiniestro') !== undefined && $('#noSiniestro').val() !== undefined && $('#noSiniestro').val()!=='') {
			numSin = "/"+$('#noSiniestro').val();
		}
		
		return($.ajax({
			url: "cargaCoberturas/" + $('#ramo').val() + "/" + $('#busquedaPoliza').val()+"/" + $('#certificado').val() + numSin,
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
//				console.log('RESPUESTA COBERTURAS SINIESTRO ', dataSet.dataExtra)
				var coberturas = 
				$('#estimacionesBloque').css('display:block')
	
				$('.lstCoberturas').html("");	
				$('.lstCoberturas').append('<option value="0" selected disabled>Seleccione Cobertura...</option>');
				
				$.each(dataSet.dataExtra, function(i, v) {
					var ramo     = $('#ramo').val()
					var numCob   = '#cobertura_' + i
					var montoCob = '#montoCob_' + i
					var coaseguro = '#coaseguro_' + i
					var deducible = '#deducible_' + i
					
					if(ramo === '5'){
//						console.log('Llena Combo Coberturas Daño -> ', v.cobertura.ct10Descripcion)
						
						$('.lstCoberturas').append('<option data-dedu = "'+v.cobertura.deducible+'" data-coa = "'+v.cobertura.coaseguro+'" data-cob = "'+ v.cobertura.tipoCobertura.tipoCoberturaIdentificador 
								                        +'" data-SA = "'+ v.cobertura.coberturaSA +'" data-limite ="'+ v.cobertura.limiteSA +'" value="' + v.cobertura.cveCobertura 
								                        + '">' + v.cobertura.ct10Descripcion + '</option>');
						$(numCob).val(v.cobertura.ct10Descripcion)
						$(montoCob).val(v.cobertura.limiteSA)
						$(coaseguro).val(v.cobertura.coaseguro)
						$(deducible).val(v.cobertura.deducible)
						
						
					}else{
//						console.log('Llena Combo Coberturas AP -> ', v.cobertura.ct10Descripcion)
						$('.lstCoberturas').append('<option data-dedu = "'+v.cobertura.deducible+'" data-coa = "'+v.cobertura.coaseguro+'" data-cob = "'+ v.cobertura.tipoCobertura.tipoCoberturaIdentificador 
								                         +'" data-SA = "' + v.cobertura.limiteSA +'" value="' + v.cobertura.cveCobertura + '">' + v.cobertura.ct10Descripcion + '</option>');
						$(numCob).val(v.cobertura.ct10Descripcion)
						$(montoCob).val(v.cobertura.limiteSA)
						$(coaseguro).val(v.cobertura.coaseguro)
						$(deducible).val(v.cobertura.deducible)
						
						$('#cobertura4').val('')
						
						var ramo = $('#ramo').val()
						var cobertura = $('#coberturas').find(':selected').text().toUpperCase()
						var coaseguro = $('#coberturas').find(':selected').attr("data-coa")
						var deducible = $('#coberturas').find(':selected').attr("data-dedu")
						
						$('#deducible').val(deducible)
						$('#coaseguro').val(coaseguro)
//						$('#coberturas').attr('disabled', true)
						
						console.log('Cobertura AP: ', cobertura)
						
						if(ramo === '1' && cobertura.indexOf("REEMBOLSO") === -1){
							
							var sumaAseg = $('#coberturas').find(':selected').attr("data-sa")
							
							$('#cobertura4').attr('disabled', true)
							$('#cobertura4').val(sumaAseg)
							
						}else if (ramo === '1' && cobertura.indexOf("REEMBOLSO") >= 0){
							
							var sumaAseg = $('#coberturas').find(':selected').attr("data-sa")
							$('#cobertura4').removeAttr('disabled')
							$('#cobertura4').val(sumaAseg)
							
						}else{
							
							$('#cobertura4').removeAttr('disabled')
						}
					}
				});
				
				if (dataSet.mensaje === 'OK') {
					console.log('Todo bien, nada bad');
				} else {
					mensajes.modalAlert('warning', dataSet.mensaje, dataSet.detalleMensaje);
				}
				
				util.currencyValidator();
				util.formatoMoneda();
			},
			statusCode: {
				404: function (a, b, c){
			        console.log("Error:", a, b, c);
					console.log("No encuentra reporte.");
					console.log(this.url);
				},
				500: function (a, b, c){
					console.log("xxxxxxxxxx");
			        console.log("Error:", a, b, c);
					console.log(this.url);
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		}));
	}
	
	var btnCargaTerceros = function() {
		$.ajax({
			url: "cargaTerceros/" + $('#idSiniestro').val(),
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				
				var columnas = [
					{ title: "Nombre", data: "nombre" },
					{ title: "RFC", data: "rfc" },
					{ title: "Telefono o celular", data: "telefono" },
					{ title: "Correo", data: "correo" }
				];

				if (dataSet.mensaje === 'OK') {
					tabla.iniciarTabla("#resultadoBusqueda", dataSet.dataExtra, columnas);
					$('.background-tabla').css('display', 'block');
				}
			},
			statusCode: {
				404: function () {
					console.log("No encuentra terceros.");
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var guardaTercero = function() {
		var model = { }

		//iterate over form elements   
		$.each($('input, select', "#fromTercero"), function (k, v) {
			if ($(this).attr("name") !== undefined && !$(this).attr("name").includes('resultadoBusqueda')) {
				model[$(this).attr("name")] = $(this).val();
			}
		});
		$.ajax({
			url: "guardaTercero/" + $('#idSiniestro').val(),
			type: "POST",
			data: JSON.stringify(model),
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				if (dataSet.mensaje === 'OK') {
					btnCargaTerceros();
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$('#fromTercero')[0].reset();
				}
			},
			statusCode: {
				404: function () {
					console.log("page not found");
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
				console.log(model);
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var btnCargaMovimientosEstimaciones = function() {
		
		$("#siniestroEstatus").val('');
		
		return($.ajax({
			url: $('#idSiniestro').val(),
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
//				console.log('MOVIMIENTOS -> ', dataSet.dataExtra)
				
				$('#idCobertura').empty();
				
				var select = document.getElementById("idCobertura");
				
				$.each( dataSet.dataExtra, function(k, v) {

					$('#idCobertura').html("")
					
//					console.log('Llena Combo Coberturas -> ', v.cobertura.ct10Descripcion)
					
					$('#idCobertura').append('<option id-cob="'+v.certificado.idCertificado+'" data-SA="'+ v.coberturaSA +'" tipo-cob="'+ v.cobertura.tipoCobertura.tipoCoberturaIdentificador +' "data-limite ="'+ v.limiteSA 
							                  +'" value="' + v.cobertura.cveCobertura + '">' + v.cobertura.ct10Descripcion + '</option>');
					
					$('#limiteSA').val(v.limiteSA)
					$('#siniestroEstatus').val(v['siniestroEstatus']);
					$('#beneficiario').val(v['beneficiario']);
					$('#contratante').val(v['contratante']);
					$('#deducibleCob').val(v['deducible']);
					$('#coaseguroCob').val(v['coaseguro']);
					$('#polMoneda').val(v['monedaPoliza']);
					$('#polMoneda').attr('cvemon',v['cveModena']);
					
					
				});
			
				var columnas = [
					{ title: "Cobertura",         data: "cobertura.ct10Descripcion" },
					{ title: "Estimacion",        data: "importe", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
					{ title: "Concepto",          data: "tipoConcepto" },
					{ title: "Ultimo movimiento", data: "fechaUltimoM" },
					{ title: "U. M. Captura",     data: "tipoUltimoM" },
					{ title: "U. M. Importe",     data: "importeUltimoM", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
					{ title: "Reserva ",          data: "reservaEstimacion", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) }
				];
				
				reiniciaMovimientoForm();
				
				if (dataSet.mensaje === 'OK') {
					tabla.iniciarTablaNoHeader("#resultadoBusqueda", dataSet.dataExtra, columnas, true);
					$('.background-tabla').css('display', 'block');
					
					var ramo = dataSet.dataExtra["0"].idRamo
					console.log('RAMO SINIESTRO -> ', ramo)
					
					tipoRamo = ramo
					tipoMovimietos(ramo)
					formaPago()
					tipoMoneda()
					
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
				} else {
					
					$('#idCobertura').empty();
					$('#formMovimiento')[0].reset();
					
					$.each( dataSet.dataExtra, function(k, v){
						var campo = $('[name=' + k + ']').addClass("is-invalid");
						$(campo).parent().append('<div class="invalid-tooltip">' + v + '</div>');
					});
					
					mensajes.modalAlert('warning', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("No encuentra terceros.");
				},
				500: function (a, b, c){
					console.log("xxxxxxxxxx");
			        console.log("Error:", a, b, c);
					console.log(this.url);
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		}));
	}
	
	var guardaMovimiento = function() {
		
		var tipoPago = $('#tipoMovimiento').find(':selected').attr("idmov")
		
		if($('#idSiniestro').val() == '') {
			mensajes.modalAlert('danger', 'ERROR', 'Numero de siniestro no puede ser vacio');
			return;
		}
		
		if(tipoPago === '1' || tipoPago === '4') {
			
			var importe = $('#importe').inputmask('unmaskedvalue');
			var proveedor = $('#nombreProveedor').val()
			var deducible = $('#deducible').inputmask('unmaskedvalue')
		    var coaseguro = $('#coaseguro').inputmask('unmaskedvalue')
		    var moneda = $('#tipoMoneda').find(':selected').attr("idmov")
		    var subTotal = $('#subTotal').inputmask('unmaskedvalue')
			
			if(importe <= 0) {
				return mensajes.modalAlert('danger', 'ERROR', 'Importe no valido.');
			}
			
			if(proveedor === ''){
				var campo = $('[name=' + nombreProveedor + ']').addClass("is-invalid");
				$(campo).parent().append('<div class="invalid-tooltip">' + v + '</div>');
				
				return mensajes.modalAlert('danger', 'ERROR', 'Debe asignar un proveedor');
			}
		}
		
		var formData = new FormData();
		var model = {};
		
		$.each($('input, select', "#formMovimiento"), function (k, v) {
			
			if ($(this).attr("name") !== undefined) {
			
				if (v.type === 'file') {
				
					if (v.files.length > 0) {
						
						for(i = 0; i<v.files.length; i++) {
							formData.append("documentos[]", v.files[i], v.files[i].name);
						}
					}
				} else {
					if($(this).hasClass("moneda")) {
						
						model[$(this).attr("name")] = $(this).inputmask('unmaskedvalue');
						
					} else if($(this).attr("name") === 'idCobertura') {
						
						model[$(this).attr("name")] = $(this).val().toUpperCase();
						model["tipoCobertura"]      = $(this).find(':selected').attr("tipo-cob");
						model["coberturaSA"]		= $(this).find(':selected').attr("data-sa");
						model["idCertificado"]		= $(this).find(':selected').attr("id-cob");
						
					}else if($(this).attr("name") === 'identGastos'){
//						console.log('Campo -> ', $(this).attr("name"),'-->', $(this).val())
						if($('#calculaIVA').prop('checked')){
							model["tipoIVA"] = $(this).val().toUpperCase();
						}else{
							model["tipoIVA"] = ''
						}
						
					}else {
//						console.log('Campo -> ', $(this).attr("name"),'-->', $(this).val())
						
						if($(this).val() !== null){
							
							if($(this).attr("name") === 'diasEjecucion' && $(this).val() === 'NaN'){

								model[$(this).attr("name")] = 1;
							
							}else{
								
								if($(this).attr("name") === 'limiteSA'){
									if($(this).val() === ''){
										
										model[$(this).attr("name")] = 0.00
										 
									}else{
										model[$(this).attr("name")] = $(this).val()
									}
									
								}else if($(this).attr("name") !== 'tipoConcepto'){
									
									model[$(this).attr("name")] = $(this).val().toUpperCase();
								
								}else if($(this).attr("id") === 'tipoConcepto' && ($(this).val() !== null && $(this).val() !== '')) {

									var idConcepto = $('#tipoConcepto').find(':selected').attr("idconceptos");
									
									model["tipoConcepto"] = $('#tipoConcepto').val().toUpperCase();
									model["idMovimiento"] = $('#tipoMovimiento').find(':selected').attr("idmov");
									model["idConceptos"] = idConcepto
									
									if(idConcepto === 3 || idConcepto === 4){
										
										if($('#subConcepto').val() !== null){
											model["subConcepto"] = $('#subConcepto').val().toUpperCase();
										}else{
											model["subConcepto"] = ''
										}
										
									}else{
										model["subConcepto"] = ''
									}
									
								} else if($(this).attr("id") === 'tipoConcepto2' && ($(this).val() !== null && $(this).val() !== '')) {
									
									model["tipoConcepto"] = $('#tipoConcepto2').val().toUpperCase();
									model["idMovimiento"] = $('#tipoMovimiento').find(':selected').attr("idmov");
									model["idConceptos"] = 0;
								} 
							}

						}else{
							model[$(this).attr("name")] = '';
						}
					}
				}
			}
		});
		
		model['tipoCambio'] = subTotal
		model['cveModena'] = moneda
		model['fisicoMoral']  = $("input[name=fisicoMoral]:checked").val();
		model['cveProveedor'] = idProveedor;
		model['idBeneficiario'] = idBeneficiario;
		formData.append("model", new Blob([JSON.stringify(model)], { type: 'application/json' }));
		
		console.log('Datos Siniestro -> ', model)
		
		$.ajax({
			url: "guarda",
			type: "POST",
			data: formData,
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			cache: false,
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				if (dataSet.mensaje === 'OK') {
					reiniciaMovimientoForm();
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					btnCargaMovimientosEstimaciones();
				} else {
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
					$.each( dataSet.dataExtra, function(k, v){
						var campo = $('[name=' + k + ']').addClass("is-invalid");
						$(campo).parent().append('<div class="invalid-tooltip">' + v + '</div>');
					});
				}
			},
			statusCode: {
				404: function () {
					console.log("page not found");
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
				console.log(model);
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	//privada
	var reiniciaMovimientoForm = function() {
		$('#fechaAplicacion').val('');
		$('#fechaFactura').val('');
		$('#nombreProveedor').val('');
		$('#rfcProveedor').val('');
		$('#facturaElectronica').val('');
		$('#folioFactura').val('');
		$('#clabe').val('');
		$('#servicio').val('');
		$('#fechaSolicitud').val('');
		$('#fechaFinaliza').val('');
		$('#diasEjecucion').val('');
		$('#servicioEstatus').val('');
		$('#tipoCambio').val('');
		$('#tipoConcepto').val('');
		$('#subConcepto').val('');
		$('#identGastos').val('');
		$('#importe').val('');
		$('#iva').val('');
		$('#isr').val('');
		$('#isrRetenido').val('');
		$('#ivaRetenido').val('');
		$('#total').val('');
		$('#deducible').val('0');
		$('#coaseguro').val('0');
	}
	
	var buscaMovimientosPorSiniestro = function () {

		var numSiniestro =  $('#txtBusca').val();
		
		if(numSiniestro === ''){
			return mensajes.modalAlert('warning', 'Información', 'Capturar Número de Poliza')
		}

		$.ajax({
			url: "consulta/" + numSiniestro,
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				console.log('CONSULTA MOVIMIENTOS SINIESTROS: ', dataSet.dataExtra)
				var columnas = [
					{ title: "Cobertura", data: "idCobertura.ct10Descripcion" },
					{ title: "Movimiento", data: "tipoMovimiento" },
					{ title: "Fecha captura", data: "fechaCaptura" },
					{ title: "Importe", data: "importe", render: $.fn.dataTable.render.number( ',', '.', 2, '$' )},
					{ title: "Total", data: "reservaEstimacion", render: $.fn.dataTable.render.number( ',', '.', 2, '$' )}
				];

				if (dataSet.mensaje === 'OK') {
					
					var nombre = 'Movimientos Siniestro ' + numSiniestro
					
					tabla.iniciarTablaExport("#resultadoBusqueda", dataSet.dataExtra, columnas, nombre, 'Siniestro: ' + numSiniestro);
					$('.background-tabla').css('display', 'block');
					
				} else {
					mensajes.modalAlert('warning', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("No encuentra movimientos.");
				},
				500: function (a, b, c){
					console.log("xxxxxxxxxx");
			        console.log("Error:", a, b, c);
					console.log(this.url);
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var buscaSinXPol = function () {
		$('#txtSinXFechaOcurridoDe').val('');
		$('#txtSinXFechaOcurridoHasta').val('');
		$('#txtNombreAsegurado').val('');
		
		var pol = $('#txtSinXPol').val();
		var ramo = $('#ramo').val();
		var endoso = $('#endoso').val();
		if (!(!isNaN(pol) && parseInt(Number(pol)) == pol && !isNaN(parseInt(pol, 10)))) {
			var campo2 = $('[name=txtSinXPol]').addClass("is-invalid");
			$(campo2).parent().append('<div class="invalid-tooltip">Dato no valido</div>');
			return;
		}
		$.ajax({
			url: "busqueda/"+ramo+"/"+$('#txtSinXPol').val()+"/"+$('#endoso').val(),
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				

				if (dataSet.mensaje === 'OK') {
					muestraTablaSiniestros( dataSet.dataExtra);
				} else {
					mensajes.modalAlert('warning', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("No encuentra movimientos.");
				},
				500: function (a, b, c){
					console.log("xxxxxxxxxx");
			        console.log("Error:", a, b, c);
					console.log(this.url);
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var muestraTablaSiniestros = function(registros) {
		var columnas = [
			{ title: "Siniestro", data: "numeroSiniestro" },
			{ title: "Poliza", data: "numeroPoliza" },
			{ title: "Certificado", data: "numeroEndoso" },
			{ title: "Fecha de siniestro", data: "fechaOcurrenciaSiniestro" },
			{ title: "Quien reporta", data: "quienNombre" },
			{ title: "Telefono", data: "quienTelefono" }
			];
		tabla.iniciarTabla("#resultadoBusqueda", registros, columnas);
		$('.background-tabla').css('display', 'block');
	}
	
	var buscaSinXFechaOcurrido = function () {
		$('#txtSinXPol').val('');
		var fechaHasta = '';
		if( $('#txtSinXFechaOcurridoHasta') !== undefined && $('#txtSinXFechaOcurridoHasta').val() !== undefined && $('#txtSinXFechaOcurridoHasta').val()!=='') {
			fechaHasta = "/"+$('#txtSinXFechaOcurridoHasta').val();
			if( $('#txtSinXFechaOcurridoDe') !== undefined && $('#txtSinXFechaOcurridoDe').val() !== undefined && $('#txtSinXFechaOcurridoDe').val()!=='') {
			}else{
				mensajes.modalAlert('warning', 'Fecha de inicio', 'Falta intervalo fecha de inicio.');
				return;
			}
		}
		
		$.ajax({
			url: "busqueda/fechaocurrido/" + $('#txtSinXFechaOcurridoDe').val()+fechaHasta,
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				if (dataSet.mensaje === 'OK') {
					muestraTablaSiniestros( dataSet.dataExtra);
				} else {
					mensajes.modalAlert('warning', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("No encuentra movimientos.");
				},
				500: function (a, b, c){
					console.log("xxxxxxxxxx");
			        console.log("Error:", a, b, c);
					console.log(this.url);
				},
				400: function (a, b, c){
					console.log("xxxxxxxxxx");
			        console.log("Error:", a, b, c);
					console.log(this.url);
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var btnReservaPendientePorSiniestro = function () {

		var numSiniestro  = $('#txtBusca').val()
		var radioSelected = $("input[name=tipoBusqueda]:checked").val();
		var fechaIni      = $('#fechaIni').val()
		var fechaFin      = $('#fechaFin').val()
		var url           = "pendiente/siniestro/" + numSiniestro + "/" + fechaIni + "/" +fechaFin
		
		if(radioSelected === 'S'){
			url = "pendiente/siniestro/" + numSiniestro
		}else{
			url = "pendiente/siniestro/" + fechaIni + "/" + fechaFin
		}
		
		
		if(radioSelected === 'S' && numSiniestro === ''){
			return mensajes.modalAlert('warning', 'Información', 'Capturar Numero de Siniestro')
		}
		
		if(radioSelected === 'F' && (fechaIni === '' || fechaFin === '')){
			return mensajes.modalAlert('warning', 'Información', 'Capturar Fechas de para el Reporte')
		}
		
		$.ajax({
			url: url,
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				
				console.log('Consulta Reserva Siniestro: ', dataSet.dataExtra)
				
				var columnas = [
					{ title: "Siniestro", data: "numeroSiniestro" },
					{ title: "Poliza", data: "numeroPoliza" },
					{ title: "Moneda", data: "moneda" },
					{ title: "Cobertura", data: "cobertura"},
					{ title: "Certificado", data: "certificado"},
					{ title: "Tio Mov.", data: "tipoMovimiento"},
					{ title: "Importe", data: "importe", render: $.fn.dataTable.render.number( ',', '.', 2) },
					{ title: "Estimacion", data: "estimacion", render: $.fn.dataTable.render.number( ',', '.', 2) },
					{ title: "Fecha Estimacion", data: "fechaEstimacion", defaultContent : ""},
					{ title: "Ajuste Mas", data: "ajusteMas", render: $.fn.dataTable.render.number( ',', '.', 2) },
					{ title: "Fecha Ajuste Mas", data: "fechaAjusteMas", defaultContent : ""},
					{ title: "Ajuste Menos", data: "ajusteMenos", render: $.fn.dataTable.render.number( ',', '.', 2) },
					{ title: "Fecha Ajuste Menos", data: "fechaAjusteMenos", defaultContent : ""},
					{ title: "Deducible", data: "deducible"},
					{ title: "Coaseguro", data: "coaseguro"},
					{ title: "Gastos Ajuste", data: "gastoAjuste"},
					{ title: "Fecha Gastos Ajuste", data: "fechaGastoAjuste", defaultContent : ""},
					{ title: "Pago", data: "pago",  render: $.fn.dataTable.render.number( ',', '.', 2) },
					{ title: "Fecha Pago", data: "fechaPago", defaultContent : ""},
					{ title: "Reserva", data: "reservaPendiente", defaultContent : ""}
				];

				if (dataSet.mensaje === 'OK') {
					
					var nombre = 'Reservas Siniestros'
					
				    tabla.iniciarTablaExport("#resultadoBusqueda", dataSet.dataExtra, columnas, nombre, 'Siniestro: ' + numSiniestro );
					$('.background-tabla').css('display', 'block');
					
				} else {
					mensajes.modalAlert('warning', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("No encuentra movimientos.");
				},
				500: function (a, b, c){
					console.log("xxxxxxxxxx");
			        console.log("Error:", a, b, c);
					console.log(this.url);
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var btnReservaPendientePorPoliza = function () {
		var pol = $('#txtPoliza').val();
		if (!(!isNaN(pol) && parseInt(Number(pol)) == pol && !isNaN(parseInt(pol, 10)))) {
			var campo2 = $('[name=txtPoliza]').addClass("is-invalid");
			$(campo2).parent().append('<div class="invalid-tooltip">Dato no valido</div>');
			return;
		}

		$.ajax({
			url: "pendiente/poliza/"+$('#txtPoliza').val(),
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				
				var columnas = [
					{ title: "Poliza", data: "poliza" },
					{ title: "Siniestro", data: "siniestro" },
					{ title: "Cobertura", data: "cobertura" },
					{ title: "Estimacion", data: "estimacion", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
					{ title: "Ajuste", data: "ajuste", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
					{ title: "Pago", data: "pago", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
					{ title: "Gasto", data: "gasto", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
					{ title: "Salvamento", data: "salvamento", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
					{ title: "Recupero", data: "recupero", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
					{ title: "Litigio", data: "litigio", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
					{ title: "Pendiente", data: "pendiente", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
					{ title: "Siniestralidad", data: "siniestralidad", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) }
				];

				if (dataSet.mensaje === 'OK') {
					tabla.iniciarTabla("#resultadoBusqueda", dataSet.dataExtra, columnas);
					$('.background-tabla').css('display', 'block');
				} else {
					mensajes.modalAlert('warning', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("No encuentra movimientos.");
				},
				500: function (a, b, c){
					console.log("xxxxxxxxxx");
			        console.log("Error:", a, b, c);
					console.log(this.url);
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var historialComentarios = function() {
		$.ajax({
			url: "comentarios/"+$('#noSiniestro').val(),
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				if (dataSet.mensaje === 'OK') {
				
					var columnas = [
						{ title: "Fecha", data: "fechaCaptura" },
						{ title: "Comentario", data: "comentario" }
					];

					$('#historialComentriosModal').modal({show:true, backdrop:'static'});
					tabla.iniciarTabla("#resultadoBusqueda", dataSet.dataExtra, columnas);
					$('.background-tabla').css('display', 'block');
				} else {
					mensajes.modalAlert('warning', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("No encuentra movimientos.");
				},
				500: function (a, b, c){
					console.log("xxxxxxxxxx");
			        console.log("Error:", a, b, c);
					console.log(this.url);
				},
				406: function (a, b, c){
					console.log("xxxxxxxxxx");
			        console.log("Error:", a, b, c);
					console.log(this.url);
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var autoCompletarProveedor = function(appendTo) {
		$(".proveedor").autocomplete({
			appendTo: $('#' + appendTo),
			minLength: 3,
			source : function(request, response) {
				$.ajax({
					url : 'busca/proveedor',
					dataType : 'json',
					type: "GET",
					data : {
						nombreRazon : request.term
					},
					success : function(data) {
						console.log('Busca Proveedor -> ', data);
						response($.map(data, function(v,i){
							if(v.fisicaMoral === 'M'){
							
								return {
									label: v.razonSocial,
									value: v.razonSocial,
									data : v
								};
							}else{
								return {
									label: v.nombreContacto,
									value: v.nombreContacto,
									data : v
								};
							}
						}));
					},
					statusCode: {
						404: function () {
							console.log("page not found");
						}
					},
					error: function (xhr, status, error) {
						var err = xhr.responseText;
						console.log(xhr);
					}
				});
			},
			select: function (event, ui) {
				if(ui.item.data.fisicaMoral==='M') {
					esPersonaMoral = 1;
//					$('#isrRetenidoBloque').hide();
//					$('#ivaRetenidoBloque').hide();
//					calculaImpuestosMoralYTotal();
				} else {
					esPersonaMoral = 0;
//					$('#isrRetenidoBloque').show();
//					$('#ivaRetenidoBloque').show();
//					calculaImpuestosYTotal();
				}
				$('.rfc').val('');
				$('.clabe').val('');
				$('.rfc').val(ui.item.data.rFC);
				$('.rfc').attr('disabled', true);
				$('.clabe').val(ui.item.data.cuentaClabe);
				$('.clabe').attr('disabled', true);
				$(this).val(ui.item.label);
				idProveedor = ui.item.data.id;
				return true;
		  }
		});
	}
	
	var autoCompletarBeneficiario = function(appendTo) {
		$(".proveedor").autocomplete({
			appendTo: $('#' + appendTo),
			minLength: 3,
			source : function(request, response) {
				$.ajax({
					url : 'busca/beneficiario',
					dataType : 'json',
					type: "GET",
					data : {nombre : request.term},
					success : function(data) {
						console.log('Busca Beneficiario -> ', data);
						
						response($.map(data, function(v,i){
							if(v.fisicoMoral === 2){
								return {
									label: v.denominacion,
									value: v.denominacion,
									data : v
								};
							}else{
								return {
									label: v.nombre + ' '+ v.apellidoPaterno + ' '+ v.apellidoMaterno,
									value: v.nombre + ' '+ v.apellidoPaterno + ' '+ v.apellidoMaterno,
									data : v
								};
							}
							
						}));
					},
					statusCode: {
						404: function () {
							console.log("page not found");
						}
					},
					error: function (xhr, status, error) {
						var err = xhr.responseText;
						console.log(xhr);
					}
				});
			},
			select: function (event, ui) {
				
				$('.rfc').val('');
				$('.clabe').val('');
				$('.rfc').val(ui.item.data.rfc);
				$('.rfc').attr('disabled', true);
				$('.clabe').val(ui.item.data.cuentaClabe);
				$('.clabe').attr('disabled', true);
				$(this).val(ui.item.label);
				idBeneficiario = ui.item.data.idBeneficiario;
				return true;
		  }
		});
	}
	
	var calculaImpuestosYTotal = function(){
		
		var importe = $('#importe').inputmask('unmaskedvalue')
	    var subTotal = $('#subTotal').inputmask('unmaskedvalue')
		var tipoIVA = $('#identGastos').find(':selected').attr("data-id")
		var tipoMov = $('#tipoMovimiento').find(':selected').attr("idmov")

		if( importe !== null && importe !== '' && importe !== '0.00') {

			var iva = 0.00;
			var ivaRetenido = 0.00;
			var isrRetenido = 0.00;
			var total = (importe*1);
			
			var checkIVA = $('#calculaIVA').prop('checked')
			var checkISR = $('#calculaISR').prop('checked')
			
			var coaseguro = $('#coaseguroCob').val()
			var deducible = $('#deducibleCob').inputmask('unmaskedvalue')
			
			if(tipoMov === '1'){
				
				if(deducible > 0){
					$('#deducible').val(deducible)
				}else{
					$('#deducible').val(0)
				}
				
				if(coaseguro > 0){
					
					coaseguro = ((subTotal - deducible) * (coaseguro/100))
					$('#coaseguro').val(coaseguro)
				}else{
					$('#coaseguro').val(0)
				}
				
				importe = ((subTotal - deducible) - coaseguro)
				$('#subTotal').val(importe)
				
				subTotal = $('#subTotal').inputmask('unmaskedvalue')
				
			}else{
				$('#deducible').val(0)
				$('#coaseguro').val(0)
			}
			
			if(checkIVA && tipoIVA === '0'){
				return mensajes.modalAlert('warning', 'Información', 'Es Necesario Elegir tipo de IVA');
			}
			
			if(checkIVA && tipoIVA === '1') {
				 iva = (importe*1)*0.16;
				 total = ((subTotal*1) + iva);
			}
			
			if(checkISR) {
				
				if(checkIVA && tipoIVA === '1'){
					 ivaRetenido = iva/3*2;	
				}
				 
				 isrRetenido = (subTotal*1)*0.1;
			}
			
			 total = ((subTotal*1) + iva) - ( isrRetenido + ivaRetenido ) ;
			
			$('#iva').val(iva.toFixed(2));
			$('#isrRetenido').val(isrRetenido.toFixed(2));
			$('#ivaRetenido').val(ivaRetenido.toFixed(2));
			$('#total').val(total.toFixed(2));
		}
	}
	
	var calculaImpuestosMoralYTotal = function(){
		
		var importe = $('#importe').inputmask('unmaskedvalue')
		
		if(importe !== null && importe !== '') {
			
			var iva = 0.00
			var total = 0.00
			
			if(document.getElementById("calculaIVA").checked == true) {
				
				 iva = (importe*1)*0.16;
				 total = ((importe*1) + iva);
				
			} else {
				
				 iva = (importe*0);
				 total = ((importe*1));
				
			}
			
			$('#iva').val(iva.toFixed(2));
			$('#total').val(total.toFixed(2));
		}
	}
	
	var cargaCatalogoEstatus = function() {
		$.ajax({
			url : util.getPath()+"/estatusC/catalogo/siniestro",
			method : "get",
			dataType : 'json',
			contentType : 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				$('#estatusSiniestro').html("");
				if (dataSet.mensaje === 'OK') {
					$.each(dataSet.dataExtra, function(i, v) {
						$('#estatusSiniestro').append('<option value="' + v.cveEstatus +'">' + v.ct2Descripcion + '</option>');
					});
					
					$('#estatusSiniestro').val(1);
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
	
	var btnSinPorNombreAsegurado = function() {
		$('#txtSinXPol').val('');
		var fechaHasta = '';
		$.ajax({
			url: "busqueda/asegurado/" + $('#txtNombreAsegurado').val(),
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				
				console.log('BUSQUEDA SINIESTRO ->')
				console.log(dataSet)
				
				if (dataSet.mensaje === 'OK') {
					muestraTablaSiniestros(dataSet.dataExtra);
				} else {
					mensajes.modalAlert('warning', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("No encuentra siniestros por nombre asegurado.");
				},
				500: function (a, b, c){
					console.log("xxxxxxxxxx");
			        console.log("Error:", a, b, c);
					console.log(this.url);
				},
				400: function (a, b, c){
					console.log("xxxxxxxxxx");
			        console.log("Error:", a, b, c);
					console.log(this.url);
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var validaFolioFactura = function() {
		$.ajax({
			url: "valida/"+ $('#folioFactura').val(),
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				if (dataSet.mensaje === 'OK') {
					if(dataSet.dataExtra==1) {
						mensajes.modalAlert('warning', "Folio repetido", "Factura ya ingreasada");
						$('#folioFactura').val('');
					}
				}
			},
			statusCode: {
				404: function () {
					console.log("No encuentra siniestros por nombre asegurado.");
				},
				500: function (a, b, c){
					console.log("xxxxxxxxxx");
			        console.log("Error:", a, b, c);
					console.log(this.url);
				},
				400: function (a, b, c){
					console.log("xxxxxxxxxx");
			        console.log("Error:", a, b, c);
					console.log(this.url);
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var generarSiniestroAP = function() {
		var formData = new FormData();
		//iterate over form elements   
		$.each($('input, select', "#formSiniestro"), function (k, v) {
			if ($(this).attr("name") !== undefined) {
				if (v.type === 'file') {
					if (v.files.length > 0) {
						for(i = 0; i<v.files.length; i++) {
							formData.append("documento", v.files[i], v.files[i].name);
						}
					}
				} 
			}
		});
		$.ajax({
			url: "carga/ap",
			method: "GET",
			data: formData,
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			cache: false,
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				if (dataSet.mensaje === 'OK') {
					muestraTablaSiniestros( dataSet.dataExtra);
				} else {
					mensajes.modalAlert('warning', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("xxxxxxxxxx");
			        console.log("Error:", a, b, c);
					console.log(this.url);
				},
				500: function (a, b, c){
					console.log("xxxxxxxxxx");
			        console.log("Error:", a, b, c);
					console.log(this.url);
				},
				400: function (a, b, c){
					console.log("xxxxxxxxxx");
			        console.log("Error:", a, b, c);
					console.log(this.url);
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var btnBusquedaPoliza = function () {
//		$('#estimacionesBloque').empty();
		$('#estatus').val("");
		$('#sucursal').val("");
		$('#agente').val("");
		$('#cliente').val("");
		$('#polizaVigencia').val("");
		$('#polizaBeneficiarioNombre').val("");
		$('#polizaContratanteNombre').val("");
		$('#polizaAseguradoNombre').val("");
		$('#endosoVigencia').val("")
		
		var pol =  $('#busquedaPoliza').val();
		var cert = $('#certificado').val();
		
		
		if(pol == "" || cert == "") {
			if(pol == "") {
				var campo = $('[name=busquedaPoliza]').addClass("is-invalid");
				$(campo).parent().append('<div class="invalid-tooltip">Falta poliza</div>');
			}
			if(cert == "") {
				var campo2 = $('[name=certificado]').addClass("is-invalid");
				$(campo2).parent().append('<div class="invalid-tooltip">Falta certificado</div>');
			}
			return;
		}
		
		if (!(!isNaN(pol) && parseInt(Number(pol)) == pol && !isNaN(parseInt(pol, 10)))) {
			var campo2 = $('[name=busquedaPoliza]').addClass("is-invalid");
			$(campo2).parent().append('<div class="invalid-tooltip">Dato no valido</div>');
			return;
		}
		
		if (!(!isNaN(cert) && parseInt(Number(cert)) == cert && !isNaN(parseInt(cert, 10)))) {
			var campo2 = $('[name=certificado]').addClass("is-invalid");
			$(campo2).parent().append('<div class="invalid-tooltip">Dato no valido</div>');
			return;
		}
		var grupo = 0;
		
		if($('#ramo').val()=== '1'){
			var aseg = $('#asegurados').find(':selected').attr("data-idaseg")
			var cert = $('#certificado').val()
			
			console.log('Asegurado -> ',aseg)
			console.log('Certificado -> ',cert)
			
				
				$("#asegurados > option[value='"+cert+"']").attr("selected",true);
				
				var idAseg = $('#asegurados').val()
				var grupo  = $('#asegurados').find(':selected').attr("data-grupo")
				var riesgo = $('#asegurados').find(':selected').attr("data-riesgo")
				var ocupacion = $('#asegurados').find(':selected').attr("data-ocup")
				var sexo = $('#asegurados').find(':selected').attr("data-sex") == 'F' ? 'Femenino' : 'Masculino'
				var nacimiento = $('#asegurados').find(':selected').attr("data-birth")
				
				$('#grupoAP').val(grupo +' - '+ riesgo)
				$('#sexo').val(sexo)
				$('#birthday').val(nacimiento)
				$('#certificado').val(idAseg)
				$('#ocupacion').val(ocupacion)
			
			grupo = $('#grupoAP').val();
		}

		document.getElementById("btnBusquedaPoliza").disabled = true;
	
		return ($.ajax({
			url: "poliza/buscarCertificado",
			dataType : 'json',
			method: "GET",
			data : {
				ramo : $('#ramo').val(),
				poliza : $('#busquedaPoliza').val(),
				grupoAP : grupo,
				certificado : $('#certificado').val()
			},
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				
				console.log('Busqueda Poliza -> ', dataSet);
				
				$('#validaPoliza').attr('disabled', false);
				if (dataSet.mensaje === 'OK') {
					
					$.each( dataSet.dataExtra, function(k, v){
						$('#' + k + ':text').val(v);
					});
					
					$('#sucursal').append(new Option(dataSet.dataExtra['sucursal'], dataSet.dataExtra['idSucursal']));
					
					if(dataSet.dataExtra['estatus']==='CANCELADO') {
						$('#validaPoliza').attr('disabled', true);
//						mensajes.modalAlert('warning', dataSet.mensaje, dataSet.detalleMensaje);
					}
					
				} else {
					mensajes.modalAlert('warning', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function (err) {
					console.log("No encuentra poliza.");
					console.log(err);
				}
			},
			complete: function(){
				util.loadingEnd();
				document.getElementById("btnBusquedaPoliza").disabled = false;
			}
		}));
		
	}
	
	var cargaCT19_7CausaSiniestro = function(ramo, causaSeleccionada) {
		$.ajax({
			url : util.getPath()+"/siniestro/catalogo/ct19_7",
			method : "get",
			dataType : 'json',
			contentType : 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				$('#causa').html("");
				if (dataSet.mensaje === 'OK') {
					console.log("->", ramo)
					$.each(dataSet.dataExtra, function(i, v) {
						if(v.ramo == ramo){
							$('#causa').append('<option value="' + v.id +'">' + v.clave +' - '+ v.causa + '</option>');
						}
					});
					
					if(causaSeleccionada !== null){
						$('#causa').val(causaSeleccionada);
					}
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
	
	var cargaCatalogoGastosAjuste = function() {
		$.ajax({
			url : util.getPath()+"/siniestros/catalogo/gastosAjuste",
			method : "get",
			dataType : 'json',
			contentType : 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				$('#estatusSiniestro').html("");
				if (dataSet.mensaje === 'OK') {
					$.each(dataSet.dataExtra, function(i, v) {
						$('#tipoGastoAjuste').append('<option value="' + v.cveEstatus +'">' + v.ct2Descripcion + '</option>');
					});
					
					$('#tipoGastoAjuste').val(1);
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
	
	/***********************************************/
	/***** METODO PARA CARGAR CATALOGO DE RAMOS ****/
	/***********************************************/
	var llenaCatalogoRamo = function(){
		
		$.ajax({
			
			url         : "captura/ramoCatalogo",
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
	
	var aseguradosAP = function(){
		
		var ramo   = $('#ramo').val()
		var poliza = $('#busquedaPoliza').val()
		
		if(ramo === '0'){
			return mensajes.modalAlert('warning','Información','Es necesario Seleccionar Ramo')
			$('.asegurados').html("");
			$('#certificado').html("");
		}
		
		if(poliza === ''){
			return mensajes.modalAlert('warning','Información','Es necesario Capturar Poliza')
			$('.asegurados').html("");
			$('#certificado').val('');
		}
		
		$.ajax({
			
			url         : "captura/aseguradosAp",
			type        : "GET",
			data        : {poliza: poliza, ramo:ramo},
			dataType    : "json",
			contentType : "application/json",
			beforeSend  : function(){
				util.loadingStart()
			},
			success : function(dataSet){
				console.log('ASEGURADOS: ', dataSet.dataExtra)
				
				if(dataSet.mensaje === 'OK'){
					$('.asegurados').html("");
					
					$('.asegurados').append('<option data-idaseg="0" value="0" selected disabled>Seleccione Asegurado...</option>');
					
					$.each(dataSet.dataExtra, function(i, v) {
						$('.asegurados').append('<option data-idGrupo = "'+v.grupo.idSoLGruposAP+'" data-idAseg = "'+ v.idAsegurado + '"data-birth = "'+v.fechaNacimiento+'" data-sex = "'+v.sexo+'" data-ocup = "'+v.grupo.ocupacion.descripcion+'"data-riesgo = "'+v.grupo.nivelRiesgo+'" data-grupo= "'+v.grupo.nombreGrupo+'" value="' + v.numAsegurado + '">'
								                  + v.nombreAsegurado + ' ' + v.apellidoPaternoAsegurado +' ' + v.apellidoMaternoAsegurado + '</option>');
					});
				}else{
					return mensajes.modalAlert('warning','Información', dataSet.detalleMensaje)
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
			
		});
		
	}
	
	/*****************************************************/
	/***** METODO PARA BUSCAR POLIZA Y CARGAR RAMOS ****/
	/*****************************************************/
	var polizaCoberturas = function(){
		
		$.when(btnBusquedaPoliza()).then(function(dataSet){
			console.log('Busca Poliza y Agega Coberturas ')
			if(dataSet.mensaje === 'OK' && dataSet.dataExtra.estatus !== "CANCELADO" ){
				btnCargaCoberturas()
			}else{
				mensajes.modalAlert('warning', dataSet.mensaje, dataSet.detalleMensaje);
			}
		});
		
	}
	
	/*****************************************************/
	/***** METODO PARA BUSCAR SINIESTRO Y CARGAR RAMO ****/
	/*****************************************************/
    var buscaSiniestro = function(){
		
		$.when(btnBusqueda()).then(function(dataSet){
			console.log('Busca Siniestro y Agrega Coberturas -> ', dataSet)
			if(dataSet.mensaje === 'OK'){
				
				var cobertura = dataSet.dataExtra.estimacionesModel[0].idCobertura.toString()
				var importe   = dataSet.dataExtra.estimacionesModel[0].importe
				
				$.when(btnCargaCoberturas()).then(function(){
					
					console.log('Cobertura -> ' + '"' + cobertura + '"')
					console.log('Importe   -> ' + importe)
					
					$(".lstCoberturas option[value='" + cobertura + "']").attr("selected", true);
					$('#cobertura4').val(importe)
				});
				
			}	
		});
		
	}
    
    /*****************************************************/
	/***** METODO PARA CARGAR CATALOGO TIPO MOVIMIENTOS **/
	/*****************************************************/
    var tipoMovimietos = function(ramo){
    	
       $.ajax({
    		
    		url : "movimientosSiniestro/"+ ramo,
			type        : "GET",
			dataType    : "json",
			contentType : "application/json",
			beforeSend  : function(){
				util.loadingStart()
			},
			success : function(dataSet){
				console.log('TIPO MOVIMIENTOS -> ', dataSet.dataExtra)
				console.log('Cobertura -> ', $('#idCobertura').find(':selected').text())
				
				if(dataSet.mensaje === 'OK'){
					var tipoCobertura = $('#idCobertura').find(':selected').text()
					$('#tipoMovimiento').html('')
					
					$('#tipoMovimiento').append('<option value="0" selected disabled>Seleccione Movimiento...</option>');
					
					$.each(dataSet.dataExtra, function(i, v) {
						
						if(tipoCobertura.toLowerCase().indexOf("muerte") >= 0 || tipoCobertura.toLowerCase().indexOf("incapacidad") >= 0
								|| tipoCobertura.toLowerCase().indexOf("invalidez") >= 0){
							
							if(v.idMovimiento == 2){
								$('#tipoMovimiento').append('<option disabled idMov="' + v.idMovimiento + '" value="' + v.descripcion + '">' + v.descripcion + '</option>');
							}else{
								$('#tipoMovimiento').append('<option idMov="' + v.idMovimiento + '" value="' + v.descripcion + '">' + v.descripcion + '</option>');
							}
							
						}else{
							$('#tipoMovimiento').append('<option idMov="' + v.idMovimiento + '" value="' + v.descripcion + '">' + v.descripcion + '</option>');
						}
						
					});
					
				}else{
					return mensajes.modalAlert('warning','Información', dataSet.detalleMensaje)
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
    	});
    }
    
    var tipoMoneda = function(ramo){
    	
        $.ajax({
     		
     		url : "moneda",
 			type        : "GET",
 			dataType    : "json",
 			contentType : "application/json",
 			beforeSend  : function(){
 				util.loadingStart()
 			},
 			success : function(dataSet){
 				console.log('TIPO moneda -> ', dataSet.dataExtra.moneda)
 				
 				if(dataSet.mensaje === 'OK'){
 					
 					$('#tipoMoneda').html('')
 					
 					$('#tipoMoneda').append('<option value="0" selected disabled>Seleccione Moneda...</option>');
 					
 					var monedaPol = $('#polMoneda').attr("cvemon")
 					
 					console.log('Moneda Poliza', monedaPol)
 					
 					$.each(dataSet.dataExtra.moneda, function(i, v) {
 						var tipoCambio = 0
 						tipoCambio = dataSet.dataExtra.cambio.ct4TipoCambio
 						if(monedaPol == '20'){

 							if(v.ct16CveMoneda === '20' || v.ct16CveMoneda === '10'){
 	 							
 	 							$('#tipoMoneda').append('<option cambio = "'+tipoCambio+'" idMov="' + v.ct16CveMoneda + '" value="' + v.ct16MonedaNombre + '">' + v.ct16MonedaNombre + '</option>');
 	 							
 	 						}
 							
 						}else{
 							if(v.ct16CveMoneda === '10'){
 	 										
 	 							$('#tipoMoneda').append('<option cambio = "'+tipoCambio+'" idMov="' + v.ct16CveMoneda + '" value="' + v.ct16MonedaNombre + '">' + v.ct16MonedaNombre + '</option>');
 	 							
 	 						}
 						}
 						
 						
 						
 							
 					});
 					
 				}else{
 					return mensajes.modalAlert('warning','Información', dataSet.detalleMensaje)
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
     	});
     }
    
    /***************************************************/
	/***** METODO PARA CARGAR CATALOGO CONCEPTOS *******/
	/***************************************************/
    var conceptoMovmimieto = function(tipoMov){
    	
    	$.ajax({
    		
    		url : "conceptoSiniestro/" + tipoRamo + "/" + tipoMov,
    		type        : "GET",
			dataType    : "json",
			contentType : "application/json",
			beforeSend  : function(){
				util.loadingStart()
			},
    		success : function(dataSet){
    			
    			console.log('Conceptosa -> ',dataSet.dataExtra)
    			
    			if(dataSet.mensaje === 'OK'){
    				$('#tipoConcepto').html('')
    				$('#subConcepto').html('')
    				
    				$('#tipoConcepto').append('<option value="0" selected disabled>Seleccione Concepto...</option>');
    				$('#subConcepto').append('<option value="0" selected disabled>Seleccione Sub Concepto...</option>');
    				
    				$.each(dataSet.dataExtra, function(k, v){
    					
    					if(v.idConceptos === 3 || v.idConceptos === 4){
    						$('#subConcepto').append('<option idConceptos="'+v.idConceptos+'" value="'+v.concepto +'">'+v.concepto+'</option>');
    					}else{
    						$('#tipoConcepto').append('<option idConceptos="'+v.idConceptos+'" value="'+v.concepto +'">'+v.concepto+'</option>');
    					}
    					
    				});
    				
    			}else{
    				return mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje)
    				$('#tipoConcepto').html('')
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
    		
    	});
    }
	
    /********************************************/
	/***** METODO PARA CARGAR FORMAS PAGO *******/
	/********************************************/
    var formaPago = function(){
    	
    	$.ajax({
    		url : "formaPagosSini",
    		type : "GET",
    		dataType    : "json",
    		contentType : "application/json",
    		beforeSend  : function(){
    			util.loadingStart()
    		},
    		success : function(dataSet){
    			
    			if(dataSet.mensaje === 'OK'){
    				
    				$('#tipoPago').html('')
    				$('#tipoPago').append('<option value="0" selected disabled>Seleccione Tipo Pago...</option>')
    				
    				$.each(dataSet.dataExtra, function(k, v){
    					
    					$('#tipoPago').append('<option value="'+ v.ct18Descripcion +'">'+ v.ct18Descripcion +'</option>')
    					
    				});
    				
    			}else{
    				return mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje)
    			}
    		}
    	});
    	
    }
    
    var reporteSiniestroPagos = function () {

		var fechaIni      = $('#fechaIni').val()
		var fechaFin      = $('#fechaFin').val()
		var tipoReporte   = String($('#tipoReporte').val())
		var url           = "reporte/"+ tipoReporte +"/" + fechaIni + "/" + fechaFin
		
		if(fechaIni === '' || fechaFin === ''){
			return mensajes.modalAlert('warning', 'Información', 'Capturar fecha del Reporte')
		}
		
		console.log('Ruta Siniestro -> ', url)
		console.log('Tipo Reporte -> '  , tipoReporte)
		$.ajax({
			url: url,
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				
				console.log('Consulta Siniestro Pagos: ', dataSet.dataExtra)
				var columnas = []
			
			if(tipoReporte === '2'){	
				columnas = [
					{ title: "Ramo", data: "ramo" },
					{ title: "Sub Ramo", data: "subRamo", defaultContent : "" },
					{ title: "Siniestro", data: "numSiniestro" },
					{ title: "Moneda", data: "moneda", defaultContent : ""},
					{ title: "Descripcion", data: "descripcion", defaultContent : "" },
					{ title: "Poliza", data: "numPoliza", defaultContent : "" },
					{ title: "Inicio Vigencia", data: "inicioVig" },
					{ title: "Inicio Vigencia", data: "finVigencia" },
					{ title: "Grupo", data: "grupo" },
					{ title: "Endoso", data: "endoso"},
					{ title: "Certificado", data: "certificado"},
					{ title: "Fecha Ocurrido", data: "fechOcurrido"},
					{ title: "Fecha Reclamo", data: "fechReclamo" },
					{ title: "Fecha Registro", data: "fechRegistro" },
					{ title: "Edo Siniestro", data: "edoSiniestro"},
					{ title: "Estatus Siniestro", data: "estatusSini", defaultContent : ""},
					{ title: "Tipo Pago", data: "tipoPagoSini"},
					{ title: "Frecuencia Pago", data: "polFrecPago", defaultContent : ""},
					{ title: "Estatus Cert.", data: "estatusCert"},
					{ title: "Año Poliza", data: "anioPoliza", defaultContent : ""},
					{ title: "Suma Asegurada", data: "sumaAsegPol"},
					{ title: "Contratante", data: "contratante"},
					{ title: "Proveedor", data: "proveedor"},
					{ title: "Rfc", data: "rfcProv", defaultContent : ""},
					{ title: "Causa Siniestro", data: "causaSini"},
					{ title: "Tipo Movimiento", data: "tipoMov", defaultContent : ""},
					{ title: "Concepto", data: "concepto", defaultContent : ""},
					{ title: "Deducible", data: "deducible", render: $.fn.dataTable.render.number(',', '.', 2) },
					{ title: "Coaseguro", data: "coaseguro", render: $.fn.dataTable.render.number(',', '.', 2) },
					{ title: "Importe", data:  "importe", render: $.fn.dataTable.render.number(',', '.', 2) },
					{ title: "IVA", data: "iva", render: $.fn.dataTable.render.number(',', '.', 2) },
					{ title: "Tipo IVA", data: "tipoIva", defaultContent : ""},
					{ title: "IVA Retenido", data: "ivaRet",render: $.fn.dataTable.render.number(',', '.', 2) },
					{ title: "ISR Retenido", data: "isrRetenido", render: $.fn.dataTable.render.number(',', '.', 2) },
					{ title: "Total", data: "total", render: $.fn.dataTable.render.number(',', '.', 2) },
					{ title: "Tipo Pago", data: "tipoPagoMov", defaultContent : ""},
					{ title: "Fecha Solicitud", data: "fechaSolic", defaultContent : ""},
					{ title: "Folio Pago", data: "folioPago", defaultContent : ""},
					{ title: "Orden Pago", data: "ordenPago", defaultContent : ""},
					{ title: "Fecha Pago", data: "fechaPago", defaultContent : ""},
					{ title: "Usuario Captura", data: "usuarioCaptura", defaultContent : ""},
					{ title: "Estatus CxP", data: "estatusCxP", defaultContent : ""},
					{ title: "Reaseg 1", data: "reaseg1", defaultContent : ""},
					{ title: "Porcentaje 1", data: "porc1", defaultContent : ""},
					{ title: "Importe 1", data: "importe1", render: $.fn.dataTable.render.number(',', '.', 2)},
					{ title: "Reaseg 2", data: "reaseg2", defaultContent : ""},
					{ title: "Porcentaje 2", data: "porc2", defaultContent : ""},
					{ title: "Importe 2", data: "importe2", render: $.fn.dataTable.render.number(',', '.', 2)},
					{ title: "Reaseg 3", data: "reaseg3", defaultContent : ""},
					{ title: "Porcentaje 3", data: "porc3", defaultContent : ""},
					{ title: "Importe 3", data: "importe3", render: $.fn.dataTable.render.number(',', '.', 2)}
				];
			}else if(tipoReporte === '3'){
				columnas = [
					{ title: "Ramo", data: "ramo" },
					{ title: "Sub Ramo", data: "subRamo", defaultContent : "" },
					{ title: "Siniestro", data: "numSiniestro" },
					{ title: "Moneda", data: "moneda", defaultContent : ""},
					{ title: "Descripcion", data: "descripcion", defaultContent : "" },
					{ title: "Poliza", data: "numPoliza", defaultContent : "" },
					{ title: "Certificado", data: "certificado"},
					{ title: "Suma Asegurada", data: "sumaAsegCob"},
					{ title: "Contratante", data: "contratante"},
					{ title: "Fecha Ocurrido", data: "fechOcurrido"},
					{ title: "Fecha Reclamo", data: "fechReclamo" },
					{ title: "Fecha Registro", data: "fechRegistro" },
					{ title: "Causa Siniestro", data: "causaSini"},
					{ title: "Tipo Movimiento", data: "tipoMov", defaultContent : ""},
					{ title: "Concepto", data: "concepto", defaultContent : ""},
					{ title: "Sub Concepto", data: "subConcepto", defaultContent : ""},
					{ title: "Proveedor", data: "proveedor"},
					{ title: "Rfc", data: "rfcProv", defaultContent : ""},
					{ title: "Deducible", data: "deducible", render: $.fn.dataTable.render.number(',', '.', 2) },
					{ title: "Coaseguro", data: "coaseguro", render: $.fn.dataTable.render.number(',', '.', 2) },
					{ title: "Importe", data:  "importe", render: $.fn.dataTable.render.number(',', '.', 2) },
					{ title: "IVA", data: "iva", render: $.fn.dataTable.render.number(',', '.', 2) },
					{ title: "Tipo IVA", data: "tipoIva", defaultContent : ""},
					{ title: "IVA Retenido", data: "ivaRet",render: $.fn.dataTable.render.number(',', '.', 2) },
					{ title: "ISR Retenido", data: "isrRetenido", render: $.fn.dataTable.render.number(',', '.', 2) },
					{ title: "Total", data: "total", render: $.fn.dataTable.render.number(',', '.', 2) },
					{ title: "Estatus CxP", data: "estatusCxP", defaultContent : ""},
				]
				
			}else if(tipoReporte === '4'){
				columnas = [
					{ title: "Ramo", data: "ramo" },
					{ title: "Sub Ramo", data: "subRamo", defaultContent : "" },
					{ title: "Movimiento", data: "movimiento", defaultContent : "" },
					{ title: "Siniestro", data: "numSiniestro" },
					{ title: "Moneda", data: "moneda", defaultContent : ""},
					{ title: "Descripcion", data: "descripcion", defaultContent : "" },
					{ title: "Poliza", data: "numPoliza", defaultContent : "" },
					{ title: "Sexo", data: "sexo", defaultContent : "" },
					{ title: "Estatus Poliza", data: "estatusPol", defaultContent : "" },
					{ title: "Grupo", data: "grupo" },
					{ title: "Endoso", data: "endoso"},
					{ title: "Certificado", data: "certificado"},
					{ title: "Estatus Cert.", data: "estatusCert"},
					{ title: "Año Poliza", data: "anioPoliza", defaultContent : ""},
					{ title: "Suma Asegurada", data: "sumaAsegCob"},
					{ title: "Contratante", data: "contratante"},
					{ title: "Fecha Nacimiento", data: "fechNacimiento" },
					{ title: "Edo Siniestro", data: "estado"},
					{ title: "Fecha Ocurrido", data: "fechOcurrido"},
					{ title: "Fecha Reclamo", data: "fechReclamo" },
					{ title: "Fecha Registro", data: "fechRegistro" },
					{ title: "Causa Siniestro", data: "causaSini"},
					{ title: "Estatus Siniestro", data: "estatus", defaultContent : ""},
					{ title: "Reserva", data:  "reserva", render: $.fn.dataTable.render.number(',', '.', 2) },
					{ title: "Monto Pagado", data: "montoPagado", render: $.fn.dataTable.render.number(',', '.', 2) },
					{ title: "Deducible", data: "deducible", render: $.fn.dataTable.render.number(',', '.', 2) },
					{ title: "Coaseguro", data: "coaseguro", render: $.fn.dataTable.render.number(',', '.', 2) },
					{ title: "Total", data: "total", render: $.fn.dataTable.render.number(',', '.', 2) },
					{ title: "Reaseg 1", data: "reaseg1", defaultContent : ""},
					{ title: "Porcentaje 1", data: "porc1", defaultContent : ""},
					{ title: "Importe 1", data: "importe1", render: $.fn.dataTable.render.number(',', '.', 2)},
					{ title: "Reaseg 2", data: "reaseg2", defaultContent : ""},
					{ title: "Porcentaje 2", data: "porc2", defaultContent : ""},
					{ title: "Importe 2", data: "importe2", render: $.fn.dataTable.render.number(',', '.', 2)},
					{ title: "Reaseg 3", data: "reaseg3", defaultContent : ""},
					{ title: "Porcentaje 3", data: "porc3", defaultContent : ""},
					{ title: "Importe 3", data: "importe3", render: $.fn.dataTable.render.number(',', '.', 2)}
				]
				
			}else  if(tipoReporte == '5'){
				columnas = [
					{ title: "Ramo", data: "ramo" },
					{ title: "Sub Ramo", data: "subRamo", defaultContent : "" },
					{ title: "Siniestro", data: "numSiniestro" },
					{ title: "Poliza", data: "numPoliza", defaultContent : "" },
					{ title: "Moneda", data: "moneda", defaultContent : ""},
					{ title: "Descripcion", data: "descripcion", defaultContent : "" },
					{ title: "Certificado", data: "certificado"},
					{ title: "Asegurado", data: "asegurado"},
					{ title: "Movimiento", data: "movimiento", defaultContent : "" },
					{ title: "Fecha Registro", data: "fechRegistro" },
					{ title: "Importe", data:  "importe", render: $.fn.dataTable.render.number(',', '.', 2) },
					{ title: "IVA", data: "iva", render: $.fn.dataTable.render.number(',', '.', 2) },
					{ title: "Tipo IVA", data: "tipoIva", defaultContent : ""},
					{ title: "IVA Retenido", data: "ivaRet",render: $.fn.dataTable.render.number(',', '.', 2) },
					{ title: "ISR Retenido", data: "isrRetenido", render: $.fn.dataTable.render.number(',', '.', 2) },
					{ title: "Total", data: "total", render: $.fn.dataTable.render.number(',', '.', 2) },
					{ title: "Tipo Pago", data: "tipoPago" },
					{ title: "Fecha Pago", data: "fechaPago" },
					{ title: "Proveedor", data: "proveedor", defaultContent : "" },
					{ title: "RFC", data: "rfcProv", defaultContent : "" },
					{ title: "Concepto", data: "tipoConcepto"},
					{ title: "Fecha Captura", data: "fechaCaptura"},
					{ title: "Folio Pago", data: "folioPago", defaultContent : ""},
					{ title: "Orden Pago", data: "ordenPago", defaultContent : ""},
					{ title: "Estatus CxP", data: "estatusCxP", defaultContent : ""},
					{ title: "Usuario Captura", data: "usuarioCaptura", defaultContent : ""}
				
				]
			}else  if(tipoReporte == '6'){
				columnas = [
					{ title: "Siniestro", data: "numSiniestro" },
					{ title: "Poliza", data: "numPoliza", defaultContent : "" },
					{ title: "Certificado", data: "certificado"},
					{ title: "Asegurado", data: "asegurado"},
					{ title: "Inicio Vigencia", data: "iniVigencia", defaultContent : ""},
					{ title: "Fin Vigencia", data: "finVigencia", defaultContent : "" },
					{ title: "Fecha Nacimiento", data: "fechNacimiento", defaultContent : "" },
					{ title: "Sexo", data: "sexo" },
					{ title: "Entidad Contratante", data:  "entidadContratante"},
					{ title: "Entidad Siniestro", data: "edoSini", render: $.fn.dataTable.render.number(',', '.', 2)},
					{ title: "Moneda", data: "moneda", defaultContent : ""},
					{ title: "Cobertura", data: "cobertura"},
					{ title: "Suma Asegurada", data: "sumaAsegCob", render: $.fn.dataTable.render.number(',', '.', 2)},
					{ title: "Fecha Ocurrencia", data: "fechOcurr"},
					{ title: "Fecha Reclamacion", data: "fechReclamacion" },
					{ title: "Monto Siniestro Ocurrido", data: "montoOcurr", render: $.fn.dataTable.render.number(',', '.', 2)},
					{ title: "Monto Siniestro Reclamado", data: "montoSiniestros", render: $.fn.dataTable.render.number(',', '.', 2)}
					
				]
			}else  if(tipoReporte == '7'){
				columnas = [
					{ title: "Siniestro", data: "numSiniestro" },
					{ title: "Poliza", data: "numPoliza", defaultContent : "" },
					{ title: "Inicio Vigencia", data: "inicioVig"},
					{ title: "Fin Vigencia", data: "finVigencia"},
					{ title: "Centro Responsabilidad", data: "cers", defaultContent : "" },
					{ title: "Ramo", data: "ramo" },
					{ title: "Moneda", data:  "moneda"},
					{ title: "Reserva Inicial", data: "reservaIni", render: $.fn.dataTable.render.number(',', '.', 2)},
					{ title: "Estimacion Periodo", data: "estimacion", defaultContent : ""},
					{ title: "Ajuste(+)", data: "ajusteMas"},
					{ title: "Ajuste(-)", data: "ajusteMenos", render: $.fn.dataTable.render.number(',', '.', 2)},
					{ title: "Pagos Periodo", data: "pagosPeriodo"},
					{ title: "Reserva Final", data: "reservaFinal" },
					
				]
			}else  if(tipoReporte == '8'){
				columnas = [
					{ title: "Siniestro", data: "numSiniestro" },
					{ title: "Fecha Ocurrido", data: "numPoliza", defaultContent : "" },
					{ title: "Fecha Reporte", data: "fechReporte", defaultContent : "" },
					{ title: "Fecha Captura", data: "fechCaptura", defaultContent : "" },
					{ title: "Ramo", data: "ramo" },
					{ title: "Moneda", data:  "moneda"},
					{ title: "Estimacion", data: "estimacion", render: $.fn.dataTable.render.number(',', '.', 2)},
					{ title: "Ajuste(+)", data: "ajusteMas", render: $.fn.dataTable.render.number(',', '.', 2)},
					{ title: "Ajuste(-)", data: "ajusteMenos", render: $.fn.dataTable.render.number(',', '.', 2)},
					{ title: "Pagos", data: "pagos"},
					{ title: "Reserva Pendiente", data: "reservaPend"},
					{ title: "Gastos de Ajuste", data: "gastosAjustes", defaultContent : "" },
					{ title: "Salvamentos", data: "salvamentos", render: $.fn.dataTable.render.number(',', '.', 2)},
					{ title: "Reaseguro", data: "reaseguro"},
					{ title: "Observaciones", data: "observaciones" },
					
				]
			} else  if(tipoReporte == '9'){
				columnas = [
					{ title: "Ramo", data: "ramo" },
					{ title: "Numero Poliza", data: "numPoliza", defaultContent : "" },
					{ title: "Fecha Emision", data: "fechaEmi", defaultContent : "" },
					{ title: "Inicio Vigencia", data: "fechainiVig", defaultContent : "" },
					{ title: "Fin Vigencia", data: "fechaFinVig", defaultContent : ""  },
					{ title: "Contratante", data:  "contratante", defaultContent : "" },
					{ title: "Asegurado", data: "asegurado", defaultContent : "" },
					{ title: "Frecuencia Pago", data: "frecPago", defaultContent : "" },
					{ title: "Inicio Vigencia", data: "recIniVig", defaultContent : "" },
					{ title: "Fin Vigencia", data: "recFinVig", defaultContent : "" },
					{ title: "Fecha Pago", data: "recFechPago", defaultContent : "" },
					{ title: "Pago Recibo", data: "recPago", render: $.fn.dataTable.render.number(',', '.', 2)},
					{ title: "Numero Siniestro", data: "numSiniestro", defaultContent : "" },
					{ title: "Fecha Ocurrido", data: "fecOcurrido", defaultContent : "" },
					{ title: "Total Siniestro", data: "totalSiniestro",render: $.fn.dataTable.render.number(',', '.', 2) },
					
				]
			}
			
				if (dataSet.mensaje === 'OK') {
					var nombre = ''
					
						if(tipoReporte === '2'){
							nombre  = 'Siniestros Pagados'
							nombre2 = 'Periodo: ' + fechaIni +' / '+fechaFin
						}else if(tipoReporte === '3'){
							nombre  = 'Siniestros Pendientes Pagos'
							nombre2 = 'Periodo: ' + fechaIni +' / '+fechaFin
						}else if(tipoReporte === '4'){
							nombre  = 'Siniestros Ocurridos'
							nombre2 = 'Periodo: ' + fechaIni +' / '+fechaFin
						}else if(tipoReporte === '5'){
							nombre  = 'Gastos de Ajuste'
								nombre2 = 'Periodo: ' + fechaIni +' / '+fechaFin
						}else if(tipoReporte === '6'){
							nombre  = 'Reporte Estadistico'
								nombre2 = 'Periodo: ' + fechaIni +' / '+fechaFin
						}else if(tipoReporte === '7'){
							nombre  = 'Reserva Para Obligaciones Pendiente de Cumplir por Siniestro Ocurrido'
								nombre2 = 'Periodo: ' + fechaIni +' / '+fechaFin
						}else if(tipoReporte === '8'){
							nombre  = 'Relacion de Siniestros Ocurridos y Reserva Pendiente'
								nombre2 = 'Periodo: ' + fechaIni +' / '+fechaFin
						}else if(tipoReporte === '9'){
							nombre  = 'Base de Siniestros Auditoria SAT'
								nombre2 = 'Periodo: ' + fechaIni +' / '+fechaFin
						}
							
						
					    tabla.iniciarTablaExport("#resultadoBusqueda", dataSet.dataExtra, columnas, nombre, nombre2);
					    $('.background-tabla').css('display', 'block');
					
				} else {
					mensajes.modalAlert('warning', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("No encuentra movimientos.");
				},
				500: function (a, b, c){
					console.log("xxxxxxxxxx");
			        console.log("Error:", a, b, c);
					console.log(this.url);
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
    
    /*** REPORTE TRAZABILIDAD DAÑOS Y AP ***/
	var movimientosSiniestros = function(){
		
		var siniestro = $('#txtBusca').val()
		
		if(siniestro === ''){
			return mensajes.modalAlert('warning', 'Información', 'Es Necesario Capturar Numero de Siniestro');
		}
		
		
	$.ajax({
		url         : "excelMov/"+ siniestro,
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
				    window.navigator.msSaveOrOpenBlob(blob, "Movimientos Siniestro-" + siniestro + ".xlsx");
				} else {
				    var a = window.document.createElement("a");
				  
				    a.href = window.URL.createObjectURL(blob, { type: "application/vnd.ms-excel" });
				    a.download = 'Movimientos' + '-' + siniestro + ".xlsx";
				   
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
		guardarSiniestro                : guardarSiniestro,
		btnBusqueda                     : btnBusqueda,
		btnCargaCoberturas              : btnCargaCoberturas,
		btnCargaTerceros                : btnCargaTerceros,
		guardaTercero                   : guardaTercero,
		btnCargaMovimientosEstimaciones : btnCargaMovimientosEstimaciones,
		guardaMovimiento                : guardaMovimiento,
		buscaMovimientosPorSiniestro    : buscaMovimientosPorSiniestro,
		buscaSinXPol                    : buscaSinXPol,
		buscaSinXFechaOcurrido          : buscaSinXFechaOcurrido,
		archivosSiniestros              : archivosSiniestros,
		btnReservaPendientePorSiniestro : btnReservaPendientePorSiniestro,
		btnReservaPendientePorPoliza    : btnReservaPendientePorPoliza,
		historialComentarios            : historialComentarios,
		autoCompletarProveedor          : autoCompletarProveedor,
		calculaImpuestosYTotal          : calculaImpuestosYTotal,
		cargaCatalogoEstatus            : cargaCatalogoEstatus,
		btnSinPorNombreAsegurado        : btnSinPorNombreAsegurado,
		validaFolioFactura              : validaFolioFactura,
		generarSiniestroAP              : generarSiniestroAP,
		btnBusquedaPoliza               : btnBusquedaPoliza,
		cargaCT19_7CausaSiniestro       : cargaCT19_7CausaSiniestro,
		cargaCatalogoGastosAjuste       : cargaCatalogoGastosAjuste,
		llenaCatalogoRamo               : llenaCatalogoRamo,
		aseguradosAP                    : aseguradosAP,
		polizaCoberturas                : polizaCoberturas,
		buscaSiniestro                  : buscaSiniestro,
		formaPago                       : formaPago,
		tipoMovimietos                  : tipoMovimietos,
		conceptoMovmimieto              : conceptoMovmimieto,
		autoCompletarBeneficiario       : autoCompletarBeneficiario,
		reporteSiniestroPagos           : reporteSiniestroPagos,
		movimientosSiniestros           : movimientosSiniestros,
		tipoMoneda                      : tipoMoneda
	}
})();