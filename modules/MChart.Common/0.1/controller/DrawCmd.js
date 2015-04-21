;(function(define, _win) { 'use strict'; define( 'MChart.Common.Controller.DrawCmd', [
], function( 
) {

	var DrawCmd = Objs(
		"Common.Controller.DrawCmd"
	    , puremvc.MacroCommand
		, {
		     
		    initializeMacroCommand: function( note ) {}

		    , execute: function( e ) {

		    	var _canvas = e.getBody().selector
		    		, _nickName = e.getBody().nickName;

		    	this.sendNotification( MChart.NotificationNames.CLEAR_CMD, {
	    			selector: _canvas
	    		} );

		    	this.sendNotification( MChart.NotificationNames.CALC_DATA_CMD, {
	    			selector: _canvas
	    			, nickName: _nickName
	    		} );
		    }
		}
	);

	return DrawCmd;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);