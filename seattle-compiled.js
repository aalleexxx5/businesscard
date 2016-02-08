function PlaySeattle() {
    function c(a) {
        for (var c = [], b = 0; b < a.length; b++)c[b] = 128 + Math.round(127 * a[b]);
        return c
    }

    for (var b = [349.23, 466.16, 587.33, 523.33, 466.16, 392, 466.16, 587.33, 523.25, 466.16, 349.23, 392, 466.16, 523.25, 466.16, 523.25, 587.33, 466.16], d = [.375, .375, .25, .5, .5, .375, .375, .25, .5, .5, 1.25, .25, .25, 1, .25, .125, .4, .6], e = [466.16, 698.46, 466.16, 466.16, 698.46, 932.33, 466.16, 880, 932.33, 698.46, 880, 587.33, 698.46, 698.46, 587.33], a = [], f = [], k, h = 0; h < b.length; h++) {
        k = 44100 * d[h];
        for (var g = 0; g < k; g++) {
            var m = g / k;
            a[a.length] =
                Math.sin(g / 44100 * b[h] * Math.PI * 2);
            a[a.length - 1] *= 1 - m
        }
    }
    for (h = 0; h < e.length; h++)for (k = 5512.5, g = 0; g < k; g++)m = g / k, f[f.length] = Math.sin(g / 44100 * e[h] * Math.PI * 2), f[f.length - 1] *= 1 - m;
    var b = new RIFFWAVE, p = new Audio, l = new Audio;
    p.loop = !0;
    l.loop = !0;
    l.volume = .2;
    a = c(a);
    f = c(f);
    b.Make(a);
    p.src = b.dataURI;
    b.Make(f);
    l.src = b.dataURI;
    setTimeout(function () {
        p.play()
    }, 250 * e.length);
    setTimeout(function () {
        l.play()
    }, 10)
}
var FastBase64 = {
    chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encLookup: [], Init: function () {
        for (var c = 0; 4096 > c; c++)this.encLookup[c] = this.chars[c >> 6] + this.chars[c & 63]
    }, Encode: function (c) {
        for (var b = c.length, d = "", e = 0; 2 < b;)n = c[e] << 16 | c[e + 1] << 8 | c[e + 2], d += this.encLookup[n >> 12] + this.encLookup[n & 4095], b -= 3, e += 3;
        if (0 < b) {
            var a = (c[e] & 252) >> 2, f = (c[e] & 3) << 4;
            1 < b && (f |= (c[++e] & 240) >> 4);
            d += this.chars[a];
            d += this.chars[f];
            2 == b && (a = (c[e++] & 15) << 2, a |= (c[e] & 192) >> 6, d += this.chars[a]);
            1 == b && (d +=
                "=");
            d += "="
        }
        return d
    }
};
FastBase64.Init();
var RIFFWAVE = function (c) {
    function b(a) {
        return [a & 255, a >> 8 & 255, a >> 16 & 255, a >> 24 & 255]
    }

    function d(a) {
        return [a & 255, a >> 8 & 255]
    }

    function e(a) {
        for (var b = [], c = 0, d = a.length, e = 0; e < d; e++)b[c++] = a[e] & 255, b[c++] = a[e] >> 8 & 255;
        return b
    }

    this.data = [];
    this.wav = [];
    this.dataURI = "";
    this.header = {
        chunkId: [82, 73, 70, 70],
        chunkSize: 0,
        format: [87, 65, 86, 69],
        subChunk1Id: [102, 109, 116, 32],
        subChunk1Size: 16,
        audioFormat: 1,
        numChannels: 1,
        sampleRate: 44100,
        byteRate: 0,
        blockAlign: 0,
        bitsPerSample: 8,
        subChunk2Id: [100, 97, 116, 97],
        subChunk2Size: 0
    };
    this.Make = function (a) {
        a instanceof Array && (this.data = a);
        this.header.blockAlign = this.header.numChannels * this.header.bitsPerSample >> 3;
        this.header.byteRate = this.header.blockAlign * this.sampleRate;
        this.header.subChunk2Size = this.data.length * (this.header.bitsPerSample >> 3);
        this.header.chunkSize = 36 + this.header.subChunk2Size;
        this.wav = this.header.chunkId.concat(b(this.header.chunkSize), this.header.format, this.header.subChunk1Id, b(this.header.subChunk1Size), d(this.header.audioFormat), d(this.header.numChannels),
            b(this.header.sampleRate), b(this.header.byteRate), d(this.header.blockAlign), d(this.header.bitsPerSample), this.header.subChunk2Id, b(this.header.subChunk2Size), 16 == this.header.bitsPerSample ? e(this.data) : this.data);
        this.dataURI = "data:audio/wav;base64," + FastBase64.Encode(this.wav)
    };
    c instanceof Array && this.Make(c)
};
