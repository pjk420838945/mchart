;(function(define, _win) { 'use strict'; define( [
	'MChart.Base.Model.RateProxy'

	, 'MChart.Base.View.BgMediator'
	, 'MChart.Base.View.TitleMediator'
	, 'MChart.Base.View.SubtitleMediator'
	, 'MChart.Base.View.VTitleMediator'
	, 'MChart.Base.View.CreditsMediator'
	, 'MChart.Base.View.VLabelMediator'
	, 'MChart.Base.View.InnerViewMediator'
	, 'MChart.Base.View.HLabelMediator'
	, 'MChart.Base.View.HLineMediator'
	, 'MChart.Base.View.VLineMediator'
], function( 
	RateProxy

	, BgMediator
	, TitleMediator
	, SubtitleMediator
	, VTitleMediator
	, CreditsMediator
	, VLabelMediator
	, InnerViewMediator
	, HLabelMediator
	, HLineMediator
	, VLineMediator
) {

	var CalcCoordinateCmd = Objs(
		"Curvegram.Controller.CalcCoordinateCmd"
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

		    	/* init comps mediator end 初始化图表组件 */

		    	/* calc comps start 计算图表组件 */

		    	_c.stage = { x: 0, y: 0, width: _canvas.width(), height: _canvas.height() };
		    	
		    	/* calc background */
		    	_x = 2, _y = 2;

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
	                    , y: 10
	                    , ele: _title
	                }
	                _y = _c.title.y + _title.getMeasuredHeight();
	            }

	            /* calc subtitle */
		    	var _subtitle = _subtitleMediator.getComponent().getDisplayObj();
	            if( _subtitle ) {
                	_c.subtitle = {
	                    x: _maxX / 2
	                    , y: _y + 10
	                    , ele: _subtitle
	                }
	                _y = _c.subtitle.y + _subtitle.getMeasuredHeight() + 10;
	            }

	            /* calc VTitle */
	            var _vtitle = _vTitleMediator.getComponent().getDisplayObj();
	            if( _vtitle ) {
	                _c.vtitle = {
	                    x: _x + _vtitle.getMeasuredHeight() / 2
	                    , y: ( _maxY - _y + _vtitle.getMeasuredWidth() ) / 2
	                    , ele: _vtitle
	                }
	                _x = _c.vtitle.x + 20;
	            }

	            /* calc yAxis */
	            var tmpArr
	                , _partHeight
	                , _partWidth
	                , _tmpX
	                , _tmpY
	                , _vlabelMaxWidth
	                , _hlabelMaxHeight
	                , _arrowWidth = 5
	                , _marginWidth = 5;

	            var _hLabelView = _hLabelMediator.getComponent()
	            	, _hlabels = _hLabelView.getDisplayObj();

	            var _vLabelView = _vLabelMediator.getComponent()
	            	, _vlabels = _vLabelView.getDisplayObj()
	            	, _arraws = _vLabelView.getArraws()
	            	, _hafLabeHeight;

	            /* calc vlabels */
	            if( _vlabels ) {
	                _c.vlabels = [];
	                tmpArr = [];

	                _vlabelMaxWidth = _vLabelView.labelMaxWidth();

	                _tmpX = _x;
	                _tmpY = _y;

	                _in_maxY = _maxY - _hLabelView.labelMaxHeight() - _arrowWidth - _marginWidth - _y;

	                _partHeight = _in_maxY / ( _vlabels.length - 1 );

	                var _arrawTmpX = _tmpX + _vlabelMaxWidth + _marginWidth;

	                _hafLabeHeight = _vlabels[ 0 ].getMeasuredHeight() / 2;
	                $.each( _vlabels, function( _idx, _label ) {
	                    tmpArr.push( {
	                        x: _tmpX
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

	            /* calc innerView */
	            var _innerView = _innerViewMediator.getComponent();

	            if( _innerView ) {
	            	_c.innerView = {
	            		x: _x
	            		, y: _y
	            		, width: _maxX - _x
	            		, height: _maxY - _y
	            		, ele: _innerView
	            	}

	            	_in_x = 0; _in_y = 0;
	            }

	            /* calc hlabel */
	            var _innerViewRealWidth;
	            if( _hlabels ) {
	            	_c.hlabels = [];
	            	tmpArr = [];

	                var _xAxis = _data.xAxis
	                	, innerViewY = _c.innerView.height
	                	, _arraws = _hLabelView.getArraws()
	                	, _arrawTmpY;

	                _innerViewRealWidth = _xAxis.partWidth ? _xAxis.partWidth * _xAxis.categories.length : _viewData.width
	                _partWidth = _innerViewRealWidth / _hlabels.length;

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
                        		x: _innerViewRealWidth ? _innerViewRealWidth : _in_maxX
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

	            /* calc rects */
	            







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