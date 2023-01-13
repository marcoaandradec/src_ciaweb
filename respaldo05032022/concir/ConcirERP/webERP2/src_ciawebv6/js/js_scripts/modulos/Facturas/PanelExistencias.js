/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 * author: m@rco.@ndrade
 */
//idProducto,idalmacen,descripcionProdcuto
function getConsMovimientos(Producto,almacen,descAlmacen){
    Ext.define('ModelConsMovim', {
        extend: 'Ext.data.Model',
        fields: ['elegir','fechaFact','remision',
        'ubicacion','referencia','concepto','cantidad',
        'saldoProd'],
        idProperty: 'remision'
    });
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
    
    var storeConsMovim = Ext.create('Ext.data.Store', {
        id: 'storeConsMovim',
        model: 'ModelConsMovim',
        remoteSort: true,
        autoLoad :true,
        // allow the grid to interact with the paging scroller by buffering
        buffered: true,
        pageSize: 200,
        proxy: {
            // load using script tags for cross domain, if the data in on the same domain as
            // this page, an HttpProxy would be better
            type: 'jsonp',
            url: contexto+'/FacturaMovimiento?bnd=2',
            reader: {
                root: 'records',
                totalProperty: 'total'
            },
            // sends single sort as multi parameter
            simpleSortMode: true
        }
    /*sorters: [{
            property: 'elegir',
            direction: 'DESC'
        }],*/
    //        listeners:{
    //            datachanged:function(){
    //                var grdConsMov = Ext.getCmp('gridConsMovimientos');
    //                var myMaskBusF=grdConsMov.setLoading("Cargando...",true);
    //                setTimeout(function(){
    //                    myMaskBusF.destroy();
    //                },2000);
    //            }
    //        }
    });
    storeConsMovim.load({
        params:{
            'idAlmacen':almacen,
            'idProduct':"'"+Producto+"'",
            'FechIni':fecha,
            'FechFin':fecha1
        }
    });
    var formFacturas = Ext.widget('form', {
        id:'idConsMovimientos',
        border: false,
        bodyPadding: 20,
        width:700,
        items: [{
            xtype:'panel',
            collapsible: false,
            layout: 'hbox',
            border : 0,
            items :[{
                xtype: 'container',
                msgTarget : 'side',
                height :35,
                width: 250,
                defaults: {
                    labelWidth: 60               
                },
                flex: 1,
                items: [{
                    xtype: 'combobox',
                    id:"idTipAlmcenExis",
                    name:"TpoAlmcenExis",
                    fieldLabel: 'Almacen',
                    flex: 1,
                    width: 230,
                    store: createStore('idTipAlmcenExis','TpoAlmcenExis',5,6),
                    valueField: 'idTipAlmcenExis',
                    displayField: 'TpoAlmcenExis',
                    queryMode: 'local',
                    emptyText: 'Seleccione Almacen',
                    typeAhead: true,
                    allowBlank: true
                }]
            },{
                xtype: 'container',
                defaultType: 'datefield',
                msgTarget : 'side',
                height :35,
                layout: 'hbox',
                defaults: {
                    labelWidth: 30,
                    width: 130
                },
                items: [{
                    id:'idFechaIniExis',
                    name: 'fechaIniExis',
                    fieldLabel: 'De',
                    allowBlank: false,
                    enableKeyEvents:true,
                    listeners:{
                        'keypress':
                        function(txtField,e){
                            if(e.keyCode==13){
                                getInfo();
                            }
                        }
                    }
                },{
                    id:'idFechaFinExis',
                    name: 'fechaFinExis',
                    fieldLabel: 'Al',
                    allowBlank: false,
                    enableKeyEvents:true,
                    listeners:{
                        'keypress':
                        function(txtField,e){
                            if(e.keyCode==13){
                                getInfo();
                            }
                        }
                    }
                }]
            }]
        },{
            xtype:'panel',
            collapsible: false,
            layout: 'hbox',
            border : 0,
            items :[{
                xtype: 'hiddenfield',
                id:'cvProductoExis',
                name: 'cvProductoExis',
                value:Producto
            },{
                xtype: 'container',
                defaultType: 'textfield',
                msgTarget : 'side',
                height :35,
                //layout: 'hbox',
                defaults: {
                    labelWidth: 60,
                    width: 280
                },
                items: [{
                    id:'idProductoExis',
                    name: 'productoExis',
                    fieldLabel: 'Producto',
                    allowBlank: false,
                    enableKeyEvents:true,
                    readOnly:true,
                    listeners:{
                        'keypress':
                        function(txtField,e){
                            if(e.keyCode==13){
                                getInfo();
                            }
                        }
                    }
                }]
            },{
                xtype: 'container',
                items: [{
                    xtype:'label',
                    html:'&nbsp;&nbsp;&nbsp;'
                },{
                    xtype: 'button',
                    text : 'Buscar Producto',
                    arrowAlign :'center',
                    handler:getBucProducto,
                    iconCls:'icn-busquedaDos',
                    width: 115
                },{
                    xtype:'label',
                    html:'&nbsp;&nbsp;&nbsp;'
                }]
            },{
                xtype: 'container',
                defaultType: 'textfield',
                msgTarget : 'side',
                height :35,
                defaults: {
                    labelWidth: 70,
                    width: 150
                },
                items: [{
                    id:'idSaldo',
                    name: 'saldo',
                    fieldLabel: 'Saldo Inicial',
                    allowBlank: false,
                    enableKeyEvents:true,
                    listeners:{
                        'keypress':
                        function(txtField,e){
                            if(e.keyCode==13){
                                getInfo();                           
                            }
                        }
                    }
                }]
            },{
                xtype: 'container',
                items: [{
                    xtype:'label',
                    html:'&nbsp;&nbsp;&nbsp;'
                },{
                    xtype: 'button',
                    text : 'Buscar Movimientos',
                    arrowAlign :'center',
                    handler:getInfo,
                    iconCls:'icn-movimiento',
                    width: 115
                }]
            }]
        },Ext.create('Ext.grid.Panel', {
            id: "gridConsMovimientos",
            height: 250,
            store: storeConsMovim,
            selModel: {
                pruneRemoved: false
            },
            multiSelect: true,
            viewConfig: {
                trackOver: false,
                loadMask:true
            },
            columns:[{
                xtype: 'rownumberer',
                width: 30,
                sortable: false
            },{
                text: "elegir",
                dataIndex: 'elegir',
                width: 50,
                sortable: false
            },{
                text: "Fecha",
                dataIndex: 'fechaFact',
                align: 'center',
                width: 100,
                sortable: false
            },{
                id:'remision',
                text: "Remisión",
                dataIndex: 'remision',
                align: 'center',
                width: 100,
                sortable: false
            },{
                text: "Ubicación",
                dataIndex: 'ubicacion',
                align: 'center',
                width: 120,
                sortable: false
            },{
                text: "Referencia",
                dataIndex: 'referencia',
                align: 'center',
                width: 120,
                sortable: false
            },{
                text: "Concepto",
                dataIndex: 'concepto',
                align: 'center',
                width: 120,
                sortable: false
            },{
                text: "Cantidad",
                dataIndex: 'cantidad',
                align: 'center',
                width: 90,
                sortable: false
            },{
                text: "Saldo",
                dataIndex: 'saldoProd',
                align: 'center',
                width: 90,
                sortable: false
            }]
        })],
        buttons: [{
            text: 'Salir',
            handler: function() {
                this.up('window').destroy();
            }
        }]
    });
    Ext.define('MyApp.PanelConsMovimientos',
    {
        extend: 'Ext.Window',
        title: 'Consulta de Movimientos Producto',
        closable: true,
        closeAction: 'destroy',
        height: 410,
        width: 890,
        maxWidth:910,
        maxHeight:420,
        modal:true,
        constrain: true,
        layout: 'fit',
        resizable: true,
        //autoScroll:true,
        initComponent: function() {
            this.items = [formFacturas]
            this.callParent(arguments);
        }
    });
    var winConsMov = Ext.create('MyApp.PanelConsMovimientos');
    winConsMov.show();
    var grdConsMov = Ext.getCmp('gridConsMovimientos');
    var myMaskBusF=grdConsMov.setLoading("Cargando...",true);
    setTimeout(function(){
        myMaskBusF.destroy();
    },26000);
    Ext.getCmp('idProductoExis').setValue(descAlmacen);
    loadFormulario(formFacturas,{
        url:contexto+'/FacturaMovimiento?bnd=1',
        'idalmacen':almacen,
        'fechIni':fecha,
        'fechFin':fecha1,
        'idProduct':"'"+Producto+"'",
        bnd:1,
        msg:'Cargando Informacíon...',
        timeEst:1000
    });   
    function getInfo(){
        var idProduct=Ext.getCmp('cvProductoExis').getValue();
        var almacen=Ext.getCmp('idTipAlmcenExis').getValue();
        var fecha=Ext.getCmp('idFechaIniExis').getRawValue();
        var fecha1=Ext.getCmp('idFechaFinExis').getRawValue();
        storeConsMovim.removeAll(true);
        loadFormulario(formFacturas,{
            url:contexto+'/FacturaMovimiento?bnd=1',
            'idalmacen':almacen,
            'fechIni':fecha,
            'fechFin':fecha1,
            'idProduct':"'"+idProduct+"'",
            bnd:1
        });         
        storeConsMovim.load({
            params:{
                'idAlmacen':almacen,
                'idProduct':"'"+idProduct+"'",
                'FechIni':fecha,
                'FechFin':fecha1
            }
        });
        var grdConsMov = Ext.getCmp('gridConsMovimientos');
        var myMaskBusF=grdConsMov.setLoading("Cargando...",true);
        setTimeout(function(){
            myMaskBusF.destroy();
        },28000);
    }
}
//Remision almacen
function getRemAlmacen(idRemision){
    Ext.define('ModelRemAlmacen', {
        extend: 'Ext.data.Model',
        fields: ['productoRemi','descripcionRemi','loteRemi',
        'fechaRemi','ubicacionRemi','cantidadRemi','comentariosRemi'],
        idProperty: 'remision'
    });
    var storeRemAlmacen = Ext.create('Ext.data.Store', {
        id: 'idstoreRemAlmacen',
        model: 'ModelRemAlmacen',
        remoteSort: true,
        autoLoad :true,
        // allow the grid to interact with the paging scroller by buffering
        buffered: true,
        pageSize: 200,

        proxy: {
            // load using script tags for cross domain, if the data in on the same domain as
            // this page, an HttpProxy would be better
            type: 'jsonp',
            url: contexto+'/FacturaMovimiento?bnd=5',
            reader: {
                root: 'records',
                totalProperty: 'total'
            },
            // sends single sort as multi parameter
            simpleSortMode: true
        },
        sorters: [{
            property: 'elegir',
            direction: 'DESC'
        }]
    //        ,listeners:{
    //            datachanged:function(){
    //                var grdRemAlm = Ext.getCmp('gridRemAlmacen');
    //                var myMask = new Ext.LoadMask(grdRemAlm.getEl(), {
    //                    msg:"Cargardo Espere..."
    //                });
    //                myMask.show();
    //                setTimeout(function(){
    //                    myMask.destroy();
    //                },4000);
    //            }
    //        }
    });
    storeRemAlmacen.load({
        params:{
            'idRemision':idRemision
        }
    });
    var FormRemAlmacen = Ext.widget('form', {
        id:'idFormRemAlmacen',
        border: false,
        bodyPadding: 20,
        width:700,
        //  height :650,
        items: [{
            xtype:'panel',
            collapsible: false,
            layout: 'hbox',
            border : 0,
            height :35,
            items :[{
                xtype: 'container',
                defaultType: 'textfield',
                msgTarget : 'side',
                //  height :35,
                layout: 'hbox',
                defaults: {
                    //  labelWidth: 85,
                    labelAlign:'right'
                },
                items: [{
                    id:'idremRemision',
                    name: 'remRemision',
                    fieldLabel: 'Remision',
                    readOnly: true,
                    enableKeyEvents:true,
                    labelWidth: 85,
                    width: 200,
                    listeners:{
                        'keypress':
                        function(txtField,e){
                            if(e.keyCode==13){
                               
                        }
                        }
                    }
                },{
                    id:'idRemFecha',
                    name: 'RemFecha',
                    fieldLabel: 'Fecha',
                    readOnly: true,
                    enableKeyEvents:true,
                    labelWidth: 100,
                    width: 200,
                    listeners:{
                        'keypress':
                        function(txtField,e){
                            if(e.keyCode==13){
                             
                        }
                        }
                    }
                },{
                    id:'idRemFolio',
                    name: 'RemFolio',
                    fieldLabel: 'Folio',
                    readOnly: true,
                    enableKeyEvents:true,
                    labelWidth: 85,
                    width: 200,
                    listeners:{
                        'keypress':
                        function(txtField,e){
                            if(e.keyCode==13){

                        }
                        }
                    }
                }]
            }]
        },{
            xtype:'panel',
            collapsible: false,
            layout: 'hbox',
            border : 0,
            height :35,
            items :[{
                xtype: 'container',
                defaultType: 'textfield',
                msgTarget : 'side',
                //   height :35,
                layout: 'hbox',
                defaults: {
                    // labelWidth: 85,
                    labelAlign:'right'
                },
                items: [{
                    id:'idRemEmpresa',
                    name: 'RemEmpresa',
                    fieldLabel: 'Empresa',
                    readOnly: true,
                    enableKeyEvents:true,
                    labelWidth: 85,
                    width: 200,
                    listeners:{
                        'keypress':
                        function(txtField,e){
                            if(e.keyCode==13){
                        // getInfo();
                        }
                        }
                    }
                },{
                    id:'idRemReferencia',
                    name: 'RemReferencia',
                    fieldLabel: 'Referencia',
                    readOnly: true,
                    enableKeyEvents:true,
                    width: 200,
                    labelWidth: 100,
                    listeners:{
                        'keypress':
                        function(txtField,e){
                            if(e.keyCode==13){
                        // getInfo();
                        }
                        }
                    }
                }]
            }]
        },{
            xtype:'panel',
            collapsible: false,
            layout: 'hbox',
            border : 0,
            height :35,
            items :[{
                xtype: 'container',
                defaultType: 'textfield',
                msgTarget : 'side',
                //   height :35,
                layout: 'hbox',
                defaults: {
                    labelAlign:'right'
                },
                items: [{
                    id:'idRemAlmacen',
                    name: 'RemAlmacen',
                    fieldLabel: 'Almacen',
                    readOnly: true,
                    enableKeyEvents:true,
                    width: 200,
                    labelWidth: 85,
                    listeners:{
                        'keypress':
                        function(txtField,e){
                            if(e.keyCode==13){
                        // getInfo();
                        }
                        }
                    }
                },{
                    id:'idremTipoMov',
                    name: 'remTipoMov',
                    fieldLabel: 'Tipo Movimiento',
                    readOnly: true,
                    enableKeyEvents:true,
                    width: 200,
                    labelWidth: 100,
                    listeners:{
                        'keypress':
                        function(txtField,e){
                            if(e.keyCode==13){
                        // getInfo();
                        }
                        }
                    }
                }]
            }
            ]
        },{
            xtype:'panel',
            collapsible: false,
            layout: 'hbox',
            border : 0,
            height :35,
            items :[
            {
                xtype: 'container',
                defaultType: 'textfield',
                msgTarget : 'side',
                // height :35,
                layout: 'hbox',
                defaults: {
                    labelWidth: 85,
                    labelAlign:'right'
                },
                items: [{
                    id:'idRemComentarios',
                    name: 'RemComentarios',
                    fieldLabel: 'Comentarios',
                    readOnly: true,
                    enableKeyEvents:true,
                    width: 500,
                    listeners:{
                        'keypress':
                        function(txtField,e){
                            if(e.keyCode==13){
                        // getInfo();
                        }
                        }
                    }
                }]
            }]
        },
        Ext.create('Ext.grid.Panel', {
            id: "gridRemAlmacen",
            height: 250,
            //  title: 'Facturas Encontradas',
            store: storeRemAlmacen,
            loadMask: true,
            selModel: {
                pruneRemoved: false
            },
            multiSelect: true,
            viewConfig: {
                trackOver: false
            },
            columns:[{
                xtype: 'rownumberer',
                width: 30,
                sortable: false
            },{
                text: "Producto",
                dataIndex: 'productoRemi',
                width: 100,
                sortable: false
            },{
                text: "Descripción",
                dataIndex: 'descripcionRemi',
                width: 140,
                sortable: false
            },{
                text: "Lote",
                dataIndex: 'loteRemi',
                align: 'center',
                width: 90,
                sortable: false
            },{
                text: "Fecha",
                dataIndex: 'fechaRemi',
                align: 'center',
                width: 90,
                sortable: false
            },{
                text: "Ubicacion",
                dataIndex: 'ubicacionRemi',
                align: 'center',
                width: 70,
                sortable: false
            },{
                text: "Cantidad",
                dataIndex: 'cantidadRemi',
                align: 'center',
                width: 60,
                sortable: false
            },{
                text: "Comentarios",
                dataIndex: 'comentariosRemi',
                align: 'center',
                width: 130,
                sortable: false
            }]
        })],
        buttons: [{
            text: 'Salir',
            handler: function() {
                this.up('window').destroy();
            }
        }]
    });
    
    Ext.define('MyApp.PanelRemAlmacen',
    {
        extend: 'Ext.Window',
        title: 'Consulta Remision Almacen',
        closable: true,
        closeAction: 'destroy',
        height: 490,
        width: 850,
        maxWidth:900,
        maxHeight:495,
        modal:true,
        constrain: true,
        layout: 'fit',
        resizable: true,
        //autoScroll:true,
        initComponent: function() {
            this.items = [FormRemAlmacen]
            this.callParent(arguments);
        }
    });
    var winRemAlm = Ext.create('MyApp.PanelRemAlmacen');
    winRemAlm.show();
    var grdRemAlm = Ext.getCmp('gridRemAlmacen');
    var myMaskRemAlm=grdRemAlm.setLoading("Cargando...",true);
    setTimeout(function(){
        myMaskRemAlm.destroy();
    },10000);
    loadFormulario(FormRemAlmacen,{
        url:contexto+'/FacturaMovimiento?bnd=4',
        'idRemision':idRemision,
        msg:'Cargando Informacíon...',
        timeEst:1000
    });
}

