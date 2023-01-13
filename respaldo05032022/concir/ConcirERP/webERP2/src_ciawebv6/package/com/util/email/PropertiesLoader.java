package com.util.email;
//package JSP;

import com.util.ContextPathServer;
import java.util.*;
import java.io.*;

/**
 * Clase que toma valores del servidor de correo electrónico
 * @author Ing Raúl Orozco Rosas
 */
public class PropertiesLoader {
    
    
    public static Properties loadInstance(){
        ContextPathServer context= new ContextPathServer();
        Properties props = new Properties();
        String path = context.getContextPath()+"WEB-INF/classes/com/util/email/mail.properties";
        File file = new File(path);        
        if( file != null && file.exists() ) {
            try {
                props.load(new FileInputStream(file));            
            } catch ( Exception ex ) {
                System.out.println("Error al Cargar Propiedades de conexion");       
            }
        }
        else System.out.println("NO EXISTE mail.properties");
        return(props);
    } 
}