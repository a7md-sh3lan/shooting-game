$(function(){
    function createShoot(){
       $("<div></div>").appendTo(".container").addClass("shoot").css("left",parseInt($(".shooter").css("left"))+20).show();
   
    }
       
    /* Function For Building Blocks */
   
   
    leftConter=0;
   
    

    
    function buildchild(){

        $(".line").clone().appendTo(".container").css("top",55+leftConter);
        leftConter+=55;

        if(leftConter>550){
            clearInterval(id);
        }

    }

    id = setInterval(function(){
        buildchild();
    },3000)
    
    
    
    /* Function For Moving Shooter */
   
   
       $(document).keydown(function(e){
           switch (e.which){
   
               case 37: // left arrow key
                   if(parseInt($(".shooter").css("left"))<=15){
   
                       $(".shooter").css("left","15px");
                   }
                   else{
   
                       $(".shooter").stop().animate({
                           left: "-=10"
                       },3);
                   }
                   break;
   
               case 39: // right arrow key
                   if(parseInt($(".shooter").css("left"))>=425){
   
                       $(".shooter").css("left","435px");
                   }
                   else{
   
                       $(".shooter").stop().animate({
                           left: "+=10"
                       },3);
                   }
                   break;

               case 38: // up arrow & shooting key
               
                    createShoot(); // create shoot and show it with right position 
                   setInterval(function(){
                       $(".shoot").animate({"bottom":"+=10"},10);
                       
                    //    removeChild().stop();
                        // stop();
                   })
                  // $(".shoot").remove(); 
                  removeChild(); 

                 //  $(".shoot").stop();
                   break;       
           }
           
       })

       
   
       /*End Of Function For Moving Shooter */
   
        // function circleClass()
        // {
        //     for (var i=0;;i<100)
        //     {

        //     }
        // }
   
       

        function removeChild()
        {
            var breakable = $(".shoot").collision(".child" ); // no "as", so we get the things we collided with instead of new div's
            var  bullet = $(".child").collision(".shoot");
            bullet.remove();
            breakable.remove();
        }

        
        // $( "img" ).animate({ top: 600}, 20000 );
        
        // $(".test3").animate({top: 500}, 10000);
        // function removeChild()
        // {
        //     {
        //         var breakable = $(".shoot").collision("img"); // no "as", so we get the things we collided with instead of new div's
        //         var  bullet = $("img").collision(".shoot");
        //         bullet.remove();
        //         breakable.remove();
        //     }
        // }
       
   })