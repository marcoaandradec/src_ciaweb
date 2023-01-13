/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns('com.punto.pen');
var tol;

com.punto.pen.PanelBuscadorMedico = function(argumentos){
    var pnlId = (argumentos.id==null ? '' : argumentos.id);
    var idMod = (argumentos.idMod==null ? '0' : argumentos.idMod);
    var Busq=(argumentos.bndBusq==null ? '0' : argumentos.bndBusq);
    var titulo=(argumentos.titulo==null ? 'Buscador de Médicos' : argumentos.titulo);
    var tituloGrid=(argumentos.titulo==null ? 'Médicos Encontrados' : argumentos.titulo);
    var altoT=tamanio(Busq);
    var hiddenColum=hiddenColum(Busq);

    function tamanio(bndBusq){
        var t=425;
        if(bndBusq==1){
            t=315;
        }
        return t;
    }

    function hiddenColum(bndBusq){
        var t=true;
        if(bndBusq==1){
            t=false;
        }
        return t;
    }

    var storeBuscadorMedico = new Ext.data.Store({
        autoLoad: false,
        baseParams: {
            bnd:1,
            'Busq':Busq
        },
        reader :new Ext.data.JsonReader( {
            totalProperty: 'total',
            root :'records',
            idProperty: 'id'
        },new com.punto.pen.RecordBuscadorMedico()),
        proxy :new Ext.data.HttpProxy( {
            url : contexto+'/Medico?bnd=1&Busq='+Busq,
            timeout: 300000
        })
    });

    var pbarBuscadorMedico = new Ext.PagingToolbar({
        id          : 'pgrid',
        width       : 420,
        pageSize    : 20,
        store       : storeBuscadorMedico,
        displayInfo : true,
        displayMsg  : 'Mostrando {0} - {1} Médicos de {2}',
        emptyMsg    : "No hay datos para mostrar"
    });

    /*** Eventos o Métodos ***/
    function BuscarMedico(prm){
        var grd = Ext.getCmp('gridBuscadorMedico');
        var store = grd.getStore();
        store.on('beforeload', function() {
            store.baseParams = prm;
        });
        store.load({
            params:{
                start:0,
                limit:20,
                bnd:1,
                'Busq':Busq
            }
        });
    }

    function clickBtnBuscar(){
        var frm = Ext.getCmp(pnlId).getForm();
        if((frm.findField('idMedico').getValue()=='')&&(frm.findField('nombre').getValue()=='')&&(frm.findField('apaterno').getValue()=='')
            &&(frm.findField('amaterno').getValue()=='')&&(frm.findField('cedula').getValue()=='') &&(frm.findField('Estado').getValue()=='')

            ){
            Ext.MessageBox.alert('Mensaje de Error', "Debe llenar al menos un campo.");
        }else{
            if(frm.isValid()){
                BuscarMedico(frm.getValues(false));
            }else{
                Ext.Msg.alert("Campos Vacíos","Debe ingresar por lo menos un critério de búsqueda.");
            }
        }
    }

    function clickBtnLimpiar(){
        var frm = Ext.getCmp(pnlId).getForm();
        frm.reset();
    }

    /*** Páneles o Contenedores ***/

    var pnlBuscadorMedico = new Ext.form.FormPanel({
        id: pnlId,
        title:titulo,
        layout:"border",
        region:"center",
        width:986,
        height:420,
        frame: true,
        border:false,
        items:[{
            xtype:"panel",
            layout:"column",
            anchor:"100%",
            region:"north",            
            height:95,
            border:false,
            bodyStyle:"padding: 5px",
            buttonAlign:"center",
            items:[/**/{
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
                    name:'idMedico',
                    fieldLabel:"Clave",
                    enableKeyEvents:true,
                    listeners:{
                        'keypress':
                        function(txtField,e){
                            if(e.keyCode==13){
                                clickBtnBuscar();
                            }
                        }
                    }
                }]
            },{
                xtype:"panel",
                columnWidth:0.13,
                layout:"form",
                labelAlign:"top",
                border:false,
                bodyStyle:"padding 5px;",
                items:[{
                    xtype:"textfield",
                    width:70,
                    tabIndex:2,
                    name:'cedula',
                    fieldLabel:"Cédula",
                    enableKeyEvents:true,
                    listeners:{
                        'keypress':
                        function(txtField,e){
                            if(e.keyCode==13){
                                clickBtnBuscar();
                            }
                        }
                    }
                }]
            },				  {
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
                                clickBtnBuscar();
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
                                clickBtnBuscar();
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
                                clickBtnBuscar();
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
                            clickBtnBuscar();
                        }
                    },
                    enableKeyEvents:true,
                    listeners:{
                        'keypress':
                        function(txtField,e){
                            if(e.keyCode==13){
                                clickBtnBuscar();
                            }
                        }
                    }
                })]
            }],
            buttons:[
            {
                text:"Buscar",
                handler:clickBtnBuscar,
                tabIndex:7,
                iconCls:'icn-busquedaDos'
            },

            {
                text:"Limpiar",
                handler:clickBtnLimpiar,
                tabIndex:8,
                iconCls:'icn-limpiarBusqueda'
            },

            {
                text:"Nuevo Médico",
                tabIndex:9,
                handler:function(){
                    var wnd = new Ext.Window({
                        title:'Nuevo Médico',
                        id:'idWndRegistroMedico',
                        width:1000,
                        height:500,
                        constrainHeader :true,
                        constrain :true,
                        resizable : false,
                        //
                        modal:true,
                        border:false,
                        autoScroll:false,
                        items:[
                        new com.punto.pen.PanelAltaMedico({
                            id:'newMedicoFrm',
                            url:contexto+'/Medico',
                            alto:432
                        }).crearFichaNuevoMedico()
                        ],
                        buttons:[
                        {
                            text:'Registrar',
                            handler:function(){
                                submitFormulario(Ext.getCmp('newMedicoFrm'),{
                                    bnd:2,
                                    wnd:'idWndRegistroMedico'
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
        },{
            xtype           :"grid",
            id              : "gridBuscadorMedico",
            title           : tituloGrid,
            region          :'center',
            border          : false,
            columnWidth     : 0.7,
            height          : 120,
            store           : storeBuscadorMedico,
            stripeRows      : true,
            sm              : new Ext.grid.RowSelectionModel({
                singleSelect:true
            }),
            loadMask        : true,
            viewConfig      : { autoFill: true,forceFit: true},
            enableHdMenu    : true,
            autoScroll      : true,
            frame           : false,
            bbar            : [pbarBuscadorMedico,'->',{
                text  : '<u style="font-weight: bold; color:red;">Nota:</u> &nbsp;Para consultar la información de los Médico de 2 clicks en la fila.',
                style :'font-weight:bold;font-size:12;',
                handleMouseEvents:false,
                handler:null
            }],
            columns         : [
            new Ext.grid.RowNumberer(),
            {
                id:'idMedico',
                hidden:true,
                dataIndex: 'idMedico'
            },{
                header: "Elegir",
                width: 60,
                sortable: true,
                hidden: hiddenColum,
                dataIndex: 'elegir'
            },
            {
                header: "Clave",
                width: 60,
                sortable: true,
                dataIndex: 'idMedico'
            },

            {
                header: "Cédula",
                width: 60,
                sortable: true,
                dataIndex: 'cedula'
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
            }
            ],
            listeners: {
                'rowdblclick':function(grid){
                    if(tol!=null)tol.hide();
                    tol=new Ext.Tip({
                        html: grid.getSelectionModel().getSelected().get('datos'),
                        title: '<u style="color:red;">Información del Médico:</u> &nbsp;&nbsp;Clave: '+grid.getSelectionModel().getSelected().get('idMedico')+'&nbsp;&nbsp;Cédula: '+grid.getSelectionModel().getSelected().get('cedula'),
                        width:514,
                        autoHide: false,
                        closable: true,
                        draggable:true
                    });
                    tol.showAt([50,50]);
                }
            }
        }
        ]
    });
    
    return pnlBuscadorMedico;    
}


com.punto.pen.PanelNoMedicos = function(argumentos){
    var idPnl = (argumentos.id==null ? '' : argumentos.id);
    var url = (argumentos.url==null ? 'contexto+\'/Medico\'' : argumentos.url);
    this.titulo = (argumentos.titulo==null ? '' : argumentos.titulo);
    this.autoAlto = (this.alto==0 ? true : false);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    var idCnt = (argumentos.idCnt==null ? '' : argumentos.idCnt);  

    var storeBuscadorMedico2 = new Ext.data.Store({
        reader :new Ext.data.JsonReader( {
            totalProperty: 'total',
            root :'records',
            idProperty: 'id'
        },new com.punto.pen.RecordBuscadorMedico())
    });

    var smr = new Ext.grid.CheckboxSelectionModel({
        singleSelect:false,
        listeners: {
            beforerowselect: function (sm,row_index, keepExisting, record) {
                sm.suspendEvents();
                if (sm.isSelected(row_index)) {
                    sm.deselectRow(row_index);
                } else {
                    sm.selectRow(row_index, true);
                }
                sm.resumeEvents();
                return false;
            }
        }
    });


    var fieldGridNoMedicos = new Ext.form.FieldSet({
        xtype:"fieldset",
        title:"No. de Médicos",
        layout:"form",
        id:"fieldIdDatos",
        hideLabels:true,
        height:210,
        autoScroll:false,
        items:[
        new Ext.grid.GridPanel({
            id              :"gridNoMedicos",
            title           : "",
            region          :'center',
            columnWidth     : 0.7,
            height          : 160,
            store           : storeBuscadorMedico2,
            stripeRows      : true,
            sm              : smr,
            loadMask        : true,
            viewConfig      : {
                autoFill: true,
                forceFit: true
            },
            enableHdMenu    : true,
            autoScroll      : true,
            frame           : false,
            border          : false,
            cm              :new Ext.grid.ColumnModel([
                smr,
                {
                    id:'idMedico',
                    hidden:true,
                    dataIndex: 'idMedico'
                },
                {
                    header: "Clave",
                    width: 60,
                    sortable: true,
                    dataIndex: 'idMedico'
                },

                {
                    header: "Cédula",
                    width: 60,
                    sortable: true,
                    dataIndex: 'cedula'
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
                }
                ]),
            tbar            : new Ext.Toolbar({
                items:[{
                    text:'Eliminar',
                    iconCls:'icn-cross',
                    handler:function(){
                        var grd = Ext.getCmp('gridNoMedicos');
                        var record = grd.getSelectionModel().getSelections();
                        if(record!=null){
                            for( var i = 0; i < record.length; i++ ){
                                grd.store.remove(record[i]);
                            }
                        }else{
                            Ext.Msg.alert("Error de Selección","Debe seleccionar un Médico para poder Eliminar");
                        }
                    }
                }
                ]
            })
        })
        ]
    });

    var panelFormNoMedicos= new Ext.Panel({
        id: idPnl,
        url: url,
        bodyStyle: "padding:5px 5px 0",
        region: this.reg,
        border:false,
        height: this.alto,
        autoHeight: this.autoAlto,
        autoScroll: true,
        items:[new com.punto.pen.PanelBuscadorMedico({
            id:'pnlBuscadorMedico',
            bndBusq:1,
            titulo:""
        }),fieldGridNoMedicos]
    });

    return panelFormNoMedicos;
}

function IdNoMedicos(){
    var grd = Ext.getCmp('gridBuscadorMedico');
    var record = grd.getSelectionModel().getSelected();
    var grd2 = Ext.getCmp('gridNoMedicos');
    grd2.store.add(record);
    grd.store.remove(record);
}
