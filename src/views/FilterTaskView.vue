<template>
  <article class="container">
    <nav>
      <router-link :to="{name: 'home'}">🠔 На главную страницу</router-link>
    </nav>
      <filter-block
          @getProgress="getProgress"
          @selectYear="selectYear"
      />
    <transition>
    <section v-if="isVisible" class="section-table">
      <h3 v-if="allTask.length === 0">Список задач пуст, добавьте их <router-link style="color: blue" :to="{name: 'home'}">на главной странице</router-link></h3>
        <table v-else>
          <tr><th v-for="title in titleTask.slice(0, 3)">{{ title }}</th></tr>
          <tr v-for="task in taskFiltering" :key="task.id">
            <td>{{task.title}}</td>
            <td class="block__text-td">{{task.description}}</td>
            <td>{{task.date}}</td>
          </tr>
        </table>
    </section>
    </transition>
  </article>
</template>

<script>
import mixin from "@/mixins/mixin";
import FilterBlock from "@/components/filterBlock.vue";
export default {
  components: {FilterBlock},
  mixins: [mixin],
  name: "FilterTaskView",
  data () {
    return {
      isFiltersShow: false,
      pickedProgress: 'all',
      selectedYears: 'Все',
      filteredTasks: null
    }
  },
  methods: {
    // Записываем данные из дочернего компонента
    getProgress (data) {
      this.pickedProgress = data
    },
    selectYear (data) {
      this.selectedYears = data
    }
  },
  computed: {
    // Сортировка задач
    taskFiltering () {
      if (this.pickedProgress === 'all' && this.selectedYears === 'Все') {
        this.filteredTasks = this.allTask
      }
      else if (this.pickedProgress !== 'all' && this.selectedYears === 'Все') {
        this.filteredTasks = this.allTask.filter(task => {
          return task.completed === this.pickedProgress
        })
      }
      else if (this.pickedProgress === 'all' && this.selectedYears !== 'Все') {
        this.filteredTasks = this.allTask.filter(task => {
          return this.getYear(task) === this.selectedYears
        })
      }
      else if (this.pickedProgress !== 'all' && this.selectedYears !== 'Все') {
        this.filteredTasks = this.allTask.filter(task => {
          return task.completed === this.pickedProgress
        })
        this.filteredTasks = this.filteredTasks.filter(task => {
          return this.getYear(task) === this.selectedYears
        })
      }
      return this.filteredTasks
    },

  },
  async mounted() {
    await this.getAllTask()
  }
}
</script>

<style scoped>
th, td {
  padding: 6px;
  width: 20%;
}
table{
  margin: 0;
  width: 100%;
  transition: width 1s cubic-bezier(0, 0, 1, 1) 500ms;
}
.container{
  margin: auto 15%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
nav{
  text-align: left;
}

.section-table{
  z-index: 0;
}
.block__text-td {
  text-align: left;
}
</style>
