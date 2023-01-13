/*    */ package com.sql;
/*    */ 
/*    */ public class SQLEnvio
/*    */ {
/*    */   public static String obtenProductosMateriales()
/*    */   {
/* 15 */     return "Select pm from ProductosMateriales pm Where pm.pmIdTipoProducto.pmtIdProductosMaterialesTipo=?1";
/*    */   }
/*    */ 
/*    */   public static String obtenProductosMedicamentos() {
/* 19 */     return "Select pm from Producto pm where pm.pStatus='Activo' Order by pm.pNombreProducto";
/*    */   }
/*    */ }

