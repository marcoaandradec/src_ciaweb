/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function solicitudVacuna(idc,prd){
    var wnd = com.punto.pen.WndActividades({
        titulo:"Solicitud de vacuna",
        id:"idWndSolicitudVacuna",
        width:565,
        height:280,
        pnl:panelSolicitudVacuna(idc),
        botones:[{
            text:"Generar solicitud",
            handler:function(btn){
                var form = Ext.getCmp("idFormSolicitudVacuna").getForm();
                if(form.isValid()){
                    form.submit({
                        params:{
                            bnd:3,
                            idc:idc
                        },
                        success:function(frm,action){
                            if(action.result.success == true && action.result.idNew != 0){
                                Ext.Msg.show({
                                    title:'Aviso',
                                    msg: "Se generó la solicitud con exito, Solicitud no: " + action.result.idNew,
                                    buttons: Ext.Msg.OK,
                                    fn:function(btn){
                                        if(btn == 'ok'){
                                            var bitac=Ext.getCmp("gridBuscadorBitacora");
                                            bitac.getStore().load();
                                            var nots = Ext.getCmp("idPanelNotasAnte");
                                            nots.load({
                                                url:contexto + '/Cliente?bnd=9&idCnt='+idc
                                            });
                                            var infoGen=Ext.getCmp("pnlInfoGeneral");
                                            infoGen.load({
                                                url:contexto + '/Cliente?bnd=2&idCnt='+idc
                                            });
                                            wnd.close();
                                        }
                                    }
                                });
                            }else{
                                Ext.Msg.show({
                                    title:'Aviso',
                                    msg: "Hubo un error en el servidor, Verifique",
                                    buttons: Ext.Msg.OK
                                });
                            }                            
                        }
                    });
                }else{
                    Ext.MessageBox.alert("Aviso","Faltan datos para continuar");
                }
//                Ext.Ajax.request({
//                    url:contexto + "/Vacuna",
//                    params:{
//                        bnd:3,
//                        idc:idc,
//                        idVac:Ext.getCmp("idCmbVacuna").getValue(),
//                        precio:Ext.getCmp("idTxtPrecio").getValue(),
//                        cant:Ext.getCmp("idNumCantidad").getValue(),
//                        total:Ext.getCmp("idNumTotal").getValue(),
//                        formPago:Ext.getCmp("idCmbFormaPago").getValue()
//                    },
//                    success:function(rsp){
//                        var array = eval("(" + rsp.responseText + ")");
//                        if(array.success == true && array.idNew != 0){
//                            Ext.Msg.show({
//                                title:'Aviso',
//                                msg: "Se generó la solicitud con exito, Solicitud no: " + array.idNew,
//                                buttons: Ext.Msg.OK,
//                                fn:function(btn){
//                                    if(btn == 'ok'){
//                                        var bitac=Ext.getCmp("gridBuscadorBitacora");
//                                        bitac.getStore().load();
//                                        var nots = Ext.getCmp("idPanelNotasAnte");
//                                        nots.load({
//                                            url:contexto + '/Cliente?bnd=9&idCnt='+idc
//                                        });
//                                        var infoGen=Ext.getCmp("pnlInfoGeneral");
//                                        infoGen.load({
//                                            url:contexto + '/Cliente?bnd=2&idCnt='+idc
//                                        });
//                                        wnd.close();
//                                    }
//                                }
//                            });
//                        }else{
//                            Ext.Msg.show({
//                                title:'Aviso',
//                                msg: "Hubo un error en el servidor, Verifique",
//                                buttons: Ext.Msg.OK
//                            });
//                        }
//                    }
//                });
            }
        },{
            text:"Salir",
            handler:function(btn){
                wnd.close();
            }
        }]
    });

    wnd.show();
}

