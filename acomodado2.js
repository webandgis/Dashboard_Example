// HTML Elements
const search = document.getElementById("filter");
const matchList = document.querySelector(".collection");
const list = document.getElementById("list");
const indecator1 = document.getElementById("indecator1");
const indecator2 = document.getElementById("indecator2");
const mapContainer = document.getElementById('map');
const infoCard=document.querySelector('#infoCard');
const infoCardHog=document.querySelector('#infoCardHog');
const infoCardViv=document.querySelector('#infoCardViv');

//Botones side panel (right)



//Altura inicial del mapa ajustado a la vista
mapContainer.style.height = (window.innerHeight * 0.9 ) + 'px';
mapContainer.style.display = 'flex';
mapContainer.style.justifyContent = 'center';


//Crear una función que permita controlar el innerHTML DE LA CAJA DE INDICADORES se actualice según el zoom



//Mapa Leaflet
let map = L.map('map',{ zoomControl:false }).setView([-33.027, -52.811],7, zoomSnap = 0.1, zoomDelta = 0.1);
let openstreetmap= L.tileLayer('https://cartocdn_{s}.global.ssl.fastly.net/base-midnight/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
    })
     
     let openstreetmapdark = L.tileLayer(
        'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
       
      })
      
      // Tile type: openstreetmap Osm
      let openstreetmapOsm = L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      
      })
      
      //Base layers lo que aparecerá en el control de capas
   let opciones = {
        "Predeterminado": openstreetmap,
        "Open Streetmap": openstreetmapdark,
        /* "Open streetmap: Osm": openstreetmapOsm */
      };
      
      // Initialize with openstreetmap
      openstreetmap.addTo(map);
      
      
      //Se añaden las capas bases en el control de capas
    
      layerControl = L.control.layers(null, opciones, {position: 'topleft'}, {collapsed: true});
      layerControl.addTo(map);

//Ocultar los contribuyentes on la siguiente función

/* map.attributionControl.addAttribution('Instito Nacional de Estadística; <a href="https://www.gub.uy/instituto-nacional-estadistica/">INE</a>'); */
 
$('.leaflet-control-attribution').hide()

//Botones interacticos indicadores (Población, hogares y viviendas)

 // zoom in function
 $('#indecator1').click(function(){
    map.setZoom(map.getZoom() + 1)
  });


  // zoom out function
  $('#indecator2').click(function(){
    map.setZoom(map.getZoom() - 1)
  });
 // zoom in function a determinado zoom
  $('#indecator3').click(function(){
   map.setZoom(map.getZoom()+ 2 )
 });

 //Apartir de acá están las funciones generales que se deben actualizar al seleccionar los radio buttons del html





 //CREAR UN DIV PARA HACER EL FLOATING DIV CON JS

 /* let divPo=document.createElement('div');

 //Añadirle la posición
 divPo.style.position='fixed';

 //Añadirle el color de fondo


 divPo.style.background='hsl(218,41%,30%) 35%';

 divPo.style.color='white'

 //Añadirle el ancho

 divPo.style.width='100px';

 //Añadirle la altura

 divPo.style.height='100px';

 divPo.innerHTML="SOY UN DIV"

/*  divPo.style.zIndex = '9999'; */


 //añadirle el divPo a la página

/*  document.body.appendChild(divPo)

 //crear una función que actualice la posición

 let updateDivPositio  = event => {
  //Coordenada este/oeste
  divPo.style.left=event.clientX + 'px';
  //coordenada norte/sur
  divPo.style.top=event.clientY+'px'
 }

 //Añadir la interacción del mousemove con el addEventListener

 document.addEventListener('mousemove', updateDivPositio);  */
  //Etiquetas dinamicas
/*   let div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.background = 'hsl(218,41%,30%) 35%';
  div.style.width = '100px';
  div.style.height = '100px';
  document.body.appendChild(div);
  
  // Function to update the div position based on the mouse cursor
  function updateDivPosition(event) {
    div.style.left = event.clientX + 'px';
    div.style.top = event.clientY + 'px';
  } */
  
  // Attach the event listener to update the div position on mousemove

/* 
let info = L.control({position:'topleft'});

info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function(props) {
    if (props) {
        var labels = ['Población total', 'Total de hombres', 'Total de mujeres'];
        var data = [props.tot_pob, props.tot_muj, props.tot_hom];
        var overview = '<h4>Población: ' + props.NAME_1 + ' Departamento</h4>' + "<br/>";
        overview += 'Población Total: ' + props.tot_pob + "<br/>";
        overview += 'Hombres: ' + props.tot_muj + "<br/>";
        overview += 'Mujeres: ' + props.tot_hom + "<br/>";
        this._div.innerHTML = overview;
        newChart(labels, data);
    } else {
        this._div.innerHTML = '<h4>Seleccione un Departamento</h4>';
    }
};

info.addTo(map); */



