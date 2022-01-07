var gastosMedicosC = (function () {
	
    function initFlot(data1, name=""){
        
            $chart = $("#flot-main"+name);
            $tooltip = $('#flot-main-tooltip'+name);

        function _initChart(){
            var plot = $.plotAnimator($chart, [{
                label: "Traffic",
                data: data1,
                lines: {
                    fill: 0.6,
                    lineWidth: 0
                },
                color:['#7ca0d1']
            }],{
                xaxis: {
                	tickLength: 10,
                    tickDecimals: 0,
                    tickPixelInterval: 1000,
                    font :{
                        lineHeight: 13,
                        weight: "bold",
                        color: Sing.colors['gray-semi-light']
                    }
                },
                yaxis: {
                    tickDecimals: 0,
                    tickColor: "#f3f3f3",
                    font :{
                        lineHeight: 13,
                        weight: "bold",
                        color: Sing.colors['gray-semi-light']
                    }
                },
                grid: {
                    backgroundColor: { colors: [ "#fff", "#fff" ] },
                    borderWidth:1,
                    borderColor:"#f0f0f0",
                    margin:0,
                    minBorderMargin:0,
                    labelMargin:20,
                    hoverable: true,
                    clickable: true,
                    mouseActiveRadius:6
                },
                legend: true
            });

            $chart.on("plothover", function (event, pos, item) {
                if (item) {
                    var x = item.datapoint[0].toFixed(2),
                        y = item.datapoint[1].toFixed(2);

                    $tooltip.html(item.series.label + " at " + x + ": " + y)
                        .css({
                            top: item.pageY + 5 - window.scrollY,
                            left: item.pageX + 5 - window.scrollX
                        })
                        .fadeIn(200);
                } else {
                    $tooltip.hide();
                }
            });
        }

        _initChart();

        SingApp.onResize(_initChart);
    }
	
	var calcularRRC = function (){
		var fecha = $('#fechaRRC').val();
	$.ajax({
			url         : "reservas/calcularGastosMedicosIBNRRRC",
			type        : "GET",
			dataType    : 'json',
			data		: {fecha:fecha},
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){
				console.log('COBERTURAS RC')
				console.log(dataSet.mensaje)
				
				if(dataSet.mensaje === 'OK'){
					var belRiesgoIndividual = 0;
					var belGastoIndividual = 0;
					var belGastoColectivo = 0;
					var belRiesgoColectivo = 0;
					var emisionAntisipadaColectivo = 0;
					var emisionAntisipadaIndividual = 0;
					var totalRiesgo = 0;
					var totalGasto = 0;		
					var totalEmision = 0 ;
					/**Asignación de valores**/ 
					$('#belRiesgoTotal').html("$"+dataSet.dataExtra[0].totalRiesgo.toLocaleString("en-US",{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$('#belGastoTotal').html("$"+dataSet.dataExtra[0].totalGasto.toLocaleString("en-US",{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$('#emiAntTotal').html("$"+dataSet.dataExtra[0].totalEmision.toLocaleString("en-US",{maximumFractionDigits: "2", minimumFractionDigits: "2"}));

					$('#belRiesgoInd').html("$"+dataSet.dataExtra[0].belRiesgoIndividual.toLocaleString("en-US",{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$('#belGastosInd').html("$"+dataSet.dataExtra[0].belGastoIndividual.toLocaleString("en-US",{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$('#emiInd').html("$"+dataSet.dataExtra[0].emisionAntisipadaIndividual.toLocaleString("en-US",{maximumFractionDigits: "2", minimumFractionDigits: "2"}));

					$('#belRiesgoCol').html("$"+dataSet.dataExtra[0].belRiesgoColectivo.toLocaleString("en-US",{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$('#belGastosCol').html("$"+dataSet.dataExtra[0].belGastoColectivo.toLocaleString("en-US",{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$('#emiCol').html("$"+dataSet.dataExtra[0].emisionAntisipadaColectivo.toLocaleString("en-US",{maximumFractionDigits: "2", minimumFractionDigits: "2"}));

					/*IBNR*/
					$('#totalBELSORN').html("$"+dataSet.dataExtra[0].totalBELSORN.toLocaleString("en-US",{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$('#BELSORNInd').html("$"+dataSet.dataExtra[0].BELSORNInd.toLocaleString("en-US",{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$('#BELSORNCol').html("$"+dataSet.dataExtra[0].BELSORNCol.toLocaleString("en-US",{maximumFractionDigits: "2", minimumFractionDigits: "2"}));

					$('#ptd1').html("$"+dataSet.dataExtra[0].ptd1.toLocaleString("en-US",{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$('#ptd2').html("$"+dataSet.dataExtra[0].ptd2.toLocaleString("en-US",{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$('#ptd3').html("$"+dataSet.dataExtra[0].ptd3.toLocaleString("en-US",{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$('#ptd4').html("$"+dataSet.dataExtra[0].ptd4.toLocaleString("en-US",{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$('#ptd5').html("$"+dataSet.dataExtra[0].ptd5.toLocaleString("en-US",{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$('#bel1').html("$"+dataSet.dataExtra[0].bel1.toLocaleString("en-US",{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$('#bel2').html("$"+dataSet.dataExtra[0].bel2.toLocaleString("en-US",{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$('#bel3').html("$"+dataSet.dataExtra[0].bel3.toLocaleString("en-US",{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$('#bel4').html("$"+dataSet.dataExtra[0].bel4.toLocaleString("en-US",{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$('#bel5').html("$"+dataSet.dataExtra[0].bel5.toLocaleString("en-US",{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					
					$('#anio1').html(dataSet.dataExtra[0].anio1);
					$('#anio2').html(dataSet.dataExtra[0].anio2);
					$('#anio3').html(dataSet.dataExtra[0].anio3);
					$('#anio4').html(dataSet.dataExtra[0].anio4);
					$('#anio5').html(dataSet.dataExtra[0].anio5);
					$("#tabIBNRalert").hide();
					$("#tabRRCalert").hide();
					$("#tabIBNR").show();
					$("#tabRRC").show();
					$("#BELPrima").show();
					 var data1 = [
			                [dataSet.dataExtra[0].anio5, dataSet.dataExtra[0].ptd5],
			                [dataSet.dataExtra[0].anio4, dataSet.dataExtra[0].ptd4],
			                [dataSet.dataExtra[0].anio3, dataSet.dataExtra[0].ptd3],
			                [dataSet.dataExtra[0].anio2, dataSet.dataExtra[0].ptd2],
			                [dataSet.dataExtra[0].anio1, dataSet.dataExtra[0].ptd1]
			            ],
			            data2 = [
			            	[dataSet.dataExtra[0].anio5, dataSet.dataExtra[0].bel5],
			                [dataSet.dataExtra[0].anio4, dataSet.dataExtra[0].bel4],
			                [dataSet.dataExtra[0].anio3, dataSet.dataExtra[0].bel3],
			                [dataSet.dataExtra[0].anio2, dataSet.dataExtra[0].bel2],
			                [dataSet.dataExtra[0].anio1, dataSet.dataExtra[0].bel1]
			            ];
					 var data2 = [
			            	[dataSet.dataExtra[0].anio5, dataSet.dataExtra[0].bel5],
			                [dataSet.dataExtra[0].anio4, dataSet.dataExtra[0].bel4],
			                [dataSet.dataExtra[0].anio3, dataSet.dataExtra[0].bel3],
			                [dataSet.dataExtra[0].anio2, dataSet.dataExtra[0].bel2],
			                [dataSet.dataExtra[0].anio1, dataSet.dataExtra[0].bel1]
			            ];
					 
					 initFlot(data1);
					 initFlot(data2,"Bel");
					}					
				else{
					$("#tabIBNR").hide();
					$("#tabRRC").hide();
					$("#BELPrima").hide();
					$('#idTable').css('display','none');
					mensajes.modalAlert('warning','Información',dataSet.detalleMensaje);
				}
				
			},
			statusCode: {
				404: function () {
					console.log("");
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	var calcularIBNR = function (){
		var fecha = $('#fechaIBNR').val();
		$.ajax({
				url         : "reservas/calcularIBNR",
				type        : "GET",
				dataType    : 'json',
				data		: fecha,
				contentType : 'application/json',
				beforeSend  : function(){
					util.loadingStart();
				},
				success: function(dataSet){
					console.log('COBERTURAS RC')
					console.log(dataSet.mensaje)
					
					if(dataSet.mensaje === 'OK'){
						
						var columnas =[
							{title:"Ramo",        data:"ramosCat"},
							{title:"Ramo Esp.",   data:"ramoEspCata"},
							{title:"Cobertura",   data:"coberturaCAta"},
							{title:"Descripcion", data:"descripcionCata"},
							{title:"Clave CNSF",  data:"claveCnsf"},
							{title:"Descripcion CNSF",  data:"descCnsf"}
						] 
						
						tabla.iniciarTabla("#coberturas", dataSet.dataExtra, columnas);
						$('#idTable').css('display','block');
						$('.nuevaCob').removeClass('d-none')
						
					}else{
						$('#idTable').css('display','none');
						mensajes.modalAlert('warning','Información',dataSet.detalleMensaje);
					}
					
				},
				statusCode: {
					404: function () {
						console.log("");
					}
				},
				error: function (xhr, status, error) {
					var err = xhr.responseText;
					console.log(xhr);
				},
				complete: function(){
					util.loadingEnd();
				}
			});
		}
	return {
		calcularRRC:calcularRRC
	}
	0
})();