/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/*** Función general para hacer submit a los formularios y realizar acciones ***/

function submitFormulario(formPanel,parametros){ 
    var prm = (parametros==null ? {} : parametros);
    var prm2 = (parametros==null ? {} : parametros);
    var url = (prm.url==null ? '' : prm.url);
    var msg = (prm.msg==null ? 'Espere un segundo, estamos procesando la información' : prm.msg);
    var form = formPanel.getForm();
    var nDir = (prm.nDir==null ? '' : prm.nDir);
    var idc = (prm.idCnt == null ? 0 : prm.idCnt);
    var idPro = (prm.idPro == null ? 0 : prm.idPro);

    if(form.isValid()){
        form.submit({
            waitTitle:'Espere un momento por favor...',
            waitMsg: msg,
            clientValidation: true,
            timeout:150000,
            params:prm,
            success:function(form,action){
                if(nDir=="si"){
                    var grd = Ext.getCmp("idGridRecetaCanje");
                    var store = grd.getStore();
                    store.load({
                        params:{
                            start:0,
                            limit:5,
                            bnd:1,
                            'idCnt':idc,
                            'idPro':idPro
                        }
                    });
                    //Ext.getCmp("gridBuscadorRecetasMedicas").getStore().load({params:{start:0,limit:5,bnd:1,'idCnt':idc,'idPro':idPro}});
                    cargaGridCanjes(idc,'idPnCanjes');
                    prm.wind.close();
                }else if(nDir == "no"){
                    cargaGridCanjes(idc,'idPnCanjes');
                    prm.wind.close();
                }

                if(action.result.res != null){
                    var re = Ext.getCmp(action.result.res).getForm();
                    re.reset();
                    if (action.result.nuPV!=null){
                        for(var i=0;i<action.result.nuPV;i++){
                            Ext.getCmp(action.result.PnlVisible[i]).setVisible(action.result.boleano[i]);
                        }
                    }
                }

                if(action.result.PxSanofiTaller != null){
                    Ext.getCmp('idPxTaller').setValue(action.result.PxSanofiTaller);                    
                }
				
                if(action.result.accion == null){
                    var m = (action.result.msg==null ? 'Se realizó la operación con éxito' : action.result.msg);
                    //Ext.Msg.alert("Éxito", m);
                    if(action.result.rtn!=null){
                        if(action.result.exit!=null){
                            if(action.result.exit==0){
								
                                Ext.Msg.alert("Éxito", m);
                                leerDatos(action.result.rtn);
								
								
                            }else if(action.result.exit==2){
                                Ext.Msg.alert("Éxito", m);
                            }
                        }else{
                            Ext.Msg.alert("Éxito", m);
                        }
                    }else{
                        Ext.Msg.alert("Éxito", m);
                    }
					
					
                //                    if(action.result.funcion!=null){
                //                        var fn = action.result.funcion;
                //                        fn;
                //                    }
                }else if(action.result.accion=='setModulo'){
                    if(action.result.modulo==1){                       
                        Ext.Ajax.request({
                            url : contexto+'/Usuario',
                            params:{
                                bnd:12,
                                'idCnt':action.result.idCnt,
                                'idAcc':action.result.idAcc,
                                'idTree':action.result.idTree,
                                'evtTreeNde':"",
                                'evtTreeLdl':"",
                                'evtTreePnl':"",
                                "contexto":contexto                
                            },
                            success:function(rsp){            
                                
                                actCmpPxPr= eval("("+rsp.responseText+")");                    
                                setModuloAll(action.result.idPnlPrn,getModulo(action.result.modulo,{
                                    id:action.result.idPnl,
                                    'idCnt':action.result.idCnt,
                                    region:'center',
                                    idAcc:action.result.idAcc,
                                    idTree:action.result.idTree,
                                    nameCnt:action.result.nameCnt,
                                    TipoPac:action.result.TipoPac

                                }));
                    
                            },
                            failure:function(rsp){
                                Ext.MessageBox.alert('ĄĄAlerta!!',"Problemas de conexión");
                            }
                        });
                    
                    }else{
                        setModuloAll(action.result.idPnlPrn,getModulo(action.result.modulo,{
                            id:action.result.idPnl,
                            'idCnt':action.result.idCnt,
                            region:'center',
                            idAcc:action.result.idAcc,
                            idTree:action.result.idTree,
                            nameCnt:action.result.nameCnt,
                            TipoPac:action.result.TipoPac

                        }));
                    }
                }else if (action.result.accion=='loadHTMLPanel'){
                    var p = Ext.getCmp(action.result.idPnl);
                    p.load(action.result.prm);
                    if(action.result.msg!=null){
                        Ext.Msg.alert("Éxito ", action.result.msg);
						
                    }
                }else if (action.result.accion=='loadHTMLPanelDobles'){
                    var c = Ext.getCmp(action.result.idPnl);
                    var e = Ext.getCmp(action.result.idPnl2);
                    var not = Ext.getCmp(action.result.idPnl3);
                    c.load(action.result.prm);
                    not.load(action.result.prm2);
                    e.getStore().load();
                    if(action.result.msg!=null){
                        Ext.Msg.alert("Éxito ", action.result.msg);
                    }
                }
                else if (action.result.accion=='loadMultiples'){
                    for(var i=0;i<action.result.numero;i++){
                        var idP=action.result.idPnl[i];
                        var prue = Ext.getCmp(idP);
                        var tipo = prue.getXType();
                        if(tipo=='grid'){
                            prue.getStore().load();
                        }
                        else if (tipo=='panel'){
                            prue.load(action.result.prm[i]);
                        }
                    }
                    if(action.result.msg!=null){
                        Ext.Msg.alert("Éxito ", action.result.msg);
                    }
                }else if (action.result.accion=='setModuloSeg'){
                    
                    if(action.result.modulo==1){                       
                        Ext.Ajax.request({
                            url : contexto+'/Usuario',
                            params:{
                                bnd:12,
                                'idCnt':action.result.idCliente,
                                'idAcc':0,
                                'idTree':0,
                                'evtTreeNde':"",
                                'evtTreeLdl':"",
                                'evtTreePnl':"",
                                "contexto":contexto                
                            },
                            success:function(rsp){           
                                
                                actCmpPxPr= eval("("+rsp.responseText+")");                     
                                IniciarAccion('pnlTreeAccionesFV',true,true,action.result.idPnlPrn,getModulo(action.result.modulo,{
                                    id:'pnlSeguimientoCaso',
                                    region:'center',
                                    titulo:'Seguimiento Caso Farmacovigilancia',
                                    url:contexto/+'Farmacovigilancia',
                                    'idLlamada':action.result.idLlamada,
                                    'nomCliente':action.result.nombre,
                                    'caso':action.result.caso,
                                    'idCaso':action.result.idCaso,
                                    'medicamento':action.result.medicamento,
                                    'folioUsuario':action.result.folioUsuario,
                                    'folioSistema':action.result.folioSistema,
                                    'telefono':action.result.telefono,
                                    'direccion':action.result.direccion,
                                    'estado':action.result.estado,
                                    'fechaCrea':action.result.fechaCrea,
                                    'idProducto':action.result.idProducto,
                                    'idSeguimie':action.result.idSeguimie,
                                    'idObserva':action.result.idObserva,
                                    'campo1':action.result.campo1,
                                    'campo2':action.result.campo2,
                                    'campo3':action.result.campo3,
                                    'campo4':action.result.campo4,
                                    'camop5':action.result.campo5,
                                    'banRedOnly':action.result.banRedOnly,
                                    'idCliente':action.result.idCliente,
                                    modal:true
                                }));
                                if(action.result.msg!=null){
                                    Ext.Msg.alert("Éxito ", action.result.msg);
                                }
                    
                            },
                            failure:function(rsp){
                                Ext.MessageBox.alert('ĄĄAlerta!!',"Problemas de conexión");
                            }
                        });
                    
                    }else{
                        IniciarAccion('pnlTreeAccionesFV',true,true,action.result.idPnlPrn,getModulo(action.result.modulo,{
                            id:'pnlSeguimientoCaso',
                            region:'center',
                            titulo:'Seguimiento Caso Farmacovigilancia',
                            url:contexto/+'Farmacovigilancia',
                            'idLlamada':action.result.idLlamada,
                            'nomCliente':action.result.nombre,
                            'caso':action.result.caso,
                            'idCaso':action.result.idCaso,
                            'medicamento':action.result.medicamento,
                            'folioUsuario':action.result.folioUsuario,
                            'folioSistema':action.result.folioSistema,
                            'telefono':action.result.telefono,
                            'direccion':action.result.direccion,
                            'estado':action.result.estado,
                            'fechaCrea':action.result.fechaCrea,
                            'idProducto':action.result.idProducto,
                            'idSeguimie':action.result.idSeguimie,
                            'idObserva':action.result.idObserva,
                            'campo1':action.result.campo1,
                            'campo2':action.result.campo2,
                            'campo3':action.result.campo3,
                            'campo4':action.result.campo4,
                            'camop5':action.result.campo5,
                            'banRedOnly':action.result.banRedOnly,
                            'idCliente':action.result.idCliente,
                            modal:true
                        }));
                        if(action.result.msg!=null){
                            Ext.Msg.alert("Éxito ", action.result.msg);
                        }
                    }
                }
                else if (action.result.accion=='setModuloFarma'){
                    
                    IniciarAccion('pnlTreeAccionesFV',false,false,action.result.idPnlPrn,getModulo(action.result.modulo,{
                        msg:'Farmacovigilancia'
                    }));
                    if(action.result.msg!=null){
                        Ext.Msg.alert("Éxito ", action.result.msg);
                    }
                }else if (action.result.accion=='setModuloArchivo'){
                    /*var wnd = new  Ext.Window({
                        id:'idPanelSeguimiento',
                        width:600,
                        height:400,
                        title:'Docuementos Farmacovigilancia',
                        modal:true,
                        bodyStyle: 'padding:5px;',
                        border:false,
                        html: '<iframe src="'+contexto+'/jsp_general/subirArchivo.jsp?id='+action.result.idSeguimientoArchivo+'&entity=SeguimientoCasoArchivo&campo=ScaIdArchivo&carpeta=farmacovigilancia" style="width: 100%; height: 100%; border: medium none;"></iframe>',
                        buttons:[{
                            text:'Cerrar',handler:function(){wnd.close();}
                        }
                        ]
                    });
                    wnd.show();*/
                    var win=window.open("jsp_general/subirArchivo.jsp?id="+action.result.idSeguimientoArchivo+"&idCln="+action.result.idCliente+"&entity=SeguimientoCasoArchivo&campo=ScaIdArchivo&carpeta=farmacovigilancia", "", "directories=no, resizable=0, menubar =no,location=no,scrollbars=no,status=1,height=550, width=700");
                }


                if (action.result.numTree!=null){
                    for(var k=0;k<action.result.numTree;k++){
                        var idP3=action.result.idPnlTrre[k];
                        var pnlProd = Ext.getCmp(idP3);
                        pnlProd.getRootNode().reload();
                    }
                }


                if (action.result.LimNum != null){
                    for(var j=0;j<action.result.LimNum;j++){
                        var idElme=action.result.idElm[j];
                        var ele = Ext.getCmp(idElme);
                        var tipoEl = ele.getXType();
                        if(tipoEl=='numberfield' || tipoEl=='textfield' || tipoEl=='textarea'|| tipoEl=='datefield' || tipoEl=='hidden'
                            || tipoEl=='htmleditor'){
                            ele.setValue("");
                        } else if(tipoEl=='checkboxgroup' || tipoEl=='checkbox'){
                            ele.check=false;
                            ele.setValue(false);
                        } else{
                            ele.setValue("");
                        }
                    }
                }

                if(action.result.TreeProductos != null){
                    var pnlProd= Ext.getCmp('pnlTreeProductosAct');
                    pnlProd.getRootNode().reload();
                }

                if (action.result.numbot!=null){
                    for(var j=0;j<action.result.numbot;j++){
                        var idB=action.result.botonAct[j];
                        var idBot = Ext.getCmp(idB);
                        idBot.setText(action.result.TextoBot[j]);
                    }
                }

                if(action.result.wnd != null){
                    var w = Ext.getCmp(action.result.wnd);
                    w.close();
                }
				
            },
            failure:function(form,action){
                var m = (action.result.msg==null ? 'Hubo un error en el servidor' : action.result.msg);
                var mns=Ext.Msg.alert("Error", m);
                if(action.result.sesion!=null){
                    mns.hide();
                    getSession();
                }

            }
        });
    }else{
        Ext.MessageBox.show({
            title: 'Datos Incompletos',
            msg: 'Debe completar los datos obligatorios para continuar.(Campos marcados con rojo)',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
    }
	
	
}

/*** Método que realiza una carga a un formulario ***/

function loadFormulario(formulario,parametros){
    var prm = (parametros==null ? {} : parametros);
    var url = (prm.url==null ? '' : prm.url);
    var msg = (prm.msg==null ? 'Cargando, Espere por favor' : prm.msg);
    var timeEst = (prm.timeEst==null ? 150000 : prm.timeEst);
    var form = formulario.getForm();
    form.load({
        url:url,
        params:prm,
        waitTitle:'Espere un momento por favor...',
        timeout:timeEst,
        waitMsg:msg,
        success:function (form, action){
            if(action.result.tieneRadChk == true){
                doSeleccionRadioChecks(action.result.funciones);
            }else{
        }
        },
        failure:function(form, action){
            if(action.result.accion1=='false'){
                var w = Ext.getCmp(action.result.wnd);
                w.close();
                Ext.MessageBox.show({
                    title: 'Información',
                    msg: 'No existe la factura verifique.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                });
            }
            if(action.result.sesion!=null){
                getSession();
            }
        }
    });
}
/*** Método que devuelve un pánel de acuerdo a el índice pasado y sus parámetros ***/

function getModulo(i,params){
    var frm = null;
    switch(i){
        case 1:
            frm = new com.punto.pen.PanelSesionPaciente(params)
            break;        
        case 6:
            frm = new com.punto.pen.PanelBienvenida(params)
            break;
      
    }
    return frm;
}

function enviaValores(contenedores,valores,ventana){

    for(var i=0; i<contenedores.size();i++){
        contenedores[i].setValue(valores[i]);
    }
    ventana.close();


}


/*** Método para limpiar componentes y hacer un load a un combo ***/

function accionCmbUbicacion(cmb,cmpToClean,prm, borrar){
    if(borrar==true){
        for(var i = 0; i < cmpToClean.length; i++){
            var cmp = (Ext.getCmp(cmpToClean[i])==null ? '' : Ext.getCmp(cmpToClean[i]));
            if(cmp!=''){
                if(cmp.getXType()=='combo'){
                    cmp.clearValue();
                }else if(cmp.getXType()=='textfield'){
                    cmp.setValue('');
                }
            }
        }
    }
    //delmun.store.load({params:{'bnd':'cbDM', 'edo': estado.getRawValue()}});
    if(cmb!=null && cmb!=""){
        cmb.store.load({
            params:prm
        });
    }
    
}

function VentEmergenteConsulta(idCnt,bnd,mnsTitulo){
    var msg = (mnsTitulo==null ? 'Ver Información' : mnsTitulo);
    var vBnd = (bnd==null ? '0' : bnd);
    var vIdCnt = (idCnt==null ? '0' : idCnt);

    var wnd = new Ext.Window({
        title:msg,//'Información del Paciente',
        id:'idWndConsulta',
        constrainHeader :true,
        modal:true,
        border:false,
        autoScroll:false,
        draggable:true,
        resizable:false,
        bodyStyle:"padding: 1px;font-family:Arial;font-size:11px;",
        autoLoad:{
            url:contexto+'/Cliente',
            params:{
                'bnd':vBnd,
                'idCnt':vIdCnt
            },
            text:'Cargando información...'
        },
        buttons:[
        {
            text:'Salir',
            handler:function(){
                wnd.close();
            }
        }]
    });
    wnd.show();
}

function getEstudios(idCnt,tipoEs,titulo,titulo2){
    var formEstudio = new com.punto.pen.PanelGridEstudios({
        id:'pnlGeneralEstudios',
        url:contexto+'/EstudiosGrid',
        'idCnt':idCnt,
        bnd:2,
        tipoEst:tipoEs,
        'titulo':titulo
    }).crearGridEstudios(idCnt);

    var grd = Ext.getCmp('gridEstudiosGeneral');
    var store = grd.getStore();

    var wnd = new  Ext.Window({
        id:'idEstudiosGeneralesSelect',
        width:1000,
        height:510,
        constrainHeader :true,
        modal:true,
        border:false,
        autoScroll:false,
        draggable:true,
        resizable:false,
        bodyStyle: 'padding:5px;',
        title:'Detalle '+titulo2,
        items:[
        formEstudio
        ],
        buttons:[
        //               {
        //                    text:'Actualizar',
        //                    handler:function(){
        //                    submitFormulario(formEstudio,{url:contexto+'/Cliente','idCnt':idCnt,bnd:6,wnd:'idTabPanelInfo'});
        //            }
        //            },
        {
            text:'Salir',
            handler:function(){
                wnd.close();
            }
        }]
    });
    wnd.show();
    store.load({
        params:{
            start:0,
            limit:20
        }
    });
}


function submitFormulario2(formPanel,parametros){
    var prm = (parametros==null ? {} : parametros);
    var prm2 = (parametros==null ? {} : parametros);
    var url = (prm.url==null ? '' : prm.url);
    var msg = (prm.msg==null ? 'Espere un segundo, estamos procesando la información' : prm.msg);
    var form = formPanel.getForm();
    var nDir = (prm.nDir==null ? "no" : prm.nDir);
    var idc = (prm.idCnt == null ? 0 : prm.idCnt);
    var idPro = (prm.idPro == null ? 0 : prm.idPro);

    if(form.isValid()){
        form.submit({
            waitMsg: msg,
            clientValidation: true,
            params:prm,
            timeout:150000,
            success:function(form,action){
                if(action.result.accion == null){
                    var m = (action.result.msg==null ? 'Se realizó la operación con éxito' : action.result.msg);
                    Ext.Msg.alert("Éxito", m);//
                }else if(action.result.accion=='setModulo'){
                    if(action.result.ProsNutCampo!=null){
                        if(action.result.ProsNutCampo==1){
                            var hiden = Ext.getCmp('idHidenProspectos').getValue();
                            var sum=0;
                            sum=1+parseInt(hiden);
                            Ext.getCmp('idHidenProspectos').setValue(sum);
                        }
                    }
                    if(action.result.AFDVPCM!=null){
                        ExamenPCMGrupal(action.result.idCnt);
                    }
                    if(action.result.AFDVGlucometria!=null){
                        ExamenGlucometriaGrupal(action.result.idCnt);
                    }
                    if(action.result.Trigliceridos!=null){
                        ExamenTrigliceridosGrupal(action.result.idCnt);
                    }
                    if(action.result.Hemoglobina!=null){
                        ExamenHemoglobinaGrupal(action.result.idCnt);
                    }
                    if(action.result.Doppler!=null){
                        ExamenDopplerGrupal(action.result.idCnt);
                    }
                    if(action.result.PresionArterial!=null){
                        ExamenPresionGrupal(action.result.idCnt);
                    }
                    if(action.result.PesoTalla!=null){
                        ExamenPesoTallaGrupal(action.result.idCnt);
                    }
                    if(action.result.AFDVTaller!=null){
                        var grd = Ext.getCmp('gridBuscadorPacienteTaller');
                        var store = grd.getStore();
                        store.load({
                            params:{
                                start:0,
                                limit:20,
                                bnd:1,
                                folio:action.result.idCnt,
                                FechaN:'dd/mm/yyyy'
                            }
                        });
                    }
                }else if (action.result.accion=='loadMultiples'){
                    for(var i=0;i<action.result.numero;i++){
                        var idP=action.result.idPnl[i];
                        var prue = Ext.getCmp(idP);
                        var tipo = prue.getXType();
                        if(tipo=='grid'){
                            if(action.result.prm[i]==null || action.result.prm[i]=="" || action.result.prm[i]=="{}"){
                                prue.getStore().load();
                            }else{
                                prue.getStore().load(action.result.prm[i]);
                            }
                        }
                        else if (tipo=='panel'){
                            prue.load(action.result.prm[i]);
                        }
                    }
                    if(action.result.msg!=null){
                        Ext.Msg.alert("Éxito ", action.result.msg);
                    }
                    if(action.result.idReceta != null){
                        SubirReceta(action.result.idReceta,action.result.idCnt);
                    }
                }
                if(action.result.wnd != null){
                    var w = Ext.getCmp(action.result.wnd);
                    w.close();
                }
            },
            failure:function(form,action){
                var m = (action.result.msg==null ? 'Hubo un error en el servidor' : action.result.msg);
                var mns=Ext.Msg.alert("Error", m);
                if(action.result.sesion!=null){
                    mns.hide();
                    getSession();
                }
            }
        });
    }else{
        Ext.MessageBox.show({
            title: 'Datos Incompletos',
            msg: 'Debe completar los datos obligatorios para continuar.(Campos marcados con rojo)',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
    }
}

function submitFormularioSubir(formPanel,parametros){
    var prm = (parametros==null ? {} : parametros);
    var prm2 = (parametros==null ? {} : parametros);
    var url = (prm.url==null ? '' : prm.url);
    var msg = (prm.msg==null ? 'Espere un segundo, estamos procesando la información' : prm.msg);
    var form = formPanel.getForm();
    var nDir = (prm.nDir==null ? "no" : prm.nDir);
    var idc = (prm.idCnt == null ? 0 : prm.idCnt);
    var idPro = (prm.idPro == null ? 0 : prm.idPro);

    if(form.isValid()){
        form.submit({
            waitMsg: msg,
            params:prm,
            timeout:150000,
            success:function(form,action){
                var w = Ext.getCmp('idTabPanelInfoRecetas');
                w.close();
            },
            failure:function(form,action){
                var m = (action.result.msg==null ? 'Hubo un error en el servidor' : action.result.msg);
                var mns=Ext.Msg.alert("Error", m);
                if(action.result.sesion!=null){
                    mns.hide();
                    getSession();
                }
            }
        });
    }else{
        Ext.MessageBox.show({
            title: 'Datos Incompletos',
            msg: 'Debe completar los datos obligatorios para continuar.(Campos marcados con rojo)',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
    }
}
//Menor al día de hoy
function Validafecha(idfecha){
    var valid=true;
    var fec=new Date;
    if(idfecha!=null || idfecha!=''){
        var inicio=new Date(idfecha);
        var finalt=new Date(fec);
        if(inicio > finalt){
            valid=false;
        }
    }
    return valid;
}
//Mayor al día de hoy
function ValidarfechaMayor(idfecha){
    var valid=true;
    var fec=new Date;
    if(idfecha!=null || idfecha!=''){
        var inicio=new Date(idfecha);
        var finalt=new Date(fec);
        if(inicio < finalt){
            valid=false;
        }
    }
    return valid;
}

function FunItemBlur(cmp){
    if(cmp.items!=null || cmp.items!=undefined){
        for(var i = 0; i<cmp.items.length;i++){
            var cm = cmp.getComponent(i);
            if(cm.getXType()=='panel' || cm.getXType()=='fieldset'){
                FunItemBlur(cm);
            }else
            if(cm.getXType()=='textfield'){
                if(!cm.isValid()){
                    cm.markInvalid();
                }
            }else
            if(cm.getXType()=='textarea'){
                if(!cm.isValid()){
                    cm.markInvalid();
                }
            }else
            if(cm.getXType()=='combobox'){
                if(!cm.isValid()){
                    cm.markInvalid();
                }
            }else
            if(cm.getXType()=='radiobutton'){
                if(!cm.isValid()){
                    cm.markInvalid();
                }
            }else
            if(cm.getXType()=='checkbox'){
                if(!cm.isValid()){
                    cm.markInvalid();
                }
            }else
            if(cm.getXType()=='numberfield'){
                if(!cm.isValid()){
                    cm.markInvalid();
                }
            }else
            if(cm.getXType()=='datefield'){
                if(!cm.isValid()){
                    cm.markInvalid();
                }
            }
        }
    }
}


function getSession(){
    var MnsA=Ext.Msg.show({
        title:'ĄĄAlerta!!',
        msg: 'Se termino la Sesión. Favor de ingresar su Usuario y Contraseńa',        
        animEl: 'elId',
        buttons:{
            yes:'Recuperar',
            no:'Cerrar'
        },
        fn: function(btn){
            if(btn == 'no'){
                MnsA.hide();
            }
            if(btn == 'yes'){
                var ckUtil = new CJL_CookieUtil("cookie_tema", 1450);
                var theme = ckUtil.getSubValue('theme');
                $('themecss').href = contexto+'/js/ext/resources/css/'+theme+'.css';
                var wnd = new  Ext.Window({
                    id:'idRecuperarSesion',
                    width:305,
                    height:145,
                    constrainHeader :true,
                    modal:true,
                    border:false,
                    autoScroll:false,
                    draggable:true,
                    resizable:false,
                    bodyStyle: 'padding:5px;',
                    title:'Recuperar Sesión',
                    items:[
                    new Ext.form.FormPanel({
                        frame  : true,
                        url    : contexto+'/Usuario?bnd=11',
                        id     : 'frmSesion',
                        items:[{
                            xtype:'textfield',
                            fieldLabel: '&nbsp; &nbsp;Usuario',
                            id:'user',
                            width:150,
                            allowBlank:false,
                            name:'usuario',
                            enableKeyEvents:true,
                            listeners:{
                                'keypress':
                                function(txtField,e){
                                    if(e.keyCode==13){
                                        saveFieldToCookie(ckUtil,'user');
                                        Acces();
                                    }
                                }
                            }
                        },
                        {
                            xtype:'textfield',
                            fieldLabel: '&nbsp; &nbsp;Contraseńa',
                            id:'pssw',
                            inputType:'password',
                            width:150,
                            allowBlank:false,
                            name:'contrasena',
                            enableKeyEvents:true,
                            listeners:{
                                'keypress':
                                function(txtField,e){
                                    if(e.keyCode==13){
                                        saveFieldToCookie(ckUtil,'user');
                                        Acces();
                                    }
                                }
                            }
                        }
                        ],
                        buttons:[
                        {
                            text:'Entrar',
                            id:'btnAcces',
                            handler:function(){
                                saveFieldToCookie(ckUtil,'user');
                                Acces();
                            }
                        },
                        {
                            text:'Limpiar',
                            handler:function(){
                                Ext.getCmp('user').setValue("");
                                Ext.getCmp('pssw').setValue("");
                            }
                        }]
                    })]
                });
                setFieldFromCookie(ckUtil,"user");
                setFieldFromCookie(ckUtil,"theme");
                wnd.show();
            }
        },
        icon: Ext.MessageBox.WARNING
    });
}

function Acces(){
    var frm=Ext.getCmp('frmSesion');
    if(frm.getForm().isValid()){
        Ext.getCmp('btnAcces').disable();
        frm.getForm().getEl().dom.action=frm.url;
        var msg = 'Espere un segundo, estamos procesando la información';
        frm.getForm().submit({
            waitMsg: msg,
            clientValidation: true,
            timeout:150000,
            success:function(form,action){
                var m = (action.result.msg==null ? 'Se realizó la operación con éxito' : action.result.msg);
                Ext.Msg.alert("Éxito", m);
                var w = Ext.getCmp('idRecuperarSesion');
                w.close();
            },
            failure:function(form,action){
                var m = (action.result.msg==null ? 'Hubo un error en el servidor' : action.result.msg);
                Ext.Msg.alert("Error", m);
                Ext.getCmp('btnAcces').enable();
            }
        });
    }else{
        Ext.MessageBox.show({
            title: 'Datos Incompletos',
            msg: 'Debe completar los datos obligatorios marcados con rojo, para continuar.',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
    }
}