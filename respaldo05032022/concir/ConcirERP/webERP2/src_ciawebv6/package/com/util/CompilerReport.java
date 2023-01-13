/*
 * CompilerReport.java
 *
 * Created on 1 de abril de 2008, 01:15 PM
 *
 * To change this template, choose Tools | Template Manager
 * and open the template in the editor.
 */
package com.util;

/**
 *
 * @author daguilar
 */
import com.dao.jdbc.MysqlDao;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
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
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.engine.fill.JREvaluator;



public final class CompilerReport extends MysqlDao {


    /** Creates a new instance of CompilerReport */
    private Connection conn = null;
//    private final String driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
//    private final String url = "jdbc:sqlserver://201.122.85.83:1433;databaseName=Sanofi";
//    private final String root = "sa";
//    private final String pass = "Sqlserver2008";
    private String path = "";
    private String urlFile = "";
    private int bytes=0;
    MysqlDao mcd = new MysqlDao();

    public CompilerReport() {
    }

//    private void getConnection() {
//
//        try {
//            Class.forName(driver);
//        } catch (ClassNotFoundException e) {
//            System.out.println("SQL JDBC Driver not found." + e.getMessage());
//
//        }
//        try {
//            conn = DriverManager.getConnection(url, root, pass);
//        } catch (SQLException e) {
//            System.out.println("Error de conexión: " + e.getMessage());
//
//        } catch (Throwable e) {
//            System.out.println("Error de conexión: " + e.getMessage());
//            e.printStackTrace();
//        }
//
//    }

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
    public void getPDF(Map parameters) {
        try {
            conn = getConnection();
            JasperReport report = JasperCompileManager.compileReport(this.path);
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
    
    public static void main(String [ ] args)
{

        CompilerReport nn=new CompilerReport();
    nn.getTextFile();
    }


    
    public String getTextFile() {
        String linea = "";
        String textoGeneral="";
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
                do   { linea=entrada.readLine();
                if (linea==null) {
                    break;
                }
                textoGeneral+=linea;
                }while (linea != null);
                entrada.close();
            } catch (IOException ex) {
                entrada = null;
                ex.printStackTrace();
            }
        }
        return textoGeneral;
    }

    public boolean getHTML(Map parameters) {
        boolean bandera;

        String html="";

        try {
            conn = getConnection();
            File archivo = new File(this.urlFile);
            if (archivo.exists()) {
                archivo.delete();
            }
            JasperReport report = JasperCompileManager.compileReport(this.path);
            JasperPrint print = JasperFillManager.fillReport(report, parameters, this.conn);
            int a = JasperExportManager.exportReportToXml(print).length();
            JasperExportManager.exportReportToHtmlFile(print, this.urlFile);
            bandera=true;

        } catch (Throwable e) {
            e.printStackTrace();
            System.out.println("Method getHTML: \n"+e);
            bandera=false;
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

    public void getEXCEL(Map parameters) {
        try {
            conn = getConnection();
            File archivo = new File(this.urlFile);
            if (archivo.exists()) {
                archivo.delete();
            }
            JasperReport report = JasperCompileManager.compileReport(this.path);
            JasperPrint print = JasperFillManager.fillReport(report, parameters, this.conn);
            JExcelApiExporter xlsExporter = new JExcelApiExporter();
            xlsExporter.setParameter(JRExporterParameter.JASPER_PRINT,print);
            xlsExporter.setParameter(JRXlsExporterParameter.IS_ONE_PAGE_PER_SHEET,Boolean.TRUE);
            xlsExporter.setParameter(JRExporterParameter.OUTPUT_FILE_NAME,this.urlFile);
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

    public void viewExcel(HttpServletResponse response, Map parameters) {
        ServletOutputStream out = null;
        try {
            out = response.getOutputStream();
            this.getEXCEL(parameters);
            InputStream in = new FileInputStream(this.urlFile);
            byte[] buffer = new byte[2048];
            StringBuffer sbNombreArchivo = new StringBuffer();
            java.text.SimpleDateFormat formatterTx = new java.text.SimpleDateFormat("yyyy-MM-dd");
            String strFechaNombre = formatterTx.format(new java.util.Date());
            sbNombreArchivo.append("SATLSA");
            sbNombreArchivo.append(".xls");
            response.setContentType("application/vnd.ms-excel");
            response.setHeader("Content-Disposition", "attachment; filename=" + sbNombreArchivo.toString());
            while (true) {
                int n = in.read(buffer);
                if (n < 0) {
                    break;
                }
                out.write(buffer);
            }
        } catch (Exception e) {
            System.out.println("Metod viewExcel 1:\n");
            System.out.println(e);
            e.printStackTrace();
        } finally {
            this.closeConnection();
            try {

                out.close();
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
    public int validarReporte(Map parameters){
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
