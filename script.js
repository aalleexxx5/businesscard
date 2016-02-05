var ctx = (function () {
    var d=document, w=window, c=d.getElementById('canvas'),
        ctx = c.getContext('2d');

    function resize() {
        c.width = w.innerWidth;
        c.height = w.innerHeight - 20;
    }
    resize();
    w.addEventListener('resize', resize, false);

    return ctx;
})();