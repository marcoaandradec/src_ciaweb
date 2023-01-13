/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function mostrarPerfilUsuario(btn){
    
}

function fnElegir(grd,pnl){
    if(grd==undefined){
            grd = Ext.getCmp('idBusqPaciente');
    }
    var rc = grd.getSelectionModel().getSelected();
    if(rc!=null){
        if(pnl==null){
            pnl = Ext.getCmp('idFrmAgendaCita');
        }
        if(pnl==undefined){
            pnl = Ext.getCmp('idFormEnvio');
        }
        
        var wnd = grd.findParentByType('window');
        pnl.getForm().findField('idCnt').setValue(rc.get('folio'));
        pnl.getForm().findField('paciente').setValue(rc.get('nombre')+' '+rc.get('apaterno')+' '+rc.get('amaterno'));
        wnd.close();
    }else{
        Ext.Msg.alert("Error","Debe seleccionar un paciente para poder editar.");
    }
}

function fnElegirPrg(grd){
    var rc = grd.getSelectionModel().getSelected();
    if(rc!=null){
        var titulo = (rc.get('status')==2?'Pregunta de ' + rc.get('nombre_cnt') + ' contestada por ' + rc.get('nombre_usr') : 'Contestar pregunta de ' + rc.get('nombre_cnt'));
        var pnl = new com.punto.pen.PanelVerPreguntasWeb({id:'frmAnswerQst',record:rc});
        var wnd = new Ext.Window({
            id:'idWndPreguntas',
            title:titulo,
            headerConstrain:true,
            modal:true,
            height:430,
            width:530,
            items:[
                pnl
            ],
            buttons:[
                {text:'Guardar',hidden:(rc.get('status')==3),
                    handler:function(){
                        submitFormulario(pnl,
                            {
                                'bnd':2,'id_pregunta':rc.get('id_pregunta'),
                                'respuesta':pnl.getForm().findField('name_respuesta').getValue(),
                                'grd':grd.getId(),'wnd':'idWndPreguntas'
                            }
                        );
                    }
                },
                {text:'Cancelar',
                    handler:function(){
                        wnd.close();
                    }
                }
            ]
        });
        wnd.show();
    }else{
        Ext.Msg.alert("Error","Debe seleccionar un paciente para poder editar.");
    }
}

function initFnActividadNode(idNode,nd){
    var tree = nd.getOwnerTree();
    var node = tree.getNodeById(idNode);
    if(node!=undefined){
        tree.selectPath(node.getPath());
        node.fireEvent('click');
    }
}

function IrASesion(record,idAcc,idTree,idOrg){
    ActualizarSesionPaciente({
        'id':'pnlSesionPaciente',
        'idContenedor':'pnlCenter',
        'idCnt':record.get('id_paciente'),
        'region':'center',
        'idAcc':idAcc,
        'idTree':idTree,
        'nameCnt':record.get('paciente'),
        'TipoPac':record.get('tipoPx'),
        'pnlBack':com.punto.pen.PanelAgendaCASA,
        'prmBack':{id:'idPanelAgnCasa',border:false,'idAcc':idAcc,'idTree':idTree,'idOrg':idOrg,prm:{url:''},esWnd:false},
        'fnEvtTreeActLdl':{
            'load':function(ldl,nd,rsp){
                initFnActividadNode('actPx_'+record.get('id_actividad'),nd);
            }
        }
    });
}

function ActualizarSesionPaciente(prm){
    IniciarAccion(prm.idTree,true,true,prm.idContenedor,new com.punto.pen.PanelSesionPaciente({
        id:prm.id,
        'idCnt':prm.idCnt,
        region:'center',
        'idAcc':prm.idAcc,
        'idTree':prm.idTree,
        'nameCnt':prm.nameCnt,
        'TipoPac':prm.TipoPac,
        'pnlBack':prm.pnlBack,
        'prmBack':prm.prmBack,
        'mostrarBack':prm.mostrarBack,
        'fnEvtTreeActLdl':prm.fnEvtTreeActLdl,
        'idContenedor':prm.idContenedor
    }));
}

function validacionSubmitFormulario(formPanel){
   var form = formPanel.getForm();
   var mns="";
    if(!form.isValid()){
      mns="no"
    }
    return mns;
}

function Mensaje(idm,titulo,mns){
    if(idm==null || idm==undefined){
        idm='MnsValidCampos';
    }
    if(titulo==null || titulo==undefined){
        titulo='Datos Incompletos';
    }
    if(mns==null || mns==undefined){
        mns='Debe completar los datos obligatorios para continuar.(Campos marcados con rojo)';
    }
  var mnsAlerta=Ext.MessageBox.show({
            id:idm,
            title: titulo,
            msg: mns,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
}