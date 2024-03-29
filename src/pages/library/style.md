---
layout: "@layouts/LibraryLayout.astro"
---

<html class="no-js" lang="ja">
  <head>
    <!--#include virtual="/ja/include/analytics.txt" -->
    <meta charset="utf-8" />
    <title>モジュール一覧｜●●●リート投資法人</title>
    <!--#include virtual="/ja/include/meta.txt" -->
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
    <link
      rel="stylesheet"
      href="/css/print.css"
      type="text/css"
      media="print"
    />
    <script type="text/javascript" src="/js/jquery.js"></script>
    <script type="text/javascript" src="/js/jquery.slicknav.js"></script>
    <script type="text/javascript" src="/js/function.js"></script>
    <script type="text/javascript" src="/js/common.js"></script>
    <script type="text/javascript" src="/js/jquery-ui.min.js"></script>
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
  </head>

  <body>
    <!--#include virtual="/ja/include/header.txt" -->
    <div class="topic-path">
      <section>
        <ol>
          <li><a href="/">モジュール一覧</a></li>
          <li>汎用スタイル</li>
        </ol>
      </section>
    </div>
    <!--topic-path-->
    <div class="contents">
      <main>
        <article>
          <div class="title">
            <h1>Module list <span>モジュール一覧 : 汎用スタイル</span></h1>
          </div>
          <!--title-->
          <div class="module">
            <p class="module__title">Align</p>
            <pre><code class="css">.align-center {text-align: center !important;}<br />.align-right {text-align: right !important;}<br />.align-left {text-align: left !important;}<br />.align-middle,<br />.align-middle th,<br />.align-middle td {vertical-align: middle; !important;}<br />.align-top {vertical-align: top !important;}<br />.align-bottom {vertical-align: bottom !important;}</code></pre>
            <p class="module__title">Float / Clear</p>
            <pre><code class="css">.clear-both {clear: both !important;}<br />.clear-none {clear: none !important;}<br />.float-right {float: right !important;}<br />.float-left {float: left !important;}<br />.float-none {float: none !important;}<br />.clearfix:after {<br />    content: ".";<br />    display: block;<br />    clear: both;<br />    height: 0;<br />    visibility: hidden;<br />}<br />.clearfix { zoom:1; }</code></pre>
            <p class="module__title">Display</p>
            <pre><code class="css">.display-inline {display: inline !important;}<br />.display-block {display: block !important;}<br />.display-none {display: none !important;}</code></pre>
            <p class="module__title">List-style</p>
            <ul class="list-type-lower-alpha">
              <li>あああ</li>
              <li>いいい</li>
              <li>ううう</li>
            </ul>
            <ul class="list-type-upper-alpha">
              <li>あああ</li>
              <li>いいい</li>
              <li>ううう</li>
            </ul>
            <ul class="list-type-decimal">
              <li>あああ</li>
              <li>いいい</li>
              <li>ううう</li>
            </ul>
            <ul class="list-type-katakana">
              <li>あああ</li>
              <li>いいい</li>
              <li>ううう</li>
            </ul>
            <ul class="list-type-lower-roman">
              <li>あああ</li>
              <li>いいい</li>
              <li>ううう</li>
            </ul>
            <ul class="list-type-upper-roman">
              <li>あああ</li>
              <li>いいい</li>
              <li>ううう</li>
            </ul>
            <ul class="list-type-disc">
              <li>あああ</li>
              <li>いいい</li>
              <li>ううう</li>
            </ul>
            <pre
              class="margin-bottom-10"
            ><code class="html">&lt;ul class=&quot;list-type-lower-alpha&quot;&gt;<br />    &lt;li&gt;あああ&lt;/li&gt;<br />    &lt;li&gt;いいい&lt;/li&gt;<br />    &lt;li&gt;ううう &lt;/li&gt;<br />  &lt;/ul&gt;<br />  &lt;ul class=&quot;list-type-upper-alpha&quot;&gt;<br />    &lt;li&gt;あああ&lt;/li&gt;<br />    &lt;li&gt;いいい&lt;/li&gt;<br />    &lt;li&gt;ううう &lt;/li&gt;<br />  &lt;/ul&gt;<br />  &lt;ul class=&quot;list-type-decimal&quot;&gt;<br />    &lt;li&gt;あああ&lt;/li&gt;<br />    &lt;li&gt;いいい&lt;/li&gt;<br />    &lt;li&gt;ううう &lt;/li&gt;<br />  &lt;/ul&gt;<br />  &lt;ul class=&quot;list-type-katakana&quot;&gt;<br />    &lt;li&gt;あああ&lt;/li&gt;<br />    &lt;li&gt;いいい&lt;/li&gt;<br />    &lt;li&gt;ううう &lt;/li&gt;<br />  &lt;/ul&gt;<br />  &lt;ul class=&quot;list-type-lower-roman&quot;&gt;<br />    &lt;li&gt;あああ&lt;/li&gt;<br />    &lt;li&gt;いいい&lt;/li&gt;<br />    &lt;li&gt;ううう &lt;/li&gt;<br />  &lt;/ul&gt;<br />  &lt;ul class=&quot;list-type-upper-roman&quot;&gt;<br />    &lt;li&gt;あああ&lt;/li&gt;<br />    &lt;li&gt;いいい&lt;/li&gt;<br />    &lt;li&gt;ううう &lt;/li&gt;<br />  &lt;/ul&gt;<br />  &lt;ul class=&quot;list-type-disc&quot;&gt;<br />    &lt;li&gt;あああ&lt;/li&gt;<br />    &lt;li&gt;いいい&lt;/li&gt;<br />    &lt;li&gt;ううう &lt;/li&gt;<br />  &lt;/ul&gt;</code></pre>
            <pre><code class="css">.list-type-lower-alpha li {list-style-type: lower-alpha !important;}
