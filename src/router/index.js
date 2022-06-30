import {createRouter, createWebHistory} from 'vue-router'
import CurrrencyConverter from '../views/CurrrencyConverter.vue'
import SensorAggregation from '../views/SensorAggregation.vue'
import SensorAggregationSimulation from '../views/SensorAggregationSimulation.vue'

const routes = [
    {path: '/', name: 'CurrrencyConverter', component: CurrrencyConverter},
    {path: '/sensor-aggregation', name: 'SensorAggregation', component: SensorAggregation},
    {path: '/sensor-aggregation-simulation', name: 'SensorAggregationSimulation', component: SensorAggregationSimulation}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router