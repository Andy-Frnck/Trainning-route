const images = document.getElementsByClassName("item")
const arrayImages =  Array.from(images);

Array.from(images).forEach( (image, index) =>{

  const degPosition = index*36
  image.style.transform = `rotateY(${degPosition}deg)
   translateZ(350px)`
})
