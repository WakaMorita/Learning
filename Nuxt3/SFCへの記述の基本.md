# SFCへの記述の基本

## ref()によるリアクティブ変数の用意
```
const 変数名 = ref(値);
```
<details><summary>参考：リアクティブ変数</summary>

```rb
＊リアクティブ変数
変数の値の変更によって表示が変わるような変数

```
</details>

## 計算結果をリアクティブとするcomputed()
```
const 変数名 = computed(
    (): 算出結果のデータ型 => {
        算出処理
        return 算出結果;
    }
);
```

## Nuxtはオートインポート
```
ref()やcomputed()はインポート不要で利用可能
```

## オブジェクトをまとめてリアクティブに出来るreactive()
const 変数名 = reactive(オブジェクト);
* 表記の見通しの面から基本はref()、まとめてリアクティブにする必要がある場合はreactive()がおすすめ
<details><summary>例</summary>

```rb
const rectagle = reactive({
    width: widthInit,
    heigtht: heigthtInit,
});
```
</details>

## イベント処理で利用されるメソッド
```
const メソッド名 = (引数): void => {
    処理内容
}
```
<details><summary>例</summary>

■引数無し
 * 呼び出し元はメソッド名のみ
```rb
<script setup lang="ts">
const onButtonClick = (): void => {
  const target = event.target as HTMLButtonElement;
  const text = target.innerText;
  msg.value = `${label}と${text}`;
};
</script>
<template>
<button v-on:click="onButtonClick">こんにちわ</button>
</template>
```
■イベントオブジェクトのみ
 * 呼び出し元はメソッド名のみ
```rb
<script setup lang="ts">
const onButtonClick = (event: Event): void => {
  const target = event.target as HTMLButtonElement;
  const text = target.innerText;
  msg.value = `${label}と${text}`;
};
</script>
<template>
<button v-on:click="onButtonClick">こんにちわ</button>
</template>
```
■任意の引数
* 呼び出し元はメソッド名に()をつけて引数を指定する
```rb
<script setup lang="ts">
const onButtonClick = (label: string, point: number): void => {
  const target = event.target as HTMLButtonElement;
  const text = target.innerText;
  msg.value = `${label}と${text}`;
};
</script>
<template>
<button v-on:click="onButtonClick('Hello', 45)">こんにちわ</button>
</template>
```

■任意の引数とイベントオブジェクト
* 呼び出し元はメソッド名に()をつけて引数を指定する
```rb
<script setup lang="ts">
const onButtonClick = (label: string, event: Event): void => {
  const target = event.target as HTMLButtonElement;
  const text = target.innerText;
  msg.value = `${label}と${text}`;
};
</script>
<template>
<button v-on:click="onButtonClick('Hello', ,$event)">こんにちわ</button>
</template>
```
</details>

## 型変換の as
```
const 変数 = オブジェクト as 変換したい型;
```
<details><summary>例</summary>

```rb
const target = event.target as HTMLButtonElement;
* event.targetのプロパティはEventTargetオブジェクト、innerTextプロパティはないためボタン型へ変換が必要
const text = target.innerText;
```
</details>

## リアクティブな変数の変化を監視するWatchEffect()
```
WatchEffect(
    (): void => {
        リアクティブな変数に応じて実行される処理
    }
);
```
## 監視対象を明示するWatch()
```
Watch(監視対象リアクティブな変数,
    (newVal: データ型, oldVal: データ型): void => {
        監視対象が変化した際に実行される処理
    },
    {immediate: true}
);
```
<details><summary>例</summary>

```rb

```
</details>

