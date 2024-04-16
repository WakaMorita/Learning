# SFCへの記述の基本
## スクリプトブロック記述
## ◆ ref()によるリアクティブ変数の用意
```
const 変数名 = ref(値);
```
<details><summary>参考：リアクティブ変数</summary>

```rb
＊リアクティブ変数
変数の値の変更によって表示が変わるような変数

```
</details>

## ◆ 計算結果をリアクティブとするcomputed()
```
const 変数名 = computed(
    (): 算出結果のデータ型 => {
        算出処理
        return 算出結果;
    }
);
```

## ◆ Nuxtはオートインポート
```
ref()やcomputed()はインポート不要で利用可能
```

## ◆ オブジェクトをまとめてリアクティブに出来るreactive()
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

## ◆ イベント処理で利用されるメソッド
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

## ◆ 型変換の as
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

## ◆ リアクティブな変数の変化を監視するWatchEffect()
```
WatchEffect(
    (): void => {
        リアクティブな変数に応じて実行される処理
    }
);
```
## ◆ 監視対象を明示するWatch()
```
Watch(監視対象リアクティブな変数,
    (newVal: データ型, oldVal: データ型): void => {
        監視対象が変化した際に実行される処理
    },
    {immediate: true}
);
```

## ◆ ライフサイクルフック
* onRenderTrackedとonrenderTriggered以外の使い方
```ts
onMounted(
  (): void => {
    行いたい処理
  }
);
```
* デバッグ用関数（onRenderTrackedとonrenderTriggered）の使い方
```ts
onRenderTracked(
  (event: Debuggerevent): void => {
    行いたい処理
  }
);
```
<details><summary>Vueアプリケーションのライフサイクル</summary>

```rb
                    １起動開始
                        │　
                        │　　beforeCreate
                        ↓
                    ２Vueアプリケーションの初期化処理
                        │　
                        │　　Created
                        ↓
                    ３コンポーネントの解析処理
                        │　
┌─────→ beforeMount     │　　
│                       ↓
│                   ４レンダリング処理　　　　　<９リアクティブ変数への初回アクセス　renderTracked)
│                       │　
│                       │　
│                       │　　mounted
│                       │　　　　　　　　　　　　　　　　┌１０再レンダリングの際にリアクティブ変数へのアクセスrenderTriggered
│                       ↓　　　　　　┌───────────────────────────────────────────┐　beforeUpdate　
│                   ５表示状態(Mounted)　　　　　　　　　　　　　　　　　　　　　　　６リアクティブシステムによる再レンダリング処理　
│                       │　         └───────────────────────────────────────────┘　updated
│                       │　
│                       │　　beforeUnmount
│                       │　
│                       │　
│                       ↓
│                   ７非表示処理
│                       │　
│                       │　　unmounted
│                       ↓
└───────────────────８非表示状態(Unmounted)    
再表示
```
|  ライフサイクルフック関数  |  実行タイミング  |  タイミング番号  |
| ---- | ---- | ---- |
|  onBeforeMount  |  コンポーネントの解析処理後、決定したDOMをレンダリングする直前  | ３と４の間
|  onMounted  |  DOMのレンダリングが完了し、表示状態(Mounted状態)になった時点  |４と５の間
|  onBeforeUpdate  |  リアクティブデータが変更され、DOMの再レンダリング処理を行う前  |６の前
|  onUpdated  |  DOMの再レンダリングが完了した時点  |６の後
|  onBeforeUnmount  |  コンポーネントのDOMの非表示処理を開始する直前  |７の前
|  onUnmounted  |  コンポーネントのDOMの非表示処理が完了した(Unmounted状態)になった時点  |８の前
|  onErrorCaptured  |  配下のコンポーネントを含めてエラーを検知した時点  |該当なし
|  onActivated  |  コンポーネントが待機状態ではなくなった時点  |該当なし
|  onDeactivated  |  コンポーネントが待機状態になった時点  |該当なし
|  onRenderTracked  |  リアクティブ変数に初めてアクセスが発生した時点：デバッグ用関数  |9
|  onrenderTriggered  |  リアクティブ変数が変更されたのを検知して、その変数へのアクセスがあった時点：デバッグ用関数  |１０

</details>

## テンプレートブロック記述
## ◆ マスタッシュ構文
```
{{ 変数 }}
```
## ◆ 属性に変数をバインドするv-bind
```
v-bind:属性名="テンプレート変数"
```
<details><summary>例</summary>

```
<a v-bind:href="url" target="_blank">Nuxt.jsのサイト</a>
```
</details>

## ◆ イベントを設定するv-on
```
v-on:イベント名="イベント発生時に実行するメソッド名"
```
<details><summary>例</summary>

```
<button v-on:click="onButtonClick('Hello',$event)">こんにちわ</button>
```
</details>

## ◆ 双方向データバインディングのv-model
```
v-model="テンプレート変数"
```

<details><summary>例</summary>

```
<input type="text" v-model="inputNameModel">
```
</details>