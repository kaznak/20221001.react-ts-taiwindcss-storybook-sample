# TypeScript + React + TailwindCSS + Storybook でコンポーネントカタログを作る
# 経緯

デザイナさんにコンポーネントまで作ってもらえるとエンジニアは非常に助かります。

# スタック

今回使うもの

- [TypeScript](https://www.typescriptlang.org/)
    - 型付き JavaScript。型がついているのでコンパイル時に間違いを検出できる。堅牢なフロントエンド開発には必須。
- [React](https://ja.reactjs.org/)
    - Web UI を構築するためのライブラリ。HTML/CSS/JavaScript を組み合わせて画面の部品を作ることができる。
    - 部品に動きを付ける目的のライブラリとして JQuery というものもある。これは React とは異なり手続型と呼ばれるアプローチをとっている。ユーザのクリックやデータの到着といったイベントに応じてそれぞれの部品をどのように変化させるかを記述する。
    - これに対して React は、ある状態の場合、ある部品はこういった状態である、という形式で記述をする。この記述のアプローチを宣言型と呼ぶ。
    - 同じ宣言型のライブラリとして vue がある。
- [TailwindCSS](https://tailwindcss.com/)
    - CSS ライブラリ。膨大で複雑な CSS を整理して使いやすくしてくれている。
    - CSS の挙動は非常にわかりにくくなりやすいのでこのようなライブラリがある。
        - ただ書き方でカバーされる部分が大きいので、ドキュメントなどを読んで正しい書き方の感覚をつかもう。
    - 慣れると素の CSS よりかなり楽なはず……
- [Storybook](https://storybook.js.org/docs/react/why-storybook)
    - React のコンポーネントカタログを作成するためのフレームワーク
    - コンポーネントを動作する形でカタログとして見せることができる
    - コンポーネントのバリエーションを出したり、パラメータを UI から変えたりといったこともできる。

## 補足

今回は使わないけどアプリ使う場合によく出てくる。

- [Next.js](https://nextjs.org/docs/getting-started)
    - React のフロントエンドフレームワーク
    - フロントエンド作成する場合に必要な機能がおよそ全部入っていて楽
    - なんちゃってバックエンドも作れるので小規模ならバックエンドなしでこれ一つで行ける
- [T3 Stack](https://github.com/t3-oss/create-t3-app)
    - 上で出たライブラリとあといくつか必要なのを足していい感じのフロントエンドを作れる環境ビルダ
    - 大体そうそうこんなのがいいよねってみんな賛同すると思う
- [アクセシビリティ](https://developer.mozilla.org/ja/docs/Learn/Accessibility)
    - 余力が出てきたらやりたい部分。
    - 情報化時代のハンディキャップは肉体的なものだけではなく回線やマシンの速度、ディスプレイのサイズや解像度も含まれる……

# 環境構築

以下の前提で進めます:

- Mac や WSL のターミナルを使える

## nodejs & yarn のインストール

[anyenv](https://github.com/anyenv/anyenv) 使って [nodenv](https://github.com/nodenv/nodenv) 入れて [nodejs のサイト](https://nodejs.org/ja/)の最新の推奨版を入れるのが良いと思います。

anyenv を使う場合は [anyenv-update](https://github.com/znz/anyenv-update) も入れた方が良いです。

`npm i -g yarn` を実行して yarn を使えるようにしましょう。

## プロジェクトのセットアップ

- React プロジェクトの作成
    - `npx create-react-app react-ts-taiwindcss-storybook-sample --template typescript`
        - TypeScript + React のプロジェクトが作成されます
        - `react-ts-taiwindcss-storybook-sample` は自分が作りたいプロジェクトの名前にしてください。
- TailwindCSS のインストール
    - `yarn add -D tailwindcss postcss autoprefixer`
    - `npx tailwindcss init -p`
        - 設定
            - tailwind.config.js
            
            ```jsx
            /** @type {import('tailwindcss').Config} */
            module.exports = {
              content: [
                "./src/**/*.{js,jsx,ts,tsx}", // この行を追加
              ],
              theme: {
                extend: {},
              },
              plugins: [],
            }
            ```
            
            - 参考: [https://tailwindcss.com/docs/guides/create-react-app](https://tailwindcss.com/docs/guides/create-react-app)
- Storybook のインストール
    - `npx storybook init`
    - 設定
        - .storybook/preview.js
        
        ```jsx
        import "../src/index.css"; // この行を追加
        
        export const parameters = {
          actions: { argTypesRegex: "^on[A-Z].*" },
          controls: {
            matchers: {
              color: /(background|color)$/i,
              date: /Date$/,
            },
          },
        }
        ```
        

これで一応つかえるようになります。試しに `yarn storybook` すると storybook が立ち上がります。

# Tailwind でスタイルを書く

試しに `src/stories/Button.tsx` を tailwind で同等の見た目に書き直してみましょう。

```jsx
import React from 'react';
import './button.css';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={[
        'inline-block border-2 rounded-3xl leading-none cursor-pointer',
        'font-sans font-bold',
        (primary ?
          'border-sky-400 text-white bg-sky-400' :
          'border-gray-200 text-gray-700 bg-white'
        ),
        {
          small: 'px-4 py-2 text-sm',
          medium: 'px-5 py-2.5 text-base',
          large: 'px-6 py-3 text-lg',
        }[size]
      ].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
```