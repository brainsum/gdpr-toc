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
</head>
<body id="page-main">
  <div id="page-wrapper">
    <div id="page-content">
      <div class="left">
        <div class="gdpr-title">
          <h1><?php echo $translations[$language]['gdpr'] ?></h1>
          <a href="https://eur-lex.europa.eu/legal-content/<?php echo strtoupper($language); ?>/TXT/?uri=celex:32016R0679" target="_blank" data-title-en="<?php echo $translations['en']['original'] ?>">(<?php echo $translations[$language]['original'] ?> &raquo;)</a>
        </div>
        <div class="title">
          <h2><?php echo $translations[$language]['toc'] ?></h2>
        </div>
        <div id="gdpr-lang">
          <form action="" method="post">
            <select name="languages" id="languages">
              <option value="0"><?php echo $translations[$language]['select_lang'] ?></option>
              <option value="en">EN</option>
              <option value="de">DE</option>
              <option value="hu">HU</option>
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
          <h1><?php echo $translations[$language]['gdpr'] ?></h1>
          <a href="https://eur-lex.europa.eu/legal-content/<?php echo strtoupper($language); ?>/TXT/?uri=celex:32016R0679" target="_blank" data-title-en="<?php echo $translations['en']['original'] ?>">(<?php echo $translations[$language]['original'] ?> &raquo;)</a>
        </div>
        <span class="border">
          <iframe src="" name="eurlex" id="eurlex" sandbox=""></iframe>
        </span>
      </div>
    </div>
    <div id="page-footer">
      <div class="brainsum-loves-gdpr">
        <ul>
          <li>Made with<img src="public/img/icon_heart.svg" alt="Love" class="icon heart">by <a href="https://brainsum.com" target="_blank" data-title-en="Brainsum">Brainsum</a><span>|</span></li>
          <li><img src="public/img/icon_octocat_low.svg" alt="Github" class="icon github"> <a href="https://github.com/brainsum/gdpr-toc" target="_blank" data-title-en="Github">Github</a></li>
        </ul>
      </div>
    </div>
  </div>
  <script>var GDPR = GDPR || {}; GDPR.lang = '<?php echo $language ?>'; GDPR.baseURL = '<?php echo BASE_URL ?>';</script>
  <script src="public/js/main.js"></script>
  <?php echo $config['analytics']; ?>
</body>
</html>
