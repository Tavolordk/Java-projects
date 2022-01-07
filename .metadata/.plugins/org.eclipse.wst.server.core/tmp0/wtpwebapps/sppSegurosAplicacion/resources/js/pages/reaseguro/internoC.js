var controlInterno = (function(){
	
	var buscarPorRamo = function(){
		console.log("desde internoC.js");
		var $lmr = $("#lmr").val();
		var $vigor = $("#vigor").val();
		var $ramo = $("#ramo").val();
		var $rango = $("#rango").val();
		
		$.ajax({
			url: "datosPoliza",
			data:{
				lmr : $lmr,
				vigor : $vigor,
				ramo : $ramo,
				rango : $rango
			}
		}).done(function(data){
			console.log(data);
			generarGraficaGeneral(data.resultado);
		});
	};
	
	var generarGraficaGeneral = function(data){
		console.log("data grafico", data);
		var myChart = Highcharts.chart('contratos', {
		    chart: {
		        zoomType: 'xy'
		    },
		    title: {
		        text: 'Contratos'
		    },
		    subtitle: {
		        //text: 'Source: WorldClimate.com'
		    },
		    xAxis: [{
		        categories: ['1', '2', '3', '4', '5', '6', '7'],
		        crosshair: true
		    }],
		    yAxis: [{ // Primary yAxis
		        labels: {
		            format: '${value}',
		            style: {
		                color: Highcharts.getOptions().colors[1]
		            }
		        },
		        title: {
		            text: 'LMR',
		            style: {
		                color: Highcharts.getOptions().colors[1]
		            }
		        }
		    }, { // Secondary yAxis
		        title: {
		            text: 'Contratos',
		            style: {
		                color: Highcharts.getOptions().colors[0]
		            }
		        },
		        labels: {
		            format: '${value}',
		            style: {
		                color: Highcharts.getOptions().colors[0]
		            }
		        },
		        opposite: true
		    }],
		    tooltip: {
		        shared: true
		    },
		    legend: {
		        layout: 'horizontal',
		        align: 'right',
		        verticalAlign: 'top',
		        floating: true,
		        adjustChartSize: true,
		        backgroundColor:
		            Highcharts.defaultOptions.legend.backgroundColor || // theme
		            'rgba(255,255,255,0.25)'
		    },
		    series: [{
		        name: 'Contrato',
		        type: 'scatter',
		        yAxis: 1,
		        //data: [['contrato 1', 490000], ['contrato 2', 710000], ['contrato 3', 106000], ['contrato 4', 129000], ['contrato 5', 144000], ['contrato 6', 176000], ['contrato 7', 135000], ['contrato 8', 148000], ['contrato 9', 216000], ['contrato 10', 194000], ['contrato 11', 950000], ['contrato 12', 540000]],
		        data: data,
		        tooltip: {
	                headerFormat: '<b>{series.name}</b><br>',
	                pointFormat: '{point.name}, {point.y} '
	            }

		    }, {
		        name: 'LMR',
		        type: 'spline',
		        data: [[0, 700000], [6, 700000]],
		        tooltip: {
		            valuePrefix: '$'
		        }
		    }]
		});
	};
	
	var generarGraficaSiniestros = function(container, title, data){
		
		var myChart = Highcharts.chart(container, {
		    chart: {
		        type: 'column',
		        options:{
		        	lang: {
		        		thousandsSep: ','
		        	}
		        }
		    },
		    title: {
		        text: title
		    },
		    xAxis: {
		        categories: data.categories,
		    },
		    yAxis: {
		        min: 0,
		        title: {
		            text: ''
		        }
		    },
		    tooltip: {
		        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
		        shared: true,
		        valuePrefix: '$'
		    },
		    plotOptions: {
		        column: {
		            stacking: 'normal',
		            dataLabels: {
		                enabled: true,
		                format: '${point.y:,.0f}'
		            }
		        }
		    },
		    series: data.series,
		});
	};
	
	var graficaSiniestrosProporcionales = function(){
		$.ajax({
			url: "graficaSiniestrosProporcionales",
			data:{}
		}).done(function(data){
			console.log(data);
			controlInterno.generarGraficaSiniestros('siniestros1', 'Gráfica 1', data.dataExtra);
			controlInterno.generarGraficaSiniestros('siniestros2', 'Gráfica 2', data.dataExtra);
		});
	};
	
	return {
		buscarPorRamo : buscarPorRamo,
		generarGraficaSiniestros : generarGraficaSiniestros,
		graficaSiniestrosProporcionales: graficaSiniestrosProporcionales
	}
})();