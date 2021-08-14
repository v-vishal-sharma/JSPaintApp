console.log("Script Loaded")
window.onload = function() {
    // Canvas Variables
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        dX = 0,
        dY = 0,
        delX,
        delY,
        rW=0, 
        o_rW=0, 
        rH=0,
        o_rH=0,
        startX,
        startY,

        // Object Variables
        // mouseMove = false,
        mouseDown = false,
        dragOk = false,
        // borderColor = 'black',
        // borderWidth = 2,
        colorPicker = 0,
        pickedColor,
        objects = [],
        fillColor = ['red', 'gray', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown'];

    // class cursorActive {
    //     constructor(x, y) {
    //         this.x = x;
    //         this.y = y;
    //     }
    // }



    // Event Functions
    function CursorMove() {
        // context.clearRect(0,0,canvas.width,canvas.height);
        onmousemove = function(e){
            e.preventDefault();
            e.stopPropagation();

            if(!mouseDown){
                return; 
            }

            delX = (e.clientX);
            delY = (e.clientY);

            // if(dragOk){
                // console.log(
                //     "Cursor Move Co-ord:", 
                //     delX, 
                //     delY,
                // );

                rW = delX - dX;
                rH = delY - dY;
                // if(rW < o_rW && rH < o_rH){
                //     context.clearRect(0,0,canvas.width,canvas.height);
                //     context.closePath(); 
                // }
                o_rW = rW;
                o_rH = rH;
                
                // if(rH < o_rH){
                //     context.clearRect(0,0,canvas.width,canvas.height);    
                //     context.closePath();
                // }
                var dx=dX-startX;
                var dy=dY-startY;

                if(dragOk){
                    e.preventDefault();
                    e.stopPropagation();

                    console.log("starting to drag")
                    for(var i=0;i<objects.length;i++){
                        var o=objects[i];
                        if(o.isDrag){
                          o.x += dX;
                          o.y += dY;
                        }
                      }
                }
                else {
                    // console.log("funny", dX, dY);
                    context.beginPath();
                    context.rect(dX, dY, rW, rH);
                    context.fillStyle = fillColor[colorPicker];
                    pickedColor = fillColor[colorPicker];
                    context.fill();
                    context.stroke();
                    context.closePath();
                }
                startX=dX;
                startY=dY;
        }
            
    }

    function CursorDown() {
        onmousedown = function(e){
            console.log("Cursor Down");
            colorPicker = Math.floor((Math.random() * 9) + 1);
            mouseDown = true;
            mouseMove = true;
            // console.clear();
            dX = (e.clientX);
            dY = (e.clientY);
            // console.log(
            //     "Cursor Down Co-ord:", 
            //     dX, 
            //     dY,
            // );
            dragOk=false;
            for(var i=0;i<objects.length;i++){
                var o=objects[i];
                // decide if the shape is a rect or circle               
                if(dX>o.dX && dX<o.dX + o.rW && dY>o.dY && dY<o.dY + o.rH){
                    // if yes, set that rects isDragging=true
                    console.log("cursor inside object");
                    dragOk=true;
                    o.isDrag=true;
                }
                else {
                    var dx=o.x-dX;
                    var dy=o.y-dY;

                }
            }
            // save the current mouse position
            startX=dX;
            startY=dY;
        }
    }

    function CursorUp() {
        onmouseup = function(e){
            mouseDown = false;
            objects.push({x:dX, y:dY, width:rW, height:rH, fill:pickedColor, isDrag:false});
            console.log("Objects:", objects);
            dragOk = false;
            for(var i=0;i<objects.length;i++){
              objects[i].isDrag=false;
            }
            // console.clear();     
        }

    }

    // var cursorActive = new cursorActive(0,0),
    //     cord = new cord(0,0);


    // Clear Screen Function  
    document.getElementById("clear-screen").addEventListener("click", clearScreen);
    function clearScreen() {
        console.log("Clear Screen Called");
        // var canvas = document.getElementById("canvas"),
        //     context = canvas.getContext("2d");
        objects.length = 0
        context.clearRect(0, 0, width, height);
    }

    // EventListeners
    canvas.addEventListener("mousemove", CursorMove());
    canvas.addEventListener("mousedown", CursorDown());
    canvas.addEventListener("mouseup", CursorUp());
    // update();

    // function update() {
    //     context.clearRect(0, 0, width, height);
    //     for(var i = 0; i < 100; i += 1) {
	// 		// context.clearRect(0, 0, width, height);s
	// 		context.beginPath();
	// 		context.moveTo(Math.random() * width, Math.random() * height);
	// 		context.lineTo(Math.random() * width, Math.random() * height);
	// 		context.stroke();
	// 	}	
    
    // }

};

