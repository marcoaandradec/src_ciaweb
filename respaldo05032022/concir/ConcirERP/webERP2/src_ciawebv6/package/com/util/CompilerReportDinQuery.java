/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.util;

/**
 *
 * @author mandrade
 */
import com.dao.jdbc.MysqlDao;
import java.io.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperRunManager;

import net.sf.jasperreports.engine.export.JExcelApiExporter;
import net.sf.jasperreports.engine.export.JRXlsExporterParameter;

import java.sql.*;
import java.util.Map;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperCompileManager;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.ServletOutputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.File;
import java.io.FileReader;
import java.util.HashMap;
import jakarta.servlet.http.HttpSession;
import net.sf.jasperreports.engine.design.JRDesignQuery;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.engine.fill.JREvaluator;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
//clase de ireport con Consultas Dinamicas
public final class CompilerReportDinQuery extends MysqlDao {

//    private String pathFile;
//    private String diagonal;
//    private String pathXml;
    /** Creates a new instance of CompilerReport */
    private Connection conn = null;
    private String path = "";
    private String urlFile = "";
    private int bytes = 0;
    MysqlDao mcd = new MysqlDao();

    private void closeConnection() {
        try {
            conn.close();
        } catch (Exception ex) {
            System.out.println("Error de conexión: " + ex.getMessage());
        }
    }

    /*     Este método  exporta a HTML
     *
     */
    public void getPDF(Map parameters, String query) {
        try {
            conn = getConnection();
            JasperDesign jasperDesign = JRXmlLoader.load(this.path);
            JRDesignQuery newQuery = new JRDesignQuery();
            newQuery.setText(query);
            jasperDesign.setQuery(newQuery);
            JasperReport report = JasperCompileManager.compileReport(jasperDesign);
            JasperPrint print = JasperFillManager.fillReport(report, parameters, this.conn);
            JasperExportManager.exportReportToPdfFile(print, this.urlFile);
        } catch (Throwable e) {
            e.printStackTrace();
        } finally {
            this.closeConnection();
        }
    }

    /*     Este método  exporta a HTML
     *
     */
    public static void main(String[] args) {
//        CompilerReportDinQuery nn = new CompilerReportDinQuery();
//        String a = "select le.embestatus,le.embtiporechazo,le.embref,le.embenvio,le.embcliente,lc.clinombre,lp.pobclave,lp.pobnombre,le.embcajas,le.embvalor "
//                + " ,le.embfechafac,le.embfecharec,le.embfechaprog,le.embfecembarque,le.embfecentrega,le.embcoms,le.embfolio,le.embtiporechazo "
//                + " from Liembarques le,Liclientes lc,Lipoblaciones lp  "
//                + " where (lp.pobclave=le.embpoblacion) and (lc.clinumero=le.embcliente and lc.cliempresa=le.embempresa)  "
//                + " and (trunc(le.embfechafac) between trunc(to_date('01/05/2012')) and trunc(to_date('30/05/2012')))  "
//                + " and le.embempresa='207'  and le.embestatus = 'T' and le.embfecentrega is null order by le.embref ";
//        Map param = new HashMap();
//        ContextPathServer cps = new ContextPathServer();
//        String realContextPath = cps.getContextPath();
//        nn.setPath(realContextPath + "ReportesXML/Generales/report1.jrxml");
//        nn.setUrlFile(realContextPath + "ReportesCompilados/prueba.html");
//        nn.getHTML(null, a);
    }

    public String getTextFile() {
        String linea = "";
        String textoGeneral = "";
        File archivo = new File(this.urlFile);
        if (archivo.exists()) {
            BufferedReader entrada = null;
            try {

                entrada = new BufferedReader(new FileReader(archivo));
            } catch (FileNotFoundException ex) {
                entrada = null;
                ex.printStackTrace();
            }
            try {
                do {
                    linea = entrada.readLine();
                    if (linea == null) {
                        break;
                    }
                    textoGeneral += linea;
                } while (linea != null);
                entrada.close();
            } catch (IOException ex) {
                entrada = null;
                ex.printStackTrace();
            }
        }
        return textoGeneral;
    }

    public boolean getHTML(Map parameters, String query) {
        boolean bandera;

        String html = "";

        try {
            conn = getConnection();
            File archivo = new File(this.urlFile);
            if (archivo.exists()) {
                archivo.delete();
            }
            JasperDesign jasperDesign = JRXmlLoader.load(this.path);
            JRDesignQuery newQuery = new JRDesignQuery();
            newQuery.setText(query);
            jasperDesign.setQuery(newQuery);
            JasperReport report = JasperCompileManager.compileReport(jasperDesign);
            JasperPrint print = JasperFillManager.fillReport(report, parameters, this.conn);
            int a = JasperExportManager.exportReportToXml(print).length();
            JasperExportManager.exportReportToHtmlFile(print, this.urlFile);
            bandera = true;

        } catch (Throwable e) {
            e.printStackTrace();
            System.out.println("Method getHTML: \n" + e);
            bandera = false;
        } finally {
            this.closeConnection();

        }
        return bandera;
    }
    /*     Este método es interno y exporta a PDF en byte
     *
     */

    private byte[] getPDFbyte(Map parameters) {
        byte[] array_bytes = null;
        try {
            array_bytes = JasperRunManager.runReportToPdf(this.path, parameters, this.conn);

        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            this.closeConnection();
        }
        return array_bytes;
    }
    /*     Este método  exporta a Excel
     *
     */

