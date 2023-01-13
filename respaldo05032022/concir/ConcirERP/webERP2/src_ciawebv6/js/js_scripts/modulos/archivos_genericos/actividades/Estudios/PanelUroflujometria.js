/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("com.punto.pen");
var idOrigen;

com.punto.pen.PanelUroflujometria= function(argumentos){
    var idPnl = (argumentos.id==null ? "" : argumentos.id);
    this.reg = (argumentos.region==null ? "" : argumentos.region);
    var url = (argumentos.url==null ? "" : argumentos.url);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    this.autoAlto = (this.alto==0 ? true : false);
    var idCnt = (argumentos.idCnt==null ? '1' : argumentos.idCnt);
    var obsTF = argumentos.obsTF;
    var titulo = (argumentos.titulo==null ? "" : argumentos.titulo);


    var panelFormUroflujometria= new Ext.FormPanel({
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
            html:"<div align=right><u><a onClick='getEstudios(" + idCnt + ",21,\"Uroflujometría\",\"Estudio de Uroflujometría\")' style='color:#39F' onmouseover='style.cursor=\"hand\"'>Ver Bitacora</a></u></div>",
            Height:20,
            border:false
        },
        {
            xtype:"fieldset",
            title:"Datos",
            autoHeight:true,
            layout:"form",
            collapsed:false,
            labelAlign:"top",
            collapsible:false,
            items:[{
                xtype:"panel",
                layout:"column",
                border:false,
                frame:false,
                labelAlign:"top",
                bodyStyle:"padding:5px",
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
                    },
                    new com.punto.pen.ComboBox({
                        etiqueta:"Flujo Medio",
                        id:'idUjFlujoMedio',
                        name:"UjFlujoMedio",
                        hiddenName:"hiddenFlujoMedio",
                        allowBlank:false,
                        tabIndex:702,
                        prm:{
                            campo:"tipEstAyHo",
                            idCampo:'idTipEstAyHo',
                            autoCarga:true,
                            bnd:5,
                            qry:89
                        },
                        evt:{
                            'select':function(cmb,rec,idx){
                                if(Ext.getCmp('idUjFlujoMedio').getValue()!="" && Ext.getCmp('idUjPicoFlujo').getValue()!=""){
                                    var est=EvaluaUroflujometria(Ext.getCmp('idUjFlujoMedio').getValue(),Ext.getCmp('idUjPicoFlujo').getValue());
                                    Ext.getCmp('idUjResultadoText').setValue(est);
                                }
                            }
                        },
                        listeners:{
                            'specialkey': function(edTobilloDer, e){
                                if (e.keyCode==9 || e.keyCode==13) {
                                    if(Ext.getCmp('idUjFlujoMedio').getValue()!="" && Ext.getCmp('idUjPicoFlujo').getValue()!=""){
                                        var est=EvaluaUroflujometria(Ext.getCmp('idUjFlujoMedio').getValue(),Ext.getCmp('idUjPicoFlujo').getValue());
                                        Ext.getCmp('idUjResultadoText').setValue(est);
                                    }
                                }
                            },
                            'blur':function(){
                                if(Ext.getCmp('idUjFlujoMedio').getValue()!="" && Ext.getCmp('idUjPicoFlujo').getValue()!=""){
                                    var est=EvaluaUroflujometria(Ext.getCmp('idUjFlujoMedio').getValue(),Ext.getCmp('idUjPicoFlujo').getValue());
                                    Ext.getCmp('idUjResultadoText').setValue(est);
                                }
                            }
                        }
                    }),{
                        xtype:"textfield",
                        name:"UjResultadoText",
                        id:'idUjResultadoText',
                        width:165,
                        allowBlank:false,
                        hideLabel:true,
                        tabIndex:703,
                        style:"font-size: 12px; font-family: Arial, Helvetica, sans-serif; background-color:#FF9; color:#06C;",
                        readOnly:true
                    }
                    ]
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
                        id:'idUJFecha',
                        tabIndex:701,
                        name:"UjFecha",
                        width:100,
                        enableKeyEvents:true,
                        listeners:{
                            'blur':function(){
                                var valid=Validafecha(Ext.getCmp('idUJFecha').getValue());
                                if(valid==false){
                                    Ext.MessageBox.alert('Error en Fecha',"La fecha ("+Ext.getCmp('idUJFecha').getValue().format('d/m/Y')+") no puede ser mayor al día de hoy");
                                    Ext.getCmp('idUJFecha').setValue("");
                                }
                            },
                            'keypress':function(txtField,e){
                                if((e.getKey()>=47 && e.getKey()<=57)|| e.getKey()==9 || e.getKey()==8){
                                    if(Ext.getCmp('idUjFlujoMedio').getValue()!="" && Ext.getCmp('idUjPicoFlujo').getValue()!=""){
                                        var est=EvaluaUroflujometria(Ext.getCmp('idUjFlujoMedio').getValue(),Ext.getCmp('idUjPicoFlujo').getValue());
                                        Ext.getCmp('idUjResultadoText').setValue(est);
                                    }
                                }else{
                                    e.stopEvent();
                                }
                            },
                            'specialkey': function(edTobilloDer, e){
                                if (e.keyCode==9 || e.keyCode==13) {
                                    if(Ext.getCmp('idUjFlujoMedio').getValue()!="" && Ext.getCmp('idUjPicoFlujo').getValue()!=""){
                                        var est=EvaluaUroflujometria(Ext.getCmp('idUjFlujoMedio').getValue(),Ext.getCmp('idUjPicoFlujo').getValue());
                                        Ext.getCmp('idUjResultadoText').setValue(est);
                                    }
                                }
                            }
                        },
                        autoCreate:{
                            tag:"input",
                            maxlength:10
                        }
                    },
                    new com.punto.pen.ComboBox({
                        etiqueta:"Pico de Flujo",
                        id:'idUjPicoFlujo',
                        name:"UjPicoFlujo",
                        hiddenName:"hiddenPicoFlujo",
                        allowBlank:false,
                        tabIndex:702,
                        prm:{
                            campo:"tipEstAyHo",
                            idCampo:'idTipEstAyHo',
                            autoCarga:true,
                            bnd:5,
                            qry:89
                        },
                        evt:{
                            'select':function(cmb,rec,idx){
                                if(Ext.getCmp('idUjFlujoMedio').getValue()!="" && Ext.getCmp('idUjPicoFlujo').getValue()!=""){
                                    var est=EvaluaUroflujometria(Ext.getCmp('idUjFlujoMedio').getValue(),Ext.getCmp('idUjPicoFlujo').getValue());
                                    Ext.getCmp('idUjResultadoText').setValue(est);
                                }
                            }
                        },
                        listeners:{
                            'specialkey': function(edTobilloDer, e){
                                if (e.keyCode==9 || e.keyCode==13) {
                                    if(Ext.getCmp('idUjFlujoMedio').getValue()!="" && Ext.getCmp('idUjPicoFlujo').getValue()!=""){
                                        var est=EvaluaUroflujometria(Ext.getCmp('idUjFlujoMedio').getValue(),Ext.getCmp('idUjPicoFlujo').getValue());
                                        Ext.getCmp('idUjResultadoText').setValue(est);
                                    }
                                }
                            },
                            'blur':function(){
                                if(Ext.getCmp('idUjFlujoMedio').getValue()!="" && Ext.getCmp('idUjPicoFlujo').getValue()!=""){
                                    var est=EvaluaUroflujometria(Ext.getCmp('idUjFlujoMedio').getValue(),Ext.getCmp('idUjPicoFlujo').getValue());
                                    Ext.getCmp('idUjResultadoText').setValue(est);
                                }
                            }
                        }
                    }),
                    {
                        xtype:"panel",
                        layout:"fit",
                        id:'idPnlUrSip',
                        border:false,
                        frame:false,
                        items:[
                        {
                            xtype: 'checkbox',
                            boxLabel: 'Px, Salud Integral Prostática',
                            name: 'urSip',
                            inputValue:true
                        }]
                    }
                    ]
                }]
            }]
        } ,{
            xtype:"panel",
            autoHeight:true,
            layout:"form",
            border:false,
            items:[
            {
                html:(modulo==2 ? (mnsSIP==""?"":"<b>Observaciones Agenda: <br/></b>"+mnsSIP+"<br/><br/>"): ""),
                border:false
            }
            ]
        }
        ,{
            xtype:"fieldset",
            title:"Observaciones",
            autoHeight:true,
            layout:"form",
            labelAlign:"top",
            items:[{
                xtype:"textarea",
                labelSeparator:"",
                tabIndex:704,
                name:"UjObservaciones",
                id:"idUjObservaciones",
                width:450,
                height:80,
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
    
    if(modulo!=2 &&(idOrigen==null || idOrigen==undefined)){        
        Ext.getCmp('idPnlUrSip').setVisible(false); 
    }else if(modulo==2 &&(idOrigen==2||idOrigen==3||idOrigen==5||idOrigen==6||idOrigen==8||idOrigen==9||idOrigen==19)){
        Ext.getCmp('idPnlUrSip').setVisible(true); 
    }else{       
        Ext.getCmp('idPnlUrSip').setVisible(false); 
    }
    
    return panelFormUroflujometria;
}

function EvaluaUroflujometria(val,val2){
    var mensaje="";
    if(val==423 || val2==423){
        mensaje="RIESGO HBP";
    }else{
        mensaje="NORMAL, SIN RIESGO HBP";
    }
    return mensaje;
}