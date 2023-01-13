/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function estudioRegivas(idc,idPrd,wndCanje){    

    var wndEstudioReg = new com.punto.pen.WndActividades({
        titulo:"Estudio creatinina serica",
        width:500,
        height:265,
        pnl:new Ext.FormPanel({
            bodyStyle: "padding:5px 5px 0",
            layout:'form',
            height:130,
            autoScroll:true,
            items:[{
                xtype:"fieldset",
                layout:"column",
                title:"Resultado estudio",
                height:60,
                items:[{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    width:230,
                    items:[{
                        id:"idCreatinina",
                        xtype:"numberfield",
                        fieldLabel:"Creatinina serica",
                        allowBlank:false,
                        width:100,
                        maxValue:999.999,
                        decimalPrecision:4
                    }]
                },{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    items:[{
                        id:"idFechCreatinina",
                        xtype:"datefield",
                        fieldLabel:"Fecha estudio",
                        allowBlank:false
                    }]
                }]
            },{
                xtype:"fieldset",
                layout:"column",
                title:"Observaciones",
                height:100,
                items:[{
                    id:"idTxtObsCreatinina",
                    xtype:"textarea",
                    style:'text-transform: uppercase;',
                    height:50,
                    width:450
                }]
            }]
        }),
        botones:[{
            text:"Guardar estudio",
            handler:function(){
                var creat = Ext.getCmp("idCreatinina");
                var fech = Ext.getCmp("idFechCreatinina");
                var obsCr = Ext.getCmp("idTxtObsCreatinina");

                if(creat.isValid() == true && fech.isValid() == true){
                    Ext.Ajax.request({
                        url: contexto + "/Canjes",
                        params:{
                            bnd:18,
                            creat:creat.getValue(),
                            fech:fech.getValue(),
                            idc:idc,
                            idPrd:idPrd,
                            obsCr:obsCr.getValue()
                        },
                        success:function(rsp){
                            var objJSON=rsp.responseText.evalJSON();
                            if(objJSON.success == true){
                                Ext.Msg.show({
                                    title:'Envio',
                                    msg:objJSON.msg,
                                    buttons: Ext.Msg.OK,
                                    fn:function(btn){
                                        if(btn == 'ok'){
                                            var bitac=Ext.getCmp("gridBuscadorBitacora");
                                            bitac.getStore().load();
                                            if(wndCanje != undefined){wndCanje.show();}
                                            wndEstudioReg.close();
                                        }
                                    }
                                });
                            }else{
                                Ext.Msg.show({
                                    title:'Envio',
                                    msg:objJSON.msg,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        },
                        failure:function(rsp){

                        }
                    });
                }else{
                    Ext.Msg.show({
                        title:'Envio',
                        msg:"Faltan campos obligatorios (Campos marcados con rojo)",
                        buttons: Ext.Msg.OK
                    });
                }

            }
        },{
            text:"Cancelar",
            handler:function(){
                wndEstudioReg.close();
            }
        }]

    });

    Ext.Ajax.request({
        url : contexto+'/Canjes',
        params:{
            bnd:21,
            idCli:idc,
            idPrd:idPrd
        },
        success:function(rsp){
            var objJSON = rsp.responseText.evalJSON();
            if(objJSON.success == true){
                if(objJSON.prods != 0){
                     if(wndCanje != undefined){
                        Ext.Ajax.request({
                            url : contexto+'/Canjes',
                            params:{
                                bnd:17,
                                idc:idc
                            },
                            success:function(rsp){
                                var objJSON=rsp.responseText.evalJSON();
                                if(objJSON.nReg == 0 && objJSON.success == true){
                                    wndEstudioReg.show();
                                }else if(objJSON.nReg > 0){
                                    wndCanje.show();
                                }else if(objJSON.success == false){
                                    Ext.Msg.show({
                                        title:'Envio',
                                        msg:objJSON.msg,
                                        buttons: Ext.Msg.OK
                                    });
                                }
                            },
                            failure:function(rsp){

                            }
                        });
                    }else{
                        wndEstudioReg.show();
                    }
                }else{
                    Ext.Msg.show({
                        title:'Estudio Creatinina',
                        msg:"Este estudio no se puede realizar ya que el paciente no esta registrado con el medicamento adecuado.",
                        buttons: Ext.Msg.OK
                    });
                }
            }
        },
        failure:function(rsp){

        }
    });
}

var reglaClexane = "1+1";

function tratamientoClexane(idc,idPrd,wndCanje){
    var wnd = new com.punto.pen.WndActividades({
        titulo:"Duración de tratamiento",
        width:300,
        height:165,
        pnl:new Ext.FormPanel({
            bodyStyle: "padding:5px 5px 0",
            layout:'form',
            height:100,
            autoScroll:true,
            items:[{
                xtype:"fieldset",
                layout:"form",
                title:"Dias que dura el tratamiento",
                height:80,
                items:[{
                    id:"idRdDuraTratMe22",
                    xtype:'radio',
                    fieldLabel:"Hasta 22 dias",
                    columnWidth:.1,
                    boxLabel: '',
                    labelStyle:"font-size:12px",
                    name: 'rdDuraTrat',
                    inputValue:"1+1",
                    listeners:{
                        check:function(cb,checked){
                            if(checked != null){
                                Ext.getCmp("idBtnContClexane").enable();
                            }else{
                                Ext.getCmp("idBtnContClexane").disable();
                            }
                        }
                    }
                },{
                    id:"idRdDuraTratMa22",
                    xtype:'radio',
                    fieldLabel:"Mayor a 22 dias",
                    columnWidth:.1,
                    boxLabel: '',
                    labelStyle:"font-size:12px",
                    name: 'rdDuraTrat',
                    inputValue:"2+1",
                    listeners:{
                        check:function(cb,checked){
                            if(checked != null){
                                Ext.getCmp("idBtnContClexane").enable();
                            }else{
                                Ext.getCmp("idBtnContClexane").disable();
                            }
                        }
                    }
                }]
            }]
        }),
        botones:[{
            id:"idBtnContClexane",
            text:"Continuar",
            disabled:true,
            handler:function(){
                reglaClexane = Ext.getCmp("idRdDuraTratMe22").getGroupValue();
                if(reglaClexane == "2+1"){
                    Ext.Ajax.request({
                        url: contexto + "/Canjes",
                        params:{
                            bnd:20,
                            idc:idc,
                            idPrd:idPrd
                        },
                        success:function(rsp){
                            var objJSON=rsp.responseText.evalJSON();
                            if(objJSON.docs == 0){
                                window.open(
                                    contexto + "/HomeSubirArchivos?idCnt=" + idc + "&tipoArch=427&idPrd=" + idPrd ,
                                    "",
                                    "directories=no, resizable=0, menubar=no,location=no,scrollbars=no,status=1,height=550, width=700"
                                );
                            }else{
                                generarWndCanjes(idc,idPrd);
                            }                            
                        },
                        failure:function(rsp){

                        }
                    });                    
                }else{
                    generarWndCanjes(idc,idPrd);
                }
                
                wnd.close();
            }
        },{
            text:"Cancelar",
            handler:function(){
                wnd.close();
            }
        }]
    });
    wnd.show();
    //window.open("jsp_general/subirArchivos.jsp?idCnt=" + idc, "", "directories=no, resizable=0, menubar =no,location=no,scrollbars=no,status=1,height=550, width=700");
}

function generarWndCanjes(idc,idPrd){
    var wndCanje = new com.punto.pen.WndActividades({
        id:'idWndCanjes',
        resizable:false,
        draggable:true,
        border:false,
        constrainHeader:true,
        titulo:'Canjes',
        height:500,
        modal:true,
        botones:[{
            text:'Enviar canje',
            id:'idBtnEnviarCanje',
            handler:function(){
                enviarCanje(idc,idPrd);
            }
        },{
            text:'Cancelar',
            handler:function(){
                wndCanje.close();
            }
        }],
        pnl:new com.punto.pen.panelCanjes(idc,idPrd),
        prm:{
            idCnt:idc,
            idPrd:idPrd
        }
    });

    var grd = Ext.getCmp('idGridRecetaCanje');
    var store = grd.getStore();
//    if(idPrd == 475){
//        estudioRegivas(idc,idPrd,wndCanje);
//    }else if(idPrd == 291 || idPrd == 292 || idPrd == 293){
//        tratamientoClexane(idc,idPrd,wndCanje);
//    }else{
        wndCanje.show();
//    }

    store.load({
        params:{
            start:0,
            limit:5
        }
    });

    cargaGridCanjes(idc,"idPnCanjes");

    if(modulo==1){
        Ext.getCmp('idcheckPersonal').setVisible(false);
    }

}

function desabastoCoapr300(idc,idPrd){
    Ext.Ajax.request({
        url: contexto + "/Canjes",
        params:{
            bnd:22,
            idc:idc,
            idPrd:idPrd
        },
        success:function(rsp){
            var objJSON=rsp.responseText.evalJSON();
            if(objJSON.docs == 0){
                window.open(
                    contexto + "/HomeSubirArchivos?idCln=" + idc + "&tipoArch=431&idPrd=" + idPrd ,
                    "",
                    "directories=no, resizable=0, menubar=no,location=no,scrollbars=no,status=1,height=550, width=700"
                );
            }else{
                generarWndCanjes(idc,idPrd);
            }
        },
        failure:function(rsp){

        }
    });
}


