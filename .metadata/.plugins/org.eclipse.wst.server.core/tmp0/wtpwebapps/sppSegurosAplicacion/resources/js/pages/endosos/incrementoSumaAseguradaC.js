var incrementoSA = (function(){
	var $certificado = {};
	var $poliza = {};
	
	var buscarCertificado = function(){
		var $numeroPoliza = $('#numeroPolizaBuscar').val();
		var $numeroCertificado = $('#numeroCertificadoBuscar').val();
		var $idRamo = $('#idRamo').val();
		
		$.ajax({
			url: "endososC/obtenerCertificado",
			method: "GET",
			data:{
				numeroPoliza : $numeroPoliza,
				numeroCertificado : $numeroCertificado,
				ramo : $idRamo
			},
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				console.log(dataSet);
				if (dataSet.mensaje === 'OK') {
					$('.capturarSumaAsegurada').removeClass('d-none');
					$('#numeroPoliza').val(dataSet.dataExtra.poliza.numeroPoliza);
					$('#sumaAsegurada').val(dataSet.dataExtra.certificado.sumaAsegurada);
					$certificado = dataSet.dataExtra.certificado;
					$poliza = dataSet.dataExtra.poliza;
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
	
	var actualizarSA = function(){
		var $nuevaSumaAsegurada = $('#nuevaSumaAsegurada').inputmask('unmaskedvalue');
		var $sumaAsegurada = parseFloat($('#sumaAsegurada').inputmask('unmaskedvalue'));
		var $idRamo = $poliza.ramo.cveRamo;
		var $notaCredito = $('#notaCredito').is(':checked');
		var $fechaEmision = $('#fecha').val();
		
		if($fechaEmision.trim() == ''){
			mensajes.modalAlert('danger', "Campo requerido", "Fecha efectividad es requerido");
			return;
		}
		console.log($fechaEmision);
		if($('#nuevaSumaAsegurada').inputmask('unmaskedvalue').trim() === ''){
			$('#nuevaSumaAsegurada').addClass("is-invalid");
			$('#nuevaSumaAsegurada').parent().append('<div class="invalid-tooltip">Campo obligatorio</div>');
			return;
		}
		
		var currentPage = (window.location.pathname.split('/'))[2];
		if(currentPage === 'decrementoSumaAsegurada'){
			if(parseFloat($nuevaSumaAsegurada) >  $sumaAsegurada){
				mensajes.modalAlert('warning', "Advertencia", "La nueva Suma Asegurada debe ser menor a la Actual");
				return;
			}
		}else if(currentPage === 'incrementoSumaAsegurada'){
			if(parseFloat($nuevaSumaAsegurada) <  $sumaAsegurada){
				mensajes.modalAlert('warning', "Advertiencia", "La nueva Suma Asegurada debe ser mayor a la Actual");
				return;
			}
		}
		
		$.ajax({
			url: "endososC/incrementarSumaAsegurada",
			method: "POST",
			data:{
				numeroPoliza : $poliza.numeroPoliza,
				numeroCertificado : $certificado.endoso,
				nuevaSumaAsegurada : $nuevaSumaAsegurada,
				ramo : $idRamo,
				fechaEmision : $fechaEmision
			},
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				console.log(dataSet);
				if (dataSet.mensaje === 'OK') {
					$('.capturarSumaAsegurada').addClass('d-none');
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$('#formIncrementoSA')[0].reset();
					$('.ramo').val($idRamo);
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
	
	return{
		buscarCertificado : buscarCertificado,
		actualizarSA : actualizarSA
	}
})();