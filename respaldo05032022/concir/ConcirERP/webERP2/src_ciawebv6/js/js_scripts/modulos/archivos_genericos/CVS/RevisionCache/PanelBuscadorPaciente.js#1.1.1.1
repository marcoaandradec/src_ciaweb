Ext.ns('com.punto.pen');

var idClienteSesion;
var idAccion;
var idArbol;
var tol;
var dobleBusqueda=1;

com.punto.pen.RegresaIdC = function(){
    return idClienteSesion;
}

function getCnt(idCnt,n,ap,am,t){
    actCmpPxPr="";
    
    var idGridPB=Ext.getCmp("gridBuscadorPaciente");
    if(idGridPB != null){
        idGridPB.store.clearGrouping();
        idGridPB.doLayout();
    }

    dobleBusqueda=1;
    var nomb=n;
    var strnoms=nomb.split(" ");
    if(strnoms.length!=0){
        nomb=nomb.replace(/%/gi," ");
    }

    var apP=ap;
    var apPs=apP.split(" ");
    if(apPs.length!=0){
        apP=apP.replace(/%/gi," ");
    }

    var apM=am;
    var apMs=apM.split(" ");
    if(apMs.length!=0){
        apM=apM.replace(/%/gi," ");
    }
    
    var tipo=t;
    var strTipo=tipo.split(" ");
    if(strTipo.length!=0){
        tipo=tipo.replace(/%/gi," ");
    }
    
    getActPx(idCnt,idAccion,idArbol,"","","",nomb,apP,apM,tipo);
    idClienteSesion=idCnt; 
}

//Funsion que solo enviara al Panel de PanelCanalizaInbFarma para agendar un caso al usuario de Farmacovigilancia
function getCanalizaFarma(idCnt){
    var wnd = new com.punto.pen.WndActividades({
        id:'idWndActividad',
        y:100,
        height:230,
        autoAncho:false,
        width: 850,
        autoAlto:false,
        titulo:'Canaliza a Farmacovigilancia',
        pnl:new com.punto.pen.PanelCanalizaInbFarma({
            id:'pnlFV',
            url:contexto+'/Farmacovigilancia',
            idTree:'pnlTreeAccionesFV'
        }),
        prm:{
            'idCnt':idCnt,
            'idAcc':'7',
            'idTree':'pnlTreeAccionesFV',
            'bnd':1,
            'wnd':'idWndActividad'
        },
        border:false,
        drag:true,
        modal:true
    });
    wnd.show();
    idClienteSesion=idCnt;
}

var viewGrup;

