;(function(define, _win) { 'use strict'; define( 'MChart.Common.Model.BaseSeriesData', [
    'MChart.model.BaseData'
], function( BaseData ) {

		var BaseSeriesData = Objs(
        "Common.model.data.BaseSeriesData"
        , BaseData
        , {

			initialize: function( _canvas ) {
                //调用父类中的initialize函数  
                BaseSeriesData.$super.initialize.call( this );

                this.canvas = _canvas;
            }

		    , getDisplaySeries: function( _series ) {

                var _canvas = this.canvas
                    , _displaySeries;

                if( _canvas.displaySeries ) {
                    _displaySeries = _canvas.displaySeries;
                } else {
                    this.updateDisplaySeries( {} );
                    _displaySeries = _series;
                }

                return _displaySeries;
		    }
            
            , getSeries: function() {
                return this.canvas.data.series;
            }

            , getDisplaySeriesIndexMap: function() {
                return this.canvas.displaySeriesIndexMap || [];
            }

            , updateDisplaySeries: function( _data ) {
                var _canvas = this.canvas
                    , _filterData = _data.filterData
                    , _displaySeries = this.getSeries()
                    , _displaySeriesIndexMap = [];

                if( _filterData && _filterData.length > 0 ) {
                    var _tmpArray = []
                        , _count = 0;

                    $.each( _displaySeries, function( _idx, _item ) {
                        if( _filterData.indexOf( _idx ) < 0 ) {
                            _tmpArray.push( _item );

                            _displaySeriesIndexMap[ _count++ ] = _idx;
                        }
                    } );

                    _canvas.displaySeries = _tmpArray;
                } else {
                    for( var _idx = 0; _idx < _displaySeries.length; _idx++ ) {
                        _displaySeriesIndexMap[ _idx ] = _idx;
                    }

                    _canvas.displaySeries = _displaySeries;
                }

                _canvas.displaySeriesIndexMap = _displaySeriesIndexMap;
            }

    	} );

		return BaseSeriesData;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);