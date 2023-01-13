/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("com.punto.pen");

com.punto.pen.PanelPesoTalla= function(argumentos){
    var idPnl = (argumentos.id==null ? "" : argumentos.id);
    this.reg = (argumentos.region==null ? "" : argumentos.region);
    var url = (argumentos.url==null ? "" : argumentos.url);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    this.autoAlto = (this.alto==0 ? true : false);
    var idCnt = (argumentos.idCnt==null ? '1' : argumentos.idCnt);
    var obsTF = argumentos.obsTF;
    var titulo = (argumentos.titulo==null ? "" : argumentos.titulo);


    var panelFormPesoTalla= new Ext.FormPanel({
        id:idPnl,
        title:titulo,
        url: url,
        bodyStyle: "padding:5px 5px 0",
        region: this.reg,
        border:false,
        height: this.alto,
        autoHeight: this.autoAlto,
        autoScroll: (!this.autoAlto),
        items:[ {
            html:"<div align=right><u><a onClick='getEstudios(" + idCnt + ",209,\"Peso y Talla\",\"Estudio Peso y Talla\")' style='color:#39F' onmouseover='style.cursor=\"hand\"'>Ver Bitacora</a></u></div>",
            Height:20,
            border:false
        },{
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
                    fieldLabel:"Peso",
                    name:"PTPeso",
                    id:"idPeso",
                    width:120,
                    maxLength:6,
                    tabIndex:1001,
                    allowBlank:false,
                    autoCreate:{
                        tag:"input",
                        autocomplete:"off",
                        maxlength:6
                    },
                    enableKeyEvents:true,
                    listeners:{
                        'specialkey': function(numberField,e){
                            if(e.keyCode==9 || e.keyCode==13){
                                var val=Ext.getCmp('idPeso').getValue();
                                if(val>=5.0 && val<=250.0){
                                    clickCalcularIMC();
                                }else{
                                    Ext.getCmp('idPeso').setValue("");
                                    Ext.MessageBox.alert('Error en Resultado',"Verifique el Peso del Paciente");
                                }
                            }
                        },
                        'blur':function(){
                            var val=Ext.getCmp('idPeso').getValue();
                            if(val>=5.0 && val<=250.0){
                                clickCalcularIMC();
                            }else{
                                Ext.getCmp('idPeso').setValue("");
                                Ext.MessageBox.alert('Error en Resultado',"Verifique el Peso del Paciente");
                            }
                        }
                    }
                },
                new com.punto.pen.ComboBox({
                    id:"idEstatura",
                    etiqueta:"Talla",
                    width:100,
                    tabIndex:1002,
                    name:"PTEstatura",
                    prm:{
                        campo:"estatura",
                        idCampo:"idestatura",
                        autoCarga:true,
                        bnd:17
                    }
                    ,
                    evt:{
                        'select':function(cmb,rec,idx){
                            clickCalcularIMC();
                        }
                    }
                })]
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
                    id:'idPTFecha',
                    tabIndex:701,
                    name:"PTFecha",
                    width:100,
                    enableKeyEvents:true,
                    listeners:{
                        'blur':function(){
                            var valid=Validafecha(Ext.getCmp('idPTFecha').getValue());
                            if(valid==false){
                                Ext.MessageBox.alert('Error en Fecha',"La fecha ("+Ext.getCmp('idPTFecha').getValue().format('d/m/Y')+") no puede ser mayor al día de hoy");
                                Ext.getCmp('idPTFecha').setValue("");
                            }
                        },
                        'keypress':function(txtField,e){
                            if((e.getKey()>=47 && e.getKey()<=57)|| e.getKey()==9 || e.getKey()==8){
                                if(Ext.getCmp('idPeso').getValue()!="" && Ext.getCmp('idEstatura').getValue()!=""){
                                    clickCalcularIMC();
                                }
                            }else{
                                e.stopEvent();
                            }
                        },
                        'specialkey': function(edTobilloDer, e){
                            if (e.keyCode==9 || e.keyCode==13) {
                                if(Ext.getCmp('idPeso').getValue()!="" && Ext.getCmp('idEstatura').getValue()!=""){
                                    clickCalcularIMC();
                                }
                            }
                        }
                    },
                    autoCreate:{
                        tag:"input",
                        maxlength:10
                    }
                },{
                    height:15,
                    border:false
                },{
                    xtype:"numberfield",
                    fieldLabel:"IMC",
                    name:"PTImc",
                    id:"idImc",
                    width:120,
                    maxLength:5,
                    allowBlank:false,
                    readOnly:true,
                    style:"font-size: 12px;font-family: Arial, Helvetica, sans-serif; background-color:#FF9; color:#06C;",
                    autoCreate:{
                        tag:"input",
                        autocomplete:"off",
                        maxlength:5
                    }
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
                name:"PTObservaciones",
                id:"idPTObservaciones",
                width:450,
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
    });
    return panelFormPesoTalla;
}
