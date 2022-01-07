var pagosTabC = (function() {
	var idPago = 0;
	var obtenerPagos = function() {
		$.ajax(
				{
					url : "reservas/obtenerHistorico",
					dataType : 'json',
					method : "GET",
					beforeSend : function() {
						util.loadingStart();
					},
					success : function(dataSet) {
						var columnas = [
							{
								title : "Año Pagado",
								data : "anio17"
							},
							
							{
								title : "Año pagado",
								data : "anio18"
							},
							
							{
								title : "Año pagado",
								data : "anio19"
							},
							
							{
								title : "RFC",
								data : "anio20"
							},
							
							{
								title : "Sesa",
								data : "sesa"
							}
							];
						console.log(dataSet);
						if (dataSet.mensaje === "OK") {
							tabla.iniciarTabla("#tablaPagos", dataSet.dataExtra, columnas);
							$('.background-tabla').css('display', 'block');
							tabla.iniciarTabla("#tablaPolizas", dataSet.dataExtra, columnas);
							$('.background-tabla').css('display', 'block');
							tabla.iniciarTabla("#tablaOcurridos", dataSet.dataExtra, columnas);
							$('.background-tabla').css('display', 'block');
							
							
						}
					},
					complete : function() {
						util.loadingEnd();
					}

				}).fail(function(jqXHR, textStatus, errorThrown) {

			if (jqXHR.status === 0) {
				alert('Not connect: Verify Network.');
			} else if (jqXHR.status == 404) {
				alert('Requested page not found [404]');
			} else if (jqXHR.status == 500) {
				alert('Internal Server Error [500].');
			} else if (textStatus === 'parsererror') {
				alert('Requested JSON parse failed.');
			} else if (textStatus === 'timeout') {
				alert('Time out error.');
			} else if (textStatus === 'abort') {
				alert('Ajax request aborted.');
			} else {
				alert('Uncaught Error: ' + jqXHR.responseText);
			}

		});

	}
	var descargarPagos = function(){
		
		$.ajax({
			url: "reservas/descargarHistorico",
			type: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				if (dataSet.mensaje === 'OK') {
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	};
	
	var btnNuevoPago = function() {
		$('#nuevoPagoModal').modal({show:true, backdrop:'static'});
	};
	
	var guardarPago = function(){
		var formData = new FormData();
		var model = { }
    	//iterate over form elements   
		$.each($('input, select', '#formAgente'),function(k, v){
			if($(this).attr("name")!== undefined){
				model[$(this).attr("name")] = $(this).val().toUpperCase();
			}
	    });
		model['id_his'] = idPago;
		formData.append("model", new Blob([JSON.stringify(model)], { type: 'application/json' }));
		$.ajax({
			url : "reservas/guardarPago",
			method: "POST",
			data: formData,
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			cache: false,
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				if(dataSet.mensaje==="OK"){
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$('#nuevoPagoModal').modal('hide');
				} else {
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
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
	};

	return {
		obtenerPagos : obtenerPagos,
		descargarPagos:descargarPagos,
		btnNuevoPago:btnNuevoPago,
		guardarPago:guardarPago
	}
})();
