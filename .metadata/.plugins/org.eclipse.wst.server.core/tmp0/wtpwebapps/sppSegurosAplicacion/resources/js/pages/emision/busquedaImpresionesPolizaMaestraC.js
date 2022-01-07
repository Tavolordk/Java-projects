var ejecutar = (function () {

	
	var busquedaGeneralPolizaMaestra = function () {
		$('#btnconsultarPolizaByFecha').click(function () {
			
			$.ajax({
				url: "impresionesC/"+ $('#tipoBusqueda').val()+"/" + $('#tipometodo').val()+"/"+ $('#busquedaFechaInicio').val()+ "/" + $('#busquedaFechaFin').val(),
				method: "GET",
				beforeSend: function(){
					util.loadingStart();
				},
				success: function (dataSet) {
					var columnas = [
						{ title: "ID", data: "idPoliza" },
						{ title: "Fecha", data: "fechaRegistro" },
						{ title: "Numero Poliza", data: "numeroPoliza" },
						{ title: "Certificados", data: "certificados" },
						{ title: "Endoso", data: "endoso" },
						{ title: "Ramo", data: "ramo.cveRamo" },
						{ title: "Producto", data: "producto.cveProducto" },
						{
							title: "Acción", data: null,
							defaultContent: "<span style='color: #ca1b21' class='btnEditCliente fas fa-file-pdf'></span>",
							orderable: false
						}
					];
					if (dataSet.mensaje === 'OK') {
						tabla.iniciarTabla("#resultadoBusquedaPoliza", dataSet.dataExtra,columnas);
						$('.background-tabla').css('display', 'block');
						console.log(dataSet.dataExtra);
						regresarDatos();
						//mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
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
	
	var regresarDatos = function(){
		var table=$("#resultadoBusquedaPoliza").DataTable();
		
		$('#resultadoBusquedaPoliza tbody').on('click','.btnEditCliente', function(){
			var $data = table.row($(this).parents('tr') ).data();
			var $idPoliza = $data.idPoliza;
			var $numeroPoliza = $data.numeroPoliza;
			var $siglas = $data.producto.siglas;
			var $endoso = $data.endoso;
			
			$.ajax({
				url: "impresionesC/" + $('#tipometodo').val() + "/" + $idPoliza + "/" + $numeroPoliza + "/" + $siglas + "/" + $endoso,
				method: "GET",
				beforeSend: function(){
					util.loadingStart();
				},
				success: function (dataSet) {console.log(dataSet);
					if (dataSet.mensaje === 'OK') {
						mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					}else{
						mensajes.modalAlert('danger', dataSet.mensaje, "No se pudo generar el documento");
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
		});
	}
	
	return {
		busquedaGeneralPolizaMaestra: busquedaGeneralPolizaMaestra
	}
})();


