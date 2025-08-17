# WSL + Vite + React 開発環境構築メモ

Windows OS上のWSL (Ubuntu) 環境を使い、ViteでReactプロジェクトを立ち上げるまでの手順。

## 1. WSL (Ubuntu) の準備と確認

### 1-1. WSLの起動と動作確認
PowerShellまたはコマンドプロンプトで以下のコマンドを実行し、インストール済みのUbuntuが`Stopped`または`Running`状態で表示されることを確認する。
```bash
wsl -l -v
```

### 1-2. Ubuntu環境へのログイン
同じくPowerShellで以下のコマンドを実行し、Ubuntu環境に入る。
```bash
wsl -d Ubuntu
# または、スタートメニューから "Ubuntu" を起動
```
以降のコマンドは、すべてこのUbuntuのターミナル内で実行する。

## 2. 開発ツールのインストール

### 2-1. nvm (Node Version Manager) のインストール
Node.jsのバージョンを管理するため、`nvm`をインストールする。
```bash
curl -o- [https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh](https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh) | bash
```
インストール後、ターミナルを再起動して設定を反映させる。

### 2-2. Node.js と npm のインストール
`nvm`を使い、Node.jsのLTS（長期サポート）版をインストールする。`npm`も同時にインストールされる。
```bash
nvm install --lts
```

### 2-3. インストール確認
各ツールのバージョンが表示されれば成功。
```bash
node -v
npm -v
nvm -v
```

### 2-4. Git の初期設定
GitはUbuntuにプリインストールされていることが多い。GitHubのユーザー名とメールアドレスを設定する。
```bash
git config --global user.name "あなたのGitHubユーザー名"
git config --global user.email "あなたのGitHubメールアドレス"
```

## 3. プロジェクトの作成

### 3-1. GitHubリポジトリの準備
GitHub上で、このプロジェクト用の新しいリポジトリを作成する（例: `react-study`）。

### 3-2. リポジトリをWSLにクローン
Ubuntuのホームディレクトリ（`~`）など、作業したい場所に移動し、作成したリポジトリを`clone`する。
```bash
cd ~
git clone [https://github.com/あなたのユーザー名/リポジトリ名.git](https://github.com/あなたのユーザー名/リポジトリ名.git)
```

### 3-3. Viteを使ったReactプロジェクトの作成
クローンしたディレクトリに移動し、ViteコマンドでReactのテンプレートを展開する。
```bash
cd リポジトリ名
npm create vite@latest . -- --template react
```

## 4. 開発の開始とVS Code連携

### 4-1. 依存パッケージのインストール
プロジェクトに必要なライブラリをインストールする。
```bash
npm install
```

### 4-2. WSLからVS Codeを起動
**この手順が最も重要。**
プロジェクトのルートディレクトリで以下のコマンドを実行すると、VS CodeがWSL内のフォルダを直接開いた状態で起動する。
```bash
code .
```
> **事前準備:** VS Codeに **「WSL」** 拡張機能（Microsoft提供）をインストールしておく必要がある。