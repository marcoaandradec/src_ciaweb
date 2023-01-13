/*
 * MailDao.java
 *
 * Created on 10 de marzo de 2005, 10:15 AM
 */

package com.util.email;
import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;
/**
 *
 * @author  Chepehua
 */
public class MailDao extends AbstractMail {
    
    /** Creates a new instance of MailDao */
    public MailDao(Properties props) {
        super(props);
    }
    
    public final Session getSession(){
        
        Session  session = Session.getDefaultInstance(propsmail,null);
        
        return session;
    }
    
}
