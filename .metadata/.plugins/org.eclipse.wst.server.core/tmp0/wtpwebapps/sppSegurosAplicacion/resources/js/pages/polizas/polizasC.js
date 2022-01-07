var polizasC = (function () {
	var btnBusca = function () {
		document.getElementById("btnBusca").disabled = true;

		$.ajax({
			url: "poliza/consulta/" + $('#txtBusca').val(),
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				
				var columnas = [
					{ title: "Nombre", data: "cliente.nombreCliente" },
					{ title: "Apellido Paterno", data: "cliente.apellidoPaterno" },
					{ title: "Apellido Materno", data: "cliente.apellidoMaterno" },
					{ title: "RFC", data: "cliente.rfc" },
					{ title: "Estatus", data: "estatus" },

					{
						title: "", data: null,
						defaultContent: "<span data-toggle='collapse'><i class='fas fa-edit'></i></span>",
						orderable: false
					},
					{
						title: "", data: null,
						defaultContent: "<span data-toggle='collapse'><i class='fas fa-trash-alt'></i></span>",
						orderable: false
					}
				];

				if (dataSet.mensaje === 'OK') {
					tabla.iniciarTabla("#resultadoBusqueda", dataSet.dataExtra, columnas);
					$('.background-tabla').css('display', 'block');
				}
			},
			statusCode: {
				404: function () {
					console.log("No encuentra poliza.");
				}
			},
			complete: function(){
				util.loadingEnd();
				document.getElementById("btnBusca").disabled = false;
			}
		});
	}
	
	var buscaPolizasXFechaRegistro = function () {
//		$('#txtSinXPol').val('');
		var fechaHasta = '';
		var ramo = $('#idRamo').val();
		if( $('#txtFechaRegistroHasta') !== undefined && $('#txtFechaRegistroHasta').val() !== undefined && $('#txtFechaRegistroHasta').val()!=='') {
			fechaHasta = "/"+$('#txtFechaRegistroHasta').val();
			if( $('#txtFechaRegistroDe') !== undefined && $('#txtFechaRegistroDe').val() !== undefined && $('#txtFechaRegistroDe').val()!=='') {
			}else{
				mensajes.modalAlert('warning', 'Fecha de inicio', 'Falta intervalo fecha de inicio.');
				return;
			}
		}
		$.ajax({
			url: "poliza/busqueda/fecharegistro/" + $('#txtFechaRegistroDe').val()+fechaHasta+"/"+ramo,
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				
				var columnas = [
					{ title: "Fecha registro", data: "fechaRegistro" },
					{ title: "Poliza", data: "numeroPoliza" },
					{ title: "Certificado", data: "endoso" },
					{ title: "Ramo", data: "ramo.cT8Descripcion"},
					{ title: "Sucursal", data: "sucursal.ct19Descripcion" },
					{ title: "Suma asegurada", data: "sumaAsegurada", render: $.fn.dataTable.render.number( ',', '.', 2) },
					{ title: "Fecha emision", data: "fechaEmision" },
					{ title: "Inicio vigencia", data: "fechaInicioVigencia" },
					{ title: "Fin vigencia", data: "fechaFinVigencia" },
				];

				if (dataSet.mensaje === 'OK') {
					tabla.iniciarTabla("#resultadoBusqueda", dataSet.dataExtra, columnas);
					$('.background-tabla').css('display', 'block');
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
		btnBusca: btnBusca,
		buscaPolizasXFechaRegistro : buscaPolizasXFechaRegistro
	}
})();