/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("com.punto.pen");

var wndVistaEnv;

com.punto.pen.panelVistaPrevia = function(argumentos){    
    var valsDir = argumentos.dirPrev.split("&%");
    var nomUsr = argumentos.nomUsr;
    var datCli = argumentos.datCli.split("&%");
    var idsPrs = argumentos.idsPrs;    

    Ext.Ajax.request({
        url:contexto+'/Canjes',
        params:{
            bnd:16,
            idsPrs:idsPrs
        },
        success:function(rsp){
            var nomProd = "";
            var dosis = "";
            var present = "";
            var objJSON=rsp.responseText.evalJSON();
            nomProd = objJSON.nomProd;
            dosis = objJSON.dosis;
            present = objJSON.present;
            var fecha = objJSON.fecha;

            wndVistaEnv = new com.punto.pen.WndActividades({
                titulo:"Vista previa de envio",
                width:510,
                height:550,
                closable:false,
                pnl:new Ext.FormPanel({
                    bodyStyle: "padding:5px 5px 0",
                    layout:'form',
                    width:800,
                    height:432,
                    autoScroll:true,
                    items:[{
                        html:htmlVistaPrevia(nomProd,dosis,present,argumentos.rec,argumentos.nCjs,fecha,argumentos.prd),
                        border:false
                    }]
                }),
                botones:argumentos.botones
            });
            wndVistaEnv.show();

        },
        failure:function(rsp){

        }
    });   

    function htmlVistaPrevia(nomProd,dosis,present,rec,nCjs,fecha,prd){
        var nP = nomProd.split(",");
        var ds = dosis.split(",");
        var pr = present.split(",");
        var rc = rec.split(",");
        var tabReq = "";
        var tabEnv = "";

        for(var i = 0; i < nP.length - 1; i++){
            tabReq += "<tr align=center>\n\
                            <td>" + nP[i] + "</td>\n\
                            <td>" + ds[i] + "</td>\n\
                            <td>" + pr[i] + "</td>\n\
                            <td>" + rc[i] + "</td>\n\
                        </tr>";
        }

        tabEnv = "<tr align=center>\n\
                            <td>" + nP[0] + "</td>\n\
                            <td>" + (prd == 61 || prd == 62 ? "150mg/12.5mg" : ds[0] ) + "</td>\n\
                            <td>" + pr[0] + "</td>\n\
                            <td>" + nCjs + "</td>\n\
                        </tr>";


        var hrmlVista = "\
        <table width=100%>\n\
            <tr>\n\
                <td align=center colspan=3>FORMATO DE ENVIOS</td>\n\
            </tr>\n\
            <tr>\n\
                <td colspan=3><hr><hr></td>\n\
            </tr>\n\
            <tr>\n\
                <td align=left><h4>fecha:</h4>"+fecha+"</td>\
                <td align=right width=60%><h4>Generó:</h4></td>\n\
                <td align=right>" + nomUsr + "</td>\n\
            </tr>\n\
            <tr>\n\
                <td colspan=3>\n\
                    <table width=100% border=1 cellspacing=0 cellpadding=0 bordercolor='#000000'>\n\
                        <tr>\n\
                            <td>\n\
                                <table width=100%>\n\
                                    <tr>\n\
                                        <td colspan=4 align=center>DATOS DE ENTREGA (" + valsDir[0] + ")</td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                        <td width=20%><h4>Envio:</h4></td>\n\
                                        <td colspan=3><i>Aun sin asignar</i></td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                        <td><h4>Entregar a:</h4></td>\n\
                                        <td colspan=3>" + (valsDir[1] == "null null null" ? "" : valsDir[1]) + "</td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                        <td><h4>Telefono:</h4></td>\n\
                                        <td width=30%>" + (valsDir[2] == "null" ? "" : valsDir[2]) + "</td>\n\
                                        <td width=20%><h4>Tipo telefono:</h4></td>\n\
                                        <td width=30%>" + (valsDir[3] == "null" ? "" : valsDir[3]) + "</td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                        <td><h4>Calle:</h4></td>\n\
                                        <td colspan=3>" + valsDir[4] + "</td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                        <td><h4>No. exterior:</h4></td>\n\
                                        <td>" + valsDir[5] + "</td>\n\
                                        <td><h4>No. interior:</h4></td>\n\
                                        <td>" + valsDir[6] + "</td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                        <td><h4>Colonia:</h4></td>\n\
                                        <td colspan=3>" + valsDir[7] + "</td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                        <td><h4>Deleg/Mun:</h4></td>\n\
                                        <td colspan=3>" + valsDir[8] + "</td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                        <td><h4>Estado:</h4></td>\n\
                                        <td>" + valsDir[9] + "</td>\n\
                                        <td><h4>C.P.:</h4></td>\n\
                                        <td>" + valsDir[10] + "</td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                        <td><h4>Entre calle 1:</h4></td>\n\
                                        <td colspan=3>" + valsDir[11] + "</td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                        <td><h4>Entre calle 2:</h4></td>\n\
                                        <td colspan=3>" + valsDir[12] + "</td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                        <td><h4>Referencia 1:</h4></td>\n\
                                        <td colspan=3>" + valsDir[13] + "</td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                        <td><h4>Referencia 2:</h4></td>\n\
                                        <td colspan=3>" + valsDir[14] + "</td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                        <td><h4>Tipo envio:</h4></td>\n\
                                        <td colspan=3><i>Aun sin asignar</i></td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                        <td><h4>Mensajeria:</h4></td>\n\
                                        <td colspan=3><i>Aun sin asignar</i></td>\n\
                                    </tr>\n\
                                </table>\n\
                            </td>\n\
                        </tr>\n\
                    </table>\n\
                </td>\n\
            </tr>\n\
<tr>\n\
    <td>&nbsp;</td>\n\
</tr>\n\
            <tr>\n\
                <td colspan=3>\n\
                    <table width=100% border=1 cellspacing=0 cellpadding=0 bordercolor='#000000'>\n\
                        <tr>\n\
                            <td>\n\
                                <table width=100%>\n\
                                    <tr>\n\
                                        <td colspan=4 align=center>DATOS DE PACIENTE</td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                        <td width=20%><h4>No. Cliente:</h4></td>\n\
                                        <td colspan=3>" + datCli[0] + "</td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                        <td><h4>Nombre:</h4></td>\n\
                                        <td colspan=3>" + datCli[1] + "</td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                        <td><h4>Tel. casa:</h4></td>\n\
                                        <td width=30%>" + datCli[2] + "</td>\n\
                                        <td width=20%><h4>Tel. celular:</h4></td>\n\
                                        <td width=30%>" + datCli[3] + "</td>\n\
                                    </tr>\n\
                                </table>\n\
                            </td>\n\
                        </tr>\n\
                    </table>\n\
                </td>\n\
            </tr>\n\
<tr>\n\
    <td>&nbsp;</td>\n\
</tr>\n\
            <tr>\n\
                <td colspan=3>\n\
                    <table width=100% border=1 cellspacing=0 cellpadding=0 bordercolor='#000000'>\n\
                        <tr>\n\
                            <td>\n\
                                <table width=100%>\n\
                                    <tr>\n\
                                        <td width=20%><h4>Observaciones:</h4></td>\n\
                                        <td>" + argumentos.obs + "</td>\n\
                                    </tr>\n\
                                </table>\n\
                            </td>\n\
                        </tr>\n\
                    </table>\n\
                </td>\n\
            </tr>\n\
<tr>\n\
    <td>&nbsp;</td>\n\
</tr>\n\
            <tr>\n\
                <td colspan=3>PASTILLAS ACUMULADAS</td>\n\
            </tr>\n\
            <tr>\n\
                <td colspan=3>\n\
                    <table width=90% align=right border=1 cellspacing=0 cellpadding=0 bordercolor='#000000'>\n\
                        <tr>\n\
                            <td width=33%>\n\
<table width=100%>\n\
<tr>\n\
<td width=80%>Antes del canje:</td>\n\
<td>" + argumentos.acumAntes + "</td>\n\
</tr>\n\
</table>\n\
</td>\n\
                            <td width=33%>\n\
<table width=100%>\n\
<tr>\n\
<td width=80%>En este canje:</td>\n\
<td>" + argumentos.recibe + "</td>\n\
</tr>\n\
</table>\n\
</td>\n\
                            <td>\n\
<table width=100%>\n\
<tr>\n\
<td width=80%>Proximo canje:</td>\n\
<td>" + argumentos.resultantes + "</td>\n\
</tr>\n\
</table>\n\
</td>\n\
                        </tr>\n\
                    </table>\n\
                </td>\n\
            </tr>\n\
<tr>\n\
    <td>&nbsp;</td>\n\
</tr>\n\
            <tr>\n\
                <td colspan=3>REQUISITOS</td>\n\
            </tr>\n\
            <tr>\n\
                <td colspan=3>\n\
                    <table width=90% align=right border=1 cellspacing=0 cellpadding=0 bordercolor='#000000'>\n\
                        <tr>\n\
<td width=40%>\n\
<table width=100%>\n\
<tr>\n\
<td width=25%>Receta:</td>\n\
<td width=15%>" + (argumentos.pRec == true ? "SI" : "NO") + "</td>\n\
<td width=40%>No Receta:</td>\n\
<td width=20%>" + argumentos.numRece + "</td>\n\
</tr>\n\
</table>\n\
</td>\n\
<td width=25%>\n\
<table width=100%>\n\
<tr>\n\
<td width=85%>Pedir cajas:</td>\n\
<td>" + (argumentos.pTik == true ? "SI" : "NO") + "</td>\n\
</tr>\n\
</table>\n\
</td>\n\
<td>\n\
<table width=100%>\n\
<tr>\n\
<td width=80%>Tarjeta:</td>\n\
<td>" + (argumentos.pTar == true ? "SI" : "NO") + "</td>\n\
</tr>\n\
</table>\n\
</td>\n\
                            <td bgcolor=#808080>\n\
                                <table width=100%>\n\
                                    <tr>\n\
                                        <td><h4>Requisitos:</h4></td>\n\
                                        <td>Si</td>\n\
                                    </tr>\n\
                                </table>\n\
                            </td>\n\
                        </tr>\n\
                    </table>\n\
                </td>\n\
            </tr>\n\
            <tr>\n\
                <td colspan=3>\n\
                    <table width=90% align=right cellspacing=0 cellpadding=0 bordercolor='#000000'>\n\
                        <tr bgcolor=#808080 align=center>\n\
                            <td width=25%>Concepto</td>\n\
                            <td width=25%>Dosis</td>\n\
                            <td width=25%>Presentación</td>\n\
                            <td>Cantidad</td>\n\
                        </tr>" + tabReq + "</table>\n\
                </td>\n\
            </tr>\n\
<tr>\n\
    <td>&nbsp;</td>\n\
</tr>\n\
            <tr>\n\
                <td colspan=3>DETALLE ENVIO</td>\n\
            </tr>\n\
            <tr>\n\
                <td colspan=3>\n\
                    <table width=90% align=right cellspacing=0 cellpadding=0 bordercolor='#000000'>\n\
                        <tr bgcolor=#808080 align=center>\n\
                            <td width=25%>Concepto</td>\n\
                            <td width=25%>Dosis</td>\n\
                            <td width=25%>Presentación</td>\n\
                            <td>Cantidad</td>\n\
                        </tr>" + tabEnv + "</table>\n\
                </td>\n\
            </tr>\n\
<tr>\n\
    <td>&nbsp;</td>\n\
</tr>\n\
            <tr>\n\
                <td colspan=3>\n\
                    <table width=60% align=left cellspacing=0 cellpadding=0>\n\
                        <tr>\n\
                            <td width=20%>Caducidad:</td>\n\
                            <td width=25%><hr></td>\n\
                            <td width=5%>&nbsp;</td>\n\
                            <td width=20%>Lote:</td>\n\
                            <td><hr></td>\n\
                        </tr>\n\
                        <tr>\n\
                            <td width=20%>Surtió:</td>\n\
                            <td width=25%><hr></td>\n\
                            <td width=5%>&nbsp;</td>\n\
                            <td width=20%>Verificó:</td>\n\
                            <td><hr></td>\n\
                        </tr>\n\
                    </table\n\
                </td>\n\
            </tr>\n\
<tr>\n\
    <td>&nbsp;</td>\n\
</tr>\n\
            <tr>\n\
                <td colspan=3>\n\
                    <table width=100%>\n\
                        <tr>\n\
                            <td width=33%><hr></td>\n\
                            <td>&nbsp;</td>\n\
                            <td width=33%><hr></td>\n\
                        </tr>\n\
                        <tr align=center>\n\
                            <td width=33%>Fecha y Hora recepción</td>\n\
                            <td>&nbsp;</td>\n\
                            <td width=33%>Nombre y Firma recepción</td>\n\
                        </tr>\n\
                    </table>\n\
                </td>\n\
            </tr>\n\
<tr>\n\
    <td>&nbsp;</td>\n\
</tr>\n\
            <tr>\n\
                <td colspan=3>Estoy consciente de la caducidad del medicamento entregado.</td>\n\
            </tr>\n\
        </table>";
        
        return hrmlVista;
    }
   
}


