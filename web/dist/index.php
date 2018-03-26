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
  <base href="<?php echo BASE_URL ?>" target="_blank">
  <link rel="stylesheet" href="public/css/main.css">
</head>
<body id="page-main">
  <div id="page-wrapper">
    <div id="page-content">
    <div class="left">
      <div class="gdpr-title">
        <h1><?php echo $translations[$language]['gdpr'] ?></h1>
      </div>
      <div id="gdpr-lang">
        <form action="" method="post">
          <label for="url"><?php echo $translations[$language]['select_lang'] ?></label><br>
          <select name="languages" id="languages">
            <option value="0"><?php echo $translations[$language]['select_lang'] ?></option>
            <option value="hu">HU</option>
            <option value="en">EN</option>
          </select>
        </form>
      </div>
      <div id="gdpr-toc">
        <div class="title">
          <h2><?php echo $translations[$language]['toc'] ?></h2>
        </div>
        <div class="content">
          <?php include './inc/parts/toc_'.$language.'.html'; ?>
        </div>
      </div>
    </div>
    <div class="right">
      <iframe src="" name="eurlex" id="eurlex" sandbox=""></iframe>
    </div>
  </div>
  <script>var GDPR = GDPR || {}; GDPR.lang = '<?php echo $language ?>'; GDPR.baseURL = '<?php echo BASE_URL ?>';</script>
  <script src="public/js/main.js"></script>
</body>
</html>
