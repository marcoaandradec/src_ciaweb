/*     */ package com.control.usuario;
/*     */ 
/*     */ import com.dao.util.HibernateUtil;
///*     */ import com.entity.AdminBitacoraAcceso;
/*     */ import com.util.GotoPage;
/*     */ import com.util.Utilities;
/*     */ import java.io.IOException;
/*     */ import java.util.Date;
/*     */ import java.util.Enumeration;
/*     */ import javax.persistence.EntityManager;
/*     */ import javax.persistence.EntityTransaction;
/*     */ import jakarta.servlet.ServletException;
/*     */ import jakarta.servlet.http.HttpServlet;
/*     */ import jakarta.servlet.http.HttpServletRequest;
/*     */ import jakarta.servlet.http.HttpServletResponse;
/*     */ import jakarta.servlet.http.HttpSession;
/*     */ 
/*     */ public class CtrlCerrarSesion extends HttpServlet
/*     */ {
/*     */   protected void processRequest(HttpServletRequest request, HttpServletResponse response)
/*     */     throws ServletException, IOException
/*     */   {
/*  31 */     HttpSession session = request.getSession(false);
/*     */     try {
/*  33 */       if (session.getAttribute("usuario") != null) {
/*  34 */         setBitacoraSalida(session);
/*  35 */         Enumeration enume = session.getAttributeNames();
/*  36 */         if (enume.hasMoreElements()) {
/*  37 */           session.removeAttribute((String)enume.nextElement());
/*     */         }
/*  39 */         session.invalidate();
/*     */       } else {
/*  41 */         session.invalidate();
/*     */       }
/*     */     } catch (Exception e) {
/*  44 */       e.printStackTrace();
/*     */     }
/*     */     finally {
/*  47 */       HibernateUtil.closeSessionFactory();
/*  48 */        System.gc();
/*  52 */       GotoPage.gotoPage("/jsp_general/cerrar.jsp", request, response, getServletContext());
/*     */     }
/*     */   }
/*     */ 
/*     */   public void setBitacoraSalida(HttpSession session) {
/*  57 */     if (session.getAttribute("idAcceso") != null) {
/*  58 */       EntityManager em = HibernateUtil.getEntityManager();
/*  59 */       Integer intIdAcceso = (Integer)session.getAttribute("idAcceso");
/*  60 */       if (!em.getTransaction().isActive())
/*  61 */         em.getTransaction().begin();
/*     */       try
/*     */       {
        /* AdminBitacoraAcceso acceso = (AdminBitacoraAcceso)em.find(AdminBitacoraAcceso.class, intIdAcceso);
         if (acceso != null) {
           Date fechaSalida = new Date();
           String duracion = Utilities.obtenDuracionSesion(acceso.getIdFechaIngreso(), fechaSalida);
           acceso.setIdFechaSalida(fechaSalida);
           acceso.setDuracion(duracion);
em.merge(acceso);
           em.getTransaction().commit();
       }*/
/*     */       } catch (Exception e) {
/*  74 */         if (em.getTransaction().isActive()) {
/*  75 */           em.getTransaction().rollback();
/*     */         }
/*  77 */         e.printStackTrace();
/*     */       } finally {
/*  79 */         HibernateUtil.closeSession();
/*     */       }
/*     */     }
/*     */   }
/*     */ 
/*     */   protected void doGet(HttpServletRequest request, HttpServletResponse response)
/*     */     throws ServletException, IOException
/*     */   {
/*  95 */     processRequest(request, response);
/*     */   }
/*     */ 
/*     */   protected void doPost(HttpServletRequest request, HttpServletResponse response)
/*     */     throws ServletException, IOException
/*     */   {
/* 105 */     processRequest(request, response);
/*     */   }
/*     */ 
/*     */   public String getServletInfo()
/*     */   {
/* 112 */     return "Short description";
/*     */   }
/*     */ }