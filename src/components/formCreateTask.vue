<template>
  <div :class="{'modal-visible': isShowForm}" class="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">{{state ? 'Форма создания' : 'Форма изменения'}}</h3>
          <a @click="closeForm" class="close">×</a>
        </div>
        <div class="modal-body">
          <p class="modal-text">Название</p>
          <input
              v-model="task.title"
              placeholder="Введите название"
              type="text"
          >
          <p class="error-text" v-if="error">Поле является обязательным</p>

          <p>Описание</p>
          <input
              v-model="task.description"
              placeholder="Введите описание"
              type="text"
          >
          <div v-if="state">
            <p>Телефон</p>
            <input type="text" v-model="phone" @input="validatePhone" placeholder="Введите телефон" />
            <p class="error-text" v-if="invalidPhone" style="color: red;">Некорректный номер телефона</p>
          </div>
          <div v-if="!state" class="modal-radio">
            <p>Статус задачи</p>
            <input
                v-model="task.completed"
                :value = true
                class="radio"
                type="radio"
                id='completed'
            >
            <label for='completed'>Выполнено</label>
            <input
                v-model="task.completed"
                class="radio"
                type="radio"
                :value = false
                id="notCompleted"
            >
            <label for='notCompleted'>Не выполнено</label>
          </div>
          <div class="container-btn">
            <button @click="checkValidation()">{{state ? 'Создать' : 'Изменить'}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'formCreateTask',
  props: {
    isShowForm: Boolean,
    state: Boolean,
  },
  data() {
    return {
      task: {
        title: '',
        description: '',
        completed: false
      },
      error:  false,
      phone: '',
      invalidPhone: false
    }
  },
  methods: {
    // Закрытие окна формы
    closeForm() {
      this.$emit('getOpenForm', false);
      this.task.title = ''
      this.task.description = ''
    },
    checkValidation() {
      if (!this.task.title) {
        this.error = true
      } else {
        this.createTask ()
      }
    },
    createTask () {
      if (this.state) {
        this.$emit('crateTask', this.task)
      }
      if (!this.state) {
        this.$emit('updatedTask', this.task)
      }
      this.closeForm()
    },
    //Заполняем инпуты
    changeUser(item) {
      this.task.id = item.id
      this.task.title = item.title
      this.task.description = item.description
      this.task.completed = item.completed
    },
    // Валидация номера телефона, разбиение на 2-3 знака
    validatePhone() {
      const cleanedPhone = this.phone.replace(/\D/g, '')
      if (cleanedPhone.length === 5) {
        const formattedPhone = cleanedPhone.replace(/^(\d{3})(\d{2})$/, '$1-$2');
        this.phone = formattedPhone
        this.invalidPhone = false;
      } else {
        this.invalidPhone = true;
      }
    }
  },
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1050;
  opacity: 0;
  -webkit-transition: opacity 100ms ease-in;
  -moz-transition: opacity 100ms ease-in;
  transition: opacity 100ms ease-in;
  pointer-events: none;
}
.modal-visible {
  opacity: 1;
  pointer-events: auto;
  overflow-y: auto;
}
.modal-dialog {
  position: relative;
  width: auto;
  margin: 10px;
}

.modal-content {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  background-color: #fff;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, .2);
  border-radius: .3rem;
  outline: 0;
}
@media (min-width: 768px) {
  .modal-content {
    -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
    box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
  }
}
.modal-header {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 15px;
}
.modal-title {
  margin-top: 0;
  margin-bottom: 0;
  line-height: 1.5;
  font-size: 1.25rem;
  font-weight: 500;
  width: 100%;
  text-align: center;
}
.close {
  float: right;
  font-family: sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: .5;
  text-decoration: none;
}
.close:focus,
.close:hover {
  color: #000;
  text-decoration: none;
  cursor: pointer;
  opacity: .75;
}
.modal-body {
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 15px;
  overflow: auto;
}

.container-btn button{
  margin: 29px;
  background: blue;
  border: 1px solid blue;
  width: 190px;
  height: 40px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #FFFEFB;
  cursor: pointer;
}
.container-btn button:hover{
  background: #6821dc;
  border: 1px solid white;
}
input{
  background: #FFFEFB;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  width: 90%;
  height: 22px;
  font-size: 13px;
  padding: 0px 7px;
  border: 1px solid rgba(0, 0, 0, 27%);
}
p{
  margin: 15px 26px 2px;
  text-align: left;
  font-size: 13px;
}
.inp-error{
  border: 1px solid #FF8484;
}
.error-text{
  margin: 0 0 0 20px;
  color: #FF8484;
  font-size: 11px;
}
.modal-text:after,
.DOB:after{
  content: '';
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #FF8484;
  position: absolute;
}
.radio, label {
  cursor: pointer;
}
.modal-radio{
  display: flex;
  flex-wrap: wrap;
}
.modal-radio p{
  width: 100%;
  margin-bottom: 15px;
}
.modal-radio input{
  width: 15px;
  height: 15px;
  margin: 0 8px 0 18px;
}
@media (min-width: 576px) {
  .modal-dialog {
    max-width: 500px;
    margin: 80px auto;
  }
}
@media (max-width: 560px) {
  p{
    margin: 15px 14px 2px;
    font-size: 13px;
  }
  input{
    font-size: 14px;
    height: 29px;
  }
  .container-btn button {
    width: 175px;
    height: 35px;
    font-size: 11px;
  }
  .modal-title{
    font-size: 18px;
  }
}
</style>
