/*
 * MailHelper.java
 *
 * Created on 10 de marzo de 2005, 10:35 AM
 */

package com.util.email;
import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;

/**
 *
 * @author  Ing. Raúl Orozco Rosas
 */
public class MailHelper extends MailDao{
    private Properties props;
    /** Creates a new instance of MailHelper */
    public MailHelper(Properties props) {
        super(props);
        this.props = props;
    }
    
    public final boolean sendmail(Hashtable mailhash){
        boolean verify = true;
        Session session  = getSession();
           try{
            MimeMessage mmssg = new MimeMessage(session);
            
            mmssg.setSubject(mailhash.get("subject").toString());
            mmssg.setFrom((Address)mailhash.get("from"));
            mmssg.addRecipient(Message.RecipientType.TO,(Address)mailhash.get("to"));
            mmssg.setSentDate(new Date()); 
            MimeMultipart multipart = new MimeMultipart(); 
            MimeBodyPart mbp = new MimeBodyPart(); 
            mbp.setContent(mailhash.get("mensaje").toString(), "text/html"); 
            multipart.addBodyPart(mbp); 
            mmssg.setContent(multipart); 
            Transport.send(mmssg);

        }catch( Exception e){
            e.printStackTrace();
            verify = false;
            }        
        return verify;
    }

    public final boolean sendmails(Hashtable mailhash){
        boolean verify = true;
        Session session  = getSession();
           try{
            MimeMessage mmssg = new MimeMessage(session);

            mmssg.setSubject(mailhash.get("subject").toString());
            mmssg.setFrom((Address)mailhash.get("from"));
            mmssg.addRecipients(Message.RecipientType.TO,(Address[])mailhash.get("to"));
            mmssg.addRecipient(Message.RecipientType.BCC, (Address)mailhash.get("toC"));
            mmssg.setSentDate(new Date());
            MimeMultipart multipart = new MimeMultipart();
            MimeBodyPart mbp = new MimeBodyPart();
            mbp.setContent(mailhash.get("mensaje").toString(), "text/html");
            multipart.addBodyPart(mbp);
            mmssg.setContent(multipart);
            Transport.send(mmssg);

        }catch( Exception e){
            e.printStackTrace();
            verify = false;
            }
        return verify;
    }
    
}
