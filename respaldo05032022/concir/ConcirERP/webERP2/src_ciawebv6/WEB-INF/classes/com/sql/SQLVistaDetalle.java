/*    */ package com.sql;
/*    */ 
/*    */ public class SQLVistaDetalle
/*    */ {
/*    */   public static String qryMensajeSust()
/*    */   {
/* 14 */     return "SELECT * FROM vista_mensaje vm, vista_sql vs WHERE vm.vm_id_vista_sql=vs.vs_id_vista_sql       AND vm.vm_id_actividad=?";
/*    */   }
/*    */ 
/*    */   public static String qryVarSust()
/*    */   {
/* 21 */     return "SELECT * FROM vista_variables vv, vista_mensaje_variable vmv WHERE vv.vv_id_variable=vmv.vmv_id_variables       AND vmv.vmv_id_vista_mensaje=?";
/*    */   }
/*    */ }

