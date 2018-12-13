
// node default option
var NodeWidth = 80;
var NodeHeight = 40;
var NodeColor = "#01DFD7";

// node graphic value
var NodeTextleft = 40;
var NodeTextHeight = 20;
var BaseTop = 200;
var BaseLeft = 50;


var NodeId = 0;

var TreeRoot;

/* node structure
node id
node name
node child (list)
*/

/* Node management */
function CreateNode(NodeName)
{
    var Node = new Object();
    Node.NodeId = NodeId;
    Node.NodeName = NodeName;
    Node.ChildList = new Array();
    return Node;
}

function FindNodeBaseId(Node, id) // find node recursive
{
    var result;
    var i;
    if(!Node)
    {
        return -1;
    }
    if (Node.NodeId == id)
    {
        return Node;
    }
    for(i = 0; i < Node.ChildList.length; i++)
    {
        result = FindNodeBaseId(Node.ChildList[i], id);
        if (result != -1)
        {
            return result;
        }
    }
    return -1;
}

/* Tree Draw */
function CleanCanvas()
{
    var canvas = document.getElementById("NodeCanvas");
    var context = canvas.getContext("2d");

    context.clearRect(0,0,canvas.width, canvas.height);
    context.beginPath();
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
    context.fillText(String(lNodeId) + ": " + lNodename ,Width + NodeTextleft , Height + NodeTextHeight);
    //fill text

}

function CalcHeight(BaseNode) //Calc height recursively
{
    var h = 0;
    var i;
    for(i = 0; i < BaseNode.ChildList.length; i++)
    {
        h += 70;
    }
    //h -= 70;
    for(i = 0; i < BaseNode.ChildList.length; i++)
    {
        h += CalcHeight(BaseNode.ChildList[i]);
    }
    return h;
}



function DrawTree(BaseNode, RecurId, BaseX, BaseY) //Draw tree recursively
{
    var canvas = document.getElementById("NodeCanvas");
    var context = canvas.getContext("2d");
    var VarY = BaseY;
    var AddY;
    var i;
    var j;
    if(RecurId == 0)
    {
        CleanCanvas();
    }
    DisplayNode(BaseNode.NodeId, BaseNode.NodeName, BaseX, BaseY);
    for(i = 0; i < BaseNode.ChildList.length; i = i + 1)
    {
        if(i == 0)
        {
            context.beginPath();
            context.moveTo(BaseX + 80, VarY + 20);
            context.lineTo(BaseX + 80 + 120, VarY + 20);
            context.stroke(); // stroke x
        }
        else
        {
            context.beginPath();
            context.moveTo(BaseX + 80 + 60, VarY + 20);
            context.lineTo(BaseX + 80 + 120, VarY + 20);
            context.stroke();
        }
        if(i < BaseNode.ChildList.length - 1)
        {
            context.beginPath();
            context.moveTo(BaseX + 80 + 60, VarY + 20);
            AddY = CalcHeight(BaseNode.ChildList[i]);
            if(AddY == 0)
            {
                AddY = 70;
            }
            context.lineTo(BaseX + 80 + 60, VarY + 20 + AddY);
            VarY = VarY + AddY;
            context.stroke(); //stroke y
        }
    }
    
    VarY = BaseY;
    for(j = 0; j < BaseNode.ChildList.length; j = j + 1)
    {
        DrawTree(BaseNode.ChildList[j], 1, BaseX + 80 + 120, VarY);
        if(j < BaseNode.ChildList.length - 1)
        {
            AddY = CalcHeight(BaseNode.ChildList[j])
            if(AddY == 0)
            {
                AddY = 70;
            }
            VarY = VarY + AddY;
        }
    }
}

/* button Handler */
function CreateRoot()
{
        if(TreeRoot)
        {
            alert("Root node already exist");
            return;
        }
        TreeRoot = CreateNode("Root");
        NodeId = NodeId + 1; //50, 200
        DrawTree(TreeRoot, 0, BaseLeft, BaseTop);
}

function AddNode(pNodeId, InputNodeName)
{
    var Parent = FindNodeBaseId(TreeRoot, pNodeId);
    if (Parent == -1)
    {
        alert("can't find node Id");
        return;
    }
    
    var NewNode = CreateNode(InputNodeName);
    Parent.ChildList.push(NewNode);
    NodeId = NodeId + 1;
    DrawTree(TreeRoot, 0, BaseLeft, BaseTop);
}

function DeleteRecursive(cNodeId, cNode)
{
    var i;
    if(cNode.ChildList.length == 0)
    {
        return;
    }
    for(i = 0; i < cNode.ChildList.length; i = i + 1)
    {
        if(cNode.ChildList[i].NodeId == cNodeId)
        {
            cNode.ChildList.splice(i,1);
            return;
        }
        DeleteRecursive(cNodeId, cNode.ChildList[i])
    }
}

function DeleteNode(cNodeId)
{
    DeleteRecursive(cNodeId, TreeRoot);
    DrawTree(TreeRoot, 0, BaseLeft, BaseTop);
}

function CleanAll()
{
    CleanCanvas();
    TreeRoot = 0;
    NodeId = 0;
}
