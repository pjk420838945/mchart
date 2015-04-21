;(function(define, _win) { 'use strict'; define( 'MChart.Base', [ 
    , 'JC.Common'
    , 'MChart.NotificationNames'
    , 'MChart.DefaultOptions'
], function(){

	var _jdoc = $( document ), _jwin = $( window );
	
	var Base = {

        init: function( _className ) {
            var _p = this
                , _canvas
                , _selector
                , _canvasArray = [];

            $.each( _p.selectors( _className ), function( _idx, _item ) {

                _selector = $( _item );

                _canvas = _p.initCanvas( _selector );

                _canvas.data = _p.initData( _selector );

                _canvas.devicePixelRatio = _p.devicePixelRatio();
                _canvas.stage = _p.initStage( _canvas );

                _canvasArray.push( _canvas );
            } );

            this.canvas = _canvasArray;

            return _canvasArray;
        }

        , selectors: function( _className ) {

            if( !_className ) {
                return;
            }

            return $( '.' + _className );
        }

        /*
         *   初始化stage
         *   
         *   @param  _canvas  canvas
         *   
         *   @return 初始化完成的stage对象
         */
        , initStage: function( _canvas ) {


            if( !_canvas || _canvas.length == 0 ) {
                return;
            }

            var _ratio = this.devicePixelRatio()
                , _stage;

            _stage = new createjs.Stage( _canvas[ 0 ] );

            _stage.scaleX = _ratio;
            _stage.scaleY = _ratio;

            _stage.enableMouseOver( 20 );

            _stage.mouseMoveOutside = true;
            
            // createjs.Touch.enable( _stage, false, true );

            createjs.Ticker.addEventListener( "tick", _stage );

            return _stage;
        }

        /*
         *   初始化canvas对象
         *   
         *   @param  _selector  selector
         *   
         *   @return 初始化完成的canvas对象
         */
        , initCanvas: function( _selector ) {

            if( !_selector ) {
                return;
            }

            var _canvas
                , _ratio = this.devicePixelRatio()
                , _width = this.width( _selector ) * _ratio
                , _height = this.height( _selector ) * _ratio;

            if( _selector.is('canvas') ) {
                _canvas = _selector;

                this._canvas.attr( {
                    width: _selector.width() * _ratio
                    , height: _selector.height() * _ratio
                } );
            } else {
                _canvas = $( '<canvas></canvas>' );

                _selector.append( _canvas );

                _canvas.attr( {
                    width: _canvas.width() * _ratio
                    , height: _canvas.height() * _ratio
                } );
            }

            return _canvas;
        }

        /**
         * 初始化数据
         */
        , initData: function( _selector ) {

            var _data;

            if( _selector.attr( 'chartScriptData' ) ) {
                _data = this.selectorProp( _selector, 'chartScriptData' ).html();
                _data = _data.replace( /^[\s]*?\/\/[\s\S]*?[\r\n]/gm, '' );
                _data = _data.replace( /[\r\n]/g, '' );
                _data = _data.replace( /\}[\s]*?,[\s]*?\}$/g, '}}');
                _data = eval( '(' + _data + ')' );
            }

            return _data;
        }

        , getSelector: function() {
        	return this.selector;
        }

        /**
         * 图表宽度
         */
        , width: function( _selector ) {

            if( !_selector ) {
                return;
            }

            var _width = _selector.prop( 'offsetWidth' );

            this.is( _selector, '[chartWidth]' ) && ( _width = this.intProp( _selector, 'chartWidth' ) || _width );

            return _width;
        }

        /**
         * 图表高度
         */
        , height: function( _selector ){

            if( !_selector ) {
                return;
            }

            var _height = _selector.prop( 'offsetHeight' );

            this.is( _selector, '[chartHeight]' ) && ( _height = this.intProp( _selector, 'chartHeight' ) || _height );

            return _height;
        }

        , devicePixelRatio: function() {
            if( typeof this._devicePixelRatio == 'undefined' ) {
                this._devicePixelRatio = window.devicePixelRatio || 1;
            }
            return this._devicePixelRatio;
        }

        /**
         * 更新数据
         * @method update
         * @param   object  _data
         */
        , update: function( _data ) {
            this.trigger( Base.Model.RESET_DISPLAY_SERIES, [ _data ] );
            this.trigger( Base.Model.UPDATE_CHART_DATA, _data );

            return this;
        }

        , is: function( _selector, _key ){
            if( typeof _key == 'undefined' ){
                _key = _selector;
                _selector = this.getSelector();
            }else{
                _selector && ( _selector = $( _selector ) );
            }

            return _selector && _selector.is( _key );
        }

        , intProp: function( _selector, _key ){
            if( typeof _key == 'undefined' ){
                _key = _selector;
                _selector = this.getSelector();
            }else{
                _selector && ( _selector = $( _selector ) );
            }
            var _r = 0;
            _selector 
                && _selector.is( '[' + _key + ']' ) 
                && ( _r = parseInt( _selector.attr( _key ).trim(), 10 ) || _r );
            return _r;
        }

        , selectorProp: function( _selector, _key ){
            var _r;
            if( typeof _key == 'undefined' ){
                _key = _selector;
                _selector = this.getSelector();
            }else{
                _selector && ( _selector = $( _selector ) );
            }

            _selector
                && _selector.is( '[' + _key + ']' ) 
                && ( _r = JC.f.parentSelector( _selector, _selector.attr( _key ) ) );

            return _r;
        }

        // , isPointerEventType: function( e, type ) {
        //     return (e.type == 'pointer'+type ||
        //     e.type.toLowerCase() == 'mspointer'+type)
        // }

    };

	_jwin.on( 'resize', function() {
        JC.f.safeTimeout( function() {
            _jwin.trigger( Base.RESIZE_UPDATE );
        }, null, 'MCHART_RESIZE_asdfaewfaes', 200 );
    } );

    return Base;

});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);