// JavaScript Document
Ext.ns('com.punto.pen');
	
com.punto.pen.regControlLlamadas = function(argumentos){
	
    var pnlId = (argumentos.id==null ? '' : argumentos.id);
    var idMod = (argumentos.idMod==null ? '0' : argumentos.idMod);
    var idAcc = (argumentos.idAcc==null ? '' : argumentos.idAcc);
    idAccion = idAcc;
    var idTree = (argumentos.idTree==null ? '' : argumentos.idTree);
    idArbol = idTree;
    // var punto = '';
    this.titulo = (argumentos.titulo==null ? 'Llamadas Outbound' : argumentos.titulo);
	
    leerDatos = function(valorProtocolo){
		
        Ext.Ajax.request({
            url:contexto+'/ControlLlamadas',
			timeout:180000,
            params:{
                'bnd':2,
                'protocolo':valorProtocolo
            },
            success:function(rsp){
                var nextArray = eval("("+rsp.responseText+")");
                var frm = Ext.getCmp('idFrmCambioEstatus').getForm();
                frm.findField('idLlamada').setValue(nextArray[0].value);
                frm.findField('tipoLlamada').setValue(nextArray[8].value);
				frm.findField('idCliente').setValue(nextArray[10].value);
                frm.findField('ld_comentarios').setValue(nextArray[1].value.replace(/_/g, ' '));
                frm.findField('nombre').setValue(nextArray[2].value.replace(/_/g, ' '));
                frm.findField('telCasa').setValue(nextArray[3].value.replace(/_/g, ' '));
                frm.findField('telCelular').setValue(nextArray[4].value.replace(/_/g, ' '));
				frm.findField('nombreContacto').setValue(nextArray[12].value.replace(/_/g, ' '));
				frm.findField('telContacto').setValue(nextArray[13].value.replace(/_/g, ' '));
				frm.findField('horarioLlamada').setValue(nextArray[15].value.replace(/_/g, ' '));
                frm.findField('fechaNacimiento').setValue(nextArray[17].value.replace(/_/g, ' '));
                frm.findField('medicamento').setValue(nextArray[16].value.replace(/_/g, ' '));
				frm.findField('fechaLlamada').setValue(nextArray[17].value.replace(/_/g, ' '));
                var auxTelOficina = nextArray[5].value;
                frm.findField('telOficina').setValue(auxTelOficina);
				
				Ext.Ajax.request({
                    url:contexto+'/GuardarEstatusLlamada',
					timeout:180000,
                    params:{
                        'reg':0,
                        'llamadaTipo':14,
                        'idLlamada':nextArray[0].value
                        }
                });

            }
        });
		
    }
	
    cargarBitacoraCliente = function(nombreCliente, idCliente){
        Ext.Ajax.request({
        url : contexto+'/Usuario',
        params:{
            bnd:12,
            'idCnt':idCliente,
            'idAcc':idAcc,
            'idTree':idTree,
            'evtTreeNde':"",
            'evtTreeLdl':"",
            'evtTreePnl':"",
            "contexto":contexto
        },
        success:function(rsp){
        actCmpPxPr= eval("("+rsp.responseText+")");

        contenedor=true;
        var wndPerfilPaciente = new Ext.Window({
            id:'idWindowSesionPaciente',
            layout:'fit',
            height:600,
            width:1300,
            items:[
                new com.punto.pen.PanelSesionPaciente({
                    'idContenedor':'idWindowSesionPaciente',
                    id:'pnlSesionPaciente',
                    'idCnt':idCliente,
                    'idAcc':idAcc,
                    'idTree':idTree,
                    nameCnt : nombreCliente,
                    TipoPac: 'PACIENTE',
                    'mostrarBack':true,
                    'pnlBack':com.punto.pen.regControlLlamadas,
                    'prmBack':{id:'idControlLlamadas',region:'center',titulo:'Llamadas Outbound',idTree:'pnlTreeAccionesCC',idAcc:3,height:350,modal:true}

                })
            ],
            bbar:['->',{
                        text:'Salir',
                        iconCls:'icn-cross',
                        handler:function(){
                           wndPerfilPaciente.close();
                           contenedor=false;
                        }
                    }]
        });
        wndPerfilPaciente.show();

        },
        failure:function(rsp){
            Ext.MessageBox.alert('¡¡Alerta!!',"Problemas de conexión");
        }
    })
     }

		
	var msg = Ext.MessageBox.show({
	   title: 'Cargando...',
	   msg: 'Cargando información, espere por favor...',
	   progressText: 'Cargando...',
	   width:300,
	   wait:true,
	   waitConfig: {interval:200},
	   //icon:'ext-mb-download', //custom class in msg-box.html
	   animEl: 'mb7'
   });
	
		
    Ext.Ajax.request({
        url:contexto+'/ControlLlamadas',
		timeout:180000,
        params:{
            'bnd':1
        },
        success:function(rsp){
            var arrayColumnas = eval("("+rsp.responseText+")");
            var cmp = Ext.getCmp('idColumLayout');
            for(var i = 0;i < arrayColumnas.length;i++){
                var grd = arrayColumnas[i];
                cmp.add(grd);
            }
            cmp.doLayout();
			
			msg.hide();
        }
		
    });
	
    this.pnlControlLlamadas = new Ext.Panel({
        title: 'Panel de Control Llamadas Outbound',
        layout:'column',
        border:false,
        id :'idColumLayout',
        tbar : [
        {
            text: 'Regresar',
            iconCls:'icn-back',
            handler: function(){
                IniciarAccion('pnlTreeAccionesCC',false,false,'pnlCenter',new com.punto.pen.PanelBienvenida({
                    msg:'Módulo Contact Center'
                }));
            }
					
			
        },{
            text: 'Actualizar Información',
            iconCls:'icn-refresh',
            handler: function(){
				var msg1 = Ext.MessageBox.show({
				   title: 'Cargando...',
				   msg: 'Cargando información, espere por favor...',
				   progressText: 'Guardando...',
				   width:300,
				   wait:true,
				   waitConfig: {interval:200},
				   //icon:'ext-mb-download',
				   animEl: 'mb7'
			   });
                Ext.Ajax.request({
                    url:contexto+'/ControlLlamadas',
					timeout:180000,
                    params:{
                        'bnd':1
                    },
                    success:function(rsp){
                        var arrayColumnas = eval("("+rsp.responseText+")");
                        var cmp = Ext.getCmp('idColumLayout');
                        for(var i = 0;i < arrayColumnas.length;i++){
                            var grd = arrayColumnas[i];
                            cmp.add(grd);
                        }
                        cmp.doLayout();
                        msg1.hide();
				
                    }
						
                });
                Ext.getCmp('idColumLayout').removeAll();
                Ext.getCmp('idColumLayout').doLayout();
            }
					
			
        }
        ]
										   
    });
	
    estatusLlamada = function(valorProtocolo){
        var array = new Array();
        

       var msg1 = Ext.MessageBox.show({
               title: 'Cargando...',
               msg: 'Cargando información, espere por favor...',
               progressText: 'Guardando...',
               width:300,
               wait:true,
               waitConfig: {interval:200},
               //icon:'ext-mb-download',
               animEl: 'mb7'
       });

        Ext.Ajax.request({
            url:contexto+'/ControlLlamadas',
			timeout:180000,
            params:{
                'bnd':2,
                'protocolo':valorProtocolo
            },
            success:function(rsp){

                array = eval("("+rsp.responseText+")");
			
                Ext.Ajax.request({
                    url:contexto+'/GuardarEstatusLlamada',
					timeout:180000,
                    params:{
                        'reg':0,
                        'llamadaTipo':14,
                        'idLlamada':array[0].value
                        }
                });
		
                var wnd = new Ext.Window({
                    title:'Cambio Estatus',
                    id:'idWndCambioEstatus',
                    width:1200,
                    height:450,
                    constrainHeader :true,
                    modal:true,
                    border:false,
                    autoScroll:false,
                    draggable:true,
                    resizable:false,
                    closable:false,
                    items: new Ext.FormPanel({
                        id:'idFrmCambioEstatus',
                        url: contexto+'/GuardarEstatusLlamada',
                        frame:true,
                        monitorValid:true,
                        height:500,
                        items: [{
                            layout:'column',
                            items:[{
                                columnWidth:.7,
                                layout: 'form',
                                labelWidth:170,
                                items: [
                                {
                                    layout:'column',
                                    items:[{
                                        columnWidth:0.6,
                                        items:[{
                                            layout: 'form',
                                            items: [{
                                                xtype: 'textfield',
                                                fieldLabel: 'Nombre',
                                                readOnly:true,
                                                name: 'nombre',
                                                id:'nombre',
                                                anchor:'95%',
                                                value: array[2].value.replace(/_/g, ' ')
                                            }, {
                                                xtype: 'textfield',
                                                fieldLabel: 'Telefono Casa',
                                                emptyText:'Telefono Casa ...',
                                                readOnly:true,
                                                name: 'telCasa',
                                                id: 'telCasa',
                                                anchor:'95%',
                                                value: array[3].value.replace(/_/g, ' ')
                                            },{
                                                xtype: 'textfield',
                                                fieldLabel: 'Telefono Celular',
                                                emptyText:'Telefono Celular ...',
                                                readOnly:true,
                                                name: 'telCelular',
                                                id: 'telCelular',
                                                anchor:'95%',
                                                value: array[4].value.replace(/_/g, ' ')
                                            },{
                                                xtype: 'textfield',
                                                fieldLabel: 'Telefono Oficina /c Extension',
                                                emptyText:'Telefono Oficina ...',
                                                readOnly:true,
                                                name: 'telOficina',
                                                id:'telOficina',
                                                anchor:'95%',
                                                value: array[5].value.replace(/_/g, ' ') +' '+  array[6].value.replace(/_/g, ' ')
                                            },{
                                                xtype: 'textfield',
                                                fieldLabel: 'Nombre Contacto',
                                                readOnly:true,
                                                name: 'nombreContacto',
                                                id:'nombreContacto',
                                                anchor:'95%',
                                                value: array[12].value.replace(/_/g, ' ')
                                            },{
                                                xtype: 'textfield',
                                                fieldLabel: 'Telefono Contacto',
                                                emptyText:'Telefono Contacto ...',
                                                readOnly:true,
                                                name: 'telContacto',
                                                id: 'telContacto',
                                                anchor:'95%',
                                                value: array[13].value.replace(/_/g, ' ')+''+array[14].value.replace(/_/g, ' ')
                                            }]
                                        }]
                                      },{
                                        columnWidth:0.4,
                                        items:[{
                                            layout: 'form',
                                            labelAlign: 'top',
                                            items: [
                                                {
                                                    xtype:'textfield',
                                                    fieldLabel:'Fecha de la Llamada',
                                                    name:'fechaNacimiento',
                                                    readOnly:true,
                                                    anchor:'95%',
                                                    id:'fechaNacimiento',
                                                    value:array[17].value.replace(/_/g, ' ')
                                                  },{
                                                    xtype:'textfield',
                                                    fieldLabel:'Medicamento',
                                                    readOnly:true,
                                                    name:'medicamento',
                                                    anchor:'95%',
                                                    value:array[16].value.replace(/_/g, ' ')
                                                  },{
                                                    xtype:'textfield',
                                                    fieldLabel:'Referencia Contacto',
                                                    readOnly:true,
                                                    name:'referencia',
                                                    anchor:'95%',
                                                    value:array[18].value.replace(/_/g, ' ')
                                                  }
                                            ]
                                        }]
                                      }]
                                    },

                               {
                                    xtype:"panel",
                                    layout: 'form',
                                    id:'panelHora',
                                    hidden: true,
                                    items:[{
                                        xtype:"timefield",
										name: 'horarioLlamada',
										id:'idHorarioLlamada',
                                        fieldLabel:"Hora de Llamada",
                                        increment: 60,
								        minValue:'00:00',
								        maxValue:'22:00',
										value:array[15].value.replace(/_/g, ' '),									
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
												if(e.getKey()==48 || e.getKey()==49 || e.getKey()==50 || e.getKey()==51 || e.getKey()==52 || e.getKey()==53 || e.getKey()==54 || e.getKey()==55 || e.getKey()==56 || e.getKey()==57){
												e.stopEvent();
											   }
											}
										}
                                      },{
										xtype:"datefield",
										name: 'fechaLlamada',
										id:'idFechaLlamada',
                                        fieldLabel:"Fecha de proxima Llamada",
										value:array[17].value.replace(/_/g, ' ')
									  }]
                                },{
                                    xtype: 'hidden',
                                    name: 'idLlamada',
                                    id:'idLlamada',
                                    anchor:'95%',
                                    value: array[0].value
                                },{
                                    xtype: 'hidden',
                                    name: 'tipoLlamada',
                                    id:'tipoLlamada',
                                    anchor:'95%',
                                    value: array[8].value
                                },{
                                    xtype: 'hidden',
                                    name: 'idCliente',
                                    id:'idCliente',
                                    anchor:'95%',
                                    value: array[10].value
                                },
                                new Ext.form.RadioGroup({
                                    fieldLabel: 'Opciones',
                                    id:"ld_id_tipo_llamada",
                                    anchor:'100%',
                                    hideLabel:true,
                                    columns: 3,
                                    items: [
                                    {
                                        boxLabel: 'COLGARON',
                                        name: 'ld_id_tipo_llamada',
                                        id: 'ld_id_tipo_llamadaC',
                                        inputValue: '1',
                                        checked:true,
                                        handler: function(){
                                            if(Ext.getCmp('ld_id_tipo_llamadaC').checked){
                                                Ext.getCmp('panelHora').hide();
                                            }
                                        }
                                    },

                                    {
                                        boxLabel: 'CONTACTO MEDICO',
                                        name: 'ld_id_tipo_llamada',
                                        id: 'ld_id_tipo_llamadaCM',
                                        inputValue: '3',
                                        handler: function(){
                                            if(Ext.getCmp('ld_id_tipo_llamadaCM').checked){
                                                Ext.getCmp('panelHora').hide();
                                            }

                                        }
                                    },

                                    {
                                        boxLabel: 'NUMERO EQUIVOCADO',
                                        name: 'ld_id_tipo_llamada',
                                        id: 'ld_id_tipo_llamadaNEQ',
                                        inputValue: '4',
                                        handler: function(){
                                            if(Ext.getCmp('ld_id_tipo_llamadaNEQ').checked){
                                                Ext.getCmp('panelHora').hide();
                                            }

                                        }
                                    },

                                    {
                                        boxLabel: 'FUERA DE SERVICIO',
                                        name: 'ld_id_tipo_llamada',
                                        id: 'ld_id_tipo_llamadaFS',
                                        inputValue: '5',
                                        handler: function(){
                                            if(Ext.getCmp('ld_id_tipo_llamadaFS').checked){
                                                Ext.getCmp('panelHora').hide();
                                            }

                                        }
                                    },

                                    {
                                        boxLabel: 'LLAMAR MAS TARDE',
                                        name: 'ld_id_tipo_llamada',
                                        id: 'ld_id_tipo_llamadaLT',
                                        inputValue: '6',
                                        handler: function(){
                                            if(Ext.getCmp('ld_id_tipo_llamadaLT').checked){
                                                Ext.getCmp('panelHora').show();
                                            }

                                        }
                                    },

                                    {
                                        boxLabel: 'NO CONTESTAN',
                                        name: 'ld_id_tipo_llamada',
                                        id: 'ld_id_tipo_llamadaNC',
                                        inputValue: '7',
                                        handler: function(){
                                            if(Ext.getCmp('ld_id_tipo_llamadaNC').checked){
                                                Ext.getCmp('panelHora').hide();
                                            }

                                        }
                                    },

                                    {
                                        boxLabel: 'NO EXISTE',
                                        name: 'ld_id_tipo_llamada',
                                        id: 'ld_id_tipo_llamadaNE',
                                        inputValue: '8',
                                        handler: function(){
                                            if(Ext.getCmp('ld_id_tipo_llamadaNE').checked){
                                                Ext.getCmp('panelHora').hide();
                                            }

                                        }
                                    },
                                    {
                                        boxLabel: 'NO INTERESA',
                                        name: 'ld_id_tipo_llamada',
                                        id: 'ld_id_tipo_llamadaNI',
                                        inputValue: '9',
                                        handler: function(){
                                           if(Ext.getCmp('ld_id_tipo_llamadaNI').checked){
                                                Ext.getCmp('panelHora').hide();
                                            }

                                        }
                                    },
                                    {
                                        boxLabel: 'OCUPADO',
                                        name: 'ld_id_tipo_llamada',
                                        id: 'ld_id_tipo_llamadaO',
                                        inputValue: '10',
                                        handler: function(){
                                            if(Ext.getCmp('ld_id_tipo_llamadaO').checked){
                                                Ext.getCmp('panelHora').hide();
                                            }

                                        }
                                    },

                                    {
                                        boxLabel: 'RECADO',
                                        name: 'ld_id_tipo_llamada',
                                        id: 'ld_id_tipo_llamadaR',
                                        inputValue: '11',
                                        handler: function(){
                                            if(Ext.getCmp('ld_id_tipo_llamadaR').checked){
                                                Ext.getCmp('panelHora').hide();
                                            }

                                        }
                                    },

                                    {
                                        boxLabel: 'TELEFONO INCOMPLETO',
                                        name: 'ld_id_tipo_llamada',
                                        id: 'ld_id_tipo_llamadaTI',
                                        inputValue: '13',
                                        handler: function(){
                                            if(Ext.getCmp('ld_id_tipo_llamadaTI').checked){
                                                Ext.getCmp('panelHora').hide();
                                            }

                                        }
                                    }

                                    ]


				
                                }), {
                                    xtype: 'textarea',
                                    fieldLabel: 'Comentarios',
                                    emptyText:'Comentarios ...',
                                    hideLabel: false,
                                    name: 'ld_comentarios',
                                    id: 'ld_comentarios',
                                    anchor:'95%',
                                    height: 60,
                    				enableKeyEvents:true,
                                    value: array[1].value.replace(/_/g, ' '),
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
                            if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180 || e.getKey()==34 || e.getKey()==39){
                            e.stopEvent();
                           }
                        }
                    }
                                }

                                ]
                            },{
                                columnWidth:.3,
                                layout: 'form',
                                labelAlign: 'top',
                                items: [{
                                    xtype: 'textarea',
                                    emptyText:'Script Protocolo ...',
                                    fieldLabel: 'Script Protocolo',
                                    //hideLabel: true,
                                    readOnly:true,
                                    name: 'script',
                                    id: 'script',
                                    anchor:'98%',
                                    height: 160,
                                    value: array[9].value.replace(/_/g, ' ')
                                },{
                                    xtype: 'textarea',
                                    emptyText:'Script Promocional ...',
                                    fieldLabel: 'Script Promocional',
                                    //hideLabel: true,
                                    readOnly:true,
                                    name: 'scriptPromo',
                                    id: 'scriptPromo',
                                    anchor:'98%',
                                    height: 160,
                                    value: array[11].value.replace(/_/g, ' ')
                                }


                                ]

                            }]
                        }]


								
                    }),
                    bbar:[
                    /*{
                        text:'Saltar Registro',
                        iconCls:'icn-verPreguntas',
                        handler:function(){
                            submitFormulario(Ext.getCmp('idFrmCambioEstatus'),{
                                'ld_id_tipo_llamada':15,
                                'idAcc':idAccion,
                                'idTree':idArbol,
                                'reg':1,
                                'exit':2,
                                'valorProtocolo':valorProtocolo
									
                            })
								
                        }
                    },'-',*/
                    {
                        text:'Salir',
                        iconCls:'icn-cross',
                        handler:function(){
                            Ext.Msg.show({
                                title:'Cancelar Registro',
                                msg: '<center>&iquest;Est&aacute; seguro que desea cancelar el registro?<br>Los datos se perder&aacute;n</center>',
                                buttons: Ext.Msg.YESNO,
                                animEl: 'elId',
                                fn: function(btn){
                                    if(btn == 'no'){
                                    }
                                    if(btn == 'yes'){
                                        Ext.Ajax.request({
                                            url:contexto+'/GuardarEstatusLlamada',
											timeout:180000,
                                            params:{
                                                'reg':0,
                                                'llamadaTipo':array[7].value,
                                                'idLlamada':Ext.getCmp('idFrmCambioEstatus').getForm().findField('idLlamada').getValue()
                                                }
                                        });
                                        wnd.close();
                                    }
                                },
                                icon: Ext.MessageBox.WARNING
                            });
                        }
                    },'-',' ',' ',' ','-',{
                        text:'Información Paciente',
                        iconCls:'icn-editausr',
                        statusAlign:'center',
                        handler:function(){
				cargarBitacoraCliente(Ext.getCmp('idFrmCambioEstatus').getForm().findField('nombre').getValue(), Ext.getCmp('idFrmCambioEstatus').getForm().findField('idCliente').getValue());
                        }
                    },'-','->','-',{
                        text:'Éxitosa',
                        iconCls:'icn-habilita',
                        statusAlign:'center',
                        handler:function(){
						/*var msg2 = Ext.MessageBox.show({
                               title: 'Cargando...',
                               msg: 'Cargando información, espere por favor...',
                               progressText: 'Cargando...',
                               width:300,
                               wait:true,
                               waitConfig: {interval:200},
                               animEl: 'mb7'
                       });*/
						
							submitFormulario(Ext.getCmp('idFrmCambioEstatus'),{
								'ld_id_tipo_llamada':2,
                                'idAcc':idAccion,
                                'idTree':idArbol,
                                'reg':1,
                                'exit':0,
                                'horarioLlamada':Date.parseDate(Ext.getCmp('idHorarioLlamada').getValue(), Ext.getCmp('idHorarioLlamada').format).format('H:i'),
                                'valorProtocolo':valorProtocolo
								

                            })
						
                            /*submitFormulario(Ext.getCmp('idFrmCambioEstatus'),{
                                'ld_id_tipo_llamada':2,
                                'idLlamada':array[0].value,
                                'ld_comentarios':Ext.getCmp('idFrmCambioEstatus').getForm().findField('ld_comentarios').getValue(),
                                'tipoLlamada':Ext.getCmp('idFrmCambioEstatus').getForm().findField('tipoLlamada').getValue(),
                                'idAcc':idAccion,
                                'idTree':idArbol,
                                'reg':1,
                                'exit':1,
                                'valorProtocolo':valorProtocolo
									
                            })*/
				//msg2.hide();
                            //setTimeout("cargarBitacoraCliente(Ext.getCmp('idFrmCambioEstatus').getForm().findField('nombre').getValue(), Ext.getCmp('idFrmCambioEstatus').getForm().findField('idCliente').getValue()); Ext.getCmp('idWndCambioEstatus').close();",700);
					
                        }
                    },'-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-',{
                        text:'Guardar',
                        iconCls:'icn-guardar',
                        handler:function(){
                            submitFormulario(Ext.getCmp('idFrmCambioEstatus'),{
                                'idAcc':idAccion,
                                'idTree':idArbol,
                                'reg':1,
                                'exit':0,
                                'horarioLlamada':Date.parseDate(Ext.getCmp('idHorarioLlamada').getValue(), Ext.getCmp('idHorarioLlamada').format).format('H:i'),
                                'valorProtocolo':valorProtocolo

                            })
							

                        }
                    }
                    ]
                });
                wnd.show();
                msg1.hide();





            }
            

        });
	
	
		
		
    }
	
    return this.pnlControlLlamadas;
	
}