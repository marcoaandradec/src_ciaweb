/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns('com.punto.pen');

var tipoLlamada = "";

com.punto.pen.PanelRecetas = function(argumentos){
    this.id = (argumentos.id==null ? '' : argumentos.id);
    this.url = (argumentos.url==null ? 'contexto+\'/Recetas\'' : argumentos.url);
    this.titulo = (argumentos.titulo==null ? 'Datos Receta' : argumentos.titulo);
    this.border = (argumentos.border==null ? true : argumentos.border);   
    var idCnt = (argumentos.idCnt==null ? '' : argumentos.idCnt);
    var scrollGrid= (argumentos.scrol==null ? true : argumentos.scrol);
    var idPro= (argumentos.idPro==null ? true : argumentos.idPro);
    var col = (argumentos.col==null ? "no" : argumentos.col);
    var idGrid = (argumentos.idGrid == null ? "gridBuscadorRecetasMedicas" : argumentos.idGrid);
    var stre = (argumentos.stre == null ? 0 : argumentos.stre);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    this.autoAlto = (this.alto==0 ? true : false);


var storeBuscadorReceta = new Ext.data.Store({
        autoLoad: false,
        baseParams: {bnd:1, 'idCnt':idCnt, 'idPro':idPro, gr:elegirStore()},
        reader :new Ext.data.JsonReader({
            totalProperty: 'total',
            root :'records',
            idProperty: 'id'
        },new com.punto.pen.RecordBuscadorReceta2()),
        proxy :new Ext.data.HttpProxy({
            url : contexto+'/Recetas?bnd=1',
            timeout: 300000
        })
    });

    function elegirStore(){
        var store;
        if(stre==0){
            store=0;
        }else if(stre == 1){
            store=1;
        }
        return store;
    }

    this.pbarBuscarReceta = new Ext.PagingToolbar({
        id          : 'pgrid',
        pageSize    : 5,
        store       : storeBuscadorReceta,
        displayInfo : true,
        displayMsg  : 'Mostrando {0} - {1} Recetas de {2}',
        emptyMsg    : "No hay datos para mostrar"
    });

      var fieldSetRecetasGrid = new Ext.form.FieldSet({
        xtype:"fieldset",
        title:"Recetas",
        layout:"form",
        hideLabels:true,
        height:160,
        width:950,
        autoScroll:false,
        items:[{
                xtype:"hidden",
              name:"hidenComen",
              id:"idHidenComen",
              value:"0"
                },{
            xtype           :"grid",
            id              : idGrid,
            title           : "",
            region          :'center',
            columnWidth     : 0.7,
            height          : 125,
            store           : storeBuscadorReceta,
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
            bbar            : this.pbarBuscarReceta,
            columns         : recordRecs(col)
        }]
    });

    var fieldSetRecetasDatos= new Ext.form.FieldSet({
        xtype:"fieldset",
        id:'pnlRecetasFielSet',
        title:'Datos Receta',
        autoHeight:true,
        width:950,
        items:[{
            xtype:"panel",
            layout:"column",
            border:false,
            frame:false,
            items:[
            {
                xtype:"panel",
                layout:"form",
                border:false,
                labelAlign:"top",
                columnWidth:0.315,
                frame:false,
                items:[
                {
                    xtype:"numberfield",
                    fieldLabel:"Folio Receta",
                    width:90,
                    id:"IdRec",
                    name:"rmIdRec",
                    readOnly:true
                }
                ]
            },
            {
                xtype:"panel",
                layout:"form",
                border:false,
                frame:false,
                labelAlign:"top",
                columnWidth:0.36,
                items:[
                    new com.punto.pen.ComboBox({
                        id:"idComboRecStatus",
                        etiqueta:"Status",
                        allowBlank:false,
                        name:"rmStatus",
                        prm:{
                            campo:"status",
                            idCampo:"idStatusRec",
                            autoCarga:true,
                            bnd:1,
                            qry:19
                        }
                    })
                ]
            },{
                xtype:"panel",
                layout:"form",
                border:false,
                frame:false,
                labelAlign:"top",
                columnWidth:0.3,
                items:[
                new com.punto.pen.ComboBox({
                    id:"idComboRecIndicaciones",
                    etiqueta:"Indicaciones",
                    name:"rmIndicacion",
                    allowBlank:false,
                    prm:{
                        campo:"indicacion",
                        idCampo:"idIndicacionRec",
                        autoCarga:true,
                        bnd:1,
                        qry:20
                    }
                })
                ]
            }]
        }
        ,{
            xtype:"panel",
            layout:"column",
            border:false,
            frame:false,
            items:[{
                xtype:"panel",
                layout:"form",
                border:false,
                labelAlign:"top",
                columnWidth:0.339,
                frame:false,
                items:[{
                    xtype:"datefield",
                    id:'idFechaRes',
                    fieldLabel:"Fecha Receta",
                    readOnly:false,
                    allowBlank:false,
                    emptyText:"dd/mm/yyyy",
                    name:"rmFechaReceta",
                    width:100,
                    tabIndex:4,
                    autoCreate:{
                    tag:"input",
                    maxlength:10
                    },
                    enableKeyEvents:true,
                    listeners:{
                        'blur':function(){
                            var valid=Validafecha(Ext.getCmp('idFechaRes').getValue());
                            if(valid==false){
                                Ext.MessageBox.alert('Error en Fecha',"La fecha de la receta ("+Ext.getCmp('idFechaRes').getValue().format('d/m/Y')+") no puede ser mayor al día de hoy");
                                Ext.getCmp('idFechaRes').setValue("");
                            }
                        },
              'keypress':function(txtField,e){
                         if((e.getKey()>=47 && e.getKey()<=57)|| e.getKey()==9 || e.getKey()==8){}else{
                               e.stopEvent();
                           }
                    }
                    }
                }
                ]
            }
            ,{
                xtype:"panel",
                layout:"form",
                border:false,
                frame:false,
                labelAlign:"top",
                columnWidth:0.38,
                items:[
                new com.punto.pen.ComboBox({
                    id:"idComboRecProdFamilia",
                    etiqueta:"Familia",
                    name:"rmProdFamilia",
                    allowBlank:false,
                    prm:{
                        campo:"prodFamilia",
                        idCampo:"idProdFamiliaRec",
                        autoCarga:true,
                        bnd:10,
                        qry:21,
                        prmIdC:idCnt
                    },
                    evt:{
                        'select':function(cmb,rec,idx){
                            var cp = Ext.getCmp('idComboRecProdFamilia');
                            Ext.getCmp('idHidenProdFamiliaRec').setValue(cp.getValue())
                        }
                    }
                }),
                {
                    xtype:"hidden",
                    name:"hidenProdFamiliaRec",
                    id:"idHidenProdFamiliaRec",
                    value:"0"
                }]
            },
            {
                xtype:"panel",
                layout:"form",
                border:false,
                frame:false,
                labelAlign:"top",
                columnWidth:0.22,
                items:[{
                    xtype:"hidden",
                    name:"hidenMedicoRec",
                    id:"idHidenMedicoRec",
                    value:"0"
                },{
                    xtype:"textfield",
                    fieldLabel:"Médico",
                    width:180,
                    allowBlank:false,
                    name:"rmMedico",
                    id:"idRecMedico",
                    readOnly:true
                }
                ]
            },
            {
                xtype:"panel",
                border:false,
                layout:"form",
                items:[{
                    xtype:"button",
                    text:"Asignar",
                    handler:function(){
                         getBuscadorMedico({
                             idPnl:"pnlBuscadorMedico2",
                             idWnd:"idPanelBuscarMedico2",
                             idTxt:"idRecMedico",
                             idHiden:"idHidenMedicoRec"
                         });
                    }
                }]
            }
            ]
        },{
            xtype:"panel",
            layout:"column",
            border:false,
            frame:false,
            items:[{
                xtype:"panel",
                layout:"form",
                border:false,
                labelAlign:"top",
                columnWidth:0.319,
                frame:false,
                items:[{
                    xtype:"numberfield",
                    id:'idDiasDuracion',
                    fieldLabel:"Duración de Tratamiento (Días)",
//                    allowBlank:false,
                    name:"rmDiasDuracion",
                    allowBlank:idPro >= 291 && idPro <= 293 ? false : true,
                    width:100,
                    tabIndex:3,
                    autoCreate:{
                        tag:"input",
                        maxlength:3
                    },
                    value:idPro >= 291 && idPro <= 293 ? 1 : 0,
                    minValue:idPro >= 291 && idPro <= 293 ? 1 : 0
                }]
            },idPro >= 291 && idPro <= 293 ? {
                xtype:"panel",
                layout:"form",
                border:false,
                labelAlign:"top",
                columnWidth:0.35,
                items:[{
                    xtype:"numberfield",
                    id:"idDuracionReal",
                    fieldLabel:"Duración real de tratamiento (Dias)",
                    value:"0",
                    //readOnly:tipoLlamada == "in" || modulo == 2 ? true : false
                    disabled:tipoLlamada == "in" || modulo == 2 ? true : false
                }]
                
            } : /*{xtype:"hidden", id:"idDuracionReal", value:"0"}*/{html:"&nbsp;", border:false}
            ]
        }
        ]
    });

    var fieldSetRecetasComentarios= new Ext.form.FieldSet({
        xtype:"fieldset",
        title:"Comentarios",
        autoHeight:true,
        id:'idfieldSetRecetasComentarios',
        layout:"column",
        width:950,
        items:[]
    });

    var panelFormRecetas= new Ext.form.FormPanel({
        id: 'FormRecetas',
        url: this.url,
        bodyStyle: "padding:5px 5px 0",
        region: this.reg,
        border:this.border,
        tbar: new Ext.Toolbar({
            items:[{
                text:'Nueva Receta',
                iconCls:'icn-contestarPregunta',
                handler:function(){
                    LoadNuevaReceta(idCnt,idPro);
                }
            }]
        }),
        items:[fieldSetRecetasDatos,fieldSetRecetasComentarios]
    });


    var panelRegRecetas= new Ext.Panel({
        id: 'PanelRecetas',
        bodyStyle: "padding:5px 5px 0",
        region: this.reg,
        border:this.border,
        url: this.url,
        height: this.alto,
        autoHeight: this.autoAlto,
        autoScroll: true,
        items:[]
    });

    this.crearFichaNuevaReceta = function(idCnt,Producto,tipo,idreceta){
        panelRegRecetas.add(fieldSetRecetasGrid);
        panelRegRecetas.add(panelFormRecetas);
        var comenta=Ext.getCmp('idfieldSetRecetasComentarios');
        comenta.add(setCometarios());
        panelRegRecetas.doLayout();
        if(tipo==0){
            LoadRecetas(idCnt,Producto);
        }else if(tipo==1){
            getCnt3(idreceta);
        }
        return panelRegRecetas;
    }
    
    this.regresarGridRecetas = function(){
        return fieldSetRecetasGrid;
    }

    this.regresaFormRecetas = function(){
        
        var panelFormRecetas2= new Ext.form.FormPanel({
            id: 'FormRecetas2',
            title:this.titulo,
            url: this.url,
            bodyStyle: "padding:5px 5px 0",
            region: this.reg,
            border:this.border,
            height: this.alto,
            autoHeight: this.autoAlto,
            autoScroll: true,
            items:[fieldSetRecetasDatos,fieldSetRecetasComentarios]
        });

        var comenta=Ext.getCmp('idfieldSetRecetasComentarios');
        comenta.add(setCometarios());
        comenta.doLayout();

        return panelFormRecetas2;
    }
}



