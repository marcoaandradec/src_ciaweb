Ext.ns("com.punto.pen");

com.punto.pen.PanelEncuestaCalidad= function(argumentos){
    var idPnl = (argumentos.id==null ? "" : argumentos.id);
    this.reg = (argumentos.region==null ? "" : argumentos.region);
    var url = (argumentos.url==null ? "" : argumentos.url);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    this.autoAlto = (this.alto==0 ? true : false);
    var idCnt = (argumentos.idCnt==null ? '1' : argumentos.idCnt);
    var titulo = (argumentos.titulo==null ? "" : argumentos.titulo);


    var panelFormEncuestaCalidad= new Ext.FormPanel({
        id:idPnl,
        title:titulo,
        url: url,
        bodyStyle: "padding:5px 5px 0",
        region: this.reg,
        border:false,
        height: this.alto,
        autoHeight: this.autoAlto,
        autoScroll: (!this.autoAlto),
        items:[{
            id:'idPanelECalidad',
            xtype:"panel",
            layout:"form",
            border:false,
            items:[{
                xtype:"fieldset",
                title:"Encuesta",
                autoHeight:true,
                layout:"form",
                labelWidth:420,
                items:[{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    frame:false,
                    id:"idEcPrg1Canjes",
                    items:[
                    new com.punto.pen.ComboBox({
                        id:"idPrg1Canjes",
                        etiqueta:"Lugar donde se realizó/solicitó el canje",
                        name:"EcPrg1Canjes",
                        width:205,
                        allowBlank:false,
                        tabIndex:300,
                        valueField:"iddonde",
                        hiddenName:"hidenEcPrg1Canjes",
                        prm:{
                            campo:"donde",
                            idCampo:"iddonde",
                            autoCarga:true,
                            bnd:5,
                            qry:88
                        }
                    })]
                },{
                    xtype:"panel",
                    id:"idEcPrg2Canjes",
                    layout:"form",
                    border:false,
                    frame:false,
                    items:[
                    new com.punto.pen.ComboBox({
                    id:"idPrg2Canjes",
                        etiqueta:"Su medicamento le fue entregado",
                        name:"EcPrg2Canjes",
                        width:205,
                        allowBlank:false,
                        tabIndex:300,
                        valueField:"idservicio",
                        hiddenName:"hidenEcPrg2Canjes",
                        prm:{
                            campo:"servicio",
                            idCampo:"idservicio",
                            autoCarga:true,
                            bnd:5,
                            qry:85
                        }
                    })]
                },
                new com.punto.pen.ComboBox({
                    id:"idEcPrg3CanTele",
                    etiqueta:"El servicio y atención que recibe por parte de nuestro mensajero, es",
                    name:"EcPrg3CanTele",
                    width:205,
                    allowBlank:false,
                    tabIndex:300,
                    valueField:"idservicio",
                    hiddenName:"hidenEcPrg3CanTele",
                    prm:{
                        campo:"servicio",
                        idCampo:"idservicio",
                        autoCarga:true,
                        bnd:5,
                        qry:83
                    }
                }),{
                    xtype:"panel",
                    layout:"form",
                    id:"idEcPrg2Tele",
                    border:false,
                    frame:false,
                    items:[new com.punto.pen.ComboBox({
                    id:"idPrg2Tele",
                        etiqueta:"Encontró el medicamento y presentación que estaba buscando",
                        name:"EcPrg2Tele",
                        width:205,
                        allowBlank:false,
                        tabIndex:300,
                        valueField:"idmedica",
                        hiddenName:"hidenEcPrg2Tele",
                        prm:{
                            campo:"medica",
                            idCampo:"idmedica",
                            autoCarga:true,
                            bnd:5,
                            qry:24
                        }
                    })]
                },{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    id:"idEcPrg3Tele",
                    frame:false,
                    items:[new com.punto.pen.ComboBox({
                    id:"idPrg3Tele",
                        etiqueta:"Le informaron sobre promociones vigentes del producto",
                        name:"EcPrg3Tele",
                        width:205,
                        allowBlank:false,
                        tabIndex:300,
                        valueField:"idservicio",
                        hiddenName:"hidenEcPrg3Tele",
                        prm:{
                            campo:"servicio",
                            idCampo:"idservicio",
                            autoCarga:true,
                            bnd:5,
                            qry:24
                        }
                    })]
                },{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    frame:false,
                    id:"idEcPrg4Tele",
                    items:[
                    new com.punto.pen.ComboBox({
                    id:"idPrg4Tele",
                        etiqueta:"Su medicamento le fue entregado",
                        name:"EcPrg4Tele",
                        width:205,
                        allowBlank:false,
                        tabIndex:300,
                        valueField:"idservicio",
                        hiddenName:"hidenEcPrg4Tele",
                        prm:{
                            campo:"servicio",
                            idCampo:"idservicio",
                            autoCarga:true,
                            bnd:5,
                            qry:85
                        }
                    })]
                },
                new com.punto.pen.ComboBox({
                    id:"idEcPrg4CanTele",
                    etiqueta:"El medicamento que recibe (producto, presentación, cantidad), es",
                    name:"EcPrg4",
                    width:205,
                    allowBlank:false,
                    tabIndex:301,
                    valueField:"idrecibe",
                    hiddenName:"hidenEcPrg4CanTele",
                    prm:{
                        campo:"recibe",
                        idCampo:"idrecibe",
                        autoCarga:true,
                        bnd:5,
                        qry:84
                    }
                }),
                new com.punto.pen.ComboBox({
                    id:"idEcPrg5CanTele",
                    etiqueta:"El tiempo de entrega de su medicamento, es",
                    name:"EcPrg5CanTele",
                    width:205,
                    allowBlank:false,
                    tabIndex:302,
                    valueField:"idtiempo",
                    hiddenName:"hidenEcPrg5CanTele",
                    prm:{
                        campo:"tiempo",
                        idCampo:"idtiempo",
                        autoCarga:true,
                        bnd:5,
                        qry:83
                    }
                }),{
                    xtype:"panel",
                    layout:"form",
                    id:"idEcPrg6Canjes",
                    border:false,
                    frame:false,
                    items:[
                    new com.punto.pen.ComboBox({
                    id:"idPrg6Canjes",
                        etiqueta:"El empaque de su medicamento, es",
                        width:205,
                        allowBlank:false,
                        tabIndex:303,
                        name:"EcPrg6Canjes",
                        valueField:"idempaque",
                        hiddenName:"hidenEcPrg6Canjes",
                        prm:{
                            campo:"empaque",
                            idCampo:"idempaque",
                            autoCarga:true,
                            bnd:5,
                            qry:83
                        }
                    })]
                },{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    frame:false,
                    id:"idEcPrg7Tele",
                    items:[
                    new com.punto.pen.ComboBox({
                    id:"idPrg7Tele",
                        etiqueta:"El empaque y condiciones de su medicamento, llegó",
                        width:205,
                        allowBlank:false,
                        tabIndex:303,
                        name:"EcPrg7Tele",
                        valueField:"idempaque",
                        hiddenName:"hidenEcPrg7Tele",
                        prm:{
                            campo:"empaque",
                            idCampo:"idempaque",
                            autoCarga:true,
                            bnd:5,
                            qry:87
                        }
                    })]
                }
                ,{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    frame:false,
                    id:"idEcPrg8Tele",
                    items:[
                    new com.punto.pen.ComboBox({
                    id:"idPrg8Tele",
                        etiqueta:"Recibió usted la bonificación en producto por su compra",
                        width:205,
                        allowBlank:false,
                        tabIndex:303,
                        name:"EcPrg8Tele",
                        valueField:"idbonificacion",
                        hiddenName:"hidenEcPrg8Tele",
                        prm:{
                            campo:"bonificacion",
                            idCampo:"idbonificacion",
                            autoCarga:true,
                            bnd:5,
                            qry:86
                        }
                    })]
                }
                ]
            },{
                xtype:"fieldset",
                title:"¿Algún comentario adicional, que desee aportar?",
                autoHeight:true,
                layout:"form",
                labelAlign:"top",
                items:[{
                    xtype:"textarea",
                    labelSeparator:"",
                    tabIndex:304,
                    name:"EcObservaciones",
                    id:"idEcObservaciones",
                    width:640,
                    height:90,
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
            }
            ]
        }]
    });


    this.regresarEncuestaCalidadCanjes = function(){
        Ext.getCmp('idEcPrg2Tele').setVisible(false);
        Ext.getCmp('idEcPrg3Tele').setVisible(false);
        Ext.getCmp('idEcPrg4Tele').setVisible(false);
        Ext.getCmp('idEcPrg7Tele').setVisible(false);
        Ext.getCmp('idEcPrg8Tele').setVisible(false);
        Ext.getCmp('idPrg2Tele').allowBlank=true;// se sean requeridos
        Ext.getCmp('idPrg3Tele').allowBlank=true;
        Ext.getCmp('idPrg4Tele').allowBlank=true;
        Ext.getCmp('idPrg7Tele').allowBlank=true;
        Ext.getCmp('idPrg8Tele').allowBlank=true;
        return panelFormEncuestaCalidad;
    }

    this.regresarEncuestaCalidadTelemarketing = function(){
        Ext.getCmp('idEcPrg1Canjes').setVisible(false);
        Ext.getCmp('idEcPrg2Canjes').setVisible(false);
        Ext.getCmp('idEcPrg6Canjes').setVisible(false);        
        Ext.getCmp('idPrg1Canjes').allowBlank=true;
        Ext.getCmp('idPrg2Canjes').allowBlank=true;
        Ext.getCmp('idPrg6Canjes').allowBlank=true;
        return panelFormEncuestaCalidad;
    }
}