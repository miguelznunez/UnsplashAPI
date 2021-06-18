const input = document.getElementById("input");
const list = document.getElementsByClassName("grid")[0];

window.addEventListener('load', dayNightMode);

input.addEventListener("keydown", function(event) {
  if (event.key == "Enter")
    loadImg();
});

function loadImg(){

  removeImages();
  //YOUR API KEY GOES HERE client_id=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx;
  const url = 'https://api.unsplash.com/search/photos?query='+input.value+'&per_page=9&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';

  fetch(url)

  .then(response => {
      if(response.ok)
        return response.json();
      else
        console.log(response.status);
  })

  .then(data => { 
    createImagesArray(data);
  });    
}

function createImagesArray(data){
  const imageNodes = [];
  for(let i = 0;i < data.results.length;i++){
    imageNodes[i] = document.createElement("div");
    imageNodes[i].className = "img";
    imageNodes[i].style.backgroundImage = "url("+data.results[i].urls.raw + "&w=1366&h=768" +")";
    imageNodes[i].addEventListener("dblclick", function(){
      window.open(data.results[i].links.download, '_blank');
    })
    list.appendChild(imageNodes[i]);
  }
}

function removeImages(){
  list.innerHTML = '';
}

function dayNightMode(){
  const date = new Date();
  const hour = date.getHours();

  if(hour >= 7 && hour < 19){
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
  }
  else{
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
  }
}
