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
</head>
<body id="page-main">
  <div id="page-wrapper">
    <div id="page-content">
      <div class="left">
        <div class="gdpr-title">
          <h1><?php echo $translations[$language]['gdpr'] ?></h1>
          <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex:32016R0679" target="_blank">(See the original website &raquo;)</a>
        </div>
        <div class="title">
          <h2><?php echo $translations[$language]['toc'] ?></h2>
        </div>
        <div id="gdpr-lang">
          <form action="" method="post">
            <select name="languages" id="languages">
              <option value="0"><?php echo $translations[$language]['select_lang'] ?></option>
              <option value="hu">HU</option>
              <option value="en">EN</option>
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
          <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex:32016R0679" target="_blank">(See the original website &raquo;)</a>
        </div>
        <span class="border">
          <iframe src="" name="eurlex" id="eurlex" sandbox=""></iframe>
        </span>
      </div>
    </div>
    <div id="page-footer">
      <div class="brainsum-loves-gdpr">
        <p>Made with<img src="public/img/icon_heart.svg" alt="Love" class="icon heart">by <a href="https://brainsum.com" target="_blank">Brainsum</a></p>
      </div>
    </div>
  </div>
  <script>var GDPR = GDPR || {}; GDPR.lang = '<?php echo $language ?>'; GDPR.baseURL = '<?php echo BASE_URL ?>';</script>
  <script src="public/js/main.js"></script>
</body>
</html>