/* 
map.on('mousemove', function(e) {
  
    var position = map.mouseEventToLatLng(e.originalEvent);
    var tooltip = document.getElementById("tooltip");
    tooltip.innerHTML = "<label>Latitude: " + position.lat + "</label><br/><label>Longitude: " + position.lng + "</label>"+ posoverview;
    tooltip.style.left = e.originalEvent.pageX + 15 + 'px';
    tooltip.style.top = e.originalEvent.pageY + 'px';
}); */


 
  //Determinar los colores
 //5 clases de colores dependiente de la población departamental
 function getColor (d){
    if (d>135000 ) {return '#433609'}
    else if (d > 120000) {return '#a68617'}
    else if (d > 95000 ) {return '#e6c247'}
    else if (d > 70000) {return '#efd98d'}
    else if (d > 56000) {return '#f9f0d2'}
    else if (d > 0) {return '#fbf6e4'}
    else {return '#89CFF0'}
    
    }

 function getColor2 (d){
    if (d>135000 ) {return '#238b45'}
    else if (d > 120000) {return '#238b45'}
    else if (d > 95000 ) {return '#66c2a4'}
    else if (d > 70000) {return '#99d8c9'}
    else if (d > 56000) {return '#ccece6'}
    else if (d > 0) {return '#e5f5f9'}
    else {return '#f7fcfd'}
    
    }

    function getColor3(d){
        if (d>135000 ) {return '#2171b5'}
        else if (d > 120000) {return '#6baed6'}
        else if (d > 95000 ) {return '#9ecae1'}
        else if (d > 70000) {return '#c6dbef'}
        else if (d > 56000) {return '#deebf7'}
        else if (d > 0) {return '#f7fbff'}
        else {return '#f7fbff'}
        
        }

        function getColor4(d){
            if (d>135000 ) {return '#00441b'}
            else if (d > 120000) {return '#007a2f'}
            else if (d > 95000 ) {return '#2a924b'}
            else if (d > 70000) {return '#7bc77c'}
            else if (d > 56000) {return '#c9eac2'}
            else if (d > 0) {return '#f7fcf5'}
            else {return 'pink'}
            
            }
            function getColor5(d){
              if (d>135000 ) {return 'black'}
              else if (d > 120000) {return 'yellow'}
              else if (d > 95000 ) {return 'green'}
              else if (d > 70000) {return 'pink'}
              else if (d > 56000) {return 'blue'}
              else if (d > 0) {return 'purple'}
              else {return 'white'}
              
              }
              function getColorLoc(d){
                if (d>105000 ) {return '#993404'}
                else if (d > 40000) {return '#cc560c'}
                else if (d > 27000 ) {return '#ef821e'}
                else if (d > 12000) {return '#feb351'}
                else if (d > 3900) {return '#fee19c'}
                else if (d > 0) {return '#ffffd4'}
                else {return 'white'}
                
                }
 

 //Función inicial que determina que el color sea la función getcolor y tomé los datos de la población total
 function style(feature) {
    return {
        weight: 2,
        opacity: 0.4,
        color: 'white',
        fillOpacity: 0.8,
        fillColor: getColor(feature.properties.tot_pob)
    };
}
function style2(feature) {
  return {
      weight: 2,
      opacity: 0.1,
      color: 'white',
      fillOpacity: 0.8,
      fillColor: getColor2(feature.properties.tot_muj)
  };
}

function styleLoca(feature){
  return{
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.5,
    fillColor: getColorLoc(feature.properties.tot_pob)
  }
}

//Leyenda 

 /* let legend = L.control({position: 'topright'});

 legend.onAdd = function (map) {

     let div = L.DomUtil.create('div', 'info legend'),
         grades = [56000, 70000, 95000, 120000,135000,50000],
         labels = ['<strong>Población total </strong>'],
         from, to;
     let x=1;
     let y=1;
     for (let i = 0; i < grades.length - 1; i++) {
         from = grades[i];
         to = grades[i + 1];
         y++;

        
             labels.push(
             '<i style="background:' + getColor(from) + '"></i> ' + from  + (' - ' + to)
             );
             
     }

     div.innerHTML = labels.join('<br>');
     
     return div;
     
     
 };
 

 legend.addTo(map);  */
 
/*  function textCard() {
  let staticText = '3.000.000';
  let currentZoom = map.getZoom();
  
  if (currentZoom === 7) {
    infoCard.innerHTML = staticText + ' Habitantes';
  } else {
    let fitBoundsLayer = map.getBounds().toBBoxString();
    let layerBounds = layer.getBounds().toBBoxString();

    if (fitBoundsLayer === layerBounds) {
      infoCard.innerHTML = `<h2>${feature.properties.NAME_1}%</h2><span></span><p><br>Habitantes</p>`;
    }
  }
} */

 //CREAR UNA VARIABLE PARA EL ESTILO DEL MAPA

 let mapaStyle= $.getJSON("deptoss.geojson", () =>{
  geojsonStyle= L.geoJson(data,{
    style:style
  })
 }) 
 //ESTILO LABELS DINAMICAS DE LAS FICHAS GRANDES


 function cardStyle(element, secondele,thirdele) {
  element.style.color = "white";
  secondele.style.color = "white";
  thirdele.style.color="white";
  element.style.margin = "10px";
  secondele.style.margin = "10px";
  thirdele.style.margin="10px"
}

