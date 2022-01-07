$(document).ready(function() {
	$("#btnGenerarPoliza").hide();
	var idNS = GetURLParameter('id');
		
	$('#contratante').focusin(function(){		
		clientesC.autoCompletarNumCliente("formClienteNuevo");		
	});
	
	$('#agente1').focusin(function(){
		agentesC.autoCompletarAgente1("formClienteNuevo");
	});

	$('#agente2').focusin(function(){
		agentesC.autoCompletarAgente2("formClienteNuevo"); 
	});
	
	$('#agente3').focusin(function(){
		agentesC.autoCompletarAgente3("formClienteNuevo");		
	});
	
	$('#writer').on('click', function(e) {
		$('input[name="polizaNuevaRenovacion"]').prop('type', 'text');
	});
	
	$('#enabler').on('click', function(e) {
		$('input[name="polizaNuevaRenovacion"]').prop('type', 'hidden');
	});
	
	//
	sepomexC.obtenerEstados();
	
	$('#formCapturaCertificado .codigoPostal').focusin(function(){
		clientesC.autoCompletarCodigoPostal("formCapturaCertificado");
	});
	
	
	$('#formEditarCertificado .codigoPostalActualiza').focusin(function(){
		clientesC.autoCompletarCodigoPostalCertificadoEditar("formEditarCertificado");
	});
	

	ramoC.extraerRamoSolicitud();
	
	agrupadorC.comboAgrupadores(false);
	
	formaPagoC.obtenerFormasPagoSolicitud();
	
	//conductosCobroC.obtenerConductosCobroSolicitud();
		
	
	if(typeof idNS == "undefined"){
		var now = new Date();
		  
	    var day = ("0" + now.getDate()).slice(-2);
	    
	    var month = ("0" + (now.getMonth() + 1)).slice(-2);
	
	    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
	
		$('#fechaEmision').val(today);
		
		$("#fechaEmision").prop('disabled', true);
		//console.log("nuevo");
	}else{
		//console.log("editar");
		solicitudCabeceraC.llenarSolicitudCabeceraById(idNS);
	}
		 
	$(function() { //run on document.ready
		
		var tipoSol=window.location.pathname;
		
		var j=tipoSol.indexOf("CapturaSolicitudManualAP");
		
		if(j==-1){
			//daños
			$('#idFrecuenciaPago').val("Anual");
			$("#idFrecuenciaPago").prop('disabled', true);
		}else{
			//AP
		}
		
		$("#producto").change(function() {			    
			monedaC.extraerMonedaByProducto($('#producto').val());			  
		});
		$("#fechaEmision").prop('disabled', true);  	  	
	});
	
	
	
	$('#fechaIniVigencia').prop('disabled', true);
	//Cuando cambia Productos
	$("#producto").on('change',function() {
		var numeroSolicitudTitulo = $("#numSolicitud").text();
		var splitnumero = numeroSolicitudTitulo.split(" ");
		var numeroSolicitud =splitnumero[2];
		if(!numeroSolicitud){
			$('#fechaIniVigencia').prop('disabled', true);
			$("#fechaIniVigencia").val("");
			$("#fechaFinVigencia").val("");
			var idProducto = $("#producto").val();
			productoC.extraerProductobyRamo(function(producto) {
				var dataSet = producto;
				var producto = $.grep(dataSet.dataExtra, function(e) {
					return e.cveProducto == idProducto;
				});
				var plazo = producto[0].plazoPlan;
				$('#plazoProducto').html(plazo);
				$('#fechaIniVigencia').prop('disabled', false);
			});	
		}else{
			var idProducto = $("#producto").val();
			productoC.extraerProductobyRamo(function(producto) {
				var dataSet = producto;
				var producto = $.grep(dataSet.dataExtra, function(e) {
					return e.cveProducto == idProducto;
				});
				var plazo = producto[0].plazoPlan;
				$('#plazoProducto').html(plazo);
				$('#fechaIniVigencia').prop('disabled', false);
			});	
		}			
	});
	$("#fechaIniVigencia").on('change',function() {
		var fechaInicio = $("#fechaIniVigencia").val();
		var plazo = $('#plazoProducto').html();
		var fecha = fechaInicio.split("-");
		var anio = parseInt(fecha[0]) + parseInt(plazo);
		var fechaFin = anio + '-' + fecha[1] + '-' + fecha[2];
		$("#fechaFinVigencia").val(fechaFin);
	});
	$("#idFrecuenciaPago").on('change',function() {
		var idProducto = $("#idFrecuenciaPago").val();
	});
	$("#btnGenerarPoliza").on('click', function(){
		solicitudCabeceraC.generarPoliza();
	});
	$("#tabSolicitud").on('click',function(){
		solicitudCabeceraC.validaGenerarPoliza();
	});
	

	$("#avanceObra").change(function () {
		var val=parseInt($(this).val()) || 0;
		if(val>100){
			$(this).val("0");
			mensajes.modalAlert('warning', 'Valor no valido', 'No puede exceder el valor de 100%.');
		}	
		if(val>20){
			mensajes.modalAlert('warning', 'Alerta', 'El avance de obra es superior al 20%.');
		}
	});
	
	$("#avanceObraActualiza").change(function () {
		var val=parseInt($(this).val()) || 0;
		if(val>100){
			$(this).val("0");
			mensajes.modalAlert('warning', 'Valor no valido', 'No puede exceder el valor de 100%.');
		}			
		if(val<20){
			
			mensajes.modalAlert('warning', 'Alerta', 'El avance de obra es superior al 20%.');
		}
	});
	
	$("#porcentajeComision").change(function () {		
		var val=0;
		var val1=parseInt($('#porcentajeComision').val()) || 0;
		var val2=parseInt($('#porcentajeComision2').val()) || 0;
		var val3=parseInt($('#porcentajeComision3').val()) || 0;
		val = val1 + val2 + val3; 
		if(val>100 || val<100){		
			//$(this).val("0");
			mensajes.modalAlert('warning', 'Valor no valido', 'El valor debe ser igual a 100%.');
			$("#btnGuardarSolicitudCabecera").attr('disabled','disabled');
		}
		else{
			$("#btnGuardarSolicitudCabecera").removeAttr('disabled');
		}
			
	});
	
	$("#porcentajeComision2").change(function () {
		var val=0;
		var val1=parseInt($('#porcentajeComision').val()) || 0;
		var val2=parseInt($('#porcentajeComision2').val()) || 0;
		var val3=parseInt($('#porcentajeComision3').val()) || 0;
		val = val1 + val2 + val3; ;
		if(val>100 || val<100){		
			//$(this).val("0");
			mensajes.modalAlert('warning', 'Valor no valido', 'El valor debe ser igual a 100%.');
			$("#btnGuardarSolicitudCabecera").attr('disabled','disabled');
		}
		else{
			$("#btnGuardarSolicitudCabecera").removeAttr('disabled');
		}
	});
	
	$("#porcentajeComision3").change(function () {
		var val=0;
		var val1=parseInt($('#porcentajeComision').val()) || 0;
		var val2=parseInt($('#porcentajeComision2').val()) || 0;
		var val3=parseInt($('#porcentajeComision3').val()) || 0;
		val = val1 + val2 + val3;
		if(val>100 || val<100){		
			//$(this).val("0");
			mensajes.modalAlert('warning', 'Valor no valido', 'El valor debe ser igual a 100%.');
			$("#btnGuardarSolicitudCabecera").attr('disabled','disabled');
		}
		else{
			$("#btnGuardarSolicitudCabecera").removeAttr('disabled');
		}
		
	});
	
	$("#agente1").change(function () { 
	try {
			var val=$(this).val();
			var res=val.split(" - ");
			var val1=res[1].replace(/\s/g, '');
		
			if(val1.includes("DIRECTO") || val1.includes("DIRECTA")){
				
				$("#porcentajeComision").val("100");
				$("#porcentajeComision").attr("disabled", "disabled");
				
				$("#agente2").val("");
				$("#agente3").val("");
				$("#porcentajeComision2").val("");
				$("#porcentajeComision3").val("");
				
				$("#agente2").attr("disabled", "disabled");
				$("#agente3").attr("disabled", "disabled"); 
				$("#porcentajeComision2").attr("disabled", "disabled");
				$("#porcentajeComision3").attr("disabled", "disabled");
				$("#btnGuardarSolicitudCabecera").removeAttr('disabled');
				
			}else{
				
				$("#porcentajeComision").removeAttr("disabled");
				$("#agente2").removeAttr("disabled"); 
				$("#agente3").removeAttr("disabled");  
				$("#porcentajeComision2").removeAttr("disabled"); 
				$("#porcentajeComision3").removeAttr("disabled");
				
				var val=0;
				var val1=parseInt($('#porcentajeComision').val()) || 0;
				var val2=parseInt($('#porcentajeComision2').val()) || 0;
				var val3=parseInt($('#porcentajeComision3').val()) || 0;
				val = val1 + val2 + val3;
				
				if(val>100 || val<100){				
					$('#porcentajeComision').val("");
					$('#porcentajeComision2').val("");
					$('#porcentajeComision3').val("");
					mensajes.modalAlert('warning', 'Valor no valido', 'El valor debe ser igual a 100%.');
					$("#btnGuardarSolicitudCabecera").attr('disabled','disabled');
				}	
				else{
					$("#btnGuardarSolicitudCabecera").removeAttr('disabled');
				}
				
			}
		}
	catch(err) {
			$("#porcentajeComision").removeAttr("disabled");
			$("#agente2").removeAttr("disabled"); 
			$("#agente3").removeAttr("disabled");  
			$("#porcentajeComision2").removeAttr("disabled"); 
			$("#porcentajeComision3").removeAttr("disabled");
			
			var val=0;
			var val1=parseInt($('#porcentajeComision').val()) || 0;
			var val2=parseInt($('#porcentajeComision2').val()) || 0;
			var val3=parseInt($('#porcentajeComision3').val()) || 0;
			val = val1 + val2 + val3;
			if(val>100 || val<100){				
				$('#porcentajeComision').val("");
				$('#porcentajeComision2').val("");
				$('#porcentajeComision3').val("");
				mensajes.modalAlert('warning', 'Valor no valido', 'El valor debe ser igual a 100%.');
				$("#btnGuardarSolicitudCabecera").attr('disabled','disabled');
			}	
			else{
				$("#btnGuardarSolicitudCabecera").removeAttr('disabled');
			}
	}	
	});	
});


