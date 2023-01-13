/*    */ package com.sql;
/*    */ 
/*    */ public class SQLALmacen
/*    */ {
/*    */   public static String getEnvios()
/*    */   {
/* 14 */     return "SELECT e, cd, (SELECT o.oNombreOrigen FROM CtlOrigen o WHERE o.oIdOrigen=e.eIdSucursalOrigen) AS origen FROM Envio e, ClienteDireccion cd WHERE e.eIdDireccion=cd.cdIdDirCliente    AND e.eIdEnvioClasificacion in (1,2,4)   AND e.eIdStatusEnvio.esIdEnvioStatus = ?1    AND e.eCanalizado <> true ";
/*    */   }
/*    */ 
/*    */   public static String getRequisitosEnvio()
/*    */   {
/* 24 */     return "Select e from Envio e where e.eIdEnvio = ?1";
/*    */   }
/*    */   public static String getListaRequisitos() {
/* 27 */     return "Select er from EnvioRecepcion er where er.erIdEnvio.eIdEnvio = ?1";
/*    */   }
/*    */   public static String getListaDetalles() {
/* 30 */     return "Select ed from EnvioDetalle ed where ed.edIdEnvio.eIdEnvio = ?1 and ed.edStatusProducto=1";
/*    */   }
/*    */   public static String getContarEnvioSinStatus(String cf) {
/* 33 */     return "SELECT count(e) FROM Envio e, ClienteDireccion cd WHERE e.eIdDireccion.cdIdDirCliente=cd.cdIdDirCliente AND e.eIdEnvioClasificacion in (1,2,4) AND e.eCanalizado <> true " + cf;
/*    */   }
/*    */   public static String getEnvioSinStatus(String cf) {
/* 36 */     return "SELECT e, cd, (SELECT o.oNombreOrigen FROM CtlOrigen o WHERE o.oIdOrigen=e.eIdSucursalOrigen) AS origen FROM Envio e, ClienteDireccion cd WHERE e.eIdDireccion=cd.cdIdDirCliente AND e.eIdEnvioClasificacion in (1,2,4) AND e.eCanalizado <> true " + cf;
/*    */   }
/*    */   public static String getContarEnviosConStatus(String cf) {
/* 39 */     return "SELECT count(e) FROM Envio e, ClienteDireccion cd WHERE e.eIdDireccion.cdIdDirCliente=cd.cdIdDirCliente AND e.eIdEnvioClasificacion in (1,2,4) AND e.eIdStatusEnvio.esIdEnvioStatus = ?1 AND e.eCanalizado <> true " + cf;
/*    */   }
/*    */   public static String getEnviosConStatus(String cf) {
/* 42 */     return "SELECT e, cd, (SELECT o.oNombreOrigen FROM CtlOrigen o WHERE o.oIdOrigen=e.eIdSucursalOrigen) AS origen FROM Envio e, ClienteDireccion cd WHERE e.eIdDireccion=cd.cdIdDirCliente AND e.eIdEnvioClasificacion in (1,2,4) AND e.eIdStatusEnvio.esIdEnvioStatus = ?1 AND e.eCanalizado <> true " + cf + " order by e.eIdEnvio";
/*    */   }
/*    */   public static String getContarConsulta1(int idc, String cf) {
/* 45 */     return "SELECT count(e) FROM Envio e, ClienteDireccion cd WHERE e.eIdDireccion.cdIdDirCliente=cd.cdIdDirCliente AND e.eIdEnvioClasificacion in (1,2,4) AND e.eIdStatusEnvio.esIdEnvioStatus = ?1 AND e.eIdCliente.cIdCliente = " + idc + cf;
/*    */   }
/*    */   public static String getConsulta1(int idc, String cf) {
/* 48 */     return "SELECT e, cd, (SELECT o.oNombreOrigen FROM CtlOrigen o WHERE o.oIdOrigen=e.eIdSucursalOrigen) AS origen FROM Envio e, ClienteDireccion cd WHERE e.eIdDireccion=cd.cdIdDirCliente AND e.eIdEnvioClasificacion in (1,2,4) AND e.eIdStatusEnvio.esIdEnvioStatus = ?1 AND e.eIdCliente.cIdCliente = " + idc + cf;
/*    */   }
/*    */   public static String getContarConsulta2(int origenUsuario, String cf) {
/* 51 */     return "SELECT count(e) FROM Envio e, ClienteDireccion cd WHERE e.eIdDireccion.cdIdDirCliente=cd.cdIdDirCliente AND e.eIdEnvioClasificacion in (1,2,4) AND e.eIdStatusEnvio.esIdEnvioStatus = ?1 AND e.eIdSucursalOrigen.oIdOrigen = " + origenUsuario + cf;
/*    */   }
/*    */   public static String getConsulta2(int origenUsuario, String cf) {
/* 54 */     return "SELECT e, cd, (SELECT o.oNombreOrigen FROM CtlOrigen o WHERE o.oIdOrigen=e.eIdSucursalOrigen) AS origen FROM Envio e, ClienteDireccion cd WHERE e.eIdDireccion=cd.cdIdDirCliente AND e.eIdEnvioClasificacion in (1,2,4) AND e.eIdStatusEnvio.esIdEnvioStatus = ?1 AND e.eIdSucursalOrigen.oIdOrigen = " + origenUsuario + cf;
/*    */   }
/*    */ 
/*    */   public static String getContarConsulta3(int origenUsuario, String cf) {
/* 58 */     return "SELECT count(e) FROM Envio e, ClienteDireccion cd WHERE e.eIdDireccion.cdIdDirCliente=cd.cdIdDirCliente AND e.eIdEnvioClasificacion in (1,2,4) AND e.eIdStatusEnvio.esIdEnvioStatus = ?1 AND e.eIdSucursalDestino.oIdOrigen = " + origenUsuario + " and e.eCanalizado = true" + cf;
/*    */   }
/*    */   public static String getConsulta3(int origenUsuario, String cf) {
/* 61 */     return "SELECT e, cd, (SELECT o.oNombreOrigen FROM CtlOrigen o WHERE o.oIdOrigen=e.eIdSucursalOrigen) AS origen FROM Envio e, ClienteDireccion cd WHERE e.eIdDireccion=cd.cdIdDirCliente AND e.eIdEnvioClasificacion in (1,2,4) AND e.eIdStatusEnvio.esIdEnvioStatus = ?1 AND e.eIdSucursalDestino.oIdOrigen = " + origenUsuario + " and e.eCanalizado = true" + cf;
/*    */   }
/*    */   public static String getContarConsulta3SinStatus(int origenUsuario, String cf) {
/* 64 */     return "SELECT count(e) FROM Envio e, ClienteDireccion cd WHERE e.eIdDireccion.cdIdDirCliente=cd.cdIdDirCliente AND e.eIdEnvioClasificacion in (1,2,4) AND e.eIdSucursalDestino.oIdOrigen = " + origenUsuario + " and e.eCanalizado = true" + cf;
/*    */   }
/*    */   public static String getConsulta3SinStatus(int origenUsuario, String cf) {
/* 67 */     return "SELECT e, cd, (SELECT o.oNombreOrigen FROM CtlOrigen o WHERE o.oIdOrigen=e.eIdSucursalOrigen) AS origen FROM Envio e, ClienteDireccion cd WHERE e.eIdDireccion=cd.cdIdDirCliente AND e.eIdEnvioClasificacion in (1,2,4) AND e.eIdSucursalDestino.oIdOrigen = " + origenUsuario + " and e.eCanalizado = true" + cf;
/*    */   }
/*    */ 
/*    */   public static String getContarECSExistentes()
/*    */   {
/* 72 */     return "Select count(ecs) From EnvioCambioStatus ecs Where ecs.ecsIdEnvio.eIdEnvio = ?1 and ecs.ecsStatusOrigen.esIdEnvioStatus = ?2 and ecs.ecsStatusDestino.esIdEnvioStatus = ?3";
/*    */   }
/*    */   public static String getIdsECSExistentes() {
/* 75 */     return "Select ecs.ecsIdEnvioCambioStatus From EnvioCambioStatus ecs Where ecs.ecsIdEnvio.eIdEnvio = ?1 and ecs.ecsStatusOrigen.esIdEnvioStatus = ?2 and ecs.ecsStatusDestino.esIdEnvioStatus = ?3";
/*    */   }
/*    */ }

