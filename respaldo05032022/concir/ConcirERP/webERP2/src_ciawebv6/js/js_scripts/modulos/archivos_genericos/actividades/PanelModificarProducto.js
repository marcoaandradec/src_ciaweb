/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns("com.punto.pen");

com.punto.pen.ModificarProductoGramaje= function(argumentos){
    var id    = (argumentos.id==null ? 'idModProductoForm' : argumentos.id);
    var url   = (argumentos.url==null ? contexto+'/CtrProductos' : argumentos.url);
    var idProd = (argumentos.id==null ? '' : argumentos.idProd);
    var idCnt  = (argumentos.idCnt==null ? '' : argumentos.idCnt);

    this.panel = new Ext.form.FormPanel({
        id:id,
        url:url,
        border:false,
        height:70,
        items:[
            {
            xtype:"panel",
            layout:"form",
            border:false,
            height:10,
            items:[
                {xtype:"hidden",name:"hdCMP",value:"0"},
                {xtype:"hidden",name:"hdCS",value:"0"},
                {xtype:"hidden",name:"hdMed",id:"idhdMed",value:"0"}
            ]
            },
            {
            xtype:"panel",
            layout:"column",
            border:false,
            frame:false,
            items:[
            {
                xtype:"panel",
                layout:"form",
                border:false,
                labelAlign:"top",
                columnWidth:0.18,
                frame:false,
                items:[
                    new com.punto.pen.ComboBox({
                    id          : 'idFamilia',
                    etiqueta    : 'Producto',
                    allowBlank  : false,
                    name        : 'mdFamilia',
                    hiddenName  : 'hmdFamilia',
                    width       : 150,
                    prm         : {campo: 'prd',idCampo: 'idPrd',bnd: 5,qry: 17,autoCarga: true},
                    tabIndex:114,
                    evt:{
                        'select':function(cmb,rec,idx){
                            var dm =Ext.getCmp('idProducto');
                                accionCmbUbicacion(dm,['idProducto'],{
                                prd:cmb.getValue()
                            }, true)
                        }
                    }
                })
                ]
            },{
                xtype:"panel",
                layout:"form",
                border:false,
                frame:false,
                labelAlign:"top",
                columnWidth:0.24,
                items:[
                 new com.punto.pen.ComboBox({
                    id          : 'idProducto',
                    etiqueta    : 'Presentación',
                    allowBlank  : false,
                    name        : 'mdProducto',
                    hiddenName  : 'hmdProducto',
                    tabIndex    : 115,
                    width       : 200,
                    prm         : {
                        campo: 'prs',idCampo: 'idPrs',bnd: 8,qry: 18,autoCarga: false
                    },
                    evtStore:{
                       'load':function(){
                        var cmb = Ext.getCmp('idProducto');
                        cmb.setValue(idProd);
                      }
                   }
                 })
                ]
            },{
                xtype:"panel",
                layout:"form",
                border:false,
                frame:false,
                labelAlign:"top",
                columnWidth:0.18,
                items:[
                 new com.punto.pen.ComboBox({
                        id          : 'idDuracion',
                        etiqueta    : 'Tiempo con Medicamento',
                        allowBlank  : false,
                        name        : 'cdrDuracion',
                        hiddenName  : 'hmdDuracion',
                        width       : 150,
                        prm         : {
                            campo: 'prs',
                            idCampo: 'idPrs',
                            bnd: 5,
                            qry: 121,
                            autoCarga: true
                        }
                    })
                ]
            },{
                xtype:"panel",
                layout:"form",
                border:false,
                frame:false,
                labelAlign:"top",
                columnWidth:0.26,
                items:[
                {xtype:"hidden",name:"hidenMedico",id:'idHiMed',value:"0"},
                {xtype:"textfield",fieldLabel:"Médico",width:210,name:"mdMedico",id:'idMed',allowBlank:false,readOnly:true}
                ]}
            ,{
                xtype:"panel",
                layout:"form",
                border:false,
                frame:false,
                labelAlign:"top",
                columnWidth:0.12,
                items:[
            {xtype:"button",text:"Asignar Médico",
                handler:function(){
                    var formBus = new com.punto.pen.PanelBuscadorMedico({
                        id:'pnlBuscadorMedico'
                    });
                    var wnd = new Ext.Window({
                        id:'idPanelBuscarMedico',
                        width:1000,
                        height:500,
                        constrainHeader :true,
                        constrain :true,
                        resizable : false,
                        modal:true,
                        border:false,
                        autoScroll:false,
                        draggable:true,
                        items:[
                            formBus
                        ],
                        buttons:[
                            {text:'Aceptar',
                                handler:function(){
                                    var grd = Ext.getCmp('gridBuscadorMedico');
                                    var record = grd.getSelectionModel().getSelected();
                                    if(record!=null){
                                        enviaValores([Ext.getCmp('idMed'),
                                            Ext.getCmp('idHiMed')],
                                            [record.get('apaterno')+" "+record.get('amaterno')+" "+record.get('nombre'),
                                            record.get('idMedico')],
                                            Ext.getCmp('idPanelBuscarMedico'));
                                    }else{
                                        Ext.MessageBox.alert('Mensaje de Error', "Debe seleccionar a un Médico.");
                                    }
                                }
                            },{
                                text:'Cancelar',
                                handler:function(){
                                    wnd.close();
                                }
                            }
                        ]
                    });
                    wnd.show();
                }
            }
                ]
            }]
        }
        ]
    });
    return this.panel;
}
