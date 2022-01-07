package PruebasJasper.guardarPDF.FTCAcreedor;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.xml.JRXmlLoader;

public class FTCAcreedorparte6 {

	public static void main(String[] args) {
		String fileNameJrxml = "C:/Users/Tavol/JaspersoftWorkspace/MyReports/FTCAcreedor(1)parte6.jrxml";
		String fileNamePdf = "C:/resultado/FTCAcreedor/parte6.pdf";

		try{
		System.out.println("Cargando el archivo jrxml...");
		JasperDesign jasperDesign = JRXmlLoader.load(fileNameJrxml);
		System.out.println("Compilando el archivo jrxml a archivo JASPER...");
		JasperReport jasperReport = JasperCompileManager.compileReport(jasperDesign);
		String expedienteNum = "SMFDF4567";
		SimpleDateFormat formato = new SimpleDateFormat("dd-mm-yyyy");
		Date fechaInicio = formato.parse("05-10-2015");
		Date fechaFin = formato.parse("10-05-2021");
		 if (fechaInicio.after(fechaFin)) {  
	            System.out.println("La fecha inicio ocurre después de la fecha final"); 
	        } // el método compareTo devuelve el valor mayor que 0 si esta Fecha está después del argumento Fecha.  
	        else if (fechaInicio.equals(fechaFin)) {  
	            System.out.println("Ambas son las mismas fechas"); 
	        }
		Integer montoSeguro=46645654;
		Integer aseguradoPropuesto=23454;
		Date fechaDetentado=formato.parse("08-11-2016");
		String inmueble="Casa las lomas";
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("expedienteNum", expedienteNum);
		params.put("fechaInicio", fechaInicio);
		params.put("fechaFin", fechaFin);
		params.put("montoSeguro", montoSeguro);
		params.put("aseguradoPropuesto", aseguradoPropuesto);
		params.put("fechaDetentado", fechaDetentado);
		params.put("inmueble", inmueble);
		System.out.println("modificando parametros a archivo JASPER...");
		JasperPrint jprint = (JasperPrint) JasperFillManager.fillReport(jasperReport,params,new JREmptyDataSource());
		System.out.println("Exportando el archivo JASPER a PDF");
		JasperExportManager.exportReportToPdfFile(jprint,fileNamePdf);
		System.out.println("Guardado exitoso");
		}
		catch(Exception e)
		{
		  System.out.print("Exception: " + e);
		}

	}

}
