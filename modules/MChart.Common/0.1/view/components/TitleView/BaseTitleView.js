;(function(define, _win) { 'use strict'; define( [ 
	'MChart.View.BaseView'
], function( BaseView ) {

	var BaseTitleView = Objs(
		"Common.view.components.BaseTitleView"
    	, BaseView
    	, {
    		/** 
		     * @construct 
		     * @override 
		     * 初始化UserForm实例. 
		     */  
		    initialize: function( _canvas ) {  
		        //调用父类中的initialize函数  
		        BaseTitleView.$super.initialize.call( this );

		        this.canvas = _canvas;

		        this.addEventListener( MChart.NotificationNames.UPDATE_VIEW, this.update );
		        this.addEventListener( MChart.NotificationNames.SHOW_CHART, this.draw );
		    }

		    , update: function( e, _data ) {

		    	var _c = this.coordinate();

                if( _data && _data.title && _data.title.text ) {

	                var _titleStyle = $.extend( _data.title.style || {}, MChart.DefaultOptions.title.style, true );

	                this.displayObj = new createjs.Text( 
	                    _data.title.text
	                    , _titleStyle.font
	                    , _titleStyle.color
	                );
	                
	                this.displayObj.textAlign = 'center';

	                this.stage().addChild( this.displayObj );
	            }
		    }

		    , draw: function() {

		    	var _c = this.coordinate()
		    		, _displayObj = this.getDisplayObj();

		    	if( _c.title ){
	                _displayObj.x = _c.title.x;
	                _displayObj.y = _c.title.y;
	            }
		    }
    	}
    );

	return BaseTitleView;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);