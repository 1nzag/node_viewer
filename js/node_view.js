
// node default option
var NodeWidth = 80;
var NodeHeight = 40;
var NodeColor = "#01DFD7";
var NodeTextleft = 40;
var NodeTextHeight = 20;
var BaseTop = 200;
var BaseLeft = 50;

var NodeId = 0;

var TreeRoot = new Object();

/* node structure
node id
node name
node child (list)
*/

function CreateNode(NodeName)
{
    var Node = new Object();
    Node.NodeId = NodeId;
    Node.NodeName = NodeName;
    Node.ChildList = new Array();
    return Node;
}

function DisplayNode(lNodeId, lNodename, Width, Height)
{
    var canvas = document.getElementById("NodeCanvas");
    var context = canvas.getContext("2d");
    context.fillStyle = NodeColor;
    context.fillRect(Width,Height,NodeWidth,NodeHeight);
    //draw rect

    context.fillStyle = "Black"
    context.font = "12px Arial"
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(String(lNodeId) + ": " + lNodename ,50 + NodeTextleft , 200 + NodeTextHeight);
    //fill text

}

function DrawTree()
{
    DisplayNode(TreeRoot.NodeId, TreeRoot.NodeName, 50, 200);
    alert(TreeRoot.NodeName);
}

function CreateRoot()
{
        TreeRoot = CreateNode("Root");
        NodeId = NodeId + 1; //50, 200
        DrawTree();
}

