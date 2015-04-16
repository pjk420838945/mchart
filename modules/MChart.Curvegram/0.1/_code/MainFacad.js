;(function(define, _win) { 'use strict'; define( [ 
    'MChart.Curvegram.Controller.CalcCoordinateCmd'
], function( CalcCoordinateCmd ){

	var MainFacade = Objs(
		"Curvegram.MainFacade"
		, Facade
		, {
	        /** 
	         * 程序开始入口
	         */  
	        initChart: function( chartData ) {

	        	//发送计算指令
	        	this.sendNotification( MChart.NotificationNames.CALC_DATA_CMD, chartData );
	        }
	          
	        /** 
	         * 重写initializeController(),并注册commands
	         */  
	        , initializeController: function() {
	            MainFacade.$super.initializeController.call( this );
			    //注册Command

			    this.registerCommand( MChart.NotificationNames.CALC_DATA_CMD, CalcCoordinateCmd );
	        }
	    }
	);
	  
	/** 
	 * 实现程序的单例类 
	 * @return {ApplicationFacade} 
	 *         Facade实例类的使用贯穿整个程序 
	 */  
	MainFacade.getInstance = function() {
	    if( !Facade.instance ){
	        Facade.instance = new MainFacade();
	    }
	    
	    return Facade.instance;
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