/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns('com.punto.pen');
var tol;

com.punto.pen.PanelBuscadorFuerzaVenta = function(argumentos){
    var pnlId = (argumentos.id==null ? '' : argumentos.id);
    var idMod = (argumentos.idMod==null ? '0' : argumentos.idMod);


    //creando el repositorio de datos
    var storeBuscadorFv = new Ext.data.Store({
        autoLoad: false,
        baseParams: {
            bnd:1
        },
        reader :new Ext.data.JsonReader( {
            totalProperty: 'total',
            root :'records',
            idProperty: 'id'
        },new com.punto.pen.RecordBuscadorFv()),
        proxy :new Ext.data.HttpProxy( {
            url : contexto+'/FuerzaVenta?bnd=1',
            timeout: 300000
        })
    });

    var pbarBuscadorFv = new Ext.PagingToolbar({
        id          : 'pgrid',
        width       : 420,
        pageSize    : 20,
        store       : storeBuscadorFv,
        displayInfo : true,
        displayMsg  : 'Mostrando {0} - {1} Representante FV de {2}',
        emptyMsg    : "No hay datos para mostrar"
    });

    /*** Eventos o Métodos ***/
    function BuscarRepFV(prm){
        var grd = Ext.getCmp('gridBuscadorFv');
        var store = grd.getStore();
        store.on('beforeload', function() {
            store.baseParams = prm;
        });
        store.load({
            params:{
                start:0,
                limit:20,
                bnd:1
            }
        });
    }

    function clickBtnBuscarFV(){
        var frm = Ext.getCmp(pnlId).getForm();
        if((frm.findField('idFv').getValue()=='')&&(frm.findField('nombre').getValue()=='')&&(frm.findField('apaterno').getValue()=='')
            &&(frm.findField('amaterno').getValue()=='')&&(frm.findField('Estado').getValue()=='')

            ){
            Ext.MessageBox.alert('Mensaje de Error', "Debe llenar al menos un campo.");
        }else{
            if(frm.isValid()){
                BuscarRepFV(frm.getValues(false));
            }else{
                Ext.Msg.alert("Campos Vacíos","Debe ingresar por lo menos un critério de búsqueda.");
            }
        }
    }

    function clickBtnLimpiarFv(){
        var frm = Ext.getCmp(pnlId).getForm();
        frm.reset();
    }


    /*** Páneles o Contenedores ***/

    this.pnlBuscadorFv = new Ext.form.FormPanel({
        id: pnlId,
        title:"Buscador Representantes de FV",
        layout:"border",
        region:"center",
        width:986,
        height:420,
        frame: true,
        items:[{
            xtype:"panel",
            title:"",
            layout:"column",
            anchor:"100%",
            region:"north",
            height:95,
            border:false,
            bodyStyle:"padding: 5px",
            buttonAlign:"center",
            items:[{
                xtype:"panel",
                title:"",
                columnWidth:0.13,
                layout:"form",
                labelAlign:"top",
                border:false,
                bodyStyle:"padding 5px;",
                items:[{
                    xtype:"numberfield",
                    width:70,
                    tabIndex:1,
                    name:'idFv',
                    fieldLabel:"No. Empleado",
                    enableKeyEvents:true,
                    listeners:{
                        'keypress':
                        function(txtField,e){
                            if(e.keyCode==13){
                                clickBtnBuscarFV();
                            }
                        }
                    }
                }]
            },
            {
                xtype:"panel",
                columnWidth:0.19,
                layout:"form",
                labelAlign:"top",
                border:false,
                bodyStyle:"padding 5px;",
                items:[{
                    xtype:"textfield",
                    width:120,
                    tabIndex:3,
                    name:'nombre',
                    fieldLabel:"Nombre",
                    enableKeyEvents:true,
                    style:'text-transform: uppercase;',
                    listeners:{
                        blur:function(el){
                            el.setValue(el.getValue().trim());
                        },
                        'keyup' : function(elem, e){
                            elem.setValue(elem.getValue().toUpperCase());
                        },
                        'keypress':
                        function(txtField,e){
                            if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                                e.stopEvent();
                            }
                            if(e.keyCode==13){
                                clickBtnBuscarFV();
                            }
                        }
                    }
                }]
            },{
                xtype:"panel",
                columnWidth:0.19,
                layout:"form",
                labelAlign:"top",
                border:false,
                bodyStyle:"padding 5px;",
                items:[{
                    xtype:"textfield",
                    width:120,
                    name:'apaterno',
                    tabIndex:4,
                    enableKeyEvents:true,
                    fieldLabel:"Apellido Paterno",
                    style:'text-transform: uppercase;',
                    listeners:{
                        blur:function(el){
                            el.setValue(el.getValue().trim());
                        },
                        'keyup' : function(elem, e){
                            elem.setValue(elem.getValue().toUpperCase());
                        },
                        'keypress':
                        function(txtField,e){
                            if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                                e.stopEvent();
                            }
                            if(e.keyCode==13){
                                clickBtnBuscarFV();
                            }
                        }
                    }
                }]
            },{
                xtype:"panel",
                columnWidth:0.19,
                layout:"form",
                labelAlign:"top",
                border:false,
                bodyStyle:"padding 5px;",
                items:[{
                    xtype:"textfield",
                    width:120,
                    name:'amaterno',
                    enableKeyEvents:true,
                    fieldLabel:"Apellido Materno",
                    tabIndex:5,
                    style:'text-transform: uppercase;',
                    listeners:{
                        blur:function(el){
                            el.setValue(el.getValue().trim());
                        },
                        'keyup' : function(elem, e){
                            elem.setValue(elem.getValue().toUpperCase());
                        },
                        'keypress':
                        function(txtField,e){
                            if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                                e.stopEvent();
                            }
                            if(e.keyCode==13){
                                clickBtnBuscarFV();
                            }
                        }
                    }
                }]
            },{
                xtype:"panel",
                columnWidth:0.17,
                layout:"form",
                labelAlign:"top",
                border:false,
                bodyStyle:"padding 5px",
                items:[
                new com.punto.pen.ComboBox({
                    id:"idComboEstado",
                    etiqueta:"Ciudad",
                    tabIndex:6,
                    name:"Estado",
                    prm:{
                        campo:'edo',
                        idCampo:'idEdo',
                        bnd:1,
                        qry:1,
                        autoCarga:true
                    },
                    evt:{
                        'select':function(cmb,rec,idx){
                            clickBtnBuscarFV();
                        }
                    },
                    enableKeyEvents:true,
                    listeners:{
                        'keypress':
                        function(txtField,e){
                            if(e.keyCode==13){
                                clickBtnBuscarFV();
                            }
                        }
                    }
                })]
            }],
            buttons:[
            {
                text:"Buscar",
                handler:clickBtnBuscarFV,
                tabIndex:7,
                iconCls:'icn-busquedaDos'
            },

            {
                text:"Limpiar",
                handler:clickBtnLimpiarFv,
                tabIndex:8,
                iconCls:'icn-limpiarBusqueda'
            },

            {
                text:"Nuevo Fv",
                tabIndex:9,
                handler:function(){
                    var wnd = new Ext.Window({
                        title:'Nuevo Representante de Fv',
                        id:'idWndRegistroFV',
                        width:850,
                        height:250,
                        constrainHeader :true,
                        constrain :true,
                        resizable : false,
                        modal:true,
                        border:false,
                        autoScroll:false,
                        items:[
                        new com.punto.pen.PanelAltaFV({
                            id:'newFVFrm',
                            url:contexto+'/FuerzaVenta'
                        })
                        ],
                        buttons:[
                        {
                            text:'Registrar',
                            tabIndex:108,
                            handler:function(){
                                submitFormulario(Ext.getCmp('newFVFrm'),{
                                    bnd:2,
                                    wnd:'idWndRegistroFV'
                                });
                            }
                        },
                        {
                            text:'Cancelar',
                            handler:function(){
                                wnd.close();
                            }
                        }
                        ]
                    });
                    wnd.show();
                },
                iconCls:'icn-addusr'
            }
            ]
        },
        {
            xtype           :"grid",
            id              : "gridBuscadorFv",
            title           : "Representantes Encontrados",
            region          :'center',
            columnWidth     : 0.7,
            store           : storeBuscadorFv,
            stripeRows      : true, 
            height          : 125,
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
            border          : false,
            bbar            : [pbarBuscadorFv],
            columns         : [
            new Ext.grid.RowNumberer(),
            {
                id:'idFV',
                hidden:true,
                dataIndex: 'idFV'
            },

            {
                header: "No. Empleado",
                width: 60,
                sortable: true,
                dataIndex: 'folio'
            },
            {
                header: "Nombre",
                width: 75,
                sortable: true,
                dataIndex: 'nombre'
            },

            {
                header: "Ap. Paterno",
                width: 75,
                sortable: true,
                dataIndex: 'apaterno'
            },

            {
                header: "Ap. Materno",
                width: 75,
                sortable: true,
                dataIndex: 'amaterno'
            },
            {
                header: "Ciudad",
                width: 75,
                sortable: true,
                dataIndex: 'estado'
            },
             {
                header: "Linea Terapeutica",
                width: 75,
                sortable: true,
                dataIndex: 'linea'
            },
             {
                header: "Email",
                width: 75,
                sortable: true,
                dataIndex: 'email'
            }
            ]
        }
        ]
    });

    return this.pnlBuscadorFv;
}