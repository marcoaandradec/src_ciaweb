Ext.ns("com.punto.pen");

function getToolBar(idc){
    var toolBarActivo=new Ext.Toolbar({
        id:"idToolBarActivar",
        hidden:true,
        items:[{
            text:'Reactivar',
            iconCls:'icn-habilita',
            handler:function(){
                var grd= Ext.getCmp("gridProductosCliente");
                var record=grd.getSelectionModel().getSelected();
                var id=record.get('idStatus');
                cambiaStatus(true, id,idc);
            }
        }]
    });
    var toolBarInactivo=new Ext.Toolbar({
        id:"idToolBarDesactivar",
        items:[{
            text:'Desactivar',
            iconCls:'icn-cancela',
            handler:function(){
                var grd= Ext.getCmp("gridProductosCliente");
                var record=grd.getSelectionModel().getSelected();
                if(record!=null){
                    var id=record.get('idStatus');
                    cambiaStatus(false, id,idc);
                }else{
                    Ext.Msg.alert('¡¡Alerta!!',"Seleccione un Producto de la lista...");
                }
            }
        },{
            text:'Editar Médico',
            iconCls:'icn-editarPregunta',
            handler:function(){
                var grd= Ext.getCmp("gridProductosCliente");
                var record=grd.getSelectionModel().getSelected();
                if(record!=null){
                    var fam = Ext.getCmp('idProducto1');
                    var prod = Ext.getCmp('idPresentacion1');
                    var med = Ext.getCmp('idMedico1');
                    var btnNP = Ext.getCmp('idBtnRegNewProd');
                    var btnGC = Ext.getCmp('idBtnGuardaCambios');
                    var btnCE = Ext.getCmp('idBtnCancEdicion');
                    var dur=Ext.getCmp("idDuracion") ;               
                    var fv=Ext.getCmp("nmFV");

                    fam.setRawValue(record.get('familia'));
                    prod.setRawValue(record.get('producto'));
                    med.setRawValue(record.get('medico'));                    
                    dur.setRawValue(record.get('duracion'));                                       
                    fv.setRawValue(record.get('fv'));

                    fam.setDisabled(true);
                    dur.setDisabled(true);
                    fv.setDisabled(true);
                    prod.setDisabled(true);
                    btnNP.setDisabled(true);
                    btnGC.setDisabled(false);
                    btnCE.setDisabled(false); 
                }else{
                    Ext.Msg.alert('¡¡Alerta!!',"Seleccione un Producto de la lista...");
                }
            }
        }]
    });
    return [toolBarActivo,toolBarInactivo];
}

