/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns('com.punto.pen');

com.punto.pen.PanelBitacoraPaciente = function(argumentos){
    var idBi = (argumentos.idBi==null ? 'gridBuscadorBitacora' : argumentos.idBi);
    this.idMod = (argumentos.idMod==null ? '0' : argumentos.idMod);
    this.border = (argumentos.border==null ? true : argumentos.border);
    this.region = (argumentos.region==null ? '' : argumentos.region);
    this.anchor = (argumentos.anchor==null ? '' : argumentos.anchor);
    this.columnWidth = (argumentos.columnWidth==null ? 1 : argumentos.columnWidth);
    var idCnt = (argumentos.idCnt==null ? '' : argumentos.idCnt);
    var Store = (argumentos.Store==null ? 1 : argumentos.Store);
    var height= (argumentos.height==null ? 500 : argumentos.height);
    var load= (argumentos.load==null ? true : argumentos.load);


    function StoreBit(){
        var param={};
        if(Store==1){
            param={
                'bnd':3,
                'idCnt':idCnt
            };           
        }else if(Store==2){
            param={
                'bnd':14,
                'idCnt':idCnt
            };           
        }
        return param;
    }

    var storeBitacoraPaciente = new Ext.data.Store({
        autoLoad: load, //true para q carge al inicio de session, false no haga nada
        baseParams:StoreBit(),
        reader :new Ext.data.JsonReader( {
            totalProperty: 'total',
            root :'records',
            idProperty: 'id'
        },new com.punto.pen.RecordBitacoraPaciente()),
        proxy :new Ext.data.HttpProxy( {
            url : contexto+'/Cliente'
        })
    });

    function Paginacion(){
        var pbarBuscadorBit=null;
        if(Store==2){
            pbarBuscadorBit = new Ext.PagingToolbar({
                id          : 'pgridBita',
                pageSize    : 20,
                store       : storeBitacoraPaciente,
                displayInfo : true,
                displayMsg  : 'Mostrando {0} - {1} Registro de {2}',
                emptyMsg    : "No hay datos para mostrar"
            });
        }
        return pbarBuscadorBit;
    }
    

    this.pnlBit = new Ext.grid.GridPanel({
        //id              : this.id,
        id              : idBi,
        region          : this.region,
        title           :"Bitacora de Actividades",
        anchor          : this.anchor,            
        columnWidth     : this.columnWidth,
        height          : height,
        store           : storeBitacoraPaciente,
        stripeRows      : true,
        sm              : new Ext.grid.RowSelectionModel({
            singleSelect:true
        }),
        loadMask        : true,
        viewConfig      : {
            autoFill: true,
            forceFit: true
        },
        enableHdMenu    : true,
        autoScroll      : true,
        frame           : false,
        border          : this.border,
        tbar            : new Ext.Toolbar({
            items:[
            {
                text:'Ver Detalle',
                iconCls:'icn-buscarPregunta',
                hidden:false,
                handler:function(){
                    var grd = Ext.getCmp(idBi);
                    var record = grd.getSelectionModel().getSelected();
                    if(record!=null){
                        var wnd = new Ext.Window({
                            title:'Detalle Bitacora',
                            id:'idWndBitacora',
                            width:600,
                            height:550,
                            constrainHeader :true,
                            constrain :true,
                            resizable : false,
                            modal:true,
                            border:false,
                            autoScroll:false,
                            draggable:true,
                            resizable:false,
                            bodyStyle:"padding: 1px;font-family:Arial;font-size:11px;",
                            autoLoad:{
                                url:contexto+'/Cliente',
                                params:{
                                    bnd:8,
                                    'idActividad':record.get('idActividad'),
                                    'idGenerico':record.get('idGenerico'),
                                    'idBitacora':record.get('idBitacora')
                                },
                                text:'Cargando información...'
                            },
                            buttons:[
                            {
                                text:'Salir',
                                handler:function(){
                                    wnd.close();
                                }
                            }
                            ]
                        });
                        wnd.show();
                    }else{
                        Ext.Msg.alert("Error de Selección "," Debe seleccionar una actividad para continuar");
                    }
                }
            }
            ]
        }),
        bbar            : Paginacion(),
        columns         : [
        new Ext.grid.RowNumberer(),
        {
            header: "Fecha",
            width: 70,
            sortable: true,
            dataIndex: 'fecha',
            fixed:true
        },
        
        {
            header: "Campaña",
            width: 75,
            sortable: true,
            dataIndex: 'campania'
        },

        {
            header: "Producto",
            width: 75,
            sortable: true,
            dataIndex: 'producto'
        },

        {
            header: "Lugar",
            width: 75,
            sortable: true,
            dataIndex: 'lugar'
        },

        {
            header: "Actividad",
            width: 75,
            sortable: true,
            dataIndex: 'actividad'
        },

        {
            header: "Quién Atendió",
            width: 75,
            sortable: true,
            dataIndex: 'quien_atendio'
        },

        {
            header: "Observaciones",
            width: 120,
            sortable: true,
            dataIndex: 'observacion'
        }
        ]
    });

    return this.pnlBit;
}