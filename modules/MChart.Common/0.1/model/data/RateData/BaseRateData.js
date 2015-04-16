;(function(define, _win) { 'use strict'; define( [
	'MChart.model.BaseData'
], function( BaseData ) {

		var BASE_LABEL_RATE = [ 1, .75, .5, .25, 0 ];

		var BaseRateData = Objs(
        "Common.model.data.BaseRateData"
        , BaseData
        , {  
			initialize: function( _canvas ) {
		        //调用父类中的initialize函数  
		        BaseRateData.$super.initialize.call( this );

		        this.canvas = _canvas;
		    }

			, calcRate: function( _data ) {
	            var _p = this, _rate, _maxNum, _minNum, _absNum, _finalMaxNum
	                , _zeroIndex
	                , _floatLen = 0
	                , _tmpLen;
	                ;

	            if( _data ) {

	            	_rate = this.rate( _data );

	                _maxNum = _p.maxNum( _data );
	                _minNum = _p.minNum( _data );
	                _absNum = Math.abs( _minNum );
	                _finalMaxNum = Math.max( _maxNum, _absNum );
	                var _realRate = [], _realItem;

	                _zeroIndex = 0;

	                $.each( _rate, function( _ix, _item ){
	                    if( _item === 0 ){
	                        _zeroIndex = _ix;
	                    }
	                    _realItem = _finalMaxNum * _item;
	                    _realItem = JC.f.parseFinance( _realItem, 10 );
	                    //JC.log( _maxNum, _item, _realItem, JC.f.ts() );

	                    if( _p.isFloat( _realItem ) ){
	                        _tmpLen = _realItem.toString().split( '.' )[1].length;
	                        _tmpLen > _floatLen && ( _floatLen = _tmpLen );
	                    }
	                    _realRate.push( _realItem );
	                });

	                this._rateInfo = {
	                    rates: _rate
	                    , zeroIndex: _zeroIndex
	                    , maxNum: _maxNum
	                    , minNum: _minNum
	                    , finalMaxNum: _finalMaxNum
	                    , length: _rate.length
	                    , floatLen: _floatLen
	                    , realRate: _realRate
	                };
	            }
	            return this._rateInfo;
	        }

	        /**
	         * 最大的数值
	         */
	        , maxNum: function( _data ) {
	            var _tmp, _p = this;

	            if( _data ){
	                _p._maxNum = 0;

	                if( _data ) {
	                    $.each( _p.getDisplaySeries(), function( _ix, _item ) {
	                        _tmp = Math.max.apply( null, _item.data );
	                        _tmp > _p._maxNum && ( _p._maxNum = _tmp );
	                    });

	                }
	                var _tmp = [];
	                    _tmp.push( _p._maxNum );
	                _p._maxNum && ( _p._maxNum = this.numberUp( _p._maxNum ) );
	                    _tmp.push( _p._maxNum );
	                _p._maxNum === 0 && ( _p._maxNum = 10 );
	                    _tmp.push( _p._maxNum );
	                    //JC.log( ['maxNum', _tmp ] );
	            }
	            return _p._maxNum;
	        }

	        /**
	         * 最小的负数值
	         */
	        , minNum: function( _data ) {
	            var _tmp, _p = this;

	            if( _data ){
	                _p._minNum = 0;

	                if( _data ){
	                    $.each( _p.getDisplaySeries(), function( _ix, _item ){
	                        _tmp = Math.min.apply( null, _item.data );
	                        _tmp < 0 && _tmp < _p._minNum && ( _p._minNum = _tmp );
	                    });
	                }
	                var _tmp = [];
	                    _tmp.push( _p._minNum );
	                _p._minNum && ( _p._minNum = -( this.numberUp( Math.abs( _p._minNum ) ) ) );
	                    _tmp.push( _p._minNum );
	                    _tmp.push( _p._minNum );
	            }
	            return _p._minNum;
	        }

	        /**
	         * 垂直粒度
	         */
	        , rate: function( _data ) {
	            var _p = this;
	            
	            if( _data && this.hasNegative( _p.getDisplaySeries() ) ) {
	                var _maxNum, _minNum, _absNum, _finalMaxNum;
	                _maxNum = _p.maxNum( _data );
	                _minNum = _p.minNum( _data );
	                _absNum = Math.abs( _minNum );
	                _finalMaxNum = Math.max( _maxNum, _absNum );

	                if( _maxNum > _absNum ){
	                    if( Math.abs( _finalMaxNum * 0.333333333333333 ) > _absNum ){
	                        this._rate = [ 1, 0.666666666666666, 0.333333333333333, 0, -0.333333333333333];
	                    }
	                }else{
	                    if( _maxNum == 0 ){
	                        this._rate = [ 0, -0.25, -0.5, -0.75, -1 ];
	                    }else if( Math.abs( _finalMaxNum * 0.33333 ) > _maxNum ){
	                        this._rate = [ 0.333333333333333, 0, -0.333333333333333, -0.666666666666666, -1 ];
	                    }
	                }
	                !this._rate && ( this._rate = [ 1, .5, 0, -.5, -1 ] );

	            } else if( _data ) {
	                this._rate = BASE_LABEL_RATE;
	            }
	            return this._rate;
	        }

	        , isNegative: function( _num ){
		        return _num < 0;
		    }

		    , hasNegative: function( _series ) {
		        var _r = false;

		        if( _series && _series.length ){
		            $.each( _series, function( _ix, _item ){
		                var _tmp = Math.min.apply( null, _item.data );
		                if( _tmp < 0 ){
		                    _r = true;
		                    return false;
		                }
		            });
		        }

		        return _r;
		    }

		    , isFloat: function( _num ) {
		        _num = Math.abs( _num );
		        return ( _num - parseInt( _num ) ) > 0;
		    }

		    , numberUp: function( _in, _floatLen ) {
		        _floatLen = _floatLen || 5;
		        var _out = 0, _inStr = _in.toFixed( _floatLen )
		            , _part = _inStr.split( '.' )
		            , _int = _part[0], _float = parseFloat( '0.' + _part[ 1 ] )
		            , _ar 
		            , i, j, tmp
		            ;
		        
		        if( /[1-9]/.test( _int ) ){
		            tmp = Math.pow( 10, _int.length - 1  ), _out = tmp * ( parseInt( _int[0] ) +  1);
		            if( _out < _in ){
		                _out = tmp * 10;
		            }

		        }else{						
		            for( _ar = _float.toFixed( _floatLen ).split(''), i = 0, j = _ar.length; i < j; i++ ){
		                if( _ar[i] != '0' && _ar[i] != '.' ){
		                    tmp = parseFloat( _ar.slice( 0, i ).join('') + '1'  )
		                    , _out = tmp + parseFloat( _ar.slice( 0, i ).join('') + parseInt( _ar[i] )  )
		                    ;
		                    if( _out < _float ){
		                        _out = tmp * 10;
		                    }
		                    
		                    break;
		                }
		            }
		        }
		        
		        return _out;
		    }

		    , getDisplaySeries: function() {
		    	return this.canvas.displaySeries || [];
		    }

    	} );

		return BaseRateData;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);