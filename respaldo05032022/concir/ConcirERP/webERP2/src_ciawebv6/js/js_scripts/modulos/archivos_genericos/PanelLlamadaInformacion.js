/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns('com.punto.pen');

com.punto.pen.PanelLlamadaInformacion = function(argumentos){
    this.id    = (argumentos.id==null ? '' : argumentos.id);
    this.url   = (argumentos.url==null ? '' : argumentos.url);
    this.idAct = (argumentos.idAct==null ? '' : argumentos.idAct);
    //this.nmCnt = (argumentos.nmCnt==null ? '' : argumentos.nmCnt);
    this.idCnt = (argumentos.idCnt==null ? '' : argumentos.idCnt);
    
    this.panel = new Ext.form.FormPanel({
        id:this.id,
        url:this.url,
        bodyStyle:"padding:5px",
        items:[
            {xtype:'fieldset',title:'Observaciones',height:110,
                items:[
                    {xtype:"textarea",name:"observacion",id:"idObservacion",hideLabel:true,allowBlank:false,width:400,
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
                    }}
                ]
            }
        ]
    });

    return this.panel;
}