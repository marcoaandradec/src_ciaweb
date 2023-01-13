/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns("com.punto.pen");

com.punto.pen.codPostal = function(){

    this.storeCodPostal = new Ext.data.Store({
        autoLoad: false,
        reader :new Ext.data.JsonReader( {
            totalProperty: 'total',
            root :'records',
            idProperty: 'id'
        },new com.punto.pen.RecordCodPostal()),
        proxy :new Ext.data.HttpProxy( {
            url : contexto+'/Cliente?bnd=7'
        })
    });

    this.pbarCodPostal = new Ext.PagingToolbar({
        id          : 'pgrid', 
        pageSize    : 20,
        store       : this.storeCodPostal,
        displayInfo : true,
        displayMsg  : 'Mostrando {0} - {1} Clientes de {2}',
        emptyMsg    : "No hay datos para mostrar"
    });

    function BuscarCp(prm,cp){
        var grd = Ext.getCmp('gridBuscadorCp');
        var store = grd.getStore();
        store.on('beforeload', function() {
            store.baseParams = prm;
        });
        store.load({params:{start:0,limit:20,bnd:7,cp:cp}});
    }

    function clickBtnBuscar(){
        var valor = Ext.getCmp('idBuscaPorCp');
        if(valor.getValue()==''){
            Ext.MessageBox.alert('Mensaje de Error', "Debe escribir un codigo postal para realizar la busqueda.");
        }else{
            if(valor.isValid()){
                BuscarCp({},valor.getValue());
            }else{
               Ext.MessageBox.alert('Mensaje de error','Dato invalido');
            }
        }
    }

    this.pnlBuscadorCp = new Ext.grid.GridPanel({
        name            :"pnBuscCP",
        title           :"Buscar por codigo postal",
        border          : false,
        id              : "gridBuscadorCp",
        store           : this.storeCodPostal,
        stripeRows      : true,
        sm              : new Ext.grid.RowSelectionModel({singleSelect:true}),
        loadMask        : true,
        viewConfig      : {autoFill: true, forceFit: true},
        enableHdMenu    : true,
        autoScroll      : true,
        frame           : false,
        tbar            : new Ext.Toolbar({
                            items:[
                                {
                                    xtype:"textfield",
                                    id:'idBuscaPorCp',
                                    name:"buscaPorCp",
                                    fieldLabel:"Codigo Postal",
                                    width:80,
                                    maxLength:5,
                                    minLength:5,
                                    enableKeyEvents:true,
                                    listeners:{'keypress':
                                        function(txtField,e){
                                            if(e.keyCode==13){
                                                clickBtnBuscar();
                                            }
                                        }
                                    }
                                },
                                {text:'Buscar',iconCls:'icn-busquedaDos',
                                    handler:function(){
                                          clickBtnBuscar();
                                    }
                                }
                            ]
                        }),
        bbar            : this.pbarCodPostal,
        columns         : [
            new Ext.grid.RowNumberer(),
            {id:'idCodigo',header: "ID", width: 60, sortable: true, dataIndex: 'idCodigo'},
            {header: "Codigo Postal", width: 75, sortable: true, dataIndex: 'codigoPostal'},
            {header: "Colonia", width: 75, sortable: true, dataIndex: 'colonia'},
            {header: "Del./Mnpo.", width: 75, sortable: true, dataIndex: 'delmnpo'},
            {header: "Estado", width: 75, sortable: true, dataIndex: 'estado'}
        ]
    });

        return this.pnlBuscadorCp;
}