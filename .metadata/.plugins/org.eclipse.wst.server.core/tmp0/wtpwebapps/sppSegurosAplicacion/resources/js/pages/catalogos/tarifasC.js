var tarifasC = (function() {
	
	var guardarTarifas = function() {
		var formData = {};
    	//iterate over form elements   
		$.each($('input, select', '#formTarifasNuevo'),function(k, v){
	        formData[$(this).attr("name")] = $(this).val();
	    });
		console.log(formData);
		$.ajax({
			url : "tarifasC/guardarTarifas",
			method: "POST",
			data: JSON.stringify(formData),
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				console.log(dataSet.mensaje);
				if(dataSet.mensaje==="OK"){
					tarifasC.obtenerTarifas();
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$('#formTarifasNuevo')[0].reset();
					$('#nuevaTarifaModal').modal('hide');
				}				
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			},				
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	
	var extraerTarifa = function(){
		$.ajax({
			url : "tarifasC/obtenerTarifas",
			method: "get",
			dataType: 'json',
			contentType: 'application/json',
			success : function(dataSet) {
				$('#tarifa').html("");
				console.log(dataSet);
				if(dataSet.mensaje === 'OK'){
					$('#tarifa').append('<option value="0">Seleccione Tarifa...</option>');
					$.each(dataSet.dataExtra, function(i, v){
						$('#tarifa').append('<option value="' + v.cveTarifa +'">' + v.ct11Descripcion + '</option>');
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

	var obtenerTarifas = function() {
		$.ajax({
			url : "tarifasC/obtenerTarifas",
			method : "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				var columnas = [
						{
							title : "Descripcion",
							data : "ct11Descripcion"
						},
						{
							title : "Millar",
							data : "ct11Millar"
						},
						{
							title : "Fecha Inicio de Vigencia",
							data : "ct11InicioVigencia"
						},
						{
							title : "Fecha Fin de Vigencia",
							data : "ct11FinVigencia"
						},
						
						{
							title : "Tarifa",
							data : "ct11Tarifa"
						},


						{
							title : "",
							data : null,
							defaultContent : "<span data-toggle='collapse'><i class='fas fa-edit'></i></span>",
							orderable : false
						},
						{
							title : "",
							data : null,
							defaultContent : "<span data-toggle='collapse'><i class='fas fa-trash-alt'></i></span>",
							orderable : false
						} ];
				console.log(dataSet);
				if (dataSet.mensaje === "OK") {
					tabla.iniciarTabla("#tablaTarifa", dataSet.dataExtra, columnas);
				}
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			},				
			complete: function(){
				util.loadingEnd();
			}
		});
	}

	return {
		
		guardarTarifas : guardarTarifas,
		obtenerTarifas : obtenerTarifas,
		extraerTarifa : extraerTarifa
	}
})();