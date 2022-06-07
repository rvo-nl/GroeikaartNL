// set the dimensions and margins of the graph
var margin = {top: 425, right: 869, bottom: 55, left: 678},
    width = 1000 - margin.left - margin.right,
    height = 775 - margin.top - margin.bottom;
var height_textarea = 100;
var aantalregels;

var noteCounter = 0, noteCounterArray = [], regelCounter = 0;

var diagramCanvas;

var colorMap = { gas: '#8E8E8E', waterstofBlauw: '#85B4D5',waterstofGroen: '#91C6A8', elektriciteit: '#E7A35F', warmte: '#B66862', mix: '#DEB3C3' };

let columnHeight = height + margin.top+margin.bottom -300;
let columnStartPos = 290;
let startposCO2balans = columnStartPos + 520;
let startposNotes = startposCO2balans + 240;

let refYposWFDEnergie_top = 0, refYposWFDEnergie_bottom = 0;

let CO2WFDiagramData = [], EnergieSubstitutieWFDiagramData =[], EnergieBesparingWFDiagramData = [];

function initCESDiagramVars(){
  CO2WFDiagramData = [];
  EnergieSubstitutieWFDiagramData =[];
  EnergieBesparingWFDiagramData = [];
  regelCounter = 0;
  noteCounterArray = [];
  noteCounter = 0;
}


