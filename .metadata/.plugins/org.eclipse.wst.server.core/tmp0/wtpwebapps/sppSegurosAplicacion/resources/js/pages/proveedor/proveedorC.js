var proveedorC = (function () {

	var idProveedor = 0;
	var btnEditaProveedor = "btnEditaProveedor";
	
	var autoCompletarCodigoPostal = function(appendTo) {
		$(".codigoPostal").autocomplete( {
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
				$('.colonia').val('');
				$('.municipio').val('');
				$('.estado').val('');
				$('.colonia').val(ui.item.data.nombreColonia);
				$('.estado').val(ui.item.data.municipio.estado.nombreEstado);
				$('.municipio').val(ui.item.data.municipio.nombreMunicipio);
				$(this).val(ui.item.data.codigoPostal);
				return true;
		  }
		});
	}
	
	//privada
	var obtenerDatosDireccion = function() {
		$.ajax({
			url : 'coloniasC/obtenerColoniasByCP',
			dataType : 'json',
			type: "GET",
			data : {
				codigoPostal : $('#codigoPostal').val()
			},
			success : function(data) {
				if(data.length>0) {
					llenaHTMLDireccion(data[0].idColonia, data[0].nombreColonia, data[0].municipio.idMunicipio, data[0].municipio.nombreMunicipio, data[0].municipio.estado.idEstado, data[0].municipio.estado.nombreEstado);
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
			}
		});
	}
	
	//privada
	var llenaHTMLDireccion = function (idColonia, colonia, idMunicipio, municipio, idEstado, estado) {
		$('.colonia').html();
		$('.municipio').html();
		$('.estado').html();
		$('.colonia').html("<option value=" + idColonia + " selected>" + colonia+ "</option>");
		$('.estado').html("<option value=" + idEstado + " selected>" + estado + "</option>");
		$('.municipio').html("<option value=" + idMunicipio + " selected>" + municipio + "</option>");
	}
	
	var guardaProveedor = function() {
		var formData = new FormData();
		var model = {}
		$.each($('input, select', "#formProveedor"), function (k, v) {
			var filename = $(this).attr("id");
			if (v.type === 'file') {
				if (v.files.length > 0) {
					formData.append("documentos[]", v.files[0], filename);
				}
			} else {
				if ($(this).attr("name") !== undefined) {
					model[$(this).attr("name")] = $(this).val().toUpperCase();
				}
			}
		});
		model['id'] = idProveedor;
		formData.append("proveedorModel", new Blob([JSON.stringify(model)], { type: 'application/json' }));
		$.ajax({
			url: "guardaProveedor",
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
					if($('#nomORazon').val()!==''){
						buscaProveedoresPorNombreORazon();
					}else if($('#busquedarfc').val()!==''){
						buscaProveedoresPorRFC();
					}
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$('#formProveedor')[0].reset();
					$('#proveedorModal').modal('hide');
					$("#tipoProveedorDesc").attr('disabled', true);
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

	var buscaProveedoresPorNombreORazon = function () {
		$('#busquedarfc').val('');
		$.ajax({
			url: "consulta/" + $('#nomORazon').val(),
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				
				var columnas = [
					{ title: "Nombre", data: "nombreContacto" },
					{ title: "Razon social", data: "razonSocial" },
					{ title: "Fecha registro", data: "fechaAlta" },
					{ title: "RFC", data: "rFC" },
					{ title: "Telefono", data: "telefonoOficina" },
					{ title : "",
						data : null,
						defaultContent : "<span data-toggle='collapse' class='" + btnEditaProveedor + "'><i class='fas fa-edit'></i></span>",
						orderable : false
					}
				];

				if (dataSet.mensaje === 'OK') {
					tabla.iniciarTabla("#resultadoBusqueda", dataSet.dataExtra, columnas);
					$('.background-tabla').css('display', 'block');
					editarProveedorModal();
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
	
	var buscaProveedoresPorRFC = function () {
		$('#nomORazon').val('');
		$.ajax({
			url: "consulta/rfc/" + $('#busquedarfc').val(),
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				
				var columnas = [
					{ title: "Nombre", data: "nombreContacto" },
					{ title: "Razon social", data: "razonSocial" },
					{ title: "Fecha registro", data: "fechaAlta" },
					{ title: "RFC", data: "rFC" },
					{ title: "Telefono", data: "telefonoOficina" },
					{ title : "",
						data : null,
						defaultContent : "<span data-toggle='collapse' class='" + btnEditaProveedor + "'><i class='fas fa-edit'></i></span>",
						orderable : false
					}
				];

				if (dataSet.mensaje === 'OK') {
					tabla.iniciarTabla("#resultadoBusqueda", dataSet.dataExtra, columnas);
					$('.background-tabla').css('display', 'block');
					editarProveedorModal();
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
	
	//privada :P HASTAGputo.JS
	var editarProveedorModal = function() {
		var table = $("#resultadoBusqueda").DataTable();
		
		$('#resultadoBusqueda tbody').on('click', '.btnEditaProveedor', function(){
			$('#historialComentariosTablaBloque').hide();
			var data = table.row( $(this).parents('tr') ).data();
			idProveedor = data.id;
			
			$.when(obtenerDocumentosProveedor(idProveedor)).then(function(respuestaDoc){
				var documentos = respuestaDoc.dataExtra;
				$('#proveedorModal').modal({show:true, backdrop:'static'});
				$.each(data, function(key, value){
					$("#formProveedor *[name=" + key + "]").val(value);
				});
				
				if(documentos !== null && documentos !== undefined){
					$('#formProveedor .verArchivo').remove();
					//$('#formClienteEditar input:file').removeAttr('disabled');
					documentosCargados = documentos.length;
					$.each(documentos, function(k, v){
						$('#formProveedor .' + v[1]).parent().append('<a class="verArchivo" href="verArchivo/' + v[0] + '" target="_blank">Ver documento</a>');
					})
				}
			});
			
//			$('#proveedorModal').modal({show:true, backdrop:'static'});
//			$.each(data, function(key, value){
//					$("#formProveedor *[name=" + key + "]").val(value);
//			});
		});
		
		
		
		$('#proveedorModal').on('hidden.bs.modal', function (e) {
			$('#formProveedor')[0].reset();
			$('.currentDate').bootstrapDP('setDate', new Date());
		})
	}
	
	var obtenerDocumentosProveedor = function(idProveedor){
		return $.ajax({
			url: "obtenerDocumentos/" + idProveedor,
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
	
	var historialComentarios = function() {
		$.ajax({
			url: "comentarios/"+idProveedor,
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				var columnas = [
					{ title: "Fecha", data: "fechaCaptura" },
					{ title: "Comentario", data: "comentario" }
				];

				if (dataSet.mensaje === 'OK') {
					$('#historialComentariosTablaBloque').show();
					tabla.iniciarTabla("#historialComentariosTabla", dataSet.dataExtra, columnas);
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
	
	var cargaCatalogoBancos = function() {
		$.ajax({
			url : util.getPath()+"/catalogo/obtener/bancos",
			method : "get",
			dataType : 'json',
			contentType : 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				$('#cve_Banco').html("");
				if (dataSet.mensaje === 'OK') {
					$('#cve_Banco').append('<option value="">Seleccione ...</option>');
					$.each(dataSet.dataExtra, function(i, v) {
						$('#cve_Banco').append('<option value="' + v.id +'">' + v.nombreCorto + '</option>');
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
	
	var archivos = function () {
		var extensions = ["jpg", "png", "pdf"];
		fileinput.inicializarFileinputSiniestros(null, "input[type='file']", extensions);
	};
	
	
	var obtenerActividadEconomica = function() {				

		$.ajax({
			url : "obtenerActividadEconomicaLst",
			method : "GET",
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				console.log(dataSet);
				if (dataSet.mensaje === 'OK') {
					$(".actividadObjeto").html('');
					$(".actividadObjeto").append('<option value="0" selected>Seleccione Actividad...</option>');
					
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
	
	var obtenerGirosMercantiles = function() {
		$.ajax({
			url : "obtenerGirosMercantiles",
			method : "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				
				if (dataSet.mensaje === 'OK') {
					$('.giroMercantil').html("");
					$('.giroMercantil').append('<option value="0" selected>Seleccione opción...</option>');
					
					$.each(dataSet.dataExtra, function(i, v) {
						var giro = v.ct15Giro;
						if(v.ct15Giro.length > 25){
							giro = v.ct15Giro.substring(0, 35);
						}
						$('.giroMercantil').append(
								'<option value="' + v.ct15Cve + '" class="wrap" title="' + v.ct15Giro + '">'
										+ giro + '</option>');
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
	return {
		autoCompletarCodigoPostal       : autoCompletarCodigoPostal,
		guardaProveedor                 : guardaProveedor,
		buscaProveedoresPorNombreORazon : buscaProveedoresPorNombreORazon,
		buscaProveedoresPorRFC          : buscaProveedoresPorRFC,
		historialComentarios            : historialComentarios,
		cargaCatalogoBancos             : cargaCatalogoBancos,
		archivos                        : archivos,
		obtenerActividadEconomica       : obtenerActividadEconomica,
		obtenerGirosMercantiles         : obtenerGirosMercantiles
	} 
})();