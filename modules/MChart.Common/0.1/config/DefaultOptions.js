;(function(define, _win) { 'use strict'; define( 'MChart.DefaultOptions', [], function(){
/**
 * JChart.DefaultOptions 是 JChart 图表库的默认配置, 提供所有图表的默认参数
 * <p><a href='https://github.com/openjavascript/jchart' target='_blank'>JChart Project Site</a>
 * </p>
 *  
 * @namespace   JChart
 * @class       DefaultOptions
 * @version dev 0.1 2014-06-20
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 */
    window.MChart = window.MChart || {};
    !MChart.DefaultOptions && 
    ( MChart.DefaultOptions = 
        {
            "title": {
                "enabled": true,
                "style": {
                    "font": "bold 18px \"Trebuchet MS\", Verdana, sans-serif",
                    "align": "center",
                    "color": "#333"
                },
                "text": "MChart title"
            },
            "subtitle": {
                "enabled": true,
                "style": {
                    "font": "bold 14px \"Trebuchet MS\", Verdana, sans-serif",
                    "align": "center",
                    "color": "#666"
                }, 
                "text": "MChart subtitle"
            }, 
            "tips": {
                "enabled": true,
                "borderWidth": 1, 
                "borderRadius": 3,
                "border": {
                    "style": {
                        "width": 1,
                        "radius": 3,
                        "color": '#000'
                    }
                },
                "background": {
                    "style": {
                        "color": "#fff",
                        "whiteSpace": "nowrap", 
                        "padding": 20,
                        "radius": 5
                    }
                },
                "title": {
                    "style": {
                        "color": "#333",
                        "font": "bold 16px Trebuchet MS, Verdana, sans-serif",
                        "marginBottom": 10
                    }
                },
                "item": {
                    "style": {
                        "font": "normal 14px Trebuchet MS, Verdana, sans-serif",
                        "lineHeight": 28,
                        "marginLeft": 20
                    }
                }
            }, 
            "xAxis": {
                "enabled": true,
                "title": {
                    "enabled": true, 
                    "style": {
                        "font": "bold 12px Trebuchet MS, Verdana, sans-serif",
                        "align": "center",
                        "color": "#333"
                    }
                }, 
                "line": {
                    "enabled": true, 
                    "style": {
                        "color": "#999"
                    }
                },  
                "labels": {
                    "enabled": true, 
                    "style": {
                        "font": "12px Trebuchet MS, Verdana, sans-serif",
                        "align": "center",
                        "color": "#333"
                    }
                }
            }, 
            "yAxis": {
                "enabled": true,
                "title": {
                    "enabled": true,
                    "style": {
                        "font": "bold 14px Trebuchet MS, Verdana, sans-serif",
                        "align": "center",
                        "color": "#333"
                    }
                }, 
                "line": {
                    "enabled": true,
                    "style": {
                        "lineWidth": .75,
                        "color": "#999"
                    }
                }, 
                "labels": {
                    "enabled": true,
                    "style": {
                        "font": "12px Trebuchet MS, Verdana, sans-serif", 
                        "align": "right",
                        "color": "#333"
                    }
                }
            }, 
            
            "legend": {
                "enabled": true,
                "item":{
                    "style": {
                        "align": "center",
                        "font": "bold 14px \"Trebuchet MS\", Verdana, sans-serif", 
                        "color": "#fff",
                        "alpha": 1
                    },
                    "unselectStyle": {
                        "alpha": .5
                    }
                }, 
                "border": {
                    "style": {
                        "radius": 5 
                    }
                }
            }, 
            "credits": {
                "enabled": true, 
                "style": {
                    "font": "9pt Trebuchet MS, Verdana, sans-serif",
                    "color": "#909090"
                }, 
                "href": "http://jchart.openjavascript.org", 
                "text": "jchart.openjavascript.org"
            }, 
            "colors": [
                "#09c100", 
                "#0c76c4", 
                "#ff0619", 

                "#ffbf00", 
                "#ff7100", 
                "#ff06b3", 

                "#41e2e6", 
                "#c3e2a4", 
                "#ffb2bc",

                "#dbb8fd"
            ]
        } );

    return MChart.DefaultOptions;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
