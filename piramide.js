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
options:  {
 indexAxis:'y',
 scales: {
     x: {
    
     stacked:true,
   },
   y: {
     beginAtZero: true,
     stacked:true,
   }
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