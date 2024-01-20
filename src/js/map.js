/* ===========================================================

	Title:　map.js
	Created:　2017-11-15
	
=========================================================== */
$(function() {
	//スマホ判定
	var spFlg = isSp();

	//地域番号取得
	var area_id = 0;
	var uri = parseUri(location.href);
	var query = queryToObject(uri.query);
	if (query && query.area) {
		area_id = query.area;
	}

	//GoogleMap共通設定
	var option = {
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		//コントロール
		mapTypeControl: true,
		/*mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			position: google.maps.ControlPosition.TOP_RIGHT
		},*/
		zoomControl: true,
		scaleControl: true,
		streetViewControl: true,
		navigationControl: true,
		streetViewControl: true,
		draggable: true,
		scrollwheel: true,
		disableDoubleClickZoom:  true,
		//スタイル
		styles: [
			{
				"stylers": [
					{ "saturation": -21 },
					{ "lightness": 11 },
					{ "gamma": 0.84 }
				]
			}
		],
	};
	//マーカーアイコンサイズ共通設定
	var icon = {
		size: [45, 57],
		origin: [0, 0],
		anchor: [23, 52],
		scaledSize: [45, 57]
	};

	//地域設定
	var area = {
		0: {	
			name: "全域",
			lat: 36.56483408437869,
			lng: 138.09559882879257,
			zoom: 5,
			option: option,
			icon: icon
		},
		1: {
			name: "北海道・東北",
			lat: 41.314374,
			lng: 139.8250906,
			zoom: 6,
			option: option,
			icon: icon
		},
		2: {
			name: "関東",
			lat: 35.879019013303264,
			lng: 139.620399715625,
			zoom: 8,
			option: option,
			icon: icon
		},
		3: {
			name: "東海・北陸・中部",
			lat: 36.44887469947616,
			lng: 138.04674889687496,
			zoom: 7,
			option: option,
			icon: icon
		},
		4: {
			name: "近畿",
			lat: 34.65199156635195,
			lng: 135.5528282078125,
			zoom: 8,
			option: option,
			icon: icon
		},
		5: {
			name: "中国・四国",
			lat: 34.47476959926212,
			lng: 133.16079276093754,
			zoom: 8,
			option: option,
			icon: icon
		},
		6: {
			name: "九州・沖縄",
			lat: 30.672572385033668,
			lng: 129.90933459999994,
			zoom: 6,
			option: option,
			icon: icon
		},
		7: {
			name: "マレーシア",
			lat: 4.271084,
			lng: 106.9682664,
			zoom: 6,
			option: option,
			icon: icon
		}
	};

	//スマホ時の設定
	if (spFlg) {
		//ズーム
		area[0].zoom = 4;
		area[1].zoom = 12;
		area[2].zoom = 4;
	}

	//Google Map作成
	var map = new google.maps.Map($('#map').get(0), option);
  
  	$('aside h1').click( function(){
		var latlng = map.getCenter() ;
		var zoom = map.getZoom() ;
		console.log(latlng.toString(),zoom);
	});

	var infowindow = new google.maps.InfoWindow({
		content: ''
	});

	var plot = function(item) {
		var latlng = $('position', item).text().split(/,/);
		if(latlng.length != 3 || !latlng[0] || !latlng[1]) {
			return;
		}
		var type = $('type', item).text();
		//var area = $('area', item).text();
		var icon = area[area_id].icon;
		var opts = {
			position: new google.maps.LatLng(latlng[0]*1, latlng[1]*1),
			map: map,
			title: $('title', item).text() + $('lease', item).text(),
			icon: new google.maps.MarkerImage(
				'/img/common/ic/ic_marker1.png',
				new google.maps.Size(icon.size[0], icon.size[1]),
				new google.maps.Point(icon.origin[0], icon.origin[1]),
				new google.maps.Point(icon.anchor[0], icon.anchor[1]),
				new google.maps.Size(icon.scaledSize[0], icon.scaledSize[1])
			)
		};
		var marker = new google.maps.Marker(opts);


		google.maps.event.addListener(marker, 'click', (function(item) {
			var c = $(' \
			<div class="map-info"> \
			  <p class="map-info-image"><a><img /></a></p> \
			  <p class="map-info-name"><a></a></p> \
			</div>');
			var image = new Image();
			image.src = $('img', item).text();
			image.onload = function(){
				if (image.width > 150) {
					$('.map-info-image img', c).addClass("width-150");
				} else if (image.height > 150){
					$('.map-info-image img', c).addClass("heignt-150");
				}
			};

			if(!$('img', item).text()){
				$('.map-info-image', c).remove();
			}
			$('.map-info-name', c).addClass('portfolio__type--'+$('type_number', item).text());
			//$('.map-info-name em', c).html($('pfid', item).text());
			$('.map-info-name a', c).html($('title', item).text() + $('lease', item).text()).attr('href', 'detail.php?id='+$('id', item).text());
			$('.map-info-image a', c).attr('href', 'detail.php?id='+$('id', item).text());
			$('.map-info-image img', c).attr('src', $('img', item).text().replace(/^.+site\//, '/site/'));
			//$('.map-info-address', c).html($('address', item).text());

			return function() {
				infowindow.setContent(c.get(0));
				infowindow.open(map, marker);
			};
		})(item));


		// タブ押下時にマーカーを初期化
		$('.map-tab li a').click( function() {
			marker.setMap(null);
		});

	};

	//マップデータ取得
	$.ajax({
		url: "map.xml",
		success: function(r) {

			// プロット
			var plot_marker = function(prot_area){
				prot_area = prot_area || 0;
				$('item', r).each(function() {
					var area_number = $(this).find('area_number').text();
					if(area_number == prot_area || prot_area == 0){
						plot(this);
					}
				});
			};

			// エリア切り替え
			var focus_area = function(area_id){
				if (!area[area_id]) return;
				//MAP再描画
				map.panTo(new google.maps.LatLng(area[area_id].lat, area[area_id].lng));
				map.setZoom(area[area_id].zoom);
				map.setOptions(area[area_id].option);
				//マーカー設置
				plot_marker(area_id);
				//タブカレント
				$('.map-tab a').removeClass('current');
				$('.map-tab a[area_id="' + area_id + '"]').addClass('current');

			}

			// エリア切り替え
			$('.map-tab a').on("click", function() {
				area_id = $(this).attr("area_id");
				focus_area(area_id);
				setQuery({area: area_id});
				return false;
			});

			//初回地域表示
			focus_area(area_id);

		}
	});


});