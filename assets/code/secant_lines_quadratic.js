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
    board.create('functiongraph', [f], 
                    {strokeColor:'blue', strokeWidth:2}
                );
    var h = interacts.create('slider',
                [
                    [-1,0],[2,0],
                    [-1.5,1,1.5]
                ],
                {name:'h', snapWidth:0.01, precision:2}
            );
    var aPt = board.create('point', [ a, f(a) ], {fixed:true, label:"$x=1$"});
    var bPt = board.create('point',
                    [ function(){ return a+h.Value(); },
                        function(){ return f(a+h.Value());} ],
                    {label:"$x=1+h$"}
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
    function(x) {return x*x; },   // Function
    1,                                  // Point
    [-3, 4, 3, -4],                     // View box: xmin, ymax, xmax, ymin
    'slq'                               // Identifier suffix
);
