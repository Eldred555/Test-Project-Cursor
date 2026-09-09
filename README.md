# Test Project Cursor

Cursor と GitHub 連携のテスト用プロジェクトです。

## 目的

- Cursor で作成したコードを GitHub の非公開リポジトリに push できることを確認する

## 使い方

変更をコミットして push する例:

```bash
git add .
git commit --trailer "Co-authored-by: Cursor <cursoragent@cursor.com>" -m "Update"
git push
```