com.punto.pen.PanelBuscadorPaciente = function(argumentos){
    var pnlId      = (argumentos.id==null ? "PanelFormBucadorPaciente" : argumentos.id);
    var pnlFrm     = 'frmBPac';
    var idMod      = (argumentos.idMod==null ? '0' : argumentos.idMod);
    var idAcc      = (argumentos.idAcc==null ? '' : argumentos.idAcc);
    var enviaFarma = (argumentos.enviaFarma==null ? '0' : argumentos.enviaFarma);
    idAccion = idAcc;
    var idTree = (argumentos.idTree==null ? '' : argumentos.idTree);
    idArbol = idTree;
    var punto = '';
    this.titulo = (argumentos.titulo==null ? 'Buscador de Pacientes' : argumentos.titulo);
    /*** Componentes ***/

    //creando el repositorio de datos
    var storeBuscadorPaciente = new Ext.data.GroupingStore({
        autoLoad: false,
        baseParams: {
            bnd:1
        },
        reader :new Ext.data.JsonReader( {
            totalProperty: 'total',
            root :'records',
            idProperty: 'id'
        },new com.punto.pen.RecordBuscadorPaciente()),
        proxy :new Ext.data.HttpProxy( {
            url : contexto+'/Cliente?bnd=1',
            timeout:180000
        }),
        listeners:{
            'loadexception':function(){
                storeBuscadorPaciente.removeAll();
            },
            'update':function(st,rcd,op){
                if(op == Ext.data.Record.COMMIT){
                    
                }else if(op == Ext.data.Record.REJECT){
                    
            }
            }
        }
        ,
        sortInfo:{
            field: 'foliomedico',
            direction: "ASC"
        }//        ,groupField:'foliomedico'
    });

    var pbarBuscadorPaciente = new Ext.PagingToolbar({
        id          : 'pgrid',
        width       : 430,
        pageSize    : 20,
        store       : storeBuscadorPaciente,
        displayInfo : true,
        displayMsg  : 'Mostrando {0} - {1} Clientes de {2}',
        emptyMsg    : "No hay datos para mostrar"
    });

    function clickBtnBuscar2(){
        var date="dd/mm/yyyy";
        var estadoCli="";
        var estadoMed="";
        var param;
        
        if(dobleBusqueda==1){
            if((Ext.getCmp('idBPfolio').getValue()=='')&&(Ext.getCmp('idBPNombre').getValue()=='')&&
                (Ext.getCmp('idBPAp').getValue()=='')&&(Ext.getCmp('idBPAm').getValue()=='')&&
                (Ext.getCmp('idTel').getValue()=='')&&(Ext.getCmp('idFechaN').getValue()=='')&&
                (Ext.getCmp('idEstadoBus').getValue()=='')){
                Ext.MessageBox.alert('Mensaje de Error', "Debe llenar al menos un campo.");
            }else{
                if(Ext.getCmp('idFechaN').getValue()!='')date=Ext.getCmp('idFechaN').getValue().format('d/m/Y');
                if(Ext.getCmp('idEstadoBus').getValue()!='') estadoCli=Ext.getCmp('idEstadoBus').getRawValue();

                param=({
                    'folio':Ext.getCmp('idBPfolio').getValue(),
                    'nombre':"'"+Ext.getCmp('idBPNombre').getValue()+"'",
                    'apaterno':"'"+Ext.getCmp('idBPAp').getValue()+"'",
                    'amaterno':"'"+Ext.getCmp('idBPAm').getValue()+"'",
                    'telefono':Ext.getCmp('idTel').getValue(),
                    'FechaN':"'"+date+"'",
                    'Estado':"'"+estadoCli+"'",
                    'BMclave':'',
                    'BMCedula':"''",
                    'BMApP':"''",
                    'BMnombre':"''",
                    'BMApM':"''",
                    'BMEstado':"''",
                    'busqueda':1
                });
                BuscarPaciente(param);
            }
        }else{
            if(
                (Ext.getCmp('idBMClave').getValue()=='')&& (Ext.getCmp('idComboEstadoMedi').getValue()=='')&&
                (Ext.getCmp('idBMCedula').getValue()=='')&&(Ext.getCmp('idBMNombre').getValue()=='')&&
                (Ext.getCmp('idBMApP').getValue()=='')&&(Ext.getCmp('idBMApM').getValue()=='')
                ){
                Ext.MessageBox.alert('Mensaje de Error', "Debe llenar al menos un campo.");
            }else{
                if(Ext.getCmp('idFechaN').getValue()!='')date=Ext.getCmp('idFechaN').getValue().format('d/m/Y');
                if(Ext.getCmp('idEstadoBus').getValue()!='') estadoCli=Ext.getCmp('idEstadoBus').getRawValue();
                if(Ext.getCmp('idComboEstadoMedi').getValue()!='') estadoMed=Ext.getCmp('idComboEstadoMedi').getRawValue();
            
                param=({
                    'folio':Ext.getCmp('idBPfolio').getValue(),
                    'nombre':"'"+Ext.getCmp('idBPNombre').getValue()+"'",
                    'apaterno':"'"+Ext.getCmp('idBPAp').getValue()+"'",
                    'amaterno':"'"+Ext.getCmp('idBPAm').getValue()+"'",
                    'telefono':Ext.getCmp('idTel').getValue(),
                    'FechaN':"'"+date+"'",
                    'Estado':"'"+estadoCli+"'",
                    'BMclave':Ext.getCmp('idBMClave').getValue(),
                    'BMCedula':"'"+Ext.getCmp('idBMCedula').getValue()+"'",
                    'BMApP':"'"+Ext.getCmp('idBMApP').getValue()+"'",
                    'BMnombre':"'"+Ext.getCmp('idBMNombre').getValue()+"'",
                    'BMApM':"'"+Ext.getCmp('idBMApM').getValue()+"'",
                    'BMEstado':"'"+estadoMed+"'",
                    'busqueda':1
                });
                BuscarPaciente(param);
            }
        }        
    }

    this.pnlBuscadorPaciente = new Ext.Panel({        
        id: pnlId,
        title:this.titulo,
        layout:"border",
        region:"center",
        frame: true,
        anchor:"100%",
        items:[{
            html:"",
            Height:20,
            border:false
        },{
            xtype :"form",
            id    :'panelNorte',
            layout:"form",
            anchor:"100%",
            region:"north",
            autoHeight:true,
            border:false,
            bodyStyle:"padding: 5px;",
            items:[{
                xtype:"panel",
                id:'frmBPac',
                layout:"column",
                anchor:"100%",
                border:false,
                bodyStyle:"padding: 5px;",
                buttonAlign:"center",
                items:[{
                    xtype:"panel",
                    columnWidth:0.1,
                    layout:"form",
                    labelAlign:"top",
                    border:false,
                    bodyStyle:"padding 5px;",
                    items:[{
                        xtype:"numberfield",
                        width:110,
                        id:'idBPfolio',
                        name:'folio',
                        fieldLabel:"Folio",
                        enableKeyEvents:true,
                        tabIndex:159,
                        listeners:{
                            'keypress':
                            function(txtField,e){
                                if(e.keyCode==13){
                                    clickBtnBuscar2();
                                }
                            }
                        }
                    },{
                        xtype:"hidden",
                        name:'enviaFarma',
                        id:'enviaFarma',
                        value:enviaFarma
                    }]
                },
                {
                    xtype:"panel",
                    columnWidth:0.13,
                    layout:"form",
                    labelAlign:"top",
                    border:false,
                    bodyStyle:"padding 5px;",
                    items:[{
                        xtype:"textfield",
                        width:150,
                        id:'idBPNombre',
                        name:'nombre',
                        fieldLabel:"Nombre",
                        enableKeyEvents:true,
                        tabIndex:161,
                        style:'text-transform: uppercase;',
                        listeners:{
                            blur:function(el){
                                el.setValue(el.getValue().trim());
                            },
                            'keyup' : function(elem, e){
                                elem.setValue(elem.getValue().toUpperCase());
                            },
                            'keypress':
                            function(txtField,e){
                                if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                                    e.stopEvent();
                                }
                                if(e.keyCode==13){
                                    clickBtnBuscar2();
                                }
                            }
                        }
                    }]
                },{
                    xtype:"panel",
                    columnWidth:0.13,
                    layout:"form",
                    labelAlign:"top",
                    border:false,
                    bodyStyle:"padding 5px;",
                    items:[{
                        xtype:"textfield",
                        width:150,
                        id:'idBPAp',
                        name:'apaterno',
                        fieldLabel:"Apellido Paterno",
                        enableKeyEvents:true,
                        tabIndex:162,
                        style:'text-transform: uppercase;',
                        listeners:{
                            blur:function(el){
                                el.setValue(el.getValue().trim());
                            },
                            'keyup' : function(elem, e){
                                elem.setValue(elem.getValue().toUpperCase());
                            },
                            'keypress':
                            function(txtField,e){
                                if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                                    e.stopEvent();
                                }
                                else{
                                    
                                }
                                if(e.keyCode==13){
                                    clickBtnBuscar2();
                                }
                            }
                        }
                    }]
                },{
                    xtype:"panel",
                    columnWidth:0.13,
                    layout:"form",
                    labelAlign:"top",
                    border:false,
                    bodyStyle:"padding 5px;",
                    items:[{
                        xtype:"textfield",
                        width:150,
                        id:'idBPAm',
                        name:'amaterno',
                        style:'text-transform: uppercase;',
                        fieldLabel:"Apellido Materno",
                        tabIndex:163,
                        enableKeyEvents:true,
                        listeners:{
                            blur:function(el){
                                el.setValue(el.getValue().trim());
                            },
                            'keyup' : function(elem, e){
                                elem.setValue(elem.getValue().toUpperCase());
                            },
                            'keypress':
                            function(txtField,e){
                                if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                                    e.stopEvent();
                                }
                                if(e.keyCode==13){
                                    clickBtnBuscar2();
                                }
                            }
                        }
                    }]
                },{
                    xtype:"panel",
                    columnWidth:0.1,
                    layout:"form",
                    labelAlign:"top",
                    border:false,
                    bodyStyle:"padding 5px",
                    items:[{
                        xtype:"numberfield",
                        width:110,
                        id:'idTel',
                        name:'telefono',
                        fieldLabel:"Teléfono",
                        tabIndex:164,
                        enableKeyEvents:true,
                        listeners:{
                            'keypress':
                            function(txtField,e){
                                if(e.keyCode==13){
                                    clickBtnBuscar2();
                                }
                            }
                        }
                    }]
                },{
                    xtype:"panel",
                    columnWidth:0.11,
                    layout:"form",
                    labelAlign:"top",
                    border:false,
                    bodyStyle:"padding 5px",
                    items:[{
                        xtype:"datefield",
                        fieldLabel:"Fecha Nacimiento",
                        id:'idFechaN',
                        name:"FechaN",
                        emptyText:'dd/mm/yyyy',
                        tabIndex:165,
                        //                hidden:true,
                        width:100,
                        autoCreate:{
                            tag:"input",
                            maxlength:10
                        },
                        enableKeyEvents:true,
                        listeners:{
                            'blur':function(){
                                var valid=Validafecha('idFechaN');
                                if(valid==false){
                                    Ext.MessageBox.alert('Error en Fecha',"La fecha de nacimiento ("+Ext.getCmp('idFechaN').getValue().format('d/m/Y')+") no puede ser mayor a la fecha actual");
                                    Ext.getCmp('idFechaN').setValue("");
                                }
                            },
                            'keypress':
                            function(txtField,e){
                                if(e.keyCode==13){
                                    clickBtnBuscar2();
                                }
                                if((e.getKey()>=47 && e.getKey()<=57)|| e.getKey()==9 || e.getKey()==8){}else{
                                    e.stopEvent();
                                }
                            }
                        }
                    }]
                },{
                    xtype:"panel",
                    columnWidth:0.14,
                    layout:"form",
                    labelAlign:"top",
                    border:false,
                    bodyStyle:"padding 5px",
                    items:[
                    new com.punto.pen.ComboBox({
                        id:"idEstadoBus",
                        etiqueta:"Estado",
                        name:"Estado",
                        width:170,
                        tabIndex:166,
                        prm:{
                            campo:'edo',
                            idCampo:'idEdo',
                            bnd:1,
                            qry:1,
                            autoCarga:true
                        },
                        evt:{
                            'select':function(cmb,rec,idx){
                                clickBtnBuscar2();
                            },
                            render: function(c){
                                new Ext.ToolTip({
                                    target: c.getEl(),
                                    html: 'Al buscar por Estado solo traerá a: Pacientes y Prospectos que cuenten con una dirección',
                                    title: '<u style="color:red;">Nota:</u>',
                                    autoHide: false,
                                    closable: true,
                                    draggable:true
                                });
                            }
                        },
                        enableKeyEvents:true,
                        listeners:{
                            'keypress':
                            function(txtField,e){
                                if(e.keyCode==13){
                                    clickBtnBuscar2();
                                }
                            }
                        }
                    }) ]
                }
                ],
                buttons:[
                {
                    text:'Regresar',
                    iconCls:'icn-back',
                    id:'idBotReg',
                    handler:function(){
                        IniciarAccion(idTree,false,false,'pnlCenter',new com.punto.pen.PanelBienvenida({
                            msg:''
                        }));
                    }
                },
                {
                    text:"Buscar",
                    handler:clickBtnBuscar2,
                    iconCls:'icn-busquedaDos'
                },
                {
                    text:"Buscar por Médico",
                    iconCls:'icn-buscarPregunta',
                    id:'idBusqMed',
                    handler:function(){
                        dobleBusqueda=2;
                        var prin=Ext.getCmp(pnlId);
                        prin.expand();
                        var idPQM=Ext.getCmp("idPanelQueryMedico");
                        idPQM.setVisible(true);
                        var idGridPB=Ext.getCmp("gridBuscadorPaciente");
                        var prue=Ext.getCmp("gridBuscadorPaciente").getColumnModel();
                        prue.setHidden(9,false);
                        prue.setHidden(10,false);
                        idGridPB.getView().refresh(true);
                        Ext.getCmp("idCanBusMe").setVisible(true);
                        Ext.getCmp("idBusqMed").setVisible(false);
                        Ext.getCmp('idEstadoBus').setDisabled(true);
                        Ext.getCmp('idEstadoBus').setValue("");
                        if(idGridPB.getStore()!=null){
                            idGridPB.store.removeAll();
                        }
                        idGridPB.store.groupBy('foliomedico',true);
                        idGridPB.doLayout();
                        idPQM.doLayout();
                        prin.doLayout();
                    }
                },
                {
                    text:"Cancelar Búsqueda Médico",
                    iconCls:'icn-cancela',
                    id:'idCanBusMe',
                    hidden:true,
                    handler:function(){
                        dobleBusqueda=1;
                        var prin=Ext.getCmp(pnlId);
                        prin.expand();
                        var idPQM=Ext.getCmp("idPanelQueryMedico");
                        idPQM.setVisible(false);
                        var idGridPB=Ext.getCmp("gridBuscadorPaciente");
                        var prue=Ext.getCmp("gridBuscadorPaciente").getColumnModel();
                        prue.setHidden(9,true);
                        prue.setHidden(10,true);
                        idGridPB.getView().refresh(true);
                        Ext.getCmp("idBusqMed").setVisible(true);
                        Ext.getCmp("idCanBusMe").setVisible(false);
                        Ext.getCmp('idEstadoBus').setDisabled(false);
                        Ext.getCmp('idEstadoBus').setValue("");
                        if(idGridPB.getStore()!=null){
                            idGridPB.store.removeAll();
                        }
                        Ext.getCmp('idBMClave').setValue("");
                        Ext.getCmp('idBMCedula').setValue("");
                        Ext.getCmp('idBMNombre').setValue("");
                        Ext.getCmp('idBMApP').setValue("");
                        Ext.getCmp('idComboEstadoMedi').setValue("");
                        idGridPB.store.clearGrouping();
                        idGridPB.doLayout();
                        idPQM.doLayout();
                        prin.doLayout();
                    }
                },
                {
                    text:"Limpiar",
                    handler:clickBtnLimpiar,
                    iconCls:'icn-limpiarBusqueda'
                },
                {
                    text:"Nuevo Cliente",
                    id:"BotonNuevoCliente",
                    handler:function(boton){
                        boton.disable();
                        var wnd = new Ext.Window({
                            title:'Nuevo Cliente',
                            id:'idWndRegistro',
                            width:1100,
                            height:500,
                            constrainHeader :true,
                            modal:true,
                            border:false,
                            autoScroll:false,
                            draggable:true,
                            resizable:false,
                            items:[
                            new com.punto.pen.regPaciente({
                                id:'newPacFrm',
                                url:contexto+'/Cliente',
                                alto:420,
                                obsTF:true
                            }).crearFichaNuevoCliente()
                            ],
                            buttons:[
                            {
                                text:'Registrar',
                                id:'idRegistrarPaciente',
                                handler:function(b){
                                    submitFormulario(Ext.getCmp('newPacFrm'),{
                                        bnd:4,
                                        wnd:'idWndRegistro',
                                        'idAcc':idAccion,
                                        'idTree':idArbol,
                                        'modulo':1
                                    });
                                    boton.enable();
                                },
                                tabIndex:157
                            },
                            {
                                text:'Cancelar',
                                handler:function(){
                                    Ext.Msg.show({
                                        title:'Cancelar Registro',
                                        msg: '<center>¿Está seguro que desea cancelar el registro?<br>Los datos se perderán</center>',
                                        buttons: Ext.Msg.YESNO,
                                        animEl: 'elId',
                                        fn: function(btn){
                                            if(btn == 'no'){
                                            }
                                            if(btn == 'yes'){
                                                boton.enable();
                                                wnd.close();
                                            }
                                        },
                                        icon: Ext.MessageBox.WARNING
                                    });
                                },
                                tabIndex:158
                            }
                            ],
                            tools:[
                            {
                                id:'close',
                                qtip: 'Cerrar',
                                handler: function(event, toolEl, panel){
                                    boton.enable();
                                    wnd.close();
                                }
                            }
                            ]
                        });
                        wnd.show();
                    },
                    iconCls:'icn-addusr'
                }
                ]
            },{
                xtype:"panel",
                id:'idPanelMedB',
                layout:"form",
                anchor:"100%",
                border:false,
                bodyStyle:"padding: 5px;",
                items:[
                {
                    xtype:"fieldset",
                    id:"idPanelQueryMedico",
                    title:"Búsqueda Relacionada con Médico",
                    anchor:"100%",
                    region:"center",
                    height:80,
                    hidden:true,
                    items:[{
                        xtype:"panel",
                        layout:"column",
                        anchor:"100%",
                        region:"north",
                        border:false,
                        bodyStyle:"padding: 5px",
                        buttonAlign:"center",
                        items:[{
                            xtype:"panel",
                            columnWidth:0.14,
                            layout:"form",
                            labelAlign:"top",
                            border:false,
                            bodyStyle:"padding 5px;",
                            items:[{
                                html:"",
                                width:30,
                                height:10
                            }]
                        },{
                            xtype:"panel",
                            columnWidth:0.1,
                            layout:"form",
                            labelAlign:"top",
                            border:false,
                            bodyStyle:"padding 5px;",
                            items:[{
                                xtype:"numberfield",
                                width:110,
                                tabIndex:1,
                                id:'idBMClave',
                                name:'BMclave',
                                fieldLabel:"Clave",
                                enableKeyEvents:true,
                                listeners:{
                                    'keypress':
                                    function(txtField,e){
                                        if(e.keyCode==13){
                                            clickBtnBuscar2();
                                        }
                                    }
                                }
                            }]
                        },{
                            xtype:"panel",
                            columnWidth:0.1,
                            layout:"form",
                            labelAlign:"top",
                            border:false,
                            bodyStyle:"padding 5px;",
                            items:[{
                                xtype:"textfield",
                                width:110,
                                tabIndex:2,
                                id:'idBMCedula',
                                name:'BMCedula',
                                fieldLabel:"Cédula",
                                enableKeyEvents:true,
                                listeners:{
                                    'keypress':
                                    function(txtField,e){
                                        if(e.keyCode==13){
                                            clickBtnBuscar2();
                                        }
                                    }
                                }
                            }]
                        },
                        {
                            xtype:"panel",
                            columnWidth:0.13,
                            layout:"form",
                            labelAlign:"top",
                            border:false,
                            bodyStyle:"padding 5px;",
                            items:[{
                                xtype:"textfield",
                                width:150,
                                tabIndex:3,
                                id:'idBMNombre',
                                name:'BMnombre',
                                fieldLabel:"Nombre",
                                enableKeyEvents:true,
                                style:'text-transform: uppercase;',
                                listeners:{
                                    blur:function(el){
                                        el.setValue(el.getValue().trim());
                                    },
                                    'keyup' : function(elem, e){
                                        elem.setValue(elem.getValue().toUpperCase());
                                    },
                                    'keypress':
                                    function(txtField,e){
                                        if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                                            e.stopEvent();
                                        }
                                        if(e.keyCode==13){
                                            clickBtnBuscar2();
                                        }
                                    }
                                }
                            }]
                        },{
                            xtype:"panel",
                            columnWidth:0.13,
                            layout:"form",
                            labelAlign:"top",
                            border:false,
                            bodyStyle:"padding 5px;",
                            items:[{
                                xtype:"textfield",
                                width:150,
                                id:'idBMApP',
                                name:'BMApP',
                                tabIndex:4,
                                enableKeyEvents:true,
                                fieldLabel:"Apellido Paterno",
                                style:'text-transform: uppercase;',
                                listeners:{
                                    blur:function(el){
                                        el.setValue(el.getValue().trim());
                                    },
                                    'keyup' : function(elem, e){
                                        elem.setValue(elem.getValue().toUpperCase());
                                    },
                                    'keypress':
                                    function(txtField,e){
                                        if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                                            e.stopEvent();
                                        }
                                        if(e.keyCode==13){
                                            clickBtnBuscar2();
                                        }
                                    }
                                }
                            }]
                        },{
                            xtype:"panel",
                            columnWidth:0.13,
                            layout:"form",
                            labelAlign:"top",
                            border:false,
                            bodyStyle:"padding 5px;",
                            items:[{
                                xtype:"textfield",
                                width:150,
                                id:'idBMApM',
                                name:'BMApM',
                                enableKeyEvents:true,
                                fieldLabel:"Apellido Materno",
                                tabIndex:5,
                                style:'text-transform: uppercase;',
                                listeners:{
                                    blur:function(el){
                                        el.setValue(el.getValue().trim());
                                    },
                                    'keyup' : function(elem, e){
                                        elem.setValue(elem.getValue().toUpperCase());
                                    },
                                    'keypress':
                                    function(txtField,e){
                                        if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                                            e.stopEvent();
                                        }
                                        if(e.keyCode==13){
                                            clickBtnBuscar2();
                                        }
                                    }
                                }
                            }]
                        },{
                            xtype:"panel",
                            columnWidth:0.14,
                            layout:"form",
                            labelAlign:"top",
                            border:false,
                            bodyStyle:"padding 5px",
                            items:[
                            new com.punto.pen.ComboBox({
                                id:"idComboEstadoMedi",
                                etiqueta:"Estado",
                                tabIndex:6,
                                width:170,
                                name:"BMEstado",
                                prm:{
                                    campo:'edo',
                                    idCampo:'idEdo',
                                    bnd:1,
                                    qry:1,
                                    autoCarga:true
                                },
                                evt:{
                                    'select':function(cmb,rec,idx){
                                        clickBtnBuscar2();
                                    }
                                },
                                enableKeyEvents:true,
                                listeners:{
                                    'keypress':
                                    function(txtField,e){
                                        if(e.keyCode==13){
                                            clickBtnBuscar();
                                        }
                                    }
                                }
                            })]
                        }]
                    }]
                } ]
            }
            ]
        }
        ,{
            xtype           : "editorgrid",
            id              : "gridBuscadorPaciente",
            title           : "Clientes Encontrados",
            region          : 'center',
            anchor          : "100%",
            columnWidth     : 0.7,
            store           : storeBuscadorPaciente,
            stripeRows      : true,
            sm              : new Ext.grid.RowSelectionModel({
                singleSelect:true
            }),
            loadMask        : true,
            viewConfig      : {
                autoFill: true,
                forceFit: true
            },
            view: new Ext.grid.GroupingView({
                forceFit:true,
                startCollapsed:false,
                groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Relacionados" : "Relacionado"]})'
            }),
            enableHdMenu    : true,
            autoScroll      : true,
            frame           : false,
            border          : false,
            bbar            : [pbarBuscadorPaciente,'->',{
                text  : '<u style="font-weight: bold; color:red;">Nota:</u> &nbsp;Para consultar la información de los clientes sin Iniciar Sesión de 2 clicks en la fila.',
                style :'font-weight:bold;font-size:12;',
                handleMouseEvents:false,
                handler:null
            }],
            columns         : [new Ext.grid.RowNumberer(),
            {
                header: "Elegir",
                width: 60,
                sortable: true,
                dataIndex: 'elegir'
            },

            {
                id:'foliomedico',
                header: "Folio Médico",
                width: 60,
                hidden: true,
                sortable: true,
                dataIndex: 'foliomedico'
            },

            {
                header: "Folio",
                width: 60,
                sortable: true,
                dataIndex: 'folio'
            },
            {
                header: "Nombre",
                width: 75,
                sortable: true,
                dataIndex: 'nombre'
            },
            {
                header: "Ap. Paterno",
                width: 75,
                sortable: true,
                dataIndex: 'apaterno'
            },
            {
                header: "Ap. Materno",
                width: 75,
                sortable: true,
                dataIndex: 'amaterno'
            },
            {
                header: "Teléfono",
                width: 75,
                sortable: true,
                dataIndex: 'telefono'
            },
            {
                header: "Fecha Nac.",
                width: 75,
                sortable: true,
                dataIndex: 'fecha_nac'
            },

            {
                header: "Producto",
                width: 105,
                hidden: true,
                sortable: true,
                dataIndex: 'medicamento'
            },
            {
                header: "Status Producto",
                width: 80,
                hidden: true,
                sortable: true,
                dataIndex: 'statusProd'
            },
            {
                header: "Fecha Reg.",
                width: 75,
                sortable: true,
                dataIndex: 'fecha_reg'
            },

            {
                header: "Tipo Cliente",
                width: 75,
                sortable: true,
                dataIndex: 'tipo_paciente'
            },
            {
                header: "Estado",
                width: 75,
                sortable: true,
                dataIndex: 'estado'
            },
            {
                header: "Activo",
                width: 65,
                sortable: true,
                dataIndex: 'status',
                renderer:function(val){
                    var s = "";
                    if(val == ""){
                        s = "";
                    }else if(val == 1){
                        s = "<b><font color=\"#86B51F\">Activo</font></b>";
                    }else if(val == 2){
                        s = "<b><font color=\"#F75828\">Inactivo</font></b>";
                    }else if(val == 3){
                        s = "<b><font color=\"#FF9700\">Borrado</font></b>";
                    }else if(val == 4){
                        s = "<b><font color=\"#428BDD\">Inactivo SM</font></b>";
                    }else if(val == 5){
                        s = "<b><font color=\"#03C\">Inactivo SM</font></b>";
                    }
                    return s;
                },
                editor:new com.punto.pen.ComboBox({
                    id:'idCmbStatus',
                    listClass:'x-combo-list-small',
                    width:100,
                    prm:{
                        bnd:5,
                        qry:61,
                        autoCarga:true,
                        idCampo:'idStatus',
                        campo:'status'
                    },
                    evt:{
                        'beforeselect':function(cmb){
                            if(cmb.getValue()==""){
                                cmb.fireEvent('blur');
                                return false;
                            }else{
                                return true;
                            }
                        },
                        'select':function(cmb){
                            cmb.fireEvent('blur');
                        }
                    }
                })
            }],
            listeners: {
                'rowdblclick':function(grid){                    
                    if(tol!=null)tol.hide();
                    tol=new Ext.Tip({
                        html: grid.getSelectionModel().getSelected().get('es_activo'),
                        title: '<u style="color:red;">Información del Cliente:</u> &nbsp;&nbsp;Folio: '+grid.getSelectionModel().getSelected().get('folio'),
                        width:514,
                        autoHide: false,
                        closable: true,
                        draggable:true
                    });
                    tol.showAt([35,105]);
                },
                'afteredit':function(obj){
                    var stT =obj.record.get('statusTipo');
                    var objST=obj.value;

                    if((stT==obj.value) || (stT==4 && objST==2) || (stT==5 && objST==2)){
                        obj.grid.getStore().rejectChanges();
                    }else{
                        if(obj.value=='1'){
                            if(obj.record.get('idTipoPaciente')=='1'){
                                ActiPacienteProspecto("gridBuscadorPaciente");
                            }else if(obj.record.get('idTipoPaciente')=='2'){
                                ActInaProspectoYContacto(obj.record.get('folio'),1,2,"gridBuscadorPaciente",false);
                            }else if(obj.record.get('idTipoPaciente')=='3'){
                                ActInaProspectoYContacto(obj.record.get('folio'),1,3,"gridBuscadorPaciente",false);
                            }else if(obj.record.get('idTipoPaciente')=='4'){
                                ActInaProspectoYContacto(obj.record.get('folio'),1,4,"gridBuscadorPaciente",false);
                            }
                        }else if(obj.value=='2'){
                            if(obj.record.get('idTipoPaciente')=='1'){
                                var msnP= Ext.Msg.show({
                                    title:'Desactivar Paciente',
                                    msg: '¿Está seguro que desea desactivar al paciente?<br>Todos sus productos serán desactivados.',
                                    buttons: Ext.Msg.YESNO,
                                    animEl: 'elId',
                                    fn: function(btn){
                                        if(btn == 'no'){
                                            obj.grid.getStore().rejectChanges();
                                        }
                                        if(btn == 'yes'){
                                            msnP.hide();
                                            var wnd = new Ext.Window({
                                                title:"Desactivar",
                                                id:"idWndMotivoDesactivar",
                                                width:585,
                                                height:320,
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
                                                    border:false,
                                                    frame:false,
                                                    height:200,
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
                                                    }),{
                                                        xtype:"textarea",
                                                        name:"editorMotivo",
                                                        id:"idEditorMotivo",
                                                        fieldLabel:"Observaciones",
                                                        width:550,
                                                        height:150,
                                                        allowBlank:false,
                                                        style:'text-transform: uppercase;',
                                                        border:false,
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
                                                    }
                                                    ]
                                                }],
                                                buttons:[{
                                                    text:'Desactivar',
                                                    handler:function(){
                                                        var idMot=Ext.getCmp("idComboMotivo").getValue();
                                                        var mot=Ext.getCmp("idEditorMotivo").getValue();
                                                        if(idMot != "" && mot !=""){
                                                            var msg = Ext.MessageBox.show({
                                                                msg: 'Procesando la Información, espere por favor...',
                                                                progressText: 'Saving...',
                                                                width:300,
                                                                wait:true,
                                                                waitConfig: {
                                                                    interval:200
                                                                }
                                                            });
                                                            Ext.Ajax.request({
                                                                url:contexto+'/Cliente',
                                                                params:{
                                                                    'bnd':17,
                                                                    'folio':obj.record.get('folio'),
                                                                    'idMot':idMot,
                                                                    'mot':mot
                                                                },
                                                                success:function(rsp){
                                                                    var array = eval("("+rsp.responseText+")");
                                                                    if(array.sesion!=null){
                                                                        msg.hide();
                                                                        getSession();
                                                                    }else{
                                                                        obj.grid.getStore().commitChanges();
                                                                        msg.hide();
                                                                        Ext.Msg.alert("!!Alerta¡¡","El paciente ah sido desactivado con éxito.");
                                                                        LoadGridBuscadorPaciente(obj.record.get('folio'));
                                                                    }
                                                                },
                                                                failure:function(rsp){
                                                                    var array = eval("("+rsp.responseText+")");
                                                                    msg.hide();
                                                                    obj.grid.getStore().rejectChanges();
                                                                    var mnsE=Ext.Msg.alert("","Hubo un error en el servidor");
                                                                    if(array.sesion!=null){
                                                                        mnsE.hide();
                                                                        getSession();
                                                                    }
                                                                }
                                                            });
                                                            wnd.close();
                                                        }else{
                                                            Ext.Msg.show({
                                                                title:'Status producto',
                                                                msg: 'Faltan datos para continuar'
                                                                ,
                                                                buttons: Ext.Msg.OK
                                                            });
                                                        }
                                                    }
                                                },{
                                                    text:'Cancelar',
                                                    handler:function(){
                                                        obj.grid.getStore().rejectChanges();
                                                        wnd.close();
                                                    }
                                                }]
                                            });
                                            wnd.show();
                                        }
                                    },
                                    icon: Ext.MessageBox.WARNING
                                });
                            }else if(obj.record.get('idTipoPaciente')=='2'){
                                ActInaProspectoYContacto(obj.record.get('folio'),2,2,"gridBuscadorPaciente",false);
                            }else if(obj.record.get('idTipoPaciente')=='3'){
                                ActInaProspectoYContacto(obj.record.get('folio'),2,3,"gridBuscadorPaciente",false);
                            }else if(obj.record.get('idTipoPaciente')=='4'){
                                ActInaProspectoYContacto(obj.record.get('folio'),2,4,"gridBuscadorPaciente",false);
                            }
                        }else if(obj.value=='3'){
                            obj.grid.getStore().rejectChanges();
                        }else if(obj.value=='4'){
                            obj.grid.getStore().rejectChanges();
                        }else if(obj.value=='5'){
                            obj.grid.getStore().rejectChanges();
                        }

                    }
                }
            }
        }]
    });
    
    return this.pnlBuscadorPaciente;
}

