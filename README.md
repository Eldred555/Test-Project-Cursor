# Test Project Cursor

Cursor と GitHub 連携のテスト用プロジェクトです。

## ●×ゲーム（ウェブアプリ）

3×3 の ●×（三目並べ）をブラウザで遊べます。

- 先行: プレイヤー（●）
- 後攻: コンピューター（×）

### 起動方法

プロジェクトフォルダで次を実行し、表示された URL をブラウザで開きます。

```bash
python -m http.server 8000
```

ブラウザで http://localhost:8000 を開いてください。

`index.html` を直接ダブルクリックして開くこともできます。

### ファイル構成

| ファイル | 内容 |
| --- | --- |
| `index.html` | 画面 |
| `styles.css` | スタイル |
| `app.js` | ゲームロジック |
| `tic_tac_toe.py` | コンソール版（任意） |

### コンソール版

```bash
python tic_tac_toe.py
```
