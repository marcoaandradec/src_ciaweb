/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("com.punto.pen");

var materialGrid = [];
var posicionMat = 0;

function ventanaEnvioMateriales(idc,idPrd){

    var wndEntregaMat = new com.punto.pen.WndActividades({
        titulo:'Envio de material a paciente',
        width:800,
        height:500,
        pnl:new com.punto.pen.EnvioMat(idc,idPrd),
        botones:[{
            text:"Generar envio",
            handler:function(){
                
                    Ext.Ajax.request({
                        url:contexto+'/Canjes',
                        params:{
                            bnd:11,
                            idc:idc
                        },
                        success:function(rsp){
                            var objJSON=rsp.responseText.evalJSON();

                            if(objJSON.dirs == '0'){
                                Ext.MessageBox.show({
                                    title: 'Datos Incompletos',
                                    msg: "No hay direcciones destinadas para envio<br>seleccione alguna de las direcciones de arriba",
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                            }else{
                                var detalle = "";
                                var obs = Ext.getCmp("idObsMaterial").getValue();
                                for(var i = 0; i < materialGrid.length; i++){
                                    detalle += materialGrid[i][1] + "%&";
                                    detalle += materialGrid[i][2] + "%&";
                                }
                                if(detalle == ""){
                                    Ext.MessageBox.show({
                                        title: 'Datos Incompletos',
                                        msg: "Aun no se a agregado ningun Material para enviar",
                                        buttons: Ext.MessageBox.OK
                                    });
                                }else{
                                    var continuar = true;
                                    if(modulo != 1 && Ext.getCmp("idcmbTipEntMat").isValid() == false){
                                        continuar = false;
                                    }

                                    if(continuar == false){
                                        Ext.MessageBox.show({
                                            title: 'Datos Incompletos',
                                            msg: "Aun no especifica el tipo de entrega",
                                            buttons: Ext.MessageBox.OK
                                        });
                                    }else{
                                        var tipoEntrega = modulo == 1 ? 2 : Ext.getCmp("idcmbTipEntMat").getValue();

                                        Ext.MessageBox.show({
                                            title: 'Aviso',
                                            msg: "El envio se va a generar ¿continuar?",
                                            buttons: Ext.Msg.YESNO,
                                            fn: function(btn){
                                                if(btn == 'no'){
                                                }
                                                if(btn == 'yes'){
                                                    Ext.Ajax.request({
                                                        url:contexto+'/Canjes',
                                                        params:{
                                                            bnd:19,
                                                            idc:idc,
                                                            detalle:detalle,
                                                            obs:obs,
                                                            idDir:objJSON.dirs,
                                                            tipoEntrega:tipoEntrega
                                                        },
                                                        success:function(rsp){
                                                            var objJSON=rsp.responseText.evalJSON();
                                                            if(objJSON.success == true){
                                                                Ext.Msg.show({
                                                                    title:'Aviso',
                                                                    msg: "Se genero con exito el envio con numero " + objJSON.idEnv,
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
                                                                            materialGrid = [];
                                                                            posicionMat = 0;

                                                                            wndEntregaMat.close();
                                                                        }
                                                                    }
                                                                });
                                                                 ////////Papeleta////////
                                                                if(objJSON.idEnv != 0){
                                                                    if(tipoEntrega == 1){
                                                                        needToConfirm=false;
                                                                        document.frmPdfEnvio.idEnvio.value = objJSON.idEnv;
                                                                        var formulario = document.frmPdfEnvio;
                                                                        formulario.submit();
                                                                    }
                                                                }
                                                                ////////////////////////
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        });                                        
                                    }
                                }
                            }
                        }
                    });
                
            }
        },{
            text:"Cancelar",
            handler:function(){
                materialGrid = [];
                posicionMat = 0;
                wndEntregaMat.close();
            }
        }]
    });
    wndEntregaMat.show();

}

com.punto.pen.EnvioMat = function(idCnt,idProd){

    var panelEnvioMat = new Ext.FormPanel({
            id:"idPnlEnvioMat",
            bodyStyle:"padding:5px 5px 0",
            layout:"form",
            width:987,
            height:350,
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
        },modulo != 1 ? {
            xtype:"fieldset",
            title:"Tipo de entrega",
            layout:"column",
            height:60,
            items:[{
                xtype:"panel",
                border:false,
                layout:"form",
                items:[{
                    xtype:"combo",
                    id:"idcmbTipEntMat",
                    width:120,
                    fieldLabel:"Tipo de entrega",
                    allowBlank:false,
                    mode:"local",
                    name:"cmbTipoEntregaDips",
                    triggerAction:'all',
                    store:[[1,"Personal"],[2,"Almacen Pen"]],
                    listeners:{
                        'select':function(cmb){
                        //alert(cmb.getValue());
                        }
                    }
                }]
            }]
        } : {border:false,html:""},{
            xtype:"fieldset",
            title:"Tipo de material",
            layout:"column",
            height:60,
            items:[{
                xtype:"panel",
                border:false,
                layout:"form",
                items:[
//                    {
//                    id:"idTxtTipoMaterial",
//                    xtype:"textfield",
//                    fieldLabel:"Tipo de material",
//                    allowBlank:false,
//                    width:200,
//                    enableKeyEvents:true,
//                    listeners:{
//                        keyup:function(txt,e){
//                            var cantMat = Ext.getCmp("idCantMaterial");
//                            var btn = Ext.getCmp("idBtnAgregarMat");
//                            if(txt.getValue() != "" && parseInt(cantMat.getValue()) > 0){
//                                btn.setDisabled(false);
//                            }else{
//                                btn.setDisabled(true);
//                            }
//                        }
//                    }
//                }
                {
                    xtype:"hidden",
                    id:"idHidenNoTarjeta",
                    value:""
                },
                new com.punto.pen.ComboBox({
                    id:"idTxtTipoMaterial",
                    etiqueta:"Tipo de material",
                    allowBlank:true,
                    name:"tipoMaterial",
                    prm:{
                        campo:'tipMat',
                        idCampo:'idTipMat',
                        bnd:5,
                        qry:122,
                        autoCarga:true
                    },
                    width:250,
                    tabIndex:106,
                    evt:{
                        select:function(cmb){
                            var cantMat = Ext.getCmp("idCantMaterial");
                            var btn = Ext.getCmp("idBtnAgregarMat");

                            if(cmb.getRawValue() != "" && parseInt(cantMat.getValue()) > 0){
                                if(cmb.getRawValue() == "TARJETA DE BENEFICIOS SATL" && Ext.getCmp("idHidenNoTarjeta").getValue() != ""){
                                    btn.setDisabled(true);
                                }else{
                                    btn.setDisabled(false);
                                }
                            }else{
                                btn.setDisabled(true);
                            }
                        }
                    }
                })
            ]
            },{
                xtype:"panel",
                border:false,
                layout:"form",
                width:200,
                labelAlign:"right",
                items:[{
                    id:"idCantMaterial",
                    xtype:"numberfield",
                    fieldLabel:"Cantidad",
                    allowBlank:false,
                    width:25,
                    value:"1",
                    enableKeyEvents:true,
                    listeners:{
                        keyup:function(txt,e){
                            var tipMat = Ext.getCmp("idTxtTipoMaterial");
                            var btn = Ext.getCmp("idBtnAgregarMat");
                            if(tipMat.getValue() != "" && parseInt(txt.getValue()) > 0){
                                btn.setDisabled(false);
                            }else{
                                btn.setDisabled(true);
                            }
                        }
                    }
                }]
            },{
                xtype:"panel",
                border:false,
                layout:"form",
                width:80,
                items:[{
                    id:"idBtnAgregarMat",
                    xtype:"button",
                    text:"Agregar",
                    disabled:true,
                    handler:function(btn){
                        var tipoMat = Ext.getCmp("idTxtTipoMaterial");
                        var cantMat = Ext.getCmp("idCantMaterial");
                        var obsMat = Ext.getCmp("idObsMaterial");
                        var cmb = Ext.getCmp("idTxtTipoMaterial");

                         if(modulo != 1 && cmb.getRawValue() == "TARJETA DE BENEFICIOS SATL"){
                            Ext.MessageBox.prompt(
                                "Capturar",
                                "Número de tarjeta",
                                function(bnt, txt){
                                    if(bnt == "ok"){
                                        if(txt != ""){
                                            Ext.getCmp("idHidenNoTarjeta").setValue(txt);
                                            
                                            materialGrid.splice(materialGrid.length,0,[posicionMat.toString(),tipoMat.getRawValue() + " (" + Ext.getCmp("idHidenNoTarjeta").getValue() + ")",cantMat.getValue()]);

                                            posicionMat++;

                                            tipoMat.setRawValue("");
                                            cantMat.setValue("1");
                                            btn.setDisabled(true);

                                            Ext.getCmp("idGridEnvioMat").getStore().loadData(materialGrid);
                                        }else{
                                            cmb.setValue("");
                                            btn.setDisabled(true);
                                        }
                                    }else{
                                        cmb.setValue("");
                                        btn.setDisabled(true);
                                    }
                                },
                                null,
                                null,
                                Ext.getCmp("idHidenNoTarjeta").getValue()
                            );
                        }else{
                            materialGrid.splice(materialGrid.length,0,[posicionMat.toString(),tipoMat.getRawValue(),cantMat.getValue()]);

                            posicionMat++;

                            tipoMat.setRawValue("");
                            cantMat.setValue("1");
                            btn.setDisabled(true);

                            Ext.getCmp("idGridEnvioMat").getStore().loadData(materialGrid);
                        }
                    }
                }]
            },{
                xtype:"panel",
                border:false,
                layout:"form",
                items:[{
                    id:"idBtnQuitarMat",
                    xtype:"button",
                    text:"Quitar",
                    disabled:true,
                    handler:function(btn){
                        var grd = Ext.getCmp("idGridEnvioMat");
                        var record = grd.getSelectionModel().getSelected();

                        materialGrid.splice(parseInt(record.get("posicion")),1);

                        var i;

                        for(i = 0; i < materialGrid.length; i++){
                            materialGrid[i][0] = i.toString();
                        }

                        posicionMat = i;

                        grd.getStore().loadData(materialGrid);

                        btn.setDisabled(true);
                    }
                }]
            }]
                    
        },{
            xtype:"fieldset",
            title:"Detalle de envio",
            height:150,
            layout:"fit",
            items:[
                new com.punto.pen.gridEnvioMat(idCnt,"idGrid")
            ]
        },{
            xtype:"fieldset",
            title:"Observaciones",
            height:100,
            layout:"column",
            items:[{
                id:"idObsMaterial",
                xtype:"textarea",
                fieldLabel:"Observaciones",
                height:50,
                width:345
            }]
        }]
    });

    cargaGridCanjes(idCnt,"idPnCanjes");

    return panelEnvioMat;
}



com.punto.pen.gridEnvioMat = function(idc,idGrid){

    var rect = Ext.data.Record.create([
        {name:'posicion', type: "string"},
        {name:'tipo_material', type:'string'},
        {name:'cantidad', type:'string'}
    ]);

    var storeEnvioMat = new Ext.data.Store({
        reader: new Ext.data.ArrayReader(
            {
                idIndex: 0 
            },
            rect
        )
    }); 

    var gridEnvioMat = new Ext.grid.GridPanel({
        id      :"idGridEnvioMat",
        store   :storeEnvioMat,
        sm      :new Ext.grid.RowSelectionModel({
                    singleSelect:false,
                    listeners:{
                        rowselect:function(sm,index,rec){
                            Ext.getCmp("idBtnQuitarMat").setDisabled(false);
                        }
                    }
                }),
        border  :false,
        columns : [
            new Ext.grid.RowNumberer(),
        {header:'Tipo de material', width:80, sortable:true, dataIndex:'tipo_material'},
        {header:'Cantidad', width:20, sortable:true, dataIndex:'cantidad'}
        ],
        viewConfig : {
            autoFill: true,
            forceFit: true
        }
    });

    return gridEnvioMat;
}



function accionVoBo(){
    IniciarAccion(
        'pnlTreeAccionesAlmacen',
        true,
        true,
        'pnlCenter',
        new com.punto.pen.PanelVoBo({
    //        btnVis:false,
            idTree:'pnlTreeAccionesAlmacen'
    //        mnsg:'Módulo almacen',
    //        id:'idGridEnvio',
    //        titulo:'Listado de Envios'
        })
    );
}



com.punto.pen.PanelVoBo = function(parametros){
    var idTree = (parametros.idTree == null ? 'pnlTreeAccionesCASA' : parametros.idTree);

    var store = new Ext.data.Store({
        autoLoad : true,
        baseParams : {
            opc:1,
            idStatus:18,
            consul:0,
            idc:0,
            cf:""
        },
        reader : new Ext.data.JsonReader(
        {
            totalProperty : 'total',
            root : 'records',
            idProperty : 'idEnvio'
        },
        new com.punto.pen.EnvioAlmacen()),
        proxy : new Ext.data.HttpProxy({
            url : contexto+'/Almacen',
            timeout:360000
        }),
        listeners:{
            
        }
    });

    var pbarAlmacen = new Ext.PagingToolbar({
        id          : 'pgrid',
        pageSize    : 20,
        store       : store,
        displayInfo : true,
        displayMsg  : 'Mostrando {0} - {1} Clientes de {2}',
        emptyMsg    : "No hay datos para mostrar"
    });

    var panel = new Ext.Panel({
        id: "idPanelGridsAlmacenVoBo",
        layout:"fit",
        frame: true,
        anchor:"100%",
        items:[new Ext.grid.GridPanel({
            id      :"idGridsAlmacenVoBo",
            title   :"Pendientes de Vo Bo",
            store   :store,
            sm      :new Ext.grid.RowSelectionModel({
                        singleSelect:false,
                        listeners:{
                            rowselect:function(sm,index,rec){
                                var records = sm.getSelected();
                                envSelecs = "";
//                                Ext.getCmp("idDarVoBo").enable();
//                                Ext.getCmp("idCancelarEnvio").enable();
                                envSelecs = records.get("idEnvio");
                            }
                        }
                    }),
            tbar:[{
                text:"Regresar",
                iconCls:"icn-back",
                handler:function(){
                    IniciarAccion(idTree,false,false,'pnlCenter',new com.punto.pen.PanelBienvenida({
                        msg:"Módulo almacen"
                    }));
                }
            },'-'
//            ,{
//                id:"idDarVoBo",
//                text:"Dar Vo Bo",
//                disabled:true,
//                iconCls:'icn-habilita',
//                handler:function(){
//                    cambiarStatusEnvios("idGridsAlmacenVoBo",1,"Abierto");
//                }
//            },'-',{
//                id:"idCancelarEnvio",
//                text:"Cancelar envio",
//                disabled:true,
//                iconCls:'icn-cancela',
//                handler:function(){
//                    cambiarStatusEnvios("idGridsAlmacenVoBo",7,"Cancelado");
//                }
//            }
            ],
            columns: [
                new Ext.grid.RowNumberer(),
            {header:"Folio", width:65, sortable:true, dataIndex:'idEnvio', fixed:true},
            {header:'Fecha Orden', width:120, sortable:true, dataIndex:'fecha', fixed:true},
            {header:'Origen Orden', width:120, sortable:true, dataIndex:'origen', fixed:true},
            {header:'No paciente', width:35, sortable:true, dataIndex:'idc'},
            {header:'Nombre', width:100, sortable:true, dataIndex:'nombre'},
            {header:'Mensajeria', width:50, sortable:true, dataIndex:'mensajeria'},
            {header:'Cobertura', width:50, sortable:true, dataIndex:'cobertura'},
            {header:'Observacion', width:120, sortable:true, dataIndex:'observacion'},
            {header:'Fecha de envio', width:60, sortable:true, dataIndex:'fechaEnvio'},
            {header:'Fecha de entrega', width:60, sortable:true, dataIndex:'fechaEntrega'}
            ],
            viewConfig      : {
                autoFill: true,
                forceFit: true
            },
            listeners:{
                rowdblclick:function(grid){                    
                    imprimirPapeleta(grid,"VoBo");
                }
            },
            bbar    :pbarAlmacen
        })]
    });

    return panel;
}