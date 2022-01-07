var resumenDaniosC = (function() {
	var getChartPoliza = function(){
		google.charts.load('current', {'packages':['corechart']});
	      google.charts.setOnLoadCallback(drawChart);

	      function drawChart() {
	        var data = google.visualization.arrayToDataTable([
	          ['Year', 'Sales', 'Expenses'],
	          ['2013',  1000,      400],
	          ['2014',  1170,      460],
	          ['2015',  660,       1120],
	          ['2016',  1030,      540]
	        ]);

	        var options = {
	          title: 'Company Performance',
	          hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
	          vAxis: {minValue: 0}
	        };

	        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
	        chart.draw(data, options);
	      }	
	}
	var getChartB = function(){
		google.charts.load('current', {'packages':['corechart']});
	      google.charts.setOnLoadCallback(drawChart);

	      function drawChart() {
	    	  var data = google.visualization.arrayToDataTable([
	    	        ["Element", "Density", { role: "style" } ],
	    	        ["Copper", 8.94, "#b87333"],
	    	        ["Silver", 10.49, "silver"],
	    	        ["Gold", 19.30, "gold"],
	    	        ["Platinum", 21.45, "color: #e5e4e2"]
	    	      ]);

	    	      var view = new google.visualization.DataView(data);
	    	      view.setColumns([0, 1,
	    	                       { calc: "stringify",
	    	                         sourceColumn: 1,
	    	                         type: "string",
	    	                         role: "annotation" },
	    	                       2]);

	    	      var options = {
	    	        title: "Density of Precious Metals, in g/cm^3",
	    	        width: '100%',
	    	        height: '100%',
	    	        bar: {groupWidth: "95%"},
	    	        legend: { position: "none" },
	    	      };

	          var chart = new google.visualization.BarChart(document.getElementById('chart_divB'));

	          var options = {
	            displayAnnotations: true
	          };

	          chart.draw(data, options);
	        }
	}
	var getChartC = function(){
		google.charts.load('current', {'packages':['corechart']});
	      google.charts.setOnLoadCallback(drawChart);

	      function drawChart() {
	    	// Some raw data (not necessarily accurate)
	          var data = google.visualization.arrayToDataTable([
	            ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
	            ['2004/05',  165,      938,         522,             998,           450,      614.6],
	            ['2005/06',  135,      1120,        599,             1268,          288,      682],
	            ['2006/07',  157,      1167,        587,             807,           397,      623],
	            ['2007/08',  139,      1110,        615,             968,           215,      609.4],
	            ['2008/09',  136,      691,         629,             1026,          366,      569.6]
	          ]);

	          var options = {
	            title : 'Monthly Coffee Production by Country',
	            width: '100%',
    	        height: '100%',
	            vAxis: {title: 'Cups'},
	            hAxis: {title: 'Month'},
	            seriesType: 'bars',
	            series: {5: {type: 'line'}}
	          
	          };

	          var chart = new google.visualization.ComboChart(document.getElementById('chart_divC'));

	          var options = {
	            displayAnnotations: true
	          };

	          chart.draw(data, options);
	        }
	}
	var getChartD = function(){
		google.charts.load('current', {'packages':['corechart']});
	      google.charts.setOnLoadCallback(drawChart);

	      function drawChart() {
	    	  var data = google.visualization.arrayToDataTable([
	              ['Task', 'Hours per Day'],
	              ['Work',     11],
	              ['Eat',      2],
	              ['Commute',  2],
	              ['Watch TV', 2],
	              ['Sleep',    7]
	            ]);

	            var options = {
	              title: 'My Daily Activities',
	              is3D: true,
	            };

	          var chart = new google.visualization.PieChart(document.getElementById('chart_divD'));

	          var options = {
	            displayAnnotations: true
	          };

	          chart.draw(data, options);
	        }
	}
	var obtenerResumenDanios = function() {
		var fechaAnio = $('#fechaAnio').val();
		if (fechaAnio == "") {
			return mensajes.modalAlert('warning', 'Informacion',
					'Es necesario que se ingresen un año de busqueda');
		} else {

			$.ajax(
					{			
						url : "reservas/obtenerResumenDanios/",
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
		obtenerResumenDanios : obtenerResumenDanios,
		getChartPoliza:getChartPoliza,
		getChartB:getChartB,
		getChartC:getChartC,
		getChartD:getChartD
	}
})();
