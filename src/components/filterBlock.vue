<template>
  <section class="section-filters">
    <div>
      <h2>Фильтрация</h2>
      <div v-if="isVisible" class="block-filters" >
        <div class="block-select">
          <h3>Выберете год</h3>
          <select v-model="selectedYears">
            <option v-for="year of getYears">{{year}}</option>
          </select>
        </div>
        <h3>Выберете статус задачи</h3>
        <div class="block-input">
          <div class="block-input__radio">
            <input id="all"  name="radio" value="all" type="radio" class="radio" v-model="pickedProgress">
            <label for="all">Все задачи</label>
          </div>
          <div class="block-input__radio">
            <input id="completed" name="radio" :value = true type="radio" class="radio" v-model="pickedProgress">
            <label for="completed">Выполненные</label>
          </div>
          <div class="block-input__radio">
            <input id="noCompleted" :value = false name="radio" type="radio" class="radio" v-model="pickedProgress">
            <label for="noCompleted">Не выполненные</label>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import mixin from "@/mixins/mixin";

export default {
  mixins: [mixin],
  name: "filterBlock",
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
    pickedProgress: {
      get () {
        return this.pickedProgress = 'all'
      },
      set (value) {
        this.$emit('getProgress', value)
      }
    },
    selectedYears: {
      get () {
        return this.selectedYears = 'Все'
      },
      set (value) {
        this.$emit('selectYear', value)
      }
    },
    // Поиск всех уникальных годов
    getYears () {
      let str = 'Все'
      let arr = this.allTask.reduce((acc, item) => {
        if (acc.includes(this.getYear(item))) {
          return acc;
        }
        return [...acc, this.getYear(item)];
      }, [])
      arr.sort().unshift(str)
      return arr
    }
  },
  async mounted() {
    await this.getAllTask()
  }
}
</script>

<style scoped>
.section-filters > div:hover .block-filters{
  display: flex;
}
.section-filters{
  display: flex;
  justify-content: right;
  position: relative;
}
.block-filters{
  position: absolute;
  top: 39px;
  right: 0;
  z-index: 1;
  display: none;
  flex-direction: column;
  padding: 20px 20px 40px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin-left: 15px;
  width: 23%;
  background: white;
}
.section-filters > div:hover h2:after {
  transform: translateY(3px) rotate(225deg);
}

h2 {
  text-align: right;
  position: relative;
  font-size: 18px;
  font-weight: 400;
  margin-right: 16px;
  cursor: pointer;
}
h2:after {
  content: '';
  position: absolute;
  top: 28%;
  right: -14px;
  transform: rotate(45deg);
  width: 6px;
  height: 6px;
  border-right: 1px solid;
  border-bottom: 1px solid;
  transition: transform 0.3s;
}

section h3{
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  text-align: left;
}
.radio{
  width: 15px;
  height: 15px;
}
label{
  font-size: 15px;
}
input, label, button {
  cursor: pointer;
}
.block-input__radio{
  margin-top: 8px;
}
.block-input{
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
  flex-direction: column;
  justify-content: left;
  text-align: left;
}
.block-filters > h3 {
  margin-top: 20px;
}
.block-select{
  margin-top: 7px;
  display: flex;
  flex-direction: column;
}
select {
  width: 70%;
  margin-top: 10px;
  border: 1px solid #6821dc;
  border-radius: 4px;
  height: 25px;
}
</style>
