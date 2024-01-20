$(function() {

  // JavaScript Document

  $(document).ready(function(e) {
   // $('img[usemap]').rwdImageMaps();

      

    // マップ非表示

    $('#map_pin').hide();

    $('#portfolio-map-detail').hide();

  });



  // エリア選択時動作

  $('.area-data').click(function(e) {

    e.preventDefault();



    var select_region = $(this).attr('region');

    $('#mapBox').hide();

    $('#map_pin').show();

    $('#map').show();

    mapPlot(select_region);

  });



  $('.area_select_bak').click(function(e) {

    e.preventDefault();

    $('#mapBox').show();

    $('#map_pin').hide();

    $('#map').hide();

  });



  // mapプロット

  function mapPlot(select_region) {

    //スマホ判定

    var spFlg = isSp();



    var area_value = "";//<area>タグ内のテキストを格納



    var area = [

      [ 0, 37.86574469022577, 136.95296020507812, 5 ],

      [ 1, 43.0686894, 142.0027092, 8 ],

      [ 2, 35.1695686, 136.9760787, 9 ],

      [ 3, 35.5201532, 139.7398193, 9 ],

      [ 4, 34.6791152, 135.4656062, 9 ],

      [ 5, 34.4599779, 132.4563472, 9 ],

      [ 6, 33.2784822, 130.6422642, 9 ],

      [ 7, 27.4206795, 128.7819547, 8 ]

    ];

    var option = {

      zoom: area[select_region][3],

      center: new google.maps.LatLng(area[select_region][1], area[select_region][2]),

      mapTypeId: google.maps.MapTypeId.ROADMAP,

      mapTypeControl: true,

      navigationControl: true,

      streetViewControl: false,

      scaleControl: true,

      scrollwheel: true,

      styles: [

        {

          "stylers": [

            { "saturation": -21 },

            { "lightness": 11 },

            { "gamma": 0.84 }

          ]

        },{

          "featureType": "road.highway",

          "stylers": [

            { "lightness": 30 },

            { "gamma": 0.98 },

            { "saturation": -5 },

            { "weight": 0.5 }

          ]

        }

      ]

    };



    var map = new google.maps.Map($('#map').get(0), option);



    var infowindow = new google.maps.InfoWindow({

      content: ''

    });



    var plot = function(item) {

      var latlng = $('position', item).text().split(/,/);

      if(latlng.length != 3 || !latlng[0] || !latlng[1]) {

        return;

      }

      var type = $('type', item).text();

      var opts = {

        position: new google.maps.LatLng(latlng[0]*1, latlng[1]*1),

        map: map,

        title: $('title', item).text(),

        icon: new google.maps.MarkerImage(

          '/img/common/ic/ic_marker_'+$('number', item).text()+'.png',

          new google.maps.Size(26, 49),

          new google.maps.Point(0, 0),

          new google.maps.Point(13, 38)

        )

      };

      var marker = new google.maps.Marker(opts);



      //吹き出し表示イベント

      //PC：マウスオーバー  スマホ：クリック

      var triggerEvent = 'mouseover';

      if (spFlg) {

        triggerEvent = 'click';

      }

      google.maps.event.addListener(marker, triggerEvent, (function(item) {

        var c = $('<div class="clearfix margin-left-20" style="overflow:hidden;"><div><h4 class="prop_title align-center"><a></a></h4></div><div class="prop_image align-center width-120 margin-auto"><a><img class="width-120 height-120" /></a></div></div>');

          var image = new Image();

          image.src = $('img', item).text();

        image.onload = function(){

          if(image.width > image.height) {

            c.find('.prop_image').find('a').find('img').removeClass('height-120');

          }else{

            c.find('.prop_image').find('a').find('img').removeClass('width-120');

          }

        };



        if(!$('img', item).text()){

          $('.prop_image', c).remove();

        }



        c.addClass('portfolio-type-' + $('number', item).text());

        $('.prop_title a', c).text($('title', item).text());

        //$('.prop_addr', c).text($('address', item).text());

        $('.prop_image img', c).attr('src', $('img', item).text().replace(/^.+site\//, '/site/'));

        $('a', c).attr('href', 'detail.php?id='+$('id', item).text());



        return function() {

          infowindow.setContent(c.get(0));

          infowindow.open(map, marker);

        };

      })(item));

      

      //マーカークリックでページ遷移（PCのみ）

      if (!spFlg) {

        google.maps.event.addListener(marker, 'click', (function(item) {

          return function() {

            location.href = 'detail.php?id='+$('id', item).text();

          };

        })(item));

      }



      $('.tab-a li a, .select-search input').click( function() {

        marker.setMap(null);

      });





    };



    $.ajax({

      url: "map.xml",

      success: function(r) {

        //マーカープロット

        $('item', r).each(function() {

          plot(this);

        });

      }

    });



  }

});