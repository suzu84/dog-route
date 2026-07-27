# Unity 簡易ホラーゲーム（無料構成）

自動生成される迷路から、追いかけてくる敵に捕まらずに脱出するだけのシンプルなホラーゲームです。
モデル・テクスチャ・効果音・有料アセットは一切使わず、Unity標準機能だけで作られているので **完全無料** で試せます。

## 使うもの（すべて無料）
- Unity Hub
- Unity Editor（Personalプラン、無料）
- 追加パッケージ・Asset Store購入は不要

## セットアップ手順

1. [Unity Hub](https://unity.com/download) をインストールし、Unity Editor（2021 LTS以降を推奨、テンプレートは「3D」または「3D (URP)」どちらでもOK）をインストールします。Personalライセンスを選べば無料です。
2. Unity Hubで新規プロジェクトを作成します。
3. 作成したプロジェクトの `Assets` フォルダの中に、このフォルダ (`unity-horror-game/Assets/Scripts`) の中身をコピーします（`Assets/Scripts` フォルダごとコピーでOK）。
4. Unityエディタの Hierarchy 上で右クリック → `Create Empty` を選び、空の GameObject を作成します。
5. その GameObject に `GameManager.cs` をドラッグ＆ドロップしてアタッチします。名前は何でも構いません（例: `GameManager`）。
6. シーンに他のオブジェクト（デフォルトの Main Camera や Directional Light）が残っていてもそのままで問題ありません。カメラは Play 時にスクリプトが自動生成し直します。
7. 上部の ▶ (Play) ボタンを押すだけで、迷路・プレイヤー・懐中電灯・敵・出口・UIがすべて自動生成されます。

## 遊び方

| 操作 | 内容 |
|---|---|
| W/A/S/D | 移動 |
| マウス移動 | 視点操作 |
| F | 懐中電灯 ON/OFF（バッテリーが切れると自動で消灯） |
| R | ゲームオーバー／脱出成功後にリスタート |

- 黒いカプセルの敵があなたの現在地を常に把握して迷路内を追いかけてきます（内部でBFS経路探索）。
- 敵が近づくと心拍音（コードで生成した音）が鳴り、距離が近いほど間隔が短くなります。
- 緑色に光る柱が出口です。触れるとクリアになります。
- 敵に捕まるとゲームオーバーになります。

## カスタマイズ

`GameManager` コンポーネントのインスペクタから調整できます。

- `Maze Width` / `Maze Height`: 迷路の広さ
- `Cell Size`: 通路1マスの大きさ
- `Seed`: 0だと毎回ランダム、数値を入れると同じ迷路を再現

敵の速度や追跡間隔は `EnemyAI.cs` の `speed` / `repathInterval`、懐中電灯のバッテリー持続時間は `FlashlightController.cs` の `maxBattery` から調整できます。

## 構成ファイル

```
Assets/Scripts/
  GameManager.cs        迷路生成・オブジェクト配置・ゲーム状態管理
  MazeGenerator.cs       迷路の自動生成アルゴリズム（穴掘り法）
  PlayerController.cs    一人称視点の移動・視点操作
  FlashlightController.cs 懐中電灯のON/OFFとバッテリー管理
  EnemyAI.cs              敵のBFS経路探索と追跡ロジック
  ExitTrigger.cs          出口に触れたときのクリア判定
  HeartbeatAudio.cs       心拍音の生成・再生
  GameUI.cs               画面UI（バッテリー表示・ゲームオーバー/クリア表示）
```

すべて実行時にコードでレベルを組み立てるため、シーンファイルの手作業編集は不要です。壁や敵などの見た目はUnity標準のPrimitive（立方体・カプセル）と単色マテリアルのみで構成しているため、追加の3Dモデルや画像素材も必要ありません。