function LoadRecetas(idCnt,Producto){
    var formR = Ext.getCmp('FormRecetas');
    formR.load({
        params:{
            url:contexto+'/Recetas',
            'idCnt':idCnt,
            bnd:6,
            'idPro':Producto
        }
    });
    Ext.getCmp('idComboRecProdFamilia').setDisabled(true);
}
function LoadGrid(idCnt,Producto){
    var grd = Ext.getCmp('gridBuscadorRecetasMedicas');
    var store = grd.getStore();
    store.load({
        params:{
            start:0,
            limit:5,
            bnd:1,
            'idCnt':idCnt,
            'idPro':Producto
        }
    });
}

function LoadGrid2(idCnt,Producto){
    var grd = Ext.getCmp('idGridRecetaCanje');
    var store = grd.getStore();
    store.load({
        params:{
            start:0,
            limit:5,
            bnd:1,
            'idCnt':idCnt,
            'idPro':Producto
        }
    });
}

function getCnt3(idReceta,Producto,idCln){
    Ext.getCmp('FormRecetas').load({
        url:contexto+'/Recetas?idReceta='+idReceta+'&bnd=3',
        success:function(rsp){
            if(Producto >= 291 && Producto <= 293){
                Ext.getCmp("idDiasDuracion").disable();
                Ext.getCmp("idDuracionReal").enable();
            }
        }
    });
    
    Ext.getCmp('botonesGuardar').setVisible(false);
    Ext.getCmp('botonesModificar').setVisible(true);
    Ext.getCmp('botonesModificar2').setVisible(true);
    Ext.getCmp('idComboRecProdFamilia').setDisabled(true);
    var com=Ext.getCmp('idfieldSetRecetasComentarios');
        
    var extcom=Ext.getCmp('idEditarArchivos');
    com.remove(extcom);
    com.add({
        xtype:"panel",
        layout:"form",
        labelAlign:"center",
        border:false,
        frame:false,
        columnWidth:0.1,
        id:"idEditarArchivos",
        hideLabels:true,
        items:[{
            html:"<div align=center><u><a onClick='getEditarArchivo("+idReceta+","+idCln+","+Producto+")' style='color:#39F' onmouseover='style.cursor=\"hand\"'>Subir Archivo</a></u></div>",
            Height:30,
            border:false
        }]
    }); 
    com.doLayout();
}

