;(function(define, _win) { 'use strict'; define( [ 
	'MChart.View.BaseView'
], function( BaseView ) {

	var BaseCreditsView = Objs(
		"Common.view.components.BaseCreditsView"
    	, BaseView
    	, {
    		/** 
		     * @construct 
		     * @override 
		     * 初始化UserForm实例. 
		     */  
		    initialize: function( _canvas ) {  
		        //调用父类中的initialize函数  
		        BaseCreditsView.$super.initialize.call( this );

		        this.canvas = _canvas;

		        this.addEventListener( MChart.NotificationNames.UPDATE_VIEW, this.update );
		        this.addEventListener( MChart.NotificationNames.SHOW_CHART, this.draw );
		    }

		    , update: function( e, _data ) {

		    	var _c = this.coordinate();

		    	if( _data && _data.credits.enabled && ( _data.credits.text || _data.credits.href ) ) {

		    		var _defaultOptions = MChart.DefaultOptions.credits
		    			, _style = $.extend( _data.credits.style || {}, _defaultOptions.style, true )
		    			, _text = _data.credits.text || _defaultOptions.text
		    			, _href = _data.credits.href || _defaultOptions.href

		    		this.displayObj = new createjs.Text( 
	                    _text
	                    , _style.font
	                    , _style.color
	                );

	                this.displayObj.textAlign = "right";

	                this.stage().addChild( this.displayObj );
		    	}
		    }

		    , draw: function() {
		    	var _c = this.coordinate()
		    		, _displayObj = this.getDisplayObj();

		    	if( _c.credits ) {
	                _displayObj.x = _c.credits.x;
	                _displayObj.y = _c.credits.y;
	            }
		    }
    	}
    );

	return BaseCreditsView;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);