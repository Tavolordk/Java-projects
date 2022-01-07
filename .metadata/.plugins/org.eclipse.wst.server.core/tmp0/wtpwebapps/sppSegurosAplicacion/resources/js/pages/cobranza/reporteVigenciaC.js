var vigenciaC = (function () {
	var btnEditCliente = "btnEditCliente";
	
	var btnconsultarVigecia = function () {
		console.log('Fecha actual:'+fechaActual);
		var fechaHoy= fechaActual();
		$('#btnconsultarVigecia').click(function () {
			 var fechaFin = $('#fecha').val();
			$.ajax({
				url: "capturaLiquidacionesC/busquedaVigencias/"+ fechaHoy+ "/" + fechaFin +"/"+$('#vigencia').val(),
				method: "GET",
				beforeSend: function(){
					util.loadingStart();
				},
				success: function (dataSet) {
					var columnas = [
						{ title: "Fecha", data: "fechaEstatus" },
						{ title: "Sucursal", data: "sucursalBean.ct19Descripcion" },
						{ title: "Ramo", data: "ramoBean.cT8Descripcion" },
						{ title: "Póliza", data: "polizaBean.numeroPoliza" },
						{ title: "Recibo", data: "recibo" },
						{ title: "Endoso", data: "endoso" },
						{ title: "Cve. Agente", data: "polizaBean.agente1.cveAgente" },
						//{ title: "Cve. Agente2", data: "polizaBean.agente2.cveAgente" },
						{ title: "Nombre", data: "polizaBean.agente1",render: function ( data, type, row, meta ) {
							return data.nombre 
							+ " " + data.apePaterno 
							+ " " + data.apeMaterno;}},
						{ title: "Comisión", data: "comisionagente1" },
						//{ title: "Comisión", data: "comisionagente2" },
						//{ title: "Comisión", data: "comisionagente3" },
						{ title: "Iva", data: "comisionagente1",render : function(data, type, row) {
				            var comision = 0;
				            var porcentaje = 0.16;
				            comision = data*porcentaje;
				            var comision1 = comision.toFixed(2);
							return comision1;
						} },
						{ title: "Iva_Ret", data: "comisionagente1",render : function(data, type, row) {
				            var comisionRetIva = 0;
				            var porcentajeRetIva = 0.106667;
				            comisionRetIva = data*porcentajeRetIva;
				            var comisionRetIva1 = comisionRetIva.toFixed(2);
							return comisionRetIva1;
						} },
						{ title: "Isr", data: "comisionagente1",render : function(data, type, row) {
				            var comisionIsr = 0;
				            var porcentajeIsr = 0.10;
				            comisionIsr = data*porcentajeIsr;
				            var comisionIsr1 = comisionIsr.toFixed(2);
							return comisionIsr1;
						} },
						{ title: "Total", data: "comisionagente1",render : function(data, type, row) {
				            var comisionTotal = 0;
				            var porcentaje = 0.16;
				            var porcentajeRetIva = 0.106667;
				            var porcentajeIsr = 0.10;
				            comisionTotal = ((data+(data*porcentaje))-((data*porcentajeRetIva)+(data*porcentajeIsr)));
				            var comisionTotal1 = comisionTotal.toFixed(2);
							return comisionTotal1;
						} },//if("comisionagente2"){ title: "PRUEBA", data: "comisionagente2" },
						
						{
							title: "Acción", data: null,
							data : "polizaBean.agente1.cveAgente",
							render : function(data, type, row) {
					              return "<a href='capturaLiquidacionesC/impresionComisionAgente/"+data+"/"+ fechaInicio+ "/" + fechaFin +"' target='_blank'>PDF</a>";
							},
							orderable: false
						}
					];
					if (dataSet.mensaje === 'OK') {
						tabla.iniciarTablaExport("#resultadoBusquedaComisionAgt", dataSet.dataExtra,columnas,'COMISIONES_AGENTES_'+fechaActual());
						$('.background-tabla').css('display', 'block');
						console.log(dataSet.dataExtra);
						//regresarDatos();
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
	/*** FUNCION PARA MOSTRAR FECHA ACTUAL ***/
	var fechaActual = function(){
		var d = new Date();
		var month = d.getMonth()+1;
		var day = d.getDate();
		
		var fecha = d.getFullYear()
		    + '-' + (month < 10 ? '0' : '') + month
		    + '-' + (day   < 10 ? '0' : '') + day;
		
		return fecha
	}

	return {
		btnconsultarVigecia: btnconsultarVigecia
		//regresarDatos: regresarDatos
	}
})();


