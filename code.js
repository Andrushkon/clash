/*
Cardindex:
0:Name
1:Type of card(0:Troop,1:Spell,2:building)
2:speed
3:attack:
    troop:damage,health
    spell:radius,damage,effect(0:atturd,1:fire,explosive,2:freeze),color,time in floor
    building:troop
4:image
5:esence cost

Towerindex:
0:Blue King:
    0:King:
        0:tower
        1:cannon
        2:health
    1:Left princess
    2:Right princess
1:Red King

Troop index:
0:Card
1:HTML Element
2:King
3:x
4:y
5:health
*/
const menu=document.getElementById("menu")
const game=document.getElementById("game")
const music=new Audio("music.mp3")
const cards=[
["RAYO SALVAGE",1,0.5,[10,300,0,"rgba(77, 255, 234,0.7)",0.5],"lightning.png",4],
["Zeus",0,0.005,[0.1,1500],"zeus.png",4]]
const fps=60
const deltatime=1000/fps
music.loop=true
music.play()
createMenu()

function createMenu(){
game.innerHTML=" "
menu.innerHTML=`
<div id="title">CLASH IN CLASS</div>
<button id="playbtn">JUGAR</button>
`
document.getElementById("playbtn").onclick=function(){
    startgame(createRandomDeck(),0)
}
function createRandomDeck(){
    let myArray=[]
    for (let index = 0; index < 8; index++) {
        myArray.push(createRandomInt(cards.length-1,0))        
    }
    return myArray
}   
}
function startgame(deck,towerlevel){
let towers=[]
let troops=[]
let container
menu.innerHTML=` `
let totalesence=5
let time=[2,30]
let cardorder=[]
createTiles()
createcarddeck()
createEsencebar()
addTime()
Mainloop()
function Mainloop(){
    aumentEsence()
    moveTroops()
    setTimeout(() => {
    Mainloop()    
    }, deltatime);
}
function createTowers(color){
    let myArray=[]
    myArray.push(createking())
    let mytowers=createprincesstowers()
    myArray.push(mytowers[0])
    myArray.push(mytowers[1])
    towers.push(myArray)
    function createhealthbar(e){
        let newhealthbar=document.createElement("div")
        newhealthbar=e.appendChild(newhealthbar)
        newhealthbar.className="healthbar"
        let newhealth=document.createElement("div")
        newhealth=newhealthbar.appendChild(newhealth)
        newhealth.className="health"
        if (color){
            newhealth.style.backgroundColor="var(--red)"
            newhealthbar.style.top="-5%"
        }else{
            newhealth.style.backgroundColor="var(--blue)"
            newhealthbar.style.top="100%"
        }
        if (e.style.left=="50%"){
            newhealth.innerText=3000+(towerlevel*200)
        }else{
            newhealth.innerText=1500+(towerlevel*150)
        }
        return newhealth
    }
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
        return [rey,createcannon(rey),createhealthbar(rey)]
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
        princesstowers[index]=[tower,createcannon(tower),createhealthbar(tower)]
    }
    return princesstowers
    }
    
}
function createTiles(){
    let x=0
    let y=0
    container=document.createElement("div")
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
        let mydeck=document.createElement("div")
        mydeck=game.appendChild(mydeck)
        mydeck.id="carddeck"
        for (let i = 0; i < 8; i++) {
            let newcard=null
            while (newcard==null){
            newcard=createRandomInt(deck.length-1,0)
            if (cardorder.includes(newcard)){
                newcard=null
            }else{
                cardorder.push(newcard)
            }
            }
        }
        for (let index = 0; index < 4; index++) {
            createCard(cards[deck[cardorder[index]]],index)
            
        }
}
function createCard(card,i){
    let newcard=document.createElement("div")
    let mydeck=document.getElementById("carddeck")
    newcard=mydeck.appendChild(newcard)
    newcard.className="card"
    newcard.style.left="50%"
    newcard.style.top=15+i*22+"%"
    newcard.style.backgroundImage=`url(${card[4]})`
    cardorder[i]=[newcard,cardorder[i]]
    newcard.onclick=function(){
    if (totalesence>card[5]){
        selectcard(newcard,card,i)
    }
    }
}
function createEsencebar(){
    let newesencebar=document.createElement("div")
    newesencebar=game.appendChild(newesencebar)
    newesencebar.id="esencebar"
    let newesence=document.createElement("div")
    newesence=newesencebar.appendChild(newesence)
    newesence.id="totalesence"
    aumentEsence()
}
function aumentEsence(){
    totalesence+=0.5*(deltatime/1000)
    if (totalesence>10){
        totalesence=10
    }
    let esenceelement=document.getElementById("totalesence")
    esenceelement.style.height=totalesence*10+"%"
    esenceelement.style.top=100-(totalesence*5)+"%"
    for (let index = 0; index < cardorder.length/2; index++) {
        const card=cards[deck[cardorder[index][1]]]
        const cardelement=cardorder[index][0]
        if (card[5]>totalesence){
            cardelement.style.filter="grayscale(100%)"
            
        }else{
            cardelement.style.filter="grayscale(0%)"
        }
        
    }
}
function selectcard(e,card,i){
    let prev=document.getElementsByClassName("selected")[0]
    if (prev!=null){
        prev.classList.remove("selected")
    }
    e.classList.add("selected")
    let tiles=document.getElementsByClassName("tile")
    for (let index = 0; index < tiles.length; index++) {
        tiles[index].onmouseover=undefined
        if (card[1]==1){
        tiles[index].onmouseover=function(){
            over(tiles[index])
        }
        function over(t){
        createSpellArea(card,t,e)
        }
        }else{
            tiles[index].onclick=function(){
                for (let index = 0; index < tiles.length; index++) {
                    tiles[index].onclick=undefined
                    
                }
                totalesence-=card[5]
                createTroop(card,tiles[index],1)
                changecard()
            }
        }
        
    }
    function changecard(){
        let usedcard=cardorder.splice(i,1)
        cardorder.push(usedcard[0][1])
        let newcard=cardorder.splice(3,1)
        cardorder.splice(i,0,newcard)
        e.remove()
        createCard(cards[deck[cardorder[i]]],i)
    }
    function createSpellArea(card,t,e){

        let oldarea=document.getElementsByClassName("area")[0]
        if (oldarea!=null){
            oldarea.remove()
        }
        let newArea=document.createElement("div")
        newArea=container.appendChild(newArea)
        newArea.className="area"
        let radius=card[3][0]
        newArea.style.width=radius*2+"%"
        newArea.style.height=radius*2+"%"
        newArea.style.left=parseFloat(t.style.left)+3.125+"%"
        newArea.style.top=parseFloat(t.style.top)+3.125+"%"
        t.onmouseup=function(){
            drop()
        }
        t.ontouchend=function(){
            drop()
        }
        function drop(){
            t.onmouseup=undefined
            t.ontouchend=undefined
            dropSpell(card,newArea,1)
            changecard(i,e)
        }
    }
    function dropSpell(card,a,k){
        totalesence-=card[5]
        for (let index = 0; index < tiles.length; index++) {
            tiles[index].onmouseover=undefined
        }
        let newspell=document.createElement("div")
        newspell=container.appendChild(newspell)
        newspell.className="spell"
        newspell.style.top=a.style.top
        newspell.style.left=a.style.left
        a.remove()
        let color=card[3][3]
        newspell.style.background=`radial-gradient(circle, ${color} 0%, rgba(111,111,111,0) 80%),url('potion.png') no-repeat center/contain`
        let y=-6
        newspell.style.transform=`translateY(${y}vh)`
        let ms=card[2]*1000
        for (let index = 0; index < ms; index+=deltatime) {
            setTimeout(() => {
                y=y-(-12*(deltatime/1000))
                newspell.style.transform=`translateY(${y}vh)`
                if (index+deltatime>ms){
                    doSpell(card,newspell,k)
                }
            }, deltatime+index);
            
        }
    }
    function doSpell(card,s,k){
        let x=parseFloat(s.style.left)
        let y=parseFloat(s.style.top)
        let radius=card[3][0]
        s.remove()
        let newspell=document.createElement("div")
        newspell=container.appendChild(newspell)
        newspell.className="spell"
        newspell.style.backgroundColor=card[3][3]
        newspell.style.left=x+"%"
        newspell.style.top=y+"%"
        newspell.style.width=radius*2+"%"
        newspell.style.height=radius*2+"%"
        for (let index = 0; index < towers[k].length; index++) {
            let tower=towers[k][index][0]
            let towerx=parseFloat(tower.style.left)
            let towery=parseFloat(tower.style.top)
            if (checkcollisions(x+radius,y-radius,towerx,towery,radius*2,18.75,false)){
                damageTowers(k,index,card[3][1])
            }
        
            
        }
        setTimeout(function(){
            newspell.remove()
        },card[3][4]*1000)

    }
}
function damageTowers(k,index,d){
    let tower=towers[k][index]
    let healthbar=tower[2]
    let health=parseInt(healthbar.innerText)
    health-=d
    healthbar.innerText=Math.round(health)
    let maxhealth=1500+((index==0)*1500)
    healthbar.style.width=100*(health/maxhealth)+"%"
    if (health<1){
        tower[0].remove()
        towers[k].splice(index,1)
        if (index==0){
            createMenu()
        }
    }
}
function createTroop(card,t,k){
    let newtroop=document.createElement("div")
    newtroop=container.appendChild(newtroop)
    newtroop.className="troop"
    if (k){
        newtroop.style.backgroundColor="var(--blue)"
    }else{
        newtroop.style.backgroundColor="var(--red)"
    }
    let x=parseFloat(t.style.left)+3.125
    let y=parseFloat(t.style.top)+3.125
    newtroop.style.top=y+"%"
    newtroop.style.left=x+"%"
    newtroop.innerHTML=`
    <div class="eyes"></div>
    <div class="eyes" style="left: 75%;"></div>
    `
    let newaccesory=document.createElement("div")
    newaccesory=newtroop.appendChild(newaccesory)
    newaccesory.className="accesory"
    if (card[0]=="Zeus"){
        newaccesory.style.backgroundImage=`url("zeushair.png")`
    }
    troops.push([card,newtroop,k,x,y,card[3][3]])
}
function addTime(){
    let newtimeelement=document.createElement("div")
    newtimeelement=game.appendChild(newtimeelement)
    newtimeelement.id="time"
    removeOneSecond()
    function removeOneSecond(){
        time[1]--
        if (time[1]<0){
            time[0]--
            time[1]=59
            if (time[0]<0){
                createMenu()
            }
        }
        let timedisplay=[time[0],time[1]]
        for (let index = 0; index < timedisplay.length; index++) {
            if (String(timedisplay[index]).length==1){
                timedisplay[index]="0"+timedisplay[index]
            }
        }
        newtimeelement.innerText=`${timedisplay[0]}:${timedisplay[1]}`
        setTimeout(() => {
            removeOneSecond()
        }, 1000);
    }
}
function checkcollisions(x1,y1,x2,y2,w1,w2,type){
    if (type){
        if (x1<x2+w2 && x2<x1+w1 && y1<y2+w2 && y2<y1+w1){
            return true
        }
        else{
            return false
        }
    }else{
        const closestX = Math.max(x2, Math.min(x1, x2 + w2));
        const closestY = Math.max(y2, Math.min(y1, y2 + w2));
        return checkdistancebetween(x1,closestX,y2,closestY) <= w1/2;
}
}
function checkdistancebetween(x1,x2,y1,y2){
    const dx=x1-x2
    const dy=y1-y2
    const distance=Math.sqrt(dx*dx+dy*dy)
    return distance
}
function moveTroops(){
    for (let index = 0; index < troops.length; index++) {
        const mytroop=troops[index]
        let card=mytroop[0]
        let e=mytroop[1]
        let k=mytroop[2]
        let x=mytroop[3]
        let y=mytroop[4]
        let health=mytroop[5]
        let nearest=10000
        let following
        findnearest()
        function findnearest(){
        for (let idx = 0; idx < troops.length; idx++) {
            if (index!=idx){
            const troop2=troops[idx]
            if (!troop2[2]){
            const troopx=troop2[3]
            const troopy=troop2[4]
            const distance=checkdistancebetween(x,troopx,y,troopy)
            if (distance<nearest[2]){
                nearest=distance
                following=[troop2[0],troop2[1],troop2[2],troopx,troopy,idx]
            }
            }
            }
        }
        for (let i = 0; i < towers[k].length; i++) {
            const tower=towers[k][i]
            const towerx=parseFloat(tower[0].style.left)
            const towery=parseFloat(tower[0].style.top)
            const distance=checkdistancebetween(x,towerx,y,towery)
            if (distance<nearest){
                nearest=distance
                following=[i,tower[0],k,towerx,towery,parseFloat(tower[2].innerText)]
            }
        }
        }
        const dx=following[3]-x
        const dy=following[4]-y
        const angle=Math.atan2(dy,dx)*180/ Math.PI
        e.style.rotate=`0 0 1 ${angle+90}deg`
        const movex=Math.cos(angle * Math.PI / 180)*deltatime*card[2]
        const movey=Math.sin(angle * Math.PI / 180)*deltatime*card[2]
        x+=movex
        y+=movey
        let ewidth
        if (following[1].classList.contains("tower")){
            ewidth=18.75
        }else{
            ewidth=6.25
        }
        if (checkcollisions(x-3.125,y-3.125,following[3]-ewidth/2,following[4]-ewidth/2,6.25,ewidth,true)){
            if (following[1].classList.contains("tower")){
                damageTowers(k,following[0],card[3][0]*deltatime)
            }else{
                troops[following[5]][5]-=card[3][0]
                if (troops[following[5]][5]<1){
                    elimtroop()
                }
            }
        }
        e.style.left=x+"%"
        e.style.top=y+"%"
        troops[index]=[card,e,k,x,y,health]
    }
}
}
function createRandomInt(max,min){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function consolelog(something){
    document.getElementById("consola").innerText=something
}