.list-type-upper-alpha li {list-style-type: upper-alpha;}
.list-type-decimal li {list-style-type: decimal;}
.list-type-katakana li {list-style-type: katakana;}
.list-type-lower-roman li {list-style-type: lower-roman;}
.list-type-upper-roman li {list-style-type: upper-roman;}
.list-type-disc li {list-style-type: disc;}

.list-type-lower-alpha li,
.list-type-upper-alpha li,
.list-type-decimal li,
.list-type-katakana li,
.list-type-lower-roman li,
.list-type-upper-roman li,<br />.list-type-disc li {
margin-left: 2em !important;
}

.list-style-none li {list-style: none;}</code></pre>

<p class="module__title">Indent</p>
<ul class="indent1">
<li>
1em インデントするリスト 1em インデントするリスト 1em インデントするリスト 1em インデントするリスト 1em インデントするリスト 1em インデントするリスト 1em インデントするリスト 1em インデントするリスト 1em インデントするリスト 1em インデントするリスト 1em インデントするリスト 1em インデントするリスト
</li>
</ul>
<ul class="indent2">
<li>
2em インデントするリスト 2em インデントするリスト 2em インデントするリスト 2em インデントするリスト 2em インデントするリスト 2em インデントするリスト 2em インデントするリスト 2em インデントするリスト 2em インデントするリスト 2em インデントするリスト 2em インデントするリスト 2em インデントするリスト
</li>
</ul>
<ul class="indent3">
<li>
3em インデントするリスト 3em インデントするリスト 3em インデントするリスト 3em インデントするリスト 3em インデントするリスト 3em インデントするリスト 3em インデントするリスト 3em インデントするリスト 3em インデントするリスト 3em インデントするリスト 3em インデントするリスト 3em インデントするリスト 3em インデントするリスト 3em インデントするリスト 3em インデントするリスト
</li>
</ul>
<ul class="indent4">
<li>
4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト
</li>
</ul>
<pre
              class="margin-bottom-10"
            ><code class="html">&lt;ul class=&quot;indent1&quot;&gt;<br /> &lt;li&gt;1em インデントするリスト 1em インデントするリスト 1em インデントするリスト 1em インデントするリスト 1em インデントするリスト 1em インデントするリスト 1em インデントするリスト 1em インデントするリスト 1em インデントするリスト 1em インデントするリスト 1em インデントするリスト 1em インデントするリスト&lt;/li&gt;<br />&lt;/ul&gt;<br />&lt;ul class=&quot;indent2&quot;&gt;<br /> &lt;li&gt;2em インデントするリスト 2em インデントするリスト 2em インデントするリスト 2em インデントするリスト 2em インデントするリスト 2em インデントするリスト 2em インデントするリスト 2em インデントするリスト 2em インデントするリスト 2em インデントするリスト 2em インデントするリスト 2em インデントするリスト&lt;/li&gt;<br />&lt;/ul&gt;<br />&lt;ul class=&quot;indent3&quot;&gt;<br /> &lt;li&gt;3em インデントするリスト 3em インデントするリスト 3em インデントするリスト 3em インデントするリスト 3em インデントするリスト 3em インデントするリスト 3em インデントするリスト 3em インデントするリスト 3em インデントするリスト 3em インデントするリスト 3em インデントするリスト 3em インデントするリスト 3em インデントするリスト 3em インデントするリスト 3em インデントするリスト&lt;/li&gt;<br />&lt;/ul&gt;<br />&lt;ul class=&quot;indent4&quot;&gt;<br /> &lt;li&gt;4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト 4em インデントするリスト&lt;/li&gt;<br />&lt;/ul&gt;</code></pre>
