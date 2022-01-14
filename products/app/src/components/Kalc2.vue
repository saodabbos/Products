<template>
    <div class = "product-list">
            <div class = "wrap">
        <div id = "app">
            <div class="wrapper">
            <div class = "left">
            <table>
                <tr>
                    <th>Имя</th>
                    <th>Катигория</th>
                    <th>Стоимость</th>
                </tr>
                <template >
                    <tr v-for = '(item, index) in items' :key="index">
                        <td v-if = 'item.isNam' @click = "editTd(index, 'name')">{{index+1}}. {{item.name}} </td>
                        <td v-if = '!item.isNam' class="orn"> <input type="text" @keydown.enter = "editInp(index, 'name')" v-model='item.name'> <br>нажмите Enter </td>

                        <td v-if = 'item.isCat' @click = "editTd(index, 'category')"> {{item.category}} </td>
                        <td v-if = '!item.isCat' class="orn"> <input type = "text" @keydown.enter="editInp(index, 'category')" v-model='item.category'><br>нажмите Enter</td>

                        <td v-if = 'item.isPric' @click = "editTd(index, 'pric')"> {{item.pric|numFormat}} сум</td>
                        <td v-if = '!item.isPric' class="orn"> <input type = "text" @keydown.enter="editInp(index, 'pric')" v-model='item.pric'><br>нажмите Enter</td>

                    </tr>
                </template>
            </table>
            <div class='sum' v-if='sum'> Сумма: {{sum | numFormat}} сум</div> <br>
            <form action="#">
                <input type = "text" v-model = 'nam' placeholder="имя">
                <input type = "text" v-model = 'categor' placeholder="категория">
                <input type = "number" v-model = 'pric' placeholder="стоимость">
                <button @click.prevent = 'addForm()' class="btn btn-primary" v-bind:disabled="nam==''||categor==''||pric==''">Добавить</button>
            </form>
            <div class="sty">
           <p :class="{kr1:nam==''||categor==''||pric=='', kr2:!(nam==''||categor==''||pric=='')}">
            {{nam==''||categor==''||pric==''?'заполните всей полей':'теперь нажмите кнопку добавить'}}</p>
            </div>
        </div>
            <div class="right">
                    <p>Сегодняшний  покупки. <br>  Для того чтобы узнать цена нажмите на них.</p>
                <ul v-for = '(product, index2) in produkts' :key="index2">
                    <li  @click = 'add(index2)'> {{product.name}} </li>
                </ul>
            </div>
        </div>
    </div>
</div>
<div class="calcs">
    <router-link :to="{name:'calcs'}">
<button class="btn btn-primary" >Назад</button>
    </router-link>
</div>
        
    </div>
</template>

<script>
export default {
    name:'productList',
    data () {
        return {
            nam:'',
            categor:'',
            pric:'',
            produkts:[
                {name:'Абрикос', isNam:true, category:'еда', isCat:true, pric:1000, isPric:true},
                {name:'Авокадо', isNam:true, category:'еда', isCat:true,  pric:45355, isPric:true},
                {name:'Ананас',  isNam:true, category:'еда', isCat:true, pric:65114, isPric:true},
                {name:'Рубашки ', isNam:true, category:'одежда', isCat:true, pric:123667, isPric:true},
                {name:'Футболки', isNam:true,  category:'одежда', isCat:true, pric:54689, isPric:true},
                {name:'Джемперы ', isNam:true,  category:'одежда', isCat:true, pric:661100, isPric:true},
                {name:'Банан', isNam:true, category:'еда', isCat:true, pric:15419, isPric:true},
                {name:'Апельсин', isNam:true, category:'еда', isCat:true, pric:43289, isPric:true},
                {name:'Брюки и джинсы', isNam:true, category:'одежда ', isCat:true, pric:222500, isPric:true},
                       ],
            items:[],
        }
    },
            methods:{
            addForm:function(){
                let item = {name:this.nam, isNam:true, category:this.categor, isCat:true, pric:this.pric, isPric:true};
                this.items.push(item);
                this.nam = this.pric = this.categor = '';
            },
            add:function(index2){
                let item = {name:this.produkts[index2].name, isNam:true, category:this.produkts[index2].category, isCat:true, pric:this.produkts[index2].pric, isPric:true};
                this.items.push(item);
            },
            editTd:function(index, name){
                switch(name){
                    case 'name': this.items[index].isNam = false; break;
                    case 'category': this.items[index].isCat = false; break;
                    case 'pric': this.items[index].isPric = false; break;
                }
            },
            editInp:function(index, name){
                switch(name){
                    case 'name': this.items[index].isNam = true; break;
                    case 'category': this.items[index].isCat = true; break;
                    case 'pric': this.items[index].isPric = true; break;
                }
            },
        },
        computed:{
            sum:function(){
                let s = 0;
                for(let item of this.items){
                    s += Number(item.pric)
                }
                return s;
            }
        },
        filters:{
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
<style lang="scss" scoped>
.wrap {
  display: block;
  width: 900px;
  margin:0 auto;
  margin: 30px auto;
}
td,
th {  border: 2px outset white;
    padding:10px;
    text-align:center;
    background: rgba(20, 20, 20, 0.808);
    color:white;
    font-size: 15px;
    transition: 0.9s ease-in-out;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.wrapper {
  display: flex;
  justify-content: space-around;
}
.right {
  width: 200px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  p{
      background: rgb(3, 73, 26);
      padding: 5px;
      text-align: center;
      border-radius: 5px;
      color: rgba(255, 255, 255, 0.678);
  }
}
ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
li {
    display: block;
  border: 1px solid blue;
  font-size: 15px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  padding: 5px;
  text-align: center;
  margin-top:1px;
  color:rgba(247, 233, 233, 0.616);
  background: rgba(0, 4, 255, 0.582);
&:hover {
    background-color: blue;
  color: white;
  cursor: pointer;
}
    }
}
.sum{
    display: inline-block;
    font-size: 15px;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; 
    background: rgba(26, 25, 25, 0.849);
    color:rgba(255, 255, 255, 0.849);
    padding:15px;
    margin:10px 0px 10px 0px;
    border-radius: 10px;
}
input{
    margin-right:3px;
    border-radius: 5px;
    text-indent: 10px;
}
.orn{
    background: orangered;
}
.sty{
    display: block;
    text-align: center;
}
</style>
