var sepomexC = (function(){
	
	var obtenerEstados = function(){
		$.ajax({
			url : "estadosC/obtenerEstados",
			method: "get",
			dataType: 'json',
			contentType: 'application/json',
			success : function(dataSet) {
				$('.estado').html("");
				if(dataSet.mensaje === 'OK'){
					$('.estado').append('<option value="0">Seleccione opción...</option>');
					$.each(dataSet.dataExtra, function(i, v){
						$('.estado').append('<option value="' + v.idEstado +'">' + v.nombreEstado + '</option>');
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
	
	var obtenerMunicipios = function(idEstado){
		$.ajax({
			url : "municipiosC/obtenerMunicipios/" + idEstado,
			method: "get",
			dataType: 'json',
			contentType: 'application/json',
			success : function(dataSet) {
				$('.municipio').html("");
				if(dataSet.mensaje === 'OK'){
					$('.municipio').append('<option value="0">Seleccione opción...</option>');
					$.each(dataSet.dataExtra, function(i, v){
						$('.municipio').append('<option data-cveMunicipio="' + v.claveMunicipio + '" value="' + v.idMunicipio +'">' + v.nombreMunicipio + '</option>');
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

	var obtenerCodigosPostales = function(idEstado, idMunicipio){
		$.ajax({
			url : "coloniasC/obtenerColonias/" + idEstado + "/" + idMunicipio,
			method: "get",
			dataType: 'json',
			contentType: 'application/json',
			success : function(dataSet) {
				$('#codigoPostal').html("");
				if(dataSet.mensaje === 'OK'){
					$.each(dataSet.dataExtra, function(i, v){
						$('#codigoPostal').append('<option value="' + v.codigoPostal +'">' + v.codigoPostal + '</option>');
					});
					$('#codigoPostal').editableSelect({ effects: 'fade' });
					$('#codigoPostal').prop('autocomplete', 'nope');
					$('#codigoPostal').prop('disabled', false);
				}
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			}
		});
	}
	
	var cargarSelectMunicipios = function (estado){
		$(".estado").change(function(){
			var idEstado = $(this).val();
			obtenerMunicipios(idEstado)});
	}
	
	var obtenerEstadosActualizaCertificado = function(){
		$.ajax({
			url : "estadosC/obtenerEstados",
			method: "get",
			dataType: 'json',
			contentType: 'application/json',
			success : function(dataSet) {
				$('.estadoActualiza').html("");
				if(dataSet.mensaje === 'OK'){
					$('.estadoActualiza').append('<option value="0">Seleccione opción...</option>');
					$.each(dataSet.dataExtra, function(i, v){
						$('.estadoActualiza').append('<option value="' + v.idEstado +'">' + v.nombreEstado + '</option>');
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
	
	var estadosActualizaCertificado = function(idestado,idMunicipio) {
			
		extraerEstados(function(estadosActualizaCertificado) {
			console.log(estadosActualizaCertificado);
			var dataSet = estadosActualizaCertificado;
			if(dataSet.mensaje === 'OK'){
				$('#estadoActualiza').html("");
				$('#estadoActualiza').append(
							'<option value="0">Seleccione Estado...</option>');
				$.each(dataSet.dataExtra, function(i, v){
					$('#estadoActualiza').append(
							'<option value="' + v.idEstado +'">' 
							+ v.nombreEstado + '</option>');
				});
				console.log($('#estadoActualiza'));
				console.log(idestado);
				$("#estadoActualiza").val(idestado)
				
				municipiosActualizaCertificado(idMunicipio);				
			}
		});
	}
	
	var municipiosActualizaCertificado = function(idMunicipio) {
		console.log("inicio call");
		obtenerMunicipiosCertificadoActualiza(function(municipiosActualizaCertificado) {
			
			var dataSet = municipiosActualizaCertificado;
			//console.log(dataSet);
			if(dataSet.mensaje === 'OK'){
				$('#municipioActualiza').html("");
				$('#municipioActualiza').append(
								'<option value="0">Seleccione Estado...</option>');
					$.each(dataSet.dataExtra, function(i, v){
						$('#municipioActualiza').append(
								'<option value="' + v.idMunicipio +'">' 
								+ v.nombreMunicipio + '</option>');
					});
					$("#municipioActualiza").val(idMunicipio);
			}
		});
	}
		
	var extraerEstados = function(callback){
		$.ajax({
			url : "estadosC/obtenerEstados",
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
	
	var obtenerMunicipiosCertificadoActualiza = function(callback){
		$.ajax({
			url : "municipiosC/obtenerMunicipios/" + $("#estadoActualiza").val(),
			method: "get",
			dataType: 'json',
			contentType: 'application/json',
			success : function(dataSet) {
				//console.log(dataSet);
				callback(dataSet);
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			}
		});
	}
	
	return{
		obtenerMunicipios : obtenerMunicipios,
		obtenerEstados : obtenerEstados,
		obtenerCodigosPostales : obtenerCodigosPostales,
		cargarSelectMunicipios : cargarSelectMunicipios,
		obtenerEstadosActualizaCertificado :obtenerEstadosActualizaCertificado,
		estadosActualizaCertificado :estadosActualizaCertificado
	}
})();