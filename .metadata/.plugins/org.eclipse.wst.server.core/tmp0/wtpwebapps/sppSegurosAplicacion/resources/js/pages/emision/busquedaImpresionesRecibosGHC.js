var ejecutar = (function () {

	
	var busquedaGeneralRecibos = function () {
		$('#btnconsultarPolizaByFecha').click(function () {
			
			$.ajax({
				url: "impresionesC/"+ $('#tipoBusqueda').val()+"/" + $('#tipometodo').val()+"/"+ $('#busquedaFechaInicio').val()+ "/" + $('#busquedaFechaFin').val(),
				method: "GET",
				beforeSend: function(){
					util.loadingStart();
				},
				success: function (dataSet) {
					var columnas = [
						{ title: "ID", data: "idRecibo" },
						{ title: "Fecha Emisión", data: "fechaEmision" },
						{ title: "Numero Poliza", data: "polizaBean.numeroPoliza" },
						{ title: "Ramo", data: "ramoBean.cT8Descripcion" },
//						{ title: "recibo", data: "recibo" },
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
			var $id = $data.idRecibo;
			var $numeroPoliza = $data.polizaBean.numeroPoliza;
			var $siglas = $data.polizaBean.producto.siglas;
			var endoso = $data.endoso;
			var $recibo = $data.recibo;
			
			$.ajax({
				url: "impresionesC/" + $('#tipometodo').val() + "/" + $id + "/" + $numeroPoliza + "/" + $siglas + "/" + endoso + "/" + $recibo,
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
		busquedaGeneralRecibos: busquedaGeneralRecibos
	}
})();


