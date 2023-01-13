Ext.ns('com.punto.pen');

com.punto.pen.PanelVacunas = function(argumentos){
    var idPnl = (argumentos.id==null ? '' : argumentos.id);
    var url = (argumentos.url==null ? '' : argumentos.url);
    var titulo = (argumentos.titulo==null ? '' : argumentos.titulo);
    this.autoAlto = (this.height==0 ? true : false);
    this.autoScroll = (argumentos.autoScroll==null ? false : argumentos.autoScroll);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);

    var pnlVacunas = new Ext.Panel({
        layout:"form",
        bodyStyle:"padding:5px",
        border:false,
        items:[{
            xtype:"fieldset",
               title:"Información",
               autoHeight:true,
               items:[{
                       xtype:"textfield",
                       fieldLabel:"Nombre",
                       name:"vcnNombre",
                       width:210,
                       readOnly:true
                      }
                  ]
        },{
            xtype:"fieldset",
            title:"Observaciones",
            autoHeight:true,
            hideLabels:true,
            labelAlign:"top",
            items:[{
                    xtype:"textarea",
                    name:"vcnObservacion",
                    id:"idvcnObservacion",
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
                },{
                xtype:"hidden",
                name:"hidenVcnTipoVacuna",
                id:'idHidenVcnTipoVacuna',
                value:""
                }]
        }]
    });

    var panelRegVacunas= new Ext.FormPanel({
        id:idPnl,
        title:titulo,
        url: url,
        style: "padding:5px 5px 0",
        region: this.reg,
        border:false,
        height: this.alto,
        autoHeight: this.autoAlto,
        autoScroll: (!this.autoAlto),
        items:[]
    });

    this.crearFichaInfluenza = function(){
        panelRegVacunas.add(pnlVacunas)
        FichaInfluenza();
        panelRegVacunas.doLayout();
        return panelRegVacunas;
    }
    this.crearFichaNeumococo = function(){
        panelRegVacunas.add(pnlVacunas)
        FichaNeumococo();
        panelRegVacunas.doLayout();
        return panelRegVacunas;
    }

    function FichaInfluenza(){
        Ext.getCmp("idHidenVcnTipoVacuna").setValue("Influenza");
    }
    function FichaNeumococo(){
        Ext.getCmp("idHidenVcnTipoVacuna").setValue("Neumococo");
    }

}

