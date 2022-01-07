var reaseguroContrato = (function(){

	 var catRamosReaseguro = function(){
		 
		 $.ajax({
			 
			    url         : "reaseguro/ramosCNSF",
				type        : "GET",
				dataType    : 'json',
				contentType : 'application/json',
				beforeSend  : function(){
					util.loadingStart();
				},
				success: function(dataSet){
	
					if(dataSet.mensaje === "OK"){
						
						$('.ramos').selectpicker('destroy');
						$('.ramos').html("");
						
						$.each(dataSet.dataExtra, function(i, v) {
							$('.ramos').append('<option title ="' + v.cveCNSF + '" style="background-color:#ffffff !important; color: #000000 !important">' + v.descripcion + '</option>');
						});
						
						$('.ramos').selectpicker();
						$('.bootstrap-select').find('button').attr('style',	function(i, s){
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
		 });
	 }
	 
	 var catTipoMoneda = function(){
		 
		 $.ajax({
			    url         : "reaseguro/tipoMoneda",
				type        : "GET",
				dataType    : 'json',
				contentType : 'application/json',
				beforeSend  : function(){
					util.loadingStart();
				},
				success: function(dataSet){

					if(dataSet.mensaje === "OK"){
						
						$('.moneda').selectpicker('destroy');
						$('.moneda').html("");
						
//						$('.moneda').append('<option title="Selecciona Opciones.." disabled style="background-color:#ffffff !important; color: #000000 !important">SELECCIONE...</option>');
						
						$.each(dataSet.dataExtra, function(i, v) {
							$('.moneda').append('<option title ="' + v.cveMoneda + '" style="background-color:#ffffff !important; color: #000000 !important">' + v.descMoneda + '</option>');
						});
						
						$('.moneda').selectpicker();
						$('.bootstrap-select').find('button').attr('style',	function(i, s){
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
		 });
	  }
	 
	 
	 var catTipoContratos = function(){
		 
		 $.ajax({
			    url         : "reaseguro/tipoContrato",
				type        : "GET",
				dataType    : 'json',
				contentType : 'application/json',
				beforeSend  : function(){
					util.loadingStart();
				},
				success: function(dataSet){

					if(dataSet.mensaje === "OK"){
						
						$('.tipoContrato').html("");
						
						$('.tipoContrato').append('<option value = "0" >Seleccione...</option>');
						
						$.each(dataSet.dataExtra, function(i, v) {
							$('.tipoContrato').append('<option value ="' + v.cveContrato + '">' + v.descContrato + '</option>');
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
		 });
	  }
	 
	 var catReaseguradores = function(){
		 
		 $.ajax({
			    url         : "reaseguro/reaseguradores",
				type        : "GET",
				dataType    : 'json',
				contentType : 'application/json',
				beforeSend  : function(){
					util.loadingStart();
				},
				success: function(dataSet){

					if(dataSet.mensaje === "OK"){
						
						$('.tipoReasegurador').html("");
						
						$('.tipoReasegurador').append('<option value = "0" >Seleccione...</option>');
						
						$.each(dataSet.dataExtra, function(i, v) {
							$('.tipoReasegurador').append('<option value ="' + v.cveReasegurador + '">' + v.nomReasegurador + '</option>');
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
		 });
	  }
 
	 var editarReasegurador = function(){
			var columnas = [
					{title: "Reg. Reasegurados"},
					{title: "Nombre"},
					{title: "Participación", "width": "20%"},
					{
						title : "<span class='add-table' style ='width: auto;cursor: pointer'><i class='fas fa-plus-circle'></i></span>", 
						        "width": "10%",
						defaultContent : "<span class='movRemove' onClick='reaseguroContrato.eliminaReasegurador()' style ='cursor: pointer'><i class='fas fa-trash-alt'></i></span>",
						orderable : false
					} 
				];
			
			tabla.iniciarTablaEdit("#reaseguradores", columnas);
			$('#idReaseguradores').css('display', 'block');
	}
	 
	 var contratosVigentes = function(){
			var columnas = [
					{title: "Identif. Contrato"},
					{title: "Tipo Contrato"},
					{title: "Inicio Vigencia"},
					{title: "Fin Vigencia"},
					{title: "Capas Linea"},
					{title: "Retencion Prioridad"},
					{title: "Limite Responsabilidad"},
					{
						title : "Cancelación",
						defaultContent : "<span class='cancContrato' onClick='reaseguroContrato.cancelaContrato()' style ='cursor: pointer'><i class='fas fa-ban'></i></span>",
						orderable : false
					} 
				];
			
			tabla.iniciarTablaEdit("#reaseguradores", columnas);
			$('#idReaseguradores').css('display', 'block');
	}
	 
	 var eliminaReasegurador = function(){
			
		 	var table = $('#reaseguradores').DataTable()
			
			$('#reaseguradores tbody').on('click', '.movRemove', function() {
				
				/*** RECORRE FILA SELECCIONADA PARA OBTENER LOS VALORES ***/   
					var item = $(this).parents("tr").find("td");
					
					 regReasegurados = (item.filter(":eq(0)").text());
					 nombre          = (item.filter(":eq(1)").text())
					 partReaseg      = (item.filter(":eq(2)").text());
				
					 /*** SOLO ELIMINA FILA SELECCIONADA DE LA VISTA ***/
					 table.row($(this).parents('tr')).remove().draw();
						 
					if(table.data().count() > 0){
						var sumaPorcentaje = 0
						$('#reaseguradores tbody tr').each(function(){
							
							/*** REALIZA SUMA TOTAL PORCENTAJES ***/
							sumaPorcentaje = sumaPorcentaje + parseFloat($(this).find("td #porcentaje").val());
						 });
						
						console.log('SUMA TOTAL PORCENTAJES ELIMINA', sumaPorcentaje);
						console.log(parseFloat(sumaPorcentaje));
						
						$('#totalParticipacion').val(parseFloat(sumaPorcentaje.toFixed(2)));

						if(sumaPorcentaje < 100 || sumaPorcentaje > 100){
							return mensajes.modalAlert('warning', 'Información', 'La suma de Participacion debe ser igual a 100%');
						}

					}else{
						 $('#totalParticipacion').val('0');
					}
			});
	 }
	 
	 var autoCompletReasegurador = function(appendTo) {
			$(".tipoReasegurador").autocomplete({
				appendTo: $('#' + appendTo),
				minLength: 8,
				source : function(request, response) {
					$.ajax({
						url : 'reaseguro/reaseguradores/' + request.term,
						dataType : 'json',
						type: "GET",
						success : function(data) {
							console.log('Busca Reasegurador -> ', data);
							
							response($.map(data, function(v,i){
									return {
										label: v.cveReasegurador,
										value: v.cveReasegurador,
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
					console.log('SELECT ', ui.item.data)
					var table = $('#reaseguradores').DataTable()
					$('#reaseguradores tbody').on('focusout', '.clean', function() {
						
						 table.row($(this).parents('tr').find('td #nombre').val(ui.item.data.nomReasegurador));
					});

					$(this).val(ui.item.label);
					return true;
			  }
			});
		}
	 
	 var guardaContrato = function(){
		 
		 var participacion = parseInt($('#totalParticipacion').val())
		 var lstModel = []
		 var model = {}
		 
		 if(participacion <= 0 || participacion < 100){
			 return mensajes.modalAlert('warning', 'Información', 'La Participacion de Reaseguradores debe ser del 100%')
		 }
		 
		 $.each($('input, select', "#nuevoContrato"), function (k, v) {
			 
			 var name = $(this).attr("name")	
			 
			 if (name !== undefined && name !== 'reaseguradores_length') {
					
				 if(name === 'ramosCNSF'){
					
					 model[name] = $("[data-id='ramosCNSF']").attr('title');
				    
				 }else if(name === 'moneda'){
					 
					 model[name] = $("[data-id='moneda']").attr('title');
					 
				}else if(name === 'finVig'){
					
					if($('#indefinido').prop('checked')){
						model[name] = $('#indefinido').val();
					}else{
						model[name] = $(this).val().toUpperCase();
					}
					
				}else if(name === 'limiteResponsabilidad'){
					
					if($('#sinLimites').prop('checked')){
						model[name] = $('#sinLimites').val();
					}else{
						model[name] = $(this).val().toUpperCase();
					}
					
				}else if(name === 'comision'){
					
					if($('#comisionCheck').prop('checked')){
						model[name] = $('#comisionCheck').val();
					}else{
						model[name] = $(this).val().toUpperCase();
					}
					
				}else if(name === 'participacionUtil'){
					
					if($('#sinParticipacion').prop('checked')){
						model[name] = $('#sinParticipacion').val();
					}else{
						model[name] = $(this).val().toUpperCase();
					}
					
				}else{
				      model[name] = $(this).val().toUpperCase();
				}
			}
		 });
		 
			/*RECORRE DATA TABLE PARA OBTENER LOS VALORES*/   
			$('#reaseguradores tbody tr').each(function(){
				
				var itemReasegurador = $(this).find("td #reasegurador");
				var itemNombre       = $(this).find("td #nombre");
				var itemPorcentaje   = $(this).find("td #porcentaje");

				var model = {}
				
				if(itemReasegurador.val() !== undefined  && itemPorcentaje.val() !== undefined ){
					
					if(itemReasegurador.val() !== '' && itemPorcentaje.val() !== ''){
						 
						 model['cveReasegurador'] = itemReasegurador.val();
						 model['nomReasegurador'] = itemNombre.val();
						 model['participacion']   = itemPorcentaje.val();
						 
						 lstModel.push(model);
						 
					}else{
						return mensajes.modalAlert('warning', 'Informacion', 'Hay Campos sin Capturar en Detalle Reaseguradores');
					}
						
				}else{
					return mensajes.modalAlert('warning', 'Informacion', 'Es Necesario capturar Detalle Reaseguradores');
				}
			 });
			
		 model['lstDetalleReaseguro'] = lstModel
		 console.log('Contrato -> ', model)
		 console.log('Detalle  -> ', lstModel)
//		 return
		 $.ajax({
			 	url         : "reaseguro/guardaContrato",
				type        : "POST",
				data        :  JSON.stringify(model),
				dataType    : 'json',
				contentType : 'application/json',
				beforeSend  : function(){
					util.loadingStart();
				},
				success: function(dataSet){

					if(dataSet.mensaje === "OK"){
						
						 mensajes.modalAlert('success', 'Información', dataSet.detalleMensaje);
						 $("#nuevoContrato")[0].reset();
						 reaseguroContrato.catRamosReaseguro()
						 reaseguroContrato.catTipoMoneda()
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
	 
	 return{
		 catRamosReaseguro       : catRamosReaseguro,
		 catTipoMoneda           : catTipoMoneda,
		 catTipoContratos        : catTipoContratos,
		 editarReasegurador      : editarReasegurador,
		 eliminaReasegurador     : eliminaReasegurador,
		 catReaseguradores       : catReaseguradores,
		 autoCompletReasegurador : autoCompletReasegurador,
		 guardaContrato          : guardaContrato,
		 contratosVigentes       : contratosVigentes
	 }
	
})();