//Se crear primero la constante de eptossData

 

let deptossData = $.getJSON("deptoss.geojson", function(data) {
  //Se le asigna el estilo que utiliza getcolor y los valores de pob total
  geojson = L.geoJson(data, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);
});

function onEachFeature(feature, layer) {
  layer.bindTooltip(feature.properties.NAME_1, {
    permanent: true,
    direction: 'center',
    offset: [0, -10],
    className: 'my-tooltip'
  });
  
  let labels = ['Población total', 'Total de hombres', 'Total de mujeres'];
 let data = [feature.properties.tot_pob, feature.properties.tot_muj, feature.properties.tot_hom];

 
 let dataCard=[feature.properties.tot_pob];
 let dataCardHoga=[feature.properties.tot_muj];
 let dataViv=[feature.properties.tot_hom]
 let dataCardDepto=[feature.properties.cdepto_iso];
 
 cardStyle(infoCardHog, infoCard,infoCardViv)
 infoCard.innerHTML = "3000000 Habitantes";
 infoCardHog.innerHTML = "100000 Hogares";
 infoCardViv.innerHTML="1500000 Viviendas"
 /* infoCardViv.innerHTML = "100000 Viviendas"; */
 
  
  let overview = 'Población Total: ' + feature.properties.tot_pob + "<br/>";
  overview += 'Hombres: ' + feature.properties.tot_muj + "<br/>";
  overview += 'Mujeres: ' + feature.properties.tot_hom + "<br/>";
  

  let popUpContent= ('<h4>Departamento: ' + feature.properties.NAME_1  + "<br/>" + overview);
  let popupOptions =
    {
      'maxWidth': '500',
      'className' : 'another-popup',
      'closeButton': 'false'
    }
  layer.bindPopup(popUpContent,popupOptions);
  
  layer.on('mouseover', function(e) {
    this.openPopup();
    this.setStyle({
      weight: 2,
      color: 'blue',
      dashArray: '',
      fillOpacity: 0.9
      
    });
    this.bringToFront();
    cardStyle(infoCard, infoCardHog,infoCardViv);
    infoCard.innerHTML = dataCard + " Habitantes en " + dataCardDepto;
    infoCardHog.innerHTML = dataCardHoga + " Hogares en " + dataCardDepto;
    infoCardViv.innerHTML= dataViv+ " Viviendas en "+dataCardDepto;

  
    newChart(labels, data);

  });
  layer.on('click', function(e) {
    map.fitBounds(layer.getBounds())
    
   
  });
  
  layer.on('mouseout', function(e) {
    this.closePopup();
    geojson.resetStyle(layer);
    if (infoCard.innerHTML !== dataCard) {
      infoCard.innerHTML = "3000000 Habitantes";
      infoCardHog.innerHTML ="1000 Hogares"
      infoCardViv.innerHTML="1500000 Viviendas"
      
  }
  });

  
  
  


  // Ajusta la posición para la etiqueta del departamento de Artigas
  if (feature.properties.NAME_1 === 'ARTIGAS') {
    layer.unbindTooltip();
    let tooltip = L.tooltip({
      permanent: true,
      direction: 'center',
      offset: [0, 0],
      className: 'my-tooltip'
    })
    .setContent(feature.properties.NAME_1)
    .setLatLng([-30.640601, -56.996118])
    .addTo(map);
  }

  // Ajusta la posición para la etiqueta del departamento de Montevideo
  if (feature.properties.NAME_1 === 'MONTEVIDEO') {
    layer.unbindTooltip();
    let tooltip = L.tooltip({
      permanent: true,
      direction: 'center',
      offset: [0, 0],
      className: 'my-tooltip'
    })
    .setContent(feature.properties.NAME_1)
    .setLatLng([-34.844314, -56.202938])
    .addTo(map);
  }

  // Ajusta la posición para la etiqueta del departamento de Maldonado
  if (feature.properties.NAME_1 === 'MALDONADO') {
    layer.unbindTooltip();
    let tooltip = L.tooltip({
      permanent: true,
      direction: 'center',
      offset: [0, 0],
      className: 'my-tooltip'
    })
    .setContent(feature.properties.NAME_1)
    .setLatLng([-34.635166, -54.878194])
    .addTo(map);
  }

  // Ajusta la posición para la etiqueta del departamento de San José
  if (feature.properties.NAME_1 === 'SAN JOSE') {
    layer.unbindTooltip();
    let tooltip = L.tooltip({
      permanent: true,
      direction: 'center',
      offset: [0, 0],
      className: 'my-tooltip'
    })
    .setContent(feature.properties.NAME_1)
    .setLatLng([-34.416996, -56.742722])
    .addTo(map);
  }

  // Ajusta la posición para la etiqueta del departamento de Colonia
  if (feature.properties.NAME_1 === 'COLONIA') {
    layer.unbindTooltip();
    let tooltip = L.tooltip({
      permanent: true,
      direction: 'center',
      offset: [0, 0],
      className: 'my-tooltip'
    })
    .setContent(feature.properties.NAME_1)
    .setLatLng([-34.158299, -57.764450])
    .addTo(map);
  }
    }
  
  
  //G

