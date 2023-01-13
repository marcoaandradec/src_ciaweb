/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns('com.punto.pen');
com.punto.pen.PanelPreguntasWeb = function(argumentos){
    this.titulo      = (argumentos.titulo == null ? "" : argumentos.titulo);
    this.autoScroll  = (argumentos.scroll==null ? true : argumentos.scroll);
    var id           = (argumentos.id==null ? '' : argumentos.id);
    var idAcc = (argumentos.idAcc==null ? '' : argumentos.idAcc);
    idAccion = idAcc;
    var idTree = (argumentos.idTree==null ? '' : argumentos.idTree);
    idArbol = idTree;

    var storePreg = new Ext.data.Store({
        autoLoad: true,
        baseParams: {'bnd':1,'status':'1,3','grd':id},
        reader :new Ext.data.JsonReader( {
            totalProperty: 'total',
            root :'records',
            idProperty: 'id'
        },new com.punto.pen.RecordPreguntasWeb()),
        proxy :new Ext.data.HttpProxy( {
            url : contexto+'/Preguntas',
            timeout:60000
        }),
        listeners:{
            'beforeload':function(st){
                var cmb = Ext.getCmp('cmbTipoPreg');
                if(cmb != undefined){
                    st.baseParams = {'bnd':1,'status':cmb.getValue(),'grd':id,start:0,limit:20};
                }
            }
        }
    });
    var preguntastbar = new Ext.Toolbar({
        id: 'preguntasTbar',
        items: [
            {xtype:'button',text:'Regresar',iconCls:'icn-back',
                handler:function(){
                    IniciarAccion(idArbol,false,false,'pnlCenter',new com.punto.pen.PanelBienvenida({msg:'Contact Center'}));
                }
            },
            '-',
            {xtype:'button',text:'Contestar Pregunta',iconCls:'icn-contestarPregunta',
                handler:function(){
                    fnElegirPrg(Ext.getCmp(id));
                }
            },
            {xtype:'tbseparator'},
            {xtype:'combo',id:'cmbTipoPreg',allowBlank:false,
                displayField: 'status',valueField: 'idStatus',mode:'local',value:'1,3',//value:'Asesorías Pendientes',
                listeners:{
                    'select':function(cmb){
                        storePreg.load({start:0,limit:20});
                    }
                },
                store:new Ext.data.SimpleStore({
                    autoLoad: true,
                    fields:['idStatus','status'],
                    data:[
                        ['1,3','Todas las preguntas'],['1','Preguntas Pendiente'],['3','Preguntas Contestadas']
                    ]
                }),
                triggerAction:'all',width:150,listWidth:150,forceSelection:true
            }
        ]
    });

    var preguntaspbar = new Ext.PagingToolbar({
        id          : 'preguntasPgrid',
        pageSize    : 20,
        store       : storePreg,
        displayInfo : true,
        displayMsg  : 'Mostrando preguntas {0} - {1} of {2}',
        emptyMsg    : "No hay preguntas para mostrar"
    });

    this.grd = new Ext.grid.GridPanel({
        title       : this.titulo,
        id          : id,
        forceLayout : true,
        store       : storePreg,
        columns     : [
            {header: 'Contestar',dataIndex: 'elegir',sortable:true,width:40},
            {header: 'Origen',dataIndex: 'origen',sortable:true,width:60,
                renderer:function(val){
                    return "<b><font color=\"#428BDD\">"+val+"</font></b>";
                }
            },
            {header: 'Nombre',dataIndex: 'nombre_cnt',sortable:true},
            {header: 'Telefono',dataIndex: 'telefono',width:50,sortable:true},
            {header: 'Fecha',dataIndex: 'fecha_registro',width:75,sortable:true},
            {header: 'Pregunta',dataIndex: 'pregunta_snap'},
            {header: 'Status',dataIndex: 'status_letra',width:45,sortable:true},
            {header: 'Quien Contestó',dataIndex: 'nombre_usr',sortable:true}
        ],
        tbar        : preguntastbar,
        bbar        : preguntaspbar,
        sm          : new Ext.grid.RowSelectionModel({singleSelect:true}),
        stripeRows  : true,
        loadMask    : true,
        viewConfig  : {autoFill: true, forceFit: true},
        autoWidth   : true,
        enableHdMenu: true,
        autoScroll  : this.autoScroll,
        frame       : false,
        border      : false,
        listeners   : {
            'show':function(){
                storePreg.load({start:0,limit:20});
            },
            'rowdblclick':function(grd){
                fnElegirPrg(grd);
            }
        }
    });
    return this.grd;
}

