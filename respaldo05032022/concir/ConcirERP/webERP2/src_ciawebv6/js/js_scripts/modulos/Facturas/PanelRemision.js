/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns('com.punto.pen');
var tolRem;
com.punto.pen.PanelRemision = function(argumentos){
    var idPnl = (argumentos.id==null ? '' : argumentos.id);
    var url = (argumentos.url==null ? '' : argumentos.url);
    this.autoAlto = (this.height==0 ? true : false);
    this.autoScroll = (argumentos.autoScroll==null ? false : argumentos.autoScroll);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    // var idFact = (argumentos.idFact==null ? '1' : argumentos.idFact);
    var idRemision=(argumentos.idRemision==null ? '' : argumentos.idRemision);
    var record = Ext.data.Record.create([
    {
        name: 'productoRemi',
        type:'string'
    },{
        name: 'descripcionRemi',
        type: 'string'
    },{
        name: 'loteRemi',
        type: 'string'
    },{
        name: 'fechaRemi',
        type: 'string'
    },{
        name: 'ubicacionRemi',
        type: 'string'
    },{
        name: 'cantidadRemi',
        type: 'string'
    },{
        name: 'comentariosRemi',
        type: 'string'
    } ]);
    Ext.Ajax.request({
        url : contexto+'/FacturaMovimiento',
        params:{
            bnd:4,
            idRemision:idRemision
        },
        success:function(rsp){
            var json = eval("("+rsp.responseText+")");
            var RemisionRemi="";
            var FechaRemi="";
            var FolioRemi="";
            var EmpresaRemi="";
            var ReferenciaRemi="";
            var AlmacenRemi="";
            var TipoMovim="";
            var ComentariosRemi="";
            RemisionRemi=json.data.idRemisionRemi;
            FechaRemi=json.data.idFechaRemi;
            FolioRemi=json.data.idFolioRemi;
            EmpresaRemi=json.data.idEmpresaRemi;
            ReferenciaRemi=json.data.idReferenciaRemi;
            AlmacenRemi=json.data.idAlmacenRemi;
            TipoMovim=json.data.idTipoMovim;
            ComentariosRemi=json.data.idComentariosRemi;
            Ext.getCmp("idRemisionRemi").setValue("");
            Ext.getCmp("idFechaRemi").setValue("");
            Ext.getCmp("idFolioRemi").setValue("");
            Ext.getCmp("idEmpresaRemi").setValue("");
            Ext.getCmp("idReferenciaRemi").setValue("");
            Ext.getCmp("idAlmacenRemi").setValue("");
            Ext.getCmp("idTipoMovim").setValue("");
            Ext.getCmp("idComentariosRemi").setValue("");
            Ext.getCmp("idRemisionRemi").setValue(RemisionRemi);
            Ext.getCmp("idFechaRemi").setValue(FechaRemi);
            Ext.getCmp("idFolioRemi").setValue(FolioRemi);
            Ext.getCmp("idEmpresaRemi").setValue(EmpresaRemi);
            Ext.getCmp("idReferenciaRemi").setValue(ReferenciaRemi);
            Ext.getCmp("idAlmacenRemi").setValue(AlmacenRemi);
            Ext.getCmp("idTipoMovim").setValue(TipoMovim);
            Ext.getCmp("idComentariosRemi").setValue(ComentariosRemi);
        },
        failure:function(rsp){
        }
    });
    var storeRemesion = new Ext.data.Store({
        autoLoad: true, //true para q carge al inicio de session, false no haga nada
        baseParams: {
            'bnd':5,
            start:0,
            limit:100,
            idRemision:idRemision
        },
        reader :new Ext.data.JsonReader( {
            totalProperty: 'total',
            root :'records',
            idProperty: 'id'
        },record),
        proxy :new Ext.data.HttpProxy( {
            url :contexto+'/FacturaMovimiento' //contexto+'/BitacoraTransaccion'
        })
    });
    var pbarMovmProducts = new Ext.PagingToolbar({
        id          : 'pgridMovmProducts',
        width       : 500,
        pageSize    : 100,
        store       : storeRemesion,
        displayInfo : true,
        prependButtons: false,
        displayMsg  : 'Mostrando {0} - {1} Movimientos de {2}',
        emptyMsg    : "No hay datos para mostrar"
    });
    var PanelRemision=  new Ext.Panel({
        id:'idPanelRemision',
        labelAlign:"top",
        xtype:"panel",
        layout:"form",
        border:false,
        items:[{
            xtype:"fieldset",
            id:"idPanelDatosGnrls",
            title:"Datos Generales",
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
                    html:"",
                    Height:20,
                    border:false
                },{
                    xtype:"panel",
                    columnWidth:0.2,
                    layout:"form",
                    labelAlign:"top",
                    border:false,
                    bodyStyle:"padding 5px;",
                    items:[{
                        xtype:"textfield",
                        width:90,
                        tabIndex:2,
                        id:'idRemisionRemi',
                        name:'remisionRemi',
                        fieldLabel:"Remision",
                        enableKeyEvents:true,
                        readOnly :true,
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
                            //clickBtnBuscarMov();
                            }
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
                        xtype:"textfield",
                        width:90,
                        tabIndex:2,
                        id:'idFechaRemi',
                        name:'fechaRemi',
                        fieldLabel:"Fecha",
                        enableKeyEvents:true,
                        readOnly :true,
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
                            //clickBtnBuscarMov();
                            }
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
                        width:90,
                        tabIndex:2,
                        id:'idFolioRemi',
                        name:'folioRemi',
                        fieldLabel:"Folio",
                        enableKeyEvents:true,
                        readOnly :true,
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
                            //clickBtnBuscarMov();
                            }
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
                        xtype:"textfield",
                        width:250,
                        tabIndex:2,
                        id:'idEmpresaRemi',
                        name:'empresaRemi',
                        fieldLabel:"Empresa",
                        enableKeyEvents:true,
                        readOnly :true,
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
                            //clickBtnBuscarMov();
                            }
                            }
                        }
                    }]
                },{
                    xtype:"panel",
                    columnWidth:0.3,
                    layout:"form",
                    labelAlign:"top",
                    border:false,
                    //hidden:false,
                    bodyStyle:"padding 5px;",
                    items:[{
                        xtype:"textfield",
                        width:100,
                        tabIndex:2,
                        id:'idReferenciaRemi',
                        name:'referenciaRemi',
                        fieldLabel:"Referencia",
                        enableKeyEvents:true,
                        readOnly :true,
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
                            //clickBtnBuscarMov();
                            }
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
                        xtype:"textfield",
                        width:250,
                        tabIndex:2,
                        id:'idAlmacenRemi',
                        name:'almacenRemi',
                        fieldLabel:"Almacen",
                        enableKeyEvents:true,
                        readOnly :true,
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
                            //clickBtnBuscarMov();
                            }
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
                        xtype:"textfield",
                        width:250,
                        tabIndex:2,
                        id:'idTipoMovim',
                        name:'tipoMovim',
                        fieldLabel:"Tipo Movimiento",
                        enableKeyEvents:true,
                        readOnly :true,
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
                            //clickBtnBuscarMov();
                            }
                            }
                        }
                    }]
                },{
                    xtype:"panel",
                    columnWidth:0.5,
                    layout:"form",
                    labelAlign:"top",
                    border:false,
                    //hidden:false,
                    bodyStyle:"padding 5px;",
                    items:[{
                        xtype:"textfield",
                        width:300,
                        tabIndex:2,
                        id:'idComentariosRemi',
                        name:'comentariosRemi',
                        fieldLabel:"Comentarios",
                        enableKeyEvents:true,
                        readOnly :true,
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
                            //clickBtnBuscarMov();
                            }
                            }
                        }
                    }]
                }]
            }]
        },{
            xtype:"fieldset",
            id:"idPanelMovimints",
            title:"Detalle de Movimientos",
            region:"center",
            autoHeight:true,
            hidden:false,
            items:[new Ext.grid.GridPanel({
                id              : 'idGridRemision',
                region          : this.region,
                anchor          : this.anchor,
                columnWidth     : this.columnWidth,
                height          : 210,
                border:false,
                store           : storeRemesion,
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
                bbar            : [pbarMovmProducts,'->',{
                    text  : '',
                    style :'font-weight:bold;font-size:12;',
                    handleMouseEvents:false,
                    handler:null
                }],
                columns         : [new Ext.grid.RowNumberer(),
                {
                    header: "Producto",
                    align: 'center',
                    width: 60,
                    sortable: true,
                    dataIndex: 'productoRemi'
                },
                {
                    header: "Descripción",
                    align: 'center',
                    width: 100,
                    sortable: true,
                    dataIndex: 'descripcionRemi'
                },
                {
                    header: "Lote",
                    align: 'center',
                    width: 60,
                    sortable: true,
                    dataIndex: 'loteRemi'
                },
                {
                    header: "Fecha",
                    align: 'center',
                    width: 55,
                    sortable: true,
                    dataIndex: 'fechaRemi'
                },
                {
                    header: "Ubicacion",
                    align: 'center',
                    width: 55,
                    sortable: true,
                    dataIndex: 'ubicacionRemi'
                },
                {
                    header: "Cantidad",
                    align: 'center',
                    width: 55,
                    sortable: true,
                    dataIndex: 'cantidadRemi'
                },
                {
                    header: "Comentarios",
                    align: 'center',
                    width: 100,
                    sortable: true,
                    dataIndex: 'comentariosRemi'
                }],
                listeners: {
                    'rowdblclick':function(grid){
                        if(tolRem!=null)tolRem.hide();
                        tolRem=new Ext.Tip({
                            html:'&nbsp;&nbsp;&nbsp;&nbsp;<b>Producto:</b>&nbsp;'+ grid.getSelectionModel().getSelected().get('productoRemi')
                            +'<br/>&nbsp;&nbsp;&nbsp;&nbsp;<b>Descripción:<b/>&nbsp;'+grid.getSelectionModel().getSelected().get('descripcionRemi')
                            +'<br/>&nbsp;&nbsp;&nbsp;&nbsp;<b>Ubicación:<b/>&nbsp;'+grid.getSelectionModel().getSelected().get('ubicacionRemi')
                            +'&nbsp;&nbsp;&nbsp;&nbsp;<b>Cantidad:<b/>&nbsp;'+grid.getSelectionModel().getSelected().get('cantidadRemi')
                            +'<br/>&nbsp;&nbsp;&nbsp;&nbsp;<b>Comentarios:<b/>&nbsp;'+grid.getSelectionModel().getSelected().get('comentariosRemi'),
                            title: '<u style="color:red;">Información Gral. Movimientos Productos:</u>',
                            width:514,
                            autoHide: false,
                            closable: true,
                            draggable:true
                        });
                        tolRem.showAt([35,105]);
                    }
                }
            })]
        }]
    });


    var PanelFormRemision = new Ext.FormPanel({
        id:idPnl,
        url: url,
        style: "padding:5px 5px 0",
        region: this.reg,
        border:false,
        autoHeight:true,
        autoScroll      : true,
        labelWidth:150,
        items:[]
    });
    this.crearFichaRemision = function(){
        PanelFormRemision.add(PanelRemision);
        PanelFormRemision.doLayout();
        return PanelFormRemision;
    }
//return PanelRemision;
}
