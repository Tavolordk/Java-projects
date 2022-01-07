var funcionesAjax = (function() {
	var successAjax = function(dataSet) {
		if (dataSet.mensaje === 'OK') {
			mensajes.modalAlert('info',	'Información',
							dataSet.mensaje	+ " - " + dataSet.detalleMensaje);
			//console.log(dataSet.mensaje + " " + dataSet.detalleMensaje);
		} else if (dataSet.mensaje === 'ERROR') {
			mensajes.modalAlert('info',	dataSet.mensaje,
					dataSet.detalleMensaje);
		} else {
			mensajes.modalAlert('warning', 'Información',
					dataSet.detalleMensaje);
		}
	};
	
	var failAjax = function(jqXHR, textStatus, errorThrown) {
		if (jqXHR.status === 0) {
			mensajes.modalAlert('warning', 'Sin conexión',
							"Verifique que el equipo se encuentra conectado a una red de internet.");
		} else if (jqXHR.status == 404) {
			mensajes.modalAlert('warning', 'Información',
							"La pagina que esta solicitando no existe. Error: [404]");
		} else if (jqXHR.status == 500) {
			mensajes.modalAlert('warning', 'Error',
							"Valide con su proveedor del servicio [500].");
		} else if (textStatus === 'parsererror') {
			alert('JSON conversión fallida.');
		} else if (textStatus === 'timeout') {
			alert('Tiempo de espera agotado.');
		} else if (textStatus === 'abort') {
			alert('Ajax request aborted.');
		} else {
			alert('Uncaught Error: ' + jqXHR.responseText);
		}
	};

	return {
		successAjax : successAjax,
		failAjax : failAjax
	}
})();