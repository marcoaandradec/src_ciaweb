Ext.ns('com.punto.pen');

var idClienteSesion;
var idAccion;
var idArbol;
var tol;

com.punto.pen.RegresaIdC = function(){
    return idClienteSesion;
}

function getCnt(idCnt,n,ap,am,t){
    actCmpPxPr="";

    var idGridPB=Ext.getCmp("gridBuscadorFactura");
    if(idGridPB != null){
        idGridPB.store.clearGrouping();
        idGridPB.doLayout();
    }

    
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
/*Ext.apply(Ext.form.VTypes, {
    daterange: function(val, field) {
        //var date = field.parseDate(val);
        var date = field.getValue();
        alert(field.getValue());
        if (!date) {
            return false;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            var start = Ext.getCmp(field.startDateField);
            start.setMaxValue(date);
            start.validate();
            this.dateRangeMax = date;
        }
        else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            var end = Ext.getCmp(field.endDateField);
            end.setMinValue(date);
            end.validate();
            this.dateRangeMin = date;
        }
        /*
             * Always return true since we're only using this vtype to set the
             * min/max allowed values (these are tested for after the vtype test)
             */
//        return true;
//    }
//});*/

var viewGrup;

com.punto.pen.PanelConsultaEstatus = function(argumentos){
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
    var storeBuscadorFactura = new Ext.data.GroupingStore({
        autoLoad: false,
        baseParams: {
            bnd:2
        },
        reader :new Ext.data.JsonReader( {
            totalProperty: 'total',
            root :'records',
            idProperty: 'id'
        },new com.punto.pen.RecordBuscadorFactura1()),
        proxy :new Ext.data.HttpProxy( {
            url : contexto+'/Factura?bnd=2',
            timeout:180000
        }),
        listeners:{
            'loadexception':function(){
                storeBuscadorFactura.removeAll();
            },
            'update':function(st,rcd,op){
                if(op == Ext.data.Record.COMMIT){

                }else if(op == Ext.data.Record.REJECT){

            }
            }
        }
        ,
        sortInfo:{
            field: 'factura',
            direction: "ASC"
        }//        ,groupField:'foliomedico'
    });

    var pbarBuscadorFactura = new Ext.PagingToolbar({
        id          : 'pgrid',
        width       : 500,
        pageSize    : 20,
        store       : storeBuscadorFactura,
        displayInfo : true,
        displayMsg  : 'Mostrando {0} - {1} Facturas de {2}',
        emptyMsg    : "No hay datos para mostrar"
    });

    function clickBtnBusqEstatus(){
        var date1="dd/mm/yyyy";
        var date2="dd/mm/yyyy";
        var tipoCli="";
        var estatus="";
        var IdStatus="";
        var param;
        if((Ext.getCmp('idFechaIni').getValue()=='')&&(Ext.getCmp('idFechaFin').getValue()=='')&&
            (Ext.getCmp('idEmpresa').getValue()=='')&&(Ext.getCmp('idTipoCliente').getValue()=='')&&
            (Ext.getCmp('idEstatus').getValue()=='')){
            Ext.MessageBox.show({
                title: 'Datos Incompletos',
                msg: 'Debe llenar al menos el rango de fecha para realizar la consulta.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
        }else{
            if(Ext.getCmp('idFechaIni').getValue()!='')date1=Ext.getCmp('idFechaIni').getValue().format('d/m/Y');
            if(Ext.getCmp('idFechaFin').getValue()!='')date2=Ext.getCmp('idFechaFin').getValue().format('d/m/Y');
            if(Ext.getCmp('idTipoCliente').getValue()!='')tipoCli=Ext.getCmp('idTipoCliente').getValue();            
            if(Ext.getCmp('idEstatus').getValue()!='') estatus=Ext.getCmp('idEstatus').getRawValue();
            IdStatus=Ext.getCmp('idEstatus').getValue();
            if(Ext.getCmp('idFechaIni').getValue()!=''&&Ext.getCmp('idFechaFin').getValue()!=''){
                param=({
                    'fechaIni':"'"+date1+"'",
                    'fechaFin':"'"+date2+"'",
                    'empresa':"'"+Ext.getCmp('idEmpresa').getValue()+"'",
                    'tipoCliente':"'"+tipoCli+"'",
                    'estatus':"'"+estatus+"'",
                    'idestatus':"'"+IdStatus+"'",
                    'busqueda':1
                });
                BuscarFacturas(param);
            }else{
                Ext.MessageBox.show({
                    title: 'Datos Incompletos',
                    msg: 'Debe completar el rango de fecha a consultar.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
            }
        }
    }

    this.pnlBuscadorPaciente = new Ext.Panel({
        id: pnlId,
        title:this.titulo,
        layout:"border",
        region:"center",
        autoScroll:true,
        height:5000,
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
                layout:"form",
                anchor:"100%",
                border:false,
                bodyStyle:"padding: 5px;",
                buttonAlign:"center",
                items:[{//herepanel
                    xtype:"panel",
                    id:'frmBPac45',
                    layout:"column",
                    anchor:"100%",
                    border:false,
                    bodyStyle:"padding: 5px;",
                    buttonAlign:"center",
                    items:[{//-->firts fieldset
                        xtype:"panel",
                        id:'idfieldParameters',
                        layout:"form",
                        anchor:"100%",
                        columnWidth:.50,
                        border:false,
                        bodyStyle:"padding: 5px;",
                        items:[
                        {
                            xtype:"fieldset",
                            id:"idPanelParametros",
                            title:"Parametros de la Consulta",
                            region:"center",
                            height:225,
                            hidden:false,
                            items:[{
                                xtype:"panel",
                                layout:"column",
                                border:false,
                                bodyStyle:"padding: 5px",
                                buttonAlign:"center",
                                items:[{
                                    xtype:"panel",
                                    columnWidth:0.3,
                                    layout:"form",
                                    labelAlign:"top",
                                    border:false,
                                    bodyStyle:"padding 5px;",
                                    items:[{
                                        xtype:"datefield",
                                        fieldLabel:"De",
                                        id:'idFechaIni',
                                        name:"FechaIni",
                                        emptyText:'dd/mm/yyyy',
                                        //                                        vtype: 'daterange',
                                        //                                        endDateField: 'endDateEdit' ,
                                        tabIndex:165,
                                        width:100,
                                        autoCreate:{
                                            tag:"input",
                                            maxlength:10
                                        },
                                        enableKeyEvents:true,
                                        listeners:{
                                            'keypress':
                                            function(txtField,e){
                                                if(e.keyCode==13){
                                                    clickBtnBusqEstatus();
                                                    var mes="";
                                                    var anio="";
                                                    var dayFin="";
                                                    mes=Ext.getCmp('idFechaIni').getValue().format('m');
                                                    anio=Ext.getCmp('idFechaIni').getValue().format('Y');
                                                    dayFin=getDiaMes(mes.replace("0",""),anio);
                                                    Ext.getCmp('idFechaFin').setMaxValue(dayFin+"/"+mes+"/"+anio);
                                                }
                                                if((e.getKey()>=47 && e.getKey()<=57)|| e.getKey()==9 || e.getKey()==8){}else{
                                                    e.stopEvent();
                                                }
                                            },
                                            'select':function(txtField,e){
                                                var mes="";
                                                var anio="";
                                                var dayFin="";
                                                mes=Ext.getCmp('idFechaIni').getValue().format('m');
                                                anio=Ext.getCmp('idFechaIni').getValue().format('Y');
                                                dayFin=getDiaMes(mes.replace("0",""),anio);
                                                Ext.getCmp('idFechaFin').setMaxValue(dayFin+"/"+mes+"/"+anio);
                                                Ext.getCmp('idFechaFin').setMinValue("01/"+mes+"/"+anio);
                                                Ext.getCmp('idFechaFin').setValue("01/"+mes+"/"+anio);
                                            }
                                        }
                                    }]
                                },{
                                    xtype:"panel",
                                    columnWidth:0.3,
                                    layout:"form",
                                    labelAlign:"top",
                                    border:false,
                                    bodyStyle:"padding 5px;",
                                    items:[{
                                        xtype:"datefield",
                                        fieldLabel:"Al",
                                        id:'idFechaFin',
                                        name:"FechaFin",
                                        emptyText:'dd/mm/yyyy',
                                        tabIndex:165,
                                        //                                        vtype: 'daterange',
                                        //                                        startDateField: 'startDateEdit',
                                        width:100,
                                        autoCreate:{
                                            tag:"input",
                                            maxlength:10
                                        },
                                        enableKeyEvents:true,
                                        listeners:{
                                            'keypress':
                                            function(txtField,e){
                                                if(e.keyCode==13){
                                                    clickBtnBusqEstatus();
                                                }
                                                if((e.getKey()>=47 && e.getKey()<=57)|| e.getKey()==9 || e.getKey()==8){}
                                                else{
                                                    e.stopEvent();
                                                }
                                            }
                                        }
                                    }]
                                },
                                {
                                    xtype:"panel",
                                    columnWidth:0.8,
                                    layout:"form",
                                    labelAlign:"top",
                                    border:false,
                                    hidden:true,
                                    bodyStyle:"padding 5px;",
                                    items:[{
                                        xtype:"textfield",
                                        width:200,
                                        tabIndex:3,
                                        id:'idEmpresa',
                                        name:'empresa',
                                        fieldLabel:"A la Empresa",
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
                                                    clickBtnBusqEstatus();
                                                }
                                            }
                                        }
                                    }]
                                },{
                                    xtype:"panel",
                                    columnWidth:0.8,
                                    layout:"form",
                                    labelAlign:"top",
                                    border:false,
                                    bodyStyle:"padding 5px",
                                    items:[
                                    new com.punto.pen.ComboBox({
                                        id:"idTipoCliente",
                                        etiqueta:"Tipo de Cliente",
                                        name:"TipoCliente",
                                        hiddenName  : 'TipoCliente',
                                        width:180,
                                        tabIndex:166,
                                        emptyText : "Todos Tipos Clientes",
                                        prm:{
                                            campo:'idTCliente',
                                            idCampo:'tipCliente',
                                            bnd:5,
                                            qry:5,
                                            autoCarga:true
                                        },
                                        evt:{
                                            'select':function(cmb,rec,idx){
                                                clickBtnBusqEstatus();
                                            }
                                        },
                                        enableKeyEvents:true,
                                        listeners:{
                                            'keypress':
                                            function(txtField,e){
                                                if(e.keyCode==13){
                                                    clickBtnBusqEstatus();
                                                }
                                            }
                                        }
                                    }) ]
                                },{
                                    xtype:"panel",
                                    columnWidth:0.8,
                                    layout:"form",
                                    labelAlign:"top",
                                    border:false,
                                    bodyStyle:"padding 5px",
                                    items:[
                                    new com.punto.pen.ComboBox({
                                        id:"idEstatus",
                                        etiqueta:"Estatus",
                                        name:"Estatus",
                                        width:180,
                                        tabIndex:166,
                                        emptyText : "Todos los Estatus",
                                        prm:{
                                            campo:'estus',
                                            idCampo:'idEstus',
                                            bnd:5,
                                            qry:7,
                                            autoCarga:true
                                        },
                                        evt:{
                                            'select':function(cmb,rec,idx){
                                                clickBtnBusqEstatus();
                                            }                                          
                                        },
                                        enableKeyEvents:true,
                                        listeners:{
                                            'keypress':
                                            function(txtField,e){
                                                if(e.keyCode==13){
                                                    clickBtnBusqEstatus();
                                                }
                                            }
                                        }
                                    }) ]
                                }]
                            }]
                        } ]
                    } ,
{//-->second fieldset
                        xtype:"panel",
                        id:'idPanelMedB2',
                        layout:"form",
                        anchor:"100%",
                        columnWidth:.50,
                        border:false,
                        bodyStyle:"padding: 5px;",
                        items:[
                        {
                            xtype:"fieldset",
                            id:"idPanelQueryMedico",
                            title:"Variables",
                            anchor:"100%",
                            region:"center",
                            height:225,
                            hidden:true,
                            items:[{
                                xtype:"panel",
                                layout:"column",
                                anchor:"100%",
                                border:false,
                                bodyStyle:"padding: 5px",
                                buttonAlign:"center",
                                items:[{
                                    xtype:"panel",
                                    columnWidth:0.3,
                                    layout:"form",
                                    labelAlign:"top",
                                    border:false,
                                    bodyStyle:"padding 5px;",
                                    items:[{
                                        xtype:"numberfield",
                                        width:110,
                                        tabIndex:1,
                                        id:'idXsurtir',
                                        name:'Xsurtir',
                                        fieldLabel:"Por Surtir",
                                        readOnly:true
                                    }]
                                },{
                                    xtype:"panel",
                                    columnWidth:0.3,
                                    layout:"form",
                                    labelAlign:"top",
                                    border:false,
                                    bodyStyle:"padding 5px;",
                                    items:[{
                                        xtype:"textfield",
                                        width:110,
                                        tabIndex:2,
                                        id:'idEnSurtido',
                                        name:'EnSurtido',
                                        fieldLabel:"En Surtido",
                                        readOnly:true                                        
                                    }]
                                },
                                {
                                    xtype:"panel",
                                    columnWidth:0.3,
                                    layout:"form",
                                    labelAlign:"top",
                                    border:false,
                                    bodyStyle:"padding 5px;",
                                    items:[{
                                        xtype:"textfield",
                                        width:110,
                                        tabIndex:3,
                                        id:'idXEmbarcar',
                                        name:'XEmbarcar',
                                        fieldLabel:"Por embarcar",
                                        readOnly:true,
                                        style:'text-transform: uppercase;'                                       
                                    }]
                                },{
                                    xtype:"panel",
                                    columnWidth:0.3,
                                    layout:"form",
                                    labelAlign:"top",
                                    border:false,
                                    bodyStyle:"padding 5px;",
                                    items:[{
                                        xtype:"textfield",
                                        width:110,
                                        id:'idTransito',
                                        name:'Transito',
                                        tabIndex:4,
                                        readOnly:true,
                                        fieldLabel:"En Transito",
                                        style:'text-transform: uppercase;'                                                                                
                                    }]
                                },{
                                    xtype:"panel",
                                    columnWidth:0.3,
                                    layout:"form",
                                    labelAlign:"top",
                                    border:false,
                                    bodyStyle:"padding 5px;",
                                    items:[{
                                        xtype:"textfield",
                                        width:110,
                                        id:'idEntregadas',
                                        name:'Entregadas',
                                        readOnly:true,
                                        fieldLabel:"Entregadas",
                                        tabIndex:5,
                                        style:'text-transform: uppercase;'                                                                                
                                    }]
                                },{
                                    xtype:"panel",
                                    columnWidth:0.3,
                                    layout:"form",
                                    labelAlign:"top",
                                    border:false,
                                    bodyStyle:"padding 5px;",
                                    items:[{
                                        xtype:"numberfield",
                                        width:110,
                                        tabIndex:1,
                                        id:'idParcial',
                                        name:'nomParcial',
                                        fieldLabel:"Entre Pacial",
                                        enableKeyEvents:true,
                                        readOnly:true
                                    }]
                                },{
                                    xtype:"panel",
                                    columnWidth:0.3,
                                    layout:"form",
                                    labelAlign:"top",
                                    border:false,
                                    bodyStyle:"padding 5px;",
                                    items:[{
                                        xtype:"numberfield",
                                        width:110,
                                        tabIndex:1,
                                        id:'idRechazoTot',
                                        name:'RechazoTot',
                                        fieldLabel:"Rechazo Total",
                                        enableKeyEvents:true,
                                        readOnly:true
                                    }]
                                },{
                                    xtype:"panel",
                                    columnWidth:0.3,
                                    layout:"form",
                                    labelAlign:"top",
                                    border:false,
                                    bodyStyle:"padding 5px;",
                                    items:[{
                                        xtype:"numberfield",
                                        width:110,
                                        tabIndex:1,
                                        id:'idTotal',
                                        name:'nomTotal',
                                        fieldLabel:"Total",
                                        readOnly:true
                                    }]
                                }]
                            }]
                        } ]
                    }
                    ]
                }//--here
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
                    handler:clickBtnBusqEstatus,
                    iconCls:'icn-busquedaDos'
                },
                {
                    text:"Limpiar",
                    handler:clickBtnLimpiarParts,
                    iconCls:'icn-limpiarBusqueda'
                }
                ]
            }
            ]
        }
        ,{
            xtype:"fieldset",
            title:"Facturas",
            autoHeight:true,
            region          : 'center',
            height:450,
            id:"idfieldSetProductosEnvio",
            items:[{
                xtype           : "editorgrid",
                id              : "gridBuscadorFactura",
                title           : "Facturas Encontrados",
                region          : 'center',
                anchor          : "100%",
                columnWidth     : 0.7,
                store           : storeBuscadorFactura,
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
                height:450,
                bbar            : ['','->',{
                    text  : '<u style="font-weight: bold; color:red;">Nota:</u> &nbsp;Para consultar la información de las Facturas de 2 clicks en la fila.',
                    style :'font-weight:bold;font-size:12;',
                    handleMouseEvents:false,
                    handler:null
                }],
                columns         : [new Ext.grid.RowNumberer(),
                {
                    header: "Elegir",
                    width: 50,
                    sortable: true,
                    align: 'center',
                    dataIndex: 'elegir'
                },
                {
                    header: "Estatus",
                    width: 65,
                    sortable: true,
                    align: 'center',
                    dataIndex: 'estatus'
                },
                {
                    id:'factura',
                    header: "Factura",
                    width: 50,
                    sortable: true,
                    align: 'center',
                    dataIndex: 'factura'
                },
                {
                    header: "Referencia",
                    width: 50,
                    sortable: true,
                    align: 'center',
                    dataIndex: 'referencia'
                },
                {
                    header: "Envio",
                    width: 50,
                    sortable: true,
                    align: 'center',
                    dataIndex: 'envio'
                },
                {
                    header: "No. Cliente",
                    width: 65,
                    sortable: true,
                    align: 'center',
                    dataIndex: 'numCliente'
                },
                {
                    header: "Cliente",
                    width: 65,
                    sortable: true,
                    dataIndex: 'nombCliente'
                },
                {
                    header: "Destino",
                    width: 90,
                    sortable: true,
                    dataIndex: 'destino'
                },
                {
                    header: "No. Cajas",
                    width: 60,
                    sortable: true,
                    align: 'center',
                    dataIndex: 'numCajas'
                },

                {
                    header: "Importe",
                    width: 60,
                    sortable: true,
                    align: 'center',
                    dataIndex: 'importe'
                },
                {
                    header: "Fecha Factura",
                    width: 80,
                    sortable: true,
                    align: 'center',
                    dataIndex: 'fechFactura'
                },
                {
                    header: "Fecha Ingreso",
                    width: 80,
                    sortable: true,
                    align: 'center',
                    dataIndex: 'fechIngreso'
                },

                {
                    header: "Cita",
                    width: 80,
                    sortable: true,
                    align: 'center',
                    dataIndex: 'cita'
                },
                {
                    header: "Fecha Embarque",
                    width: 80,
                    sortable: true,
                    align: 'center',
                    dataIndex: 'fechEmbarq'
                },
                {
                    header: "Fecha Entrega",
                    width: 80,
                    sortable: true,
                    align: 'center',
                    dataIndex: 'fechEntreg'
                },
                {
                    header: "Comentarios",
                    width: 100,
                    sortable: true,
                    dataIndex: 'comentarios'
                }],
                listeners: {
                    'rowdblclick':function(grid){
                        if(tol!=null)tol.hide();
                        tol=new Ext.Tip({
                            html: '<b>&nbsp;&nbsp;&nbsp;&nbsp;No. Factura:&nbsp;</b>'+grid.getSelectionModel().getSelected().get('factura')
                            +'<br/><b>&nbsp;&nbsp;&nbsp;&nbsp;Estatus:&nbsp;<b/>'+grid.getSelectionModel().getSelected().get('estatus')
                            +'<br/><b>&nbsp;&nbsp;&nbsp;&nbsp;Fecha Embarque:&nbsp;<b/>'+grid.getSelectionModel().getSelected().get('fechEmbarq')
                            +'<br/><b>&nbsp;&nbsp;&nbsp;&nbsp;Fecha Factura:&nbsp;<b/>'+grid.getSelectionModel().getSelected().get('fechFactura')
                            +'<br/><b>&nbsp;&nbsp;&nbsp;&nbsp;Numero Cajas:&nbsp;<b/>'+grid.getSelectionModel().getSelected().get('numCajas')
                            +'<br/><b>&nbsp;&nbsp;&nbsp;&nbsp;Comentarios:&nbsp;<b/>'+grid.getSelectionModel().getSelected().get('comentarios'),
                            title: '<u style="color:red;">Información Gral. Factura:</u> ',
                            width:514,
                            autoHide: false,
                            closable: true,
                            draggable:true
                        });
                        tol.showAt([35,105]);
                    }
                }
            }]
        }]
    });

    return this.pnlBuscadorPaciente;
}


