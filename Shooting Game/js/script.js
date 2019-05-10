$(function(){

/////////////// code Variables //////////////////////////////////////////////////////
    var mode; //to record the mode chosen
    var linePosition=0; // to move the lines which contain the blocks
    var buildBlocks;
    var score=0;
    var LEFT = false;
    var RIGHT = false;
    var bulletID;
    var moveShooterID;
    var flag=0;

    $(".easy,.normal").on("click",function(e){
        mode=e;
        $(".landingPage").hide();
        $(".start").show();
    }); // end the onclick function to choose mode


    /* Start The Function To check the validation of name and redirect to the game page */
    $(".add").on("click",function(){

        $(".landingPage").hide();
        $(".start").hide();
        $(".game").show();

        $(".name h4").text($(".start input").val()) //show the player name in the game
    


        /* Show The Page Of Game */

        if($(".game").css("display")=="block"){
        ///////////////// code functions ////////////////////////////////////////////////////
            /* Start The Function of collision */

            function removeChild(){

                var breakable = $(".shoot").collision(".child"); 
                var  bullet = $(".child").collision(".shoot");
                bullet.remove(); //remove the shoot
            
                //check for every block to remove and record 10 points
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
                            score+=50;
                        }
                        
                        else if ((nextS.hasClass("special") && preS.length==0) || (preS.hasClass("special") && nextS.length==0))
                        {
                            score+=40;
                        }
                        else if ((nextS.length==0 && preS.length==1) || (preS.length==0 && nextS.length==1))
                        {
                            score+=20;
                        }
                        else if (nextS.length==0 && preS.length==0)
                        {
                            score+=10;
                        }
                        
                        else
                        {
                            score+=30;
                        }
    
                    }
                    else if(breakable.hasClass("special"))
                    {
                        breakable.remove();
                        score+=30;
                    }
                    else
                    {
                        breakable.remove();
                        score+=10;
                    }

                }); //end the function of remove block and record points

                // check if the every block in one line are removed and remove the line from html
                $(".line").each(function(){
                    if($(this).children("div.parent2").children().length==0){
                        $(this).remove();
                        linePosition-=45; // minus 45 from line position to build a new line
                    }
                }); //end the function of remove line

            }

            /* End The Function of collision */

            function bulletShooting() {

                $("<div></div>").appendTo(".container").addClass("shoot").css("left", parseInt($(".shooter").css("left")) + 25).show();
                bulletID = setInterval(function() {
            
                    $(".shoot").each(function () {
                        if (parseInt($(".shoot").css("bottom")) > parseInt($(".container").css("height")) - 30) {
                            $(this).remove();
                            clearInterval(bulletID);

                        }
                        else {
                            $(".shoot").animate({ "bottom": "+=10" }, 16.67);
                        }


                    });// end of each      
                    removeChild();
                    $(".score span").text(score);
                })

            }  // creating bullet and move 




    ///////////// Function For Moving Shooter and The Shoot*/

            function moveShooter() {  // this function used to move shooter 
                if (LEFT) {
                    if (parseInt($(".shooter").css("left")) <= 20) {

                        $(".shooter").stop(true).css("left", "20px");
                    }
                    else {
                        $(".shooter").animate({ left: "-=10" }, 16);
                    }
                }
                if (RIGHT) {
                    if (parseInt($(".shooter").css("left")) >= 813) {

                        $(".shooter").stop(true).css("left", "813px");
                    }
                    else {

                        $(".shooter").animate({ left: "+=10" }, 16);
                    }
                }

            }// end of moving the shooter

        /*End Of Function For Moving Shooter and The Shoot */



        /* Function For Building Blocks */

        function buildchild(){
        
            $(".line").css("top","+=45"); // build lines
            $("#main").clone().prependTo(".container").css("top","-50px"); //take clone to build a new line
            $(".line").eq(1).children().children().eq(14-(Math.floor(Math.random()*14))).css({"background-image":"url('./images/2.png')"}).addClass("special");
            $(".line").eq(1).children().children().eq(14-(Math.floor(Math.random()*14))).css({"background-image":"url('./images/bomb.png')"}).addClass("super");
            linePosition+=45; //increase the position to move it down

            //check if the line reachs the bottom
            if(linePosition>$(".container").height()-50){

                clearInterval(buildBlocks); //stop building lines
                $(".time").remove(); // stop the timer
                clearInterval(bulletID); // stop creating shoot
                $(".info").hide();
                flag=1;
                
                $(".landingPage").hide(); //hide the landing page
                $(".start").hide(); // hide the start page
                $(".gameOver").show(); // show the page of game over
                $(".gameOver h3 span").text( ($(".score span").text()) ); //show the score in the game over page

                // if the player click the button pf play again
                $(".gameOver button").on("click",function(){

                    $(".game").hide(); //hide the game page
                    $(".landingPage").show(); // hide the landing page
                    $(".start").hide(); // hide the start page
                    $(".gameOver").hide(); // hide the game over page
                    location.reload(true); // make reload to start from the start
                    return;
                }); //end of clicking function of play again

            } //end of the reaching the bottom  condition 

        } // End The function of buildchild()


         /* start The Timer Function */

    $('.timer').startTimer({

        onComplete: function(element){ // after the time out

            clearInterval(buildBlocks); // stop building blocks
            $(".info").hide();
            flag=1;
            
            $(".start").hide(); // hide the start page
            $(".gameOver").hide(); // hide the game over page
            $(".congratulation").show(); // show the congratulation page 
            $(".congratulation h3 span").text( ($(".score span").text()) ); // show the score in congra page

            // check if the player click the button of play again
            $(".congratulation button").on("click",function(){
                $(".game").hide();
                $(".landingPage").show();
                $(".start").hide();
                $(".gameOver").hide();
                location.reload(true);
                return;
            });

        } //end the complete function

    }); //end the starttimer function

         //////////////////////// handling the events on the shooter /////////////////////////////////////////
         document.onkeydown = function (e) {
            if (e.keyCode == 37){
                if(flag==0){
                    LEFT = true;
                }
            }
            if (e.keyCode == 39){
                if(flag==0){
                    RIGHT = true;
                }
            } 
            if (e.keyCode == 32) {
                clearInterval(moveShooterID);
                if(flag==0){
                    bulletShooting();
                }
                setInterval(moveShooter, 16.67);
            }
        }

        document.onkeyup = function (e) {
            if (e.keyCode == 37) {
                LEFT = false;
                $(".shooter").stop(true);
            }
            if (e.keyCode == 39) {
                RIGHT = false;
                $(".shooter").stop(true);
            }
            
        }
        moveShooterID= setInterval(moveShooter, 16.67);
////////////////////////end of handling the events on the shooter  ////////////////////

//////////// chech what is the mode which player choose it //////////////////////////////
        if(mode.target.className=="easy"){
            $("#two").remove();
            buildBlocks = setInterval(function(){
                buildchild();
            },2000)
        }
        else{
            $("#one").remove();
            buildBlocks = setInterval(function(){
                buildchild();
            },900)
        }  


    } // End The  Condition of Dispaly////////////////////////////////


    }); // End The function after adding his name and click start


    $(".container").height($(window).height()-11);  // The Height Of The Game 



    $(".info").height($(window).height());   // The Height of the Div Which contain info about player


    /* Start The Validation input */

    $(".start input").on("keypress", function(event){
        if(event.key){
            $(".add").prop('disabled', false);
        }
    });

    /* End The Validation input */

    //////// instructions handling ///////////////////
    $(".instructions").on("click",function(){
        $(".instruct").show();
    });

    $(".instruct button").on("click",function(){
        $(".instruct").hide();
    })
///////////////end of instructions handling/////////

   

}); // End of Jquery Function
