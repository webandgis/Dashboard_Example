const hamburger = document.getElementById('hamburger')
const sidebar = document.getElementById('sidebar')
const overlay = document.getElementById('overlay')

//right Side bar
const hamburger2 = document.getElementById('hamburger2');
const sidebar2 = document.getElementById('rightSidebar');
const overlay2 = document.getElementById('overlay2');


//Botones refrescar 

const refresh=document.getElementById('iconRefresh');
const rightIcon=document.getElementById('iconRight');
const leftIcon=document.getElementById('iconLeft');



let menuOpen = false
let menuOpenR= true

function openMenu() {
  menuOpen = true
  overlay.style.display = 'block'
  sidebar.style.width = '280px'
}



function closeMenu() {
  menuOpen = false
  overlay.style.display = 'none'
  sidebar.style.width = '0px'
}

function openMenuRight() {
  menuOpenR = true
  overlay2.style.display = 'block'
  sidebar2.style.width = '280px'
}

function closeMenuR() {
  menuOpenR = false
  overlay2.style.display = 'none'
  sidebar2.style.width = '0px'
}

hamburger.addEventListener('click', function () {
  if (!menuOpen) {
    openMenu()
  }
})

overlay.addEventListener('click', function () {
  if (menuOpen) {
    closeMenu()
  }
}) 

hamburger2.addEventListener('click', function () {
  !menuOpenR? openMenuRight():closeMenuR();
}),

overlay2.addEventListener('click', function () {
  menuOpenR?closeMenuR(): null;

}) 



//Gráfico de piramide poblacional 


//Botones desplegables derecho

const dropBtn= document.querySelectorAll('.dropdown__button')
const dropMenu= document.querySelectorAll('.dropdown__menu')

dropBtn.forEach((dropBtns, index) => {
  dropBtns.addEventListener('click', () => {
    dropMenu[index].classList.toggle('hide');
  });
}) 


//tabla del dropdown
let dataList = [];
let startIndex = 0;
let pageSize = 5;

function buildTable(data, startIndex, pageSize) {
  let table = $('#myTable');
  table.empty();

  let endIndex = startIndex + pageSize;
  let subset = data.slice(startIndex, endIndex);

  for (let i = 0; i < subset.length; i++) {
    let porcent = subset[i].properties.tot_pob * 100 / 3285877;
    let row = `<tr>
      <td>${subset[i].properties.NAME_1}</td>
      <td>${Number(subset[i].properties.tot_pob)}</td>
      <td>${porcent.toFixed(2)}%</td>
    </tr>`;
    table.append(row);
  }

  let prevButton = $('#prevButton');
  let nextButton = $('#nextButton');

  prevButton.prop('disabled', startIndex === 0);
  prevButton.off('click');
  prevButton.click(function() {
    startIndex -= pageSize;
    buildTable(data, startIndex, pageSize);
  });

  nextButton.prop('disabled', endIndex >= data.length);
  nextButton.off('click');
  nextButton.click(function() {
    startIndex += pageSize;
    buildTable(data, startIndex, pageSize);
  });
}

function dropList() {
  fetch('deptoss.geojson')
    .then(response => response.json())
    .then(deptosList => {
      dataList = deptosList.features;
      buildTable(dataList, startIndex, pageSize);
      // Sort table by default column
      let defaultColumn = $('.bg-info th').eq(0).data('column');
      let defaultOrder = $('.bg-info th').eq(0).data('order');
      sortTable(defaultColumn, defaultOrder);
    });
}