function LoadGridBuscadorPaciente(idCnt){
    var grd = Ext.getCmp('gridBuscadorFactura');
    var store = grd.getStore();
    store.load({
        params:{
            start:0,
            limit:20,
            bnd:2,
            'folio':idCnt
        }
    });
}

function BuscarFacturas(prm){
    var grd = Ext.getCmp('gridBuscadorFactura');
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

function clickBtnLimpiarParts(){
    Ext.getCmp('idFechaIni').setValue("");
    Ext.getCmp('idFechaFin').setValue("");
    Ext.getCmp('idEmpresa').setValue("");
    Ext.getCmp('idTipoCliente').setValue("");
    //variables
    Ext.getCmp('idXsurtir').setValue("");
    Ext.getCmp('idEstatus').setValue("");
    Ext.getCmp('idEnSurtido').setValue("");
    Ext.getCmp('idXEmbarcar').setValue("");
    Ext.getCmp('idTransito').setValue("");
    Ext.getCmp('idEntregadas').setValue("");
    Ext.getCmp('idParcial').setValue("");
    Ext.getCmp('idRechazoTot').setValue("");
    Ext.getCmp('idTotal').setValue("");
}

function getDiaMes(mes,anio){
    var dias="";
    var ultimo=0;
    var fecha="";
    var vermes="";
    dias=[0,31,29,31,30,31,30,31,31,30,31,30,31];
    //    alert("mes "+mes);
    //    alert("anio "+anio);
    if (mes==2){
        fecha=new Date(anio,1,29)
        var f1=fecha.getMonth();
        vermes=(f1+1);
        //        alert("vermes "+vermes);
        if(vermes!=mes){
            ultimo=28;
        }
    }
    if(ultimo==0){
        ultimo=dias[mes];
    }
    //    alert("ese mes tiene "+ultimo+" días.");
    return ultimo;
}
/*function loadPerfilClientes(nombreCliente, idCliente,tipoCliente){

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
}*/