function getCambiarWebPaciente(idCnt,nom,ap,am,t){
    var formModificarWeb =new com.punto.pen.ModificarRegistro({
        id:'idModWeb',
        url:contexto+'/ModificarProCon',
        'idCnt':idCnt,
        alto:410,
        border:false,
        valEmail:2
    }).crearModificacionPaciente(4);

    Ext.MessageBox.show({
        title:'Usuario Web',
        msg: '<br/><center>¿Qué te gustaria hacer con el Usuario Web?</center>',
        buttons:{
            yes:'Activar como Paciente',
            no:'Iniciar Sesión de Seguimiento',
            cancel:'Cancelar'
        },
        fn: function(btn){
            if(btn == 'no'){
                getCnt(idCnt,nom,ap,am,t);
            }
            if(btn == 'yes'){
                var wnd = new  Ext.Window({
                    id:'idModForm',
                    title:'Cambiar de Usuario Web a Paciente',
                    width:1000,
                    height:500,
                    constrainHeader :true,
                    modal:true,
                    border:false,
                    autoScroll:false,
                    draggable:true,
                    resizable:false,
                    bodyStyle: 'padding:5px;',
                    items:[formModificarWeb]
                    ,
                    buttons:[ {
                        text:'Guardar',
                        id:'idModificarReg',
                        handler:function(){
                            var idGridPB=Ext.getCmp("gridBuscadorPaciente");
                            idGridPB.store.clearGrouping();
                            idGridPB.doLayout();
                            submitFormulario(formModificarWeb,{
                                url:contexto+'/ModificarProCon',
                                'idCnt':idCnt,
                                bnd:2,
                                wnd:'idModForm',
                                tipoPas:4,
                                'idAcc':idAccion,
                                'idTree':idArbol
                            });
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
                loadFormulario(formModificarWeb,{
                    url:contexto+'/ModificarProCon',
                    'idCnt':idCnt,
                    bnd:1,
                    tipoPas:4
                });
            }
            if(btn == 'cancel'){
                obj.getStore().rejectChanges();
            }
        },
        animEl: 'mb4',
        icon: Ext.MessageBox.QUESTION
    });
}

function ActInaProspectoYContacto(idCnt,acc,tipo,grid,closeWnd){
    var obj2=Ext.getCmp(grid);

    var mnShw2="Activar";
    if(acc==2)mnShw2="Desactivar";
    var mnSTipo="Prospecto";
    if(tipo==3){
        mnSTipo="Contacto";
    }else if(tipo==4){
        mnSTipo="Usuario Web";
    }
    var msnP= Ext.Msg.show({
        title:mnShw2+' '+mnSTipo,
        msg: '¿Está seguro que desea '+mnShw2+' al '+mnSTipo+'?',
        buttons:{
            no:'NO',
            yes:'SI',
            cancel:'Consultar'
        },
        animEl: 'elId',
        fn: function(btn){
            if(btn == 'no'){
                obj2.getStore().rejectChanges();
            }
            if(btn == 'yes'){
                msnP.hide();
                var msg = Ext.MessageBox.show({
                    msg: 'Procesando la Información, espere por favor...',
                    progressText: 'Saving...',
                    width:300,
                    wait:true,
                    waitConfig: {
                        interval:200
                    }
                });
                var mnShw="El "+mnSTipo+" ah sido Activado con éxito.";
                if(acc==2){
                    mnShw="El "+mnSTipo+" ah sido Desactivado con éxito.";
                }
                Ext.Ajax.request({
                    url:contexto+'/Cliente',
                    params:{
                        'bnd':20,
                        'idCnt':idCnt,
                        Acc:acc,
                        tipo:tipo
                    },
                    success:function(rsp){
                        var array = eval("("+rsp.responseText+")");
                        if(array.sesion!=null){
                            msg.hide();
                            getSession();
                        }else{
                            msg.hide();
                            Ext.Msg.alert("!!Alerta¡¡",mnShw);
                            if(closeWnd==true){
                                var wnd = Ext.getCmp('idWndDuplicados');
                                wnd.close();
                                var wnd2 = Ext.getCmp('idWndRegistro');
                                wnd2.close();
                            }else{
                                LoadGridBuscadorPaciente(idCnt);
                            }
                        }
                    },
                    failure:function(rsp){
                        var array = eval("("+rsp.responseText+")");
                        msg.hide();
                        obj2.getStore().rejectChanges();
                        var mnsE=Ext.Msg.alert("","Hubo un error en el servidor");
                        if(array.sesion!=null){
                            mnsE.hide();
                            getSession();
                        }
                    }
                });
            }
            if(btn == 'cancel'){
                var grid=Ext.getCmp('gridBuscadorPaciente');
                var nombre=grid.getSelectionModel().getSelected().get('nombre')+" "+grid.getSelectionModel().getSelected().get('apaterno')+" "+grid.getSelectionModel().getSelected().get('amaterno');
                loadPerfilClientes(nombre,grid.getSelectionModel().getSelected().get('folio'),grid.getSelectionModel().getSelected().get('tipo_paciente'));

            }
        },
        icon: Ext.MessageBox.WARNING
    });
}

function ActiPacienteProspecto(grid,closeWnd){
    var obj=Ext.getCmp(grid);
    var record = obj.getSelectionModel().getSelected();

    Ext.MessageBox.show({
        title:'Activar Paciente',
        msg: '<br/><center>¿Como te gustaria Reactivar al Cliente?</center>',
        buttons:{
            no:'Reactivar como Prospecto',
            yes:'Reactivar como Paciente',
            cancel:'Consultar'
            
        },
        fn: function(btn){
            if(btn == 'no'){
                var msg = Ext.MessageBox.show({
                    msg: 'Procesando la Información, espere por favor...',
                    progressText: 'Saving...',
                    width:300,
                    wait:true,
                    waitConfig:{
                        interval:200
                    }
                });
                Ext.Ajax.request({
                    url:contexto+'/Cliente',
                    params:{
                        'bnd':21,
                        'idCnt':record.get('folio')
                    },
                    success:function(rsp){
                        var array = eval("("+rsp.responseText+")");
                        if(array.sesion!=null){
                            msg.hide();
                            getSession();
                        }else{
                            msg.hide();
                            Ext.Msg.alert("!!Alerta¡¡","El Cliente se ah Activado como Prospecto con éxito.");
                            var nom=record.get('nombre').replace(/ /gi,"%");
                            var ap=record.get('apaterno').replace(/ /gi,"%");
                            var am=record.get('amaterno').replace(/ /gi,"%");
                            if(closeWnd==true){
                                var wnd = Ext.getCmp('idWndDuplicados');
                                wnd.close();
                                var wnd2 = Ext.getCmp('idWndRegistro');
                                wnd2.close();
                            }
                            getCnt(record.get('folio'),nom,ap,am,"Prospecto");
                        }
                    },
                    failure:function(rsp){
                        var array = eval("("+rsp.responseText+")");
                        msg.hide();
                        obj.getStore().rejectChanges();
                        var mnsE=Ext.Msg.alert("","Hubo un error en el servidor");
                        if(array.sesion!=null){
                            mnsE.hide();
                            getSession();
                        }
                    }
                });
            }
            if(btn == 'yes'){
                var msg2 = Ext.MessageBox.show({
                    msg: 'Procesando la Información, espere por favor...',
                    progressText: 'Saving...',
                    width:300,
                    wait:true,
                    waitConfig:{
                        interval:200
                    }
                });
                Ext.Ajax.request({
                    url:contexto+'/Cliente',
                    params:{
                        'bnd':23,
                        'idCnt':record.get('folio')
                    },
                    success:function(rsp){
                        var array = eval("("+rsp.responseText+")");
                        if(array.sesion!=null){
                            msg2.hide();
                            getSession();
                        }else{
                            msg2.hide();
                            var objJSON=rsp.responseText.evalJSON();
                            if(objJSON.Res =='ok'){
                                Ext.Msg.alert("!!Alerta¡¡","El Cliente se ah Activado como Paciente con éxito.");
                                var nom=record.get('nombre').replace(/ /gi,"%");
                                var ap=record.get('apaterno').replace(/ /gi,"%");
                                var am=record.get('amaterno').replace(/ /gi,"%");
                                if(closeWnd==true){
                                    var wnd = Ext.getCmp('idWndDuplicados');
                                    wnd.close();
                                    var wnd2 = Ext.getCmp('idWndRegistro');
                                    wnd2.close();
                                }
                                getCnt(record.get('folio'),nom,ap,am,"Paciente");
                            }else if(objJSON.Res =='no'){
                                if(closeWnd==true){
                                    var wnd3 = Ext.getCmp('idWndDuplicados');
                                    wnd3.close();
                                    var wnd4 = Ext.getCmp('idWndRegistro');
                                    wnd4.close();
                                    Ext.getCmp("BotonNuevoCliente").enable();
                                }
                                getPanelProductos(record.get('folio'),{
                                    store:obj.getStore()
                                });
                                Ext.Msg.alert("!!Alerta¡¡","Debe Agregar o Activar minimo un producto al Paciente, para Reactivarlo.");
                            }
                        }
                    },
                    failure:function(rsp){
                        var array = eval("("+rsp.responseText+")");
                        msg2.hide();
                        obj.getStore().rejectChanges();
                        var mnsE=Ext.Msg.alert("","Hubo un error en el servidor");
                        if(array.sesion!=null){
                            mnsE.hide();
                            getSession();
                        }
                    }
                });
            }
            if(btn == 'cancel'){
                var grid=Ext.getCmp('gridBuscadorPaciente');
                var nombre=grid.getSelectionModel().getSelected().get('nombre')+" "+grid.getSelectionModel().getSelected().get('apaterno')+" "+grid.getSelectionModel().getSelected().get('amaterno');
                loadPerfilClientes(nombre,grid.getSelectionModel().getSelected().get('folio'),grid.getSelectionModel().getSelected().get('tipo_paciente'));

            }
        },
        animEl: 'mb4',
        icon: Ext.MessageBox.QUESTION
    });
}

function LoadGridBuscadorPaciente(idCnt){
    var grd = Ext.getCmp('gridBuscadorPaciente');
    var store = grd.getStore();
    store.load({
        params:{
            start:0,
            limit:20,
            bnd:1,
            'folio':idCnt
        }
    });
}

function BuscarPaciente(prm){
    var grd = Ext.getCmp('gridBuscadorPaciente');
    var store = grd.getStore();
    store.on('beforeload', function() {
        store.baseParams = prm;
    });
    store.load({
        params:{
            start:0,
            limit:20
        }
    });
}

function clickBtnLimpiar(){
    Ext.getCmp('idBPfolio').setValue("");
    Ext.getCmp('idBPNombre').setValue("");
    Ext.getCmp('idBPAp').setValue("");
    Ext.getCmp('idBPAm').setValue("");
    Ext.getCmp('idTel').setValue("");
    Ext.getCmp('idFechaN').setValue("");
    Ext.getCmp('idEstadoBus').setValue("");
    if(dobleBusqueda!=1){
        Ext.getCmp('idBMClave').setValue("");
        Ext.getCmp('idBMCedula').setValue("");
        Ext.getCmp('idBMNombre').setValue("");
        Ext.getCmp('idBMApP').setValue("");
        Ext.getCmp('idBMApM').setValue("");
        Ext.getCmp('idComboEstadoMedi').setValue("");
    }
}

function loadPerfilClientes(nombreCliente, idCliente,tipoCliente){
    
    Ext.Ajax.request({
        url : contexto+'/Usuario',
        params:{
            bnd:12,
            'idCnt':idCliente,
            'idAcc':2,
            'idTree':2,
            'evtTreeNde':"",
            'evtTreeLdl':"",
            'evtTreePnl':"",
            "contexto":contexto                
        },
        success:function(rsp){                                
            actCmpPxPr= eval("("+rsp.responseText+")");
            var wndPerfilPaciente = new Ext.Window({
                id:'idWindowSesionPaciente',
                layout:'fit',
                title:'Información Cliente Inactivo',
                height:600,
                width:1300,
                modal:true,
                items:[
                new com.punto.pen.PanelSesionPaciente({
                    'idContenedor':'idWindowSesionPaciente',
                    id:'pnlSesionPacienteLlamada',
                    'idCnt':idCliente,
                    nameCnt : nombreCliente,
                    TipoPac: tipoCliente,
                    'mostrarBack':true,
                    mostrarLoad:true
                })
                ],
                tools:[
                {
                    id:'close',
                    qtip: 'Cerrar',
                    handler: function(event, toolEl, panel){
                        mostrarLoad     = false;
                        wndPerfilPaciente.close();
                    }
                }
                ]
            });
            wndPerfilPaciente.show();
        },
        failure:function(rsp){
            Ext.MessageBox.alert('¡¡Alerta!!',"Problemas de conexión");
        }
    })
}