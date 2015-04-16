;(function(define, _win) { 'use strict'; define( [ 
	'MChart.View.BaseView'
], function( BaseView ) {

	var LEGEND_PADDING = 7;

	var BaseLegendView = Objs(
		"Common.view.components.BaseLegendView"
    	, BaseView
    	, {
    		/** 
		     * @construct 
		     * @override 
		     * 初始化UserForm实例. 
		     */  
		    initialize: function( _canvas ) {
		        //调用父类中的initialize函数  
		        BaseLegendView.$super.initialize.call( this );

		        this.canvas = _canvas;

		        this.addEventListener( MChart.NotificationNames.UPDATE_VIEW, this.update );
		        this.addEventListener( MChart.NotificationNames.SHOW_CHART, this.draw );
		    }

		    , update: function( e, _data ) {

		    	var _p = this
		    		, _c = this.coordinate()
		    		, _displaySeriesIndexMap = _c.displaySeriesIndexMap || [];

		    	if( _data.legend && !_data.legend.enabled ) {
		    		return;
		    	} else {
		    		var _legendView = new createjs.Container()
		    			, _tmpItem
		    			, _tmpText
		    			, isSelect;

		    		this.legendItem = [];

		    		this.legendText = [];

		    		if( _data.series ) {

	                	var _colos = MChart.DefaultOptions.colors//改
	                		, _itemStyle = $.extend( 
		                		( _data.tips.style ? _data.legend.itemStyle || {} : {} )
		                		, MChart.DefaultOptions.legend.itemStyle, true 
		                	);

	                	$.each( _data.series, function( _idx, _item ) {
	                		isSelect = _displaySeriesIndexMap.indexOf( _idx ) >= 0;

	                		_tmpItem = new createjs.Shape();

	                		_tmpItem.set( { 
	                			name: _item.name 
	                			, color: _colos[ _idx ]
	                			, alpha: isSelect ? 1 : .5
	                			, selected: isSelect ? true : false
	                		} );
	                		
	                		_tmpItem.on( 
	                			'click'
	                			, _p.legendItemClick
	                			, null
		                        , false
		                        , { 
		                            index: _idx
		                            , view: _p
		                        }
		                    );

	                		_legendView.addChild( _tmpItem );
	                		_p.legendItem.push( _tmpItem );

	                		_tmpText = new createjs.Text( ( _item.name || '' ), _itemStyle.font, '#ffffff' );
	                		_tmpText.set( {
	                			selectColor: _colos[ _idx ]
	                			, textAlign: 'center'
	                		} );

	                		_tmpText.mouseEnabled = false;

	                		_legendView.addChild( _tmpText );
	                		_p.legendText.push( _tmpText );

	                	} );
	                }

	                this.displayObj = _legendView;

	                this.stage().addChild( _legendView.set( { 'name': 'legendView' } ) );
		    	}
		    }

		    , draw: function() {

		    	var _p = this
		    		, _c = this.coordinate()
		    		, _legendView = this.getDisplayObj()
		    		, _margin = 10
		    		, _x = 0
		    		, _y = 0
		    		, _tmpText
		    		, _textMaxWidth = this.getMaxWidthText();

		    	if( _c.legend ) {
			    	$.each( this.legendItem, function( _idx, _item ) {
			    		_tmpText = _p.legendText[ _idx ];

			    		if( _idx !== 0 ) {
							_x += _margin;
			    		}

			    		_item.set( {
			    			x: _x
			    			, y: _y
			    			, width: _textMaxWidth + LEGEND_PADDING * 2
			    			, height: _tmpText.getMeasuredHeight() + LEGEND_PADDING * 2
			    		} ).graphics.beginFill( _item.color ).drawRoundRect(
			    			0
			    			, 0
				    		, _item.width
			    			, _item.height
			    			, 5
			    		);

			    		_tmpText.set( {
			    			x: _x + _item.width / 2
			    			, y: _y + LEGEND_PADDING / 2
			    		} );

			    		_x += _item.width;
			    	} );
		    		
		    		_legendView.set( {
		    			x: _c.legend.x - _x / 2
		    			, y: _c.legend.y
		    		} );
		    	}
		    }

		    , legendItemClick: function( _evt, _data ) {

		    	var _p = _data.view
		    		, _index = _data.index
		    		, _legendItem = _evt.target
		    		, _tweenObj = createjs.Tween.get( _legendItem )
		    		, _filterData = [];

		    	if( _legendItem.selected ) {
		    		//do unselect
		    		_tweenObj.to( {
			    		alpha: .5
			    	}, 200 );
		    	} else {
		    		//do select
		    		_tweenObj.to( {
			    		alpha: 1
			    	}, 200 );
		    	}
		    	_legendItem.selected = !_legendItem.selected;

		    	$.each( _p.legendItem, function( _idx, _item ) {
		    		if( !_item.selected ) {
		    			_filterData.push( _idx );
		    		}
		    	} );

		    	_p.dispatchEvent( MChart.NotificationNames.FILTER_DATA_CMD, { 
		    		canvas: _p.canvas
		    		, filterData: _filterData 
		    	} );

		    }

		    , getMaxWidthText: function() {
		    	var _tmpWidth = 0
		    		, _maxWidth;

		    	$.each( this.legendText, function( _idx, _item ) {
		    		_tmpWidth = _item.getMeasuredWidth();
		    		_maxWidth = _maxWidth > _tmpWidth ? _maxWidth : _tmpWidth;
		    	} );

		    	return _maxWidth;
		    }

		    , getMaxHeightText: function() {
		    	var _tmpHeight = 0
		    		, _maxHeight;

		    	$.each( this.legendText, function( _idx, _item ) {
		    		_tmpHeight = _item.getMeasuredHeight();
		    		_maxHeight = _maxHeight > _tmpHeight ? _maxHeight : _tmpHeight;
		    	} );

		    	return _maxHeight + LEGEND_PADDING * 2;
		    }
    	}
    );

	return BaseLegendView;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);