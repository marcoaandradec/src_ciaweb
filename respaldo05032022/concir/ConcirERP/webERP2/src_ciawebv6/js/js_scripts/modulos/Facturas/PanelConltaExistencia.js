Ext.ns('com.punto.pen');

var idClienteSesion;
var idAccion;
var idArbol;
var tol1;

com.punto.pen.RegresaIdC = function(){
    return idClienteSesion;
}
var viewGrup;

com.punto.pen.PanelConsultaExistencia = function(argumentos){
    var pnlId      = (argumentos.id==null ? "PanelFormConsExistencia" : argumentos.id);
    var pnlFrm     = 'frmBPac';
    var idMod      = (argumentos.idMod==null ? '0' : argumentos.idMod);
    var idAcc      = (argumentos.idAcc==null ? '' : argumentos.idAcc);
    var enviaFarma = (argumentos.enviaFarma==null ? '0' : argumentos.enviaFarma);
    idAccion = idAcc;
    var idTree = (argumentos.idTree==null ? '' : argumentos.idTree);
    idArbol = idTree;
    var punto = '';
    this.titulo = (argumentos.titulo==null ? 'Consulta de Existencias' : argumentos.titulo);
    /*** Componentes ***/
    var fm = Ext.form;
    //creando el repositorio de datos
    var storeConsExistencia = new Ext.data.GroupingStore({
        autoLoad: false,
        baseParams: {
            bnd:3
        },
        reader :new Ext.data.JsonReader( {
            totalProperty: 'total',
            root :'records',
            idProperty: 'id'
        },new com.punto.pen.RecordConsExistencia()),
        proxy :new Ext.data.HttpProxy( {
            url : contexto+'/Factura?bnd=3',
            timeout:180000
        }),
        listeners:{
            'loadexception':function(){
                storeConsExistencia.removeAll();
            },
            'update':function(st,rcd,op){
                if(op == Ext.data.Record.COMMIT){

                }else if(op == Ext.data.Record.REJECT){

            }
            }
        }
        ,
        sortInfo:{
            field: 'clvProducto',
            direction: "ASC"
        }//        ,groupField:'foliomedico'
    });

    var pbarBuscadorFactura = new Ext.PagingToolbar({
        id          : 'pgrid',
        width       : 500,
        pageSize    : 100,
        store       : storeConsExistencia,
        displayInfo : true,
        displayMsg  : 'Mostrando {0} - {1} Productos de {2}',
        emptyMsg    : "No hay datos para mostrar"
    });

    function clickBtnBusqExistncs(){
        var idProducts="";
        var idalmacen="";
        var param;
        if(Ext.getCmp('idAlmacen').getValue()==''){
            Ext.MessageBox.alert('Mensaje de Error', "Debe llenar al menos un campo para realizar la busqueda.");
        }else{
            if(Ext.getCmp('idProducts').getValue()!='')idProducts=Ext.getCmp('idProducts').getValue();
            if(Ext.getCmp('idAlmacen').getValue()!='')idalmacen=Ext.getCmp('idAlmacen').getValue();
            param=({
                'idProducts':"'"+idProducts+"'",
                'idAlmacen':"'"+idalmacen+"'",
                'busqueda':1
            });
            BuscarExitencias(param);
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
                        columnWidth:.80,
                        border:false,
                        bodyStyle:"padding: 5px;",
                        items:[
                        {
                            xtype:"fieldset",
                            id:"idPanelParametros",
                            title:"Parametros de Consulta",
                            region:"center",
                            autoHeight:true,
                            hidden:false,
                            items:[{
                                xtype:"panel",
                                layout:"column",
                                border:false,
                                bodyStyle:"padding: 5px",
                                buttonAlign:"center",
                                items:[{
                                    xtype:"panel",
                                    columnWidth:0.8,
                                    layout:"form",
                                    labelAlign:"top",
                                    border:false,
                                    //hidden:false,
                                    bodyStyle:"padding 5px;",
                                    items:[{
                                        xtype:"textfield",
                                        width:250,
                                        tabIndex:3,
                                        id:'idProducts',
                                        name:'nomProdcuts',
                                        fieldLabel:"Clave Producto",
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
                                                    clickBtnBusqExistncs();
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
                                        id:"idAlmacen",
                                        etiqueta:"Almacen",
                                        name:"TipoAlmacen",
                                        hiddenName  : 'hTipoAlmacen',
                                        width:250,
                                        tabIndex:166,
                                        emptyText :"Seleccione Almacen",
                                        allowBlank: false,
                                        prm:{
                                            campo:'idTAlmacen',
                                            idCampo:'tipAlmacen',
                                            bnd:5,
                                            qry:6,
                                            autoCarga:true
                                        },
                                        evt:{
                                            'select':function(cmb,rec,idx){
                                                clickBtnBusqExistncs();
                                            }
                                        },
                                        enableKeyEvents:true,
                                        listeners:{
                                            'keypress':
                                            function(txtField,e){
                                                if(e.keyCode==13){
                                                    clickBtnBusqExistncs();
                                                }
                                            }
                                        }
                                    }) ]
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
                    handler:clickBtnBusqExistncs,
                    iconCls:'icn-busquedaDos'
                },
                {
                    text:"Limpiar",
                    handler:clickBtnLimpiar,
                    iconCls:'icn-limpiarBusqueda'
                }
                ]
            }
            ]
        }
        ,{
            xtype:"fieldset",
            title:"Existencias",
            autoHeight:true,
            region          : 'center',
            height:450,
            id:"idfieldSetProductosEnvio",
            items:[{
                xtype           : "editorgrid",
                id              : "gridConsExistencia",
                title           : "Consulta de Existencias",
                region          : 'center',
                anchor          : "100%",
                columnWidth     : 0.7,
                store           : storeConsExistencia,
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
                bbar            : [pbarBuscadorFactura,'->',{
                    text  : '<u style="font-weight: bold; color:red;">Nota:</u> &nbsp;Para consultar la información de las Facturas de 2 clicks en la fila.',
                    style :'font-weight:bold;font-size:12;',
                    handleMouseEvents:false,
                    handler:null
                }],
                columns         : [new Ext.grid.RowNumberer(),
                {
                    header: "Elegir",
                    width: 25,
                    sortable: true,
                    align: 'center',
                    dataIndex: 'elegir'
                                   
                },
                {
                    id:'clvProducto',
                    header: "Clave Producto",
                    width: 55,
                    sortable: true,
                    //align: 'center',
                    dataIndex: 'clvProducto'
                },
                {
                    header: "Descripción",
                    width: 150,
                    sortable: true,
                    dataIndex: 'decripcion'
                },
                {
                    header: "Linea",
                    width: 25,
                    sortable: true,
                    align: 'center',
                    dataIndex: 'linea'
                },
                {
                    header: "Familia",
                    width: 25,
                    sortable: true,
                    align: 'center',
                    dataIndex: 'familia'
                },
                {
                    header: "Unidad Almacenado",
                    width: 50,
                    sortable: true,
                    align: 'center',
                    dataIndex: 'uniAlmacenado'
                },
                {
                    header: "Existencia Real",
                    width: 50,
                    sortable: true,
                    align: 'center',
                    dataIndex: 'existReal'
                },
                {
                    header: "Existencia Reservada",
                    width: 50,
                    sortable: true,
                    align: 'center',
                    dataIndex: 'existReservada'
                },{
                    header: "Existencia Disponible",
                    width: 50,
                    sortable: true,
                    align: 'center',
                    dataIndex: 'existDisponible'
                },{
                    header: "Almacen",
                    width: 50,
                    sortable: true,
                    align: 'center',
                    hideable: false,
                    hidden: true,
                    dataIndex: 'almacen'
                }],
                listeners: {
                    'rowdblclick':function(grid){
                        if(tol1!=null)tol1.hide();
                        tol1=new Ext.Tip({
                            html:'&nbsp;&nbsp;&nbsp;&nbsp;<b>Clave:</b>&nbsp;'+ grid.getSelectionModel().getSelected().get('clvProducto')
                            +'<br/>&nbsp;&nbsp;&nbsp;&nbsp;<b>Descripción:<b/>&nbsp;'+grid.getSelectionModel().getSelected().get('decripcion')
                            +'<br/>&nbsp;&nbsp;&nbsp;&nbsp;<b>Existencia Real:<b/>&nbsp;'+grid.getSelectionModel().getSelected().get('existReal')
                            +'&nbsp;&nbsp;&nbsp;&nbsp;<b>Existencia Reservada:<b/>&nbsp;'+grid.getSelectionModel().getSelected().get('existReservada')
                            +'&nbsp;&nbsp;&nbsp;&nbsp;<b>Existencia Disponible:<b/>&nbsp;'+grid.getSelectionModel().getSelected().get('existDisponible'),
                            title: '<u style="color:red;">Información Gral. Producto:</u>',
                            width:514,
                            autoHide: false,
                            closable: true,
                            draggable:true
                        });
                        tol1.showAt([35,105]);
                    }
                }
            }]
        }]
    });

    return this.pnlBuscadorPaciente;
}


function LoadGridBuscadorPaciente(idCnt){
    var grd = Ext.getCmp('gridConsExistencia');
    var store = grd.getStore();
    store.load({
        params:{
            start:0,
            limit:100,
            bnd:3,
            'folio':idCnt
        }
    });
}

function BuscarExitencias(prm){
    var grd = Ext.getCmp('gridConsExistencia');
    var store = grd.getStore();
    store.on('beforeload', function() {
        store.baseParams = prm;
    });
    store.load({
        params:{
            start:0,
            limit:100
        }
    });
}

function clickBtnLimpiar(){
    Ext.getCmp('idEmpresa').setValue("");
    Ext.getCmp('idAlmacen').setValue("");
}
