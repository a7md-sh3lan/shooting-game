$(function(){

q=0;
	/* Function For Moving Shooter */
    function removeChild()
        {
            var breakable = $(".shoot").collision(".child"); // no "as", so we get the things we collided with instead of new div's
            var bullet = $(".child").collision(".shoot");
            bullet.remove();
            /////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////
            breakable.each(function(){
                if(breakable.hasClass("super"))
                {
                    var nextS= breakable.parent().next().children();
                    nextS.remove();
                    var preS= breakable.parent().prev().children();
                    preS.remove();
                    breakable.remove();
                    
                    if((nextS.hasClass("special")&& preS.length==1) || (preS.hasClass("special")&& nextS.length==1))
                    {
                        q+=5;
                    }
                    
                    else if ((nextS.hasClass("special") && preS.length==0) || (preS.hasClass("special") && nextS.length==0))
                    {
                        q+=4;
                    }
                    else if ((nextS.length==0 && preS.length==1) || (preS.length==0 && nextS.length==1))
                    {
                        q+=2;
                    }
                    else if (nextS.length==0 && preS.length==0)
                    {
                        q+=1;v
                    }
                    
                    else
                    {
                        q+=3
                    }

                }
                else if(breakable.hasClass("special"))
                {
                    breakable.remove();
                    q+=3;
                }
                else
                {
                    breakable.remove();
                    q++;
                }
                /////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////

                
                // if(breakable.hasClass("special") || breakable.hasClass("super"))
                // {
                //     q+=3;
                // }
                // else
                // {
                //     q++;
                // }
                
            });
        }
    

        // console.log(q);
        


    $(".line").each(function(){
                if($(this).children("div.parent2").children().length==0){
                    $(this).remove();
                    leftConter-=45;
                }
            });
       
    $(document).keydown(function(e){

        switch (e.which){

            case 37: // left arrow key

                if(parseInt($(".shooter").css("left"))<=20){

                	$(".shooter").css("left","20px");
                }
                else{

                	$(".shooter").animate({
                    	left: "-=20"
                	},1);
                }
                break;

            case 39: // right arrow key

                if(parseInt($(".shooter").css("left"))>=813){

                	$(".shooter").css("left","813px");
                }
                else{

                	$(".shooter").animate({
                    	left: "+=20"
                	},1);
                }
                break;

                // move the shoot

            case 38: // up arrow key for shooting

                
                 $("<div></div>").appendTo(".container").addClass("shoot").css("left",parseInt($(".shooter").css("left"))+25).show();


                 x=setInterval(function(){

                    counter=0;
                    setInterval(function(){
                        counter++;
                    },100);

                   if(counter==0){

                        $(".shoot").each(function(){

                        if(parseInt($(".shoot").css("bottom"))>parseInt($(".container").css("height"))-30){
                            $(this).remove();
                            
                        }

                        else{
                            $(".shoot").animate({"bottom":"+=10"},1);
                        }
                        
                    
                    });// end of each      
                       removeChild();
                       $(".score").text(q);
                        counter=0;
                    }
                        
                    })
                break;

        }// switch end
        
    })// end of keydown function    

    /*End Of Function For Moving Shooter */



    /* Function For Building Blocks */

    
	leftConter=0;
    
	function buildchild(){

        $(".line").css("top","+=45");
        $("#main").clone().prependTo(".container").css("top","-50px");
        /////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////
        $(".line").eq(1).children().children().eq(14-(Math.floor(Math.random()*14))).css({"background-image":"url('./images/index.png')"}).addClass("special");
        $(".line").eq(1).children().children().eq(14-(Math.floor(Math.random()*14))).css({"background-image":"url('./images/bomb.jpg')"}).addClass("super");
        /////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////
		leftConter+=45;

		if(leftConter>$(".container").height()-50){
		  clearInterval(id);
		}
	}

	id = setInterval(function(){
		buildchild();
    },2000)  


    /* End Of Function Building Blocks */


    

    // The Height Of The Game
    
    $(".container").height($(window).height()-11);


})// End of Jquery Function