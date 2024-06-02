// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js';
import { getDatabase, ref, onValue, push, update } from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

let Wastes = [];
let Plastics = [], Metal = [], Paper = [], Others = [];
let Dustbins = [];

const firebaseConfig = {
    apiKey: "AIzaSyCFzLeAaiPwfbVwEDPMQwviz9ZaBkqHE4E",
    authDomain: "waste-management-ab299.firebaseapp.com",
    databaseURL: "https://waste-management-ab299-default-rtdb.firebaseio.com",
    projectId: "waste-management-ab299",
    storageBucket: "waste-management-ab299.appspot.com",
    messagingSenderId: "823587844034",
    appId: "1:823587844034:web:00d7ddf236131e42daf05b",
    measurementId: "G-YTHZ14GG53"
    };
    
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Function to retrieve data from Firebase
function fetchData(callback) {
    const db = getDatabase();
    const dbRef = ref(db, 'Wastes');

    onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          const {CategoryId, DustbinId, Timestamp} = childData;

          Wastes.push({category: CategoryId, dustbin: DustbinId, time: Timestamp});
          if(CategoryId == 0)
            Metal.push({category: CategoryId, dustbin: DustbinId, time: Timestamp});
          else if(CategoryId == 1)
            Others.push({category: CategoryId, dustbin: DustbinId, time: Timestamp});
          else if(CategoryId == 2)
            Paper.push({category: CategoryId, dustbin: DustbinId, time: Timestamp});
          else if(CategoryId == 3)
            Plastics.push({category: CategoryId, dustbin: DustbinId, time: Timestamp});
        });
      }, {
        onlyOnce: true
    });

    const dustbin = getDatabase();
    const dustbinRef = ref(dustbin, 'dustbins');

    onValue(dustbinRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          const {dustbinID, insertDate, location} = childData;
            
          Dustbins.push({Id: dustbinID, InsertDate: insertDate, Location: location});
        });
        callback();
      }, {
        onlyOnce: true
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    fetchData(loadChart);
    const database = getDatabase(app);
    const addDustbinForm = document.getElementById('add-dustbin-form');

    addDustbinForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const dustbinID = document.getElementById('dustbin-id').value;
        const insertDate = document.getElementById('insert-date').value;
        const location = document.getElementById('location').value;

        if (!dustbinID || !insertDate || !location) {
            alert('All fields are required!');
            return;
        }

        const newDustbin = {
            dustbinID: dustbinID,
            insertDate: insertDate,
            location: location,
        };

        const newDustbinKey = push(ref(database, 'dustbins')).key;

        const updates = {};
        updates['/dustbins/' + newDustbinKey] = newDustbin;

        update(ref(database), updates)
            .then(() => {
                alert('Dustbin added successfully!');
                addDustbinForm.reset();
            })
            .catch((error) => {
                console.error('Error adding dustbin:', error);
            });
    });
});

function loadChart()
{
    const now = new Date();

    console.log(Wastes);
    console.log(Dustbins);
    // Update the values in the dashboard
    document.getElementById('total-dustbins').textContent = Dustbins.length;
    document.getElementById('total-waste').textContent = Wastes.length;
    document.getElementById('current-day').textContent = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

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
                { name: 'Paper', y: Paper.length, color: '#28a745' },
                { name: 'Metal', y: Metal.length, color: '#ffc107' },
                { name: 'Plastic', y: Plastics.length, color: '#17a2b8' },
                { name: 'Others', y: Others.length, color: '#dc3545' },
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
            name: 'Metal',
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
}


