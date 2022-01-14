<template>
    <div class="calcs ">
        <p>Выберите калькулятор</p>
        <div class="main">
        <div>
        <router-link :to="{name:'cal1'}">
            <button  class="btn btn-outline-light">Перейти на первый калькулятор</button>
        </router-link>
        </div>
        <div>
        <router-link :to="{name:'cal2'}">   
            <button class="btn btn-outline-light">Перейти на второй калькулятор</button>
        </router-link>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'calcs'
}
</script>

<style lang="scss" scoped>
*{
    max-width:900px;
    margin:50px auto;
}
p{
    background: rgba(0, 0, 0, 0.589);
    color:white;
    text-align: center;
    display: block;
    padding: 10px 0;
    border-radius: 5px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 20px;
}
.main{
    display: flex;
    justify-content: center;
}
</style>