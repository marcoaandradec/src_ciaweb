/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns("com.punto.pen");

com.punto.pen.panelCxP = function(prm){
    var idc = (prm.idc == null ? 0 : prm.idc);

    var pnlCxP = new Ext.FormPanel({
            id: 'idPnlCxP',
            bodyStyle: "padding:5px 5px 0",
            layout:'form',
            width:800,
            height:432,
            autoScroll:true,
            items:[{
                xtype:"fieldset",
                title:"Direcciones del Paciente",
                layout:"fit",
                hideLabels:true,
                height:150,
                items:[
                new com.punto.pen.gridPanelCanjes(idc,'idPnCanjes')
                ]
            },{
                html:"<center><a href=# onclick=wndNuevaDireccion({idCnt:"+idc+",acc:'no'})>Nueva direccion</a></center>",
                border:false
            },{
                xtype:"fieldset",
                id:"idfsTipoDeEntregaCxP",
                title:"Tipo de entrega",
                layout:"column",
                autoHeight:true,
                autoScroll:false,
                items:[{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    width:300,
                    labelWidth:100,
                    labelAlign:"right",
                    autoScroll:false,
                    items:[{                
                        xtype:"combo",
                        id:"idcheckPersonalCxP",
                        width:120,
                        fieldLabel:"Tipo de entrega",                
                        allowBlank:false,
                        mode:"local",
                        name:"cmbTipoEntrega",
                        triggerAction:'all',
                        store:[[1,"Personal"],[2,"Mensajeria"],[3,"Almacen Pen"]],
                        listeners:{
                            'select':function(cmb){
                                //alert(cmb.getValue());
                            }

                        }
                    }
//                        {
//                        xtype:"checkbox",
//                        id:"idcheckPersonalCxP",
//                        fieldLabel:"Entrega personal",
//                        handler:function(){
////                            var chck = Ext.getCmp("idcheckPersonalCxP");
////                            if(chck.checked == true){
////                                Ext.getCmp("idCmbDestinoCxP").setVisible(false);
////                            }else{
////                                Ext.getCmp("idCmbDestinoCxP").setVisible(true);
////                            }
//                        }
//                    }
                    ]}
                    ,
                    {
                    xtype:"panel",
                    layout:"column",
                    border:false,
                    labelWidth:100,
                    labelAlign:"right",
                    autoScroll:false,
                    items:[
                        new com.punto.pen.ComboBox({
                            hidden:true,
                            id:"idCmbDestinoCxP",
                            etiqueta:"",
                            allowBlank:false,
                            name:"cmbDestinoCxP",
                            prm:{campo:"destino",idCampo:'idDestino',autoCarga:true,bnd:5,qry:57}
                        })]
                    }
                ]
            },{
                xtype:"fieldset",
                id:"idfsControlPuntos",
                title:"Control de puntos",
                autoHeight:true,
                items:[{
                        border:false,
                        autoLoad:{
                            url:contexto+'/Canjes',
                            params:{
                                bnd:7,
                                idc:idc
                            },
                            text:'Cargando puntos...'
                        }
                }]
            },{
                xtype:"fieldset",
                title:"Productos para canje",
                height:200,
                autoScroll:true,
                items:[{
                        border:false,
                        autoLoad:{
                            url:contexto+'/Canjes',
                            params:{
                                bnd:6,
                                idc:idc
                            },
                            text:'Cargando lista de premios...'
                        }
                }]
            },{
                xtype:"fieldset",
                id:"idfsProdsEntregar",
                title:"Productos a entregar",
                height:135,
                autoScroll:true,
                items:[{
                        border:false,
                        html:"<table align='center' width='80%'>\n\
                               <tr>\n\
                                <td align='center' width='60%'><h4>Producto</h4></td>\n\
                                <td align='center' width='20%'><h4>Puntos</h4></td>\n\
                                <td align='center' width='20%'><h4>Cantidad</h4></td>\n\
                               </tr>\n\
                              </table>"
                }]
            },{
                xtype:"hidden",
                id:"idHidenIdsOtrosProds",
                value:""
            },{
                xtype:"hidden",
                id:"idHidenCantidades",
                value:""
            },{
                xtype:"hidden",
                id:"idHidenTotPnts",
                value:""
            },{
                xtype:"hidden",
                id:"idHidenPntsPrem",
                value:""
            },{
                xtype:"hidden",
                id:"idHiddenPntsAcum",
                value:""
            }]
    });



    return pnlCxP;

}
function contarPuntos(checks,texts,pnts,hiden,idProdPrem,idPntPrem){
    var hidenProds = Ext.getCmp("idHidenIdsOtrosProds");
    var hidenCants = Ext.getCmp("idHidenCantidades");
    var hidenPntsPrem = Ext.getCmp("idHidenPntsPrem");
    var hidenPntsAcum = Ext.getCmp("idHiddenPntsAcum");
    var totPnt=0;
    var inicSpan = "";
    var finSpan = "";
    var btnGC = Ext.getCmp("idBtnGeneraCxP");
    var prods = "<table align='center' width='80%'>\n\
                   <tr>\n\
                    <td align='center' width='60%'><h4>Producto</h4></td>\n\
                    <td align='center' width='20%'><h4>Puntos</h4></td>\n\
                    <td align='center' width='20%'><h4>Cantidad</h4></td>\n\
                   </tr>";

   hidenProds.setValue("");
   hidenCants.setValue("");
   hidenPntsPrem.setValue("");
   hidenPntsAcum.setValue("");

    if(checks.length == undefined){
        var acumProd = 0;
        if(checks.checked == true){
            texts.disabled=false;
            acumProd = checks.value * texts.value;
            totPnt += parseInt(acumProd);

            if(texts.value != ""){
                prods += "<tr>\n\
                           <td>" + hiden.value + "</td>\n\
                           <td align='center'>" + acumProd + "</td>\n\
                           <td align='center'>" + texts.value + "</td>\n\
                          </tr>";

                hidenProds.setValue(hidenProds.getValue() + idProdPrem.value + ",");
                hidenCants.setValue(hidenCants.getValue() + texts.value + ",");
                hidenPntsPrem.setValue(hidenPntsPrem.getValue() + idPntPrem.value + ",");
                hidenPntsAcum.setValue(hidenPntsAcum.getValue() + acumProd + ",");
            }

        }else if(checks.checked == false){
            texts.value = 1;
            texts.disabled=true;

        }
    }else{
        for(var i=0; i < checks.length; i++){
            var acumProd = 0;
            if(checks[i].checked == true){
                texts[i].disabled=false;
                acumProd = checks[i].value * texts[i].value;
                totPnt += parseInt(acumProd);

                if(texts[i].value != ""){
                    prods += "<tr>\n\
                               <td>" + hiden[i].value + "</td>\n\
                               <td align='center'>" + acumProd + "</td>\n\
                               <td align='center'>" + texts[i].value + "</td>\n\
                              </tr>";

                    hidenProds.setValue(hidenProds.getValue() + idProdPrem[i].value + ",");
                    hidenCants.setValue(hidenCants.getValue() + texts[i].value + ",");
                    hidenPntsPrem.setValue(hidenPntsPrem.getValue() + idPntPrem[i].value + ",");
                    hidenPntsAcum.setValue(hidenPntsAcum.getValue() + acumProd + ",");
                }

            }else if(checks[i].checked == false){
                texts[i].value = 1;
                texts[i].disabled=true;

            }
        }
    }

    prods += "</table>";

    var pntsRes = pnts - totPnt;

    if(pntsRes < 0){
        inicSpan = "<h4 style=\"color:#FF0000;\">";
        finSpan = "</h4>";
        btnGC.setDisabled(true);
    }else{
        if(totPnt == 0){
            btnGC.setDisabled(true);
        }else{
            btnGC.setDisabled(false);
        }
    }

    var hidTotPnt = Ext.getCmp("idHidenTotPnts");
    hidTotPnt.setValue(totPnt);
    
    var fsPnt=Ext.getCmp("idfsControlPuntos");
    
    fsPnt.removeAll(true);
    fsPnt.add({
        html:"<table align='center'>\n\
               <tr>\n\
                <td><h4>Puntos actuales:</h4></td>\n\
                <td>" + pnts + "</td>\n\
                <td width='5%'>&nbsp;</td>\n\
                <td><h4>Puntos acumulados:</h4></td>\n\
                <td>" + totPnt + "</td>\n\
                <td width='5%'>&nbsp;</td>\n\
                <td><h4>Puntos Restantes:</h4></td>\n\
                <td>" + inicSpan + pntsRes + finSpan + "</td>\n\
               </tr>\n\
              </table>",
        border:false
    });
    fsPnt.doLayout();

    var fsPrdEntr = Ext.getCmp("idfsProdsEntregar");
    fsPrdEntr.removeAll(true);
    fsPrdEntr.add({
        html:prods,
        border:false
    });
    fsPrdEntr.doLayout();


}

