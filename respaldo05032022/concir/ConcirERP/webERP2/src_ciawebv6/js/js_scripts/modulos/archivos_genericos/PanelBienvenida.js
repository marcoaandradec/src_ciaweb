/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns('com.punto.pen');

com.punto.pen.PanelBienvenida = function(argumentos){
    this.msg = (argumentos.msg==null ? '' : argumentos.msg);
    this.img = (argumentos.img==null ? 'logoBayer.jpg' : argumentos.img);
    this.mapear = (argumentos.mapear == null ? false : argumentos.mapear);

    var usemap = "";
    var maping = "";

    if(this.mapear == true){
        usemap = 'usemap=\"#link\"';
        maping ='<map name=\"link\">'+
        '<area shape=\"rect\" coords=\"250,250,1100,400\" href=\"'+contexto+'/CasaKpiActuales" target=\"_blank\">'+
        '</map>';
    }

    this.pnl = new Ext.Panel({
        autoScroll:true,
        style:'satl-title',
        html:'<table align=\"center\" style=\"width:100%;height:100%\">'+
        '<tr><td align=\"center\" valign=\"top\">&nbsp;</td></tr>' +
        '<tr><td align=\"center\">'+
        '<div><img src=\"'+contexto+'/img/Argo2.jpg\" width="450" height="350"></div>'+
        // '<div><img src=\"'+contexto+'/img/' + this.img + '\" width=\"70%\" ' + usemap + ' height=\"70%\"></div> '+maping+
        //            '<img src="trees.gif" usemap="#green" border="0">
        '</td></tr>'+
        '<tr><td align=\"center\" valign=\"top\">'+
        'Bienvenido al Sistema \"Argomex\"<br>'+this.msg+
        '</td></tr>'+
        '</table>'
    });
    return this.pnl;
}
