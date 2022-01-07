var automovilesC = (function () {

	var obtenerTriangulosAutosFac = function (){
		var fecha = $('#fecha').val();
		var fechaDate = new Date(fecha)
		var anio = Number(fechaDate.getFullYear());
		var aniox = Number(fechaDate.getFullYear());
	$.ajax({
			url         : "reservas/obtenerTriangulosAutosFac",
			type        : "GET",
			dataType    : 'json',
			data		: {fecha:fecha},
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){
				console.log(dataSet.dataExtra);
				
				if(dataSet.mensaje === 'OK'){
					for( item of dataSet.dataExtra ){
						if(item.ramo != ""){
							var aux = Number(item.primaDev).toLocaleString('en-US');
							$('#P'+item.ramo+item.anioOrigen).html("$"+aux);
						}
					}
					var i;
					for (i = 0; i < 10; i++) {
						$('#'+item.anioOrigen).html(anio);
						anio--
					}
					var x;
					for(x=1; x <= 10; x++) {
						$('#a'+x).html(aniox);
						aniox--;
					}
					
					
				}					
				else{
					$("#tabRRC").hide();
					
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
				obtenerTriangulosAutosAll();
			}
		});
	}
	
	var obtenerTriangulosAutosAll = function (){
		var fecha = $('#fecha').val();
		var fechaDate = new Date(fecha)
		var anio = Number(fechaDate.getFullYear());
		
		var sumOrigen1r = 0, sumOrigen2r = 0,sumOrigen3r = 0,
			sumOrigen4r = 0,sumOrigen5r = 0,sumOrigen6r = 0,
			sumOrigen7r = 0,sumOrigen8r = 0,sumOrigen9r = 0,sumOrigen10r = 0;
		
		var sumOrigen1t = 0, sumOrigen2t = 0,sumOrigen3t = 0,
		sumOrigen4t = 0,sumOrigen5t = 0,sumOrigen6t = 0,
		sumOrigen7t = 0,sumOrigen8t = 0,sumOrigen9t = 0,sumOrigen10t = 0;
		
		var sumOrigen1c = 0, sumOrigen2c = 0,sumOrigen3c = 0,
		sumOrigen4c = 0,sumOrigen5c = 0,sumOrigen6c = 0,
		sumOrigen7c = 0,sumOrigen8c = 0,sumOrigen9c = 0,sumOrigen10c = 0;
		
		var sumDes0r = 0, sumDes1r = 0, sumDes2r = 0,sumDes3r = 0,
		sumDes4r = 0;
		var sumDes0t = 0, sumDes1t = 0, sumDes2t = 0,sumDes3t = 0,
		sumDes4t = 0;
		var sumDes0c = 0, sumDes1c = 0, sumDes2c = 0,sumDes3c = 0,
		sumDes4c = 0;
		
	$.ajax({
			url         : "reservas/obtenerTriangulosAutosAll",
			type        : "GET",
			dataType    : 'json',
			data		: {fecha:fecha},
			contentType : 'application/json',
			
			success: function(dataSet){
				console.log(dataSet.dataExtra);
				
				if(dataSet.mensaje === 'OK'){
					for( item of dataSet.dataExtra ){
						if(item.ramo != ""){
							if(item.desarrollo >= 0 && item.desarrollo <= 4 )
							var aux = Number(item.monto).toLocaleString('en-US');
							$('#'+item.ramo+item.origen+item.desarrollo).html("$"+aux);
							$('#'+item.ramo+item.origen+item.desarrollo).css({"background-color": "#a8c2e6"});
							if(item.ramo == "AutosResidentes"){
								switch (item.origen) {
									case "1":
										sumOrigen1r = sumOrigen1r + Number(item.monto);
									break;
									case "2":
										sumOrigen2r = sumOrigen2r + Number(item.monto);
									break;
									case "3":
										sumOrigen3r = sumOrigen3r + Number(item.monto);
									break;
									case "4":
										sumOrigen4r = sumOrigen4r + Number(item.monto);
									break;
									case "5":
										sumOrigen5r = sumOrigen5r + Number(item.monto);
									break;
									case "6":
										sumOrigen6r = sumOrigen6r + Number(item.monto);
									break;
									case "7":
										sumOrigen7r = sumOrigen7r + Number(item.monto);
									break;
									case "8":
										sumOrigen8r = sumOrigen8r + Number(item.monto);
									break;
									case "9":
										sumOrigen9r = sumOrigen9r + Number(item.monto);
									break;
									case "10":
										sumOrigen10r = sumOrigen10r + Number(item.monto);
									break;
								}
									switch (item.desarrollo) {
									case "0":
										sumDes0r = sumDes0r + Number(item.monto);
										break;
									case "1":
										sumDes1r = sumDes1r + Number(item.monto);
									break;
									case "2":
										sumDes2r = sumDes2r + Number(item.monto);
									break;
									case "3":
										sumDes3r = sumDes3r + Number(item.monto);
									break;
									case "4":
										sumDes4r = sumDes4r + Number(item.monto);
									break;
									
								}
							}else if(item.ramo == "AutosTuristas"){
								switch (item.origen) {
								case "1":
									sumOrigen1t = sumOrigen1t + Number(item.monto);
								break;
								case "2":
									sumOrigen2t = sumOrigen2t + Number(item.monto);
								break;
								case "3":
									sumOrigen3t = sumOrigen3t + Number(item.monto);
								break;
								case "4":
									sumOrigen4t = sumOrigen4t + Number(item.monto);
								break;
								case "5":
									sumOrigen5t = sumOrigen5t + Number(item.monto);
								break;
								case "6":
									sumOrigen6t = sumOrigen6t + Number(item.monto);
								break;
								case "7":
									sumOrigen7t = sumOrigen7t + Number(item.monto);
								break;
								case "8":
									sumOrigen8t = sumOrigen8t + Number(item.monto);
								break;
								case "9":
									sumOrigen9t = sumOrigen9t + Number(item.monto);
								break;
								case "10":
									sumOrigen10t = sumOrigen10t + Number(item.monto);
								break;
							}
								switch (item.desarrollo) {
								case "0":
									sumDes0t = sumDes0t + Number(item.monto);
									break;
								case "1":
									sumDes1t = sumDes1t + Number(item.monto);
								break;
								case "2":
									sumDes2t = sumDes2t + Number(item.monto);
								break;
								case "3":
									sumDes3t = sumDes3t + Number(item.monto);
								break;
								case "4":
									sumDes4t = sumDes4t + Number(item.monto);
								break;
								
							}
								
							}else if(item.ramo == "CamionesResidentes"){
								switch (item.origen) {
								case "1":
									sumOrigen1c = sumOrigen1c + Number(item.monto);
								break;
								case "2":
									sumOrigen2c = sumOrigen2c + Number(item.monto);
								break;
								case "3":
									sumOrigen3c = sumOrigen3c + Number(item.monto);
								break;
								case "4":
									sumOrigen4c = sumOrigen4c + Number(item.monto);
								break;
								case "5":
									sumOrigen5c = sumOrigen5c + Number(item.monto);
								break;
								case "6":
									sumOrigen6c = sumOrigen6c + Number(item.monto);
								break;
								case "7":
									sumOrigen7c = sumOrigen7c + Number(item.monto);
								break;
								case "8":
									sumOrigen8c = sumOrigen8c + Number(item.monto);
								break;
								case "9":
									sumOrigen9c = sumOrigen9c + Number(item.monto);
								break;
								case "10":
									sumOrigen10c = sumOrigen10c + Number(item.monto);
								break;
							}
								switch (item.desarrollo) {
								case "0":
									sumDes0c = sumDes0c + Number(item.monto);
									break;
								case "1":
									sumDes1c = sumDes1c + Number(item.monto);
								break;
								case "2":
									sumDes2c = sumDes2c + Number(item.monto);
								break;
								case "3":
									sumDes3c = sumDes3c + Number(item.monto);
								break;
								case "4":
									sumDes4c = sumDes4c + Number(item.monto);
								break;
								
							}
							}
					}
						
					}
					/*Suma origenr*/
					$("#sumOR1r").html("$"+sumOrigen1r.toLocaleString('en-US'));
					$("#sumOR2r").html("$"+sumOrigen2r.toLocaleString('en-US'));
					$("#sumOR3r").html("$"+sumOrigen3r.toLocaleString('en-US'));
					$("#sumOR4r").html("$"+sumOrigen4r.toLocaleString('en-US'));
					$("#sumOR5r").html("$"+sumOrigen5r.toLocaleString('en-US'));
					$("#sumOR6r").html("$"+sumOrigen6r.toLocaleString('en-US'));
					$("#sumOR7r").html("$"+sumOrigen7r.toLocaleString('en-US'));
					$("#sumOR8r").html("$"+sumOrigen8r.toLocaleString('en-US'));
					$("#sumOR9r").html("$"+sumOrigen9r.toLocaleString('en-US'));
					$("#sumOR10r").html("$"+sumOrigen10r.toLocaleString('en-US'));
					/*Suma desarrollor*/
					$("#sumDR0r").html("$"+sumDes0r.toLocaleString('en-US'));
					$("#sumDR1r").html("$"+sumDes1r.toLocaleString('en-US'));
					$("#sumDR2r").html("$"+sumDes2r.toLocaleString('en-US'));
					$("#sumDR3r").html("$"+sumDes3r.toLocaleString('en-US'));
					$("#sumDR4r").html("$"+sumDes4r.toLocaleString('en-US'));
					
					/*Suma origenr*/
					$("#sumOR1t").html("$"+sumOrigen1r.toLocaleString('en-US'));
					$("#sumOR2r").html("$"+sumOrigen2r.toLocaleString('en-US'));
					$("#sumOR3r").html("$"+sumOrigen3r.toLocaleString('en-US'));
					$("#sumOR4r").html("$"+sumOrigen4r.toLocaleString('en-US'));
					$("#sumOR5r").html("$"+sumOrigen5r.toLocaleString('en-US'));
					$("#sumOR6r").html("$"+sumOrigen6r.toLocaleString('en-US'));
					$("#sumOR7r").html("$"+sumOrigen7r.toLocaleString('en-US'));
					$("#sumOR8r").html("$"+sumOrigen8r.toLocaleString('en-US'));
					$("#sumOR9r").html("$"+sumOrigen9r.toLocaleString('en-US'));
					$("#sumOR10r").html("$"+sumOrigen10r.toLocaleString('en-US'));
					/*Suma desarrollor*/
					$("#sumDR0r").html("$"+sumDes0r.toLocaleString('en-US'));
					$("#sumDR1r").html("$"+sumDes1r.toLocaleString('en-US'));
					$("#sumDR2r").html("$"+sumDes2r.toLocaleString('en-US'));
					$("#sumDR3r").html("$"+sumDes3r.toLocaleString('en-US'));
					$("#sumDR4r").html("$"+sumDes4r.toLocaleString('en-US'));
					
					$("#sumOR1t").html("$"+sumOrigen1t.toLocaleString('en-US'));
					$("#sumOR2t").html("$"+sumOrigen2t.toLocaleString('en-US'));
					$("#sumOR3t").html("$"+sumOrigen3t.toLocaleString('en-US'));
					$("#sumOR4t").html("$"+sumOrigen4t.toLocaleString('en-US'));
					$("#sumOR5t").html("$"+sumOrigen5t.toLocaleString('en-US'));
					$("#sumOR6t").html("$"+sumOrigen6t.toLocaleString('en-US'));
					$("#sumOR7t").html("$"+sumOrigen7t.toLocaleString('en-US'));
					$("#sumOR8t").html("$"+sumOrigen8t.toLocaleString('en-US'));
					$("#sumOR9t").html("$"+sumOrigen9t.toLocaleString('en-US'));
					$("#sumOR10t").html("$"+sumOrigen10t.toLocaleString('en-US'));
					/*Suma destrrollor*/
					$("#sumDR0t").html("$"+sumDes0t.toLocaleString('en-US'));
					$("#sumDR1t").html("$"+sumDes1t.toLocaleString('en-US'));
					$("#sumDR2t").html("$"+sumDes2t.toLocaleString('en-US'));
					$("#sumDR3t").html("$"+sumDes3t.toLocaleString('en-US'));
					$("#sumDR4t").html("$"+sumDes4t.toLocaleString('en-US'));
					
					$("#sumOR1c").html("$"+sumOrigen1c.toLocaleString('en-US'));
					$("#sumOR2c").html("$"+sumOrigen2c.toLocaleString('en-US'));
					$("#sumOR3c").html("$"+sumOrigen3c.toLocaleString('en-US'));
					$("#sumOR4c").html("$"+sumOrigen4c.toLocaleString('en-US'));
					$("#sumOR5c").html("$"+sumOrigen5c.toLocaleString('en-US'));
					$("#sumOR6c").html("$"+sumOrigen6c.toLocaleString('en-US'));
					$("#sumOR7c").html("$"+sumOrigen7c.toLocaleString('en-US'));
					$("#sumOR8c").html("$"+sumOrigen8c.toLocaleString('en-US'));
					$("#sumOR9c").html("$"+sumOrigen9c.toLocaleString('en-US'));
					$("#sumOR10c").html("$"+sumOrigen10c.toLocaleString('en-US'));
					/*Suma destrrollor*/
					$("#sumDR0c").html("$"+sumDes0c.toLocaleString('en-US'));
					$("#sumDR1c").html("$"+sumDes1c.toLocaleString('en-US'));
					$("#sumDR2c").html("$"+sumDes2c.toLocaleString('en-US'));
					$("#sumDR3c").html("$"+sumDes3c.toLocaleString('en-US'));
					$("#sumDR4c").html("$"+sumDes4c.toLocaleString('en-US'));
					
					$("#tabRRC").show();
					$("#autosResi").show();
					$("#tabturis").show(); 
					$("#tabCami").show();
				}					
				else{
					$("#hide").show();
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
	return {
		obtenerTriangulosAutosFac:obtenerTriangulosAutosFac,
		obtenerTriangulosAutosAll:obtenerTriangulosAutosAll
	}
})();