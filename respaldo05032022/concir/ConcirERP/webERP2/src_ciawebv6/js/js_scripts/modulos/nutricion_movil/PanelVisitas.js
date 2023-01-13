Ext.ns('com.punto.pen');

com.punto.pen.PanelVisitas = function(argumentos){
    var idPnl = (argumentos.id==null ? '' : argumentos.id);
    var url = (argumentos.url==null ? '' : argumentos.url);
    this.autoAlto = (this.height==0 ? true : false);
    this.autoScroll = (argumentos.autoScroll==null ? false : argumentos.autoScroll);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);

    var panelVisitas= new Ext.FormPanel({
        id:idPnl,
        url: url,
        bodyStyle: "padding:5px 5px 0",
        region: this.reg,
        border:false,
        height: this.alto,
        autoHeight: this.autoAlto,
        autoScroll: (!this.autoAlto),
        items:[{
            xtype:"panel",
            border:false,
            layout:"form",
            labelWidth:80,
            items:[{
                xtype:"fieldset",
                title:"Datos",
                autoHeight:true,
                layout:"column",
                items:[{
                    xtype:"panel",
                    layout:"form",
                    columnWidth:0.55,
                    border:false,
                    items:[{
                        xtype:"textfield",
                        fieldLabel:"Paciente",
                        name:"anPaciente",
                        width:250,
                        readOnly:true
                    }]
                },{
                    xtype:"panel",
                    columnWidth:0.45,
                    border:false,
                    layout:"form",
                    labelWidth:130,
                    items:[{
                        xtype:"datefield",
                        fieldLabel:"Fecha de Visita",
                        id:"idFechaVisita",
                        name:"FechaVisita",
                        width:100,
                        allowBlank:false,
                        emptyText:"dd/mm/yyyy",
                        autoCreate:{
                            tag:"input",
                            maxlength:10
                        },
                        enableKeyEvents:true,
                        listeners:{
                            'blur':function(){
                                var valid=Validafecha(Ext.getCmp('idFechaVisita').getValue());
                                if(valid==false){
                                    Ext.MessageBox.alert('Error en Fecha',"La fecha ("+Ext.getCmp('idFechaVisita').getValue().format('d/m/Y')+") no puede ser mayor al día de hoy");
                                    Ext.getCmp('idFechaVisita').setValue("");
                                }
                            },
                            'keypress':function(txtField,e){
                                if((e.getKey()>=47 && e.getKey()<=57)|| e.getKey()==9 || e.getKey()==8){}else{
                                    e.stopEvent();
                                }
                            }
                        }
                    }]
                }]
            },{
                xtype:"fieldset",
                title:"Observaciones",
                autoHeight:true,
                labelAlign:"top",
                items:[{
                    xtype:"textarea",
                    labelSeparator:"",
                    name:"ObservacionesVisita",
                    width:650,
                    height:70,
                    allowBlank:false,
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
        }]
    });
    return panelVisitas;
}




