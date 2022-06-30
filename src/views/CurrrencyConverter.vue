<template>
    <div class="body">
        <h1>Currency Converter</h1>
        <table>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Salary in IDR</th>
                <th>Salary in USD</th>
            </tr>
            <tr v-for="item in list" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.username }}</td>
                <td>{{ item.email }}</td>
                <td>{{ getAddress(item.address) }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.salaryInIDR.toFixed(2) }}</td>
                <td>{{ convertCurrency(item.salaryInIDR).toFixed(2) }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import salaryData from '../json/salary_data.json'
export default {
    data() {
        return {
            list: [],
            salary: salaryData.array,
            currency: 0
        }
    },
    methods: {
        fetchData() {
            fetch("http://jsonplaceholder.typicode.com/users")
            .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            this.list = this.mergeArrays(data,this.salary)
            console.log(this.list)
            })
            .catch(error => {
            this.errorMessage = error;
            console.error("There was an error!", error);
            });
        },
        fetchCurrency(current, convert) {
            const value = current + '_' + convert
            fetch('https://free.currconv.com/api/v7/convert?q='+ value + '&compact=ultra&apiKey=1172ef7ba1c07cc65d4d')
            .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            const [unit] = Object.values(data)
            this.currency = unit

            })
            .catch(error => {
            this.errorMessage = error;
            console.error("There was an error!", error);
            });
        },
        convertCurrency(item) {
            return item * this.currency
        },
        getAddress(item) {
            //get address by combining their details from address object
            return item.street + ', ' + item.suite + ', ' + item.city + ', ' + item.zipcode
        },
        mergeArrays(arr1, arr2) {
            //combine both fetched and local arrays
            let res = [];
            res = arr1.map(obj => {
                const index = arr2.findIndex(el => el["id"] == obj["id"]);
                const { salaryInIDR } = index !== -1 ? arr2[index] : {};
                return {
                    ...obj,
                    salaryInIDR
                };
            });
            return res;
        }
    },
    mounted() {
        this.fetchData()
        this.fetchCurrency('IDR','USD')
    }
}
</script>