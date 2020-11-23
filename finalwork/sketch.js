// 最終課題を制作しよう

let x, y, vx, vy;
let grabbed; // 円をつかんでいるかどうかを記憶するために使う変数
let fric=0.15;//摩擦
let ballnum=16;
let ball=(new Array(ballnum)).fill(9);//配列宣言：参考　https://qiita.com/butchi_y/items/db3078dced4592872a9c
let r = 30;//直径
let hole_r=r  + 15;
let e = 0.8;//反発係数

function setup(){
  createCanvas(windowWidth, windowHeight);
  reset();
}

function reset(){
  let count=1;
  //白ボール定義
  //      x座標, y座標, x速度, y速度, grabbed, R, G, B, ボールの有効性
  ball[0]=[width / 2, height / 4, 0, 0, false, 255, 255, 255, true];
  for(let i=1 ; i<=5 ; i++)
  {
    for(let j = 0 ; j<i ; j++)
    {
      ball[count]=[width / 2 +　r*j　-　(r*(i-1)/2), height / 2 +　i*r, 0, 0, false, random(0, 255) , random(0, 255), random(0, 255), true];
      //+r*j...直径分ずらすことで球を右に並べる
      //-(r*(i-1)/2)...列毎に半径分左にずらす
      //+i*r...直径分下にずらす
      count++;
    }
  }
}

function draw(){
  background(134, 74, 43);
  fill(0, 155, 0);
  rect(width / 24, height / 24, (width / 12)*11, (height / 12)*11);
  holedraw();
  for(let i=0; i<ballnum; i++)
  {
    if(ball[i][8]){
    fill(ball[i][5],ball[i][6],ball[i][7]);
    ellipse(ball[i][0], ball[i][1], r);
    }
  }
  judge();
  crash();
  for(i=0; i<ballnum; i++){
  if(!grabbed){ // つかんでいないときだけアニメーションさせる
    if(ball[i][2]>0.1)ball[i][2]-=fric;
    if(ball[i][3]>0.1)ball[i][3]-=fric;
    if(ball[i][2]<-0.1)ball[i][2]+=fric;
    if(ball[i][3]<-0.1)ball[i][3]+=fric;
    ball[i][0] -= ball[i][2];
    ball[i][1] -= ball[i][3];
    if(ball[i][0] < (width / 12) || ball[i][0] > (width / 12)*11){ ball[i][2] = -ball[i][2]; }
    if(ball[i][1] < (height / 12) || ball[i][1] > (height / 12)*11){ ball[i][3] = -ball[i][3]; }
    if(ball[i][2]*ball[i][2]+ball[i][3]*ball[i][3]<1)
      {
      ball[i][2]=0;
      ball[i][3]=0;
      }
    ball[i][0] = constrain(ball[i][0], 0, width);
    ball[i][1] = constrain(ball[i][1], 0, height);
    }
  }
  whiteReset();
}

function keyPressed(){
  if(key == " "){ reset(); } // スペースキーを押したらリセット
}

function mousePressed(){
  grabbed = dist(mouseX, mouseY, ball[0][0], ball[0][1]) < 30; // distは２点の距離を求める関数
}

function mouseDragged(){
  if(grabbed){
    ball[0][0] = mouseX;
    ball[0][1] = mouseY;
  }
}

