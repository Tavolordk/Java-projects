var contratosC = (function () {
	var btnEditarReasegurador = "btnEditarReasegurador";
	var btnEliminarReasegurador = "btnEliminarReasegurador";
	var btnEditarCapa = "btnEditarCapa";
	var btnEliminarCapa = "btnEliminarCapa";
	var contadorReaseguradores = 0;
	var idContrato= 0;
	var idCompania = 0;
	var idIntermediario = 0;
	var excludeIds = [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0]];
	var participacion100 = 0;
	var reaseguradorId = 0;
	var noRe = 0;
	var noCa = 0;
	var numeroCapaMayor = 0;
	var listaCapas = [];
		
	var vistaContrato = function() {
		var $tipoReaseguro = $("#tipoReaseguro").val();
		var $tipoProteccion = $("#tipoProteccion").val();
		var $tipoContratoText = $("#tipoContrato option:selected").text();
		
		$(".cont-tipoReaseguro").val($tipoReaseguro);
		$(".cont-tipoProteccion").val($tipoProteccion);
		$('.tc-especificos').removeClass('d-none');
		
		$('.tc-cuotaParte, tc-excedente, tc-mixto, .tc-excesoPerdida, .tc-wxl, .tc-xlCat, .facultativo').addClass('d-none');
		
		if($tipoContratoText === "CUOTA PARTE"){
			$('.tc-cuotaParte').removeClass('d-none');
		}else if($tipoContratoText === "CUOTA PARTE FACULTATIVO"){
			$('.tc-cuotaParte, .facultativo').removeClass('d-none');
		}else if($tipoContratoText === "EXCEDENTE FACULTATIVO"){
			$('.tc-cuotaParte').addClass('d-none');
			$('.tc-excedente, .facultativo').removeClass('d-none');
		}else if($tipoContratoText === "EXCEDENTE"){
			$('.tc-cuotaParte, .facultativo').addClass('d-none');
			$('.tc-excedente').removeClass('d-none');
		}else if($tipoContratoText === "MIXTO FACULTATIVO"){
			$('.tc-cuotaParte, .tc-excedente').addClass('d-none');
			$('.tc-mixto, .facultativo').removeClass('d-none');
		}else if($tipoContratoText === "MIXTO"){
			$('.tc-cuotaParte, tc-excedente, .facultativo').addClass('d-none');
			$('.tc-mixto').removeClass('d-none');
		}else if($tipoContratoText === "EXCESO DE PERDIDA - PRIMA"){
			$('.tc-cuotaParte, tc-excedente, tc-mixto, .facultativo').addClass('d-none');
			$('.tc-excesoPerdida').removeClass('d-none');
		}else if($tipoContratoText === "EXCESO DE PERDIDA - SUMA ASEGURADA"){
			$('.tc-cuotaParte, tc-excedente, tc-mixto, .facultativo').addClass('d-none');
			$('.tc-excesoPerdida').removeClass('d-none');
		}else if($tipoContratoText === "WORKING COVER"){
			$('.tc-cuotaParte, tc-excedente, tc-mixto, .tc-excesoPerdida, .facultativo').addClass('d-none');
			$('.tc-wxl').removeClass('d-none');
		}else if($tipoContratoText === "MIXTO WC Y XL"){
			$('.tc-cuotaParte, tc-excedente, tc-mixto, .tc-excesoPerdida, .facultativo').addClass('d-none');
			$('.tc-wxl').removeClass('d-none');
		}else if($tipoContratoText === "XL CAT"){
			$('.tc-cuotaParte, tc-excedente, tc-mixto, .tc-excesoPerdida, .tc-wxl, .facultativo').addClass('d-none');
			$('.tc-xlCat').removeClass('d-none');
		}
	}
	
	var restauraTodo = function() {
		$('#formTipoContrato')[0].reset();
		$('#formContrato')[0].reset();
		$('#formReaseguradores')[0].reset();
		
		contadorReaseguradores = 0;
		participacion100 = 0;
		noRe = 0;
		noCa = 0;
		numeroCapaMayor = 0;
		
		listaReaseguradores = [];
		listaCapas = [];
		excludeIds = [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0]];
		var dataSet = [];
		tabla.borrarTabla("#reaseguradoresTabla", dataSet);
		tabla.borrarTabla("#capasTabla", dataSet);
		
		$("#tipoReaseguro, #tipoCobertura, #tipoProteccion, #producto").html('');
		
		var $currentTab = $('.wizard-navigation > ul > li').find('.active'); 
		
		$currentTab.addClass('disabled')
		$("#tabTipoContrat").removeClass('disabled');
		$("#tabTipoContrat").trigger('click');
	}
	
	var continuarProporcional = function() {
		var tipoReaseguro = $("#tipoReaseguro").val();
		var $tipoReaseguroText = $("#tipoReaseguro option:selected").text();
		
		if(tipoReaseguro === 'PROPORCIONAL') {
			
			$("#porcentajeParticBeneficiosPB").attr("disabled",false);
			$("#sONORPB").attr("disabled",false);
			$("#porcentajeGastosReaseguradorPB").attr("disabled",false);
			var pb = $("#calculaPB").val();
			if(pb==="NO") {
				$("#porcentajeParticBeneficiosPB").attr("disabled",true);
				$("#sONORPB").attr("disabled",true);
				$("#porcentajeGastosReaseguradorPB").attr("disabled",true);
			}
			$(".pbBloque").show();
		} else if(tipoReaseguro === 'NO PROPORCIONAL') {
			$(".pbBloque").hide();
		}
	}
	
	var listaReaseguradores = [];
	var agregaReasegurador = function() {
		var pb = $("#calculaPB").val();
		if($.trim($('#contratoRR6').val()) == '' || $.trim($('#numeroCapa').val()) == '' || $.trim($('#nombreCompania').val()) == '' || $.trim($('#participacionReasegurador').val()) == ''){
			mensajes.modalAlert('danger', 'Reasegurador: faltan campos', 'Todos los campos son obligatorios');
			return;
		}
		var tipoReaseguro = $("#tipoReaseguro").val();
		if(tipoReaseguro == 1) {
			if(pb==="SI") {
				if($.trim($('#porcentajeGastosReaseguradorPB').val()) == '' || $.trim($('#sONORPB').val()) == '' || $.trim($('#porcentajeParticBeneficiosPB').val()) == ''){
					mensajes.modalAlert('danger', 'Reasegurador: faltan campos', 'Los campos para calculo de PB son obligatorios');
					return;
				}
			}
		}
		//Valida 100% participacion
		participacion100=0;
		var reaseguradorProp = { }
		if(reaseguradorId !== 0 && reaseguradorId !== undefined) {
			var index = listaReaseguradores.map(x => { return x.id; }).indexOf(reaseguradorId);
			if(index>=0) {
				listaReaseguradores.splice(index, 1);
			}
			reaseguradorProp['id'] = reaseguradorId;
		}
		if(noRe !== 0 && noRe !== undefined) {
			var index = listaReaseguradores.map(x => { return x.noRe; }).indexOf(noRe);
			if(index>=0) {
				listaReaseguradores.splice(index, 1);
			}
		}
		var capaActual = $('#numeroCapa').val();
		listaReaseguradores.forEach(function(element) {
			if(capaActual===element.numeroCapa && element.idCompania!==idCompania) {
				participacion100 = participacion100 + parseFloat(element.participacionReasegurador); 
			}
		});
		var participacion = participacion100 + parseFloat($('#participacionReasegurador').val());
		if(participacion > 100) {
			participacion100=0;
			mensajes.modalAlert('danger', 'Reasegurador: participacion(%)', 'Participacion no puede ser mayor al 100%');
			return;
		} else {
			participacion100 = participacion; 
		}
		//Fin valida participacion
		
		$.each($('input, select', "#formReaseguradores"), function (k, v) {
			if ($(this).attr("name") !== undefined) {
				if($(this).hasClass("moneda")) {
					reaseguradorProp[$(this).attr("name")] = $(this).inputmask('unmaskedvalue');
				} else {
					reaseguradorProp[$(this).attr("name")] = $(this).val().toUpperCase();
				}
			}
		});
		excludeIds[capaActual].push(idCompania);
		reaseguradorProp['idCompania'] = idCompania;
		if($.trim($('#nombreIntermediario').val()) !== '') {
			reaseguradorProp['idIntermediario'] = idIntermediario;
		} else {
			reaseguradorProp['idIntermediario'] = 0;
		}
		reaseguradorProp['noRe'] = contadorReaseguradores=contadorReaseguradores+1;
		listaReaseguradores.push(reaseguradorProp);
		var columnas = [
			{ title: "Contrato RR-6", data: "contratoRR6" },
			{ title: "Capa", data: "numeroCapa" },
			{ title: "Compania", data: "nombreCompania" },
			{ title: "Intermediario", data: "nombreIntermediario" },
			{ title: "Participacion", data: "participacionReasegurador" },
			{ title : "",
				data : null,
				defaultContent : "<span data-toggle='collapse' class='" + btnEditarReasegurador + "'><i class='fas fa-edit'></i></span>",
				orderable : false
			},
			{ title : "",
				data : null,
				defaultContent : "<span data-toggle='collapse' class='" + btnEliminarReasegurador + "'><i class='fas fa-user-times'></i></span>",
				orderable : false
			}
			];

		tabla.iniciarTabla("#reaseguradoresTabla", listaReaseguradores, columnas);
		$('.background-tabla').css('display', 'block');
		$('#formReaseguradores')[0].reset();
		if(reaseguradorId !== 0) {
			excludeIds = [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0]];
			listaReaseguradores.forEach(function(element) {				
				excludeIds[capaActual].push(element.idCompania);
			});
		}
		idCompania = 0;
		idIntermediario = 0;
		reaseguradorId = 0;
		$('#contratoRR6').val($('#contratoRR6CNSF').val());
		editarReasegurador();
		eliminarReasegurador();
		if(participacion100==100) {
			$('#contratoRR6').val('');
		}
	}
	
	var guardaContrato = function() {
		var model = { }
		//contrato vigente y autorizado debe tener 100 de participacion entre sus reaseguradores
		if(participacion100<100 && $('#estatus').val()==2 &&  $('#pendienteAutorizacion').val() === 'NO') {
			mensajes.modalAlert('danger', 'Reasegurador: participacion(%)', 'Participacion no puede ser mayor al 100%');
			return;
		}
		
		/*if($.trim($('#contratoRR6').val()) !== '' || $.trim($('#numeroCapa').val()) !== '' || $.trim($('#nombreCompania').val()) !== '' || $.trim($('#participacionReasegurador').val()) !== '') {
			mensajes.modalAlert('danger', '¿Faltan reaseguradores?', 'Agregalos con el boton \'Agregar\' <br>Si no, borra el contenido en los campos editables.');
			return;
		}*/
		
		$.each($('input, select', "#formTipoContrato"), function (k, v) {
			if ($(this).attr("name") !== undefined) {
				if($(this).hasClass("moneda")) {
					model[$(this).attr("name")] = $(this).inputmask('unmaskedvalue');
				} else {
					model[$(this).attr("name")] = $(this).val().toUpperCase();
				}
			}
		});
		
		$.each($('input, select', "#formContrato"), function (k, v) {
			if ($(this).attr("name") !== undefined) {
				if($(this).hasClass("moneda")) {
					model[$(this).attr("name")] = $(this).inputmask('unmaskedvalue');
				} else {
					model[$(this).attr("name")] = $(this).val();
				}
				
				if($(this).attr("name") === "estatus"){
					model[$(this).attr("name")] = $('#estatus').attr('data-cveEstatus');
				}
			}
		});
		
		/*if($("#tipoReaseguro").val() === '2') {
			if(listaCapas.length == 0) {
				continuarAgregarCapas();
				mensajes.modalAlert('danger', 'Contrato sin capas', 'Debe agregar las capas del contrato.');
				return; 
			}
		}*/
		
		model['listaReaseguradores'] = listaReaseguradores;
		model['listaCapas'] = listaCapas;
		model['id'] = idContrato;
		$.ajax({
			url: "guarda",
			type: "POST",
			data: JSON.stringify(model),
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				if (dataSet.mensaje === 'OK') {
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					restauraTodo();
					$('#contratoModal').modal('hide');
				} else {
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
					$.each( dataSet.dataExtra, function(k, v){
						var campo = $('[name=' + k + ']').addClass("is-invalid");
						$(campo).parent().append('<div class="invalid-tooltip">' + v + '</div>');
					});
				}
			},
			statusCode: {
				404: function () {
					console.log("page not found");
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
				console.log(model);
			},
			complete: function(){
				util.loadingEnd();
				$('.btnSiguiente').removeClass('d-none');
			}
		});
	}
	
	/*var continuarAgregarCapas = function() {
		$("#tabCapas").click();
	}*/
	
	var btnAgregaCapa = function() {
		console.log($('#capaContratoRR6').val());
		console.log($('#prioridadCapa').val());
		console.log($('#capacidad').val());
		console.log($('#capaTasaPrima').val());
		console.log($('#numeroReinstalaciones').val());
		console.log($('#noCa').val());
		
		if($.trim($('#capaContratoRR6').val()) == '' || $.trim($('#prioridadCapa').val()) == '' || $.trim($('#capacidad').val()) == '' || $.trim($('#capaTasaPrima').val()) == '' || $.trim($('#numeroReinstalaciones').val()) == '' || $.trim($('#noCa').val()) == ''){
			mensajes.modalAlert('danger', 'Capa: faltan campos', 'Todos los campos son obligatorios');
			return;
		}
		if(noCa !== undefined && noCa !== 0) {
			var index = listaCapas.map(x => { return x.noCa; }).indexOf(noCa);
			if(index>=0) {
				listaCapas.splice(index, 1);
			}
		} else {
			var capaDuplicada = false;
			$.each(listaCapas, function (llave, capa) {
				if(capa['noCa'] == $('#noCa').val()) {
					mensajes.modalAlert('danger', 'Capa duplicada', 'Todas las capas deben tener un numero unico.');
					capaDuplicada = true;
				}
			});
			if(capaDuplicada) {
				return;
			}
		}
		var capaModel = { }
		$.each($('input, select', "#formReaseguroContratoCapas"), function (k, v) {
			if ($(this).attr("name") !== undefined) {
				if($(this).hasClass("moneda")) {
					capaModel[$(this).attr("name")] = $(this).inputmask('unmaskedvalue');
				} else {
					capaModel[$(this).attr("name")] = $(this).val().toUpperCase();
				}
			}
		});
		listaCapas.push(capaModel);
		var columnas = [
			{ title: "#", data: "noCa" },
			{ title: "Contrato RR-6", data: "capaContratoRR6" },
			{ title: "Prioridad", data: "prioridad", render: $.fn.dataTable.render.number( ',', '.', 2) },
			{ title: "Capacidad", data: "capacidad", render: $.fn.dataTable.render.number( ',', '.', 2) },
			{ title: "Tasa prima(%)", data: "capaTasaPrima" },
			{ title: "Reinstalaciones", data: "numeroReinstalaciones" },
			{ title: "Prima minima", data: "primaMinima", render: $.fn.dataTable.render.number( ',', '.', 2) },
			{ title : "",
				data : null,
				defaultContent : "<span data-toggle='collapse' class='" + btnEditarCapa + "'><i class='fas fa-edit'></i></span>",
				orderable : false
			},
			{ title : "",
				data : null,
				defaultContent : "<span data-toggle='collapse' class='" + btnEliminarCapa + "'><i class='fas fa-user-times'></i></span>",
				orderable : false
			}
			];

		tabla.iniciarTabla("#capasTabla", listaCapas, columnas);
		$('.background-tabla').css('display', 'block');
		$('#formReaseguroContratoCapas')[0].reset();
		editarCapa();
		eliminarCapa();
	}
	
	var autoCompletarReasegurador = function(appendTo) {
		var capaActual = $('#numeroCapa').val();
		if(capaActual==='') {
			mensajes.modalAlert('danger', 'Numero capa es obligatoria', 'Faltan datos para continuar');
			return;
		}
		if(excludeIds[capaActual]==null || excludeIds[capaActual]==undefined){
			excludeIds[capaActual] = [0];
		}
		$(".autoCompletaProveedor").autocomplete({
			appendTo: $('#' + appendTo),
			minLength: 3,
			source : function(request, response) {
				$.ajax({
					url : 'busca/reasegurador',
					dataType : 'json',
					type: "GET",
					data : {
						nombreRazon : request.term,
						excludeIds : excludeIds[capaActual]
					},
					success : function(data) {
						if(!data.length){
						      var result = [
						       {
						       label: 'Sin resultados', 
						       value: response.term
						       }
						     ];
						       response(result);
						} else {							
							console.log(data);
							response($.map(data, function(v,i) {
								return {
									label: v.cve + " - " + v.nombre,
									value: v.cve + " - " + v.nombre,
									data : v
								};
							}));
						}
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
				idCompania = ui.item.data.id;
				$(this).val(ui.item.label);
				$('#claveCNSF').val(ui.item.data.cveRegistroCNSF);
				return true;
		  }
		});
	}
	
	var autoCompletarIntermediario = function(appendTo) {
		$("#nombreIntermediario").autocomplete( {
			appendTo: $('#' + appendTo),
			minLength: 3,
			source : function(request, response) {
				$.ajax({
					url : 'busca/intermediario',
					dataType : 'json',
					type: "GET",
					data : {
						nombreRazon : request.term
					},
					success : function(data) {
						if(!data.length){
						      var result = [
						       {
						       label: 'Sin resultados', 
						       value: response.term
						       }
						     ];
						       response(result);
						} else {
							console.log(data);
							response($.map(data, function(v,i) {
								return {
									label: v.cve + " - " + v.nombre,
									value: v.cve + " - " + v.nombre,
									data : v
								};
							}));
						}
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
				idIntermediario = ui.item.data.id;
				$(this).val(ui.item.label);
				return true;
		  }
		});
	}
	
	var obtenerReaseguradoresPorContrato = function(idContrato) {
		$.ajax({
			url: "obtenerReaseguradoresPorContrato/"+idContrato,
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				
				if (dataSet.mensaje === 'OK') {
					var columnas = [
						{ title: "Contrato RR-6", data: "contratoRR6" },
						{ title: "Capa", data: "numeroCapa" },
						{ title: "Compania", data: "nombreCompania" },
						{ title: "Intermediario", data: "nombreIntermediario" },
						{ title: "Participacion", data: "participacionReasegurador" },
						{ title : "",
							data : null,
							defaultContent : "<span data-toggle='collapse' class='" + btnEditarReasegurador + "'><i class='fas fa-edit'></i></span>",
							orderable : false
						},
						{ title : "",
							data : null,
							defaultContent : "<span data-toggle='collapse' class='" + btnEliminarReasegurador + "'><i class='fas fa-user-times'></i></span>",
							orderable : false
						}
						];

					contadorReaseguradores=dataSet.dataExtra.length;
					listaReaseguradores=dataSet.dataExtra;
					dataSet.dataExtra.forEach(function(element) {
						excludeIds[element.numeroCapa].push(element.idCompania);
						participacion100 = participacion100+element.participacionReasegurador;
					});
					tabla.iniciarTabla("#reaseguradoresTabla", listaReaseguradores, columnas);
					$('.background-tabla').css('display', 'block');
					editarReasegurador();
					eliminarReasegurador();
				} else {
					mensajes.modalAlert('warning', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("No encuentra movimientos.");
				},
				500: function (a, b, c){
					console.log("xxxxxxxxxx");
			        console.log("Error:", a, b, c);
					console.log(this.url);
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var obtenerCapasPorContrato = function(idContrato){
		$.ajax({
			url: "obtenerCapasPorContrato/"+idContrato,
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				dataSet.dataExtra
				if (dataSet.mensaje === 'OK') {
					var columnas = [
						{ title: "#", data: "noCa" },
						{ title: "Contrato RR-6", data: "capaContratoRR6" },
						{ title: "Prioridad", data: "prioridad", render: $.fn.dataTable.render.number( ',', '.', 2) },
						{ title: "Capacidad", data: "capacidad", render: $.fn.dataTable.render.number( ',', '.', 2) },
						{ title: "Tasa prima(%)", data: "capaTasaPrima" },
						{ title: "Reinstalaciones", data: "numeroReinstalaciones" },
						{ title: "Prima minima", data: "primaMinima", render: $.fn.dataTable.render.number( ',', '.', 2) },
						{ title : "",
							data : null,
							defaultContent : "<span data-toggle='collapse' class='" + btnEditarCapa + "'><i class='fas fa-edit'></i></span>",
							orderable : false
						},
						{ title : "",
							data : null,
							defaultContent : "<span data-toggle='collapse' class='" + btnEliminarCapa + "'><i class='fas fa-user-times'></i></span>",
							orderable : false
						}
						];
					listaCapas=dataSet.dataExtra
					tabla.iniciarTabla("#capasTabla", listaCapas, columnas);
					$('.background-tabla').css('display', 'block');
					editarCapa();
					eliminarCapa();
				} else {
					mensajes.modalAlert('warning', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("No encuentra movimientos.");
				},
				500: function (a, b, c){
					console.log("xxxxxxxxxx");
			        console.log("Error:", a, b, c);
					console.log(this.url);
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var btnEditar = "btnEditar";
	var btnDescargarContrato = "btnDescargarContrato";
	var obtenerContratos = function() {
		$.ajax({
			url: "obtenerContratos",
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				console.log(dataSet.dataExtra);
				var columnas = [
					{ title: "#", data: "id" },
					{ title: "Nombre Contrato", data: "nombreContrato" },
					{ title: "Estatus", data : 'estatus.ct2Descripcion'},
					{ title: "", orderable: false, className: 'text-center', 
						 width: '10%', data : 'estatus', render: function(data, type, row, index){
							 var $botones = "<span data-toggle='collapse' class='" + btnDescargarContrato + " p-1'><i class='fas fa-file-download'></i></span>" +

							 	"<span data-toggle='collapse' class='" + btnEditar + " p-1'><i class='fas fa-edit'></i></span>";
							 
							 if(data.cveEstatus !== 2){
								 $botones += "<span data-toggle='collapse' class='btnCancelarContrato p-1'><i class='fas fa-ban'></i></span>";
							 }
						
							return  $botones;
						
					}},
				];

				if (dataSet.mensaje === 'OK') {
					tabla.iniciarTabla("#resultadoBusqueda", dataSet.dataExtra, columnas);
					$('.background-tabla').css('display', 'block');
					editarModal();
					descargarContrato();
					btnCancelarContrato();
				} else {
					mensajes.modalAlert('warning', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("No encuentra movimientos.");
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	};
	//privada
	var editarModal = function() {
		var table = $("#resultadoBusqueda").DataTable();
		
		$('#resultadoBusqueda tbody').on('click', '.btnEditar', function() {
			var data = table.row( $(this).parents('tr') ).data();
			idContrato = data.id;
			console.log("contrato", data);
			if(data.estatus.ct2Descripcion === "CANCELADO"){
				$('.btnGuardarContrato').remove();
			}else{
				$(".botonera").html('').append('<button  type="button" class="btn btn-primary text-truncate btnGuardarContrato" id="guardaContrato">' +
						'<span class="mr-2">' +
							'<i class="fas fa-save"></i>' +
						'</span>Guardar' +
					'</button>');
			}
			
			$('#guardaContrato').click(function () {
				console.log("click");
				contratosC.guardaContrato();
			});
			
			$.each(data, function(key, value) {
					$("#formTipoContrato *[name=" + key + "]").val(value);
					$("#formContrato *[name=" + key + "]").val(value);
					
					if(key === 'tipoContrato'){
						var $data = data.tipoContrato;
						$('#tipoContrato').val($data.idTipoContrato);
						$('.tipoReaseguro').html('').append('<option value="' + $data.tipoReaseguro + '">' + $data.tipoReaseguro + '</option>');
						$('.tipoCobertura').html('').append('<option value="' + $data.tipoCobertura + '">' + $data.tipoCobertura + '</option>');
						$('.tipoProteccion').html('').append('<option value="' + $data.tipoProteccion + '">' + $data.tipoProteccion + '</option>');
					}
					
					if(key === 'idRamo'){
						$('.ramo').val(value);
						contratosC.llenaCatalogoProducto(value, data.producto);
					}
					
					if(key === 'estatus'){
						$('#estatus').val(value.ct2Descripcion);
						$('#estatus').attr("data-cveestatus", value.cveEstatus);
						//contratosC.llenaCatalogoProducto(value, data.producto);
					}
			});
			obtenerReaseguradoresPorContrato(data.id);
			//continuarTipoReaseguro();
			continuarProporcional();
			//obtenerCapasPorContrato(data.id);
			$('.btnSiguiente').removeClass('d-none');
			if(data.tipoContrato.tipoReaseguro === 'NO PROPORCIONAL'){//No proporcional
				$("#btnContabilidadContrato").attr('disabled', false);
				obtenerCapasPorContrato(data.id);
			} else {
				$("#btnContabilidadContrato").attr('disabled', true);
			}

			$('.moving-tab').css('width', 239.5);
			$('#contratoModal').modal({show:true, backdrop:'static'});
			$("#contratoModal > .modal-lg").css('max-width', '90%');
			
		});
		
		$('#contratoModal').on('hidden.bs.modal', function (e) {
			e.preventDefault();
			e.stopImmediatePropagation();
			restauraTodo();
			obtenerContratos();
		})
	};
	
	//privada
	var descargarContrato = function() {
		var table = $("#resultadoBusqueda").DataTable();
		
		$('#resultadoBusqueda tbody').on('click', '.btnDescargarContrato', function() {
			var data = table.row( $(this).parents('tr') ).data();
			$.ajax({
				url : "genera/excel/"+data.id,
				method : "get",
				dataType: 'json',
		        contentType: 'application/json;charset=UTF-8',
		        beforeSend: function(){
					util.loadingStart();
				},
				success : function(fileUrl) {
//					var blob = new Blob([response.data], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8'});
					window.location.href = 'descarga/excel/'+fileUrl.dataExtra;
				},
				statusCode: {
					404: function () {
						console.log("xxxxxxxxxx");
				        console.log("Error:", a, b, c);
						console.log(this.url);
					},
					500: function (a, b, c){
						console.log("xxxxxxxxxx");
				        console.log("Error:", a, b, c);
						console.log(this.url);
					},
					400: function (a, b, c){
						console.log("xxxxxxxxxx");
				        console.log("Error:", a, b, c);
						console.log(this.url);
					}
				},
				complete: function(){
					util.loadingEnd();
				}
			});
		});
	};
	
	//privada
	var editarReasegurador = function() {
		var table = $("#reaseguradoresTabla").DataTable();
		
		$('#reaseguradoresTabla tbody').on('click', '.btnEditarReasegurador', function() {
			var data = table.row( $(this).parents('tr') ).data();
			$.each(data, function(key, value) {
					$("#formReaseguradores *[name=" + key + "]").val(value);
			});
			reaseguradorId = data['id'];
			idCompania = data['idCompania'];
			idIntermediario = data['idIntermediario'];
			noRe = data['noRe'];
		});
	};
	
	//privada
	var eliminarReasegurador = function() {
		var table = $("#reaseguradoresTabla").DataTable();
		$('#reaseguradoresTabla tbody').on('click', '.btnEliminarReasegurador', function() {
			var data = table.row( $(this).parents('tr') ).data();
			var index = table.row( $(this).parents('tr') ).index();
			if(index>=0) {
				listaReaseguradores.splice(index, 1);
			}
			var columnas = [
				{ title: "Contrato RR-6", data: "contratoRR6" },
				{ title: "Capa", data: "numeroCapa" },
				{ title: "Compania", data: "nombreCompania" },
				{ title: "Intermediario", data: "nombreIntermediario" },
				{ title: "Participacion", data: "participacionReasegurador" },
				{ title : "",
					data : null,
					defaultContent : "<span data-toggle='collapse' class='" + btnEditarReasegurador + "'><i class='fas fa-edit'></i></span>",
					orderable : false
				},
				{ title : "",
					data : null,
					defaultContent : "<span data-toggle='collapse' class='" + btnEliminarReasegurador + "'><i class='fas fa-user-times'></i></span>",
					orderable : false
				}
			];

			excludeIds = [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0]];
			participacion100 = 0;
			lReaseg = [];
			listaReaseguradores.forEach(function(element) {
				excludeIds[element.numeroCapa].push(element.idCompania);
				participacion100 = participacion100+element.participacionReasegurador;
				lReaseg.push(element);
			});
			var dataSet = [];
			tabla.borrarTabla("#reaseguradoresTabla", dataSet);
			tabla.iniciarTabla("#reaseguradoresTabla", lReaseg, columnas);
			$('.background-tabla').css('display', 'block');
			editarReasegurador();
			eliminarReasegurador();
			listaReaseguradores=lReaseg;
		});
	};
	
	var editarCapa = function() {
		var table = $("#capasTabla").DataTable();
		
		$('#capasTabla tbody').on('click', '.btnEditarCapa', function() {
			var data = table.row( $(this).parents('tr') ).data();
			$.each(data, function(key, value) {
					$("#formReaseguroContratoCapas *[name=" + key + "]").val(value);
			});
			noCa = data['noCa'];
		});
	};
	//privada
	var eliminarCapa = function() {
		var table = $("#capasTabla").DataTable();
		$('#capasTabla tbody').on('click', '.btnEliminarCapa', function() {
			var data = table.row( $(this).parents('tr') ).data();
			var index = table.row( $(this).parents('tr') ).index();
			if(index>=0) {
				listaCapas.splice(index, 1);
			}
			var columnas = [
				{ title: "#", data: "noCa" },
				{ title: "Contrato RR-6", data: "capaContratoRR6" },
				{ title: "Prioridad", data: "prioridad", render: $.fn.dataTable.render.number( ',', '.', 2) },
				{ title: "Capacidad", data: "capacidad", render: $.fn.dataTable.render.number( ',', '.', 2) },
				{ title: "Tasa prima(%)", data: "capaTasaPrima" },
				{ title: "Reinstalaciones", data: "numeroReinstalaciones" },
				{ title: "Prima minima", data: "primaMinima", render: $.fn.dataTable.render.number( ',', '.', 2) },
				{ title : "",
					data : null,
					defaultContent : "<span data-toggle='collapse' class='" + btnEditarCapa + "'><i class='fas fa-edit'></i></span>",
					orderable : false
				},
				{ title : "",
					data : null,
					defaultContent : "<span data-toggle='collapse' class='" + btnEliminarCapa + "'><i class='fas fa-user-times'></i></span>",
					orderable : false
				}
			];
			var dataSet = [];
			tabla.borrarTabla("#capasTabla", dataSet);
			tabla.iniciarTabla("#capasTabla", listaCapas, columnas);
			$('.background-tabla').css('display', 'block');
			editarCapa();
			eliminarCapa();
		});
	};
	
	var cargaCatalogoMoneda = function() {
		$.ajax({
			url : "catalogo/moneda",
			method : "get",
			dataType : 'json',
			contentType : 'application/json',
			success : function(dataSet) {
				$('#claveMoneda').html("");
				if (dataSet.mensaje === 'OK') {
					$('#claveMoneda').append('<option value="">Seleccione Moneda...</option>');
					$.each(dataSet.dataExtra, function(i, v) {
						$('#claveMoneda').append('<option value="' + v.ct16CveMoneda	 +'">' + v.ct16MonedaNombre + '</option>');
					});
				}
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			}
		});
	}
	
	/*var calculaMontoImporte = function() {
		if($('#limiteContrato').inputmask('unmaskedvalue')!=='' && $('#capacidadMaxima').inputmask('unmaskedvalue')!=='') {
			$('#montoRetencionImporte').removeClass('moneda');
			$('#montoRetencionImporte').val('');
			var limite = $('#limiteContrato').inputmask('unmaskedvalue');
			var maximaCapacidad = $('#capacidadMaxima').inputmask('unmaskedvalue');
			
			var resultado = (maximaCapacidad*1)-(limite*1);
			$('#montoRetencionImporte').val(resultado*1);
			$('#montoRetencionImporte').addClass('moneda');
			
			var porventajeRetencion = Math.trunc((resultado/maximaCapacidad)*100);
			$('#montoRetencionPorcentaje').val(porventajeRetencion*1);
			var ces = Math.trunc(100-porventajeRetencion);
			
			$('#montoCesionPorcentaje').val('');
			$('#montoCesionPorcentaje').val(ces);
		}
	}*/
	
	var btnContabilidadContrato = function() {
		$.ajax({
			url: util.getPath()+"/contabilidad/generar/contratonoproporcional",
			type: "POST",
			data: {
				idContrato : idContrato
			},
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {console.log(dataSet);
				if (dataSet.mensaje === 'OK') {
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
				} else {
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
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
	
	var comboTipoContrato = function(){
		$.ajax({
			url: "comboTipoContrato",
			type: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				if (dataSet.mensaje === 'OK') {
					console.log(dataSet);
					$('.tipoContrato').html("");
					
					$('.tipoContrato').append('<option value="0" selected disabled>Seleccione...</option>');
					
					$.each(dataSet.dataExtra, function(i, v) {
						
						$('.tipoContrato').append('<option id="' + i +'" value="' + v.idTipoContrato + '">' + v.descripcion + '</option>');
						$(".tipoContrato option[id=" + i +"]").data(v)
					});
				} else {
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
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
	
	var llenaCatalogoRamo = function(){
		
		$.ajax({
			
			url         : util.getPath() + "/ramoC/obtenerRamo",
			type        : "GET",
			dataType    : 'json',
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){

				if(dataSet.mensaje === "OK"){
					$('.ramo').html("");
					
					$('.ramo').append('<option value="0" selected disabled>Seleccione Ramo...</option>');
					
					$.each(dataSet.dataExtra, function(i, v) {
						$('.ramo').append('<option value="' + v.cveRamo + '">' + v.cT8Descripcion + '</option>');
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
	
	var llenaCatalogoProducto = function(ramo, seleccionado){
		$.ajax({
			url         : "filtroProductos",
			type        : "GET",
			data 		: {
				"ramo" : ramo
			},
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){
				if(dataSet.mensaje === "OK"){
					$('.producto').html("");
					$('.producto').append('<option value="0" selected disabled>--- Seleccione ---</option>');
					
					$.each(dataSet.dataExtra, function(i, v) {
						$('.producto').append('<option value="' + v.cveProducto + '">' + v.nombre + '</option>');
					});
					
					if(seleccionado !== null || seleccionado !== undefined){
						$('.producto').val(seleccionado);
					}
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

	var obtenerTabActivo = function(){
		var i, items = $('.tabActive'), pane = $('.tab-pane');
		var $btnGuardarContrato = $('.btnGuardarContrato');
		
		$btnGuardarContrato.addClass('d-none');
		
		var $formTmp = $( ".tab-pane.active" ).find( "form" ).attr("id");
		
		// next
		  $('.btnSiguiente').on('click', function(){
			  var $form = $( ".tab-pane.active" ).find( "form" ).attr("id");
			  
			  //if(validarFormularioTipoContrato($form)){
				  for(i = 0; i < items.length; i++){
			          if($(items[i]).hasClass('active') == true){
			        	  $(items[i]).addClass('disabled');
				          $(items[i+1]).removeClass('disabled');
			              break;
			          }
			      }
			      if(i < items.length - 1){
			    	  var $textTab = $(items[i + 1]).text().toUpperCase();
			    	  if($textTab !== 'TIPO CONTRATO'){
			    		  $btnGuardarContrato.removeClass('d-none');
			    	  }
			    	  
			    	  if($textTab == 'REASEGURADORES' && $('.tipoReaseguro').val() == 'PROPORCIONAL'){
			    		  $('.btnSiguiente').addClass('d-none');
			    	  }else{
			    		  $('.btnSiguiente').removeClass('d-none');
			    	  }
			    	  
			    	  console.log($textTab);
			    	  $(items[i+1]).trigger('click');
			          // for tab
			          $(items[i]).removeClass('active');
			          $(items[i+1]).addClass('active');
			          // for pane
			          $(pane[i]).removeClass('show active');
			          $(pane[i+1]).addClass('show active');
			          
			          //if($('#tipoContrato').val()=="2"){//No Proporcional
			          if($('#tipoReaseguro').text()=="NO PROPORCIONAL"){//No Proporcional
			        	  document.getElementById('contratoReaseguroTabNoProp').style.display = "inline";
			          }
			          else{
			        	  document.getElementById('contratoReaseguroTabNoProp').style.display = "none";
			          }
			      }
			  //}
		  });
		  // Prev
		  $('.btnAnterior').on('click', function(){
		      for(i = 0; i < items.length; i++){
		          if($(items[i]).hasClass('active') == true){
		        	  $(items[i]).addClass('disabled');
			          $(items[i-1]).removeClass('disabled');
		              break;
		          }
		      }
		      if(i != 0){
		    	  var $textTab = $(items[i - 1]).text().toUpperCase();
		    	  if($textTab === 'TIPO CONTRATO'){
		    		  $btnGuardarContrato.addClass('d-none');
		    	  }
		    	  
		    	  if($textTab == 'REASEGURADORES' && $('.tipoReaseguro').val() == 'PROPORCIONAL'){
		    		  $('.btnSiguiente').addClass('d-none');
		    	  }else{
		    		  $('.btnSiguiente').removeClass('d-none');
		    	  }
		    	  
		    	  $(items[i-1]).trigger('click');
		          // for tab
		          $(items[i]).removeClass('active');
		          $(items[i]).addClass('disabled');
		          // for pane
		          $(pane[i]).removeClass('show active');
		          $(pane[i-1]).addClass('show active');
		          
		      }
		  });
	}
	
	var validarFormularioTipoContrato = function($formulario){
		var $valido = true;
		console.log("$formulario", $formulario);
		switch($formulario){
		case "formTipoContrato":
			$.each($("input, select", "#" + $formulario), function(k, v){
				if($(this).val() === 0 || $(this).val() === null){
					console.log(k, v);
					$valido = false;
					return false;
				}
			});
			break;
			
		case "formContrato":
			$.each($("input, select", "#" + $formulario), function(k, v){
				var $isDisplay = $(this).parent().hasClass('d-none');
				
				if(v["name"] === "polizas"){
					var $divPolizas = $(this).parent();
					$isDisplay = $divPolizas.parent().hasClass('d-none');
				}
				
				console.log("antes de validar", $isDisplay);
				if($isDisplay === "true"){
					if( ($(this).val() === 0 || $(this).val() === null || $.trim($(this).val()) === '') ){
						$valido = false;
						return false;
					}
				}
				
			});
			
			$('#contratoRR6').val($('#contratoRR6CNSF').val());
			$('#capaContratoRR6').val($('#contratoRR6CNSF').val());
			break;
			
		case "formReaseguradores":
			$.each($("input, select", "#" + $formulario), function(k, v){
				if($(this).parent().hasClass('d-none') === false){
					if( listaReaseguradores.length=== 0 ){
						$valido = false;
						return false;
					}
				}
				
			});
			break;
		}
		return $valido;
	};
	
	var vista = function(){
		var $vista = $( ".tab-pane.active" ).attr('id');
		if($vista === 'reaseguradoresTab'){
			continuarProporcional();
		}
	};
	
	var llenarComboPolizas = function($ramo){
		$.ajax({
			
			url         : "obtenerPolizas",
			type        : "GET",
			data : {
				ramo : $ramo
			},
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){
				console.log(dataSet.dataExtra);
				if(dataSet.mensaje === "OK"){
					$('.multiselect-polizas').selectpicker('destroy');
					$('.multiselect-polizas').html("");
					
					$('.multiselect-polizas').append('<option value="0" disabled style="background-color:#ffffff !important; color: #000000 !important">SELECCIONE...</option>');
					
					$.each(dataSet.dataExtra, function(i, v) {
						$('.multiselect-polizas').append('<option value="' + v.idPoliza + '" style="background-color:#ffffff !important; color: #000000 !important">' + v.numeroPoliza + '</option>');
					});
					
					$('.multiselect-polizas').selectpicker();
					$('.bootstrap-select').find('button').attr('style', 
							function(i, s){
								return 'background-color: #ffffff !important;' + 
									   'border-color: #ced4da !important;'
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
	};
	
	var btnCancelarContrato = function() {
		var table = $("#resultadoBusqueda").DataTable();
		
		$('#resultadoBusqueda tbody').on('click', '.btnCancelarContrato', function() {
			var data = table.row( $(this).parents('tr') ).data();
			idContrato = data.id;
			
			$('#cancelarContratoModal').modal({show:true, backdrop:'static'});
			
		});
		
		$('#cancelarContratoModal').on('hidden.bs.modal', function (e) {
			e.preventDefault();
			e.stopImmediatePropagation();
			restauraTodo();
			obtenerContratos();
		})
	};

	var cancelarContrato = function(){
		$.ajax({
			url         : "cancelarContrato",
			type        : "POST",
			data 		: {
				"idContrato" : idContrato
			},
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){
				if(dataSet.mensaje === "OK"){
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$('#cancelarContratoModal').modal('hide');
					idContrato = 0;
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
		vistaContrato : vistaContrato,
		restauraTodo : restauraTodo,
		continuarProporcional : continuarProporcional,
		agregaReasegurador : agregaReasegurador,
		guardaContrato : guardaContrato,
		btnAgregaCapa : btnAgregaCapa,
		autoCompletarReasegurador : autoCompletarReasegurador,
		obtenerContratos : obtenerContratos,
		cargaCatalogoMoneda : cargaCatalogoMoneda,
		autoCompletarIntermediario : autoCompletarIntermediario,
		btnContabilidadContrato : btnContabilidadContrato,
		comboTipoContrato : comboTipoContrato,
		llenaCatalogoRamo : llenaCatalogoRamo,
		llenaCatalogoProducto : llenaCatalogoProducto,
		obtenerTabActivo : obtenerTabActivo,
		validarFormularioTipoContrato : validarFormularioTipoContrato,
		vista : vista,
		llenarComboPolizas : llenarComboPolizas,
		cancelarContrato : cancelarContrato
	}
})();