function getEditarArchivo(idReceta,idCnt,Producto){
    var wnd = new  Ext.Window({
        id:'idPanelSubirReceta',
        width:600,
        height:190,
	constrainHeader :true,
        modal:true,
        border:false,
        autoScroll:true,
        draggable:true,
        resizable:false,
        title:'Subir Receta',
        bodyStyle: 'padding:5px;',
        items:[{
            html: '<iframe src="'+contexto+'/jsp_general/subirArchivoReceta.jsp?id='+idReceta+'&entity=RecetaMedica&campo=RmIdArchivoEscaneo&carpeta=recetas&idCln='+idCnt+'" style="width: 100%; height: 100%; border: medium none;"></iframe>',
            border:false
        }]        
    });
    wnd.show();
}

function getArchivoEscaneo(UrlArchivo){
   window.open(UrlArchivo,"Receta","width=800,height=500,location=no,menubar=no,status=no,toolbar=no,scrollbars=yes,statusbar=0,location=0,resizable=yes");
}
   
function getCnt4(idReceta,idCnt,idFamili,Producto, gr){
    Ext.Ajax.request({
        url : contexto+'/Recetas?idReceta='+idReceta+'&bnd=5&idCnt='+idCnt+"&IdFamilia="+idFamili+"&idPro="+Producto,
        params:{
            start:0,
            limit:5,
            bnd:1,
            'idCnt':idCnt,
            'idPro':Producto
        },
        success:function(rsp){
            if(gr==0){
                LoadGrid(idCnt,Producto);
            }else if(gr==1){
                LoadGrid2(idCnt,Producto);
            }             
        },
        failure:function(rsp){
        }
    });
}


