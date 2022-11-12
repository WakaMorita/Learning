const myImage = document.querySelector('img');
myImage.onclick = () => {
    const mySrc = myImage.getAttribute('src');
    if (mySrc === 'images/sample.jfif'){
        myImage.setAttribute('src','images/bird.jpg');
    } else {
        myImage.setAttribute('src','images/sample.jfif');
    }
}

let myButton = document.querySelector('button');
let myHeading = document.querySelector('h1');
myButton.onclick = () => { //無名関数
    setUserName();
}

if (!localStorage.getItem('name')){
    setUserName();
} else {
    const storedName = localStorage.getItem('name');
    myHeading.textContent = `Mozillaはかっこいいよ、${storedName}`;
}


function setUserName(){
    const myName = prompt('あなたの名前を入力してください'); //ユーザーに入力を求め結果を返す。
    if (!myName){
        setUserName();
    } else {
        //ブラウザにデータを格納して後で受け取る　localStorage
        localStorage.setItem('name',myName); //引数1と呼ばれるデータを作成しmyNameの中身を格納する
        myHeading.textContent = `Mozillaはかっこいいよ、${myName}`;
    }
}

//学習用の例
// const myHeading = document.querySelector('h1');
// myHeading.textContent = 'Hello world!';
// let myVariable;
// myVariable = 'Bob';

// let myVariable2 = 'Bob';

// myVariable;

// let myVariable3 = 'Bob';
// myVariable3 = 'Steve';

// myVariable3 === 'Bob'; //厳密等価値と型が等しいかどうか
// myVariable3 !== 'Bob'; //非等価　！が否定

// let iceCream = 'チョコレート';
// if (iceCream === 'チョコレート') {
//   alert('やった、チョコレートアイス大好き！');
// } else {
//   alert('あれれ、でもチョコレートは私のお気に入り......');
// }

// alert('hello!');　　//ダイアログを出す

// function multiply(num1,num2) {
//     let result = num1 * num2;
//     return result;
// }

// multiply(4, 7);
// multiply(20, 20);
// multiply(0.5, 3);

// document.querySelector('html').addEventListener('click', function () {
//     alert('痛っ! つつかないで!');
//   });

// //　上記と同じ
//   let myHTML = document.querySelector('html');
// myHTML.addEventListener('click', function () {
//   alert('痛っ! つつかないで!');
// });

// //アロー関数
// document.querySelector('html').addEventListener('click', () => {
//     alert('痛っ! つつかないで!');
//   });