/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns('com.punto.pen');
com.punto.pen.PanelVerPreguntasWeb = function(argumentos){
    this.titulo      = (argumentos.titulo == null ? "" : argumentos.titulo);
    this.autoScroll = (argumentos.scroll==null ? true : argumentos.scroll);
    var id         = (argumentos.id==null ? '' : argumentos.id);
    var record      = (argumentos.record==null ? '' : argumentos.record);

    var xtypeResp = 'htmleditor';
    var deshabilitado = false;
    var obj = {xtype:xtypeResp,fieldLabel:'Respuesta',id:'respPrg',name:'name_respuesta',disabled:deshabilitado,allowBlank:false,value:record.get('respuesta'),height:140,width:500,enableSourceEdit:false,enableFont:false,enableFontSize:false,enableLinks:false,enableColors:false,
                style:'text-transform: uppercase;',
                    enableKeyEvents:true,
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
    if(record.get('status')==2){
        obj = {xtype:xtypeResp,fieldLabel:'Respuesta',name:'name_respuesta',disabled:deshabilitado,allowBlank:false,value:record.get('respuesta'),height:140,width:500,enableSourceEdit:false,enableFont:false,enableFontSize:false,enableLinks:false,enableColors:false,enableFormat:false,enableAlignments:false,enableLists:false,
                style:'text-transform: uppercase;',
                    enableKeyEvents:true,
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
    }

    this.pnl = new Ext.form.FormPanel({
        'id':id,layout:'table',layoutConfig:{columns:2},width:520,
        frame:true,url:contexto + '/Preguntas',
        items:[
            {layout:'form',labelAlign:'top',
                items:[
                    {xtype:'textfield',fieldLabel:'Paciente',name:'nombre_pac',disabled:true,value:record.get('nombre_cnt'),width:200},
                    {xtype:'textfield',fieldLabel:'Fecha Pregunta',name:'fecha_registro',disabled:true,value:record.get('fecha_registro'),width:200}
                ]
            },
            {layout:'form',labelAlign:'top',
                items:[
                    {xtype:'textfield',fieldLabel:'¿Quién Contestó?',name:'nombre_esp_reg',disabled:true,value:record.get('nombre_usr'),width:200},
                    {xtype:'textfield',fieldLabel:'Fecha Contestación',name:'fecha_contesta',disabled:true,value:record.get('fecha_contesta'),width:200}
                ]
            },
            {layout:'form',labelAlign:'top',colspan:2,
                items:[
                    {xtype:'textarea',fieldLabel:'Pregunta',name:'pregunta',disabled:true,value:Ext.util.Format.stripTags(record.get('pregunta')),height:60,width:500,
                style:'text-transform: uppercase;',
                    enableKeyEvents:true,
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
            },
            {layout:'form',labelAlign:'top',colspan:2,
                items:[
                    obj
                ]
            }
        ]
    });
    return this.pnl;
}