function sortTable(column, order) {
  let dataType = column === 'depto' ? 'string' : 'number';
  let table = $('#myTable');
  let rows = table.find('tr').toArray();
  let sortOrder = order === 'desc' ? -1 : 1;

  let tableIndex=[];

  rows.sort(function(a, b) {
    let cellA = $(a).find('td').eq(columnIndex(column)).text();
    let cellB = $(b).find('td').eq(columnIndex(column)).text();

    if (dataType === 'number') {
      cellA = Number(cellA);
      cellB = Number(cellB);
    }

    let comparison = 0;
    if (cellA < cellB) {
      comparison = -1;
    } else if (cellA > cellB) {
      comparison = 1;
    }
    return comparison * sortOrder;
  });
  $('.bg-info th').each(function() {
    $(this).html($(this).html().replace(' ▲', '').replace(' ▼', ''));
  });

  let arrow = order === 'desc' ? ' ▲' : ' ▼';
  $(`.bg-info th[data-column="${column}"]`).html($(`.bg-info th[data-column="${column}"]`).html() + arrow);

  // Update the data array with the sorted values
  let startIndex = 0;
  let pageSize = 5;
  let subset = data.slice(startIndex, startIndex + pageSize);
  subset.sort(function(a, b) {
    let cellA = a.properties[column];
    let cellB = b.properties[column];
    if (dataType === 'number') {
      cellA = Number(cellA);
      cellB = Number(cellB);
    }
    let comparison = 0;
    if (cellA < cellB) {
      comparison = -1;
    } else if (cellA > cellB) {
      comparison = 1;
    }
    return comparison * sortOrder;
  });
  for (let i = 0; i < subset.length; i++) {
    data[startIndex + i] = subset[i];
  }

  $.each(rows, function(index, row) {
    table.append(row);
  });
}

function columnIndex(column) {
  let index = 0;
  $('.bg-info th').each(function(i) {
    if ($(this).data('column') === column) {
      index = i;
      return false;
    }
  });
  return index;
}

$('.bg-info th').click(function() {
  let column = $(this).data('column');
  let order = $(this).data('order');

  if (order === 'desc') {
    $(this).data('order', 'asc');
  } else {
    $(this).data('order', 'desc');
  }

  sortTable(column, order);
});

dropList();

//DESCARGAR TABLAS

const table = document.querySelector('#table');

table.addEventListener('click', function() {
  downloadTable();
});

function downloadTable() {
  // Create a CSV string with the table data
  let csvContent = "data:text/csv;charset=utf-8,";
  
  // Get the table rows
  let rows = Array.from(document.querySelectorAll("#myTable tr"));
  
  // Iterate over the rows
  rows.forEach(function(row) {
    let rowData = Array.from(row.querySelectorAll("td")).map(function(cell) {
      return cell.textContent;
    });
    csvContent += rowData.join(",") + "\n";
  });
  
  // Create a temporary link element
  let link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.download = "table.csv";
  
  // Trigger the download
  link.click();
}


//Piramide poblacional 


//ESTILOS AL HACER MOUSEOVER
/*  let geojsonLayer = L.geoJSON(data, {
  style: style,
}).addTo(map);

table.options.onHover= function(eve,activeE){
  let elements= activeE[0]._index;
  let featureTable= tableIndex[elements].feature

  geojsonLayer.setStyle({
    weight: 8,
    color: 'blue',
    dashArray: '10',
    fillOpacity: 1,
    fillColor:''
  });

  geojsonLayer.eachLayer(function(layer) {
    if (layer.feature != featureTable) {
      layer.setStyle({
        weight: 2,
        opacity: 0.5,
        color: 'white',
        fillOpacity: 0.7,
      });
    }
  });
}; */



//Pages function



/* let myArray=[
  {'depto': 'Montevideo', 'pob':1318755, 'porcent':40.134},
  {'depto': 'Canelones', 'pob':520173, 'porcent':15.83},
  {'depto': 'Maldonado', 'pob':164298, 'porcent':5.00},
  {'depto': 'Salto', 'pob':124861, 'porcent':3.80},
  {'depto': 'Colonia', 'pob':123203, 'porcent':3.74},
  {'depto': 'Paysandú', 'pob':113107, 'porcent':3.44},
]

buildTable(myArray)

	function buildTable(data){
		let table = document.getElementById('myTable')
		table.innerHTML = ''
		for (let i = 0; i < data.length; i++){
			let row = `<tr>
							<td>${data[i].depto}</td>
							<td>${data[i].pob}</td>
							<td>${data[i].porcent}</td>
					  </tr>`
			table.innerHTML += row


		}
	} */


  //LEYENDA 

  //Crear un array con el nombre y colores

  /* let colorList={135000: '#433609',120000:'#a68617',95000 :'#e6c247',70000:'#efd98d',56000:'#f9f0d2' }
  let labelsLegend = ['<strong>Población total </strong>'],
  fillLegend= function(colorList){
    let legendContainer= document.querySelector('#legend');

    for (let item in colorList){
      let boxContainer=document.createElement("div")
      let box= document.createElement("div")
      let labelLegend=document.createElement("div")

      labelLegend.innerHTML=item;
      box.className='box';
      box.style.backgroundColor= colorList[item]

      boxContainer.appendChild(box)
      boxContainer.appendChild(labelLegend)
      legendContainer.appendChild(boxContainer)

      boxContainer.style.display = 'flex';
      boxContainer.style.flexDirection = 'row';
      boxContainer.style.margin='5px'
      labelLegend.style.marginLeft = '5px'
    }
  }
 fillLegend(colorList)
 */
 let colorList = [
  { range: ">135000", color: '#433609' }, 
  { range: "120000-135000", color: '#a68617' },
  { range: "95000-120000", color: '#e6c247' },
  { range: "70000-95000", color: '#efd98d' },
  { range: "<56000", color: '#f9f0d2' }
];

