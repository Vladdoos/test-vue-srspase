<template>
  <nav>
    <router-link :to="{name: 'filterTask'}">Фильтр ➔</router-link>
  </nav>
  <h1>Список задач</h1>
  <transition>
    <div v-if="isVisible" class="home">
      <form-create-task
          ref="component"
          :isShowForm="formVisible"
          :state="state"
          @getOpenForm="getDataForm"
          @crateTask="crateTask"
          @updatedTask="updatedTasks"
      />
      <h1 v-if="allTask.length === 0">пуст</h1>
      <table v-else>
        <tr><th v-for="title in titleTask">{{ title }}</th></tr>
        <tr :class="{'completed' : task.completed}" class="block__text" v-for="(task, index) in allTask" :key="task.id">
          <td>{{task.title}}</td>
          <td class="block__text-td">{{task.description}}</td>
          <td>{{task.date}}</td>
          <td>
            <input
                v-model="task.completed"
                class="checkbox"
                type="checkbox"
                @change="updatedTasks(task)"
                :id="index"
            >
            <label :for= "index"> {{task.completed ? 'выполнено' : 'не выполнено'}}</label>
          </td>
          <td class="btn-section">
            <button @click="openForm(false); $refs.component.changeUser(task)" class="btn__change">Изменить</button>
            <button @click="deleteTask(task)" class="btn__delete">Удалить</button>
          </td>
        </tr>
      </table>
      <button @click="openForm(true)" class="btn__add">Добавить</button>
    </div>
  </transition>
</template>

<script>

import FormCreateTask from '@/components/formCreateTask.vue'
import mixin from "@/mixins/mixin";

export default {
  mixins: [mixin],
  name: 'HomeView',
  components: { FormCreateTask },
  data () {
    return {
      formVisible: false,
      state: null,
    }
  },
  methods: {
    // Открытие формы для создания
    openForm (boolean) {
      this.formVisible = true
      this.state = boolean
    },
    // Получение данных о форме
    getDataForm (data) {
      this.formVisible = data
    },
    // Создание задачи
    async crateTask (data) {
      let date = new Date()
      await fetch('http://localhost:3000/tasks', {
        body: JSON.stringify({
          id: Math.max.apply(this.allTask.map((item) => {
            return item
          })),
          title: data.title,
          description: data.description,
          date: `${this.checkDate(date.getDate())}.${this.checkDate(date.getMonth() + 1)}.${date.getFullYear()}`,
          completed: false
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
      await this.getAllTask()
    },
    // Форматирование даты
    checkDate(val) {
      if (+val < 10) return '0' + val;
      return val;
    },
    // Удаление задачи
    async deleteTask (item) {
      await fetch(`http://localhost:3000/tasks/${item.id}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      })
      await this.getAllTask()
    },
    // Обновление задачи
    async updatedTasks (data) {
      await fetch(`http://localhost:3000/tasks/${data.id}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          completed: data.completed
        }),
        method: 'PATCH'
      })
      await this.getAllTask()
    }
  },
  async mounted () {
    await this.getAllTask()
  }
}
</script>

<style scoped>
table {
  padding: 0 2% 0 17%;
  margin: auto;
}

td, th {
  padding: 6px;
  width: 20%;
}
nav{
  padding-left: 17%;
  text-align: left;
  margin: auto;
}
.btn__add{
  margin-top: 10px;
  background: blue;
  border: 1px solid blue;
  width: 180px;
  height: 32px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #FFFEFB;
}
.btn__add:hover{
  background: #6821dc;
  border: 1px solid white;
}
.btn-section{
  border: none;
  padding: 2px;
  opacity: 0;
  width: 200px;
}
.block__text:hover .btn-section{
  opacity: 1;
}
.btn-section button{
  width: 100px;
  height: 27px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: white;
}
.btn__change{
  background: green;
  border: 1px solid green;
}
.btn__change:hover{
  background: white;
  border: 1px solid green;
  color: green;
}
.btn__delete{
  background: red;
  border: 1px solid red;
}
.btn__delete:hover{
  background: white;
  border: 1px solid red;
  color: red;
}
.checkbox{
  width: 15px;
  height: 15px;
}
input, label, button {
  cursor: pointer;
}
.completed td{
  background: #a6edf35e;
}
.completed td:last-child{
  background: white;
}
.block__text-td {
  text-align: left;
}
</style>
