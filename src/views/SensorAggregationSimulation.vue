<template>
    <h1>Sensor Simulation</h1>
    <button @click="startSimulation(roomArea)" v-if="!start">Start</button>
    <button class="stop" @click="stopSimulation(roomArea)" v-else>Stop</button>
    <div class="chart-wrapper">
        <div>
            <ChartTemp :items = "items"/>
            <div class="result">
                <div>
                    <span>{{minTemp.toFixed(2)}}</span>
                    <span>Min</span>
                </div>
                <div>
                    <span>{{maxTemp.toFixed(2)}}</span>
                    <span>Max</span>
                </div>
                <div>
                    <span>{{medianTemp.toFixed(2)}}</span>
                    <span>Median</span>
                </div>
                <div>
                    <span>{{avgTemp.toFixed(2)}}</span>
                    <span>Avg</span>
                </div>
            </div>
        </div>
        <div>
            <ChartHum :items = "items"/>
            <div class="result">
                <div>
                    <span>{{minHum.toFixed(2)}}</span>
                    <span>Min</span>
                </div>
                <div>
                    <span>{{maxHum.toFixed(2)}}</span>
                    <span>Max</span>
                </div>
                <div>
                    <span>{{medianHum.toFixed(2)}}</span>
                    <span>Median</span>
                </div>
                <div>
                    <span>{{avgHum.toFixed(2)}}</span>
                    <span>Avg</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import ChartTemp from '../components/chartTemp.vue'
import ChartHum from '../components/chartHum.vue'

export default {
    data() {
        return {
            items: [],
            roomArea: 'roomArea1',
            isStart: [],
            interval: null,
            start: false,
            minTemp: 0,
            maxTemp: 0,
            avgTemp: 0,
            medianTemp: 0,
            minHum: 0,
            maxHum: 0,
            avgHum: 0,
            medianHum: 0,
        }
    },
    components: {
        ChartTemp,ChartHum
    },
    methods: {
        getRandomValue(min, max, decimals) {
            return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
        },
        getTemperature() {
            return this.getRandomValue(15,30,15)
        },
        getHumidity() {
            return this.getRandomValue(85,100,15)
        },
        async getData() {
            try {
            const res = await axios.get(`http://localhost:3001/array`);
            this.items = res.data;
            } catch (error) {
            console.log(error);
            }
        },
        async addData(temperature, humidity, timestamp, room, date, time) {
            const res = await axios.post(`http://localhost:3001/array`, {
                roomArea: room,
                temperature: temperature,
                humidity: humidity,
                timestamp: timestamp,
                date: date,
                time: time
            });
            this.items = [...this.items, res.data];
        },
        startSimulation() {
            this.start = true
            this.interval = setInterval(() => {
                let now = new Date(Date.now())
                let date = now.getDate() + '/' + (now.getMonth()+1) + '/' + now.getFullYear()
                let time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
                console.log(date,time)
                this.addData(this.getTemperature(),this.getHumidity(),Date.now(),'roomArea1', date, time)
            },2000)
        },
        stopSimulation() {
            this.start = false
            clearInterval(this.interval)
            this.minTemp = this.getMinTemperature()
            this.maxTemp = this.getMaxTemperature()
            this.avgTemp = this.getAvgTemperature()
            this.medianTemp = this.getMedianTemperature()
            this.minHum = this.getMinHumidity()
            this.maxHum = this.getMaxHumidity()
            this.avgHum = this.getAvgHumidity()
            this.medianHum = this.getMedianHumidity()
        },
        getTotalTemperature() {
            console.log(this.items,'wey')
            let list = []
            this.items.forEach((item) => {
                    list.push(item.temperature) 
            })
            return list
        },
        getTotalHumidity() {
            let list = []
            this.items.forEach((item) => {
                    list.push(item.humidity) 
            })
            return list
        },
        getMinTemperature() {
            let list = this.getTotalTemperature().sort((a,b) => a-b)
            console.log(list,'yoww')
            return list[0]
        },
        getMaxTemperature() {
            let list = this.getTotalTemperature().sort((a,b) => a-b)
            return list[list.length-1]
        },
        getAvgTemperature() {
            const initialValue = 0;
            const sumWithInitial = this.getTotalTemperature().reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            initialValue
            );
            return sumWithInitial/(this.getTotalTemperature().length)
        },
        getMedianTemperature() {
            let list = this.getTotalTemperature().sort((a,b) => a-b)
            if((list.length) % 2 > 0) {
                let position = ((list.length) - 1) / 2  
                return list[position]
            }
            let position = list.length / 2
            return (list[position] + list[position-1]) / 2   
        },
        getMinHumidity() {
            let list = this.getTotalHumidity().sort((a,b) => a-b)
            return list[0]
        },
        getMaxHumidity() {
            let list = this.getTotalHumidity().sort((a,b) => a-b)
            return list[list.length-1]
        },
        getAvgHumidity() {
            const initialValue = 0;
            const sumWithInitial = this.getTotalHumidity().reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            initialValue
            );
            return sumWithInitial/(this.getTotalTemperature().length)
        },
        getMedianHumidity() {
            let list = this.getTotalHumidity().sort((a,b) => a-b)
            if((list.length) % 2 > 0) {
                let position = ((list.length) - 1) / 2  
                return list[position]
            }
            let position = list.length / 2
            return (list[position] + list[position-1]) / 2   
        },
    },
    mounted() {
        this.getData()
    },

}
</script>