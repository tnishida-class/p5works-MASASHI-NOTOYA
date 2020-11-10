// テキスト「関数を作る(2) 値を戻す関数」～「総仕上げ：カレンダーを描画しよう」
function setup(){
  createCanvas(200, 200);
  calendar(2019, 10);

  for(let i = 2000; i <= 2100; i++){
    if(isLeapYear(i)){
      //console.log(i + "年はうるう年です");
    }
    else{
      //console.log(i + "年はうるう年ではありません");
    }
  }
}

function calendar(y, m){
  let dow = dayOfWeek(y, m, 1);
  for(let d = 1; d <= daysInMonth(y, m); d++){
    // BLANK[3] (hint: まずは daysInYear, dayOfWeek を作ろう)
  }
}

function isLeapYear(y){
  return (y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0);
}

function daysInYear(y){
  let count = 0;
  for(let i = 1; i < 13; i++){
    count += daysInMonth(y, i);
  }
  return count ;
}
//検証用
console.log(daysInYear(2100));
console.log(daysInYear(2400));


function daysInMonth(y, m){
  if(m == 2){
    return isLeapYear(y) ? 29 : 28;
  }
  else if(m == 4 || m == 6 || m == 9 || m == 11){
    return 30;
  }
  else{
    return 31;
  }
}

function dayOfYear(y, m, d){
  let count = 0;
  for(let i = 1; i < m; i++){
    count += daysInMonth(y, i);
  }
  return count + d;
}

function dayOfWeek(y, m, d){
  let count = 0;
  let base = 0;//1950/1/1
  for(let i = 1950; i < y; i++){
    count += daysInYear(i);
  }
   count += dayOfYear(y, m, d);
   return (base-1 + count) % 7;
}
console.log(dayOfWeekAsString(dayOfWeek(2000, 5, 7)));
function dayOfWeekAsString(dow){
  const a = ["日", "月", "火", "水", "木", "金", "土", "日"];
  return a[dow];
}
