<script type="text/javascript">
            var needToConfirm=true;
            function confirmExit(){
                if (needToConfirm == true){
                    needToConfirm=true;
                    return " ";
                }

            }
            document.oncontextmenu = function(){return false;}
            window.onbeforeunload = confirmExit;
        </script>

        <!-- Nuestras libraries -->
        <script type="text/javascript" src="<%=request.getContextPath()%>/js/CJL_CookieUtil.js"></script>
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/iconos.css" />
        <script type="text/javascript">var contexto = '<%= request.getContextPath()%>';</script>
        <!-- Ext libraries -->
        
