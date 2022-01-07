siniestrosC.archivosSiniestros();
$(document).ready(function () {
	var idRamo = $('#ramo').val()
	console.log('ID RAMO -> ', idRamo)
	
	if(idRamo !== undefined){
		siniestrosC.llenaCatalogoRamo();
		siniestrosC.cargaCT19_7CausaSiniestro($('#ramo').val(), null);	
	}
	
	siniestrosC.cargaCatalogoEstatus();
	
	$('#tipoConcepto2').css('display','none')
	
	$('#guardaSiniestro').click(function () {
		siniestrosC.guardarSiniestro();
	});	
	
	$('#btnBusqueda').click(function () {
//		siniestrosC.btnBusqueda();
		siniestrosC.buscaSiniestro()
	});	
	
	$('#limpiaForm').click(function () {
//		document.getElementById("estimacionesTitle").style.display="none";
//		$('#estimacionesBloque').empty();
		$('#fotosBloque').empty();
		$('#formSiniestro')[0].reset();
		document.getElementById("btnBusquedaPoliza").disabled = false;
		$('.currentDate').bootstrapDP('setDate', new Date());
		window.scrollTo(0, 0);
	});	
	
	$('#validaPoliza').click(function() {
		document.getElementById("polizaBloque").style.display="none";
		document.getElementById("datosSiniestroBloque").style.display="block";
		
		var ramo = $('#ramo').val();
		if(ramo === '5') {
			$('.bloqueArchivosExtra').show();
		} else {
			$('.bloqueArchivosExtra').hide();
		}
	});
	
	$('#capturaSinPoliza').click(function() {
		document.getElementById("polizaBloque").style.display="none";
		document.getElementById("datosSiniestroBloque").style.display="block";
	});
	
	$('#regresar').click(function() {
		document.getElementById("polizaBloque").style.display="block";
		document.getElementById("datosSiniestroBloque").style.display="none";
	});
	
	$('#cargaCoberturas').click(function() {
		siniestrosC.btnCargaCoberturas();
	});
	
	$('#fechaOcurrenciaSiniestro').change(function() {
		if($('#fechaOcurrenciaSiniestro').val() !== null && $('#fechaOcurrenciaSiniestro').val() !== '') {
			var fechaAjuAsig = new Date($('#fechaOcurrenciaSiniestro').val());
			var fechaHoy = new Date();
			if(fechaAjuAsig > fechaHoy) {
				$('#fechaOcurrenciaSiniestro').val('');
				mensajes.modalAlert('warning', 'Valor no valido', 'La fecha Ocurrido debe ser menor a la fecha actual.');
			}
		}
		if($('#fechaOcurrenciaSiniestro').val() !== null && $('#fechaOcurrenciaSiniestro').val() !== '' && $('#fechaAviso').val() !== null && $('#fechaAviso').val() !== '') {
			var fechaOcurre = new Date($('#fechaOcurrenciaSiniestro').val());
			var fechaAviso = new Date($('#fechaAviso').val())
			if(fechaOcurre > fechaAviso) {
				$('#fechaOcurrenciaSiniestro').val('');
				mensajes.modalAlert('warning', 'Valor no valido', 'La fecha de ocurrido debe ser menor o igual a la fecha de aviso.');
			}
		}
	});
	
	$('#fechaAviso').change(function() {
		if($('#fechaAviso').val() !== null && $('#fechaAviso').val() !== '') {
			var fechaAjuAsig = new Date($('#fechaAviso').val());
			var fechaHoy = new Date();
			if(fechaAjuAsig > fechaHoy) {
				$('#fechaAviso').val('');
				mensajes.modalAlert('warning', 'Valor no valido', 'La fecha Aviso debe ser menor a la fecha actual.');
			}
		}
		if($('#fechaOcurrenciaSiniestro').val() !== null && $('#fechaOcurrenciaSiniestro').val() !== '' && $('#fechaAviso').val() !== null && $('#fechaAviso').val() !== '') {
			var fechaOcurre = new Date($('#fechaOcurrenciaSiniestro').val());
			var fechaAviso = new Date($('#fechaAviso').val());
			if(fechaOcurre > fechaAviso) {
				$('#fechaAviso').val('');
				mensajes.modalAlert('warning', 'Valor no valido', 'La fecha de aviso debe ser mayor o igual a la fecha de ocurrido.');
			}
		}
	});
	
	$('#ajustadorFechaAsig').change(function() {
		if($('#ajustadorFechaAsig').val() !== null && $('#ajustadorFechaAsig').val() !== '') {
			var fechaAjuAsig = new Date($('#ajustadorFechaAsig').val());
			var fechaHoy = new Date();
			if(fechaAjuAsig > fechaHoy) {
				$('#ajustadorFechaAsig').val('');
				mensajes.modalAlert('warning', 'Valor no valido', 'La fecha de asignacion debe ser menor a la fecha actual.');
			}
		}
		if($('#ajustadorFechaAsig').val() !== null && $('#ajustadorFechaAsig').val() !== '' && $('#fechaAviso').val() !== null && $('#fechaAviso').val() !== '') {
			var fechaAjuAsig = new Date($('#ajustadorFechaAsig').val());
			var fechaAviso = new Date($('#fechaAviso').val());
			if(fechaAjuAsig < fechaAviso) {
				$('#ajustadorFechaAsig').val('');
				mensajes.modalAlert('warning', 'Valor no valido', 'La fecha de asignacion debe ser mayor o igual a la fecha de aviso.');
			}
		}
		
		if($('#ajustadorFechaAsig').val() !== null && $('#ajustadorFechaAsig').val() !== '' && $('#ajustadorFechaCierre').val() !== null && $('#ajustadorFechaCierre').val() !== '') {
			var fechaAsig = new Date($('#ajustadorFechaAsig').val());
			var fechaCierre = new Date($('#ajustadorFechaCierre').val());
			if(fechaAsig > fechaCierre) {
				$('#ajustadorFechaAsig').val('');
				mensajes.modalAlert('warning', 'Valor no valido', 'La fecha de asignacion debe ser menor o igual a la fecha de cierre.');
			}
		}
	});
	
	$('#ajustadorFechaCierre').change(function() {
		if($('#ajustadorFechaAsig').val() !== null && $('#ajustadorFechaAsig').val() !== '' && $('#ajustadorFechaCierre').val() !== null && $('#ajustadorFechaCierre').val() !== '') {
			var fechaAsig = new Date($('#ajustadorFechaAsig').val());
			var fechaCierre = new Date($('#ajustadorFechaCierre').val());
			if(fechaAsig > fechaCierre) {
				$('#ajustadorFechaCierre').val('');
				mensajes.modalAlert('warning', 'Valor no valido', 'La fecha de cierre debe ser mayor o igual a la fecha de asignacion.');
			}
		}
	});
	
	$('#ajustadorHoraAsig').change(function() {
		if($('#ajustadorFechaAsig').val() !== null && $('#ajustadorFechaAsig').val() !== '' 
			&& $('#ajustadorFechaCierre').val() !== null && $('#ajustadorFechaCierre').val() !== ''
				&& $('#ajustadorHoraAsig').val() !== null && $('#ajustadorHoraAsig').val() !== ''
					&& $('#ajustadorHoraCierre').val() !== null && $('#ajustadorHoraCierre').val() !== '') {
			var fechaAsig = new Date($('#ajustadorFechaAsig').val());
			var horaAsig = $('#ajustadorHoraAsig').val().split(":");
			var fechaCierre = new Date($('#ajustadorFechaCierre').val());
			var horaCierre = $('#ajustadorHoraCierre').val().split(":");
			if(fechaAsig.getTime() === fechaCierre.getTime()) {
				if(parseInt(horaAsig[0]) > parseInt(horaCierre[0])) {
					$('#ajustadorHoraAsig').val('');
					mensajes.modalAlert('warning', 'Valor no valido', 'La Hora de asignacion debe ser menor o igual a la hora de cierre.');
				} else if(parseInt(horaAsig[0]) === parseInt(horaCierre[0]) && parseInt(horaAsig[1]) > parseInt(horaCierre[1])) {
					$('#ajustadorHoraAsig').val('');
					mensajes.modalAlert('warning', 'Valor no valido', 'La Hora de asignacion debe ser menor o igual a la hora de cierre.');
				}
			}
		}
	});
	
	$('#ajustadorHoraCierre').change(function() {
		if($('#ajustadorFechaAsig').val() !== null && $('#ajustadorFechaAsig').val() !== '' 
			&& $('#ajustadorFechaCierre').val() !== null && $('#ajustadorFechaCierre').val() !== ''
				&& $('#ajustadorHoraAsig').val() !== null && $('#ajustadorHoraAsig').val() !== ''
					&& $('#ajustadorHoraCierre').val() !== null && $('#ajustadorHoraCierre').val() !== '') {
			var fechaAsig = new Date($('#ajustadorFechaAsig').val());
			var horaAsig = $('#ajustadorHoraAsig').val().split(":");
			var fechaCierre = new Date($('#ajustadorFechaCierre').val());
			var horaCierre = $('#ajustadorHoraCierre').val().split(":");
			if(fechaAsig.getTime() === fechaCierre.getTime()) {
				if(parseInt(horaAsig[0]) > parseInt(horaCierre[0])) {
					$('#ajustadorHoraCierre').val('');
					mensajes.modalAlert('warning', 'Valor no valido', 'La Hora de cierre debe ser mayor o igual a la hora de asignacion.');
				} else if(parseInt(horaAsig[0]) === parseInt(horaCierre[0]) && parseInt(horaAsig[1]) > parseInt(horaCierre[1])) {
					$('#ajustadorHoraCierre').val('');
					mensajes.modalAlert('warning', 'Valor no valido', 'La Hora de cierre debe ser mayor o igual a la hora de asignacion.');
				}
			}
		}
	});
	
	$('#fechaFactura').change(function() {
		if($('#fechaFactura').val() !== null && $('#fechaFactura').val() !== '') {
			var fechaAjuAsig = new Date($('#fechaFactura').val());
			var fechaHoy = new Date();
			if(fechaAjuAsig > fechaHoy) {
				$('#fechaFactura').val('');
				mensajes.modalAlert('warning', 'Valor no valido', 'Fecha factura: debe ser menor o igual a la fecha actual.');
			}
		}
	});
	
	$('#btnCargaTerceros').click(function () {
		siniestrosC.btnCargaTerceros();
	});
	
	$('#guardaTercero').click(function () {
		siniestrosC.guardaTercero();
	});
	
	$('#btnCargaMovimientos').click(function () {
		
		siniestrosC.btnCargaMovimientosEstimaciones();
	});
	
	$('#guardaMovimiento').click(function () {
		siniestrosC.guardaMovimiento();
	});
	
	$('#buscaMovimientosPorSiniestro').click(function () {
		siniestrosC.buscaMovimientosPorSiniestro();
	});
	
	$('#tipoMovimiento').change(function() {
		
		var tipoMov = $('#tipoMovimiento').val();
		var idMov = $('#tipoMovimiento').find(':selected').attr("idMov")
		
		$('#iva').val('');
		$('#isrRetenido').val('');
		$('#ivaRetenido').val('');
		$('#total').val('');
		$('#tipoConcepto').val(0);
		$('#tipoPago').val('CHEQUE');
		$('#importe').val('');
		$('#fechaAplicacion').removeAttr('disabled');
		$('#fechaFactura').removeAttr('disabled');
//		$('#iva').removeAttr('disabled');
//		$('#isrRetenido').removeAttr('disabled');
//		$('#ivaRetenido').removeAttr('disabled');
//		$('#total').removeAttr('disabled');
		$('#nombreProveedor').removeAttr('disabled');
		$('#facturaElectronica').removeAttr('disabled');
		$('#folioFactura').removeAttr('disabled');
		$('#tipoPago').removeAttr('disabled');
		$('#servicio').removeAttr('disabled');
		$('#fechaSolicitud').removeAttr('disabled');
		$('#fechaFinaliza').removeAttr('disabled');
		$('#diasEjecucion').removeAttr('disabled');
		$('#servicioEstatus').removeAttr('disabled');
		$('#facturaArchivo').removeAttr('disabled');
		$('#facturaArchivo').find('.btn').removeClass('disabled');
		$('#facturaArchivo, .file-caption-name').removeAttr('disabled');
		$('#calculaIVA').attr('disabled');
		$('#calculaIVA').prop('checked', true);
		$('#calculaISR').attr('disabled', false);
		$('#calculaISR').prop('checked', true);
		
		console.log('TIPO MOVIMIENTO SELECCIONADO -> ', tipoMov)
		console.log('ID MOVIMIENTO -> ', idMov)
		
		if(idMov === '1') {
			$('.ap').css('display','block')
		}else{
			$('.ap').css('display','none')
			$('#subConcepto').html('')
		}
		
		if(idMov === '5' || idMov === '6'){
			
			$('#tipoConcepto').html('')
			$('#tipoConcepto').css('display','none')
			$('#tipoConcepto2').css('display','block')
			
		}else{
			$('#tipoConcepto2').css('display','none')
			$('#tipoConcepto').css('display','block')
			siniestrosC.conceptoMovmimieto(idMov)
		}
		
		if(idMov !== '1' &&  idMov !== '4') {
			
//			$("#tipoConcepto").attr('disabled',true);
			$('#fechaFactura').attr('disabled',true);
//			$('#iva').attr('disabled',true);
			$('#iva').val('');
//			$('#isrRetenido').attr('disabled',true);
			$('#isrRetenido').val('0.00');
//			$('#ivaRetenido').attr('disabled',true);
			$('#ivaRetenido').val('0.00');
//			$('#total').attr('disabled',true);
			$('#total').val('0.00');
			$('#nombreProveedor').attr('disabled',true);
			$('#nombreProveedor').val('');
			$('#rfcProveedor').val('');
			$('#facturaElectronica').attr('disabled',true);
			$('#facturaElectronica').val('');
			$('#folioFactura').attr('disabled',true);
			$('#folioFactura').val('');
			$('#tipoPago').attr('disabled',true);
			$('#tipoPago').val(0);
			$('#clabe').val('');
			$('#servicio').attr('disabled',true);
			$('#servicio').val('');
			$('#fechaSolicitud').attr('disabled',true);
			$('#fechaSolicitud').val('');
			$('#fechaFinaliza').attr('disabled',true);
			$('#fechaFinaliza').val('');
			$('#diasEjecucion').attr('disabled',true);
			$('#diasEjecucion').val('');
			$('#servicioEstatus').attr('disabled',true);
			$('#servicioEstatus').val('');
			$('#facturaArchivo').find('.btn').addClass('disabled');
			$('#facturaArchivo, .file-caption-name').attr('disabled', true);
			$('#calculaIVA').attr('disabled', true);
			$('#calculaIVA').prop('checked', false)
			$('.tipoIVA').css('display','none')
			$('#tipoIVA').val('0')

			if(idMov === '2' || idMov === '3'){
				
				$('#calculaISR').attr('disabled', true);
				$('#calculaISR').prop('checked', false);
				
			}else{
				$('#calculaISR').removeAttr('disabled');
			}
		}else{
			
			$('#calculaIVA').removeAttr('disabled');
			$('#calculaISR').removeAttr('disabled');
			
			if($('#calculaIVA').prop('checked')){
				$('.tipoIVA').css('display','block')
				$('#tipoIVA').val('0')
			}else{
				$('.tipoIVA').css('display','none')
				$('#tipoIVA').val('0')
			}
		}
		
	});
	
	$('#buscaSinXPol').click(function () {
		siniestrosC.buscaSinXPol();
	});
	
	$('#buscaSinXFechaOcurridoDe').click(function () {
		siniestrosC.buscaSinXFechaOcurrido();
	});
	
	$('#buscaSinXFechaOcurridoHasta').click(function () {
		siniestrosC.buscaSinXFechaOcurrido();
	});
	
	$('#btnReservaPendientePorSiniestro').click(function () {
		siniestrosC.btnReservaPendientePorSiniestro();
	});
	
	$('#btnReservaPendientePorPoliza').click(function () {
		siniestrosC.btnReservaPendientePorPoliza();
	});
	
	
	$('#importe').blur(function() {
		
		var tipoMovimiento = $('#tipoMovimiento').val() 
		
		if(tipoMovimiento !== null) {
			
			if(!($('#tipoMovimiento').val() === 'AJUSTE' || $('#tipoMovimiento').val() === 'LITIGIO'
					|| $('#tipoMovimiento').val() === 'SALVAMENTO' || $('#tipoMovimiento').val() === 'RECUPERO')) {
				
				$('#subTotal').val($('#importe').val())
				siniestrosC.calculaImpuestosYTotal();
			}
		}
	});
	
	$('#importe').focusin(function(){
		
		var importe   = $('#subTotal').inputmask('unmaskedvalue') 
		var deducible = $('#deducible').inputmask('unmaskedvalue')
		var coaseguro = $('#coaseguro').inputmask('unmaskedvalue')
		
		
		var importeOriginal = (parseFloat(importe) + parseFloat(deducible) + parseFloat(coaseguro))
		
		$('#subTotal').val(importeOriginal)
		
		$('#deducible').val('0');
		$('#coaseguro').val('0');
		
	})
	
	$('#historialComentarios').click(function () {
		siniestrosC.historialComentarios();
	});
	
	$('#formMovimiento .proveedor').focusin(function() {
		
		var radioSelected = $("input[name=fisicoMoral]:checked").val();
		console.log('Beneficiario-Proveedor', radioSelected)
		
		if(radioSelected === "1"){
			siniestrosC.autoCompletarProveedor('formMovimiento');
		}else{
			siniestrosC.autoCompletarBeneficiario('formMovimiento');
		}
		
	});
	
	$('#fechaAplicacion').change(function() {
		if($('#fechaAplicacion').val() !== null && $('#fechaAplicacion').val() !== '') {
			var fechaAjuAsig = new Date($('#fechaAplicacion').val());
			var fechaHoy = new Date();
			if(fechaAjuAsig > fechaHoy) {
				$('#fechaAplicacion').val('');
				mensajes.modalAlert('warning', 'Valor no valido', 'Fecha aplicacion: debe ser menor o igual a la fecha actual.');
			}
		}
	});
	
	
	$('#fechaFinaliza').on('change', function() {
		if($('#fechaFinaliza').val() !== null && $('#fechaFinaliza').val() !== '') {
			var start = $('#fechaSolicitud').val();
			var end = $('#fechaFinaliza').val();
			var diff = new Date((new Date(end)) - (new Date(start)));
			var days = diff/1000/60/60/24;
			$('#diasEjecucion').val(days + 1);
		}
	});
	
	$('#btnSinPorNombreAsegurado').click(function () {
		siniestrosC.btnSinPorNombreAsegurado();
	});
	
	$('#folioFactura').blur(function() {
//		siniestrosC.validaFolioFactura();
	});
	
	$('#generarSiniestroAP').click(function () {
		siniestrosC.generarSiniestroAP();
	});
	
	$('#btnBusquedaPoliza').click(function () {
//		siniestrosC.btnBusquedaPoliza();
		siniestrosC.polizaCoberturas()
	});	
	
	
	$('#ramo').change(function() {
		
		var ramo = $('#ramo').val();
	    $('.limpiar').val('')
	    
		if(ramo === '5') {
			$('#grupoAP').val('');
			$('#certificado').val('');
//			$('#grupoAP').attr('disabled', true);
			$('.lstAsegurados').css('display','none')
			$('.diversos').css('display','block')
			
		} else if(ramo === '1') {
			
			$('#grupoAP').val('');
			$('#certificado').val('');
//			$('#grupoAP').attr('disabled', false);
			$('.lstAsegurados').css('display','block')
			$('.diversos').css('display','none')
			
		}
		
		siniestrosC.cargaCT19_7CausaSiniestro(ramo, null);
	});
	
	$('#calculaIVA').change(function() {
		
		
		if($('#calculaIVA').prop('checked')){
			$('.tipoIVA').css('display','block')
		}else{
			$('.tipoIVA').css('display','none')
			$('#identGastos').val('0')
			
			$('#importe').val('0.00');
			$('#subTotal').val('0.00');
			$('#iva').val('0.00');
			$('#isr').val('0.00');
			$('#isrRetenido').val('0.00');
			$('#ivaRetenido').val('0.00');
			$('#total').val('0.00');
			$('#deducible').val('0.00');
			$('#coaseguro').val('0.00');
			
			siniestrosC.calculaImpuestosYTotal();
		}
		
	});
	
	$('#identGastos').change(function(){
		
		$('#importe').val('0.00');
		$('#subTotal').val('0.00');
		$('#iva').val('0.00');
		$('#isr').val('0.00');
		$('#isrRetenido').val('0.00');
		$('#ivaRetenido').val('0.00');
		$('#total').val('0.00');
		$('#deducible').val('0.00');
		$('#coaseguro').val('0.00');
		
		siniestrosC.calculaImpuestosYTotal();
	})
	
	$('#calculaISR').change(function() {
		
		$('#importe').val('0.00');
		$('#subTotal').val('0.00');
		$('#iva').val('0.00');
		$('#isr').val('0.00');
		$('#isrRetenido').val('0.00');
		$('#ivaRetenido').val('0.00');
		$('#total').val('0.00');
		$('#deducible').val('0.00');
		$('#coaseguro').val('0.00');
		
		siniestrosC.calculaImpuestosYTotal();
	});
	
	$( "#busquedaPoliza" ).focusout(function() {
		
		var ramo = $('#ramo').val();
		
		if(ramo === '1'){
			siniestrosC.aseguradosAP();	
		}
	})
	
	$( "#busquedaPoliza" ).change(function() {
		
		var ramo = $('#ramo').val();
		
//		$('.limpiar').val('')
		 	
	})
	
	
	$('#asegurados').change(function(){
		
		var idAseg = $('#asegurados').val()
		var grupo  = $('#asegurados').find(':selected').attr("data-grupo")
		var riesgo = $('#asegurados').find(':selected').attr("data-riesgo")
		var ocupacion = $('#asegurados').find(':selected').attr("data-ocup")
		var sexo = $('#asegurados').find(':selected').attr("data-sex") == 'F' ? 'Femenino' : 'Masculino'
		var nacimiento = $('#asegurados').find(':selected').attr("data-birth")
		
		$('#grupoAP').val(grupo +' - '+ riesgo)
		$('#sexo').val(sexo)
		$('#birthday').val(nacimiento)
		$('#certificado').val(idAseg)
		$('#ocupacion').val(ocupacion)
		
	})
	
	$('#cobertura4').focusout(function(){
		
		var estimacion    = $('#cobertura4').inputmask('unmaskedvalue')
		var limSA         = $('#coberturas').find(':selected').attr("data-limite");
		var tipoCobertura = $('#coberturas').find(':selected').attr("data-cob")
		var totalSA       = $('#coberturas').find(':selected').attr("data-sa")
		var ramo          = $('#ramo').val();
		
		console.log('Tipo Cobertura -> ', tipoCobertura)
	   
		if(tipoCobertura !== undefined && tipoCobertura !== '001' && ramo === '5'){
		
			if(parseFloat(limSA) > 0){
				
				$('#guardaSiniestro').removeAttr('disabled')
				
				if(parseFloat(estimacion) > parseFloat(limSA)){
					
					mensajes.modalAlert('warning', 'Información', 'El Monto de la Estimación es mayor al limite de SA');
					$('#guardaSiniestro').attr('disabled', true)
				}
			
			}else{
				
				mensajes.modalAlert('warning', 'Información', 'La Cobertura a Afectar ya no cuenta con SA Disponible');
				$('#guardaSiniestro').attr('disabled', true)
			}
			
		}else{
			
			$('#gu ardaSiniestro').removeAttr('disabled')
			
			if(parseFloat(estimacion) > parseFloat(limSA) && ramo === '5'){
				mensajes.modalAlert('warning', 'Información', 'El Monto de la Estimación es mayor al limite de SA <br>El siniestro se debe Cosiderar como Perdida Total');
				$('#cobertura4').val(totalSA)
			}
		}
		
	})
	
	$('#importe').focusout(function(){
		
		var tipoMov = $('#tipoMovimiento').val()
		
		function validaMonto(){
			
			var total      = $('#total').inputmask('unmaskedvalue')
			var limSA      = $('#limiteSA').val()
			var cobSA      = $('#idCobertura').find(':selected').attr("data-sa")
			var tipoCob    = $('#idCobertura').find(':selected').attr("tipo-cob")
			
			if(parseFloat(total) > parseFloat(limSA)){

				if($.trim(tipoCob) === '001'){
					
					if(parseFloat(total) === parseFloat(cobSA)){	
						
						$('#guardaMovimiento').removeAttr('disabled')
						
					}else{
						mensajes.modalAlert('warning', 'Información', 'El monto a Pagar es Mayor al Limite de la SA<br>Se debe Considerar como Perdida Total por $' + cobSA);
						$('#guardaMovimiento').attr('disabled', true)
					}
				}else{
					mensajes.modalAlert('warning', 'Información', 'El monto a Pagar es Mayor al Limite de la SA');
					$('#guardaMovimiento').attr('disabled', true)
				}
				
			}else{
				$('#guardaMovimiento').removeAttr('disabled')
			}
		}
	
		  if(tipoMov === 'PAGO'){
			  setTimeout(validaMonto, 2000);  
		  }
		
	})
	
	$('#coberturas').change(function(){
		
		$('#cobertura4').val('')
		var ramo = $('#ramo').val()
		var cobertura = $('#coberturas').find(':selected').text().toUpperCase()
		var coaseguro = $('#coberturas').find(':selected').attr("data-coa")
		var deducible = $('#coberturas').find(':selected').attr("data-dedu")
		
		$('#deducible').val(deducible)
		$('#coaseguro').val(coaseguro)
		
		console.log('Cobertura AP: ', cobertura)
		
		if(ramo === '1' && cobertura.indexOf("REEMBOLSO") === -1){
			
			var sumaAseg = $('#coberturas').find(':selected').attr("data-sa")
			
			$('#cobertura4').attr('disabled', true)
			$('#cobertura4').val(sumaAseg)
			
		}else if (ramo === '1' && cobertura.indexOf("REEMBOLSO") >= 0){
			
			var sumaAseg = $('#coberturas').find(':selected').attr("data-sa")
			$('#cobertura4').removeAttr('disabled')
			$('#cobertura4').val(sumaAseg)
			
		}else{
			
			$('#cobertura4').removeAttr('disabled')
		}
		
	})
	
	$('input[name="fisicoMoral"]').change(function() {
		
		$('.clean').val('');

	});
	
	$("input[name='tipoBusqueda']").change(function(){
		
		var radioSelected = $("input[name=tipoBusqueda]:checked").val();
		$('.reservaTable').css('display','none');
		
		if(radioSelected === 'F'){
			$('.fechas').css('display','block')
			$('.numSiniestro').css('display','none')
			$('#txtBusca').val('')
		}else{
			$('.fechas').css('display','none')
			$('.numSiniestro').css('display','block')
			$('#fechaIni').val('')
			$('#fechaFin').val('')
		}
		
	})
	
	$('#tipoReporte').change(function(){
		var tipoReporte = $('#tipoReporte').val()
		
		$('.background-tabla').css('display', 'none');
		
//		if(tipoReporte === '1'){
//			$('.fechas').css('display', 'block')
//		}else{
//			$('.fechas').css('display', 'none')
//		}
	})
	
	
	$('#reporteSiniestros').click(function(){
		siniestrosC.reporteSiniestroPagos()
	})
	
	$('#generaExcelMov').click(function(){
		siniestrosC.movimientosSiniestros()
	})
	
	$('#tipoMoneda').change(function(){
		
		var tipoCambio = $('#tipoMoneda').find(':selected').attr("cambio")
		$('#tipoCambio').val(tipoCambio)
		
	})
	
});