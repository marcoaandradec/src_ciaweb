/*     */ package com.sql;
/*     */ 
/*     */ public class SQLCanjes
/*     */ {
/*     */   public static String getDireccionesPaciente()
/*     */   {
/*  14 */     return "Select d From ClienteDireccion d Where d.cdIdCliente.cIdCliente = ?1 AND d.cdCalle<>'' AND d.cdColonia<>'' AND d.cdDelegacionMunicipio<>'' AND d.cdEstado<>'' order by d.cdIdDirCliente asc";
/*     */   }
/*     */ 
/*     */   public static String getProductoCanje() {
/*  18 */     return "Select e.erIdEnvioRegla, e.erIdProducto.pIdProducto, pf.pfaNombreFamilia, p.pDosis, p.pPresentacion, e.erPromocion, e.erCantidadRequisitos, e.erEnviosMaximos From EnvioReglas e, Producto p, ProductoFamilia pf Where e.erIdProducto=p.pIdProducto and e.erIdProductoFamilia.pfaIdProductoFamilia=pf.pfaIdProductoFamilia and e.erIdProducto.pIdProducto = ?1 and e.erIdExcepcion.eeIdExcepcion=1";
/*     */   }
/*     */ 
/*     */   public static String getProductoCanjeAmaryl()
/*     */   {
/*  24 */   //  return "Select e.erIdEnvioRegla, e.erIdProducto.pIdProducto, pf.pfaNombreFamilia, p.pDosis, p.pPresentacion, e.erPromocion, e.erCantidadRequisitos, e.erEnviosMaximos From EnvioReglas e, Producto p, ProductoFamilia pf Where e.erIdProducto=p.pIdProducto and e.erIdProductoFamilia.pfaIdProductoFamilia=pf.pfaIdProductoFamilia and e.erIdProducto.pIdProducto = ?1 and e.erIdExcepcion.eeIdExcepcion=3";
                return "";
/*     */   }
/*     */ 
/*     */   public static String getProductoCanjeShorant()
/*     */   {
                return "";
///*  30 */     return "Select e.erIdEnvioRegla, e.erIdProducto.pIdProducto, pf.pfaNombreFamilia, p.pDosis, p.pPresentacion, e.erPromocion, e.erCantidadRequisitos, e.erEnviosMaximos From EnvioReglas e, Producto p, ProductoFamilia pf Where e.erIdProducto=p.pIdProducto and e.erIdProductoFamilia.pfaIdProductoFamilia=pf.pfaIdProductoFamilia and e.erIdProducto.pIdProducto = ?1 and e.erIdExcepcion.eeIdExcepcion=5";
/*     */   }
/*     */ 
/*     */   public static String getProductoDiferentePresentacion()
/*     */   {
/*  36 */     return "Select e.erIdEnvioRegla, e.erIdProducto.pIdProducto, pf.pfaNombreFamilia, p.pDosis, p.pPresentacion, e.erPromocion, e.erCantidadRequisitos, e.erEnviosMaximos From EnvioReglas e, Producto p, ProductoFamilia pf Where e.erIdProducto=p.pIdProducto and e.erIdProductoFamilia.pfaIdProductoFamilia=pf.pfaIdProductoFamilia and (e.erIdProducto.pIdProducto = ?1 or e.erIdProducto.pIdProducto = ?2) order by p.pPresentacion asc";
/*     */   }
/*     */ 
/*     */   public static String getProductoDiferentePresentacionShorant()
/*     */   {
                return "";
///*  42 */     return "Select e.erIdEnvioRegla, e.erIdProducto.pIdProducto, pf.pfaNombreFamilia, p.pDosis, p.pPresentacion, e.erPromocion, e.erCantidadRequisitos, e.erEnviosMaximos From EnvioReglas e, Producto p, ProductoFamilia pf Where e.erIdProducto=p.pIdProducto and e.erIdProductoFamilia.pfaIdProductoFamilia=pf.pfaIdProductoFamilia and (e.erIdProducto.pIdProducto = ?1 or e.erIdProducto.pIdProducto = ?2) and e.erIdExcepcion.eeIdExcepcion=5 order by p.pPresentacion asc";
/*     */   }
/*     */ 
/*     */   public static String getDiferentePresentacionShorantSinExc()
/*     */   {
                return "";
///*  48 */     return "Select e.erIdEnvioRegla, e.erIdProducto.pIdProducto, pf.pfaNombreFamilia, p.pDosis, p.pPresentacion, e.erPromocion, e.erCantidadRequisitos, e.erEnviosMaximos From EnvioReglas e, Producto p, ProductoFamilia pf Where e.erIdProducto=p.pIdProducto and e.erIdProductoFamilia.pfaIdProductoFamilia=pf.pfaIdProductoFamilia and (e.erIdProducto.pIdProducto = ?1 or e.erIdProducto.pIdProducto = ?2) and e.erIdExcepcion.eeIdExcepcion=1 order by p.pPresentacion asc";
/*     */   }
/*     */ 
/*     */   public static String getProductosCanjes()
/*     */   {
/*  55 */     return "Select p.pIdProducto, p.pNombreProducto, p.pPresentacion, p.pIdProductoFamilia.pfaIdProductoFamilia" +
                    " From Producto p Where p.pIdProductoFamilia.pfaIdProductoFamilia=?1";
/*     */   }
/*     */ 
/*     */   public static String verSiUsaLantusOShorant()
/*     */   {
                return "";
///*  60 */     return "select c.csStatus from ClienteStatus c, ClieProdMedi cpm where c.csIdClieProdMed.cpmIdClieProdMed=cpm.cpmIdClieProdMed and c.csIdCliente.cIdCliente=?1 and (cpm.cpmIdFamilia.pfaIdProductoFamilia = 31 or cpm.cpmIdFamilia.pfaIdProductoFamilia = 50) order by c.csStatus asc";
/*     */   }
/*     */ 
/*     */   public static String verSiUsaLantusOShorant2() 
            {
                return "";
///*  64 */     return "select c.csStatus from ClienteStatus c, ClieProdMedi cpm where c.csIdClieProdMed.cpmIdClieProdMed=cpm.cpmIdClieProdMed and c.csIdCliente.cIdCliente=?1 and cpm.cpmIdFamilia.pfaIdProductoFamilia = 50 order by c.csStatus asc";
/*     */   }
/*     */   public static String verSiUsaLantus() {
                return "";
///*  67 */     return "Select count(cpm) From ClieProdMedi cpm Where cpm.cpmIdCliente.cIdCliente = ?1 and cpm.cpmIdFamilia.pfaIdProductoFamilia = 31";
/*     */   }
/*     */   public static String verSiUsaLantusOAmaryl() 
            {
                return "";
///*  70 */     return "select c.csStatus from ClienteStatus c, ClieProdMedi cpm where c.csIdClieProdMed.cpmIdClieProdMed=cpm.cpmIdClieProdMed and c.csIdCliente.cIdCliente=?1 and (cpm.cpmIdFamilia.pfaIdProductoFamilia = 31 or cpm.cpmIdFamilia.pfaIdProductoFamilia = 8) order by c.csStatus asc";
/*     */   }
/*     */ 
/*     */   public static String getDireccionParaCanjes() {
/*  74 */     return "Select c.cdIdDirCliente from ClienteDireccion c where c.cdIdCliente.cIdCliente=?1 and c.cdStatusCanje=1";
/*     */   }
/*     */   public static String getDireccionCompletaParaCanjes() {
/*  77 */     return "Select cd from ClienteDireccion cd where cd.cdIdDirCliente=?1";
/*     */   }
/*     */   public static String getRecetaMedica() {
/*  80 */     return "Select r.rmIdReceta from RecetaMedica r, ProductoFamilia pf, Producto p where r.rmIdProductoFamilia.pfaIdProductoFamilia = pf.pfaIdProductoFamilia and p.pIdProductoFamilia.pfaIdProductoFamilia = pf.pfaIdProductoFamilia and r.rmActiva = True and p.pIdProducto = ?1 and r.rmIdCliente.cIdCliente = ?2";
/*     */   }
/*     */ 
/*     */   public static String getClexane()
/*     */   {
                return "";
///*  86 */     return "Select e.erIdEnvioRegla, e.erIdProducto.pIdProducto, pf.pfaNombreFamilia, p.pDosis, p.pPresentacion, e.erPromocion, e.erCantidadRequisitos, e.erEnviosMaximos From EnvioReglas e, Producto p, ProductoFamilia pf Where e.erIdProducto=p.pIdProducto and e.erIdProductoFamilia.pfaIdProductoFamilia=pf.pfaIdProductoFamilia and e.erIdProducto.pIdProducto = ?1 and e.erIdExcepcion.eeIdExcepcion=6 and e.erPromocion = ?2";
/*     */   }
/*     */ 
/*     */   public static String getNumPuntos()
/*     */   {
/*  94 */     return "Select c.cPuntos From Cliente c Where c.cIdCliente = ?1";
/*     */   }
/*     */   public static String getPremiosPosibles() {
/*  97 */     return "Select cpp.cppIdPuntosPremio, cpp.cppDescripcion, cpp.cppPuntosPremio, cpp.cppIdProductoMaterial " +
                     "From CtlPuntosPremio cpp Where cpp.cppPuntosPremio <= ?1 and cpp.cppStatus = True";
/*     */   }
/*     */   public static String obtenFam() {
/* 100 */     return "Select f From ProductoFamilia f, Producto p Where f.pfaIdProductoFamilia = p.pIdProductoFamilia.pfaIdProductoFamilia and p.pIdProducto = ?1";
/*     */   }
/*     */   public static String contarEnviosDeProducto() {
/* 103 */     return "Select count(e) From Envio e Where e.eIdProducto.pIdProducto = ?1 and e.eIdCliente.cIdCliente = ?2 and e.eIdStatusEnvio.esIdEnvioStatus not in (6,7)";
/*     */   }
/*     */   public static String getAllegraPrimeraVez() {
                return "";
///* 106 */     return "Select e.erIdEnvioRegla, e.erIdProducto.pIdProducto, pf.pfaNombreFamilia, p.pDosis, p.pPresentacion, e.erPromocion, e.erCantidadRequisitos, e.erEnviosMaximos From EnvioReglas e, Producto p, ProductoFamilia pf Where e.erIdProducto=p.pIdProducto and e.erIdProductoFamilia.pfaIdProductoFamilia=pf.pfaIdProductoFamilia and e.erIdProducto.pIdProducto = ?1 and e.erIdExcepcion.eeIdExcepcion=7";
/*     */   }
///*     */
/*     */   public static String encontarCPM()
/*     */   {
                return "";
///* 112 */     return "Select cpm.cpmIdClieProdMed From ClieProdMedi cpm, ClienteStatus cs Where cpm.cpmIdClieProdMed = cs.csIdClieProdMed.cpmIdClieProdMed and cs.csIdProducto.pIdProducto = ?1 and cpm.cpmIdCliente.cIdCliente = ?2 and cs.csStatus = 1";
/*     */   }
/*     */ 
/*     */   public static String verPastillasAcumuladas() {
                return "";
    ///* 116 */     return "Select cpm.cpmPastillasAcumuladas From ClieProdMedi cpm, ClienteStatus cs Where cpm.cpmIdClieProdMed = cs.csIdClieProdMed.cpmIdClieProdMed and cs.csIdProducto.pIdProducto = ?1 and cpm.cpmIdCliente.cIdCliente = ?2 and cs.csStatus = 1";
/*     */   }
/*     */ 
/*     */   public static String getEstudiosRegivas() {
/* 120 */     return "Select count(cbi) " +
                "From ClienteBitacora cbi " +
                "Where cbi.cbiIdCliente.cIdCliente = ?1 " +
                "and cbi.cbiIdActividadCamp.acIdActividadCampania = 223";
/*     */   }
/*     */ }

