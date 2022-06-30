<template>
  <div class="container">
    <Line :chart-data="chartData" />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement} from 'chart.js'
import axios from "axios";

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, CategoryScale)

export default {
  name: 'LineChart',
  components: { Line },
  props: ['items'],
  data() {
    return {
        loaded: false,
        dataY: [],
        chartData: {
            labels: [],
            datasets: [
                {
                    label: 'Temperature',
                    backgroundColor: '#f87979',
                    data: []
                }
            ]
      }
    }
  },

  watch: {
    items(val) {
      this.chartData.labels = []
      this.dataY = []
      this.items.map((item) => {
            this.chartData.labels.push(item.date + ',' + item.time)
            this.dataY.push(item.temperature)
        })
        this.chartData.datasets[0].data = this.dataY
    }
    
  },
}
</script>