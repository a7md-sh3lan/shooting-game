$(document).ready(function()
{
$(".mode button").on("click",function()
{
    $(".container").hide();
    $(".user").show();
    
    
})

/********* validation */
$("#txt").on("keypress", function(event){
    if(event.key){
        $("#add").prop('disabled', false);
        console.log('hello');
    }
});

$("#add").on("click",function()
{
    $(".user").hide();
    $(".play").show();
   
    var user_name=$("#txt").val();
    $(".userdata").append("Hello " +user_name);
    $(".score").append("score:");
   
    /************timer */
     seconds = 120;
     
     countDown=  setInterval(function(){
        min= Math.floor(seconds/60);
        remSec=seconds % 60;
        if(seconds > 59 && seconds < 70 )
        {
            remSec = "0"+remSec;
            
        }
        else if(seconds < 10 )
        {
            remSec = "0"+remSec;
            
        }
        else if(seconds == 120)
        {
            remSec = "00";
        }
        
        
        $("#timer").html( "0"+min+ ":" +remSec);
        if(seconds >0)
        {
             seconds -= 1;
             
        }
       
        else{
            clearInterval(countDown);
            $(".gameover").append(".gameover img").show();
        }

    },500);
    
    
    
    
})  







$("div .shooter").on("click",function(){
    var audio = new Audio('audio_file.mp3');
    audio.play();
  })
    
})

   
