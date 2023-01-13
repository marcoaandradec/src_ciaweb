Ext.ns('com.punto.pen');

com.punto.pen.PanelCambioDispositivo = function(argumentos){
    var idPnl = (argumentos.id==null ? '' : argumentos.id);
    var tipOutAutSol = (argumentos.tipOutAutSol==null ? '0' : argumentos.tipOutAutSol);
    var url = (argumentos.url==null ? '' : argumentos.url);
    var titulo = (argumentos.titulo==null ? '' : argumentos.titulo);
    this.autoAlto = (this.height==0 ? true : false);
    this.autoScroll = (argumentos.autoScroll==null ? false : argumentos.autoScroll);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    var idQur =(argumentos.idQur==null ? 93 : argumentos.idQur);

    var pnlCambioDispositivo = new Ext.Panel({
        layout:"form",
        bodyStyle:"padding:5px",
        border:false,
        items:[{
            xtype:"panel",
            autoHeight:true,
            layout:"form",
            border:false,
            items:[{
                xtype:"fieldset",
                title:"Información",
                autoHeight:true,
                layout:"column",
                labelAlign:"top",
                items:[{
                    xtype:"panel",
                    layout:"form",
                    columnWidth:0.6,
                    border:false,
                    frame:false,
                    labelAlign:"top",
                    bodyStyle:"padding:5px",
                    items:[{
                        xtype:"textfield",
                        fieldLabel:"Nombre",
                        name:"capNombre",
                        width:210,
                        readOnly:true
                    },{
                        xtype:"panel",
                        autoHeight:true,
                        layout:"form",
                        border:false,
                        labelAlign:"top",
                        items:[
                        new com.punto.pen.ComboBox({
                            id:'idCmbDispositivo',
                            etiqueta:'Tipo Dispositivo',
                            name:'tipoCapacitacion',
                            hiddenName:'Re_Capacitacion',
                            allowBlank:false,
                            emptyText:'Seleccione',
                            width:200,
                            prm:{
                                idCampo:'idTipoCapacitacion',
                                campo:'tipoCapacitacion',
                                'bnd':5,
                                qry:96,
                                autoCarga:true
                            }
                        })]
                    }]
                },{
                    xtype:"panel",
                    layout:"form",
                    columnWidth:0.4,
                    border:false,
                    frame:false,
                    labelAlign:"top",
                    bodyStyle:"padding:5px",
                    items:[{
                        id:'idCmbFechaDispos',
                        xtype:"datefield",
                        fieldLabel:"Fecha",
                        name:"capFecha",
                        emptyText:'dd/mm/yyyy',
                        allowBlank:false,
                        enableKeyEvents:true,
                        listeners:{
                            'keypress':function(txtField,e){
                                if((e.getKey()>=47 && e.getKey()<=57)|| e.getKey()==9 || e.getKey()==8){}else{
                                    e.stopEvent();
                                }
                            }
                        },
                        width:100,
                        autoCreate:{
                            tag:"input",
                            maxlength:10
                        }
                    },{
                        xtype:"panel",
                        layout:"form",
                        border:false,
                        frame:false,
                        labelAlign:"top",
                        bodyStyle:"padding:5px",
                        items:[{
                            xtype:"textfield",
                            id:'idCmbLoteDispo',
                            fieldLabel:"No. de Lote",
                            allowBlank:false,
                            name:"capLote",
                            width:100,
                            tabIndex:100,
                            style:'text-transform: uppercase;',
                            enableKeyEvents:true,
                            autoCreate:{
                                tag:"input",
                                type:"text",
                                autocomplete:"off",
                                maxlength:12
                            },
                            listeners: {
                                blur:function(el){
                                    el.setValue(el.getValue().trim());
                                },
                                'keyup' : function(elem, e){
                                    elem.setValue(elem.getValue().toUpperCase());
                                },
                                'keypress':function(txtField,e){
                                    if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                                        e.stopEvent();
                                    }

                                }
                            }
                        }]
                    }]
                }]
            }]
        },{
            xtype:"fieldset",
            title:"Observaciones",
            autoHeight:true,
            hideLabels:true,
            labelAlign:"top",
            items:[{
                xtype:"textarea",
                id:'idCmbObserva',
                name:"capObservacion",
                hideLabels:true,
                allowBlank:false,
                width:400,
                enableKeyEvents:true,
                style:'text-transform: uppercase;',
                listeners: {
                    blur:function(el){
                        el.setValue(el.getValue().trim())
                    },
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
        }]
    });

    var panelRegCambioDispositivo= new Ext.FormPanel({
        id:idPnl,
        title:titulo,
        url: url,
        style: "padding:5px 5px 0",
        region: this.reg,
        border:false,
        height: this.alto,
        autoHeight: this.autoAlto,
        autoScroll: (!this.autoAlto),
        items:[pnlCambioDispositivo]
    });

    return panelRegCambioDispositivo;

}