/* 
const lineChartCanvas=document.getElementById('#lineChartCanvas'); */



  //Gráfico 1 de barras horizontales que se actualizan al moverse sobre el mapa
const scatterData = [];
const scatterLabels = [];
let color = Chart.helpers.color;



//bar chart that updates when the map is interacted with
let newChart = function(labels, data) {
    let dataLength = labels ? labels.length : 0;
    //will select colors to use based on the number of data points
    let backgroundColors = ['rgba(0, 177, 106,0.2)', //confirmed
                            'rgba(0, 300, 300,0.2)',  //discharged
                            'rgba(244, 0, 161,0.2)'	//death
                           ];
    let colors = [];
    for (let i = 0; i < dataLength; i++) {
        colors.push(backgroundColors[i]);
    };
    //'newChart colors', colors
    let ctx = document.getElementById("barChartCanvas");
    let barChartCanvas = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Población Total',
                    data: data,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1
                }]
            },
            
          
            options: {
              legend: {
                 labels: {
                    fontColor: 'white',
                    fontFamily: 'Verdana',
                    fontSize: 15,
                 }
              },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            fontColor: 'white',
                            fontSize: 12,
                            fontFamily: 'Verdana',
                        }
                    }],
                    xAxes: [{
                      ticks: {
                          beginAtZero:false,
                          fontColor: 'white',
                          fontSize: 11,
                          fontFamily: 'Verdana',
                      }
                  }]
                }
            }
        });

};
window.onload = function() {
    newChart([], []);
};


//Gráfico de barras

//Crear una función para descargar el gráfico




//GRÁFICO DE LÍNEAS EVALUAR SI VA 
/* fetch('deptoss.geojson')
  .then(response => response.json())
  .then(data => {
    // create a new variable for the chart data
    const newChartData = [];

    // iterate over all the elements in the GeoJSON data
    data.features.forEach(function(feature) {
      // create a new variable for the value property
      const newValue = feature.properties.tot_pob;

      // create an object for the label name
      const newDataObject = {
        label: feature.properties.NAME_1,
        value: newValue,
        feature: feature
      };

      // add the object's data to the array
      newChartData.push(newDataObject);
    });

    // create a new line chart instance with a different canvas ID
    const ctx3 = document.getElementById("lineChartCanvas").getContext("2d");

    const newChart = new Chart(ctx3, {
      type: "line",
      data: {
        labels: newChartData.map(function(d) { return d.label; }),
        datasets: [{
          label: "Población",
          data: newChartData.map(function(d) { return d.value; }),
          backgroundColor:'rgba(0, 177, 106,0.2)',
          borderColor: "rgba(255,99,132,1)",
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointRadius: 2,
          pointHoverRadius: 4,
          lineTension: 0,
          fill: false
        }]
      },
      options: {
        legend: {
          labels: {
            fontColor: 'white',
            fontFamily: 'Verdana',
            fontSize: 5,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              padding: 0.4,
              fontSize: 7,
              beginAtZero: false,
              fontColor: 'white',
              fontFamily: 'Verdana',
            }
          }],
          xAxes: [{
            ticks: {
              fontSize: 7,
              beginAtZero: false,
              fontColor: 'white',
              fontFamily: 'Verdana',
            }
          }]
        }
      }
    });
  });

 */

//Segundo gráfico con todos los departamentos se llama nuevamente el geojson para que se mantenga el hover sobre los deptos

