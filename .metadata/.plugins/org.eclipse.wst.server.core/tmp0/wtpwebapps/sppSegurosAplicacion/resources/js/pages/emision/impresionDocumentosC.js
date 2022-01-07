var clientesC = (function () {

	
	var busquedaCliente = function () {
		
		var btnEditCliente = "btnEditCliente";
		$('#consultarByNombre').click(function () {
			
			$.ajax({
				url: "impresionesC/BusquedaPolizas/" + $('#busquedaNombreCliente').val(),
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
							title: "", data: null,
							defaultContent: "<a href='impresionesC/reporte_PDF' target='_blank'>PDF</a>",
							orderable: false
						},
						{
							title: "", data: null,
							defaultContent: "<span data-toggle='collapse'><i class='fas fa-trash-alt'></i></span>",
							orderable: false
						}
					];

					if (dataSet.mensaje === 'OK') {
						tabla.iniciarTabla("#resultadoBusquedaCliente", dataSet.dataExtra, columnas);
						$('.background-tabla').css('display', 'block');
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
	return {
		busquedaCliente: busquedaCliente
	}
})();


