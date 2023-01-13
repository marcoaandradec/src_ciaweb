/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("com.punto.pen");

com.punto.pen.PanelPerfilCardiometabolico= function(argumentos){
    var idPnl = (argumentos.id==null ? "" : argumentos.id);
    this.reg = (argumentos.region==null ? "" : argumentos.region);
    var url = (argumentos.url==null ? "" : argumentos.url);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    this.autoAlto = (this.alto==0 ? true : false);
    var idCnt = (argumentos.idCnt==null ? '1' : argumentos.idCnt);
    var obsTF = argumentos.obsTF;
    var titulo = (argumentos.Titulo==null ? "" : argumentos.Titulo);
    var validar = (argumentos.validar==null ? "no" : argumentos.validar);
    var contAsingProd=0;


var PanelPerfilCardiometabolico =  new Ext.Panel({
xtype:"panel",
//title:"Perfil Cardiometabólico",
layout:"form",
bodyStyle:"padding:10px",
border:false,
items:[
    {     
     html:"<div align=right><u><a onClick='getEstudios(" + idCnt + ",1,\"Cardiometabolico\",\"Estudio Perfil Cardiometabolico\")' style='color:#39F' onmouseover='style.cursor=\"hand\"'>Ver Bitacora</a></u></div>",
     Height:20,
     border:false
  },
    {
    xtype:"fieldset",
    title:"Información",
    autoHeight:true,
    layout:"column",
    labelAlign:"top",
    items:[{
        xtype:"panel",
        layout:"form",
        columnWidth:0.58,
        border:false,
        items:[{
        xtype:"textfield",
        fieldLabel:"Nombre",
        name:"pc_Nombre",
        width:200,
        tabIndex:998,
        readOnly:true
        },{
        xtype:"datefield",
        fieldLabel:"Fecha Estudio",
        id:'idpcFecha',
        name:"pc_Fecha",
        tabIndex:1000,
        width:100,
        autoCreate:{
        tag:"input",
        maxlength:10
        },
        allowBlank:false,
        emptyText:"dd/mm/yyyy",
        enableKeyEvents:true,
             listeners:{             
              'blur':function(){
                     var valid=Validafecha(Ext.getCmp('idpcFecha').getValue());
                     if(valid==false){
                      Ext.MessageBox.alert('Error en Fecha',"La fecha ("+Ext.getCmp('idpcFecha').getValue().format('d/m/Y')+") no puede ser mayor al día de hoy");
                      Ext.getCmp('idpcFecha').setValue("");
                     }
              },
              'keypress':function(txtField,e){
                         if((e.getKey()>=47 && e.getKey()<=57)|| e.getKey()==9 || e.getKey()==8){}else{
                               e.stopEvent();
                           }
                    }
             }

      }]
      },{
        xtype:"panel",
        layout:"form",
        columnWidth:0.4,
        border:false,
        items:[{
         xtype:"numberfield",
        fieldLabel:"Edad",
        name:"pc_Edad",
        width:100,
        tabIndex:999,
        readOnly:true
      }]
  }]
  },{
    xtype:"fieldset",
    title:"Resultados",
    autoHeight:true,
    layout:"column",
    labelAlign:"top",
    items:[{
        xtype:"panel",
        layout:"form",
        columnWidth:0.33,
        border:false,
        items:[{
            xtype:"numberfield",
            fieldLabel:"Peso",
            name:"pc_Peso",
            id:"idPeso",
            width:120,
            maxLength:6,
            tabIndex:1001,
            allowBlank:false,
            autoCreate:{
                tag:"input",
                autocomplete:"off",
                maxlength:6
           },enableKeyEvents:true,
             listeners:{
              'specialkey': function(numberField,e){
                  if(e.keyCode==9 || e.keyCode==13){
                      var val=Ext.getCmp('idPeso').getValue();
                      if(val>=1.0 && val<=250.0){
                          clickCalcularIMC();
                      }else{
                        Ext.getCmp('idPeso').setValue("");
                        Ext.MessageBox.alert('Error en Resultado',"Verifique el Peso del Paciente");
                     }
                     }
              },
              'blur':function(){
                      var val=Ext.getCmp('idPeso').getValue();
                      if(val>=1.0 && val<=250.0){
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
                        etiqueta:"Estatura",
                        width:100,
                        tabIndex:1002,
                        name:"pc_Estatura",
                        prm:{campo:"estatura",idCampo:"idestatura",autoCarga:true,bnd:17}
                       , evt:{
                    'select':function(cmb,rec,idx){
                        clickCalcularIMC();
                    }
                }
              })
          ,{
            xtype:"textfield",
            fieldLabel:"Presión Arterial",
            name:"pc_Presion",
            id:"idPresion",
            tabIndex:1004,
            allowBlank:false,
            width:120,
             autoCreate:{
                tag:"input",
                autocomplete:"off",
                maxlength:8
           },

                       enableKeyEvents:true,
                       listeners: {
                    'keypress':function(txtField,e){
                         if((e.getKey()>=47 && e.getKey()<=57)|| e.getKey()==9 || e.getKey()==8){}else{
                               e.stopEvent();
                           }
                    }
                }
          },{
            xtype:"numberfield",
            fieldLabel:"C-HDL",
            name:"pc_Chdl",
            id:"idChdl",
            width:120,
            allowBlank:false,
            maxLength:4,
            tabIndex:1006,
            autoCreate:{
                tag:"input",
                autocomplete:"off",
                maxlength:4
           },enableKeyEvents:true,
             listeners:{
              'specialkey': function(numberField,e){
                    if(e.keyCode==9 || e.keyCode==13){
                     var val=Ext.getCmp('idChdl').getValue();
                      if(val>=20&&val<=250){}else{
                         Ext.getCmp('idChdl').setValue("");
                         Ext.MessageBox.alert('Error en Resultado',"Verifique el C-HDL del Paciente");
                      }
                   }
              }
             }
          },{
            xtype:"numberfield",
            fieldLabel:"Colesterol Total",
            name:"pc_Colesterol",
            id:"idColesterol",
            width:120,
            allowBlank:false,
            maxLength:4,
            tabIndex:1008,
            autoCreate:{
                tag:"input",
                autocomplete:"off",
                maxlength:4
           },enableKeyEvents:true,
             listeners:{
              'specialkey': function(numberField,e){
                    if(e.keyCode==9 || e.keyCode==13){
                     var val=Ext.getCmp('idColesterol').getValue();
                      if(val>=90&&val<=480){}else{
                         Ext.getCmp('idColesterol').setValue("");
                         Ext.MessageBox.alert('Error en Resultado',"Verifique el Colesterol Total del Paciente");
                      }}
              }
             }
          },{
            xtype:"numberfield",
            fieldLabel:"Porcentaje de grasa",
            name:"pc_Grasa",
            id:"idGrasa",
            width:120,
            allowBlank:false,
            maxLength:6,
            tabIndex:1010,
            autoCreate:{
                tag:"input",
                autocomplete:"off",
                maxlength:6
           },enableKeyEvents:true,
             listeners:{
              'specialkey': function(numberField,e){
                    if(e.keyCode==9 || e.keyCode==13){
                     var val=Ext.getCmp('idGrasa').getValue();
                      if(val>=1.0&&val<=200.0){}else{
                         Ext.getCmp('idGrasa').setValue("");
                         Ext.MessageBox.alert('Error en Resultado',"Verifique el Porcentaje de grasa");
                      }}
              }
             }
          }]
      },{
        xtype:"panel",
        columnWidth:0.2,
        layout:"form",
        border:false,
        items:[{
            height:25,
            border:false
          },{
            html:"Kg",
            bodyStyle:"font-size: 11px;font-family: Arial, Helvetica, sans-serif; font-weight: bold;",
            height:20,
            border:false
          },{
            height:27,
            border:false
          },{
            html:"cm",
            bodyStyle:"font-size: 11px;font-family: Arial, Helvetica, sans-serif; font-weight: bold;",
            height:20,
            border:false
          },{
            height:25,
            border:false
          },{
            html:"mmHg",
            bodyStyle:"font-size: 11px;font-family: Arial, Helvetica, sans-serif; font-weight: bold;",
            height:20,
            border:false
          },{
            height:26,
            border:false
          },{
            html:"mg/dl",
            bodyStyle:"font-size: 11px;font-family: Arial, Helvetica, sans-serif; font-weight: bold;",
            height:20,
            border:false
          },{
            height:26,
            border:false
          },{
            html:"mg/dl",
            bodyStyle:"font-size: 11px;font-family: Arial, Helvetica, sans-serif; font-weight: bold;",
            height:20,
            border:false
          },{
            height:26,
            border:false
          },{
            html:"%",
            bodyStyle:"font-size: 11px;font-family: Arial, Helvetica, sans-serif; font-weight: bold;",
            height:20,
            border:false
          }]
      },
      {
        xtype:"panel",
        layout:"form",
        columnWidth:0.37,
        border:false,
        items:[{
            xtype:"numberfield",
            fieldLabel:"IMC",
            name:"pc_Imc",
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
          },{
            xtype:"numberfield",
            fieldLabel:"Circunferencia Abdominal",
            name:"pc_Circunferencia",
            id:"idCircunferencia",
            width:120,
            maxLength:4,
            tabIndex:1003,
            allowBlank:false,
            autoCreate:{
                tag:"input",
                autocomplete:"off",
                maxlength:4
           },enableKeyEvents:true,
             listeners:{
              'specialkey': function(numberField,e){
                    if(e.keyCode==9 || e.keyCode==13){
                     var val=Ext.getCmp('idCircunferencia').getValue();
                      if(val>=20&&val<=400){}else{
                         Ext.getCmp('idCircunferencia').setValue("");
                         Ext.MessageBox.alert('Error en Resultado',"Verifique la Circunferencia abdominal");
                      }}
              }
             }
          },{
            xtype:"numberfield",
            fieldLabel:"Glucosa en Ayuno",
            name:"pc_Glucosa",
            id:"idGlucosa",
            width:120,
            maxLength:4,
            tabIndex:1005,
            allowBlank:false,
            autoCreate:{
                tag:"input",
                autocomplete:"off",
                maxlength:4
           },enableKeyEvents:true,
             listeners:{
              'specialkey': function(numberField,e){
                    if(e.keyCode==9 || e.keyCode==13){
                     var val=Ext.getCmp('idGlucosa').getValue();
                      if(val>=30&&val<=800){}else{
                         Ext.getCmp('idGlucosa').setValue("");
                         Ext.MessageBox.alert('Error en Resultado',"Verifique la Glucosa en ayuno del Paciente");
                      }}
              }
             }
          },{
            xtype:"numberfield",
            fieldLabel:"C-LDL",
            name:"pc_Cldl",
            id:"idCldl",
            width:120,
            allowBlank:false,
            maxLength:4,
            tabIndex:1007,
            autoCreate:{
                tag:"input",
                autocomplete:"off",
                maxlength:4
           },enableKeyEvents:true,
             listeners:{
             'specialkey': function(numberField,e){
                    if(e.keyCode==9 || e.keyCode==13){
                     var val=Ext.getCmp('idCldl').getValue();
                      if(val>=50&&val<=330){}else{
                         Ext.getCmp('idCldl').setValue("");
                         Ext.MessageBox.alert('Error en Resultado',"Verifique el C-LDL del Paciente");
                      }}
              }
             }
          },{
            xtype:"numberfield",
            fieldLabel:"Triglicéridos",
            name:"pc_Trigliceridos",
            id:"idTrigliceridos",
            width:120,
            allowBlank:false,
            maxLength:4,
            tabIndex:1009,
            autoCreate:{
                tag:"input",
                autocomplete:"off",
                maxlength:4
           }
           ,enableKeyEvents:true,
             listeners:{
             'specialkey': function(numberField,e){
                    if(e.keyCode==9 || e.keyCode==13){
                     var val=Ext.getCmp('idTrigliceridos').getValue();
                      if(val>=20&&val<=800){}else{
                         Ext.getCmp('idTrigliceridos').setValue("");
                         Ext.MessageBox.alert('Error en Resultado',"Verifique los Triglicéridos");
                      }}
              }
             }
          }]
      },{
        xtype:"panel",
        columnWidth:0.1,
        layout:"form",
        border:false,
        items:[{
            height:25,
            border:false
          },{
            html:"Kg/m²",
            bodyStyle:"font-size: 11px;font-family: Arial, Helvetica, sans-serif; font-weight: bold;",
            height:20,
            border:false
          },{
            height:27,
            border:false
          },{
            html:"cm",
            bodyStyle:"font-size: 11px;font-family: Arial, Helvetica, sans-serif; font-weight: bold;",
            height:20,
            border:false
          },{
            height:27,
            border:false
          },{
            html:"mg/dl",
            bodyStyle:"font-size: 11px;font-family: Arial, Helvetica, sans-serif; font-weight: bold;",
            height:20,
            border:false
          },{
            height:26,
            border:false
          },{
            html:"mg/dl",
            bodyStyle:"font-size: 11px;font-family: Arial, Helvetica, sans-serif; font-weight: bold;",
            height:20,
            border:false
          },{
            height:26,
            border:false
          },{
            html:"mg/dl",
            bodyStyle:"font-size: 11px;font-family: Arial, Helvetica, sans-serif; font-weight: bold;",
            height:20,
            border:false
          },{
            height:26,
            border:false
          }]
      }
]
  },{
    xtype:"fieldset",
    title:"Observaciones",
    autoHeight:true,
    layout:"form",
    labelAlign:"top",
    items:[{
            xtype:"textarea",
            labelSeparator:"",
            tabIndex:1011,
            name:"pc_Observaciones",
            id:"idObservaciones",
            width:400,
            height:100,
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
});

    var panelFormPerfilCardiometabolico= new Ext.form.FormPanel({
        id:idPnl,
        title:titulo,
        url: url,
        bodyStyle: "padding:5px 5px 0",
        region: this.reg,
        height: this.alto,
        autoHeight: this.autoAlto,
        autoScroll: (!this.autoAlto),
        border:false,
        items:[]
    });

     this.crearFichaPerfilCardiometabolico = function(){
//      panelFormPerfilCardiometabolico.add(panelCardiometabolicoBotonGuardar);
        panelFormPerfilCardiometabolico.add(PanelPerfilCardiometabolico);
//      panelFormPerfilCardiometabolico.add(panelCardiometabolicoGuardar);
	panelFormPerfilCardiometabolico.doLayout();
        return panelFormPerfilCardiometabolico;
    }
}


    function calculaIMC(peso,altura){
        var alt=Ext.util.Format.substr(altura,0,1);
        var alt2=Ext.util.Format.substr(altura,1,3);
        var altur=alt+"."+alt2;
        var mensaje=peso/(altur*altur);
        var mns=Ext.util.Format.substr(mensaje,0,5);
        return mns;
    }

 function clickCalcularIMC(){
        if(Ext.getCmp('idPeso').getValue()!="" && Ext.getCmp('idEstatura').getValue()!=""){
            var pcPeso = Ext.getCmp('idPeso').getValue();
            var pcEstatura = Ext.getCmp('idEstatura').getValue();
            var Mns=calculaIMC(pcPeso,pcEstatura);
            Ext.getCmp('idImc').setValue(Mns);
        }
         if(Ext.getCmp('idPeso').getValue()=="" || Ext.getCmp('idEstatura').getValue()==""){
            Ext.getCmp('idImc').setValue("");
        }
    }