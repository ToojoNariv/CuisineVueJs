<template>
    <div class="card2">
      <img src="../../assets/image/ingredient.jpg" alt="Ingredient" class="card-image" />
      <div class="overlay">Insertion Ingredient</div>
    </div>
  </template>
  
  <style scoped>
  .card2 {
    position: relative;
    width: 25vw;
    height: 95vh;
    margin-right: 1vw;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .card2 img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease-in-out;
  }
  
  .card2:hover img {
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
  
  .card2:hover .overlay 
  {
    top: 50%;
    left: 50%;
    background-color: rgb(0, 255, 34 , 0.4);
    transform: translate(-50%, -50%);
    font-size: 4em;
    line-height: 9vh;
    /* background-color: transparent; */
    padding: 10px 20px;
  }
  </style>
  