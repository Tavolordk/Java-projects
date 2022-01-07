var ocupacionC = (function() {
	var obtenerOcupacion = function(callback) {
		$.ajax({
			url : "ocupacionC/obtenerOcupacion",
			method : "get",
			dataType : 'json',
			contentType : 'application/json',
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
	var ocupacion = function() {
		obtenerOcupacion(function(ocupacion) {
			var dataSet = ocupacion;
			if (dataSet.mensaje === 'OK') {
				$('.ocupacion').html("");
				$('.ocupacion').append(
						'<option value="">Seleccione Ocupacion...</option>');
				$.each(dataSet.dataExtra, function(i, v) {
					$('.ocupacion').append(
							'<option value="' + v.cveOcupacion + '">'
									+ v.descripcion + '</option>');
				});
			}
		});
	}
	var ocupacionGrupo = function(idOcupacion) {
		obtenerOcupacion(function(ocupacion) {
			var dataSet = ocupacion;
			if (dataSet.mensaje === 'OK') {
				$('#ocupacionE').html("");				
				$.each(dataSet.dataExtra, function(i, v) {
					$('#ocupacionE').append(
							'<option value="' + v.cveOcupacion + '">'
									+ v.descripcion + '</option>');
				});
				$("#ocupacionE").val(idOcupacion);
			}
		});
	}
	// var guardarGrupo = function() {
	// // var formData = {};
	// // //iterate over form elements
	// // $.each($('input, select', '#formCapturaGruposAP'),function(k, v){
	// // if($(this).attr("name")!== undefined){
	// // formData[$(this).attr("name")] = $(this).val();
	// // }
	// // });
	// // formData["sucursal"] = Number($("#sucursal").val());
	// // formData["ramo"] = Number($("#ramo").val());
	// // formData["numeroSolicitud"] = 1;
	// // formData["anioPoliza"] = 1;
	// // formData["sumaAsegurada"] = 0;
	// // formData["nivelRiesgo"] = Number(formData["nivelRiesgo"]);
	// // formData["ocupacion"] = Number(formData["ocupacion"]);
	// // formData["producto"] = Number(formData["producto"]);
	//		
	//		
	// var formData = new FormData();
	// var ocupacion = $('#ocupacion').val();
	// var sucursal = $('#sucursal').val();
	// var producto = $('#producto').val();
	// var numeroSolicitud = 1;
	// var anioPoliza = 1;
	// var sumaAsegurada = 1;
	// var nivelRiesgo = 1;
	// var nombreGrupo = $('#nombreGrupo').val();
	// var ramo = $('#ramo').val();
	//		
	//		
	//		
	// formData.append("ocupacion", new Blob([JSON.stringify(ocupacion)], {
	// type: 'application/json' }));
	// formData.append("sucursal", new Blob([JSON.stringify(sucursal)], { type:
	// 'application/json' }));
	// formData.append("producto", new Blob([JSON.stringify(producto)], { type:
	// 'application/json' }));
	// formData.append("numeroSolicitud", new
	// Blob([JSON.stringify(numeroSolicitud)], { type: 'application/json' }));
	// formData.append("anioPoliza", new Blob([JSON.stringify(anioPoliza)], {
	// type: 'application/json' }));
	// formData.append("sumaAsegurada", new
	// Blob([JSON.stringify(sumaAsegurada)], { type: 'application/json' }));
	// formData.append("nivelRiesgo", new Blob([JSON.stringify(nivelRiesgo)], {
	// type: 'application/json' }));
	// formData.append("nombreGrupo",new Blob([JSON.stringify(nombreGrupo)], {
	// type: 'application/json' }));
	// formData.append("ramo",new Blob([JSON.stringify(ramo)], { type:
	// 'application/json' }));
	//		
	//		
	//		
	//		
	//		
	// $.ajax({
	// url : "solicitudGrupoC/guardarSolicitudGrupo",
	// method: "POST",
	// data: formData,
	// enctype: 'multipart/form-data',
	// processData: false,
	// contentType: false,
	// cache: false,
	// beforeSend: function(){
	// util.loadingStart();
	// },
	// success : function(dataSet) {
	// console.log(dataSet.mensaje);
	// mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
	// var columnas = [
	// {
	// title : "Id Grupo", data : "idSoLGrupoAP"
	// },
	//					
	// {
	// title : "Nombre Grupo", data : "nombreGrupo"
	// }];
	// console.log(dataSet);
	// if (dataSet.mensaje === "OK") {
	// tabla.iniciarTabla("#resultadoGrupos", dataSet.dataExtra, columnas);
	// $('.background-tabla').css('display', 'block');
	// }
	// // if(dataSet.mensaje==="OK"){
	// // agentesC.obtenerAgentes();
	// // mensajes.modalAlert('success', dataSet.mensaje,
	// dataSet.detalleMensaje);
	// // $('#formAgenteNuevo')[0].reset();
	// // $('#nuevoAgenteModal').modal('hide');
	// // }
	// },
	// statusCode : {
	// 404 : function() {
	// console.log("page not found");
	// }
	// },
	//			
	// error: function (request, status, error) {
	// console.log(request.responseText);
	// },
	// complete: function(){
	// util.loadingEnd();
	// }
	// });
	// }
	//	
	// var obtenerGrupos = function() {
	// //
	// var formData = new FormData();
	// var numeroSolicitud = 1;
	// var grupo = 8;
	//		
	// // formData.append("numeroSolicitud", new
	// Blob([JSON.stringify(numeroSolicitud)], { type: 'application/json' }));
	// //
	// // formData.append("grupo", new Blob([JSON.stringify(grupo)], { type:
	// 'application/json' }));
	//		
	// $.ajax({
	// url : "solicitudGrupoC/obtenerGruposPorId/"+grupo,
	// method: "GET",
	// beforeSend: function(){
	// util.loadingStart();
	// },
	// success : function(dataSet) {
	// console.log(dataSet.mensaje);
	// mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
	// var columnas = [
	// {
	// title : "Id Grupo", data : "idSoLGrupoAP"
	// },
	//					
	// {
	// title : "Nombre Grupo", data : "nombreGrupo"
	// }];
	// console.log(dataSet);
	// if (dataSet.mensaje === "OK") {
	// tabla.iniciarTabla("#resultadoGrupos", dataSet.dataExtra, columnas);
	// $('.background-tabla').css('display', 'block');
	// }
	// // if(dataSet.mensaje==="OK"){
	// // agentesC.obtenerAgentes();
	// // mensajes.modalAlert('success', dataSet.mensaje,
	// dataSet.detalleMensaje);
	// // $('#formAgenteNuevo')[0].reset();
	// // $('#nuevoAgenteModal').modal('hide');
	// // }
	// },
	// statusCode : {
	// 404 : function() {
	// console.log("page not found");
	// }
	// },
	//			
	// error: function (request, status, error) {
	// console.log(request.responseText);
	// },
	// complete: function(){
	// util.loadingEnd();
	// }
	// });
	// }

	return {
		obtenerOcupacion : obtenerOcupacion,
		ocupacion : ocupacion,
		ocupacionGrupo : ocupacionGrupo

	}
})();