<?php
    $d = dir(dirname(__FILE__) . "/Videos");
    $xs = array();
    while (false !== ($entry = $d->read())) {
       if(is_file(dirname(__FILE__) . "/Videos/" . $entry)) $xs[] = $entry;
    }
    $d->close();
?>
<html>
<head>
</head>
<body>
    <div style="position:fixed;z-index:0;right:0;bottom:0">
        <script type="text/javascript" src="//counter.websiteout.net/js/1/4/0/0"></script>
    </div>
    <video autoplay id="pl" width=100% controls src="https://whats-dad.de/Videos/<?= rawurlencode($xs[rand() % count($xs)]) ?>" style="height:100%" onended="location.reload();"></video>
    
<script>
    document.getElementById("pl").volume = 0.35;
</script>
</body>
</html>


