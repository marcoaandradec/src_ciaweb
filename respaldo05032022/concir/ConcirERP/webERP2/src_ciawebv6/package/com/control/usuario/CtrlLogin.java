/*     */ package com.control.usuario;
/*     */ 
/*     */ import com.dao.EventManager;
/*     */ import com.dao.util.HibernateUtil;
/*     */ import com.entity.Liadminmodulo;
/*     */ import com.entity.Liusuarios;
/*     */ import com.sql.SQLControl;
/*     */ import com.sql.SQLUsuarios;
/*     */ import com.util.Utilities;
/*     */ import java.io.IOException;
/*     */ import java.io.PrintWriter;
/*     */ import java.util.List;
/*     */ import java.util.Vector;
/*     */ import jakarta.servlet.ServletException;
/*     */ import jakarta.servlet.http.HttpServlet;
/*     */ import jakarta.servlet.http.HttpServletRequest;
/*     */ import jakarta.servlet.http.HttpServletResponse;
/*     */ import jakarta.servlet.http.HttpSession;
/*     */ 
/*     */ public class CtrlLogin extends HttpServlet
/*     */ {
/*     */   protected void processRequest(HttpServletRequest request, HttpServletResponse response)
/*     */     throws ServletException, IOException
/*     */   {
/*  39 */     response.setContentType("text/html;charset=ISO-8859-1");
/*  40 */     PrintWriter out = response.getWriter();
/*  41 */     String bnd = Utilities.obtenParametro(request, "bnd");
/*  42 */     if (bnd.equals("1"))
/*  43 */       out.print(obtenUsuarioValido(request, response));
/*  44 */     else if (bnd.equals("2"))
/*  45 */       out.print(obtenModulosUsuario((Liusuarios)request.getSession().getAttribute("usuario")));
/*  46 */     else if (bnd.equals("3"))
/*  47 */       out.print(obtenAccionesUsuario((Liusuarios)request.getSession().getAttribute("usuario")));
/*     */   }
/*     */ 
/*     */   protected void doGet(HttpServletRequest request, HttpServletResponse response)
/*     */     throws ServletException, IOException
/*     */   {
/*  62 */     processRequest(request, response);
/*     */   }
/*     */ 
/*     */   protected void doPost(HttpServletRequest request, HttpServletResponse response)
/*     */     throws ServletException, IOException
/*     */   {
/*  75 */     processRequest(request, response);
/*     */   }
/*     */ 
/*     */   public String getServletInfo()
/*     */   {
/*  84 */     return "Short description";
/*     */   }
/*     */ 
/*     */   public String obtenUsuarioValido(HttpServletRequest request, HttpServletResponse response) {
/*  88 */     String strJson = "{success: false,msg: 'El usuario no existe o la información es incorrecta.'}";
/*     */     try {
/*  90 */       String strTema = Utilities.obtenParametro(request, "tema");
/*     */ 
/*  92 */       HttpSession session = request.getSession(false);
/*  93 */       Liusuarios u = obtenUsuario(request);
/*  94 */       if (u != null)
/*     */       {
/*  96 */         session.setAttribute("modulos", obtenModulosUsuario(u));
/*  97 */         //agregarActividadUsuario(u);
/*  98 */         strJson = "{success:true, msg: 'El usuario es correcto',tema:'" + (strTema.equals("") ? "default" : strTema) + "'}";
/*     */       }
/*     */     } catch (Exception e) {
/* 101 */       strJson = "{success: false,msg: 'El usuario no existe o la información es incorrecta.'}";
/* 102 */       e.printStackTrace();
/*     */     } finally {
/* 104 */       HibernateUtil.closeSession();
/*     */     }
/* 106 */     return strJson;
/*     */   }
/*     */ 
/*     */   private Liusuarios obtenUsuario(HttpServletRequest request) {
/* 110 */     Liusuarios usrU = null;
/*     */     try {
/* 112 */       String strUsername = Utilities.obtenParametro(request, "usuario");
/* 113 */       String strPassword = Utilities.obtenParametro(request, "contrasena");
/*     */ 
/* 115 */       Vector vecUsr = new Vector();
/* 116 */       vecUsr.add(strUsername);
/* 117 */       vecUsr.add(strPassword);
/*     */ 
/* 119 */       List lstUsr = EventManager.getArrayParameter(SQLUsuarios.obtenUsuario(), vecUsr);
/* 120 */       if ((lstUsr != null) && 
/* 121 */         (!lstUsr.isEmpty()))
/* 122 */         usrU = (Liusuarios)lstUsr.get(0);
/*     */     }
/*     */     catch (Exception e)
/*     */     {
/* 126 */       e.printStackTrace();
/*     */     } finally {
/* 128 */       HibernateUtil.closeSession();
/*     */     }
/* 130 */     return usrU;
/*     */   }
/*     */ 
/*     */   private String obtenModulosUsuario(Liusuarios u) {
/* 134 */     String strModulos = "[{xtype:'label', text:'No tiene módulos asignados',style:'color:#fea438;font-weight:bold;'}]";
/*     */     try {
/* 136 */       if (u != null) {
/* 137 */         Vector vecPrm = new Vector();
/* 138 */         vecPrm.add(u.getUsuclave());
/* 139 */         List lstModulos = EventManager.getArrayParameter(SQLControl.obtenModulos(), vecPrm);
/* 140 */         if (!lstModulos.isEmpty()) {
/* 141 */           strModulos = "[{xtype:'label', text:'Módulos: ',style:'color:#fea438;font-weight:bold;'},";
/* 142 */           for (int i = 0; i < lstModulos.size(); i++) {
/* 143 */             Object[] obj = (Object[])(Object[])lstModulos.get(i);
/* 144 */             Liadminmodulo am = (Liadminmodulo)obj[0];
/* 145 */             strModulos = strModulos + "'-',{xtype:'button',text:'" + am.getAmnombremodulo() + "',enableToggle:'true',toggleGroup:'mdl',disabledClass:'x-btn-disabled-modulos'," + "     toggleHandler:function(btn,pressed){" + "         if(btn==this){" + "             if(pressed==true){" + "                 btn.disable();" + "                 setModuloAll(" + "                     'panelCentral'," + "                     new com.punto.pen.ContactCenter({" + "                         id:'pnlCC'," + "                         items:[" + "                             new com.punto.pen.TreePanel({id:'pnlTreeAcciones',url:contexto+'/Usuario',prm:{bnd:3},region:'west'})," + "                             {xtype:'panel',id:'pnlCenter',region:'center',layout:'fit'," + "                                 items:[" + "                                     new com.punto.pen.PanelBuscadorPaciente({" + "                                         id:'pnlBuscadorPaciente'" + "                                     })" + "                                 ]" + "                             }" + "                         ]" + "                     })" + "                 );" + "             }else{" + "                 btn.enable();" + "             }" + "         }" + "     }" + "},";
/*     */           }
/*     */ 
/* 174 */           strModulos = strModulos.substring(0, strModulos.length() - 1) + "]";
/*     */         }
/*     */       }
/*     */     } catch (Exception e) {
/* 178 */       e.printStackTrace();
/* 179 */       strModulos = "[{xtype:'label', text:'No tiene módulos asignados',style:'color:#fea438;font-weight:bold;'}]";
/*     */     } finally {
/* 181 */       HibernateUtil.closeSession();
/*     */     }
/* 183 */     return strModulos;
/*     */   }
/*     */ 
/*     */   private String obtenAccionesUsuario(Liusuarios u) {
/* 187 */     String strAcciones = "[{xtype:'label', text:'No tiene acciones asignadas',style:'color:#fea438;font-weight:bold;'}]";
/*     */     try {
/* 189 */       if (u != null) {
/* 190 */         Vector vecPrm = new Vector();
/* 191 */         vecPrm.add(u.getUsuclave());
/* 192 */         List lstModulos = EventManager.getArrayParameter(SQLControl.obtenAcciones(), vecPrm);
/* 193 */         if (!lstModulos.isEmpty()) {
/* 194 */           strAcciones = "[{xtype:'label', text:'Módulos: ',style:'color:#fea438;font-weight:bold;'},";
/* 195 */           for (int i = 0; i < lstModulos.size(); i++) {
/* 196 */             Object[] obj = (Object[])(Object[])lstModulos.get(i);
/* 197 */             Liadminmodulo am = (Liadminmodulo)obj[0];
/* 198 */             strAcciones = strAcciones + "'-',{xtype:'button',text:'" + am.getAmnombremodulo() + "',enableToggle:'true',toggleGroup:'mdl',disabledClass:'x-btn-disabled-modulos'," + "     toggleHandler:function(btn,pressed){" + "         if(btn==this){" + "             if(pressed==true){" + "                 btn.disable();" + "                 btn.disable();" + "             }else{" + "                 btn.enable();" + "             }" + "         }" + "     }" + "},";
/*     */           }
/*     */ 
/* 212 */           strAcciones = strAcciones.substring(0, strAcciones.length() - 1) + "]";
/*     */         }
/*     */       }
/*     */     } catch (Exception e) {
/* 216 */       e.printStackTrace();
/* 217 */       strAcciones = "[{xtype:'label', text:'No tiene acciones asignadas',style:'color:#fea438;font-weight:bold;'}]";
/*     */     } finally {
/* 219 */       HibernateUtil.closeSession();
/*     */     }
/* 221 */     return strAcciones;
/*     */   }
/*     */ 
/*     */ }

