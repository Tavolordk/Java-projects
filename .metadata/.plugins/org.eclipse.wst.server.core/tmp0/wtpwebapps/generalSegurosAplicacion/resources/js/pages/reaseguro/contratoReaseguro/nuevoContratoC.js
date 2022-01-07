/**
 * lo que sigue es hacer que el botón de siguiente y regreso funcionen. El botón de
 * guardar debe estar mostrado en el HTML.
 *
 *
 * borrar cuando se haya hecho la tarea
 */
var nuevosContratosC = (function(){
  
  			
  var obtenerMoneda = function(){
		
		$.ajax({
			
			url         : util.getPath() + "/reaseguro/catalogo/moneda",
			type        : "GET",
			dataType    : 'json',
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){

				if(dataSet.mensaje === "OK"){
					$('#claveMoneda').html("");
					
					$('#claveMoneda').append('<option value="0" selected disabled>Seleccione moneda...</option>');
					
					$.each(dataSet.dataExtra, function(i, v) {
						$('#claveMoneda').append('<option value="' + v.CT16_Moneda + '">' + v.ct16MonedaNombre + '</option>');
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
				
	var llenaCatalogoRamo = function(){
		
		$.ajax({
			
			url         : util.getPath() + "/reaseguro/obtenerRamo",
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
						$('.ramo').append('<option value="' + v.cveRamo + '">' + v.descripcion + '</option>');
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
			url         : util.getPath() +"/reaseguro/obtenerProducto",
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
	
	var comboTipoContrato = function(){
		$.ajax({
			url: "reaseguro/comboTipoContrato",
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
						
						$('.tipoContrato').append('<option id="' + i +'" value="' + v.id + '">' + v.descripcion + '</option>');
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
	
	
	/*$(".tema1").forEach(function(c){
		items.push(c.text());
	});*/
	var siguienteTab = function(){
		var items = $("#formNuevoContrato").serialize();
		console.log(items);
	};
	
	var obtenerTabActivo = function(){
		var i, items = $('.tabActive'), pane = $('.tab-pane');
		var $btnGuardarContrato = $('.btnGuardarContrato');
		
		$btnGuardarContrato.addClass('d-none');
		
		var $formTmp = $( ".tab-pane.active" ).find( "form" ).attr("id");
		
		//siguiente
		
		$('.btnSiguiente').on('click', function(){
		var $form =$( ".tab-pane.active" ).find( "form" ).attr("id");
		console.log("OK");
		
		//validarFormularioTipoContrato es funcion para 
		if(validarFormularioTipoContrato($form)){
				  console.log("entra condición", items);
		console.log(items);		
				  for(i = 0; i < items.length; i++){
					  console.log("entra ciclo",items);
			          if($(items[i]).hasClass('active') == true){
						  console.log("es true");
			        	  $(items[i]).addClass('disabled');
				          $(items[i+1]).removeClass('disabled');
			              break;
			          }
			      }

			      if(i < items.length - 1){
					console.log("entra siguiente condicion");
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
					  console.log("pane");
					  $(pane[i]).removeClass('show active');
			          $(pane[i+1]).addClass('show active');
			          
			      }
			  }
		});
		
		// Prev
		  $('.btnAnterior').on('click', function(){
			console.log("Anteiror");
		      for(i = 0; i < items.length; i++){
				console.log("entra ciclo i=",i);
		          if($(items[i]).hasClass('active') == true){
		        	  $(items[i]).addClass('disabled');
			          $(items[i-1]).removeClass('disabled');
		              $(items[i-1]).addClass('active');
		              break;
		          }
		      }
		      if(i != 0){
		    	  var $textTab = $(items[i - 1]).text().toUpperCase();
		    	  if($textTab === 'TIPO CONTRATO'){
		    		  //$btnGuardarContrato.addClass('d-none');
		    	  }
		    	  
		    	  if($textTab == 'REASEGURADORES' && $('.tipoReaseguro').val() == 'PROPORCIONAL'){
		    		  $('.btnSiguiente').addClass('d-none');
		    	  }else{
		    		  $('.btnSiguiente').removeClass('d-none');
		    	  }
		    	  
				  console.log($textTab);
		    	  $(items[i-1]).trigger('click');
		          // for tab
		          $(items[i]).removeClass('active');
		          $(items[i]).addClass('disabled');
		          // for pane
		          $(pane[i]).removeClass('show active');
		          $(pane[i-1]).addClass('show active');
		          
		      }
		  });
		
	};
	//condicion que valida si el contratato está lleno.
	var validarFormularioTipoContrato = function($formulario){
		var $valido = true;
		console.log("$formulario", $formulario);
		switch($formulario){
		case "formNuevoContrato":
		console.log("case1");
		//for each que mete en un arreglo los input, select que lee.
			$.each($("input, select", "#" + $formulario), function(k, v){
				if($(this).val() === 0 || $(this).val() === null|| $.trim($(this).val()) === ''){
					console.log(k, v);
					$valido = false;
					mensajes.modalAlert('warning', 'Información', 'Es necesario llenar todos los campos.');
					return false;
				}
			});
			break;
			
		case "formContrato":
		console.log("case2");
			$.each($("input, select", "#" + $formulario), function(k, v){
					if( ($(this).val() === 0 || $(this).val() === null || $.trim($(this).val()) === '') ){
						$valido = false;
						mensajes.modalAlert('warning', 'Información', 'Es necesario llenar todos los campos.');
						return false;
					}
					else if($('#reonlytipoReaseguro').val()==='' || $('#reonlytipoReaseguro').val() ===0 || $('#reonlytipoReaseguro').val()===null)
					{
					   $valido=true;
					   return true;
					}
					else if($('#reonlytipoProteccion').val()==='' || $('#reonlytipoProteccion').val() ===0 || $('#reonlytipoProteccion').val()===null)
					{
					   $valido=true;
					   return true;
					}
					else if($('#estatus').val()==='' || $('#estatus').val()===0 || $('#estatus').val()===null)
					{
					   $valido=true;
					   return true;
					}
					else if($('#montoRetencion').val()===''|| $('#montoRetencion').val()===0 || $('#montoRetencion').val()===null)
					{
					   $valido=true;
					   return true;
					}
					else if($('#porcentajeCesion').val()===''||$('#porcentajeCesion').val()===0 || $('#porcentajeCesion').val()===null)
					{
					    $valido=true;
					    return true;
					}
					else if($('numeroPlenos').val()===''||$('numeroPlenos').val()===0||$('numeroPlenos').val()===null)
					{
					    $valido=true;
					    return true;
					}
			});
			
			$('#contratoRR6').val($('#contratoRR6CNSF').val());
			$('#capaContratoRR6').val($('#contratoRR6CNSF').val());
			console.log("ok2");
			break;
			
		case "formContratoReas":
		console.log("case3");
			$.each($("input, select", "#" + $formulario), function(k, v){
				if($(this).parent().hasClass('d-none') === false){
					//if( listaReaseguradores.length=== 0 ){
					if( $(this).val()=== 0 || $(this).val()===null || $(this).val()==='' ){
						$valido = false;
						mensajes.modalAlert('warning', 'Información', 'Es necesario llenar todos los campos.');
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
	
	/*var pruebaLlenar = function(){
		var $formulario = $("#formNuevoContrato").serialize();
		console.log($formulario);
		$.ajax({
			url:"guardaContrato",
			method:"POST",
			dataType:"JSON",
			success: function(result){
				console.log(result);
			}
		});
		
		document.querySelector('#btnprueba_click').addEventListener('click',pruebaDatos);
		function pruebaDatos(){
			const datos = new XMLHttpRequest();
			datos.open('POST','guardaContrato', true);
			
		}
	}*/
	
	/*var validaciones=function(){
		if($valido = false){
			//alert("Llenar el campo contratos.");
			return mensajes.modalAlert('warning', 'Información', 'Es necesario llenar todos los campos.');
		}
	};*/
		
	return {
		obtenerTabActivo:obtenerTabActivo,
		validarFormularioTipoContrato : validarFormularioTipoContrato,
		comboTipoContrato:comboTipoContrato,
		llenaCatalogoRamo : llenaCatalogoRamo,
		llenaCatalogoProducto : llenaCatalogoProducto,
		obtenerMoneda:obtenerMoneda
	}
	
	
	
})();