// テキスト「配列を使った描画」練習問題：円グラフ

function setup(){
  createCanvas(400, 400);
  background(240);

  let scores = [];
  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }
  piechart(scores);
}

function sum(arr){
  let n = 0;
  for(let i = 0; i < arr.length; i++){ n += arr[i]; }
  return n;
}

function piechart(scores){
  const total = sum(scores);
  // BLANK[1]
}