var cargaC = (function () {
	var archivosSiniestroAP = function () {
		var extensions = ["xlsx"];
		fileinput.inicializarFileinputSiniestros(null, "input[type='file']", extensions);
	};
	
	var generarSiniestroAP = function() {
		var formData = new FormData();
		formData.append("documento", $("#archivo")[0].files[0]);
		$.ajax({
			url: "ap",
			method: "POST",
			data: formData,
			enctype : 'multipart/form-data',
			processData : false,
			contentType : false,
			cache : false,
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				if (dataSet.mensaje === 'OK') {
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
				} else {
					mensajes.modalAlert('warning', dataSet.mensaje, dataSet.detalleMensaje);
				}
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
	}
	
	return {
		generarSiniestroAP : generarSiniestroAP,
		archivosSiniestroAP : archivosSiniestroAP
	}
})();