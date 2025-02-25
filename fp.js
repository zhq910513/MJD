// 定位点  l9: for
// 首先检查 WQ_dy1_vk 是否有值

// 下方函数生成
function _$gi() {
    'use strict';
    var x = _3pi8h;
    var i = _2rx8h;
    var Cl, _$Bk, _$BL, _$Bx, _$BH, _$Bw, _$Be, _$By, _$BF, _$BJ;
    var r = [];
    var p = 1023;
    var g, c;
    l9: for (; ;) {
        switch (i[p++]) {
            case 3:
                r.push(_$BH);
                break;
            case 4:
                return;
                break;
            case 8:
                g = r.pop();
                r[r.length - 1] += g;
                break;
            case 9:
                _$BH = r[r.length - 1];
                break;
            case 11:
                r.push(Cl);
                break;
            case 12:
                r.push(Math);
                break;
            case 13:
                r.push(_$BF);
                break;
            case 17:
                return r.pop();
                break;
            case 21:
                r.push(i[p++]);
                break;
            case 22:
                r.push(_$zK);
                break;
            case 25:
                if (r[r.length - 2] != null) {
                    r[r.length - 3] = x.call(r[r.length - 3], r[r.length - 2], r[r.length - 1]);
                    r.length -= 2;
                } else {
                    g = r[r.length - 3];
                    r[r.length - 3] = g(r[r.length - 1]);
                    r.length -= 2;
                }
                break;
            case 28:
                r.push(_$Bx);
                break;
            case 34:
                _$BL = r[r.length - 1];
                break;
            case 35:
                r[r.length - 1] = r[r.length - 1].length;
                break;
            case 36:
                r.pop();
                break;
            case 37:
                _$BJ = r[r.length - 1];
                break;
            case 38:
                r.push(_$P);
                break;
            case 39:
                r.push(_$Be);
                break;
            case 40:
                g = r.pop();
                r[r.length - 1] -= g;
                break;
            case 42:
                if (r.pop())
                    p += i[p];
                else
                    ++p;
                break;
            case 44:
                if (r[r.length - 1] != null) {
                    r[r.length - 2] = x.call(r[r.length - 2], r[r.length - 1]);
                } else {
                    g = r[r.length - 2];
                    r[r.length - 2] = g();
                }
                r.length--;
                break;
            case 45:
                r.push({});
                break;
            case 47:
                r.push(Bh);
                break;
            case 49:
                _$Be = r[r.length - 1];
                break;
            case 53:
                r.push(function (_$Bm, _$Bz) {
                    'use strict';
                    var g = _3pi8h;
                    var j = _2rx8h;
                    var e = [];
                    var r = 1259;
                    var t, k;
                    l10: for (; ;) {
                        switch (j[r++]) {
                            case 15:
                                return;
                                break;
                            case 21:
                                return e.pop();
                                break;
                            case 29:
                                e.push(_$Bm);
                                break;
                            case 55:
                                if (e[e.length - 2] != null) {
                                    e[e.length - 3] = g.call(e[e.length - 3], e[e.length - 2], e[e.length - 1]);
                                    e.length -= 2;
                                } else {
                                    t = e[e.length - 3];
                                    e[e.length - 3] = t(e[e.length - 1]);
                                    e.length -= 2;
                                }
                                break;
                            case 57:
                                e.push(_$Bz);
                                break;
                            case 92:
                                e.push(null);
                                break;
                        }
                    }
                });
                break;
            case 57:
                r[r.length - 2][_1tz8h[66 + i[p++]]] = r[r.length - 1];
                r.length--;
                break;
            case 59:
                r.push(null);
                break;
            case 60:
                _$By = r[r.length - 1];
                break;
            case 61:
                _$Bw = r[r.length - 1];
                break;
            case 63:
                g = r.pop();
                r[r.length - 1] = r[r.length - 1] > g;
                break;
            case 64:
                Cl = r[r.length - 1];
                break;
            case 65:
                g = r.pop();
                r[r.length - 1] *= g;
                break;
            case 67:
                r.push(new Array(i[p++]));
                break;
            case 68:
                r.push(function (_$Bm, _$Bz) {
                    'use strict';
                    var l = _3pi8h;
                    var j = _2rx8h;
                    var _$Bg;
                    var h = [];
                    var k = 1265;
                    var y, g;
                    l11: for (; ;) {
                        switch (j[k++]) {
                            case 5:
                                if (h.pop())
                                    k += j[k];
                                else
                                    ++k;
                                break;
                            case 12:
                                h[h.length - 1] = -h[h.length - 1];
                                break;
                            case 17:
                                h[h.length - 4] = l.call(h[h.length - 4], h[h.length - 3], h[h.length - 2], h[h.length - 1]);
                                h.length -= 3;
                                break;
                            case 18:
                                h.push(_$Bm);
                                break;
                            case 25:
                                h.push(_1tz8h[79 + j[k++]]);
                                break;
                            case 29:
                                h[h.length - 2] = h[h.length - 2][h[h.length - 1]];
                                h.length--;
                                break;
                            case 32:
                                h.push(h[h.length - 1]);
                                h[h.length - 2] = h[h.length - 2][_1tz8h[79 + j[k++]]];
                                break;
                            case 36:
                                h.push(_$Bk);
                                break;
                            case 37:
                                _$Bm = h[h.length - 1];
                                break;
                            case 46:
                                h.push(_$S7);
                                break;
                            case 50:
                                k += j[k];
                                break;
                            case 51:
                                y = h.pop();
                                h[h.length - 1] = h[h.length - 1] < y;
                                break;
                            case 52:
                                h.push(j[k++]);
                                break;
                            case 65:
                                return h.pop();
                                break;
                            case 68:
                                _$Bg = h[h.length - 1];
                                break;
                            case 72:
                                y = h.pop();
                                h[h.length - 1] = h[h.length - 1] !== y;
                                break;
                            case 73:
                                if (h[h.length - 1]) {
                                    ++k;
                                    --h.length;
                                } else
                                    k += j[k];
                                break;
                            case 76:
                                return;
                                break;
                            case 82:
                                h.push(_$Bz);
                                break;
                            case 83:
                                h.pop();
                                break;
                            case 87:
                                h[h.length - 1] = h[h.length - 1].length;
                                break;
                            case 89:
                                h.push(_$Bg);
                                break;
                            case 91:
                                y = h.pop();
                                h[h.length - 1] += y;
                                break;
                            case 94:
                                h.push(_$Bg++);
                                break;
                        }
                    }
                });
                break;
            case 69:
                _$Bk = r[r.length - 1];
                break;
            case 70:
                r.push(_$By);
                break;
            case 71:
                r.push(_$BL);
                break;
            case 73:
                r.push(_$NB);
                break;
            case 74:
                r.push(_1tz8h[66 + i[p++]]);
                break;
            case 76:
                r.push(r[r.length - 1]);
                r[r.length - 2] = r[r.length - 2][_1tz8h[66 + i[p++]]];
                break;
            case 77:
                r.push(function (_$Bm, _$Bz) {
                    'use strict';
                    var s = _3pi8h;
                    var q = _2rx8h;
                    var _$Bg, _$BB, _$Bb, _$BC, _$Bv, _$BZ, _$BQ;
                    var b = [];
                    var p = 1324;
                    var t, y;
                    l12: for (; ;) {
                        switch (q[p++]) {
                            case 2:
                                return b.pop();
                                break;
                            case 4:
                                _$BB = b[b.length - 1];
                                break;
                            case 5:
                                b.push(_$Bk);
                                break;
                            case 7:
                                b.push(Math);
                                break;
                            case 9:
                                _$Bb = b[b.length - 1];
                                break;
                            case 11:
                                b.push(_$Bm);
                                break;
                            case 12:
                                t = b.pop();
                                b[b.length - 1] = b[b.length - 1] == t;
                                break;
                            case 17:
                                b.push(_$BB--);
                                break;
                            case 19:
                                b.push(q[p++]);
                                break;
                            case 21:
                                t = b.pop();
                                b[b.length - 1] |= t;
                                break;
                            case 22:
                                t = b.pop();
                                b[b.length - 1] = b[b.length - 1] < t;
                                break;
                            case 25:
                                b.push(_$Bg);
                                break;
                            case 26:
                                if (b.pop())
                                    p += q[p];
                                else
                                    ++p;
                                break;
                            case 28:
                                p += q[p];
                                break;
                            case 29:
                                _$BC = b[b.length - 1];
                                break;
                            case 32:
                                b[b.length - 4] = s.call(b[b.length - 4], b[b.length - 3], b[b.length - 2], b[b.length - 1]);
                                b.length -= 3;
                                break;
                            case 35:
                                _$BQ = b[b.length - 1];
                                break;
                            case 36:
                                b.push(_$BC);
                                break;
                            case 38:
                                b.push(_$BZ);
                                break;
                            case 40:
                                b[b.length - 3][b[b.length - 2]] = b[b.length - 1];
                                b[b.length - 3] = b[b.length - 1];
                                b.length -= 2;
                                break;
                            case 42:
                                b.pop();
                                break;
                            case 43:
                                t = b.pop();
                                b[b.length - 1] *= t;
                                break;
                            case 44:
                                b[b.length - 2] = b[b.length - 2][b[b.length - 1]];
                                b.length--;
                                break;
                            case 46:
                                b.push(_$BZ++);
                                break;
                            case 47:
                                b.push(_$Bv);
                                break;
                            case 48:
                                b.push(_$Bz);
                                break;
                            case 51:
                                t = b.pop();
                                b[b.length - 1] -= t;
                                break;
                            case 54:
                                return;
                                break;
                            case 55:
                                b.push(_$Bb++);
                                break;
                            case 56:
                                b.push(new Array(q[p++]));
                                break;
                            case 60:
                                if (b[b.length - 1]) {
                                    ++p;
                                    --b.length;
                                } else
                                    p += q[p];
                                break;
                            case 63:
                                b.push(_$BQ);
                                break;
                            case 68:
                                if (b[b.length - 2] != null) {
                                    b[b.length - 3] = s.call(b[b.length - 3], b[b.length - 2], b[b.length - 1]);
                                    b.length -= 2;
                                } else {
                                    t = b[b.length - 3];
                                    b[b.length - 3] = t(b[b.length - 1]);
                                    b.length -= 2;
                                }
                                break;
                            case 70:
                                b.push(_$BB);
                                break;
                            case 71:
                                b[b.length - 1] = b[b.length - 1].length;
                                break;
                            case 74:
                                _$BZ = b[b.length - 1];
                                break;
                            case 77:
                                _$Bv = b[b.length - 1];
                                break;
                            case 80:
                                b.push(_1tz8h[83 + q[p++]]);
                                break;
                            case 81:
                                b.push(_$Bb);
                                break;
                            case 82:
                                if (b.pop())
                                    ++p;
                                else
                                    p += q[p];
                                break;
                            case 85:
                                if (b[b.length - 1] != null) {
                                    b[b.length - 2] = s.call(b[b.length - 2], b[b.length - 1]);
                                } else {
                                    t = b[b.length - 2];
                                    b[b.length - 2] = t();
                                }
                                b.length--;
                                break;
                            case 86:
                                b.push(b[b.length - 1]);
                                b[b.length - 2] = b[b.length - 2][_1tz8h[83 + q[p++]]];
                                break;
                            case 88:
                                b.push(--_$Bz);
                                break;
                            case 92:
                                _$Bg = b[b.length - 1];
                                break;
                            case 96:
                                t = b.pop();
                                b[b.length - 1] += t;
                                break;
                        }
                    }
                });
                break;
            case 78:
                r[r.length - 4] = x.call(r[r.length - 4], r[r.length - 3], r[r.length - 2], r[r.length - 1]);
                r.length -= 3;
                break;
            case 79:
                r[r.length - 5] = x.call(r[r.length - 5], r[r.length - 4], r[r.length - 3], r[r.length - 2], r[r.length - 1]);
                r.length -= 4;
                break;
            case 80:
                r.push(_$NO);
                break;
            case 82:
                r.push(function (_$Bm, _$Bz) {
                    'use strict';
                    var a = _3pi8h;
                    var q = _2rx8h;
                    var w = [];
                    var u = 1465;
                    var j, t;
                    l13: for (; ;) {
                        switch (q[u++]) {
                            case 21:
                                w.push(_$Bz);
                                break;
                            case 31:
                                j = w.pop();
                                w[w.length - 1] = w[w.length - 1] < j;
                                break;
                            case 70:
                                return;
                                break;
                            case 74:
                                return w.pop();
                                break;
                            case 83:
                                w.push(_$Bm);
                                break;
                        }
                    }
                });
                break;
            case 84:
                r.push(undefined);
                break;
            case 86:
                _$Bx = r[r.length - 1];
                break;
            case 87:
                _$BF = r[r.length - 1];
                break;
            case 88:
                r.push(_$gc);
                break;
            case 89:
                g = r.pop();
                r[r.length - 1] |= g;
                break;
            case 94:
                r.push(_$Bw);
                break;
            case 96:
                p += i[p];
                break;
            case 97:
                r.push(_$BJ);
                break;
        }
    }
}