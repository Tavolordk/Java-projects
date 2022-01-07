var contratosVigentesC = (function(){

	 var contratosVigentes = function(){
		 
				$.ajax({
					
					url         : "reaseguro/contratosVigentes",
					type        : "GET",
					dataType    : 'json',
					contentType : 'application/json',
					beforeSend  : function(){
						util.loadingStart();
					},
					success: function(dataSet){
						console.log('Contratos Vigentes: ',dataSet.dataExtra)
						if(dataSet.mensaje === "OK"){
							var columnas = [
								{title: "Identif. Contrato",      data:"identifContrato"},
								{title: "Tipo Contrato",          data:"tipoContrato"},
								{title: "Inicio Vigencia",        data:"inicioVig"},
								{title: "Fin Vigencia",           data:"finVig"},
								{title: "Capas Linea",            data:"capasLinea"},
								{title: "Retencion Prioridad",    data:"retencionPrioridad"},
								{title: "Limite Responsabilidad", data:"limiteResponsabilidad"},
								{
									title : "Cancelación",
									defaultContent : "<span class='cancContrato' onClick='contratosVigentesC.cancelarContrato()' style ='cursor: pointer'><i class='fas fa-ban'></i></span>",
									orderable : false
								} 
							];
						
							tabla.iniciarTablaSimple("#contratosVig", dataSet.dataExtra, columnas);
							$('#idContratosVig').css('display', 'block');
						}else{
							var columnas = [
								{title: "Identif. Contrato"},
								{title: "Tipo Contrato"},
								{title: "Inicio Vigencia"},
								{title: "Fin Vigencia"},
								{title: "Capas Linea"},
								{title: "Retencion Prioridad"},
								{title: "Limite Responsabilidad"}
								
							];
						
							tabla.iniciarTablaEmpty("#contratosVig", columnas);
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
	 
	 var cancelarContrato = function(){
			
		 	var table = $('#contratosVig').DataTable()
			
			$('#contratosVig tbody').on('click', '.cancContrato', function() {
				
				/*** RECORRE FILA SELECCIONADA PARA OBTENER LOS VALORES ***/   
					var item = $(this).parents("tr").find("td");
					 console.log("Fila Seleccionada", item)
					 identifContrato = (item.filter(":eq(0)").text());
					 tipoContrato    = (item.filter(":eq(1)").text())
				
					 /*** SOLO ELIMINA FILA SELECCIONADA DE LA VISTA ***/
//					 table.row($(this).parents('tr')).remove().draw();

				$.ajax({	
					url         : "reaseguro/cancelaContrato/"+identifContrato+"/"+tipoContrato,
					type        : "GET",
					dataType    : 'json',
					contentType : 'application/json',
					beforeSend  : function(){
						util.loadingStart();
					},
					success: function(dataSet){
						
						if(dataSet.mensaje === "OK"){
							mensajes.modalAlert('success', 'Información', dataSet.detalleMensaje);
							contratosVigentesC.contratosVigentes();
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
			});
	 }
	 
	 return{
		 contratosVigentes : contratosVigentes,
		 cancelarContrato  : cancelarContrato
	 }
	
})();