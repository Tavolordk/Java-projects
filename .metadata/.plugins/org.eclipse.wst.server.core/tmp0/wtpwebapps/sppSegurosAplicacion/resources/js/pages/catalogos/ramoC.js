var ramoC = (function() {
	var btnEditRamo = "btnEditRamo";
	var idRamo = 0;
	
	var guardarRamo = function(formulario,modeling) {
		var formData = {cveRamo:idRamo};
    	//iterate over form elements   
		$.each($('input, select', formulario),function(k, v){
	        formData[$(this).attr("name")] = $(this).val();
	    });
		console.log(formData);
		$.ajax({
			url : "ramoC/guardarRamo",
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
					ramoC.obtenerRamo();
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$(formulario)[0].reset();
					$(modeling).modal('hide');
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
	
	var extraerRamo = function(callback){
		$.ajax({
			url : "ramoC/obtenerRamo",
			method: "get",
			dataType: 'json',
			contentType: 'application/json',
			success : function(dataSet) {
				
				callback(dataSet);
				
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			}
		});
	}
	
	var ramo = function(idRamo,idProducto) {
			
		extraerRamo(function(ramo) {
			var dataSet = ramo;
			if(dataSet.mensaje === 'OK'){
				$('#ramo, .ramo').append(
							'<option value="0">Seleccione Ramo...</option>');
				$.each(dataSet.dataExtra, function(i, v){
					$('#ramo, .ramo').append(
							'<option value="' + v.cveRamo +'">' 
							+ v.cT8Descripcion + '</option>');
				});
				if(idRamo){
					$("#idRamo").val(idRamo).change();
					productoC.producto(idProducto);
				}
			}
		});
	}
	
	
//	var extraerRamo = function(){
//		$.ajax({
//			url : "ramoC/obtenerRamo",
//			method: "get",
//			dataType: 'json',
//			contentType: 'application/json',
//			success : function(dataSet) {
//				$('#ramo').html("");
//				//console.log(dataSet);
//				if(dataSet.mensaje === 'OK'){
//					$('#ramo').append('<option value="0">Seleccione Ramo...</option>');
//					$.each(dataSet.dataExtra, function(i, v){
//						$('#ramo').append('<option value="' + v.cveRamo +'">' + v.ct8Descripcion + '</option>');
//					});
//				}
//			},
//			statusCode : {
//				404 : function() {
//					console.log("page not found");
//				}
//			}
//		});
//	}
		
	var obtenerRamo = function() {
		$.ajax({
			url : "ramoC/obtenerRamo",
			method : "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				var columnas = [
						
						
						{
							title : "Descripción",
							data : "cT8Descripcion"
						},

						{
							title : "",
							data : null,
							defaultContent : "<span data-toggle='collapse' class='" + btnEditRamo + "'><i class='fas fa-edit'></i></span>",
							orderable : false
						}/*,
						{
							title : "",
							data : null,
							defaultContent : "<span data-toggle='collapse'><i class='fas fa-trash-alt'></i></span>",
							orderable : false
						}*/
						];
				//console.log(dataSet);
				if (dataSet.mensaje === "OK") {
					tabla.iniciarTabla("#tablaRamo", dataSet.dataExtra, columnas);
					$('.background-tabla').css('display', 'block');
					editarRamo();
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

	var extraerRamoSolicitud = function(){
		var danios=0;
		var ap=0;
		$.ajax({
			url : "ramoC/obtenerRamo",
			method: "get",
			dataType: 'json',
			contentType: 'application/json',
			success : function(dataSet) {
				$('#idRamo').html("");
				if(dataSet.mensaje === 'OK'){
					$('#idRamo').append('<option value="0">Seleccione Ramo...</option>');
					$.each(dataSet.dataExtra, function(i, v){
						switch (v.cveRamo) {
						    case 5:
						    	danios = v.cveRamo;
						        break;
						    case 1:
						        ap = v.cveRamo;
						        break;
						}
						$('#idRamo').append('<option value="' + v.cveRamo +'">' + v.cT8Descripcion + '</option>');
					});
					
					var tipoSol=window.location.pathname;
					
					var j=tipoSol.indexOf("ManualAP");
					if(j != -1){
						$('#idRamo').val(ap);
					}
					else{
						$('#idRamo').val(danios);
					}
					$('#idRamo').prop('disabled', 'disabled');
					productoC.producto();
						
				}
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			}
		});
	}
	
	var editarRamo = function() {
		var table = $("#tablaRamo").DataTable();
		
		$('#tablaRamo tbody').on('click', '.btnEditRamo', function(){
			util.resetInvalidTooltip();
			var data = table.row( $(this).parents('tr') ).data();
			console.log(data);
			//idMoneda = data.ct16Cve;
			idRamo = data.cveRamo;
			
			
			$('#editarRamoModal').modal({show:true, backdrop:'static'});
			$.each(data, function(key, value){
				$("#formRamoEditar *[name=" + key + "]").val(value);
			});
		});
		
		$('#editarRamoModal').on('hidden.bs.modal', function (e) {
			$('#formRamoEditar')[0].reset(); 
			idRamo=null;
	})
	}
	
	var ramoDefault = function(idRamo) {
		extraerRamo(function(ramo) {
			var dataSet = ramo;
			if(dataSet.mensaje === 'OK'){
				$('#ramo, .ramo').append(
							'<option value="0">Seleccione Ramo...</option>');
				$.each(dataSet.dataExtra, function(i, v){
					$('#ramo, .ramo').append(
							'<option value="' + v.cveRamo +'">' 
							+ v.cT8Descripcion + '</option>');
				});
				
				if(idRamo != null){
					$('.ramo').val(idRamo);
					$('.ramo').prop('disabled', 'disabled');
				}
			}
		});
	}
		
	return {
		
		guardarRamo : guardarRamo,
		obtenerRamo : obtenerRamo,
		extraerRamoSolicitud : extraerRamoSolicitud,
		extraerRamo : extraerRamo,
		ramo:ramo,
		ramoDefault : ramoDefault
		
	}
})();