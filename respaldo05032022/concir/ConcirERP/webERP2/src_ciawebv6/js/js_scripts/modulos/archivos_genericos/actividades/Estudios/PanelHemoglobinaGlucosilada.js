/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("com.punto.pen");

com.punto.pen.PanelHemoglobinaGlucosilada= function(argumentos){
    var idPnl = (argumentos.id==null ? "" : argumentos.id);
    this.reg = (argumentos.region==null ? "" : argumentos.region);
    var url = (argumentos.url==null ? "" : argumentos.url);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    this.autoAlto = (this.alto==0 ? true : false);
    var idCnt = (argumentos.idCnt==null ? '1' : argumentos.idCnt);
    var obsTF = argumentos.obsTF;
    var titulo = (argumentos.titulo==null ? "" : argumentos.titulo);


var PanelHemoglobina =  new Ext.Panel({
      xtype:"form",
      id:'idPanelConHemo',
      bodyStyle:"padding:5px",
      frame:false,
      border:false,
items:[
    {     
     html:"<div align=right><u><a onClick='getEstudios(" + idCnt + ",3,\"Glucosilada\",\"Estudio Hemoglobina Glucosilada\")' style='color:#39F' onmouseover='style.cursor=\"hand\"'>Ver Bitacora</a></u></div>",
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
        columnWidth:0.55,
        border:false,
        frame:false,
        labelAlign:"top",
        bodyStyle:"padding:5px",
        items:[{
            xtype:"textfield",
            fieldLabel:"Nombre",
            name:"hgNombre",
            width:200,
            readOnly:true
      },{
            html:"Resultados",
            bodyStyle:"font-size: 12px;font-family: Arial, Helvetica, sans-serif;",
            border:false
          },{
            xtype:"numberfield",
            fieldLabel:"HbA1c  (%)",
            name:"hgHba1c",
            id:'idHba1c',
            allowBlank:false,
            maxLength:5,
            width:100,
            autoCreate:{
                tag:"input",
                autocomplete:"off",
                maxlength:5
           },
             listeners:{
                 'specialkey': function(edTobilloDer, e){
                    if (e.keyCode==9 || e.keyCode==13) {
                        var ht=Ext.getCmp('idHba1c').getValue();
                     if(ht>0.1 && ht<=30.0){}else{
                       Ext.getCmp('idHba1c').setValue("");
                       Ext.MessageBox.alert('Error en Resultado',"Verifique el Resultado del estudio, el valor no es correcto");
                      }
                    }
              },
                 'blur':function(){
                      var ht=Ext.getCmp('idHba1c').getValue();
                     if(ht>0.1 && ht<=30.0){}else{
                       Ext.getCmp('idHba1c').setValue("");
                       Ext.MessageBox.alert('Error en Resultado',"Verifique el Resultado del estudio, el valor no es correcto");
                      }
                 }
             }
      }]},{
      xtype:"panel",
        layout:"form",
        columnWidth:0.45,
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
            id:'idHgFecha',
            name:"hgFecha",
            width:100,
               enableKeyEvents:true,
               listeners:{
              'blur':function(){
                     var valid=Validafecha(Ext.getCmp('idHgFecha').getValue());
                     if(valid==false){
                      Ext.MessageBox.alert('Error en Fecha',"La fecha ("+Ext.getCmp('idHgFecha').getValue().format('d/m/Y')+") no puede ser mayor al día de hoy");
                      Ext.getCmp('idHgFecha').setValue("");
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
            bodyStyle:"font-size: 12px;font-family: Arial, Helvetica, sans-serif;",
            border:false,
            height:25
          },{
              xtype:"panel",
              height:40,
              border:false,
              width:180,
              autoLoad:{url:contexto+'/Hemoglobina',params:{bnd:3,'idCnt':idCnt}}
          }]
      }]
  },{
    xtype:"fieldset",
    autoHeight:true,
    layout:"column",
    collapsed:false,
    collapsible:false,
    items:[{
        xtype:"panel",
        layout:"form",
        columnWidth:0.9,
        border:false,
        frame:false,
        labelAlign:"center",
        bodyStyle:"padding:5px",
        items:[{
            html:"Correlación entre el nivel de HbA1C y los niveles de glucosa sanguínea en pruebas múltiples durante 2 - 3 meses.",
            border:false,
            bodyStyle:"font-size: 12px;font-family: Arial, Helvetica, sans-serif;"
          },
          {
            html:"<center><table width='70%' border='1' cellspacing='0'><tr><td width='28%'>&nbsp;</td><td width='72%' align='center'>Glucosa sanguínea promedio</td></tr><tr> <td align='center'>HbA1C (%)</td> <td align='center'>mg/dl</td></tr><tr><td align='center'>6</td> <td align='center'>135</td></tr><tr><td align='center'>7</td><td align='center'>170</td></tr><tr> <td align='center'>8</td><td align='center'>205</td></tr><tr> <td align='center'>9</td><td align='center'>240</td> </tr><tr> <td align='center'>10</td> <td align='center'>275</td></tr><tr><td align='center'>11</td><td align='center'>310</td></tr><tr><td align='center'>12</td><td align='center'>345</td></tr></table></center>",
            border:false,
            bodyStyle:"font-size: 12px;font-family: Arial, Helvetica, sans-serif;",
            width:400
          }
      ]
      }]
  }]
});
    var panelFormHemoglobina= new Ext.FormPanel({
        id:idPnl,
        title:titulo,
        url: url,
        bodyStyle: "padding:5px 5px 0",
        region: this.reg,
        border:false,
        height: this.alto,
        autoHeight: this.autoAlto,
        autoScroll: (!this.autoAlto),
        items:[]
    });
    
     this.crearFichaHemoglobina = function(){
        panelFormHemoglobina.add(PanelHemoglobina);        
	panelFormHemoglobina.doLayout();
        return panelFormHemoglobina;
    }

}