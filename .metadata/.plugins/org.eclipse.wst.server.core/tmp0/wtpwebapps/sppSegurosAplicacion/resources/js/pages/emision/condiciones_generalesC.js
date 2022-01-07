var ejecutar = (function () {

	
	var busquedaCondicionesGenerales = function () {
		var btnEditCliente="btnEditCliente";
		$('#btnconsultarPolizaByFecha').click(function () {
			
			$.ajax({
				url: "impresionesC/BusquedaPolizaMaestra/" + $('#busquedaFechaInicio').val()+ "/" + $('#busquedaFechaFin').val(),
				method: "GET",
				beforeSend: function(){
					util.loadingStart();
				},
				success: function (dataSet) {
					var columnas = [
						{ title: "ID", data: "id_poliza" },
						{ title: "Fecha", data: "fecha_registro" },
						{ title: "Numero Poliza", data: "numero_poliza" },
						{ title: "Numero Certificado", data: "numero_certificados" },
						{
							title: "Acción", data: null,
							defaultContent: "<a href='impresionesC/condiciones_generales_PDF/"+0+"/' target='_blank' class='"+btnEditCliente+"'>PDF</a>",
							orderable: false
						}
					];
					
					if (dataSet.mensaje === 'OK') {
						tabla.iniciarTabla("#resultadoBusquedaPoliza", dataSet.dataExtra, columnas);
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
	var regresarDatos=function(){
		var table=$(resultadoBusquedaPoliza).DataTable();
		$('#resultadoBusquedaPoliza tbody').on('click','.btnEditCliente', 
				function(){
					var data=table.row($(this).parents('tr') ).data();
					var id=data.id_poliza;
					console.log(id);
				}
		);
		}
	
	return {
		busquedaCondicionesGenerales: busquedaCondicionesGenerales,
		regresarDatos: regresarDatos,
	}
})();