function drawBackdrop(){

    let columnWidth0 = -10, columnWidth1 = 203, columnWidth2 = 211, columnWidth3 = 188, columnWidth4 = 280, columnWidth5 = 200;
    let xposColumn0 = 30
    let xposColumn1 = xposColumn0+columnWidth0 + 10;
    let xposColumn2 = xposColumn1+columnWidth1 + 10;
    let xposColumn3 = xposColumn2+columnWidth2 + 10;
    let xposColumn4 = xposColumn3+columnWidth3 - 10;
    let xposColumn5 = xposColumn4+columnWidth4;

    drawSankeyGraphElements();
    function drawSankeyGraphElements(){
        
        //Wit vlak voor energiebalans
        diagramCanvas.append('rect')
            .attr('height',610).attr('width',980)
            .attr('fill','#FFF').style('opacity',1)
            .attr('x',10).attr('y',180)
            .attr('rx',10).attr('ry',10)
        
         //Wit vlak voor CO2-balans
        diagramCanvas.append('rect')
            .attr('height',525).attr('width',980)
            .attr('fill','#FFF').style('opacity',1)
            .attr('x',10).attr('y',startposCO2balans)
            .attr('rx',10).attr('ry',10)
    
        
    
        diagramCanvas.append('rect')
            .attr('height',80).attr('width',width+margin.left+margin.right)
            .attr('fill','#2C6697').style('opacity',1)
            .attr('x',0).attr('y',0)
    
        diagramCanvas.append('rect')
            .attr('height',columnHeight-55).attr('width',columnWidth1)
            .attr('fill','#e5eff5')
            .attr('x',xposColumn1).attr('y',columnStartPos+30)
            .style('border-bottom-left-radius',10)
    
        diagramCanvas.append('rect')
            .attr('height',columnHeight-55).attr('width',columnWidth2)
            .attr('fill','#e5eff5')
            .attr('x',xposColumn2).attr('y',columnStartPos+30)
    
        diagramCanvas.append('rect')
            .attr('height',columnHeight-55).attr('width',columnWidth3)
            .attr('fill','#e5eff5')
            .attr('x',xposColumn3).attr('y',columnStartPos+30)
    
        diagramCanvas.append('rect') //col 4
            .attr('height',columnHeight-55).attr('width',columnWidth4-110)
            .attr('fill','#e5eff5')
            .attr('x',xposColumn4 +20).attr('y',columnStartPos+30)
        
        diagramCanvas.append('rect') //col 5
            .attr('height',columnHeight-55).attr('width',columnWidth5-83)
            .attr('fill','#e5eff5')
            .attr('x',xposColumn5-70).attr('y',columnStartPos+30)
            
        diagramCanvas.append("text")
            .attr('x',xposColumn0).attr('y',columnStartPos-70)
            .style('font-family', 'RijksoverheidSans').style('font-size', 20+'px').style('font-weight',800).attr("text-anchor", "start")
            .attr('fill','black')
            .text('Energiebalans')
    
        diagramCanvas.append('rect')
            .attr('height',3).attr('width',803)
            .attr('fill','#333').style('opacity',1)
            .attr('x',xposColumn1).attr('y',274)
    
        diagramCanvas.append("text")
            .attr('x',xposColumn1).attr('y',columnStartPos-30)
            .style('font-family', 'RijksoverheidSans').style('font-size', 16+'px').style('font-weight',400).attr("text-anchor", "start")
            .attr('fill','black')
            .text('Mutaties in energieverbruik')
    
        diagramCanvas.append('text')
            .attr('id','eenheid_energie')
            .attr('x',970).attr('y',216)
            .style('font-family', 'RijksoverheidSans').style('font-size', 14+'px').style('font-weight',400).attr("text-anchor", "end")
            .attr('fill','black')
            .text('Eenheid:')
    
        diagramCanvas.append('text')
            .attr('id','eenheid_co2')
            .attr('x',970).attr('y',startposCO2balans+35)
            .style('font-family', 'RijksoverheidSans').style('font-size', 14+'px').style('font-weight',400).attr("text-anchor", "end")
            .attr('fill','black')
            .text('Eenheid:')
    
        diagramCanvas.append('rect')
            .attr('height',3).attr('width',columnWidth1)
            .attr('fill','#333').style('opacity',1)
            .attr('x',xposColumn1).attr('y',319)
    
        diagramCanvas.append("text")
            .attr('x',xposColumn1).attr('y',columnStartPos +15)
            .style('font-family', 'RijksoverheidSans').style('font-size', 16+'px').style('font-weight',400).attr("text-anchor", "start")
            .attr('fill','black')
            .text('Toepassing')
    
        diagramCanvas.append('rect')
            .attr('height',3).attr('width',columnWidth2)
            .attr('fill','#333').style('opacity',1)
            .attr('x',xposColumn2).attr('y',319)
    
        diagramCanvas.append("text")
            .attr('x',xposColumn2).attr('y',columnStartPos +15)
            .style('font-family', 'RijksoverheidSans').style('font-size', 16+'px').style('font-weight',200).attr("text-anchor", "start")
            .attr('fill','black')
            .text('Conversie')
    
        diagramCanvas.append('rect')
            .attr('height',3).attr('width',columnWidth3)
            .attr('fill','#333').style('opacity',1)
            .attr('x',xposColumn3).attr('y',319)
    
        diagramCanvas.append("text")
            .attr('x',xposColumn3).attr('y',columnStartPos + 15)
            .style('font-family', 'RijksoverheidSans').style('font-size', 16+'px').style('font-weight',200).attr("text-anchor", "start")
            .attr('fill','black')
            .text('Bronnen')
    
        diagramCanvas.append("text")
            .attr('id','hoofdTitel')
            .attr('x',10).attr('y',50)
            .style('font-family', 'RijksoverheidSans') .style('font-size', 28+'px').style('font-weight',800).attr("text-anchor", "start")
            .attr('fill','white')
            .text('Hoofdtitel')
            
        diagramCanvas.append("text")
            .attr('id','subTitel')
            .attr('x',10).attr('y',64)
            .style('font-family', 'RijksoverheidSans').style('font-size', 15+'px').style('font-weight',200).attr("text-anchor", "start")
            .attr('fill','black')
            .text('Subtitel')
    
        diagramCanvas.append("text")
            .attr('id','diagramVersie')
            .attr('x',33).attr('y',65)
            .style('font-family', 'RijksoverheidSans').style('font-size', 12+'px').style('font-weight',200).attr("text-anchor", "start")
            .attr('fill','white')
            .text('versie diagram: ')
    }

    drawWaterfallGraphElementsCO2balans();
    function drawWaterfallGraphElementsCO2balans(){
        let spos = startposCO2balans;
        
        let co2BalansItems = [  {title: 'Energie efficiëntie', scope: 1},
                                {title: 'CCS Blauwe Waterstof', scope: 1},
                                {title: 'CCS Overige', scope: 1},
                                {title: 'Circulair', scope: 1},
                                {title: 'Overige broeikasgassen', scope: 1},
                                {title: 'Restwarmte', scope: 1},
                                {title: 'Elektrificatie', scope: 1},
                                {title: 'CCS Blauwe Waterstof', scope: 2},
                                {title: 'CCS Overige', scope: 2},
                                {title: 'Groene waterstof', scope: 2},
                                {title: 'Elektrificatie', scope: 2},
                                {title: 'Circulair', scope: 3},
                                {title: 'Groene waterstof', scope: 3},
                                {title: 'Restwarmte', scope: 3},
                                {title: 'Elektrificatie', scope: 3},
                                {title: 'Nieuwe bedrijven', scope: ' '}
                            ]
    
        diagramCanvas.append('rect')
            .attr('height',420).attr('width',940)
            .attr('fill','#e5eff5').style('opacity',1)
            .attr('x',30).attr('y',spos+60)
    
        let scopeColors = {scope0: ' ',scope1:'#545454',scope2:'#C3C3C3',scope3:'#FFF'}
    
        diagramCanvas.append('rect')
            .attr('height',2).attr('width',293)
            .attr('fill',scopeColors.scope1).style('opacity',1)
            .attr('x',161).attr('y',spos + 110)
            .attr('rx',2).attr('ry',2)
    
        diagramCanvas.append('rect')
            .attr('height',2).attr('width',157)
            .attr('fill',scopeColors.scope1).style('opacity',1)
            .attr('x',481).attr('y',spos + 110)
            .attr('rx',2).attr('ry',2)
        diagramCanvas.append('rect')
            .attr('height',2).attr('width',154)
            .attr('fill',scopeColors.scope1).style('opacity',1)
            .attr('x',661).attr('y',spos + 110)
            .attr('rx',2).attr('ry',2)
        diagramCanvas.append("text")
            .attr('x',165).attr('y',spos+95)
            .style('font-family', 'RijksoverheidSans').style('font-size', 16+'px').style('font-weight',400).attr("text-anchor", "start")
            .attr('fill','black')
            .text('Scope 1 emissies')
        diagramCanvas.append("text")
            .attr('x',485).attr('y',spos+95)
            .style('font-family', 'RijksoverheidSans').style('font-size', 16+'px').style('font-weight',400).attr("text-anchor", "start")
            .attr('fill','black')
            .text('Scope 2 emissies')
        diagramCanvas.append("text")
            .attr('x',663).attr('y',spos+95)
            .style('font-family', 'RijksoverheidSans').style('font-size', 16+'px').style('font-weight',400).attr("text-anchor", "start")
            .attr('fill','black')
            .text('Scope 3 emissies')
    
        ypos = spos + 340;
        diagramCanvas.append("text")
            .style('font-family', 'RijksoverheidSans').style('font-size', 13+'px').style('font-weight',400).attr("text-anchor", "start")
            .attr('fill','black')
            .text('CO2-emissiereductie (Mton)')
            .style('transform-origin', '0% 0%')
            .attr('transform',function(){return 'translate('+110+','+ypos+')rotate(-90)'})
            
        let backdropcolorarray = ['#F4F9FB','#FFF','#F4F9FB','#FFF','#F4F9FB','#FFF','#F4F9FB','#FFF','#F4F9FB','#FFF','#F4F9FB','#FFF','#F4F9FB','#FFF','#F4F9FB','#FFF','#F4F9FB','#FFF']
    
        for (i=0;i<co2BalansItems.length+1;i++){
            posx = i*45+161;
            diagramCanvas.append('rect')
                .attr('height',180).attr('width',25)
                .attr('fill',backdropcolorarray[i]).style('opacity',1)
                .attr('x',posx).attr('y',spos+175)            
                .attr('rx',5).attr('ry',5)
            
            posy = spos + 336;
            posx = i*45 + 170;
            diagramCanvas.append('rect')
                .attr('rx',5).attr('ry',5)
                .attr('width',25).attr('height',155)
                .attr('fill',backdropcolorarray[i]).style('opacity',1)
                .style('transform-origin', '0% 0%')
                .attr('transform',function(){return 'translate('+posx+','+posy+')rotate(45)'})
    
            posx = posx - 95;
            posy = posy +115;
            diagramCanvas.append('text')
                .attr('x',0).attr('y',0)
                .style('font-family', 'RijksoverheidSans').style('font-size', 14+'px').style('font-weight',function(){if (i<co2BalansItems.length){return 200;} else return 800;}).attr("text-anchor", "start")
                .attr('fill','#666')
                .text(function(){ if (i<co2BalansItems.length){return co2BalansItems[i].title} else return "Netto balans";})
                .style('transform-origin', '0% 0%')
                .attr('transform',function(){return 'translate('+posx+','+posy+')rotate(-45)'})
    
            posy = spos + 135;
            posx = i*45+174.5;
            if (i<co2BalansItems.length-1){
            diagramCanvas.append('circle')
                .attr('cx',posx).attr('cy',posy)
                .attr('r',10)
                .attr('fill',function(){return scopeColors['scope'+co2BalansItems[i].scope]})
                
    
            posx = posx - 4;
            posy = posy + 4
            diagramCanvas.append('text')            
                .style('font-family', 'RijksoverheidSans').style('font-size', 14+'px').style('font-weight',800).attr("text-anchor", "start")
                .attr('fill',function(){if (co2BalansItems[i].scope == 1 || co2BalansItems[i].scope == 2){return 'white';} else return 'black'})
                .style('transform-origin', '0% 0%')
                .attr('transform',function(){return 'translate('+posx+','+posy+')'})
                .text(co2BalansItems[i].scope)
            }
        }
    
    
        diagramCanvas.append('rect')
            .attr('x',147).attr('y',spos + 339.5)
            .attr('height',1).attr('width',765)
            .attr('fill','#333').style('opacity',1)
    }
    
    drawWaterfallGraphElementsEnergiebalans();
    function drawWaterfallGraphElementsEnergiebalans(){
        let spos = columnStartPos;
        
        let items = [ {title:  'Gas', scope: 1}, {title: 'Elektricitiet', scope: 1}, {title: 'Overige', scope: 1}, {title: 'Onbekend', scope: 1} ]
    
        let shiftRight = 625;
        
        diagramCanvas.append('rect')
            .attr('x',37 + shiftRight).attr('y',spos + 29)
            .attr('height',3).attr('width',170)
            .attr('fill','black').style('opacity',1)
            
            
        diagramCanvas.append("text")
            .attr('x',shiftRight + 41).attr('y',spos+15)
            .attr('fill','black')
            .style('font-family', 'RijksoverheidSans').style('font-size', 16+'px').style('font-weight',400).attr("text-anchor", "start")
            .text('Substitutie en balans')
    
        diagramCanvas.append('rect')
            .attr('height',3).attr('width',117)
            .attr('fill','black').style('opacity',1)
            .attr('x',shiftRight + 227).attr('y',spos + 29)
            
        diagramCanvas.append("text")
            .attr('x',226+ shiftRight).attr('y',spos+15)
            .style('font-family', 'RijksoverheidSans').style('font-size', 16+'px').style('font-weight',400).attr("text-anchor", "start")
            .attr('fill','black')
            .text('Besparing')
    
        for (i=0;i<1;i++){
            var distance = 26;
            posx = i*distance + 179 + shiftRight;
            posy = spos + 222;
            diagramCanvas.append('rect')
                .attr('height',390).attr('width',18)
                .attr('fill','#F4F9FB').style('opacity',1)
                .attr('x',posx).attr('y',posy-175)
                .attr('rx',10).attr('ry',10)
    
            diagramCanvas.append('rect')
                .attr('height',390).attr('width',18)
                .attr('fill','#FFF').style('opacity',1)
                .attr('x',posx).attr('y',posy-175)
                .attr('rx',5).attr('ry',5)
    
            posx = posx + 14;
            posy = posy - 85;
            diagramCanvas.append('text')
                .attr('x',0).attr('y',0)
                .style('font-family', 'RijksoverheidSans').style('font-size', 13+'px').style('font-weight',800).attr("text-anchor", "start")
                .attr('fill','#666')
                .style('transform-origin', '0% 0%').attr('transform',function(){return 'translate('+posx+','+posy+')rotate(-90)'})
                .text('Netto mutatie')
        }
    
        for (i=0;i<4;i++){
            var distance = 25;
            posx = i*distance + 76 + shiftRight;
            posy = spos + 222;
            diagramCanvas.append('rect')
                .attr('height',390).attr('width',18)
                .attr('fill','#F4F9FB').style('opacity',1)
                .attr('x',posx).attr('y',posy-175)
                .attr('rx',5).attr('ry',5)
    
            posx = posx + 14;
            posy = posy - 100;
            diagramCanvas.append('text')
                .attr('x',0).attr('y',0)
                .style('font-family', 'RijksoverheidSans').style('font-size', 13+'px').style('font-weight',200).attr("text-anchor", "start")
                .attr('fill','#666')
                .style('transform-origin', '0% 0%').attr('transform',function(){return 'translate('+posx+','+posy+')rotate(-90)'})
                .text(items[i].title)
    
            posx = posx - 4;
            posy = posy + 18
            diagramCanvas.append('text')
                .attr('x',0).attr('y',0)
                .style('font-family', 'RijksoverheidSans').style('font-size', 13+'px').style('font-weight',200).attr("text-anchor", "middle")
                .attr('fill','#AE114E')
                .style('transform-origin', '0% 0%').attr('transform',function(){return 'translate('+posx+','+posy+')rotate(0)'})  
                .text(function(){
                    if (EnergieSubstitutieWFDiagramData[i].notes.length > 0){
                        noteCounter++;
                        noteCounterArray.push(EnergieSubstitutieWFDiagramData[i].notes);
                        return '[' + noteCounter + ']';
                    }
                    else {return '';}
                })
        }
    
        for (i=0;i<4;i++){
            var distance = 28;
            posx = i*distance + 233 + shiftRight;
            posy = spos + 222;
            diagramCanvas.append('rect')
                .attr('height',390).attr('width',20)
                .attr('fill','#F4F9FB').style('opacity',1)
                .attr('x',posx).attr('y',posy-175)
                .attr('rx',5).attr('ry',5)
            posx = posx + 14;
            posy = posy - 100;
            diagramCanvas.append('text')
                .attr('x',0).attr('y',0)
                .attr('fill','#666')
                .style('font-family', 'RijksoverheidSans').style('font-size', 14+'px').style('font-weight',200).attr("text-anchor", "start")
                .attr('transform',function(){return 'translate('+posx+','+posy+')rotate(-90)'}).style('transform-origin', '0% 0%')
                .text(items[i].title)
    
            posx = posx - 4;
            posy = posy + 18
            diagramCanvas.append('text')
                .attr('x',0).attr('y',0)
                .style('font-family', 'RijksoverheidSans').style('font-size', 13+'px').style('font-weight',200).attr("text-anchor", "middle")
                .attr('fill','#AE114E')
                .text(function(){
                    if (EnergieBesparingWFDiagramData[i].notes.length > 0){
                        noteCounter++;
                        noteCounterArray.push(EnergieBesparingWFDiagramData[i].notes);
                        return '[' + noteCounter + ']';
                    }
                    else {return '';}
                })
                .attr('transform',function(){return 'translate('+posx+','+posy+')rotate(0)'}).style('transform-origin', '0% 0%')
        }
    
        for (i=0;i<1;i++){
            var distance = 26;
            posx = i*distance + 48 + shiftRight;
            posy = spos + 222;
            diagramCanvas.append('rect')
                .attr('height',390).attr('width',18)
                .attr('fill','#F4F9FB').style('opacity',1)
                .attr('x',posx).attr('y',posy - 175)
                .attr('rx',5).attr('ry',5)
            diagramCanvas.append('rect')
                .attr('height',390).attr('width',18)
                .attr('fill','#FFF').style('opacity',1)
                .attr('x',posx).attr('y',posy - 175)
                .attr('rx',5).attr('ry',5)
    
            posx = posx + 14;
            posy = posy - 85;
            diagramCanvas.append('text')
                .attr('x',0).attr('y',0)
                .style('font-family', 'RijksoverheidSans').style('font-size', 13+'px').style('font-weight',580).attr("text-anchor", "start")
                .attr('fill','#666')
                .attr('transform',function(){return 'translate('+posx+','+posy+')rotate(-90)'}).style('transform-origin', '0% 0%')
                .text('Bruto mutatie')
        }
    
        diagramCanvas.append('rect')
            .attr('id','WFDEnergyXaxis_line1')
            .attr('height',1).attr('width',149)
            .style('opacity',1)
            .attr('fill','black')
            .attr('x',677).attr('y',0)
            .attr('rx',2).attr('ry',2)
        
            diagramCanvas.append('rect')
            .attr('id','WFDEnergyXaxis_line2')
            .attr('height',1).attr('width',124)
            .style('opacity',1)
            .attr('fill','black')
            .attr('x',847).attr('y',0)
            .attr('rx',2).attr('ry',2)
    }

    drawLegendas();
    function drawLegendas(){
        drawLegendItem({opacity: 0.9, stroke: 'none', addWidth: 15, x:xposColumn2 -50 , y:columnStartPos - 85, pattern:false,fillColor:colorMap.mix, text:"Mix"})
        drawLegendItem({opacity: 0.9, stroke: 'none', addWidth: 15, x:xposColumn2 + 18, y: columnStartPos - 85 , pattern:false,fillColor:colorMap.gas, text:"Fossiel"})
        drawLegendItem({opacity: 0.9, stroke: 'none', addWidth: 15, x:xposColumn2 + 105, y:columnStartPos - 85 , pattern:false,fillColor: colorMap.elektriciteit, text:"Elektriciteit"})
        drawLegendItem({opacity: 0.9, stroke: 'none', addWidth: 15, x:xposColumn2 + 220,y: columnStartPos - 85, pattern:false,fillColor:colorMap.warmte, text:"Warmte"})
        drawLegendItem({opacity: 0.9, stroke: 'none', addWidth: 15, x:xposColumn2 + 320, y:columnStartPos- 85, pattern:false,fillColor:colorMap.waterstofGroen, text:"Groene waterstof"})
        drawLegendItem({opacity: 0.9, stroke: 'none', addWidth: 15, x: xposColumn2 + 465, y:columnStartPos - 85 , pattern:false,fillColor:colorMap.waterstofBlauw, text:"Blauwe waterstof"})
        
        drawLegendItem({opacity: 0.9, stroke: 'none', addWidth: 0, x: xposColumn2 + 265, y: startposCO2balans + 23, pattern:false,fillColor:'#527C63', text:"Reductie"})
        drawLegendItem({opacity: 0.9, stroke: 'none', addWidth: 0, x:  xposColumn2 + 365, y: startposCO2balans + 23, pattern:false,fillColor:'#78433B', text:"Toename"})
        drawLegendItem({opacity: 0.9, stroke: 'none', addWidth: 0, x: xposColumn2 + 465, y:startposCO2balans + 23, pattern:false,fillColor:'#2C6697', text:"Netto reductie/toename"})
        
        drawLegendItem({stroke: '#000', addWidth: 0, x: 30, y: 756, pattern:true, patternID:'url(#diagonal-stripe-white)',fillColor:'#333', text:""})
        
        diagramCanvas.append('text')
            .attr('x',55).attr('y',768)
            .style('font-family', 'RijksoverheidSans').style('font-size', 14+'px').style('font-weight',800).attr("text-anchor", "start")
            .attr('fill','black')
            .text('Op gemarkeerde onderdelen ontbreekt nog cruciale informatie en zijn onzekere aannames toegepast. Zie de voetnoot voor nadere toelichting.')
        
        drawLegendItem({stroke: '#000', addWidth: 0, x: 30, y: 1304, pattern:true, patternID:'url(#diagonal-stripe-white)',fillColor:'#333', text:""})
        
        diagramCanvas.append('text')
            .attr('x',55).attr('y',1316)
            .style('font-family', 'RijksoverheidSans').style('font-size', 14+'px').style('font-weight',800).attr("text-anchor", "start")
            .attr('fill','black')
            .text('Op gemarkeerde onderdelen ontbreekt nog cruciale informatie en zijn onzekere aannames toegepast. Zie de voetnoot voor nadere toelichting.')

        function drawLegendItem(config){
            let width = 16;
            let height = 1;

            diagramCanvas.append('rect')
                .attr('width',width+ config.addWidth).attr('height',width)
                .attr('x',config.x).attr('y',config.y)
                .attr('fill', config.fillColor).style('opacity',config.opacity)
                .attr('stroke',config.stroke).attr('stroke-width',1)
                .attr('rx',3).attr('ry',3)

            var posx = config.x + width +5 + config.addWidth;
            var posy = config.y + (height)/2+11;

            diagramCanvas.append('text')
                .style('font-family', 'RijksoverheidSans').style('font-size', 13+'px').style('font-weight',200).attr("text-anchor", "start")
                .attr('fill','black')
                .text(config.text)
                .call(wrap_titles,130)
                .attr('transform','translate('+posx+','+posy+')')

            if (config.pattern){
                diagramCanvas.append('rect')
                    .attr('width',width + config.addWidth).attr('height',width)
                    .attr('x',config.x).attr('y',config.y)
                    .attr('fill', config.patternID)
                    .attr('stroke',config.stroke).attr('stroke-width',1)
            }        
        }
    }
}

