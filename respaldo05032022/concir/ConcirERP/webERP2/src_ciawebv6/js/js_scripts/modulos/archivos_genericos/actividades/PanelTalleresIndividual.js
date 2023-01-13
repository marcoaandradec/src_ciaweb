
Ext.ns('com.punto.pen');

com.punto.pen.PanelTalleresIndividual = function(argumentos){
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    var idPnl = (argumentos.id==null ? '' : argumentos.id);
    var url = (argumentos.url==null ? contexto+'/TalleresIndividual' : argumentos.url);
    this.titulo = (argumentos.titulo==null ? '' : argumentos.titulo);
    this.border = (argumentos.border==null ? true : argumentos.border);
    this.autoAlto = (this.alto==0 ? true : false);
    var idCnt = (argumentos.idCnt==null ? '' : argumentos.idCnt);
    var idPro= (argumentos.idPro==null ? true : argumentos.idPro);
    var tituloFeil= (argumentos.tituloFeil==null ? 'Talleres' : argumentos.tituloFeil);
    

    this.panelFormTallerIndiv = new Ext.form.FormPanel({
        id: idPnl,
        url: url,
        bodyStyle: "padding:5px 5px 0",
        region: this.reg,
        border:this.border,
        height: this.alto,
        autoScroll:true,
        autoHeight: this.autoAlto,
        items:[{
            xtype:"panel",
            layout:"form",
            border:false,
            items:[{
                    xtype:"fieldset",
                    title:"Paciente",
                    autoHeight:true,
                    items:[{
                            xtype:"textfield",
                            fieldLabel:"Nombre",
                            name:"tlInNombre",
                            width:210,
                            readOnly:true
                    }]
            }]
        },{
            xtype:"fieldset",
            title:"Información",
            autoHeight:true,
            items:[{
            xtype:"panel",
            title:"",
            layout:"column",
            region:"center",
            border:false,
            bodyStyle:"padding: 5px",
            buttonAlign:"center",
            labelAlign:"top",
            items:[{
                xtype:"panel",
                columnWidth:0.5,
                layout:"form",
                border:false,
                bodyStyle:"padding 5px;",
                items:[
                  new com.punto.pen.ComboBox({
                     name:"tlInTema",
                     id:'idTlInTema',
                     etiqueta:'Tema',
                     allowBlank:false,
                     width:165,
                     tabIndex:122,
                     prm:{campo:"tlindtemas",idCampo:'idTlIntemas',autoCarga:true,bnd:5,qry:40},
                     evt:{
                    'select':function(cmb,rec,idx){
                        var cp = Ext.getCmp('idTlInTema');
                          Ext.getCmp('idHidenTlInTema').setValue(cp.getValue())
                        }
                    }
               }),
                {
                    xtype:"hidden",
                    name:"hidenTlInTema",
                    id:"idHidenTlInTema",
                    value:"0"
                    }
                ]
            },{
                xtype:"panel",
                columnWidth:0.25,
                layout:"form",
                border:false,
                bodyStyle:"padding 5px;",
                items:[{
                   xtype:"datefield",
                   fieldLabel:"Fecha",
                   name:"tlInFecha",
                   id:"idTlInFecha",
                   emptyText:'dd/mm/yyyy',
                   allowBlank:false,
                   width:100,
                autoCreate:{
                  tag:"input",
                  maxlength:10
                },
                    enableKeyEvents:true,
                    listeners:{
                      'keypress':function(txtField,e){
                         if((e.getKey()>=47 && e.getKey()<=57)|| e.getKey()==9 || e.getKey()==8){}else{
                               e.stopEvent();
                           }
                    }
                    }
                }]
            }]
          }]
            },{
            xtype:"panel",
            layout:"form",
            border:false,
            items:[{
                    xtype:"fieldset",
                    title:"Observaciones",
                    autoHeight:true,
                    hideLabels:true,
                    items:[{
                        xtype:"textarea",
                        labelSeparator:"",
                        name:"tlInObservaciones",
                        id:"idTlInObservaciones",
                        width:430,
                        height:100,
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
        }
    ]
    });
    return this.panelFormTallerIndiv;
   
}
