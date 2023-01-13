package com.util.email;

import javax.mail.internet.*;
import javax.mail.*;
import java.util.*;

public class jmailmain extends Thread {

    private static Properties props = PropertiesLoader.loadInstance();
    Hashtable h = new Hashtable();

    /** Creates a new instance of jmailmain */
    public jmailmain(Hashtable h) {
        this.h = h;
    }
    public jmailmain() {
        //this.h = h;
    }

    @Override
    public void run() {

        sendMail(h);

    }

    /**Envía un correo electrónico
     *@params Hashtable con los atributos del mail: from_email  mail que envía
     *                                              from_nombre nombre que envía
     *                                              to          mail al que se envía
     *                                              mensaje     contenido del mail
     *                                              subject     título del mail
     */
    public void sendMail(Hashtable h) {
        MailHelper mhelper = new MailHelper(props);
        Hashtable hash = new Hashtable(0);
        hash.clear();
        try {
            Address from = new InternetAddress((String) h.get("from_email"), (String) h.get("from_nombre"));
            if (h.get("to") instanceof String) {
                Address to = new InternetAddress((String) h.get("to"));
                hash.put("to", to);
                hash.put("mensaje", h.get("mensaje"));
                hash.put("subject", h.get("subject"));
                hash.put("from", from);
                System.out.println(mhelper.sendmail(hash));
            } else {
                hash.put("to", h.get("to"));
                hash.put("toC", h.get("toC"));
                hash.put("mensaje", h.get("mensaje"));
                hash.put("subject", h.get("subject"));
                hash.put("from", from);
                System.out.println(mhelper.sendmails(hash));
            }



        } catch (Exception ex) {
            System.out.println(ex.toString());
        }
        // REFERENCIA http://www.programacion.com/java/tutorial/javamail/
    }

    public void sendMails(Hashtable h) {
        MailHelper mhelper = new MailHelper(props);
        Hashtable hash = new Hashtable(0);
        hash.clear();
        try {
            Address from = new InternetAddress((String) h.get("from_email"), (String) h.get("from_nombre"));
            Address to = new InternetAddress((String) h.get("to"));
            hash.put("mensaje", h.get("mensaje"));
            hash.put("subject", h.get("subject"));
            hash.put("from", from);
            hash.put("to", to);
            System.out.println(mhelper.sendmail(hash));
        } catch (Exception ex) {
            System.out.println(ex.toString());
        }
        // REFERENCIA http://www.programacion.com/java/tutorial/javamail/
    }
    /*public static void main(String[] args) {
    MailHelper mhelper  = new MailHelper(props);
    Hashtable hash = new Hashtable(0);
    hash.put("mensaje","que onda");
    try{
    Address from = new InternetAddress("hola@mundo.com","hola");
    Address to = new InternetAddress("mruiz@pen.com.mx");
    hash.put("subject","correo proto");
    hash.put("from",from);
    hash.put("to",to);
    mhelper.sendmail(hash);
    //System.out.println(mhelper.sendmail(hash));
    }catch(Exception ex){
    System.out.println(ex.toString());
    }
    }*/
}