function tekenCESDiagrammen(config){

  d3.select('#'+config.targetDiv).style('visibility','visible').style('pointer-events','all');

  //draw popup close button
  d3.select('body').append('div')
    .attr('id','closePopupButton')
    .style('z-index',40000)
    .style('position','absolute')
    .style('top','20px')
    .style('right','5px')
    .style('background-color','white')
    .style('width','220px')
    .style('height','60px')
    .style('border-radius','10px')
    .style('border','2px solid black')
    .style('padding','5px')
    .append('svg')
      .attr('width',200).attr('height',60)
      .attr('id','buttonsvg')
    d3.select('#buttonsvg').append('text')
      .style('font-family', 'RijksoverheidSans').style('font-size', 20+'px').style('font-weight',800)
      .attr('y',30).attr('x',55)
      .text('Overzicht sluiten')
    d3.select('#buttonsvg').append('circle')
      .attr('r',20)
      .style('stroke','black')
      .style('stroke-width',2)
      .attr('cx',23)
      .attr('cy',23)
      .attr('fill','#e5eff5') 
    d3.select('#buttonsvg').append('text')
      .style('font-family', 'RijksoverheidSans').style('font-size', 30+'px').style('font-weight',200)
      .attr('y',35).attr('x',15)
      .text('X')
  d3.select('#closePopupButton')
    .transition()
    .duration(2000)
    .style('right','-160px')
  d3.select('#closePopupButton')
    .on('mouseover',function(){d3.select(this).style('background-color','#91C6A8')})
    .on('mouseout',function(){d3.select(this).style('background-color','#e5eff5')})
    .on('click',function(){
        d3.select('#'+config.targetDiv).style('visibility','hidden').style('pointer-events','none');
        d3.select('#CESContentDiv').remove();
        initCESDiagramVars();
        d3.select(this).remove();
      })

  //diagram canvases
  d3.select('#'+config.targetDiv).append('div')
    .attr('id','CESContentDiv')
    .style('position','relative')
    .style('margin','auto')
    .style('min-width','1000px')
    .style('max-width','1000px')
    .style('background-color','#e5eff5')
    .style('width',width + margin.left + margin.right)
    .style('height',height + margin.top + margin.bottom + height_textarea + 3000)

    diagramCanvas = d3.select('#CESContentDiv').append("svg")
        .style('position','relative')
        // .style('display','flex')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom + height_textarea + 3000)
        .append("g")

    prepareDatasets(config);
    
    function prepareDatasets(config){
        let clusterSelectie = config.clusterSelectie;
        d3.csv(config.datapath).then(function(data) {
            if(flag_CESCustomDatasetLoaded){
              data = CESCustomDataSet;
            }

            // PREPARE ENERGIE WATERFALL DIAGRAM DATASET
            let selectorCO2 = clusterSelectie + '-attributes-co2balans';
            let selectorEnergieSubstitutie = clusterSelectie + '-attributes-energiesubstitutie';
            let selectorEnergieBesparing = clusterSelectie + '-attributes-energiebesparing';
            for (i=0;i<data.length;i++){
                // console.log(selector)
                if (data[i].cluster == selectorCO2){CO2WFDiagramData.push({name: data[i].attribute, value: data[i].value, notes: data[i].notes, aandachtspunt: data[i].aandachtspunt})}
                if (data[i].cluster == selectorEnergieSubstitutie){EnergieSubstitutieWFDiagramData.push({name: data[i].attribute, value: data[i].value, notes: data[i].notes, aandachtspunt: data[i].aandachtspunt})}
                if (data[i].cluster == selectorEnergieBesparing){EnergieBesparingWFDiagramData.push({name: data[i].attribute, value: data[i].value, notes: data[i].notes, aandachtspunt: data[i].aandachtspunt})}
            }
            // console.log(EnergieSubstitutieWFDiagramData);
            // console.log(EnergieBesparingWFDiagramData);
            // console.log(CO2WFDiagramData);

            drawBackdrop(config);
            drawSankey(config);
            drawWaterfallCO2(config);
            setTimeout(drawNotes, 50); // quick & dirty, neaten routing later on

            diagramCanvas.append('text')
                .style('font-family', 'RijksoverheidSans').attr('font-size','300px').attr('font-weight',100).attr("text-anchor", "start")
                .attr('x',-300).attr('y',800)
                .attr('fill','black')
                .style('opacity',0.1)
                .attr('transform','rotate(-20)')
                .text(function(){if (flag_CESCustomDatasetLoaded) { return 'CONCEPT';} else return 'DUMMY'});
            diagramCanvas.append('text')
                .style('font-family', 'RijksoverheidSans').attr('font-size','300px').attr('font-weight',100).attr("text-anchor", "start")
                .attr('x',-500).attr('y',1300)
                .attr('fill','black')
                .style('opacity',0.1)
                .attr('transform','rotate(-20)')
                .text(function(){if (flag_CESCustomDatasetLoaded) { return 'CONCEPT';} else return 'DUMMY'});
        });
    }
}






