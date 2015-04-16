;(function(define, _win) { 'use strict'; define( [ 
	'MChart.View.BaseView'
], function( BaseView ) {

	var BaseHLineView = Objs(
		"Common.view.components.BaseHLineView"
    	, BaseView
    	, {
    		/** 
		     * @construct 
		     * @override 
		     * 初始化UserForm实例. 
		     */  
		    initialize: function( _canvas ) {  
		        //调用父类中的initialize函数  
		        BaseHLineView.$super.initialize.call( this );

		        this.canvas = _canvas;

		        this.addEventListener( MChart.NotificationNames.UPDATE_VIEW, this.update );
		        this.addEventListener( MChart.NotificationNames.SHOW_CHART, this.draw );
		    }

		    , update: function( e, _data ) {

		    	var _option = $.extend( true, MChart.DefaultOptions.yAxis, _data.yAxis || {} );

		    	if( !this.enbaledCheck( _option ) ) {
		    		return;
		    	}

		    	var _p = this
		    		, _tmpHLine
	                , _hlineArray = []
	                , _innerView = _p.canvas.innerView
	                , _lineStyle = _option.line.style
                	, _rateInfo = this.coordinate().rateInfo
	                , _tmpGraphics = new createjs.Graphics()
                		.setStrokeStyle( _lineStyle.lineWidth, 'round', 'round' )
                		.beginStroke( _lineStyle.color );

                for( var _idx = 0; _idx < _rateInfo.realRate.length; _idx++ ) {

                	_tmpHLine = new createjs.Shape( _tmpGraphics.clone() );

                	_tmpHLine.mouseEnabled = false;

                	_hlineArray.push( _tmpHLine );
                	_innerView.addChild( _tmpHLine );
                }

                this.displayObj = _hlineArray;
		    }

		    , draw: function() {

		    	var _p = this
		    		, _tmpLine
		    		, _c = this.coordinate();

		    	if( _c.hlines && _c.hlines.length ) {
		    		$.each( _c.hlines, function( _idx, _lineData ) {

		    			_tmpLine = _lineData.ele;

		    			_tmpLine.graphics
		    				.moveTo( _lineData.start.x, _lineData.start.y )
		    				.lineTo( _lineData.end.x, _lineData.end.y );
		    		} );
		    	}
		    }

		    , enbaledCheck: function( _option ) {
		    	return _option.enabled ? _option.line.enabled : false;
		    }
    	}
    );

	return BaseHLineView;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);