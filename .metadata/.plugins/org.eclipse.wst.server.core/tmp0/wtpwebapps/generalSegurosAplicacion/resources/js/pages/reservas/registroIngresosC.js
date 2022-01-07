var registroIngresosC = (function() {
	function sumar() {
		  var total = 0;
		  $('#importe').html('<label></label>');
		  var subtotal = $('#subtotal').val();
		  total = subtotal*1.16;
		  $("<label>"+total.toFixed(2)+"</label>").appendTo('#importe');
		}
	var btnGuardarIngreso = function() {
		var anio17 = $('#anio17').val();
		if (anio17 == "" ) {
			return mensajes.modalAlert('warning', 'Informacion',
					'Es necesario ingresar toda la información');
		} else {

			$.ajax(
					{			
						url : "reservas/guardarIngreso/",
						dataType : 'json',
						method : "GET",
						data:{
							anio17:anio17
						},
						beforeSend : function() {
							util.loadingStart();
						},
						success : function(dataSet) {

							if (dataSet.mensaje === 'OK') {
								mensajes.modalAlert('success', 'Informacion',
										dataSet.detalleMensaje);
								 $('#nuevoIngresoModal').modal('hide');
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
	
	var buscarNombre = function() {
		var nombreIngreso = $('#ingresoNombre').val();
		if (nombreIngreso == "" ) {
			return mensajes.modalAlert('warning', 'Informacion',
					'Es ingresar el nombre de busqueda');
		} else {

			$.ajax(
					{			
						url : "reservas/buscarNombreIngreso/",
						dataType : 'json',
						method : "GET",
						data:{
							nombreIngreso:nombreIngreso
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
	

	var obtenerIngresos = function() {
		$.ajax(
				{
					url : "reservas/obtenerIngresos",
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
							tabla.iniciarTabla("#tabalRegistros", dataSet.dataExtra, columnas);
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

	return {
		buscarNombre : buscarNombre,
		obtenerIngresos:obtenerIngresos,
		btnGuardarIngreso:btnGuardarIngreso,
		sumar: sumar
	}
})();