function loadDeptos() {
  const deptosSelec = fetch('deptoss.geojson')
    .then(response => response.json())
    .then(deptosData => {
      const deptos = [];
      deptosData.features.forEach(function (feature) {
        const listObject = {
          label: feature.properties.NAME_1,
          feature: feature
        };
        deptos.push(listObject);
      });

      let el = document.querySelector('#deptos');
      deptos.forEach((dep) => {
        let option = document.createElement('option');
        option.value = JSON.stringify(dep);
        option.innerText = dep.label;
        el.appendChild(option);
      })

      const selectDeptos = document.querySelector('#deptos');
      selectDeptos.addEventListener('change', function (e) {
        const selectedDepto = JSON.parse(e.target.value).feature;

        const localidad = fetch('loc_wgs84.geojson')
          .then(response => response.json())
          .then(locData => {
            const loc = locData.features.filter((feature) => {
              return feature.properties.nombdepto === selectedDepto.properties.NAME_1
            });

            const locOptions = loc.map((feature) => {
              return {
                label: feature.properties.nombloc,
                feature: feature
              };
            });

            const selectLoc = document.querySelector('#loc');
            selectLoc.innerHTML = '';

            locOptions.forEach((locl) => {
              let option = document.createElement('option');
              option.value = JSON.stringify(locl);
              option.innerText = locl.label;
              selectLoc.appendChild(option);
            })

            selectLoc.addEventListener('change', function (e) {
              resetMap(); // Call the resetMap function to remove previously selected layers
              const selectedLocF = JSON.parse(e.target.value).feature;

              const selectedLoc = L.geoJSON(selectedLocF, {
                onEachFeature: function (feature, layer) {
                  let popupLocalidad = '<h3><strong>' + feature.properties.nombloc + '</strong></h3> <br>' +
                  '<table class="my-table">' +
                  
                    '<tr><th>Habitantes  <br> <i class="fas fa-users fa-xl" id="iconT"></i></th>'+'  '+
                    '<th>Hogares  <br> <i class="fas fa-home fa-xl" id="iconT"></i></th>'+'  '+
                    '<th>Educación <br> <i class="fas fa-graduation-cap fa-xl" id="iconT"></i></th> </tr>'+
                    '<tr><td>' + 'Total <br> '+ feature.properties.tot_pob + '</td>'+
                    '<td>' + feature.properties.ot_muj +'</td>'+
                    '<td>' + feature.properties.tot_hom+ '</td></tr>' +
                    '<tr><td>'+ 'Mujeres <br> ' + feature.properties.ot_muj + '</td>'+
                    '<td>' + feature.properties.ot_muj +'</td>'+
                    '<td>' + feature.properties.tot_hom+ '</td></tr>' +
                    '<tr><td>'+ 'Hombres <br> ' + feature.properties.tot_hom + '</td>'+
                    '<td>' + feature.properties.ot_muj +'</td>'+
                    '<td>' + feature.properties.tot_hom+ '</td></tr>' +
                    '<tr><td>'+ 'Hombres <br> ' + feature.properties.tot_hom + '</td>'+
                    '<td>' + feature.properties.ot_muj +'</td>'+
                    '<td>' + feature.properties.tot_hom+ '</td></tr>'
                   
                    '</table>';
              
                  layer.bindPopup(popupLocalidad,{maxHeight: 300, maxWidth: 500});
                },
                style: {
                  color: 'blue',
                  weight: 2,
                  opacity: 1,
                  fillOpacity: 0
                },
                zIndex: 999
              }).addTo(map);

              map.fitBounds(selectedLoc.getBounds());

              
            });
          });

        const selectedDeptoLayer = L.geoJSON(selectedDepto, {
          style:style,
          zIndex: 999
        }).addTo(map);

        map.fitBounds(selectedDeptoLayer.getBounds());

        function resetMap() {
          if (map.hasLayer(selectedDeptoLayer)) {
            map.removeLayer(selectedDeptoLayer);
          }

          map.eachLayer(function (layer) {
            if (layer instanceof L.GeoJSON && layer !== selectedDeptoLayer) {
              map.removeLayer(layer);
            }
          });

          // Add the selectedDeptoLayer back to the map with its original style
          /* selectedDeptoLayer.setStyle({
            color: 'red',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.2 
          }).addTo(map); */
        }
      });
    });
}

