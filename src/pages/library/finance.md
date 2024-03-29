---
layout: "@layouts/LibraryLayout.astro"
---

<html class="no-js" lang="ja">
  <head>
    <!--#include virtual="/ja/include/analytics.txt" -->
    <meta charset="utf-8" />
    <title>モジュール一覧｜●●●リート投資法人</title>
    <!--#include virtual="/ja/include/meta.txt" -->
    <!--#include virtual="/ja/include/ogp.txt" -->
    <link
      rel="shortcut icon"
      href="/favicon.ico"
      type="image/vnd.microsoft.icon"
    />
    <link rel="icon" href="/favicon.ico" type="image/vnd.microsoft.icon" />
    <link rel="stylesheet" href="/css/reset.css" />
    <link rel="stylesheet" href="/css/common.css" />
    <link rel="stylesheet" href="/css/style.css" />
    <link rel="stylesheet" href="/css/contents.css" />
    <link rel="stylesheet" href="/css/print.css" media="print" />
    <script src="/js/jquery.js"></script>
    <script src="/js/jquery-ui.min.js"></script>
    <script src="/js/modernizr.js"></script>
    <script src="/js/jquery.slicknav.js"></script>
    <script src="/js/function.js"></script>
    <script src="/js/common.js"></script>
    <!--[if lt IE 9]>
      <script src="/js/html5.js"></script>
    <![endif]-->
    <!--module setting-->
    <link rel="stylesheet" href="/css/module.css" />
    <script src="/js/module.js"></script>
    <link
      rel="stylesheet"
      href="/highlight/styles/tomorrow-night-eighties.css"
    />
    <script src="/highlight/highlight.pack.js"></script>
    <script>
      hljs.initHighlightingOnLoad();
    </script>
    <!--module setting end-->
    <link rel="stylesheet" href="/css/finance.css" />
  </head>

  <body id="finance">
    <!--#include virtual="/ja/include/header.txt" -->
    <div class="topic-path">
      <section>
        <ol>
          <li><a href="/">モジュール一覧</a></li>
          <li>コンテンツスタイル</li>
        </ol>
      </section>
    </div>
    <!--topic-path-->
    <div class="contents">
      <section class="topic-path">
        <ol>
          <li class="ic-home"><a href="/">ホーム</a></li>
          <li><a href="/">モジュール一覧</a></li>
          <li>財務情報</li>
        </ol>
      </section>
      <!--topic-path-->
      <main>
        <article>
          <div class="title">
            <h1>Module list <span>モジュール一覧 : 財務情報</span></h1>
          </div>
          <!--title-->
          <div class="module">
            <p class="module__title">財務情報:基本設定</p>
            <p>財務情報用のCSS</p>
            <pre
              class="clear-both"
            ><code class="html">&lt;link rel=&quot;stylesheet&quot; href=&quot;"/css/finance.css&quot; /&gt;</code></pre>
            <p>
              bodyに#financeを追加してグローバルナビゲーションをカレント表示に
            </p>
            <pre><code class="html">&lt;body id=&quot;finance&quot;&gt;</code></pre>
          </div>
          <!--module-->
        </article>
      </main>
    </div>      
    <!--contents-->
    <!--#include virtual="/ja/include/footer.txt" -->
  </body>
</html>
