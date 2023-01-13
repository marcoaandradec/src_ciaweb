/**
 * @author Desarrollo
 */

Ext.ns('com.punto.pen');

com.punto.pen.PanelCombo=function(argumentos){
	this.id = (argumentos.id==null ? '' : argumentos.id);
    this.region = (argumentos.region==null ? '' : argumentos.region);
    this.titulo = (argumentos.titulo==null ? '' : argumentos.titulo);
   // this.anchor = (argumentos.anchor==null ? '' : argumentos.anchor);
    this.frame = (argumentos.frame==null ? false : argumentos.frame);

    //var Xtype = (argumentos.isForm==null ? Ext.Panel : (argumentos.isForm==true ? Ext.form.FormPanel: Ext.Panel));
        var iselect=new Ext.ux.ItemSelector({
                name:"itemselector2",
                id:'itemselector2',
                fieldLabel:"ItemSelector",
                dataFields:["code", "desc"],
                fromData:[[123,"One Hundred Twenty Three"],
                        ["1", "One"], ["2", "Two"], ["3", "Three"], ["4", "Four"], ["5", "Five"],
                        ["6", "Six"], ["7", "Seven"], ["8", "Eight"], ["9", "Nine"]],
                toData:[["10", "Ten"]],
                msWidth:250,
                msHeight:230,
                valueField:"code",
                displayField:"desc",
                //imagePath:"ext-ux/multiselect",
                //switchToFrom:true,
                fromLegend:"Acciones Disponibles",
                toLegend:"Acciones Asignadas",
                toTBar:[
                    {
                        text:"Limpiar",
                        handler:function(){
                            var i=Ext.getCmp("itemselector2");
                            i.reset.call(i);
                        }
                    }
                ]
            });
	

	var pnl= new Ext.form.FormPanel({
	id:this.id,
        title:this.titulo,
        region:this.region,
        autoScroll:true,
        //anchor:this.anchor,
        layout:'column',
        border:true,
        bodyStyle: 'padding: 5px;',
        frame: this.frame,
	  items:[{xtype: 'panel',layout: 'form',labelAlign: 'top',border: false,
            items:[
              {xtype:'fieldset',title: 'Agregar nuevo combo',collapsible: true,autoHeight:true,defaults: {width: 300},            
                items :[
                    {xtype:'textfield',fieldLabel: 'Nombre Combo',id:'nomcombo',name: 'nomcombo',allowBlank:false,emptyText:'Nombre del combo...'}
                ],
            buttons:[{text:'Registrar',iconCls:'icon-save',handler:function(){
                        var vcombo= Ext.getCmp('nomcombo').getValue();
			var n_vcombo=vcombo.lenght;
                            if (n_vcombo>0){
			Ext.Ajax.request({
                            url : contexto+'/AdminCombo',
                            waitMSg:"Espere un momento ... ",
                            clienteValidation:true,
                            //bnd:1,
                            params:{bnd:1,prm:vcombo},
                            success:function(rsp){
                                rsp.responseText;
                                Ext.Msg.alert("",'Se agreg� con �xito.');
                                Ext.getCmp('idCbos').getStore().load();
                                Ext.getCmp('nomcombo').setValue('');
                            },
                            failure:function(rsp){
                                Ext.Msg.alert("",'Hubo un error en el servidor');
                            }
                        });
			}
			else{
			Ext.Msg.alert("",'Ingresa el nombre del combo');
			
			}                        
                        //Ext.MessageBox.alert(vcombo);                        
            }},                     
                     {text:'Limpiar',iconCls:'icn-cross', handler:function(){
                             var i=Ext.getCmp("nomcombo");
                            i.reset.call(i);
                     }}
                 ]
            },{xtype:'fieldset',title: 'Lista de Combos',collapsible: true,autoHeight:true,defaults: {width: 500},
            
            items:[
                {layout:'column',
                    
                    items:[
                        {columnWidth:.5,layout: 'form',border:false,
                        items: [
                            new com.punto.pen.ComboBox({
                                id:'idCbos',
                                etiqueta:'Combos',
                                allowBlank:false,
                                name:'idCbos',
                                campo:'nomCom',
                                idCampo:'idNomCom',
                                tabIndex:106,
                                bnd:5,//5
                                qry:26,                                                                                                
                                autoCarga:true,
                            evt:{
                            'select':function(){
                                //alert('valor: '+this.getRawValue() + ' otro val: ' + this.getValue());
                                var pnt = Ext.getCmp('idCbos');
                                var pst = Ext.getCmp('idCbosOp');
                                pnt.clearValue();
                                pst.clearValue();
                                pnt.getStore().load({
                                    params:{'index':1,'prm1':this.getValue()}
                                    });
                                }
                            }
                    }),
                            new com.punto.pen.ComboBox(
                            {
                                id:'idCbosOp',
                                etiqueta:'Combos',
                                allowBlank:false,
                                name:'idCbosOp',
                                campo:'nomComOp',
                                idCampo:'idNomComOp',
                                tabIndex:106,
                                bnd:12,
                                qry:34,
                                autoCarga:false})
                           ]
                        },
                        {columnWidth:.5,layout: 'form',border:false,
                            items: [
                                {xtype:'textfield',fieldLabel: 'Agregar Opcion',id:'agr_opc',name: 'agr_opc', anchor:'95%'}
                            ]
                        }]
                    },{buttons:[
                        {text:'Registrar',
                            iconCls:'icon-save',
                            handler:function(){
                                var ms=Ext.getCmp('idCbos').getValue();
                                Ext.Msg.alert(ms);
                            }
                        },
                        {text:'Limpiar',iconCls:'icn-cross',handler:function(){
                            var i=Ext.getCmp("agr_opc");
                            i.reset.call(i);
                        }}]
                },/*iselect,*/
                ]/*,
                    buttons:[
                        {text:'Registrar',iconCls:'icon-save'},
                        {text:'Cancelar',iconCls:'silk-user-add'},
                        {text:'Limpiar',iconCls:'icn-cross',handler:function(){
                            var i=Ext.getCmp("itemselector2");
                            i.reset.call(i);
                        }}]*/
                     }
                       
         ]
          }]
     });

     
     return pnl;
}

