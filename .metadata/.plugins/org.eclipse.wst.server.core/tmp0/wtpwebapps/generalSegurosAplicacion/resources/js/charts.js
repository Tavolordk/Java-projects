$(function(){
    function pageLoad(){
        $('.widget').widgster();
        $('.sparkline').each(function(){
            $(this).sparkline('html', $(this).data());
        });

    }
    var jsonTabla = [{ramo:'030',
					prima:'9,12,14,45,10,64,20',
					primaDevengada:'9,12,34,15,10,14,20',
					ocurridos:'9,12,14,19,34,14,20',
					gastosAjuste:'9,12,4,15,10,14,20',
					siniestros:'9,12,15,15,10,14,20',
					certificados:'11,12,21,15,10,14,20',
					polizas:'9,12,69,15,50,14,20'},
					{ramo:'032',
						prima:'4,9,8,38,10,24,8',
						primaDevengada:'9,12,14,15,10,14,30',
						ocurridos:'9,12,14,15,10,14,20',
						gastosAjuste:'9,5,14,15,10,14,20',
						siniestros:'9,12,14,15,10,14,20',
						certificados:'9,12,14,15,10,14,20',
						polizas:'9,12,14,15,10,14,20'},
					{ramo:'028',
							prima:'34,23,8,8,10,9,8',
							primaDevengada:'9,12,14,15,10,23,10',
							ocurridos:'9,12,14,15,10,14,24',
							gastosAjuste:'9,5,14,15,10,14,30',
							siniestros:'9,12,14,15,15,24,15',
							certificados:'9,12,34,15,10,10,6',
							polizas:'9,12,14,15,19,22,20'},
					{ramo:'022',
						prima:'4,9,8,8,1,9,8',
						primaDevengada:'9,12,14,18,10,14,5',
						ocurridos:'9,12,14,15,10,25,20',
						gastosAjuste:'9,5,14,25,10,14,20',
						siniestros:'9,12,14,15,10,14,20',
						certificados:'9,12,14,15,40,14,11',
						polizas:'9,12,14,15,10,14,33'}
						
		    		];
    function cargaInfoTabla(){
    	var grafica = "";
    	var graficaGeneral ="";
    	jsonTabla.forEach( function(valor, indice) {
    		grafica = "<tr>" +
    					"<td style='font-weight: bold;'>"+valor.ramo+"</td><td>" +
						"<div class='col-md-6'>"+
				    	"	<div class='stats-row'>"+
				    	"		<div class='stat-item stat-item-mini-chart' style='top:0px'>"+
				    	"			<div class='sparkline' data-type='bar' data-bar-color='purple' data-height='30' data-bar-width='6' data-bar-spacing='2'>"+valor.prima+"</div>"+
				    	"		</div>"+
				    	"	</div>"+
				    	"</div>" +
				    	"</td>"+
						"<td><div class='col-md-6'>"+
				    	"	<div class='stats-row'>"+
				    	"		<div class='stat-item stat-item-mini-chart' style='top:0px'>"+
				    	"			<div class='sparkline' data-type='bar' data-bar-color='orange' data-height='30' data-bar-width='6' data-bar-spacing='2'>"+valor.primaDevengada+"</div>"+
				    	"		</div>"+
				    	"	</div>"+
				    	"</div>" +
				    	"</td>"+
				    	"<td><div class='col-md-6'>"+
				    	"	<div class='stats-row'>"+
				    	"		<div class='stat-item stat-item-mini-chart' style='top:0px'>"+
				    	"			<div class='sparkline' data-type='bar' data-bar-color='blue' data-height='30' data-bar-width='6' data-bar-spacing='2'>"+valor.ocurridos+"</div>"+
				    	"		</div>"+
				    	"	</div>"+
				    	"</div>" +
				    	"</td>"+
				    	"<td><div class='col-md-6'>"+
				    	"	<div class='stats-row'>"+
				    	"		<div class='stat-item stat-item-mini-chart' style='top:0px'>"+
				    	"			<div class='sparkline' data-type='bar' data-bar-color='red' data-height='30' data-bar-width='6' data-bar-spacing='2'>"+valor.gastosAjuste+"</div>"+
				    	"		</div>"+
				    	"	</div>"+
				    	"</div>" +
				    	"</td>"+
				    	"<td><div class='col-md-6'>"+
				    	"	<div class='stats-row'>"+
				    	"		<div class='stat-item stat-item-mini-chart' style='top:0px'>"+
				    	"			<div class='sparkline' data-type='bar' data-bar-color='yellow' data-height='30' data-bar-width='6' data-bar-spacing='2'>"+valor.siniestros+"</div>"+
				    	"		</div>"+
				    	"	</div>"+
				    	"</div>" +
				    	"</td>"+
				    	"<td><div class='col-md-6'>"+
				    	"	<div class='stats-row'>"+
				    	"		<div class='stat-item stat-item-mini-chart' style='top:0px'>"+
				    	"			<div class='sparkline' data-type='bar' data-bar-color='gray' data-height='30' data-bar-width='6' data-bar-spacing='2'>"+valor.certificados+"</div>"+
				    	"		</div>"+
				    	"	</div>"+
				    	"</div>" +
				    	"</td>"+
				    	"<td><div class='col-md-6'>"+
				    	"	<div class='stats-row'>"+
				    	"		<div class='stat-item stat-item-mini-chart' style='top:0px'>"+
				    	"			<div class='sparkline' data-type='bar' data-bar-color='#f0b518' data-height='30' data-bar-width='6' data-bar-spacing='2'>"+valor.polizas+"</div>"+
				    	"		</div>"+
				    	"	</div>"+
				    	"</div>" +
				    	"</td></tr>";
    		graficaGeneral = graficaGeneral + grafica +"</tr>";
    	});
    	
    	$(graficaGeneral).appendTo("#info");
    }
    cargaInfoTabla();
    pageLoad();
    
    SingApp.onPageLoad(pageLoad);
});