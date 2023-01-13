/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("com.punto.pen");

var modulo = 0;
com.punto.pen.panelEnvioDispositivo = function(idCnt,idProd){

    var panelDispositivos = new Ext.FormPanel({
        id:"idPnlDispositivos",
        bodyStyle:"padding:5px 5px 0",
        layout:"form",
        width:987,
        height:382,
        autoScroll:true,
        items:[{
            xtype:"fieldset",
            title:"Direcciones del Paciente",
            layout:"fit",
            hideLabels:true,
            height:150,
            items:[
            new com.punto.pen.gridPanelCanjes(idCnt,"idPnCanjes")
            ]
        },{
            html:"<center><a href=# onclick=wndNuevaDireccion({idCnt:"+idCnt+",acc:'si'})>Nueva direccion</a></center>",
            border:false
        },
        new com.punto.pen.PanelRecetas({
            idCnt:idCnt,
            scrol:false,
            idPro:idProd,
            col:"si",
            idGrid:"idGridRecetaCanje",
            stre:1
        }).regresarGridRecetas()
        ,{
            html:"<center><a href=# onclick=wndNuevaReceta("+idCnt+","+idProd+")>Nueva receta</a></center>",
            border:false
        },{
            xtype:"fieldset",
            id:"idFsDispositivoEnviar",
            title:"Dispositivo",
            layout:"column",
            //hideLabels:true,
            height:100,
            items:[{
                xtype:"panel",
                title:"",
                id:"idPanelTipEnvDisp",
                layout:"form",
                labelWidth:100,
                labelAlign:"right",
                //autoScroll:false,
                border:false,
                items:[{
                    xtype:"combo",
                    id:"idcmbTipoEntregaDisp",
                    width:120,
                    fieldLabel:"Tipo de entrega",
                    allowBlank:false,
                    mode:"local",
                    name:"cmbTipoEntregaDips",
                    triggerAction:'all',
                    store:[[1,"Personal"],[2,"Mensajeria"],[3,"Almacen Pen"]],
                    listeners:{
                        'select':function(cmb){
                        //alert(cmb.getValue());
                        }

                    }
                }]
            },{
                xtype:"panel",
                title:"",
                id:"idPanelDispositivo",
                layout:"form",
                labelWidth:100,
                labelAlign:"right",
                //autoScroll:false,
                border:false,
                items:[
                new com.punto.pen.ComboBox({
                    id:"idCmbDispositivos",
                    etiqueta:"Dispositivo",
                    allowBlank:false,
                    name:"cmbDispositivoEnviar",
                    prm:{
                        campo:"dispEnviar",
                        idCampo:'idDispEnviar',
                        autoCarga:true,
                        bnd:5,
                        qry:52
                    }
                })]
            },{
                xtype:"panel",
                title:"",
                id:"idPanelObsDispositivo",
                layout:"form",
                labelWidth:100,
                labelAlign:"right",
                //autoScroll:false,
                border:false,
                items:[{
                    xtype:"textarea",
                    id:"idObsDispositivos",
                    fieldLabel:"Observaciones",
                    style:'text-transform: uppercase;',
                    height:50,
                    width:345,
                    enableKeyEvents:true,
                    listeners: {
                        blur:function(el){
                            el.setValue(el.getValue().trim())
                        },
                        'keyup' : function(elem, e){
                            elem.setValue(elem.getValue().toUpperCase());
                        },
                        'keypress':
                        function(txtField,e){
                            if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                                e.stopEvent();
                            }
                        }
                    }
                }]
            }]
        }]
    });
    return panelDispositivos;
}


com.punto.pen.panelCanjes = function(idCnt,idProd){

    var panelCanjs = new Ext.FormPanel({
        id:"idPnlCanjs",
        bodyStyle:"padding:5px 5px 0",
        layout:"form",
        width:987,
        height:382,
        autoScroll:true,
        items:[{
            xtype:"fieldset",
            title:"Direcciones del Paciente",
            layout:"fit",
            hideLabels:true,
            height:150,
            items:[
            new com.punto.pen.gridPanelCanjes(idCnt,"idPnCanjes")
            ]
        },{
            html:"<center><a href=# onclick=wndNuevaDireccion({idCnt:"+idCnt+",acc:'si'})>Nueva direccion</a></center>",
            border:false
        },
        new com.punto.pen.PanelRecetas({
            idCnt:idCnt,
            scrol:false,
            idPro:idProd,
            col:"si",
            idGrid:"idGridRecetaCanje",
            stre:1
        }).regresarGridRecetas()
        ,{
            html:"<center><a href=# onclick=wndNuevaReceta("+idCnt+","+idProd+")>Nueva receta</a></center>",
            border:false
        },
        panelRequisitosCanje(idProd,idCnt)
        ,
        panelResultadoDeCanje(idProd)
        ,
        panelOtrosDeCanje()
        ,
        panelNotasCanje()
        ,{id:"idHidenNumRecibir", xtype:"hidden", value:0}
        ,{id:"idHidenAcumProx", xtype:"hidden", value:0}
        ,{id:"idHidenIdsProds", xtype:"hidden", value:""}
        ,{id:"idHidenProdEntregar", xtype:"hidden", value:""}
        ,{id:"idHidenAcumAntes", xtype:"hidden", value:""}
        ,{id:"idHidenRecibe", xtype:"hidden", value:""}
        ,{id:"idHidenResultantes", xtype:"hidden", value:""}
        ///////////////////HIDDENS DIRECCION MEDICO/////////////////////////////
        ,{id:"idHidenCalleMed", xtype:"hidden", value:""}
        ,{id:"idHidenNumExtMed", xtype:"hidden", value:""}
        ,{id:"idHidenNumIntMed", xtype:"hidden", value:""}
        ,{id:"idHidenEntreCalle1Med", xtype:"hidden", value:""}
        ,{id:"idHidenEntreCalle2Med", xtype:"hidden", value:""}
        ,{id:"idHidenRef1Med", xtype:"hidden", value:""}
        ,{id:"idHidenRef2Med", xtype:"hidden", value:""}
        ,{id:"idHidenEdoMed", xtype:"hidden", value:""}
        ,{id:"idHidenDelMunMed", xtype:"hidden", value:""}
        ,{id:"idHidenColoniaMed", xtype:"hidden", value:""}
        ,{id:"idHidenCpMed", xtype:"hidden", value:""}
        ////////////////////////////////////////////////////////////////////////
        ]
    });
   
    return panelCanjs;
    
}