<pre><code class="css">dl.indent1 dd {padding: 0 0 0 1em;}
dl.indent2 dd {padding: 0 0 0 2em;}
dl.indent3 dd {padding: 0 0 0 3em;}
dl.indent4 dd {padding: 0 0 0 4em;}

.indent1 li,
p.indent1 {text-indent: -1em; margin-left: 1em;}
.indent2 li,
p.indent2 {text-indent: -2em; margin-left: 2em;}
.indent3 li,
p.indent3 {text-indent: -3em; margin-left: 3em;}
.indent4 li,

p.indent4 {text-indent: -4em; margin-left: 4em;}
.indent1 li,
p.indent1,
span.indent1 {text-indent: -1.4em; margin-left: 1em; display: block;}</code></pre>

<p class="module__title">Margin / Padding</p>
<pre><code class="css">.negative-margin-top-1 {margin-top: -1px !important;}<br />.negative-margin-top-5 {margin-top: -5px !important;}<br />.negative-margin-top-10 {margin-top: -10px !important;}<br />.negative-margin-top-20 {margin-top: -20px !important;}<br />.negative-margin-top-30 {margin-top: -30px !important;}<br />.negative-margin-top-40 {margin-top: -40px !important;}<br />.negative-margin-top-50 {margin-top: -50px !important;}

.margin-auto {margin-right: auto !important; margin-left: auto !important;}

.margin-top-0 {margin-top: 0 !important;}<br />.margin-top-10 {margin-top: 10px !important;}<br />.margin-top-20 {margin-top: 20px !important;}<br />.margin-top-30 {margin-top: 30px !important;}<br />.margin-top-40 {margin-top: 40px !important;}<br />.margin-top-40 {margin-top: 50px !important;}

.margin-right-0 {margin-right: 0px !important;}<br />.margin-right-10 {margin-right: 10px !important;}<br />.margin-right-20 {margin-right: 20px !important;}<br />.margin-right-30 {margin-right: 30px !important;}<br />.margin-right-40 {margin-right: 40px !important;}<br />.margin-right-50 {margin-right: 50px !important;}

.margin-bottom-0 {margin-bottom: 0 !important;}<br />.margin-bottom-5 {margin-bottom: 5px !important;}<br />.margin-bottom-10 {margin-bottom: 10px !important;}<br />.margin-bottom-20 {margin-bottom: 20px !important;}<br />.margin-bottom-30 {margin-bottom: 30px !important;}<br />.margin-bottom-40 {margin-bottom: 40px !important;}<br />.margin-bottom-50 {margin-bottom: 50px !important;}<br />.margin-bottom-60 {margin-bottom: 60px !important;}<br />.margin-bottom-70 {margin-bottom: 70px !important;}

.margin-left-0 {margin-left: 0 !important;}<br />.margin-left-10 {margin-left: 10px !important;}<br />.margin-left-15 {margin-left: 15px !important;}<br />.margin-left-20 {margin-left: 20px !important;}<br />.margin-left-30 {margin-left: 30px !important;}<br />.margin-left-40 {margin-left: 40px !important;}<br />.margin-left-50 {margin-left: 50px !important;}<br />.margin-left-60 {margin-left: 60px !important;}<br />.margin-left-70 {margin-left: 70px !important;}<br />.margin-left-80 {margin-left: 80px !important;}<br />.margin-left-90 {margin-left: 90px !important;}<br />.margin-left-100 {margin-left: 100px !important;}<br />.margin-left-110 {margin-left: 110px !important;}<br />.margin-left-120 {margin-left: 120px !important;}<br />.margin-left-130 {margin-left: 130px !important;}<br />.margin-left-140 {margin-left: 140px !important;}<br />.margin-left-150 {margin-left: 150px !important;}

.margin-0 {margin: 0 !important;}