//functie drawSankey(); 
function drawSankey(config){

    let feedback = [];
    let clusterSelectie = config.clusterSelectie;
    // format variables
    var formatNumber = d3.format(",.0f"), // zero decimal places
        format = function(d) { return formatNumber(d); }

    let unit = '';
    // append the svg object to DOM
    var svg = d3.select('#CESContentDiv').append("svg")
        .style('position','absolute')
        .style('left','0px')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom + height_textarea + 1000)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    var defs = svg.append('defs');
    function appendGradient(args){
        var gradient = defs.append('linearGradient').attr('id', args.urlID).attr('x1', '0%').attr('x2', '100%').attr('y1', '%').attr('y2', '0%');
        gradient.append('stop').attr('class', 'start').attr('offset', '0%').attr('stop-opacity', args.opacity).attr('stop-color', args.startColor)
        gradient.append('stop').attr('class', 'end').attr('offset', '100%').attr('stop-opacity', args.opacity).attr('stop-color', args.stopColor);
    }

    function getColor(type){
        switch (type.toLowerCase()){
            case 'elektriciteit':
                return colorMap.elektriciteit; break;
            case 'blauwe waterstof':
                return colorMap.waterstofBlauw; break;
            case 'groene waterstof':
                return colorMap.waterstofGroen; break;
            case 'gas':
                return colorMap.gas; break;
            case 'warmte':
                return colorMap.warmte; break;
            case 'mix':
                return colorMap.mix; break;
            default:
                return '#000';
        }
    }

    // Set the sankey diagram properties
    let nodeWidth = 10;
    var sankey = d3.sankey()
        .nodeWidth(nodeWidth)
        .nodePadding(40)
        .nodeAlign (d3.sankeyCenter) // options: d3.sankeyLeft, d3.sankeyRight, d3.sankeyCenter, d3.sankeyJustify
        .size([width, height]);

    // load the data
    d3.csv(config.datapath).then(function(data) {
      
      if(flag_CESCustomDatasetLoaded){
        data = CESCustomDataSet;
      }

    //set up graph in same style as original example but empty
        sankeydata = {"nodes" : [], "links" : [], "attributes": {}}

        data.forEach(function (d) {
            // console.log(d)
            if (d.cluster == clusterSelectie){
                sankeydata.nodes.push({ "name": d.source});
                sankeydata.nodes.push({ "name": d.target});
                sankeydata.links.push({ "source": d.source, "target": d.target, "value": +d.value, "conversionType": d.conversionType, "type": d.type, "notes": d.notes, "notesPosition": d.notesPosition, "aandachtspunt": d.aandachtspunt});
                // sankeydata.specials.push({"something":'sweet'})
            }
            if (d.cluster == clusterSelectie + '-attributes' && d.attribute == 'Restwarmte'){
                sankeydata.attributes.restWarmtePotentie = d.value;
            }
            if (d.cluster == clusterSelectie + '-attributes' && d.attribute == 'Energiebesparing'){
                sankeydata.attributes.energieBesparing = d.value;
            }
            if (d.cluster == clusterSelectie + '-attributes' && d.attribute == 'Substitutie'){
                sankeydata.attributes.substitutie = d.value;
            }
            
            if (d.cluster == clusterSelectie + '-attributes' && d.attribute == 'Titel'){
                d3.select('#hoofdTitel').text(d.value).call(wrap_titles,560).attr('transform','translate(30,45)');
            }

            if (d.cluster == clusterSelectie + '-attributes' && d.attribute == 'Subtitel'){
                d3.select('#subTitel').text(d.value).call(wrap_paragraph,950).attr('transform','translate(20,115)')
            }
            
            if (d.cluster == clusterSelectie + '-attributes' && d.attribute == 'Versie'){
                d3.select('#diagramVersie').text('Versie '+ d.value);
            }
            if (d.cluster == clusterSelectie + '-attributes' && d.attribute == 'Eenheid_Energie'){
                d3.select('#eenheid_energie').text('Eenheid: '+ d.value);
            }
            if (d.cluster == clusterSelectie + '-attributes' && d.attribute == 'Eenheid_CO2'){
                d3.select('#eenheid_co2').text('Eenheid: '+ d.value);
            }
        });

    // return only the distinct / unique nodes

        sankeydata.nodes = Array.from(d3.group(sankeydata.nodes, d => d.name),([value]) => (value));

    // loop through each link replacing the text with its index from node
        sankeydata.links.forEach(function (d, i) {
            sankeydata.links[i].source = sankeydata.nodes
                .indexOf(sankeydata.links[i].source);
            sankeydata.links[i].target = sankeydata.nodes
                .indexOf(sankeydata.links[i].target);
        });

        // now loop through each nodes to make nodes an array of objects
        // rather than an array of strings
        sankeydata.nodes.forEach(function (d, i) { 
            sankeydata.nodes[i] = { "name": d };

        });

        graph = sankey(sankeydata);
        
        // add in the links
        var link = svg.append("g").selectAll(".link")
            .data(graph.links)
            .enter().append("path")
            .attr("class", "link")
            .attr('stroke', function(d){return getColor(d.type)})
            .attr('stroke-opacity',0.6)
            .attr("d", d3.sankeyLinkHorizontal())
            .attr("stroke-width", function(d) { return d.width ; }) 
            .attr('fill', 'none');

        // add the link titles
        link.append("title")
            .text(function(d) {
                return d.source.name + " → " + 
                d.target.name + "\n" + format(d.value); });

        for (i=0;i<graph.nodes.length;i++){
            let sourceLinksTotal = 0;
            if (graph.nodes[i].sourceLinks.length > 0) {
                for (j=0;j<graph.nodes[i].sourceLinks.length;j++){
                    sourceLinksTotal += graph.nodes[i].sourceLinks[j].value;
                }
            }
            let targetLinksTotal = 0;
            if (graph.nodes[i].targetLinks.length > 0) {
                for (j=0;j<graph.nodes[i].targetLinks.length;j++){
                    targetLinksTotal += graph.nodes[i].targetLinks[j].value;
                }
            }

            if (sourceLinksTotal > 0 && targetLinksTotal > 0 && Math.round(sourceLinksTotal) != Math.round(targetLinksTotal)){

                if (sourceLinksTotal < targetLinksTotal){
                    let missingValue = Math.round(targetLinksTotal - sourceLinksTotal);
                    let missingShare = 1 - (sourceLinksTotal / targetLinksTotal);
                    let markerHeight = (graph.nodes[i].y1 - graph.nodes[i].y0) * missingShare;
                    let refCoordinate = graph.nodes[i].y0 + ((graph.nodes[i].y1 - graph.nodes[i].y0) * (1- missingShare))

                    feedback.push(Math.round(missingShare*100) + '% ('+ missingValue +' '+ unit +') van productievolume \'' + graph.nodes[i].name + '\' is niet aan een eindgebruiker gealloceerd.');
                    
                    svg.append('g').append('rect')
                        .attr('id','marker_'+graph.nodes[i].index)
                        .attr('x',graph.nodes[i].x0 + nodeWidth)
                        .attr('y',refCoordinate)
                        .attr('width',5)
                        .attr('height',markerHeight)
                        .attr('fill','red')
                        .call(function(){flashObject('marker_'+ graph.nodes[i].index)})

                    svg.append('text')
                        .style('font-family', 'RijksoverheidSans')
                        .attr('id','missingValue_'+graph.nodes[i].index)
                        .attr('x',graph.nodes[i].x0 + nodeWidth + 10)
                        .attr('y',refCoordinate + (markerHeight/2) + 6)
                        .attr('font-size','12px')
                        .attr('font-weight',600)
                        .attr('fill','red')
                        .text( '['+feedback.length+'] • ' + Math.round(missingValue) + ' ' + unit)
                        .call(function(){flashObject('missingValue_'+ graph.nodes[i].index)})
                        
                
                }
                else { // targetLinksTotal < sourceLinksTotal
                    let missingValue = Math.round(sourceLinksTotal - targetLinksTotal);
                    let missingShare = 1 - (targetLinksTotal / sourceLinksTotal);
                    let markerHeight = (graph.nodes[i].y1 - graph.nodes[i].y0) * missingShare;
                    let refCoordinate = graph.nodes[i].y0 + ((graph.nodes[i].y1 - graph.nodes[i].y0) * (1- missingShare))

                    feedback.push(Math.round(missingShare*100) + '% ('+ missingValue +' '+ unit +') van productievolume \'' + graph.nodes[i].name + '\' is niet aan een bron gealloceerd.');
                    
                    svg.append('g').append('rect')
                        .attr('id','marker_'+graph.nodes[i].index)
                        .attr('x',graph.nodes[i].x0 - nodeWidth + 5).attr('y',refCoordinate)
                        .attr('width',5).attr('height',markerHeight)
                        .attr("text-anchor", "start")
                        .attr('fill','red')
                        .call(function(){flashObject('marker_'+ graph.nodes[i].index)})
                    
                    svg.append('text')
                        .attr('id','missingValue_'+graph.nodes[i].index)
                        .style('font-family', 'RijksoverheidSans')
                        .attr('x',graph.nodes[i].x0 - nodeWidth).attr('y',refCoordinate + (markerHeight/2) + 6)
                        .attr('font-size','12px').attr('font-weight',600).attr("text-anchor", "end")
                        .attr('fill','red')            
                        .text( Math.round(missingValue) + ' ' + unit + ' • ['+feedback.length+']')
                        .call(function(){flashObject('missingValue_'+ graph.nodes[i].index)})
                }
            }

            if (feedback.length > 0){
                svg.append('text')
                    .style('font-family', 'RijksoverheidSans').attr('font-size','17px').attr('font-weight',600).attr("text-anchor", "start")
                    .attr('x',0).attr('y',height+50)
                    .attr('fill','black')
                    .text("Aandachtspunten");

                for (j=0;j<feedback.length;j++){

                    svg.append('text')
                        .style('font-family', 'RijksoverheidSans').attr('font-size','14px').attr('font-weight',400).attr("text-anchor", "start")
                        .attr('x',0).attr('y',function(){return height+75+j*20})
                        .attr('fill','red')
                        .text('['+(j+1)+']');
                    svg.append('text')
                        .style('font-family', 'RijksoverheidSans').attr('font-size','14px').attr('font-weight',400).attr("text-anchor", "start")
                        .attr('x',30).attr('y',function(){return height+75+j*20})
                        .attr('fill','black')
                        .text(feedback[j]);
                }
            }
        }

        // add in the nodes
        var node = svg.append("g").selectAll(".node")
            .data(graph.nodes)
        .enter().append("g")
            .attr("class", "node");

var defs = d3.selectAll('svg').append('defs');
    defs.append('pattern').attr('id', 'diagonal-stripe').attr('patternUnits','userSpaceOnUse').attr('width',10).attr('height',10).append('path').attr('d', 'M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2').style('stroke','white').style('stroke-width',2).attr('fill','black');
    defs.append('pattern').attr('id', 'diagonal-stripe-red').attr('patternUnits','userSpaceOnUse').attr('width',10).attr('height',10).append('path').attr('d', 'M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2').style('stroke','#B66862').style('stroke-width',2).attr('fill','black');
    defs.append('pattern').attr('id', 'diagonal-stripe-white').attr('patternUnits','userSpaceOnUse').attr('width',10).attr('height',10).append('path').attr('d', 'M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2').style('stroke','white').style('stroke-width',2).attr('fill','red');
    
    defs.append('pattern').attr('id', 'diagonal-stripe-purple').attr('patternUnits','userSpaceOnUse').attr('width',10).attr('height',10).append('path').attr('d', 'M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2').style('stroke','#9F264F').style('stroke-width',4).attr('fill','black');
    defs.append('pattern').attr('id', 'diagonal-stripe-green').attr('patternUnits','userSpaceOnUse').attr('width',10).attr('height',10).append('path').attr('d', 'M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2').style('stroke','#527C63').style('stroke-width',4).attr('fill','black');
    defs.append('pattern').attr('id', 'diagonal-stripe-yellow').attr('patternUnits','userSpaceOnUse').attr('width',10).attr('height',10).append('path').attr('d', 'M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2').style('stroke','#D8A980').style('stroke-width',4).attr('fill','black');
    
    defs.append('pattern').attr('id', 'dots').attr('patternUnits','userSpaceOnUse').attr('width',6).attr('height',6).append('circle').attr('cx',1.5).attr('cy',1.5).attr('r',0.6).attr('fill','')
    defs.append('pattern').attr('id', 'dots2').attr('patternUnits','userSpaceOnUse').attr('width',6).attr('height',6).append('circle').attr('cx',1.5).attr('cy',1.5).attr('r',3).attr('fill','white')
    
    // draw nodes backdrop fill
    let shiftXlastnode = 0;
        node.append("rect")
            .attr("x", function(d) { 
                // console.log(d)

                if (d.depth > 4){ // depth > 3 = column internal/export
                    return d.x0 + shiftXlastnode;
                } else { return d.x0;}
            
        })
            .attr("y", function(d) { return d.y0; })
            .attr("height", function(d) { return d.y1 - d.y0; })
            .attr("width", function(d){return sankey.nodeWidth();  })
            .style('fill',function(d){
                if (d.depth == 0){
                    return '#fff';
                } else {return '#333'}
            })
        // draw toplayer node rects and capture position of outer right node
        let captureFirstNodePosition = {x0: 0, y0: 0, y1: 0, x1: 0, value: 0};
        node.append("rect")
        .attr("x", function(d) { 
                if (d.depth > 4){ // depth > 3 = column internal/export
                    return d.x0 + shiftXlastnode;
                } else { return d.x0;}
            })
            .attr("y", function(d) { return d.y0; })
            .attr("height", function(d) { return d.y1 - d.y0; })
            .attr("width", function(d){ return sankey.nodeWidth(); })
            .attr('nill', function(d){ // capture position of outter right node for use in visualization of energy efficiency / waste heat usage        
                    if (d.depth == 0){
                        captureFirstNodePosition.x0 = d.x0;
                        captureFirstNodePosition.y0 = d.y0;
                        captureFirstNodePosition.x1 = d.x1;
                        captureFirstNodePosition.y1 = d.y1; 
                        captureFirstNodePosition.value = d.value; 
                    }
                })
            .attr('fill', function(d){
                if (d.depth == 0){
                    return '#fff'; }
                else if (d.aandachtspunt){return 'url(#diagonal-stripe-white)';}
                else if (false){
                    return 'white';
                }
                else {return '#333';}
                
                })

            .style("stroke", function(d) { 
                return d3.rgb(d.color).darker(2); 
            })
            .append("title")
            
            .text(function(d) { 
                return d.name + "\n" + format(d.value);
            
            
            });

        // add in volumes (TWh/tCO2)
        node.append('text')
            .attr('fill','black')
            .attr("x", function(d) { return d.x0 + 2; }).attr("y", function(d) { return d.y0; })
            .attr("dy", "-0.5em")
            .text(function(d){return Math.round(d.value*10)/10}) //+ ' '+ config.unit}
            .style('font-family', 'RijksoverheidSans').attr('text-anchor','middle').style('font-size', 14+'px').style('font-weight',800)
        
        // add in the title for the nodes
        
        node.append("text")
            .style('font-family', 'RijksoverheidSans').style('font-size', 12+'px').style('font-weight',100)
            .attr('fill','black')
            .attr("x", function(d) { return d.x0 - 6; }).attr("y", function(d) { return (d.y1 + d.y0) / 2; })
            .attr("dy", "0.35em")
            .attr("text-anchor", function(d){
                if (d.depth < 3){
                    return 'end';
                } else {
                    return 'end'
                }
            })
            .text(function(d) { return d.name; })
            .call(wrap_titles,73)
            .attr('transform',function(d){
                if (d.depth < 3){
                    var x = d.x0 + 0 - 10;
                    var y = (d.y1 + d.y0) / 2;
                    return  'translate('+x+','+y+')'
                } else {
                    var x = d.x0 + 0 - 10;
                    var y = (d.y1 + d.y0) / 2;
                    return  'translate('+x+','+y+')'
                }
            });

        drawAdditionAttributes();
        function drawAdditionAttributes(){

            //draw attributes additional to sankey(energiebesparing en restarmte)
            let heightFactor = (captureFirstNodePosition.y1 - captureFirstNodePosition.y0)/captureFirstNodePosition.value;
            
            let yReferenceZeroPosition = captureFirstNodePosition.y1;
            refYposWFDEnergie_top = captureFirstNodePosition.y0;
            refYposWFDEnergie_bottom = captureFirstNodePosition.y1;

            EnergieSubstitutieWFDiagramData.unshift({title: "reference total", value: parseInt(captureFirstNodePosition.value)}) // add reference total to array
            
            d3.select('#WFDEnergyXaxis_text').attr('y',captureFirstNodePosition.y1+409)
            d3.select('#WFDEnergyXaxis_line1').attr('y',captureFirstNodePosition.y1+425)
            d3.select('#WFDEnergyXaxis_line2').attr('y',captureFirstNodePosition.y1+425)

            for (i=0;i<EnergieBesparingWFDiagramData.length;i++){
                svg.append('rect')
                    .attr('width',11)
                    .attr('height', function(){ console.log(EnergieBesparingWFDiagramData)
                        if (parseFloat(EnergieBesparingWFDiagramData[i].value) > 0){
                            return heightFactor*parseFloat(EnergieBesparingWFDiagramData[i].value);
                        } else {return 00;}
                    })
                    .attr('x',184 + i * (28.6)).attr('y',yReferenceZeroPosition - heightFactor * parseFloat(EnergieBesparingWFDiagramData[i].value))
                    
                    svg.append('rect')
                    .attr('width',11).attr('height', function(){ console.log(EnergieBesparingWFDiagramData)
                        if (parseFloat(EnergieBesparingWFDiagramData[i].value) > 0){
                            return heightFactor*parseFloat(EnergieBesparingWFDiagramData[i].value);
                        } else {return 0;}
                    })
                    .attr('x',184 + i * (28.6)).attr('y',yReferenceZeroPosition - heightFactor * parseFloat(EnergieBesparingWFDiagramData[i].value))
                    .attr('fill', function(){ 
                            if (EnergieBesparingWFDiagramData[i].aandachtspunt.length > 0){
                                return 'url(#diagonal-stripe-white)';}
                            else {return 'none'}
                    })

                    
                    posy = yReferenceZeroPosition - heightFactor * parseFloat(EnergieBesparingWFDiagramData[i].value)-10;
                    node.append('text')
                        .attr('fill','black')
                        .attr('x',189 + i * 28.6).attr('y', yReferenceZeroPosition - heightFactor * parseFloat(EnergieBesparingWFDiagramData[i].value)-10)
                        .style('font-family', 'RijksoverheidSans').style('font-weight',800).style('font-size', 14+'px').attr('text-anchor','middle')
                        .text(function(){return Math.round(parseFloat(EnergieBesparingWFDiagramData[i].value)*1)/1})
            }

            drawWaterfallEnergie(config); // call after drawing sankey, needs yref
        }

        drawNotesReferencesSankey();
        function drawNotesReferencesSankey(){
             // add in note references
        
        node.append('text')
            .attr('fill','#AE114E')
            .attr("x", function(d) { return d.x0 + 16; }).attr("y", function(d) { return d.y0 - 10; })
            .style('font-weight',200).style('font-size', 12+'px').attr('text-anchor','start').style('font-family', 'RijksoverheidSans')
            .attr("dy", "-0.5em")
            .text(function(d){
                if (d.notes.length > 0){
                    noteCounter++;
                    noteCounterArray.push(d.notes);
                    return '['+noteCounter+']';
                }
            })
        }

    });

    function flashObject(id){
        let iterations = 2;
        let count = 0;
        d3.select('#'+id)
            .call(function(){
                if (count < iterations){ repeat(id);}
            })
        function repeat(id){
            count++;
            d3.select('#'+id)
                .transition().duration(1000).style('opacity',0)
                .transition().duration(1000).style('opacity',1)
                .on("end", function(){if (count < iterations){ repeat(id);}})
        }
    }
} // drawSankey()
function drawWaterfallCO2(){

    const margin = { top: startposCO2balans + 213, right: 23, bottom: 40, left: 151.5 };
    const width = 960 - margin.left - margin.right;
    const height = 380 - margin.top - margin.bottom + startposCO2balans
    const padding = 0.3;


    diagramCanvas.append("text")
        .attr('x',30).attr('y',startposCO2balans+40)
        .style('font-family', 'RijksoverheidSans').style('font-size', 20+'px').attr("text-anchor", "start")
        .style('font-weight',800)
        .text('CO2-balans')

    const x = d3
      .scaleBand()
      .rangeRound([ 0, width ])
      .padding(padding);
    
    const y = d3
      .scaleLinear()
      .range([ height, 0 ]);
    
    const yAxis = d3
      .axisLeft(y)
      .tickFormat((d) => {
        return d;
      });
    
    const chart = diagramCanvas

      .append('g')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('transform', `translate(${ margin.left },${ margin.top })`);
    
    const type = (d) => {
      d.value = +d.value;
      return d;
    }; // type
    
    const eurFormat = (amount) => {
        if (amount == 0){return ""} else {
      return Math.round(amount*10)/10;
    }
    }; // eurFormat
    
    const drawWaterfall = (data) => {
        
        
      x.domain(data.map((d) => {
        return d.name;
      }));
    
      y.domain([
        0,
        d3.max(data, (d) => {
          return d.end;
        })
      ]);
    
      chart
        .append('g')
        .attr('class', 'y axis')
        .call(yAxis);
        
        // console.log(data)
    
      const bar = chart.selectAll('.bar')
        .data(data)
        .enter().append('g')
        .attr('class', (d) => { console.log(d.class)
          return `bar ${ d.class  }`;
        })
        .attr('transform', (d) => {
          return `translate(${ x(d.name) },0)`;
        })
    
      bar
        .append('rect')
     
        .attr('y', (d) => {
          return y(Math.max(d.start, d.end));
        })
        .attr('height', (d) => {
          return Math.abs(y(d.start) - y(d.end));
        })
        .attr('width', x.bandwidth()/3);

        const baroverlay = chart.selectAll('.baroverlay')
            .data(data)
            .enter().append('g')
            .attr('class', (d) => { console.log(d.class)
            return `baroverlay ${ d.class  }`;
            })
            .attr('transform', (d) => {
            return `translate(${ x(d.name) },0)`;
            })

        baroverlay
        .append('rect')
        .attr('y', (d) => {
          return y(Math.max(d.start, d.end));
        })
        .attr('height', (d) => {
          return Math.abs(y(d.start) - y(d.end));
        })
        .attr('width', x.bandwidth()/3)
        .attr('fill', function(d,i){
            if (i < CO2WFDiagramData.length - 1){
                if (d.aandachtspunt.length > 0){
                    return 'url(#diagonal-stripe-white)';}
                else {return 'none'}
                }else return 'none';
        })

    bar.append('text')
        .attr('x',8).attr('y',-50)
        .style('font-family', 'RijksoverheidSans').style('font-size', 12+'px').style('font-weight',800)
        .attr('fill','#AE114E')
        .attr("text-anchor", "middle")
        .text(function(d,i){
            if (i<CO2WFDiagramData.length-1){
                if (CO2WFDiagramData[i].notes.length > 0){  
                    noteCounter++;
                    noteCounterArray.push(CO2WFDiagramData[i].notes);
                    return '[' + noteCounter + ']';
                }
                else {return '';}
            }
        }) 
        
      // Add the value on each bar
      bar
        .append('text')
        .style('font-family', 'RijksoverheidSans').style('font-size','14px').style('font-weight','800').style('text-anchor','middle')
        .attr('x', x.bandwidth() / 2 - 8).attr('y', (d) => {return d.class === 'positive' ? y(d.end) : y(d.start);})
        .attr('dy', '-.5em')
        .text((d) => { return d.class === 'total' ? eurFormat(d.start - d.end) : eurFormat(d.end - d.start); })
        .style('fill', 'black')

      // Add the connecting line between each bar
      bar
        .filter((d, i) => { return i !== data.length - 1; })
        .append('line')
        .attr('class', 'connector')
        .attr('x1', x.bandwidth() -31)
        .attr('y1', (d) => { return d.class === 'total' ? y(d.start) : y(d.end); })
        .attr('x2', (x.bandwidth() / (1 - padding)) +11)
        .attr('y2', (d) => { return d.class === 'total' ? y(d.start) : y(d.end); });
    }; // drawWaterfall
    
    const prepData = (data) => {

      // create stacked remainder
      const insertStackedRemainderAfter = (dataName, newDataName) => {
        const index = data.findIndex((datum) => {
          return datum.name === dataName;
        }); // data.findIndex
        // console.log(data)
        return data.splice(index + 1, 0, {
          name: newDataName,
          start: data[index].end,
          end: 0,
          class: 'total',
        }); // data.splice
      }; // insertStackedRemainder
    
      // retrieve total value
      let cumulative = 0;
      
      // Transform data (i.e., finding cumulative values and total) for easier charting
      data.map((datum) => {
        datum.start = cumulative;
        cumulative +=parseFloat(datum.value);
        datum.end = cumulative;
        return datum.class = datum.value >= 0 ? 'positive' : 'negative';
      }); // data.map
    
      insertStackedRemainderAfter('co2_nieuwebedrijven', 'Totale CO2-reductie');
    
      return drawWaterfall(data);
      
    }; // prepData
    
    prepData(CO2WFDiagramData);
    
} // drawWaterfallCO2()
function drawWaterfallEnergie(){ 

    const margin = { top: columnStartPos + refYposWFDEnergie_top + 135, right: + 142, bottom: refYposWFDEnergie_bottom - 29, left: 670 };
    const width = 960 - margin.left - margin.right;
    const height =  refYposWFDEnergie_bottom - refYposWFDEnergie_top;
    const padding = 0.3;


    diagramCanvas.append("text")
    .attr('x',30).attr('y',startposCO2balans+40)
    .style('font-family', 'RijksoverheidSans').style('font-size', 20+'px').style('font-weight',800).attr("text-anchor", "start")
    .text('CO2-balans')

    const x = d3
        .scaleBand()
        .rangeRound([ 0, width ])
        .padding(padding);
    
    const y = d3
        .scaleLinear()
        .range([ height, 0 ]);
    
    const xAxis = d3.axisBottom(x);
    
    const yAxis = d3
        .axisLeft(y)
        .tickFormat((d) => {
        return d;
        });
    
    const chart = diagramCanvas
        .append('g')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .attr('transform', `translate(${ margin.left },${ margin.top })`);
    
    const type = (d) => {
        d.value = +d.value;
        return d;
    }; // type
    
    const eurFormat = (amount) => {
        if (amount == 0){return ""} else {
        return Math.round(amount*1)/1;
    }
    }; // eurFormat
    
    const drawWaterfall = (data) => {
        
        
      x.domain(data.map((d) => {
        return d.name;
      }));
    
      y.domain([
        0,
        d3.max(data, (d) => {
          return d.end;
        })
      ]);
    

      var xpositions = [9,37,62,87,112,140];
      const bar = chart.selectAll('.bar')
        .data(data)
        .enter().append('g')
        .attr('class', (d) => {
          return `bar ${ d.class }`;
        })
        .attr('transform', (d,i) => {
          return `translate(${ xpositions[i] -2},0)`;
        });
    
      bar
        .append('rect')
        .attr('y', (d) => {
          return y(Math.max(d.start, d.end));
        })
        .attr('height', (d) => {
          return Math.abs(y(d.start) - y(d.end));
        })
        .attr('width', x.bandwidth()/2+2);

        const baroverlay = chart.selectAll('.baroverlay')
            .data(data)
            .enter().append('g')
            .attr('class', (d) => { 
            return `baroverlay ${ d.class  }`;
            })
            .attr('transform', (d,i) => {
                return `translate(${ xpositions[i] -2},0)`;
            })

        baroverlay
        .append('rect')
        .attr('y', (d) => {
          return y(Math.max(d.start, d.end));
        })
        .attr('height', (d) => {
          return Math.abs(y(d.start) - y(d.end));
        })
        .attr('width', x.bandwidth()/2+2)
        .attr('fill', function(d,i){
            if (i > 0 && i < EnergieSubstitutieWFDiagramData.length - 1){
                if (d.aandachtspunt.length > 0){
                    
                    return 'url(#diagonal-stripe-white)';}
                else {return 'none'}
                } else return 'none';
        })


    
        xpositions = [,16,6,-2,-5,-99];
   
      // Add the value on each bar
      bar
        .append('text')
        .style('font-family', 'RijksoverheidSans')
        .style('font-size','14px')
        .style('font-weight','800')
        .style('text-anchor','middle')
        .attr('x', x.bandwidth() / 2 - 4)
        .attr('y', (d) => {
          return d.class === 'positive' ? y(d.end) : y(d.start);
        })
        .attr('dy', '-.5em')
        .text((d) => {
          return d.class === 'total' ? eurFormat(d.start - d.end) : eurFormat(d.end - d.start);
        })
        .style('fill', (d,i) => {if (i==0) {return 'none'} else return 'black';})

      // Add the connecting line between each bar
      const x1positions = [-16,-16,-16,-16,-16,-1];
      const x2positions = [13,10,10,10,13];
      bar
        .filter((d, i) => {
          return i !== data.length - 1;
        })
        .append('line')
        .attr('class', 'connector')
        .attr('x1', (d,i) => { return x.bandwidth() + x1positions[i]})
        .attr('y1', (d) => {
          return d.class === 'total' ? y(d.start) : y(d.end);
        })
        .attr('x2', (d,i) => {return (x.bandwidth() / (1 - padding)) +x2positions[i]})
        .attr('y2', (d) => {
          return d.class === 'total' ? y(d.start) : y(d.end);
        });
    }; // drawWaterfall
    
    const prepData = (data) => {
        // console.log(data)
        let datasnapshot = JSON.parse(JSON.stringify(data));
        console.log(datasnapshot)
        
      // create stacked remainder
      const insertStackedRemainderAfter = (dataName, newDataName) => {
        const index = data.findIndex((datum) => {
          return datum.name === dataName;
        }); // data.findIndex
        // console.log(data)
        return data.splice(index + 1, 0, {
          name: newDataName,
          start: data[index].end,
          end: 0,
          class: 'total',
        }); // data.splice
      }; // insertStackedRemainder
    
      // retrieve total value
      let cumulative = 0;
      
      // Transform data (i.e., finding cumulative values and total) for easier charting
      data.map((datum) => {
        datum.start = cumulative;
        cumulative +=parseFloat(datum.value);
        datum.end = cumulative;
        return datum.class = datum.value >= 0 ? 'positive' : 'negative';
      }); // data.map
    
      // insert stacked remainders where approriate
      insertStackedRemainderAfter('substitutie_onbekend', 'Netto');
    
      return drawWaterfall(data);
      
    }; // prepData
    
    prepData(EnergieSubstitutieWFDiagramData);
    
} // drawWaterfallEnergie()
function drawNotes(){

    // draw the notes
    let shiftY = startposNotes + 20;
    let shiftX = 720;
    let lineheight = 25;
    let maxwidth = 900;
    
    // console.log(noteCounterArray)

    for (j=0; j<noteCounterArray.length; j++){
        diagramCanvas.append('text')
            .style('font-family', 'RijksoverheidSans')
            .attr('x',0-margin.left+shiftX+20)
            .attr('y',function(){return height+shiftY+regelCounter*lineheight})
            .attr('font-size','14px')
            .attr('font-weight',800)
            .attr("text-anchor", "end")
            .attr('fill','#AE114E')
            .text('['+(j+1)+']');
        var posy = height+shiftY+regelCounter*lineheight;
        var posx = -margin.left + 25 + shiftX + 10
        // console.log(noteCounterArray)
        diagramCanvas.append('text')
            .style('font-family', 'RijksoverheidSans')
            .attr('font-size','14px')
            .attr('font-weight',400)
            .attr("text-anchor", "start")
            .attr('fill','black')
            .text(noteCounterArray[j])
            .call(wrap_notes,maxwidth)
            .attr('transform',function(){return 'translate(' + posx + ','+ posy + ')'})
        regelCounter += aantalregels;
        }
} // drawNotes()