com.punto.pen.gridPanelCanjes = function(idc,idGrid){

    this.storeCanjes = new Ext.data.Store({
        autoLoad: false,
        baseParams: {
            bnd:1,
            start:0,
            limit:20
        },
        reader :new Ext.data.JsonReader( {
            totalProperty: 'total',
            root :'records',
            idProperty: 'id'
        },new com.punto.pen.RecordCanjes()),
        proxy :new Ext.data.HttpProxy( {
            url : contexto+'/Canjes'
        })
    });

    this.pbarCanjes = new Ext.PagingToolbar({
        id          : 'pgrid',
        pageSize    : 20,
        store       : this.storeCanjes,
        displayInfo : true,
        displayMsg  : 'Mostrando {0} - {1} Productos de {2}',
        emptyMsg    : "No hay datos para mostrar"
    });

    this.pnlCanjes = new Ext.grid.GridPanel({
        name            :"pnCanjes",
        title           :"",
        border          : false,
        id              : idGrid,
        store           : this.storeCanjes,
        stripeRows      : true,
        sm              : new Ext.grid.RowSelectionModel({
            singleSelect:true
        }),
        loadMask        : true,
        viewConfig      : {
                autoFill: true,
                forceFit: true
        },
        enableHdMenu    : true,
        autoScroll      : true,
        frame           : false,
        bbar            : this.pbarCanjes,
        columns         : [
        new Ext.grid.RowNumberer(),
            {header: "Accion", width: 50, sortable: true, dataIndex: 'accion'},
            {header: "Parentesco", width: 50, sortable: true, dataIndex: 'parentesco'},
            //{header: "Direccion", width: 50, sortable: true, dataIndex: 'tipodir'},
            {header: "Calle", width: 50, sortable: true, dataIndex: 'calle'},
            {header: "Colonia", width: 50, sortable: true, dataIndex: 'colonia'},
            {header: "Municipio", width: 90, sortable: true, dataIndex: 'municipio'},
            {header: "Estado", width: 45, sortable: true, dataIndex: 'estado'}
        ],
        listeners:{
             rowdblclick:function(grid){
                var record = grid.getSelectionModel().getSelected();
                 wndNuevaDireccion({idCnt:idc,acc:"si",record:record});
                
             }
        }
    });
    return this.pnlCanjes;
}

function wndNuevaReceta(idCnt,idPro){
    var rec =new com.punto.pen.PanelRecetas({
        scrol:false,
        id:'pnlRecetas',
        url:contexto+'/Recetas',
        'idCnt':idCnt,
        bnd:6,
        border:false,
        'idPro':idPro
    }).regresaFormRecetas();
    
    var wnd = new Ext.Window({
        title:"Nueva receta",
        id:"idNuevaReceta",
        width:950,
        //
        constrainHeader :true,
        constrain :true,
        //
        autoHeight:true,
        modal:true,
        border:false,
        autoScroll:false,
        items:[rec],
        buttons:[
        {
            text:'Guardar',
            handler:function(){
                var panel = Ext.getCmp('FormRecetas2');
                submitFormulario(panel,{
                    //wnd:"idNuevaReceta",
                    url:contexto+'/Recetas',
                    'idCnt':idCnt,
                    'idPrd':idPro,
                    bnd:2,
                    mnsj:"",
                    nDir:'si',
                    wind:Ext.getCmp("idNuevaReceta")
                });
            }
        },{
            text:'Cancelar',
            handler:function(){
                wnd.close();
            }
        }
        ]
    });
    //alert(idCnt+","+idPro);
    wnd.show();

    Ext.Ajax.request({
        url : contexto+'/Canjes',
        params:{
            bnd:9,
            idPro:idPro
        },
        success:function(rsp){
            var objJSON=rsp.responseText.evalJSON();
            Ext.getCmp('idComboRecProdFamilia').setValue(objJSON.fam);
            Ext.getCmp('idHidenProdFamiliaRec').setValue(objJSON.idfam);
            Ext.getCmp('idComboRecProdFamilia').setDisabled(true);

        },
        failure:function(rsp){

        }
    });
    
}