function LoadNuevaReceta(idCnt,Producto){
    var formR = Ext.getCmp('FormRecetas');
    Ext.getCmp('botonesGuardar').setVisible(true);
    Ext.getCmp('botonesModificar').setVisible(false);
    Ext.getCmp('botonesModificar2').setVisible(false);
    Ext.getCmp('IdRec').setValue("");
    Ext.getCmp('idComboRecStatus').setValue("");
    Ext.getCmp('idComboRecIndicaciones').setValue("");
    Ext.getCmp('idFechaRes').setValue("");
    Ext.getCmp('idDiasDuracion').setValue("");
    
    if(Producto >= 291 && Producto <= 293){
        Ext.getCmp("idDiasDuracion").enable();
        Ext.getCmp("idDuracionReal").disable();
    }
    
    if(Ext.getCmp('idHidenComen').getValue()!="0"){
       var comenta=Ext.getCmp('idfieldSetRecetasComentarios');
       comenta.removeAll();
       comenta.setTitle("Comentarios");
       comenta.add(setCometarios());
       comenta.doLayout();
    }
    var com=Ext.getCmp('idfieldSetRecetasComentarios');
    var extcom=Ext.getCmp('idEditarArchivos');
    com.remove(extcom);
    com.doLayout();
    formR.load({params:{url:contexto+'/Recetas','idCnt':idCnt, bnd:6,'idPro':Producto}});
    LoadGrid(idCnt,Producto);
}

