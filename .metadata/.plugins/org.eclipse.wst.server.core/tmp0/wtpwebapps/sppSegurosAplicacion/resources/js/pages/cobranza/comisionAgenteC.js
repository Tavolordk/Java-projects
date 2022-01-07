var comisionAgenteC = (function () {
	var btnEditCliente = "btnEditCliente";
	
	var busquedaComisionAgente = function () {
		console.log("yeah");
		$('#btnconsultarComisionAgtByFecha').click(function () {
			 var fechaInicio = $('#busquedaFechaInicio').val();
			 var fechaFin = $('#busquedaFechaFin').val();
			 var promotoria = $('#promotoria').val();
			 $('#comisionSum').html('');
			$.ajax({
				url: "capturaLiquidacionesC/busquedaComisionAgentePromotoria/"+ fechaInicio+ "/" + fechaFin+"/"+promotoria,
				//url: "capturaLiquidacionesC/busquedaComisionAgentePr/"+ fechaInicio+ "/" + fechaFin,
				method: "GET",
				beforeSend: function(){
					util.loadingStart();
				},
				success: function (dataSet) {
					var title = "Promotoría";
					var sumComision = 0;
					var columnas = [];
					if("TODOS" != promotoria){
						var comision =0;
						var nombrePromo = "";
						
						$.each(dataSet.dataExtra, function(k, v){
				            var porcentaje = 0.16;
				            comision = v.comisionagente1*porcentaje;
				            sumComision = sumComision + comision;
				            
				            if(v.clienteBean.nombreCliente == ""){
				            	title = "Nombre"
				            	nombrePromo = "clienteBean.denominacion";
				            }else{
				            	title = "Promotoría"
				            	nombrePromo = "clienteBean.nombreCliente";
				            }
						});
						
						
						$('#comisionSum').html('<label>La comisión total es:$<span style="font-weight: bold;">'+sumComision.toLocaleString("en-US")+'</span></label>');
					}else{
						$.each(dataSet.dataExtra, function(k, v){
				            var porcentaje = 0.16;
				            comision = v.comisionagente1*porcentaje;
				            sumComision = sumComision + comision;
				            
				            if(v.clienteBean.nombreCliente == ""){
				            	title = "Nombre"
				            	nombrePromo = "clienteBean.denominacion";
				            }else{
				            	title = "Promotoría"
				            	nombrePromo = "clienteBean.nombreCliente";
				            }
						});
					}
					
					
					columnas = [
						{ title: "Fecha", data: "fechaEstatus" },
						{ title: "Sucursal", data: "sucursalBean.ct19Descripcion" },
						{ title: "Ramo", data: "ramoBean.cT8Descripcion" },
						{ title: "Póliza", data: "polizaBean.numeroPoliza" },
						{ title: "Recibo", data: "recibo" },
						{ title: "Endoso", data: "endoso" },
						{ title: title, data: nombrePromo},
						{ title: "Cve. Agente", data: "polizaBean.agente1.cveAgente" },
						{ title: "Comisión", data: "comisionagente1" },
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
						} }
						/*,//if("comisionagente2"){ title: "PRUEBA", data: "comisionagente2" },
						
						{
							title: "Acción", data: null,
							data : "polizaBean.agente1.cveAgente",
							render : function(data, type, row) {
					              return "<a href='capturaLiquidacionesC/impresionComisionAgente/"+data+"/"+ fechaInicio+ "/" + fechaFin +"' target='_blank'>PDF</a>";
							},
							orderable: false
						}*/
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
	var obtenerPromotorias = function() {				

		$.ajax({
			url : "agentesC/obtenerPromotorias",
			method : "GET",
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				console.log(dataSet);
				if (dataSet.mensaje === 'OK') {
					$(".promotorias").html('');
					$(".promotorias").append('<option value="TODOS">TODOS</option>');
					$.each(dataSet.dataExtra, function(k, v){
						if(v.nombreCliente != ""){
							$(".promotorias").append('<option value="' + v.nombreCliente +'" class="wrap" title="' +  v.nombreCliente + '">' 
									+ v.nombreCliente + '</option>');
						}else if(v.denominacion != ""){
							$(".promotorias").append('<option value="' + v.denominacion +'" class="wrap" title="' +  v.denominacion + '">' 
									+ v.denominacion + '</option>');
						}
						
					})
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
			complete : function() {
				util.loadingEnd();
			}
		});
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
/*	var regresarDatos=function(){
		var table=$(resultadoBusquedaPoliza).DataTable();
		$('#resultadoBusquedaComisionAgt tbody').on('click','.btnEditCliente', 
				function(){
					var data=table.row($(this).parents('tr') ).data();
					var id=data.id_poliza;
					console.log(id);
				}
		);
		}
	*/
	return {
		busquedaComisionAgente: busquedaComisionAgente,
		obtenerPromotorias : obtenerPromotorias
		//regresarDatos: regresarDatos
	}
})();


