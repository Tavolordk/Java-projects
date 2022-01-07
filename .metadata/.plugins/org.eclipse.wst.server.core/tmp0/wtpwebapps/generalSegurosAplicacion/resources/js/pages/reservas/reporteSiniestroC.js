var reporteSiniestroC = (function() {

	var obtenerSiniestros = function() {
		var fechaBusqueda = $('#fechaBusqueda').val();
		if (fechaBusqueda == "") {
			return mensajes.modalAlert('warning', 'Informacion',
					'Es necesario seleccionar una fecha');
		} else {

			$.ajax(
					{			
						url : "reservas/obtenerSiniestros/",
						dataType : 'json',
						method : "GET",
						data:{
							fecha:fecha
						},
						beforeSend : function() {
							util.loadingStart();
						},
						success : function(dataSet) {

							if (dataSet.mensaje === 'OK') {
								mensajes.modalAlert('success', 'Informacion',
										dataSet.detalleMensaje);
							} else {
								mensajes.modalAlert('warning', 'Informacion',
										dataSet.detalleMensaje);
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
	}

	return {
		obtenerSiniestros : obtenerSiniestros
	}
})();