$('#btnGuardarSolicitudCabecera').click(function(){
	var agente = $("#agente1").val();
	var res = agente.split(" - ");
	
	if(!Number.isInteger(parseInt(res[0]))){
		$("#agente1").val('');
	}
	
	jQuery.validator.messages.required = 'Esta campo es obligatorio.';
	var validado = $("#formCapturaNuevo").valid();
	if(validado){
		solicitudCabeceraC.guardarSolicitudCabecera();        
	}
	
});

//$('#btnGuardarSolicitudCabecera').click(function(){
//	
//	solicitudCabeceraC.guardarSolicitudCabecera();
//});

$('#btnGuardarCertificado').click(function(){
	solicitudCertificadosDaniosC.guardarSolicitudCertificadosDanios();
});

$('#btnActualizarCertificado').click(function(){
	//solicitudCertificadosDaniosC.actualizaSolicitudCerdata(sumaAseguradaRow).dtificadosDanios();
	solicitudCertificadosDaniosC.actualizaSolicitudCertificadosDanios();
});

$('#btnCertificadoCobertura').on('click', function() {
    
	var table = $("#resultadoCoberturasPorGrupo").DataTable();
	
    table.rows().every(function(rowIdx, tableLoop, rowLoop) {
                var row = table.row(rowIdx).node();
                var $row = table.row(rowIdx).nodes().to$(),
                    sumaAseguradaRow = $row.find('td:eq(2) input').val(),
                    deducible = $row.find('td:eq(3) input').val(),
                    coaseguro = $row.find('td:eq(4) input').val()
                table.cell(row, 2).data(sumaAseguradaRow).draw();
//                table.cell(row, 3).data(deducible).draw();
//                table.cell(row, 4).data(coaseguro).draw();
            });
    
    coberturaDaniosC.guardarCoberturasCertificados(table);
});

