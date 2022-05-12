//Made by Lydia Dijkshoorn
var dataCsv ='';
var maxZoom = 14;
var fieldSeparator = '|';
var labelColumn = "Naam";
var opacity = 1.0;
var csvType = 'wkt';  //'csv' of 'wkt'
var wktTitle= 'wkt';
var radfactor = 3;  //vergrotings factor radius points

var obj_csv =
{
    size:0,
    dataFile:[]
};

function readImage(input) {
     if (input.files && input.files[0]) {
     let reader = new FileReader();
     reader.readAsBinaryString(input.files[0]);
     reader.onload = function (e) {
			obj_csv.size = e.total;
			obj_csv.dataFile = e.target.result
            dataCsv = obj_csv.dataFile;
            // populate CSVfile into words and typeahead array
            populateTypeAhead(dataCsv, fieldSeparator);
            var testArr = ArrayToSet(typeAheadSource); //vul array met alle woorden uit de CSV (behalve geometry)
            var unique_array = testArr.filter(onlyUnique); //verwijderd alle dubbelingen.
            $('#filter-string').typeahead({source: unique_array}); //en zet de unieke waarden
            addCSV();
     }
     }
};

function styleWktCSV(feature) {
	return {
		 // properties met kleine letters!!!  ook al staan ze in de file met hoofdletters
		//		color: getColor(feature.properties.vermogenmw),
		fillColor: feature.properties.color,
//		fillColor: red,
		color: feature.properties.color,
//		color: red,
		stroke: true,
		opacity: 0.9,
		fillOpacity: 0.5,
		weight: 2,
		dashArray: "",
	}
};

function stylePoint(feature) {
    return {
         // properties met kleine letters!!!  ook al staan ze in de file met hoofdletters
        //		color: getColor(feature.properties.vermogenmw),
		color: feature.properties.color,
//                        fillColor: feature.properties.color ,
		stroke: false,
		radius: (feature.properties.radiuxs*radfactor),
		opacity: 0.9,
		fillOpacity: 0.9,
    weight: 0,
    dashArray: "",
    };
};

function pointStyle(feature) {
return L.circleMarker(latlng, stylePoint(feature))
};

var timeSlideMax = 2030;
var slider = document.getElementById("timeSlider");
var output = document.getElementById("jaar");
output.innerHTML = slider.value;
slider.onchange = function() {
    timeSlideMax = slider.value;
    output.innerHTML = slider.value;
    addCSV() ;
};

var projecten = L.geoCsv(null, {
	pointToLayer: pointStyle,
//~ 	function (feature, latlng) {
//~ 		return L.circleMarker(latlng, stylePoint(feature));
//~ 	},
	style: styleWktCSV,
	onEachFeature: tabularPopup2,
	filter: function(feature, layer) {
		total += 1;
		if (!filterString) {
		   // hits += 1;
			if (feature.properties.installatiejaar <= timeSlideMax) {hits += 1; return  true}
			else {return false}
		}
		var hit = false;
		var lowerFilterString = filterString.toLowerCase().strip();
		$.each(feature.properties, function(k, v) {
			var value = v.toLowerCase();
			if (value.indexOf(lowerFilterString) !== -1) {
				hit = true;
			   // if (feature.properties.installatiejaar <= timeSlideMax) {hits += 1; return  false};
				hits += 1;
				return false;
			}
		});
		return hit;
	},
	firstLineTitles: true,
	fieldSeparator: fieldSeparator,
	csvType: csvType,
});

var hits = 0;
var total = 0;
var filterString;
var dataCsv;

var addCSV = function() {
	document.getElementById('wkt').value=" ";
	hits = 0;
	total = 0;
	filterString = document.getElementById('filter-string').value;
//            if (filterString) {
	$("#clear").fadeIn();
//~                 } else {
//~                     $("#clear").fadeOut();
//~                 }

	map.removeLayer(projecten);
	projecten.clearLayers();

   // markers = new L.MarkerClusterGroup(clusterOptions);
	console.log(' addData_dataCsv', dataCsv);
	projecten.addData(dataCsv);
	map.addLayer(projecten);
	try {
	var bounds = projecten.getBounds();
	if (bounds) {
		map.fitBounds(bounds);
	}
	} catch(err) {
	// pass
	}

	if (total > 0) {
		$('#search-results').html("Showing " + hits + " of " + total);
	}
	return false;
};

var typeAheadSource = [];

function ArrayToSet(a) {
	var temp = {};
	for (var i = 0; i < a.length; i++)
		temp[a[i]] = true;
	var r = [];
	for (var k in temp)
		r.push(k);
	return r;
};

function populateTypeAhead(csv, delimiter) {
	var lines = csv.split("\n");
	for (var i = lines.length - 1; i >= 1; i--) {
		var items = lines[i].split(delimiter);
		for (var j = items.length - 1; j >= 0; j--) {
			var item = items[j].strip();
			item = item.replace(/"/g,'');
			if (item.indexOf("http") !== 0 && isNaN(parseFloat(item))) {
				if  (!RegExp("^(POLYGON)|^(LINESTRING)|^(POINT)|^(GEOMETRYCOLLECTION)").test(item)) {
					typeAheadSource.push(item);
					var words = item.split(/\W+/);
					for (var k = words.length - 1; k >= 0; k--) {
						//filter alle getallen en geometry uit de lijst
						if (RegExp("^[a-zA-Z]{3}").test(words[k])) {
							//console.log('yes1:', words[k]  );
							if  (RegExp("^(POLYGON)|^(LINESTRING)|^(POINT)|^(GEOMETRYCOLLECTION)").test(words[k]))  {
								//console.log('yes2' );
								} else {
								//console.log('geen geom:', words[k]  );
								typeAheadSource.push(words[k]);
								}
							} else {
							//console.log('no:', words[k])
							}
				}
			}
		}
	}
}};

function onlyUnique(value, index, self) {
   return self.indexOf(value) === index;
};

if(typeof(String.prototype.strip) === "undefined") {
	String.prototype.strip = function() {
		return String(this).replace(/^\s+|\s+$/g, '');
	};
};

// search words
$("#clear").click(function(evt){
  evt.preventDefault();
  $("#filter-string").val("").focus();
});