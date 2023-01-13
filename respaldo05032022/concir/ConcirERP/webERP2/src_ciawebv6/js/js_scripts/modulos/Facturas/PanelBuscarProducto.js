/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 * author: m@rco.@ndrade
 */
function getBucProducto(){
    Ext.define('ModelBusProducto', {
        extend: 'Ext.data.Model',
        fields: ['cvProducto', 'descripcion'],
        idProperty: 'cvProducto'
    });
    var storeBusProducto = Ext.create('Ext.data.Store', {
        id: 'storeBusProducto',
        model: 'ModelBusProducto',
        remoteSort: true,
        autoLoad :true,
        // allow the grid to interact with the paging scroller by buffering
        buffered: true,
        pageSize: 300,
        proxy: {
            // load using script tags for cross domain, if the data in on the same domain as
            // this page, an HttpProxy would be better
            type: 'jsonp',
            url : contexto+'/FacturaMovimiento?bnd=3',
            reader: {
                root: 'records',
                totalProperty: 'total'
            },
            // sends single sort as multi parameter
            simpleSortMode: true
        },
        /*sorters: [{
            property: 'elegir',
            direction: 'DESC'
        }],*/
        listeners:{
            datachanged:function(){
                var grdBusProduct = Ext.getCmp('gridBusProducto');
                var myMaskBusProduct=grdBusProduct.setLoading("Cargando...",true);              
                setTimeout(function(){
                    myMaskBusProduct.destroy();
                },1000);
            }
        }
    });
  
    var formBusProducto = Ext.widget('form', {
        id:'idBusProducto',
        border: false,
        bodyPadding: 20,
        // width:700,
        items: [Ext.create('Ext.grid.Panel', {
            id: "gridBusProducto",
            height: 320,
            store: storeBusProducto,
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
                width: 50,
                sortable: false
            },{
                id:'cvProducto',
                header: "Clave",
                width: 150,
                sortable: true,
                dataIndex: 'cvProducto'
            },
            {
                id:'descripcion',
                header: "Descripcion",
                width: 350,
                sortable: true,
                dataIndex: 'descripcion'
            }],
            listeners:{
                select:function(){
                    var grd = Ext.getCmp('gridBusProducto');
                    var cvProduct = grd.getSelectionModel().getLastSelected().get('cvProducto');
                    var descProduct = grd.getSelectionModel().getLastSelected().get('descripcion');
                    Ext.getCmp('cvProductoExis').setValue(cvProduct);
                    Ext.getCmp('idProductoExis').setValue(descProduct);
                }
            },
            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    xtype: 'textfield',
                    id:'idBuscaProducto',
                    name:"buscaProducto",
                    fieldLabel: 'Producto',
                    allowBlank: false,
                    enableKeyEvents:true,
                    labelWidth : 90,
                    listeners:{
                        'keypress':
                        function(txtField,e){
                            if(e.keyCode==13){
                                getProduct();
                            }
                        },
                        'keyup' : function(elem, e){
                            elem.setValue(elem.getValue().toUpperCase());
                        }
                    }
                }, '-',{
                    xtype: 'container',
                    width:265,
                    defaults: {
                        flex: 2
                    },
                    layout: 'hbox',
                    items: [{
                        xtype: 'radiogroup',
                        anchor: 'none',
                        id:'idRadioClave',
                        layout: {
                            autoFlex: false
                        },
                        defaults: {
                            name: 'ccType',
                            style: 'margin-right:15px'
                        },
                        items: [{
                            boxLabel  : 'Clave',
                            name:'vProdcts',
                            id:'idClave1',
                            inputValue: 'true',
                            checked : true,
                            handler: function(cmp){
                                if(cmp.checked){
                                    getProduct('true');
                                }
                            }
                        }, {
                            boxLabel  : 'Descripción',
                            name:'vProdcts',
                            id:'idClave',
                            inputValue: 'false',
                            handler: function(cmp){
                                if(cmp.checked){
                                    getProduct('false');
                                }
                            }
                        }]
                    }]
                }/*,{
                    xtype: 'button',
                    text : 'Buscar',
                    arrowAlign :'center',
                    handler:getProduct,
                    iconCls:'icn-busquedaDos',
                    width: 70
                }*/]
            }]
        })],
        buttons: [{
            text: 'Aceptar',
            handler: function() {
                var grd = Ext.getCmp('gridBusProducto');
                if(grd.getSelectionModel().getLastSelected()){
                    var cvProduct = grd.getSelectionModel().getLastSelected().get('cvProducto');
                    var descProduct = grd.getSelectionModel().getLastSelected().get('descripcion');
                    Ext.getCmp('cvProductoExis').setValue(cvProduct);
                    Ext.getCmp('idProductoExis').setValue(descProduct);
                    this.up('window').destroy();
                }else{
                    Ext.MessageBox.show({
                        title: 'Información',
                        msg: 'Debe seleccionar un producto para continuar...',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                }
            }
        }]
    });
    Ext.define('MyApp.PanelBuscProducto',
    {
        extend: 'Ext.Window',
        title: 'Busqueda de Producto',
        closable: false,
        //closeAction: 'destroy',
        height: 410,
        width: 640,
        maxWidth:650,
        maxHeight:410,
        modal:true,
        constrain: true,
        layout: 'fit',
        resizable: false,
        //autoScroll:true,
        initComponent: function() {
            this.items = [formBusProducto]
            this.callParent(arguments);
        }
    });
    var winBuscProduct = Ext.create('MyApp.PanelBuscProducto');
    winBuscProduct.show();
    function getProduct(bnd){
        var valor = Ext.getCmp('idBuscaProducto').getValue();
        //        if(bnd){
        //            var valor1 = Ext.getCmp('idClave').getValue();
        //            alert(valor1);
        //            bnd=valor1;
        //        }else{
        //            bnd=bnd;
        //        }
        storeBusProducto.load({
            params:{
                'cvProduct':valor,
                'tipoBuq':bnd
            }
        });
    }  
}
