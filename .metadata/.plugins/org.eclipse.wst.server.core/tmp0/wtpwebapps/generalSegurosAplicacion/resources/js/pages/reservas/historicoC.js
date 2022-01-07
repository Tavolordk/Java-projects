var historicoC = (function() {
	var obtenerHistorico = function() {
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
								title : "Nombre",
								data : "anio17"
							},
							
							{
								title : "Apellido Paterno",
								data : "anio18"
							},
							
							{
								title : "Apellido Materno",
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
							tabla.iniciarTabla("#tabalHistorico", dataSet.dataExtra, columnas);
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
	var descargarHistorico = function(){
		
		$.ajax({
			url: "reservas/descargarHistorico",
			type: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				if (dataSet.mensaje === 'OK') {
					mensajes.modalAlert('info', dataSet.mensaje, dataSet.detalleMensaje);
					
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	};

	return {
		obtenerHistorico : obtenerHistorico,
		descargarHistorico:descargarHistorico
	}
})();
