var analisisC = (function () {
	
	/** *** TRAER LA TABLA DEL HISTORICO SALUD *** */
	/** ***************************************** */
	
	var verificarLista = function (){
		
		$.ajax({
					
				url         : "ReportesSesaC/verificarLista",
				type        : "GET",
				dataType    : 'json',
				contentType : 'application/json',
				beforeSend  : function(){
					util.loadingStart();
				},
				success: function(dataSet){
					console.log('verificarLista')
					console.log(dataSet.mensaje)
					
					if(dataSet.mensaje === 'OK'){
						
						var columnas =[
							{title:"SESA",        data:"sesa"},
							{title:"AÑIO 2017",   data:"anio17"},
							{title:"AÑIO 2018",   data:"anio18"},
							{title:"AÑIO 2019", data:"anio19"},
							{title:"AÑIO 2020",  data:"anio20"}
						] 
						
						tabla.iniciarTabla("#coberturas", dataSet.dataExtra, columnas);
						$('#idTable').css('display','block');
						// $('.nuevaCob').removeClass('d-none')
						
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
	
	
	
	
	/** * TRAER CATALOGO VALIDACIONES POR CADA ARCHIVO VIGENTES ** */
	/** ********************************************************* */
	
	var ValidacionesSalud = function (){
		
		var tipo = $('#tipoValidacion').val()
	    var anioReporte = $('#ejercicioSalud').val()
		
		console.log(anioReporte)
		console.log(tipo)
		
		if(tipo ===  null || tipo === '0'){
			return mensajes.modalAlert('warning', 'Información', 'Es Necesario elegir el Tipo de Reporte');
		}
		
		if(anioReporte === null || anioReporte === '0'){
			return mensajes.modalAlert('warning', 'Información', 'Es Necesario elegir Año de Reporte');
		}
		
		
		$.ajax({
				url         : "ReportesSesaC/catalogoValidacionesSalud/"+anioReporte+"/"+tipo,
				type        : "GET",
				dataType    : 'json',
				contentType : 'application/json',
				beforeSend  : function(){
					util.loadingStart();
				},
				success: function(dataSet){
					console.log('catalogo validaciones')
					console.log(dataSet.mensaje)
					
					if(dataSet.mensaje === 'OK'){
						
						var columnas =[
							{title:"CAMPO",        data:"campo"},
							{title:"DESCRIPCION",   data:"descripcion"},
							{title:"ERROR",   data:"error"},
							{title:"AÑO", data:"anio"}
						] 
						
						tabla.iniciarTabla("#tablaValidaciones", dataSet.dataExtra, columnas);
						$('#idTableValidaciones').css('display','block');
						// $('.nuevaCob').removeClass('d-none')
						
					}else{
						$('#idTableValidaciones').css('display','none');
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
	
	
	/** ********* DESCARGAR VALIDACIONES PDF ************* */
	/** ************************************************* */
	var descargarPDF = function(){
		
		var tipo = $('#tipoValidacion').val()
	    var anioReporte = $('#ejercicioSalud').val()
		
		if(anioReporte === null || anioReporte === '0'){
			return mensajes.modalAlert('warning', 'Información', 'Es Necesario elegir Año de Reporte');
		}
		
		if(tipo ===  null || tipo === '0'){
			return mensajes.modalAlert('warning', 'Información', 'Es Necesario elegir el Tipo de Reporte');
		}
		
		$.ajax({
			url         : "ReportesSesaC/pdfprimero/"+anioReporte+"/"+tipo,
			type        : "GET",
			dataType    : 'json',
			contentType : 'application/json',
			
			success: function(dataSet){
				
				if(dataSet.mensaje === "OK"){
					 
					$('<form>', {
			            "id": "imprimir",
			            "action": "ReportesSesaC/pdf/"+anioReporte+"/"+tipo
			        }).appendTo(document.body).submit();
					
				}else{
					mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
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
	
	/** ********* DESCARGAR VALIDACIONES PDF ************* */
	/** ************************************************* */
	function descargarPDF1(){
		var tipo = $('#tipoValidacion').val()
	    var anioReporte = $('#ejercicioSalud').val()
	    
	    if(tipo ===  null || tipo === '0'){
			return mensajes.modalAlert('warning', 'Información', 'Es Necesario elegir el Tipo de Reporte');
		}
		
		if(anioReporte === null || anioReporte === '0'){
			return mensajes.modalAlert('warning', 'Información', 'Es Necesario elegir Año de Reporte');
		}
		
		
        $('<form>', {
            "id": "imprimir",
            "action": "ReportesSesaC/pdf/"+anioReporte+"/"+tipo
        }).appendTo(document.body).submit();
  
    }
		
	
	
	/** ************* VERIFICAR NULOS ***************** */
	/** ********************************************** */
	
	var verificarNulos = function (){
		
		var tipo = $('#tipoValidacionNulo').val()
	    var anioReporte = $('#ejercicioSaludNulo').val()
		
		if(tipo ===  null || tipo === '0'){
			return mensajes.modalAlert('warning', 'Información', 'Es Necesario elegir el Tipo de Reporte');
		}
		
		if(anioReporte === null || anioReporte === '0'){
			return mensajes.modalAlert('warning', 'Información', 'Es Necesario elegir Año de Reporte');
		}
		
		$.ajax({
					
				url         : "ReportesSesaC/verificarNulos/"+anioReporte+"/"+tipo,
				type        : "GET",
				dataType    : 'json',
				contentType : 'application/json',
				beforeSend  : function(){
					util.loadingStart();
				},
				success: function(dataSet){
					console.log('verificar Nulos')
					console.log(dataSet.mensaje)
					
					if(dataSet.mensaje === 'OK'){
						
						var columnas =[
							{title:"NUMERO POLIZA",        data:"numero_poliza"},
							{title:"IDENTIFICADOR UNICO",   data:"identificador_unico"},
							{title:"DESCRIPCION INTEGRANTE",   data:"descripcion_integrante_grupo_familiar"},
							{title:"FECHA NACIMIENTO", data:"fecha_nacimiento"},
							{title:"GENERO", data:"genero"},
							{title:"ENTIDAD RESIDENCIA", data:"entidad_residencia"},
							{title:"ESTADO CIVIL", data:"estado_civil"},
							{title:"NACIONALIDAD", data:"nacionalidad"},
							{title:"ACTIVIDAD ECONOMICA", data:"actividad_economica"},
							{title:"ESTATUS ASEGURADO", data:"estatus_asegurado"},
							{title:"TIPO SEGURO", data:"tipo_seguro"},
							{title:"INICIO VIGENCIA", data:"inicio_vigencia"},
							{title:"FIN VIGENCIA", data:"fin_vigencia"},
							{title:"ANTIGUEDAD", data:"antiguedad"},
							{title:"AÑO POLIZA", data:"anio_poliza"},
							{title:"FECHA ALTA", data:"fecha_alta_asegurado"},
							{title:"FECHA BAJA", data:"fecha_baja_asegurado"},
							{title:"SUBTIPO SEGURO", data:"subtipo_seguro"},
							{title:"PLAN COBERTURA", data:"plan_cobertura"},
							{title:"FORMA VENTA", data:"forma_venta"},
							{title:"PRIMA EMITIDA", data:"prima_emitida"},
							{title:"PRIMA DEVENGADA", data:"prima_devengada"},
							{title:"LIMITE MAXIMO RESPONSABILIDAD", data:"limite_maximo_responsabilidad"}
						] 
						
						tabla.iniciarTablaVarilacionNulos("#tablaVerificacionNulos", dataSet.dataExtra, columnas);
						$('#idTableVerificacionNulos').css('display','block');
						
						// $('.nuevaCob').removeClass('d-none')
						
					}else{
						$('#idTableVerificacionNulos').css('display','none');
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
	
	
	/** ******** VERIFICAR FECHA DE FIN MENOR FECHA DE INICIO********** */
	/** ************************************************************** */
	
	var verificarFechafin = function (){
		
		var tipo = $('#tipoValidacionfecha').val()
	    var anioReporte = $('#ejercicioSaludfecha').val()
		
		if(tipo ===  null || tipo === '0'){
			return mensajes.modalAlert('warning', 'Información', 'Es Necesario elegir el Tipo de Reporte');
		}
		
		if(anioReporte === null || anioReporte === '0'){
			return mensajes.modalAlert('warning', 'Información', 'Es Necesario elegir Año de Reporte');
		}
		
		$.ajax({
					
				url         : "ReportesSesaC/verificarFecha/"+anioReporte+"/"+tipo,
				type        : "GET",
				dataType    : 'json',
				contentType : 'application/json',
				beforeSend  : function(){
					util.loadingStart();
				},
				success: function(dataSet){
					
					var valor = dataSet.dataExtra;
					
					if(dataSet.dataExtra != 0){
						var columnas =[
							{title:"TOTAL DE FECHAS MAYORES", valor},
						] 
						
						tabla.iniciarTabla("#tablaVerificacionFecha", dataSet.dataExtra, columnas);
						$('#idTableVerificaFecha').css('display','block');
						

					}else{
						$('#idTableVerificaFecha').css('display','none');
						mensajes.modalAlert('warning','Información','No se Encontraron resultados');
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
	
		
	/********** CIFRAS CONTROL SALUD ************** */
	/********************************************* */
		var cifrasControlSalud = function(){
		
		$.ajax({
			
			url         : "ReportesSesaC/cifrasControlSalud",
			type        : "GET",
			dataType    : 'json',
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){
			
				if(dataSet.mensaje === "OK"){
					 $('#asegurados').val(dataSet.dataExtra['0'].identificador_unico)
					 $('#primaEmitida').val(parseFloat(dataSet.dataExtra['0'].prima_emitida,2))
					 $('#primaDevengada').val(parseFloat(dataSet.dataExtra['0'].prima_devengada,2))
					 $('#limiteMaximo').val(parseFloat(dataSet.dataExtra['0'].limite_maximo_responsabilidad,2))
					
				}else{
					mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
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
			
		})
		
	}
		
	
	/*************** GRAFICA ASEGURADOS ************** */
	/********************************************* */
	var graficaAsegurados = function(){
			
			$.ajax({
				
				url         : "ReportesSesaC/graficaAsegurados",
				type        : "GET",
				dataType    : 'json',
				contentType : 'application/json',
				beforeSend  : function(){
					util.loadingStart();
				},
				success: function(dataSet){

					if(dataSet.mensaje === "OK"){
						
						$('#graficaAsegurados').highcharts({
							
							colors: ['#f45b5b', '#8085e9', '#8d4654', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
				             title:{text:''},
				             credits: false,
				             tooltip: {
				 		        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				 		        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				 		            '<td style="padding:0"><b>{point.y} </b></td></tr>',
				 		        footerFormat: '</table>',
				 		        shared: true,
				 		        useHTML: true
				 		    },
				             xAxis:{categories:['2019']},
				             yAxis:{title:'',plotLines:[{value:0,width:1,color:'#808080'}]},
				             legend:{layout:'vertical', align:'right', verticalAlign:'middle', borderWidth:0},
				             series:[{type: 'column', name: 'Asegurados', data: [parseFloat(dataSet.dataExtra['0'].identificador_unico,2)]} 				            	
				           ],
				             plotOptions:{line:{dataLabels:{enabled:true}}}
				         });
						
					}else{
						mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
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
				
			})
		}
	
	
	/*************** PRIMA EMITIDA ************** */
	/********************************************* */
	var graficaEmitida = function(){
			
			$.ajax({
				
				url         : "ReportesSesaC/graficaAsegurados",
				type        : "GET",
				dataType    : 'json',
				contentType : 'application/json',
				beforeSend  : function(){
					util.loadingStart();
				},
				success: function(dataSet){

					if(dataSet.mensaje === "OK"){
						
						$('#graficaEmitida').highcharts({
							 colors: ['#8085e9', '#f45b5b', '#8d4654', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
				             title:{text:''},
				             credits: false,
				             tooltip: {
				 		        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				 		        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				 		            '<td style="padding:0"><b>{point.y} </b></td></tr>',
				 		        footerFormat: '</table>',
				 		        shared: true,
				 		        useHTML: true
				 		    },
				             xAxis:{categories:['2019']},
				             yAxis:{title:'',plotLines:[{value:0,width:1,color:'#808080'}]},
				             legend:{layout:'vertical', align:'right', verticalAlign:'middle', borderWidth:0},
				             series:[{type: 'column', name: 'Prima Emitida', data: [parseFloat(dataSet.dataExtra['0'].prima_emitida,2)]} 				            	
				           ],
				             plotOptions:{line:{dataLabels:{enabled:true}}}
				         });
						
					}else{
						mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
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
				
			})
		}
	
	
	/*************** PRIMA DEVENGADA ************** */
	/********************************************* */
	var graficaDevengada = function(){
			
			$.ajax({
				
				url         : "ReportesSesaC/graficaAsegurados",
				type        : "GET",
				dataType    : 'json',
				contentType : 'application/json',
				beforeSend  : function(){
					util.loadingStart();
				},
				success: function(dataSet){

					if(dataSet.mensaje === "OK"){
						
						$('#graficaDevengada').highcharts({
							 colors: ['#8d4654', '#f45b5b', '#8085e9', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
				             title:{text:''},
				             credits: false,
				             tooltip: {
				 		        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				 		        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				 		            '<td style="padding:0"><b>{point.y} </b></td></tr>',
				 		        footerFormat: '</table>',
				 		        shared: true,
				 		        useHTML: true
				 		    },
				             xAxis:{categories:['2019']},
				             yAxis:{title:'',plotLines:[{value:0,width:1,color:'#808080'}]},
				             legend:{layout:'vertical', align:'right', verticalAlign:'middle', borderWidth:0},
				             series:[{type: 'column', name: 'Prima Devengada', data: [parseFloat(dataSet.dataExtra['0'].prima_devengada,2)]} 				            	
				           ],
				             plotOptions:{line:{dataLabels:{enabled:true}}}
				         });
						
					}else{
						mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
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
				
			})
		}
	
	
	
	/*************** LIMITE MAXIMO *************** */
	/********************************************* */
	var graficaLimite = function(){
			
			$.ajax({
				
				url         : "ReportesSesaC/graficaAsegurados",
				type        : "GET",
				dataType    : 'json',
				contentType : 'application/json',
				beforeSend  : function(){
					util.loadingStart();
				},
				success: function(dataSet){

					if(dataSet.mensaje === "OK"){
						
						$('#graficaLimite').highcharts({
							 colors: ['#7798BF', '#f45b5b', '#8d4654', '#8085e9', '#aaeeee', '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
				             title:{text:''},
				             credits: false,
				             tooltip: {
				 		        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				 		        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				 		            '<td style="padding:0"><b>{point.y} </b></td></tr>',
				 		        footerFormat: '</table>',
				 		        shared: true,
				 		        useHTML: true
				 		    },
				             xAxis:{categories:['2019']},
				             yAxis:{title:'',plotLines:[{value:0,width:1,color:'#808080'}]},
				             legend:{layout:'vertical', align:'right', verticalAlign:'middle', borderWidth:0},
				             series:[{type: 'column', name: 'Limite Maximo', data: [parseFloat(dataSet.dataExtra['0'].limite_maximo_responsabilidad,2)]} 				            	
				           ],
				             plotOptions:{line:{dataLabels:{enabled:true}}}
				         });
						
					}else{
						mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
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
				
			})
		}
	
	
	/***************** ACTUALIZAR CAMPOS CON NULOS ****************/
	/************************************************************ */
	
	var actualizarNulos = function (){
		
		var valor = $("input[name='resultado']").val();
		var columna = $('#columna').val()
		
		console.log(valor)
		console.log(columna)
		
		if(columna ===  null || columna === '0'){
			return mensajes.modalAlert('warning', 'Información', 'Es Necesario elegir la columna');
		}
		
		if(valor === null || valor === '0'){
			return mensajes.modalAlert('warning', 'Información', 'Es necesario el valor nuevo');
		}
		
		
		$.ajax({
					
				url         : "ReportesSesaC/actualizarValoresNulos/"+columna+"/"+valor,
				type        : "POST",
				dataType    : 'json',
				contentType : 'application/json',
				beforeSend  : function(){
					util.loadingStart();
				},
				success: function(dataSet){
					console.log('actualizar valor')
					console.log(dataSet.mensaje)
					
					if(dataSet.mensaje === 'OK'){
						
						mensajes.modalAlert('success','Información',dataSet.detalleMensaje);
						
					}else{
						
						mensajes.modalAlert('danger','Información',dataSet.detalleMensaje);
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
	
	
	/***************** VALIDACIONES COMISION NS ********************/
	/************************************************************ */
	
	var validacionesComision = function (){
		
		$.ajax({
					
				url         : "ReportesSesaC/validacionesComision",
				type        : "GET",
				dataType    : 'json',
				contentType : 'application/json',
				beforeSend  : function(){
					util.loadingStart();
				},
				success: function(dataSet){
					console.log(dataSet)
					
					if(dataSet.mensaje === 'OK'){
						
						console.log('si')
						
					}else{
						
						console.log('no')
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
	
	
	
	
	var coberturasRC = function (){
		
	$.ajax({
				
			url         : "ReportesSesaC/coberturaRC",
			type        : "GET",
			dataType    : 'json',
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
	
	var monedaCat = function (){
		
		$.ajax({
					
				url         : "ReportesSesaC/monedaCat",
				type        : "GET",
				dataType    : 'json',
				contentType : 'application/json',
				beforeSend  : function(){
					util.loadingStart();
				},
				success: function(dataSet){
					console.log('MONEDA RC')
					console.log(dataSet.mensaje)
					
					if(dataSet.mensaje === 'OK'){
						
						var columnas =[
							{title:"Clave",        data:"idMoneda"},
							{title:"Moneda",       data:"abMoneda"},
							{title:"Desc. Moneda", data:"descMoneda"},
							{title:"Clave CNSF",   data:"cveMoneda"}
						] 
						
						tabla.iniciarTabla("#coberturas", dataSet.dataExtra, columnas);
						$('#idTable').css('display','block');
						$('.nuevaCob').addClass('d-none')
						
					}else{
						$('.coberturas').css('display','none');
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
	
	var giroCat = function (){
		
		$.ajax({
					
				url         : "ReportesSesaC/giroCat",
				type        : "GET",
				dataType    : 'json',
				contentType : 'application/json',
				beforeSend  : function(){
					util.loadingStart();
				},
				success: function(dataSet){
					console.log('GIRO RC')
					console.log(dataSet.mensaje)
					
					if(dataSet.mensaje === 'OK'){
						
						var columnas =[
							{title:"Clave",        data:"clave"},
							{title:"Sector",       data:"sector"},
							{title:"Giro", data:"giro"},
							{title:"CNSF",
							 data : null,
							 defaultContent : "<input type='checkbox' checked disabled>",
							}
						] 
						
						tabla.iniciarTabla("#coberturas", dataSet.dataExtra, columnas);
						$('#idTable').css('display','block');
						$('.nuevaCob').addClass('d-none')
						
					}else{
						$('.coberturas').css('display','none');
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
	
	var autoCompletarRamoCNSF = function(appendTo) {
		
		$("#claveCNSF").autocomplete({
			appendTo: $('#' + appendTo),
			minLength: 2,
			source : function(request, response) {
				
				$.ajax({
					url : 'ReportesSesaC/coberturaCNSF',
					dataType : 'json',
					type: "GET",
					data : {clave : request.term},
					success : function(data) {
						console.log('Busca Clave CNSF -> ', data.dataExtra);
						
						response($.map(data.dataExtra, function(v,i){
								return {
									label: v.clave + '-' + v.tipoSeguro,
									value: v.clave,
									data : v
								};
						}));
					},
					statusCode: {
						404: function () {
							console.log("page not found");
						}
					},
					error: function (xhr, status, error) {
						var err = xhr.responseText;
						console.log(xhr);
					}
				});
			},
			select: function (event, ui) {
				
				$('#descCNSF').val('');
// $('descCNSF').val('');
// $('descCNSF').val(ui.item.data.clave);
				$('#descCNSF').val(ui.item.data.tipoSeguro);
				$('#descCNSF').attr('disabled', true);
// $('.clabe').attr('disabled', true);
				$(this).val(ui.item.label);
				return true;
		  }
		});
	}
	
	var nuevaCobertura = function (){
		
		var model = {}
		
		$.each($('input', "#hipotesisForm"), function (k, v) {
			if ($(this).attr("name") !== undefined 
					&& $(this).attr("name") !== 'file' && $(this).attr("type") !== 'search') {
				model[$(this).attr("name")] = $(this).val();
			}
		});
		console.log('Modelo Cobertura')
		console.log(model)
		$.ajax({
					
				url         : "ReportesSesaC/guardaCob",
				type        : "POST",
				data        : JSON.stringify(model),
				dataType    : 'json',
				contentType : 'application/json',
				beforeSend  : function(){
					util.loadingStart();
				},
				success: function(dataSet){
					console.log('GIRO RC')
					console.log(dataSet.mensaje)
					
					if(dataSet.mensaje === 'OK'){
						
						var columnas =[
							{title:"Clave",  data:"clave"},
							{title:"Sector", data:"sector"},
							{title:"Giro", data:"giro"},
						] 
						
						tabla.iniciarTabla("#coberturas", dataSet.dataExtra, columnas);
						$('#idTable').css('display','block');
						$('.nuevaCob').addClass('d-none')
						
					}else{
						$('.coberturas').css('display','none');
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
	
	var guardaCobertura = function(){
		
		$when(nuevaCobertura()).then(function(){
			coberturasRC();
		})
	}
	
	var cargaArchivo = function(){
		
		setTimeout(function(){
			
			mensajes.modalAlert('success','Información','Archivo Cargado con Exito');
			
		}, 300000);
		
	}
	
	var calculaDatos = function(){
		
		util.loadingStart();
		setTimeout(function(){
			util.loadingEnd();
		}, 30000);
		
	}
	
	/** * METODO CARGA LISTA DE AÑOS PARA REPORTES ** */
	var catalogoAnios = function(){
		
		$.ajax({
			
			url         : "ReportesSesaC/anioReporte",
			type        : "GET",
			dataType    : 'json',
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){

				if(dataSet.mensaje === "OK"){
					$('.lstAniosReporte').html("");
					
					$('.lstAniosReporte').append('<option value="0"  disabled>Seleccione Año...</option>');
					
					$.each(dataSet.dataExtra, function(i, v) {
						
						if(v.ejercicio === '2017'){
							$('.lstAniosReporte').append('<option value="' + v.ejercicio + '" selected>' + v.ejercicio + '</option>');
						}else{
							$('.lstAniosReporte').append('<option value="' + v.ejercicio + '">' + v.ejercicio + '</option>');	
						}
						
					});
					
				}else{
					mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
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
			
		})
	}
	
	/** ************************************************ */
	/** ****** METODOS PARA GRAFICAS ******************* */
	/** ************************************************ */
	var grafica = function(){
// --301, 402, 403, 771, 781, 909, 910
		
		$.ajax({
			
			url         : "ReportesSesaC/analisisDatos",
			type        : "GET",
			dataType    : 'json',
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){

				if(dataSet.mensaje === "OK"){
					
					console.log(dataSet)
					console.log(dataSet.dataExtra['0'].ramo)
					
					$('#grafica').highcharts({
						
			             title:{text:'Prima Consolidada por producto'},
			             xAxis:{categories:['2017','2018']},
			             yAxis:{title:'Porcentaje %',plotLines:[{value:0,width:1,color:'#808080'}]},
			             tooltip:{valueSuffix:'$'},
			             legend:{layout:'vertical', align:'right', verticalAlign:'middle', borderWidth:0},
			             series:[{type: 'column',name: dataSet.dataExtra['0'].ramo,data: [8928151.33, parseFloat(dataSet.dataExtra['0'].prima,2)]}, 
			            	 	 {type: 'column',name: dataSet.dataExtra['1'].ramo,data: [2699087.51, parseFloat(dataSet.dataExtra['1'].prima,2)]}, 
			            	 	 {type: 'column',name: dataSet.dataExtra['2'].ramo,data: [1566311.98, parseFloat(dataSet.dataExtra['2'].prima,2)]}, 
			            	 	 {type: 'column',name: dataSet.dataExtra['3'].ramo,data: [15219793.68, parseFloat(dataSet.dataExtra['3'].prima,2)]}, 
			            	 	 {type: 'column',name: dataSet.dataExtra['4'].ramo,data: [12190014.56, parseFloat(dataSet.dataExtra['4'].prima,2)]}, 
			            	 	 {type: 'column',name: dataSet.dataExtra['5'].ramo,data: [31986657.59, parseFloat(dataSet.dataExtra['5'].prima,2)]}, 
			            	 	 {type: 'column',name: dataSet.dataExtra['6'].ramo,data: [2761200.02, parseFloat(dataSet.dataExtra['6'].prima,2)]}
// {name: 'C',data: [20,18, 19]},
// {type: 'spline',name: 'C#',data: [0, 4, 4]},
// {name: 'Objective-C',data: [0,1, 1.5]}
			           ],
			             plotOptions:{line:{dataLabels:{enabled:true}}}
			         });
					
				}else{
					mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
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
			
			
			
		})
		
	}
	
	var graficamon = function(){
		
		$.ajax({
			
			url         : "ReportesSesaC/analisisDatosMoneda",
			type        : "GET",
			dataType    : 'json',
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){

				if(dataSet.mensaje === "OK"){
					
					console.log('Graficassssssssssss')
					console.log(dataSet)
					console.log(dataSet.dataExtra['0'].ramo)
					
					$('#graficaMon').highcharts({
						
			             title:{text:'Prima por Moneda consolidada al mismo TC'},
			             xAxis:{categories:['2017','2018']},
			             yAxis:{title:'Porcentaje %',plotLines:[{value:0,width:1,color:'#808080'}]},
			             tooltip:{valueSuffix:'$'},
			             legend:{layout:'vertical', align:'right', verticalAlign:'middle', borderWidth:0},
			             series:[{type: 'column',name: dataSet.dataExtra['0'].Moneda,data: [52922488.67, parseFloat(dataSet.dataExtra['0'].PrimaMO,2)]}, 
			            	 	 {type: 'column',name: dataSet.dataExtra['1'].Moneda,data: [1197732.38*20, parseFloat(dataSet.dataExtra['1'].PrimaMO*20,2)]} 
			            	 
// {name: 'C',data: [20,18, 19]},
// {type: 'spline',name: 'C#',data: [0, 4, 4]},
// {name: 'Objective-C',data: [0,1, 1.5]}
			           ],
			             plotOptions:{line:{dataLabels:{enabled:true}}}
			         });
					
				}else{
					mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
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
			
		})
	}
	
	
	var primasTotal = function(){
		
		$.ajax({
			
			url         : "ReportesSesaC/analisisPrimas",
			type        : "GET",
			dataType    : 'json',
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){
					console.log('PRIMAS TOTALES')
					console.log(dataSet)
				if(dataSet.mensaje === "OK"){
					 $('#primaAnalis').val(parseFloat(dataSet.dataExtra['0'].prima,2))
					 $('#primaRetAnalis').val(parseFloat(dataSet.dataExtra['0'].devengada,2))
					 $('#siniAnalis').val(parseFloat(dataSet.dataExtra['1'].montoSini,2))
					 $('#ppagadoRetAnalis').val(parseFloat(dataSet.dataExtra['1'].pagado,2))
					
				}else{
					mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
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
			
		})
		
	}
	
	var primasPorcentaje = function(){
		
		$.ajax({
			
			url         : "ReportesSesaC/analisisPorcPrimas",
			type        : "GET",
			dataType    : 'json',
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){
					console.log('PRIMAS TOTALES')
					console.log(dataSet)
				if(dataSet.mensaje === "OK"){
					 $('#primaPorcAnalis').val(parseFloat(dataSet.dataExtra['0'].prima,2))
					 $('#primaRetPorcAnalis').val(parseFloat(dataSet.dataExtra['0'].devengada,2))
					 $('#siniPorcAnalis').val(parseFloat(dataSet.dataExtra['1'].montoSini,2))
					 $('#ppagadoRetPorcAnalis').val(parseFloat(dataSet.dataExtra['1'].pagado,2))
					
				}else{
					mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
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
			
		})
		
	}
	
	var ramosSesa = function(){
		
		$.ajax({
			
			url         : "ReportesSesaC/ramosSesas",
			type        : "GET",
			dataType    : 'json',
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){
				console.log('ramos sesas ',dataSet.dataExtra)
				
				if(dataSet.mensaje === "OK"){
				
					$('#ramoTemp').html('')
					$('#ramoTemp').append('<option selected disabled>Seleccionar Ramo</option>')
					
					$.each(dataSet.dataExtra, function(i, v) {
						$('#ramoTemp').append('<option clave= "'+v.idCatalogo+'">'+v.descripcion+'</option>')
					})
					
				}else{
					mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
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
			
		})
	}
	
	var cargaSesaTxt = function(){
		
		var formData = new FormData();
		var ramo = $('#ramoTemp').find(':selected').attr("clave")
		var tipoSesa = $('#sesa').find(':selected').val()
		
		console.log('Ramo -> ',ramo)
		console.log('Tipo Sesa -> ',tipoSesa)
		
		formData.append('file', $('#fileInputSesas')[0].files[0]);
		formData.append("ramo", new Blob([JSON.stringify(ramo)], { type: 'application/json' }));
		formData.append("tipoSesa", new Blob([JSON.stringify(tipoSesa)], { type: 'application/json' }));
		 
		$.ajax({
			
			url : "ReportesSesaC/cargaSesa",
			type: "POST",
			data: formData,
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			cache: false,
			beforeSend: function(){
				util.loadingStart();
			},
			
			success: function (dataSet) {
				
				if(dataSet.mensaje === 'OK'){
					mensajes.modalAlert('success', 'Información', dataSet.detalleMensaje);
				}else{
					mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
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
		})
		
	}
	
	return {
		ValidacionesSalud     : ValidacionesSalud,
		verificarLista        : verificarLista,
		descargarPDF          : descargarPDF,
		verificarNulos        : verificarNulos,
		verificarFechafin     : verificarFechafin,
		cifrasControlSalud    : cifrasControlSalud,
		graficaAsegurados	  : graficaAsegurados,
		graficaEmitida		  : graficaEmitida,
		graficaDevengada      : graficaDevengada,
		graficaLimite		  : graficaLimite,
		actualizarNulos		  : actualizarNulos,
		validacionesComision  : validacionesComision,
		coberturasRC          : coberturasRC,
		autoCompletarRamoCNSF : autoCompletarRamoCNSF,
		monedaCat             : monedaCat,
		giroCat               : giroCat,
		nuevaCobertura        : nuevaCobertura,
		guardaCobertura       : guardaCobertura,
		cargaArchivo          : cargaArchivo,
		catalogoAnios         : catalogoAnios,
		calculaDatos          : calculaDatos,
		grafica               : grafica,
		graficamon            : graficamon,
		primasTotal			  : primasTotal,
		primasPorcentaje      : primasPorcentaje,
		ramosSesa             : ramosSesa,
		cargaSesaTxt          : cargaSesaTxt
	}
	
})();