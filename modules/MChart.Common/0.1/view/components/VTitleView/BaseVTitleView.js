;(function(define, _win) { 'use strict'; define( [ 
	'MChart.View.BaseView'
], function( BaseView ) {

	var BaseVTitleView = Objs(
		"Common.view.components.BaseVTitleView"
    	, BaseView
    	, {
    		/** 
		     * @construct 
		     * @override 
		     * 初始化UserForm实例. 
		     */  
		    initialize: function( _canvas ) {  
		        //调用父类中的initialize函数  
		        BaseVTitleView.$super.initialize.call( this );

		        this.canvas = _canvas;

		        this.addEventListener( MChart.NotificationNames.UPDATE_VIEW, this.update );
		        this.addEventListener( MChart.NotificationNames.SHOW_CHART, this.draw );
		    }

		    , update: function( e, _data ) {

		    	var _option = $.extend( true, MChart.DefaultOptions.yAxis, _data.yAxis || {} );

		    	if( !this.enbaledCheck( _option ) ) {
		    		return;
		    	}

                var _titleStyle = _option.title.style;

                this.displayObj = new createjs.Text( 
                    _data.yAxis.title.text
                    , _titleStyle.font
                    , _titleStyle.color
                );
                
                this.stage().addChild( this.displayObj );
		    }

		    , draw: function() {

		    	var _c = this.coordinate()
		    		, _displayObj = this.getDisplayObj();

		    	if( _c.vtitle ){
	                _displayObj.x = _c.vtitle.x;
	                _displayObj.y = _c.vtitle.y;
	            }
		    }

		    , enbaledCheck: function( _option ) {
		    	return _option.enabled ? _option.title.enabled : false;
		    }
    	}
    );

	return BaseVTitleView;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);