function guardarCxP(idc){
    var hidenProds = Ext.getCmp("idHidenIdsOtrosProds");
    var hidenCants = Ext.getCmp("idHidenCantidades");
    var hidenTotPnts = Ext.getCmp("idHidenTotPnts");
    var hidenPntsPrem = Ext.getCmp("idHidenPntsPrem");
    var hidenPntsAcum = Ext.getCmp("idHiddenPntsAcum");
    var checDest = Ext.getCmp("idcheckPersonalCxP");
    var des = 30;
    var sta = 1;
    var dest = 0;

    if(checDest.getValue() == 1){
        sta = 16;
    }

    if(checDest.isVisible()==true){
        if(checDest.isValid()==false){
            Ext.MessageBox.show({
                title: 'Datos Incompletos',
                msg: 'Debe completar los datos obligatorios para continuar.(Campos marcados con rojo)',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
            exit();
        }else{
            dest = checDest.getValue();
        }
    }else{
        sta = 1;         
    }
    
    var msjCanje=Ext.MessageBox.show({
        msg: 'Generando canje......',
        progressText: 'Guardando...',
        width:300,
        wait:true,
        waitConfig: {
            interval:200
        },
        icon:'ext-mb-download', //custom class in msg-box.html
        animEl: 'mb7'
    });

    Ext.Ajax.request({
        url:contexto+'/Canjes',
        params:{
            bnd:11,
            idc:idc
        },
        success:function(rsp){
            var objJSON=rsp.responseText.evalJSON();
            if(objJSON.dirs == '0'){
                msjCanje.hide();
                Ext.MessageBox.show({
                    title: 'Datos Incompletos',
                    msg: "No hay direcciones destinadas para envio<br>seleccione alguna de las direcciones de arriba",
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }else{

                Ext.Ajax.request({
                    url : contexto+'/Canjes',
                    params:{
                        bnd:8,
                        idsProds:hidenProds.getValue(),
                        cants:hidenCants.getValue(),
                        totPnts:hidenTotPnts.getValue(),
                        idsPP:hidenPntsPrem.getValue(),
                        pntsAcum:hidenPntsAcum.getValue(),
                        idc:idc,
                        des:des,
                        sta:sta,
                        dest:dest
                    },
                    success:function(rsp){

                        //Ext.Msg.alert("Aviso", "Se registro el canje con exito");
                        msjCanje.hide();
                        Ext.Msg.show({
                            title:'Aviso',
                            msg: 'Se registro el canje con exito',
                            buttons: Ext.Msg.OK,
                            fn:function(btn){
                                if(btn == 'ok'){
                                    var bitac=Ext.getCmp("gridBuscadorBitacora");
                                    bitac.getStore().load();
                                    var nots = Ext.getCmp("idPanelNotasAnte");
                                    nots.load({url:contexto + '/Cliente?bnd=9&idCnt='+idc});
                                    var infoGen=Ext.getCmp("pnlInfoGeneral");
                                    infoGen.load({url:contexto + '/Cliente?bnd=2&idCnt='+idc});
                                    Ext.getCmp('idWndCxP').close();
                                }
                            }
                        });
                       

                        if(checDest.getValue() == 1){
                            var objJSON=rsp.responseText.evalJSON();
                            needToConfirm=false;
                            document.frmPdfEnvio.idEnvio.value = objJSON.idNewEnvio;
                            var formulario = document.frmPdfEnvio;
                            formulario.submit();
                        }
                        else{
                            Ext.getCmp('idWndCxP').close();
                        }


                    },
                    failure:function(rsp){
                    }
                });
            }
       },
       failure:function(rsp){
       }
   });
}



