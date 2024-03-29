---
layout: "@layouts/LibraryLayout.astro"
---

<!DOCTYPE html>
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
    <link rel="stylesheet" href="/css/ir.css" />
    <script type="text/javascript" src="/js/library.js"></script>
    <script type="text/javascript" src="/js/qa.js"></script>
  </head>

  <body id="ir">
    <!--#include virtual="/ja/include/header.txt" -->
    <div class="topic-path">
      <section>
        <ol>
          <li><a href="/">モジュール一覧</a></li>
          <li>IR情報</li>
        </ol>
      </section>
    </div>
    <!--topic-path-->
    <div class="contents">
      <main>
        <article>
          <div class="title">
            <h1>Module list <span>モジュール一覧 : IR情報</span></h1>
          </div>
          <!--title-->
          <div class="module">
            <p class="module__title">IR情報:基本設定</p>
            <p>IR情報用のCSS</p>
            <pre
              class="clear-both"
            ><code class="html">&lt;link rel=&quot;stylesheet&quot; href=&quot;"/css/ir.css&quot; type=&quot;text/css&quot; media=&quot;all&quot; /&gt;</code></pre>
            <p>bodyに#irを追加してグローバルナビゲーションをカレント表示に</p>
            <pre><code class="html">&lt;body id=&quot;ir&quot;&gt;</code></pre>
            <p class="module__title">IRライブラリ</p>
            <h2>決算関連資料</h2>
            <p>【訂正】ボタンは.dl-dateにdtがないと非表示になる。</p>
            <table
              summary="決算関連資料"
              class="library-table th-top scroll-table"
              ac-option="tbody tr,#accord-btn-term,5"
            >
              <thead>
                <tr>
                  <th scope="col">&nbsp;</th>
                  <th scope="col">決算短信</th>
                  <th scope="col">
                    決算説明会<br />
                    資料
                  </th>
                  <th scope="col">
                    資産運用<br />
                    報告
                  </th>
                  <th scope="col">
                    有価証券<br />
                    報告書
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="cellW1 align-middle">
                    第00期<br />
                    （0000年00月期）
                  </td>
                  <td>
                    <a href="#" target="_blank"
                      ><span class="icon-l ic-pdf-l">PDF</span></a
                    >
                    （000KB）<a href="#file1" class="popup-open"
                      ><span>訂正</span></a
                    >
                    <div id="file1" class="correction popup-area">
                      <p>20●●年●月期(第●期) 決算短信 訂正資料</p>
                      <dl class="dl-date">
                        <dt>2016年●月●日</dt>
                        <dd>
                          <a href="#" target="_blank">決算短信（訂正）</a>
                          <span class="icon-s ic-pdf-s">PDF</span>（PDF:82.5KB）
                        </dd>
                        <dt>2016年●月●日</dt>
                        <dd>
                          <a href="#" target="_blank">決算短信（訂正）</a>
                          <span class="icon-s ic-pdf-s">PDF</span>（PDF:82.5KB）
                        </dd>
                      </dl>
                    </div>
                    <!--popup-area -->
                  </td>
                  <td>
                    <a href="#" target="_blank"
                      ><span class="icon-l ic-pdf-l">PDF</span></a
                    >
                    （000KB）<a href="#file2" class="popup-open"
                      ><span>訂正</span></a
                    >
                    <div id="file2" class="correction popup-area">
                      <h5>訂正履歴 ： 決算短信</h5>
                      <p>第00期（0000年0月期）</p>
                      <dl class="dl-date"></dl>
                    </div>
                  </td>
                  <!--popup-area -->
                  <td>
                    <a href="#" target="_blank"
                      ><span class="icon-l ic-pdf-l">PDF</span></a
                    >
                    （000KB）<a href="#file3" class="popup-open"
                      ><span>訂正</span></a
                    >
                    <div id="file3" class="correction popup-area">
                      <h5>訂正履歴 ： 決算短信</h5>
                      <p>第00期（0000年0月期）</p>
                      <dl class="dl-date"></dl>
                    </div>
                  </td>
                  <!--popup-area -->
                  <td>
                    <a href="#" target="_blank"
                      ><span class="icon-l ic-pdf-l">PDF</span></a
                    >
                    （000KB）<a href="#file4" class="popup-open"
                      ><span>訂正</span></a
                    >
                    <div id="file4" class="correction popup-area">
                      <h5>訂正履歴 ： 決算短信</h5>
                      <p>第00期（0000年0月期）</p>
                      <dl class="dl-date"></dl>
                    </div>
                  </td>
                  <!--popup-area -->                  
                </tr>
              </tbody>
            </table>
            <pre
              class="clear-both"
            ><code class="html">&lt;script type=&quot;text/javascript&quot; src=&quot;/js/library.js&quot;&gt;&lt;/script&gt;</code></pre>
            <pre><code class="html">&lt;table summary=&quot;決算関連資料&quot; class=&quot;library-table th-top scroll-table&quot;  ac-option=&quot;tbody tr,#accord-btn-term,5&quot;&gt;<br>          &lt;thead&gt;<br>            &lt;tr&gt;<br>              &lt;th scope=&quot;col&quot;&gt;&amp;nbsp;&lt;/th&gt;<br>              &lt;th scope=&quot;col&quot;&gt;決算短信&lt;/th&gt;<br>              &lt;th scope=&quot;col&quot;&gt;決算説明会&lt;br /&gt;<br>                資料&lt;/th&gt;<br>              &lt;th scope=&quot;col&quot;&gt;資産運用&lt;br /&gt;<br>                報告&lt;/th&gt;<br>              &lt;th scope=&quot;col&quot;&gt;有価証券&lt;br /&gt;<br>                報告書&lt;/th&gt;<br>            &lt;/tr&gt;<br>          &lt;/thead&gt;<br>          &lt;tbody&gt;<br>            &lt;tr&gt;<br>              &lt;td class=&quot;cellW1 align-middle&quot;&gt;第00期&lt;br /&gt;<br>                （0000年00月期）&lt;/td&gt;<br>              &lt;td&gt;&lt;a href=&quot;#&quot; target=&quot;_blank&quot;&gt;&lt;span class=&quot;icon-l ic-pdf-l&quot;&gt;PDF&lt;/span&gt;&lt;/a&gt; （000KB）&lt;a href=&quot;#file1&quot; class=&quot;popup-open&quot;&gt;&lt;span&gt;訂正&lt;/span&gt;&lt;/a&gt;<br>                &lt;div id=&quot;file1&quot; class=&quot;correction popup-area&quot;&gt;<br>                  &lt;p&gt;20●●年●月期(第●期) 決算短信 訂正資料&lt;/p&gt;<br>                  &lt;dl class=&quot;dl-date&quot;&gt;<br>                    &lt;dt&gt;2016年●月●日&lt;/dt&gt;<br>                    &lt;dd&gt;&lt;a href=&quot;#&quot; target=&quot;_blank&quot;&gt;決算短信（訂正）&lt;/a&gt; &lt;span class=&quot;icon-s ic-pdf-s&quot;&gt;PDF&lt;/span&gt;（PDF:82.5KB）&lt;/dd&gt;<br>                    &lt;dt&gt;2016年●月●日&lt;/dt&gt;<br>                    &lt;dd&gt;&lt;a href=&quot;#&quot; target=&quot;_blank&quot;&gt;決算短信（訂正）&lt;/a&gt; &lt;span class=&quot;icon-s ic-pdf-s&quot;&gt;PDF&lt;/span&gt;（PDF:82.5KB）&lt;/dd&gt;<br>                  &lt;/dl&gt;<br>                &lt;/div&gt;<br>                <br>                &lt;!--popup-area --&gt;&lt;/td&gt;<br>              &lt;td&gt;&lt;a href=&quot;#&quot; target=&quot;_blank&quot;&gt;&lt;span class=&quot;icon-l ic-pdf-l&quot;&gt;PDF&lt;/span&gt;&lt;/a&gt; （000KB）&lt;a href=&quot;#file2&quot; class=&quot;popup-open&quot;&gt;&lt;span&gt;訂正&lt;/span&gt;&lt;/a&gt;<br>                &lt;div id=&quot;file2&quot; class=&quot;correction popup-area&quot;&gt;<br>                  &lt;h5&gt;訂正履歴 ： 決算短信&lt;/h5&gt;<br>                  &lt;p&gt;第00期（0000年0月期）&lt;/p&gt;<br>                  &lt;dl class=&quot;dl-date&quot;&gt;<br>                  &lt;/dl&gt;<br>                &lt;/div&gt;<br>                <br>                &lt;!--popup-area --&gt;&lt;/td&gt;<br>              &lt;td&gt;&lt;a href=&quot;#&quot; target=&quot;_blank&quot;&gt;&lt;span class=&quot;icon-l ic-pdf-l&quot;&gt;PDF&lt;/span&gt;&lt;/a&gt; （000KB）&lt;a href=&quot;#file3&quot; class=&quot;popup-open&quot;&gt;&lt;span&gt;訂正&lt;/span&gt;&lt;/a&gt;<br>                &lt;div id=&quot;file3&quot; class=&quot;correction popup-area&quot;&gt;<br>                  &lt;h5&gt;訂正履歴 ： 決算短信&lt;/h5&gt;<br>                  &lt;p&gt;第00期（0000年0月期）&lt;/p&gt;<br>                  &lt;dl class=&quot;dl-date&quot;&gt;<br>                  &lt;/dl&gt;<br>                &lt;/div&gt;<br>                <br>                &lt;!--popup-area --&gt;&lt;/td&gt;<br>              &lt;td&gt;&lt;a href=&quot;#&quot; target=&quot;_blank&quot;&gt;&lt;span class=&quot;icon-l ic-pdf-l&quot;&gt;PDF&lt;/span&gt;&lt;/a&gt; （000KB）&lt;a href=&quot;#file4&quot; class=&quot;popup-open&quot;&gt;&lt;span&gt;訂正&lt;/span&gt;&lt;/a&gt;<br>                &lt;div id=&quot;file4&quot; class=&quot;correction popup-area&quot;&gt;<br>                  &lt;h5&gt;訂正履歴 ： 決算短信&lt;/h5&gt;<br>                  &lt;p&gt;第00期（0000年0月期）&lt;/p&gt;<br>                  &lt;dl class=&quot;dl-date&quot;&gt;<br>                  &lt;/dl&gt;<br>                &lt;/div&gt;<br>                <br>                &lt;!--popup-area --&gt;&lt;/td&gt;<br>            &lt;/tr&gt;<br>          &lt;/tbody&gt;<br>        &lt;/table&gt;</code></pre>
            <p class="module__title">IRスケジュール</p>
            <p>
              <img
                src="/img/ja/ir/schedule.png"
                width="720"
                height="381"
                alt="年間スケジュール"
              />
            </p>
            <pre><code class="html">&lt;p&gt;&lt;img src=&quot;/img/ja/ir/achedule.png&quot; width=&quot;720&quot; height=&quot;381&quot; alt=&quot;年間スケジュール&quot;/&gt;&lt;/p&gt;</code></pre>
            <p class="module__title">分配金について</p>
            <dl class="distribute-actual">
              <dt>2016年●月期（第●期）</dt>
              <dd><em>00,000</em>円</dd>
            </dl>
            <dl class="distribute-forecast">
              <dt>2016年●月期（第●期）</dt>
              <dd><em>00,000</em>円</dd>
            </dl>
            <pre><code class="html">&lt;dl class=&quot;distribute-actual&quot;&gt;<br>      &lt;dt&gt;2016年●月期（第●期）&lt;/dt&gt;<br>      &lt;dd&gt;&lt;em&gt;00,000&lt;/em&gt;円&lt;/dd&gt;<br>    &lt;/dl&gt;<br>    &lt;dl class=&quot;distribute-forecast&quot;&gt;<br>      &lt;dt&gt;2016年●月期（第●期）&lt;/dt&gt;<br>      &lt;dd&gt;&lt;em&gt;00,000&lt;/em&gt;円&lt;/dd&gt;<br>    &lt;/dl&gt;</code></pre>
          </div>
          <!--module-->
        </article>
      </main>
    </div>
    <!--#include virtual="/ja/include/footer.txt" -->
  </body>
</html>
