// 替换 window 为 global
global._XmXfNQYHFGjdAZVGdWNUMFMHHgmGPGKQ = function() {
    return new Date();
};

global._dTARCadlceAAHfUhSYMlfdPlQYbaefmJ = function(a, b) {
    return Date[a].apply(Date, b);
};

global.HjFcnfXZFDmkHFmSPRiFZYFaKnMUmaiK = 'Zd+YxmWOSj8yHzlkECWH4O6AuVgtaoSjcwnMFwYjNJA5W5Erjdv3Egv/U8rKyqANA3mb7E6rmOK2NyHNkpYXc3ddyxNf6j4977dHqvuZmBh6+Ct7gePX87x+qSu4V8Gss9mSyLnXUMEVsOMGG97rRaqCNhpDNbG5160FAlkQnSmt4sCPR5wpQhvnviJGeqHDxk8bi86ilC3h6kkPnm+YdbhALJXTC1X1aq/UbOy4MhM=';

var __TENCENT_CHAOS_STACK = function() {
    function __TENCENT_CHAOS_VM(I, D, U, g, C, E, k, c) {
        var B = !g;
        I = +I,
        D = D || [0],
        g = g || [[this], [{}]],
        C = C || {};
        var M, d = [], H = null;
        function Q() {
            return function(B, d, H) {
                return new (Function.bind.apply(B, d))
            }
            .apply(null, arguments)
        }
        Function.prototype.bind || (M = [].slice,
        Function.prototype.bind = function(B) {
            if ("function" != typeof this)
                throw new TypeError("bind101");
            var d = M.call(arguments, 1)
              , H = d.length
              , Q = this
              , A = function() {}
              , w = function() {
                return d.length = H,
                d.push.apply(d, arguments),
                Q.apply(A.prototype.isPrototypeOf(this) ? this : B, d)
            };
            return this.prototype && (A.prototype = this.prototype),
            w.prototype = new A,
            w
        }
        );
        var A = [function() {
            var B = D[I++]
              , d = B ? g.slice(-B) : [];
            g.length -= B,
            d.unshift(null),
            g.push(Q(g.pop(), d))
        }
        , function() {
            g[g[g.length - 2][0]][0] = g[g.length - 1]
        }
        , function() {
            d.push([D[I++], g.length, D[I++]])
        }
        , function() {
            var B = D[I++]
              , d = B ? g.slice(-B) : [];
            g.length -= B,
            g.push(g.pop().apply(U, d))
        }
        , function() {
            g[g.length - 2] = g[g.length - 2] >> g.pop()
        }
        , function() {
            g[g.length - 2] = g[g.length - 2] << g.pop()
        }
        , function() {
            var B = g.pop()
              , d = g.pop();
            g.push([d[0][d[1]], B])
        }
        , function() {
            g[g.length - 1] += String.fromCharCode(D[I++])
        }
        , , function() {
            g.push(undefined)
        }
        , , function() {
            g[g.length - 2] = g[g.length - 2] % g.pop()
        }
        , function() {
            g.push(D[I++])
        }
        , function() {
            g[g.length - 2] = g[g.length - 2] === g.pop()
        }
        , function() {
            var B = D[I++]
              , d = g[g.length - 2 - B];
            g[g.length - 2 - B] = g.pop(),
            g.push(d)
        }
        , function() {
            g.push(!0)
        }
        , , function() {
            g[g.length - 1] = D[I++]
        }
        , , function() {
            g.push([D[I++]])
        }
        , function() {
            g.push(null)
        }
        , function() {
            g.push(g[g.pop()[0]][0])
        }
        , function() {
            g.push(!g.pop())
        }
        , function() {
            g[g.length - 2] = g[g.length - 2] / g.pop()
        }
        , function() {
            g[g.length - 2] = g[g.length - 2]in g.pop()
        }
        , function() {
            var B = g.pop();
            g.push(B[0][B[1]])
        }
        , , function() {
            var B = D[I++];
            g[B] = g[B] === undefined ? [] : g[B]
        }
        , , function() {
            g.push(g[D[I++]][0])
        }
        , function() {
            g.push([g.pop(), g.pop()].reverse())
        }
        , , function() {
            return !!H
        }
        , function() {
            g.push(g[g.length - 1])
        }
        , function() {
            var B = D[I++]
              , d = B ? g.slice(-B) : [];
            g.length -= B;
            B = g.pop();
            g.push(B[0][B[1]].apply(B[0], d))
        }
        , function() {
            g.length = D[I++]
        }
        , , function() {
            g[g.length - 2] = g[g.length - 2] * g.pop()
        }
        , function() {
            var B = g.pop();
            g.push(delete B[0][B[1]])
        }
        , function() {
            g[g.length - 2] = g[g.length - 2] >= g.pop()
        }
        , function() {
            g.push(!1)
        }
        , function() {
            g[g.length - 2] = g[g.length - 2] > g.pop()
        }
        , function() {
            var B = D[I++]
              , d = B ? g.slice(-B) : [];
            g.length -= B,
            d.unshift(null);
            B = g.pop();
            g.push(Q(B[0][B[1]], d))
        }
        , function() {
            throw g[g.length - 1]
        }
        , function() {
            I = D[I++]
        }
        , function() {
            g[g.length - 2] = g[g.length - 2] == g.pop()
        }
        , function() {
            g[g.length - 1] = U[g[g.length - 1]]
        }
        , function() {
            return !0
        }
        , function() {
            H = null
        }
        , function() {
            var B = g[g.length - 2];
            B[0][B[1]] = g[g.length - 1]
        }
        , function() {
            g[g.length - 2] = g[g.length - 2] ^ g.pop()
        }
        , function() {
            g[g.length - 2] = g[g.length - 2] | g.pop()
        }
        , , function() {
            g[g.length - 2] = g[g.length - 2] - g.pop()
        }
        , , function() {
            g[g.length - 2] = g[g.length - 2] >>> g.pop()
        }
        , , function() {
            for (var H = D[I++], Q = [], B = D[I++], d = D[I++], A = [], w = 0; w < B; w++)
                Q[D[I++]] = g[D[I++]];
            for (w = 0; w < d; w++)
                A[w] = D[I++];
            g.push(function M() {
                var B = Q.slice(0);
                B[0] = [this],
                B[1] = [arguments],
                B[2] = [M];
                for (var d = 0; d < A.length && d < arguments.length; d++)
                    0 < A[d] && (B[A[d]] = [arguments[d]]);
                return __TENCENT_CHAOS_VM(H, D, U, B, C, E, k, c)
            })
        }
        , function() {
            var B, d = [];
            for (B in g.pop())
                d.push(B);
            g.push(d)
        }
        , function() {
            var B = g.pop();
            g.push([g[g.pop()][0], B])
        }
        , function() {
            g[g.length - 2] = g[g.length - 2] & g.pop()
        }
        , function() {
            g[g.length - 2] = g[g.length - 2] + g.pop()
        }
        , function() {
            d.pop()
        }
        , , function() {
            g[g.length - 1].length ? g.push(g[g.length - 1].shift(), !0) : g.push(undefined, !1)
        }
        , function() {
            g.push([U, g.pop()])
        }
        , function() {
            g.pop()
        }
        , function() {
            g.push("")
        }
        , function() {
            g.push(typeof g.pop())
        }
        , function() {
            var B = D[I++];
            g[g.length - 1] && (I = B)
        }
        ];
        for (0; ; )
            try {
                for (var w = !1; !w; )
                    w = A[D[I++]]();
                if (0,
                H)
                    throw H;
                return B ? (g.pop(),
                g.slice(3 + __TENCENT_CHAOS_VM.v)) : g.pop()
            } catch (Z) {
                0;
                var b = d.pop();
                if (b === undefined)
                    throw Z;
                H = Z,
                I = b[0],
                g.length = b[1],
                b[2] && (g[b[2]][0] = H)
            }
    }
    function C(B) {
        for (var d, H, Q = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split(""), A = String(B).replace(/[=]+$/, ""), w = 0, M = 0, I = ""; H = A.charAt(M++); ~H && (d = w % 4 ? 64 * d + H : H,
        w++ % 4) && (I += String.fromCharCode(255 & d >> (-2 * w & 6))))
            H = function(B, d, H) {
                if ("function" == typeof Array.prototype.indexOf)
                    return Array.prototype.indexOf.call(B, d, H);
                var Q;
                if (null == B)
                    throw new TypeError('"array" is null or not defined');
                var A = Object(B)
                  , w = A.length >>> 0;
                if (0 == w)
                    return -1;
                if (w <= (H |= 0))
                    return -1;
                for (Q = Math.max(0 <= H ? H : w - Math.abs(H), 0); Q < w; Q++)
                    if (Q in A && A[Q] === d)
                        return Q;
                return -1
            }(Q, H);
        return I
    }
    return __TENCENT_CHAOS_VM.v = 0,
    __TENCENT_CHAOS_VM(0, function(B) {
        var d = B[0]
          , H = B[1]
          , Q = []
          , A = C(d)
          , w = H.shift()
          , M = H.shift()
          , I = 0;
        function D() {
            for (; I === w; )
                Q.push(M),
                I++,
                w = H.shift(),
                M = H.shift()
        }
        for (var U = 0; U < A.length; U++) {
            var g = A.charAt(U).charCodeAt(0);
            D(),
            Q.push(g),
            I++
        }
        return D(),
        Q
    }([
        "B2QHQwdoB2kHbAdkHh0DIgFCCS8TBjkAAAFCQhMDQwdlB3gHcAdvB3IHdAdzOx0GMUJCCS85AAMDBAUxQkIDAUIJLw==",
        [5, 1518, 303, 445, 329, 334, 332, 443]]), global)
}();
__TENCENT_CHAOS_STACK.g = function() {
    return __TENCENT_CHAOS_STACK.shift()[0]
};

// 导出 M 函数
module.exports = {
    M: __TENCENT_CHAOS_STACK.g()
};