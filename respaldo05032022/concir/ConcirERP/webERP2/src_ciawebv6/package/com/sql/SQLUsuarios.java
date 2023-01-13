/*    */ package com.sql;
/*    */ 
/*    */ public class SQLUsuarios
/*    */ {
/*    */   public static String obtenUsuario()
/*    */   {
/* 14 */     return "Select u.usuclave From Liusuarios u Where u.usulogin = ?1 And u.usupasswordweb = ?2 And u.usuacceso = 1";
/*    */   }
/*    */ 
/*    */   public static String obtenUsuarios()
/*    */   {
/* 21 */     return "Select u From Liusuarios u Where u.usulogin Like ?1 And u.usunombre Like ?2 And u.usupaterno Like ?3 And u.usumaterno Like ?4 ";
/*    */   }
/*    */ 
/*    */   public static String obtenUsuariosPntCnt()
/*    */   {
/* 29 */     return "Select u From Usuario u Where u.uIdOrigen.oIdOrigen = ?1 And u.uAcceso = True";
/*    */   }
/*    */ 
/*    */   public static String obtenUsuarioAgenda()
/*    */   {
/* 37 */     return "Select u From Usuario u Where u.uIdUsuario = ?1 And u.uHabilitado = True";
/*    */   }
/*    */ 
/*    */   public static String obtenBitacoraAccesoo()
/*    */   {
/* 43 */     return "Select ab From AdminBitacoraAcceso ab Where ab.idUsuario = ?1 And ab.idFechaIngreso = ?2";
/*    */   }
/*    */ 
/*    */   public static String obtenerNombreUsuario()
/*    */   {
/* 48 */     return "Select u From Usuario u Where u.uCorreoElectronico = ?1 And u.uHabilitado = True";
/*    */   }
/*    */ 
/*    */   public static String obtenerContrasena() {
/* 52 */     return "Select u From Usuario u Where u.uUsuario = ?1 And u.uHabilitado = True";
/*    */   }
/*    */ }

