var clientesC = (function () {
	var numeroCliente;
	var btnEditCliente = "btnEditCliente";
	var btnDetalleQeQ  = "btnDetalleQeQ";
	var documentosCargados = 0;
	var consecutivoCliente = 0;
	var clienteAutorizacion  = 0;
	
	var autorizacionOficial = '<span data-container="body" class="oficialAutorizacion" data-toggle="popover" title="Autorización"' +
		'data-placement="left">' +
		'<i class="fas fa-check-circle" style="color: rgb(39, 103, 166) !important;" title="Realizar autorización"></i>' +
		 '</span>';
	
	var guardarCliente = function (formulario, tipoClienteRadio) {
		
		var formData = new FormData();
		var tipoCliente = $('input[name="' + tipoClienteRadio + '"]:checked').val();
		var clienteModel = { fisico: tipoCliente, idCliente : numeroCliente, numeroCliente : consecutivoCliente }
		
		var errorDocumentos = [];

		$.each($('input, select', (formulario)), function (k, v) {
			var filename = $(this).attr("id");
			if (v.type === 'file') {
				if (v.files.length > 0) {
					formData.append("documentos[]", v.files[0], filename);
				}
			} else {
				if ($(this).attr("name") !== undefined) {
					if($(this).hasClass("moneda")){
						clienteModel[$(this).attr("name")] = $(this).inputmask('unmaskedvalue');
					}else{
						clienteModel[$(this).attr("name")] = $(this).val();
					}
				}
			}
		});
		
		/*if( ($.trim($('.firmaElectronicaAvanzada').val()) != '') &&  $('#_firmaElectronicaAvanzada').val() == ''){
			mensajes.modalAlert('danger', "Error", "Documento Firma Electrónica Avanzada es requerido");
			return;
		}*/
		
		formData.append("clienteModel", new Blob([JSON.stringify(clienteModel)], { type: 'application/json' }));
		formData.append("numeroDocumentos", new Blob([JSON.stringify(documentosCargados)], { type: 'application/json' }));

		if(errorDocumentos.length == 0){
			$.ajax({
				url: "clientesC/guardarCliente",
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
						var extras = "";
						if(dataSet.dataExtra != null){
							$.each( dataSet.dataExtra, function(k, v){
								switch (k) {
								case "_entrevistaCliente":
									k = "Entrevista con el Cliente";
									break;
									
								case "_curp":
									k = "CURP";
									break;
									
								case "_calidadMigratoria":
									k = "Acred. Calidad Migratoria";
									break;
									
								case "_formatoClientes":
									k = "Formato id Clientes";
									break;
									
								case "_identificacionOficial":
									k = "Identificacion Oficial";
									break;
									
								case "_comprobanteDomicilio":
									k = "Comprobante de Domicilio";
									break;
									
								case "_rfc":
									k = "RFC";
									break;
									
								case "_validacionListaNegra":
									k = "Resultado de validación de listas negras";
									break;
									
								case "_firmaElectronicaAvanzada":
									k = "Firma Electrónica Avanzada";
									break;

								default:
									break;
								}
								extras += "<br/>" + k + " : " + v;
							});
						}
						dataSet.detalleMensaje += extras;
						mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
						
						if(formulario === "#formClienteEditar"){
							if($('#busquedaNombreCliente').val().trim() !== ""){
								buscarPorNombre();
							}else if($('#busquedaRfc').val()){
								buscarPorRFC();
							}else if($('#busquedaRazonSocial').val()){
								buscarPorRazonSocial();
							}else if($('#busquedaGiroMercantil').val()){
								buscarPorGiro();
							}
							$('#editarClienteModal').modal('hide');
						}
						
						$(formulario)[0].reset();
						numeroCliente = null;
						documentosCargados = 0;
					} else {
						mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
						$.each( dataSet.dataExtra, function(k, v){
							var campo = $(formulario + ' [name=' + k + ']').addClass("is-invalid");
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
				},
				complete: function(){
					util.loadingEnd();
				}
			});
		}else{
			mensajes.modalAlert('danger', 'ERROR', 'Existen campos vacíos');
		}
	}

	var buscarPorNombre = function(){
		$.ajax({
			url: "clientesC/buscarCliente/nombre/" + $('#busquedaNombreCliente').val(),
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				var $perm = dataSet.dataExtra.permisos;
				var columnas = [
					{ title: "ID", data: "numeroCliente" },
					{ title: "Promotoría/Promotor", data: "nombreCliente" },
					{ title: "Apellido Paterno", data: "apellidoPaterno" },
					{ title: "Apellido Materno", data: "apellidoMaterno" },
					{ title: "RFC", data: "rfc" },
					{ title: "Estatus", data: "estatus"},
					{ title: "Acciones", orderable: false, data: "oficialCumplimientoAutorizacion", render: function(data, type, row, index){
						var $botones = "<span data-toggle='collapse' class='" + btnEditCliente + " mr-2'><i class='fas fa-edit' title='Editar'></i></span>";
					
						if($perm.indexOf("oficialCumplimiento") != -1 ){
							$botones += autorizacionOficial;
						}
						
						return  $botones;
					}},
					{
						title: "", data: null,
						defaultContent: "<span data-toggle='collapse' class='" + btnDetalleQeQ + "'><i class='fas fa-search' title='Detalle QeQ'></i></span>",
						orderable: false
					}
					/*,
					{
						title: "", data: null,
						defaultContent: "<span data-toggle='collapse'><i class='fas fa-trash-alt'></i></span>",
						orderable: false
					}*/
				];

				if (dataSet.mensaje === 'OK') {
					tabla.iniciarTablaExport("#resultadoBusquedaCliente", dataSet.dataExtra.clientesLst, columnas,"Reporte_Promotorias");
					$('.background-tabla').css('display', 'block');
					editarCliente();
					detalleConsultaQeQ();
					obtenerRegistro();
				}
			},
			statusCode: {
				404: function () {
					console.log("page not found");
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var buscarPorRFC = function(){
		var tipoCliente = $('input[name="radiosClientesNuevo"]:checked').val();

		$.ajax({
			url: "clientesC/buscarCliente/rfc/" + $('#busquedaRfc').val() + "/" + tipoCliente,
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				var $perm = dataSet.dataExtra.permisos;
				var columnas = [
					{ title: "ID", data: "numeroCliente" },
					{ title: "RFC", data: "rfc" },
					{ title: "Estatus", data: "estatus"},
					{ title: "", orderable: false, data: "oficialCumplimientoAutorizacion", render: function(data, type, row, index){
						var $botones = "<span data-toggle='collapse' class='" + btnEditCliente + " mr-2'><i class='fas fa-edit' title='Editar'></i></span>";
					
						if($perm.indexOf("oficialCumplimiento") != -1 ){
							$botones += autorizacionOficial;
						}
						
						return  $botones;
					}},
					{
						title: "", data: null,
						defaultContent: "<span data-toggle='collapse' class='" + btnDetalleQeQ + "'><i class='fas fa-search' title='Detalle QeQ'></i></span>",
						orderable: false
					}
					/*,
					{
						title: "", data: null,
						defaultContent: "<span data-toggle='collapse'><i class='fas fa-trash-alt'></i></span>",
						orderable: false
					}*/
				];
				if(tipoCliente === '1'){
					columnas.splice(1, 0, {title: "Promotoría/Promotor", data: "nombreCliente"});
					columnas.splice(2, 0, {title: "Apellido Paterno", data: "apellidoPaterno"});
					columnas.splice(3, 0, {title: "Apellido Materno", data: "apellidoMaterno"});
				}else{
					columnas.splice(1, 0, {title: "Razón Social", data: "denominacion"});
				}
				if (dataSet.mensaje === 'OK') {
					console.log(dataSet);
					tabla.iniciarTabla("#resultadoBusquedaCliente", dataSet.dataExtra.clientesLst, columnas);
					$('.background-tabla').css('display', 'block');
					editarCliente();
					detalleConsultaQeQ();
					obtenerRegistro();
				}
			},
			statusCode: {
				404: function () {
					console.log("page not found");
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var buscarPorRazonSocial = function(){
		$.ajax({
			url: "clientesC/buscarCliente/razonSocial/" + $('#busquedaRazonSocial').val(),
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				var $perm = dataSet.dataExtra.permisos;
				var columnas = [
					{ title: "ID", data: "numeroCliente" },
					{ title: "Denominación o Razón Social", data: "denominacion" },
					{ title: "RFC", data: "rfc" },
					{ title: "Estatus", data: "estatus"},
					{ title: "", orderable: false, data: "oficialCumplimientoAutorizacion", render: function(data, type, row, index){
						var $botones = "<span data-toggle='collapse' class='" + btnEditCliente + " mr-2'><i class='fas fa-edit' title='Editar'></i></span>";
					
						if($perm.indexOf("oficialCumplimiento") != -1 ){
							$botones += autorizacionOficial;
						}
						
						return  $botones;
					}},
					{
						title: "", data: null,
						defaultContent: "<span data-toggle='collapse' class='" + btnDetalleQeQ + "'><i class='fas fa-search' title='Detalle QeQ'></i></span>",
						orderable: false
					}
					/*,
					{
						title: "", data: null,
						defaultContent: "<span data-toggle='collapse'><i class='fas fa-trash-alt'></i></span>",
						orderable: false
					}*/
				];

				if (dataSet.mensaje === 'OK') {
					tabla.iniciarTabla("#resultadoBusquedaCliente", dataSet.dataExtra.clientesLst, columnas);
					$('.background-tabla').css('display', 'block');
					editarCliente();
					detalleConsultaQeQ();
					obtenerRegistro();
				}
			},
			statusCode: {
				404: function () {
					console.log("page not found");
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var archivosClientes = function () {
		var extensions = ["jpg", "png", "pdf"];
		fileinput.inicializarFileinputCliente(null, "input[type='file']", extensions);
	};
	
	var editarCliente = function() {
		var table = $("#resultadoBusquedaCliente").DataTable();
		
		$('#resultadoBusquedaCliente tbody').on('click', '.btnEditCliente', function(){
			$('#formClienteEditar #rfc').attr('disabled', 'true');
			util.resetInvalidTooltip();
			var data = table.row( $(this).parents('tr') ).data();
			var nombreCompleto = null;
			clientesC.autoCompletarCodigoPostal("formClienteEditar");
			
			numeroCliente = data.idCliente;
			consecutivoCliente = data.numeroCliente;
			
			if(data.fisico){
				nombreCompleto = 'Detalle: ' + data.nombreCliente + ' ' + data.apellidoPaterno + ' ' + data.apellidoMaterno;
				$('.clienteFisicoNuevo').css('display', 'block');
				$('.clienteMoralNuevo').css('display', 'none');
			}else{
				nombreCompleto = 'Detalle: ' + data.denominacion;
				$('.clienteFisicoNuevo').css('display', 'none');
				$('.clienteMoralNuevo').css('display', 'block');
			}
			
			$('.titleEditCliente').text(nombreCompleto);
			
		$.when(obtenerDocumentosClientes(data.idCliente)).then(function(respuestaDoc){
			var documentos = respuestaDoc.dataExtra;
			$('#editarClienteModal').modal({show:true, backdrop:'static'});
			$.each(data, function(key, value){
				var estado = null;
				var municipio = null;
				
				if(key==="estado"){
					estado = value;
					$("#formClienteEditar *[name=" + key + "]").val(estado.idEstado);
				}else if(key==="municipio"){
					municipio = value;
					$("#formClienteEditar *[name=" + key + "]").html("<option value=" + municipio.idMunicipio + " selected>" + municipio.nombreMunicipio + "</option>");
				}else{
					$("#formClienteEditar *[name=" + key + "]").val(value);
				}
			});
			
			if(documentos !== null && documentos !== undefined){
				$('#formClienteEditar .verArchivo').remove();
				//$('#formClienteEditar input:file').removeAttr('disabled');
				documentosCargados = documentos.length;
				$.each(documentos, function(k, v){
					
					//console.log($('#formClienteEditar .' + v[1]).parent());
					$('#formClienteEditar .' + v[1]).parent().append('<a class="verArchivo" href="clientesC/verArchivo/' + v[0] + '" target="_blank">Ver documento</a>');
					//$('#formClienteEditar .' + v[1]).find('.btn').addClass('disabled');
					//$('#formClienteEditar #' + v[1] + ', .file-caption-name').attr('disabled', 'true');
				})
			}
			
			if($("#nacionalidad").val() === "EXTRANJERO"){
				$('._calidadMigratoria').find('.btn').removeClass('disabled');
				$('#_calidadMigratoria, .file-caption-name').removeAttr('disabled');
			}else{
				$('._calidadMigratoria').find('.btn').addClass('disabled');
				$('#_calidadMigratoria, .file-caption-name').attr('disabled', 'true');
			}
		});
	});
		
		$('#editarClienteModal').on('hidden.bs.modal', function (e) {
			$('#formClienteEditar')[0].reset();
			$('.municipio').html();
			numeroCliente = null;
			consecutivoCliente = 0;
			documentosCargados = 0;
		})
	}
	
	var autoCompletarCodigoPostal = function(appendTo){
		$(".codigoPostal").autocomplete({
			appendTo: $('#' + appendTo),
			minLength: 5,
			source : function(request, response) {
				$.ajax({
					url : 'coloniasC/obtenerColoniasByCP',
					dataType : 'json',
					type: "GET",
					data : {
						codigoPostal : request.term
					},
					success : function(data) {
						console.log(data);
						response($.map(data, function(v,i){
							return {
								label: v.codigoPostal + " - " + v.nombreColonia,
								value: v.codigoPostal + " - " + v.nombreColonia,
								data : v
							};
						}));
					}
				});
			},
			select: function (event, ui) {
				$('.municipio').html();
				$('.estado').val(ui.item.data.municipio.estado.idEstado);
				$('.municipio').html("<option value=" + ui.item.data.municipio.idMunicipio + " selected>" + ui.item.data.municipio.nombreMunicipio + "</option>");
				$(this).val(ui.item.label);
				return true;
		  }
		});
	}
	
	var obtenerDocumentosClientes = function(cliente){
		return $.ajax({
			url: "clientesC/obtenerDocumentos/" + cliente,
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			statusCode: {
				404: function () {
					console.log("page not found");
				}
			},
			complete: function(){
				util.loadingEnd();
			},
		});
	};

	var obtenerRangosOperacion = function(){
		$.ajax({
			url: "clientesC/obtenerRangosOperacion",
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function(dataSet){
				$('.rangoOperacion').html("");
				if(dataSet.mensaje === 'OK'){
					$('.rangoOperacion').append('<option value="">Seleccione opción...</option>');
					$.each(dataSet.dataExtra, function(i, v){
						$('.rangoOperacion').append('<option value="' + v.idRango +'">' + v.rango + '</option>');
					});
				}
			},
			statusCode: {
				404: function () {
					console.log("page not found");
				}
			},
			complete: function(){
				util.loadingEnd();
			},
		});
	}
	
	var busquedaClienteModal = function () {
		
		var btnEditCliente = "btnEditCliente";
		$('#consultarByNombre').click(function () {
			
			$.ajax({
				url: "clientesC/buscarCliente/nombre/" + $('#busquedaNombreCliente').val(),
				method: "GET",
				beforeSend: function(){
					util.loadingStart();
				},
				success: function (dataSet) {
					var columnas = [
						{ title: "ID", data: "idCliente" },
						{ title: "Propotoría/Promotor", data: "nombreCliente" },
						{ title: "Apellido Paterno", data: "apellidoPaterno" },
						{ title: "Apellido Materno", data: "apellidoMaterno" },
						{ title: "RFC", data: "rfc" },
						{ title: "Estatus", data: "estatus"},
					];

					if (dataSet.mensaje === 'OK') {
						tabla.iniciarTablaNoHeader("#resultadoBusquedaCliente", dataSet.dataExtra.clientesLst, columnas);
						$('.background-tabla').css('display', 'block');	
						
						$( document ).on("click", "tr[role='row']", function(){
			                 //alert($(this).children('td:first-child').text());
			                 //$('#modal').modal('hide');
							//$("#cliente").val($(this).children('td:first-child').text());
							var valor= $(this).children('td:nth-child(5)').text();
							$("#cliente").val(valor);
							
							$('#btnCloseModal').click();
			            });
					}
				},
				statusCode: {
					404: function () {
						console.log("page not found");
					}
				},
				complete: function(){
					util.loadingEnd();
				}
			});
			
			//var table = $('#resultadoBusquedaCliente').DataTable();
			//console.log(table);
			/* 
		    $('#resultadoBusquedaCliente tbody').on( 'click', 'tr', function () {
		        if ( $(this).hasClass('selected') ) {
		            $(this).removeClass('selected');
		        }
		        else {
		            table.$('tr.selected').removeClass('selected');
		            $(this).addClass('selected');
		        }
		    } );
		    */
		})			
	}

	var autoCompletarNumCliente = function(appendTo){
		//console.log(appendTo);
		$(".contratante").autocomplete({
			appendTo: $('#' + appendTo),
			minLength: 2,
			source : function(request, response) {
				$.ajax({
					url : 'clientesC/obtenerClientesByNumCliente',
					dataType : 'json',
					type: "GET",
					data : {
						numCliente : request.term
					},
					success : function(data) {
						console.log(data);
						response($.map(data, function(v,i){
							return {
//								label: v[0] + ' ' + v[1] +' ' + v[2],
								label: v[1]  +' - ' + v[2],
								value: v[1]  +' - ' + v[2],
								data : v
							};
						}));
					},
					error: function (request, status, error) {
		                console.log(request.responseText);
		            }
				});
			}
		});
	}
	
	var obtenerClientesById = function(id) {				

		$.ajax({
			url : "clientesC/id/" + id,
			method : "GET",
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				console.log(dataSet);
				if(dataSet.dataExtra.fisico){
					$("#contratante").val(dataSet.dataExtra.numeroCliente +" - " + dataSet.dataExtra.nombreCliente + " " + dataSet.dataExtra.apellidoPaterno + " " + dataSet.dataExtra.apellidoMaterno );
				}
				else{
					$("#contratante").val(dataSet.dataExtra.numeroCliente +" - " + dataSet.dataExtra.denominacion );
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
	
	var autoCompletarCodigoPostalCertificadoEditar = function(appendTo){
		$(".codigoPostalActualiza").autocomplete({
			appendTo: $('#' + appendTo),
			minLength: 5,
			source : function(request, response) {
				$.ajax({
					url : 'coloniasC/obtenerColoniasByCP',
					dataType : 'json',
					type: "GET",
					data : {
						codigoPostal : request.term
					},
					success : function(data) {
						console.log(data);
						response($.map(data, function(v,i){
							return {
								label: v.codigoPostal + " - " + v.nombreColonia,
								value: v.codigoPostal + " - " + v.nombreColonia,
								data : v
							};
						}));
					}
				});
			},
			select: function (event, ui) {
				$('.municipioActualiza').html();
				$('.estadoActualiza').val(ui.item.data.municipio.estado.idEstado);
				$('.municipioActualiza').html("<option value=" + ui.item.data.municipio.idMunicipio + " selected>" + ui.item.data.municipio.nombreMunicipio + "</option>");
				$(this).val(ui.item.label);
				return true;
		  }
		});
	}
	
	var detalleConsultaQeQ = function(){
		var table = $('#resultadoBusquedaCliente').DataTable()
		var detalle
		var nombre = '';
		$('#resultadoBusquedaCliente tBody').on('click', '.btnDetalleQeQ', function(){
			
			$('#detalleQeQModal').modal({show:true, backdrop:'static'});
			detalle = table.row($(this).parents('tr')).data();
			console.log('DETALLE DEL CLIENTE')
			console.log(detalle)
			if(detalle.fisico){
				nombre = detalle.nombreCliente + '_' + detalle.apellidoPaterno + '_' + detalle.apellidoMaterno 
			}else{
				nombre = detalle.denominacion
			}
			
			
			$.ajax({
				url: "clientesC/consulta/QeQ/" + detalle.idCliente,
				method: "GET",
				beforeSend: function(){
					util.loadingStart();
				},
				success: function (dataSet) {
					console.log('RESPESTA WS QeQ')
					console.log(dataSet.dataExtra)
					var columnas = [
						{ title: "Promotoría/Promotor"      , data: "nombre" },
						{ title: "Apellidos"   , data: "apellidos"},
						{ title: "Area"        , data: "area"},
						{ title: "Razon Social", data: "razonSoc"},
						{ title: "RFC"  , data: "rfc"},
						{ title: "RFC Moral" , data: "rfcMoral"},
						{ title: "Admon Local" , data: "admonLocal"},
						{ title: "Aut. Sanc"   , data: "autoridadSanc"},
						{ title: "Buscado En"  , data: "buscadoEn"},
						{ title: "Cartilla"    , data: "cartillaNo" },
						{ title: "Causa Irregularidad" , data: "causaIrregularidad"},
						{ title: "Central Obrera"      , data: "centralObrera"},
						{ title: "Ciudad"      , data: "ciudad"},
						{ title: "Colonia"     , data: "colonia"},
						{ title: "CP"          , data: "cp"},
						{ title: "Curp"        , data: "curp" },
						{ title: "Curp OK"     , data: "curpOk"},
						{ title: "Dependencia" , data: "dependencia"},
						{ title: "Domicilio A" , data: "domicilioA"},
						{ title: "Domicilio B" , data: "domicilioB"},
						{ title: "Duracion"    , data: "duracion"},
						{ title: "Email"      , data: "email" },
						{ title: "Entidad"    , data: "entidad"},
						{ title: "Estatus"    , data: "estatus"},
						{ title: "Expediente" , data: "expediente"},
						{ title: "Fax"        , data: "fax"},
						{ title: "Fecha Cargo Ini" , data: "fechaCargoIni"},
						{ title: "Fecha Cargo Fin" , data: "fechaCargoFin" },
						{ title: "Fecha Nacimiento" , data: "fechaNacimiento"},
						{ title: "Fecha Oficio" , data: "fechaOficio"},
						{ title: "Fecha Resolucion", data: "fechaResolucion"},
						{ title: "Fecha Vigencia"  , data: "fechaVigencia"},
						{ title: "Gafi" , data: "gafi"},
						{ title: "ID Dispo"   , data: "idDispo" },
						{ title: "ID Persona" , data: "idPersonaWs"},
						{ title: "ID Registro", data: "idRegistroWs"},
						{ title: "ID Rel", data: "idRel"},
						{ title: "ID Requerimiento"  , data: "idRequerimiento"},
						{ title: "IMSS" , data: "imss"},
						{ title: "Ingresos"   , data: "ingresos" },
						{ title: "ISSSTE"  , data: "issste"},
						{ title: "Lada"       , data: "lada"},
						{ title: "Lista", data: "lista"},
						{ title: "Monto"  , data: "monto"},
						{ title: "NSS" , data: "nss"},
						{ title: "Num Ord."   , data: "numOrd" },
						{ title: "Num. Socios", data: "numSocios"},
						{ title: "Pais"       , data: "pais"},
						{ title: "Parentesco", data: "parentesco"},
						{ title: "Pasaporte"  , data: "pasaporte"},
						{ title: "Periodo" , data: "periodo"},
						{ title: "Peso 1"     , data: "peso1" },
						{ title: "Peso 2"  , data: "peso2"},
						{ title: "Puesto"       , data: "puesto"},
						{ title: "Rubro"     , data: "rubro" },
						{ title: "Sancion"  , data: "sancion"},
						{ title: "Sexo"       , data: "sexo"},
						{ title: "Telefono", data: "telefono"},
						{ title: "Titulo"  , data: "titulo"},
					];

					if (dataSet.mensaje === 'OK') {
						tabla.iniciarTablaExport('#resultadoConsultaQeQ',dataSet.dataExtra,columnas,nombre)
					}
				},
				statusCode: {
					404: function () {
						console.log("page not found");
					}
				},
				complete: function(){
					util.loadingEnd();
				}
			});
			
		})
	}
	
	var obtenerActividadEconomica = function() {				

		$.ajax({
			url : "clientesC/obtenerActividadEconomicaLst",
			method : "GET",
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				console.log(dataSet);
				if (dataSet.mensaje === 'OK') {
					$(".actividadObjeto").html('');
					$(".actividadObjeto").append('<option value=""> --- Seleccione --- </option>');
					$.each(dataSet.dataExtra, function(k, v){
						var actividad = v.actividadEconomicaNombre;
						if(v.actividadEconomicaNombre.length > 25){
							actividad = v.actividadEconomicaNombre.substring(0, 35);
						}
						
						$(".actividadObjeto").append('<option value="' + v.actividadEconomicaClave +'" class="wrap" title="' +  v.actividadEconomicaNombre + '">' 
								+ actividad + '</option>');
					})
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
	
	var obtenerRegistro = function(){
		var table = $("#resultadoBusquedaCliente").DataTable();
		
		$('#resultadoBusquedaCliente tbody').on('click', '.oficialAutorizacion', function(){
			var data = table.row( $(this).parents('tr') ).data();
			clienteAutorizacion = data.idCliente;
		});
	};
	
	var autorizacionOficialCumplimiento = function(autorizado) {
		
		$.ajax({
			url : "clientesC/autorizacionOficialCumplimiento" ,
			method : "POST",
			data : {
				"cliente" : clienteAutorizacion,
				"autorizado" : autorizado
			},
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				if(dataSet.mensaje === "OK"){
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					if($('#busquedaNombreCliente').val().trim() !== ""){
						buscarPorNombre();
					}else if($('#busquedaRfc').val()){
						buscarPorRFC();
					}else if($('#busquedaRazonSocial').val()){
						buscarPorRazonSocial();
					}else if($('#busquedaGiroMercantil').val()){
						buscarPorGiro();
					}
					$('#editarClienteModal').modal('hide');
					clienteAutorizacion = 0;
				}
				else{
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
					clienteAutorizacion = 0;
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
				clienteAutorizacion = 0;
			}
		});
	}
	
	return {
		guardarCliente: guardarCliente,
		archivosClientes: archivosClientes,
		autoCompletarCodigoPostal : autoCompletarCodigoPostal,
		buscarPorNombre : buscarPorNombre,
		buscarPorRFC : buscarPorRFC,
		buscarPorRazonSocial : buscarPorRazonSocial,
		obtenerRangosOperacion : obtenerRangosOperacion,
		busquedaClienteModal: busquedaClienteModal,
		autoCompletarNumCliente : autoCompletarNumCliente,
		obtenerClientesById : obtenerClientesById,
		autoCompletarCodigoPostalCertificadoEditar : autoCompletarCodigoPostalCertificadoEditar,
		obtenerActividadEconomica : obtenerActividadEconomica,
		autorizacionOficialCumplimiento : autorizacionOficialCumplimiento
	}
})();


