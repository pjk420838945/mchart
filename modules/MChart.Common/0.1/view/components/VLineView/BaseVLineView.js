;(function(define, _win) { 'use strict'; define( [ 
	'MChart.View.BaseView'
], function( BaseView ) {

	var BaseVLineView = Objs(
		"Common.view.components.BaseVLineView"
    	, BaseView
    	, {
    		/** 
		     * @construct 
		     * @override 
		     * 初始化UserForm实例. 
		     */  
		    initialize: function( _canvas ) {  
		        //调用父类中的initialize函数  
		        BaseVLineView.$super.initialize.call( this );

		        this.canvas = _canvas;

		        this.addEventListener( MChart.NotificationNames.UPDATE_VIEW, this.update );
		        this.addEventListener( MChart.NotificationNames.SHOW_CHART, this.draw );
		    }

		    , update: function( e, _data ) {

		    	var _c = this.coordinate();

		    	var _p = this
		    		, _tmpVLine
	                , _vlineArray = []
	                , _innerView = _p.canvas.innerView
	                , _tmpGraphics = new createjs.Graphics().setStrokeStyle( 0.75, 'round', 'round' ).beginStroke( '#999' );

	            if( _data && _data.xAxis && _data.xAxis.categories ) {

	                var _line = $.extend( ( _data.xAxis.line ? _data.xAxis.line : {} ), MChart.DefaultOptions.xAxis.line, true )
	                	, _style = _line.style;

	                if( !_line.enabled ) {
	                	return;
	                }

	                for( var _idx = 0; _idx <= _data.xAxis.categories.length; _idx++ ) {

	                	_tmpVLine = new createjs.Shape( _tmpGraphics.clone() );

	                	_tmpVLine.mouseEnabled = false;

	                	_vlineArray.push( _tmpVLine );
	                	_innerView.addChild( _tmpVLine );
	                }

	                this.displayObj = _vlineArray;
	            }

		    }

		    , draw: function() {

		    	var _p = this
		    		, _tmpLine
		    		, _c = this.coordinate();

		    	if( _c.vlines && _c.vlines.length ) {
		    		$.each( _c.vlines, function( _idx, _lineData ) {

		    			_tmpLine = _lineData.ele;

		    			_tmpLine.graphics
		    				.moveTo( _lineData.start.x, _lineData.start.y )
		    				.lineTo( _lineData.end.x, _lineData.end.y );
		    		} );
		    	}
		    }
    	}
    );

	return BaseVLineView;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);