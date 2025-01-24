createElement: (tagName) => {
    console.log(`Creating element: ${tagName}`);
    if (tagName === "canvas") {
        return {
            tagName: tagName.toUpperCase(),
            src: "",
            async: false,
            onload: null,
            onerror: null,
            width: 300,
            height: 150,
            getContext: function (contextType) {
                if (contextType === "2d") {
                    return {
                        fillRect: function (x, y, width, height) {
                            console.log(`fillRect called with x=${x}, y=${y}, width=${width}, height=${height}`);
                        },
                        strokeRect: function (x, y, width, height) {
                            console.log(`strokeRect called with x=${x}, y=${y}, width=${width}, height=${height}`);
                        },
                        fillText: function (text, x, y) {
                            console.log(`fillText called with text='${text}', x=${x}, y=${y}`);
                        },
                        strokeText: function (text, x, y) {
                            console.log(`strokeText called with text='${text}', x=${x}, y=${y}`);
                        },
                        moveTo: function (x, y) {
                            console.log(`moveTo called with x=${x}, y=${y}`);
                        },
                        lineTo: function (x, y) {
                            console.log(`lineTo called with x=${x}, y=${y}`);
                        },
                        arc: function (x, y, radius, startAngle, endAngle, anticlockwise) {
                            console.log(`arc called with x=${x}, y=${y}, radius=${radius}, startAngle=${startAngle}, endAngle=${endAngle}, anticlockwise=${anticlockwise}`);
                        },
                        fill: function () {
                            console.log(`fill called`);
                        },
                        stroke: function () {
                            console.log(`stroke called`);
                        },
                        beginPath: function () {
                            console.log(`beginPath called`);
                        },
                        closePath: function () {
                            console.log(`closePath called`);
                        },
                        toDataURL: function () {
                            console.log(`toDataURL called`);
                            return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="; // 返回一个简单的 base64 图像数据
                        }
                    };
                } else if (contextType === "webgl" || contextType === "experimental-webgl") {
                    return {
                        // WebGL 上下文的方法和属性
                        getParameter: function (parameter) {
                            switch (parameter) {
                                case this.RENDERER:
                                    return "WebGL Renderer";
                                case this.VERSION:
                                    return "WebGL 1.0";
                                case this.VENDOR:
                                    return "WebGL Vendor";
                                case this.SHADING_LANGUAGE_VERSION:
                                    return "WebGL GLSL ES 1.0";
                                case this.MAX_TEXTURE_SIZE:
                                    return 4096;
                                case this.MAX_RENDERBUFFER_SIZE:
                                    return 4096;
                                case this.MAX_VIEWPORT_DIMS:
                                    return [4096, 4096];
                                case this.MAX_VERTEX_ATTRIBS:
                                    return 16;
                                case this.MAX_VERTEX_UNIFORM_VECTORS:
                                    return 128;
                                case this.MAX_VARYING_VECTORS:
                                    return 8;
                                case this.MAX_FRAGMENT_UNIFORM_VECTORS:
                                    return 16;
                                case this.MAX_COMBINED_TEXTURE_IMAGE_UNITS:
                                    return 16;
                                case this.MAX_TEXTURE_IMAGE_UNITS:
                                    return 16;
                                case this.MAX_CUBE_MAP_TEXTURE_SIZE:
                                    return 4096;
                                case this.MAX_TEXTURE_MAX_ANISOTROPY_EXT:
                                    return 16;
                                case this.ALPHA_BITS:
                                    return 8;
                                case this.RED_BITS:
                                    return 8;
                                case this.GREEN_BITS:
                                    return 8;
                                case this.BLUE_BITS:
                                    return 8;
                                case this.DEPTH_BITS:
                                    return 24;
                                case this.STENCIL_BITS:
                                    return 8;
                                case this.SUBPIXEL_BITS:
                                    return 8;
                                case this.MAX_DRAW_BUFFERS_WEBGL:
                                    return 1;
                                case this.MAX_COLOR_ATTACHMENTS_WEBGL:
                                    return 1;
                                case this.MAX_SAMPLES:
                                    return 4;
                                case this.MAX_VERTEX_TEXTURE_IMAGE_UNITS:
                                    return 16;
                                case this.MAX_COMBINED_VERTEX_TEXTURE_IMAGE_UNITS:
                                    return 16;
                                default:
                                    return null;
                            }
                        },
                        clear: function (mask) {
                            console.log(`clear called with mask=${mask}`);
                        },
                        createBuffer: function () {
                            console.log("createBuffer called");
                            return {
                                bindBuffer: function (target, buffer) {
                                    console.log(`bindBuffer called with target=${target}, buffer=${buffer}`);
                                },
                                bufferData: function (target, data, usage) {
                                    console.log(`bufferData called with target=${target}, data=${data}, usage=${usage}`);
                                }
                            };
                        },
                        createShader: function (type) {
                            console.log(`createShader called with type=${type}`);
                            return {
                                shaderSource: function (shader, source) {
                                    console.log(`shaderSource called with shader=${shader}, source=${source}`);
                                },
                                compileShader: function (shader) {
                                    console.log(`compileShader called with shader=${shader}`);
                                }
                            };
                        },
                        createProgram: function () {
                            console.log("createProgram called");
                            return {
                                attachShader: function (program, shader) {
                                    console.log(`attachShader called with program=${program}, shader=${shader}`);
                                },
                                linkProgram: function (program) {
                                    console.log(`linkProgram called with program=${program}`);
                                },
                                useProgram: function (program) {
                                    console.log(`useProgram called with program=${program}`);
                                }
                            };
                        },
                        getExtension: function (name) {
                            console.log(`getExtension called with name=${name}`);
                            if (name === "WEBGL_debug_renderer_info") {
                                return {
                                    UNMASKED_VENDOR_WEBGL: "WebGL Vendor",
                                    UNMASKED_RENDERER_WEBGL: "WebGL Renderer"
                                };
                            }
                            return null;
                        },
                        bindBuffer: function (target, buffer) {
                            console.log(`bindBuffer called with target=${target}, buffer=${buffer}`);
                        },
                        bufferData: function (target, data, usage) {
                            console.log(`bufferData called with target=${target}, data=${data}, usage=${usage}`);
                        },
                        enableVertexAttribArray: function (index) {
                            console.log(`enableVertexAttribArray called with index=${index}`);
                        },
                        vertexAttribPointer: function (index, size, type, normalized, stride, offset) {
                            console.log(`vertexAttribPointer called with index=${index}, size=${size}, type=${type}, normalized=${normalized}, stride=${stride}, offset=${offset}`);
                        },
                        getAttribLocation: function (program, name) {
                            console.log(`getAttribLocation called with program=${program}, name=${name}`);
                            return 0; // 返回一个示例位置
                        },
                        getUniformLocation: function (program, name) {
                            console.log(`getUniformLocation called with program=${program}, name=${name}`);
                            return {uniformLocation: 0}; // 返回一个示例位置对象
                        },
                        uniform2f: function (location, x, y) {
                            console.log(`uniform2f called with location=${location}, x=${x}, y=${y}`);
                        },
                        drawArrays: function (mode, first, count) {
                            console.log(`drawArrays called with mode=${mode}, first=${first}, count=${count}`);
                        },
                        shaderSource: function (shader, source) {
                            console.log(`shaderSource called with shader=${shader}, source=${source}`);
                        },
                        compileShader: function (shader) {
                            console.log(`compileShader called with shader=${shader}`);
                        },
                        attachShader: function (program, shader) {
                            console.log(`attachShader called with program=${program}, shader=${shader}`);
                        },
                        linkProgram: function (program) {
                            console.log(`linkProgram called with program=${program}`);
                        },
                        useProgram: function (program) {
                            console.log(`useProgram called with program=${program}`);
                        },
                        getSupportedExtensions: function () {
                            console.log("getSupportedExtensions called");
                            return [
                                "WEBGL_debug_renderer_info",
                                "OES_texture_float",
                                "OES_texture_half_float",
                                "OES_standard_derivatives",
                                "OES_vertex_array_object",
                                "WEBGL_lose_context",
                                "EXT_blend_minmax",
                                "EXT_texture_filter_anisotropic",
                                "EXT_frag_depth",
                                "EXT_shader_texture_lod",
                                "EXT_sRGB",
                                "OES_element_index_uint",
                                "WEBGL_depth_texture",
                                "WEBGL_draw_buffers"
                            ];
                        },
                        enable: function (cap) {
                            console.log(`enable called with cap=${cap}`);
                        },
                        depthFunc: function (func) {
                            console.log(`depthFunc called with func=${func}`);
                        },
                        clearColor: function (red, green, blue, alpha) {
                            console.log(`clearColor called with red=${red}, green=${green}, blue=${blue}, alpha=${alpha}`);
                        },
                        getContextAttributes: function () {
                            console.log("getContextAttributes called");
                            return {
                                alpha: true,
                                depth: true,
                                stencil: true,
                                antialias: true,
                                premultipliedAlpha: true,
                                preserveDrawingBuffer: false,
                                powerPreference: "default",
                                failIfMajorPerformanceCaveat: false
                            };
                        },
                        toDataURL: function () {
                            console.log(`toDataURL called on WebGL context`);
                            return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="; // 返回一个简单的 base64 图像数据
                        }
                    };
                }
                return null;
            },
            toDataURL: function () {
                console.log(`toDataURL called on canvas`);
                return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="; // 返回一个简单的 base64 图像数据
            }
        };
    }
    // 其他标签的处理
    return {
        tagName: tagName.toUpperCase(),
        src: "",
        async: false,
        onload: null,
        onerror: null,
    };
}







