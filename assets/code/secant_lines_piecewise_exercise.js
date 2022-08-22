// Leave all of this alone for any secant line.
(function(f, a, bbox, id) {
    var board = JXG.JSXGraph.initBoard('box_'+id, 
                {
                    boundingbox: bbox, 
                    axis: true, 
                    showNavigation: false
                }
            );
    var interacts = JXG.JSXGraph.initBoard('interact_'+id,
                {
                    boundingbox: [-3,1,3,-1], 
                    axis: false, 
                    showNavigation: false,
                    showCopyright: false
                }
            );
    var fxn = board.create('functiongraph', [f], 
                    {strokeColor:'blue', strokeWidth:2}
                );
    board.create('point', [-2,2], 
                {strokeColor:'blue', strokeWidth:2, fillColor:'blue',name:''}
            );
    board.create('point', [-2,1], 
            {strokeColor:'blue', strokeWidth:2, fillColor:'white',name:''}
        );
    var h = interacts.create('slider',
                [
                    [-1,0],[2,0],
                    [-1.5,1,1.5]
                ],
                {name:'h', snapWidth:0.01, precision:2}
            );
    var aPt = board.create('glider', [ a, f(a), fxn ], {fixed:false, label:"$x=a$",name:'A'});
    var bPt = board.create('point',
                    [ function(){ return aPt.X()+h.Value(); },
                        function(){ return f(aPt.X()+h.Value());} ],
                    {label:"$x=1+h$", name:'B'}
                );
    board.create('line', [aPt, bPt]);
    interacts.create('text', [-2.1, 0, "\u0394f/\u0394x = "], {anchorX:'right'});
    interacts.create('text', [-2, 0, function() {
        var slope = (bPt.Y()-aPt.Y())/(bPt.X()-aPt.X());
        return slope.toFixed(5);
        }
    ], {anchorX:'left'});
    interacts.addChild(board);
})
// Modify this part to change the example
(
    function(x) {                       // Function
        var y = (x+3)*(x+3)+1;
        if (x > -2) {
            y = 3-x*x/2;
            if (x>2) {
                y = Math.exp(x-2);
            }
        }
        return y;
    },
    1,                                  // Point
    [-4, 4, 4, -4],                     // View box: xmin, ymax, xmax, ymin
    'slpe'                               // Identifier suffix
);
