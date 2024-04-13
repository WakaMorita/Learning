# SFCへの記述の基本

## ref()によるリアクティブ変数の用意

const 変数名 = ref(値);
<details><summary>参考：リアクティブ変数</summary>

```rb
＊リアクティブ変数
変数の値の変更によって表示が変わるような変数

```
</details>

## 計算結果をリアクティブとするcomputed()

const 変数名 = computed(
    (): 算出結果のデータ型 => {
        算出処理
        return 算出結果;
    }
);

## Nuxtはオートインポート
ref()やcomputed()はインポート不要で利用可能

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