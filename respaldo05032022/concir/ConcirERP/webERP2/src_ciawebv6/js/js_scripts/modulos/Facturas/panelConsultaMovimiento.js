/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns('com.punto.pen');
var tolMov;
com.punto.pen.PanelConsultaMovim = function(argumentos){
    var idPnl = (argumentos.id==null ? '' : argumentos.id);
    var url = (argumentos.url==null ? '' : argumentos.url);
    this.autoAlto = (this.height==0 ? true : false);
    this.autoScroll = (argumentos.autoScroll==null ? false : argumentos.autoScroll);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    var idFact = (argumentos.idFact==null ? '1' : argumentos.idFact);
    var produc = (argumentos.produc==null ? '' : argumentos.produc);
    var idAlmc = (argumentos.idAlmc==null ? '' : argumentos.idAlmc);
    var descAlm = (argumentos.descAlm==null ? '' : argumentos.descAlm);
    var saldo="";
    var dia="";
    var mes="";
    var anio="";
    var d = new Date();
    var fecha="";
    var fecha1="";
    dia=d.getDate();
    mes=(d.getMonth()+1);
    anio=d.getFullYear();
    fecha="01/"+(mes<10?"0"+mes:mes)+"/"+anio;
    fecha1="02/"+(mes<10?"0"+mes:mes)+"/"+anio;
    Ext.Ajax.request({
        url : contexto+'/FacturaMovimiento',
        params:{
            bnd:1,
            produc:"'"+produc+"'",
            idAlmc:idAlmc,
            fecha:fecha
        },
        success:function(rsp){
            var json = eval("("+rsp.responseText+")");
            saldo=json.data.saldo;
            Ext.getCmp("idSaldo").setValue("");
            Ext.getCmp("idSaldo").setValue(saldo);
            Ext.getCmp('idTipAlmcen').setValue(idAlmc);
        },
        failure:function(rsp){
        }
    });
    var record = Ext.data.Record.create([
    {
        name: 'elegir',
        type:'string'
    },
    {
        name: 'fechaFact',
        type: 'string'
    },
    {
        name: 'remision',
        type: 'string'
    },
    {
        name: 'ubicacion',
        type: 'string'
    },{
        name: 'referencia',
        type: 'string'
    },{
        name: 'concepto',
        type: 'string'
    },{
        name: 'cantidad',
        type: 'string'
    },{
        name: 'saldo',
        type: 'string'
    }
    ]);

    var storeConstMovim = new Ext.data.Store({
        autoLoad: true, //true para q carge al inicio de session, false no haga nada
        baseParams: {
            'bnd':2,
            'idAlmacen':idAlmc,
            'idProduct':"'"+produc+"'",
            'FechIni':fecha,
            'FechFin':fecha1
        },
        reader :new Ext.data.JsonReader({
            totalProperty: 'total',
            root :'records',
            idProperty: 'id'
        },record),
        proxy :new Ext.data.HttpProxy({
            url :contexto+'/FacturaMovimiento?bnd=2', //contexto+'/BitacoraTransaccion'
            timeout:180000
        }),
        listeners:{
            'loadexception':function(){
                storeConstMovim.removeAll();
            }
        }/* ,
       sortInfo:{
            field: 'remision',
            direction: "ASC"
        }*/
    });
    function clickBtnBuscarMov(){
        var date1="dd/mm/yyyy";
        var date2="dd/mm/yyyy";
        var idAlmacen="";
        var idProdtcs="";
        var param;
        if((Ext.getCmp('idFechaIni').getValue()=='')&&(Ext.getCmp('idFechaFin').getValue()=='')){
            Ext.MessageBox.show({
                title: 'Datos Incompletos',
                msg: 'Debe llenar al menos el rango de fecha para realizar la consulta.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
        }else{
            if(Ext.getCmp('idFechaIni').getValue()!='')date1=Ext.getCmp('idFechaIni').getValue().format('d/m/Y');
            if(Ext.getCmp('idFechaFin').getValue()!='')date2=Ext.getCmp('idFechaFin').getValue().format('d/m/Y');
            if(Ext.getCmp('idTipAlmcen').getValue()!='')idAlmacen=Ext.getCmp('idTipAlmcen').getValue();
            if(Ext.getCmp('idHidenProducto').getValue()!='')idProdtcs=Ext.getCmp('idHidenProducto').getValue();
            param=({
                'bnd':2,
                'idAlmacen':idAlmacen,
                'idProduct':"'"+idProdtcs+"'",
                'FechIni':"'"+date1+"'",
                'FechFin':"'"+date2+"'"
            });
            BuscarMovimientos(param);
        }
    }
    function getPanelProduct(){
        return (new com.punto.pen.PnlBusProducto());
    }
    var pbarBuscadorMovimtos = new Ext.PagingToolbar({
        id          : 'pgrid1',
        width       : 450,
        pageSize    : 200,
        store       : storeConstMovim,
        displayInfo : true,
        displayMsg  : 'Mostrando {0} - {1} Movimientos de {2}',
        emptyMsg    : "No hay datos para mostrar"
    });
    var PanelMovimiento=  new Ext.Panel({
        id:'idPanelFacturaMov',
        labelAlign:"top",
        xtype:"panel",
        layout:"form",
        border:false,
        items:[{
            xtype:"panel",
            layout:"column",
            border:false,
            bodyStyle:"padding: 5px",
            buttonAlign:"center",
            items:[{
                html:"",
                Height:20,
                border:false
            },{
                xtype:"panel",
                columnWidth:0.6,
                layout:"form",
                labelAlign:"top",
                border:false,
                //hidden:false,
                bodyStyle:"padding 5px;",
                items:[new com.punto.pen.ComboBox({
                    id:"idTipAlmcen",
                    etiqueta:"Almacen",
                    name:"TpoAlmcen",
                    width:250,
                    tabIndex:166,
                    emptyText :"Seleccione Almacen",
                    allowBlank: false,
                    triggerAction: 'all',
                    valueField:'idAlmcen',
                    prm:{
                        idCampo:'idAlmcen',
                        campo:'tipoAlmcen',
                        bnd:5,
                        qry:6,
                        autoCarga:true
                    },
                    evt:{
                        'select':function(cmb,rec,idx){
                            var fechaIni="dd/mm/yyyy";
                            var idAlmacen="";
                            var idProduct="";
                            idAlmacen=Ext.getCmp('idTipAlmcen').getValue();
                            fechaIni=Ext.getCmp('idFechaIni').getValue().format('d/m/Y');
                            idProduct=Ext.getCmp('idHidenProducto').getValue();
                            Ext.Ajax.request({
                                url : contexto+'/FacturaMovimiento',
                                params:{
                                    bnd:1,
                                    produc:"'"+idProduct+"'",
                                    idAlmc:idAlmacen,
                                    fecha:"'"+fechaIni+"'"
                                },
                                success:function(rsp){
                                    var json = eval("("+rsp.responseText+")");
                                    saldo=json.data.saldo;
                                    Ext.getCmp("idSaldo").setValue("");
                                    Ext.getCmp("idSaldo").setValue(saldo);
                                },
                                failure:function(rsp){
                                }
                            });
                            clickBtnBuscarMov();
                        }
                    },
                    enableKeyEvents:true,
                    listeners:{
                        'keypress':
                        function(txtField,e){
                            if(e.keyCode==13){
                                var fechaIni="dd/mm/yyyy";
                                var idAlmacen="";
                                var idProduct="";
                                idAlmacen=Ext.getCmp('idTipAlmcen').getValue();
                                fechaIni=Ext.getCmp('idFechaIni').getValue().format('d/m/Y');
                                idProduct=Ext.getCmp('idHidenProducto').getValue();
                                Ext.Ajax.request({
                                    url : contexto+'/FacturaMovimiento',
                                    params:{
                                        bnd:1,
                                        produc:"'"+idProduct+"'",
                                        idAlmc:idAlmacen,
                                        fecha:"'"+fechaIni+"'"
                                    },
                                    success:function(rsp){
                                        var json = eval("("+rsp.responseText+")");
                                        saldo=json.data.saldo;
                                        Ext.getCmp("idSaldo").setValue("");
                                        Ext.getCmp("idSaldo").setValue(saldo);
                                    },
                                    failure:function(rsp){
                                    }
                                });
                                clickBtnBuscarMov();
                            }
                        }
                    }
                })]
            },{
                xtype:"panel",
                columnWidth:0.3,
                layout:"form",
                labelAlign:"top",
                border:false,
                bodyStyle:"padding 5px;",
                items:[{
                    xtype:"datefield",
                    fieldLabel:"De la Fecha",
                    id:'idFechaIni',
                    name:"FechaIni",
                    emptyText:'dd/mm/yyyy',
                    tabIndex:165,
                    value:fecha,
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
                                var fechaIni="dd/mm/yyyy";
                                var idAlmacen="";
                                var idProduct="";
                                idAlmacen=Ext.getCmp('idTipAlmcen').getValue();
                                fechaIni=Ext.getCmp('idFechaIni').getValue().format('d/m/Y');
                                idProduct=Ext.getCmp('idHidenProducto').getValue();
                                Ext.Ajax.request({
                                    url : contexto+'/FacturaMovimiento',
                                    params:{
                                        bnd:1,
                                        produc:"'"+idProduct+"'",
                                        idAlmc:idAlmacen,
                                        fecha:"'"+fechaIni+"'"
                                    },
                                    success:function(rsp){
                                        var json = eval("("+rsp.responseText+")");
                                        saldo=json.data.saldo;
                                        Ext.getCmp("idSaldo").setValue("");
                                        Ext.getCmp("idSaldo").setValue(saldo);
                                    },
                                    failure:function(rsp){
                                    }
                                });
                                clickBtnBuscarMov();
                            }
                            if((e.getKey()>=47 && e.getKey()<=57)|| e.getKey()==9 || e.getKey()==8){}else{
                                e.stopEvent();
                            }
                        },
                        select:function(txtField,e)
                        {
                            var fechaIni="dd/mm/yyyy";
                            var idAlmacen="";
                            var idProduct="";
                            idAlmacen=Ext.getCmp('idTipAlmcen').getValue();
                            fechaIni=Ext.getCmp('idFechaIni').getValue().format('d/m/Y');
                            idProduct=Ext.getCmp('idHidenProducto').getValue();
                            Ext.Ajax.request({
                                url : contexto+'/FacturaMovimiento',
                                params:{
                                    bnd:1,
                                    produc:"'"+idProduct+"'",
                                    idAlmc:idAlmacen,
                                    fecha:"'"+fechaIni+"'"
                                },
                                success:function(rsp){
                                    var json = eval("("+rsp.responseText+")");
                                    saldo=json.data.saldo;
                                    Ext.getCmp("idSaldo").setValue("");
                                    Ext.getCmp("idSaldo").setValue(saldo);
                                },
                                failure:function(rsp){
                                }
                            });
                            clickBtnBuscarMov();
                        }

                    }
                }]
            },{
                xtype:"panel",
                columnWidth:0.4,
                layout:"form",
                labelAlign:"top",
                border:false,
                //hidden:false,
                bodyStyle:"padding 5px;",
                items:[{
                    xtype:"hidden",
                    name:"hidenProducto",
                    id:"idHidenProducto",
                    value:produc
                },{
                    xtype:"textfield",
                    width:250,
                    tabIndex:2,
                    id:'idProducto',
                    name:'producto',
                    fieldLabel:"Producto",
                    enableKeyEvents:true,
                    style:'text-transform: uppercase;',
                    value:produc+" "+descAlm,
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
                                clickBtnBuscarMov();
                            }
                        }
                    }
                }]
            },{
                xtype:"panel",
                columnWidth:0.2,
                layout:"form",
                labelAlign:"center",
                border:false,
                //hidden:false,
                bodyStyle:"padding 5px;",
                items:[{
                    html:'<br>',
                    border:false
                },{
                    xtype:"button",
                    id:'idBtnAsignarProducto',
                    text:"Buscar Producto",
                    iconCls:'icn-busquedaDos',
                    tabIndex:3,
                    handler:function(){
                        var wndBusProduct = new Ext.Window({
                            title:"Busqueda de Producto",
                            id:"idWndBsProdct",
                            width:600,
                            height:400,
                            constrainHeader :true,
                            constrain :true,
                            resizable : true,
                            modal:true,
                            border:false,
                            autoScroll:false,
                            layout:'fit',
                            items:[getPanelProduct()],
                            buttons:[
                            {
                                text:'Aceptar',
                                handler:function(){
                                    var grd = Ext.getCmp('gridBuscadorProduct');
                                    var record = grd.getSelectionModel().getSelected();
                                    if(record!=null){
                                        var cvProdct="";
                                        var Descprodct="";
                                        cvProdct=grd.getSelectionModel().getSelected().get('cvProducto');
                                        Descprodct=grd.getSelectionModel().getSelected().get('descripcion');
                                        Ext.getCmp("idProducto").setValue("");
                                        Ext.getCmp("idHidenProducto").setValue("");
                                        Ext.getCmp("idProducto").setValue(cvProdct+" "+Descprodct);
                                        Ext.getCmp("idHidenProducto").setValue(cvProdct);
                                        wndBusProduct.close();
                                        var fechaIni="dd/mm/yyyy";
                                        var idAlmacen="";
                                        var idProduct="";
                                        idAlmacen=Ext.getCmp('idTipAlmcen').getValue();
                                        fechaIni=Ext.getCmp('idFechaIni').getValue().format('d/m/Y');
                                        idProduct=Ext.getCmp('idHidenProducto').getValue();
                                        Ext.Ajax.request({
                                            url : contexto+'/FacturaMovimiento',
                                            params:{
                                                bnd:1,
                                                produc:"'"+idProduct+"'",
                                                idAlmc:idAlmacen,
                                                fecha:"'"+fechaIni+"'"
                                            },
                                            success:function(rsp){
                                                var json = eval("("+rsp.responseText+")");
                                                saldo=json.data.saldo;
                                                Ext.getCmp("idSaldo").setValue("");
                                                Ext.getCmp("idSaldo").setValue(saldo);
                                            },
                                            failure:function(rsp){
                                            }
                                        });
                                        clickBtnBuscarMov();
                                    }else{
                                        Ext.MessageBox.alert('Mensaje de Error', "Debe seleccionar un Campo.");
                                    }
                                }
                            },
                            {
                                text:'Cancelar',
                                handler:function(){
                                    wndBusProduct.close();
                                }
                            }
                            ]
                        });
                        wndBusProduct.show();
                    }
                }]
            },{
                xtype:"panel",
                columnWidth:0.2,
                layout:"form",
                labelAlign:"top",
                border:false,
                bodyStyle:"padding 5px;",
                items:[{
                    xtype:"datefield",
                    fieldLabel:"Al la Fecha",
                    id:'idFechaFin',
                    name:"FechaFin",
                    emptyText:'dd/mm/yyyy',
                    tabIndex:165,
                    width:100,
                    value:fecha1,
                    autoCreate:{
                        tag:"input",
                        maxlength:10
                    },
                    enableKeyEvents:true,
                    listeners:{
                        'keypress':
                        function(txtField,e){
                            if(e.keyCode==13){
                                clickBtnBuscarMov();
                            }
                            if((e.getKey()>=47 && e.getKey()<=57)|| e.getKey()==9 || e.getKey()==8){}else{
                                e.stopEvent();
                            }
                        },
                        select:function(txtField,e)
                        {
                            clickBtnBuscarMov();
                        }
                    }
                }]
            },{
                xtype:"panel",
                columnWidth:0.2,
                layout:"form",
                labelAlign:"top",
                border:false,
                //hidden:false,
                bodyStyle:"padding 5px;",
                items:[{
                    xtype:"textfield",
                    width:55,
                    tabIndex:2,
                    id:'idSaldo',
                    name:'saldo',
                    fieldLabel:"Saldo Inicial",
                    readOnly:true,
                    enableKeyEvents:true,
                    value:saldo,
                    style:'text-transform: uppercase;'
                }]
            }
            ]
        }, new Ext.grid.GridPanel({
            id              : 'idGridMovimentos',
            region          : this.region,
            anchor          : this.anchor,
            columnWidth     : this.columnWidth,
            height          : 260,
            //autoHeight :true,
            border:false,
            store           : storeConstMovim,
            stripeRows      : true,
            sm              : new Ext.grid.RowSelectionModel({
                singleSelect:true
            }),
            loadMask        : true,
            viewConfig      : {
                autoFill: true,
                forceFit: true
            },
            /* view: new Ext.grid.GroupingView({
                    forceFit:true,
                    startCollapsed:false,
                    groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Relacionados" : "Relacionado"]})'
                }),*/
            enableHdMenu    : true,
            autoScroll      : true,
            frame           : false,
            bbar            : [pbarBuscadorMovimtos,'->',{
                text  : '<u style="font-weight: bold; color:red;">Nota:</u> &nbsp;Para consultar la información de las Movimientos de 2 clicks en la fila.',
                style :'font-weight:bold;font-size:12;',
                handleMouseEvents:false,
                handler:null
            }],
            columns         : [
            new Ext.grid.RowNumberer(),
            {
                header: "Elegir",
                align: 'center',
                width: 75,
                sortable: true,
                dataIndex: 'elegir'
            },
            {
                header: "Fecha",
                align: 'center',
                width: 75,
                sortable: true,
                dataIndex: 'fechaFact'
            },
            {
                id:'remision',
                header: "Remisión",
                align: 'center',
                width: 75,
                sortable: true,
                dataIndex: 'remision'
            },
            {
                header: "Ubicación",
                align: 'center',
                width: 75,
                sortable: true,
                dataIndex: 'ubicacion'
            },
            {
                header: "Referencia",
                align: 'center',
                width: 75,
                sortable: true,
                dataIndex: 'referencia'
            },
            {
                header: "Concepto",
                align: 'center',
                width: 75,
                sortable: true,
                dataIndex: 'concepto'
            },
            {
                header: "Cantidad",
                align: 'center',
                width: 75,
                sortable: true,
                dataIndex: 'cantidad'
            },
            {
                header: "Saldo",
                align: 'center',
                width: 75,
                sortable: true,
                dataIndex: 'saldo'
            }
            ],listeners: {
                'rowdblclick':function(grid){
                    if(tolMov!=null)tolMov.hide();
                    tolMov=new Ext.Tip({
                        html:'&nbsp;&nbsp;&nbsp;&nbsp;<b>Remision:</b>&nbsp;'+ grid.getSelectionModel().getSelected().get('remision')
                        +'<br/>&nbsp;&nbsp;&nbsp;&nbsp;<b>Fecha Factura:<b/>&nbsp;'+grid.getSelectionModel().getSelected().get('fechaFact')
                        +'<br/>&nbsp;&nbsp;&nbsp;&nbsp;<b>Concepto:<b/>&nbsp;'+grid.getSelectionModel().getSelected().get('concepto')
                        +'&nbsp;&nbsp;&nbsp;&nbsp;<b>Cantidad:<b/>&nbsp;'+grid.getSelectionModel().getSelected().get('cantidad'),
                        title: '<u style="color:red;">Información Gral. Movimientos:</u>',
                        width:514,
                        autoHide: false,
                        closable: true,
                        draggable:true
                    });
                    tolMov.showAt([35,105]);
                }
            }
        })]
    });
   
    
    var PanelFormConsultaMovim = new Ext.FormPanel({
        id:idPnl,
        url: url,
        style: "padding:5px 5px 0",
        region: this.reg,
        border:false,
        height: this.alto,
        autoHeight :true,
        autoScroll      : true,
        labelWidth:150,
        items:[]
    });
    this.crearFichaMovim = function(){
        PanelFormConsultaMovim.add(PanelMovimiento);
        PanelFormConsultaMovim.doLayout();
        return PanelFormConsultaMovim;
      //  return PanelFormConsultaMovim;
    }
}

function BuscarMovimientos(prm){
    var grd = Ext.getCmp('idGridMovimentos');
    var store = grd.getStore();
    store.on('beforeload', function() {
        store.baseParams = prm;
    });
    store.load({
        params:{
            start:0,
            limit:200
        }
    });
}
