// 練習問題：吹き出し
// 吹き出しの位置、背景色 etc. を関数 balloon の引数で指定できるようにしてみよう
// 吹き出しにしっぽを付けてみよう
function setup(){
  createCanvas(400, 400);
  background(255);
  balloon("Keyakizaka46 bloomed as Sakurazaka46", 50, 20, 94, 185, 84);
}

function balloon(t, x, y, r, g, b){
  let w = textWidth(t);
  let h = textAscent() + textDescent();
  let p = 2;
  noStroke();

  fill(r, g, b);
  rect(x, y, w + p * 2, h + p * 2);
  triangle(x + 5, y + h+p*2, x + 10, y + 46, x + 20, y + h+p*2);

  fill(255);
  text(t, x + p, y + h + p);

}
