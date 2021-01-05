<script>
// CommitChart.js
import { Bar } from 'vue-chartjs'
 
export default {
  extends: Bar,
  props:{
      labels:Array,
      data:Array,
      label:String
  },
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: this.label,
          backgroundColor: '#f87979',
          data: this.data
        }
      ]
    })
  }
}
</script>