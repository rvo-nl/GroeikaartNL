# GroeikaartNL
Energie [GroeikaartNL](https://rvo-nl.github.io/GroeikaartNL) van Nederland met strategische plannen, vergunningen en geplande realisaties van duurzame energieprojecten en energie infrastructuur.

## De leaflet viewer wordt gevuld middels een sheet met laag beschrijvingen.
Alle lagen worden gelezen uit een file met meta data (.csv file with pipe delimiter, een .xslx file of een google sheets bestand). Deze kan met drag en drop in de viewer geschoven worden.
Elke regel in de sheet bevat informatie over een laag uit een WFS service, WMS service of geojson met de url, laagnaam, gewenste titel, de groeps indeling, de filter, de kleur, de lijn of punt dikte etc.

| laagBeschikbaarheid |	legendeNaam |	legendeGroep |	energiedragerNetten	| dataType |	url |	laagNaam |	cqlFilter |	popup	| fig	| fillColor |	color	| weight	| opacity |	fillOpacity	| dash	| radius |	zoomMin	| zoomMax| 
| --- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
|x|tiel|groepnaam| themanaam |wms, wfs,geojson| url van WFS service, WMS service of de naam van een dropped geojson| laagnaam | filter| popup attribuut naam |figuurkeuze voor de legende (circle, rect, line)| fillcolor | linecolor | thickness of line | opacity of line |	fillOpacity of polygon	| dash of line	| radius of points |	view zoom minimum	| view zoom maximum | 
|required | required | required | required | required | required | required | optional | optional | required | required | required | optional | optional | optional | optional | optional | optional | optional | 

zie "Kaartlagen.csv" als voorbeeld

## De leaflet viewer kan ook een data sheet importeren. 
Het formaat van de te importeren data-sheet is:
.xslx of .csv file met pipe (|) delimiter met minimum onderstaande kolommen:

| naam | wkt | InstallatieJaar | color |
|--- |--- |--- |--- |
| titel voor de popup hover | [wkt geometry](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry) | Jaartal (2020-2050) voor de slicer | kleur |

Extra kolommen met informatie kunnen toegevoegd worden en worden zichtbaar met muis klik.

zie "TransitieVisieWarmte.xslx" als voorbeeld.
