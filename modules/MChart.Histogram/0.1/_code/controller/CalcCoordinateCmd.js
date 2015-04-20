;(function(define, _win) { 'use strict'; define( 'MChart.Histogram.Controller.CalcCoordinateCmd', [
	'MChart.Common.Model.RateProxy'
	, 'MChart.Common.Model.SeriesProxy'

	, 'MChart.Common.View.BgMediator'
	, 'MChart.Common.View.CreditsMediator'
	, 'MChart.Common.View.LegendMediator'
	, 'MChart.Common.View.TitleMediator'
	, 'MChart.Common.View.SubtitleMediator'
	, 'MChart.Common.View.VTitleMediator'
	, 'MChart.Common.View.VLabelMediator'
	, 'MChart.Common.View.InnerViewMediator'
	, 'MChart.Common.View.GroupMediator'
	, 'MChart.Common.View.HLabelMediator'
	, 'MChart.Common.View.HLineMediator'
	, 'MChart.Common.View.VLineMediator'
	, 'MChart.Common.View.TipsMediator'
	, 'MChart.Histogram.View.GraphicMediator'
], function( 
	RateProxy
	, SeriesProxy

	, BgMediator
	, CreditsMediator
	, LegendMediator
	, TitleMediator
	, SubtitleMediator
	, VTitleMediator
	, VLabelMediator
	, InnerViewMediator
	, GroupMediator
	, HLabelMediator
	, HLineMediator
	, VLineMediator
	, TipsMediator
	, GraphicMediator
) {

	var CalcCoordinateCmd = Objs(
		"Histogram.Controller.CalcCoordinateCmd"
	    , MacroCommand
		, {
		    /** 
		     * 添加Subcommands来启动PuerMVC组件 
		     * 通常这里是先准备Model（即Proxy），然后是View（即Mediators); 
		     */  
		    initializeMacroCommand: function( note ) {
		        // console.log( ' CalcCoordinateCmd : initializeMacroCommand ' );
		        //this.addSubCommand( PrepModelCommand );
		        //this.addSubCommand( PrepViewCommand );
		    }

		    , execute: function( e ) {

		    	var _canvas = e.getBody().selector
		    		, _nickName = e.getBody().nickName
		    		, _data = _canvas.data;

		    	var _c = {}
			    	, _x = 0, _maxX = _canvas.width() - 10
	                , _y = 0, _maxY = _canvas.height() - 5
	                , _in_x, _in_maxX
	                , _in_y, _in_maxY;

		    	_canvas.coordinate = _c;

		    	/* init chartData proxy start 初始化图表数据工具 */

	            /* calc displaySeries */
	            var _seriesProxy = new SeriesProxy( _nickName, _canvas );
	            this.facade.registerProxy( _seriesProxy );

	            _c.displaySeries = _seriesProxy.getData().getDisplaySeries( _data.series );
	            _c.displaySeriesIndexMap = _seriesProxy.getData().getDisplaySeriesIndexMap();
		    	
		    	/* clac rate */
	            var _rateProxy = new RateProxy( _nickName, _canvas );
	            this.facade.registerProxy( _rateProxy );

	            _c.rateInfo = _rateProxy.getData().calcRate( _data );

	            /* init chartData proxy end */

		    	/* init comps mediator start 初始化图表组件 */

		    	/* background 图表背景 */
		    	var _bgMediator = new BgMediator( _nickName, _canvas );
		    	this.facade.registerMediator( _bgMediator );

		    	/* credits 图表版权文字 */
		    	var _creditsMediator = new CreditsMediator( _nickName, _canvas );
		    	this.facade.registerMediator( _creditsMediator );

		    	/* legend 图例按钮 */
		    	var _legendMediator = new LegendMediator( _nickName, _canvas );
		    	this.facade.registerMediator( _legendMediator );

		    	/* title 图表主标题 */
		    	var _titleMediator = new TitleMediator( _nickName, _canvas );
		    	this.facade.registerMediator( _titleMediator );

		    	/* subtitle 图表副标题 */
		    	var _subtitleMediator = new SubtitleMediator( _nickName, _canvas );
	            this.facade.registerMediator( _subtitleMediator );

	            /* vTitle 图表竖标题( Y轴标题 ) */
	            var _vTitleMediator = new VTitleMediator( _nickName, _canvas );
	            this.facade.registerMediator( _vTitleMediator );

	            /* innerView 图表华东区域视图 */
	            var _innerViewMediator = new InnerViewMediator( _nickName, _canvas );
	            this.facade.registerMediator( _innerViewMediator );

	            /* group 图表华东区域视图 */
	            var _groupMediator = new GroupMediator( _nickName, _canvas );
	            this.facade.registerMediator( _groupMediator );

	            /* hlabels 横向标签 */
	            var _hLabelMediator = new HLabelMediator( _nickName, _canvas );
	            this.facade.registerMediator( _hLabelMediator );
	            
	            /* vlabels 竖向标签 */
	            var _vLabelMediator = new VLabelMediator( _nickName, _canvas );
	            this.facade.registerMediator( _vLabelMediator );

	            /* hline 横向分割线 */
	            var _hLineMediator = new HLineMediator( _nickName, _canvas );
	            this.facade.registerMediator( _hLineMediator );

	            /* vlabels 竖向分割线 */
	            var _vLineMediator = new VLineMediator( _nickName, _canvas );
	            this.facade.registerMediator( _vLineMediator );

	            /* tips 数据气泡( 小标签 ) */
	            var _tipsMediator = new TipsMediator( _nickName, _canvas );
	            this.facade.registerMediator( _tipsMediator );
	            
	            /* graphic 数据图形 */
	            var _graphicMediator = new GraphicMediator( _nickName, _canvas );
	            this.facade.registerMediator( _graphicMediator );

		    	/* init comps mediator end 初始化图表组件 */

		    	/* calc comps start 计算图表组件 */

		    	_c.stage = { x: 0, y: 0, width: _canvas.width(), height: _canvas.height() };
		    	
		    	/* calc background */
		    	_x = 2, _y = 10;

		    	/* calc credits */
		    	var _credits = _creditsMediator.getComponent().getDisplayObj();
	            if( _credits ) {
	                _c.credits = {
	                    x: _maxX
	                    , y: _maxY - _credits.getMeasuredHeight() - 2
	                    , ele: _credits
	                }
	                _maxY = _c.credits.y - 5;
	            }

		    	/* calc title */
		    	var _title = _titleMediator.getComponent().getDisplayObj();
	            if( _title ) {
	                _c.title = {
	                    x: _maxX / 2
	                    , y: _y
	                    , ele: _title
	                }
	                _y += _title.getMeasuredHeight() + 5;
	            }

	            /* calc subtitle */
		    	var _subtitle = _subtitleMediator.getComponent().getDisplayObj();
	            if( _subtitle ) {
                	_c.subtitle = {
	                    x: _maxX / 2
	                    , y: _y
	                    , ele: _subtitle
	                }
	                _y = _c.subtitle.y + _subtitle.getMeasuredHeight() + 8;
	            }

	            /* calc legend */
	            var _legend = _legendMediator.getComponent().getDisplayObj();
	            if( _legend ) {
	            	_c.legend = {
	            		x: _maxX / 2
	            		, y: _maxY - _legendMediator.getComponent().getMaxHeightText() + 5
	            	}
	            	_maxY -= _legendMediator.getComponent().getMaxHeightText();
	            }

	            var _vtitle = _vTitleMediator.getComponent().getDisplayObj();
	            if( _vtitle ) {
	            	_c.vtitle = {
	            		y: _y
	            	}
	            	_y += _vtitle.getMeasuredHeight() + 5;
	            }

	            /* calc yAxis */
	            var tmpArr
	                , _tmpX
	                , _tmpY
	                , _partHeight
	                , _partWidth
	                , _vlabelMaxWidth
	                , _hlabelMaxHeight
	                , _arrowWidth = 5
	                , _marginWidth = 5
	            	, _hafLabeHeight;

	            var _hLabelView = _hLabelMediator.getComponent()
	            	, _hlabels = _hLabelView.getDisplayObj()
	            	, _vLabelView = _vLabelMediator.getComponent()
	            	, _vlabels = _vLabelView.getDisplayObj()
	            	, _arraws = _vLabelView.getArraws();

	            _in_maxY = _maxY - ( _hLabelView.labelMaxHeight() || 0 ) - _arrowWidth - _marginWidth - _y;

	            _partHeight = _in_maxY / ( _c.rateInfo.realRate.length - 1 );
	            
	            /* calc vlabels */
	            if( _vlabels ) {
	                _c.vlabels = [];
	                tmpArr = [];

	                _vlabelMaxWidth = _vLabelView.labelMaxWidth();

	                _tmpX = _x;
	                _tmpY = _y;

	                var _arrawTmpX = _tmpX + _vlabelMaxWidth + _marginWidth;

	                _hafLabeHeight = _vlabels[ 0 ].getMeasuredHeight() / 2;
	                $.each( _vlabels, function( _idx, _label ) {
	                    tmpArr.push( {
	                        x: _tmpX + _vlabelMaxWidth
	                        , y: _tmpY - _hafLabeHeight
	                        , ele: _label
	                        , arraw: _arraws && ( function() {
	                        	return {
		                        	start: {
		                        		x: _arrawTmpX
		                        		, y: _tmpY
		                        	}
		                        	, end: {
		                        		x: _arrawTmpX + _arrowWidth
		                        		, y: _tmpY
		                        	}
		                        	, ele: _arraws[ _idx ]
		                        }	
	                        } )()
	                    } );
	                    
	                    _tmpY += _partHeight;
	                } );

	                tmpArr.length && ( _c.vlabels = tmpArr );

	                _x += _vlabelMaxWidth + _marginWidth + ( _arraws ? _arrowWidth : 0 );
	            }

	            /* calc VTitle */
	            if( _vtitle ) {
	                _c.vtitle = {
	                    x: _x
	                    , y: _c.vtitle.y
	                    , ele: _vtitle
	                }
	            }

	            /* calc innerView */
	            var _innerView = _innerViewMediator.getComponent()
	            	, _xAxis = _data.xAxis
	            	, _maskWidth = _maxX - _x
	            	, _innerViewScrollWidth = _xAxis.partWidth ? _xAxis.partWidth * _xAxis.categories.length : _maskWidth;

	            if( _innerViewScrollWidth < _maskWidth ) {
	            	_innerViewScrollWidth = _maskWidth;
	            }

	            if( _innerView ) {
	            	_c.innerView = {
	            		x: _x
	            		, y: _y
	            		, width: _maskWidth
	            		, height: _maxY - _y
	            		, scrollWidth: _innerViewScrollWidth
	            		, ele: _innerView
	            	}

	            	_in_x = 0; _in_y = 0;
	            }

	            _partWidth = _innerViewScrollWidth / _xAxis.categories.length;
	            
	            /* calc hlabel */
	            if( _hlabels ) {
	            	_c.hlabels = [];
	            	tmpArr = [];

	                var _xAxis = _data.xAxis
	                	, innerViewY = _c.innerView.height
	                	, _arraws = _hLabelView.getArraws()
	                	, _arrawTmpY;

	            	_tmpX = _partWidth / 2;
	                _tmpY = innerViewY - _hLabelView.labelMaxHeight();

	                _arrawTmpY = _tmpY - _marginWidth * 2;

	            	$.each( _hlabels, function( _idx, _label ) {
	            		tmpArr.push( {
	            			x: _tmpX
	            			, y: _tmpY
	            			, ele: _label
	            			, arraw: _arraws && ( function() {
	                        	return {
		                        	start: {
		                        		x: _tmpX
		                        		, y: _arrawTmpY
		                        	}
		                        	, end: {
		                        		x: _tmpX
		                        		, y: _arrawTmpY + _arrowWidth
		                        	}
		                        	, ele: _arraws[ _idx ]
		                        }	
	                        } )()
	            		} );

	            		_tmpX += _partWidth;
	            	} );

	            	_c.hlabels = tmpArr;
	            }

	            /* calc group */
	            var _groups = _groupMediator.getComponent().getDisplayObj();
	            if( _groups ) {
	            	tmpArr = [];

	            	_tmpX = 0;

	            	$.each( _groups, function( _idx, _item ) {
	            		tmpArr.push( {
	            			x: _tmpX
	            			, y: _in_y
	            			, width: _partWidth
	            			, height: _c.innerView.height
	            			, ele: _item
	            		} );

	            		_tmpX += _partWidth;
	            	} );

	            	_c.group = tmpArr;
	            }

	            /* calc hline */
	            var _hlines = _hLineMediator.getComponent().getDisplayObj();
	            if( _hlines ) {

	            	tmpArr = [];
	            	_tmpY = 0;

	            	$.each( _hlines, function( _idx, _line ) {
	            		tmpArr.push( {
	            			start: {
                        		x: _in_x
                        		, y: _tmpY
                        	}
                        	, end: {
                        		x: _innerViewScrollWidth
                        		, y: _tmpY
                        	}
	            			, ele: _line
	            		} );

	            		_tmpY += _partHeight;
	            	} );

	            	_c.hlines = tmpArr;
	            }

	            /* calc vline */
	            var _vlines = _vLineMediator.getComponent().getDisplayObj();
	            if( _vlines ) {
	            	
	            	tmpArr = [];

	            	_tmpX = 0;
	            	_tmpY = 0;

	            	$.each( _vlines, function( _idx, _line ) {
	            		tmpArr.push( {
	            			start: {
                        		x: _tmpX
                        		, y: _tmpY
                        	}
                        	, end: {
                        		x: _tmpX
                        		, y: _tmpY + _in_maxY
                        	}
	            			, ele: _line
	            		} );

	            		_tmpX += _partWidth;
	            	} );

	            	_c.vlines = tmpArr;
	            }

	            /* calc tips */
	            var _tips = _tipsMediator.getComponent().getDisplayObj();
	            if( _tips ) {
	            	_c.tips = {
	            		ele: _tips
	            	}
	            }

	            /* calc rects */
	            var _rectDatas = _graphicMediator.getComponent().getDisplayObj();
	            if( _rectDatas ) {
	            	tmpArr = [];

	            	var _displaySeriesLen = _c.displaySeries.length//改
	            		, _baseHeight
	            		, _rectHeight
	            		, _positiveH
	            		, _negativeH
	            		, _tmpData
	            		, _partSpace = 5
	            		, _displayWidth = _partWidth * 3 / 4
	            		, _padding = _partWidth / 8
	            		, _rectWidth = ( _displayWidth - ( _displaySeriesLen - 1 ) * _partSpace ) / _displaySeriesLen
	            		, _maxRateNum = _c.rateInfo.realRate[ 0 ]
	            		, _minRateNum = _c.rateInfo.realRate[ _c.rateInfo.realRate.length - 1 ];

	            	_tmpX = 0;
	            	_tmpY = _in_maxY;

	            	_positiveH = _c.rateInfo.zeroIndex * _partHeight;
	            	_negativeH = ( _c.rateInfo.length - _c.rateInfo.zeroIndex - 1 ) * _partHeight;

	            	if( _rectWidth <= 5 ) {
	            		_partSpace = 0;
	            	} else if ( _rectWidth >= 50 ) {
	            		_rectWidth = 50;
	            		_padding = ( _partWidth - _displaySeriesLen * ( _rectWidth + _partSpace ) + _partSpace ) / 2;
	            	}

	            	var _baseRectY = _c.rateInfo.zeroIndex * _partHeight;

	            	$.each( _rectDatas, function( _i, _rectList ) {
	            		tmpArr[ _i ] = [];

	            		_tmpX = _padding + _i * ( _rectWidth + _partSpace );

	            		$.each( _rectList, function( _idx, _rect ) {

	            			_tmpData = _rect.data;

	            			if ( _tmpData >= 0 ) {
	            				_rectHeight = _tmpData / _maxRateNum * _positiveH;
	            				_tmpY = _baseRectY - _rectHeight;
	            			} else {
	            				_rectHeight = _tmpData / _minRateNum * _negativeH;
	            				_tmpY = _baseRectY;
	            			}

	            			tmpArr[ _i ].push( {
	            				x: _tmpX
	            				, y: _tmpY
	            				, width: _rectWidth
	            				, height: _rectHeight
	            				, data: _tmpData
	            				, ele: _rect
	            			} );

	            			_tmpX += _partWidth;
	            		} );

	            	} );

	            	_c.rects = tmpArr;
	            }

		    	this.sendNotification( MChart.NotificationNames.SHOW_CHART );
		  
		    }
		      
		}
	);

	return CalcCoordinateCmd;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);