//functie wrap_titles(); textwrapper voor titel
function wrap_titles(text, width) {
	text.each(function() {
		var text = d3.select(this);
		var words = text.text()
			.split(/\s+/)
			.reverse();
		var word;
		var line = [];
		var lineHeight = 1.1;
		var y = 0 //text.attr("y");
		var x = 0;
		var dy = parseFloat(text.attr("dy"));
		var dx = parseFloat(text.attr("dx"));
		var tspan = text.text(null)
			.append("tspan")
			.attr("x", x)
			.attr("y", y);
		while (word = words.pop()) {
			line.push(word);
			tspan.text(line.join(" "));
			if (tspan.node()
				.getComputedTextLength() > width - x) {
				line.pop();
				tspan.text(line.join(" "));
				line = [word];
				tspan = text.append("tspan")
					// .attr("id", "tempmessage")
					.attr("x", x)
					.attr("dy", lineHeight + "em")
					.attr("dx",function(){if (dx > 0){return dx + "em";} else return 0+"em";}) 
					.text(word);
			}
		}
	});
} // wrap_titles()
//functie wrap_paragraph(): textwrapper voor alinea's
function wrap_paragraph(text, width) {
	text.each(function() {
		var text = d3.select(this);
		var words = text.text()
			.split(/\s+/)
			.reverse();
		var word;
		var line = [];
		var lineHeight = 1.5;
		var y = 0 //text.attr("y");
		var x = 0;
		var dy = parseFloat(text.attr("dy"));
		var dx = parseFloat(text.attr("dx"));
		var tspan = text.text(null)
			.append("tspan")
			.attr("x", x)
			.attr("y", y);
		while (word = words.pop()) {
			line.push(word);
			tspan.text(line.join(" "));
			if (tspan.node()
				.getComputedTextLength() > width - x) {
				line.pop();
				tspan.text(line.join(" "));
				line = [word];
				tspan = text.append("tspan")
					// .attr("id", "tempmessage")
					.attr("x", x)
					.attr("dy", lineHeight + "em")
					.attr("dx",function(){if (dx > 0){return dx + "em";} else return 0+"em";}) 
					.text(word);
			}
		}
	});
} // wrap_paragraph()
//functie wrap_notes(): textwrapper voor notes (voetnoten)
function wrap_notes(text, width) {
	text.each(function() {
        aantalregels = 1;
		var text = d3.select(this);
		var words = text.text()
			.split(/\s+/)
			.reverse();
		var word;
		var line = [];
		var lineHeight = 1.5;
		var y = 0 //text.attr("y");
		var x = 0;
		var dy = parseFloat(text.attr("dy"));
		var dx = parseFloat(text.attr("dx"));
		var tspan = text.text(null)
			.append("tspan")
			.attr("x", x)
			.attr("y", y);
		while (word = words.pop()) {
			line.push(word);
			tspan.text(line.join(" "));
			if (tspan.node()
				.getComputedTextLength() > width - x) {
				line.pop();
				tspan.text(line.join(" "));
				line = [word];
				tspan = text.append("tspan")
					.attr("id", "tempmessage")
					.attr("x", x)
					.attr("dy", lineHeight + "em")
					.attr("dx",function(){if (dx > 0){return dx + "em";} else aantalregels++; return 0+"em";}) 
					.text(word);
			}
		}
	});
} // wrap_notes()