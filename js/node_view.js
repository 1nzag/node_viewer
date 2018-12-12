
// node default option
var NodeWidth = 80;
var NodeHeight = 40;
var NodeColor = "#01DFD7";
var NodeTextleft = 40;
var NodeTextHeight = 20;

var NodeId = 0;

function CreateRoot()
{
    var canvas = document.getElementById("NodeCanvas");
    var context = canvas.getContext("2d");
    context.fillStyle = NodeColor;
    context.fillRect(50,300,NodeWidth,NodeHeight);
    //draw rect

    context.fillStyle = "Black"
    context.font = "12px Arial"
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(String(NodeId) + ": Root" ,50 + NodeTextleft , 300 + NodeTextHeight);
    //fill text

}

