const myaudio = document.getElementById("audio")
const canva = document.getElementById("canva")
const btnPlay =document.getElementById("btn-play")
const iconPlay =document.getElementById("icon-play")
const iconPause =document.getElementById("icon-pause")
const ctx = canva.getContext("2d")
var analyser,source
var animation


window.addEventListener("load", ()=>{
    iniciar()
    btnPlay.onclick=()=>reproducir()
    myaudio.onpause=()=>window.cancelAnimationFrame(animation)
    drawLove(21)
}, false)
function iniciar(){
    myaudio.addEventListener('timeupdate',function(){
        document.getElementById('progreso').style.width = (this.currentTime * 100 / this.duration)+'%';
    });
}
function reproducir(){
   
    if(!myaudio.paused){
        myaudio.pause() 
        iconPlay.style.display="block";
        iconPause.style.display="none";      
    }else{
        myaudio.play()
        iconPlay.style.display="none";
        iconPause.style.display="block";
    }
}
myaudio.onplay  =function(){
    var audioCtx = new AudioContext(); 
    
  
   
    if(!source){
        source = audioCtx.createMediaElementSource(myaudio)
        analyser = audioCtx.createAnalyser();
        source.connect(analyser)
        analyser.connect(audioCtx.destination)
    }
    
    frameLopper()
    // drawLove(7*5*3)
}
// function frameLopper(){
//      window.requestAnimationFrame(frameLopper)
//     // console.log(2);
//     var bufferLength = analyser.frequencyBinCount;
//     var dataArray = new Uint8Array(bufferLength);
//     analyser.getByteTimeDomainData(dataArray);
//     ctx.clearRect(0,0,canva.width,canva.height)
//         ctx.fillStyle="#fffff"
//         let x,w,h
//     for(var i = 0; i < 16 ; i++) {
//         // console.log(dataArray[i]);
//         x=i*3
//         w=2
//         h=-(dataArray[i]/2)
//         // console.log(h);
//         ctx.fillRect(x,canva.height,w,h)


//       }
// }
function frameLopper(){
    animation=window.requestAnimationFrame(frameLopper)
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);
    drawLove(21,dataArray)
    
}

function drawLove(lines, dataArray){
    
    
    let height = canva.height
    let width = canva.width
    let unit = height/lines
    let x=unit 
    let y=unit*Math.floor(lines/2);
    let w = unit
    let h =2*unit
    let aux=0
    
    ctx.clearRect(0,0,width,height)
    for(let i=0; i<lines;i++){
        ctx.fillStyle="#2d2d2d";
        ctx.fillRect(x,y,w,-h) 
        if(dataArray){
            ctx.fillStyle="#FF0000";
            aux=((dataArray[i])/256)*h
            ctx.fillRect(x,y,w,-aux)
        }
        
        x+=2*unit // desplazarse a la derecha
        if(i<Math.floor(lines/2)){
            y+=unit //moverse hacia abajo
            if(i<Math.floor(lines/4)){
                // console.log({h,aux,n});
                h+=2*unit
            }
            
        }        
        else {
            y-=unit //desplazar la barra hacia arriba 
            if (i>Math.floor(3*lines/4-1)){
                h-=2*unit
            }
        }
    }

}