function mouseReleased(){
  if(grabbed){
    grabbed = false;
    ball[0][2] = mouseX - pmouseX;
    ball[0][3] = mouseY - pmouseY;
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function holedraw(){
  fill(0);
  ellipse(width / 24, width / 24, hole_r);
  ellipse(width / 24, (height / 24)*23 , hole_r);
  ellipse((width / 24)*23, height / 24, hole_r);
  ellipse((width / 24)*23, (height / 24)*23, hole_r);
  ellipse(width / 24, height / 2, hole_r);
  ellipse((width / 24)*23, height / 2 , hole_r);
}

function judge(){
  for(let i= 0; i<ballnum; i++){
  if( (ball[i][0]-width / 24)*(ball[i][0]-width / 24)+(ball[i][1]-height / 24)*(ball[i][1]-height / 24)<=(hole_r/2)*(hole_r/2) ||
     (ball[i][0]-width / 24)*(ball[i][0]-width / 24)+(ball[i][1]-(height / 24)*23)*(ball[i][1]-(height / 24)*23)<=(hole_r/2)*(hole_r/2) ||
    (ball[i][0]-(width / 24)*23)*(ball[i][0]-(width / 24)*23)+(ball[i][1]-height / 24)*(ball[i][1]-height / 24)<=(hole_r/2)*(hole_r/2) ||
    (ball[i][0]-(width / 24)*23)*(ball[i][0]-(width / 24)*23)+(ball[i][1]-(height / 24)*23)*(ball[i][1]-(height / 24)*23)<=(hole_r/2)*(hole_r/2) ||
    (ball[i][0]-width / 24)*(ball[i][0]-width / 24)+ (ball[i][1]-height / 2)*(ball[i][1]-height / 2) <=(hole_r/2)*(hole_r/2) ||
    (ball[i][0]-(width / 24)*23)*(ball[i][0]-(width / 24)*23)+  (ball[i][1]-height / 2)*(ball[i][1]-height / 2)  <=(hole_r/2)*(hole_r/2) )
    {
    ball[i][8] = false;//穴に落ちる→無効化
    ball[i][2]=0;
    ball[i][3]=0;
    }

  }
}

function crash(){
  for(let i = 0; i< ballnum; i++){
    for(let j = i+1; j<=15; j++){
      let dx=(ball[i][0])-(ball[j][0]);//x座標の差
      let dy=(ball[j][1])-(ball[i][1]);//y座標の差
        if((dx*dx+dy*dy)<=r*r && ball[i][8]===true && ball[j][8]===true)//球体衝突の参考：http://miwalab.ei.st.gunma-u.ac.jp/master/shiryou6.pdf
          {
          let theta=Math.atan2(dy, dx); //参考：角度の求め方　https://lab.syncer.jp/Web/JavaScript/Snippet/37/
          let cos=Math.cos(theta);
          let sin=Math.sin(theta);
          let v1=Math.sqrt(ball[i][2]*ball[i][2]+ball[i][3]*ball[i][3]);//0の速度
          let v2=Math.sqrt(ball[j][2]*ball[j][2]+ball[j][3]*ball[j][3]);//１
          let theta_1_1=acos(ball[i][2]/v1);//v1とx方向成分からなる角度θ1
          let theta_2_1=asin(ball[j][3]/v2);//v2とy方向成分からなる角度θ2
          if(v1===0)theta_1_1=0;//NaN防止
          if(v2===0)theta_2_1=0;
          let theta_1=theta_1_1-theta;
          let theta_2=theta_2_1+theta;
          let v1_x=(v1*Math.cos(theta_1)+(1+e)*(v2*Math.cos(theta_2)-v1*Math.cos(theta_1)))*cos;
          let v1_y=-(v1*Math.cos(theta_1)+(1+e)*(v2*Math.cos(theta_2)-v1*Math.cos(theta_1)))*sin;
          let v2_x=(v2*Math.cos(theta_2)-(1+e)*(v2*Math.cos(theta_2)-v1*Math.cos(theta_1)))*cos;
          let v2_y=-(v2*Math.cos(theta_2)-(1+e)*(v2*Math.cos(theta_2)-v1*Math.cos(theta_1)))*sin;

    ball[i][2]=v1_x;
    ball[i][3]=v1_y;
    ball[j][2]=v2_x;
    ball[j][3]=v2_y;
      }
    }
  }
}

function whiteReset(){//白ボールが穴に落ちたら復活
  for(let i = 0; i<ballnum; i++){
    if(ball[i][2]===0 && ball[i][3]===0 && i!=15){
      continue;
    }
    else if(ball[i][2]===0 && ball[i][3]===0 && i===15 && ball[0][8]===false)
      {
      ball[0][0]=width / 2;
      ball[0][1]=height / 4;
      ball[0][8]=true;
      }
    else break;
    }
}
