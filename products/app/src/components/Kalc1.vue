<template>
  <div id = "app">
      <center>
          <div class="tim">{{year}}</div>
      <table>
          <tr>
              <th>Норма</th>
              <th>Ф.И.О</th>
              <th>Цена в сум</th>
              <th>  Кол-во в кг</th>
              <th>Выполнена в %</th>
              <th>Сумма</th>
              <th>Удалить</th>
          </tr>
          <template>
              <tr v-for="(item, index) in items" :key="index">
                  <td v-if = "item.isNor" @dblclick = "func1(index, 'norma')"> {{item.norma}}кг</td>
                  <td v-if="!item.isNor" class="orn"><input type="number" @keyup.enter="func2(index, 'norma')" v-model="item.norma"> <br> нажмите Enter</td>
                
                  <td v-if="item.isNam" @dblclick="func1(index, 'name')">{{`${index+1}.${item.name}`}}</td>
                  <td v-if="!item.isNam" class="orn"><input type="text" @keyup.enter="func2(index, 'name')" v-model="item.name" ><br>нажмите Enter</td>

                  <td v-if="item.isPric" @dblclick="func1(index, 'price')" >{{item.price}} сум</td>
                  <td v-if="!item.isPric" class="orn"><input type="number" @keyup.enter="func2(index, 'price')" v-model="item.price"><br>нажмите Enter</td>

                  <td v-if="item.isQuant" @dblclick="func1(index, 'quantity')">{{item.quantity}} кг </td>
                  <td v-if="!item.isQuant"  class="orn"><input type="number" @keyup.enter="func2(index, 'quantity')" v-model="item.quantity" ><br>нажмите Enter</td>

                  <td>{{Math.round((item.quantity*100)/item.norma)}}%</td>
                  <td>{{item.price*item.quantity| numFormat}} сум</td>
                  <td><a class="red" href="#" @click.prevent="del(index)">удалить</a></td>
              </tr>
          </template>
      </table>
      <div class="parent" v-if="klg">
      <div class="total1">
          <div class="total1_in">

          <p>ИТОГО:{{klg|numFormat}} кг</p>
          <p>ИТОГО:{{sum|numFormat}} сум</p>
          </div>
      </div>
      <div class="total2">
          Примечание: Для того чтобы изменить норму, ф.и.о, цену, количество дважды нажмите на ячейку.
      </div>
      </div>
      <form>
          <input type="number" v-model="norma" placeholder="норма">
          <input type="text" v-model="name" placeholder="Ф.И.О">
          <input type="number" v-model="price" placeholder="цена ">
          <input type="number" v-model="quantity" placeholder="количество ">
          <button :disabled="norma=='' || name==''|| price==''||quantity==''" type="button" class="btn btn-primary" @click.prevent="add">Добавить</button>
      </form>
        <p :class="{kr1:norma==''||name==''||price==''||quantity=='', kr2:!(norma==''||name==''||price==''||quantity=='')}">
            {{norma==''||name==''||price==''||quantity==''?'заполните всей полей':'теперь нажмите кнопку добавить'}}</p>
      </center>
      <div class="calcs">
      <router-link :to="{name:'calcs'}"> 
          <button class="btn btn-primary">Назад</button>
      </router-link>
      </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
      return {
          items:[],
          norma:'',
          name:'',
          price:'',
          quantity:''
      }
  },
  methods: {
      add(){
          let item = {norma:this.norma, isNor:true, name:this.name, isNam:true,
           price:this.price, isPric:true, quantity:this.quantity, isQuant:true};
          this.items.push(item)
          this.norma = this.name = this.price = this.quantity = '';
      },
      del(index){
          let a = confirm('Хотите удалить?');
          if(a){
              this.items.splice(index, 1)
          }
      },
    func1:function(index, name){
        switch(name){
            case 'norma': this.items[index].isNor = false; break;
            case 'name': this.items[index].isNam = false; break;
            case 'price': this.items[index].isPric = false; break;
            case 'quantity': this.items[index].isQuant = false; break;
        }
    },
    func2:function(index, name){
        switch(name){
            case 'norma': this.items[index].isNor = true; break;
            case 'name': this.items[index].isNam = true; break;
            case 'price': this.items[index].isPric = true; break;
            case 'quantity': this.items[index].isQuant = true; break;
        }
    },      
  },
  computed: {
    sum(){
        let s = 0;
        for(let i of this.items){
            s += Number(i.price * i.quantity)
        }
        return s
    },
    klg(){
        let s = 0;
        for(let i of this.items){
            s += Number(i.quantity)
        }
            return s;
    },
    year(){
        function addZero(num){
            if(num >= 0 && num <= 9){
                return '0' + num
            }
            else{ return num}
        }
        let date = new Date();
        let months = ['Декабрь','Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь'];
        let days = ['Воскресения', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        let year = date.getUTCFullYear()
        let month = date.getMonth()+1
        let data = date.getDate()
        let hours = date.getHours()
        let min = date.getMinutes()
        let sec = date.getSeconds()
        let day = date.getDay()
        return addZero(year) + '-Год, ' + ' ' + addZero(data) + '-' + months[month] + ', День неделя: ' + days[day] + ', ' + addZero(hours) + ':' + addZero(min) + ':' + addZero(sec)
    }  
  },
  filters: {
        numFormat(num){
    let numArr = String(num).split('').reverse();
    let res = [];
    for(let i = 0; i <= Math.ceil(numArr.length / 3) + 1; i ++){
        res.push(numArr.splice(0,3).reverse().join(''));
    }
    let rest = numArr.reverse().join('');
    return [...res, rest].reverse().join(' ');
    }
  }
}
</script>
<style lang = "scss" scoped>
*{
    margin: 5px auto;
    padding: 0;
}
th, td {
    border: 2px outset white;
    padding:10px;
    text-align:center;
    background: rgba(20, 20, 20, 0.808);
    color:white;
    font-size: 15px;
    transition: 0.9s ease-in-out;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
form{
    margin-top: 5px;
}
input{
    margin-right:2px;
    background:rgba(255, 255, 255, 0.795);
    border-radius: 5px;
    text-indent: 10px;
}
button{
    padding:5px 15px;
}
.red{
    color:red;
    text-decoration: none;
}
.total1{
  display: block;
  width: 250px;
  border-radius: 20%;
  background-color: rgba(0, 0, 0, 0.795);
  color: white;
}
.total1_in{
    margin-top: 20px;
}
.total2{
  display: block;
  width: 345px;
  text-align: justify;
 background-color: rgba(0, 0, 0, 0.795);
  color: red;
  font-size: 18px;
  /* padding: 15px 20px 20px 20px; */
  padding:10px 15px;
  border-radius: 20%;
  line-height: 19px;
  
}
.parent{
    display: flex;
    justify-content: space-between;
    width:660px;
}
.orn{
    background: orangered;
}
.tim{
    display: inline-block;
    background: rgb(8, 8, 8);
    color:white;
    padding: 10px 35px;
    font-size: 20px;
    font-family: 'Courier New', Courier, monospace;
    border-radius: 10px;
    margin-bottom: 3px;
}
</style>
