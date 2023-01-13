/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.control.factura;

/**
 *
 * @author mandrade
 */
public class CtrlUtilFactura {

    public String getSqlStatus(String tipo) {
        String sql = "";
        tipo = tipo.replace("'", "");
        if (tipo.equals("S")) {
            sql = " and le.embestatus = 'S' ";
        } else if (tipo.equals("P")) {
            sql = " and le.embestatus = 'P' ";
        } else if (tipo.equals("T")) {
            sql = " and le.embestatus = 'T' and le.embfecentrega is null ";
        } else if (tipo.equals("A")) {
            sql = " and le.embestatus in ('A', 'R') ";
        } else if (tipo.equals("E")) {
            sql = " and le.embestatus = 'E' and NVL(le.embtiporechazo, 'A') not in ('T', 'P') ";
        } else if (tipo.equals("EP")) {
            sql = " and le.embestatus = 'E' and le.embtiporechazo='P' ";
        } else if (tipo.equals("RT")) {
            sql = " and le.embestatus = 'E' and le.embtiporechazo='T' ";
        } else {
            sql = "";
        }
        return sql;
    }

    public static String getOrdSqlBusExis(String Orderby, String dir) {
        String sqlOrden = "";
        if (Orderby.equals("clvProducto")) {
            sqlOrden = "order by lp.prdclave " + dir;
        } else if (Orderby.equals("decripcion")) {
            sqlOrden = "order by lp.prddescripcion " + dir;
        } else if (Orderby.equals("linea")) {
            sqlOrden = "order by lp.prdlinea " + dir;
        } else if (Orderby.equals("familia")) {
            sqlOrden = "order by lp.prdfamilia " + dir;
        } else if (Orderby.equals("uniAlmacenado")) {
            sqlOrden = "order by lp.prdunidad " + dir;
        } else if (Orderby.equals("existReal")) {
            sqlOrden = "order by li.invreal " + dir;
        } else if (Orderby.equals("existReservada")) {
            sqlOrden = "order by li.invresevado " + dir;
        }
        return sqlOrden;
    }
    public static String getOrdSqlBusFac(String Orderby, String dir) {
       String sqlOrden = "";
       if (Orderby.equals("estatus")) {
            sqlOrden = " order by le.embestatus " + dir;
        } else if (Orderby.equals("factura")) {
            sqlOrden = " order by le.embfolio " + dir;
        } else if (Orderby.equals("referencia")) {
            sqlOrden = " order by le.embref " + dir;
        } else if (Orderby.equals("envio")) {
            sqlOrden = " order by le.embenvio " + dir;
        } else if (Orderby.equals("numCliente")) {
            sqlOrden = " order by le.embcliente " + dir;
        } else if (Orderby.equals("nombCliente")) {
            sqlOrden = " order by lc.clinombre " + dir;
        } else if (Orderby.equals("destino")) {
            sqlOrden = " order by lp.pobnombre " + dir;
        }else if (Orderby.equals("numCajas")) {
            sqlOrden = " order by le.embcajas " + dir;
        }else if (Orderby.equals("importe")) {
            sqlOrden = " order by le.embvalor " + dir;
        }else if (Orderby.equals("fechFactura")) {
            sqlOrden = " order by le.embfechafac " + dir;
        }else if (Orderby.equals("fechIngreso")) {
            sqlOrden = " order by le.embfecharec " + dir;
        }else if (Orderby.equals("cita")) {
            sqlOrden = " order by le.embfechaprog " + dir;
        }else if (Orderby.equals("fechEmbarq")) {
            sqlOrden = " order by le.embfecembarque " + dir;
        }else if (Orderby.equals("fechEntreg")) {
            sqlOrden = " order by le.embfecentrega " + dir;
        }else if (Orderby.equals("comentarios")) {
            sqlOrden = " order by le.embcoms " + dir;
        }else{
            sqlOrden = " order by le.embref";
        }
       return sqlOrden;
    }
}
