;(function(define, _win) { 'use strict'; define( 'MChart.Common.Controller.FilterDataCmd', [
	'MChart.Common.Model.SeriesProxy'
], function( 
	SeriesProxy
) {

	var FilterDataCmd = Objs(
		"Common.Controller.FilterDataCmd"
	    , puremvc.MacroCommand
		, {
		    
		    initializeMacroCommand: function( note ) {}

		    , execute: function( e ) {
		    	
		    	var _data = e.getBody().data
		    		, _nickName = e.getBody().nickName
		    		, _canvas = _data.canvas
		    		, _seriesProxy;

		    	/* init displaySeries */
	            _seriesProxy = new SeriesProxy( _nickName, _canvas );
	            this.facade.registerProxy( _seriesProxy );

	            _seriesProxy.getData().updateDisplaySeries( {
	            	filterData: _data.filterData
	            } );

	            this.sendNotification( MChart.NotificationNames.DRAW_CMD, {
	    			selector: _canvas
	    			, nickName: _nickName
	    		} );
		    }
		}
	);

	return FilterDataCmd;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);