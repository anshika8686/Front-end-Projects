let search_box=document.getElementById("search");
let search_btn = document.querySelector(".find_btn"); // selects the first element with class find_btn

search_btn.addEventListener("click",()=>{
  console.log("Button is clicked");
  const city=search_box.value;
  if(city){
    window.location.href=`index7.html?city=${encodeURIComponent(city)}`;
    //encodeURIComponent= remove spaces or any special character in the text
  }else{
    alert(`Not a valid name, Enter a city name`);
  }
});