function panelSolicitudVacuna(idc){
    
    Ext.Ajax.request({
        url:contexto + "/Vacuna",
        params:{
            bnd:1,
            idc:idc
        },
        success:function(rsp){
            var array = eval("("+rsp.responseText+")");
            Ext.getCmp("idNombrePac").setValue(array.nomPac);
        }
    });

    var pnl = new Ext.FormPanel({
        id:"idFormSolicitudVacuna",
        url:contexto + "/Vacuna",
        layout:"form",
        items:[{
            xtype:"fieldset",
            title:"Datos de paciente",
            layout:"column",
            height:60,
            items:[{
                xtype:"panel",
                layout:"form",
                width:420,
                border:false,
                items:[{
                    xtype:"textfield",
                    id:"idNombrePac",
                    fieldLabel:"Paciente",
                    readOnly:true,
                    width:300
                }]
            }/*,{
                xtype:"panel",
                layout:"form",
                border:false,
                items:[{
                    xtype:"datefield",
                    fieldLabel:"Fecha"
                }]
            }*/]
        },{
            xtype:"fieldset",
            title:"Datos de solicitud",
            height:120,
            layout:"form",
            items:[{
                xtype:"panel",
                layout:"column",
                border:false,
                items:[{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    width:300,
                    items:[{xtype:"hidden",id:"idVac"},
                        new com.punto.pen.ComboBox({
                        id:"idCmbVacuna",
                        etiqueta:"Vacuna",
                        allowBlank:false,
                        name:"cmbVacuna",
                        prm:{
                            campo:"vacuna",
                            idCampo:'idVacuna',
                            autoCarga:true,
                            bnd:5,
                            qry:110
                        },
                        evt:{
                            select:function(cmb){
                                Ext.Ajax.request({
                                    url:contexto + "/Vacuna",
                                    params:{
                                        bnd:2,
                                        idVac:cmb.getValue()
                                    },
                                    success:function(rsp){
                                        var array = eval("("+rsp.responseText+")");

                                        Ext.getCmp("idTxtPrecio").setValue(array.precio);
                                        
                                        Ext.getCmp("idVac").setValue(cmb.getValue());
                                    }
                                });
                                
                            }
                        }
                    })]
                },{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    labelWidth:50,
                    items:[{
                        xtype:"textfield",
                        id:"idTxtPrecio",
                        width:50,
                        readOnly:true,
                        fieldLabel:"Precio $"
                    }]
                }]
            },{
                xtype:"panel",
                layout:"column",
                border:false,
                items:[{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    width:300,
                    items:[{
                        xtype:"numberfield",
                        id:"idNumCantidad",
                        name:"cant",
                        allowBlank:false,
                        fieldLabel:"Cantidad",
                        enableKeyEvents:true,
                        listeners:{
                            keyup:function(num, e){
                                Ext.getCmp("idNumTotal").setValue(num.getValue() * Ext.getCmp("idTxtPrecio").getValue());
                            }
                        }
                    }]
                },{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    labelWidth:50,
                    items:[{
                        xtype:"numberfield",
                        id:"idNumTotal",
                        name:"total",
                        width:50,
                        readOnly:true,
                        fieldLabel:"Total $"
                    }]
                }]
            },{
                xtype:"panel",
                layout:"column",
                border:false,
                items:[{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    width:300,
                    items:[{xtype:"hidden",id:"formPago"},
                        new com.punto.pen.ComboBox({
                        id:"idCmbFormaPago",
                        etiqueta:"Forma de pago",
                        allowBlank:false,
                        name:"cmbFormaPago",
                        prm:{
                            campo:"formaPago",
                            idCampo:'idFormaPago',
                            autoCarga:true,
                            bnd:5,
                            qry:109
                        },
                        evt:{
                            select:function(cmb){
                                Ext.getCmp("formPago").setValue(cmb.getValue());
                                var wnd = Ext.getCmp("idWndSolicitudVacuna");
                                if(cmb.getRawValue() == "DEPOSITO BANCARIO"){
                                    wnd.setHeight(400);
                                    Ext.getCmp("idFormSolicitudVacuna").remove("idInfo",true);
                                    Ext.getCmp("idFormSolicitudVacuna").add({
                                        xtype:"fieldset",
                                        id:"idInfo",
                                        title:"Referencias bancarias",
                                        height:120,
                                        items:[{
                                            html:"<table width=100%><tr><td align=right><a href='javascript:imprimirDocumento()'>Imprimir datos</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr></table>",
                                            border:false
                                        },{
                                            html:htmlImprimir
                                        }]
                                    });
                                    Ext.getCmp("idFormSolicitudVacuna").doLayout();
                                }else{
                                    Ext.getCmp("idFormSolicitudVacuna").remove("idInfo",true);
                                    Ext.getCmp("idFormSolicitudVacuna").doLayout();
                                    wnd.setHeight(280);
                                }
                            }
                        }
                    })]
                },{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    labelWidth:50,
                    items:[{
                        xtype:"textfield",
                        name:"mailPac",
                        fieldLabel:"Email",
                        vtype:"email",
                        allowBlank:false,
                        width:150
                    }]
                }]
            }]
        }]
    });
    return pnl;
}

//var htmlImprimir = "<table align=center><tr><td>Banco:</td></tr><tr><td>No. de Referencia:</td></tr><tr><td>No. de Cuenta:</td></tr><tr><td>Monto:</td></tr></table>";
var htmlImprimir = "\
<table width=540px>\n\
<tr>\n\
<td>\n\
<table>\n\
<tr>\n\
<td colspan=2><b>BBVA Bancomer</b></td>\n\
</tr>\n\
<tr>\n\
<td colspan=2>Punto Pen, S.A. de C.V.</td>\n\
</tr>\n\
<tr>\n\
<td>Cuenta</td>\n\
<td>01 50 96 25 62</td>\n\
</tr>\n\
<tr>\n\
<td>Interbancaria</td>\n\
<td>01 21 80 00 15 09 62 56 28</td>\n\
</tr>\n\
</table>\n\
</td>\n\
<td>\n\
<table>\n\
<tr>\n\
<td colspan=2><b>Banamex</b></td>\n\
</tr>\n\
<tr>\n\
<td colspan=2>Punto Pen, S.A. de C.V.</td>\n\
</tr>\n\
<tr>\n\
<td>Cuenta</td>\n\
<td>22 14 20 31 14</td>\n\
</tr>\n\
<tr>\n\
<td>Interbancaria</td>\n\
<td>00 21 80 02 21 42 03 11 47</td>\n\
</tr>\n\
</table>\n\
</td>\n\
</tr>\n\
</table>\n\
";

function imprimirDocumento(){
    window.open(
        contexto + "/jsp_general/reciboVacuna.jsp?datosPago=false&htmlImprimir="+htmlImprimir,
        'Imprimir',
        'status=no, menubar=no, toolbars=no, scrollbars=yes,resizable=no,width=650,height=200'
    );
}