;(function(define, _win) { 'use strict'; define( 'MChart.Histogram.MainFacad', [ 
    'MChart.Histogram.Controller.CalcCoordinateCmd'
    , 'MChart.Common.Controller.FilterDataCmd'
    , 'MChart.Common.Controller.ClearCmd'
    , 'MChart.Common.Controller.DrawCmd'
], function( 
	CalcCoordinateCmd 
	, FilterDataCmd
	, ClearCmd
	, DrawCmd
){

	var MainFacade = Objs(
		"Histogram.MainFacade"
		, puremvc.Facade
		, {

			// initialize: function( _key ) {
			// 	console.log( MainFacade.$super );
			// 	// MainFacade.$super.constructor.call( this, _key );
			// }

	        /** 
	         * 程序开始入口
	         */
	      //   , initChart: function( _chartData ) {

	      //   	//发送绘制指令
	      //   	this.sendNotification( MChart.NotificationNames.DRAW_CMD, _chartData );
	      //   }
	          
	      //   /** 
	      //    * 重写initializeController(),并注册commands
	      //    */
	      //   , initializeController: function() {

	      //       MainFacade.$super.initializeController.call( this );

			    // //注册Command
			    // this.registerCommand( MChart.NotificationNames.CALC_DATA_CMD, CalcCoordinateCmd );
			    // this.registerCommand( MChart.NotificationNames.CLEAR_CMD, ClearCmd );
			    // this.registerCommand( MChart.NotificationNames.DRAW_CMD, DrawCmd );
			    // this.registerCommand( MChart.NotificationNames.FILTER_DATA_CMD, FilterDataCmd );
	      //   }
	    }
	);

	/** 
	 * 实现程序的单例类 
	 * @return {ApplicationFacade} 
	 *         Facade实例类的使用贯穿整个程序 
	 */  
	MainFacade.getInstance = function( _key ) {

		var _f = puremvc.Facade.getInstance( _key );

		_f.registerCommand( MChart.NotificationNames.CALC_DATA_CMD, CalcCoordinateCmd );
		_f.registerCommand( MChart.NotificationNames.CLEAR_CMD, ClearCmd );
	    _f.registerCommand( MChart.NotificationNames.DRAW_CMD, DrawCmd );
	    _f.registerCommand( MChart.NotificationNames.FILTER_DATA_CMD, FilterDataCmd );

	    _f.initChart = function( chartData ) {
	    	this.sendNotification( MChart.NotificationNames.DRAW_CMD, chartData );
	    }

	    return _f;
	};

	return MainFacade;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) {
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require );
            _cb && _cb();
        }
        , window
    )
);