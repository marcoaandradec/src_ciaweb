/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns('com.punto.pen');


com.punto.pen.PanelCanalizaInbFarma = function(argumentos){
    this.id = (argumentos.id==null ? '' : argumentos.id);
    this.url = (argumentos.url==null ? '' : argumentos.url);
    this.titulo = (argumentos.titulo==null ? '' : argumentos.titulo);
    this.border = (argumentos.border==null ? true : argumentos.border);
    var idTree  = (argumentos.idTree==null ? 'pnlTreeAccionesCC' : argumentos.idTree);
    this.height = (argumentos.height==null ? 0 : argumentos.height);
    this.autoAlto = (this.height==0 ? true : false);
    this.autoScroll = (argumentos.autoScroll==null ? false : argumentos.autoScroll);
    this.prm =(argumentos.prm ==null ? 'No hay valores': argumentos.prm);
    this.region = (argumentos.region==null ? '' : argumentos.region);
    var blank = true;

   

    var pnlFV = new Ext.form.FormPanel({
        id:this.id,
        border:this.border,
        buttonAlign:'right',
        url: this.url,
        title:this.titulo,
        bodyStyle:"padding:5px",
        labelWidth:180,
        frame:false,
        region: this.region,
        height:230,
        width: 850,
        autoHeight:false,
        autoScroll:this.autoScroll,
        /* bbar:[

        {
            text:'Guardar y Enviar a Farmacovigilancia',
            iconCls:'icn-guardar',
            handler:function(){
                submitFormulario(Ext.getCmp('pnlCFV'),this.prm);
            }
        },'-',{
            text:'Cancelar',
            iconCls:'icn-cross',
            handler:function(){
                wnd.close();
            }
        }
        ],*/
        items:[
        {
            xtype:"fieldset",
            title:"Información del Caso",
            autoHeight:true,
            items:[{
                xtype:"panel",
                layout:"column",
                border:false,
                frame:false,
                items:[{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    frame:false,
                    columnWidth:0.5,
                    items:[
                    new com.punto.pen.ComboBox({
                        id:"idComboMedicamento",
                        etiqueta:"Medicamento",
                        name:"cmbMedicamento",
                        tabIndex:1,
                        allowBlank:false,
                        prm:{
                            campo:"Medicamento",
                            idCampo:"idMedicamento",
                            autoCarga:true,
                            bnd:5,
                            qry:17
                        },
                        width:210,
                        hiddenName:"cmbMedicamento"
                    })]
                },{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    frame:false,
                    columnWidth:0.5,
                    items:[
                    new com.punto.pen.ComboBox({
                        id:"idComboTipoEv",
                        etiqueta:"Tipo de evento/caso",
                        name:"cmbTipoEvento",
                        allowBlank:false,
                        tabIndex:2,
                        prm:{
                            campo:"tipoEvento",
                            idCampo:"idTipoEvento",
                            autoCarga:true,
                            bnd:5,
                            qry:12
                        },
                        width:210,
                        evt:{
                            'select':function(){
                                Ext.getCmp("idHidenTipoEv").setValue(Ext.getCmp("idComboTipoEv").getValue());
                                if(Ext.getCmp("idComboTipoEv").getRawValue()!='Queja Tecnica'){
                                    Ext.getCmp("idPanelQueja").hide();
                                }else{
                                    Ext.getCmp("idPanelQueja").show();
                                }
                            }
                        }
                    }),
                    {
                        xtype:"hidden",
                        name:"hidenTipoEv",
                        id:"idHidenTipoEv",
                        value:"0"
                    },
                    {
                        xtype:"hidden",
                        name:"idTree",
                        id:"idTree",
                        value:idTree
                    }]
                }
                ]
            },
            {
                xtype:"panel",
                id:"idPanelQueja",
                border:false,
                frame:false,
                hidden:true,
                hideMode:"offsets",
                width:"97%",
                items:[
                    {
                        xtype:"panel",
                        layout:"column",
                        border:false,
                        frame:false,
                        items:[{
                            xtype:"panel",
                            layout:"form",
                            border:false,
                            frame:false,
                            columnWidth:0.5,
                            items:[{
                                xtype:"textfield",
                                fieldLabel:"No. de Lote",
                                name:"noLote",
                                id:"idNoLote",
                                width:210
                            }]

                        },{
                            xtype:"panel",
                            layout:"form",
                            border:false,
                            frame:false,
                            columnWidth:0.5,
                            items:[{
                                xtype:"datefield",
                                fieldLabel:"Fecha de Caducidad",
                                name:"fechaCaducidad",
                                id:"idFechaCaducidad",
                                width:210
                              }]
                        }]
                    }]
            },{
                xtype:"panel",
                layout:"column",
                border:false,
                frame:false,
                items:[{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    frame:false,
                    columnWidth:0.5,
                    items:[new com.punto.pen.ComboBox({
                            id:"idComboTipoContacto",
                            etiqueta:"Quién Reporta",
                            name:"cdrTipoContacto",
                            allowBlank:false,
                            prm:{
                                    campo:'tipContac',
                                    idCampo:'idTipContac',
                                    bnd:5,
                                    qry:15,
                                    autoCarga:true
                            },
                            width:210,
                            evt:{
                                'select':function(){
                                    if(Ext.getCmp("idComboTipoContacto").getRawValue()=='PACIENTE'){
                                        Ext.getCmp("idPanelReporte").hide();
                                        Ext.getCmp("idNomReporte").allowBlank=true;
                                        Ext.getCmp("idTelReporte").allowBlank=true;
                                    }else{
                                        Ext.getCmp("idPanelReporte").show();
                                        Ext.getCmp("idNomReporte").allowBlank=false;
                                        Ext.getCmp("idTelReporte").allowBlank=false;
                                    }
                                }
                            },
                            hiddenName:"cdrTipoContacto"
                        })
                    ]

                }]
            },
            {
                xtype:"panel",
                id:"idPanelReporte",
                border:false,
                frame:false,
                hidden:true,
                hideMode:"offsets",
                width:"97%",
                items:[
                        {
                            xtype:"panel",
                            layout:"column",
                            border:false,
                            frame:false,
                            width:"100%",
                            items:[{
                                xtype:"panel",
                                layout:"form",
                                border:false,
                                frame:false,
                                columnWidth:0.5,
                                items:[{
                                    xtype:"textfield",
                                    fieldLabel:"Nombre de quien reporta",
                                    name:"nomReporte",
                                    id:"idNomReporte",
                                    style:'text-transform: uppercase;',
                                    width:210,
                                    listeners: {
                                        'keyup' : function(elem, e){
                                            elem.setValue(elem.getValue().toUpperCase());
                                        },
                                        'keypress':function(txtField,e){
                                            if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                                                e.stopEvent();
                                            }

                                        }
                                    }
                                }]

                            },{
                                xtype:"panel",
                                layout:"form",
                                border:false,
                                frame:false,
                                columnWidth:0.5,
                                items:[{
                                    xtype:"textfield",
                                    fieldLabel:"Telefono de quien reporta",
                                    name:"telReporte",
                                    id:"idTelReporte",
                                    width:210
                                  }]
                            }]
                        }
                ]
            },{
                xtype:"panel",
                layout:"fit",
                border:false,
		//width:"97%",
                height:40,
                frame:false,
                items:[{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    frame:false,
                    columnWidth:1,
                    items:[
                    new Ext.form.RadioGroup({
                        fieldLabel: 'Medio de la Llamada',
                        labelWidth:30,
                        id:"ld_id_medio_llamada",
                        anchor:'100%',
                        items: [

                        {
                            fieldLabel: 'Inbound',
                            name: 'ld_id_medio_llamada',
                            inputValue: '4',
                            tabIndex:3,
                            checked:true
                        },

                        {
                            fieldLabel: 'Outbound',
                            name: 'ld_id_medio_llamada',
                            tabIndex:4,
                            inputValue: '2',
                            height:'100%'
                        },
                        {
                            fieldLabel: 'C.A.S.A',
                            name: 'ld_id_medio_llamada',
                            tabIndex:4,
                            inputValue: '5',
                            height:'100%'
                        },
                    {
                            fieldLabel: 'SITIO WEB',
                            name: 'ld_id_medio_llamada',
                            tabIndex:5,
                            inputValue: '6',
                            height:'100%'
                        }]
                    })]
                }]
            },{
                xtype:"panel",
                layout:"column",
                border:false,
                frame:false,
                items:[{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    frame:false,
                    width:'100%',
                    items:[
                        {
                        xtype:"textarea",
                        fieldLabel:"Descripción del problema",
                        name:"Observaciones",
                        id:"Observaciones",
                        style:'text-transform: uppercase;',
                        tabIndex:5,
                        allowBlank:false,
                        enableKeyEvents:true,
                        width:'98%',
                        height:80,
                        listeners: {
                            'keyup' : function(elem, e){
                                elem.setValue(elem.getValue().toUpperCase());
                            },
                            'keypress':function(txtField,e){
                                if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180 || e.getKey()==34 || e.getKey()==39){
                                    e.stopEvent();
                                }

                            }
                        }
                    }]
                }]
            }]

        }]
    });
    return pnlFV;
}