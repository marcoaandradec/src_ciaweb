/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function CerrarSesion(){
    Ext.Msg.show({
        title:'Terminar Sesión',
        msg: '¿Desea terminar la sesión?',
        buttons: Ext.Msg.YESNO,
        animEl: 'elId',
        fn: function(btn){
            if(btn == 'no'){
            }
            if(btn == 'yes'){
                Ext.MessageBox.show({
                   msg: 'Cerrando la sesión, espere por favor...',
                   progressText: 'Saving...',
                   width:300,
                   wait:true,
                   waitConfig: {interval:200},
                   icon:'ext-mb-download', //custom class in msg-box.html
                   animEl: 'mb7'
               });
                goToUrl(contexto+'/CerrarSesion');
            }
        },
        icon: Ext.MessageBox.WARNING
    });
}