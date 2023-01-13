
Ext.ns('com.punto.pen');

com.punto.pen.PanelGridEstudios = function(argumentos){
    this.id = (argumentos.id==null ? '' : argumentos.id);
    this.url = (argumentos.url==null ? 'contexto+\'/\'EstudiosGrid' : argumentos.url);
    var titulo = (argumentos.titulo==null ? 'Estudio' : argumentos.titulo);
    this.border = (argumentos.border==null ? true : argumentos.border);
    this.autoAlto = (this.alto==0 ? true : false);
    var idCnt = (argumentos.idCnt==null ? '' : argumentos.idCnt);
    var tipoEst = (argumentos.tipoEst==null ? '' : argumentos.tipoEst);



    this.storeBuscadorEstudios = new Ext.data.Store({        
        autoLoad: false,
        baseParams: {
            bnd:2,
            'idCnt':idCnt,
            'tipoEst':tipoEst
        },
        reader :new Ext.data.JsonReader( {
            totalProperty: 'total',
            root :'records',
            idProperty: 'id'
        },tipoEstudio(tipoEst)),
        proxy :new Ext.data.HttpProxy( {
            url : contexto+'/EstudiosGrid?bnd=2'
        })
    });

    this.pbarBuscarEstudio = new Ext.PagingToolbar({
        id          : 'pgrid',
        pageSize    : 20,
        store       : this.storeBuscadorEstudios,
        displayInfo : true,
        displayMsg  : 'Mostrando {0} - {1} Registros de {2}',
        emptyMsg    : "No hay datos para mostrar"
    });

    function BuscarEstudioGral(prm){
        var grd = Ext.getCmp('gridEstudiosGeneral');
        var store = grd.getStore();
        store.on('beforeload', function() {
            store.baseParams = prm;
        });
        store.load({
            params:{
                start:0,
                limit:20,
                bnd:2,
                'idCnt':idCnt,
                'tipoEst':tipoEst
            }
        });
    }

    var panelFormGridEstudios= new Ext.form.FormPanel({
        id: 'FormEstudiosGral',
        title:this.titulo,
        url: this.url,
        bodyStyle: "padding:5px 5px 0",
        region: this.reg,
        border:false,
        height: this.alto,
        autoHeight: this.autoAlto,
        autoScroll: (!this.autoAlto),
        items:[{
            xtype:"fieldset",
            title:'Información',
            layout:"form",
            autoScroll: true,
            autoHeight:true,
            items:[{
                xtype:"textfield",
                fieldLabel:"Nombre",
                id:'idEstdNombre',
                name:"estNombre",
                width:300,
                readOnly:true
            }]
        },
        {
            xtype:"fieldset",
            title:titulo,
            layout:"form",
            hideLabels:true,
            autoScroll: true,
            height : 320,
            items:[{
                xtype           :"grid",
                id              : "gridEstudiosGeneral",
                title           : "",
                region          :'center',
                columnWidth     : 0.7,
                height          : 280,
                store           : this.storeBuscadorEstudios,
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
                border          : false,
                bbar            : this.pbarBuscarEstudio,
                columns         : tipoEstudiocolumns(tipoEst)

            }]
        }]

    });

    var panelGridEstudios= new Ext.Panel({
        id: 'PanelEstudiosGral',
        bodyStyle: "padding:5px 5px 0",
        region: this.reg,
        border:false,
        url: this.url,
        height: this.alto,
        autoHeight: this.autoAlto,
        autoScroll: (!this.autoAlto),
        items:[]
    });

    this.crearGridEstudios = function(idCliente){
        panelGridEstudios.add(panelFormGridEstudios);
        LoadEstudiosGrid(idCliente);
        panelGridEstudios.doLayout();
        return panelGridEstudios;
    }
   
    function tipoEstudiocolumns(tipo){
        var tip="";
        if(tipo==1){ //////   PCM
            tip=
            [new Ext.grid.RowNumberer(),
            {
                header: "Tipo Estudio",
                width: 50,
                sortable: true,
                dataIndex: 'tipoEstudio'
            },

            {
                header: "Peso",
                width: 50,
                sortable: true,
                dataIndex: 'peso'
            },

            {
                header: "Estatura",
                width:50,
                sortable: true,
                dataIndex: 'estatura'
            },

            {
                header: "IMC",
                width:50,
                sortable: true,
                dataIndex: 'imc'
            },

            {
                header: "Circunferencia",
                width:50,
                sortable: true,
                dataIndex: 'cirucunferencia'
            },

            {
                header: "Presión Arterial",
                width:50,
                sortable: true,
                dataIndex: 'presionArterial'
            },

            {
                header: "Glucosa Ayuno",
                width:50,
                sortable: true,
                dataIndex: 'glucosaAyuno'
            },

            {
                header: "C-hdl",
                width: 50,
                sortable: true,
                dataIndex: 'chdl'
            },

            {
                header: "C-ldl",
                width: 50,
                sortable: true,
                dataIndex: 'cldl'
            },

            {
                header: "Colesterol Total",
                width: 50,
                sortable: true,
                dataIndex: 'colesterolTotal'
            },

            {
                header: "Trigliceridos",
                width: 50,
                sortable: true,
                dataIndex: 'trigliceridos'
            },

            {
                header: "Porcentaje Grasa",
                width: 50,
                sortable: true,
                dataIndex: 'porcentajeGrasa'
            },

            {
                header: "Observaciones",
                width: 100,
                sortable: true,
                dataIndex: 'observaciones'
            },

            {
                header: "Fecha Estudio",
                width: 50,
                sortable: true,
                dataIndex: 'fechaEstudio'
            },

            {
                header: "Fecha Alta",
                width: 50,
                sortable: true,
                dataIndex: 'fechaRegistro'
            }];
        }
        if(tipo==2){/////////   Densitometria
            tip=
            [new Ext.grid.RowNumberer(),
            {
                header: "Resultado T-score",
                width: 80,
                sortable: true,
                dataIndex: 'restscore'
            },

            {
                header: "Valoración",
                width:120,
                sortable: true,
                dataIndex: 'resultado'
            },

            {
                header: "Medicamento para Huesos",
                width:100,
                sortable: true,
                dataIndex: 'medicamentoHuesos'
            },

            {
                header: "Nombre Medicamento 1",
                width:120,
                sortable: true,
                dataIndex: 'nombreMedicamento'
            },

            {
                header: "Nombre Medicamento 2",
                width: 120,
                sortable: true,
                dataIndex: 'otroMedicamento'
            },

            {
                header: "Fecha Estudio",
                width: 60,
                sortable: true,
                dataIndex: 'fechaEstudio'
            },

            {
                header: "Fecha Alta",
                width: 60,
                sortable: true,
                dataIndex: 'fechaRegistro'
            }];
        }
        if(tipo==3){/////////   Hemoglobina
            tip=
            [new Ext.grid.RowNumberer(),
            {
                header: "Resultado T-score",
                width: 90,
                sortable: true,
                dataIndex: 'restscore'
            },

            {
                header: "Fecha Estudio",
                width: 90,
                sortable: true,
                dataIndex: 'fechaEstudio'
            },

            {
                header: "Fecha Alta",
                width: 90,
                sortable: true,
                dataIndex: 'fechaRegistro'
            }];
        }
        if(tipo==4){////////////     Glucometria
            tip=
            [new Ext.grid.RowNumberer(),
            {
                header: "Tipo de Estudio",
                width: 100,
                sortable: true,
                dataIndex: 'tipoEstudio'
            },

            {
                header: "Resultado T-score",
                width: 70,
                sortable: true,
                dataIndex: 'restscore'
            },

            {
                header: "Valoración",
                width:100,
                sortable: true,
                dataIndex: 'resultado'
            },

            {
                header: "Toma Medicamento",
                width:70,
                sortable: true,
                dataIndex: 'medicamento'
            },

            {
                header: "Nombre Medicamento 1",
                width:60,
                sortable: true,
                dataIndex: 'medicamento1'
            },

            {
                header: "Nombre Medicamento 2",
                width: 60,
                sortable: true,
                dataIndex: 'medicamento2'
            },

            {
                header: "Nombre Medicamento 3",
                width: 60,
                sortable: true,
                dataIndex: 'medicamento3'
            },

            {
                header: "Fecha Estudio",
                width: 60,
                sortable: true,
                dataIndex: 'fechaEstudio'
            },

            {
                header: "Fecha Alta",
                width: 60,
                sortable: true,
                dataIndex: 'fechaRegistro'
            },

            {
                header: "Observaciones",
                width: 100,
                sortable: true,
                dataIndex: 'observaciones'
            },

            {
                header: "Estudio",
                width: 60,
                sortable: true,
                dataIndex: 'estudio'
            }];
        }
        if(tipo==7){//////////////     MAPA
            tip=
            [new Ext.grid.RowNumberer(),
            {
                header: "Presión Arterial",
                width: 60,
                sortable: true,
                dataIndex: 'presionArterial'
            },

            {
                header: "Fecha Estudio",
                width: 90,
                sortable: true,
                dataIndex: 'fechaEstudio'
            },

            {
                header: "Fecha Alta",
                width: 90,
                sortable: true,
                dataIndex: 'fechaRegistro'
            }];
        }
        if(tipo==20){//////////////    Doppler
            tip=
            [new Ext.grid.RowNumberer(),
            {
                header: "Resultado Tobillo Izq.",
                width: 110,
                sortable: true,
                dataIndex: 'resultadoIzq'
            },

            {
                header: "Valoración Tobillo Izq.",
                width: 110,
                sortable: true,
                dataIndex: 'valorIzq'
            },

            {
                header: "Resultado Tobillo Der.",
                width:110,
                sortable: true,
                dataIndex: 'resultadoDer'
            },

            {
                header: "aloración Tobillo Der.",
                width:110,
                sortable: true,
                dataIndex: 'valorDer'
            },

            {
                header: "Fecha Estudio",
                width: 60,
                sortable: true,
                dataIndex: 'fechaEstudio'
            },

            {
                header: "Fecha Alta",
                width: 60,
                sortable: true,
                dataIndex: 'fechaRegistro'
            }];
        }
        if(tipo==21){//////////////    Uroflufometria
            tip=
            [new Ext.grid.RowNumberer(),
            {
                header: "Flujo Medio",
                width: 110,
                sortable: true,
                dataIndex: 'resultadoFM'
            },

            {
                header: "Pico de Flujo",
                width: 110,
                sortable: true,
                dataIndex: 'resultadoPF'
            },

            {
                header: "Valoración",
                width: 110,
                sortable: true,
                dataIndex: 'valoracion'
            },

            {
                header: "Observaciones",
                width: 110,
                sortable: true,
                dataIndex: 'observaciones'
            },

            {
                header: "Fecha Estudio",
                width: 60,
                sortable: true,
                dataIndex: 'fechaEstudio'
            },

            {
                header: "Fecha Alta",
                width: 60,
                sortable: true,
                dataIndex: 'fechaRegistro'
            }];
        }
        if(tipo==189){//////////////    Trigliceridos
            tip=
            [new Ext.grid.RowNumberer(),
            {
                header: "Resultado",
                width: 110,
                sortable: true,
                dataIndex: 'resultado'
            },

            {
                header: "Valoración",
                width: 110,
                sortable: true,
                dataIndex: 'valoracion'
            },

            {
                header: "Fecha Estudio",
                width: 60,
                sortable: true,
                dataIndex: 'fechaEstudio'
            },

            {
                header: "Fecha Alta",
                width: 60,
                sortable: true,
                dataIndex: 'fechaRegistro'
            }];
        }
        if(tipo==209){//////////////    Peso y Talla
            tip=
            [new Ext.grid.RowNumberer(),
            {
                header: "Peso",
                width: 50,
                sortable: true,
                dataIndex: 'peso'
            },

            {
                header: "Talla",
                width:50,
                sortable: true,
                dataIndex: 'estatura'
            },

            {
                header: "IMC",
                width:50,
                sortable: true,
                dataIndex: 'imc'
            },

            {
                header: "Observaciones",
                width: 110,
                sortable: true,
                dataIndex: 'observaciones'
            },

            {
                header: "Fecha Estudio",
                width: 60,
                sortable: true,
                dataIndex: 'fechaEstudio'
            },

            {
                header: "Fecha Alta",
                width: 60,
                sortable: true,
                dataIndex: 'fechaRegistro'
            }];
        }
        if(tipo==565){////////////     Asesoria Nutricional
            tip=
            [new Ext.grid.RowNumberer(),
            {
                header: "Tipo de Asesoria",
                width: 100,
                sortable: true,
                dataIndex: 'tipoAsesoria'
            },
            {
                header: "Peso",
                width: 70,
                sortable: true,
                dataIndex: 'peso'
            },
            {
                header: "Talla",
                width:100,
                sortable: true,
                dataIndex: 'talla'
            },
            {
                header: "Imc",
                width:70,
                sortable: true,
                dataIndex: 'imc'
            },
            {
                header: "Masa Grasa",
                width:60,
                sortable: true,
                dataIndex: 'pgrasa'
            },
            {
                header: "Masa Muscular",
                width: 60,
                sortable: true,
                dataIndex: 'pmusculo'
            },
            {
                header: "Porcentaje Agua",
                width: 60,
                sortable: true,
                dataIndex: 'pagua'
            },
            {
                header: "Porcentaje Oseo",
                width: 60,
                sortable: true,
                dataIndex: 'poseo'
            },
            {
                header: "Tipo Metabolismo",
                width: 60,
                sortable: true,
                dataIndex: 'tmetabolismo'
            },
            {
                header: "Observaciones",
                width: 100,
                sortable: true,
                dataIndex: 'observaciones'
            }, {
                header: "Fecha Asesoria",
                width: 60,
                sortable: true,
                dataIndex: 'fechaAsesoria'
            }];
        }
        return tip;
    }

    function tipoEstudio(tipo){
        var tip="";
        if(tipo==1){
            tip=new com.punto.pen.RecordBuscadorPCM();
        }
        if(tipo==2){
            tip=new com.punto.pen.RecordBuscadorDesintometria();
        }
        if(tipo==3){
            tip=new com.punto.pen.RecordBuscadorHemoglobina();
        }
        if(tipo==4){
            tip=new com.punto.pen.RecordBuscadorGlucometria();
        }
        if(tipo==7){
            tip=new com.punto.pen.RecordBuscadorMapa();
        }
        if(tipo==20){
            tip=new com.punto.pen.RecordBuscadorDoppler();
        }
        if(tipo==21){
            tip=new com.punto.pen.RecordBuscadorUroflujometria();
        }
        if(tipo==189){
            tip=new com.punto.pen.RecordBuscadorTrigliceridos();
        }
        if(tipo==209){
            tip=new com.punto.pen.RecordBuscadorPesoTalla();
        }
        if(tipo==565){
            tip=new com.punto.pen.RecordAsesoriaNutricional();
        }
        return tip;
    }
}

function LoadEstudiosGrid(idCnt){
    var formEs = Ext.getCmp('FormEstudiosGral');
    formEs.load({
        params:{
            url:contexto+'/EstudiosGrid',
            'idCnt':idCnt,
            bnd:1
        }
    });
}


