'use strict';

const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');



/**
 * 指定したHTML要素の子供をすべて削除する
 * @param {HTMLElement}element HTML の要素
 */
function removeAllChildren(element){//elementに入るのは最初にgetIdした４つの変数
    while (element.firstChild){//子供の要素があるかぎり削除
        element.removeChild(element.firstChild);
    }
1}



assessmentButton.onclick = function(){
    const userName = userNameInput.value;
    if (userName.length === 0){//名前が空欄の時は処理を終了する
        return; //ただちに関数の処理を終了するガード句

    }
    
    //TODO 診断結果エリアの作成

    removeAllChildren(resultDivided);//消す


    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);//診断結果取得
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);


    //TODO ツイートエリアの作成
    removeAllChildren(tweetDivided);//消す

    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
    + encodeURIComponent('あなたのいいところ当て！！')
    + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href',hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text',result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivided.appendChild(anchor);


    //widgets.js(ツイッター社が提供しているスクリプト)の設定、見た目がボタンになる
    const script = document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);




};

//enterが押された時も実行されるプログラム
userNameInput.onkeydown = function(event){
    //eventというのはユーザーが起こしたアクションのこと、この場合はエンターキーを押すアクションのこと
    if (event.key === 'Enter'){
        assessmentButton.onclick();
    }
};


const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
'{userName}のいいところは優しさです。あなたの優しい雰囲気や立ち振る舞いに多くの人が癒やされています。',
    
];


/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName パラメーター引数の説明：ユーザーの名前
 * @returen {string} 診断結果を返します、stringは文字列
 */ 
function assessment(userName){
    // 全文字のコード番号を取得してそれを足し合わせる関数
    let sumOfCharCode = 0;
    //合計値をいれる変数

    for ( let i = 0; i < userName.length; i++){
        //文字列を全部足したいから0番目の文字列から文字列の長さ未満まで繰り返す
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
        //0番目の文字のcharcodeに次の文字のcharcodeを足して・・・繰り返す

    }

    //文字のコード番号の合計を回答（配列）の数（今回は16）で割って添え字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    //resultは配列answersのなかの[]番目の回答だよ！！！

    //{userName}をユーザーの名前に書き換える波かっこ波括弧閉じを探してきて書き換える
    //バックスラッシュはエスケープ（｛｝は意味をもってしまうので取り消し）
result = result.replace(/\{userName\}/g, userName);
 return result;

}


console.assert(
    assessment('太郎')==='太郎のいいところは決断力です。次郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
