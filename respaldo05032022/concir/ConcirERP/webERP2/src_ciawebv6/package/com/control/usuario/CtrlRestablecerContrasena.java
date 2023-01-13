/*     */ package com.control.usuario;
/*     */ 
/*     */ import com.dao.EventManager;
/*     */ import com.dao.util.HibernateUtil;
/*     */ import com.entity.Liusuarios;
///*     */ import com.entity.VistaMensaje;
/*     */ import com.sql.EmailsSql;
/*     */ import com.sql.SQLUsuarios;
/*     */ import com.util.EncriptadoSimple;
/*     */ import com.util.Utilities;
/*     */ import com.util.email.MailHelper;
/*     */ import com.util.email.PropertiesLoader;
/*     */ import java.io.IOException;
/*     */ import java.io.PrintWriter;
/*     */ import java.util.Hashtable;
/*     */ import java.util.List;
/*     */ import java.util.Properties;
/*     */ import java.util.Vector;
/*     */ import javax.mail.Address;
/*     */ import javax.mail.internet.InternetAddress;
/*     */ import jakarta.servlet.ServletException;
/*     */ import jakarta.servlet.http.HttpServlet;
/*     */ import jakarta.servlet.http.HttpServletRequest;
/*     */ import jakarta.servlet.http.HttpServletResponse;
/*     */ 
/*     */ public class CtrlRestablecerContrasena extends HttpServlet
/*     */ {
/*  30 */   private static Properties props = PropertiesLoader.loadInstance();
/*  31 */   EventManager objEventManager = new EventManager();
/*  32 */   EncriptadoSimple objEncriptado = new EncriptadoSimple();
/*     */ 
/*     */   protected void processRequest(HttpServletRequest request, HttpServletResponse response)
/*     */     throws ServletException, IOException
/*     */   {
/*  43 */     response.setContentType("text/html;charset=UTF-8");
/*  44 */     PrintWriter out = response.getWriter();
/*  45 */     String strJson = "{success: false,msg: 'La información es incorrecta verifique sus datos.'}";
/*     */     try {
/*  47 */       String valorRadio = ""; String email = ""; String usuario = "";
/*  48 */       valorRadio = Utilities.obtenParametro(request, "rd_CRM01_6");
/*  49 */       email = Utilities.obtenParametro(request, "email");
/*  50 */       usuario = Utilities.obtenParametro(request, "nameusuario");
/*  51 */       String wnd = Utilities.obtenParametro(request, "wnd");
/*  52 */       if (valorRadio.equals("Si"))
/*  53 */         out.print(enviarContrasena(email, wnd));
/*  54 */       else if (valorRadio.equals("No"))
/*  55 */         out.print(enviarUsuario(usuario, wnd));
/*     */     }
/*     */     finally {
/*  58 */       out.close();
/*  59 */       HibernateUtil.closeSession();
/*     */     }
/*     */   }
/*     */ 
/*     */   protected void doGet(HttpServletRequest request, HttpServletResponse response)
/*     */     throws ServletException, IOException
/*     */   {
/*  74 */     processRequest(request, response);
/*     */   }
/*     */ 
/*     */   protected void doPost(HttpServletRequest request, HttpServletResponse response)
/*     */     throws ServletException, IOException
/*     */   {
/*  87 */     processRequest(request, response);
/*     */   }
/*     */ 
/*     */   public String getServletInfo()
/*     */   {
/*  96 */     return "Short description";
/*     */   }
/*     */ 
/*     */   public String enviarContrasena(String email, String idWnd) {
/* 100 */     String strJson = "{success: false,msg: 'La información es incorrecta verifique sus datos.'}";
/*     */     try {
/* 102 */       String nombreUsuario = ""; String apellido = ""; String correo = ""; String alias = ""; String contrasena = ""; String Mfrom = ""; String Msubject = "";
/* 103 */       Integer a = Integer.valueOf(3);
/* 104 */       MailHelper mhelper = new MailHelper(props);
/* 105 */       Hashtable hash = new Hashtable(0);
/* 106 */       hash.clear();
/* 107 */       Hashtable mensaje = new Hashtable(0);
/* 108 */       mensaje.clear();
/* 109 */       Vector params = new Vector(0);
/* 110 */       params.add(email);
/* 111 */       Vector parametro = new Vector(0);
/* 112 */       parametro.add(a);
/* 113 */       List usuarioAux = EventManager.getArrayParameter(SQLUsuarios.obtenerNombreUsuario(), params);
/* 114 */       Liusuarios usrU = (Liusuarios)usuarioAux.get(0);
/*       nombreUsuario = usrU.getUNombre() + " " + usrU.getUApellidoPaterno() + " " + usrU.getUApellidoMaterno();
       correo = usrU.getUCorreoElectronico();
     alias = usrU.getUUsuario();
     contrasena = EncriptadoSimple.ClaveToString(usrU.getUPassword());
       List configMesaje = EventManager.getArrayParameter(EmailsSql.qryMensajeConfigCorreo(), parametro);
      VistaMensaje objMensaje = (VistaMensaje)configMesaje.get(0);
      Mfrom = objMensaje.getVmFromEmail();
       Msubject = objMensaje.getVmSubject();
 */       mensaje.put("to", correo);
/* 124 */       mensaje.put("mensaje", "<table><tr><td>Estimado " + nombreUsuario + " </td></tr><tr><td>De acuerdo a tu solicitud te hacemos llegar su nombre de usuario para acceder a <strong>Siempre a tu Lado.</strong></td></tr><tr><td><strong>nombre de usuario: " + alias + "</strong></td></tr><tr><td>&nbsp;</td></tr><tr><td>Nota: La información contenida en este mensaje así como  cualquier archivo dentro de él, es confidencial y queda restringida Ãºnicamente  para el uso de las personas o entidades a las cuales es dirigido.</td></tr></table>");
/* 125 */       mensaje.put("from", Mfrom);
/* 126 */       mensaje.put("subject", Msubject);
/*     */ 
/* 128 */       Address from = new InternetAddress((String)mensaje.get("from"));
/* 129 */       Address to = new InternetAddress((String)mensaje.get("to"));
/* 130 */       hash.put("mensaje", mensaje.get("mensaje"));
/* 131 */       hash.put("subject", mensaje.get("subject"));
/* 132 */       hash.put("from", from);
/* 133 */       hash.put("to", to);
/* 134 */       if (mhelper.sendmail(hash))
/* 135 */         strJson = "{success: true,msg: 'Su solicitud a sido exitosa, se ha enviado un mensaje al siguiente correo " + correo + ".',wnd:'" + idWnd + "'}";
/*     */     }
/*     */     catch (Exception ex) {
/* 138 */       strJson = "{success: false,msg: 'No tenemos registrado ese correo o es incorrecto, verifique el correo.'}";
/*     */     }
/* 140 */     return strJson;
/*     */   }
/*     */ 
/*     */   public String enviarUsuario(String usuario, String idWnd)
/*     */   {
/* 145 */     String strJson = "{success: false,msg: 'La información es incorrecta verifique sus datos.'}";
/*     */     try {
/* 147 */       String nombreUsuario = ""; String apellido = ""; String correo = ""; String alias = ""; String contrasena = ""; String Mfrom = ""; String Msubject = "";
/* 148 */       int a = 4;
/* 149 */       MailHelper mhelper = new MailHelper(props);
/* 150 */       Hashtable hash = new Hashtable(0);
/* 151 */       hash.clear();
/* 152 */       Hashtable mensaje = new Hashtable(0);
/* 153 */       mensaje.clear();
/* 154 */       Vector params = new Vector(0);
/* 155 */       params.add(usuario);
/* 156 */       Vector paramt = new Vector(0);
/* 157 */       paramt.add(Integer.valueOf(a));
/* 158 */       List usuarioAux = EventManager.getArrayParameter(SQLUsuarios.obtenerContrasena(), params);
/*      Usuario usrU = (Usuario)usuarioAux.get(0);
       nombreUsuario = usrU.getUNombre() + " " + usrU.getUApellidoPaterno() + " " + usrU.getUApellidoMaterno();
       correo = usrU.getUCorreoElectronico();
      alias = usrU.getUUsuario();
       contrasena = EncriptadoSimple.ClaveToString(usrU.getUPassword());
       List configMesaje = EventManager.getArrayParameter(EmailsSql.qryMensajeConfigCorreo(), paramt);
      VistaMensaje objMensaje = (VistaMensaje)configMesaje.get(0);
      Mfrom = objMensaje.getVmFromEmail();
      Msubject = objMensaje.getVmSubject();
/* 168 */       mensaje.put("to", correo);
/* 169 */       mensaje.put("mensaje", "<table><tr><td>Estimado " + nombreUsuario + " </td></tr><tr><td>De acuerdo a tu solicitud te hacemos llegar su contraseÃ±a para acceder a <strong>Siempre a tu Lado.</strong></td></tr><tr><td><strong>su contraseÃ±a es la siguiente: " + contrasena + "</strong></td></tr><tr><td>&nbsp;</td></tr><tr><td>Nota: La información contenida en este mensaje así como  cualquier archivo dentro de él, es confidencial y queda restringida Ãºnicamente  para el uso de las personas o entidades a las cuales es dirigido.</td></tr></table>");
/* 170 */       mensaje.put("from", Mfrom);
/* 171 */       mensaje.put("subject", Msubject);
/* 172 */       Address from = new InternetAddress((String)mensaje.get("from"));
/* 173 */       Address to = new InternetAddress((String)mensaje.get("to"));
/* 174 */       hash.put("mensaje", mensaje.get("mensaje"));
/* 175 */       hash.put("subject", mensaje.get("subject"));
/* 176 */       hash.put("from", from);
/* 177 */       hash.put("to", to);
/* 178 */       if (mhelper.sendmail(hash))
/* 179 */         strJson = "{success: true,msg: 'Su solicitud a sido exitosa, se ha enviado un mensaje al siguiente correo " + correo + ".',wnd:'" + idWnd + "'}";
/*     */     }
/*     */     catch (Exception ex) {
/* 182 */       strJson = "{success: false,msg: 'La información es incorrecta verifique sus datos.'}";
/*     */     }
/* 184 */     return strJson;
/*     */   }
/*     */ }