function recordRecs(col){
    var rec = new Array(new Ext.grid.RowNumberer(),
    {header: "Folio",width: 55, sortable: true,dataIndex: 'idReceta'},
    {header: "Activo",width: 55, sortable: true,dataIndex: 'activo'},
    {header: "Cliente",width: 110,sortable: true,dataIndex: 'cliente'},
    {header: "Familia",width: 90,sortable: true,dataIndex: 'club'},
    {header: "Medico", width: 110, sortable: true, dataIndex: 'medico'},
    {header: "Fecha Receta",width: 80,sortable: true, dataIndex: 'fechaReceta'},
    {header: "Comentarios",width: 110,sortable: true,dataIndex: 'comentario'},
    {header: "Indicaciones",width: 80,sortable: true,dataIndex: 'indicaciones'},
    {header: "Duración Días",width: 80,sortable: true,dataIndex: 'duracion'},
    {header: "Fecha Alta",width: 80,sortable: true,dataIndex: 'fechaAlta'},
    {header: "Archivo", width: 70,sortable: true, dataIndex: 'archivo'});
    
    var head = {};

    if(col!="si"){
        head = {
            header: 'Editar',
            width: 55,
            sortable: true,
            dataIndex: 'editar'
        };
        rec.splice(3,0,head);
    }

    return rec;

}

function setCometarios(){
      var panelComentarios= new Ext.Panel({
            layout:"form",
            labelAlign:"center",
            border:false,
            columnWidth:.89,
            frame:false,
            id:"idComentarios2",
            hideLabels:true,
            items:[{
                xtype:"textarea",
                name:"rmComentarios",
                id:"idComentarios",
                hideLabels:true,
                width:800,
                height:80,
                    enableKeyEvents:true,
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
            }]
      });

      return panelComentarios;
    }