.padding-0 {padding: 0 !important;}<br />.padding-5 {padding: 5px !important;}<br />.padding-10 {padding: 10px !important;}<br />.padding-15 {padding: 15px !important;}<br />.padding-20 {padding: 20px !important;}<br />.padding-30 {padding: 30px !important;}<br />.padding-40 {padding: 40px !important;}<br />.padding-50 {padding: 50px !important;}

.padding-top-0 {padding-top: 0 !important;}<br />.padding-top-5 {padding-top: 5px !important;}<br />.padding-top-10 {padding-top: 10px !important;}<br />.padding-top-15 {padding-top: 15px !important;}<br />.padding-top-20 {padding-top: 20px !important;}<br />.padding-top-30 {padding-top: 30px !important;}<br />.padding-top-40 {padding-top: 40px !important;}<br />.padding-top-50 {padding-top: 50px !important;}<br />.padding-top-60 {padding-top: 60px !important;}<br />.padding-top-70 {padding-top: 70px !important;}<br />.padding-top-80 {padding-top: 80px !important;}<br />.padding-top-90 {padding-top: 90px !important;}<br />.padding-top-100 {padding-top: 100px !important;}<br />.padding-top-110 {padding-top: 110px !important;}<br />.padding-top-130 {padding-top: 130px !important;}<br />.padding-top-140 {padding-top: 140px !important;}

.padding-right-0 {padding-right: 0 !important;}<br />.padding-right-10 {padding-right: 10px !important;}<br />.padding-right-20 {padding-right: 20px !important;}<br />.padding-right-30 {padding-right: 30px !important;}<br />.padding-right-40 {padding-right: 40px !important;}<br />.padding-right-50 {padding-right: 50px !important;}

.padding-bottom-0 {padding-bottom: 0 !important;}<br />.padding-bottom-10 {padding-bottom: 10px !important;}<br />.padding-bottom-20 {padding-bottom: 20px !important;}<br />.padding-bottom-25 {padding-bottom: 25px !important;}<br />.padding-bottom-30 {padding-bottom: 30px !important;}<br />.padding-bottom-40 {padding-bottom: 40px !important;}<br />.padding-bottom-50 {padding-bottom: 50px !important;}
</code></pre>

