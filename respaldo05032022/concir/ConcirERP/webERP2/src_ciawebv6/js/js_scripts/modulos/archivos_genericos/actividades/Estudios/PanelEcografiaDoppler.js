/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("com.punto.pen");

com.punto.pen.PanelEcografiaDoppler= function(argumentos){
    var idPnl = (argumentos.id==null ? "" : argumentos.id);
    this.reg = (argumentos.region==null ? "" : argumentos.region);
    var url = (argumentos.url==null ? "" : argumentos.url);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    this.autoAlto = (this.alto==0 ? true : false);
    var idCnt = (argumentos.idCnt==null ? '1' : argumentos.idCnt);
    var obsTF = argumentos.obsTF;
    var titulo = (argumentos.Titulo==null ? "" : argumentos.Titulo);
    var contAsingProd=0;


var PanelEcografiaDoppler =  new Ext.Panel({
    xtype:"panel",
//title:"Ecografía Doppler",
autoWith:true,
style:"padding:5px",
layout:"form",
border:false,
items:[
     {     
     html:"<div align=right><u><a onClick='getEstudios(" + idCnt + ",20,\"Doppler\",\"Estudio Ecografía Doppler\")' style='color:#39F' onmouseover='style.cursor=\"hand\"'>Ver Bitacora</a></u></div>",
     Height:20,
     border:false
  },
    {
    xtype:"fieldset",
    title:"Reporte",
    autoHeight:true,
    layout:"column",
    items:[{
        xtype:"panel",
        layout:"form",
        labelAlign:"top",
        columnWidth:0.62,
        border:false,
        items:[{
            xtype:"textfield",
            fieldLabel:"Nombre",
            name:"edNombre",
            width:200,
            readOnly:true
          },{
            height:10,
            border:false
          },{
            xtype:"textfield",
            fieldLabel:"Resultado Índice Tobillo-Brazo lado izquierdo",
            allowBlank:false,
            name:"edTobilloIzq",
            id:"idTobilloIzq",
            width:50,
            maxlength:5,
            autoCreate:{
                tag:"input",
                autocomplete:"off",
                maxlength:5
           },enableKeyEvents:true,
             listeners:{
              'keypress':function(txtField,e){
//                  alert(e.getKey());
                         if((e.getKey()>=46 && e.getKey()<=57) || e.getKey()==37 || e.getKey()==39 || e.getKey()==9 || e.getKey()==8 || e.keyCode==13){}else{
                               e.stopEvent();
                       }
                    },
              'specialkey': function(numberField,e){
                  if(e.keyCode==9 || e.keyCode==13){
                     clickCalcular();
                     }
              }, 'blur':function(){
                     clickCalcular();
                }
             }
          },{
            height:10,
            border:false
          },{
            xtype:"textfield",
            fieldLabel:"Resultado Índice Tobillo-Brazo lado derecho",
            name:"edTobilloDer",
            id:"idTobilloDer",
            allowBlank:false,
            width:50,
            maxlength:5,
            autoCreate:{
                tag:"input",
                autocomplete:"off",
                maxlength:5
           },
              listeners:{
              'keypress':function(txtField,e){
                         if((e.getKey()>=46 && e.getKey()<=57) || e.getKey()==37 || e.getKey()==39 || e.getKey()==9 || e.getKey()==8 || e.keyCode==13){}else{
                               e.stopEvent();
                       }
                    },
              'specialkey': function(numberField,e){
                  if(e.keyCode==9 || e.keyCode==13){
                     clickCalcular();
                     }
              }, 'blur':function(){
                     clickCalcular();
                }
             }
          }]
      },{
        xtype:"panel",
        layout:"form",
        labelAlign:"top",
        columnWidth:0.35,
        border:false,
        items:[{
           xtype:"datefield",
        fieldLabel:"Fecha Estudio",
        id:'idEdFecha',
        name:"edFecha",
        width:100,
        readOnly:false,
        allowBlank:false,
        emptyText:"dd/mm/yyyy",
               enableKeyEvents:true,
               listeners:{
              'blur':function(){
                     var valid=Validafecha(Ext.getCmp('idEdFecha').getValue());
                     if(valid==false){
                      Ext.MessageBox.alert('Error en Fecha',"La fecha ("+Ext.getCmp('idEdFecha').getValue().format('d/m/Y')+") no puede ser mayor al día de hoy");
                      Ext.getCmp('idEdFecha').setValue("");
                     }
              },
              'keypress':function(txtField,e){
                         if((e.getKey()>=47 && e.getKey()<=57)|| e.getKey()==9 || e.getKey()==8){}else{
                               e.stopEvent();
                           }
                    }
             },
                autoCreate:{
                  tag:"input",
                  maxlength:10
                }
          },{
            height:15,
            html:"Resultados Valores EAP",
            style:"font-size: 11px;font-family: Arial, Helvetica, sans-serif; font-weight: bold;",
            border:false
          },{
            xtype:"textfield",
            labelSeparator:"",
            name:"MsnIzq",
            id:"IdMsnIzq",
            height:23,
            readOnly:true,
            allowBlank:false,
            style:"font-size: 12px;font-family: Arial, Helvetica, sans-serif; background-color:#FF9; color:#06C;"
          },{
            height:5,
            border:false
          },{
            xtype:"textfield",
            labelSeparator:"",
            name:"MsnDer",
            id:"IdMsnDer",
            allowBlank:false,
            height:23,
            readOnly:true,
            style:"font-size: 12px; font-family: Arial, Helvetica, sans-serif; background-color:#FF9; color:#06C;"
          }]
      }]
  }]
});

    var panelFormEcografiaDoppler= new Ext.FormPanel({
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

     this.crearFichaEcografiaDoppler = function(){
        panelFormEcografiaDoppler.add(PanelEcografiaDoppler);        
	panelFormEcografiaDoppler.doLayout();
        return panelFormEcografiaDoppler;
    }

    function clickCalcular(){
        var frm = Ext.getCmp(idPnl).getForm();
        if(frm.findField('edTobilloIzq').getValue()!="" || frm.findField('edTobilloIzq').getValue()=='0'){
            var tobIzq = Ext.getCmp('idTobilloIzq').getValue();
            var Mns=calcula(tobIzq);
            if(Mns==""){
                Ext.getCmp('idTobilloIzq').setValue("");
                Ext.MessageBox.alert('Error en Resultado',"Verifique el Resultado del estudio en Tobillo izquierdo, el valor no es correcto");
            }else{
                Ext.getCmp('IdMsnIzq').setValue(Mns);
            }
        }
        if(frm.findField('edTobilloDer').getValue()!="" || frm.findField('edTobilloDer').getValue()=='0'){
            var tobDer = Ext.getCmp('idTobilloDer').getValue();
            var Mns2=calcula(tobDer);
            if(Mns2==""){
                Ext.getCmp('idTobilloDer').setValue("");
                Ext.MessageBox.alert('Error en Resultado',"Verifique el Resultado del estudio en Tobillo Derecho, el valor no es correcto");
            }else{
               Ext.getCmp('IdMsnDer').setValue(Mns2);
            }
        }
        if(frm.findField('edTobilloIzq').getValue()==""){
            Ext.getCmp('IdMsnIzq').setValue("");
        }
        if(frm.findField('edTobilloDer').getValue()==""){
            Ext.getCmp('IdMsnDer').setValue("");
        }
    }

    function calcula(val){
        var mensaje="";
        if(val>1.3){
            mensaje="ANORMAL-VASOS NO COMPRESIBLE";
        }else if(val>0.90 && val<=1.3){
            mensaje="LIMÍTROFE-NORMAL";
        }else if(val>0.40 && val<=0.90){
            mensaje="EAP LEVE A MODERADA";
        }else if(val>=0.0 && val<=0.40){
            mensaje="EAP SEVERA";
        }else if(val==0){
            mensaje="EAP SEVERA"
        }else {
            mensaje="Valor 0";

        }

        return mensaje;
    }

}
