var endosos = (function(){
	var $poliza = {};
	var $idPoliza = 0;
	var $habitabilidad = {};
	
	/***CANCELAR POLIZA***/
	var cancelarPoliza = function(){
		var $numeroPoliza = $('#numeroPoliza').val();
		var $idRamo = $('#idRamo').val();
		var $fechaEfectividad = $('#fechaEfectividad').val();
		if($fechaEfectividad.trim() == ''){
			mensajes.modalAlert('danger', "Campo requerido", "Fecha efectividad es requerido");
			return;
		}
		$.ajax({
			url: "endososC/cancelarPoliza",
			method: "GET",
			data:{
				numeroPoliza : $numeroPoliza,
				ramo : $idRamo,
				fechaEfectividad : $fechaEfectividad
			},
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				if (dataSet.mensaje === 'OK') {
					$('#formCancelarPoliza')[0].reset();
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$('.info').addClass('d-none');
				}else{
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("page not found");
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	};
	
	/***CANCELAR CERTIFICADO***/
	var cancelarCertificado = function(){
		var $numeroPoliza = $('#numeroPoliza').val();
		var $idRamo = $('#idRamo').val();
		var $numeroCertificado = $('#numeroCertificado').val();
		var $fechaEfectividad = $('#fechaEfectividad').val();
		
		if($fechaEfectividad.trim() == ''){
			mensajes.modalAlert('danger', "Campo requerido", "Fecha efectividad es requerido");
			return;
		}
		
		$.ajax({
			url: "endososC/cancelarCertificado",
			method: "GET",
			data:{
				numeroPoliza : $numeroPoliza,
				ramo : $idRamo,
				numeroCertificado : $numeroCertificado,
				fechaEfectividad : $fechaEfectividad,
				esCancelacionPoliza : false
			},
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				if (dataSet.mensaje === 'OK') {
					$('#formCancelarCertificado')[0].reset();
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$('.info').addClass('d-none');
					$('#idRamo').val($idRamo);
				}else{
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("page not found");
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	};
	
	/***OBTENER POLIZA***/
	var buscarPoliza = function(){
		var $numeroPoliza = $('#numeroPoliza').val();
		var $idRamo = $('#idRamo').val();
		
		$.ajax({
			url: "endososC/obtenerPoliza",
			method: "GET",
			data:{
				numeroPoliza : $numeroPoliza,
				ramo : $idRamo,
			},
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				if (dataSet.mensaje === 'OK') {
					//mensajes.modalAlert('success', dataSet., dataSet.detalleMensaje);
					$('.capturarCertificado, .info').removeClass('d-none');
					$poliza = dataSet.dataExtra;
					preCancelarPoliza();
				}else{
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("page not found");
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	};
	
	/***NUEVO CERTIFICADO***/
	var guardarCertificado = function(){
		var $cveMunicipio = $('#nuevoCertificado select.municipio').find(':selected').data('cvemunicipio');
		
		var certificado = {poliza:$poliza.idPoliza, cveMunicipio:$cveMunicipio};
		$.each($('input, select', '#nuevoCertificado'),function(k, v){
			if($(this).attr("name") !== 'idRamo' && $(this).attr("name") !== 'numeroPoliza'){
				if($(this).hasClass("moneda")){
					certificado[$(this).attr("name")] = $(this).inputmask('unmaskedvalue');
				}else{
					certificado[$(this).attr("name")] = $(this).val();
				}
			}
	    });
		
		certificado.sumaAsegurada = certificado.sumaAsegurada.replace(',', '');
		
		$.ajax({
			url: "endososC/guardarCertificado",
			method: "POST",
			data: JSON.stringify(certificado),
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				if (dataSet.mensaje === 'OK') {
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$('#nuevoCertificado')[0].reset();
					$('.capturarCertificado').addClass('d-none');
					$('.ramo').val($poliza.ramo.cveRamo);
				}else{
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
					console.log(dataSet.dataExtra);
					$.each( dataSet.dataExtra, function(k, v){
						var campo = $('#nuevoCertificado' + ' [name=' + k + ']').addClass("is-invalid");
						$(campo).parent().append('<div class="invalid-tooltip">' + v + '</div>');
					});
				}
			},
			statusCode: {
				404: function () {
					console.log("page not found");
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	};
	
	/***AUTOCOMPLETAR CODIGO POSTAL, ESTADO, MUNICIPIO, COLONIA***/
	var autoCompletarCodigoPostal = function(appendTo){
		$("#codigoPostal").autocomplete({
			appendTo: $('#' + appendTo),
			minLength: 5,
			source : function(request, response) {
				$.ajax({
					url : 'coloniasC/obtenerColoniasByCP',
					dataType : 'json',
					type: "GET",
					data : {
						codigoPostal : request.term
					},
					success : function(data) {
						console.log(data);
						response($.map(data, function(v,i){
							return {
								label: v.codigoPostal + " - " + v.nombreColonia,
								value: v.codigoPostal + " - " + v.nombreColonia,
								data : v
							};
						}));
					}
				});
			},
			select: function (event, ui) {
				$('.municipio').html();
				$('#colonia').val(ui.item.data.nombreColonia);
				$('.estado').val(ui.item.data.municipio.estado.idEstado);
				$('.municipio').html('<option data-cvemunicipio="' + ui.item.data.municipio.claveMunicipio +'" value=' + ui.item.data.municipio.idMunicipio + ' selected>' + ui.item.data.municipio.nombreMunicipio + '</option>');
				$(this).val(ui.item.label);
				return true;
		  }
		});
	};
	
	/***OBTENER CERTIFICADO***/
	var buscarCertificado = function(){
		var $idRamo = $('#idRamo').val();
		var $numeroCertificado = $('#numeroCertificado').val();
		var $numeroPoliza = $('#numeroPoliza').val();
		
		$.ajax({
			url: "endososC/obtenerCertificado",
			method: "GET",
			data:{
				numeroPoliza : $numeroPoliza,
				ramo : $idRamo,
				numeroCertificado: $numeroCertificado
			},
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				if (dataSet.mensaje === 'OK') {
					$('.capturarAsegurado').removeClass('d-none');
					$certificado = dataSet.dataExtra.certificado;
					//$habitabilidad = dataSet.dataExtra.hab;
					$('#nombreAsegurado').val($certificado.asegurado);
					preCancelarCertificado();
				}else{
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("page not found");
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	};
	
	/***CAMBIAR NOMBRE ASEGURADO DANIOS***/
	var cambiarNombreAsegurdoDanios = function(){
		var $nombreAsegurado = $('#nuevoNombreAsegurado').val();
		var $ramo = $('.ramo').val();
		
		if($nombreAsegurado.trim() === ''){
			$('#nuevoNombreAsegurado').addClass("is-invalid");
			$('#nuevoNombreAsegurado').parent().append('<div class="invalid-tooltip">Campo obligatorio</div>');
			return;
		}
		
		$.ajax({
			url: "endososC/cambiarNombreAseguradoDanios",
			method: "POST",
			data: {
				idCertificado : $certificado.idCertificado,
				nombreAsegurado : $nombreAsegurado,
				numeroCredito : $certificado.numeroCredito,
				nombreAnterior : $certificado.asegurado,
				idPoliza : $certificado.poliza.idPoliza
			},
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				if (dataSet.mensaje === 'OK') {
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$('#formCambioNombreAsegurado')[0].reset();
					$('.ramo').val($ramo);
					$('.capturarAsegurado').addClass('d-none');
				}else{
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("page not found");
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	};
	
	/***VISUALIZAR INFORMACION DE CERTIFICADO ANTES DE CANCELAR***/
	var preCancelarCertificado = function(){
		$('.info #numeroPoliza').val($certificado.poliza.numeroPoliza);
		$('.info #numeroCertificado').val($certificado.endoso);
		$('#asegurado').val($certificado.asegurado);
		$('#sumaAsegurada').val($certificado.sumaAsegurada);
		$('#numCredito').val($certificado.numeroCredito);
		
		$('.info').removeClass('d-none');
	};
	
	/***VISUALIZAR INFORMACION DE POLIZA ANTES DE CANCELAR***/
	var preCancelarPoliza = function(){
		var $contratante = $poliza.contratante;
		var $nombreCompleto;
		
		if($contratante.fisico){
			$nombreCompleto = $contratante.nombreCliente + ' ' + $contratante.apellidoPaterno + ' ' + $contratante.apellidoMaterno;
		}else{
			$nombreCompleto = $contratante.denominacion;
		}
		
		$('.info #numeroPoliza').val($poliza.numeroPoliza);
		$('#contratante').val($nombreCompleto);
		$('#certificados').val($poliza.certificados);
		
		$('.info').removeClass('d-none');
	};
	
	return{
		cancelarPoliza : cancelarPoliza,
		cancelarCertificado : cancelarCertificado,
		buscarPoliza : buscarPoliza,
		guardarCertificado : guardarCertificado,
		autoCompletarCodigoPostal : autoCompletarCodigoPostal,
		cambiarNombreAsegurdoDanios : cambiarNombreAsegurdoDanios,
		buscarCertificado : buscarCertificado
	}
})();