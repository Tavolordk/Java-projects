var ejecutar = (function () {

	
	var busquedaGeneralCertificados = function () {
		$('#btnconsultarPolizaByFecha').click(function () {
			
			$.ajax({
				url: "impresionesC/"+ $('#tipoBusqueda').val()+"/" + $('#tipometodo').val()+"/"+ $('#busquedaFechaInicio').val()+ "/" + $('#busquedaFechaFin').val(),
				method: "GET",
				beforeSend: function(){
					util.loadingStart();
				},
				success: function (dataSet) {
					var columnas = [
						{ title: "ID", data: "idCertificado" },
						{ title: "Fecha", data: "fechaRegistro" },
						{ title: "Numero Poliza", data: "poliza.numeroPoliza" },
						{ title: "Ramo", data: "poliza.ramo.cveRamo" },
						{ title: "Producto", data: "poliza.producto.cveProducto" },
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
			var $id = $data.idCertificado;
			var $numeroPoliza = $data.poliza.numeroPoliza;
			var $siglas = $data.poliza.producto.siglas;
			var numeroCredito = $data.numeroCredito;
			var endoso = $data.endoso;
			
			$.ajax({
				url: "impresionesC/" + $('#tipometodo').val() + "/" + $id + "/" + $numeroPoliza + "/" + $siglas + "/" + endoso + "/" + numeroCredito,
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
		busquedaGeneralCertificados: busquedaGeneralCertificados
	}
})();