function SubirReceta(idReceta,idCnt){
    var subir = new  Ext.Panel({
        xtype:"panel",
        layout:"form",
        labelAlign:"center",
        border:false,
        frame:false,
        id:"idSubirArt",
        hideLabels:true,
        columnWidth:0.99,
        height:120,
        items:[{
            html: '<div align=center><iframe src="'+contexto+'/jsp_general/subirArchivoReceta.jsp?id='+idReceta+'&entity=RecetaMedica&campo=RmIdArchivoEscaneo&carpeta=recetas&idCln='+idCnt+'" style="width: 100%; height: 100%; border: medium none;"></iframe></div>',
            border:false
        }]
    });
    
    var comentarios = Ext.getCmp('idfieldSetRecetasComentarios');
    comentarios.removeAll();
    comentarios.setTitle("Escanear Receta");
    comentarios.add(subir);
    comentarios.doLayout();
    Ext.getCmp('botonesGuardar').setVisible(false);
    Ext.getCmp('idBotonSalir').setVisible(true);
    Ext.getCmp('botonesModificar').setVisible(false);
    Ext.getCmp('botonesModificar2').setVisible(false);
    Ext.getCmp('idFechaRes').setValue("");
    Ext.getCmp('idComboRecIndicaciones').setValue("");
    Ext.getCmp('idComboRecStatus').setValue("");

//    <img onclick="javascript:this.width=450;this.height=450;this.width=900" ondblclick="javascript:this.width=100;this.height=250;this.width=600" src="http://www.sitaemexico.com/Pruebas/Pago_Servicios/vouchers/<?=$ImagenVoucher?>" width="600px" height="200px" />


}

function getBuscadorMedico(params){
    var idPnl = (params.idPnl == null ? "pnlBuscadorMedico2" : params.idPnl);
    var idWnd = (params.idWnd == null ? "idPanelBuscarMedico2" : params.idWnd);
    var idTxt = (params.idTxt == null ? "idRecMedico" : params.idTxt);
    var idHiden = (params.idHiden == null ? "idHidenMedicoRec" : params.idHiden);
    var desdeCanjes = (params.desdeCanjes == null ? false : params.desdeCanjes);


    var formBus = new com.punto.pen.PanelBuscadorMedico({
        id:idPnl,
        bnd:1
    });
    var wnd = new Ext.Window({
        id:idWnd,
        width:1000,
        height:500,
            //
                            constrainHeader :true,
                            constrain :true,
                            resizable : false,
            //
        modal:true,
        border:false,
        autoScroll:false,
        draggable:true,
        items:[
        formBus
        ],
        buttons:[

        {
            text:'Aceptar',
            handler:function(){
                var grd = Ext.getCmp('gridBuscadorMedico');
                var record = grd.getSelectionModel().getSelected();
                if(record!=null){
                    enviaValores([Ext.getCmp(idTxt),Ext.getCmp(idHiden)],[record.get('apaterno')+" "+record.get('amaterno')+" "+record.get('nombre'),record.get('idMedico')],Ext.getCmp(idWnd));
                    if(desdeCanjes == true){
                        var valoresDir = [
                            record.get('calleMed'),
                            record.get('numExtMed'),
                            record.get('numIntMed'),
                            record.get('entreCalle1Med'),
                            record.get('entreCalle2Med'),
                            record.get('ref1Med'),
                            record.get('ref2Med'),
                            record.get('edoMed'),
                            record.get('delMunMed'),
                            record.get('coloniaMed'),
                            record.get('cpMed')
                        ];
                        getWndDireccionMedico(valoresDir);
                    }
                }else{
                    Ext.MessageBox.alert('Mensaje de Error', "Debe seleccionar a un Médico.");
                }
            }
        },{
            text:'Cancelar',
            handler:function(){
                wnd.close();
            }
        }
        ]
    });
    wnd.show();

}

com.punto.pen.RecordBuscadorReceta2 = function(){
    var record = Ext.data.Record.create([
       {name: 'idReceta',type:'string'},
       {name: 'activo',type:'string'},
       {name: 'editar',type:'string'},
       {name: 'cliente', type: 'string'},
       {name: 'club', type: 'string'},
       {name: 'medico', type: 'string'},
       {name: 'fechaReceta', type: 'string'},
       {name: 'comentario', type: 'string'},
       {name: 'indicaciones', type: 'string'},
       {name: 'fechaAlta', type: 'string'},
       {name: 'duracion', type: 'string'},
       {name: 'archivo', type: 'string'}

    ]);
    return record;
}