Ext.ns("com.punto.pen");

com.punto.pen.PanelEncuestaRenagel= function(argumentos){
    var idPnl = (argumentos.id==null ? "" : argumentos.id);
    this.reg = (argumentos.region==null ? "" : argumentos.region);
    var url = (argumentos.url==null ? "" : argumentos.url);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    this.autoAlto = (this.alto==0 ? true : false);
    var titulo = (argumentos.titulo==null ? "" : argumentos.titulo);


    var PanelEncuestaRenagel =  new Ext.Panel({
        id:'idPanelECorp',
        xtype:"panel",
        layout:"form",              
        border:false,
        items:[{
            xtype:"fieldset",
            title:"Encuesta Renagel",
            autoHeight:true,
            layout:"form",
            labelWidth:300,
            items:[{
                xtype:"textfield",
                id:'idSession',
                fieldLabel:"1. Sesión",
                name:"erSesion",
                width:200,
                readOnly:true,
                allowBlank:false
            },{
                xtype:"hidden",
                name:"hidenSesion",
                id:"idErSesion",
                value:"461"
            },
            {
                xtype:"datefield",
                fieldLabel:"2. Fecha",
                id:'iderFecha',
                name:"erFecha",
                tabIndex:1000,
                width:100,
                autoCreate:{
                    tag:"input",
                    maxlength:10
                },
                allowBlank:false,
                emptyText:"dd/mm/yyyy",
                enableKeyEvents:true,
                listeners:{             
                    'blur':function(){
                        var valid=Validafecha(Ext.getCmp('iderFecha').getValue());
                        if(valid==false){
                            Ext.MessageBox.alert('Error en Fecha',"La fecha ("+Ext.getCmp('iderFecha').getValue().format('d/m/Y')+") no puede ser mayor al día de hoy");
                            Ext.getCmp('iderFecha').setValue("");
                        }
                    },
                    'keypress':function(txtField,e){
                        if((e.getKey()>=47 && e.getKey()<=57)|| e.getKey()==9 || e.getKey()==8){}else{
                            e.stopEvent();
                        }
                    }
                }

            },
      
            new com.punto.pen.ComboBox({
                id:"idErInstitucion",
                etiqueta:"3. Hospital",
                name:"erInstitucion",
                width:205,
                allowBlank:false,
                tabIndex:300,
                valueField:"iddonde",
                hiddenName:"hidenErInstitucion",
                prm:{
                    campo:"donde",
                    idCampo:"iddonde",
                    autoCarga:true,
                    bnd:5,
                    qry:119
                }
            }),
            {
                xtype: 'radiogroup',
                fieldLabel: '4.	¿Recibió producto en institución?  ',
                allowBlank:false,
                labelWidth:50,
                columns: 2,
                items: [
                {
                    boxLabel: 'Si', 
                    inputValue:true,
                    id:'idcpPrg1Si',
                    name:'erR1',
                    listeners:{
                        'check':function(){
                            DesabilitarRabioNo(Ext.getCmp("idcpPrg1Si"),"idcpPrg1Si","idcpPrg1No");
                            visible2(true);
                        }
                    }
                },

                {
                    boxLabel: 'No', 
                    inputValue:false,
                    id:'idcpPrg1No',
                    name:'erR2',
                    listeners:{
                        'check':function(){
                            DesabilitarRabioSi(Ext.getCmp("idcpPrg1No"),"idcpPrg1Si","idcpPrg1No");
                            visible2(false);
                        }
                    }
                }
                ]
            },
            {
                xtype:"hidden",
                name:"erRecibio",
                id:"iderRecibio",
                value:0
            }
            ,{
                xtype:"panel",
                id:'P2',
                autoHeight:true,
                layout:"form",
                border:false,
                items:[{
                    id:'idErFrascos',
                    xtype:"numberfield",
                    fieldLabel:"Frascos otorgados en su ultima visista",
                    name:"erFrascos",
                    width:80,
                    autoCreate:{
                        tag:"input",
                        autocomplete:"off",
                        maxlength:2
                    },
                    enableKeyEvents:true
                }]
            },{
                xtype:"numberfield",
                fieldLabel:"5. Dosis (Comprimidos en cada comida)",
                name:"erDosis",
                width:80,
                autoCreate:{
                    tag:"input",
                    autocomplete:"off",
                    maxlength:3
                },
                enableKeyEvents:true
            }]
        },{
            xtype:"fieldset",
            title:"Comentario adicional",
            autoHeight:true,
            layout:"form",
            labelAlign:"top",
            items:[{
                xtype:"textarea",
                labelSeparator:"",
                tabIndex:304,
                name:"erObservaciones",
                id:"idErObservaciones",
                width:580,
                height:90,
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
        },{
            xtype:"fieldset",
            title:"Bitacora Sesiones",
            autoHeight:true,
            layout:"form",
            labelAlign:"top",
            items:[{
                html:"<div id='idErHtml'></div>",
                border:false
            }]
        }
        ]
    });


    var panelFormEncuestaRenagel= new Ext.FormPanel({
        id:idPnl,
        title:titulo,
        url: url,
        bodyStyle: "padding:5px 5px 0",
        region: this.reg,
        border:false,
        height: this.alto,
        autoHeight: this.autoAlto,
        autoScroll: (!this.autoAlto),
        items:[]
    });

    this.crearEncuestaRenagel = function(){
        panelFormEncuestaRenagel.add(PanelEncuestaRenagel);
        panelFormEncuestaRenagel.doLayout();        
        visible2(false);
        return panelFormEncuestaRenagel;
    }

}


function visible2(bool){
    if(bool==true){
        Ext.getCmp("P2").setVisible(true);
        Ext.getCmp("idErFrascos").allowBlank=false; 
        Ext.getCmp('iderRecibio').setValue(1);
        
    }else if(bool==false){
        Ext.getCmp("P2").setVisible(false);
        Ext.getCmp("idErFrascos").allowBlank=true; 
        Ext.getCmp('iderRecibio').setValue(0);    
    }
}
    
    
function getEncuestaRenagel(idCnt){
    
    var formEncuestaRenagel = new com.punto.pen.PanelEncuestaRenagel({
        alto:350,
        'idCnt':idCnt,
        url:contexto+'/Renagel',
        id:"idFormEncuestaRenagel"
    }).crearEncuestaRenagel();
    
    var wnd = new  Ext.Window({
        id:'idEncuestaRenagelForm',
        title:'Encuesta',
        constrainHeader :true,
        modal:true,
        width:650,
        height:440,
        layout:'anchor',
        autoScroll:false,
        bodyStyle: 'padding:5px;',
        border:false,
        draggable:true,
        resizable:false,
        items:[formEncuestaRenagel],
        buttons:[{
            text:'Guardar', 
            handler:function(){
                submitFormulario(formEncuestaRenagel,{
                    url:contexto+'/Renagel',
                    idCnt:idCnt,
                    bnd:1,
                    pnl:"idFormEncuestaRenagel",
                    wnd:'idEncuestaRenagelForm'
                });
            }
        },{
            text:'Salir',
            handler:function(){
                Ext.Msg.show({
                    title:'Cerrar Encuesta',
                    msg: '¿Está seguro que desea cerrar la ventana<br>Los datos no guardados se perderán?',
                    buttons: Ext.Msg.YESNO,
                    animEl: 'elId',
                    fn: function(btn){
                        if(btn == 'no'){}
                        if(btn == 'yes'){
                            var wnd = Ext.getCmp('idEncuestaRenagelForm');
                            wnd.close();
                        }
                    },
                    icon: Ext.MessageBox.WARNING
                });
            }
        }]
    });
    wnd.show(); 
    
    Ext.Ajax.request({
        url:contexto+'/Renagel',
        params:{
            bnd:2,
            'idCnt':idCnt
        },
        success:function(rsp){
            var json = eval("("+rsp.responseText+")");
            Ext.getCmp('idSession').setValue(json.nombreS);
            Ext.getCmp('idErSesion').setValue(json.idS);
            document.getElementById('idErHtml').innerHTML=json.html;
        },
        failure:function(rsp){
        }
    });
    
}