$(document).ready(function(){
	var $pathArray = window.location.pathname.split("/");
	
	if($pathArray.indexOf('interno') > -1){
		console.log("interno");
		contratosC.llenaCatalogoRamo();
		datepicker.customConfig();
	}
	
	if($pathArray.indexOf('productos') > -1){
		productoC.obtenerProducto();
	}
	
	if($pathArray.indexOf('siniestros') > -1){
		controlInterno.graficaSiniestrosProporcionales();
	}
	
	$('#btnBuscarPolizas').click(function(){
		controlInterno.buscarPorRamo();
	});
	
	$('#btnTest').click(function(){
		console.log( $(this).data('valor') );
	});
	
	/*var $data = [
		{
			name: 'Pagados', 
			data: [5, 3, 4, 7, 2]
		}, 
		{
			name: 'Pendientes', 
			data: [2, 2, 3, 2, 1]
		}, 
		{
			name: 'Prima cedida', 
			data: [3, 4, 4, 2, 5]
		}];
	
	controlInterno.generarGraficaSiniestros('siniestros1', 'Gráfica 1', $data);
	controlInterno.generarGraficaSiniestros('siniestros2', 'Gráfica 2', $data);
	controlInterno.generarGraficaSiniestros('siniestros3', 'Gráfica 3', $data);
	controlInterno.generarGraficaSiniestros('siniestros4', 'Gráfica 4', $data);*/
	
});