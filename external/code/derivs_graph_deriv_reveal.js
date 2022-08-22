// Leave all of this alone for any secant line.
(function() {
    var board1 = JXG.JSXGraph.initBoard('box_fcn', 
                {
                    boundingbox: [-10,10,10,-10], 
                    axis: true, 
                    showNavigation: false
                }
            );
    var board2 = JXG.JSXGraph.initBoard('box_deriv',
                {
                    boundingbox: [-10,10,10,-10], 
                    axis: true, 
                    showNavigation: false
                }
            );
    var myFFcn = function(x){return 4*x*Math.exp(-x*x/8)+1}
    var myFPrime = function(x){return (4-x*x)*Math.exp(-x*x/8)}

    var myFGraph = board1.create('functiongraph', [myFFcn], 
                    {strokeColor:'blue', strokeWidth:2}
                );
    var xMax = board1.create('glider',
                [ -1, myFFcn(-1), myFGraph],
                {name:'x'}
            );

    board1.create('functiongraph', [
        function(x){
            var y,m,a;
            a = xMax.X();
            y = myFFcn(a);
            m = myFPrime(a);
            return y+m*(x-a);
        }],
        {strokeColor:'orange', strokeWidth:2}
        );
    board2.create('functiongraph', 
                    [myFPrime, -10, function(){return xMax.X()}],
                    {strokeColor:'orange', strokeWidth:2}
                  );
    board2.create('point', [
                        function(){return xMax.X()}, 
                        function(){return myFPrime(xMax.X())}
                    ],
                    {name:'x'}
                );
    board1.addChild(board2);
})();
