;(function(define, _win) { 'use strict'; define( [
    'MChart.Base'
    , 'MChart.Curvegram.MainFacad'
], function( Base, MainFacad ) {

    var Curvegram = $.extend( Base, {
        
        initChart: function() {

            this._initClassName = 'mchart-curvegram';

            this._init();

            /* 获取facade实例并进行初始化 */
            var _facade = MainFacad.getInstance();
            _facade.initChart( {
                selector: this.canvas() /* 传入canvas对象进行图表初始化 */
                , nickName: MChart.NickNames.CURVEGRAM /* view会根据传入的图表别名进行区别初始化，图表应该保证别名的唯一性 */
            } );
        }
    }, true );

	Curvegram.initChart();

});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);