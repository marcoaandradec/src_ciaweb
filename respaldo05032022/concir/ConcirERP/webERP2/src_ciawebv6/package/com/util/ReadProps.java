/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.util;

/**
 *
 * @author gespinosa
 */
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ReadProps {

    /**
     * Creates a new instance of ReadProps
     */
    ContextPathServer cps = new ContextPathServer();
    String realContextPath = cps.getContextPath();

    public ReadProps() {
    }

    public Properties config(String nameProps) {
        Properties prop = new Properties();
        try {
            InputStream in = getClass().getResourceAsStream(nameProps);
            prop.load(in);
            in.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return prop;
    }

    public String getValueProp(String key) throws IOException {
        Properties props = new Properties();
        String strValue = "";
        InputStream in;
        try {
            in = new java.io.FileInputStream(realContextPath + "WEB-INF/Classes/com/util/config.properties");
            props.load(in);            
            strValue = props.getProperty(key);
            in.close();
        } catch (FileNotFoundException ex) {
            Logger.getLogger(ReadProps.class.getName()).log(Level.SEVERE, null, ex);
        }
        return strValue;
    }
}
