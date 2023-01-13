/*    */ package com.sql;
/*    */ 
/*    */ public class SQLAgenda
/*    */ {
/*    */   public static String getAgendaUsr(String fech)
/*    */   {
/* 14 */     return "Select ac From AgendaActividad ac Where ac.aacIdUsuarioAsignado.uIdUsuario = ?1 And (CONVERT(DATE,ac.aacFechaActividad, 102) = CONVERT(DATE,'" + fech + "',102))"
                    + "And ac.aacIdCatStatus.aasIdCatStatus Not In (?2)";
/*    */   }
/*    */ 
/*    */   public static String getActividadesUsuario(String fech)
/*    */   {
/* 20 */     return "Select ac From AgendaActividad ac Where ac.aacIdUsuarioAsignado.uIdUsuario = ?1 And (CONVERT(DATE,ac.aacFechaActividad, 102) = CONVERT(DATE,'" + fech + "',102)) "
                    + "And ac.aacIdCatStatus.aasIdCatStatus Not In (?2) " + "Order by ac.aacHoraInicio asc";
/*    */   }
/*    */ }