function getVentanaMotivo(idc,id,act){
    var wnd = new Ext.Window({
        title:"Motivo de cambio de Status",
        id:"idWndMotivoStatus",
        width:585,
        height:350,
        constrainHeader :true,
        modal:true,
        border:false,
        autoScroll:false,
        draggable:true,
        resizable:false,
        layout:'fit',       
        items:[{
            xtype:"panel",
            columnWidth:0.25,
            layout:"form",
            border:true,
            frame:false,
            height:300,
            labelAlign:"top",
            bodyStyle:"padding:5px",
            items:[
            new com.punto.pen.ComboBox({
                id          :"idComboMotivo",
                etiqueta    : 'Motivo',
                allowBlank  : false,
                name        : 'prdMotivo',
                prm         : {
                    campo: 'prd',
                    idCampo: 'idPrd',
                    bnd: 5,
                    qry: 22,
                    autoCarga: true
                }
            }),
            {
                xtype:"textarea",
                fieldLabel:"Observaciones",
                name:"editorMotivo",
                id:"idEditorMotivo",
                hideLabels:true,
                width:550,
                height:150,
                enableKeyEvents:true,
                listeners: {
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
        }],
        buttons:[{
            text:'Desactivar',
            handler:function(){
                MnsWaiting();
                var idMot=Ext.getCmp("idComboMotivo").getValue();
                var mot=Ext.getCmp("idEditorMotivo").getValue();
                if(idMot != "" && mot !=""){
                    Ext.Ajax.request({
                        url : contexto+'/CtrProductos',
                        params:{
                            bnd:2,
                            id:id,
                            idc:idc,
                            act:act,
                            idMot:idMot,
                            mot:mot
                        },
                        success:function(rsp){

                            var bitac=Ext.getCmp("gridBuscadorBitacora");
                            bitac.getStore().load();
                            var nots = Ext.getCmp("idPanelNotasAnte");
                            nots.load({
                                url:contexto + '/Cliente?bnd=9&idCnt='+idc
                            });
                            cargaGrid(idc);
                            var comboFams = Ext.getCmp('idProducto1');
                            comboFams.getStore().load();

                            var pnlProd= Ext.getCmp('pnlTreeProductosAct');
                            pnlProd.getRootNode().reload();
                            var infoGen=Ext.getCmp("pnlInfoGeneral");
                            infoGen.load({
                                url:contexto + '/Cliente?bnd=2&idCnt='+idc
                            });

                            var objJSON=rsp.responseText.evalJSON();

                            if(objJSON.bCli == 'si'){
                                IniciarAccion(idArbol,false,false,'pnlCenter',new com.punto.pen.PanelBienvenida({
                                    msg:'Administrador'
                                }));
                                    
                                //IniciarAccion(idArbol,true,true,'pnlCenter',new com.punto.pen.PanelBuscadorPaciente({id:'pnlBuscadorPaciente','idAcc':idAccion,'idTree':idArbol}));
                                var vent = Ext.getCmp("idWndProdPaciente");
                                vent.close();
                                Ext.Msg.show({
                                    title:'Fin de sesión',
                                    msg: '<center>El Status del cliente a cambiado a \"Inactivo\"</center>',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.MessageBox.INFO
                                });
                                    
                            }
                            MnsWaiting().hide();
                        },
                        failure:function(rsp){
                            MnsWaiting().hide();
                        }
                    });
                    wnd.close();
                }else{
                    Ext.Msg.show({
                        title:'Status producto',
                        msg: 'Faltan datos para continuar',
                        buttons: Ext.Msg.OK
                    })
                }
            }
        },
        {
            text:'Cancelar',
            handler:function(){
                wnd.close();
            }
        }]
    });
    
    wnd.show();
    wnd.on({
        'show':function(){
            alert("hola")
        }
    });
}

function MnsWaiting(){
    var MnsWait= Ext.MessageBox.show({
        title: 'Espere un momento por favor...',
        msg: 'Procesando Información',
        progressText: 'Processing...',
        width:300,
        wait:true,
        waitConfig: {
            interval:200
        }
    });
    return MnsWait;
}


function getPanelProductos(idc,prm){
    var wnd = new Ext.Window({
        title:"Productos de paciente",
        id:"idWndProdPaciente",
        width:1100,
        height:500,
        constrainHeader :true,
        modal:true,
        border:false,
        autoScroll:false,
        draggable:true,
        resizable:false,
        layout:'fit',
        items:[{
            id: 'idPnlProduc',
            bodyStyle: "padding:5px 5px 0",
            layout:'fit',
            width:790,
            height:295,
            autoHeight: true,
            items:[new com.punto.pen.panelProductos(idc),
            new com.punto.pen.FSAsignarPrd({
                titulo:"Nuevo producto",
                idc:idc
            })]
        }],
        buttons:[{
            id:'idBtnGuardaCambios',
            disabled:true,
            text:'Guardar cambios',
            handler:function(){
                MnsWaiting();
                var grd = Ext.getCmp("gridProductosCliente");
                var record =grd.getSelectionModel().getSelected();
                var idcpm = record.get('idProd');
                var idm = Ext.getCmp('idHidenMedico1').getValue();

                Ext.Ajax.request({
                    url : contexto+'/CtrProductos',
                    params:{
                        bnd:4,
                        idc:idc,
                        idm:idm,
                        idcpm:idcpm
                    },
                         
                    success:function(rsp){
                        cargaGrid(idc);
                        var infoGen=Ext.getCmp("pnlInfoGeneral");
                        infoGen.load({
                            url:contexto + '/Cliente?bnd=2&idCnt='+idc
                        });
                        
                        var Bitacora=Ext.getCmp("gridBuscadorBitacora");
                        Bitacora.getStore().load();

                        var fam = Ext.getCmp('idProducto1');
                        var prod = Ext.getCmp('idPresentacion1');
                        var med = Ext.getCmp('idMedico1');
                        var btnNP = Ext.getCmp('idBtnRegNewProd');
                        var btnGC = Ext.getCmp('idBtnGuardaCambios');
                        var btnCE = Ext.getCmp('idBtnCancEdicion');                                        
                        var dur=Ext.getCmp("idDuracion");                
                        var fv=Ext.getCmp("nmFV");

                        fam.setRawValue("");
                        prod.setRawValue("");
                        med.setRawValue("");
                        dur.setRawValue("");
                        fv.setRawValue("");
                        
                        fam.setDisabled(false);
                        fv.setDisabled(false);
                        dur.setDisabled(false);
                        prod.setDisabled(false);
                        btnNP.setDisabled(false);
                        btnGC.setDisabled(true);
                        btnCE.setDisabled(true);
                        MnsWaiting().hide();
                    },
                    failure:function(rsp){
                        MnsWaiting().hide();
                    }
                });

            }
        },{
            id:'idBtnCancEdicion',
            disabled:true,
            text:'Cancelar edicion',
            handler:function(){
                var fam = Ext.getCmp('idProducto1');
                var prod = Ext.getCmp('idPresentacion1');
                var med = Ext.getCmp('idMedico1');
                var btnNP = Ext.getCmp('idBtnRegNewProd');
                var btnGC = Ext.getCmp('idBtnGuardaCambios');
                var btnCE = Ext.getCmp('idBtnCancEdicion');                
                var dur=Ext.getCmp("idDuracion")                
                var fv=Ext.getCmp("nmFV")

                fam.setRawValue("");
                prod.setRawValue("");
                med.setRawValue("");
                dur.setRawValue("");                
                fv.setRawValue("");

                fam.setDisabled(false);
                dur.setDisabled(false);                
                fv.setDisabled(false);
                prod.setDisabled(false);
                btnNP.setDisabled(false);
                btnGC.setDisabled(true);
                btnCE.setDisabled(true);

            }
        },{
            id:'idBtnRegNewProd',
            text:'Registrar nuevo producto',
            handler:function(){
                MnsWaiting();
                nuevoProducto(idc);
            }
        },{
            id:'idBtnSalirProds',
            text:'Salir',
            handler:function(){
                if(prm!=null){
                    if(prm.store!=null){
                        prm.store.rejectChanges();
                    }
                }
                wnd.close();
            }
        }]
    });
    if(mostrarLoad==false){
        wnd.show();
        cargaGrid(idc);
    }
}

function cargaGrid(idc){
    var grd = Ext.getCmp('gridProductosCliente');
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

function change(val){
    if(val=="Inactivo"){
        return '<span style="background-color:red; color:#FFFFFF;">' + val + '</span>';
    }else{
        return val;
    }
}

function nuevoProducto(idc){    
    var prod=Ext.getCmp('idProducto1');
    var hidenMed=Ext.getCmp('idHidenMedico1');
    var pres=Ext.getCmp('idPresentacion1');
    var med=Ext.getCmp("idMedico1");
    var dur=Ext.getCmp("idDuracion")    
    var fv=Ext.getCmp("nmFV")    
    var hidenFv=Ext.getCmp('idHdFV');
    
    if(prod.getValue()!="" && hidenFv.getValue()!="0" && hidenMed.getValue()!="0" && dur.getValue()!="" && med.getValue()!="" && pres.getValue()!="" && fv.getValue()!=""){
        Ext.Ajax.request({           
            url : contexto+'/CtrProductos',
            params:{
                bnd:3,
                idc:idc,
                cdrProducto:prod.getValue(),
                hidenMedico:hidenMed.getValue(),
                cdrPresentacion:pres.getValue(),
                hmdDuracion:dur.getValue(),
                hidenFdV:hidenFv.getValue(),
                idAcc:idAccion,
                idTree:idArbol
            },
            success:function(rsp){
                var otroJSON = rsp.responseText.evalJSON();
                if(otroJSON.exis == 'si'){
                    Ext.Msg.show({
                        title:'Nuevo producto',
                        msg: 'Este producto ya fue agregado. Cierre y abra este modulo para ver los cambios',
                        buttons: Ext.Msg.OK
                    })
                }else{
                    var comboFams = Ext.getCmp('idProducto1');
                    comboFams.getStore().load();
                    var objJSON=rsp.responseText.evalJSON();

                    if(objJSON.bCli == 'no'){
                        getCnt(idc,objJSON.nom,objJSON.ap,objJSON.am,"Paciente");
                        cargaGrid(idc);
                    }

                    prod.setValue("");
                    hidenMed.setValue("");
                    pres.setValue("");
                    med.setValue("");
                    dur.setValue("");                    
                    fv.setValue("");
                    MnsWaiting().hide();
                }                
            },
            failure:function(rsp){
                MnsWaiting().hide();
            }
        });
    }else{
        Ext.Msg.show({
            title:'Nuevo producto',
            msg: 'Faltan datos para continuar',
            buttons: Ext.Msg.OK
        }) 
    }

}

function cambiaStatus(check,id,idc){
    
    var act="";

    Ext.Msg.show({
        title:'Status producto',
        msg: '<center>¿Está seguro que desea cambiar el status de este producto?</center>',
        buttons: Ext.Msg.YESNO,
        animEl: 'elId',
        fn: function(btn){
            if(btn == 'no'){
            }
            if(btn == 'yes'){
                if(check==false){
                    act=0;
                    getVentanaMotivo(idc,id,act);
                }else if(check==true){
                    Ext.Msg.show({
                        title:'Status producto',
                        msg: '<center>Cuando se reactiva un producto todos los productos de la misma familia se desactivan<br>\n\
                                ¿Está seguro que desea reactivar este producto?</center>',
                        buttons: Ext.Msg.YESNO,
                        animEl: 'elId',
                        icon: Ext.MessageBox.WARNING,
                        fn: function(btn){
                            if(btn == 'no'){
                            }
                            if(btn == 'yes'){
                                var msg = Ext.MessageBox.show({
                                    msg: 'Procesando la Información, espere por favor...',
                                    progressText: 'Saving...',
                                    width:300,
                                    wait:true,
                                    waitConfig: {
                                        interval:200
                                    }
                                });
                                act=1;
                                Ext.Ajax.request({
                                    url : contexto+'/CtrProductos',
                                    params:{
                                        bnd:2,
                                        id:id,
                                        idc:idc,
                                        act:act,
                                        idMot:0,
                                        mot:""
                                    },
                                    success:function(rsp){
                                        msg.hide();
                                        var objJSON=rsp.responseText.evalJSON();

                                        if(objJSON.bCli == 'no'){
                                            getCnt(idc,objJSON.nom,objJSON.ap,objJSON.am,"Paciente");
                                            cargaGrid(idc);
                                        }
                                        var comboFams = Ext.getCmp('idProducto1');
                                        comboFams.getStore().load();
                                    },
                                    failure:function(rsp){
                                        msg.hide();
                                    }
                                });
                            }
                        }
                    });
                }                
            }
        },
        icon: Ext.MessageBox.WARNING
    });
}

com.punto.pen.RecordProdCliente = function(){
    var record = Ext.data.Record.create([
    {
        name: 'idProd'
    },

    {
        name: 'medico',
        type:'string'
    },

    {
        name: 'familia',
        type: 'string'
    },

    {
        name: 'producto',
        type: 'string'
    },

    {
        name: 'fechaab',
        type: 'string'
    },

    {
        name: 'status',
        type: 'string'
    },

    {
        name: 'idStatus',
        type: 'string'
    },
    {
        name: 'duracion',
        type: 'string'
    },
    {
        name: 'fv',
        type: 'string'
    }
       
    ]);
    return record; 
}

com.punto.pen.panelProductos = function(idc){

    this.storeCodPostal = new Ext.data.Store({
        autoLoad: false,
        baseParams: {
            bnd:1,
            idc:idc
        },
        reader :new Ext.data.JsonReader( {
            totalProperty: 'total',
            root :'records',
            idProperty: 'id'
        },new com.punto.pen.RecordProdCliente()),
        proxy :new Ext.data.HttpProxy( {
            url : contexto+'/CtrProductos'
        }),

        sortInfo:{
            field: 'idProd',
            direction: "ASC"
        },
        groupField:'idProd'
    });

    this.pbarProdCliente = new Ext.PagingToolbar({
        id          : 'pgrid',
        pageSize    : 20,
        store       : this.storeCodPostal,
        displayInfo : true,
        displayMsg  : 'Mostrando {0} - {1} Productos de {2}',
        emptyMsg    : "No hay datos para mostrar"
    });   

    this.pnlBuscadorCp = new Ext.grid.GridPanel({
        name            :"pnProdCli",
        title           :"",
        border          : false,
        id              : "gridProductosCliente",
        store           : this.storeCodPostal,
        stripeRows      : true,
        sm              : new Ext.grid.RowSelectionModel({
            singleSelect:true,
            listeners:{
                'rowselect':function(){
                    var grd = Ext.getCmp('gridProductosCliente');
                    var tolAct=Ext.getCmp('idToolBarActivar');
                    var tolDes=Ext.getCmp('idToolBarDesactivar');
                    var record = grd.getSelectionModel().getSelected();
                    if(record.get('status')=="Activo"){
                        tolAct.setVisible(false);
                        tolDes.setVisible(true);
                    }else{
                        tolAct.setVisible(true);
                        tolDes.setVisible(false);
                    }
                }
            }
        }),
        loadMask        : true,
        viewConfig      : {
            autoFill: true,
            forceFit: true
        },
        enableHdMenu    : true,
        autoScroll      : true,
        frame           : false,
        tbar            : getToolBar(idc),
        bbar            : this.pbarProdCliente,
        columns         : [
        new Ext.grid.RowNumberer(),
        {
            header: "Familia",
            width: 30,
            sortable: true,
            renderer:change,
            dataIndex: 'familia'
        },

        {
            header: "Producto",
            width: 70,
            sortable: true,
            renderer:change,
            dataIndex: 'producto'
        },

        {
            header: "Fecha Alta/Baja",
            width: 30,
            sortable: true,
            renderer:change,
            dataIndex: 'fechaab'
        },

        {
            header: "Medico",
            width: 70,
            sortable: true,
            renderer:change,
            dataIndex: 'medico'
        },
        {
            header: "Fuerza de Ventas",
            width: 50,
            sortable: true,
            renderer:change,
            dataIndex: 'fv'
        },
        {
            header: "Tiempo",
            width: 50,
            sortable: true,
            renderer:change,
            dataIndex: 'duracion'
        },

        {
            header: "Status",
            width: 30,
            sortable: true,
            renderer:change,
            dataIndex: 'status'
        }
        ]        
        
    });
    return this.pnlBuscadorCp;
}

