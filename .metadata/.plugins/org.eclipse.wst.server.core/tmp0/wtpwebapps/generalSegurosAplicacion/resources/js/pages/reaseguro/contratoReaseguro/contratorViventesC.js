var nuevoContratoC = (function(){
	function createDataContratosVigentes(numero,nombreContrato,estatus){
		return {numero,nombreContrato,estatus};
	}
	
	var listaContratos = [];
	listaContratos.push(createDataContratosVigentes("1","Vida individual","vigente"));
	listaContratos.push(createDataContratosVigentes("2","seguros de vida carllos Slim","cancelado"));
	listaContratos.push(createDataContratosVigentes("3","daños cp2","vigente"));
	console.log("---");
	console.log(listaContratos);
	var llenarTablaVigentes = function(){
		var columnas  = [
			{ title: "N°.", data: "numero"},
			{ title: "Nombre", data: "nombreContrato"},
			{ title: "Estatus", data: "estatus"}
		];
		tabla.iniciarTablaSimple("#tblContratosVigentes",listaContratos,columnas);
	};
	return {
		llenarTablaVigentes :llenarTablaVigentes
	};	
}());
