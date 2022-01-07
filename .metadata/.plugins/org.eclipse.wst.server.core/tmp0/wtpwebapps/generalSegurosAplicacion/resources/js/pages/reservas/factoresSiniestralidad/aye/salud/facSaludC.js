var facSaludC = (function () {

	var obtenerTriangulosSaludFac = function (){
		var flagV= true;
		var fecha = $('#fecha').val();
		var fechaDate = new Date(fecha);
		var anio = Number(fechaDate.getFullYear());
		var aniox = Number(fechaDate.getFullYear());
	$.ajax({
			url         : "reservas/obtenerTriangulosSaludFac",
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
				  /*if(dataSet.dataExtra.length==2){
					$('#datatable-tablesPrima').addClass('d-none');
					console.log("Entra condición d-none")
				  }	*/
					for( item of dataSet.dataExtra ){
						if(item.ramo != ""){
							var aux = Number(item.primaDev).toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"});
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
					flagV = false;
					util.loadingEnd();
					mensajes.modalAlert('warning','Información',dataSet.detalleMensaje);
				}
				
			},
			statusCode: {
				404: function () {
					mensajes.modalAlert('warning','Información',"No se encontro la petición al servidor");
					util.loadingEnd();
				}
				
			},
			error: function (xhr, status, error) {
				flagV = false;
				var err = xhr.responseText;
				console.log(xhr);
				mensajes.modalAlert('warning','Información',"Por el momento no se encuentra el servicio disponible, intentelo mas tarde.");
				util.loadingEnd();
				$('#datatable-tablesPrima').addClass('d-none');
			},
			complete: function(){
				if(flagV)
					obtenerTriangulosSaludAll();
				else
					util.loadingEnd();
				//obtenerTriangulosSaludIBNR();
				//util.loadingEnd();
			}
		
		
		});
	}
	
	var obtenerTriangulosSaludAll = function (){
		var flagV = true;
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
			url         : "reservas/obtenerTriangulosSaludAll",
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
						if(item.ramo != "" && item.desarrollo && item.origen){
							if(item.desarrollo >= 0 && item.desarrollo <= 4 ){
							var aux = Number(item.monto).toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"});
							if(item.origen == "10" && item.desarrollo == "0"){
								$('#'+item.ramo+'xIn').html("$"+aux);
								$('#'+item.ramo+'xIn').css({"background-color": "#a8c2e6"});
							}else{
								$('#IBNR'+item.ramo+item.origen+item.desarrollo).html("$"+aux);
								$('#IBNR'+item.ramo+item.origen+item.desarrollo).css({"background-color": "#a8c2e6"});
							}
							$('#'+item.ramo+item.origen+item.desarrollo).html("$"+aux);
							$('#'+item.ramo+item.origen+item.desarrollo).css({"background-color": "#a8c2e6"});
							if(item.ramo == "Individual"){
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
									if(item.desarrollo == "4"){
										sumOrigen7r = sumOrigen7r;
									}else{
										sumOrigen7r = sumOrigen7r + Number(item.monto);
									}
									break;
									case "8":
									if(item.desarrollo == "3" || item.desarrollo == "4"){
										sumOrigen8r = sumOrigen8r;
									}else{
										sumOrigen8r = sumOrigen8r + Number(item.monto);
									}
									break;
									case "9":
									if(item.desarrollo == "2" || item.desarrollo == "3" || item.desarrollo == "4"){
										sumOrigen9r = sumOrigen9r;
									}else{
										sumOrigen9r = sumOrigen9r + Number(item.monto);
									}
									break;
									case "x":
									if(item.desarrollo == "1" || item.desarrollo == "2" || item.desarrollo == "3" || item.desarrollo == "4"){
										sumOrigen10r = sumOrigen10r;
									}else{
										sumOrigen10r = sumOrigen10r + Number(item.monto);
									}
									break;
								}
									switch (item.desarrollo) {
									case "0":
									sumDes0r = sumDes0r + Number(item.monto);
										break;
									case "1":
									if(item.origen == "10"){
										sumDes1r = sumDes1r;
									}else{
										sumDes1r = sumDes1r + Number(item.monto);
									}
									break;
									case "2":
									if(item.origen == "9" || item.origen == "10"){
										sumDes2r = sumDes2r;
									}else{
										sumDes2r = sumDes2r + Number(item.monto);
									}
									break;
									case "3":
									if(item.origen == "8" || item.origen == "9" || item.origen == "10"){
										sumDes3r = sumDes3r;
									}else{
										sumDes3r = sumDes3r + Number(item.monto);
									}
									break;
									case "4":
									if(item.origen == "7" || item.origen == "8" || item.origen == "9" || item.origen == "10"){
										sumDes4r = sumDes4r;
									}else{
										sumDes4r = sumDes4r + Number(item.monto);
									}
									break;
								}
							}else if(item.ramo == "Colectivo"){
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
								if(item.desarrollo == "4"){
									sumOrigen7t = sumOrigen7t;
								}else{
									sumOrigen7t = sumOrigen7t + Number(item.monto);
								}
								break;
								case "8":
								if(item.desarrollo == "3" || item.desarrollo == "4"){
									sumOrigen8t = sumOrigen8t;
								}else{
									sumOrigen8t = sumOrigen8t + Number(item.monto);
								}
								break;
								case "9":
								if(item.desarrollo == "2" || item.desarrollo == "3" || item.desarrollo == "4"){
									sumOrigen9t = sumOrigen9t;
								}else{
									sumOrigen9t = sumOrigen9t + Number(item.monto);
								}
								break;
								case "x":
								if(item.desarrollo == "1" || item.desarrollo == "2" || item.desarrollo == "3" || item.desarrollo == "4"){
									sumOrigen10t = sumOrigen10t;
								}else{
									sumOrigen10t = sumOrigen10t + Number(item.monto);
								}
								break;
							}
								switch (item.desarrollo) {
								case "0":
								sumDes0t = sumDes0t + Number(item.monto);
								break;
								case "1":
								if(item.origen == "10"){
									sumDes1t = sumDes1t;
								}else{
									sumDes1t = sumDes1t + Number(item.monto);
								}
								break;
								case "2":
								if(item.origen == "9" || item.origen == "10"){
									sumDes2t = sumDes2t;
								}else{
									sumDes2t = sumDes2t + Number(item.monto);
								}
								break;
								case "3":
								if(item.origen == "8" || item.origen == "9" || item.origen == "10"){
									sumDes3t = sumDes3t;
								}else{
									sumDes3t = sumDes3t + Number(item.monto);
								}
								break;
								case "4":
								if(item.origen == "7" || item.origen == "8" || item.origen == "9" || item.origen == "10"){
									sumDes4t = sumDes4t;
								}else{
									sumDes4t = sumDes4t + Number(item.monto);
								}
								break;
								
							}
							}
								
							}
					}
						
					}
					/*Suma origenr*/
					$("#sumOR1r").html("$"+sumOrigen1r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR2r").html("$"+sumOrigen2r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR3r").html("$"+sumOrigen3r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR4r").html("$"+sumOrigen4r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR5r").html("$"+sumOrigen5r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR6r").html("$"+sumOrigen6r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR7r").html("$"+sumOrigen7r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR8r").html("$"+sumOrigen8r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR9r").html("$"+sumOrigen9r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR10r").html("$"+sumOrigen10r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					/*Suma desarrollor*/
					$("#sumDR0r").html("$"+sumDes0r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR1r").html("$"+sumDes1r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR2r").html("$"+sumDes2r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR3r").html("$"+sumDes3r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR4r").html("$"+sumDes4r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					
					/*Suma origenr*/
					$("#sumOR1t").html("$"+sumOrigen1r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR2r").html("$"+sumOrigen2r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR3r").html("$"+sumOrigen3r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR4r").html("$"+sumOrigen4r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR5r").html("$"+sumOrigen5r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR6r").html("$"+sumOrigen6r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR7r").html("$"+sumOrigen7r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR8r").html("$"+sumOrigen8r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR9r").html("$"+sumOrigen9r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR10r").html("$"+sumOrigen10r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					/*Suma desarrollor*/
					$("#sumDR0r").html("$"+sumDes0r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR1r").html("$"+sumDes1r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR2r").html("$"+sumDes2r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR3r").html("$"+sumDes3r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR4r").html("$"+sumDes4r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					
					$("#sumOR1t").html("$"+sumOrigen1t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR2t").html("$"+sumOrigen2t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR3t").html("$"+sumOrigen3t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR4t").html("$"+sumOrigen4t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR5t").html("$"+sumOrigen5t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR6t").html("$"+sumOrigen6t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR7t").html("$"+sumOrigen7t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR8t").html("$"+sumOrigen8t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR9t").html("$"+sumOrigen9t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR10t").html("$"+sumOrigen10t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					/*Suma destrrollor*/
					$("#sumDR0t").html("$"+sumDes0t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR1t").html("$"+sumDes1t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR2t").html("$"+sumDes2t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR3t").html("$"+sumDes3t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR4t").html("$"+sumDes4t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					
					$("#sumOR1c").html("$"+sumOrigen1c.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR2c").html("$"+sumOrigen2c.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR3c").html("$"+sumOrigen3c.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR4c").html("$"+sumOrigen4c.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR5c").html("$"+sumOrigen5c.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR6c").html("$"+sumOrigen6c.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR7c").html("$"+sumOrigen7c.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR8c").html("$"+sumOrigen8c.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR9c").html("$"+sumOrigen9c.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR10c").html("$"+sumOrigen10c.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					/*Suma destrrollor*/
					$("#sumDR0c").html("$"+sumDes0c.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR1c").html("$"+sumDes1c.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR2c").html("$"+sumDes2c.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR3c").html("$"+sumDes3c.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR4c").html("$"+sumDes4c.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					
					
					//$("#autosResi").show();
					//$("#tabturis").show(); 
					//$("#tabCami").show();
				}					
				//else{
					
				//}
				
			},
			statusCode: {
				404: function () {
					flagV = false;
					mensajes.modalAlert('warning','Información',"No se encuenta la petición, intentelo mas tarde (codigo:404).");
				util.loadingEnd();
				}
			},
			error: function (xhr, status, error) {
				flagV = false;
				var err = xhr.responseText;
				console.log(xhr);
				mensajes.modalAlert('warning','Información',"Por el momento no se encuentra el servicio disponible, intentelo mas tarde.");
				util.loadingEnd();
				$('#datatable-tablesPrima').addClass('d-none');
			},
			complete: function(){
				if(flagV)
					obtenerTriangulosSaludIBNR();
				else
					util.loadingEnd();
			}
		});
	}
	
	var cargaInflacion = function(file_in) {
		var formData = new FormData();
		if ($(file_in)[0].files.length == 0) {
			return mensajes.modalAlert('warning', 'Información', 'Es necesario que seleccione un archivo.');
		}

		formData.append("file", $(file_in)[0].files[0]);
		
			$.ajax({
				url : "reservas/cargaInflacion",
				type : "POST",
				data : formData,
				enctype : 'multipart/form-data',
				processData : false,
				contentType : false,
				cache : false,
				beforeSend  : function(){
					util.loadingStart();
				},
				success:function(dataSet){
					return mensajes.modalAlert('success', 'Información',dataSet.detalleMensaje);
				},
				statusCode: {
				404: function () {
					console.log("");
					mensajes.modalAlert('warning','Información',"No se encuenta la petición, intentelo mas tarde (codigo:404).");
				util.loadingEnd();
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
				mensajes.modalAlert('warning','Información',"Por el momento no se encuentra el servicio disponible, intentelo mas tarde.");
				util.loadingEnd();
				$('#datatable-tablesPrima').addClass('d-none');
			},
			complete: function(){
				util.loadingEnd();
			}
				
				
			})
			.fail(funcionesAjax.fail);
		
	}
	
	var obtenerTriangulosSaludIBNR = function(){
		
		var fecha = $('#fecha').val();
		var fechaDate = new Date(fecha)
		var anio = Number(fechaDate.getFullYear());
		
		var sumOrigen1r = 0, sumOrigen2r = 0,sumOrigen3r = 0,
			sumOrigen4r = 0,sumOrigen5r = 0,sumOrigen6r = 0,
			sumOrigen7r = 0,sumOrigen8r = 0,sumOrigen9r = 0,sumOrigen10r = 0;
		
		var sumOrigen1t = 0, sumOrigen2t = 0,sumOrigen3t = 0,
		sumOrigen4t = 0,sumOrigen5t = 0,sumOrigen6t = 0,
		sumOrigen7t = 0,sumOrigen8t = 0,sumOrigen9t = 0,sumOrigen10t = 0;
		
		var sumDes0r = 0, sumDes1r = 0, sumDes2r = 0,sumDes3r = 0,
		sumDes4r = 0;
		var sumDes0t = 0, sumDes1t = 0, sumDes2t = 0,sumDes3t = 0,
		sumDes4t = 0;
		
	$.ajax({
			url         : "reservas/obtenerTriangulosSaludIBNR",
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
						if(item.ramo != "" && item.origen != "" && item.desarrollo != ""){
							if(item.desarrollo >= 0 && item.desarrollo <= 4 ){
							var aux = Number(item.monto).toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"});
							if(item.origen == "10" && item.desarrollo == "0"){
								$('#IBNR'+item.ramo+'x').html("$"+aux);
								$('#IBNR'+item.ramo+'x').css({"background-color": "#a8c2e6"});
							}else{
								$('#IBNR'+item.ramo+item.origen+item.desarrollo).html("$"+aux);
								$('#IBNR'+item.ramo+item.origen+item.desarrollo).css({"background-color": "#a8c2e6"});
							}
							
							if(item.ramo == "Individual"){
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
									if(item.desarrollo == "4"){
										sumOrigen7r = sumOrigen7r;
									}else{
										sumOrigen7r = sumOrigen7r + Number(item.monto);
									}
									break;
									case "8":
									if(item.desarrollo == "3" || item.desarrollo == "4"){
										sumOrigen8r = sumOrigen8r;
									}else{
										sumOrigen8r = sumOrigen8r + Number(item.monto);
									}
									break;
									case "9":
									if(item.desarrollo == "2" || item.desarrollo == "3" || item.desarrollo == "4"){
										sumOrigen9r = sumOrigen9r;
									}else{
										sumOrigen9r = sumOrigen9r + Number(item.monto);
									}
									break;
									case "x":
									if(item.desarrollo == "1" || item.desarrollo == "2" || item.desarrollo == "3" || item.desarrollo == "4"){
										sumOrigen10r = sumOrigen10r;
									}else{
										sumOrigen10r = sumOrigen10r + Number(item.monto);
									}
									break;
								}
									switch (item.desarrollo) {
									case "0":
										sumDes0r = sumDes0r + Number(item.monto);
										break;
									case "1":
									if(item.origen == "10"){
										sumDes1r = sumDes1r;
									}else{
										sumDes1r = sumDes1r + Number(item.monto);
									}
									break;
									case "2":
									if(item.origen == "9" || item.origen == "10"){
										sumDes2r = sumDes2r;
									}else{
										sumDes2r = sumDes2r + Number(item.monto);
									}
									break;
									case "3":
									if(item.origen == "8" || item.origen == "9" || item.origen == "10"){
										sumDes3r = sumDes3r;
									}else{
										sumDes3r = sumDes3r + Number(item.monto);
									}
									break;
									case "4":
									if(item.origen == "7" || item.origen == "8" || item.origen == "9" || item.origen == "10"){
										sumDes4r = sumDes4r;
									}else{
										sumDes4r = sumDes4r + Number(item.monto);
									}
									break;
									
								}
							}else if(item.ramo == "Colectivo"){
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
								if(item.desarrollo == "4"){
									sumOrigen7t = sumOrigen7t;
								}else{
									sumOrigen7t = sumOrigen7t + Number(item.monto);
								}
								break;
								case "8":
								if(item.desarrollo == "3" || item.desarrollo == "4"){
									sumOrigen8t = sumOrigen8t;
								}else{
									sumOrigen8t = sumOrigen8t + Number(item.monto);
								}
								break;
								case "9":
								if(item.desarrollo == "2" || item.desarrollo == "3" || item.desarrollo == "4"){
									sumOrigen9t = sumOrigen9t;
								}else{
									sumOrigen9t = sumOrigen9t + Number(item.monto);
								}
								break;
								case "x":
								if(item.desarrollo == "1" || item.desarrollo == "2" || item.desarrollo == "3" || item.desarrollo == "4"){
									sumOrigen10t = sumOrigen10t;
								}else{
									sumOrigen10t = sumOrigen10t + Number(item.monto);
								}
								break;
							}
								switch (item.desarrollo) {
								case "0":
									sumDes0t = sumDes0t + Number(item.monto);
									break;
								case "1":
								if(item.origen == "10"){
									sumDes1t = sumDes1t;
								}else{
									sumDes1t = sumDes1t + Number(item.monto);
								}
								break;
								case "2":
								if(item.origen == "9" || item.origen == "10"){
									sumDes2t = sumDes2t;
								}else{
									sumDes2t = sumDes2t + Number(item.monto);
								}
								break;
								case "3":
								if(item.origen == "8" || item.origen == "9" || item.origen == "10"){
									sumDes3t = sumDes3t;
								}else{
									sumDes3t = sumDes3t + Number(item.monto);
								}
								break;
								case "4":
								if(item.origen == "7" || item.origen == "8" || item.origen == "9" || item.origen == "10"){
									sumDes4t = sumDes4t;
								}else{
									sumDes4t = sumDes4t + Number(item.monto);
								}
								break;
								
							}
								
							}
						}
					}
						
					}
					/*Suma origenr*/
					$("#sumOR1rIBNR").html("$"+sumOrigen1r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR2rIBNR").html("$"+sumOrigen2r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR3rIBNR").html("$"+sumOrigen3r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR4rIBNR").html("$"+sumOrigen4r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR5rIBNR").html("$"+sumOrigen5r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR6rIBNR").html("$"+sumOrigen6r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR7rIBNR").html("$"+sumOrigen7r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR8rIBNR").html("$"+sumOrigen8r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR9rIBNR").html("$"+sumOrigen9r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR10rIBNR").html("$"+sumOrigen10r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					/*Suma desarrollor*/
					$("#sumDR0rIBNR").html("$"+sumDes0r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR1rIBNR").html("$"+sumDes1r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR2rIBNR").html("$"+sumDes2r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR3rIBNR").html("$"+sumDes3r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR4rIBNR").html("$"+sumDes4r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					
					/*Suma origenr*/
					$("#sumOR1rIBNR").html("$"+sumOrigen1r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR2rIBNR").html("$"+sumOrigen2r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR3rIBNR").html("$"+sumOrigen3r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR4rIBNR").html("$"+sumOrigen4r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR5rIBNR").html("$"+sumOrigen5r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR6rIBNR").html("$"+sumOrigen6r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR7rIBNR").html("$"+sumOrigen7r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR8rIBNR").html("$"+sumOrigen8r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR9rIBNR").html("$"+sumOrigen9r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR10rIBNR").html("$"+sumOrigen10r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					/*Suma desarrollor*/
					$("#sumDR0rIBNR").html("$"+sumDes0r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR1rIBNR").html("$"+sumDes1r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR2rIBNR").html("$"+sumDes2r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR3rIBNR").html("$"+sumDes3r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR4rIBNR").html("$"+sumDes4r.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					
					$("#sumOR1tIBNR").html("$"+sumOrigen1t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR2tIBNR").html("$"+sumOrigen2t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR3tIBNR").html("$"+sumOrigen3t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR4tIBNR").html("$"+sumOrigen4t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR5tIBNR").html("$"+sumOrigen5t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR6tIBNR").html("$"+sumOrigen6t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR7tIBNR").html("$"+sumOrigen7t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR8tIBNR").html("$"+sumOrigen8t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR9tIBNR").html("$"+sumOrigen9t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumOR10tIBNR").html("$"+sumOrigen10t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					/*Suma destrrollor*/
					$("#sumDR0tIBNR").html("$"+sumDes0t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR1tIBNR").html("$"+sumDes1t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR2tIBNR").html("$"+sumDes2t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR3tIBNR").html("$"+sumDes3t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					$("#sumDR4tIBNR").html("$"+sumDes4t.toLocaleString('en-US',{maximumFractionDigits: "2", minimumFractionDigits: "2"}));
					
					/*$("#sumOR1c").html("$"+sumOrigen1c.toLocaleString('en-US'));
					$("#sumOR2c").html("$"+sumOrigen2c.toLocaleString('en-US'));
					$("#sumOR3c").html("$"+sumOrigen3c.toLocaleString('en-US'));
					$("#sumOR4c").html("$"+sumOrigen4c.toLocaleString('en-US'));
					$("#sumOR5c").html("$"+sumOrigen5c.toLocaleString('en-US'));
					$("#sumOR6c").html("$"+sumOrigen6c.toLocaleString('en-US'));
					$("#sumOR7c").html("$"+sumOrigen7c.toLocaleString('en-US'));
					$("#sumOR8c").html("$"+sumOrigen8c.toLocaleString('en-US'));
					$("#sumOR9c").html("$"+sumOrigen9c.toLocaleString('en-US'));
					$("#sumOR10c").html("$"+sumOrigen10c.toLocaleString('en-US'));
					/Suma destrrollor/
					$("#sumDR0c").html("$"+sumDes0c.toLocaleString('en-US'));
					$("#sumDR1c").html("$"+sumDes1c.toLocaleString('en-US'));
					$("#sumDR2c").html("$"+sumDes2c.toLocaleString('en-US'));
					$("#sumDR3c").html("$"+sumDes3c.toLocaleString('en-US'));
					$("#sumDR4c").html("$"+sumDes4c.toLocaleString('en-US'));*/
					
					$("#tabRRC").show();
					//$("#autosResi").show();
					//$("#tabturis").show(); 
					//$("#tabCami").show();
					$("#indIbnr").show();
					$("#colecIbnr").show();
					$("#tabRRC").show();
					$("#indRrc").show();
					$("#colecRrc").show();
					
					$("#datatable-vecPrimas").tableExport({
						formats: ["xlsx"], //Tipo de archivos a exportar ("xlsx","txt", "csv", "xls")
						position: 'button',  // Posicion que se muestran los botones puedes ser: (top, bottom)
						bootstrap: true,//Usar lo estilos de css de bootstrap para los botones (true, false)
						fileName: "Primas",    //Nombre del archivo 
					});
					$("#datatable-TrianRRCIndividual").tableExport({
						formats: ["xlsx"], //Tipo de archivos a exportar ("xlsx","txt", "csv", "xls")
						position: 'button',  // Posicion que se muestran los botones puedes ser: (top, bottom)
						bootstrap: true,//Usar lo estilos de css de bootstrap para los botones (true, false)
						fileName: "TriánguloRRCIndividual",    //Nombre del archivo 
					});
					$("#datatable-tablesTriaINBRIndi").tableExport({
						formats: ["xlsx"], //Tipo de archivos a exportar ("xlsx","txt", "csv", "xls")
						position: 'button',  // Posicion que se muestran los botones puedes ser: (top, bottom)
						bootstrap: true,//Usar lo estilos de css de bootstrap para los botones (true, false)
						fileName: "TriánguloIBNRIndividual",    //Nombre del archivo 
					});
					$("#datatable-tablesTriColRRC").tableExport({
						formats: ["xlsx"], //Tipo de archivos a exportar ("xlsx","txt", "csv", "xls")
						position: 'button',  // Posicion que se muestran los botones puedes ser: (top, bottom)
						bootstrap: true,//Usar lo estilos de css de bootstrap para los botones (true, false)
						fileName: "TriánguloColectivoRRC",    //Nombre del archivo 
					});  
					
					$("#datatable-tablesTriaColIBNR").tableExport({
						formats: ["xlsx"], //Tipo de archivos a exportar ("xlsx","txt", "csv", "xls")
						position: 'button',  // Posicion que se muestran los botones puedes ser: (top, bottom)
						bootstrap: true,//Usar lo estilos de css de bootstrap para los botones (true, false)
						fileName: "TriánguloColectivoIBNR",    //Nombre del archivo 
					});  
					$("#datatable-tablesFacSin").tableExport({
						formats: ["xlsx"], //Tipo de archivos a exportar ("xlsx","txt", "csv", "xls")
						position: 'button',  // Posicion que se muestran los botones puedes ser: (top, bottom)
						bootstrap: true,//Usar lo estilos de css de bootstrap para los botones (true, false)
						fileName: "FactorSiniestralidad",    //Nombre del archivo 
					});
				}					
				else{
					$("#hide").show();
					//$("#tabIBNR").hide();
					//$("#tabRRC").hide();
					$("#BELPrima").hide();
					$("#indIbnr").hide();
					$("#colecIbnr").hide();
					$("#indRrc").hide();
					$("#colecRrc").hide();
					$('#idTable').css('display','none');
					mensajes.modalAlert('warning','Información',dataSet.detalleMensaje);
				}
				
			},
			statusCode: {
				404: function () {
					mensajes.modalAlert('warning','Información',"Por el momento no se encuentra el servicio disponible, intentelo mas tarde.");
				util.loadingEnd();
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
				mensajes.modalAlert('warning','Error',"Valide con su proveedor del servicio [500].");
				util.loadingEnd();
				$('#datatable-tablesPrima').addClass('d-none');
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	var generarExcelInflacion = function (){
		$.ajax({
			    url : "reservas/generarExcelInflacion",
			    contentType: "application/vnd.ms-excel",
			    beforeSend : function(xhr) {
			      util.loadingStart();
			    },
			    success : function(data, status, xhr) {
			        util.loadingEnd();
			        //Si se han devuelto datos
			        if (data != null && data != "FAIL") {
			            var b64Data = data;
			            var contentType = xhr.getResponseHeader("Content-Type"); //Obtenemos el tipo de los datos
			            var filename = xhr.getResponseHeader("Content-disposition");//Obtenemos el nombre del fichero a desgargar
			            //filename = filename.substring(filename.lastIndexOf("=") + 1) || "download";
			            var sliceSize = 512;
			            var byteCharacters = window.atob(b64Data);
			            var byteArrays = [];
			 
			            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			                var slice = byteCharacters.slice(offset, offset + sliceSize);
			 
			                var byteNumbers = new Array(slice.length);
			                for (var i = 0; i < slice.length; i++) {
			                    byteNumbers[i] = slice.charCodeAt(i);
			                }
			 
			                var byteArray = new Uint8Array(byteNumbers);
			 
			                byteArrays.push(byteArray);
			            }
			            //Tras el procesado anterior creamos un objeto blob
			            var blob = new Blob(byteArrays, {
			                type : contentType
			            });
			 
			            // IE 10+
			            if (navigator.msSaveBlob) {
			                navigator.msSaveBlob(blob, filename);
			            } else {
			            //Descargamos el fichero obtenido en la petición ajax
			                var url = URL.createObjectURL(blob);
			                var link = document.createElement('a');
			                link.href = url;
			                link.download = "Inflación.xlsx";
			                document.body.appendChild(link);
			                link.click();
			                document.body.removeChild(link);
			            }
			 
			        }
			    },
			    complete : function(xhr, status) {
			        if (xhr.readyState == 4) {
			            if (xhr.status == 200) {
			               util.loadingEnd();
			                var contentLength = xhr.getResponseHeader("Content-Length");
			 
			                if (contentLength && contentLength == 0)
			                    mensajes.modalAlert('warning','Información',"El archivo no contiene datos");
								
			 
			            }
			        }
			 
			    },
				statusCode: {
				404: function () {
					mensajes.modalAlert('warning','Información',"Verifique su conexión a internet código:404");
				util.loadingEnd();
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
				mensajes.modalAlert('warning','Error',"Valide con su proveedor del servicio [500].");
				util.loadingEnd();
				$('#datatable-tablesPrima').addClass('d-none');
			},
			});
		}
		
	var descargaPhiM = function (){
		var fecha = $("#fecha").val();
		if(fecha == ""){
			mensajes.modalAlert('warning','Información',"Seleccione una fecha");
		}else{
			$.ajax({
				    url : "reservas/descargaPhiM",
				    contentType: "application/vnd.ms-excel",
					data		: {fecha:fecha},
				    beforeSend : function(xhr) {
				      util.loadingStart();
				    },
				    success : function(data, status, xhr) {
				        util.loadingEnd();
				        //Si se han devuelto datos
				        if (data != null && data != "FAIL") {
				            var b64Data = data;
				            var contentType = xhr.getResponseHeader("Content-Type"); //Obtenemos el tipo de los datos
				            var filename = xhr.getResponseHeader("Content-disposition");//Obtenemos el nombre del fichero a desgargar
				            //filename = filename.substring(filename.lastIndexOf("=") + 1) || "download";
				            var sliceSize = 512;
				            var byteCharacters = window.atob(b64Data);
				            var byteArrays = [];
				 
				            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
				                var slice = byteCharacters.slice(offset, offset + sliceSize);
				 
				                var byteNumbers = new Array(slice.length);
				                for (var i = 0; i < slice.length; i++) {
				                    byteNumbers[i] = slice.charCodeAt(i);
				                }
				 
				                var byteArray = new Uint8Array(byteNumbers);
				 
				                byteArrays.push(byteArray);
				            }
				            //Tras el procesado anterior creamos un objeto blob
				            var blob = new Blob(byteArrays, {
					                type : contentType
					            });
					 
					            // IE 10+
					            if (navigator.msSaveBlob) {
					                navigator.msSaveBlob(blob, filename);
					            } else {
					            //Descargamos el fichero obtenido en la petición ajax
					                var url = URL.createObjectURL(blob);
					                var link = document.createElement('a');
					                link.href = url;
					                link.download = "Cálculo Phi M.xlsx";
					                document.body.appendChild(link);
					                link.click();
					                document.body.removeChild(link);
					            }
					 
					        }
					    },
					    complete : function(xhr, status) {
					        if (xhr.readyState == 4) {
					            if (xhr.status == 200) {
					               util.loadingEnd();
					                var contentLength = xhr.getResponseHeader("Content-Length");
					 
					                if (contentLength && contentLength == 0)
					                    mensajes.modalAlert('warning','Información',"El archivo no contiene datos");
										
					 
					            }
					        }
					 
					    },
						statusCode: {
						404: function () {
							mensajes.modalAlert('warning','Información',"Verifique su conexión a internet código:404");
						util.loadingEnd();
						}
					},
					error: function (xhr, status, error) {
						var err = xhr.responseText;
						console.log(xhr);
						mensajes.modalAlert('warning','Error',"Valide con su proveedor del servicio [500].");
						util.loadingEnd();
						$('#datatable-tablesPrima').addClass('d-none');
					},
					});
			}
		}
	return {
		obtenerTriangulosSaludFac:obtenerTriangulosSaludFac,
		obtenerTriangulosSaludAll:obtenerTriangulosSaludAll,
		obtenerTriangulosSaludIBNR:obtenerTriangulosSaludIBNR,
		cargaInflacion:cargaInflacion,
		generarExcelInflacion:generarExcelInflacion,
		descargaPhiM:descargaPhiM
	}
})();