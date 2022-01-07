$(document).ready(function () {
	
	contratosC.cargaCatalogoMoneda();
	//contratosC.llenaCatalogoRamo();	
	contratosC.comboTipoContrato();
	contratosC.obtenerTabActivo();
	contratosC.vista();
	
	$('.tipoContrato').change(function(){
		var $data = $(this).find(":selected").data();
		
		$('.tipoReaseguro').html('');
		$('.tipoCobertura').html('');
		$('.tipoProteccion').html('');
		
		$('.tipoReaseguro').append('<option value="' + $data.tipoReaseguro + '">' + $data.tipoReaseguro + '</option>');
		$('.tipoCobertura').append('<option value="' + $data.tipoCobertura + '">' + $data.tipoCobertura + '</option>');
		$('.tipoProteccion').append('<option value="' + $data.tipoProteccion + '">' + $data.tipoProteccion + '</option>');
	});
	
//	$('#montoRetencionImporte').on('change', function() {
//		var $montoRetencionImporte = $('#montoRetencionImporte').val();
//		var $capacidadMaxima = $('#capacidadMaxima').val();
//		
//		if(parseFloat($montoRetencionImporte) > parseFloat($capacidadMaxima)){
//			mensajes.modalAlert('warning', 'Monto retención', 'Monto retención es mayor a Capacidad máxima');
//			$('#montoRetencionImporte').val('');
//			return;
//		}
//		
//		var $resultadoRetencion = (parseFloat($montoRetencionImporte) / parseFloat($capacidadMaxima)) * 100;
//		var $resultadoCesionImporte = parseFloat($capacidadMaxima) - parseFloat($montoRetencionImporte);
//		var $resultadoCesionPorcentaje = 100 - parseFloat($resultadoRetencion);
//		
//		$('#montoRetencionPorcentaje').val($resultadoRetencion.toFixed(2));
//		$('#montoCesionImporte').val($resultadoCesionImporte.toFixed(2));
//		$('#montoCesionPorcentaje').val($resultadoCesionPorcentaje.toFixed(2));
//	});
	
	/*$('#montoRetencionPorcentaje').on('change', function() {console.log('cambios');
		var $montoRetencionPorcentaje = $('#montoRetencionPorcentaje').val();
		var $capacidadMaxima = $('#capacidadMaxima').val();
		
//		if(parseFloat($montoRetencionImporte) > parseFloat($capacidadMaxima)){
//			mensajes.modalAlert('warning', 'Monto retención', 'Monto retención es mayor a Capacidad máxima');
//			$('#montoRetencionImporte').val('');
//			return;
//		}
		
		var $resultadoRetencionImporte = (parseFloat($montoRetencionPorcentaje) * parseFloat($capacidadMaxima)) / 100;
		var $resultadoCesionImporte = parseFloat($capacidadMaxima) - parseFloat($resultadoRetencionImporte);
		var $resultadoCesionPorcentaje = 100 - parseFloat($montoRetencionPorcentaje);
		
		$('#montoRetencionImporte').val($resultadoRetencionImporte.toFixed(2));
		$('#montoCesionImporte').val($resultadoCesionImporte.toFixed(2));
		$('#montoCesionPorcentaje').val($resultadoCesionPorcentaje.toFixed(2));
	});
	
	
	$('#tablaPlenos').on('change', function() {
		if($(this).val() === 'SI'){
			var $montoRetencionImporte = $('#montoRetencionImportePleno').val();
			var $capacidadMaxima = $('#capacidadMaxima').val();
			
			if(parseFloat($montoRetencionImporte) > parseFloat($capacidadMaxima)){
				mensajes.modalAlert('warning', 'Monto retención', 'Monto retención es mayor a Capacidad máxima');
				$('#montoRetencionImporte').val('');
				return;
			}
			
			var $numeroPlenos = parseFloat($capacidadMaxima) / parseFloat($montoRetencionImporte);
			
			$('#numeroPlenos').val($numeroPlenos.toFixed(2));
		}else{
			$('#numeroPlenos').val('0');
		}
	});*/
	
	//Navegar de Tipo Contrato a Contrato
	$('#continuarTipoReaseguro').click(function () {
		contratosC.vistaContrato();
	});
	
	$('.btnSiguiente').click(function (e){
		e.preventDefault();
		contratosC.vista();
	});
	
	$('#btnAgregaCapa').click(function () {
		contratosC.btnAgregaCapa();
	});
	
	$('#btnContabilidadContrato').click(function () {
		contratosC.btnContabilidadContrato();
	});
	
	/*$('.ramo').change(function(){
		$ramo = $(this).val();
		contratosC.llenaCatalogoProducto($ramo);
		contratosC.llenarComboPolizas($ramo);
	});
	
	$('#porcentajeComisionReaseguroPrimaCedida').blur(function() {
		var x = $('#porcentajeComisionReaseguroPrimaCedida').val();
		if (x < 0 || x > 100) {
			$('#porcentajeComisionReaseguroPrimaCedida').val('');
			mensajes.modalAlert('warning', 'Valor no valido', 'Rango porcentaje de 0 a 100');
		}
	});
	
	$('#participacionReasegurador').blur(function() {
		var x = $('#participacionReasegurador').val();
		if (x < 0 || x > 100) {
			$('#participacionReasegurador').val('');
			mensajes.modalAlert('warning', 'Valor no valido', 'Rango porcentaje de 0 a 100');
		}
	});
	
	$('#porcentajeGastosReaseguradorPB').blur(function() {
		var x = $('#porcentajeGastosReaseguradorPB').val();
		if (x < 0 || x > 100) {
			$('#porcentajeGastosReaseguradorPB').val('');
			mensajes.modalAlert('warning', 'Valor no valido', 'Rango porcentaje de 0 a 100');
		}
	});
	
	$('#sONORPB').blur(function() {
		var x = $('#sONORPB').val();
		if (x < 0 || x > 100) {
			$('#sONORPB').val('');
			mensajes.modalAlert('warning', 'Valor no valido', 'Rango porcentaje de 0 a 100');
		}
	});
	
	$('#porcentajeParticBeneficiosPB').blur(function() {
		var x = $('#porcentajeParticBeneficiosPB').val();
		if (x < 0 || x > 100) {
			$('#porcentajeParticBeneficiosPB').val('');
			mensajes.modalAlert('warning', 'Valor no valido', 'Rango porcentaje de 0 a 100');
		}
	});
	
	$('#porcentajeGastosParticBeneficiosPB').blur(function() {
		var x = $('#porcentajeGastosParticBeneficiosPB').val();
		if (x < 0 || x > 100) {
			$('#porcentajeGastosParticBeneficiosPB').val('');
			mensajes.modalAlert('warning', 'Valor no valido', 'Rango porcentaje de 0 a 100');
		}
	});
	
//	$('#capaTasaPrima').blur(function() {
//		var x = $('#capaTasaPrima').val();
//		if (x < 0 || x > 100) {
//			$('#capaTasaPrima').val('');
//			mensajes.modalAlert('warning', 'Valor no valido', 'Rango porcentaje de 0 a 100');
//		}
//	});*/
	
	$('#restauraTodo').click(function () {
		contratosC.restauraTodo();
	});
	
	$('#agregaReaseguradorNoP').click(function () {
		contratosC.agregaReasegurador();
	});
	
	$('#guardaContrato').click(function () {
		console.log("click");
		contratosC.guardaContrato();
	});
	
	
	$('#formReaseguradores .autoCompletaProveedor').focusin(function() {
		contratosC.autoCompletarReasegurador('formReaseguradores');
	});
	
	$('#nombreIntermediario').focusin(function() {
		contratosC.autoCompletarIntermediario('formReaseguradores');
	});
	
	$('#inicioVigencia').on('change',function() {
		if($('#inicioVigencia').val() !== null && $('#inicioVigencia').val() !== '') {
			var inicio = new Date($('#inicioVigencia').val());
			var year = inicio.getFullYear();
			var month = inicio.getMonth();
			var day = inicio.getDate();
			var c = new Date(year+1, month, day+1);
			c.setDate(c.getDate()-1);
			$('#finVigencia').bootstrapDP('setDate', c);
		}
	});
	
	$('#porcentajeCorretaje').blur(function() {
		var x = $('#porcentajeCorretaje').val();
		if (x < 0 || x > 100) {
			$('#porcentajeCorretaje').val('');
			mensajes.modalAlert('warning', 'Valor no valido', 'Rango porcentaje de 0 a 100');
		}
	});
	
	$('#factorAjuste').blur(function() {
		var x = $('#factorAjuste').val();
		if (x < 0 || x > 100) {
			$('#factorAjuste').val('');
			mensajes.modalAlert('warning', 'Valor no valido', 'Rango porcentaje de 0 a 100');
		}
	});
	
	/*$('#calculoUtilidades').on('change', function() {
		if($(this).val() === 'NO'){
			$('#porcentajePTU').attr('disabled', true);
			$('#formulaUtilidades').attr('disabled', true);
			$('#aniosDesface').attr('disabled', true);
			
			$('#porcentajePTU').val("");
			$('#aniosDesface').val("");
		}else{
			$('#porcentajePTU').removeAttr('disabled');
			$('#formulaUtilidades').removeAttr('disabled');
			$('#aniosDesface').removeAttr('disabled');
		}
	});*/
	
	$('#btnAceptarBajaContrato').click(function () {
		contratosC.cancelarContrato();
	});
	
	/*$('.porcentajePrima, .pdmImporte').change(function(){
		var $porcentajePrima = $('#porcentajePrima').val();
		var $pmdImporte = $('#pdmImporte').val();
		var $primaAjuste = $('#primaAjuste');
		var $resultadoPrimaAjuste = 0;
		
		$resultadoPrimaAjuste = $pmdImporte * $porcentajePrima;
		
		$primaAjuste.val($resultadoPrimaAjuste);
		
	});/**/
	
	//cargaTipoContrato();
	cargaRamos();
	cargaProteccion();
	
	function cargaTipoContrato(){
		$('#tipoContrato').empty();
		$('#tipoContrato').append('<option value="0" selected>Seleccione...</option>');
		$('#tipoContrato').append('<option value="1">Proporcional</option>');
		$('#tipoContrato').append('<option value="2">No proporcional</option>');
	}
	
	function cargaRamos(){
		$('#idRamo').empty();
		$('#idRamo').append('<option value="0" selected>Seleccione...</option>');
		$('#idRamo').append('<option value="1">Vida</option>');
		$('#idRamo').append('<option value="2">Accidentes y enfermedades</option>');
		$('#idRamo').append('<option value="3">Daños</option>');
	}
	
	function cargaProteccion(){
		$('#tipoProteccion').empty();
		$('#tipoProteccion').append('<option value="0" selected>Seleccione...</option>');
		$('#tipoProteccion').append('<option value="1">Evento</option>');
		$('#tipoProteccion').append('<option value="2">Riesgos</option>');
		$('#tipoProteccion').append('<option value="3">Evento y riesgo</option>');
		$('#tipoProteccion').append('<option value="4">Catastrófico</option>');
	}
	
	$('#subRamo').change(function(){
		$('#cobertura').empty();
		$('#cobertura').append('<option value="0" selected>Seleccione...</option>');
		if($('#idRamo').val()=="3"){
			switch(parseInt($('#subRamo').val())){
				case 1:{
					$('#cobertura').append('<option value="1">General</option>');
					$('#cobertura').append('<option value="2">Aviones y barcos</option>');
					$('#cobertura').append('<option value="3">Viajero</option>');
					$('#cobertura').append('<option value="4">Otros</option>');
				}break;
				case 2:{
					$('#cobertura').append('<option value="1">Carga</option>');
					$('#cobertura').append('<option value="2">Cascos</option>');
				}break;
				case 3:{
					$('#cobertura').append('<option value="1">Incendio y/o rayo edificio</option>');
					$('#cobertura').append('<option value="2">Explosión</option>');
					$('#cobertura').append('<option value="3">Huelgas y alborotos pop.</option>');
					$('#cobertura').append('<option value="4">Naves aéreas, vehic. y humo</option>');
					$('#cobertura').append('<option value="5">Fen. hidro. edificio</option>');
					$('#cobertura').append('<option value="6">Terremoto y/o e.v.</option>');
					$('#cobertura').append('<option value="7">Otros riesgos</option>');
				}break;
				case 4:{
					$('#cobertura').append('<option value="1">Terremoto y erupción volcánica</option>');
					$('#cobertura').append('<option value="2">Riesgos hidrometeorológicos</option>');
					$('#cobertura').append('<option value="3">Otros</option>');
				}break;
				case 5:{
					$('#cobertura').append('<option value="1">Agrícola</option>');
					$('#cobertura').append('<option value="2">Pecuario</option>');
					$('#cobertura').append('<option value="3">Otros</option>');
				}break;
				case 6:{
					$('#cobertura').append('<option value="1">Automóviles residentes</option>');
					$('#cobertura').append('<option value="2">Camiones residentes</option>');
					$('#cobertura').append('<option value="3">Automóviles turistas</option>');
					$('#cobertura').append('<option value="4">Otros</option>');
					$('#cobertura').append('<option value="5">Obligatorios</option>');
				}break;
				case 7:{
					$('#cobertura').append('<option value="1">Misceláneos</option>');
					$('#cobertura').append('<option value="2">Técnicos</option>');
				}break;
				default:{
				}break;
			}
		}
	});
	
	$('#idRamo').change(function(){
		$('#subRamo').empty();
		$('#subRamo').append('<option value="0" selected>Seleccione...</option>');
		
		$('#cobertura').empty();
		$('#cobertura').append('<option value="0" selected>Seleccione...</option>');
		switch(parseInt($('#idRamo').val())){
			case 1:{//vida
				$('#subRamo').append('<option value="1">Individual</option>');
				$('#subRamo').append('<option value="2">Grupo</option>');
				$('#subRamo').append('<option value="3">Colectivo</option>');
				
				$('#cobertura').append('<option value="1">Muerte accidental</option>');
				$('#cobertura').append('<option value="2">Pago anticipado por invalidez total y permanente</option>');
				$('#cobertura').append('<option value="3">Pago de primas por invalidez</option>');
			}break;
			case 2:{//accidentes y enfermedades
				$('#subRamo').append('<option value="1">Accidentes personales individual</option>');
				$('#subRamo').append('<option value="2">Accidentes personales grupo</option>');
				$('#subRamo').append('<option value="3">Accidentes personales colectivo</option>');
				$('#subRamo').append('<option value="4">Gastos médicos individual</option>');
				$('#subRamo').append('<option value="5">Gastos médicos grupo</option>');
				$('#subRamo').append('<option value="6">Gastos médicos colectivo</option>');
				$('#subRamo').append('<option value="7">Salud individual</option>');
				$('#subRamo').append('<option value="8">Salud grupo</option>');
				$('#subRamo').append('<option value="9">Salud colectivo</option>');
			}break;
			case 3:{//daños
				$('#subRamo').append('<option value="1">Responsabilidad civil</option>');
				$('#subRamo').append('<option value="2">Maritimo y transportes</option>');
				$('#subRamo').append('<option value="3">Incendio</option>');
				$('#subRamo').append('<option value="4">Riesgos catastróficos</option>');
				$('#subRamo').append('<option value="5">Agrícola y animales</option>');
				$('#subRamo').append('<option value="6">Automóviles</option>');
				$('#subRamo').append('<option value="7">Diversos</option>');
			}break;
		}
	});
	
	$('#tipoContrato').change(function(){
		$('#tipoContrato2').empty();
		$('#tipoContrato2').append('<option value="0" selected>Seleccione...</option>');
		switch(parseInt($('#tipoContrato').val())){
			case 1:{
				$('#tipoContrato2').append('<option value="1">Cuota parte</option>');
				$('#tipoContrato2').append('<option value="2">Primer excedente</option>');
			}break;
			case 2:{
				$('#tipoContrato2').append('<option value="1">Working cover</option>');
				$('#tipoContrato2').append('<option value="2">Stop loss</option>');
				$('#tipoContrato2').append('<option value="3">Tent plan</option>');
				$('#tipoContrato2').append('<option value="4">Catastrófico</option>');
			}break;
		}
	});/**/
});