/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("com.punto.pen");

com.punto.pen.PanelTrigliceridos= function(argumentos){
    var idPnl = (argumentos.id==null ? "" : argumentos.id);
    this.reg = (argumentos.region==null ? "" : argumentos.region);
    var url = (argumentos.url==null ? "" : argumentos.url);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    this.autoAlto = (this.alto==0 ? true : false);
    var idCnt = (argumentos.idCnt==null ? '1' : argumentos.idCnt);
    var obsTF = argumentos.obsTF;
    var titulo = (argumentos.titulo==null ? "" : argumentos.titulo);


    var panelFormTrigliceridos= new Ext.FormPanel({
        id:idPnl,
        title:titulo,
        url: url,
        bodyStyle: "padding:5px 5px 0",
        region: this.reg,
        border:false,
        height: this.alto,
        autoHeight: this.autoAlto,
        autoScroll: (!this.autoAlto),
        items:[
        {
            html:"<div align=right><u><a onClick='getEstudios(" + idCnt + ",189,\"Trigliceridos\",\"Estudio Trigliceridos\")' style='color:#39F' onmouseover='style.cursor=\"hand\"'>Ver Bitacora</a></u></div>",
            Height:20,
            border:false
        },
        {
            xtype:"fieldset",
            title:"Datos",
            autoHeight:true,
            layout:"column",
            collapsed:false,
            collapsible:false,
            items:[{
                xtype:"panel",
                layout:"form",
                columnWidth:0.60,
                border:false,
                frame:false,
                labelAlign:"top",
                bodyStyle:"padding:5px",
                items:[{
                    xtype:"textfield",
                    fieldLabel:"Nombre",
                    name:"tgNombre",
                    width:250,
                    readOnly:true
                },{
                    xtype:"numberfield",
                    fieldLabel:"Resultado",
                    name:"TgResultado",
                    id:'idTgResultado',
                    allowBlank:false,
                    maxLength:5,
                    width:100,
                    tabIndex:702,
                    autoCreate:{
                        tag:"input",
                        autocomplete:"off",
                        maxlength:5
                    },
                    listeners:{
                        'specialkey': function(edTobilloDer, e){
                            if (e.keyCode==9 || e.keyCode==13) {
                                if(Ext.getCmp('idTgResultado').getValue()!=""){
                                    var est=EvaluaTrigliceridos(Ext.getCmp('idTgResultado').getValue());
                                    Ext.getCmp('idTgResultadoText').setValue(est);
                                }
                            }
                        },
                        'blur':function(){
                            if(Ext.getCmp('idTgResultado').getValue()!=""){
                                var est=EvaluaTrigliceridos(Ext.getCmp('idTgResultado').getValue());
                                Ext.getCmp('idTgResultadoText').setValue(est);
                            }
                        }
                    }
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
                    xtype:"datefield",
                    fieldLabel:"Fecha Estudio",
                    readOnly:false,
                    allowBlank:false,
                    emptyText:"dd/mm/yyyy",
                    id:'idTgFecha',
                    tabIndex:701,
                    name:"tgFecha",
                    width:100,
                    enableKeyEvents:true,
                    listeners:{
                        'blur':function(){
                            var valid=Validafecha(Ext.getCmp('idTgFecha').getValue());
                            if(valid==false){
                                Ext.MessageBox.alert('Error en Fecha',"La fecha ("+Ext.getCmp('idTgFecha').getValue().format('d/m/Y')+") no puede ser mayor al día de hoy");
                                Ext.getCmp('idTgFecha').setValue("");
                            }
                        },
                        'keypress':function(txtField,e){
                            if((e.getKey()>=47 && e.getKey()<=57)|| e.getKey()==9 || e.getKey()==8){
                                if(Ext.getCmp('idTgResultado').getValue()!=""){
                                    var est=EvaluaTrigliceridos(Ext.getCmp('idTgResultado').getValue());
                                    Ext.getCmp('idTgResultadoText').setValue(est);
                                }
                            }else{
                            e.stopEvent();
                        }
                    },
                    'specialkey': function(edTobilloDer, e){
                        if (e.keyCode==9 || e.keyCode==13) {
                            if(Ext.getCmp('idTgResultado').getValue()!=""){
                                var est=EvaluaTrigliceridos(Ext.getCmp('idTgResultado').getValue());
                                Ext.getCmp('idTgResultadoText').setValue(est);
                            }
                        }
                    }
                },
                autoCreate:{
                    tag:"input",
                    maxlength:10
                }
            },{ height:15,
                       border:false
                   },{
                xtype:"textfield",
                name:"tgResultadoText",
                id:'idTgResultadoText',
                width:165,
                allowBlank:false,
                hideLabel:true,
                tabIndex:703,
                style:"font-size: 12px; font-family: Arial, Helvetica, sans-serif; background-color:#FF9; color:#06C;",
                readOnly:true
            }]
        }]
    },{
        xtype:"fieldset",
        title:"Observaciones",
        autoHeight:true,
        layout:"form",
        labelAlign:"top",
        items:[{
            xtype:"textarea",
            labelSeparator:"",
            tabIndex:704,
            name:"TgObservaciones",
            id:"idTgObservaciones",
            width:450,
            height:100,
            //            allowBlank:false,
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
return panelFormTrigliceridos;
}

function EvaluaTrigliceridos(val){
    var mensaje="";
    if(val>=500 && val<=1500){
        mensaje="MUY ALTO";
    }else if(val>=200 && val<=499){
        mensaje="ALTO";
    }else if(val>=151 && val<=199){
        mensaje="LIMITROFE ALTO";
    }else if(val>=10 && val<=150){
        mensaje="NORMAL";
    }else{
        mensaje="";
    }
    return mensaje;
}