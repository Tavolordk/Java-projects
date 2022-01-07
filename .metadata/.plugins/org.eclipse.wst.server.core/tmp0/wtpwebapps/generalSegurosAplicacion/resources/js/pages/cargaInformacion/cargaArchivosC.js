var cargaArchivosC = (function() {
	var $table;
	var cargarArchivoZip = function(file_in, insercion, desde, hasta) {
		if ($(file_in)[0].files.length == 0) {
			return mensajes.modalAlert('warning', 'Información',
					'Es necesario que indique un archivo.');
		}

		var formData = new FormData();
		var tipoInsercion = $(insercion).find(':selected').val();
		var fechaDesde = $(desde).val();
		var fechaHasta = $(hasta).val();
		// alert("Vamos al metodo desde el js")
		// alert("tipoInsercion " + tipoInsercion)
		// alert("fechaDesde " + fechaDesde)
		// alert("fechaHasta " + fechaHasta)

		formData.append("file", $(file_in)[0].files[0]);
		formData.append("tipoInsercion", new Blob([ JSON
				.stringify(tipoInsercion) ], {
			type : 'application/json'
		}));
		formData.append("fechaDesde", new Blob([ JSON.stringify(fechaDesde) ],
				{
					type : 'application/json'
				}));
		formData.append("fechaHasta", new Blob([ JSON.stringify(fechaHasta) ],
				{
					type : 'application/json'
				}));

		if (fechaDesde === '' || fechaHasta === '') {
			console.log("Hola estoy entrando en la validacion " + fechaDesde
					+ "  $(hasta).val() " + $(hasta).val())
			return mensajes.modalAlert('warning', 'Información',
					'Es necesario que se ingresen ambas fechas');
		} else {
			$.ajax({
				url : "cargaInformacion/validacionGeneralMensual",
				type : "POST",
				data : formData,
				enctype : 'multipart/form-data',
				processData : false,
				contentType : false,
				cache : false,

				beforeSend : function() {
					util.loadingStart();
				},
				success:function(dataSet){
					return mensajes.modalAlert('success', 'Información',dataSet.detalleMensaje);
				},
				complete : function() {
					// $('#btnCargarArchivoAgrupador').prop('disabled', true);
					util.loadingEnd();
					
				}
			})
			.fail(funcionesAjax.fail);
		}
	}

	var cargaBulk = function() {
		var nombre = $('#seleccionTabla').val();
		var TipoInser = $('#idTipoInserta').val();

		var d = new Date(Date.now());
		d.toString()
		console.log(d.toString());

		if (nombre === "0") {
			mensajes.modalAlert('warning', "Validación",
					"Seleccione un nombre de tabla a insertar");
		} else if (TipoInser === "0") {
			mensajes.modalAlert('warning', "Validación",
					"Seleccione el tipo de inserción");
		} else {
			$('#loadingModal').css({"pointer-events": "none"});
			$('#showProgress').show();
			$('#progressPercentaje').val(0);
			$('#progressPercentajeText').text("0%");
			$('#progressPercentajeExtraInfo').html("Realizando preproceso.<br>Puede tardar unos minutos, espere por favor.");
			document.getElementById("progressPercentaje").max = 100;
			var model = {};
			model["currLine"]  = 1;
			model["nombre"]  = nombre;
			model["tipoInser"]  = TipoInser;
			
			$.ajax({
				url:'cargaInformacion/EliminarArchivoError',
				method:'GET',
				data:{nombre:nombre},
				success:function(){
					console.log("Eliminado");
				}
			});
			
			iteracionBulk(model);
		}
	}
	
	var iteracionBulk = function(model){
		
		var nombre = $('#seleccionTabla').val();

		$.ajax({
			url : "cargaInformacion/CargaBulk",
			type : "POST",
			data        : JSON.stringify(model),
			dataType    : 'json',
			contentType : 'application/json',

			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet){
				

				console.log(dataSet.detalleMensaje)
				
				if(dataSet.dataExtra === null)
				{
					$('#showProgress').hide();
					util.loadingEnd();
					return mensajes.modalAlert('warning', 'Información',dataSet.detalleMensaje);
				}
				else{				
				if(dataSet.dataExtra.iteracion==-1)
					$('#progressPercentajeExtraInfo').html("Iniciando...");
				if(dataSet.dataExtra.iteracion==0){
					$('#progressPercentajeExtraInfo').html("Proceso :.<br>Insertando datos.");
				}
				if(dataSet.dataExtra.correcto==false){
					$('#loadingModal').css({"pointer-events": "auto"});
					$('#progressPercentajeExtraInfo').html("");
					$('#showProgress').hide();
					util.loadingEnd();
					return mensajes.modalAlert('warning', 'Información', 'Ha ocurrido un error en el proceso.' +
							'<br>Porcentaje completado: ' + dataSet.dataExtra.iteracion);
				}
				if(dataSet.dataExtra.iteracion==100){
					$('#loadingModal').css({"pointer-events": "auto"});
					$('#showProgress').hide();
					
					
					$.ajax({
						url:'cargaInformacion/crearExcelErroresBulk',
						method:'GET',
						data:{nombre:$('#seleccionTabla').val()},
						success:function(){
							console.log("Creacion de archivo Excel");
						}
					});
					
					
					util.loadingEnd();
					
					if(nombre ==="CobprimaTemBulk"){
						divideTablas(dataSet.dataExtra.nombre);						
					}
					Lista();
				}
				else{
					var porcentaje = dataSet.dataExtra.iteracion;
					$('#progressPercentaje').val(porcentaje);
					$('#progressPercentajeText').text(porcentaje + "%");
					
					var model = {};
					model["iteracion"] = porcentaje;
					model["tamBloque"] = dataSet.dataExtra.tamBloque;
					model["fileNumberLines"] = dataSet.dataExtra.fileNumberLines;
					model["nombre"] = dataSet.dataExtra.nombre;
					if(porcentaje<=0){
						model["currLine"]  = dataSet.dataExtra.currLine;
						model["tipoInser"] = dataSet.dataExtra.tipoInser;
					}
					else{
						model["currLine"]  = dataSet.dataExtra.currLine+dataSet.dataExtra.tamBloque;
						model["tipoInser"] = "NO";//dataSet.dataExtra.tipoInser;
					}
					//Esto se pone así porque si la primera vez que entra es SI, lo hace, después no debe sobreescribir los datos
					iteracionBulk(model);
				}
			  }
			}
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
				$('#loadingModal').css({"pointer-events": "auto"});
				$('#progressPercentajeExtraInfo').html("");
				$('#showProgress').hide();
				util.loadingEnd();
				funcionesAjax.failAjax(jqXHR, textStatus, errorThrown);
			}
		)
	}
	
	var divideTablas = function(nombre) {
		$('#loadingModal').css({"pointer-events": "none"});
		$('#showProgress').show();
		$('#progressPercentaje').val(0);
		$('#progressPercentajeText').text("");
		$('#progressPercentajeExtraInfo').html("Proceso: .<br>Creando tablas.");
		var model = {};
		model["nombre"]  = nombre;
		model["iteracion"] = 0;//Representa porcentaje
		model["currLine"]  = 1;//Representa currTable
		iteracionDivideTablas(model);
	}
	
	var iteracionDivideTablas = function(model){
		$.ajax({
			url : "cargaInformacion/CargaBulk_p2",
			type : "POST",
			data        : JSON.stringify(model),
			dataType    : 'json',
			contentType : 'application/json',

			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet){
				//funcionesAjax.successAjax(dataSet);
				if(dataSet.dataExtra.correcto==false){
					$('#loadingModal').css({"pointer-events": "auto"});
					$('#progressPercentajeExtraInfo').html("");
					$('#showProgress').hide();
					util.loadingEnd();
					return mensajes.modalAlert('warning', 'Información', 'Ha ocurrido un error en el proceso.' +
							'<br>Porcentaje completado: ' + dataSet.dataExtra.iteracion);
				}
				if(dataSet.dataExtra.iteracion>=dataSet.dataExtra.ramos.length){
					$('#loadingModal').css({"pointer-events": "auto"});
					$('#showProgress').hide();
					util.loadingEnd();
				}
				else{
					var porcentaje = dataSet.dataExtra.iteracion;
					$('#progressPercentaje').val(porcentaje);
					document.getElementById("progressPercentaje").max = dataSet.dataExtra.ramos.length;
					$('#progressPercentajeText').text(porcentaje + "/" + dataSet.dataExtra.ramos.length);
					
					var model = {};
					model["nombre"] = dataSet.dataExtra.nombre;
					model["iteracion"] = porcentaje;
					model["currLine"]  = dataSet.dataExtra.currLine+1;
					model["ramos"]  = dataSet.dataExtra.ramos;
					iteracionDivideTablas(model);
				}
			}
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
				$('#loadingModal').css({"pointer-events": "auto"});
				$('#progressPercentajeExtraInfo').html("");
				$('#showProgress').hide();
				util.loadingEnd();
				funcionesAjax.failAjax(jqXHR, textStatus, errorThrown);
			}
		)
	}
	
	var cifrasControl = function() {

			$.ajax({
				url : "cargaInformacion/obtenerCuentasConta",
				type : "GET",
				dataType : 'json',
				contentType : 'application/json',
				beforeSend : function() {
					util.loadingStart();
				},
				success: function (dataSet) {
				$('#tabCifras').show();
				var $perm = dataSet.dataExtra.permisos;
						if (dataSet.mensaje === 'OK') {

							var columnas = [
								{ title: "Cuenta de mayor", data: "Cuenta_de_mayor"},
								{ title: "CUENTA", data: "CUENTA"},
								{ title: "CeBex", data: "CeBex"},
								{ title: "DESCRIPCION RAMO", data: "DESCRIPCION_RAMO"},
								{ title: "IMPORTE", data: "IMPORTE", render: $.fn.dataTable.render.number(',', '.', 2, '$')},
								{ title: "IMPORTE MONEDA LOCAL", data: "IMPORTE_MONEDA_LOCAL", width: '10%' ,render: $.fn.dataTable.render.number(',', '.', 2, '$')},
								{ title: "SALDO ACTUAL", data: "SALDO_ACTUAL", width: '10%',render: $.fn.dataTable.render.number(',', '.', 2, '$')},
							];
							
							$table = tabla.iniciarTabla("#tablaCuentas", dataSet.dataExtra, columnas);
						}else{
							mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
						}
					},
					statusCode : {
					404 : function() {
						mensajes.modalAlert('warning', 'Información',
								dataSet.detalleMensaje);
					}
				},
				error : function(xhr, status, error) {
					var err = xhr.responseText;
					console.log(xhr);
				},
				complete : function() {
					util.loadingEnd();
				}
			});
	}
	
	var Lista = function(){
		
		var nombre = $('#seleccionTabla').val();
		console.log(nombre)
		
		$.ajax({

			url : "cargaInformacion/ListaArchivos",
			type: "GET",
			dataType : 'json',
			data : {
					nombre : nombre
				// ,
				// columna : columna
			},
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success : function(dataSet){
				console.log(dataSet)
			if(dataSet.dataExtra !== null){
				var url  = URL.createObjectURL(utils(dataSet.dataExtra.bytes, "application/zip"));
				var blob = utils(dataSet.dataExtra.bytes, "application/zip");
				
				if (window.navigator.msSaveBlob) { // // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
				    window.navigator.msSaveOrOpenBlob(blob, dataSet.dataExtra.nombre);
				}else {
				    var a  = window.document.createElement("a");
				    a.href = window.URL.createObjectURL(blob, { type: "application/zip" });
				    a.download = dataSet.dataExtra.nombre;
				   
				    document.body.appendChild(a);
				    a.click();
				    document.body.removeChild(a);
				}
				
				return mensajes.modalAlert('success', 'Información', ' ' + dataSet.detalleMensaje);
				//alert('success', 'Información', 'Se Genero Archivo ' + dataSet.detalleMensaje)
			}else{
				return mensajes.modalAlert('success', 'Información', ' ' +dataSet.detalleMensaje);
				//alert('success', 'Información', 'No se Ecnontraron Registros Para el Reporte')
			}
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			},

			error : function(request, status, error) {
				console.log(request.responseText);
			},
			complete : function() {
				util.loadingEnd();
			}
		});
		
	}
	var utils = function(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
        var byteCharacters = atob(b64Data);
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
        
        var blob = new Blob(byteArrays, {
            type: contentType
        });
        return blob;
    }
	
		var cargarArchivoxls= function(file_in) {

		var formData = new FormData();
		
		
		if ($(file_in)[0].files.length == 0) {
			return mensajes.modalAlert('warning', 'Información',
					'Es necesario que indique un archivo.');
		}
		
		formData.append("file", $(file_in)[0].files[0]);
		//alert("Hola! FILE");		
		if ($(file_in)[0].files.length == 0) {
			return mensajes.modalAlert('warning', 'Información',
					'Es necesario que indique un archivo.');
		}
		else {
			$.ajax({
				url : "cargaInformacion/insertaXls",
				type : "POST",
				data : formData,
				enctype : 'multipart/form-data',
				processData : false,
				contentType : false,
				cache : false,
				beforeSend : function() {
					util.loadingStart();
				},
				success:function(dataSet){
					return mensajes.modalAlert('success', 'Información',dataSet.detalleMensaje);
				},
				complete : function() {
					// $('#btnCargarArchivoAgrupador').prop('disabled', true);
					util.loadingEnd();
					
				}
			})
			.fail(funcionesAjax.fail);
		}
	}

	return {
		cargarArchivoZip : cargarArchivoZip,
		cargaBulk : cargaBulk,
		cifrasControl : cifrasControl,
		divideTablas : divideTablas,
		Lista : Lista,
		cargarArchivoxls:cargarArchivoxls
	}
})();