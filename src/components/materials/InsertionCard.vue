<template>
  <div class="card">
    <img src="../../assets/image/plat.jpeg" alt="Plat" class="card-image" />
    <div class="overlay">Insertion Plat</div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  width: 30vw;
  height: 77vh;
  margin-right: 1vw;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
}

.card:hover img {
  transform: scale(1.1);
}

.overlay {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 255, 34, 0.6);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  font-family: 'Matt_Trial black' !important;
}

.card:hover .overlay 
{
  top: 50%;
  left: 50%;
  background-color: rgb(0, 255, 34 , 0.4);
  transform: translate(-50%, -50%);
  font-size: 5em;
  line-height: 9vh;
  /* background-color: transparent; */
  padding: 10px 20px;
}
</style>
