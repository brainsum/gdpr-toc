<?php
include 'inc/config.php';

$language = (isset($_GET['lang']) && ! empty($_GET['lang'])) ? strtolower($_GET['lang']) : 'en';
if( ! in_array($language, $config['languages'])) die('Wrong language!');

include 'inc/translations.php';

?>
<!DOCTYPE html>
<html lang="<?php echo $language ?>">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title><?php echo $translations[$language]['title'] ?></title>
  <link rel="stylesheet" href="public/css/main.css">

  <meta property="og:url" content="<?php echo BASE_URL; ?>">
  <meta property="og:type" content="website">
  <meta property="og:title" content="<?php echo $translations[$language]['title'] ?>">
  <meta property="og:image" content="public/img/ogimage.png">
  <meta property="og:description" content="Description Here">
  <?php if(! empty($config['GTM'])): ?>
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','<?php echo $config['GTM'] ?>');</script>
  <!-- End Google Tag Manager -->
  <?php endif; ?>
</head>
<body id="page-main">
  <div id="page-wrapper">
    <div id="page-content">
      <div class="left">
        <div class="gdpr-title">
          <h1><?php echo $translations[$language]['gdpr'] ?></h1>
        </div>
        <div class="title">
          <h2><?php echo $translations[$language]['toc'] ?></h2>
        </div>
        <div id="gdpr-lang">
          <form action="" method="post">
            <select name="languages" id="languages">
              <?php foreach($config['languages'] as $lang): ?>
              <option value="<?php echo $lang ?>"><?php echo strtoupper($lang) ?></option>
              <?php endforeach; ?>
            </select>
          </form>
        </div>
        <div id="gdpr-toc">   
          <div class="content">
            <?php include './inc/parts/toc_'.$language.'.html'; ?>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="gdpr-title">
          <p><?php echo sprintf($translations[$language]['original'], sprintf('https://eur-lex.europa.eu/legal-content/%s/TXT/?uri=celex:32016R0679', strtoupper($language))) ?></p>
        </div>
        <span class="border">
          <iframe src="" name="eurlex" id="eurlex" sandbox=""></iframe>
        </span>
      </div>
    </div>
    <div id="page-footer">
      <div class="brainsum-loves-gdpr">
        <ul>
          <li>Made with<img src="public/img/icon_heart.svg" alt="Love" class="icon heart">by <a href="https://brainsum.com" target="_blank" rel="noopener noreferrer" data-title-en="Brainsum footer link">Brainsum</a><span>|</span></li>
          <li><img src="public/img/icon_octocat_low.svg" alt="Github" class="icon github"> <a href="https://github.com/brainsum/gdpr-toc" target="_blank" rel="noopener noreferrer" data-title-en="Github footer link">Github</a></li>
        </ul>
      </div>
    </div>
  </div>
  <script>var GDPR = GDPR || {}; GDPR.lang = '<?php echo $language ?>'; GDPR.baseURL = '<?php echo BASE_URL ?>';</script>
  <script src="public/js/main.js"></script>
  <?php if(! empty($config['GTM'])): ?>
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=<?php echo $config['GTM'] ?>"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
  <?php endif; ?>
</body>
</html>
