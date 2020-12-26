$(document).ready(function(){
    $.getJSON('http://localhost:3000/statecity/fetchallstate',function(data){
       $.each(data,function(index,item)
       {
           $('#st').append($('<option>').text(item.statename).val(item.stateid))
       })
    })
    $('#st').change(function(){
    
        $.getJSON('http://localhost:3000/statecity/fetchallcity',{did:$('#st').val()},function(data){
            $('#ct').empty()
       $.each(data,function(index,item)
       {
           $('#ct').append($('<option>').text(item.cityname).val(item.cityid))
       })
    })
    
    })
    })
    