var agrupadoresC = (function(){
	var claveDesarrollador = 0;
	var claveAgente = 0;
	
	var cargarArchivoAgrupador = function(){
		var formData = new FormData();
		var claveAgrupador = $('#claveAgrupador').val();
		var claveProducto = $('#claveProducto').val();
		var plazoPlan = $('#formArchivoAgrupador select.producto').find(':selected').data('plazo');
		
		if ( claveDesarrollador == 0) {
			mensajes.modalAlert('danger', 'ERROR',
				"Debe seleccionar una Clave de Desarrollador válido");
			$('.desarrollador').addClass("is-invalid");
			$('.desarrollador').parent().append('<div class="invalid-tooltip">Campo obligatorio</div>');
			return;
		}
		
		if ( claveAgente == 0) {
			mensajes.modalAlert('danger', 'ERROR',
				"Debe seleccionar una Clave de Agente válido");
			$('.agente').addClass("is-invalid");
			$('.agente').parent().append('<div class="invalid-tooltip">Campo obligatorio</div>');
			return;
		}
		
		/*if(agenteComision <= 0 || agenteComision > 100){
			mensajes.modalAlert('danger', 'ERROR',
			"El porcentaje de comisión debe estar en rango de 1-100");
			$('#comision').addClass("is-invalid");
			$('#comision').parent().append('<div class="invalid-tooltip">Valor no válido</div>');
			return;
		}*/
		
		formData.append("claveAgrupador", new Blob([JSON.stringify(claveAgrupador)], { type: 'application/json' }));
		formData.append("claveDesarrollador", new Blob([JSON.stringify(claveDesarrollador)], { type: 'application/json' }));
		formData.append("claveProducto", new Blob([JSON.stringify(claveProducto)], { type: 'application/json' }));
		formData.append("plazoPlan", new Blob([JSON.stringify(plazoPlan)], { type: 'application/json' }));
		formData.append("agente", new Blob([JSON.stringify(claveAgente)], { type: 'application/json' }));
		//formData.append("comision", new Blob([JSON.stringify(agenteComision)], { type: 'application/json' }));
		formData.append("file", $('#fileInput')[0].files[0]);
		
		$.ajax({
			url: "archivoAgrupadorC/guardarArchivoAgrupador",
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
					
					$('#formArchivoAgrupador')[0].reset();
					console.log(dataSet);
					if(dataSet.dataExtra.duplicados != null && dataSet.dataExtra.duplicados.length > 0){
						mensajes.modalAlert('warning', dataSet.mensaje, dataSet.detalleMensaje);
						var columnas = [
							{ title: "CUV", data: "cuv" },
							{ title: "ID Oferta Vivienda", data: "cuvBean.idOfertaVivienda" },
							{ title: "ID Orden Verificacion", data: "cuvBean.idOrdenVerificacion" },
						];

							tabla.iniciarTabla("#resultadoDuplicados", dataSet.dataExtra.duplicados, columnas);
							$('.background-tabla').css('display', 'block');
					}
					
					if(dataSet.dataExtra.cargados != null){
						mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
						var columnas = [
							{ title: "CUV", data: "cuv" },
							{ title: "ID Oferta Vivienda", data: "cuvBean.idOfertaVivienda" },
							{ title: "ID Orden Verificacion", data: "cuvBean.idOrdenVerificacion" },
						];

							tabla.iniciarTabla("#resultadoCargaAgrupador", dataSet.dataExtra.cargados, columnas);
							$('.background-tabla').css('display', 'block');
							if(dataSet.dataExtra.duplicados.length == 0){
								$('#tablaDuplicados').css('display', 'none');
							}
					}
				} else {
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
				}
				
				$('#formArchivoAgrupador')[0].reset();
				claveDesarrollador = 0;
				claveAgente = 0;
				//agenteComision = 0;
			},
			complete: function(){
				$('#btnCargarArchivoAgrupador').prop('disabled', true);
				util.loadingEnd();
			}
		});
	};
	
	var actualizarAgrupador = function(){
		fileinput.inicializarFileinput("archivoAgrupadorC/actualizarCuv", "#fileInputActualizaAgrupador", ["txt"]);
	};
	
	var cargarArchivoHabitabilidad = function(){
		var formData = new FormData();
		
		formData.append("file", $('#fileInputHabitabilidad')[0].files[0]);
		
		$.ajax({
			url: "habitabilidadC/guardarArchivoHabitabilidad",
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
				console.log(dataSet);
				if (dataSet.mensaje === 'OK') {
					
					var columnas = [
						{ title: "Número de Crédito", data: "numeroCredito" },
						{ title: "Nombre de Acreditado", data: "nombreCompletoAcreditado" },
						{ title: "Fecha Escritura", data: "fechaEscritura"},
					];
					
					if(dataSet.dataExtra.guardados != null && dataSet.dataExtra.guardados.length > 0){
						mensajes.modalAlert('success', dataSet.mensaje, 'Se cargaron ' + dataSet.dataExtra.guardados.length + ' registros');
						

							tabla.iniciarTabla("#resultadoGuardados", dataSet.dataExtra.guardados, columnas);
							$('.background-tabla').css('display', 'block');
					}
					
					if(dataSet.dataExtra.noGuardado != null){
						mensajes.modalAlert('warning', dataSet.mensaje, dataSet.detalleMensaje);

							tabla.iniciarTabla("#resultadoNoGuardados", dataSet.dataExtra.noguardado, columnas);
							$('.background-tabla').css('display', 'block');
							if(dataSet.dataExtra.noGuardado.length == 0){
								$('#tablaNoGuardados').css('display', 'none');
							}
					}
				} else {
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			complete: function(){
				$('#btnCargarArchivoAgrupador').prop('disabled', true);
				util.loadingEnd();
			}
		});
	};
	
	var autocompletarDesarrollador = function(appendTo){
		$(".desarrollador").autocomplete({
			appendTo: $('#' + appendTo),
			minLength: 3,
			source : function(request, response) {
				$.ajax({
					url : 'clientesC/obtenerDesarrolladores',
					dataType : 'json',
					type: "GET",
					data : {
						termino : request.term
					},
					success : function(data) {
						if(!data.length){
						      var result = [
						       {
						       label: 'Sin resultados', 
						       value: response.term
						       }
						     ];
						       response(result);
						}else{
						response($.map(data, function(v,i){
							var nombre;
							if(v[1] !== ""){
								nombre = v[1] + ' ' + v[2] + ' ' + v[3];
							}else{
								nombre = v[4];
							}
							return {
								label: v[5] + " - " + nombre,
								value: v[5] + " - " + nombre,
								data : v
							};
						}));}
					}
				});
			},
			select: function (event, ui) {
				claveDesarrollador = ui.item.data[0];
				$(this).val(ui.item.label);
				return true;
		  }
		});
	}
	
	var desarrolladorChange = function(){
		$(".desarrollador").keydown(function(){
			claveDesarrollador = 0;
		});
	}
	
	var autocompletarAgente = function(appendTo){
		$(".agente").autocomplete({
			appendTo: $('#' + appendTo),
			minLength: 3,
			source : function(request, response) {
				$.ajax({
					url : 'agentesC/obtenerAgentesByNomLike',
					dataType : 'json',
					type: "GET",
					data : {
						nomAgente : request.term
					},
					success : function(data) {
						console.log(data);
						if(!data.length){
						      var result = [
						       {
						       label: 'Sin resultados', 
						       value: response.term
						       }
						     ];
						       response(result);
						}else{
						response($.map(data, function(v,i){
							return {
								label: v[0] + " - " + v[1],
								value: v[0] + " - " + v[1],
								data : v
							};
						}));}
					}
				});
			},
			select: function (event, ui) {
				claveAgente = ui.item.data[2];
				$(this).val(ui.item.label);
				return true;
		  }
		});
	}
	
	var agenteChange = function(){
		$(".agente").keydown(function(){
			claveAgente = 0;
			//agenteComision = 0;
		});
	}
	
	var extraerProductoAgrupadores = function(claveAgrupador){
		$.ajax({
			url : "productoC/obtenerProductoAgrupador/" + claveAgrupador,
			method: "get",
			dataType: 'json',
			contentType: 'application/json',
			success : function(dataSet) {
				$('#producto, .producto').html("");
				//console.log(dataSet);
				if(dataSet.mensaje === 'OK'){
					$('#producto, .producto').append('<option value="0">Seleccione Producto...</option>');
					$.each(dataSet.dataExtra, function(i, v){
						$('#producto, .producto').append('<option data-plazo="' + v.plazoPlan +'" value="' + v.cveProducto +'">' + v.nombre + '</option>');
					});
				}
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			}
		});
	}
	
	var example = function(){
		$.ajax({
			url : "reportesExcelC/reporteAnexosConexosEmision",
			method: "get",
			contentType: 'application/vnd.ms-excel',
			success : function(data, status, xhr) {
				var b64Data = data;
	            var contentType = xhr.getResponseHeader("Content-Type"); //Obtenemos el tipo de los datos
	            var filename = xhr.getResponseHeader("Content-disposition");//Obtenemos el nombre del fichero a desgargar
	            filename = filename.substring(filename.lastIndexOf("=") + 1) || "download";
	 
	            var sliceSize = 512;
	             
	            var byteCharacters = window.atob(b64Data);
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
	            //Tras el procesado anterior creamos un objeto blob
	            var blob = new Blob(byteArrays, {
	                type : contentType
	            });
	 
	            // IE 10+
	            if (navigator.msSaveBlob) {
	                navigator.msSaveBlob(blob, filename);
	            } else {
	            //Descargamos el fichero obtenido en la petición ajax
	                var url = URL.createObjectURL(blob);
	                var link = document.createElement('a');
	                link.href = url;
	                link.download = filename;
	                document.body.appendChild(link);
	                link.click();
	                document.body.removeChild(link);
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
		cargarArchivoAgrupador : cargarArchivoAgrupador,
		actualizarAgrupador : actualizarAgrupador,
		cargarArchivoHabitabilidad : cargarArchivoHabitabilidad,
		autocompletarDesarrollador : autocompletarDesarrollador,
		desarrolladorChange : desarrolladorChange,
		autocompletarAgente : autocompletarAgente,
		agenteChange : agenteChange,
		extraerProductoAgrupadores : extraerProductoAgrupadores,
		example : example
	}
})();