/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("com.punto.pen");

com.punto.pen.panelChat = function(){
    var horas = [];
    var minutos = [];

    for(var i = 0; i < 24; i++){
        horas[i] = (i < 10 ? [i,"0" + i] : [i,i]);
    }
    
    for(var j = 0; j < 60; j++){
        minutos[j] = (j < 10 ? [j,"0" + j] : [j,j]);
    }
    
    var frmChat = new Ext.FormPanel({
        bodyStyle: "padding:5px 5px 0",
        layout:'form',
        width:20,
        height:20,
        //autoScroll:true,
        items:[{
            xtype:"fieldset",
            title:"",
            width:350,
            height:120,
            items:[{
                xtype:"datefield",
                fieldLabel:"Fecha",
                id:'idFechaChat',
                allowBlank:false,
                emptyText:'dd/mm/yyyy',
                tabIndex:104,
                width:100,
                autoCreate:{
                    tag:"input",
                    maxlength:10
                }
                
            },
                saltoLine(1)
            
//            ,{
//                xtype:"textfield",
//                allowBlank:false,
//                fieldLabel:"Hora de inicio",
//                width:50,
//                id:"idHoraInicioChat"
//            }

            ,{
              xtype:"panel",
              layout:"column",
              border:false,
              items:[{
                    html:"<label style='font-size:12px;'>Hora de inicio:</label>",
                    width:105,
                    border:false
              },{
                    xtype:"combo",
                    id:"idHoraIniChat",
                    allowBlank:false,
                    store:horas,
                    width:40,
                    mode:"local",
                    triggerAction:'all'
                },
                {
                    xtype:"label",
                    text:":"
                }
                ,{
                    xtype:"combo",
                    allowBlank:false,
                    id:"idMinIniChat",
                    store:minutos,
                    width:40,
                    mode:"local",
                    triggerAction:'all'
                }]
            },
                saltoLine(1)
            ,{
              xtype:"panel",
              layout:"column",
              border:false,
              items:[{
                    html:"<label style='font-size:12px;'>Hora de termino:</label>",
                    width:105,
                    border:false
              },{
                    xtype:"combo",
                    allowBlank:false,
                    id:"idHoraFinChat",
                    store:horas,
                    width:40,
                    mode:"local",
                    triggerAction:'all'
                },
                {
                    xtype:"label",
                    text:":"
                }
                ,{
                    xtype:"combo",
                    allowBlank:false,
                    id:"idMinFinChat",
                    store:minutos,
                    width:40,
                    mode:"local",
                    triggerAction:'all'
                }]
            }
//            ,{
//                xtype:"textfield",
//                allowBlank:false,
//                fieldLabel:"Hora de termino",
//                width:50,
//                id:"idHoraFinChat"
//            }
        ]
        },{
            xtype:"fieldset",
            title:"Conversación",
            layout:"column",
            width:350,
            height:150,
            items:[{
                xtype:"textarea",
                allowBlank:false,
                style:'text-transform: uppercase;',
                id:"idConversacionChat",
                width:325,
                height:110
            }]
        }]
    });
    return frmChat;
    
}

function guardarConversacion(idc){
    var fechChat = Ext.getCmp("idFechaChat");
    var idHoraIniChat = Ext.getCmp("idHoraIniChat");
    var idMinIniChat = Ext.getCmp("idMinIniChat");
    var idHoraFinChat = Ext.getCmp("idHoraFinChat");
    var idMinFinChat = Ext.getCmp("idMinFinChat");
    var converChat = Ext.getCmp("idConversacionChat");
    var arrayValido = [fechChat,idHoraIniChat,idMinIniChat,idHoraFinChat,idMinFinChat,converChat];
    var valido = true;

    for(var i = 0; i < arrayValido.length; i++){
        if(arrayValido[i].isValid() == false){
            valido = false;
            break;
        }
    }

    if(valido == true){

        Ext.Ajax.request({
            url:contexto+'/Chat',
            params:{
                bnd:1,
                fechChat:fechChat.getValue(),
                hIniChat:idHoraIniChat.getRawValue() + ":" + idMinIniChat.getRawValue(),
                hFinChat:idHoraFinChat.getRawValue() + ":" + idMinFinChat.getRawValue(),
                converChat:converChat.getValue(),
                idc:idc
            },
            success:function(rsp){
                var objJSON=rsp.responseText.evalJSON();

                if(objJSON.exito == 'si'){
                    Ext.Msg.show({
                        title:'Chat SATL',
                        msg: "Se guardo la conversación de forma satisfactoria",
                        buttons: Ext.Msg.OK
                    });
                }else{
                    Ext.Msg.show({
                        title:'Chat SATL',
                        msg: "Hubo un error en el servidor",
                        buttons: Ext.Msg.OK
                    });
                }
                
                var panelPrin=Ext.getCmp("pnlInfoGeneral");
                panelPrin.load({
                    url:contexto+'/Cliente?bnd=2&idCnt='+idc
                });
                var bitac=Ext.getCmp("gridBuscadorBitacora");
                bitac.getStore().load();
                var nots = Ext.getCmp("idPanelNotasAnte");
                nots.load({
                    url:contexto + '/Cliente?bnd=9&idCnt='+idc
                });

                Ext.getCmp('idWndChat').close();
            },
            failure:function(){

            }
        });

    }else{
        Ext.Msg.show({
            title:'Chat SATL',
            msg: "Faltan datos para continuar",
            buttons: Ext.Msg.OK
        });
    }
}