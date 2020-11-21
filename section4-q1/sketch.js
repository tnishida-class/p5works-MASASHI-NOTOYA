// 練習問題「心臓の鼓動のように大きくなったり小さくなったりする円」
let count;
let cycle;
let size;
let width=200;
let height=200;

let up_flag=1;

function setup(){
  createCanvas(200, 200);
  count = 0;
  cycle = 100;
}

function draw(){
  background(160, 192, 255);

    if(up_flag===1)//up
    {
        count = (count + 1) % cycle;
        if((count+1)===cycle)
        {
          up_flag=0;
        }
    }
    else//down
    {
        count = (count - 1) % cycle;
        if((count-1)===0)
        {
          up_flag=1;
        }
    }

    size=count;

    //count = mouseIsPressed ? count * 3 : count ;

    ellipse(width / 2, height / 2, size);
}
