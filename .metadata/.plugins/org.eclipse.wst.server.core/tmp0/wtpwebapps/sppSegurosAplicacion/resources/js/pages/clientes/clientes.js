clientesC.archivosClientes();
$(document).ready(function() {
	var $tipoOperacion;
	cargoC.comboCargos();
	clientesC.obtenerActividadEconomica();
	
	$('.cargo').attr('disabled', true);
	//$('#rfc').removeAttr('disabled');
	
	$('#formClienteNuevo .codigoPostal').focusin(function(){
		clientesC.autoCompletarCodigoPostal("formClienteNuevo");
	});
	
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		  var target = $(e.target).attr("href") // activated tab
		  util.resetInvalidTooltip();
		  $('input[name="radiosClientesNuevo"][value="1"]').prop('checked', true);
		  $tipoOperacion = target.replace('#','');
		  
		  if(target.replace('#','') === 'nuevoCliente'){
			  $('#formClienteNuevo')[0].reset();
			  $('.clienteFisicoNuevo').css('display', 'block');
			  $('.clienteMoralNuevo').css('display', 'none');
			  $('#nombreCliente').focus();
			  $('#busquedaCliente').addClass('d-none');
			  $('#clienteNuevo').removeClass('d-none');
			  
			  console.log("setnuevo = " + $("input[name=radiosClientesNuevo]:checked").val());
			  radioClienteNuevo("nuevoCliente");
		  }
		  
		  if(target.replace('#','') === 'consultarCliente'){
			  $('#formClienteBuscar')[0].reset();
			  $('.clienteFisicoBusqueda').css('display', 'block');
			  $('.clienteMoralBusqueda').css('display', 'none');
			  $('.background-tabla').css('display', 'none');
			  $('#busquedaCliente').removeClass('d-none');
			  $('#clienteNuevo').addClass('d-none');
			  
			  $('#denominacion').focus();
			  
			  console.log("setconsulta = " + $("input[name=radiosClientesNuevo]:checked").val());
			  radioClienteNuevo("consultarCliente");
		  }
		  console.log();
		});
	
	radioClienteNuevo("nuevoCliente");
	sepomexC.obtenerEstados();
	identificacionC.obtenerIdentificaciones();
	giroMercantilC.obtenerGirosMercantiles();
	formaPagoC.obtenerFormasPago();
	monedaC.obtenerMonedasAltaCliente();
	paisC.obtenerPaises();
	clientesC.obtenerRangosOperacion();
	ocupacionC.ocupacion();

	// Accion guardar Cliente
	$('#guardarCliente').click(function() {
		clientesC.guardarCliente('#formClienteNuevo', 'radiosClientesNuevo');
	});
	
	$('#actualizarCliente').click(function(){
		clientesC.guardarCliente('#formClienteEditar', 'radiosClientesNuevo');
	});

	$('#estado').change(function() {
		$('#municipio').prop('disabled', false);
		sepomexC.obtenerMunicipios($(this).val());
	});

	$('#municipio').change(function() {
		sepomexC.obtenerCodigosPostales($('#estado').val(), $(this).val());
	})
	
	$('.pep').change(function() {
		if($(this).val() === "SI"){
			$('.cargo').attr('disabled', false);
			$('.nivelRiesgo').attr('disabled', true).val("ALTO");
		}else{
			$('.cargo').val("");
			$('.cargo').attr('disabled', true);
			$('.cargo').removeClass('is-invalid');
			$('.cargo').parent().find('.invalid-tooltip').remove();
			$('.nivelRiesgo').attr('disabled', false).val("");
		}
	})
	
		$('.nacionalidad').change(function() {
		if($(this).val() === "EXTRANJERO"){
			$('._calidadMigratoria').find('.btn').removeClass('disabled');
			$('#_calidadMigratoria, .file-caption-name').removeAttr('disabled');
		}else{
			$('._calidadMigratoria').find('.btn').addClass('disabled');
			$('#_calidadMigratoria, .file-caption-name').attr('disabled', 'true');
		}
	})

	function radioClienteNuevo(operacion) {
		var radios = $('input[name="radiosClientesNuevo"]');

		radios.change(function() {
			var radioSelected = $("input[name=radiosClientesNuevo]:checked").val();
			console.log(radioSelected);
			
			if(radioSelected == 1 && operacion === 'nuevoCliente'){
				$('.clienteFisicoNuevo').css('display', 'block');
				$('.clienteMoralNuevo').css('display', 'none');
				$('#formClienteNuevo')[0].reset();
				$('#formClienteBuscar')[0].reset();

				if ($(this).val() === '1') {
					$('#nombreCliente').focus();
				} else {
					$('#denominacion').focus();
				}
			}else if(radioSelected == 0 && operacion === 'nuevoCliente'){
				$('.clienteFisicoNuevo').css('display', 'none');
				$('.clienteMoralNuevo').css('display', 'block');
				$('#formClienteNuevo')[0].reset();
				$('#formClienteBuscar')[0].reset();

				if ($(this).val() === '1') {
					$('#nombreCliente').focus();
				} else {
					$('#denominacion').focus();
				}
			}
			
			if(radioSelected == 1 && operacion === 'consultarCliente'){
				$('.clienteFisicoBusqueda').css('display', 'block');
				$('.clienteMoralBusqueda').css('display', 'none');
				$('#formClienteNuevo')[0].reset();
				$('#formClienteBuscar')[0].reset();
				$('.background-tabla').css('display', 'none');
			}else if(radioSelected == 0 && operacion === 'consultarCliente'){
				$('.clienteFisicoBusqueda').css('display', 'none');
				$('.clienteMoralBusqueda').css('display', 'block');
				$('#formClienteNuevo')[0].reset();
				$('#formClienteBuscar')[0].reset();
				$('.background-tabla').css('display', 'none');
			}
			
			util.resetInvalidTooltip();
		});
	}

	$('#consultarByNombre').click(function () {
		clientesC.buscarPorNombre();
		$('#busquedaRfc').val("")
		$('#busquedaRazonSocial').val("")
		$('#busquedaGiroMercantil').val("")
	});
	
	$('#consultarByRfc').click(function () {
		clientesC.buscarPorRFC();
		$('#busquedaNombreCliente').val("")
		$('#busquedaRazonSocial').val("")
		$('#busquedaGiroMercantil').val("")
	});
	
	$('#consultarByRazonSocial').click(function () {
		clientesC.buscarPorRazonSocial();
		$('#busquedaNombreCliente').val("")
		$('#busquedaRfc').val("")
		$('#busquedaGiroMercantil').val("")
	});
	
	$('#consultarByGiroMercantil').click(function () {
		clientesC.buscarPorGiro();
		$('#busquedaNombreCliente').val("")
		$('#busquedaRfc').val("")
		$('#busquedaRazonSocial').val("")
	});
	
	$(document).on('click', '.btn-aut-s', function(){
		clientesC.autorizacionOficialCumplimiento(true);
		$('.oficialAutorizacion').popover('hide');
	});
	
	$(document).on('click', '.btn-aut-n', function(){
		clientesC.autorizacionOficialCumplimiento(false);
		$('.oficialAutorizacion').popover('hide');
	});
	
	$('.firmaElectronicaAvanzada').blur(function() {
		console.log("click");
		if($.trim($(this).val()) != ''){
			$('._firmaElectronicaAvanzadaDoc').removeClass('d-none');
		}else{
			$('._firmaElectronicaAvanzadaDoc').addClass('d-none');
		}
	});
		
});