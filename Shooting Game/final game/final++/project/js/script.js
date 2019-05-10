$(function(){
    $(document).keydown(function(e){
        switch (e.which){
            case 37: // left arrow key
                if(parseInt($(".shooter").css("left"))<=15){
                	$(".shooter").css("left","15px");
                }else{
                	$(".shooter").stop().animate({
                    left: "-=10"
                },10);
                }
                break;
            case 39: // right arrow key
                if(parseInt($(".shooter").css("left"))>=425){
                	$(".shooter").css("left","435px");
                }else{
                	$(".shooter").stop().animate({
                    left: "+=10"
                },10);
                }
                break;
        }
        var shooting = $("<div style='width:20px;height:20px;'></div>"); 
       
      $("div .shooter").on("click",function(){
        var audio = new Audio('audio_file.mp3');
        audio.play();
          $("div .shooter").after(shooting);
      })
        
    
    })
	leftConter=0;
	function buildchild(){
		$(".line").clone().appendTo(".container").css("top",45+leftConter);
		leftConter+=45;
		if(leftConter>550){
			clearInterval(id);
		}
	}
	id = setInterval(function(){
		buildchild();
    },3000)
   
	
})