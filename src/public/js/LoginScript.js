const wrapper = document.getElementById("tiles");

let columns = 0,
    rows = 0,
    toggled = false;

const toggle = () => {
  toggled = !toggled;
  
  document.body.classList.toggle("toggled");
}

const handleOnClick = index => {
  toggle();
  
  anime({
    targets: ".tile",
    opacity: toggled ? 0 : 1,
    delay: anime.stagger(50, {
      grid: [columns, rows],
      from: index
    })
  });
}

const createTile = index => {
  const tile = document.createElement("div");
  
  tile.classList.add("tile");
  
  tile.style.opacity = toggled ? 0 : 1;
  
  tile.onclick = e => handleOnClick(index);
  
  return tile;
}

const createTiles = quantity => {
  Array.from(Array(quantity)).map((tile, index) => {
    wrapper.appendChild(createTile(index));
  });
}

const createGrid = () => {
  wrapper.innerHTML = "";
  
  const size = document.body.clientWidth > 800 ? 100 : 50;
  
  columns = Math.floor(document.body.clientWidth / size);
  rows = Math.floor(document.body.clientHeight / size);
  
  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);
  
  createTiles(columns * rows);
}

createGrid();

window.onresize = () => createGrid();

const labels = document.querySelectorAll('.formdiv label')
labels.forEach(label =>{
  label.innerHTML = label.innerText
  .split('')
  .map((letter, index)=> `<span style="transition-delay:${index * 30}ms">${letter}</span>`)
  .join('')
})


function DoAnimation(){
  var targetform = document.getElementById("logindiv");
  targetform.className = "dissapear";
  document.getElementById("logindiv").disabled = true;
  document.getElementById('logindiv').readOnly = true;
  var targetregister = document.getElementById("registerdiv");
  document.getElementById("registerdiv").disabled = false;
  document.getElementById('registerdiv').readOnly = false;
  targetregister.className = "appear centered";
}

function DoAnimationOut(){
  var targetregister = document.getElementById("registerdiv");
  document.getElementById("registerdiv").disabled = true;
  document.getElementById('registerdiv').readOnly = true;
  targetregister.className = "dissapear";

  var targetform = document.getElementById("logindiv");
  targetform.className = "appear centered";
  document.getElementById("logindiv").disabled = false;
  document.getElementById('logindiv').readOnly = false;
  
}

function OnLoadPage(){
  var targetregister = document.getElementById("registerdiv");
  targetregister.className = "hidden";
  document.getElementById("registerdiv").disabled = true;
  document.getElementById('registerdiv').readOnly = true;
}