let labelsLegend = ['<strong>Población total (Hab) </strong>'];

function fillLegend(colorList) {
  let legendContainer = document.querySelector('#legend');
  const tittleLe = document.getElementById("tittleLegend").innerHTML = labelsLegend;
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

    let labelHTM=labelLegend.innerHTML = item.range;
    box.className = 'box';
    let colorBox= box.style.backgroundColor = item.color;

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

fillLegend(colorList);


//FUNCIÓN REFRESCAR Y CARGAR VISTA ANTERIOR

/* refresh.addEventListener('click', function() {
  if (deptossData) {
    if (mapContainer.hasLayer(deptossData)) {
      mapContainer.removeLayer(deptossData);
    }
    deptossData.addTo(mapContainer);
  }
}); */
//FUNCIÓN DIV EN EL POINTER DIV
/* 
let mouseDiv=document.querySelector('#my-div')

function touchePage (){
  try{
    document.createEvent("TouchEvent")
    return true;
  }catch (e){
    return false;
  }
}

const move= (e) =>{
  try{
    let x= !touchePage()? e.pageX: e.touches[0].pageX;
    let y= !touchePage()? e.pageY: e.touches[0].pageY;
  }catch(e){}
  mouseDiv.style.left= x-50+"px";
  mouseDiv.style.top=y-50+"px"
};

document.addEventListener("mousemove",(e)=>{
  move(e)
});

document.addEventListener("touchmove",(e)=>{
  move(e)
}); */

 //Female convert no negative value
 const female=[4,7,9,10,13,14,20];
 const femaleData=[];
 female.forEach(element=>femaleData.push(element * -1));
// setup
const data = {
labels: ['65+', '56-65', '46-55', '36-45', '26-35', '13-25', '0-12'],
datasets: [{
 label: 'Hombres',
 data: [3,6,6,9,12,13,19],
backgroundColor: 'rgba(54, 162, 235, 0.2)',
borderColor: 'rgba(54, 162, 235, 1)',
borderWidth: 1,


},
{
 label: 'Mujeres',
 data: femaleData,
 backgroundColor: 'rgba(255, 26, 104, 0.2)',
 borderColor: 'rgba(255, 26, 104, 1)', 
 borderWidth: 1
 
}]

};
//block tool tip
const tooltip={
 yAlign:'bottom',
 tittleAlign:'center',
 callbacks:{
     label: function (context) {
         console.log(context.raw);
         console.log(context.dataset.label);
         return `${context.dataset.label} ${Math.abs(context.raw)}`;

     }

 }
};

// config 
const config = {
type: 'horizontalBar',
data,
options: {
  legend: {
     labels: {
        fontColor: 'white',
        fontFamily: 'Verdana',
        fontSize: 12,
     }
  },
 
 scales: {
  xAxes: [{
    ticks: {
      display: false,
        beginAtZero:false,
        fontColor: 'white',
        fontSize: 11,
        fontFamily: 'Verdana',
    }
}],
yAxes: [{
  ticks: {
      beginAtZero:false,
      fontColor: 'white',
      fontSize: 11,
      fontFamily: 'Verdana',
  }
}],
},
 plugins:{
     tooltip,
 }
}
};

// render init block
const myChart2 = new Chart(
document.getElementById('myChart2'),
config
);

// Instantly assign Chart.js version
const chartVersion = document.getElementById('chartVersion');
chartVersion.innerText = Chart.version;
 
