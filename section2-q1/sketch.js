// 小手調べ
function setup()
{
  createCanvas(200,200);
noFill();
  for(let i = 0; i < 10; i++){
    // BLANK[1]
    if(i<5)
    {
      stroke(0,0,255);
    }
else {
  stroke(255,0,0);
}
ellipse(width/2,height/2, width/(2*10)*(i+1));
}
}
