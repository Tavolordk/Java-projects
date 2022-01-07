var analisisHomogeneidadSaludC = (function() {
	var getChart = function(){
		google.charts.load('current', {'packages':['corechart']});
	      google.charts.setOnLoadCallback(drawChart);

	      function drawChart() {
	        var data = google.visualization.arrayToDataTable([
	          ['Ramo', '201604', '201704', '201804', '201904'],
	          ['031',   1000,      990,		   760,		 450],
	          ['034',   1170,      460,		   860,		 660],
	          ['037',    660,     1120,		   450,		 890]	       
	        ]);

	        var options = {
	          title: 'Número de asegurados',
	          hAxis: {title: 'Año',  titleTextStyle: {color: '#333'}},
	          vAxis: {minValue: 0}
	        };

	        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div_general_salud'));
	        chart.draw(data, options);
	      }	
	}
	
	var obtenerResumenVida = function() {
		var fechaAnio = $('#fechaAnio').val();
		if (fechaAnio == "") {
			return mensajes.modalAlert('warning', 'Informacion',
					'Es necesario que se ingresen un año de busqueda');
		} else {

			$.ajax(
					{			
						url : "reservas/obtenerResumenVida/",
						dataType : 'json',
						method : "GET",
						data:{
							fechaAnio:fechaAnio
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
		obtenerResumenVida : obtenerResumenVida,
		getChart:getChart
	}
})();
