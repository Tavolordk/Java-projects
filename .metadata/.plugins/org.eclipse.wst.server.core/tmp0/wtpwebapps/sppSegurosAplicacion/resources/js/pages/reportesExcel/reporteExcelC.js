var reporteExcelC = (function(){
	var $idRamo;
	
	var reporteEmision = function(){
		var conexos=window.location.pathname;
		
		var $tipoReporte = $('#tipoReporte').val();
		var $cobertura = $('#tipoReporte').val();
		var $fechaIni = $('#fechaIni').val();
		var $fechaFin = $('#fechaFin').val();
		$idRamo = $('#idRamo').val();
		var $anexosConexos = $(".anexosConexos").is(':checked');
		
		if(conexos.indexOf("reporteConexos") > 0){
			$tipoReporte = "analogosConexos";
		}
		
		$.ajax({
			url: "reportesExcelC/generarExcel",
			method: "GET",
			data:{
				ramo : $idRamo,
				tipoReporte : $tipoReporte,
				fechaIni: $fechaIni,
				fechaFin: $fechaFin,
				anexosConexos : $anexosConexos,
				cobertura : $cobertura
			},
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				if (dataSet.mensaje === 'OK') {
					
					console.log('Reporte Excel -> ',$tipoReporte,': ', dataSet.dataExtra)
					
					$tipoReporte = $('#tipoReporte').val();
					
					var columnas = selectColumns($tipoReporte == "emisionCoberturas" ? "emision" : $tipoReporte);
					var $nombreArchivo = dataSet.dataExtra.nombreArchivo;
					var $nombrePeriodo = "Periodo: " + $fechaIni + " - " + $fechaFin
					
					tabla.iniciarTablaExport("#reportePreview", dataSet.dataExtra.resultado, columnas, $nombreArchivo, $nombrePeriodo);
					$('.background-tabla').css('display', 'block');
					
				}else{
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("page not found");
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	};
	
	var selectColumns = function(tipoReporte){
		var columns = [];
			console.log('Tipo Reporte -> ', tipoReporte.trim());
		switch(tipoReporte.trim()){
			case "emision":
				columns = [{title : "Moneda", data : "moneda"},
					{title : "Agrupador", data : "agrupador"},
					{title : "Ramo", data : "ramoContable"},
					{title : "Desc. Ramo", data : "descRamo"},
					{title : "Producto", data : "producto"},
					{title : "Sucursal", data : "sucursal"},
					{title : "Tipo endoso", data : "tipoEndoso"},
					{title : "Poliza", data : "poliza"},
					{title : "Grupo", data : "grupo"},
					{title : "Endoso", data : "endoso"},
					{title : "Recibo", data : "recibo"},
					{title : "Cuota", data : "cuota"},
					{title : "Forma de pago", data : "formaPago"},
					{title : "Inicio vigencia", data : "inicioVigencia"},
					{title : "Fin vigencia", data : "finVigencia"},
					{title : "Fecha de emision", data : "fechaEmision"},
					{title : "Prima neta", data : "primaNeta", 
						render: $.fn.dataTable.render.number( ',', '.', 2, '' )
					},
					{title : "Recargo", data : "recargoPagoFracc", 
						render: $.fn.dataTable.render.number( ',', '.', 2, '' )
					},
					{title : "Derecho de poliza", data : "derechoPoliza",
						render: $.fn.dataTable.render.number( ',', '.', 2, '' )
					},
					{title : "IVA", data : "impuestoTotal",
						render: $.fn.dataTable.render.number( ',', '.', 2, '' )
					},
					{title : "Prima total", data : "primaTotal",
						render: $.fn.dataTable.render.number( ',', '.', 2, '' )
					},
					{title : "Comision", data : "comisionTotal", 
						render: $.fn.dataTable.render.number( ',', '.', 2, '' )
					},
					{title : "% Comision", data : "porcentajeComision",
						render: $.fn.dataTable.render.number( ',', '.', 2, '', '%' )
					},
					{title : "Comision/Recargo", data : null, render : function(data, type, row){
						return "";
					}},
					{title : "Suma asegurada", data : "sumaAsegurada",
						render: $.fn.dataTable.render.number( ',', '.', 2, '' )
					},
					{title : "Coberturas", data : "coberturas"},
					{title : "Ocupacion", data : "ocupacion"},
					{title : "Nivel de riesgo", data : "nivelRiesgo"},
					{title : "OV", data : "ov"},
					{title : "CUV", data : "cuv"},
					{title : "No. Credito", data : "noCredito"},
					{title : "Clave agente 1", data : "cveAg1"},
					{title : "Nombre agente 1", data : "nombreAg1"},
					{title : "Tipo persona agente 1", data : "tipoPersonaAg1"},
					
					{title : "Clave agente 2", data : "cveAg2"},
					{title : "Nombre agente 2", data : "nombreAg2"},
					{title : "Tipo persona agente 2", data : "tipoPersonaAg2"},
					
					{title : "Clave agente 3", data : "cveAg3"},
					{title : "Nombre agente 3", data : "nombreAg3"},
					{title : "Tipo persona agente 3", data : "tipoPersonaAg3"},
					
					
					{title : "Nombre asegurado", data : "nombreAsegurado"},
					{title : "Beneficiario", data : "beneficiario"},
					{title : "Ramo contable", data : "ramoContable"},
					{title : "Estatus", data : "estatus"},
					{title : "Fecha Estatus", data : "fechaEstatus"},
					{title : "UUID", data : "uuid"}];
				break;
			case "cobranza":
				columns = [{title : "Moneda", data : "moneda"},
					{title : "Agrupador", data : "agrupador"},
					{title : "Ramo", data : "ramoContable"},
					{title : "Desc. Ramo", data : "descRamo"},
					{title : "Producto", data : "producto"},
					{title : "Sucursal", data : "sucursal"},
					{title : "Tipo endoso", data : "tipoEndoso"},
					{title : "Poliza", data : "poliza"},
					{title : "Grupo", data : "grupo"},
					{title : "Endoso", data : "endoso"},
					{title : "Recibo", data : "recibo"},
					{title : "Cuota", data : "cuota"},
					{title : "Forma de pago", data : "formaPago"},
					{title : "Inicio vigencia", data : "inicioVigencia"},
					{title : "Fin vigencia", data : "finVigencia"},
					{title : "Fecha ingreso banco", data : "fechaIngresoBanco"},
					{title : "Fecha aplicacion", data : "fechaEstatus"},
					{title : "Fecha de emision", data : "fechaEmision"},
					{title : "Prima neta", data : "primaNeta",
						render: $.fn.dataTable.render.number( ',', '.', 2, '' )
					},
					{title : "Recargo", data : "recargoPagoFracc",
						render: $.fn.dataTable.render.number( ',', '.', 2, '' )
					},
					{title : "Derecho de emision", data : "derechoPoliza",
						render: $.fn.dataTable.render.number( ',', '.', 2, '' )
					},
					{title : "IVA", data : "impuestoTotal",
						render: $.fn.dataTable.render.number( ',', '.', 2, '' )
					},
					{title : "Prima total", data : "primaTotal",
						render: $.fn.dataTable.render.number( ',', '.', 2, '' )
					},
					{title : "Comision", data : "comisionTotal",
						render: $.fn.dataTable.render.number( ',', '.', 2, '' )
					},
					{title : "Comision/Recargo", data : null, render : function(data, type, row){
						return "";
					}},
					{title : "OV", data : "ov"},
					{title : "CUV", data : "cuv"},
					{title : "No. Credito", data : "noCredito"},
					
					{title : "Clave agente 1", data : "cveAg1"},
					{title : "Nombre agente 1", data : "nombreAg1"},
					{title : "Tipo persona agente 1", data : "tipoPersonaAg1"},
					
					{title : "Clave agente 2", data : "cveAg2"},
					{title : "Nombre agente 2", data : "nombreAg2"},
					{title : "Tipo persona agente 2", data : "tipoPersonaAg2"},
					
					{title : "Clave agente 3", data : "cveAg3"},
					{title : "Nombre agente 3", data : "nombreAg3"},
					{title : "Tipo persona agente 3", data : "tipoPersonaAg3"},
					
					{title : "Nombre asegurado", data : "nombreAsegurado"},
					{title : "Beneficiario", data : "beneficiario"},
					{title : "Ramo contable", data : "ramoContable"},
					{title : "Estatus", data : "estatus"},
					{title : "Fecha Estatus", data : "fechaEstatus"},
					{title : "UUID", data : "uuid"}];
				break;
			case "siniestro":
				if($idRamo == 5){
					columns = [{title : "No. Siniestro", data : "numeroSiniestro"},
						{title : "Póliza", data : "poliza.numeroPoliza"},
						{title : "Certificado", data : "numeroEndoso"},
						{title : "Año suscripción", data : "poliza.anioPoliza"},
						{title : "Suma Asegurada", data : "sumaAsegurada",
							render: $.fn.dataTable.render.number( ',', '.', 2, '' )
						},
						{title : "Asegurado", data : null, render : function(data, type, row){
																		if(data.poliza.contratante.denominacion != ""){
																			return data.poliza.contratante.denominacion;
																		}
																		return data.poliza.contratante.nombreCliente + " " 
																		     + data.poliza.contratante.apellidoPaterno + " " 
																		     + data.poliza.contratante.apellidoMaterno;
																		}
						},
						{title : "Beneficiario", data : "asegurado"},
						{title : "Dirección", data : "direccion"},
						{title : "Estado", data : "estado"},
						{title : "Municipio", data : "municipio"},
						{title : "NSS", data : "nss"},
						{title : "OV", data : "ordenVerificacion"},
						{title : "CUV", data : "cuv"},
						{title : "Fecha Ocurrido", data : "fechaOcurrenciaSiniestro"},
						{title : "Fecha Reclamacion", data : "fechaAviso"},
						{title : "Fecha registro", data : "fechaReporteSiniestro"},
						{title : "Estatus siniestro", data : "estatusSiniestro.ct2Descripcion"},
						{title : "Cobertura", data : "coberturaAfectada"},
						{title : "Estimacion inicial", data : "estimacion", render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
						{title : "Fecha", data : "fechaEstimacion"},
						{title : "Aumento de reserva", data : "ajustesMas",render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
						{title : "Fecha", data : "fechaAumento"},
						{title : "Disminución de reserva", data : "ajustesMenos", render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
						{title : "Fecha", data : "fechaDisminucion"},
						{title : "Gastos", data : "gastos", render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
						{title : "Fecha", data : "fechaGasto"},
						{title : "Gastos de ajuste", data : "ajustes",render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
						{title : "Fecha", data : "fechaGastoAjuste"},
						{title : "Monto salvamentos/recuperaciones", data : "salvamentosRecuperaciones",rnender: $.fn.dataTable.render.number( ',', '.', 2, '' )},
						{title : "Fecha", data : "fechaSalvamentos"},
						{title : "Monto pagado", data : "montoPagado",render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
						{title : "Fecha", data : "fechaPagoSiniestro"},
						{title : "Monto deducible", data : "montoDeducible",render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
						{title : "Monto coaseguro", data : "montoCoaseguro",render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
						{title : "Fecha de pago", data : "fechaPagoSiniestro"},
						{title : "Proveedor", data : "proveedor"},
						{title : "Fecha pago a proveedor", data : "fechaPagoSiniestro"}];
				}else{
					columns = [
						{title : "No.  folio proveedor", data : "folioProveedor"},
						{title : "No. siniestro", data : "numeroSiniestro"},
						{title : "Póliza", data : "poliza.numeroPoliza"},
						{title : "Grupo", data : "grupo"},
						{title : "Endoso", data : "numeroEndoso"},
						{title : "Certificado", data : "numeroEndoso"},
						{title : "Año suscripción", data : "poliza.anioPoliza"},
						{title : "Suma asegurada", data : "sumaAsegurada",
							render: $.fn.dataTable.render.number( ',', '.', 2, '' )
						},
						{title : "Asegurado", data : "asegurado"},
						{title : "Sexo", data : "sexo"},
						{title : "Dirección", data : "direccion"},
						{title : "Estado", data : "estado"},
						{title : "Municipio", data : "municipio"},
						{title : "Fecha ocurrido", data : "fechaOcurrenciaSiniestro"},
						{title : "Fecha reclamacion", data : "fechaAviso"},
						{title : "Fecha registro", data : "fechaReporteSiniestro"},
						{title : "Estatus siniestro", data : "estatusSiniestro.ct2Descripcion"},
						{title : "Cobertura", data : "coberturaAfectada"},
						{title : "Inicial ó Complemento", data : "inicioComplemento"},
						{title : "Quién reporta", data : "quienNombre"},
						{title : "Quién teléfono", data : "quienTelefono"},
						{title : "Quién correo", data : "quienCorreo"},
						{title : "Quién celular", data : "quienCelular"},
						{title : "Quién narración", data : "quienNarracion"},
						{title : "Dictaminador médico", data : "dictaminadorMedico"},
						{title : "Dictaminador fecha asignación", data : "dictaminadorFechaAsignacion"},
						{title : "Dictaminador hora asignación", data : "dictaminadorHoraAsignacion"},
						{title : "Dictaminador fecha cierre", data : "dictaminadorFechaCierre"},
						{title : "Dictaminador comentario", data : "dictaminadorComentario"},
						{title : "Dictaminador confirmación de la causa", data : "dictaminadorConfirmacionCausa"},
						{title : "Nombre beneficiario 1", data : "beneficiario1"},
						{title : "Porcentaje 1", data : "porcentaje1"},
						{title : "Parentesco 1", data : "parentesco1"},
						{title : "Nombre beneficiario 2", data : "beneficiario2"},
						{title : "Porcentaje 2", data : "porcentaje2"},
						{title : "Parentesco 2", data : "parentesco2"},
						{title : "Nombre beneficiario 3", data : "beneficiario3"},
						{title : "Porcentaje 3", data : "porcentaje3"},
						{title : "Parentesco 3", data : "parentesco3"},
						{title : "Nombre beneficiario 4", data : "beneficiario4"},
						{title : "Porcentaje 4", data : "porcentaje4"},
						{title : "Parentesco 4", data : "parentesco4"},
						{title : "Nombre beneficiario 5", data : "beneficiario5"},
						{title : "Porcentaje 5", data : "porcentaje5"},
						{title : "Parentesco 5", data : "parentesco5"},
						{title : "Estimacion inicial", data : "estimacion",	render: $.fn.dataTable.render.number( ',', '.', 2, '')},
						{title : "Ajuste de más", data : "ajustesMas", render: $.fn.dataTable.render.number( ',', '.', 2, '')},
						{title : "Ajuste de menos", data : "ajustesMenos", render: $.fn.dataTable.render.number( ',', '.', 2, '')},
						{title : "Gastos de ajuste", data : "ajustes", render: $.fn.dataTable.render.number( ',', '.', 2, '')},
						{title : "Monto pagado", data : "montoPagado", render: $.fn.dataTable.render.number( ',', '.', 2, '')},
						{title : "Estimación pendiente de pago", data : "reservaEstimacion", render: $.fn.dataTable.render.number( ',', '.', 2, '')},
						{title : "Fecha de pago", data : "fechaPagoSiniestro"}
						];
				}
				
				break;
			case "ASISTENCIA URGENCIAS DENTALES":
				columns = [
					{title : "Num. póliza", data : "poliza"},
					{title : "Num. endoso", data : "endoso"},
					{title : "Razón social persona moral", data : "razonSocial"},
					
					{title : "Nombre persona fisica", data : null, render : function(data, type, row){
						if(data.nombres === ''){
							return '';
						}
						return data.nombres + " " + data.apellidoPaterno + " " + data.apellidoMaterno;
					}},
					{title : "Calle", data : "calle"},
					{title : "Número Ext.", data : "numExterior"},
					{title : "Número Int.", data : "numInterior"},
					{title : "CP", data : "cp"},
					{title : "Estado", data : "estado"},
					{title : "Municipio", data : "municipio"},
					{title : "RFC contratante", data : "rfcContratante"},
					{title : "Ramo", data : "ramoContable"},
					{title : "Nombre del producto", data : "producto"},
					{title : "No. certificado", data : "noCertificado"},
					{title : "Nombre asegurado", data : "nombreAsegurado"},
					{title : "Fecha de nacimiento", data : "fechaNacimiento"},
					{title : "Sexo", data : "sexo"},
					{title : "Tipo endoso", data : "tipoEndoso"},
					{title : "F. inicio vigencia póliza", data : "inicioVigenciaPoliza"},
					{title : "F. fin vigencia póliza", data : "finVigenciaPoliza"},
					{title : "F. inicio vigencia certificado", data : "inicioVigenciaCertificado"},
					{title : "F. fin vigencia certificado", data : "finVigenciaCertificado"},
					{title : "F. emision del movimiento", data : "fechaEmision"},
					{title : "Nombre de la cobertura", data : "cobertura"},
					{title : "Prima neta", data : "primaNeta", 
						render: $.fn.dataTable.render.number( ',', '.', 2, '' )
					},
					{title : "Forma de pago", data : "formaPago"}]
					
				break;
				
			case "DENTAL":
				columns = [
					{title : "Num. póliza", data : "poliza"},
					{title : "Num. endoso", data : "endoso"},
					{title : "Razón social persona moral", data : "razonSocial"},
					
					{title : "Nombre persona fisica", data : null, render : function(data, type, row){
						if(data.nombres === ''){
							return '';
						}
						return data.nombres + " " + data.apellidoPaterno + " " + data.apellidoMaterno;
					}},
					{title : "Calle", data : "calle"},
					{title : "Número Ext.", data : "numExterior"},
					{title : "Número Int.", data : "numInterior"},
					{title : "CP", data : "cp"},
					{title : "Estado", data : "estado"},
					{title : "Municipio", data : "municipio"},
					{title : "RFC contratante", data : "rfcContratante"},
					{title : "Ramo", data : "ramoContable"},
					{title : "Nombre del producto", data : "producto"},
					{title : "No. certificado", data : "noCertificado"},
					{title : "Nombre asegurado", data : "nombreAsegurado"},
					{title : "Fecha de nacimiento", data : "fechaNacimiento"},
					{title : "Sexo", data : "sexo"},
					{title : "Tipo endoso", data : "tipoEndoso"},
					{title : "F. inicio vigencia póliza", data : "inicioVigenciaPoliza"},
					{title : "F. fin vigencia póliza", data : "finVigenciaPoliza"},
					{title : "F. inicio vigencia certificado", data : "inicioVigenciaCertificado"},
					{title : "F. fin vigencia certificado", data : "finVigenciaCertificado"},
					{title : "F. emision del movimiento", data : "fechaEmision"},
					{title : "Nombre de la cobertura", data : "cobertura"},
					{title : "Prima neta", data : "primaNeta", 
						render: $.fn.dataTable.render.number( ',', '.', 2, '' )
					},
					{title : "Forma de pago", data : "formaPago"}]
					
				break;
				
			case "ASISTENCIA FUNERARIA POR MUERTE ACCIDENTAL":
				columns = [
					{title : "Num. póliza", data : "poliza"},
					{title : "Num. endoso", data : "endoso"},
					{title : "Razón social persona moral", data : "razonSocial"},
					{title : "Nombres", data : "nombres"},
					{title : "Apellido Paterno", data : "apellidoPaterno"},
					{title : "Apellido Materno", data : "apellidoMaterno"},
					{title : "Calle", data : "calle"},
					{title : "Número Ext.", data : "numExterior"},
					{title : "Número Int.", data : "numInterior"},
					{title : "CP", data : "cp"},
					{title : "Estado", data : "estado"},
					{title : "Municipio", data : "municipio"},
					{title : "RFC contratante", data : "rfcContratante"},
					{title : "Ramo", data : "ramoContable"},
					{title : "Nombre del producto", data : "producto"},
					{title : "No. certificado", data : "noCertificado"},
					{title : "Nombre asegurado", data : "nombreAsegurado"},
					{title : "Fecha de nacimiento", data : "fechaNacimiento"},
					{title : "Sexo", data : "sexo"},
					
					{title : "Beneficiario 1", data : "beneficario1"},
					{title : "Parentesco 1", data : "parentesco1"},
					{title : "Porcentaje 1", data : "porcentaje1"},
					
					{title : "Beneficiario 2", data : "beneficario2"},
					{title : "Parentesco 2", data : "parentesco2"},
					{title : "Porcentaje 2", data : "porcentaje2"},
					
					{title : "Beneficiario 3", data : "beneficario3"},
					{title : "Parentesco 3", data : "parentesco3"},
					{title : "Porcentaje 3", data : "porcentaje3"},
					
					{title : "Beneficiario 4", data : "beneficario4"},
					{title : "Parentesco 4", data : "parentesco4"},
					{title : "Porcentaje 4", data : "porcentaje4"},
					
					{title : "Tipo endoso", data : "tipoEndoso"},
					{title : "F. inicio vigencia póliza", data : "inicioVigenciaPoliza"},
					{title : "F. fin vigencia póliza", data : "finVigenciaPoliza"},
					{title : "F. inicio vigencia certificado", data : "inicioVigenciaCertificado"},
					{title : "F. fin vigencia certificado", data : "finVigenciaCertificado"},
					{title : "F. emision del movimiento", data : "fechaEmision"},
					{title : "Nombre de la cobertura", data : "cobertura"},
					{title : "Prima neta", data : "primaNeta", 
						render: $.fn.dataTable.render.number( ',', '.', 2, '' )
					},
					{title : "Forma de pago", data : "formaPago"}];
				break;
				
			case "FUNERARIA":
				columns = [
					{title : "Num. póliza", data : "poliza"},
					{title : "Num. endoso", data : "endoso"},
					{title : "Razón social persona moral", data : "razonSocial"},
					{title : "Nombres", data : "nombres"},
					{title : "Apellido Paterno", data : "apellidoPaterno"},
					{title : "Apellido Materno", data : "apellidoMaterno"},
					{title : "Calle", data : "calle"},
					{title : "Número Ext.", data : "numExterior"},
					{title : "Número Int.", data : "numInterior"},
					{title : "CP", data : "cp"},
					{title : "Estado", data : "estado"},
					{title : "Municipio", data : "municipio"},
					{title : "RFC contratante", data : "rfcContratante"},
					{title : "Ramo", data : "ramoContable"},
					{title : "Nombre del producto", data : "producto"},
					{title : "No. certificado", data : "noCertificado"},
					{title : "Nombre asegurado", data : "nombreAsegurado"},
					{title : "Fecha de nacimiento", data : "fechaNacimiento"},
					{title : "Sexo", data : "sexo"},
					
					{title : "Beneficiario 1", data : "beneficario1"},
					{title : "Parentesco 1", data : "parentesco1"},
					{title : "Porcentaje 1", data : "porcentaje1"},
					
					{title : "Beneficiario 2", data : "beneficario2"},
					{title : "Parentesco 2", data : "parentesco2"},
					{title : "Porcentaje 2", data : "porcentaje2"},
					
					{title : "Beneficiario 3", data : "beneficario3"},
					{title : "Parentesco 3", data : "parentesco3"},
					{title : "Porcentaje 3", data : "porcentaje3"},
					
					{title : "Beneficiario 4", data : "beneficario4"},
					{title : "Parentesco 4", data : "parentesco4"},
					{title : "Porcentaje 4", data : "porcentaje4"},
					
					{title : "Tipo endoso", data : "tipoEndoso"},
					{title : "F. inicio vigencia póliza", data : "inicioVigenciaPoliza"},
					{title : "F. fin vigencia póliza", data : "finVigenciaPoliza"},
					{title : "F. inicio vigencia certificado", data : "inicioVigenciaCertificado"},
					{title : "F. fin vigencia certificado", data : "finVigenciaCertificado"},
					{title : "F. emision del movimiento", data : "fechaEmision"},
					{title : "Nombre de la cobertura", data : "cobertura"},
					{title : "Prima neta", data : "primaNeta", 
						render: $.fn.dataTable.render.number( ',', '.', 2, '' )
					},
					{title : "Forma de pago", data : "formaPago"}];
				break;
				default:
					break;
		}
		
		return columns;
	};
	
	var obtenerCoberturasAnalogasConexas = function(){
		$.ajax({
			url : "coberturasProdC/obtenerCoberturasAnalogasConexas",
			method: "get",
			success : function(dataSet) {
				$('.coberturas').html("");
				if(dataSet.mensaje === 'OK'){console.log(dataSet.dataExtra);
					$('.coberturas').append('<option value="0">Seleccione...</option>');
					$.each(dataSet.dataExtra, function(i, v){
						$('.coberturas').append('<option value="' + v.descripcion +'">' + v.descripcion + '</option>');
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
	
	return{
		reporteEmision : reporteEmision,
		obtenerCoberturasAnalogasConexas : obtenerCoberturasAnalogasConexas
	}
})();