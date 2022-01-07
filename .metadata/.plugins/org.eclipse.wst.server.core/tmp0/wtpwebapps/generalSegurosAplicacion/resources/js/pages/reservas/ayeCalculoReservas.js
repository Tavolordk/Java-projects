
$(document).ready(function () {
	const $btnExportar = document.querySelector("#exportarIndicadoresBtn"),
	 $tabla = document.querySelector("#datatableIndicadores");

	$btnExportar.addEventListener("click", function() {
	    /*let tableExport = new TableExport($tabla, {
	        exportButtons: false, // No queremos botones
	        filename: "Principales Indicadores", //Nombre del archivo de Excel
	        sheetname: "Indicadores", //Título de la hoja
	    });
	    let datos = tableExport.getExportData();
	    let preferenciasDocumento = datos.tabla.csv;
	    tableExport.export2file(preferenciasDocumento.data, preferenciasDocumento.mimeType, preferenciasDocumento.filename, preferenciasDocumento.fileExtension, preferenciasDocumento.merges, preferenciasDocumento.RTL, preferenciasDocumento.sheetname);
	*/
		//exportTableToExcel('datatableIndicadores2','El primero');
		tableToExcel('datatableIndicadores2','ExportName');
	});
	
	function exportTableToExcel(tableID, filename = ''){
	    var downloadLink;
	    var dataType = 'application/vnd.ms-excel';
	    var tableSelect = document.getElementById(tableID);
	    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
	    
	    // Specify file name
	    filename = filename?filename+'.xls':'excel_data.xls';
	    
	    // Create download link element
	    downloadLink = document.createElement("a");
	    
	    document.body.appendChild(downloadLink);
	    
	    if(navigator.msSaveOrOpenBlob){
	        var blob = new Blob(['ufeff', tableHTML], {
	            type: dataType
	        });
	        navigator.msSaveOrOpenBlob( blob, filename);
	    }else{
	        // Create a link to the file
	        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
	    
	        // Setting the file name
	        downloadLink.download = filename;
	        
	        //triggering the function
	        downloadLink.click();
	    }
	}
	
		
});

var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office"'+ 
        			'xmlns:x="urn:schemas-microsoft-com:office:excel" '+
        			'xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
        , base64 = function (s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        }
        , format = function (s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) {
                return c[p];
            })
        };
    return function (table, name) {
        if (!table.nodeType) table = document.getElementById(table);
        var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML};
        window.location.href = uri + base64(format(template, ctx));
    }
})();