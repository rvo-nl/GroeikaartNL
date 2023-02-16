# GroeikaartNL
Energie [GroeikaartNL](https://rvo-nl.github.io/GroeikaartNL) van Nederland met strategische plannen, vergunningen en geplande realisaties van duurzame energieprojecten en energie infrastructuur.

## A leaflet viewer that is filled with users and user defined external data layers by drag and drop.
It reads all layers from a .csv file or an .xslx file. Which is dragged and dropped by the user. 
It can read layers from WFS serices, WMS services, geojson, dropped geojson. 
In every row of the dropped file the user defines s the titel of the layer, the group of the layer, the filter, the colors, the line thickness etc.


Format of the layer xlsx file or a .csv file with pipe (|) separation:

| laagBeschikbaarheid |	legendeNaam |	legendeGroep |	energiedragerNetten	| dataType |	url |	laagNaam |	cqlFilter |	popup	| fig	| fillColor |	color	| weight	| opacity |	fillOpacity	| dash	| radius |	zoomMin	| zoomMax| 
|x|title|groupname| themename |wms, wfs,geojson| url of WFS service or WMS service or name of dropped geojson| layername | filter| popupfiledname |figure for legend (circle, rect, line)| fillcolor | linecolor | thickness of line | opacity of line |	fillOpacity of polygon	| dash of line	| radius of points |	view zoom minimum	| view zoom maximum | 
|required | required | required | required | required | required | required | optional | optional | required | required | required | optional | optional | optional | optional | optional | optional | optional | 

see "Kaartlagen.csv" as example.


## A leafet viewer where the user can input its own data file (.csv or .xslx) with wkt field, to search, filter and timeslide through its data.

Format with required field of the data xlsx file or a .csv file with pipe (|) separation:
| naam | wkt | InstallatieJaar | color |
| title of popup hover | wkt geometery | Year (2020-2050) for slicer | color |

User can add additional fields which are shown in the popup.

see "TransitieVisieWarmte.xslx" as example.
