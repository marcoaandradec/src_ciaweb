/*
 * EmailMsgDAO.java
 *
 * Created on 20 de octubre de 2006, 12:42 PM
 */

package com.dao;
import com.dao.jdbc.*;
import com.sql.EmailsSql;
import java.util.*;
import java.sql.*;
import com.util.email.jmailmain;

/**
 *
 * @author  Marco Andrade
 */
public class EmailMsgDao extends DaoHelper{
    

    
    /** Creates a new instance of EmailMsgADO */
    public EmailMsgDao() {

    }
    /*
     * @Params Vector con los parámetros para la consulta, int con el número de consulta que se requeire
     * @Return Un ArrayList con Hashtables que contienen cada uno de los registros de la consulta
     */
    public ArrayList getArray (Vector params){
        ArrayList array  = new ArrayList(0);
        array.clear();
        try{ 
            array = getResultTable(EmailsSql.qryVarSust(),params);
            return array;
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;       
    }
    /*
     * @Params Vector con los parámetros para la consulta, int con el número de consulta que se requeire
     * @Return Hashtable con los datos del registro que se requiere
     */
    public Hashtable getRegistro(Vector params){
        Hashtable h =null;
        ArrayList array  = new ArrayList(0);
        array.clear();
        try{
            array = getResultTable(EmailsSql.qryMensajeSust(),params);
            if(array.size()>0){
                h = (Hashtable)array.get(0);
            }
            return h;
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }
    /*Función que envía un correo electrónico con campos que no se encuentran en la base de datos
     *@Params String    str_clv    Clave del mensaje a mandar
     *@Params Hashtable hash       con todos los campos que no estan en la base de datos y que son parte del mensaje
     *@Params Vector    params_reg Parámetros para la consulta del mensaje, para los campos que si se encuentran en la base de datos
     *@Params String    str_email  Correo electrónico destino
     */
    public void enviaMensaje(String str_clv,Hashtable hash,Vector params_reg,String str_email){
        Vector params = new Vector(0);
        params.clear();
        params.add(str_clv);
        Hashtable  msg   = getRegistro(params);
        if(msg != null){
            params.clear();
            params.add(msg.get("clvmensaje"));
            ArrayList  array_var   = getArray(params);
            Hashtable  email;
            if(params_reg!=null)
                email = this.getMensajeSust(params_reg,msg,array_var);
            else
                email = msg;
            if(email!=null){
                String str_msg = (String)email.get("mensaje");
                String str_sub = (String)email.get("subject");
                for(int i=0;i<array_var.size();i++){
                    Hashtable hash_aux = (Hashtable)array_var.get(i);
                    if(hash.get((String)hash_aux.get("registro_var"))!=null){
                        str_msg = str_msg.replaceAll((String)hash_aux.get("nombre_var"),(String)hash.get((String)hash_aux.get("registro_var")));
                        str_sub = str_sub.replaceAll((String)hash_aux.get("nombre_var"),(String)hash.get((String)hash_aux.get("registro_var")));
                    }
                }
                email.put("subject", str_sub);
                email.put("mensaje", str_msg);
                if(str_email!=null)
                    email.put("to",str_email);
                Thread jm = new jmailmain(email);
                jm.start();
            }
        }  
    }
    /*Función que envía un correo electrónico
     *@Params String str_clv    Clave del mensaje a mandar
     *@Params Vector params_reg Parámetros para la consulta del mensaje
     */
    public void enviaMensaje(String str_clv, Vector params_reg){
        Vector params = new Vector(0);
        params.clear();
        params.add(str_clv);
        Hashtable  msg   = getRegistro(params);
        if(msg != null){
            params.clear();
            params.add(msg.get("clvmensaje"));
            ArrayList  var   = getArray(params);
            Hashtable  email = this.getMensajeSust(params_reg,msg,var);
            if(email!=null){
                Thread jm = new jmailmain(email);
                jm.start();
            }
        }
    }
    /*
     * @Params String    clvReg  Clave o identificador del registro o usuario, necesario para el query del perfil del mensaje
     *         Hashtable email   Correo ha ser mandado
     *         ArrayList var     Lista con los valores a ser sustituidos en el mensaje
     */
    public Hashtable getMensajeSust(Vector params,Hashtable email,ArrayList var){
       ResultSet rs;
       String mensaje = (String)email.get("mensaje");
       String subject = (String)email.get("subject");
       try{
           ArrayList array = getResultTable((String)email.get("cons"),params);
           Hashtable m = (Hashtable)array.get(0);
           for(int i=0;i<var.size();i++){
                Hashtable hash = (Hashtable)var.get(i);
                if(m.get((String)hash.get("registro_var"))!=null){
                    mensaje = mensaje.replaceAll((String)hash.get("nombre_var"),(String)m.get((String)hash.get("registro_var")));
                    subject = subject.replaceAll((String)hash.get("nombre_var"),(String)m.get((String)hash.get("registro_var")));
                }
           }
           email.put("mensaje",mensaje);
           email.put("subject",subject);
           if(m.get("email_alterno")!=null && !((String)m.get("email_alterno")).equals(""))
               email.put("to",m.get("email_alterno"));
           else
               if(m.get("email")!=null)
                   email.put("to",m.get("email"));
           return email;
       }catch(Exception e){
           e.printStackTrace();
       }
       return null;
    }
    
    
 
    
    
}
