/*    */ package com.sql;
/*    */ 
/*    */ public class SQLRecetas
/*    */ {
/*    */   public static String BuscarRecetasEnAlta()
/*    */   {
/* 14 */     return "Select rm From RecetaMedica rm where rm.rmVencido=0 AND rm.rmIdCliente.cIdCliente=?1 and rm.rmIdProductoFamilia.pfaIdProductoFamilia=?2 and rm.rmStatusBaja=1 ORDER BY rm.rmFechaAlta desc";
/*    */   }
/*    */ 
/*    */   public static String BuscarInfoReceta() {
/* 18 */     return "Select rm,pf,m From RecetaMedica rm, ProductoFamilia pf, Medico m  where rm.rmIdProductoFamilia.pfaIdProductoFamilia=pf.pfaIdProductoFamilia AND  rm.rmIdMedico.mIdMedico=m.mIdMedico AND rm.rmIdReceta=?1  and rm.rmStatusBaja=1";
/*    */   }
/*    */ 
/*    */   public static String modificarInfoReceta()
/*    */   {
/* 23 */     return "Select rm From RecetaMedica rm  where rm.rmIdReceta=?1 and rm.rmStatusBaja=1";
/*    */   }
/*    */ 
/*    */   public static String ConsultaRecetaFecha() {
/* 27 */     return "Select rm From RecetaMedica rm  where rm.rmIdCliente.cIdCliente=?1 AND rm.rmVencido=0 and rm.rmIdProductoFamilia.pfaIdProductoFamilia=?2";
/*    */   }
/*    */ 
/*    */   public static String ConsultaProducto() {
///* 31 */     return "Select cs From ClieProdMedi cmp,ClienteStatus cs  " +
//                    "where cmp.cpmIdClieProdMed=cs.csIdClieProdMed.cpmIdClieProdMed }" +
//                    "and cmp.cpmIdFamilia.pfaIdProductoFamilia=?1 " +
//                    "and cs.csIdCliente.cIdCliente=?2";
             return "Select cs From ClienteStatus cs  " +
                    "where cs.csIdProducto.pIdProductoFamilia.pfaIdProductoFamilia = ?1 " +
                    "and cs.csIdCliente.cIdCliente=?2 ";
/*    */   }
/*    */ 
/*    */   public static String modificarActiva()
/*    */   {
/* 36 */     return "Select rm From RecetaMedica rm  where rm.rmIdCliente.cIdCliente=?1 AND rm.rmActiva=true and rm.rmIdProductoFamilia.pfaIdProductoFamilia=?2 and rm.rmStatusBaja=1";
/*    */   }
/*    */ 
/*    */   public static String ConsultaProductoFamilia()
/*    */   {
///* 41 */     return "Select pf,m "+
//                    "From ClieProdMedi cmp,ClienteStatus cs, ProductoFamilia pf, Medico m  " +
//                    "where cmp.cpmIdClieProdMed=cs.csIdClieProdMed.cpmIdClieProdMed  " +
//                    "and cmp.cpmIdMedico.mIdMedico=m.mIdMedico  " +
//                    "and cmp.cpmIdFamilia.pfaIdProductoFamilia=pf.pfaIdProductoFamilia  " +
//                    "and cs.csIdCliente.cIdCliente=?1 and cs.csIdProducto.pIdProducto=?2";
     return "Select pf,m "+
                    "From ClienteStatus cs, ProductoFamilia pf, Medico m  " +
                    "where cs.csIdMedico.mIdMedico=m.mIdMedico  " +
                    "and cs.csIdProducto.pIdProductoFamilia.pfaIdProductoFamilia=pf.pfaIdProductoFamilia  " +
                    "and cs.csIdCliente.cIdCliente=?1 " +
                    "and cs.csIdProducto.pIdProducto=?2";
/*    */   }
/*    */ 
/*    */   public static String modificarBajaProd()
/*    */   {
/* 49 */     return "Select rm From RecetaMedica rm  where rm.rmStatusBaja=1 and rm.rmIdCliente.cIdCliente=?1 and rm.rmIdProductoFamilia.pfaIdProductoFamilia=?2";
/*    */   }
/*    */ }

