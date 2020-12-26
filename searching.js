

$(document).ready(function(){
    $('#txt').keyup(function(){
        $.getJSON('http://localhost:3000/doctor/search',{ajax:true,pat:$('#txt').val()},function(data){

            xtm="<table border=1 cellSpacing='10' cellpadding='10'>"
            i=1
            $.each(data,function(index,item){
                if(i==1)
                {
                    xtm+='<tr>'

                }
                
                xtm+="<td><img src='/images/"+item.picture+"' width=100 height=150><br><br>"
     xtm+=item.name+"<br>"
     xtm+=item.number1+"<br></td>"

                i++
                if(i==5)
                {
                    xtm+="</tr>"
                    i=1}
                })
                xtm+="</table>"
                $('#result').html(xtm)
                

            })
        

    })
})