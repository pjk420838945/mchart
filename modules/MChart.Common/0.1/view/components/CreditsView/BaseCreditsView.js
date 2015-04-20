;(function(define, _win) { 'use strict'; define( 'MChart.Common.View.BaseCreditsView', [ 
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

		    	var _option = $.extend( true, MChart.DefaultOptions.credits, _data.credits || {} );

		    	if( !this.enbaledCheck( _option ) ) {
		    		return;
		    	}

		    	var _creditsStyle = _option.style
	    			, _text = _option.text
	    			, _href = _option.href

	    		this.displayObj = new createjs.Text( 
                    _text
                    , _creditsStyle.font
                    , _creditsStyle.color
                );

                this.displayObj.textAlign = "right";

                this.stage().addChild( this.displayObj );
		    }

		    , draw: function() {
		    	var _c = this.coordinate()
		    		, _displayObj = this.getDisplayObj();

		    	if( _c.credits ) {
	                _displayObj.x = _c.credits.x;
	                _displayObj.y = _c.credits.y;
	            }
		    }

		    , enbaledCheck: function( _option ) {
		    	return _option.enabled;
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