// JavaScript Document// JavaScript Document
Ext.ns('com.punto.pen');
	
com.punto.pen.regControlLlamadasReporte = function(argumentos){
	
    var pnlId = (argumentos.id==null ? '' : argumentos.id);
    var idMod = (argumentos.idMod==null ? '0' : argumentos.idMod);
    var idAcc = (argumentos.idAcc==null ? '' : argumentos.idAcc);
    idAccion = idAcc;
    var idTree = (argumentos.idTree==null ? '' : argumentos.idTree);
    idArbol = idTree;
    // var punto = '';
    this.titulo = (argumentos.titulo==null ? 'Llamadas Outbound' : argumentos.titulo);
	
	var msg = Ext.MessageBox.show({
	   title: 'Cargando...',
	   msg: 'Cargando información, espere por favor...',
	   progressText: 'Cargando...',
	   width:300,
	   wait:true,
	   waitConfig: {interval:200},
	   //icon:'ext-mb-download', //custom class in msg-box.html
	   animEl: 'mb7'
   });
		
	Ext.Ajax.request({
		url:contexto+'/ControlLlamadas',
		params:{'bnd':3},
		success:function(rsp){
			var arrayColumnas = eval("("+rsp.responseText+")");
			var cmp = Ext.getCmp('idColumLayout');
            for(var i = 0;i < arrayColumnas.length;i++){
                var grd = arrayColumnas[i];
                cmp.add(grd);
           }
            cmp.doLayout();
			
			msg.hide();

		}
		
	});
	
	this.pnlControlLlamadas = new Ext.Panel({
		title: 'Panel de Control Llamadas Outbound',
		layout:'column',
		border:false,
		id :'idColumLayout',
		tbar : [
			{text: 'Regresar', 
				iconCls:'icn-back',
				handler: function(){
					IniciarAccion('pnlTreeAccionesREP',false,false,'pnlCenter',new com.punto.pen.PanelBienvenida({msg:'Módulo Reportes'}));
				}
					
			
			},{text: 'Actualizar Información',
				iconCls:'icn-refresh',
				handler: function(){
					var msg1 = Ext.MessageBox.show({
					   title: 'Cargando...',
					   msg: 'Cargando información, espere por favor...',
					   progressText: 'Cargando...',
					   width:300,
					   wait:true,
					   waitConfig: {interval:200},
					   //icon:'ext-mb-download', //custom class in msg-box.html
					   animEl: 'mb7'
				   });
					Ext.Ajax.request({
						url:contexto+'/ControlLlamadas',
						params:{'bnd':3},
						success:function(rsp){							
							var arrayColumnas = eval("("+rsp.responseText+")");
							var cmp = Ext.getCmp('idColumLayout');
							for(var i = 0;i < arrayColumnas.length;i++){
								var grd = arrayColumnas[i];
								cmp.add(grd);
						   }
							cmp.doLayout();
							
							msg1.hide();
				
						}
						
					});
					Ext.getCmp('idColumLayout').removeAll();
					Ext.getCmp('idColumLayout').doLayout();
				}
					
			
			}
		]
										   
	});
	
	
	return this.pnlControlLlamadas;
	
}