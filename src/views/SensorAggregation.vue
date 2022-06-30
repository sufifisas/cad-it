<template>
    <h1>Sensor</h1>
    <h2>Results</h2>
    <table>
        <tr>
            <th>Id</th>
            <th>Room Area</th>
            <th>Min Temperature</th>
            <th>Max Temperature</th>
            <th>Avg Temperature</th>
            <th>Median Temperature</th>
            <th>Min Humidity</th>
            <th>Max Humidity</th>
            <th>Avg Humidity</th>
            <th>Median Humidity</th>
        </tr>
        <tr v-for="item in results" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.roomArea }}</td>
            <td>{{ item.minTemperature }}</td>
            <td>{{ item.maxTemperature }}</td>
            <td>{{ item.averageTemperature }}</td>
            <td>{{ item.medianTemperature }}</td>
            <td>{{ item.minHumidity }}</td>
            <td>{{ item.maxHumidity }}</td>
            <td>{{ item.averageHumidity }}</td>
            <td>{{ item.medianHumidity }}</td>
        </tr>
    </table>

    <h2>Data Group</h2>
    <table>
        <tr>
            <th>Id</th>
            <th>Room Area</th>
            <th>Timestamp</th>
            <th>Date</th>
            <th>Temperature</th>
            <th>Humidity</th>

        </tr>
        <tr v-for="item in sensor" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.roomArea }}</td>
            <td>{{ item.timestamp }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.temperature }}</td>
            <td>{{ item.humidity }}</td>
        </tr>
    </table>

</template>

<script>
import sensorData from '../json/sensor_data.json'

export default {
    data() {
        return {
            sensor: sensorData.array,
            roomAreas: [],
            sensorTemperature: []
        }   
    },
    mounted() {
        let array = []
        array = sensorData.array.map((item) => {
            return {
                ...item,
                "date": new Date(item.timestamp)
            }
        })
        array = array.sort(function(a, b) {
            return new Date(a.date) - new Date(b.date) //sort array by date in ascending
        })
        
        this.sensor = array.sort(function(a, b) {
            const roomAreaA = a.roomArea.toUpperCase(); // ignore upper and lowercase
            const roomAreaB = b.roomArea.toUpperCase(); // ignore upper and lowercase
            if (roomAreaA < roomAreaB) {
                return -1;
            }
            if (roomAreaA > roomAreaB) {
                return 1
            }
            // names must be equal
            return 0;
            });
        
        //get list of roomArea
        let room = []
        array.forEach((item) => {
            if(!room.includes(item.roomArea)) {
                room.push(item.roomArea)
            }
        })
        this.roomAreas = room
    },
    methods: {
        getTemperature(room) {
            let list = []
            this.sensor.forEach((item) => {
                if(item.roomArea === room) {
                    list.push(item.temperature) 
                }
            })
            return list
        },
        getHumidity(room) {
            let list = []
            this.sensor.forEach((item) => {
                if(item.roomArea === room) {
                    list.push(item.humidity) 
                }
            })
            return list
        },
        getMinTemperature(room) {
            let list = this.getTemperature(room).sort((a,b) => a-b)
            return list[0]
        },
        getMaxTemperature(room) {
            let list = this.getTemperature(room).sort((a,b) => a-b)
            return list[list.length-1]
        },
        getAvgTemperature(room) {
            const initialValue = 0;
            const sumWithInitial = this.getTemperature(room).reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            initialValue
            );
            return sumWithInitial/(this.getTemperature(room).length)
        },
        getMedianTemperature(room) {
            let list = this.getTemperature(room).sort((a,b) => a-b)
            if((list.length) % 2 > 0) {
                let position = ((list.length) - 1) / 2  
                return list[position]
            }
            let position = list.length / 2
            return (list[position] + list[position-1]) / 2   
        },
        getMinHumidity(room) {
            let list = this.getHumidity(room).sort((a,b) => a-b)
            return list[0]
        },
        getMaxHumidity(room) {
            let list = this.getHumidity(room).sort((a,b) => a-b)
            return list[list.length-1]
        },
        getAvgHumidity(room) {
            const initialValue = 0;
            const sumWithInitial = this.getHumidity(room).reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            initialValue
            );
            return sumWithInitial/(this.getTemperature(room).length)
        },
        getMedianHumidity(room) {
            let list = this.getHumidity(room).sort((a,b) => a-b)
            if((list.length) % 2 > 0) {
                let position = ((list.length) - 1) / 2  
                return list[position]
            }
            let position = list.length / 2
            return (list[position] + list[position-1]) / 2   
        },
    },
    computed: {
        results() {
            let list = []
            list = this.roomAreas.map((item,index) => {
                return {
                    id: index + 1,
                    roomArea: item,
                    minTemperature: this.getMinTemperature(item),
                    maxTemperature: this.getMaxTemperature(item),
                    averageTemperature: this.getAvgTemperature(item),
                    medianTemperature: this.getMedianTemperature(item),
                    minHumidity: this.getMinHumidity(item),
                    maxHumidity: this.getMaxHumidity(item),
                    averageHumidity: this.getAvgHumidity(item),
                    medianHumidity: this.getMedianHumidity(item)
                }
                
            })
            return list
        }
    }
}
</script>