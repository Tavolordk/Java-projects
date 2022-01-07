var journalGastosC = (function() {
	var buscarJournalGastos = function() {
		var fechaSolicitud = $('#fechaSolicitud').val();
		var descripcion = $('#hasta').val().trim();
		var fechaDesde = $('#fechaDesde').val().trim();
		var fechaHasta = $('#fechaHasta').val().trim();
		var tipoJournal = $('#tipoJournal').val().trim();
		var tipoCuenta = $('#tipoCuenta').val().trim();
		if (fechaSolicitud == "" || descripcion == "" || fechaDesde == ""|| fechaHasta == ""|| tipoJournal == ""|| tipoCuenta == "") {
			return mensajes.modalAlert('warning', 'Informacion',
					'Es necesario ingresar todos los datos');
		} else {
			$.ajax(
					{
						url : "reservas/buscarJournalGastos",
						dataType : 'json',
						method : "GET",
						data:{
							fechaSolicitud:fechaSolicitud,
							descripcion:descripcion,
							fechaDesde:fechaDesde,
							fechaHasta:fechaHasta,
							tipoJournal:tipoJournal,
							tipoCuenta:tipoCuenta
						},
						beforeSend : function() {
							util.loadingStart();
						},
						success : function(dataSet) {
							var columnas = [ {
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
							} ];
							console.log(dataSet);
							if (dataSet.mensaje === "OK") {
								tabla.iniciarTabla("#tabalJournalHistorico",
										dataSet.dataExtra, columnas);
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

	}
	var obtenerJournalGastos = function() {
		$.ajax(
				{
					url : "reservas/obtenerHistorico",
					dataType : 'json',
					method : "GET",
					beforeSend : function() {
						util.loadingStart();
					},
					success : function(dataSet) {
						var columnas = [ {
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
						} ];
						console.log(dataSet);
						if (dataSet.mensaje === "OK") {
							tabla.iniciarTabla("#tabalHistorico",
									dataSet.dataExtra, columnas);
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
		obtenerJournalGastos : obtenerJournalGastos,
		buscarJournalGastos : buscarJournalGastos
	}
})();