function wndNuevaDireccion(parametros){
    var idCnt = parametros.idCnt;
    var acc = parametros.acc;
    var record = (parametros.record == null ? "" : parametros.record);
    var editDir = false;
    var idDirCont = "";
    var tipContVal = "";
    var nombreVal = "";
    var aPaternoVal = "";
    var aMaternoVal = "";
    var calleVal = "";
    var nExtVal = "";
    var nIntVal = "";
    var entCalle1Val = "";
    var entCalle2Val = "";
    var ref1Val = "";
    var ref2Val = "";
    var edoVal = "";
    var delMnpoVal = "";
    var coloniaVal = "";
    var cpVal = "";
    var horaDeVal = "";
    var horaAVal = "";
    var tipTelVal = "";
    var ladaVal = "";
    var telVal = "";

    if(record != ""){
        editDir = true;
        idDirCont = record.get("idProd");
        tipContVal = record.get("parentesco");
        nombreVal = record.get("nombre");
        aPaternoVal = record.get("apaterno");
        aMaternoVal = record.get("amaterno");
        calleVal = record.get("calle");
        nExtVal = record.get("nExt");
        nIntVal = record.get("nInt");
        entCalle1Val = record.get("calle1");
        entCalle2Val = record.get("calle2");
        ref1Val = record.get("ref1");
        ref2Val = record.get("ref2");
        edoVal = record.get("estado");
        delMnpoVal = record.get("municipio");
        coloniaVal = record.get("colonia");
        cpVal = record.get("cp");
        horaDeVal = record.get("horaDe");
        horaAVal = record.get("horaA");
        tipTelVal = record.get("tipTel");
        ladaVal = record.get("lada");
        telVal = record.get("telefono");
    }
    
    var tipContId = "tipContIdCanj";
    var nombreId = "nombreIdCanj";
    var aPaternoId = "aPaternoIdCanj";
    var aMaternoId = "aMaternoIdCanj";
    var calleId = "calleIdCanj";
    var nExtId = "nExtIdCanj";
    var nIntId = "nIntIdCanj";
    var entCalle1Id = "entCalle1IdCanj";
    var entCalle2Id = "entCalle2IdCanj";
    var ref1Id = "ref1IdCanj";
    var ref2Id = "ref2IdCanj";
    var edoId = "edoIdCanj";
    var delMnpoId = "delMnpoIdCanj";
    var coloniaId = "coloniaIdCanj";
    var cpId = "cpIdCanj";
    var horaDeId = "horaDeIdCanj";
    var horaAId = "horaAIdCanj";
    var tipTelId = "tipTelIdCanj";
    var ladaId = "ladaIdCanj";
    var telId = "telIdCanj";

    var titleWnd = "Nueva dirección";

    if(editDir == true){
        titleWnd = "Editar dirección";
    }

    var wnd = new Ext.Window({
        title:titleWnd,
        id:"idNuevaDireccion",
        width:982,
        //
        constrainHeader :true,
        constrain :true,
        //
        autoHeight:true,
        modal:true,
        border:false,
        autoScroll:false,
        items:[new Ext.FormPanel({
            url:contexto+'/Canjes',
            id: 'idPanelNuevaDir',
            bodyStyle: "padding:5px 5px 0",
            layout:'form',
            width:972,
            autoHeight:true,
            items:[new com.punto.pen.getFormDireccionContacto({
                    editDir:editDir,
                    tipContVal:tipContVal.replace("<div class=LineVerde>","").replace("</div>",""),
                    nombreVal:nombreVal,
                    aPaternoVal:aPaternoVal,
                    aMaternoVal:aMaternoVal,
                    calleVal:calleVal.replace("<div class=LineVerde>","").replace("</div>",""),
                    nExtVal:nExtVal,
                    nIntVal:nIntVal,
                    entCalle1Val:entCalle1Val,
                    entCalle2Val:entCalle2Val,
                    ref1Val:ref1Val,
                    ref2Val:ref2Val,
                    edoVal:edoVal.replace("<div class=LineVerde>","").replace("</div>",""),
                    delMnpoVal:delMnpoVal.replace("<div class=LineVerde>","").replace("</div>",""),
                    coloniaVal:coloniaVal.replace("<div class=LineVerde>","").replace("</div>",""),
                    cpVal:cpVal,
                    horaDeVal:horaDeVal,
                    horaAVal:horaAVal,
                    tipTelVal:tipTelVal,
                    ladaVal:ladaVal,
                    telVal:telVal,

                    tipCont:tipContId,
                    nombre:nombreId,
                    aPaterno:aPaternoId,
                    aMaterno:aMaternoId,
                    calle:calleId,
                    nExt:nExtId,
                    nInt:nIntId,
                    entCalle1:entCalle1Id,
                    entCalle2:entCalle2Id,
                    ref1:ref1Id,
                    ref2:ref2Id,
                    edo:edoId,
                    delMnpo:delMnpoId,
                    colonia:coloniaId,
                    cp:cpId,
                    horaDe:horaDeId,
                    horaA:horaAId,
                    tipTel:tipTelId,
                    lada:ladaId,
                    tel:telId
            })
//                new com.punto.pen.regPaciente({
//                idPnl:"idPanelDP"
//            }).returnFieldsetDireccion()
        ]
        })],
        buttons:[
        {
            text:'Aceptar',
            handler:function(){
                var validos     = true;
                var tipCont     = Ext.getCmp(tipContId);
                var nombre      = Ext.getCmp(nombreId);
                var aPaterno    = Ext.getCmp(aPaternoId);
                var aMaterno    = Ext.getCmp(aMaternoId);
                var calle       = Ext.getCmp(calleId);
                var nExt        = Ext.getCmp(nExtId);
                var nInt        = Ext.getCmp(nIntId);
                var entCalle1   = Ext.getCmp(entCalle1Id);
                var entCalle2   = Ext.getCmp(entCalle2Id);
                var ref1        = Ext.getCmp(ref1Id);
                var ref2        = Ext.getCmp(ref2Id);
                var edo         = Ext.getCmp(edoId);
                var delMnpo     = Ext.getCmp(delMnpoId);
                var colonia     = Ext.getCmp(coloniaId);
                var cp          = Ext.getCmp(cpId);
                var horaDe      = Ext.getCmp(horaDeId);
                var horaA       = Ext.getCmp(horaAId);
                var tipTel      = Ext.getCmp(tipTelId);
                var lada        = Ext.getCmp(ladaId);
                var tel         = Ext.getCmp(telId);
                
                var objs = [tipCont,nombre,aPaterno,aMaterno,calle,nExt,nInt,entCalle1,entCalle2,ref1,ref2,edo,delMnpo,colonia,cp,horaDe,horaA,tipTel,lada,tel];

                for (var i = 0; i < objs.length; i++){
                    if(objs[i].isValid() == false){
                        validos = false;
                        break;
                    }
                }

                if(validos == true){
                    Ext.Ajax.request({
                        url:contexto + '/Canjes',
                        params:{
                            bnd:14,
                            idDirCont:idDirCont,
                            idCnt:idCnt,
                            editDir:editDir,
                            tipCont:tipCont.getRawValue(),
                            nombre:nombre.getValue(),
                            aPaterno:aPaterno.getValue(),
                            aMaterno:aMaterno.getValue(),
                            calle:calle.getValue(),
                            nExt:nExt.getValue(),
                            nInt:nInt.getValue(),
                            entCalle1:entCalle1.getValue(),
                            entCalle2:entCalle2.getValue(),
                            ref1:ref1.getValue(),
                            ref2:ref2.getValue(),
                            edo:edo.getRawValue(),
                            delMnpo:delMnpo.getRawValue(),
                            colonia:colonia.getRawValue(),
                            cp:cp.getRawValue(),
                            horaDe:horaDe.getValue(),
                            horaA:horaA.getValue(),
                            tipTel:tipTel.getRawValue(),
                            lada:lada.getValue(),
                            tel:tel.getValue()
                        },
                        success:function(rsp){
                            var objJSON=rsp.responseText.evalJSON();
                            if(objJSON.success == true){
                                cargaGridCanjes(idCnt,"idPnCanjes");
                                wnd.close();
                            }else if(objJSON.success == false){

                            }
                        },
                        failure:function(rsp){

                        }
                    });
                }else{
                    Ext.MessageBox.show({
                        title: 'Datos Incompletos',
                        msg: 'Debe completar los datos obligatorios para continuar (Campos marcados con rojo)',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
                
               
//                submitFormulario(Ext.getCmp('idPanelNuevaDir'),{
//                    bnd:2,
//                    wind:Ext.getCmp('idNuevaDireccion'),
//                    'idAcc':idAccion,
//                    'idTree':idArbol,
//                    'idCnt':idCnt,
//                    nDir:acc
//                });
            }
        },
        {
            text:'Cancelar',
            handler:function(){
                wnd.close();
            }
        }
        ]
    });

    wnd.show();
}
function cargaGridCanjes(idc,idGrid){
    var grd = Ext.getCmp(idGrid);
    var store = grd.getStore();
    store.load({
        params:{
            start:0,
            limit:20,
            bnd:10,
            idc:idc
        }
    });
}
function panelRequisitosCanje(idProd,idCnt){
    var panelRequisitos = {
        xtype:"fieldset",
        title:"Requisitos de canje",
        layout:"fit",
        hideLabels:true,
        height:140,
        //autoScroll:true,
        items:[{
            align:"center",
            border:false,
            autoLoad:{
                url:contexto+'/Canjes',
                params:{
                    bnd:3,
                    idProd:idProd,
                    idCnt:idCnt,
                    reglaClexane:reglaClexane
                },
                text:'Cargando productos...'
            }
        }]
    }
    return panelRequisitos;

}
function panelResultadoDeCanje(idProd){
    var panelResultados = {
        xtype:"fieldset",
        id:"idPanelResCanj",
        title:"Resultados de canje",
        layout:"fit",
        hideLabels:true,
        autoHeight:true,
        items:[{
            html:"<table align='center' width='60%'>\n\
                       <tr>\n\
                        <td align='center'><h4>Recibidas</h4></td>\n\
                        <td align='center'><h4>Aceptadas</h4></td>\n\
                        <td align='center'><h4>Proximo canje</h4></td>\n\
                        <td align='center'><h4>Entregar</h4></td>\n\
                        <td align='center'><h4>Cajas a entregar</h4></td>\n\
                        <td align='center'><h4>Presentación</h4></td>\n\
                       </tr>\n\
                       <tr>\n\
                        <td align='center'>0</td>\n\
                        <td align='center'>0</td>\n\
                        <td align='center'>0</td>\n\
                        <td align='center'>0</td>\n\
                        <td align='center'>0</td>\n\
                        <td align='center'>0</td>\n\
                       </tr>\n\
                      </table>",
            border:false
        }]
    }
    return panelResultados;

}
function panelTotalEntregar(){
    var panelResultados = {
        xtype:"fieldset",
        id:"idPanelTotalEntr",
        title:"Total a entregar",
        layout:"fit",
        hideLabels:true,
        autoHeight:true,
        items:[{
            html:"<table align=center>\n\
                <tr>\n\
                 <th><h4>Concepto</h4></th>\n\
                 <th>&nbsp;</th>\n\
                 <th><h4>Dosis</h4></th>\n\
                 <th>&nbsp;</th>\n\
                 <th><h4>Presentación</h4></th>\n\
                 <th>&nbsp;</th>\n\
                 <th><h4>Cantidad</h4></th>\n\
                </tr>\n\
               </table>",
            border:false
        }]
    }
    return panelResultados;

}

function panelOtrosDeCanje(){
    var panelResultados =        
        {
        xtype:"fieldset",
        id:"idPanelOtrosCanje",
        title:"Otros datos",
        layout:"form",
        //hideLabels:true,
        height:150,
        items:[
        {xtype:"panel",
        layout:"column",
        border:false,
        //bodyStyle:'padding:0px 0px 0px 0px; background-color:#000000;',
        items:[
        {
            xtype:"panel",
            title:"",
            id:"idPanelTipoConsumo",
            layout:"form",
            labelWidth:100,
            labelAlign:"right",
            //autoScroll:false,
            border:false,
            items:[
            {                
                xtype:"combo",
                id:"idcheckPersonal",
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
            },
            //            {
            //                xtype:"checkbox",
            //                id:"idcheckPersonal",
            //                fieldLabel:"Entrega personal"
            //            },
            saltoLine(1),
            new com.punto.pen.ComboBox({
                id:"idCmbTipoConsumo",
                etiqueta:"Tipo de consumo",
                allowBlank:false,
                name:"cmbTipoConsumo",
                prm:{
                    campo:"tipoConsumo",
                    idCampo:'idTipoConsumo',
                    autoCarga:true,
                    bnd:5,
                    qry:36
                }
            }),
            saltoLine(1),
            {
                id:"idDateDeseableRec",
                xtype:"datefield",
                allowBlank:false,
                fieldLabel:"Fecha para recibir",
                name:"dateFechaRec"
            }
            ]
        }
        ,
        {
            xtype:"panel",
            title:"",
            id:"idPanelCantidadDosis",
            allowBlank:false,
            layout:"form",
            labelWidth:100,
            labelAlign:"right",
            //autoScroll:false,
            border:false,
            items:[{
                id:"idCheckPideRec",
                xtype:"checkbox",
                fieldLabel:"Pedir receta"
            },
            saltoLine(1),
            new com.punto.pen.ComboBox({
                id:"idCmbCantidadDosis",
                etiqueta:"Cantidad dosis",
                allowBlank:false,
                name:"cmbCantidadDosis",
                prm:{
                    campo:"cantidadDosis",
                    idCampo:'idCantidadDosis',
                    autoCarga:true,
                    bnd:5,
                    qry:37
                }
            }),
            saltoLine(1)
            /*
            new com.punto.pen.ComboBox({
                hidden:true,
                id:"idCmbDestino",
                etiqueta:"Suc. resposable",
                allowBlank:false,
                name:"cmbDestino",
                prm:{
                    campo:"destino",
                    idCampo:'idDestino',
                    autoCarga:true,
                    bnd:5,
                    qry:57
                }
            })
            */
            ]
        }
        ,
        {
            xtype:"panel",
            title:"",
            id:"idPanelTickets",
            layout:"form",
            labelWidth:100,
            labelAlign:"right",
            //autoScroll:false,
            border:false,
            items:[{
                id:"idCheckPideTicket",
                xtype:"checkbox",
                fieldLabel:"Pedir Cajas"
            },
//            saltoLine(1),
//            new com.punto.pen.ComboBox({
//                id:"idCmbTickets",
//                etiqueta:"Tickets",
//                allowBlank:false,
//                name:"cmbTickets",
//                prm:{
//                    campo:"tickets",
//                    idCampo:'idTickets',
//                    autoCarga:true,
//                    bnd:5,
//                    qry:38
//                }
//            }),
            saltoLine(1),
            {
                xtype:'textfield',
                fieldLabel:'No. lote de caja',
                id:'idNomLoteCaja',
                name:'nomLoteCaja',
                width:150,
                allowBlank:false
            },
            saltoLine(1),            
            
                /*{
                    xtype:'textfield',
                    fieldLabel:'Medico dirigido',
                    id:'idMedicoDirigido',
                    name:'nomMedicoDirigido',
                    width:150
                }*/{
                    id:"idHidenMedicoDirigido",
                    xtype:"hidden",
                    value:"0"
                }
            ]
            
        },{
            xtype:"panel",
            title:"",
            id:"idPanelBtnDoc",
            layout:"form",
            labelWidth:100,
            labelAlign:"right",
            //autoScroll:false,
            border:false,
            items:[
                {
                    id:"idCheckPideTarjeta",
                    xtype:"checkbox",
                    fieldLabel:"Enviar Tarjeta"
                },
                saltoLine(6)
                /*{
                    xtype:"button",
                    text:"Buscar Médico",
                    handler:function(){
                        getBuscadorMedico({
                            idPnl:"pnlBuscadorMedico2",
                            idWnd:"idPanelBuscarMedico2",
                            idTxt:"idMedicoDirigido",
                            idHiden:"idHidenMedicoDirigido",
                            desdeCanjes:true
                        });
                    }
                }*/
            ]
        }
        ]},{
            xtype:"panel",
            align:"center",
            id:"idPanelDireccionMedico",
            border:false,
            bodyStyle:'padding:0px 0px 0px 0px; background-color:#000000;',
            items:[]
        }]
    }
    return panelResultados;

}


function panelNotasCanje(){
    var panelNotas = new Ext.Panel({
        xtype:"panel",
        layout:"column",
        border:false,
        items:[{
            xtype:"panel",
            layout:"form",
            labelAlign:"top",
            columnWidth:0.5,
            border:false,
            items:[{
                xtype:"textarea",
                id:"idAreaObservacionCanje",
                name:"areaObservacionesCanje",
                fieldLabel:"Observaciones",
                width:370,
                tabIndex:153,
                style:'text-transform: uppercase;',
                enableKeyEvents:true,
                listeners: {
                    blur:function(el){
                        el.setValue(el.getValue().trim())
                    },
                    'keyup' : function(elem, e){
                        elem.setValue(elem.getValue().toUpperCase());
                    },
                    'keypress':
                    function(txtField,e){
                        if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                            e.stopEvent();
                        }
                    }
                }
            //allowBlank:obsTF
            }]
        }]
    });
    return panelNotas;
}

function cambiaDirecPrincipal(idd,idc){
    Ext.Ajax.request({
        url : contexto+'/Canjes',
        params:{
            bnd:4,
            idd:idd,
            idc:idc
        },
        success:function(rsp){
            cargaGridCanjes(idc,'idPnCanjes');
        },
        failure:function(rsp){

        }
    });
}




function verResultsCanje(cajas,val,promo,present,req,envMax,ptsAc,idProd,present2,rq,idsProds){
    var promoc;
    var maxAceptadas;
    var aceptadas;
    var acumProxCanje;
    var valor;
    var recibidas;
    var caja1;
    var caja2;
    var pastEntregar;
    var cajsEntregar;
    var cadRec;
    var idsRecs;
    var presEntregar;
    var prdEntr;

    var acumAntes = ptsAc;
    var recibe;
    var resultantes;

    var dosis;

    if((idProd >= 27 && idProd <= 30) || (idProd >= 57 && idProd <= 62) || idProd == 189 || idProd == 190 || idProd == 264 || idProd == 265 || idProd == 177 || idProd == 178 || idProd == 117 || idProd == 118 || idProd == 216 || idProd == 217 || idProd == 477 || idProd == 478){
        if(idProd == 61 || idProd == 62){
            if(cajas.length != undefined){
                caja1 = parseInt(isNaN(cajas[0].value)== true || cajas[0].value== "" ? 0 : cajas[0].value);
                caja2 = parseInt(isNaN(cajas[1].value)== true || cajas[1].value== "" ? 0 : cajas[1].value);
            }

            //alert(present2[0].value);
            presEntregar = present2[0].value;
            prdEntr = idsProds[0].value;

            promoc = rq[0].value/present2[0].value;
            maxAceptadas = rq[0].value * envMax;
            aceptadas=0;
            acumProxCanje=0;
            valor = caja1 + caja2;
            cadRec = caja1 + "," + caja2;

            recibe = (present2[0].value * caja1);
            recibe += (present2[1].value * caja2);

            recibidas = (present2[0].value * caja1);
            recibidas += (present2[1].value * caja2) + ptsAc;

            idsRecs = idsProds[0].value + "," + idsProds[1].value;

            Ext.getCmp("idHidenIdsProds").setValue(idsRecs);

            if(recibidas<=maxAceptadas){
                for(var i=1; i<=envMax; i++){
                    if(recibidas>=i*rq[0].value){
                        aceptadas=rq[0].value*i;
                    }
                }
                acumProxCanje=recibidas%rq[0].value;
            }else{
                aceptadas = maxAceptadas;
                acumProxCanje = 0;
            }

            pastEntregar = aceptadas/promoc*2;
            cajsEntregar = aceptadas/rq[0].value*2;
        //cajsEntregar = present2[0].value;

        //        alert(present2[0].value);
        //        alert(present2[1].value);

            resultantes = acumProxCanje;
            dosis = "150mg/12.5mg";
        }else{
            if(cajas.length != undefined){
                caja1 = parseInt(isNaN(cajas[0].value)== true || cajas[0].value== "" ? 0 : cajas[0].value);
                caja2 = parseInt(isNaN(cajas[1].value)== true || cajas[1].value== "" ? 0 : cajas[1].value);
            }

            //alert(present2[0].value);
            presEntregar = present2[0].value;
            prdEntr = idsProds[0].value;

            promoc = rq[0].value/present2[0].value;
            maxAceptadas = rq[0].value * envMax;
            aceptadas=0;
            acumProxCanje=0;
            valor = caja1 + caja2;
            cadRec = caja1 + "," + caja2;

            recibe = (present2[0].value * caja1);
            recibe += (present2[1].value * caja2);

            recibidas = (present2[0].value * caja1);
            recibidas += (present2[1].value * caja2) + ptsAc;

            idsRecs = idsProds[0].value + "," + idsProds[1].value;

            Ext.getCmp("idHidenIdsProds").setValue(idsRecs);

            if(recibidas<=maxAceptadas){
                for(var i=1; i<=envMax; i++){
                    if(recibidas>=i*rq[0].value){
                        aceptadas=rq[0].value*i;
                    }
                }
                acumProxCanje=recibidas%rq[0].value;
            }else{
                aceptadas = maxAceptadas;
                acumProxCanje = 0;
            }

            pastEntregar = aceptadas/promoc;
            cajsEntregar = aceptadas/rq[0].value;
        //cajsEntregar = present2[0].value;

        //        alert(present2[0].value);
        //        alert(present2[1].value);

            resultantes = acumProxCanje;
        }
    }else{
        presEntregar = present;
        prdEntr = idsProds.value;
        promoc = req/present;
        maxAceptadas = req * envMax;
        aceptadas=0;
        acumProxCanje=0;        
        valor = parseInt(val.value);
        cadRec = val.value;

        recibe = present * valor;

        recibidas = (present * valor) + ptsAc;

        Ext.getCmp("idHidenIdsProds").setValue(idsProds.value);

        if(recibidas<=maxAceptadas){
            for(var i=1; i<=envMax; i++){
                if(recibidas>=i*req){
                    aceptadas=req*i;
                }
            }
            acumProxCanje=recibidas%req;
        }else{
            aceptadas = maxAceptadas;
            acumProxCanje = 0;
        }
        
        pastEntregar = aceptadas/promoc;
        cajsEntregar = aceptadas/req;

        resultantes = acumProxCanje;
    }

    ////////////Historial de pastillas///////////////
    Ext.getCmp("idHidenAcumAntes").setValue(acumAntes);
    Ext.getCmp("idHidenRecibe").setValue(recibe);
    Ext.getCmp("idHidenResultantes").setValue(resultantes);
    /////////////////////////////////////////////////

    Ext.getCmp("idHidenProdEntregar").setValue(prdEntr);
    Ext.getCmp("idHidenNumRecibir").setValue(cadRec);
    //Ext.getCmp("idHidenNumRecibir").setValue(valor);
    Ext.getCmp("idHidenAcumProx").setValue(acumProxCanje);

    var pnlRes=Ext.getCmp("idPanelResCanj");
    pnlRes.removeAll(true);
    pnlRes.add({
        html:"<table align='center' width='60%'>\n\
                       <tr>\n\
                        <td align='center'><h4>Recibidas</h4></td>\n\
                        <td align='center'><h4>Aceptadas</h4></td>\n\
                        <td align='center'><h4>Proximo canje</h4></td>\n\
                        <td align='center'><h4>Entregar</h4></td>\n\
                        <td align='center'><h4>Cajas a entregar</h4></td>\n\
                        <td align='center'><h4>Presentación</h4></td>\n\
                        " + (idProd == 61 || idProd == 62 ? "<td align='center'><h4>Dosis</h4></td>" : "") + "\n\
                        </tr>\n\
                       <tr>\n\
                        <td align='center'>" + recibidas + "</td>\n\
                        <td align='center'>" + aceptadas + "</td>\n\
                        <td align='center'>" + acumProxCanje + "</td>\n\
                        <td align='center'>" + pastEntregar + "</td>\n\
                        <td align='center'>" + cajsEntregar + "</td>\n\
                        <td align='center'>" + presEntregar + "</td>\n\
                       " + (idProd == 61 || idProd == 62 ? "<td align='center'>" + dosis + "</td>" : "") + "\n\
                       </tr>\n\
                      </table>",
        border:false
    });
    pnlRes.add({
        xtype:"hidden",
        id:"idHidenNoCajas",
        value:cajsEntregar
    });

    pnlRes.doLayout();

    if(val.value==""){
        val.value = 0;
        verResultsCanje(cajas,val,promo,present,req,envMax,ptsAc,idProd,present2,rq,idsProds);
        val.select();
    }
//alert(valor);
}

function enviarCanje(idc,prd){
    var dirPrev = "";
    var nomUsr = "";
    var datCli = "";
    var numRece = "";
    
    var vacios = "no";
    var campos;
    var des = 0;
    var sta = 1;
    var dest = 0;
    var checDest = Ext.getCmp("idcheckPersonal");
    var idsPrs = Ext.getCmp("idHidenIdsProds").getValue();
    var prdEntr = Ext.getCmp("idHidenProdEntregar").getValue();
    var med = "";
    var idMed = "";
    var acumAntes = Ext.getCmp("idHidenAcumAntes").getValue();
    var recibe = Ext.getCmp("idHidenRecibe").getValue();
    var resultantes = Ext.getCmp("idHidenResultantes").getValue();

//    var txtMed = Ext.getCmp("idMedicoDirigido");
//    var hidMed = Ext.getCmp("idHidenMedicoDirigido");
//
//    if(txtMed.getValue() != "" && hidMed.getValue() != "0"){
//        med = txtMed.getValue();
//        idMed = hidMed.getValue();
//    }

    if(checDest.getValue() == 1){
        sta = 16;
    }
    //    if(checDest.checked == true){
    //        sta = 16;
    //    }

    if(checDest.isVisible()==true){
        campos = new Array(
            checDest,
            Ext.getCmp('idCmbTipoConsumo'),
            Ext.getCmp('idDateDeseableRec'),
            Ext.getCmp('idCmbCantidadDosis')
//            ,
//            Ext.getCmp('idCmbTickets')
            );
        dest = checDest.getValue();
    }else{
        campos = new Array(            
            Ext.getCmp('idCmbTipoConsumo'),
            Ext.getCmp('idDateDeseableRec'),
            Ext.getCmp('idCmbCantidadDosis')
//            ,
//            Ext.getCmp('idCmbTickets')
            );        
    }
    des = 30;
    var pRec = Ext.getCmp("idCheckPideRec").getValue();
    var pTik = Ext.getCmp("idCheckPideTicket").getValue();
    var rec = Ext.getCmp("idHidenNumRecibir").getValue();
    var acum = Ext.getCmp("idHidenAcumProx").getValue();
    var pTar = Ext.getCmp("idCheckPideTarjeta").getValue();

    for(var i = 0; i < campos.length; i++){
        if(campos[i].isValid()==false){
            vacios="si";
            break;
        }
    }

    if(vacios == "si" || recibe == ""){
        Ext.MessageBox.show({
            title: 'Datos Incompletos',
            msg: 'Debe completar los datos obligatorios para continuar (Campos marcados con rojo), o aun no se define el numero de cajas recibidas',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return(false);
        //exit();
    }

    var obs = Ext.getCmp('idAreaObservacionCanje').getValue();
    //var vTik = Ext.getCmp('idCmbTickets').getValue();
    var fe = Ext.getCmp('idDateDeseableRec').getValue();
    //var nTik = (vTik < 136 ? vTik - 129 : (vTik == 136 ? vTik - 130 : vTik - 131));
    var nCjs = Ext.getCmp('idHidenNoCajas').getValue();
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
            dirPrev = objJSON.dirPrev;
            nomUsr = objJSON.usr;
            datCli = objJSON.datCli;
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
                    url:contexto + '/Canjes',
                    params:{
                        bnd:10,
                        idc:idc,
                        prd:prd
                    },
                    success:function(rsp){
                        var objJSON=rsp.responseText.evalJSON();
                        numRece = objJSON.recs;

                        if(objJSON.recs == '0'){
                            msjCanje.hide();
                            Ext.MessageBox.show({
                                title: 'Datos Incompletos',
                                msg: 'No hay recetas activas para este medicamento',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        }else{                            
                            new com.punto.pen.panelVistaPrevia({
                                prd:prd,
                                dirPrev:dirPrev,
                                nomUsr:nomUsr,
                                datCli:datCli,
                                obs:(obs + (prd == 5 ? " -- Paciente registrado al programa con Actonel trio" : "")).toUpperCase(),
                                acumAntes:acumAntes,
                                recibe:recibe,
                                resultantes:resultantes,
                                pRec:pRec,
                                numRece:numRece,
                                pTik:pTik,
                                idsPrs:idsPrs,
                                rec:rec,
                                nCjs:nCjs,
                                pTar:pTar,
                                botones:[{
                                        text:"Generar envio",
                                        handler:function(){
                                            Ext.Msg.show({
                                            title:'Datos completos',
                                            msg: 'El envio se va a generar ¿Continuar?',
                                            buttons: Ext.Msg.YESNO,
                                            //animEl: 'elId',
                                            //icon: Ext.MessageBox.WARNING,
                                            fn: function(btn){
                                                if(btn == 'no'){
                                                }
                                                if(btn == 'yes'){
                                                    Ext.MessageBox.show({
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
                                                            bnd:5,
                                                            idc:idc,
                                                            prd:prd,
                                                            obs:obs,
                                                            nTik:0,
                                                            fe:fe,
                                                            nCjs:nCjs,
                                                            des:des,
                                                            pRec:pRec,
                                                            pTik:pTik,
                                                            rec:rec,
                                                            acum:acum,
                                                            sta:sta,
                                                            dest:dest,
                                                            idsPrs:idsPrs,
                                                            prdEntr:prdEntr,
                                                            idMed:idMed,
                                                            acumAntes:acumAntes,
                                                            recibe:recibe,
                                                            resultantes:resultantes,
                                                            pTar:pTar
                                                        },
                                                        success:function(rsp){
                                                            var objJSON2=rsp.responseText.evalJSON();
                                                            var mnsj = "Se registraron y acumularon pastillas para el proximo canje";
                                                            if(nCjs > 0){
                                                                mnsj = "Se registro el canje con exito, Envío: " + objJSON2.idNewEnvio;
                                                            }
                                                            msjCanje.hide();
                                                            Ext.Msg.show({
                                                                title:'Aviso',
                                                                msg: mnsj,
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
                                                                        Ext.getCmp('idWndCanjes').close();
                                                                    }
                                                                }
                                                            });
                                                            if(objJSON2.idNewEnvio != 0){
                                                                if(checDest.getValue() == 1){
                                                                    needToConfirm=false;
                                                                    document.frmPdfEnvio.idEnvio.value = objJSON2.idNewEnvio;
                                                                    var formulario = document.frmPdfEnvio;
                                                                    formulario.submit();
                                                                }
                                                            }
                                                        },
                                                        failure:function(rsp){
                                                            msjCanje.hide();
                                                        }
                                                    });
                                                    wndVistaEnv.close();
                                                }                                                
                                            }
                                        });

                                        }
                                    },{
                                        text:"Regresar",
                                        handler:function(){
                                            msjCanje.hide();
                                            wndVistaEnv.close();
                                        }
                                    }]
                            });                            

                            
                        }
                    },
                    failure:function(rsp){
                        msjCanje.hide();
                    }
                });
            }
        },
        failure:function(rsp){
            msjCanje.hide();
        }
    });
    
}
function saltoLine(n){
    var br="";

    for(var i=0;i<n;i++){
        br+="<br>";
    }

    var line={
        html:br,
        border:false
    }

    return line;
}
var globalAcums = "";
function validarSoloNumeros(e) { // 1
    var tecla = (document.all) ? e.keyCode : e.which; // 2
    if (tecla==8) return true; // 3
    var patron =/\d/; // 4
    var te = String.fromCharCode(tecla); // 5
    return patron.test(te); // 6
}
function enviandoDispositivo(idc,prd){
    var sta = 1;
    var dest = 0;
    var des = 30;

    var cmbDest = Ext.getCmp("idcmbTipoEntregaDisp");
    var pnlDest = Ext.getCmp("idPanelTipEnvDisp");
    var gridRecetaDisp = Ext.getCmp("idGridRecetaCanje");
    var con = gridRecetaDisp.getStore();

    if(cmbDest.getValue() == 1){
        sta = 16;
    }
    if(pnlDest.isVisible() == true){
        dest = cmbDest.getValue();
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
                if(con.getCount()!=0){
                    Ext.Ajax.request({
                        url:contexto+'/Canjes',
                        params:{
                            bnd:10,
                            idc:idc,
                            prd:prd
                        },
                        success:function(rsp){
                            var objJSON=rsp.responseText.evalJSON();

                            if(objJSON.recs == '0'){
                                msjCanje.hide();
                                Ext.MessageBox.show({
                                    title: 'Datos Incompletos',
                                    msg: 'No hay recetas activas para este medicamento',
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                            }else{
                                var disp = Ext.getCmp("idCmbDispositivos");
                                var obs = Ext.getCmp("idObsDispositivos").getValue();
                                if(disp.isValid()){
                                    Ext.Ajax.request({
                                        url:contexto + '/Canjes',
                                        params:{
                                            bnd:12,
                                            idc:idc,
                                            prd:prd,
                                            disp:disp.getValue(),
                                            sta:sta,
                                            dest:dest,
                                            des:des,
                                            obs:obs
                                        },
                                        success:function(rsp){
                                            var objJSON2=rsp.responseText.evalJSON();
                                            var mnsj = "";

                                            if(objJSON2.idNewEnvio == undefined){
                                                mnsj = "Hubo un error en el servidor";
                                            }else{
                                                mnsj = "Se registro nuevo envio con exito, Envío: " + objJSON2.idNewEnvio;
                                            }
                                        
                                            msjCanje.hide();
                                            Ext.Msg.show({
                                                title:'Aviso',
                                                msg: mnsj,
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
                                                        Ext.getCmp('idWndDispositivos').close();
                                                    }
                                                }
                                            });

                                        },
                                        failure:function(rsp){
                                            msjCanje.hide();
                                        }
                                    });
                                    msjCanje.hide();
                                //alert(disp.getValue());
                                }else{
                                    Ext.MessageBox.show({
                                        title: 'Datos Incompletos',
                                        msg: 'Aun no se selecciona ningun dispositivo para enviar',
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.ERROR
                                    });
                                }
                            
                            //Ext.Ajax.request({
                            }
                        },
                        failure:function(rsp){
                            msjCanje.hide();
                        }
                    })
                }else{
                    var disp = Ext.getCmp("idCmbDispositivos");
                    var obs = Ext.getCmp("idObsDispositivos").getValue();
                    if(disp.isValid()){
                        Ext.Ajax.request({
                            url:contexto + '/Canjes',
                            params:{
                                bnd:12,
                                idc:idc,
                                prd:prd,
                                disp:disp.getValue(),
                                sta:sta,
                                dest:dest,
                                des:des,
                                obs:obs
                            },
                            success:function(rsp){
                                var objJSON2=rsp.responseText.evalJSON();
                                var mnsj = "";

                                if(objJSON2.idNewEnvio == undefined){
                                    mnsj = "Hubo un error en el servidor";
                                }else{
                                    mnsj = "Se registro nuevo envio con exito, Envío: " + objJSON2.idNewEnvio;
                                }

                                msjCanje.hide();
                                Ext.Msg.show({
                                    title:'Aviso',
                                    msg: mnsj,
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
                                            Ext.getCmp('idWndDispositivos').close();
                                        }
                                    }
                                });

                            },
                            failure:function(rsp){
                                msjCanje.hide();
                            }
                        });
                        msjCanje.hide();
                    //alert(disp.getValue());
                    }else{
                        Ext.MessageBox.show({
                            title: 'Datos Incompletos',
                            msg: 'Aun no se selecciona ningun dispositivo para enviar',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }

                }
            }
        },
        failure:function(rsp){
            msjCanje.hide();
        }
    });
    
}

