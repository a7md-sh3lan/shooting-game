$(function(){

	/* Function For Moving Shooter */
    
    $(".child").after($(".child"));
    id = setInterval(function(){
        // buildchild();
        $(".line").css("top","+=45").clone().prependTo(".container").css("top","-50px");
    },3000) 

    function shooting()
    {
        setInterval(function(){
            $(".shoot").each(function()
            {
                if(parseInt($(".shoot").css("top"))>1){
                    // removeChild();
                    var breakable = $(".shoot").collision(".child" ); // no "as", so we get the things we collided with instead of new div's
                    var  bullet = $(".child").collision(".shoot");
                    bullet.remove();
                    breakable.remove();  
                }
                else{
                    $(this).remove();
                }
            });       
        });
    }

    $(document).keydown(function(e){

        switch (e.which){

            case 37: // left arrow key

                if(parseInt($(".shooter").css("left"))<=15){

                	$(".shooter").css("left","15px");
                }
                else{

                	$(".shooter").stop().animate({
                    	left: "-=10"
                	},10);
                }
                break;

            case 39: // right arrow key

                if(parseInt($(".shooter").css("left"))>=425){

                	$(".shooter").css("left","435px");
                }
                else{

                	$(".shooter").stop().animate({
                    	left: "+=10"
                	},10);
                }
                break;

                // move the shoot

            case 38: // up arrow key for shooting

                $("<div></div>").appendTo(".container").addClass("shoot").css("left",parseInt($(".shooter").css("left"))+25).show().animate({top: 0}, 1000,shooting());                
                break;
        }// switch end
        
    })

    /*End Of Function For Moving Shooter */



    /* Function For Building Blocks */

	leftConter=0;

	
    
    leftConter+=45;

		if(leftConter>$(".container").height()-100){
			clearInterval(id);
		}


    /* End Of Function Building Blocks */


    

    // The Height Of The Game
    
    $(".container").height($(window).height()-11);
    $(window).resize(function(){

    	$(".container").height($(window).height()-11);

    });
    


})// End of Jquery Function