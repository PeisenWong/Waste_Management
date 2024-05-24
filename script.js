// Data for the dashboard
const completedTasks = 28;
const incompleteTasks = 14;
const weekNumber = 22;

// Update the values in the dashboard
document.getElementById('completed-tasks').textContent = completedTasks;
document.getElementById('incomplete-tasks').textContent = incompleteTasks;
document.getElementById('current-week').textContent = `week ${weekNumber}`;

// Initialize the Highcharts pie chart
Highcharts.chart('status-chart', {
    chart: {
        type: 'pie',
        backgroundColor: '#444',
    },
    title: {
        text: '',
    },
    plotOptions: {
        pie: {
            innerSize: '50%',
            size: '100%',
            dataLabels: {
                enabled: true,
                format: '{point.name}: {point.percentage:.1f}%',
                color: '#fff',
            },
            showInLegend: true,
        },
    },
    series: [{
        name: 'Tasks',
        data: [
            { name: 'Paper', y: 28, color: '#28a745' },
            { name: 'Glass', y: 14, color: '#ffc107' },
            { name: 'Plastic', y: 10, color: '#17a2b8' },
            { name: 'Others', y: 6, color: '#dc3545' },
        ],
    }],
    legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical',
        itemStyle: {
            color: '#fff',
        },
    },
    tooltip: {
        headerFormat: '',
        pointFormat: `<span style="color:{point.color}">\u25CF</span>
            {point.name}: <b>{point.y}</b><br/>`,
    },
    responsive: {
        rules: [{
            condition: {
                maxWidth: 450,
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal',
                },
            },
        }],
    },
});

// Initialize the Highcharts line chart
Highcharts.chart('line-chart', {
    chart: {
        type: 'line',
        backgroundColor: '#444',
    },
    title: {
        text: ''
    },
    xAxis: {
        type: 'datetime',
        labels: {
            style: {
                color: '#fff'
            }
        }
    },
    yAxis: {
        title: {
            text: 'Number of wastes',
            style: {
                color: '#fff'
            }
        },
        labels: {
            style: {
                color: '#fff'
            }
        }
    },
    legend: {
        itemStyle: {
            color: '#fff'
        }
    },
    series: [{
        name: 'Paper',
        data: [
            [Date.UTC(2023, 4, 1), 10],
            [Date.UTC(2023, 4, 8), 14],
            [Date.UTC(2023, 4, 15), 16],
            [Date.UTC(2023, 4, 22), 22],
            [Date.UTC(2023, 4, 29), 24],
            [Date.UTC(2023, 5, 5), 28]
        ],
        color: '#28a745'
    }, {
        name: 'Glass',
        data: [
            [Date.UTC(2023, 4, 1), 20],
            [Date.UTC(2023, 4, 8), 18],
            [Date.UTC(2023, 4, 15), 17],
            [Date.UTC(2023, 4, 22), 15],
            [Date.UTC(2023, 4, 29), 14],
            [Date.UTC(2023, 5, 5), 14]
        ],
        color: '#ffc107'
    }, {
        name: 'Bottle',
        data: [
            [Date.UTC(2023, 4, 1), 5],
            [Date.UTC(2023, 4, 8), 6],
            [Date.UTC(2023, 4, 15), 8],
            [Date.UTC(2023, 4, 22), 10],
            [Date.UTC(2023, 4, 29), 12],
            [Date.UTC(2023, 5, 5), 10]
        ],
        color: '#17a2b8'
    }, {
        name: 'Others',
        data: [
            [Date.UTC(2023, 4, 1), 5],
            [Date.UTC(2023, 4, 8), 4],
            [Date.UTC(2023, 4, 15), 3],
            [Date.UTC(2023, 4, 22), 2],
            [Date.UTC(2023, 4, 29), 2],
            [Date.UTC(2023, 5, 5), 6]
        ],
        color: '#dc3545'
    }]
});

// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js';
// import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js';


// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
// apiKey: "AIzaSyCFzLeAaiPwfbVwEDPMQwviz9ZaBkqHE4E",
// authDomain: "waste-management-ab299.firebaseapp.com",
// databaseURL: "https://waste-management-ab299-default-rtdb.firebaseio.com",
// projectId: "waste-management-ab299",
// storageBucket: "waste-management-ab299.appspot.com",
// messagingSenderId: "823587844034",
// appId: "1:823587844034:web:00d7ddf236131e42daf05b",
// measurementId: "G-YTHZ14GG53"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// document.addEventListener('DOMContentLoaded', (event) => {
//     const myButton = document.getElementById('myButton');
//     myButton.addEventListener('click', () => {
//         alert('Button clicked!');

//         const db = getDatabase(app);
//         const dustbinId = ref(db, 'WasteSystem/DustbinId');
//         onValue(dustbinId, (snapshot) => {
//             if(snapshot.exists())
//             {
//                 const data = snapshot.val();
//                 console.log("DustbinId: " + data)
//             }
//             else
//             {
//                 console.log("Bruh");
//             }
        
//         });

//     });
// });


