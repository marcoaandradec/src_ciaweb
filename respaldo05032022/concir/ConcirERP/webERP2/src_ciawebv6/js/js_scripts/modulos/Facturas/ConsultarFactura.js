/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns('com.punto.pen');

com.punto.pen.PanelConsultarFacturas = function(argumentos){
    this.id      = (argumentos.id==null ? '' : argumentos.id);
    this.region  = (argumentos.region==null ? '' : argumentos.region);
    this.titulo  = (argumentos.titulo==null ? '' : argumentos.titulo);
    this.frame   = (argumentos.frame==null ? true : argumentos.frame);
    this.idTree  = (argumentos.idTree==null ? '' : argumentos.idTree);
    this.url     = (argumentos.url==null ? '' : argumentos.url);
    var prm      = (argumentos.prm==null ? {
        bnd:7
    } : argumentos.prm);
    this.evt     = (argumentos.evt==null ? '' : argumentos.evt);
    var pnl = new Ext.form.FormPanel({
        id:this.id,
        url: this.url,
        layout:'anchor',
        autoScroll:false,
        bodyStyle: 'padding:5px;',//background-color:#000000;
        frame:false,
        border:false,
        buttons:this.botones,
        items:[
        {
            xtype:'panel',
            layout:'column',
            anchor:"100%",
            labelAlign:'',
            border:false,
            items:[{
                xtype:"panel",
                columnWidth:0.3,
                layout:"form",
                labelAlign:"top",
                border:false,
                bodyStyle:"padding 5px;",
                items:[{
                    xtype:'numberfield',
                    fieldLabel:'Numero de Factura',
                    name:'fchfactura',
                    allowBlank:false,
                    emptyText:'Introduzca No de Factura',
                    width:150,
                    maxLength: 10, // for validation
                    decimalPrecision:0,
                    autoCreate: {
                        tag: 'input',
                        type: 'text',
                        size: '10',
                        autocomplete: 'off',
                        maxlength: '10'
                    },
                    enableKeyEvents:true,
                    listeners:{
                        'keypress':
                        function(txtField,e){
                            if(e.keyCode==13){
                                getFactura()
                            }
                        }
                    }
                }]
            },{
                xtype:"panel",
                columnWidth:0.7,
                layout:"form",
                align:"center",
                border:false,
                bodyStyle:"padding 5px;",
                items:[{
                    html:'<br>',
                    border:false
                },{
                    xtype: 'radiogroup',
                    fieldLabel: 'Busqueda por',
                    allowBlank:false,
                    id:'idBusqueda',
                    labelWidth:50,
                    columns: 2,
                    items: [{
                        boxLabel: 'No. Factura',
                        name:'vFactura',
                        id:'idFact',
                        checked : true,
                        inputValue: 'factura',
                        handler: function(cmp){
                            if(cmp.checked){
                                getFactura();
                            }
                        },
                        listeners:{
                            'check':function(){
                                getFactura();
                            }
                        }
                    },{
                        boxLabel: 'No. Referencia',
                        name:'vFactura',
                        id:'idRefe',
                        inputValue: 'referencia',
                        handler: function(cmp){
                            if(cmp.checked){
                                getFactura();
                            }
                        },
                        listeners:{
                            'check':function(){
                                getFactura();
                            }
                        }
                    }]
                }]
            },{
                xtype:"panel",
                columnWidth:0.4,
                layout:"form",
                align:"center",
                border:false,
                bodyStyle:"padding 5px;",
                items:[{
                    html:'<br>',
                    border:false
                },{
                    xtype:'button',
                    text:'Buscar',
                    handler:function(){
                        getFactura()
                    }
                }]
            }]
        }
        ],
        listeners:this.evt
    });
    return pnl;
}
function getFactura(){
    var band=0;
    var frm = Ext.getCmp('pnlFichaConF').getForm();
    var idfact=frm.findField('fchfactura').getValue();
    var idRadio=frm.findField('vFactura').getValue();
   // alert("radio--> "+idRadio);
    if(frm.findField('fchfactura').getValue()==''){
        Ext.MessageBox.alert('Campos Vacío', "Debe llenar numero de Factura.")
    }else{
        Ext.Ajax.request({
            url : contexto+'/Factura',
            params:{
                bnd:5,
                idFact:idfact,
                bndFact:idRadio
            },
            success:function(rsp){
                var json = eval("("+rsp.responseText+")");
                band=json.data.nomFactura;
                //alert(band);
                if(band==0){
                    Ext.MessageBox.show({
                        title: 'Información',
                        msg: 'No Existe la Factura',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO
                    });
                }else{
                    if(band==1){
                        //alert("entro");
                        getDetFactura(idfact,idRadio);
                    }else{
                        //alert("entro2");
                        var formBuscarFactura = new com.punto.pen.PanelBuscarFactura({
                            alto:270,
                            'idFact':idfact,
                            'bndFact':idRadio,
                            id:"idFormBuscarFactura",
                            validar:"no"
                        });
                        var wnd = new  Ext.Window({
                            id:'idBuscarFactForm',
                            title:'Consulta Factura',
                            modal:true,
                            constrainHeader :true,
                            draggable:true,
                            resizable:true,
                            width:600,
                            height:250,
                            layout:'anchor',
                            autoScroll:false,
                            bodyStyle: 'padding:5px;',
                            border:false,
                            items:[formBuscarFactura],
                            buttons:[{
                                text:'Salir',
                                handler:function(){
                                    wnd.close();
                                }
                            }]
                        });
                        wnd.show();
                    }
                }
            },
            failure:function(rsp){

            }
        });
        
    }
}


