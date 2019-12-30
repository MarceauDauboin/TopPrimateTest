;(function($){

    'use strict';

    Object.keys = Object.keys || function(o) {
        var result = [];
        for(var name in o) {
            if (o.hasOwnProperty(name))
                result.push(name);
        }
        return result;
    };

    var animationDelay = 0;
    var extraColor, enableZoom, enableZoomConnect, markerImg, centerlng, centerlat, zoomLevel, latLng, infoWindows, ultraFlat, darkColorScheme, styles;
    var map = [];
    var infoWindows = [];

    window.mapAPI_Loaded = function() {

        for(var i = 0; i < $('.pnchr-google-map').length; i++) {
            infoWindows[i] = [];
        }

        $('.pnchr-google-map').each(function(i){

            zoomLevel = parseFloat($(this).attr('data-zoom-level'));
            centerlat = parseFloat($(this).attr('data-center-lat'));
            centerlng = parseFloat($(this).attr('data-center-lng'));
            markerImg = $(this).attr('data-marker-img');
            enableZoom = $(this).attr('data-enable-zoom');
            enableZoomConnect = (enableZoom == '1') ? false : true;
            extraColor = $(this).attr('data-extra-color');
            darkColorScheme = $(this).attr('data-color-style');
            var $darkColorObj = [];
            if( isNaN(zoomLevel) ) { zoomLevel = 12;}
            if( isNaN(centerlat) ) { centerlat = 51.47;}
            if( isNaN(centerlng) ) { centerlng = -0.268199;}

            latLng = new google.maps.LatLng(centerlat,centerlng);

            if(darkColorScheme == 'style-1') {
                styles = [
                    {
                        "featureType": "all",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "saturation": 36
                            },
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 40
                            }
                        ]
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 16
                            }
                        ]
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 20
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 17
                            },
                            {
                                "weight": 1.2
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 20
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 21
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 17
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 29
                            },
                            {
                                "weight": 0.2
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 18
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 16
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 19
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 17
                            }
                        ]
                    }
                ]
            }

            else if (darkColorScheme == 'style-2') {
                styles =  [
                    {
                        "stylers": [
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "stylers": [
                            {
                                "color": "#131314"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "stylers": [
                            {
                                "color": "#131313"
                            },
                            {
                                "lightness": 7
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "lightness": 25
                            }
                        ]
                    }
                ]
            }

            else if (darkColorScheme == 'default'){
                styles = [];
            }
 
            else {
                styles = [];
            }

            var styledMap = new google.maps.StyledMapType(styles,
                {name: "Styled Map"});


            var mapOptions = {
                center: latLng,
                zoom: zoomLevel,
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
                },
                panControl: false,
                zoomControl: enableZoom,
                disableDoubleClickZoom: enableZoomConnect,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.LARGE,
                    position: google.maps.ControlPosition.LEFT_CENTER
                },
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false

            };

            map[i] = new google.maps.Map(document.getElementById($(this).attr('id')), mapOptions);

            map[i].mapTypes.set('map_style', styledMap);
            map[i].setMapTypeId('map_style');

            var $count = i;

            google.maps.event.addListenerOnce(map[i], 'tilesloaded', function() {

                var map_id = $(map[i].getDiv()).attr('id');

                if(markerImg.length > 0) {
                    var markerImgLoad = new Image();
                    markerImgLoad.src = markerImg;

                    $(markerImgLoad).load(function(){
                        setMarkers(map[i], map_id, $count);
                    });

                }
                else {
                    setMarkers(map[i], map_id, $count);
                }
            });

        });

    }

    $.getScript('https://maps.google.com/maps/api/js?sensor=false&callback=mapAPI_Loaded&key='+window.apiKey.apiKey+'&signed_in=true&libraries=places');

    function setMarkers(map,map_id,count) {


        $('.map-marker-list.'+map_id).each(function(){

            $(this).find('.map-marker').each(function(i){

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng($(this).attr('data-lat'), $(this).attr('data-lng')),
                    map: map,
                    visible: true,
                    mapIndex: count,
                    infoWindowIndex : i,
                    icon: $('#'+map_id).attr('data-marker-img'),
                    optimized: false
                });
 
                if($(this).attr('data-mapinfo') != '' && $(this).attr('data-mapinfo') != '<br />' && $(this).attr('data-mapinfo') != '<br/>') {
                    var infowindow = new google.maps.InfoWindow({
                        content: $(this).attr('data-mapinfo'),
                        maxWidth: 300
                    });

                    infoWindows[count].push(infowindow);

                    google.maps.event.addListener(marker, 'click', (function(marker, i) {
                        return function() {
                            infoWindows[this.mapIndex][this.infoWindowIndex].open(map, this);
                        }

                    })(marker, i));
                }
            });
        });
    }

})(jQuery);