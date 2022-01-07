var ejecutar = (function () {

	
	var busquedaEndosodisminucionsumaasegurada = function () {
		var btnEditCliente="btnEditCliente";
		$('#btnconsultarPolizaByFecha').click(function () {
			
			$.ajax({
				url: "impresionesC/BusquedaEndosoDisminucionSumaAsegurada/" + $('#busquedaFechaInicio').val()+ "/" + $('#busquedaFechaFin').val(),
				method: "GET",
				beforeSend: function(){
					util.loadingStart();
				},
				success: function (dataSet) {
					var columnas = [
						{ title: "ID", data: "idCertificado" },
						{ title: "Fecha", data: "fechaRegistro" },
						{ title: "Numero Poliza", data: "poliza.numeroPoliza" },
						{ title: "Tipo Endoso", data: "tipoEndoso" },
						{
							title: "Acción", data: null,
							defaultContent: "<a href='impresionesC/endoso_disminucion_suma_asegurado/"+0+"/' target='_blank' class='"+btnEditCliente+"'>PDF</a>",
							orderable: false
						}
					];
					var boton=[
						{
							title: "", data:null,
							defaultContent: "<td rowspan='2'><button class='btn btn-success'>PDF</button><td>",
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
		busquedaEndosodisminucionsumaasegurada: busquedaEndosodisminucionsumaasegurada,
		regresarDatos: regresarDatos
	}
})();


