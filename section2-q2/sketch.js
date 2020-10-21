// チェッカー
function setup() {
  createCanvas(200, 200);
  let size = width / 8;
  noStroke();
  for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){
      // BLANK[1] (hint: rectのx座標は size * i, y座標はsize * j)
      if(i%2==0)
      {
        if(j%2==0)
            fill(255,255,255);
        else
            fill(128, 128, 128);
      }
      else
      {
        if(j%2!=0)
          fill(255,255,255);
        else
          fill(128, 128, 128);
      }
        rect(size*i, size*j, size, size);




        if(i%2==0)
        {
          if(j%2!=0)
          {
              fill(255, 0, 0);
              if(j<=2)
                ellipse(size*i+size/2, size*j+size/2, size-5);
                fill(0, 0, 0);
                if(j>=5)
                  ellipse(size*i+size/2, size*j+size/2, size-5);
          }
        }
        else
        {
          if(j%2==0)
          {
            fill(255, 0, 0);
            if(j<=2)
              ellipse(size*i+size/2, size*j+size/2, size-5);
              fill(0, 0, 0);
              if(j>=5)
                ellipse(size*i+size/2, size*j+size/2, size-5);
          }
        }
    }
  }
}
