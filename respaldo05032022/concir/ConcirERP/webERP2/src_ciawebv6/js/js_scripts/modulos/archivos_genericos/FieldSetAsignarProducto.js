/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns("com.punto.pen");

com.punto.pen.FilaProd = function(argumentos){    
    var idProd = (argumentos.idProd == null ? '' : argumentos.idProd);
    var idPres = (argumentos.idPres == null ? '' : argumentos.idPres);
    var idMed = (argumentos.idMed == null ? '' : argumentos.idMed);
    var idHiMed = (argumentos.idHiMed == null ? '' : argumentos.idHiMed);
    var idHiTiempo = (argumentos.idHiTiempo == null ? '' : argumentos.idHiTiempo);
    var idc = (argumentos.idc == null ? 0 : argumentos.idc);
    
    this.panelFila = new Ext.Panel({
        xtype:"panel",
        columnWidth:1,
        layout:"column",
        border:false,
        frame:false,
        labelAlign:"top",
        bodyStyle:"padding:5px",
        items:[{
            xtype:"panel",
            columnWidth:0.15,
            layout:"form",
            border:false,
            frame:false,
            labelAlign:"top",
            bodyStyle:"padding:5px",
            items:[
            new com.punto.pen.ComboBox({
                id          :idProd,
                etiqueta    : 'Producto',
                allowBlank  : false,
                name        : 'cdrProducto',
                        width       : 140,
                prm         : {
                    campo: 'prd',
                    idCampo: 'idPrd',
                    url: contexto+'/ComboLoader',
                    bnd: 15,
                    qry: 17,
                    autoCarga: true,
                    'idc':idc
                },
                evt:{
                    'select':function(cmb,rec,idx){
                        var dm =Ext.getCmp(idPres);
                        accionCmbUbicacion(dm,[idPres],{
                            prd:cmb.getValue()
                        }, true);
                        if(Ext.getCmp(idProd).getValue()==79){
                            Ext.getCmp('idBtnAsignarMedico').disable();
                            Ext.getCmp(idHiMed).setValue('96991');
                            Ext.getCmp(idMed).setValue('Medico Renagel');
                        }else{
                            Ext.getCmp('idBtnAsignarMedico').enable();
                            Ext.getCmp(idHiMed).setValue('0');
                            Ext.getCmp(idMed).setValue('');                                
                        }
                    }
                        
                }
            })
            ]
        },{
            xtype:"panel",
            columnWidth:0.2,
            layout:"form",
            border:false,
            frame:false,
            labelAlign:"top",
            bodyStyle:"padding:5px",
            items:[
            new com.punto.pen.ComboBox({
                id          :idPres,
                etiqueta    : 'Presentación',
                allowBlank  : false,
                name        : 'cdrPresentacion',
                        width       : 190,
                prm         : {
                    campo: 'prs',
                    idCampo: 'idPrs',
                    bnd: 19,
                    qry: 18,
                    autoCarga: false,
                    'idc':idc
                }
            })
            ]
        }  
            ,{
                xtype:"panel",
                layout:"form",
                border:false,
                frame:false,
                labelAlign:"top",
                columnWidth:0.11,
                items:[
                 new com.punto.pen.ComboBox({
                        id          : 'idDuracion',
                        etiqueta    : 'Tiempo',
                        allowBlank  : false,
                        name        : 'cdrDuracion',
                        hiddenName  : 'hmdDuracion',
                        width       : 110,
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
            columnWidth:0.18,
            layout:"form",
            border:false,
            frame:false,
            labelAlign:"top",
            bodyStyle:"padding:5px",
            items:[
            {
                xtype:"hidden",
                name:"hidenMedico",
                id:idHiMed,
                value:"0"
            },
            {
                xtype:"textfield",
                fieldLabel:"Médico",
                width:175,
                name:"clnMedico",
                id:idMed,
                allowBlank:false,
                readOnly:true
            }
            ]
        },{
            xtype:"panel",
            columnWidth:0.09,
            layout:"form",
            border:false,
            frame:false,
            labelAlign:"top",
            bodyStyle:"padding:5px",
            items:[{
                xtype:"button",
                id:'idBtnAsignarMedico',
                text:"Asignar Médico",
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

                        {
                            text:'Aceptar',
                            handler:function(){
                                var grd = Ext.getCmp('gridBuscadorMedico');
                                var record = grd.getSelectionModel().getSelected();
                                if(record!=null){
                                    enviaValores([Ext.getCmp(idMed),
                                        Ext.getCmp(idHiMed)],
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
            }]
        },
        
        {
                xtype:"panel",
                columnWidth:0.18,
                layout:"form",
                id:'idPanelMostrarFV',
                border:false,
                frame:false,
                labelAlign:"top",
                bodyStyle:"padding:5px",
                items:[{
                    xtype:"hidden",
                    name:"idFV",
                    id:'idHdFV',
                    value:"0"
                },
                {
                    xtype:"textfield",
                    fieldLabel:"Fuerza de Venta",
                    width:175,
                    name:"nombreFV",
                    id:'nmFV',
                    tabIndex:116,
                    allowBlank:true,
                    readOnly:true
                }]
            },{
                xtype:"panel",
                columnWidth:0.08,
                layout:"form",
                border:false,
                frame:false,
                labelAlign:"top",
                bodyStyle:"padding:5px",
                items:[
                {
                    xtype:'panel',
                    layout:'form',
                    border:false,
                    frame:false,
                    items:[{
                        xtype:"button",
                        id:'idBtnAsignarFV',
                        text:"Asignar FV",
                        tabIndex:117,
                        handler:function(){
                            var formBus = new com.punto.pen.PanelBuscadorFuerzaVenta({
                                id:'pnlBuscadorFV'
                            });
                            var wnd = new Ext.Window({
                                id:'idPanelBuscarFV',
                                width:1000,
                                height:500,
                                constrainHeader :true,
                                constrain :true,
                                resizable : false,
                                modal:true,
                                border:false,
                                autoScroll:true,
                                items:[
                                formBus
                                ],
                                buttons:[{
                                    text:'Aceptar',
                                    handler:function(){
                                        var grd = Ext.getCmp('gridBuscadorFv');
                                        var record = grd.getSelectionModel().getSelected();
                                        if(record!=null){
                                            enviaValores([Ext.getCmp('nmFV'),
                                                Ext.getCmp('idHdFV')],
                                                [record.get('apaterno')+" "+record.get('amaterno')+" "+record.get('nombre'),
                                                record.get('idFV')],
                                                wnd);
                                        }else{
                                            Ext.MessageBox.alert('Mensaje de Error', "Debe seleccionar a un Reperesentante de F.V.");
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
                    }]
                }]
            }
        
        
        ]
    });
    return this.panelFila;
}
com.punto.pen.FSAsignarPrd = function(argumentos){

    this.titulo = (argumentos.titulo==null ? '' : argumentos.titulo);
    var idc = (argumentos.idc == null ? 0 : argumentos.idc);
   
    var prod1=new com.punto.pen.FilaProd({
        idProd:'idProducto1',
        idPres:'idPresentacion1',
        idMed:'idMedico1',
        idHiMed:'idHidenMedico1',
        idc:idc
    });
   
    this.fieldSetAsignarProdPac = new Ext.form.FieldSet({
        title:this.titulo,
        id:"idFieldSetAsigProd",
        autoHeight:true,
        layout:"column",
        items:[
        prod1
        ]
    });
    return this.fieldSetAsignarProdPac;
}