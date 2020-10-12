// テキスト「配列を使った描画」練習問題：折れ線グラフ

function setup(){
  createCanvas(400, 400);
  background(240);

  let scores = [];
  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }
  linechart(scores);
}

function linechart(scores){
  scaleY(10);
  fill(0);
  const dx = width / scores.length;
  let px, py; // 線を引くために一つ前の点を覚えておく変数
  for(let i = 0; i < scores.length; i++){
    // BLANK[1]
  }
}

function scaleY(n){
  for(let i = 0; i < n; i++){ line(0, height * i / n, width, height * i / n); }
}