loadDeptos();
    //Funcionalidad para mostrar según el zoom
    fetch('deptoss.geojson')
    .then(response => response.json())
    .then(data => {
      // crear la variable chartData
      const chartData = [];
  
      // buscar en todos los elementos del GeoJSON data
      data.features.forEach(function(feature) {
        //crear la variable value que determina cual es la propiedad que tomará los datos
        const value = feature.properties.tot_pob;
  
        // crear un objeto para la etiqueta nombre
        const dataObject = {
          label: feature.properties.NAME_1,
          value: value,
          feature: feature
        };
  
        // añadir la data del objeto al array 
        chartData.push(dataObject);
      });
 

    // create a new bar chart instance
    const ctx2 = document.getElementById("mychart").getContext("2d");
    

    const chart = new Chart(ctx2, {
      type: "horizontalBar",
      data: {
        labels: chartData.map(function(d) { return d.label; }),
        datasets: [{
          label: "Población",
          
          
          data: chartData.map(function(d) { return d.value; }),
          backgroundColor:'rgba(0, 177, 106,0.2)',
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          fontColor: 'white',
          
        }]
      },
      options: {
        legend: {
           labels: {
              fontColor: 'white',
              fontFamily: 'Verdana',
              fontSize: 15,
           }
        },
        
        
        scales: {
            yAxes: [{
                ticks: {
                  padding:0.5,
                  fontSize: 11,
                    beginAtZero:false,
                    fontColor: 'white',
                    fontFamily: 'Verdana',
                    
                    
                }
            }],
            xAxes: [{
              ticks: {
                fontSize: 11,
                  beginAtZero:false,
                  fontColor: 'white',
                  fontFamily: 'Verdana',
              }
          }]
          

        }
    }

    });




    // Obtiene la capa Leaflet GeoJSON que quieres resaltar
    let geojsonLayer = L.geoJSON(data, {
        style: style,
    }).addTo(map);

    // añade la interacción al gráfico con el  onHover event
    chart.options.onHover = function(event, activeElements) {
      // Obtiene el index del grafico de barras que el usuario está hovering over
      const index = activeElements[0]._index;

      // la constante que optiene el elemento correspondiente al grafico de barras
      const feature = chartData[index].feature;

      // highlight el poligono del mapa Leaflet
      geojsonLayer.setStyle({
        weight: 8,
        color: 'blue',
        dashArray: '10',
        fillOpacity: 1,
        fillColor:''
      });

      // Quita el highlight de otro poligono que podía estar resaltado previamente 
      geojsonLayer.eachLayer(function(layer) {
        if (layer.feature != feature) {
          layer.setStyle({
            weight: 2,
            opacity: 0.5,
            color: 'white',
            fillOpacity: 0.7,
          });
        }
      });
    };
  });

  //Radio buttons functions
  function changeStyle(value) {
    switch (value) {
      case "tot_pob":
        geojson.setStyle(function(feature) {
          return {
            fillColor: getColor(feature.properties.tot_pob)
          };
        });
  
        geojson.on('mouseover', function(e) {
          geojson.setStyle(function(feature) {
            return {
              fillColor: getColor(feature.properties.tot_pob)
            };
          });
        });
  
        geojson.on('mouseout', function(e) {
          geojson.setStyle(function(feature) {
            return {
              fillColor: getColor(feature.properties.tot_pob)
            };
          });
        });

        
    /*   info.update = function(props) {
        if (props) {
          var labels = ['Población total', 'Total de hombres', 'Total de mujeres'];
          var data = [props.tot_pob, props.tot_muj, props.tot_hom];
          var overview = '<h4>Población: ' + props.NAME_1 + ' Departamento</h4>' + "<br/>";
          overview += 'Población Total: ' + props.tot_pob + "<br/>";
          overview += 'Hombres: ' + props.tot_muj + "<br/>";
          overview += 'Mujeres: ' + props.tot_hom + "<br/>";
          this._div.innerHTML = overview;
          newChart(labels, data);
        } else {
          this._div.innerHTML = '<h4>Seleccione un Departamento</h4>';
        }
      };  */
      updateLegendColors("tot_pob");
      break;

      
  
      case "tot_muj":
        geojson.setStyle(function(feature) {
          return {
            fillColor: getColor2(feature.properties.tot_muj)
          };
        });
  
        geojson.on('mouseover', function(e) {
          geojson.setStyle(function(feature) {
            return {
              fillColor: getColor2(feature.properties.tot_muj)
            };
          });
        });
  
        geojson.on('mouseout', function(e) {
          geojson.setStyle(function(feature) {
            return {
              fillColor: getColor2(feature.properties.tot_muj)
            };
          });
        });

 

  
   /*  info.update = function(props) {
          if (props) {
            var labels = ['Total de población', 'Total de hogares'];
            var data = [props.tot_pob,props.tot_muj];
            var overview = '<h4>Población: ' + props.NAME_1 + ' Departamento</h4>' + "<br/>";
            overview += 'Población total: ' + props.tot_pob + "<br/>";
            overview += 'Hogares: ' + props.tot_muj + "<br/>";
            this._div.innerHTML = overview;
            newChart(labels, data);
          } else {
            this._div.innerHTML = '<h4>Seleccione un Departamento</h4>';
          }
        }; */
        updateLegendColors("tot_muj");
        break;
  
      case "tot_hom":
        geojson.setStyle(function(feature) {
          return {
            fillColor: getColor3(feature.properties.tot_hom)
          };
        });
  
        geojson.on('mouseover', function(e) {
          geojson.setStyle(function(feature) {
            return {
              fillColor: getColor3(feature.properties.tot_hom)
            };
          });
        });
  
        geojson.on('mouseout', function(e) {
          geojson.setStyle(function(feature) {
            return {
              fillColor: getColor3(feature.properties.tot_hom)
            };
          });
        });

        /* info.update = function(props) {
          if (props) {
            var labels = ['Total de población', 'Total de viviendas'];
            var data = [props.tot_pob,props.tot_muj];
            var overview = '<h4>Población: ' + props.NAME_1 + ' Departamento</h4>' + "<br/>";
            overview += 'Población: ' + props.tot_pob + "<br/>";
            overview += 'Viviendas: ' + props.tot_hom + "<br/>";
            this._div.innerHTML = overview;
            newChart(labels, data);
          } else {
            this._div.innerHTML = '<h4>Seleccione un Departamento</h4>';
          }
        }; */
  
        updateLegendColors("tot_hom");
        break;

        case "sum_area":
          geojson.setStyle(function(feature) {
            return {
              fillColor: getColor4(feature.properties.sum_area)
            };
          });
          geojson.on('mouseover', function(e) {
            geojson.setStyle(function(feature) {
              return {
                fillColor: getColor4(feature.properties.sum_area)
              };
            });
          });
    
      // Add mouseout event listener to GeoJSON layer
      geojson.on('mouseout', function(e) {
        geojson.setStyle(function(feature) {
          return {
            fillColor: getColor4(feature.properties.sum_area)
          };
        });
      });
/* 
      info.update = function(props) {
        if (props) {
          var labels = ['Total de población', 'Asistencia educativa'];
          var data = [props.tot_pob,props.tot_muj];
          var overview = '<h4>Población: ' + props.NAME_1 + ' Departamento</h4>' + "<br/>";
          overview += 'Asistencia educativa: ' + props.sum_area + "<br/>";
          overview += 'Población total: ' + props.tot_pob + "<br/>";
          this._div.innerHTML = overview;
          newChart(labels, data);
        } else {
          this._div.innerHTML = '<h4>Seleccione un Departamento</h4>';
        }
      };
   */
  
      updateLegendColors("sum_area");
      break;
          case "superficie":
            geojson.setStyle(function(feature) {
              return {
                fillColor: getColor5(feature.properties.superficie),
                
              };
            });
  
            geojson.on('mouseover', function(e) {
              geojson.setStyle(function(feature) {
                return {
                  fillColor: getColor5(feature.properties.superficie)
                };
              });
            });
      
        // Add mouseout event listener to GeoJSON layer
        geojson.on('mouseout', function(e) {
          geojson.setStyle(function(feature) {
            return {
              fillColor: getColor5(feature.properties.superficie)
            };
          });
        });
    
        updateLegendColors("superficie");
       
          // Add more cases for other styles
      
          break;
  
  
    }

    const iconR = document.getElementById('iconRight');

   

    iconR.addEventListener('click', () => {
      map.setView([-33.027, -52.811], 7);
      
    });
    
    //REFRESH BOTTON
    const refresh = document.getElementById('iconRefresh');

    refresh.addEventListener('click', function() {
      // Reset la vista del mapa y actualizar la leyenda
      setTimeout(function() {
        updateLegendColors('tot_pob');
       map.setView([-33.027, -52.811], 7);
    
        // REFRESCAR EL MAP STYLE SOLICITANDO QUE EL ESTILO DEL MAPA SEA EL GEOJSON
        $.getJSON("deptoss.geojson", function(data) {
          // REMOVER EL MAPA ANTERIOR QUE ESTABA EN LA VISTA
          map.removeLayer(geojson);
    
          // SIGNARLE EL ESTILO AL GEOJSON
          geojson = L.geoJson(data, {
            style: style,
            
            // Rest of your code for styling and interactions
            onEachFeature: function(feature, layer) {
              // Etiquetas permanentes adentro de los poligonos
              if (
                feature.properties.NAME_1 === 'ARTIGAS' ||
                feature.properties.NAME_1 === 'MONTEVIDEO' ||
                feature.properties.NAME_1 === 'MALDONADO' ||
                feature.properties.NAME_1 === 'SAN JOSE' ||
                feature.properties.NAME_1 === 'COLONIA' 
              ) {
                layer.unbindTooltip();
              } else {
                layer.bindTooltip(feature.properties.NAME_1, {
                  permanent: true,
                  direction: 'center',
                  offset: [0, -10],
                  className: 'my-tooltip'
                });
              }
    
              layer.on('mouseover', function(e) {
                this.openPopup();
                this.setStyle({
                  weight: 2,
                  color: 'blue',
                  dashArray: '',
                  fillOpacity: 0.9
                });
                this.bringToFront();
              });
              layer.on('mouseout', function(e) {
                this.closePopup();
                geojson.resetStyle(layer);
                if (infoCard.innerHTML !== dataCard) {
                  infoCard.innerHTML = "3000000 Habitantes";
                  infoCardHog.innerHTML ="1000 Hogares"
                  infoCardViv.innerHTML="1500000 Viviendas"
                  
              }
              });
            
            }
          }).addTo(map);
        });
      }, 2000);
    });
//LEYENDA
    function updateLegendColors(style) {
      let legendContainer = document.querySelector('#legend');
      legendContainer.innerHTML = '';
    
      let colorList;
      let labelsLegend;
    
      switch (style) {

        case "tot_pob":
          colorList = [
            { range: ">135000", color: '#433609' }, 
            { range: "120000-135000", color: '#a68617' },
            { range: "95000-120000", color: '#e6c247' },
            { range: "70000-95000", color: '#efd98d' },
            { range: "<56000", color: '#f9f0d2' }
          ];
          labelsLegend = ['<strong>Población total (Hab) </strong>'];
          break;
          case "iconRefresh":
            colorList = [
              { range: ">135000", color: '#433609' }, 
              { range: "120000-135000", color: '#a68617' },
              { range: "95000-120000", color: '#e6c247' },
              { range: "70000-95000", color: '#efd98d' },
              { range: "<56000", color: '#f9f0d2' }
            ];
            labelsLegend = ['<strong>Población total (Hab) </strong>'];
            break;

        case "tot_muj":
          colorList = [
            { range: ">200000", color: '#66c2a4' }, 
            { range: "20000-100000", color: '#99d8c9' },
            { range: "10000-20000", color: '#ccece6' },
            { range: "10000-5000", color: '#e5f5f9' },
            { range: "<5000", color: '#f7fcfd' }
          ];
          labelsLegend = ['<strong>Hogares </strong>'];
          break;
          case "tot_hom":
            colorList = [
              { range: ">200000", color: '#2171b5' }, 
              { range: "20000-100000", color: '#6baed6'},
              { range: "10000-20000", color: '#9ecae1' },
              { range: "10000-5000", color: '#c6dbef' },
              { range: "<5000", color: '#deebf7' }
            ];
            labelsLegend = ['<strong>Viviendas </strong>'];
            break;
            case "sum_area":
              colorList = [
                { range: ">200000", color: '#007a2f' }, 
                { range: "160000-15000", color: '#2a924b'},
                { range: "15000-9000", color: '#7bc77c' },
                { range: "9000-3000", color: '#c9eac2' },
                { range: "<3000", color: '#f7fcf5' }
              ];
              labelsLegend = ['<strong>Educación</strong>'];
              break;
              case "superficie": 
              colorList = [
                { range: ">160000", color: 'white' }, 
                { range: "55000-22000", color: 'green'},
                { range: "22000-11000", color: 'pink' },
                { range: "11000-7000", color: 'blue' },
                { range: "<7000", color: 'purple' }
              ];
              labelsLegend = ['<strong>Actividad Laboral/strong>'];
              break;   
        default:
          colorList = [
            { range: ">135000", color: '#433609' }, 
            { range: "120000-135000", color: '#a68617' },
            { range: "95000-120000", color: '#e6c247' },
            { range: "70000-95000", color: '#efd98d' },
            { range: "<56000", color: '#f9f0d2' }
          ];
          labelsLegend = ['<strong>Población total (Hab) </strong>'];
          break;
      }
    
      for (let i = 0; i < labelsLegend.length; i++) {
        let labelLegend = document.createElement("div");
        labelLegend.innerHTML = labelsLegend[i];
        legendContainer.appendChild(labelLegend);
      }
    
      let entries = colorList.sort((a, b) => {
        let aRange = parseInt(a.range.replace(/[^\d.-]/g, ''));
        let bRange = parseInt(b.range.replace(/[^\d.-]/g, ''));
        return bRange - aRange;
      }).reverse();
    
      for (let i = 0; i < entries.length; i++) {
        let item = entries[i];
        let boxContainer = document.createElement("div");
        let box = document.createElement("div");
        let labelLegend = document.createElement("div");
    
        labelLegend.innerHTML = item.range;
        box.className = 'box';
        box.style.backgroundColor = item.color;
    
        boxContainer.appendChild(box);
        boxContainer.appendChild(labelLegend);
        legendContainer.appendChild(boxContainer);
    
        boxContainer.style.display = 'flex';
        boxContainer.style.flexDirection = 'row';
        boxContainer.style.margin = '0px';
        boxContainer.style.marginLeft = i * 12 + 'px';
        boxContainer.style.marginTop = i * 0 + 'px';
        labelLegend.style.marginLeft = '5px';
      }
    }
  }
 
 
  // attach event listeners to the radio buttons la variable la busca con el type(nombre del elemento)
  var radioButtons = document.getElementsByName("radio");
  radioButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      changeStyle(this.value);
    });
  });

  //CREAR EVENTOS A LOS ICONOS DEL NAVBAR

  //IMPRIMIR
  const print=document.querySelector('#print2')

  print.addEventListener('click',function () {
    window.print(mapContainer)
  } )
//DESCARGAR GRÁFICOS
const canvas= document.getElementById('barChartCanvas');
const canvas2= document.getElementById('mychart');

const charts=document.querySelector('#charts');

charts.addEventListener('click', function() {
  const link = document.createElement('a');
  link.download = 'grafico.jpg';
  link.href = canvas.toDataURL('i/jpeg', 1);
  link.click();
});