<p class="module__title">Width</p>
<pre><code class="css">.width-10 { width: 10px !important;}<br />.width-20 { width: 20px !important;}<br />.width-30 { width: 30px !important;}<br />.width-40 { width: 40px !important;}<br />.width-50 { width: 50px !important;}<br />.width-60 { width: 60px !important;}<br />.width-70 { width: 70px !important;}<br />.width-80 { width: 80px !important;}<br />.width-85 { width: 85px !important;}<br />.width-90 { width: 90px !important;}<br />.width-100 { width: 100px !important;}<br />.width-110 { width: 110px !important;}<br />.width-120 { width: 120px !important;}<br />.width-130 { width: 130px !important;}<br />.width-140 { width: 140px !important;}<br />.width-150 { width: 150px !important;}<br />.width-160 { width: 160px !important;}<br />.width-170 { width: 170px !important;}<br />.width-180 { width: 180px !important;}<br />.width-190 { width: 190px !important;}<br />.width-200 { width: 100px !important;}<br />.width-210 { width: 210px !important;}<br />.width-220 { width: 220px !important;}<br />.width-230 { width: 230px !important;}<br />.width-240 { width: 240px !important;}<br />.width-250 { width: 250px !important;}<br />.width-260 { width: 260px !important;}<br />.width-270 { width: 270px !important;}<br />.width-280 { width: 280px !important;}<br />.width-290 { width: 290px !important;}<br />.width-300 { width: 300px !important;}<br />.width-310 { width: 310px !important;}<br />.width-320 { width: 320px !important;}<br />.width-330 { width: 330px !important;}<br />.width-340 { width: 340px !important;}<br />.width-350 { width: 350px !important;}<br />.width-360 { width: 360px !important;}<br />.width-370 { width: 370px !important;}<br />.width-380 { width: 380px !important;}<br />.width-390 { width: 390px !important;}<br />.width-400 { width: 400px !important;}<br />.width-410 { width: 410px !important;}<br />.width-420 { width: 420px !important;}<br />.width-430 { width: 430px !important;}<br />.width-440 { width: 440px !important;}<br />.width-450 { width: 450px !important;}<br />.width-460 { width: 460px !important;}<br />.width-470 { width: 470px !important;}<br />.width-480 { width: 480px !important;}<br />.width-490 { width: 490px !important;}<br />.width-500 { width: 500px !important;}<br />.width-510 { width: 510px !important;}<br />.width-520 { width: 520px !important;}<br />.width-530 { width: 530px !important;}<br />.width-540 { width: 540px !important;}<br />.width-550 { width: 550px !important;}<br />.width-560 { width: 560px !important;}<br />.width-570 { width: 570px !important;}<br />.width-580 { width: 580px !important;}<br />.width-585 { width: 585px !important;}<br />.width-590 { width: 590px !important;}<br />.width-600 { width: 600px !important;}<br />.width-610 { width: 610px !important;}<br />.width-620 { width: 620px !important;}<br />.width-630 { width: 630px !important;}<br />.width-640 { width: 640px !important;}<br />.width-650 { width: 650px !important;}<br />.width-660 { width: 660px !important;}<br />.width-670 { width: 670px !important;}<br />.width-680 { width: 680px !important;}<br />.width-690 { width: 690px !important;}<br />.width-700 { width: 700px !important;}</code></pre>
<p class="module__title">Height</p>
<pre><code class="css">.height-10 { height: 10px !important;}<br />.height-20 { height: 20px !important;}<br />.height-30 { height: 30px !important;}<br />.height-40 { height: 40px !important;}<br />.height-50 { height: 50px !important;}<br />.height-60 { height: 60px !important;}<br />.height-70 { height: 70px !important;}<br />.height-80 { height: 80px !important;}<br />.height-85 { height: 85px !important;}<br />.height-90 { height: 90px !important;}<br />.height-100 { height: 100px !important;}<br />.height-110 { height: 110px !important;}<br />.height-120 { height: 120px !important;}<br />.height-130 { height: 130px !important;}<br />.height-140 { height: 140px !important;}<br />.height-150 { height: 150px !important;}<br />.height-160 { height: 160px !important;}<br />.height-170 { height: 170px !important;}<br />.height-180 { height: 180px !important;}<br />.height-190 { height: 190px !important;}<br />.height-200 { height: 100px !important;}<br />.height-210 { height: 210px !important;}<br />.height-220 { height: 220px !important;}<br />.height-230 { height: 230px !important;}<br />.height-240 { height: 240px !important;}<br />.height-250 { height: 250px !important;}<br />.height-260 { height: 260px !important;}<br />.height-270 { height: 270px !important;}<br />.height-280 { height: 280px !important;}<br />.height-290 { height: 290px !important;}<br />.height-300 { height: 300px !important;}<br />.height-310 { height: 310px !important;}<br />.height-320 { height: 320px !important;}<br />.height-330 { height: 330px !important;}<br />.height-340 { height: 340px !important;}<br />.height-350 { height: 350px !important;}<br />.height-360 { height: 360px !important;}<br />.height-370 { height: 370px !important;}<br />.height-380 { height: 380px !important;}<br />.height-390 { height: 390px !important;}<br />.height-400 { height: 400px !important;}<br />.height-410 { height: 410px !important;}<br />.height-420 { height: 420px !important;}<br />.height-430 { height: 430px !important;}<br />.height-440 { height: 440px !important;}<br />.height-450 { height: 450px !important;}<br />.height-460 { height: 460px !important;}<br />.height-470 { height: 470px !important;}<br />.height-480 { height: 480px !important;}<br />.height-490 { height: 490px !important;}<br />.height-500 { height: 500px !important;}<br />.height-510 { height: 510px !important;}<br />.height-520 { height: 520px !important;}<br />.height-530 { height: 530px !important;}<br />.height-540 { height: 540px !important;}<br />.height-550 { height: 550px !important;}<br />.height-560 { height: 560px !important;}<br />.height-570 { height: 570px !important;}<br />.height-580 { height: 580px !important;}<br />.height-585 { height: 585px !important;}<br />.height-590 { height: 590px !important;}<br />.height-600 { height: 600px !important;}<br />.height-610 { height: 610px !important;}<br />.height-620 { height: 620px !important;}<br />.height-630 { height: 630px !important;}<br />.height-640 { height: 640px !important;}<br />.height-650 { height: 650px !important;}<br />.height-660 { height: 660px !important;}<br />.height-670 { height: 670px !important;}<br />.height-680 { height: 680px !important;}<br />.height-690 { height: 690px !important;}<br />.height-700 { height: 700px !important;}</code></pre>
</div>
<!--module-->
</article>
</main>
</div>
<!--contents-->
<!--#include virtual="/ja/include/footer.txt" -->

  </body>
</html>