    public void getEXCEL(Map parameters, String query) {
        try {
            conn = getConnection();
            File archivo = new File(this.urlFile);
            if (archivo.exists()) {
                archivo.delete();
            }
            JasperDesign jasperDesign = JRXmlLoader.load(this.path);
            JRDesignQuery newQuery = new JRDesignQuery();
            newQuery.setText(query);
            jasperDesign.setQuery(newQuery);
            JasperReport report = JasperCompileManager.compileReport(jasperDesign);
            JasperPrint print = JasperFillManager.fillReport(report, parameters, this.conn);
            JExcelApiExporter xlsExporter = new JExcelApiExporter();
            xlsExporter.setParameter(JRExporterParameter.JASPER_PRINT, print);
            xlsExporter.setParameter(JRXlsExporterParameter.IS_ONE_PAGE_PER_SHEET, Boolean.TRUE);
            xlsExporter.setParameter(JRExporterParameter.OUTPUT_FILE_NAME, this.urlFile);
            xlsExporter.setParameter(JRXlsExporterParameter.IS_DETECT_CELL_TYPE, Boolean.TRUE);
            xlsExporter.exportReport();
        } catch (Exception ex) {
            System.out.println("Metod getExcel:\n");
            ex.printStackTrace();
        } finally {
            this.closeConnection();
        }
    }

    /*     Este método  exporta a XML
     *
     */
    public void getExport(Map parameters) {
        try {
            conn = getConnection();
            JasperReport report = JasperCompileManager.compileReport(this.path);
            JasperPrint print = JasperFillManager.fillReport(report, parameters, this.conn);
            JasperExportManager.exportReportToXmlFile(print, this.urlFile, false);
        } catch (JRException ex) {
            ex.printStackTrace();
        } finally {
            this.closeConnection();
        }
    }
    /*asignando una ruta de trabjo
     * ubicacion del .jasper o jrxml
     *@param String path
     */

    public void setPath(String path) {
        this.path = path;
    }

    public String getPath() {
        return this.path;
    }
    /*
     *asignando la ruta del archivo a crear
     *@param String urlFile
     */

    public void setUrlFile(String urlFile) {
        this.urlFile = urlFile;
    }

    public String getUrlFile() {
        return this.urlFile;
    }
    /*     Este método exporta y muestra a un Excel
     *     @param HttpServletResponse response, Map parameters
     */

    public void viewExcel(HttpServletResponse response, Map parameters, String query, String Nombre) {

        try {
            this.getEXCEL(parameters, query);
            InputStream in = new FileInputStream(this.urlFile);
            byte[] buffer = new byte[2048];
            StringBuffer sbNombreArchivo = new StringBuffer();
            sbNombreArchivo.append(Nombre);
            sbNombreArchivo.append(".xls");
            response.setContentType("application/vnd.ms-excel");
            response.setHeader("Content-Disposition", "attachment; filename=" + Nombre);
            response.setBufferSize(response.getBufferSize());
            ServletOutputStream ouputStream = response.getOutputStream();
            int count = 0;
            while ((count = in.read(buffer)) >= 0) {
                ouputStream.write(buffer, 0, count);
            }
            in.close();
            ouputStream.flush();
            ouputStream.close();
        } catch (Exception e) {
            System.out.println("Metod viewExcel 1:\n");
            System.out.println(e);
            e.printStackTrace();
        } finally {
            this.closeConnection();
            try {
            } catch (Exception ex) {
                System.out.println("Metod viewExcel 2:\n");
                System.out.println(ex.getMessage());
            }
        }
    }

    /*     Este método exporta y muestra a un PDF
     *     @param HttpServletResponse response, Map parameters
     */
    public void viewPDFByte(HttpServletResponse response, Map parameters) {
        ServletOutputStream out = null;
        try {
            out = response.getOutputStream();
            byte[] buffer = this.getPDFbyte(parameters);
            out.write(buffer);
            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "attachment; filename=" + this.urlFile);

        } catch (Exception e) {
            System.out.println(e);
        } finally {
            this.closeConnection();
            try {
                out.close();
            } catch (Exception ex) {
                System.out.println(ex.getMessage());
            }
        }
    }

    /*     Este método exporta y muestra a un PDF
     *     @param HttpServletResponse response, Map parameters
     */
    public void viewPDF(HttpServletResponse response, Map parameters) {
        ServletOutputStream out = null;
        try {
            conn = getConnection();
            File archivo = new File(this.urlFile);
            if (archivo.exists()) {
                archivo.delete();
            }
            JasperReport report = JasperCompileManager.compileReport(this.path);
            JasperPrint print = JasperFillManager.fillReport(report, parameters, this.conn);
            JasperExportManager.exportReportToPdfFile(print, this.urlFile);

            if (archivo.exists()) {
                out = response.getOutputStream();
                byte[] buffer = new byte[1024];
                out.write(buffer);
                response.setContentType("application/pdf");
            }
        } catch (Exception e) {
            System.out.println(e);
        } finally {
            this.closeConnection();
            try {
                out.close();
            } catch (Exception ex) {
                System.out.println(ex.getMessage());
            }
        }
    }
    /// *
//OutputStream oStream = response.getOutputStream();
//response.setContentType("application/pdf");
//JasperExportManager.exportReportToPdfStream(print, oStream);

    public int validarReporte(Map parameters) {
        try {
            conn = getConnection();
            File archivo = new File(this.urlFile);
            if (archivo.exists()) {
                archivo.delete();
            }
            JasperReport report = JasperCompileManager.compileReport(this.path);
            JasperPrint print = JasperFillManager.fillReport(report, parameters, this.conn);
            bytes = JasperExportManager.exportReportToXml(print).length();
        } catch (Throwable e) {
            e.printStackTrace();
        } finally {
            this.closeConnection();
        }
        return bytes;
    }
}
