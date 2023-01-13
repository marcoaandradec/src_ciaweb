/*
 * log.java
 *
 * Created on 29 de noviembre de 2006, 11:16 PM
 */

package com.util.transferencia;
import java.io.File;
import java.util.Properties;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
// Importa las clase de log4j
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
/**
 *
 * @author  Jorge Luis Martinez Alfonso
 */
public class Jlog {
    private String clase=null;
    private String archivo_log=null;
    private String archivo_propertis=null;
    private static Logger logger=null;
    private String path=null;
    private String directorio_propertis=null;
    private String directorio_log=null;
    private final String ARCHIVO_LOG="info_server.log";
    private final String CARPETA_LOGS="log";
    private final String ARCHIVO_PROPERTIES="log4j.properties";
    private final String CARPETA_PROPERTIES="properties";
    /** Constructor de JLog por default */
    public Jlog(String clase,String real_path) {
        this.setClase(clase);
        this.setLogger(clase);
        this.setRealPath(real_path);
    }
    /**Metodo que asigna el directorio que contendra al archivo log
     * @param directorio directorio donde se encuentra el log*/
    private void setDirectorioLog(String directorio) {
        String separador_SO=System.getProperty("file.separator");
        this.directorio_log=this.getRealPath()+directorio+separador_SO;
    }
    /**Metodo que regresa todo el  path donde se encuentra el directorio de los logs*/
    public String getDirectorioLog() {
        return  this.directorio_log;
    }
    /**Metodo que asigna el directorio del archivo propertis para configuracion del logger
     *@params String directorio
     **/
    private void setDirectorioProperties(String directorio) {
        String separador_SO=System.getProperty("file.separator");
        this.directorio_propertis=directorio+separador_SO;
    }
    /**Metodo que devuelve el path del directorio de properties */
    public String getDirectorioProperties() {
        return  this.getRealPath()+this.directorio_propertis;
    }
    /**Metodo para asignar el path o contexto donde se encuetra la aplicacion web en curso */
    private void setRealPath(String path) {
        this.path=path;
    }
    /**Metodo para obtener el contexto de la aplicacion WEB */
    public String getRealPath() {
        return this.path;
    }
    /** Metodo que se le asigna la clase al logger
     * @param clase nombre de la clase donde se generara el log */
    private static void setLogger(String clase) {
        logger=Logger.getLogger(clase);
    }
    /** Metodo que devuelve un logger para crear el nivel de mensaje ERROR,WARN,IFO,DEBUG */
    public static Logger getLogger() {
        return logger;
    }
    /** Metodo que se le asigna la clase
     * @param clase nombre de la clase donde se generara el log */
    private void setClase(String clase) {
        this.clase=clase;
    }
    /** Metodo que devuelve la clase en cual se va generar el log */
    public String getClase() {
        return this.clase;
    }
    /** Metodo que se le asigna el archivo que contendra los niveles de mensaje y generara un archivo con extension .log
     * @param archivo nombre del archivo que contendra los logs generados*/
    private void setArchivoLog(String archivo) {
        Properties p = new Properties();
        try {
            p.load(new FileInputStream(this.getDirectorioProperties()+this.getArchivoProperties()));
            
            String file=this.getDirectorioLog()+archivo;
            p.setProperty("log4j.appender.archivo.File",file);
            FileOutputStream out = new FileOutputStream(this.getDirectorioProperties()+this.getArchivoProperties());
            p.store(out, "Archivo de configuracion LOG4J");
        }catch(FileNotFoundException e){   System.out.println(e);  }
        catch(IOException e){System.out.println(e);}
    }
    /** Metodo que devuelve la ruta y el archivo que se genero con extension .log */
    public String getArchivoLog() {
        Properties p = new Properties();
        try   {
            p.load(new FileInputStream(this.getDirectorioProperties()+this.getArchivoProperties()));
            return p.getProperty("log4j.appender.archivo.File");
        }catch(FileNotFoundException e){   System.out.println(e);  }
        catch(IOException e){System.out.println(e);}
        return "no se encontro archivo log ";
    }
    /** Metodo que se le asigna el archivo con extension .properties donde estan las propiedades para genrar el log
     * @param file nombre del archivo que contendra las propiedades para generar el log*/
    private void setArchivoProperties(String file) {
        this.archivo_propertis=file;
    }
    /** Metodo que devuelve el nombre del archivo con extension .properties que genera el log */
    public String getArchivoProperties() {
        return this.archivo_propertis;
    }
    /**Metodo que inicializa por defecto valores de configuracion del logger*/
    public void setConfigurartorDefault() {
        this.setDirectorioProperties(CARPETA_PROPERTIES);
        this.setArchivoProperties(ARCHIVO_PROPERTIES);
        this.setDirectorioLog(CARPETA_LOGS);
        this.setArchivoLog(ARCHIVO_LOG);
        this.setPropertyConfigurartor();
        
    }
    /**Metodo que inicializa configuracion de logger mediante un archivo de properties ya existente cargando.
     * @param archivo_properties nombre del archivo properties*/
    public void setConfigurartorDefaultByArchivoProperties(String archivo_properties) {
        setConfigurartorDefault(CARPETA_PROPERTIES,archivo_properties,CARPETA_LOGS,ARCHIVO_LOG);
        
    }
    /**Metodo que inicializa configuracion y creara un archivo de log con el nombre que le indiquemos.
     * @param archivo_log nombre del archivo log*/
    public void setConfigurartorDefaultByArchivoLOG(String archivo_log) {
        setConfigurartorDefault(CARPETA_PROPERTIES,ARCHIVO_PROPERTIES,CARPETA_LOGS,archivo_log);
        
    }
    /**Metodo para inializar con algun directorio diferente al default para los logs
     * @param directorio_log directorio a cambiar*/
    public void setConfigurartorDefaultByDirectorioLOG(String directorio_log) {
        setConfigurartorDefault(CARPETA_PROPERTIES,ARCHIVO_PROPERTIES,directorio_log,ARCHIVO_LOG);
        
    }
    /**Metodo para inializar con algun directorio y archivo diferente  a los default para los logs
     * @param directorio_log directorio a cambiar
     * @param archivo_log archivo a cambiar*/
    public void setConfigurartorDefaultByDirectorioLOG_AND_ArchivoLOG(String directorio_log,String archivo_log) {
        setConfigurartorDefault(CARPETA_PROPERTIES,ARCHIVO_PROPERTIES,directorio_log,archivo_log);
        
    }
    /**Metodo que inicializa  4 valores, 2 de carpetas(properties,logs) y 2 de archivos(file.properties,file.log) para la configuracion del logger. Se debe tener en cuenta que los nombres de los directorios y archivos deben exitir.
     * @param carpeta_properties nombre de directorio donde se encuentra el archivo properties para la configuracion del logger
     * @param archivo_properties nombre del archivo properties
     * @param carpeta_log nombre directorio donde se creara el log
     * @param archivo_log nombre del archivo que contendra los logs generados*/
    public void setConfigurartorDefault(String carpeta_properties,String archivo_properties,String carpeta_log,String archivo_log) {
        this.setDirectorioProperties(carpeta_properties);
        this.setArchivoProperties(archivo_properties);
        this.setDirectorioLog(carpeta_log);
        this.setArchivoLog(archivo_log);
        this.setPropertyConfigurartor();
        
    }
    /**Metodo que crea la configuracion del logger mediante un archivo properties*/
    private void setPropertyConfigurartor() {
        String file=this.getDirectorioProperties()+this.getArchivoProperties();
        if(file == null || file.length() == 0 || !(new File(file)).isFile()) {
            System.err.println("ERROR: No puede leer el archivo "+file+" de configuración. ");
        }
        else
            PropertyConfigurator.configure(file);
    }
}
