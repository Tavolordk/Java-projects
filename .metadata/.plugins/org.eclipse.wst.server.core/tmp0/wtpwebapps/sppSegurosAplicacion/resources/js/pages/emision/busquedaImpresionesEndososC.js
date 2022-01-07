var ejecutar = (function () {

	
	var busquedaEndosos = function () {
		var btnEditCliente="btnEditCliente";
		$('#btnconsultarPolizaByFecha').click(function () {
			
			$.ajax({
				url: "impresionesC/BusquedaEndosos/"+ $('#tipometodo').val()+"/"+ $('#busquedaFechaInicio').val()+ "/" + $('#busquedaFechaFin').val()+ "/" +$('#tipoEndoso').val()+ "/" +$('#tipoOperacion').val(),
				method: "GET",
				beforeSend: function(){
					util.loadingStart();
				},
				success: function (dataSet) {
					var columnas = [
						{ title: "ID", data: $('#polizaocertificado').val()  },
						{ title: "Fecha", data: "fechaOperacion" },
						{ title: "Numero Poliza", data: "poliza.numeroPoliza" },
						{ title: "Tipo Endoso", data: "tipoEndoso" },
						{ title: "Operación", data: "operacion" },
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
			var $id;
			var $numeroPoliza = $data.poliza.numeroPoliza;
			var $siglas = $data.poliza.producto.siglas;
			var $asegurado = $data.idAsegurado;
			//var $endoso = $data.certificado.endoso;
			
			if($('#tipometodo').val() === 'endoso_cancelacion_poliza' || $('#tipometodo').val() === 'endoso_cambio_beneficiario'){
				$endoso = $data.poliza.endoso;
			}else if ($('#tipometodo').val() === 'endoso_cancelacion_certificado' || $('#tipometodo').val() === 'endoso_Nuevo_Asegurado_AP' ||
				$('#tipometodo').val() === 'endoso_baja_asegurado_ap'){
				$endoso = $data.numeroEndosoRecibo;
			}else{
				$endoso = $data.certificado.endoso;
			}
			
			if($('#polizaocertificado').val() === 'idMovimiento'){
				$id = $data.idMovimiento;
			}else if ($('#polizaocertificado').val() === 'poliza.idPoliza'){
				$id = $data.poliza.idPoliza;
			}else{	
				$id = $data.certificado.idCertificado;
			}

			$.ajax({
				url: "impresionesC/" + $('#tipometodo').val() + "/" + $id + "/" + $numeroPoliza + "/" + $siglas + "/" + $endoso + "/" + $asegurado,
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
		busquedaEndosos: busquedaEndosos
	}
})();


