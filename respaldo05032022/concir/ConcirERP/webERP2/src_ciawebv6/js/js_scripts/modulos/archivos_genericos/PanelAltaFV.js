/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("com.punto.pen");

com.punto.pen.PanelAltaFV= function(argumentos){
    var idPnl = (argumentos.id==null ? "" : argumentos.id);
    this.reg = (argumentos.region==null ? "" : argumentos.region);
    var url = (argumentos.url==null ? "" : argumentos.url);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    this.autoAlto = (this.alto==0 ? true : false);

    var panelAltaFdv= new Ext.FormPanel({
        id: idPnl,
        bodyStyle: "padding:5px 5px 0",
        region: this.reg,
        url: url,
        height: 160,
        autoHeight: this.autoAlto,
        autoScroll: (!this.autoAlto),
        items:[{
            xtype:"fieldset",
            title:"Información",
            autoHeight:true,
            width:800,
            layout:"column",
            collapsed:false,
            collapsible:false,
            items:[{
                xtype:"panel",
                columnWidth:0.33,
                layout:"form",
                border:false,
                frame:false,
                labelAlign:"top",
                bodyStyle:"padding:5px",
                items:[{
                    xtype:"textfield",
                    fieldLabel:"Nombre",
                    allowBlank:false,
                    name:"FdvNombre",
                    width:200,
                    enableKeyEvents:true,
                    tabIndex:101,
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
                        }
                    }
                },{
                    xtype:"textfield",
                    fieldLabel:"Correo Electrónico",
                    vtype:"email",
                    tabIndex:104,
                    width:200,
                    name:"FdvEmail",
                    listeners:{
                        'change':function(txt){
                            if(txt.isValid()){
                                Ext.Ajax.request({
                                    url:contexto+'/FuerzaVenta',
                                    params:{
                                        bnd:3,
                                        email:txt.getValue()
                                    },
                                    success:function(rsp){
                                        var json = eval("("+rsp.responseText+")");
                                        if(json.repetido=='1'){
                                            txt.markInvalid();
                                            txt.focus();
                                            txt.setValue("");
                                            Ext.Msg.alert("¡¡Alerta!!",json.msg);
                                        }
                                    },
                                    failure:function(rsp){

                                    }
                                });
                            }
                        }
                    } 
                }]
            },{
                xtype:"panel",
                columnWidth:0.33,
                layout:"form",
                border:false,
                frame:false,
                labelAlign:"top",
                bodyStyle:"padding:5px",
                items:[{
                    xtype:"textfield",
                    fieldLabel:"Apellido Paterno",
                    allowBlank:false,
                    width:200,
                    name:"FdvApellidoPaterno",
                    enableKeyEvents:true,
                    tabIndex:102,
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
                        }
                    }
                },{
                    xtype:"textfield",
                    fieldLabel:"Linea Terapeutica",
                    width:200,
                    tabIndex:105,
                    name:"FdvLinea",
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
                        }
                    }
                }]
            },{
                xtype:"panel",
                columnWidth:0.33,
                border:false,
                frame:false,
                layout:"form",
                labelAlign:"top",
                bodyStyle:"padding:5px",
                items:[{
                    xtype:"textfield",
                    fieldLabel:"Apellido Materno",
                    allowBlank:false,
                    name:"FdvApellidoMaterno",
                    enableKeyEvents:true,
                    tabIndex:103,
                    width:200,
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
                        }
                    }
                },
                new com.punto.pen.ComboBox({
                    id:"idComboEstadoMed",
                    etiqueta:"Ciudad",
                    allowBlank:false,
                    width:200,
                    tabIndex:106,
                    name:"FdvCiudad",
                    prm:{
                        campo:'edo',
                        idCampo:'idEdo',
                        bnd:1,
                        qry:1,
                        autoCarga:true
                    }
                })
                ]
            }]
        }]
    });
    
    return panelAltaFdv;

}