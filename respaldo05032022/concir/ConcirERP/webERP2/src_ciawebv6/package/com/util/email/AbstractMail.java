/*
 * AbstractMail.java
 *
 * Created on 9 de marzo de 2005, 04:09 PM
 */

package com.util.email;
import java.util.*; 
import java.sql.*;
import javax.mail.*;
/**
 *
 * @author  Ing. Raúl Orozco Rosas
 */
public abstract class AbstractMail {
    
    /** Creates a new instance of AbstractMail */

        protected String host = "",usr = "",pass = "";
        protected Properties propsmail;
        
    protected AbstractMail(Properties props) {
        propsmail = new Properties();
        propsmail.putAll(props);
       // if(props.containsKey("mail.smtp.host"))   host = props.getProperty("mail.smtp.host"); //host servidor mail
       // if(props.containsKey("user"))   usr = props.getProperty("user"); //Usuario server mail
           // if(props.containsKey("password"))   pass = props.getProperty("password"); //Password server mail
    }
    public abstract Session getSession(); 
     //public abstract boolean testConnection(); 
}