$('#btnCargarCertificadoCoberturas').click(function(){
	coberturaDaniosC.obtenerCoberturas();
});

$("#agente1").change(function () { 
	try{		
		var val=$(this).val();
		var res=val.split(" - ");
		var val1=res[1].replace(/\s/g, '');
		if(val1.includes("DIRECTO")){
			$("#porcentajeComision").val("100");
			$("#porcentajeComision").attr("disabled", "disabled");
			
			$("#agente2").val("");
			$("#agente3").val("");
			$("#porcentajeComision2").val("");
			$("#porcentajeComision3").val("");
			
			$("#agente2").attr("disabled", "disabled");
			$("#agente3").attr("disabled", "disabled"); 
			$("#porcentajeComision2").attr("disabled", "disabled");
			$("#porcentajeComision3").attr("disabled", "disabled");
			
		}
		else{
			$("#porcentajeComision").removeAttr("disabled");
			$("#agente2").removeAttr("disabled"); 
			$("#agente3").removeAttr("disabled");  
			$("#porcentajeComision2").removeAttr("disabled"); 
			$("#porcentajeComision3").removeAttr("disabled"); 
		}
	}
	catch(err){
		$("#porcentajeComision").removeAttr("disabled");
		$("#agente2").removeAttr("disabled"); 
		$("#agente3").removeAttr("disabled");  
		$("#porcentajeComision2").removeAttr("disabled"); 
		$("#porcentajeComision3").removeAttr("disabled"); 
	}
});

function GetURLParameter(sParam){		
	var sPageURL = window.location.search.substring(1);	
	var sURLVariables = sPageURL.split('&');		
	for (var i = 0; i < sURLVariables.length; i++)	{		
		var sParameterName = sURLVariables[i].split('=');		
		if (sParameterName[0] == sParam)			
			return sParameterName[1];	
		}
	}