function getWndDireccionMedico(valoresDir){
    var wnd = new com.punto.pen.WndActividades({
        titulo:"Direccion de medico",
        width:982,
        height:320,
        closable:false,
//        width:400,
//        height:470,
        pnl:new Ext.FormPanel({
            bodyStyle: "padding:5px 5px 0",
            layout:'form',
            width:972,
            autoHeight:true,
//            width:400,
//            height:432,
            autoScroll:true,
            items:[new com.punto.pen.regPaciente({
                    editarDirMed:true,
                    idPnl:"idPanelDirMed",
                    tituloDireccion:"Modificar direccion médico",
                    calleMed:valoresDir[0],
                    numExtMed:valoresDir[1],
                    numIntMed:valoresDir[2],
                    entreCalle1Med:valoresDir[3],
                    entreCalle2Med:valoresDir[4],
                    ref1Med:valoresDir[5],
                    ref2Med:valoresDir[6],
                    edoMed:valoresDir[7],
                    delMunMed:valoresDir[8],
                    coloniaMed:valoresDir[9],
                    cpMed:valoresDir[10]
                }).returnFieldsetDireccion()
            ]
        }),
        botones:[{
            text:"Aceptar",
            handler:function(){

                if(Ext.getCmp('idCallePac').isValid() == true && Ext.getCmp('idComboEstadoCln').isValid() == true && Ext.getCmp('idComboDelCln').isValid() == true && Ext.getCmp('idComboColCln').isValid() == true && Ext.getCmp('idComboCpCln').isValid() == true){
                    var idMed = Ext.getCmp("idHidenMedicoDirigido").getValue();
                    var calleMed = Ext.getCmp('idCallePac').getValue();
                    var numExtMed = Ext.getCmp('idNumExtPac').getValue();
                    var numIntMed = Ext.getCmp('idNumIntPac').getValue();
                    var entreCalle1Med = Ext.getCmp('idEntreCalle1').getValue();
                    var entreCalle2Med = Ext.getCmp('idEntreCalle2Pac').getValue();
                    var ref1Med = Ext.getCmp('idRef1Pac').getValue();
                    var ref2Med = Ext.getCmp('idRef2Pac').getValue();
                    var edoMed = Ext.getCmp('idComboEstadoCln').getRawValue();
                    var delMunMed = Ext.getCmp('idComboDelCln').getRawValue();
                    var coloniaMed = Ext.getCmp('idComboColCln').getRawValue();
                    var cpMed = Ext.getCmp('idComboCpCln').getRawValue();

                    Ext.getCmp("idHidenCalleMed").setValue(calleMed);
                    Ext.getCmp("idHidenNumExtMed").setValue(numExtMed);
                    Ext.getCmp("idHidenNumIntMed").setValue(numIntMed);
                    Ext.getCmp("idHidenEntreCalle1Med").setValue(entreCalle1Med);
                    Ext.getCmp("idHidenEntreCalle2Med").setValue(entreCalle2Med);
                    Ext.getCmp("idHidenRef1Med").setValue(ref1Med);
                    Ext.getCmp("idHidenRef2Med").setValue(ref2Med);
                    Ext.getCmp("idHidenEdoMed").setValue(edoMed);
                    Ext.getCmp("idHidenDelMunMed").setValue(delMunMed);
                    Ext.getCmp("idHidenColoniaMed").setValue(coloniaMed);
                    Ext.getCmp("idHidenCpMed").setValue(cpMed);

                    Ext.Ajax.request({
                        url:contexto + '/Medico',
                        params:{
                            bnd:3,
                            idMed:idMed,
                            calleMed:calleMed,
                            numExtMed:numExtMed,
                            numIntMed:numIntMed,
                            entreCalle1Med:entreCalle1Med,
                            entreCalle2Med:entreCalle2Med,
                            ref1Med:ref1Med,
                            ref2Med:ref2Med,
                            edoMed:edoMed,
                            delMunMed:delMunMed,
                            coloniaMed:coloniaMed,
                            cpMed:cpMed
                        },
                        success:function(rsp){
                            var objJSON=rsp.responseText.evalJSON();
                            if(objJSON.success == true){
                                wnd.close();
                                Ext.getCmp("idPanelDireccionMedico").removeAll(true);
                                Ext.getCmp("idPanelDireccionMedico").add(saltoLine(1));
                                Ext.getCmp("idPanelDireccionMedico").add({
                                    bodyStyle:'padding:0px 0px 0px 0px; background-color:#FFFF00;',
                                    html:"\
                                <table width=100%>\n\
                                    <tr>\n\
                                    <td colspan=8 align=center><h4>DIRECCION DEL MEDICO DONDE SE MANDARA EL ENVIO</h4></td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                        <td width=10%><h4>Calle:</h4></td>\n\
                                        <td width=15%>" + calleMed + "</td>\n\
                                        <td width=10%><h4>Numero Ext:</h4></td>\n\
                                        <td width=15%>" + numExtMed + "</td>\n\
                                        <td width=10%><h4>Numero Int:</h4></td>\n\
                                        <td width=15%>" + numIntMed + "</td>\n\
                                        <td width=10%><h4>Entre Calle 1:</h4></td>\n\
                                        <td width=15%>" + entreCalle1Med + "</td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                        <td><h4>Entre calle 2:</h4></td>\n\
                                        <td>" + entreCalle2Med + "</td>\n\
                                        <td><h4>Referencia 1:</h4></td>\n\
                                        <td>" + ref1Med + "</td>\n\
                                        <td><h4>Referencia 2:</h4></td>\n\
                                        <td colspan=2>" + ref2Med + "</td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                        <td><h4>Estado:</h4></td>\n\
                                        <td>" + edoMed + "</td>\n\
                                        <td><h4>Del/Mun:</h4></td>\n\
                                        <td>" + delMunMed + "</td>\n\
                                        <td><h4>Colonia:</h4></td>\n\
                                        <td>" + coloniaMed + "</td>\n\
                                        <td><h4>C.P.:</h4></td>\n\
                                        <td>" + cpMed + "</td>\n\
                                    </tr>\n\
                                </table>",
                                    border:false
                                });
                                Ext.getCmp("idPanelDireccionMedico").add({
                                    border:false,
                                    html:"<a href=# onclick=mandarEditarDirMedico()>Editar</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick=quitarMedicoDirigido()>Quitar</a>"
                                    //hidden:true
                                });
                                Ext.getCmp("idPanelDireccionMedico").doLayout();

                            }else{
                                Ext.Msg.show({
                                    title:'Aviso',
                                    msg:"Hubo un error en el servidor",
                                    buttons: Ext.Msg.OK
                                });
                            }
                        },
                        failure:function(rsp){

                        }
                    });

                }else{
                    Ext.MessageBox.show({
                        title: 'Datos Incompletos',
                        msg: 'Debe completar los datos obligatorios para continuar.(Campos marcados con rojo)',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
                               
            }
        }
//        ,{
//            text:"Salir",
//            handler:function(){
//                wnd.close();
//            }
//        }
        ]
    });
    wnd.show();
}
function mandarEditarDirMedico(){
    var valoresDir = [
        Ext.getCmp("idHidenCalleMed").getValue(),
        Ext.getCmp("idHidenNumExtMed").getValue(),
        Ext.getCmp("idHidenNumIntMed").getValue(),
        Ext.getCmp("idHidenEntreCalle1Med").getValue(),
        Ext.getCmp("idHidenEntreCalle2Med").getValue(),
        Ext.getCmp("idHidenRef1Med").getValue(),
        Ext.getCmp("idHidenRef2Med").getValue(),
        Ext.getCmp("idHidenEdoMed").getValue(),
        Ext.getCmp("idHidenDelMunMed").getValue(),
        Ext.getCmp("idHidenColoniaMed").getValue(),
        Ext.getCmp("idHidenCpMed").getValue()
    ];
    
    getWndDireccionMedico(valoresDir);
}

function quitarMedicoDirigido(){
    Ext.Msg.show({
            title:'Status envio',
            msg: '¿Confirma que desea quitar al médico de este envio?',
            buttons: Ext.Msg.YESNO,
            //animEl: 'elId',
            icon: Ext.MessageBox.WARNING,
            fn: function(btn){
                if(btn == 'no'){
                }
                if(btn == 'yes'){
                    Ext.getCmp("idHidenMedicoDirigido").setValue(0);
                    Ext.getCmp("idMedicoDirigido").setValue("");
                    Ext.getCmp("idPanelDireccionMedico").removeAll(true);
                    Ext.getCmp("idPanelDireccionMedico").doLayout();
                }
            }
    });
}

