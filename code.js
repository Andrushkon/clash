const menu=document.getElementById("menu")
const game=document.getElementById("game")
const music=new Audio("music.mp3")
music.loop=true
music.load()
music.play()
let towers
createMenu()

function createMenu(){
menu.innerHTML=`
<div id="title">CLASH IN CLASS</div>
<button id="playbtn">JUGAR</button>
`
document.getElementById("playbtn").onclick=function(){
    startgame()
}
}
function createTowers(color){
    const container=document.getElementById("gamecontainer")
    let myArray=[]
    myArray.push(createking())
    let mytowers=createprincesstowers()
    myArray.push(mytowers[0])
    myArray.push(mytowers[1])
    towers.push(myArray)
    function createcannon(e){
        let newcannon=document.createElement("img")
        newcannon=e.appendChild(newcannon)
        newcannon.src="cannon.png"
        newcannon.className="cannon"
        if (color){
            newcannon.style.transform=`rotateZ(-88deg)`
        }else{
            newcannon.style.transform=`rotateZ(92deg)`
        }
        return newcannon
    }
    function createking(){
        let rey=document.createElement("div")
        rey=container.appendChild(rey)
        rey.className="tower"
        rey.style.left="50%"
        if (color){
            rey.style.backgroundImage=`url("redtower.png")`
            rey.style.top="10%"
        }else{
            rey.style.backgroundImage=`url("bluetower.png")`
            rey.style.top="90%"
        }
        return [rey,createcannon(rey)]
    }
    function createprincesstowers(){
        let princesstowers=[document.createElement("div"),document.createElement("div")]
        for (let index = 0; index < princesstowers.length; index++) {
        let tower=container.appendChild(princesstowers[index])
        tower.className="tower"
        if (index==0){
        tower.style.left="20%"
        }else{
        tower.style.left="80%"
        }
        if (color){
        princesstowers[index].style.top="15%"
        princesstowers[index].style.backgroundImage=`url("redtower.png")`
        princesstowers[index].classList.add("redprincess")    
        }else{
        princesstowers[index].style.top="85%"
        princesstowers[index].style.backgroundImage=`url("bluetower.png")`
        princesstowers[index].classList.add("blueprincess")
        }
        princesstowers[index]=[tower,createcannon(tower)]
    }
    return princesstowers
    }
    
}
function createTiles(){
    let x=0
    let y=0
    let container=document.createElement("div")
    container=game.appendChild(container)
    container.id="gamecontainer"
    for (let index = 0; index < 13*19+9; index++) {
        let newtile=document.createElement("div")
        newtile=container.appendChild(newtile)
        newtile.className="tile"
        newtile.style.left=x+"%"
        newtile.style.top=y+"%"
        x+=6.25
        if (x>99){
        x=0
        y+=6.25
        }
    }
    createTowers(false)
    createTowers(true)
    
}
function createcarddeck(){

}
function startgame(){
towers=[]
menu.innerHTML=` `
createTiles()
createcarddeck()

}
function consolelog(something){
    document.getElementById("consola").innerText=something
}