package com.sql;

public class SQLProducto
{
  public static String getProductosPaciente()
  {
///* 14 */     return "Select p,s " +
//                    "From ClieProdMedi p, ClienteStatus s " +
//                    "Where p.cpmIdClieProdMed = s.csIdClieProdMed " +
//                    "and p.cpmIdCliente.cIdCliente=?1 " +
//                    "and s.csMostrar=True " +
//                    "order by s.csIdStatusCliente asc";
               return "Select s " +
                    "From ClienteStatus s " +
                    "Where s.csIdCliente.cIdCliente = ?1 " +
                    "and s.csMostrar=True " +
                    "order by s.csIdStatusCliente asc";
  }

  public static String getProductosCliente() {
/* 18 */     return "Select c.csIdProducto From ClienteStatus c Where c.csIdCliente.cIdCliente=?1 and c.csStatus=1";
  }
  public static String contarStatusProductos() {
///* 21 */     return "Select count(cpm) " +
//                    "From ClieProdMedi cpm, ClienteStatus cs " +
//                    "Where cpm.cpmIdClieProdMed = cs.csIdClieProdMed.cpmIdClieProdMed " +
//                    "and cpm.cpmIdCliente.cIdCliente = ?1 " +
//                    "and cs.csStatus = 1";
             return "Select count(cs) " +
                    "From ClienteStatus cs " +
                    "Where cs.csIdCliente.cIdCliente = ?1 " +
                    "and cs.csStatus = 1";
  }
  public static String contarCPM() {
/*          return "Select count(cpm) " +
                    "From ClieProdMedi cpm " +
                    "Where cpm.cpmIdCliente.cIdCliente = ?1";*/
             return "Select count(cs) " +
                    "From ClienteStatus cs " +
                    "Where cs.csIdCliente.cIdCliente = ?1 ";

  }
  public static String getTodosLosStatus() {
/*              return "select cs.csIdStatusCliente " +
                    "from ClienteStatus cs, ClieProdMedi cpm " +
                    "where cpm.cpmIdClieProdMed=cs.csIdClieProdMed.cpmIdClieProdMed\tand " +
                    "cs.csIdCliente.cIdCliente = ?1 and cpm.cpmIdFamilia.pfaIdProductoFamilia = ?2 " +
                    "and cs.csFechaBaja is null";*/
                return "select cs.csIdStatusCliente " +
                    "from ClienteStatus cs " +
                    "where cs.csIdCliente.cIdCliente = ?1 " +
                    "and cs.csIdProducto.pIdProductoFamilia.pfaIdProductoFamilia = ?2 " +
                    "and cs.csFechaBaja is null";
  }

  public static String verSiExisteCPM()
  {
/*     return "Select count(cpm.cpmIdClieProdMed) " +
                    "From ClieProdMedi cpm, ClienteStatus cs " +
                    "Where cpm.cpmIdClieProdMed = cs.csIdClieProdMed.cpmIdClieProdMed " +
                    "     and cpm.cpmIdCliente.cIdCliente = ?1     " +
                    "and cpm.cpmIdFamilia.pfaIdProductoFamilia = ?2     " +
                    "and cpm.cpmIdMedico.mIdMedico = ?3     " +
                    "and cs.csStatus = 1"; */
                return "Select count(cs.csIdMedico.mIdMedico) " +
                    "From   ClienteStatus cs " +
                    "Where cs.csIdCliente.cIdCliente = ?1     " +
                    "and cs.csIdProducto.pIdProductoFamilia = ?2     " +
                    "and cs.csIdMedico.mIdMedico = ?3     " +
                    "and cs.csStatus = 1";
  }

  public static String getProducto()
  {
///* 44 */     return "SELECT cs,cp,pf,m " +
//                    "FROM ClienteStatus cs, ClieProdMedi cp, Producto p, ProductoFamilia pf,Medico m  " +
//                    "WHERE cs.csStatus=1  " +
//                    "AND cs.csIdProducto.pIdProducto=p.pIdProducto  " +
//                    "AND cs.csIdClieProdMed.cpmIdClieProdMed=cp.cpmIdClieProdMed  " +
//                    "And cp.cpmIdFamilia.pfaIdProductoFamilia=pf.pfaIdProductoFamilia  " +
//                    "AND cp.cpmIdMedico.mIdMedico=m.mIdMedico  " +
//                    "AND cs.csIdCliente.cIdCliente=?1  " +
//                    "AND cs.csIdProducto.pIdProducto=?2 ";
              return "SELECT cs,pf,m " +
                    "FROM ClienteStatus cs, Producto p, ProductoFamilia pf,Medico m  " +
                    "WHERE cs.csStatus=1  " +
                    "AND cs.csIdProducto.pIdProducto=p.pIdProducto  " +
                    "AND cs.csIdProducto.pIdProductoFamilia = pf.pfaIdProductoFamilia     " +
                    "AND cs.csIdMedico.mIdMedico = m.mIdMedico "+
                    "AND cs.csIdCliente.cIdCliente=?1  " +
                    "AND cs.csIdProducto.pIdProducto=?2 ";
  }


  public static String getSinProducto()
  {
/* 63 */     return "SELECT cs FROM ClienteStatus cs  WHERE cs.csStatus=1  AND cs.csIdProducto.pIdProducto=1  AND cs.csIdCliente.cIdCliente=?1 ";
  }
}