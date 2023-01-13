//Ext.onReady(function(){		
					 
Ext.ns('com.punto.pen');
	
com.punto.pen.regAgendaLlamada= function(argumentos){
	
    var pnlId = (argumentos.id==null ? '' : argumentos.id);
    var idMod = (argumentos.idMod==null ? '0' : argumentos.idMod);
    var idAcc = (argumentos.idAcc==null ? '' : argumentos.idAcc);
    idAccion = idAcc;
    var idTree = (argumentos.idTree==null ? '' : argumentos.idTree);
    idArbol = idTree;
    // var punto = '';
    this.titulo = (argumentos.titulo==null ? 'Agenda de Llamadas Outbound' : argumentos.titulo);
	
     cargarBitacoraCliente = function(nombreCliente, idCliente){
        contenedor=true;
        var wndPerfilPaciente = new Ext.Window({
            id:'idWindowSesionPaciente',
            layout:'fit',
            height:600,
            width:1300,
            items:[
                new com.punto.pen.PanelSesionPaciente({
                    'idContenedor':'idWindowSesionPaciente',
                    id:'pnlSesionPacienteLlamada',
                    'idCnt':idCliente,
                    'idAcc':idAcc,
                    'idTree':idTree,
                    nameCnt : nombreCliente,
                    TipoPac: 'PACIENTE',
                    'mostrarBack':true,
                    'pnlBack':com.punto.pen.regAgendaLlamada,
                    'prmBack':{id:'idAgendaLlamadas',region:'center',titulo:'Llamadas Outbound',idTree:'pnlTreeAccionesCC',idAcc:66,height:350,modal:true}

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
    }
	
	
	var xg = Ext.grid;	
	
    var str = new Ext.data.Store({
        autoLoad: false,
        //baseParams : {tipoLlamada:1},
        reader : new Ext.data.JsonReader(
        {
            totalProperty : 'total',
            root : 'records',
            idProperty : 'id'
        },
        new com.punto.pen.RecordAgendaLlamada()
            ),
        proxy : new Ext.data.HttpProxy( {
            url : contexto+'/AgendaLlamada?tipoLlamada=2'
        })
    });
	
    var str2 = new Ext.data.Store({
        autoLoad: false,
        //baseParams : {tipoLlamada:1},
        reader : new Ext.data.JsonReader(
        {
            totalProperty : 'total',
            root : 'records',
            idProperty : 'id'
        },
        new com.punto.pen.RecordAgendaLlamada()
            ),
        proxy : new Ext.data.HttpProxy( {
            url : contexto+'/AgendaLlamada?tipoLlamada=1'
        })
    });
	
    var str3 = new Ext.data.Store({
        autoLoad: false,
        //baseParams : {tipoLlamada:1},
        reader : new Ext.data.JsonReader(
        {
            totalProperty : 'total',
            root : 'records',
            idProperty : 'id'
        },
        new com.punto.pen.RecordAgendaLlamada()
            ),
        proxy : new Ext.data.HttpProxy( {
            url : contexto+'/AgendaLlamada?tipoLlamada=3'
        })
    });
	
    this.pnlAgendaLlamadas = new Ext.Panel({
        id: pnlId,
        title:this.titulo,
        autoScroll: true,
        border:false,
        tbar : [
        {
            text: 'Regresar',
            iconCls:'icn-back',
            handler: function(){
                IniciarAccion('pnlTreeAccionesCC',false,false,'pnlCenter',new com.punto.pen.PanelBienvenida({
                    msg:'Módulo Contact Center'
                }));
            }
				
		
        }],
        items:[	new xg.GridPanel({
            id:'grid',
            store: str,
            columns: [
            new Ext.grid.RowNumberer({
                header : '#' ,
                width : 20
            }),

            {
                header: "Llamada",
                width: 20,
                sortable: true,
                dataIndex: 'elegir'
            },

            {
                header: "Tipo Actividad",
                width: 20,
                sortable: true,
                dataIndex: 'tipoActividad'
            },

            {
                header: "Referente",
                width: 20,
                sortable: true,
                dataIndex: 'referente'
            },

            {
                header: "Nombre",
                width: 40,
                sortable: true,
                dataIndex: 'nombre'
            },

            {
                header: "Telefono Casa",
                width: 20,
                sortable: true,
                dataIndex: 'telCasa'
            },

            {
                header: "Telefono Celular",
                width: 20,
                sortable: true,
                dataIndex: 'telCelular'
            },

            {
                header: "Telefono Oficina",
                width: 20,
                sortable: true,
                dataIndex: 'telOficina'
            },

            {
                header: "Extension Oficina",
                width: 20,
                sortable: true,
                dataIndex: 'extOficina'
            },

            {
                header: "Fecha de Llamada",
                width: 20,
                sortable: true,
                dataIndex: 'fechaLlamada'
            },

            {
                header: "Fecha Previa de Llamada",
                width: 30,
                sortable: true,
                dataIndex: 'previaLlamada'
            },

            {
                header: "Fecha Posterior de Llamada",
                width: 30,
                sortable: true,
                dataIndex: 'posteriorLlamada'
            },

            {
                header: "Prioridad",
                width: 15,
                sortable: true,
                dataIndex: 'prioridad'
            },

            {
                header: "Estatus",
                width: 20,
                sortable: true,
                dataIndex: 'estatus'
            }
            ],

            bbar:new Ext.PagingToolbar({
                pageSize    : 20,
                store       : str,
                displayInfo : true,
                displayMsg  : 'Mostrando {0} - {1} de {2}',
                emptyMsg    : "No hay datos para mostrar"
            }),

            stripeRows: true,
            loadMask  : false,
            viewConfig: {
                autoFill: true,
                forceFit: true
            },
            autoScroll: true,
            frame: false,
            border: false,
            width: '100%',
            height: 200,
            collapsible: true,
            animCollapse: false,
            title: 'Llamadas Outbound Cumplea&ntilde;os',
            iconCls: 'icon-grid',
            renderTo: document.body
    
	
        }),
	
        new xg.GridPanel({
            id:'grid2',
            store: str2,
            columns: [
            new Ext.grid.RowNumberer({
                header : '#' ,
                width : 20
            }),

            {
                header: "Llamada",
                width: 20,
                sortable: true,
                dataIndex: 'elegir'
            },

            {
                header: "Tipo Actividad",
                width: 20,
                sortable: true,
                dataIndex: 'tipoActividad'
            },

            {
                header: "Referente",
                width: 20,
                sortable: true,
                dataIndex: 'referente'
            },

            {
                header: "Nombre",
                width: 40,
                sortable: true,
                dataIndex: 'nombre'
            },

            {
                header: "Telefono Casa",
                width: 20,
                sortable: true,
                dataIndex: 'telCasa'
            },

            {
                header: "Telefono Celular",
                width: 20,
                sortable: true,
                dataIndex: 'telCelular'
            },

            {
                header: "Telefono Oficina",
                width: 20,
                sortable: true,
                dataIndex: 'telOficina'
            },

            {
                header: "Extension Oficina",
                width: 20,
                sortable: true,
                dataIndex: 'extOficina'
            },

            {
                header: "Fecha de Llamada",
                width: 20,
                sortable: true,
                dataIndex: 'fechaLlamada'
            },

            {
                header: "Fecha Previa de Llamada",
                width: 30,
                sortable: true,
                dataIndex: 'previaLlamada'
            },

            {
                header: "Fecha Posterior de Llamada",
                width: 30,
                sortable: true,
                dataIndex: 'posteriorLlamada'
            },

            {
                header: "Prioridad",
                width: 15,
                sortable: true,
                dataIndex: 'prioridad'
            },

            {
                header: "Estatus",
                width: 20,
                sortable: true,
                dataIndex: 'estatus'
            }
            ],

            bbar:new Ext.PagingToolbar({
                pageSize    : 20,
                store       : str2,
                displayInfo : true,
                displayMsg  : 'Mostrando {0} - {1} de {2}',
                emptyMsg    : "No hay datos para mostrar"
            }),


            
            stripeRows: true,
            loadMask  : false,
            viewConfig: {
                autoFill: true,
                forceFit: true
            },
            autoScroll: true,
            frame: false,
            border: false,
            width: '100%',
            height: 200,
            collapsible: true,
            animCollapse: false,
            title: 'Llamadas Outbound Seguimiento',
            iconCls: 'icon-grid',
            renderTo: document.body
    
	
        }),
	
        new xg.GridPanel({
            id:'grid3',
            store: str3,
            columns: [
            new Ext.grid.RowNumberer({
                header : '#' ,
                width : 20
            }),

            {
                header: "Llamada",
                width: 20,
                sortable: true,
                dataIndex: 'elegir'
            },

            {
                header: "Tipo Actividad",
                width: 20,
                sortable: true,
                dataIndex: 'tipoActividad'
            },

            {
                header: "Referente",
                width: 20,
                sortable: true,
                dataIndex: 'referente'
            },

            {
                header: "Nombre",
                width: 40,
                sortable: true,
                dataIndex: 'nombre'
            },

            {
                header: "Telefono Casa",
                width: 20,
                sortable: true,
                dataIndex: 'telCasa'
            },

            {
                header: "Telefono Celular",
                width: 20,
                sortable: true,
                dataIndex: 'telCelular'
            },

            {
                header: "Telefono Oficina",
                width: 20,
                sortable: true,
                dataIndex: 'telOficina'
            },

            {
                header: "Extension Oficina",
                width: 20,
                sortable: true,
                dataIndex: 'extOficina'
            },

            {
                header: "Fecha de Llamada",
                width: 20,
                sortable: true,
                dataIndex: 'fechaLlamada'
            },

            {
                header: "Fecha Previa de Llamada",
                width: 30,
                sortable: true,
                dataIndex: 'previaLlamada'
            },

            {
                header: "Fecha Posterior de Llamada",
                width: 30,
                sortable: true,
                dataIndex: 'posteriorLlamada'
            },

            {
                header: "Prioridad",
                width: 15,
                sortable: true,
                dataIndex: 'prioridad'
            },

            {
                header: "Estatus",
                width: 20,
                sortable: true,
                dataIndex: 'estatus'
            }
            ],

            bbar:new Ext.PagingToolbar({
                pageSize    : 20,
                store       : str3,
                displayInfo : true,
                displayMsg  : 'Mostrando {0} - {1} de {2}',
                emptyMsg    : "No hay datos para mostrar"
            }),

            stripeRows: true,
            loadMask  : false,
            viewConfig: {
                autoFill: true,
                forceFit: true
            },
            autoScroll: true,
            frame: false,
            border: false,
            width: '100%',
            height: 200,
            collapsible: true,
            animCollapse: false,
            title: 'Llamadas Outbound Prospecto',
            iconCls: 'icon-grid',
            renderTo: document.body
    
	
        })]

    });
    var store = Ext.getCmp('grid').getStore();
    var store2 = Ext.getCmp('grid2').getStore();
    var store3 = Ext.getCmp('grid3').getStore();
	
    Ext.TaskMgr.start({
        run: function(){
            store.load({
                params:{
                    tipoLlamada:1,
                    start:0,
                    limit:20
                }
            });
            store2.load({
                params:{
                    tipoLlamada:2,
                    start:0,
                    limit:20
                }
            });
            store3.load({
                params:{
                    tipoLlamada:3,
                    start:0,
                    limit:20
                }
            });
        },
        interval: 300000
    });
	
	 
    estatusLlamada = function(id_llamada, valorProtocolo){
        var array = new Array();
        /*Ext.Ajax.request({
			url:contexto+'/GuardarEstatusLlamada',
			params:{'reg':0,'llamadaTipo':14,'idLlamada':id_llamada}
		});*/
		
        Ext.Ajax.request({
            url:contexto+'/ControlLlamadas',
            params:{
                'bnd':4,
                'protocolo':valorProtocolo,
				'idLlamada':id_llamada
            },
            success:function(rsp){
                array = eval("("+rsp.responseText+")");
			
                Ext.Ajax.request({
                    url:contexto+'/GuardarEstatusLlamada',
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
                            if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
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
							submitFormulario(Ext.getCmp('idFrmCambioEstatus'),{
								'ld_id_tipo_llamada':2,
                                'idAcc':idAccion,
                                'idTree':idArbol,
                                'reg':1,
								'exit':2,
                                'horarioLlamada':Date.parseDate(Ext.getCmp('idHorarioLlamada').getValue(), Ext.getCmp('idHorarioLlamada').format).format('H:i'),
                                'valorProtocolo':valorProtocolo

                            })
							wnd.close();

                            

                        }
                    },'-',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','-',{
                        text:'Guardar',
                        iconCls:'icn-guardar',
                        handler:function(){
                            submitFormulario(Ext.getCmp('idFrmCambioEstatus'),{
                                'idAcc':idAccion,
                                'idTree':idArbol,
                                'reg':1,
                                'horarioLlamada':Date.parseDate(Ext.getCmp('idHorarioLlamada').getValue(), Ext.getCmp('idHorarioLlamada').format).format('H:i'),
                                'valorProtocolo':valorProtocolo

                            })
							
							wnd.close();


                        }
                    }
                    ]
                });
                wnd.show();
            }
            

        });
    }
	
    return this.pnlAgendaLlamadas;
}
	
//});