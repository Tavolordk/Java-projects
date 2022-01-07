var monedaC = (function() {
	var btnEditMoneda = "btnEditMoneda";
	var idMoneda = 0;
	
	var guardarMoneda = function(formulario,modeling) {
		var formData = {ct16Cve:idMoneda};
		// iterate over form elements
		$.each($('input, select', formulario), function(k, v) {
			formData[$(this).attr("name")] = $(this).val();

		});

		console.log(formData);
		$.ajax({
			url : "monedaC/guardarMoneda",
			method : "POST",
			data : JSON.stringify(formData),
			dataType : 'json',
			contentType : 'application/json',
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				console.log(dataSet.mensaje);
				if (dataSet.mensaje === "OK") {
					monedaC.obtenerMoneda();
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$(formulario)[0].reset();
					$(modeling).modal('hide');
				}
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			},
			complete : function() {
				util.loadingEnd();
			}

		});
	}

	var extraerMoneda = function() {
		$.ajax({
			url : "monedaC/obtenerMoneda",
			method : "get",
			dataType : 'json',
			contentType : 'application/json',
			success : function(dataSet) {
				$('#moneda, .moneda').html("");
				if (dataSet.mensaje === 'OK') {
					$('#moneda, .moneda').append('<option value="">Seleccione Moneda...</option>');
					$.each(dataSet.dataExtra, function(i, v) {
						$('#moneda, .moneda').append('<option value="' + v.ct16Cve +'">' + v.ct16MonedaNombre + '</option>');
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

	var obtenerMoneda = function() {
		var btnEditMoneda = "btnEditMoneda";
		$.ajax({
					url : "monedaC/obtenerMoneda",
					method : "GET",
					beforeSend : function() {
						util.loadingStart();
					},
					success : function(dataSet) {
						var columnas = [
								{
									title : "Clave de Moneda",
									data : "ct16CveMoneda"
								},
								{
									title : "Nombre de Moneda",
									data : "ct16MonedaNombre"
								},

								{
									title : "",
									data : null,
									defaultContent : "<span data-toggle='collapse' class='" + btnEditMoneda + "'><i class='fas fa-edit'></i></span>",
									orderable : false
						}/*,
								{
									title : "",
									data : null,
									defaultContent : "<span data-toggle='collapse'><i class='fas fa-trash-alt'></i></span>",
									orderable : false
						}*/
						];
						if (dataSet.mensaje === "OK") {
					tabla.iniciarTabla("#tablaMoneda", dataSet.dataExtra, columnas);
					$('.background-tabla').css('display', 'block');
					editarMoneda();
						}
					},
					statusCode : {
						404 : function() {
							console.log("page not found");
						}
					},
					complete : function() {
						util.loadingEnd();
					}
				});
	}

	var obtenerMonedasAltaCliente = function() {
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

	var extraerTipoMonedaByProducto = function(producto) {
		$.ajax({
			url : "monedaAltaC/id/" + producto,
			method : "get",
			dataType : 'json',
			contentType : 'application/json',
			success : function(dataSet) {

				$('#tipoMoneda').html("");
				if (dataSet.mensaje === 'OK') {
					$('#tipoMoneda').append(
							'<option value="">Seleccione Moneda...</option>');
					$.each(dataSet.dataExtra, function(i, v) {
						$('#tipoMoneda').append(
								'<option value="' + v.ct16Cve + '">'
										+ v.ct16MonedaNombre + '</option>');
					});
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
		});
	}
	var extraerMonedaByProducto = function(producto,valorMoneda) {
		prueba(function(moneda) {
			var dataSet = moneda;
			$('#cveMoneda').html("");
			if (dataSet.mensaje === 'OK') {
				$.each(dataSet.dataExtra, function(i, v) {
					$('#cveMoneda').append(
							'<option value="' + v.ct16Cve + '">'
									+ v.ct16MonedaNombre + '</option>');
				});
			}
			if(valorMoneda){
				$("#cveMoneda").val(valorMoneda);
				
			}
				
		});
		function prueba(callback) {
			$.ajax({
				url : "monedaC/id/" + producto,
				method : "get",
				dataType : 'json',
				contentType : 'application/json',
				success : function(dataSet) {
					callback(dataSet)
				},
				statusCode : {
					404 : function() {
						console.log("page not found");
					}
				}
			});
		}
	}

	var editarMoneda = function() {
		
		var table = $("#tablaMoneda").DataTable();
		
		$('#tablaMoneda tbody').on('click', '.btnEditMoneda', function(){
			util.resetInvalidTooltip();
			var data = table.row( $(this).parents('tr') ).data();
			console.log(data);
			idMoneda = data.ct16Cve;
			
			
			$('#editarMonedaModal').modal({show:true, backdrop:'static'});
			$.each(data, function(key, value){
				$("#formMonedaEditar *[name=" + key + "]").val(value);
			});
		});
		
		$('#editarMonedaModal').on('hidden.bs.modal', function (e) {
			$('#formMonedaEditar')[0].reset(); 
			idMoneda=null;
	})
	}
//	var extraerMonedaByProducto = function(producto) {
//		console.log(producto);
//		$.ajax({
//			async : false,
//			url : "monedaC/id/" + producto,
//			method : "get",
//			dataType : 'json',
//			contentType : 'application/json',
//			success : function(dataSet) {
//				console.log(dataSet);
//				$('#cveMoneda').html("");
//				if (dataSet.mensaje === 'OK') {
//					$('#cveMoneda').append(
//							'<option value="">Seleccione Moneda...</option>');
//					$.each(dataSet.dataExtra, function(i, v) {
//						$('#cveMoneda').append(
//								'<option value="' + v.ct16Cve + '">'
//										+ v.ct16MonedaNombre + '</option>');
//					});
//				}
//			},
//			statusCode : {
//				404 : function() {
//					console.log("page not found");
//				}
//			}
//		});
//	}

	return {

		guardarMoneda : guardarMoneda,
		obtenerMoneda : obtenerMoneda,
		extraerMoneda : extraerMoneda,
		obtenerMonedasAltaCliente : obtenerMonedasAltaCliente,
		extraerMonedaByProducto : extraerMonedaByProducto,
		extraerTipoMonedaByProducto : extraerTipoMonedaByProducto
	}
})();