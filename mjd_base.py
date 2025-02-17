# -*- coding: utf-8 -*-

import base64
import hashlib
import json
import pprint
import random
import re
import string
from typing import Union

import execjs
from Crypto.Cipher import DES
from Crypto.Util.Padding import unpad
from curl_cffi import requests

from plugins.log import log_error
from plugins.redis_ctl import RedisCtrl


# 适应版本
# js_security_v3_0.1.5
# h5_file_v5.0.2   2024.12.28
# h5_file_v5.0.3   2025.01.10
# h5_file_v5.0.4   2025.01.20
# h5_file_v5.0.5   2025.01.31
# h5_file_v5.0.6   2025.02.11
# h5_file_v5.0.7   2025.02.16

# 版本变化参数  核心加密文件【js_security_v3_0.1.5.js】【m-tk.js】【】
# 必须检测具体JS加密方法是否变动
# h5_version
# bu3
# fp
# time_range
# webglFp/device_info["r"]
# extend

# 基类执行逻辑
# - ? 初始化设备信息
# - 初始化加密模型
# - 初始化代理
# - 初始化入参账号/session
# - 获取pt_token/更新session
# - 初始化请求体

# TODO
# 破解滑块验证  Done
# 自动创建设备指纹  Done
# 自动更新tk/rd  Done
# 摸清 eid_token 变化 Done
# 继续细分 账号不可用时 风控账号/rd-tk失效 Done
# generate_FFA9D23F7A4B3CSS 取决于设备 r字段
# refresh_tk_rd 中的参数变化


class MJDBase(object):
    def __init__(self, account, order_id):
        self.account = account
        self.order_id = order_id
        self.redis = RedisCtrl()
        self.redis_key = None
        self.redis_account_order_key = None

        # 版本变化数据
        self.h5_version = "h5_file_v5.0.7"  # 每次10天左右会变化版本，modules源码也会跟着变

        self.qq_game_des_key = "2E1ZMAF88CCE5EBE551FR3E9AA6FF322"  # 不变
        self.ai = "8e94a"
        self.wx_ai = "303a7"
        self.canvas = "0fb7f119e21bb6b17b2b0d333a5617bf"

        self.js_3014_security_modules = self.init_js_3014_security_modules()
        self.js_3015_security_modules = self.init_js_3015_security_modules()
        self.wx_h5st_modules = self.init_wx_h5st_modules()
        self.m_tk_modules = self.init_m_tk_modules()
        # self.proxies = get_proxies()
        self.proxies = None
        self.session = None
        self.result = None
        self.tk = None
        self.rd = None
        self.wx_tk = None
        self.wx_rd = None
        self.eid = None
        self.eid_token = None
        self.device_info = None
        self.body_info = {
            "version": "1.10",
            "rechargeversion": "12.8",
            "source": 41,
            "orderSource": 41
        }

    def get_account_setting(self):
        self.redis_key = f'mjd_{self.account["pt_pin"]}'
        self.redis_account_order_key = f'order_{self.account["pt_pin"]}'
        self.session = self.get_session()
        self.redis_initial_account()

    @staticmethod
    def init_js_3014_security_modules():
        # 读取本地 JavaScript 文件内容
        with open('js_security_v3014_modules.js', 'r', encoding='utf-8') as file:
            js_code = file.read()
        return execjs.compile(js_code)

    @staticmethod
    def init_js_3015_security_modules():
        # 读取本地 JavaScript 文件内容
        with open('js_security_v3015_modules.js', 'r', encoding='utf-8') as file:
            js_code = file.read()
        return execjs.compile(js_code)

    @staticmethod
    def init_wx_h5st_modules():
        # 读取本地 JavaScript 文件内容
        with open('wx_h5st.js', 'r', encoding='utf-8') as file:
            js_code = file.read()
        return execjs.compile(js_code)

    @staticmethod
    def init_m_tk_modules():
        # 读取本地 JavaScript 文件内容
        with open('m_tk_20250131.js', 'r', encoding='utf-8') as file:
            js_code = file.read()
        return execjs.compile(js_code)

    @staticmethod
    def generate_random_string(length=12):
        """
        生成指定长度的随机字符串，包含大小写字母和数字
        :param length: 字符串长度，默认为 12
        :return: 随机生成的字符串
        """
        # 定义字符集：大小写字母 + 数字
        characters = string.ascii_letters + string.digits
        # 随机选择字符，生成指定长度的字符串
        random_string = ''.join(random.choice(characters) for _ in range(length))
        return random_string

    @staticmethod
    def device_list():
        return [
            # # jqz chrome
            # {
            #     # 分别取自 clt/windows/wegl指纹 中
            #     "base": {
            #         "deviceId": "ead25d97-444f-4eb6-82c3-28e2c68b334b",
            #         "ccn": 20,
            #         "devicePixelRatio": 1.25,
            #         "screen": {
            #             "availHeight": 816,
            #             "availWidth": 1536,
            #             "height": 864,
            #             "width": 1536,
            #             "colorDepth": 24,
            #             "pixelDepth": 24,
            #             "screen": "1920*1080",
            #             "windowWidth": 1536,  # TODO
            #             "windowHeight": 695,  # TODO
            #         }
            #     },
            #     # 取自 m-tk.js 中的 getFp: function(e) { 函数
            #     "webgl3": "data:image/png;base64,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�extensions:ANGLE_instanced_arrays;EXT_blend_minmax;EXT_clip_control;EXT_color_buffer_half_float;EXT_depth_clamp;EXT_disjoint_timer_query;EXT_float_blend;EXT_frag_depth;EXT_polygon_offset_clamp;EXT_shader_texture_lod;EXT_texture_compression_bptc;EXT_texture_compression_rgtc;EXT_texture_filter_anisotropic;EXT_texture_mirror_clamp_to_edge;EXT_sRGB;KHR_parallel_shader_compile;OES_element_index_uint;OES_fbo_render_mipmap;OES_standard_derivatives;OES_texture_float;OES_texture_float_linear;OES_texture_half_float;OES_texture_half_float_linear;OES_vertex_array_object;WEBGL_blend_func_extended;WEBGL_color_buffer_float;WEBGL_compressed_texture_s3tc;WEBGL_compressed_texture_s3tc_srgb;WEBGL_debug_renderer_info;WEBGL_debug_shaders;WEBGL_depth_texture;WEBGL_draw_buffers;WEBGL_lose_context;WEBGL_multi_draw;WEBGL_polygon_mode�extensions:ANGLE_instanced_arrays;EXT_blend_minmax;EXT_clip_control;EXT_color_buffer_half_float;EXT_depth_clamp;EXT_disjoint_timer_query;EXT_float_blend;EXT_frag_depth;EXT_polygon_offset_clamp;EXT_shader_texture_lod;EXT_texture_compression_bptc;EXT_texture_compression_rgtc;EXT_texture_filter_anisotropic;EXT_texture_mirror_clamp_to_edge;EXT_sRGB;KHR_parallel_shader_compile;OES_element_index_uint;OES_fbo_render_mipmap;OES_standard_derivatives;OES_texture_float;OES_texture_float_linear;OES_texture_half_float;OES_texture_half_float_linear;OES_vertex_array_object;WEBGL_blend_func_extended;WEBGL_color_buffer_float;WEBGL_compressed_texture_s3tc;WEBGL_compressed_texture_s3tc_srgb;WEBGL_debug_renderer_info;WEBGL_debug_shaders;WEBGL_depth_texture;WEBGL_draw_buffers;WEBGL_lose_context;WEBGL_multi_draw;WEBGL_polygon_mode�w1[1, 1]�w2[1, 1024]�w38�w4yes�w58�w624�w78�w816�w932�w1016384�w111024�w1216384�w1316�w1416384�w1530�w1616�w1716�w184096�w19[32767, 32767]�w208�w21WebKit WebGL�w22WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)�w230�w24WebKit�w25WebGL 1.0 (OpenGL ES 2.0 Chromium)�wuv:Google Inc. (Intel)�wur:ANGLE (Intel, Intel(R) UHD Graphics (0x00004626) Direct3D11 vs_5_0 ps_5_0, D3D11)",
            #     "useragent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
            #     # 取自 _$T4.format(_$T2(_$lw.fofLr.concat(_$lv.join('\xa7'))))
            #     "wur": "wur:ANGLE (Intel, Intel(R) UHD Graphics (0x00004626) Direct3D11 vs_5_0 ps_5_0, D3D11)",
            #     # fp
            #     "fp": "ddrdapxw3s99aa84",
            #     "wx_fp": "3606331785990409",
            #     "bu3": 54,
            #     "bu10": 5,
            # },
            # # jqz edge
            # {
            #     # 分别取自 clt/windows/wegl指纹 中
            #     "base": {
            #         "deviceId": "63304156-5d68-4a41-94c7-7587e49d5ea2",
            #         "ccn": 20,
            #         "devicePixelRatio": 1.25,
            #         "screen": {
            #             "availHeight": 816,
            #             "availWidth": 1536,
            #             "height": 864,
            #             "width": 1536,
            #             "colorDepth": 24,
            #             "pixelDepth": 24,
            #             "screen": "1920*1080",
            #             "windowWidth": 1482,  # TODO
            #             "windowHeight": 740,  # TODO
            #         }
            #     },
            #     # 取自 m-tk.js 中的 getFp: function(e) { 函数
            #     "webgl3": "data:image/png;base64,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�extensions:ANGLE_instanced_arrays;EXT_blend_minmax;EXT_clip_control;EXT_color_buffer_half_float;EXT_depth_clamp;EXT_disjoint_timer_query;EXT_float_blend;EXT_frag_depth;EXT_polygon_offset_clamp;EXT_shader_texture_lod;EXT_texture_compression_bptc;EXT_texture_compression_rgtc;EXT_texture_filter_anisotropic;EXT_texture_mirror_clamp_to_edge;EXT_sRGB;KHR_parallel_shader_compile;OES_element_index_uint;OES_fbo_render_mipmap;OES_standard_derivatives;OES_texture_float;OES_texture_float_linear;OES_texture_half_float;OES_texture_half_float_linear;OES_vertex_array_object;WEBGL_blend_func_extended;WEBGL_color_buffer_float;WEBGL_compressed_texture_s3tc;WEBGL_compressed_texture_s3tc_srgb;WEBGL_debug_renderer_info;WEBGL_debug_shaders;WEBGL_depth_texture;WEBGL_draw_buffers;WEBGL_lose_context;WEBGL_multi_draw;WEBGL_polygon_mode�extensions:ANGLE_instanced_arrays;EXT_blend_minmax;EXT_clip_control;EXT_color_buffer_half_float;EXT_depth_clamp;EXT_disjoint_timer_query;EXT_float_blend;EXT_frag_depth;EXT_polygon_offset_clamp;EXT_shader_texture_lod;EXT_texture_compression_bptc;EXT_texture_compression_rgtc;EXT_texture_filter_anisotropic;EXT_texture_mirror_clamp_to_edge;EXT_sRGB;KHR_parallel_shader_compile;OES_element_index_uint;OES_fbo_render_mipmap;OES_standard_derivatives;OES_texture_float;OES_texture_float_linear;OES_texture_half_float;OES_texture_half_float_linear;OES_vertex_array_object;WEBGL_blend_func_extended;WEBGL_color_buffer_float;WEBGL_compressed_texture_s3tc;WEBGL_compressed_texture_s3tc_srgb;WEBGL_debug_renderer_info;WEBGL_debug_shaders;WEBGL_depth_texture;WEBGL_draw_buffers;WEBGL_lose_context;WEBGL_multi_draw;WEBGL_polygon_mode�w1[1, 1]�w2[1, 1024]�w38�w4yes�w58�w624�w78�w816�w932�w1016384�w111024�w1216384�w1316�w1416384�w1530�w1616�w1716�w184096�w19[32767, 32767]�w208�w21WebKit WebGL�w22WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)�w230�w24WebKit�w25WebGL 1.0 (OpenGL ES 2.0 Chromium)�wuv:Google Inc. (Intel)�wur:ANGLE (Intel, Intel(R) UHD Graphics (0x00004626) Direct3D11 vs_5_0 ps_5_0, D3D11)",
            #     "useragent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0",
            #     # 取自 _$T4.format(_$T2(_$lw.fofLr.concat(_$lv.join('\xa7'))))
            #     "wur": "wur:ANGLE (Intel, Intel(R) UHD Graphics (0x00004626) Direct3D11 vs_5_0 ps_5_0, D3D11)",
            #     # fp
            #     "fp": "9pwppps3rxdapwa2",
            #     "wx_fp": "3350062741226380",
            #     "bu3": 54,
            #     "bu10": 5,
            # },
            # # home my chrome  dd
            # {
            #     # 分别取自 clt/windows/wegl指纹 中
            #     "base": {
            #         "deviceId": "138402c5-ff04-46b3-a789-000190da5591",
            #         "ccn": 8,
            #         "bu3": 38,
            #         "bu10": 6,
            #         "devicePixelRatio": 1.5,
            #         "screen": {
            #             "availHeight": 912,
            #             "availWidth": 1440,
            #             "height": 960,
            #             "width": 1440,
            #             "colorDepth": 24,
            #             "pixelDepth": 24,
            #             "screen": "2160*1440",
            #             "windowWidth": 1440,  # TODO
            #             "windowHeight": 791,  # TODO
            #         }
            #     },
            #     # 取自 m-tk.js 中的 getFp: function(e) { 函数
            #     "webgl3": "data:image/png;base64,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�extensions:ANGLE_instanced_arrays;EXT_blend_minmax;EXT_clip_control;EXT_color_buffer_half_float;EXT_depth_clamp;EXT_disjoint_timer_query;EXT_float_blend;EXT_frag_depth;EXT_polygon_offset_clamp;EXT_shader_texture_lod;EXT_texture_compression_bptc;EXT_texture_compression_rgtc;EXT_texture_filter_anisotropic;EXT_texture_mirror_clamp_to_edge;EXT_sRGB;KHR_parallel_shader_compile;OES_element_index_uint;OES_fbo_render_mipmap;OES_standard_derivatives;OES_texture_float;OES_texture_float_linear;OES_texture_half_float;OES_texture_half_float_linear;OES_vertex_array_object;WEBGL_blend_func_extended;WEBGL_color_buffer_float;WEBGL_compressed_texture_s3tc;WEBGL_compressed_texture_s3tc_srgb;WEBGL_debug_renderer_info;WEBGL_debug_shaders;WEBGL_depth_texture;WEBGL_draw_buffers;WEBGL_lose_context;WEBGL_multi_draw;WEBGL_polygon_mode�extensions:ANGLE_instanced_arrays;EXT_blend_minmax;EXT_clip_control;EXT_color_buffer_half_float;EXT_depth_clamp;EXT_disjoint_timer_query;EXT_float_blend;EXT_frag_depth;EXT_polygon_offset_clamp;EXT_shader_texture_lod;EXT_texture_compression_bptc;EXT_texture_compression_rgtc;EXT_texture_filter_anisotropic;EXT_texture_mirror_clamp_to_edge;EXT_sRGB;KHR_parallel_shader_compile;OES_element_index_uint;OES_fbo_render_mipmap;OES_standard_derivatives;OES_texture_float;OES_texture_float_linear;OES_texture_half_float;OES_texture_half_float_linear;OES_vertex_array_object;WEBGL_blend_func_extended;WEBGL_color_buffer_float;WEBGL_compressed_texture_s3tc;WEBGL_compressed_texture_s3tc_srgb;WEBGL_debug_renderer_info;WEBGL_debug_shaders;WEBGL_depth_texture;WEBGL_draw_buffers;WEBGL_lose_context;WEBGL_multi_draw;WEBGL_polygon_mode�w1[1, 1]�w2[1, 1024]�w38�w4yes�w58�w624�w78�w816�w932�w1016384�w111024�w1216384�w1316�w1416384�w1530�w1616�w1716�w184096�w19[32767, 32767]�w208�w21WebKit WebGL�w22WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)�w230�w24WebKit�w25WebGL 1.0 (OpenGL ES 2.0 Chromium)�wuv:Google Inc. (Intel)�wur:ANGLE (Intel, Intel(R) Iris(R) Xe Graphics (0x00009A49) Direct3D11 vs_5_0 ps_5_0, D3D11)",
            #     "useragent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
            #     # 取自 _$T4.format(_$T2(_$lw.fofLr.concat(_$lv.join('\xa7'))))
            #     "wur": "wur:ANGLE (Intel, Intel(R) Iris(R) Xe Graphics (0x00009A49) Direct3D11 vs_5_0 ps_5_0, D3D11)",
            #     # fp
            #     "fp": "93xwdpraasrsacn9",
            #     "wx_fp": "5931396482503861",
            #
            # },
            # # home my edge  my
            # {
            #     # 分别取自 clt/windows/wegl指纹 中
            #     "base": {
            #         "deviceId": "7ce72c04-4090-4f76-ba8e-9fc612cf57e5",
            #         "ccn": 8,
            #         "bu3": 54,
            #         "bu10": 6,
            #         "devicePixelRatio": 1.5,
            #         "screen": {
            #             "availHeight": 912,
            #             "availWidth": 1440,
            #             "height": 960,
            #             "width": 1440,
            #             "colorDepth": 24,
            #             "pixelDepth": 24,
            #             "screen": "2160*1440",
            #             "windowWidth": 1440,  # TODO
            #             "windowHeight": 791,  # TODO
            #         }
            #     },
            #     # 取自 m-tk.js 中的 getFp: function(e) { 函数
            #     "webgl3": "data:image/png;base64,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�extensions:ANGLE_instanced_arrays;EXT_blend_minmax;EXT_clip_control;EXT_color_buffer_half_float;EXT_depth_clamp;EXT_disjoint_timer_query;EXT_float_blend;EXT_frag_depth;EXT_polygon_offset_clamp;EXT_shader_texture_lod;EXT_texture_compression_bptc;EXT_texture_compression_rgtc;EXT_texture_filter_anisotropic;EXT_texture_mirror_clamp_to_edge;EXT_sRGB;KHR_parallel_shader_compile;OES_element_index_uint;OES_fbo_render_mipmap;OES_standard_derivatives;OES_texture_float;OES_texture_float_linear;OES_texture_half_float;OES_texture_half_float_linear;OES_vertex_array_object;WEBGL_blend_func_extended;WEBGL_color_buffer_float;WEBGL_compressed_texture_s3tc;WEBGL_compressed_texture_s3tc_srgb;WEBGL_debug_renderer_info;WEBGL_debug_shaders;WEBGL_depth_texture;WEBGL_draw_buffers;WEBGL_lose_context;WEBGL_multi_draw;WEBGL_polygon_mode�extensions:ANGLE_instanced_arrays;EXT_blend_minmax;EXT_clip_control;EXT_color_buffer_half_float;EXT_depth_clamp;EXT_disjoint_timer_query;EXT_float_blend;EXT_frag_depth;EXT_polygon_offset_clamp;EXT_shader_texture_lod;EXT_texture_compression_bptc;EXT_texture_compression_rgtc;EXT_texture_filter_anisotropic;EXT_texture_mirror_clamp_to_edge;EXT_sRGB;KHR_parallel_shader_compile;OES_element_index_uint;OES_fbo_render_mipmap;OES_standard_derivatives;OES_texture_float;OES_texture_float_linear;OES_texture_half_float;OES_texture_half_float_linear;OES_vertex_array_object;WEBGL_blend_func_extended;WEBGL_color_buffer_float;WEBGL_compressed_texture_s3tc;WEBGL_compressed_texture_s3tc_srgb;WEBGL_debug_renderer_info;WEBGL_debug_shaders;WEBGL_depth_texture;WEBGL_draw_buffers;WEBGL_lose_context;WEBGL_multi_draw;WEBGL_polygon_mode�w1[1, 1]�w2[1, 1024]�w38�w4yes�w58�w624�w78�w816�w932�w1016384�w111024�w1216384�w1316�w1416384�w1530�w1616�w1716�w184096�w19[32767, 32767]�w208�w21WebKit WebGL�w22WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)�w230�w24WebKit�w25WebGL 1.0 (OpenGL ES 2.0 Chromium)�wuv:Google Inc. (Intel)�wur:ANGLE (Intel, Intel(R) Iris(R) Xe Graphics (0x00009A49) Direct3D11 vs_5_0 ps_5_0, D3D11)",
            #     "useragent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0",
            #     # 取自 _$T4.format(_$T2(_$lw.fofLr.concat(_$lv.join('\xa7'))))
            #     "wur": "wur:ANGLE (Intel, Intel(R) Iris(R) Xe Graphics (0x00009A49) Direct3D11 vs_5_0 ps_5_0, D3D11)",
            #     # fp
            #     "fp": "9cr3pwwawdwwxa39",
            #     "wx_fp": "5709503734621005",
            # },
            # # home dd chrome dd
            # {
            #     # 分别取自 clt/windows/wegl指纹 中
            #     "base": {
            #         "deviceId": "417789d1-8884-41c0-98e0-b6f72076775e",
            #         "ccn": 8,
            #         "bu3": 54,
            #         "bu10": 6,
            #         "devicePixelRatio": 1,
            #         "screen": {
            #             "availHeight": 1032,
            #             "availWidth": 1920,
            #             "height": 1080,
            #             "width": 1920,
            #             "colorDepth": 24,
            #             "pixelDepth": 24,
            #             "screen": "1920*1080",
            #             "windowWidth": 1920,  # TODO
            #             "windowHeight": 911,  # TODO
            #         }
            #     },
            #     # 取自 m-tk.js 中的 getFp: function(e) { 函数
            #     "webgl3": "data:image/png;base64,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 extensions:ANGLE_instanced_arrays;EXT_blend_minmax;EXT_clip_control;EXT_color_buffer_half_float;EXT_depth_clamp;EXT_disjoint_timer_query;EXT_float_blend;EXT_frag_depth;EXT_polygon_offset_clamp;EXT_shader_texture_lod;EXT_texture_compression_bptc;EXT_texture_compression_rgtc;EXT_texture_filter_anisotropic;EXT_texture_mirror_clamp_to_edge;EXT_sRGB;KHR_parallel_shader_compile;OES_element_index_uint;OES_fbo_render_mipmap;OES_standard_derivatives;OES_texture_float;OES_texture_float_linear;OES_texture_half_float;OES_texture_half_float_linear;OES_vertex_array_object;WEBGL_blend_func_extended;WEBGL_color_buffer_float;WEBGL_compressed_texture_s3tc;WEBGL_compressed_texture_s3tc_srgb;WEBGL_debug_renderer_info;WEBGL_debug_shaders;WEBGL_depth_texture;WEBGL_draw_buffers;WEBGL_lose_context;WEBGL_multi_draw;WEBGL_polygon_mode extensions:ANGLE_instanced_arrays;EXT_blend_minmax;EXT_clip_control;EXT_color_buffer_half_float;EXT_depth_clamp;EXT_disjoint_timer_query;EXT_float_blend;EXT_frag_depth;EXT_polygon_offset_clamp;EXT_shader_texture_lod;EXT_texture_compression_bptc;EXT_texture_compression_rgtc;EXT_texture_filter_anisotropic;EXT_texture_mirror_clamp_to_edge;EXT_sRGB;KHR_parallel_shader_compile;OES_element_index_uint;OES_fbo_render_mipmap;OES_standard_derivatives;OES_texture_float;OES_texture_float_linear;OES_texture_half_float;OES_texture_half_float_linear;OES_vertex_array_object;WEBGL_blend_func_extended;WEBGL_color_buffer_float;WEBGL_compressed_texture_s3tc;WEBGL_compressed_texture_s3tc_srgb;WEBGL_debug_renderer_info;WEBGL_debug_shaders;WEBGL_depth_texture;WEBGL_draw_buffers;WEBGL_lose_context;WEBGL_multi_draw;WEBGL_polygon_mode w1[1, 1] w2[1, 1024] w38 w4yes w58 w624 w78 w816 w932 w1016384 w111024 w1216384 w1316 w1416384 w1530 w1616 w1716 w184096 w19[32767, 32767] w208 w21WebKit WebGL w22WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium) w230 w24WebKit w25WebGL 1.0 (OpenGL ES 2.0 Chromium) wuv:Google Inc. (Intel) wur:ANGLE (Intel, Intel(R) UHD Graphics (0x00009BA4) Direct3D11 vs_5_0 ps_5_0, D3D11)",
            #     "useragent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
            #     # 取自 _$T4.format(_$T2(_$lw.fofLr.concat(_$lv.join('\xa7'))))
            #     "wur": "wur:ANGLE (Intel, Intel(R) UHD Graphics (0x00009BA4) Direct3D11 vs_5_0 ps_5_0, D3D11)",
            #     # fp
            #     "fp": "pssrxw3cas9ppdp6",
            #     "wx_fp": "8073498708386215",
            #
            # },
            # home dd edge dd
            {
                # 分别取自 clt/windows/wegl指纹 中
                "base": {
                    "deviceId": "adef7126-2bb8-4b3d-bdee-dd96cbaa2d68",
                    "ccn": 8,
                    "bu3": 54,
                    "bu10": 6,
                    "devicePixelRatio": 1,
                    "screen": {
                        "availHeight": 1032,
                        "availWidth": 1920,
                        "height": 1080,
                        "width": 1920,
                        "colorDepth": 24,
                        "pixelDepth": 24,
                        "screen": "1920*1080",
                        "windowWidth": 1920,  # TODO
                        "windowHeight": 911,  # TODO
                    }
                },
                # 取自 m-tk.js 中的 getFp: function(e) { 函数
                "webgl3": "data:image/png;base64,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 extensions:ANGLE_instanced_arrays;EXT_blend_minmax;EXT_clip_control;EXT_color_buffer_half_float;EXT_depth_clamp;EXT_disjoint_timer_query;EXT_float_blend;EXT_frag_depth;EXT_polygon_offset_clamp;EXT_shader_texture_lod;EXT_texture_compression_bptc;EXT_texture_compression_rgtc;EXT_texture_filter_anisotropic;EXT_texture_mirror_clamp_to_edge;EXT_sRGB;KHR_parallel_shader_compile;OES_element_index_uint;OES_fbo_render_mipmap;OES_standard_derivatives;OES_texture_float;OES_texture_float_linear;OES_texture_half_float;OES_texture_half_float_linear;OES_vertex_array_object;WEBGL_blend_func_extended;WEBGL_color_buffer_float;WEBGL_compressed_texture_s3tc;WEBGL_compressed_texture_s3tc_srgb;WEBGL_debug_renderer_info;WEBGL_debug_shaders;WEBGL_depth_texture;WEBGL_draw_buffers;WEBGL_lose_context;WEBGL_multi_draw;WEBGL_polygon_mode extensions:ANGLE_instanced_arrays;EXT_blend_minmax;EXT_clip_control;EXT_color_buffer_half_float;EXT_depth_clamp;EXT_disjoint_timer_query;EXT_float_blend;EXT_frag_depth;EXT_polygon_offset_clamp;EXT_shader_texture_lod;EXT_texture_compression_bptc;EXT_texture_compression_rgtc;EXT_texture_filter_anisotropic;EXT_texture_mirror_clamp_to_edge;EXT_sRGB;KHR_parallel_shader_compile;OES_element_index_uint;OES_fbo_render_mipmap;OES_standard_derivatives;OES_texture_float;OES_texture_float_linear;OES_texture_half_float;OES_texture_half_float_linear;OES_vertex_array_object;WEBGL_blend_func_extended;WEBGL_color_buffer_float;WEBGL_compressed_texture_s3tc;WEBGL_compressed_texture_s3tc_srgb;WEBGL_debug_renderer_info;WEBGL_debug_shaders;WEBGL_depth_texture;WEBGL_draw_buffers;WEBGL_lose_context;WEBGL_multi_draw;WEBGL_polygon_mode w1[1, 1] w2[1, 1024] w38 w4yes w58 w624 w78 w816 w932 w1016384 w111024 w1216384 w1316 w1416384 w1530 w1616 w1716 w184096 w19[32767, 32767] w208 w21WebKit WebGL w22WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium) w230 w24WebKit w25WebGL 1.0 (OpenGL ES 2.0 Chromium) wuv:Google Inc. (Intel) wur:ANGLE (Intel, Intel(R) UHD Graphics (0x00009BA4) Direct3D11 vs_5_0 ps_5_0, D3D11)",
                "useragent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0",
                # 取自 _$T4.format(_$T2(_$lw.fofLr.concat(_$lv.join('\xa7'))))
                "wur": "wur:ANGLE (Intel, Intel(R) UHD Graphics (0x00009BA4) Direct3D11 vs_5_0 ps_5_0, D3D11)",
                # fp
                "fp": "339psxdawcr399a4",
                "wx_fp": "9033892229983157",

            },
        ]

    def generate_device(self):
        device = random.choice(self.device_list())
        FFA9D23F7A4B3CSS = self.generate_FFA9D23F7A4B3CSS(device)
        print(FFA9D23F7A4B3CSS)
        webglFp = self.generate_webglFp(device)
        print(webglFp)

        extend = {
            "wd": 0,
            "l": 0,
            "ls": 5,
            "wk": 0,
            "bu1": "0.1.5",
            "bu2": 0,
            "bu3": device["base"]["bu3"],
            "bu4": 0,
            "bu5": 0,
            "bu6": 4,
            "bu7": 0,
            "bu8": 0,
            "bu10": device["base"]["bu10"],
        }
        self.refresh_tk_rd(device)
        self.refresh_wx_tk_rd(device)
        self.refresh_eid_eidtoken(device)
        device.update({
            "webglFp": webglFp,
            "FFA9D23F7A4B3CSS": FFA9D23F7A4B3CSS,

            "fp": device["fp"],
            "wx_fp": device["wx_fp"],

            "tk": self.tk,
            "rd": self.rd,

            "wx_tk": self.wx_tk,
            "wx_rd": self.wx_rd,

            "eid": self.eid,
            "eid_token": self.eid_token,
            "time_range": "36",  # js版本固定值,跟随版本变化

            "uuid": "1737228844272158324158",  # 任意

            "canvas": self.canvas,
            "ai": self.ai,
            "wx_ai": self.wx_ai,

            "extend": extend,
        })
        return device

    def redis_initial_account(self):
        # 检查账号是否存在
        if not self.redis.exists(self.redis_key):
            print("检查账号不存在")
            self.device_info = self.generate_device()
            initial_data = {
                "status": None,  # 初始状态 None, 0 不可用, 1 可用
                "device_info": self.device_info,
            }
            self.redis.set(self.redis_key, json.dumps(initial_data), ex=60 * 60 * 24 * 1)
        else:
            print("检查账号已经存在")
            account_cache = json.loads(self.redis.get(self.redis_key))
            self.device_info = account_cache["device_info"]

    def redis_order_cache(self):
        self.redis.set(self.redis_account_order_key, self.order_id, ex=60 * 60 * 24 * 1)

    def redis_update_account(self, field, value):
        _cache = json.loads(self.redis.get(self.redis_key))
        if _cache:
            _cache[field] = value

            # 将更新后的字典写回 Redis
            self.redis.set(self.redis_key, json.dumps(_cache))

    def return_info(self, code, **kwargs):
        # 只要没返回正确数据就清空缓存
        if code != 1:
            self.redis.delete(self.redis_key)

        # 定义错误码映射
        error_code_mapping = {
            0: "账号不可用",
            1: "成功",
            2: "SKU详情问题/SKU失效/SKU不可下单",
            3: "初始化订单失败",
            4: "获取支付信息失败",
            5: "获取支付链接失败",
            6: "获取订单详情失败",
            7: "获取卡密失败",
            8: "出现风控",
            9: "redis缓存错误",
            10: "代理出错",
            11: "未知错误",
            12: "验证码校验失败",
            13: "账号与订单号不匹配",
            14: "获取微信支付信息失败",
            15: "微信支付参数缺失",
            16: "提取支付信息失败",
            17: "获取验证码信息失败",
            18: "获取微信支付链接失败",
            19: "JS加密版本更新"
        }
        if not kwargs.get("error_msg"):
            error_msg = error_code_mapping.get(code, "未知错误代码")
        else:
            error_msg = kwargs.get("error_msg")

        # 确保 code 是整数，避免因字符串 key 导致的 KeyError
        code = int(code)

        # 更新 Redis 中的账号状态，如果 code 为 0
        if code == 0:
            self.redis_update_account("status", 0)
        if code == 1:
            self.redis_update_account("status", 1)

        # 组装返回结果
        self.result = {
            "code": code,
            "msg": error_msg,  # 增加默认错误信息，避免未定义的 code 抛出 KeyError
            "sku_id": getattr(self, "sku_id", None),  # 使用 getattr 避免属性不存在时抛出异常
            "order_id": getattr(self, "order_id", None),
            "payment_link": kwargs.get("payment_link", None),
            "order_time": kwargs.get("order_time", None),
            "order_status": kwargs.get("order_status", None),
            "card_account": kwargs.get("card_account", None),
            "card_password": kwargs.get("card_password", None),
        }
        pprint.pprint(self.result)

    def generate_cookies(self):
        cookie_dict = {
            'pt_pin': self.account["pt_pin"],
            'pt_key': self.account["pt_key"],
        }
        return cookie_dict, self.generate_headers()

    @staticmethod
    def generate_headers():
        return {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'zh-CN,zh;q=0.9',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded',
            'origin': 'https://recharge.m.jd.com',
            'pragma': 'no-cache',
            'priority': 'u=1, i',
            'referer': 'https://recharge.m.jd.com/',
            'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'x-referer-page': 'https://recharge.m.jd.com/orderDetail',
            'x-rp-client': 'h5_1.0.0',
        }

    def get_session(self):
        session = requests.Session()
        cookies, headers = self.generate_cookies()
        session.cookies.update(cookies)
        session.headers.update(headers)
        return session

    def get_response(self, url, params=None, json_data=None, data=None, allow_redirects=False, retry=1):
        try:
            if not json_data and not data:
                if self.proxies:
                    response = self.session.get(url=url, params=params, proxies=self.proxies,
                                                allow_redirects=allow_redirects)
                else:
                    response = self.session.get(url=url, params=params, allow_redirects=allow_redirects)
            else:
                if self.proxies:
                    response = self.session.post(url=url, params=params, json=json_data, data=data,
                                                 proxies=self.proxies, allow_redirects=allow_redirects)
                else:
                    response = self.session.post(url=url, params=params, json=json_data, data=data,
                                                 allow_redirects=allow_redirects)
            response.raise_for_status()
            return response
        except Exception as e:
            if retry < 2:
                self.proxies = None
                return self.get_response(url, params, json_data, data, allow_redirects)
            else:
                log_error(e)

    # TODO
    def generate_fp(self):
        # 定位点 js_security.js 中 function _$sH() {
        ...

    @staticmethod
    def generate_webglFp_str(device):
        # webgl_3d 变化而来
        # 定位点：_$T4.format(_$T2(_$lw.fofLr.concat(_$lv.join('\xa7'))))
        # 需要插桩监控 localStorge WQ_gather_wgl1
        # 定住 m-tk.js第一行 后插桩 WQ_gather_wgl1
        fp_list = [
            "data:image/png;base64,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",
            "extensions:ANGLE_instanced_arrays;EXT_blend_minmax;EXT_clip_control;EXT_color_buffer_half_float;EXT_depth_clamp;EXT_disjoint_timer_query;EXT_float_blend;EXT_frag_depth;EXT_polygon_offset_clamp;EXT_shader_texture_lod;EXT_texture_compression_bptc;EXT_texture_compression_rgtc;EXT_texture_filter_anisotropic;EXT_texture_mirror_clamp_to_edge;EXT_sRGB;KHR_parallel_shader_compile;OES_element_index_uint;OES_fbo_render_mipmap;OES_standard_derivatives;OES_texture_float;OES_texture_float_linear;OES_texture_half_float;OES_texture_half_float_linear;OES_vertex_array_object;WEBGL_blend_func_extended;WEBGL_color_buffer_float;WEBGL_compressed_texture_s3tc;WEBGL_compressed_texture_s3tc_srgb;WEBGL_debug_renderer_info;WEBGL_debug_shaders;WEBGL_depth_texture;WEBGL_draw_buffers;WEBGL_lose_context;WEBGL_multi_draw;WEBGL_polygon_mode",
            "extensions:ANGLE_instanced_arrays;EXT_blend_minmax;EXT_clip_control;EXT_color_buffer_half_float;EXT_depth_clamp;EXT_disjoint_timer_query;EXT_float_blend;EXT_frag_depth;EXT_polygon_offset_clamp;EXT_shader_texture_lod;EXT_texture_compression_bptc;EXT_texture_compression_rgtc;EXT_texture_filter_anisotropic;EXT_texture_mirror_clamp_to_edge;EXT_sRGB;KHR_parallel_shader_compile;OES_element_index_uint;OES_fbo_render_mipmap;OES_standard_derivatives;OES_texture_float;OES_texture_float_linear;OES_texture_half_float;OES_texture_half_float_linear;OES_vertex_array_object;WEBGL_blend_func_extended;WEBGL_color_buffer_float;WEBGL_compressed_texture_s3tc;WEBGL_compressed_texture_s3tc_srgb;WEBGL_debug_renderer_info;WEBGL_debug_shaders;WEBGL_depth_texture;WEBGL_draw_buffers;WEBGL_lose_context;WEBGL_multi_draw;WEBGL_polygon_mode",
            "w1[1, 1]",
            "w2[1, 1024]",
            "w38",
            "w4yes",
            "w58",
            "w624",
            "w78",
            "w816",
            "w932",
            "w1016384",
            "w111024",
            "w1216384",
            "w1316",
            "w1416384",
            "w1530",
            "w1616",
            "w1716",
            "w184096",
            "w19[32767, 32767]",
            "w208",
            "w21WebKit WebGL",
            "w22WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)",
            "w230",
            "w24WebKit",
            "w25WebGL 1.0 (OpenGL ES 2.0 Chromium)",
            "wuv:Google Inc. (Intel)",
            device["wur"]
        ]
        return "envCollect" + "\xa7".join(fp_list)

    def generate_webglFp(self, device):
        fp_list_str = self.generate_webglFp_str(device)
        return self.js_3015_security_modules.call("generate_webglFp", fp_list_str)

    @staticmethod
    def generate_r_list(device):
        # 定位点  getFp: function(e) {
        return [
            device["useragent"],
            "zh-CN",
            "applewebkit_chrome",
            "537.36",
            "windows",
            "NT",
            24,
            f"{device['base']['screen']['height']}x{device['base']['screen']['width']}",
            -480,
            "sessionStorageKey",
            "localStorageKey",
            "indexedDbKey",
            "NA",
            "Win32",
            device["base"]["ccn"],
            "NA",
            "PDF Viewer::Portable Document Format::application/pdf~pdf,text/pdf~pdf;Chrome PDF Viewer::Portable Document Format::application/pdf~pdf,text/pdf~pdf;Chromium PDF Viewer::Portable Document Format::application/pdf~pdf,text/pdf~pdf;Microsoft Edge PDF Viewer::Portable Document Format::application/pdf~pdf,text/pdf~pdf;WebKit built-in PDF::Portable Document Format::application/pdf~pdf,text/pdf~pdf",
            "data:image/png;base64,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",
            device["webgl3"]
        ]

    def generate_FFA9D23F7A4B3CSS(self, device):
        r = self.generate_r_list(device)
        print(r)
        return self.m_tk_modules.call("generate_FFA9D23F7A4B3CSS", r)

    def generate_h5st(self, js_v, device_info, func_api, input_clt_str, api_query_time, body_str):
        if js_v == "3014":
            return self.js_3014_security_modules.call("generate_h5st", device_info, func_api, input_clt_str,
                                                      api_query_time, body_str)
        elif js_v == "3015":
            return self.js_3015_security_modules.call("generate_h5st", device_info, func_api, input_clt_str,
                                                      api_query_time, body_str)
        else:
            return self.return_info(code=19)

    def generate_clt_str(self):
        input_clt_dict = {
            "sua": "Windows NT 10.0; Win64; x64",
            "pp": {
                "p1": self.account["pt_pin"],
            },
            "extend": self.device_info["extend"],
            "pf": "Win32",
            "random": self.generate_random_string(),
            "v": self.h5_version,
            "canvas": self.device_info["canvas"],
            "webglFp": self.device_info["webglFp"],
            "ccn": self.device_info["base"]["ccn"],
            "fp": self.device_info["fp"]
        }
        return json.dumps(input_clt_dict, indent=2, ensure_ascii=False)

    def generate_wx_u(self, ts, body_str):
        # 有两次加密
        # 第一次加密  u = this[o(1895, 0, 1634)](s, l, a, p, Gh)[o(1896, 0, 1606)]() || "";
        # 定位点
        # 使用下面方法把u再次加密 二次加密入口：var O = this[d(0, 1005, 1124)](u, e);
        # 实现位置：a = Gh["HmacSHA256"](c, n)["toString"](Gh.enc["Hex"]);
        # 参数c "appid:mcashier&body:{body_str}&functionId:platPayChannel"
        # 参数n u_str加密的值
        u_str = f"{self.device_info['wx_tk']}{self.device_info['wx_fp']}{ts}{self.device_info['wx_ai']}{self.device_info['wx_rd']}"
        return self.wx_h5st_modules.call("generate_wx_u", u_str, self.device_info['wx_tk'], body_str)

    def generate_wx_o(self):
        wx_dict = {
            "sua": "Windows NT 10.0; Win64; x64",
            "pp": {
                "p1": self.account["pt_pin"]
            },
            "fp": self.device_info["wx_fp"],
        }
        wx_o_str = json.dumps(wx_dict, indent=2, ensure_ascii=False)
        return self.wx_h5st_modules.call("generate_wx_o", wx_o_str)

    def generate_wx_h5st(self, api_query_time, body_str):
        # 先定位参数：x-api-eid-token
        # 定位点：P.sign(N) (在第一步上面几行代码)
        # 再逐步进入 Ho(i, r, o, u, c, "next", t)
        # h5st方法定位点  return regeneratorRuntime.wrap   下的   case 8:中 i = this[c(0, 1467, 0, 1719)](r, o)

        ts = self.m_tk_modules.call("format_timestamp", api_query_time)
        u = self.generate_wx_u(ts, body_str)
        o = self.generate_wx_o()
        return ";".join([
            ts,
            self.device_info["wx_fp"],
            self.device_info["wx_ai"],
            self.device_info["wx_tk"],
            u,
            "3.1",
            str(api_query_time),
            o
        ])

    @staticmethod
    def generate_body_str(data):
        # 如果body是字典，先转换成字符串
        if isinstance(data, dict):
            data = json.dumps(data, separators=(',', ':'))
        # 计算SHA256
        data = hashlib.sha256(data.encode()).hexdigest()
        return data

    def refresh_tk_rd(self, device):
        url = "https://cactus.jd.com/request_algo"
        headers = {
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,ko;q=0.7',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Origin': 'https://recharge.m.jd.com',
            'Pragma': 'no-cache',
            'Referer': 'https://recharge.m.jd.com/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
            'accept': 'application/json',
            'content-type': 'application/json',
            'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
        }
        self.session.headers.clear()
        self.session.headers.update(headers)

        json_dict = {
            "63304156-5d68-4a41-94c7-7587e49d5ea2": {
                'version': '5.0',
                'fp': '9pwppps3rxdapwa2',
                'appId': '8e94a',
                'timestamp': 1739791275636,
                'platform': 'web',
                'expandParams': 'YlyXpZ3L3tj83ZXRPp3RnVj8pUTAhQiNmYS9p8S9gRXRfRX9zQXR5xZO3VTMgFTL3Z3L31DB3ZXRPpXNnZ3L3hjB2QXR5xZO3JGNoNDMmFjB2IWMgFWN3EmBmFGA1MDB0QDNp12MzEDL3Z3L3VW9TojA3Ej83ZXRPp3RlVGN2EmN0MjBlJGLkZ2BkNjNkFTA2UDA3UWNgB2A002R5x2RpAV_yQDAiQXR5xZO3BzBiV2MkVjNmNWApRzN38GN3A2B3U2N00GNoBjM3ATN3Z3L3Vm94Ay_4MzR5Z3XtR3A38GNjFGBmNmN1Y2BnRjMoRzM3QDNnFDLoV2AiRzApRXRfRn94Ay_4MzR5Z3XtRH65lEA1cjB5Fz8wICBrsUReYHPx9z_wQS8GcT85hj_wIiBrEyA1lSR8ETAqMTR0AC-lUz__Yn751XPicTAr0jE5hj_wIiBrEyA3Z3L3NG83QXR5xZO3ZWNiBmMfF2LmwzOkhHNrZmCmBiCgIC-nEiB0MiCmwjOnEz_wUT8rcjB3Ej8qlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-5JCB5ZXR5RXRfR3NkQzR5Z3XtRnMrZ2OkBiC0oD-zcEMxQXRfR383ZXRPp3R3Z3L3RCAnEzA0QyR5Z3XtR3DvQTIi8yJVMzR5x2RscTArUz93ZXRPp3R3Z3L3Fz93ZXRPpHMnhHN5x2RnYyR5Z3XtR3NmhD-CQXRfR3ApQXR5xZO3lj_2gXAvgH_rFjAnUT-2Ez9qd3LmYS8l4zR5x2RyczR5Z3XtRHNllGA2QC8qMyQmlGAp0SE0MD-jQCAmAHMiNmNj5mNl5mMpNGK10190Iz9qcW_wUT80I190Iz9qcH_qMzO1wzOsgHAyQCBxMDAncnOfNS9lIS-3Z3L3pz9kQXR5xZOjVWL5x2RxczR5Z3XtBmNkVWRfRn8qQXR5xZOlBWL5x2RxQXR5xZOjNGMoZ3L39yR5Z3XtRHPjRmNfV2LmwzOr0D_rFW9uIGBlgHNod0NpdEMnZ2N6ET_wQj_scEBxMT8pUjBqV2OphHNjcn9vcX94Mz-qFjBnEi_mEz9mwjOscjBr9D_w0C83Y2MmhHAyUz9qIi9qd3LmYS8l4TP5hTRlUTR5ZXRroEPmFWMoFGNf5WMfNy-rhD-sgHMpsTM4IyOoVmCnZmCkRWNndEAt0zBqkjC44jBlYCB2cHNrZ2OoBiOmwjOpUjBvcHA2QC8qMCAnMy-qlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-xZHLlJjBrFT_kIj_MYX84YXR5Z3_903MnN2Loxm9vg3_wkzOkZi-lVT8rVGN6QWN6E2NpRmC0oD-3cD_6UT-2IS94MjOohXNrV28qNy-qZCB2wjO0Mz9kcj90Qi9vcH_qMzOykD-gEyBpBmNrFjA4Qi_lMiOqxm9pIS8x4XRrYX84YXR5Z3_90HLmBGNmxGLnxm9vg3_wkzOkZi-lVT8rVGN6QWN6E2NpRmC0oD-3cD_6UT-2IS94MjOohXNrV28qNy-qZCB2wjO0Mz9kcj90Qi9vcH_qMzOykD-gEyBpBmNrFjA4Qi_lMiOqxm9pIS8x4XR1E2M2gX82Ez-3cVRlUTR5ZXRroEPjRmNfV2LmwzOr0D_rFW9uIGBlgHNod0NpdEMnZ2N6ET_wQj_scEBxMT8pUjBqV2OphHNjcn9vcX94Mz-qFjBnEi_mEz9mwjOscjBr9D_w0C83Y2MmhHAyUz9qIi9qd3LmYS8l4TP5hTRlUTR5ZXRroEPoN2NjV2LnR2LmwzOr0D_rFW9uIGBlgHNod0NpdEMnZ2N6ET_wQj_scEBxMT8pUjBqV2OphHNjcn9vcX94Mz-qFjBnEi_mEz9mwjOscjBr9D_w0C83Y2MmhHAyUz9qIi9qd3LmYS8l4TP59GNoVzOlMDAvQjG5JCB5ZXR5hTCwZGLmZmMfZ2NfNy-rhD-sgHMpsTM4IyOoVmCnZmCkRWNndEAt0zBqkjC44jBlYCB2cHNrZ2OoBiOmwjOpUjBvcHA2QC8qMCAnMy-qlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-xZX-5JCB5ZXR5hTCw5WNgZmMfZ2NfNy-rhD-sgHMpsTM4IyOoVmCnZmCkRWNndEAt0zBqkjC44jBlYCB2cHNrZ2OoBiOmwjOpUjBvcHA2QC8qMCAnMy-qlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-xZ385JCB5ZXR5hTCwBWLpVmMfZ2NfNy-rhD-sgHMpsTM4IyOoVmCnZmCkRWNndEAt0zBqkjC44jBlYCB2cHNrZ2OoBiOmwjOpUjBvcHA2QC8qMCAnMy-qlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-xZH_5JCB5ZXR5hTCwB2Mk52Lkxm9vgHMrV2OpdkNjcE7l0z9kMDAmck9vc390gD-4Iy_qMzB08iOscjBr9D_w0C83Y2MmhHAyUz9qIi9qd3LmYS8l4TP5l09qIiB0oDAG0y90EC95NCB_YnE1InCrJy_0kD82cTINkVERYX84YXR5Z3_9Qy90YX8mET85x29qQy9UQXRfRHNkQzR5Z3XtR3R5x2RoZS93ZXRPpH65Z3XjZ3L3ZGNkQzR5ZXR5xZOpZ3L35G83QXR5ZXRPpXN5x2RiFyB3ZXR5Z3XtJWRfR3MkQzR5ZXR5xZOpZ3L3FG83QXR5ZXRPpXN5x2RlFyB3ZXR5Z3XtJGM5x2RmFyB3ZXR5Z3XtZWRfR3NkQzR5ZXR5xZO3F2OohXN3Z3L3VG83QXR5ZXRPpXN5x2Ru8yR5ZXR5xZOkZ3L3NS_3ZXR5Z3XtZWRfRX_3ZXR5Z3XtZWRfRXAiQXR5ZXRPtSRfRXArET8hEzR5Z3XtlSR5x5RmVGMo1G9xwyR5x2RoZyR5ZXR5xp75x2RpYyR5Z3XtRXMj5SReJ2Mr0jE5tWNrZGN5J0G5Ni8qIz_w80R5x2R4Ei93ZXRPp3RphXNrZ2OmNGNq9TAUY3MmhnMmFmOwQCBzUjF5Z2OphXNrNmNodHAscz9xMVRwdj-2EjI5Fj-woTRtpFGF4lHxZ3MmhnMmFmOl0jH3EjE0oT9pUVRwJ2MhYnLlB2_w8UReZ2OpVWRFgVRm8i_1gD-C4XRphHMqVT_t0z7qk1R5x2R4EyR5Z3XtRXNrZ2OphnNmVmOyIDI5BmNr9mNkdH-nUzA4MURphXNrZ2OmNGNqFD_qQS-WYHPqsjB08VR0sD-tYXONkVERsVP5BmNr9mNkdX8ws1B08EAtYS9YYHPlBW75tWMjhD-CYnLphXNoZXELYn9icTAr0jExZXNrF2R5x2RjUzR5Z3XtFWRfRX_pQXR5xZOnZ3L3pD_3ZXRPp3RGEEOrETOX8FOrETOrETOLMFOxwyR5x2RmozR5Z3XtR3GWkX-fQXRfRX_3ZXRPpXN5x2R18yR5Z3XtZWRfRnBiQXR5xp7',
                'fv': 'h5_file_v5.0.7',
                'localTk': 'tk04wc89238c541lMSszKzJ4MUVoXR5N48S94IT7nMm9pYS9iYCLZZJZELYwDVCMhdV_o92MEwDL30iHlNjBnVjMz8mM',
            },
            "ead25d97-444f-4eb6-82c3-28e2c68b334b": {
                'version': '5.0',
                'fp': 'ddrdapxw3s99aa84',
                'appId': '8e94a',
                'timestamp': 1739802299123,
                'platform': 'web',
                'expandParams': 'YlyXpZ3L3tj83ZXRPp3Rl5GB40GLmMm8hYCB1QSA1QXRfRX9zQXR5xZO3VTMgFTL3Z3L31DB3ZXRPpXNnZ3L3hjB2QXR5xZO3JGNoNDMmFjB2IWMgFWN3EmBmFGA1MDB0QDNp12MzEDL3Z3L3VW9TojA3Ej83ZXRPp3RlVGN2EmN0MjBlJGLkZ2BkNjNkFTA2UDA3UWNgB2A002R5x2RpAV_yQDAiQXR5xZO3BzBiV2MkVjNmNWApRzN38GN3A2B3U2N00GNoBjM3ATN3Z3L3Vm94Ay_4MzR5Z3XtR3A38GNjFGBmNmN1Y2BnRjMoRzM3QDNnFDLoV2AiRzApRXRfRn94Ay_4MzR5Z3XtRH65lEA1cjB5Fz8wICBrsUReYHPx9z_wQS8GcT85hj_wIiBrEyA1lSR8ETAqMTR0AC-lUz__Yn751XPicTAr0jE5hj_wIiBrEyA3Z3L3NG83QXR5xZO3ZWNiBmMfF2LmwzOkhHNrZmCmBiCgIC-nEiB0MiCmwjOnEz_wUT8rcjB3Ej8qlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-5JCB5ZXR5RXRfR3NkQzR5Z3XtRnMrZ2OkBiC0oD-zcEMxQXRfR383ZXRPp3Rqlj_2gXAvgH_rFTA4QS8qd3LmYS8l4zR5x2RnEz90ADAnQXR5xZO39lBXUzEpcUHiRXRfRH_qIz_4QyR5Z3XtRnOscjBrJz-rlzO0IDBnIiOqxm9pIS8xQXRfRHAnQXR5xZOkR2OoZ3L3RS93ZXRPp3RnN2_w80R5x2RzYyR5Z3XtRH_qMzO1wzOsgHAyQCBxMDAncnOfNS9lIS-3Z3L39j_3ZXRPp3RoJGK0Mz9kcj9zNGK0YC7FEjBwAy90MyQh5GLjVGNgNWLgZmNcJDHnETAncjKt0DBlETInETAncjOscjBrJz-rlzO08z944jB0QiOqxm9pIS8xQXRfRX_nEyR5Z3XtBGNhZ3L35j_3ZXRPp3MmFGN5x2RiczR5Z3XtJ2MhZ3L35zR5Z3XtBmNkVWRfRn83ZXRPp3RwB2NmxGNfNy-rhD-sgHMpsTM4IyOoVmCnZmCkRWNndEAt0zBqkjC44jBlYCB2cHNrZ2OoBiOmwjOpUjBvcHA2QC8qMCAnMy-qlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-xZ3_5JCB5ZXR5hTCwNGMlVGMoxWLlxm9vg3_wkzOkZi-lVT8rVGN6QWN6E2NpRmC0oD-3cD_6UT-2IS94MjOohXNrV28qNy-qZCB2wjO0Mz9kcj90Qi9vcH_qMzOykD-gEyBpBmNrFjA4Qi_lMiOqxm9pIS8x4XRgJWA2gHAtESAqkVRlUTR5ZXRroEPjRmNfV2LmwzOr0D_rFW9uIGBlgHNod0NpdEMnZ2N6ET_wQj_scEBxMT8pUjBqV2OphHNjcn9vcX94Mz-qFjBnEi_mEz9mwjOscjBr9D_w0C83Y2MmhHAyUz9qIi9qd3LmYS8l4TP5hTRlUTR5ZXRroEPgN2MoN2LgR2LmwzOr0D_rFW9uIGBlgHNod0NpdEMnZ2N6ET_wQj_scEBxMT8pUjBqV2OphHNjcn9vcX94Mz-qFjBnEi_mEz9mwjOscjBr9D_w0C83Y2MmhHAyUz9qIi9qd3LmYS8l4TP5JDMjNzOlMDAvQjG5JCB5ZXR5hTCwB2NmxGNfNy-rhD-sgHMpsTM4IyOoVmCnZmCkRWNndEAt0zBqkjC44jBlYCB2cHNrZ2OoBiOmwjOpUjBvcHA2QC8qMCAnMy-qlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-xZ3_5JCB5ZXR5hTCwVmNnBGNfR2NfNy-rhD-sgHMpsTM4IyOoVmCnZmCkRWNndEAt0zBqkjC44jBlYCB2cHNrZ2OoBiOmwjOpUjBvcHA2QC8qMCAnMy-qlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-xZnMoVGBrJiB0wzBKYX84YXR5Z3_90XNgNWNixWNnxm9vg3_wkzOkZi-lVT8rVGN6QWN6E2NpRmC0oD-3cD_6UT-2IS94MjOohXNrV28qNy-qZCB2wjO0Mz9kcj90Qi9vcH_qMzOykD-gEyBpBmNrFjA4Qi_lMiOqxm9pIS8x4XRxYX84YXR5Z3_90XLp1WNixWNnxm9vg3_wkzOkZi-lVT8rVGN6QWN6E2NpRmC0oD-3cD_6UT-2IS94MjOohXNrV28qNy-qZCB2wjO0Mz9kcj90Qi9vcH_qMzOykD-gEyBpBmNrFjA4Qi_lMiOqxm9pIS8x4XRjYX84YXR5Z3_903MhZGNixWNnxm9vg3_wkzOkZi-lVT8rVGN6QWN6E2NpRmC0oD-3cD_6UT-2IS94MjOohXNrV28qNy-qZCB2wjO0Mz9kcj90Qi9vcH_qMzOykD-gEyBpBmNrFjA4Qi_lMiOqxm9pIS8x4XRsYX84YXR5Z3_903MjFWLfF2LmwzOkhHNrZmCmBiCgIC-nEiB0MiCmwjOnEz_wUT8rcjB3Ej8qlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-xZHCncT82ET_0ME7nED8oYn94sURCITQ6gX8rED_kMj_VoFGF4VRlUTR5ZXRro09nETRlMCAlY3Lncz9nE1R5x2RoFyB3ZXRPp3R3Z3L3VW9pQXR5xZOcYXRPBWRfRXNoFyB3ZXR5Z3XtZWRfRXLkQzR5ZXR5xZOpZ3L39G83QXR5ZXRPpXM5x2RjFyB3ZXR5Z3XtZWRfRHMkQzR5ZXR5xZOpZ3L3JG83QXR5ZXRPpXMkZ3L3NG83QXR5ZXRPpXN5x2RnFyB3ZXR5Z3XtRHMrV2OpRXRfRHNkQzR5ZXR5xZOpZ3L3tj83ZXR5Z3XtFWRfRn9tQXR5ZXRPpXN5x2RtQXR5ZXRPpXN5x2R18yR5ZXR5xp75x2R1gDAl4CA3ZXRPpH65Z3X3NGNkVGLo4z73Z3L3VW93ZXR5Z3XeY3L3ZS93ZXRPp3RlBW75tWMjhD-CYnLphXNoZXELYn9icTAr0jE3Z3L3VD8mQXR5xZO3BmNr9mNkdH-nUzA4MURphXNrZ2OnNGNqFD_qQS-WYHPqsjB08VR0sD-tYXONkVERsVP5BmNr9mNkdX8ws1B08EAtYS9YYHPlBW75tWMjhD-CYnLphXNoZXELYn9icTAr0jExZXNrFmO4oT_wwi_MQXRfRHBkQXR5xZO3BmNr9mNkdH-nUzA4MURphXNrZ2OnNGNqFD_qQS-WYHPqsjB08VR0sD-tYXONkVERsVP5BmNr9mNkdX8ws1B08EAtYS9YYHPlBW75tWMjhD-CYnLphXNoZXELYn9icTAr0jExZXNrF2R5x2RjUzR5Z3XtFWRfRX_pQXR5xZOnZ3L3pD_3ZXRPp3RqsTOrETOxwSOLMFOxwyR5x2RmozR5Z3XtR3GWkX-fQXRfRX_3ZXRPpXN5x2R18yR5Z3XtZWRfRnBiQXR5xp7',
                'fv': 'h5_file_v5.0.7',
                'localTk': 'tk04wf8b10b3241lMisxKzNjYUFsXRZMhVDBg1m9m9S7pUTAnITAZZJZEHYGPQ6MhdV_o92MEwDL30iHlJjBgRWNi9GA',
            },
            "138402c5-ff04-46b3-a789-000190da5591": {
                'version': '5.0',
                'fp': 'r3dxd3x9apcws9q1',
                'appId': '8e94a',
                'timestamp': 1739806594519,
                'platform': 'web',
                'expandParams': 'XRJ6PZWRfRn-iQXR5xZO3VG9gNi82YCBg5iN14SAmRyR5x2RpAzR5Z3XtRHBl1GAhRXRfRH-4QXR5xZOhZ3L3hjB2QXR5xZO3ZGNgBjMhJWAl92B242Np9WN1UDN08WM2Q2A30GN0MGB3Z3L3VW9TojA3Ej83ZXRPp3RpVGLz8WLlJTMiRjBhRWNiZWA4UGAiJmBnBzBgVGAmVzR5x2RpAV_yQDAiQXR5xZO3BzBiV2MkVjNmNWApRzN38GN3A2B3U2N00GNoBjM3ATN3Z3L3Vm94Ay_4MzR5Z3XtR3A38GNjFGBmNmN1Y2BnRjMoRzM3QDNnFDLoV2AiRzApRXRfRn94Ay_4MzR5Z3XtRH65lEA1cjB5Fz8wICBrsUReYHPx9z_wQS8GcT85hj_wIiBrEyA1lSR8ETAqMTR0AC-lUz__Yn751XPicTAr0jE5hj_wIiBrEyA3Z3L3NG83QXR5xZO3ZWNiBmMfF2LmwzOkhHNrZmCmBiCgIC-nEiB0MiCmwjOnEz_wUT8rcjB3Ej8qlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-5JCB5ZXR5RXRfR3NkQzR5Z3XtRnMrZ2OkBiC0oD-zcEMxQXRfR383ZXRPp3Rqlj_2gXAvgH_rFTA4QS8qd3LmYS8l4zR5x2RnEz90ADAnQXR5xZO3ZC920F7FAyJ2QXRfRH_qIz_4QyR5Z3XtRnOscjBrJz-rlzO0IDBnIiOqxm9pIS8xQXRfRHAnQXR5xZOkhHN5x2RnYyR5Z3XtR3NmhD-CQXRfR3ApQXR5xZO3lj_2gXAvgH_rFjAnUT-2Ez9qd3LmYS8l4zR5x2RyczR5Z3XtRHNllGA2QC8qMyQmlGAp0SE0MD-jQCAmAXMj9WMpFWNk5GLpNGK10190Iz9qcW_wUT80I190Iz9qcH_qMzO1wzOsgHAyQCBxMDAncnOfNS9lIS-3Z3L3pz9kQXR5xZOnVGL5x2RxczR5Z3XtZWMlVWRfRn8qQXR5xZOpBGL5x2RxQXR5xZOpJWMoZ3L39yR5Z3XtRHPjRmNfV2LmwzOr0D_rFW9uIGBlgHNod0NpdEMnZ2N6ET_wQj_scEBxMT8pUjBqV2OphHNjcn9vcX94Mz-qFjBnEi_mEz9mwjOscjBr9D_w0C83Y2MmhHAyUz9qIi9qd3LmYS8l4TP5hTRlUTR5ZXRroEPmFWMoFGNf5WMfNy-rhD-sgHMpsTM4IyOoVmCnZmCkRWNndEAt0zBqkjC44jBlYCB2cHNrZ2OoBiOmwjOpUjBvcHA2QC8qMCAnMy-qlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-xZHLlJjBrFT_kIj_MYX84YXR5Z3_903MnN2Loxm9vg3_wkzOkZi-lVT8rVGN6QWN6E2NpRmC0oD-3cD_6UT-2IS94MjOohXNrV28qNy-qZCB2wjO0Mz9kcj90Qi9vcH_qMzOykD-gEyBpBmNrFjA4Qi_lMiOqxm9pIS8x4XRrYX84YXR5Z3_90HLmBGNmxGLnxm9vg3_wkzOkZi-lVT8rVGN6QWN6E2NpRmC0oD-3cD_6UT-2IS94MjOohXNrV28qNy-qZCB2wjO0Mz9kcj90Qi9vcH_qMzOykD-gEyBpBmNrFjA4Qi_lMiOqxm9pIS8x4XR1E2M2gX82Ez-3cVRlUTR5ZXRroEPjRmNfV2LmwzOr0D_rFW9uIGBlgHNod0NpdEMnZ2N6ET_wQj_scEBxMT8pUjBqV2OphHNjcn9vcX94Mz-qFjBnEi_mEz9mwjOscjBr9D_w0C83Y2MmhHAyUz9qIi9qd3LmYS8l4TP5hTRlUTR5ZXRroEPoN2NjV2LnR2LmwzOr0D_rFW9uIGBlgHNod0NpdEMnZ2N6ET_wQj_scEBxMT8pUjBqV2OphHNjcn9vcX94Mz-qFjBnEi_mEz9mwjOscjBr9D_w0C83Y2MmhHAyUz9qIi9qd3LmYS8l4TP59GNoVzOlMDAvQjG5JCB5ZXR5hTCwZGLmZmMfZ2NfNy-rhD-sgHMpsTM4IyOoVmCnZmCkRWNndEAt0zBqkjC44jBlYCB2cHNrZ2OoBiOmwjOpUjBvcHA2QC8qMCAnMy-qlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-xZX-5JCB5ZXR5hTCw5WNgZmMfZ2NfNy-rhD-sgHMpsTM4IyOoVmCnZmCkRWNndEAt0zBqkjC44jBlYCB2cHNrZ2OoBiOmwjOpUjBvcHA2QC8qMCAnMy-qlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-xZ385JCB5ZXR5hTCwBWLpVmMfZ2NfNy-rhD-sgHMpsTM4IyOoVmCnZmCkRWNndEAt0zBqkjC44jBlYCB2cHNrZ2OoBiOmwjOpUjBvcHA2QC8qMCAnMy-qlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-xZH_5JCB5ZXR5hTCwB2Mk52Lkxm9vgHMrV2OpdkNjcE7l0z9kMDAmck9vc390gD-4Iy_qMzB08iOscjBr9D_w0C83Y2MmhHAyUz9qIi9qd3LmYS8l4TP5l09qIiB0oDAG0y90EC95NCB_YnE1InCrJy_0kD82cTINkVERYX84YXR5Z3_9Qy90YX8mET85x29qQy9UQXRfRHNkQzR5Z3XtR3R5x2RoZS93ZXRPpH65Z3XjZ3L3ZGNkQzR5ZXR5xZOpZ3L35G83QXR5ZXRPpXN5x2RiFyB3ZXR5Z3XtJWRfR3MkQzR5ZXR5xZOpZ3L3FG83QXR5ZXRPpXN5x2RlFyB3ZXR5Z3XtJGM5x2RmFyB3ZXR5Z3XtZWRfR3NkQzR5ZXR5xZO3F2OohXN3Z3L3VG83QXR5ZXRPpXN5x2Ru8yR5ZXR5xZOkZ3L3NS_3ZXR5Z3XtZWRfRX_3ZXR5Z3XtZWRfRXAiQXR5ZXRPtSRfRXArET8hEzR5Z3XtlSR5x5RowlFQISGO0jBRYSG6Iz-3Z3L3VW93ZXR5Z3XeY3L3ZS93ZXRPp3RlBW75tWMjhD-CYnLphXNoZXELYn9icTAr0jE3Z3L3VD8mQXR5xZO3BmNr9mNkdH-nUzA4MURphXNrZ2OmNGNqFD_qQS-WYHPqsjB08VR0sD-tYXONkVERsVP5BmNr9mNkdX8ws1B08EAtYS9YYHPlBW75tWMjhD-CYnLphXNoZXELYn9icTAr0jExZXNrFmO4oT_wwi_MQXRfRHBkQXR5xZO3BmNr9mNkdH-nUzA4MURphXNrZ2OmNGNqFD_qQS-WYHPqsjB08VR0sD-tYXONkVERsVP5BmNr9mNkdX8ws1B08EAtYS9YYHPlBW75tWMjhD-CYnLphXNoZXELYn9icTAr0jExZXNrF2R5x2RjUzR5Z3XtFWRfRX_pQXR5xZOnZ3L3pD_3ZXRPp3RqsTOrETOxwSOLMFOxwyR5x2RmozR5Z3XtR3GWkX-fQXRfRX_3ZXRPpXN5x2R18yR5Z3XtZWRfRnBiQXR5xp7',
                'fv': 'h5_file_v5.0.7',
                'localTk': 'tk04web4b6ff141lMSsxKzIrMjNrXRJNo0m9iMT940W7mJT71M29ZZJZEHI2E_8MhdV_o92MEwDL30iHlFzMo5GAgNGA',
            },
            "7ce72c04-4090-4f76-ba8e-9fc612cf57e5": {
                'version': '5.0',
                'fp': '9cr3pwwawdwwxa39',
                'appId': '8e94a',
                'timestamp': 1739807584855,
                'platform': 'web',
                'expandParams': 'XRJ6PZWRfRn-iQXR5xZO31mN44i8iIj848i8pM29202R5x2RpAzR5Z3XtRHBl1GAhRXRfRH-4QXR5xZOhZ3L3hjB2QXR5xZO3ZGNgBjMhJWAl92B242Np9WN1UDN08WM2Q2A30GN0MGB3Z3L3VW9TojA3Ej83ZXRPp3RpVGLz8WLlJTMiRjBhRWNiZWA4UGAiJmBnBzBgVGAmVzR5x2RpAV_yQDAiQXR5xZO3BzBiV2MkVjNmNWApRzN38GN3A2B3U2N00GNoBjM3ATN3Z3L3Vm94Ay_4MzR5Z3XtR3A38GNjFGBmNmN1Y2BnRjMoRzM3QDNnFDLoV2AiRzApRXRfRn94Ay_4MzR5Z3XtRH65lEA1cjB5Fz8wICBrsUReYHPx9z_wQS8GcT85hj_wIiBrEyA1lSR8ETAqMTR0AC-lUz__Yn751XPicTAr0jE5hj_wIiBrEyA3Z3L3NG83QXR5xZO3ZWNiBmMfF2LmwzOkhHNrZmCmBiCgIC-nEiB0MiCmwjOnEz_wUT8rcjB3Ej8qlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-5JCB5ZXR5RXRfR3NkQzR5Z3XtRnMrZ2OkBiC0oD-zcEMxQXRfR383ZXRPp3R3Z3L3RCAnEzA0QyR5Z3XtRH7TIyH6QyEgk3R5x2RscTArUz93ZXRPp3R3Z3L3Fz93ZXRPpHMrVWRfR39pQXR5xZO3RmNr0jE3Z3L3BT93ZXRPp3RscjBrJz-rlzO08z944jB0QiOqxm9pIS8xQXRfRnAqQXR5xZO3VWMcFjBnEi_mAnNcFT9gIEA20z8nEj9z5WLgBGNo1mNh1WNmlWAQQCA1Qi_apD-4ICAVQCA1Qi_qlj_2gXAvgH_rFjAnUT-2Ez9qd3LmYS8l4zR5x2RtQC83ZXRPp3No1WRfRX-qQXR5xZOpJWMoZ3L39i_3ZXRPpXNj1WRfRX-3ZXRPpXNlJGN5x2RiQXR5xZO31nMfFmMkB2LmwzOoJDB28WLlZGOhETAr0jOmICAmMCBqJTMkRWL1QmO08z944jB0QiOl4S_1cH_qMzOykD-gEyBpBmNrFjA4Qi_lMiOqxm9pIS8x4XRu0VRlUTR5ZXRroEPkx2NgF2MfNy-rVWA4MjMhJWNs5CA1gD-qNS80Mi94cXAlF2NhJzNqFjAnUT-2Ez9qJS7tIjOscjBr9D_w0C83Y2MmhHAyUz9qIi9qd3LmYS8l4TP5tTE5JCB5ZXR5hTCwRGNf1GLkB2LmwzOoJDB28WLlZGOhETAr0jOmICAmMCBqJTMkRWL1QmO08z944jB0QiOl4S_1cH_qMzOykD-gEyBpBmNrFjA4Qi_lMiOqxm9pIS8x4XRuEURlUTR5ZXRroEPlV2LmJGLjxm9vgHN1UjBi5WMplX70Iz_wcn9lEj9mUjO1IGMn5WAndHAyQCBxMDAncX8hoTAqlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-xZn-DYX84YXR5Z3_90XNoxGLmR2LmwzOoJDB28WLlZGOhETAr0jOmICAmMCBqJTMkRWL1QmO08z944jB0QiOl4S_1cH_qMzOykD-gEyBpBmNrFjA4Qi_lMiOqxm9pIS8x4XRoJXE5JCB5ZXR5hTCkJ2LgRGNnV2LmwzOoJDB28WLlZGOhETAr0jOmICAmMCBqJTMkRWL1QmO08z944jB0QiOl4S_1cH_qMzOykD-gEyBpBmNrFjA4Qi_lMiOqxm9pIS8xYX84YXR5Z3_90nMnxWMhZ2Noxm9vgHN1UjBi5WMplX70Iz_wcn9lEj9mUjO1IGMn5WAndHAyQCBxMDAncX8hoTAqlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-xZXA4cT_0QS95JCB5ZXR5hTCwhm9kcD_ggj_rUTKxZX94kzOgUz9nUVRlUTR5ZXRroEMnxGLgZ2Noxm9vgHN1UjBi5WMplX70Iz_wcn9lEj9mUjO1IGMn5WAndHAyQCBxMDAncX8hoTAqlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-5JCB5ZXR5hTCwB2Mk52Lkxm9vgHMrV2OpdkNjcE7l0z9kMDAmck9vc390gD-4Iy_qMzB08iOscjBr9D_w0C83Y2MmhHAyUz9qIi9qd3LmYS8l4TP5l09qIiB0oDAG0y90EC95NCB_YnE1InCrJy_0kD82cTINkVERYX84YXR5Z3_9Qy90YX8mET85x29qQy9UQXRfRHNkQzR5Z3XtR3R5x2RoZS93ZXRPpH65Z3XjZ3L3ZGNkQzR5ZXR5xZOpZ3L35G83QXR5ZXRPpXN5x2RiFyB3ZXR5Z3XtJWRfR3MkQzR5ZXR5xZOpZ3L3FG83QXR5ZXRPpXN5x2RlFyB3ZXR5Z3XtJGM5x2RmFyB3ZXR5Z3XtZWRfR3NkQzR5ZXR5xZO3F2OohXN3Z3L3VG83QXR5ZXRPpXN5x2Ru8yR5ZXR5xZOkZ3L3NS_3ZXR5Z3XtZWRfRX_3ZXR5Z3XtZWRfRXAiQXR5ZXRPtSRfRXArET8hEzR5Z3XtlSR5x5RmVGMo1G9xwyR5x2RoZyR5ZXR5xp75x2RpYyR5Z3XtRXMj5SReJ2Mr0jE5tWNrZGN5J0G5Ni8qIz_w80R5x2R4Ei93ZXRPp3RphXNrZ2OmNGNq9TAUY3MmhnMmFmOwQCBzUjF5Z2OphXNrNmNodHAscz9xMVRwdj-2EjI5Fj-woTRtpFGF4lHxZ3MmhnMmFmOl0jH3EjE0oT9pUVRwJ2MhYnLlB2_w8UReZ2OpVWRFgVRm8i_1gD-C4XRphHMqVT_t0z7qk1R5x2R4EyR5Z3XtRXNrZ2OphnNmVmOyIDI5BmNr9mNkdH-nUzA4MURphXNrZ2OmNGNqFD_qQS-WYHPqsjB08VR0sD-tYXONkVERsVP5BmNr9mNkdX8ws1B08EAtYS9YYHPlBW75tWMjhD-CYnLphXNoZXELYn9icTAr0jExZXNrF2R5x2RjUzR5Z3XtFWRfRX_pQXR5xZOnZ3L3pD_3ZXRPp3RGEEOrETOX8FOrETOrETOLMFOxwyR5x2RmozR5Z3XtR3GWkX-fQXRfRX_3ZXRPpXN5x2R18yR5Z3XtZWRfRnBiQXR5xp7',
                'fv': 'h5_file_v5.0.7',
                'localTk': 'tk04w6880d59441lMysyeDJ3azV2XRJLmVT7i8SAiUj8iYiNnMDLZZJZEHYyn6EMhdV_o92MEwDL30iHlNDA1YGNz02A',
            },
            "417789d1-8884-41c0-98e0-b6f72076775e": {
                'version': '5.0',
                'fp': 'pssrxw3cas9ppdp6',
                'appId': '8e94a',
                'timestamp': 1739808195367,
                'platform': 'web',
                'expandParams': 'XRJ6PZWRfRn-iQXR5xZO3BW91YS9gNCB2Mm8hQi9mYyR5x2RpAzR5Z3XtRHBl1GAhRXRfRH-4QXR5xZOhZ3L3hjB2QXR5xZO3Z2NoFDLjJmMk9GMh5WAmNTNkJDNlVTNlBzBhNDLnBmM3Z3L3VW9TojA3Ej83ZXRPp3RpRGN002Ml9GMiFWLhJjN2YGM1UWM4YWMzQTL202Nj92R5x2RpAV_yQDAiQXR5xZO3J2BiRGBkJGM1AjMiVzNnN2Aj1GNg52AgVmMi9GNjB2N3Z3L3Vm94Ay_4MzR5Z3XtRXM382N4EWMkJzAi9GBnRmNzAGLo1WLz0GNi9mMoB2MnRXRfRn94Ay_4MzR5Z3XtRH65lEA1cjB5Fz8wICBrsUReYHPx9z_wQS8GcT85hj_wIiBrEyA1lSR8ETAqMTR0AC-lUz__Yn751XPicTAr0jE5hj_wIiBrEyA3Z3L3NG83QXR5xZO3ZWNiBmMfF2LmwzOkhHNrZmCmBiCgIC-nEiB0MiCmwjOnEz_wUT8rcjB3Ej8qlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-5JCB5ZXR5RXRfR3NkQzR5Z3XtRnMrZ2OkBiC0oD-zcEMxQXRfR383ZXRPp3Rqlj_2gXAvgH_rFTA4QS8qd3LmYS8l4zR5x2RnEz90ADAnQXR5xZO3FjH2IWLSATG0QXRfRH_qIz_4QyR5Z3XtRnOscjBrJz-rlzO0IDBnIiOqxm9pIS8xQXRfRHAnQXR5xZOoZ3L3RS93ZXRPp3RnN2_w80R5x2RzYyR5Z3XtRH_qMzO1wzOsgHAyQCBxMDAncnOfNS9lIS-3Z3L39j_3ZXRPp3RoJGK0Mz9kcj9zNGK0YC7FEjBwAy90MyQlBmMlZGMpFWLgZmNcJDHnETAncjKt0DBlETInETAncjOscjBrJz-rlzO08z944jB0QiOqxm9pIS8xQXRfRX_nEyR5Z3XtRmNpVWRfRX-qQXR5xZOpRGLoZ3L39i_3ZXRPpXNhZGN5x2RxQXR5xZOpRGLoZ3L39yR5Z3XtRHPjRmNfV2LmwzOr0D_rFW9uIGBlgHNod0NpdEMnZ2N6ET_wQj_scEBxMT8pUjBqV2OphHNjcn9vcX94Mz-qFjBnEi_mEz9mwjOscjBr9D_w0C83Y2MmhHAyUz9qIi9qd3LmYS8l4TP5hTRlUTR5ZXRroEPmFWMoFGNf5WMfNy-rhD-sgHMpsTM4IyOoVmCnZmCkRWNndEAt0zBqkjC44jBlYCB2cHNrZ2OoBiOmwjOpUjBvcHA2QC8qMCAnMy-qlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-xZHLlJjBrFT_kIj_MYX84YXR5Z3_903MnN2Loxm9vg3_wkzOkZi-lVT8rVGN6QWN6E2NpRmC0oD-3cD_6UT-2IS94MjOohXNrV28qNy-qZCB2wjO0Mz9kcj90Qi9vcH_qMzOykD-gEyBpBmNrFjA4Qi_lMiOqxm9pIS8x4XRrYX84YXR5Z3_90HLmBGNmxGLnxm9vg3_wkzOkZi-lVT8rVGN6QWN6E2NpRmC0oD-3cD_6UT-2IS94MjOohXNrV28qNy-qZCB2wjO0Mz9kcj90Qi9vcH_qMzOykD-gEyBpBmNrFjA4Qi_lMiOqxm9pIS8x4XR1E2M2gX82Ez-3cVRlUTR5ZXRroEPjRmNfV2LmwzOr0D_rFW9uIGBlgHNod0NpdEMnZ2N6ET_wQj_scEBxMT8pUjBqV2OphHNjcn9vcX94Mz-qFjBnEi_mEz9mwjOscjBr9D_w0C83Y2MmhHAyUz9qIi9qd3LmYS8l4TP5hTRlUTR5ZXRroEPoN2NjV2LnR2LmwzOr0D_rFW9uIGBlgHNod0NpdEMnZ2N6ET_wQj_scEBxMT8pUjBqV2OphHNjcn9vcX94Mz-qFjBnEi_mEz9mwjOscjBr9D_w0C83Y2MmhHAyUz9qIi9qd3LmYS8l4TP59GNoVzOlMDAvQjG5JCB5ZXR5hTCwZGLmZmMfZ2NfNy-rhD-sgHMpsTM4IyOoVmCnZmCkRWNndEAt0zBqkjC44jBlYCB2cHNrZ2OoBiOmwjOpUjBvcHA2QC8qMCAnMy-qlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-xZX-5JCB5ZXR5hTCw5WNgZmMfZ2NfNy-rhD-sgHMpsTM4IyOoVmCnZmCkRWNndEAt0zBqkjC44jBlYCB2cHNrZ2OoBiOmwjOpUjBvcHA2QC8qMCAnMy-qlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-xZ385JCB5ZXR5hTCwBWLpVmMfZ2NfNy-rhD-sgHMpsTM4IyOoVmCnZmCkRWNndEAt0zBqkjC44jBlYCB2cHNrZ2OoBiOmwjOpUjBvcHA2QC8qMCAnMy-qlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-xZH_5JCB5ZXR5hTCwB2Mk52Lkxm9vgHMrV2OpdkNjcE7l0z9kMDAmck9vc390gD-4Iy_qMzB08iOscjBr9D_w0C83Y2MmhHAyUz9qIi9qd3LmYS8l4TP5l09qIiB0oDAG0y90EC95NCB_YnE1InCrJy_0kD82cTINkVERYX84YXR5Z3_9Qy90YX8mET85x29qQy9UQXRfRHNkQzR5Z3XtR3R5x2RoZS93ZXRPpH65Z3XjZ3L3ZGNkQzR5ZXR5xZOpZ3L35G83QXR5ZXRPpXN5x2RiFyB3ZXR5Z3XtJWRfR3MkQzR5ZXR5xZOpZ3L3FG83QXR5ZXRPpXN5x2RlFyB3ZXR5Z3XtJGM5x2RmFyB3ZXR5Z3XtZWRfR3NkQzR5ZXR5xZO3F2OohXN3Z3L3VG83QXR5ZXRPpXN5x2Ru8yR5ZXR5xZOkZ3L3NS_3ZXR5Z3XtZWRfRX_3ZXR5Z3XtZWRfRXAiQXR5ZXRPtSRfRXArET8hEzR5Z3XtlSR5x5RowlFQISGO0jBRYSG6Iz-3Z3L3VW93ZXR5Z3XeY3L3ZS93ZXRPp3RlBW75tWMjhD-CYnLphXNoZXELYn9icTAr0jE3Z3L3VD8mQXR5xZO3BmNr9mNkdH-nUzA4MURphXNrZ2OmNGNqFD_qQS-WYHPqsjB08VR0sD-tYXONkVERsVP5BmNr9mNkdX8ws1B08EAtYS9YYHPlBW75tWMjhD-CYnLphXNoZXELYn9icTAr0jExZXNrFmO4oT_wwi_MQXRfRHBkQXR5xZO3BmNr9mNkdH-nUzA4MURphXNrZ2OmNGNqFD_qQS-WYHPqsjB08VR0sD-tYXONkVERsVP5BmNr9mNkdX8ws1B08EAtYS9YYHPlBW75tWMjhD-CYnLphXNoZXELYn9icTAr0jExZXNrF2R5x2RjUzR5Z3XtFWRfRX_pQXR5xZOnZ3L3pD_3ZXRPp3RrETOxwSOLMFOxwyR5x2RmozR5Z3XtR3GWkX-fQXRfRX_3ZXRPpXN5x2R18yR5Z3XtZWRfRnBiQXR5xp7',
                'fv': 'h5_file_v5.0.7',
                'localTk': 'tk04w98a8064441lMisyeDIrM3gyXR5MpIT9p0m94MjNi4y9mMS9ZZJZEH4wWAHMhdV_o92MEwDL30iHlJ2MnR2A3M2N',
            },
            "adef7126-2bb8-4b3d-bdee-dd96cbaa2d68": {
                'version': '5.0',
                'fp': '339psxdawcr399a4',
                'appId': '8e94a',
                'timestamp': 1739810250469,
                'platform': 'web',
                'expandParams': 'WNpZcwZN5x2Ru8yR5Z3XtRXM40GLmRiBiUTAhMS9gNmN3Z3L3ZyA3ZXRPp3R4IGL042R5x2RwUzR5Z3Xt5WRfR3_2MzR5Z3XtRXNnVGAgBWMiFmMk5WL1MmBpFWAoJGBpJ2A34mBgR2MiRXRfRHNpAV_yQDAiQXR5xZO3Z2NoFDLjJmMk9GMh5WAmNTNkJDNlVTNlBzBhNDLnBmM3Z3L3ZyIt8zB08yR5Z3XtRXM382N4EWMkJzAi9GBnRmNzAGLo1WLz0GNi9mMoB2MnRXRfRHNmUz8rUjB3ZXRPp3RlRjMnVDMlFWAz8mM4Q2NmBzMgVGLhBDLo9mMiV2MjR2R5x2RmUz8rUjB3ZXRPp3RcYHC0Ij_2YHAj0T84gjD5tSRw5nAr0z9lMk_lY3_q0T82gD8zIH65lEA1cjB5Fz8wICBrsUReYHPx9i_1gD-CY3_q0T82gD8zQXRfRnNkQzR5Z3XtRXNp92MixGMfNy-rF2OohXN6M2860S8wQC82Ej96My-qRCAr0DBlgj_2QDAicH_qMzOykD-gEyBpBmNrFjA4Qi_lMiOqxm9pIS8xYX84YXR5Z3R5x2RnFyB3ZXRPp3RihXNrF286ET_wAjCk5zR5x2RjQXR5xZO3dH_qMzO1wzOsgHA1Uz9lcnOfNS9lIS-3Z3L3RCAnEzA0QyR5Z3XtRXFPUkNJQk8xA0R5x2RscTArUz93ZXRPp3Rqlj_2gXAvgH_rFTA4QS8qd3LmYS8l4zR5x2R0QyR5Z3XtVWRfR39pQXR5xZO3RmNr0jE3Z3L3BT93ZXRPp3RscjBrJz-rlzO08z944jB0QiOqxm9pIS8xQXRfRnAqQXR5xZO3VWMcFjBnEi_mAnNcFT9gIEA20z8nEj9zJ2MiJWNkZGMh1WNmlWAQQCA1Qi_apD-4ICAVQCA1Qi_qlj_2gXAvgH_rFjAnUT-2Ez9qd3LmYS8l4zR5x2RtQC83ZXRPp3NmZGN5x2RxczR5Z3XtZ2NgVWRfRn8qQXR5xZOp5WNoZ3L35zR5Z3XtZ2NgVWRfRn83ZXRPp3Rw92Lk9GMjxm9vgHN1UjBi5WMplX70Iz_wcn9lEj9mUjO1IGMn5WAndHAyQCBxMDAncX8hoTAqlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-xZn-QYX84YXR5Z3_90HMfRGLkB2LmwzOoJDB28WLlZGOhETAr0jOmICAmMCBqJTMkRWL1QmO08z944jB0QiOl4S_1cH_qMzOykD-gEyBpBmNrFjA4Qi_lMiOqxm9pIS8x4XRuIURlUTR5ZXRroEPnV2Lg1GMjxm9vgHN1UjBi5WMplX70Iz_wcn9lEj9mUjO1IGMn5WAndHAyQCBxMDAncX8hoTAqlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-xZn-EYX84YXR5Z3_90XMoxmNl12MfNy-rVWA4MjMhJWNs5CA1gD-qNS80Mi94cXAlF2NhJzNqFjAnUT-2Ez9qJS7tIjOscjBr9D_w0C83Y2MmhHAyUz9qIi9qd3LmYS8l4TP5tzE5JCB5ZXR5hTCwZGNf1mNnxm9vgHN1UjBi5WMplX70Iz_wcn9lEj9mUjO1IGMn5WAndHAyQCBxMDAncX8hoTAqlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-xZHN1JURlUTR5ZXRroEMlxGLnV2Noxm9vgHN1UjBi5WMplX70Iz_wcn9lEj9mUjO1IGMn5WAndHAyQCBxMDAncX8hoTAqlj_2gnAs0D7kQTNjN2O08DBncT8mcnOfNS9lIS-5JCB5ZXR5hTCw92NfJWLpRGNfNy-rVWA4MjMhJWNs5CA1gD-qNS80Mi94cXAlF2NhJzNqFjAnUT-2Ez9qJS7tIjOscjBr9D_w0C83Y2MmhHAyUz9qIi9qd3LmYS8l4TP5JDBqoDAnYSRlUTR5ZXRroEPbNC8qkD7rcz_4oWP5ZCBsgH74Qy9YYX84YXR5Z3_9E2Nf1GLpRGNfNy-rVWA4MjMhJWNs5CA1gD-qNS80Mi94cXAlF2NhJzNqFjAnUT-2Ez9qJS7tIjOscjBr9D_w0C83Y2MmhHAyUz9qIi9qd3LmYS8l4TRlUTR5ZXRroEPjBGMhxGMfNy-rF2OohXN6M2860S8wQC82Ej96My-qRCAr0DBlgj_2QDAicH_qMzOykD-gEyBpBmNrFjA4Qi_lMiOqxm9pIS8x4XR8Qi_lMDAtEjFgQCAkUSRmUjD59UA1d0OlgDAsEiBqIVGMIUH5JCB5ZXR5hTCnQCA5Ji90ISRfRi_nQCI3Z3L3VG83QXR5xZO3RXRfRHNpYyR5Z3XtlSR5x5M5x2RpVG83QXR5ZXRPpXN5x2RhFyB3ZXR5Z3XtZWRfRnMkQzR5ZXR5xZOlZ3L3BG83QXR5ZXRPpXN5x2RkFyB3ZXR5Z3XtZWRfRXMkQzR5ZXR5xZOlFWRfRnNkQzR5ZXR5xZOpZ3L3RG83QXR5ZXRPp3RkhHNrZ2R5x2RoFyB3ZXR5Z3XtZWRfRn-iQXR5ZXRPpHM5x2RmozR5ZXR5xZOpZ3L3pzR5ZXR5xZOpZ3L3Jj83ZXR5Z3XeY3L3Jz_0IS70QXR5xZOcYXRPRH9PMEHlolHwMTHpolC1wzR5x2RoZyR5ZXR5xp75x2RpYyR5Z3XtRXMj5SReJ2Mr0jE5tWNrZGN5J0G5Ni8qIz_w80R5x2R4Ei93ZXRPp3RphXNrZ2OmNGNq9TAUY3MmhnMmFmOwQCBzUjF5Z2OphXNrNmNodHAscz9xMVRwdj-2EjI5Fj-woTRtpFGF4lHxZ3MmhnMmFmOl0jH3EjE0oT9pUVRwJ2MhYnLlB2_w8UReZ2OpVWRFgVRm8i_1gD-C4XRphHMqVT_t0z7qk1R5x2R4EyR5Z3XtRXNrZ2OphnNmVmOyIDI5BmNr9mNkdH-nUzA4MURphXNrZ2OmNGNqFD_qQS-WYHPqsjB08VR0sD-tYXONkVERsVP5BmNr9mNkdX8ws1B08EAtYS9YYHPlBW75tWMjhD-CYnLphXNoZXELYn9icTAr0jExZXNrF2R5x2RjUzR5Z3XtFWRfRX_pQXR5xZOnZ3L3pD_3ZXRPp3RGEEOrETOX8FOrETOrETOLMFOxwyR5x2RmozR5Z3XtR3GWkX-fQXRfRX_3ZXRPpXN5x2R18yR5Z3XtZWRfRnBiQXR5xp7',
                'fv': 'h5_file_v5.0.7',
                'localTk': 'tk04w5103abc941lMysxZlFuUjk5XRZM40GLmRiBiUTAhMS9gNmNZZJZEHIo7P7MhdV_o92MEwDL30iHlVGL0E2AoVzN',
            },
        }

        response = self.get_response(url=url, json_data=json_dict[device["base"]["deviceId"]])
        resp_json = response.json()

        self.tk = resp_json["data"]["result"]["tk"]
        self.rd = re.search(r"rd=\'(.*?)\';", resp_json["data"]["result"]["algo"]).group(1)

    def refresh_wx_tk_rd(self, device):
        url = "https://cactus.jd.com/request_algo"
        headers = {
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,ko;q=0.7',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Origin': 'https://mpay.m.jd.com',
            'Pragma': 'no-cache',
            'Referer': 'https://mpay.m.jd.com/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
            'accept': 'application/json',
            'content-type': 'application/json',
            'sec-ch-ua': '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
        }
        self.session.headers.clear()
        self.session.headers.update(headers)

        params = {
            'g_ty': 'ajax',
        }

        json_dict = {
            "63304156-5d68-4a41-94c7-7587e49d5ea2": {
                'version': '3.1',
                'fp': '3350062741226380',
                'appId': '303a7',
                'timestamp': 1739791673367,
                'platform': 'web',
                'expandParams': '5e2976855ec13d55dbffcc514b657c9ec71b38bcd7d88f101ff260cf6b8a04fae8a99396e1282784963bc1d386b5684f19ff8d380cb911c1ff78c73f146daab96e0221221d9d000daab152be86bf4f0ed9c1b3d547d431a50d613e58431bef33e01ea7d3704fd6f1f6bd6e70c1646c68bf91309f66dcff0b5ea066beb1bc7db1189ffabb2ab64aea44005942412ad88397d22ad7b33e353d1fd833c6df4fc1ee6376552c02cbfe3c416fb8477294f8883643e7527e47ea76a560289c418b1e2292bed385c9150d815623b7ed7f978336ae955e4c285e1b4ef1b1277167544a3f082ec1f6f0f4218bbaaf7ecbc9801b2debbeb61469ae57efd6b99bf0b3b9c4023af0d28f8bec14130575583707b240d9a8c4f0604e0f82c91195c046de59027874733a46525f43f16740146cfa470bde21d3a6be4dd597d5a91a99f37427170dc2f4714f0f413f34047f77ecbea1a0e25047d98067c6a8d1e6dd1733b70b0df15e94285966b16ae17bb23f6c74c39a4ccab5e1561ec3874e4c6592771c7c42ff65c5dbb4332b228e003f5cff5fd17c86b7d58adc21f6f56880047b15961de50b6c4a15897f60437d2e559a696ec39376208caaaa0a529f28636da4cd2cdcce239fd5c824fa36008dbde280cd1f42c522002cc644653983f3bf385f39f8cfcd575764032905636ee1cc23fe157805a5f3b15a9078726a2e11c96436c5eea0476b5a2bfff9840758591ebb1715b0f6f8ffd01654335f8b1ef5529bd776c76db5af7f5a454c869e4d975839a2dc895bc258e438015f863f7b9e9a5bb9d100d2233a1051f09b4763984d35efefa114affd6d1a640b4dcef985e7f3c45f31f07fa0ca5ad2242ca6ff9e94669478d8bed26925341f5a7a39cd3ef7d80b1a6d427d0b34f2e6e70a07ca1587493b26cf4d62c86e16b639a1040038ebe8ced7b312c5619c77744a882f1a87b2990613754170be2a1e7ddc36798069f25fa1051213799140ca5ee0dcdf0b04ab951fc7876c2c64f0ae6c362c99c609a4ee7b38ccb6e9f8c46cc108879348cce75ace33bc585a48a8d8346bbfc574af2b77e3cd8759c5e59aad500fa941aa6a1839a2023c960b278dca2b48e468ec5bec38cad1cf44325be84b1ac0e2c8975d43dd699382da2543e55d24183001afd6abd04a2cd3aba7412b61cdbcf7a949a4cfccccd6f7c9e64ea8',
                'fv': 'v3.2.0',
            },
            "ead25d97-444f-4eb6-82c3-28e2c68b334b": {
                'version': '3.1',
                'fp': '3606331785990409',
                'appId': '303a7',
                'timestamp': 1739802049153,
                'platform': 'web',
                'expandParams': '5e2976855ec13d55dbffcc514b657c9ec71b38bcd7d88f101ff260cf6b8a04fae8a99396e1282784963bc1d386b5684f791a6c8710dd1f7a12f19689ea0c944cf5deb0e2f9242196f7d8e4fd5216f37b3d9fa8786e04aa0519c762c096bb2f35ca2fcd07201e8107f8a9c50674a879a0ceeaf92f45019082ac327d4f0956bf72a372ef93472dbeecabf9fe241da9c7921979762be6662fb02565255ca9d03a8d778e5847d5485d23e48546da1bd14670355172b1dbd50a06d9ae3561b00c8ba6288f4f0aca7bde1bacd385cdc1116025bf33b02d90d6250582c4e4bfa6a2745979e48bcace8663b5cafd3def204d642f60d0e1cc1bd51984cda30b76627fb1ebba1785937c9102fb0ef56de1619cbb9b700d60964f90df3c8529ba3fca4f2e5c451af4ae655d720fcb4b46b8ad33c12c0e6b2b3b2619b3e6d21e419c7713a5ff941742c28ef1cdabd12785564c0c0d04135e2518a913462372116922dbb939157f549786c0eb192e5f017661ed4951fa9a55ccec79c11667e9a8ef88c078bb4d35ccebfff75c9702047c30188b55e3ab4f331d4d19fda3963f270c098eea170e719301af2f8728f51424c6f1d8fd3d95c55757a35348537cc932b43f2876c224bccc811ed668e35f72fcfed57dc808a6d1ae04263bbee86c4f3fea8e7dc0d0313c95338d18c9a5b5dbc8c69f219e4a38fea622c4e6de5860e0db5149a0078c91e719a3c10045f31c013673d9ab3cb08dd3e13bdbc22766dff14488236df767f15948c68ca1eb6815ce7ac10d5a0baf35d30eba5be9ed99eb7da434442556f3e06427b7f62b4118e9d7a6169146f773946ee5c757582df2f00e29c33777a82784d50e94e7724a16868a8754d8ac919eee9eafbe9da0b56a6d814ee9422515b4a06185b6d2a4a5c5137c33f2e17d2b730c8ac6eb16cbe2c6cfdeab9582c1a851e05285ec33c121cd85ddf1488cc68b05355d56022f6e42a6ae02d94b6e394e9e32add925478398af51739d080891b53892f51d851d929abb7de7b00e723d17c7e811ebe36ff756acd9f4f512c51658b38ff5839a0946ce32cf61a9621d751e5868e63bd46b00875bc6c4f5c4d675bb71c85651ffb33fd3739a03dba111da2086ee',
                'fv': 'v3.2.0',
            },
            "138402c5-ff04-46b3-a789-000190da5591": {
                'version': '3.1',
                'fp': '5931396482503861',
                'appId': '303a7',
                'timestamp': 1739806281684,
                'platform': 'web',
                'expandParams': '5e2976855ec13d55dbffcc514b657c9ec71b38bcd7d88f101ff260cf6b8a04fae8a99396e1282784963bc1d386b5684f791a6c8710dd1f7a12f19689ea0c944cf5deb0e2f9242196f7d8e4fd5216f37b3d9fa8786e04aa0519c762c096bb2f35ca2fcd07201e8107f8a9c50674a879a0ceeaf92f45019082ac327d4f0956bf72a372ef93472dbeecabf9fe241da9c7921979762be6662fb02565255ca9d03a8d778e5847d5485d23e48546da1bd146704fb27cbe988b849e6e56f7cca22176b0dd62a3b248ec2e10ba40cb917b1ef66de5ba528d623f25d2d8de5c2303da4005acca86b40307500c6191a4bb705817ae8b64be4080abc73c19492abb0a50002444846d1992cd54d350c49791e95ae383fbcb05d679646ff062749637defa462622874f438ab7404298859f429a07b736265721f14b1e7889e35cc93be8d2b701f7370962d005cdd33a52f87fb15edc0913d1b5d26473e123bd76897d237454529d8fa3549325ba0d522ed962f58a8358f7be4b0a02cc22f6d9db37ad9e61d4b1cdddc498177d3bd6fcbf1bb99fe22c4473608dc8959885db19dc0f2de4e404c31748795228c001726f243f01e00dcb66e6c6c52fb7d082d4f6f113c4e4fdadab72f9f0cb2e8e8540ef309ba8256b02cca1ee090c96b918e04eb17cd551f05441461c6cef87cc1aa59af30f3ec64c23794fea541a248d793ce40813bb410e90948a7df2bdae9104518de13588de2d19002850dbc775cf031480acc263576a5ff914065b96ac548482176af4d7caa0cbfc8f465609c059e467f9a34fd14069490567ceb106766f42f5d2cf50b09306f4714338632aa94f47fb2c1f357bc674bc7470cb830e8e9a78fa10d8a667c66a33ffb4773209b1a9403f2e5280c9aa07be447ad3998f12ab2f829cbe7dc3874ed8f7c6edffbe1f4bf2895e7a9cd7485b62e136f93cc0beb28772c10b6dc3e3ec781ba14c0ebd008cdf99b6cd2e4dfb55bfa393e0532fcefc79707c18e7bfe7e8f1f8b68d38a96c70eff3837283a44b62a4b6a4dad5613be71d25aed131c00114437078936e21b9e4b8481585785f240b127d071af9eff1d0b7cde01b1c89ae94f39ae07bcad11f9dc666392fcd621686c9a570e90ef51f1695f41a201bcd67b12a15',
                'fv': 'v3.2.0',
            },
            "7ce72c04-4090-4f76-ba8e-9fc612cf57e5": {
                'version': '3.1',
                'fp': '5709503734621005',
                'appId': '303a7',
                'timestamp': 1739807784453,
                'platform': 'web',
                'expandParams': '5e2976855ec13d55dbffcc514b657c9ec71b38bcd7d88f101ff260cf6b8a04fae8a99396e1282784963bc1d386b5684f19ff8d380cb911c1ff78c73f146daab96e0221221d9d000daab152be86bf4f0ed9c1b3d547d431a50d613e58431bef33e01ea7d3704fd6f1f6bd6e70c1646c68bf91309f66dcff0b5ea066beb1bc7db1189ffabb2ab64aea44005942412ad88397d22ad7b33e353d1fd833c6df4fc1ee6376552c02cbfe3c416fb8477294f8883643e7527e47ea76a560289c418b1e2292bed385c9150d815623b7ed7f978336ae955e4c285e1b4ef1b1277167544a3f082ec1f6f0f4218bbaaf7ecbc9801b2debbeb61469ae57efd6b99bf0b3b9c4023af0d28f8bec14130575583707b240d9a8c4f0604e0f82c91195c046de59027874733a46525f43f16740146cfa470bde21d3a6be4dd597d5a91a99f37427170dc2f4714f0f413f34047f77ecbea1a0e25047d98067c6a8d1e6dd1733b70b0df15e94285966b16ae17bb23f6c74c39a4ccab5e1561ec3874e4c6592771c7c42ff65c5dbb4332b228e003f5cff5fd17c86b7d58adc21f6f56880047b15961de50b6c4a15897f60437d2e559a696ec39376208caaaa0a529f28636da4cd2cdcce239fd5c824fa36008dbde280cd1f42c522002cc644653983f3bf385f39f8cfcd575764032905636ee1cc23fe157805a5f3b15a9078726a2e11c96436c5eea0476b5c0ce8724bfbe84323b41b72a71cdb62416ce6e85a7227fd78a6fb6cf5fad36989db1d228dd96db0bc77b636fa29f304bc7bcd5c3a1dfdd74df3c904bbf7d420d40377abc67be5f9109904f0af54572fbc27e36f81171960874357a037642e02bd8e68f55aacd86093aad2b52a6c1fb2790f76972a29d8be7478444c1157c73e73eb15856f5856244f5251183d6b445813149276080cfa0f37ef457f63ba86f4b3b85367e9295d0fd10013bc08b0514d7b5f39fcfd1a6360f453065b654d2f6ceb0233fce8b76001cec3d2e37ceae14bdf8286e2b9513fe6007a010cbaf4fc02c63b6826b6420797dd63f5ad24b1130006975da11c1271cdf78039cd0bd6cdd7c287f750fa61df809b158f26c24f11727d62bc7514bb418e5c226c5a21ad4626f824089977fc26dd8eb276e587d69771ab645d3dedef6824a76df9dc9b706df59d34675fbc4a8521f62c780e56522fd4',
                'fv': 'v3.2.0',
            },
            "417789d1-8884-41c0-98e0-b6f72076775e": {
                'version': '3.1',
                'fp': '8073498708386215',
                'appId': '303a7',
                'timestamp': 1739809425244,
                'platform': 'web',
                'expandParams': '5e2976855ec13d55dbffcc514b657c9ec71b38bcd7d88f101ff260cf6b8a04fae8a99396e1282784963bc1d386b5684f568f5bd2ba5f53fca59d1b2fae2a229b23888a96e3af8a99f47aa1937ece295a655e0a09bea2fc47877b984643ad15a2636e02a541f82b8dc5cd18939decbd46a268321705e8af41babd517c4a748c233e4920ec50f53e19eb68d52ffc57264fd32f54f0078d9948f53454a6e4f338f1e65cf809c283b50dabcdaea9498b395b0e5820ef644f3036d1a3313142cb8eead5727d9cc333de10a7863b4280189c41703e98871b0f260e9162dc780b3501c65e42af78ca0dd9c7db3dd33683a74ebf17eb50ff740551a95ca82688278e16b1757f5ef368f0455a86fe62cc0f02c9e21bd33734e0e6a45733f7ccd3e43df7f8785f0ab138185f60a041c0386ff3fb821135c3adddca727bdc5169bd485790394c3695c86549fa3e8bb0cf22e9e880c4f5c74abbd5792bdb8955d2ec6288b8173c4b221c38077137e09e40796e68fd77958773107f866cfae2cd53d3ec2a3ec0bc52aa4904479818dc8262cd9e60a08d2e28d645ee483284d06e3dd63ae50fd183a414ff2bfbbdd60228fea19f30d313a9f72b95bda769a293b1922fc08c2fc840fa37d34d97b310721aba365a5acd90ea9d978832a5c1b27358cf9372e3e35b702dc30dde40b16616de5318f0727ba466d3397cb95cf98283d7d43be90bc5655fead4206fb4c7f68b4dce806f833cdd2bd7e1621c0cf0fa9c4b09a0c1d5dc3c3b0d544242e4fa95d38db88c67eec2dff760f8842c233a77cf11de65d342cca375c6ca1b073bd5fc91ffb38644e486df2750c41acf132d4431b9f9bca6f98f2fdddcdbd83d71f445fe758bfd506c7f6384297a82634597db5ad5c06a47cba3bbcc7e356d75d7459c60a02c02cb19e77f0bca07cfb7c55e3c00375e8f3238da850e0df55b5525c3123ba540a8dd8f8419e558209ae757b6eaa65e9e7f069875f4e40673d1e5614f02546c4c66f02d3b8e7345a157f82b8718b78badb9ac7749de2a2f2c246d951ede21876cabe4230dbc852cbfa27c72e5cf328ccfa1bf3b293e3e97bf816609674c8bbe79ecda8a0b6f670b527a981e5f96b16ca245b3c32daa',
                'fv': 'v3.2.0',
            },
            "adef7126-2bb8-4b3d-bdee-dd96cbaa2d68": {
                'version': '3.1',
                'fp': '9033892229983157',
                'appId': '303a7',
                'timestamp': 1739810433642,
                'platform': 'web',
                'expandParams': '5e2976855ec13d55dbffcc514b657c9ec71b38bcd7d88f101ff260cf6b8a04fae8a99396e1282784963bc1d386b5684f19ff8d380cb911c1ff78c73f146daab96e0221221d9d000daab152be86bf4f0ed9c1b3d547d431a50d613e58431bef33e01ea7d3704fd6f1f6bd6e70c1646c68bf91309f66dcff0b5ea066beb1bc7db1189ffabb2ab64aea44005942412ad88397d22ad7b33e353d1fd833c6df4fc1ee6376552c02cbfe3c416fb8477294f8883643e7527e47ea76a560289c418b1e2292bed385c9150d815623b7ed7f978336ae955e4c285e1b4ef1b1277167544a3f082ec1f6f0f4218bbaaf7ecbc9801b2debbeb61469ae57efd6b99bf0b3b9c4023af0d28f8bec14130575583707b240d9a8c4f0604e0f82c91195c046de59027874733a46525f43f16740146cfa470bde21d3a6be4dd597d5a91a99f37427170dc2f4714f0f413f34047f77ecbea1a0e25047d98067c6a8d1e6dd1733b70b0df15e94285966b16ae17bb23f6c74c39a4ccab5e1561ec3874e4c6592771c7c42ff65c5dbb4332b228e003f5cff5fd17c86b7d58adc21f6f56880047b15961de50b4060bebdb6ac68170ae16e546e326611e3f6623a89f7cbc759e2c634123fc220280bc606c348d4f31d1db11998e2c201426ed1b51b8a495aa234e4e915afdccc9181b075619e321696eeeff8392ac050a97040d2e64a47bc3622a80f11d12734c9594554c42e3281d1659eecc56343033bfae451cd33e9b5599d36c208ac48ac6c58ee2af00df595b24125c937a150cea742faa114abcc032a67d85452722f28cc260e878e41ad6d0c53b676b70b7730e27793b817d766fd41825d727d38521ae5a88b271dff7926a9cc9afecbee45b5e28845215e97bf90cb8b43349595a9cba38c90669d63d75a873e2856e990e13a407c04920c7cd77803ddae77cc763984e07b583326e56a8982fdd2ddb40d0882840e3382afa529721a729d85f6b52b970d9e63ffd96caec652ca407e05a18756502d8efba0c036918bd06e3bed6b86afd28166ccfede6485960fc73c7bd46b2489c096ea18220875dfa57a4c311ee9ce4e463bc66f4454a82f3ff2d5237e22665c6a46fe01649f9f47803543f30a452e3e45729053074c9e52eb3f3e9b1d657478791ef01d9ab325c7e5be976aae359eb0334f47c8c409ce33877429c9f95eff',
                'fv': 'v3.2.0',
            },
        }

        response = self.get_response(url=url, params=params, json_data=json_dict[device["base"]["deviceId"]])
        resp_json = response.json()

        self.wx_tk = resp_json["data"]["result"]["tk"]
        self.wx_rd = re.search(r"rd=\'(.*?)\';", resp_json["data"]["result"]["algo"]).group(1)

    # 3AB9D23F7A4B3C9B / 3AB9D23F7A4B3CSS
    def refresh_eid_eidtoken(self, device):
        url = "https://jra.jd.com/jsTk.do"
        headers = {
            'Accept': '*/*',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,ko;q=0.7',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Origin': 'https://recharge.m.jd.com',
            'Pragma': 'no-cache',
            'Referer': 'https://recharge.m.jd.com/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
        }
        self.session.headers.clear()
        self.session.headers.update(headers)

        json_dict = {
            "63304156-5d68-4a41-94c7-7587e49d5ea2": 'a=7TJI7TceW0Pu7Tce7TZ37Tce7Tce7T7L7TcezlP47Tce7TZ37Tce7Tce7T7L7TceiQPmSg6PwHcPwj<PwH7gSf7AfANwvf7N6jb3A4JN7Tce7T7L7TceFQwPwHcPwj<PwH73ff3wwBJRZTZRSBWlTj*lwPZ6ZBfTA<RggNR7fTcBRNbI6kpw6493RPF0fBRfS<6jAfZZZTf3ZNFhTf7Ig<f6ZjfFZPZK64RF64PwSjRAAH71R<C1SAABT44PwHcPw4wPwH7CzlRP7Tce7TZ37TceWtReygZj7Tce7T7L7TceWIAewGAB6SAewdwPwHcPw4wPwH7QWIAewGAB6SAewHcDZg74wl<DZTckFLikFL<BZgFPZLAtiT3Gigcxw0Zb7Tce7T7L7TceitREW0APwHcPwj<x7T7L7TceJGAewGAB6SAewH6uwGDDvH2PwHcPw4wPwH7*JGAewGAB6SAewH2ehlkjhBfwg<CVZH2lZTwEZB2kOL4PwHcPw4wPwH7Q7Tce7TZ37TceweAewGAe6eAewdwPwHcPwj<PwHctwBclFQ6Ew0fPFLitZQiEFL6BFH7GiHRHFTFHOLJbiSAewGAe6eAewQ8PwHcPwj<PwH7eFgZoih7dFSECvQp4vQZXzSAeRQ9eF0feR0fjigPs7Tce7T7L7TceWhwPwHcPwj<PwH7XWQRPW4P47TZ<wB2tOL6BOLiBwBWk7TclWlfeJQPHFfREW0APwj6B7TclWl9kWQZP7TZ<ZL<PwHcPw4wPwH7UWkRr7Tce7TZ37TceyQR4wLZ3ff3wwBJRZTZRSBWlTj*lwPZ6ZBfTA<RggNR7fTcBRNbI6kpw6493RPF0fBRfS<6jAfZZZTf3ZNFhTf7Ig<f6ZjfFZPZK64RF64PwSjRAAH71R<C1SAABT4P36AN3TfFLTj73gAxR6AN36ANLT<JZZ<*jRfijAkpfSfaPwHcPw4wPwH7xySAewGAB6SAewGAewGAtR2/&d=7TJI7TceJ1wPwHcPwj<PZjcPwH74FhFpilfAygkP7Tce7TZ3wTWBOTWEwTctZLwjweAe6eAewQRPJQPHFAfuFNRpzgAPwHcPwj<xZBwEZB4xwHWjwBAB7TJ<7T7L7Tceil<PwHcPwj<PZjcPwH7jF<bbWlaPwHcPwj<PwHc*FQctFH<xOgAewg7GZQcxZlceiH34wBwBiTAlwTJGFGAewGAe6eAewQZXzdRPq1ROigkP7Tce7TZ37TceJlfGFl*Pw4ZPq13PWQPCFgEjig*CJlfGFl*PwHcPw4wPwH7tFg7dz1FPWdZpzlDPwHcPwj<PwH7hFg71TIAewL<uwIAewIb5W0fuRj*PwH3NAeAewLcuwIAew<ZoWQ9CyhfCKSAewGAe6eAewdZoigRpzQJwfGAewGAB6SAewPJPi4Jw7Tc*RjxTTIAew<fT7Tc*wSD*7Tc*K<9*FgE1TIAew<fT7Tc*RjxTTIAew<fT7Tc*wSD*7Tc*6lbezlkpJgjp7Tce7T7L7TceJQfuF09e7Tce7TZ37TceflfGSlPj7Tce7T7L7TceWQfuF0feFhcPwHcPwj<PwH7hFg7vyh6PwH3hFg71TIAewGAe6eAewQfDJ0fuWlPXzdwPwHcPwj<PZAcPwH73T4JwRf9pzdZjigEHFgRVih7eihPB7Tce7T7L7TceRfbAhl7sFgE4hlkpzQkbqIAewGAe6eAew4fifN9Hz0P*hlZXzdRezl*PwHcPw4wPwH7NgNRVil9szt7VidfQFQfehlbbz0FVFQxXih6PwHcPw4wPwH7NgNRVF0f*J0bVilxbzh2PwHcPw4wPwH7NgNRVF0PByQ9pzdRVJ0PCFh7VWhfPWd4PwHcPw4wPwH7NgNRVFQxXihRViQxPzQ6PwHcPw4wPwH7NgNRVFd7bFk94Fh3jyIAewGAe6eAew4fifN9*zlxEFl9uhl9QFdZPJN9Hz0NCWIAewGAe6eAew4fifN9By0N4Fh7VJ0fDJ1feFf9szl6PwHcPw4wPwH7NgNRVJ0fDJ1feFf9Hzlk*WQfBWlPXzP9GW1RH7Tce7T7L7TceRfbAhtRPq1RkWQfVil9CW17PWtZpzlEVWQJjieAewGAe6eAew4fifN9jFhbjJh7PhlFpz1RPWP9bzQPBztRezt3pieAewGAe6eAew4fifN9jFhbjJh7PhlkpWd7XWP9Hz0NCWN9jzk9PF0JP7Tce7T7L7TceRfbAhtZSRjcPwHcPw4wPwH7vSN7VW0NeigxsFgxVWlbbF0fehlZXzh3pz0APwHcPw4wPwH75RfZVFgxPzgfuJN9pzQRPqN9kygEj7Tce7T7L7TceTjfThlFGzk9eFgE4Fh7VzgP*zgN*7Tce7T7L7TceTjfThtZjigE4ih74hlRPWQPlihRpJQfB7Tce7T7L7TceTjfThtRPq1RkWQfVFQxXih6PwHcPw4wPwH75RfZVJ0fDJ1feFf9Qz09bJN9sygEPihcPwHcPw4wPwH75RfZVJ0fDJ1feFf9oigxQhlFszlNj7Tce7T7L7TceTjfThtRPq1RkWQfVy0NsFP9Qz09bJN9sygEPihcPwHcPw4wPwH75RfZVJQfeJ0fDhlNeWQNEhl9GyQfHJIAewGAe6eAewPJN64Jwhl7sFgE4hlFkzQZVFhbjFgE4Fg6PwHcPw4wPwH7hRA71TN9HzlxXWP9GJgFQFh7VFQxXih6PwHcPw4wPwH7hRA71TN9Hzlk*WQfBWlf4htRPq1RkWQfVWBZjieAewGAe6eAewPJN64JwhlZXzh3eFhZBFgRVJ0fDJ1feFf9BwtRHhtZeFlcPwHcPw4wPwH7hRA71TN94Fg7kFk9eFgE4Fh7PWP9pzQFX7Tce7T7L7TcefjfIRjxVF0fGJgJVWlbbF0feWeAewGAe6eAewPJN64JwhlRPW1RohtRPq1RkWQAPwHcPw4wPwH7hRA71TN94WQNthl7kFQFPWdwPwHcPw4wPwH7hRA71TN9sztZPhlZXzdRPq16PwHcPw4wPwH7hRA71TN9CJgxjyf94WQNt7Tce7T7L7TcefjfIRjxVW09sqgJXzP9CzlRP7Tce7Tf<7T7L7TceJtfl7Tce7TZ37TceRl9XFlxP7Tc*SgEHvGAewIb7zdRPzI4PwHcPw4wPwH7tJhcPwHcPwj<PwH73T4JwRSAewIb7zdRPzIAe6eAew<PuJ0fsKNcp7Tc*fAb<7Tc*Rt7bW0bpitwPwH2ow1a*wL2*ZLieZG4PwH3<yh7Pit6BRL<x7Tc*JdZVZf8*7Tc*W1ZVZf8*7T7L7Tc*RLZ<wT<p7Tce7TJ<7T7L7TcezSAewGAB6SAt6GAewQZXzh3bJ<kXF0APwHcPwj<PwH7LAkwx6l9CW0Nj7Tce7TJ<7T7L7TcezGAewGAB6SAt6GAewdFPzQRXWPZkiGAewGAB6SAewGAewGAe6eAewd3ezlRkitRTJgcPwHcPwj<PwHcewL2BwL<*ZeAewGAe6eAewdFPzQRXWGAewGAB6SAew4JXzlJsFSAew<PuieDPwHcPw4wPwH7CihbAztfHyN3XygEjWeAewGAB6T2Pw4wPwH7*F0FgygftFh7NzQNGz0f47Tce7TZ3J17kFSAe6eAewQbbWQRtih7P6l9uitfeWQfuit4PwHcPwj<ewIAe6eAewQZXzlCpFAfuig7sFg6PwHcPwjNjWdfP7T7L7Tceih3*6l94FAEbzgAPwHcPwj<PwH7Zztppz0xb7Tce7T7L7Tceih3*TQNCFSAewGAB6SAew4EPJ1ZHih3P7Tce7T7L7Tceih3*fQfeWlPXzGAewGAB6SAewHAuwIAewIbhygE4ztJB7Tc*TP6PwH2xwID*7TZI7Tc*flPuZH6PwjcPwH3DZH6p7Tc*6h3*z0fhFg7vyh6Pw4ikwBWuwBiPwH2oSjbATA*Pw4wPwH3sygCP7Tc*RlfHyl8p7Tc*6lbezlkP7T70wTwBvH2uwID*7Tc*AlNQih7p7T70ZTwtvHwl7Tc*RgRd7T70wTwBvH2uwID*7Tce7T7L7TceW0xbJ0FXWQjPwHcPwj<PwH7hygDBwGAewGAe6eAewd3ezlRkit6PwHcPwj<PwH71FgZrzeAewGAe6eAewdfBFh73FlfuJIAewGAB6SAew4kXqQPsz0<Pw4ikvH2PwH2oflPuF09tWeAew<EA7Tc*wT2uwIAB6GAewNJpzHij7TZI7Tc*qLijKSAew<N*W0xPflfGSlPj7T70ZTwtvHwl7Tc*K<Ccf<kw7T7L7Tc*z0PrFSAew<JPilCXKSAew<ZoWQ9CFSAeRH<BweD*vH2uwIAewNZbFQNeySAeRHABZeDBZGAew<f4FeAeRH<BweD*vH2uwIAewGAe6eAewQxbzQJkigJP7Tce7TZ37TceqQaC6jDPwHcPw4wPwH7Xz4xpzQAPwHcPwjNjWdfP7T7L7TceJlfGF17pJQfe7Tce7TZ3FQNsWlAPw4wPwH7UihFbRgEbiQxPFIAewGAB6gFbz1ZP7T7L7TceF0f*WQfHihRPFN7kz4N46hfHJ0PXz4fuFQ9eilfBSjNuzlEEzgPjqSAewGAB6gFbz1ZP7T7L7TceF0flygZPTgfCzt7E7Tce7TZ3OIAe6eAewQfuJgkPWQNjyg9uTt74FhcPwHcPwj<PZAcPwH7lFgE4zt7TJgcPwHcPw4wPwH7*WQ94JgZjAtfG7Tce7T7L7TceJQfuF09e7Tce7T7L7TcezgNDf09kilb6zlPuJ1wPwHcPw4wPwH7BilbPF1fsygEd7Tce7T7L7TceJhZPW4NHJ0PlihRpzlDPwHcPw4wPwH74zjEXJNReigZr7Tce7T7L7TceFlfXz09HihRpzlDPwHcPw4wPwH7HzlEuFgZjyg9u7Tce7T7L7TceW0xkFlPuWeAewGAe6eAewQkpzgfAqh3PWeAewGAe6eAewd34FPFpFhJPW4fuig7sFg6PwHcPw4wPwH7tFg7ryhRAFgk*zt7bWdPTJ09eigJP7Tce7T7L7TceJlfGylPjA0feWlPBJ0fuJNZjzt7bFlAPwHcPw4wPwH7tygE4ztJLzlEjWQ9sWj9lFh7sih4PwHcPw4wPwH7oih74JlNeFAZXzQZkWd7PzQZE7Tce7T7L7Tceil9XylPPRgEbiQxPFIAewGAe6eAewQN*W<ZXF0fOigkP7Tce7T7L7Tceih3*TQNCFSAewGAe6eAewQN*WNFPWdZpzlDPwHcPw4wPwH7*z0NjFQ9ezSAewGAe6eAewd3ezlRkit6PwHcPw4wPwH7kWlfe6gJPzd6PwHcPw4wPwH7sigEdJgNdFSAewGAe6eAewQxbzQJkigJPWeAewGAe6eAewQ9uT0PuFSAewGAe6eAewdJPiQReyhFPWGAewGAe6eAewQJPJ<Jbzgf*igRB7Tce7T7L7TceyQNliAfuig7sFg6PwHcPw4wPwH7BFgE46Qfbil9u7Tce7T7L7TceJQPGWQNjFSAewGAe6eAewQRPW17PilNjFgRSJgE3F<NkitRpzlENzQFXWQZPWjC3zQ9uqgkpJ14PwHcPw4wPwH7*WQ9jFgZjFgR3JgRpFgEHFSAewGAe6eAewQ7sJgfjzl9jyIAewGAe6eAewdZjzt7bFlfIJgZrFhRB7Tce7T7L7TceilxpW07Xih747Tce7T7L7Tceit7PF0fuJ0Pbz1wPwHcPw4wPwH7rFhPGzlNeFIAewGAe6eAewQkbzQNdFg6PwHcPw4wPwH7CFgRpiARPJQPHFhwPwHcPw4wPwH7BJ09eigJP7Tce7T7L7TceWlfeJQPHFfJXWQCPWGAewGAe6eAewdFpWdRkigxvFhPGzlNeFIAewGAe6eAewdJbylfwzlZr7Tce7T7L7TceF0flygZPTgfCzt7E7Tce7T7L7TceJhZPW4NdFgEjR0NjiSAewGAe6eAewQxXFlPu7Tce7T7L7TceygEr7Tce7T7L7Tcezgf4ygNLih3biQPsyhRpFhwPwHcPw4wPwH74FhFpilf6ztZjJh7P7Tce7T7L7Tcey0P47Tce7T7L7Tcez09HytwPwHcPw4wPwH7dW1APwHcPw4wPwH7CFgRpifZPWtZpzlDPwHcPw4wPwH7*Fh7CyhZByg9uWeAewGAe6eAewd3eFhZPzdRbJ0PXzGAewGAe6eAewdfBiGAewGAe6eAewdbe7Tce7T7L7TceWlfeygNs7Tce7T7L7TceigR3JgZjyg9u6l9CW09uFgEjWeAewGAe6eAewd7kz4N46hfHJ0PXzGAewGAe6eAewQZbz4xXigR3F<NkitRpzlE0FgEHFgR0WQNCFSAewGAe6eAewQZbzPZoih7P7Tce7T7L7TceWlbbWQAPwHcPw4wPwH7Hz0fbW4N*W<7bF0JP7Tce7T7L7TceFlfj6QNjJ0feqSAewGAe6eAewQJPJNfBFh7ZFgRpiSAewGAe6eAewd7PWhfPWtRZSAR76gZHFhZB7Tce7T7L7TceWQfxJgfBJ<kPF0PbSlfEAtPBJ0fC6gZHFhZB7Tce7T7L7TceWlfj6h3*6QN4FlAPwHcPw4wPwH7tFg7ryhR1FhRfWlfeTgf4yg<PwHcPw4wPwH7Hz0fbW49eygJpz4pXygEPF<N4SgEjFh7PWtR1WQ9kW1wPwHcPw4wPwH7HWQfbJ0f3JgZjyg9uTQ9uilAPwHcPw4wPwH7UzlPu6gR7zdRPWQfBJ<Jeztf*7Tce7T7L7Tcez0fbJQf3F<PuJ0feFhZjRt7XJh2PwHcPw4wPwH7kW0RbJ0f3F<PuJ0feFhZjRt7XJh3B7Tce7T7L7TceF0f*WQfHihRPFN7PW0xbilf7zPfSTGAewGAe6eAewQRPW17PilNjFgRfA4EAzkfSTIAewGAe6eAewQJPJ<PuWtRbz0xPFN7Pz0NjFgR3W13B7Tce7T7L7TceFlfjSgEjFh7PWtR1WQ9kW<N46hfHJ0PXz4RbJ0<PwHcPw4wPwH7eFgJpWtRPWP3eztRXil9sS0NuF0xPWGAewGAe6eAewdfuWQfdyhZjFh76WQ9jzlZXz<bbzQRsFhcPwHcPZA6PZj6Pw4wPwH7*7Tce7TZ37TfI7TJI7TcezQNCFSAewGAB6SAewP3<RGAewNFpFhJPWGAewGAtRIAe6eAt6GAewQEbzgAPwHcPwj<PwH7Ly17XzgAPwH36R<iPwH3gygftFhcPwHcPZj6Pw4wPZjcPwH7uigkP7Tce7TZ37Tce6lbezlkpJgjPwH36R<iPwH3gygftFhcPwHcPZj6Pw4wPZjcPwH7uigkP7Tce7TZ37TceTgPHWQ9BzlFj7Tc*RgRdFSAewN3<RGAewNFpFhJPWGAewGAtRIAe6eAt6GAewQEbzgAPwHcPwj<PwH7hFg7vyh6PwH3GJgPsJIkpzGAewN3<RGAewGAtRIAkRIAe6eAewdWPwHcPwj<PZjcPwH74FhFpilf6yhbPzN7bJ0PX7Tce7TZ3wSDeZSAe6eAewdZHWQfPzPRXWIAewGAB6T2Pw4wPwH7Bit7PFgEwFgFj7Tce7TZ3wIAtRIAe6eAewdwPwHcPwj<PZjcPwH7bJQNpz<bPygJoJIAewGAB6TaxZGAe6eAewQNligPsflP4J0aPwHcPwj<xZTwl7T7L7Tceil9szt7<Fh3jyIAewGAB6Tcj7T7L7Tcey0fpFlbj7Tce7TZ3OLij7T7L7TceJlP4J0aPwHcPwj<xZTwl7T7L7TceW0PDFgx<Fh3jyIAewGAB6Tcj7TJ<7T7L7TceWlwPwHcPwj<PZjcPZj6Pw4wPwH7BWeAewGAB6SAt6GAewQZXzlCpFSAewGAB6hReJgAPw4wPwH7szlZbzNZjzt7bFlAPwHcPwjNjWdfP7T7L7TceWlfBWlPXzPZjzt7bFlAPwHcPwjNjWdfP7T7L7TceFlxXiQNsAtRXWQNdFSAewGAB6gFbz1ZP7T7L7TceygE4FhbPF<RI7Tce7TZ3J17kFSAtRIAe6eAewdRm7Tce7TZ3vT6DwIAe6eAewQxpzIAewGAB6SAewGAewGAe6eAewdJpzIAewGAB6SAewGAewGAe6eAewdJp7Tce7TZ37TJI7TceztWPwHcPwj<xZTwl7T7L7TcezlaPwHcPwj<DwTiPw4wPwH7pJeAewGAB6T<jOLcPw4wPwH7pyIAewGAB6TWjwIAe6eAewQfjzGAewGAB6SAewGAk6Q9GyQfHJIAew<fDJ0fezQNs7Tf<7Tce7TJ<7TJ</',
            "ead25d97-444f-4eb6-82c3-28e2c68b334b": 'a=7TJI7TceW0Pu7Tce7TZ37Tce7Tce7T7L7TcezlP47Tce7TZ37Tce7Tce7T7L7TceiQPmSg6PwHcPwj<PwH7T6ekTgf6PwHcPw4wPwH7QieAewGAB6SAewHF1fB7ywjbfw4jBRkbKTkJZRN7yS4WkTjNTTf7<ffwBTAb5A<9iZ4N7gLFOZkceA<ajTfPgTjb3w49vw4kTwjZ<A<fhS<CAR<WlSBFRZPRSZ<PiZN3ggAkOASAewGAe6eAewQkXF0APwHcPwj<PwH7BJ17pit6PwHcPw4wPwH7*7Tce7TZ37TceWeAewGAe6eAewQF*7Tce7TZ37TceFQixwB6*O06DFHf4ZQ7bwBfbwQwEZL<EFTbGwQ<eZLcPwHcPw4wPwH7HJ1P*FSAewGAB6T<Pw4wPwH7l7Tce7TZ37TceZIDevHauwIAewGAe6eAewd3l7Tce7TZ37TcewL7VzhRVZAxiSk8lwLikwB4twLADOSAewGAe6eAewQiPwHcPwj<PwHcB7Tce7T7L7TceWeAewGAB6SAewQw*ZlctwBwxFT6tFgRGwB7PiQfGwQFHZHJQwHFHwTWt7Tce7T7L7TcezeAewGAB6SAewQk*ih4uzSEUFIEHzljPw4FCW0NEvQRHFHNPilijiTADigADZLZ4wlA*vQbjzg*PwHcPw4wPwH7xWeAewGAB6SAewQN*W<P47TZ<zf9ww1NNOgRGweAeZd3bqAP47TZ<O0wlwL2*Fg<BwHbbZLiEF0NHwL6twTZQiTRGwBajwBWPwHFXWQRPW4P47TZ<wB2EOLwEwT<lOTaD7Tce7T7L7TceydZAyeAewGAB6SAewQp4FL2BZ4JhwPoBSNAeTTZ1g<p5fjk<APpKRBf56fZZA4RfABZZS<96Tkal6APiZ4DtAH76SLRZgfF5S<<eTjseTfwB6jR6RfJcSkR<RBFvZP<lfNcjSfajANFFTAER6AN36Akg6k70fk3f6AN36AN3R<NNSfJZ6k3ZAN3NRPfi7Tce7T7L7TceWg4PwHcPwj<PwHcPwHcPZj6/&d=7TJI7TceJ1wPwHcPwj<PZjcPwH74FhFpilfAygkP7Tce7TZ3wTWBOTa*wHwDOTW*weAe6eAewQRPJQPHFAfuFNRpzgAPwHcPwj<xZBwEOL2ewBaEZB<l7TJ<7T7L7Tceil<PwHcPwj<PZjcPwH7jF<bbWlaPwHcPwj<PwHc*FQctFH<xOgAewg7GZQcxZlceiH34wBwBiTAlwTJGFGAewGAe6eAewQZXzdRPq1ROigkP7Tce7TZ37TceJlfGFl*Pw4ZPq13PWQPCFgEjig*CJlfGFl*PwHcPw4wPwH7tFg7dz1FPWdZpzlDPwHcPwj<PwH7hFg71TIAewL<uwIAewIb5W0fuRj*PwH3NAeAewLcuwIAew<ZoWQ9CyhfCKSAewGAe6eAewdZoigRpzQJwfGAewGAB6SAewPJPi4Jw7Tc*RjxTTIAew<fT7Tc*wSD*7Tc*K<9*FgE1TIAew<fT7Tc*RjxTTIAew<fT7Tc*wSD*7Tc*6lbezlkpJgjp7Tce7T7L7TceJQfuF09e7Tce7TZ37TceflfGSlPj7Tce7T7L7TceWQfuF0feFhcPwHcPwj<PwH7hFg7vyh6PwH3hFg71TIAewGAe6eAewQfDJ0fuWlPXzdwPwHcPwj<PZAcPwH73T4JwRf9pzdZjigEHFgRVih7eihPB7Tce7T7L7TceRfbAhl7sFgE4hlkpzQkbqIAewGAe6eAew4fifN9Hz0P*hlZXzdRezl*PwHcPw4wPwH7NgNRVil9szt7VidfQFQfehlbbz0FVFQxXih6PwHcPw4wPwH7NgNRVF0f*J0bVilxbzh2PwHcPw4wPwH7NgNRVF0PByQ9pzdRVJ0PCFh7VWhfPWd4PwHcPw4wPwH7NgNRVFQxXihRViQxPzQ6PwHcPw4wPwH7NgNRVFd7bFk94Fh3jyIAewGAe6eAew4fifN9*zlxEFl9uhl9QFdZPJN9Hz0NCWIAewGAe6eAew4fifN9By0N4Fh7VJ0fDJ1feFf9szl6PwHcPw4wPwH7NgNRVJ0fDJ1feFf9Hzlk*WQfBWlPXzP9GW1RH7Tce7T7L7TceRfbAhtRPq1RkWQfVil9CW17PWtZpzlEVWQJjieAewGAe6eAew4fifN9jFhbjJh7PhlFpz1RPWP9bzQPBztRezt3pieAewGAe6eAew4fifN9jFhbjJh7PhlkpWd7XWP9Hz0NCWN9jzk9PF0JP7Tce7T7L7TceRfbAhtZSRjcPwHcPw4wPwH7vSN7VW0NeigxsFgxVWlbbF0fehlZXzh3pz0APwHcPw4wPwH75RfZVFgxPzgfuJN9pzQRPqN9kygEj7Tce7T7L7TceTjfThlFGzk9eFgE4Fh7VzgP*zgN*7Tce7T7L7TceTjfThtZjigE4ih74hlRPWQPlihRpJQfB7Tce7T7L7TceTjfThtRPq1RkWQfVFQxXih6PwHcPw4wPwH75RfZVJ0fDJ1feFf9Qz09bJN9sygEPihcPwHcPw4wPwH75RfZVJ0fDJ1feFf9oigxQhlFszlNj7Tce7T7L7TceTjfThtRPq1RkWQfVy0NsFP9Qz09bJN9sygEPihcPwHcPw4wPwH75RfZVJQfeJ0fDhlNeWQNEhl9GyQfHJIAewGAe6eAewPJN64Jwhl7sFgE4hlFkzQZVFhbjFgE4Fg6PwHcPw4wPwH7hRA71TN9HzlxXWP9GJgFQFh7VFQxXih6PwHcPw4wPwH7hRA71TN9Hzlk*WQfBWlf4htRPq1RkWQfVWBZjieAewGAe6eAewPJN64JwhlZXzh3eFhZBFgRVJ0fDJ1feFf9BwtRHhtZeFlcPwHcPw4wPwH7hRA71TN94Fg7kFk9eFgE4Fh7PWP9pzQFX7Tce7T7L7TcefjfIRjxVF0fGJgJVWlbbF0feWeAewGAe6eAewPJN64JwhlRPW1RohtRPq1RkWQAPwHcPw4wPwH7hRA71TN94WQNthl7kFQFPWdwPwHcPw4wPwH7hRA71TN9sztZPhlZXzdRPq16PwHcPw4wPwH7hRA71TN9CJgxjyf94WQNt7Tce7T7L7TcefjfIRjxVW09sqgJXzP9CzlRP7Tce7Tf<7T7L7TceJtfl7Tce7TZ37TceRl9XFlxP7Tc*SgEHvGAewIb7zdRPzI4PwHcPw4wPwH7tJhcPwHcPwj<PwH73T4JwRSAewIb7zdRPzIAe6eAew<PuJ0fsKNcp7Tc*fAb<7Tc*Rt7bW0bpitwPwH2ow1a*wL2*ZLieZG4PwH3<yh7Pit6BRL<x7Tc*JdZVZf8*7Tc*W1ZVZf8*7T7L7Tc*RLZ<wT<p7Tce7TJ<7T7L7TcezSAewGAB6SAt6GAewQZXzh3bJ<kXF0APwHcPwj<PwH7LAkwx6l9CW0Nj7Tce7TJ<7T7L7TcezGAewGAB6SAt6GAewdFPzQRXWPZkiGAewGAB6SAewGAewGAe6eAewd3ezlRkitRTJgcPwHcPwj<PwHcewL2BwL<*ZeAewGAe6eAewdFPzQRXWGAewGAB6SAew4JXzlJsFSAew<PuieDPwHcPw4wPwH7CihbAztfHyN3XygEjWeAewGAB6T2Pw4wPwH7*F0FgygftFh7NzQNGz0f47Tce7TZ3J17kFSAe6eAewQbbWQRtih7P6l9uitfeWQfuit4PwHcPwj<ewIAe6eAewQZXzlCpFAfuig7sFg6PwHcPwjNjWdfP7T7L7Tceih3*6l94FAEbzgAPwHcPwj<PwH7Zztppz0xb7Tce7T7L7Tceih3*TQNCFSAewGAB6SAew4EPJ1ZHih3P7Tce7T7L7Tceih3*fQfeWlPXzGAewGAB6SAewHAuwIAewIbhygE4ztJB7Tc*TP6PwH2xwID*7TZI7Tc*flPuZH6PwjcPwH3DZH6p7Tc*6h3*z0fhFg7vyh6Pw4ikwBWuwBiPwH2oSjbATA*Pw4wPwH3sygCP7Tc*RlfHyl8p7Tc*6lbezlkP7T70wTwevH2uwID*7Tc*AlNQih7p7T70ZTwtvHwl7Tce7T7L7TceW0xbJ0FXWQjPwHcPwj<PwH7hygDBwGAewGAe6eAewd3ezlRkit6PwHcPwj<PwH71FgZrzeAewGAe6eAewdfBFh73FlfuJIAewGAB6SAew4kXqQPsz0<Pw4ikvH2PwH2oflPuF09tWeAew<EA7Tc*wT2uwIAB6GAewNJpzHij7TZI7Tc*qLijKSAew<N*W0xPflfGSlPj7T70ZTwtvHwl7Tc*K<Ccf<kw7T7L7Tc*z0PrFSAew<JPilCXKSAew<ZoWQ9CFSAeRH<BwGD*vH2uwIAewNZbFQNeySAeRHABZeDBZGAewGAe6eAewQxbzQJkigJP7Tce7TZ37TceqQaC6jDPwHcPw4wPwH7Xz4xpzQAPwHcPwjNjWdfP7T7L7TceJlfGF17pJQfe7Tce7TZ3FQNsWlAPw4wPwH7UihFbRgEbiQxPFIAewGAB6gFbz1ZP7T7L7TceF0f*WQfHihRPFN7kz4N46hfHJ0PXz4fuFQ9eilfBSjNuzlEEzgPjqSAewGAB6gFbz1ZP7T7L7TceF0flygZPTgfCzt7E7Tce7TZ3OIAe6eAewQfuJgkPWQNjyg9uTt74FhcPwHcPwj<PZAcPwH7lFgE4zt7TJgcPwHcPw4wPwH7*WQ94JgZjAtfG7Tce7T7L7TceJQfuF09e7Tce7T7L7TcezgNDf09kilb6zlPuJ1wPwHcPw4wPwH7BilbPF1fsygEd7Tce7T7L7TceJhZPW4NHJ0PlihRpzlDPwHcPw4wPwH74zjEXJNReigZr7Tce7T7L7TceFlfXz09HihRpzlDPwHcPw4wPwH7HzlEuFgZjyg9u7Tce7T7L7TceW0xkFlPuWeAewGAe6eAewQkpzgfAqh3PWeAewGAe6eAewd34FPFpFhJPW4fuig7sFg6PwHcPw4wPwH7tFg7ryhRAFgk*zt7bWdPTJ09eigJP7Tce7T7L7TceJlfGylPjA0feWlPBJ0fuJNZjzt7bFlAPwHcPw4wPwH7tygE4ztJLzlEjWQ9sWj9lFh7sih4PwHcPw4wPwH7oih74JlNeFAZXzQZkWd7PzQZE7Tce7T7L7Tceil9XylPPRgEbiQxPFIAewGAe6eAewQN*W<ZXF0fOigkP7Tce7T7L7Tceih3*TQNCFSAewGAe6eAewQN*WNFPWdZpzlDPwHcPw4wPwH7*z0NjFQ9ezSAewGAe6eAewd3ezlRkit6PwHcPw4wPwH7kWlfe6gJPzd6PwHcPw4wPwH7sigEdJgNdFSAewGAe6eAewQxbzQJkigJPWeAewGAe6eAewQ9uT0PuFSAewGAe6eAewdJPiQReyhFPWGAewGAe6eAewQJPJ<Jbzgf*igRB7Tce7T7L7TceyQNliAfuig7sFg6PwHcPw4wPwH7BFgE46Qfbil9u7Tce7T7L7TceJQPGWQNjFSAewGAe6eAewQRPW17PilNjFgRSJgE3F<NkitRpzlENzQFXWQZPWjC3zQ9uqgkpJ14PwHcPw4wPwH7*WQ9jFgZjFgR3JgRpFgEHFSAewGAe6eAewQ7sJgfjzl9jyIAewGAe6eAewdZjzt7bFlfIJgZrFhRB7Tce7T7L7TceilxpW07Xih747Tce7T7L7Tceit7PF0fuJ0Pbz1wPwHcPw4wPwH7rFhPGzlNeFIAewGAe6eAewQkbzQNdFg6PwHcPw4wPwH7CFgRpiARPJQPHFhwPwHcPw4wPwH7BJ09eigJP7Tce7T7L7TceWlfeJQPHFfJXWQCPWGAewGAe6eAewdFpWdRkigxvFhPGzlNeFIAewGAe6eAewdJbylfwzlZr7Tce7T7L7TceF0flygZPTgfCzt7E7Tce7T7L7TceJhZPW4NdFgEjR0NjiSAewGAe6eAewQxXFlPu7Tce7T7L7TceygEr7Tce7T7L7Tcezgf4ygNLih3biQPsyhRpFhwPwHcPw4wPwH74FhFpilf6ztZjJh7P7Tce7T7L7Tcey0P47Tce7T7L7Tcez09HytwPwHcPw4wPwH7dW1APwHcPw4wPwH7CFgRpifZPWtZpzlDPwHcPw4wPwH7*Fh7CyhZByg9uWeAewGAe6eAewd3eFhZPzdRbJ0PXzGAewGAe6eAewdfBiGAewGAe6eAewdbe7Tce7T7L7TceWlfeygNs7Tce7T7L7TceigR3JgZjyg9u6l9CW09uFgEjWeAewGAe6eAewd7kz4N46hfHJ0PXzGAewGAe6eAewQZbz4xXigR3F<NkitRpzlE0FgEHFgR0WQNCFSAewGAe6eAewQZbzPZoih7P7Tce7T7L7TceWlbbWQAPwHcPw4wPwH7Hz0fbW4N*W<7bF0JP7Tce7T7L7TceFlfj6QNjJ0feqSAewGAe6eAewQJPJNfBFh7ZFgRpiSAewGAe6eAewd7PWhfPWtRZSAR76gZHFhZB7Tce7T7L7TceWQfxJgfBJ<kPF0PbSlfEAtPBJ0fC6gZHFhZB7Tce7T7L7TceWlfj6h3*6QN4FlAPwHcPw4wPwH7tFg7ryhR1FhRfWlfeTgf4yg<PwHcPw4wPwH7Hz0fbW49eygJpz4pXygEPF<N4SgEjFh7PWtR1WQ9kW1wPwHcPw4wPwH7HWQfbJ0f3JgZjyg9uTQ9uilAPwHcPw4wPwH7UzlPu6gR7zdRPWQfBJ<Jeztf*7Tce7T7L7Tcez0fbJQf3F<PuJ0feFhZjRt7XJh2PwHcPw4wPwH7kW0RbJ0f3F<PuJ0feFhZjRt7XJh3B7Tce7T7L7TceF0f*WQfHihRPFN7PW0xbilf7zPfSTGAewGAe6eAewQRPW17PilNjFgRfA4EAzkfSTIAewGAe6eAewQJPJ<PuWtRbz0xPFN7Pz0NjFgR3W13B7Tce7T7L7TceFlfjSgEjFh7PWtR1WQ9kW<N46hfHJ0PXz4RbJ0<PwHcPw4wPwH7eFgJpWtRPWP3eztRXil9sS0NuF0xPWGAewGAe6eAewdfuWQfdyhZjFh76WQ9jzlZXz<bbzQRsFhcPwHcPZA6PZj6Pw4wPwH7*7Tce7TZ37TfI7TJI7TcezQNCFSAewGAB6SAewP3<RGAewNFpFhJPWGAewGAtRIAe6eAt6GAewQEbzgAPwHcPwj<PwH7Ly17XzgAPwH36R<iPwH3gygftFhcPwHcPZj6Pw4wPZjcPwH7uigkP7Tce7TZ37Tce6lbezlkpJgjPwH36R<iPwH3gygftFhcPwHcPZj6Pw4wPZjcPwH7uigkP7Tce7TZ37TceTgPHWQ9BzlFj7Tc*RgRdFSAewN3<RGAewNFpFhJPWGAewGAtRIAe6eAt6GAewQEbzgAPwHcPwj<PwH7hFg7vyh6PwH3GJgPsJIkpzGAewN3<RGAewGAtRIAkRIAe6eAewdWPwHcPwj<PZjcPwH74FhFpilf6yhbPzN7bJ0PX7Tce7TZ3wSDeZSAe6eAewdZHWQfPzPRXWIAewGAB6T2Pw4wPwH7Bit7PFgEwFgFj7Tce7TZ3wIAtRIAe6eAewdwPwHcPwj<PZjcPwH7bJQNpz<bPygJoJIAewGAB6TaxZGAe6eAewQNligPsflP4J0aPwHcPwj<xZTwl7T7L7Tceil9szt7<Fh3jyIAewGAB6Tcj7T7L7Tcey0fpFlbj7Tce7TZ3OLij7T7L7TceJlP4J0aPwHcPwj<xZTwl7T7L7TceW0PDFgx<Fh3jyIAewGAB6Tcj7TJ<7T7L7TceWlwPwHcPwj<PZjcPwH73itRpJQfIzt74FhcPwHcPwj<PwH7eFlcowIAe6eAewL2Pw4wPwH2*KSAewGAe6eAew4NHJ0PlFAZbW1RpzlDPwHcPwj<PwH7eFlcowIAe6eAewL2Pw4wPwH2*KSAewGAe6eAew4N*WNJXWQCBW0NHFSAewGAB6SAewd7diGaeZTAPw4wPwH2eZTAPw4wPwH2eZTAp7Tce7T7L7Tce6QNHylJeztfuFIAewGAB6SAewd7diGaeZTAPw4wPwH2eZTAPw4wPwH2eZTAp7Tce7T7L7Tce6dfjJ09uRQNHFSAewGAB6SAewd7diGaeZL2Pw4wPwH2eZL2Pw4wPwH2eZL2p7Tce7T7L7Tce6dfjJ09uS0Pdy0xpFlbj7Tce7TZ37TceWQJGKLcjwIAe6eAewLcjwIAe6eAewLcjwI4PwHcPw4wPwH7IJhRjzlETy0N4ztWPwHcPwj<PwH7eFlcowH6*7T7L7Tc*wH6*7T7L7Tc*wH6*KSAewGAe6eAew47kJ1RXzPRPq16PwHcPwj<PwH7eFlcowIAe6eAewL2Pw4wPwH2*KSAewGAe6eAew4ZbW1RpzlEAFhbj7Tce7TZ37TceWQJGKL2Pw4wPwH2*7T7L7Tc*wI4PwHcPw4wPwH71WQNEf0fDJIAewGAB6SAewd7diGaxwL4Pw4wPwH2xwL4Pw4wPwH2xwL4p7Tce7T7L7TceS0Pdy0xpFlbj7Tce7TZ37TceWQJGKL2Pw4wPwH2xwH2Pw4wPwH2ewTAp7Tce7T7L7TceS0Pdy0xpFlbjf0fDJIAewGAB6SAewd7diGaeZTAPw4wPwH2eZTAPw4wPwH2eZTAp7Tce7T7L7TceSgEbitRpJQfIzt74FhcPwHcPwj<PwH7eFlcowIAe6eAewL2Pw4wPwH2*KSAewGAe6eAew4PuigZjyhFP6lN*J0PXzGAewGAB6SAewd7diGaeZTAPw4wPwH2eZTAPw4wPwH2eZTAp7Tce7T7L7TceSgEbitRpJQfLih3jyg9uf0fDJIAewGAB6SAewd7diGaxwHaPw4wPwH2xwHaPw4wPwH2xwHap7Tce7T7L7TceSgEQzj7bilCdWQ9kzQ6PwHcPwj<PwH7eFlcowHAk7T7L7Tc*wHAk7T7L7Tc*wHAkKSAewGAe6eAew4PuFQ9AFhbj7Tce7TZ37TceWQJGKL2Pw4wPwH2*7T7L7Tc*wI4PwHcPw4wPwH7ZFgEk7Tce7TZ37TceWQJGKLckZSAe6eAewLckZSAe6eAewLckZS4PwHcPw4wPwH7ZFgEkf0fDJIAewGAB6SAewd7diGa*7T7L7Tc*wIAe6eAewL2p7Tce7T7L7TceAlZezlxsiQNe7Tce7TZ37TceWQJGKLckZSAe6eAewLckZSAe6eAewLckZS4PwHcPw4wPwH7Ay17PFAR<ih7rAlbbF09t7Tce7TZ37TceWQJGKL2Pw4wPwH2*7T7L7Tc*wI4PwHcPw4wPwH7Ay17PFAR0igZP7Tce7TZ37TceWQJGKLcjwIAe6eAewLcjwIAe6eAewLcjwI4PwHcPw4wPwH7Ay17PFARcygJoz0Pdy16PwHcPwj<PwH7eFlcowIAe6eAewL2Pw4wPwH2*KSAewGAe6eAewPRoWQfPR<xpFlbjAlbbF09t7Tce7TZ37TceWQJGKL2Pw4wPwH2*7T7L7Tc*wI4PwHcPw4wPwH7Ay17PFARTy0N4ztWPwHcPwj<PwH7eFlcowIAe6eAewL2Pw4wPwH2*KSAewGAe6eAewPJpzQRXJeAewGAB6SAewd7diGaeZTAPw4wPwH2eZTAPw4wPwH2eZTAp7Tce7T7L7TceflPuF09tRd7bzgAPwHcPwj<PwH7eFlcowIAe6eAewL2Pw4wPwH2*KSAewGAe6eAewPJpzQRXJkRPq16PwHcPwj<PwH7eFlcowIAe6eAewL2Pw4wPwH2*KSAewGAtRIAe6eAewdZB7Tce7TZ37TJI7Tceil9XylPP7Tce7TZ3J17kFSAe6eAewQxXilNsAtRXWQNdFSAewGAB6hReJgAPw4wPwH7BFhZByg9uAtRXWQNdFSAewGAB6hReJgAPw4wPwH7dz09GigxTJ09eigJP7Tce7TZ3FQNsWlAPw4wPwH7pzQRPq0f4R<cPwHcPwjNjWdfP7TJ<7T7L7TceJ1oPwHcPwj<CZLa*7T7L7Tcez0Ps7Tce7TZ37Tce7Tce7T7L7TceJlPs7Tce7TZ37Tce7Tce7T7L7TceJl4PwHcPwj<PZjcPwH7XJeAewGAB6T<kwBiPw4wPwH7XyIAewGAB6TaxZGAe6eAewQPt7Tce7TZ3wTABZGAe6eAewQPo7Tce7TZ3ZH4k7T7L7TceFhRu7Tce7TZ37Tce7TfIzl7UFgZj7Tc*RhbjFh7uig*PZA6PwHcPZj6PZj6/',
            "138402c5-ff04-46b3-a789-000190da5591": 'a=7TJI7TceW0Pu7Tce7TZ37Tce7Tce7T7L7TcezlP47Tce7TZ37Tce7Tce7T7L7TceiQPmSg6PwHcPwj<PwH7T6ekTgf6PwHcPw4wPwH7QieAewGAB6SAewPPSRNJRRPpiSP7wAAkfRA8kZkZ5S<jeAHJiffNKAjpRZAFf64JOZPb1RLZhAHZOZ4xKg<JcTTcBTj8tATAjwHF<ZfFITfZASA8jTPZ6fPRARPwkgHAkTkZy6SAewGAe6eAewQkXF0APwHcPwj<PwH7BJ17pit6PwHcPw4wPwH7*7Tce7TZ37TceWeAewGAe6eAewQF*7Tce7TZ37TcewTi*ilwEZ0RQiTWlFT6EZHAtZT<kZL6jwL7PiHFPOLAPwHcPw4wPwH7HJ1P*FSAewGAB6T<Pw4wPwH7l7Tce7TZ37TceZIDevHauwIAewGAe6eAewd3l7Tce7TZ37TcewL7VzhRVZAxiSk8lwLikwB4twLADOSAewGAe6eAewQiPwHcPwj<PwHcB7Tce7T7L7TceWeAewGAB6SAewH6*wQNHFT2tiT2kwH7bZQNGF0wxFQijFL4jwL2BOL347Tce7T7L7TcezeAewGAB6SAewQk*ih4uzSEUFIEHzljPw4FCW0NEvQRHFHNPilijiTADigADZLZ4wlA*vQbjzg*PwHcPw4wPwH7xWeAewGAB6SAewQN*W<P47TZ<zf9<whFCfh<lweAeZd3bqAP47TZ<wHwlOTPHFTbPF0wkZ0wxiQ7GOL7GOTb4wB7QZQ6lFT4PwHFXWQRPW4P47TZ<wB2EOLA*ZT2jZBij7TclJ<P47TZ<zh3bqSAewGAe6eAewQpBf0sPwHcPwj<PwH7UF06*wkPSRNJRRPpiSP7wAAkfRA8kZkZ5S<jeAHJiffNKAjpRZAFf64JOZPb1RLZhAHZOZ4xKg<JcTTcBTj8tATAjwHF<ZfFITfZASA8jTPZ6fPRARPwkgHAkTkZy6AN36ANZf4ZT6kijR<P36AN36AwjTAxhZHJ7SB6Bg4ZNgIAewGAe6eAewdNp7Tce7TZ37Tce7Tce7TJ</&d=7TJI7TceJ1wPwHcPwj<PZjcPwH74FhFpilfAygkP7Tce7TZ3wTWBOTa*ZHcDwT6jwGAe6eAewQRPJQPHFAfuFNRpzgAPwHcPwj<xZBwEOL2lwHaxZLie7TJ<7T7L7Tceil<PwHcPwj<PZjcPwH7jF<bbWlaPwHcPwj<PwHc*FQctFH<xOgAewg7GZQcxZlceiH34wBwBiTAlwTJGFGAewGAe6eAewQZXzdRPq1ROigkP7Tce7TZ37TceJlfGFl*Pw4ZPq13PWQPCFgEjig*CJlfGFl*PwHcPw4wPwH7tFg7dz1FPWdZpzlDPwHcPwj<PwH7hFg71TIAewL<uwIAewIb5W0fuRj*PwH3NAeAewLcuwIAew<ZoWQ9CyhfCKSAewGAe6eAewdZoigRpzQJwfGAewGAB6SAewPJPi4Jw7Tc*RjxTTIAew<fT7Tc*wSD*7Tc*K<9*FgE1TIAew<fT7Tc*RjxTTIAew<fT7Tc*wSD*7Tc*6lbezlkpJgjp7Tce7T7L7TceJQfuF09e7Tce7TZ37TceflfGSlPj7Tce7T7L7TceWQfuF0feFhcPwHcPwj<PwH7hFg7vyh6PwH3hFg71TIAewGAe6eAewQfDJ0fuWlPXzdwPwHcPwj<PZAcPwH73T4JwRf9pzdZjigEHFgRVih7eihPB7Tce7T7L7TceRfbAhl7sFgE4hlkpzQkbqIAewGAe6eAew4fifN9Hz0P*hlZXzdRezl*PwHcPw4wPwH7NgNRVil9szt7VidfQFQfehlbbz0FVFQxXih6PwHcPw4wPwH7NgNRVF0f*J0bVilxbzh2PwHcPw4wPwH7NgNRVF0PByQ9pzdRVJ0PCFh7VWhfPWd4PwHcPw4wPwH7NgNRVFQxXihRViQxPzQ6PwHcPw4wPwH7NgNRVFd7bFk94Fh3jyIAewGAe6eAew4fifN9*zlxEFl9uhl9QFdZPJN9Hz0NCWIAewGAe6eAew4fifN9By0N4Fh7VJ0fDJ1feFf9szl6PwHcPw4wPwH7NgNRVJ0fDJ1feFf9Hzlk*WQfBWlPXzP9GW1RH7Tce7T7L7TceRfbAhtRPq1RkWQfVil9CW17PWtZpzlEVWQJjieAewGAe6eAew4fifN9jFhbjJh7PhlFpz1RPWP9bzQPBztRezt3pieAewGAe6eAew4fifN9jFhbjJh7PhlkpWd7XWP9Hz0NCWN9jzk9PF0JP7Tce7T7L7TceRfbAhtZSRjcPwHcPw4wPwH7vSN7VW0NeigxsFgxVWlbbF0fehlZXzh3pz0APwHcPw4wPwH75RfZVFgxPzgfuJN9pzQRPqN9kygEj7Tce7T7L7TceTjfThlFGzk9eFgE4Fh7VzgP*zgN*7Tce7T7L7TceTjfThtZjigE4ih74hlRPWQPlihRpJQfB7Tce7T7L7TceTjfThtRPq1RkWQfVFQxXih6PwHcPw4wPwH75RfZVJ0fDJ1feFf9Qz09bJN9sygEPihcPwHcPw4wPwH75RfZVJ0fDJ1feFf9oigxQhlFszlNj7Tce7T7L7TceTjfThtRPq1RkWQfVy0NsFP9Qz09bJN9sygEPihcPwHcPw4wPwH75RfZVJQfeJ0fDhlNeWQNEhl9GyQfHJIAewGAe6eAewPJN64Jwhl7sFgE4hlFkzQZVFhbjFgE4Fg6PwHcPw4wPwH7hRA71TN9HzlxXWP9GJgFQFh7VFQxXih6PwHcPw4wPwH7hRA71TN9Hzlk*WQfBWlf4htRPq1RkWQfVWBZjieAewGAe6eAewPJN64JwhlZXzh3eFhZBFgRVJ0fDJ1feFf9BwtRHhtZeFlcPwHcPw4wPwH7hRA71TN94Fg7kFk9eFgE4Fh7PWP9pzQFX7Tce7T7L7TcefjfIRjxVF0fGJgJVWlbbF0feWeAewGAe6eAewPJN64JwhlRPW1RohtRPq1RkWQAPwHcPw4wPwH7hRA71TN94WQNthl7kFQFPWdwPwHcPw4wPwH7hRA71TN9sztZPhlZXzdRPq16PwHcPw4wPwH7hRA71TN9CJgxjyf94WQNt7Tce7T7L7TcefjfIRjxVW09sqgJXzP9CzlRP7Tce7Tf<7T7L7TceJtfl7Tce7TZ37TceRl9XFlxP7Tc*SgEHvGAewIb7zdRPzI4PwHcPw4wPwH7tJhcPwHcPwj<PwH73T4JwRSAewIb7zdRPzIAe6eAew<PuJ0fsKNcp7Tc*Sh7pWebSKSAewNbP7Tc*Rt7bW0bpitwPwH2ow1a*wL2*OA<jOS4PwH3<yh7Pit6BRL<x7Tc*JdZVZf8*7Tc*W1ZVZf8*7T7L7Tc*RLZ<wT<p7Tce7TJ<7T7L7TcezSAewGAB6SAt6GAewQZXzh3bJ<kXF0APwHcPwj<PwH7LAkwx6l9CW0Nj7Tce7TJ<7T7L7TcezGAewGAB6SAt6GAewdFPzQRXWPZkiGAewGAB6SAewGAewGAe6eAewd3ezlRkitRTJgcPwHcPwj<PwHcewL2BwL<*ZeAewGAe6eAewdFPzQRXWGAewGAB6SAew4JXzlJsFSAew<PuieDPwHcPw4wPwH7CihbAztfHyN3XygEjWeAewGAB6T<*7T7L7TceW0RQfQPPJlfeRgEbiQxPFIAewGAB6hReJgAPw4wPwH7oih74JlNeFAZXzQZkWd7PzQZE7Tce7TZ3OIAe6eAewQZXzlCpFAfuig7sFg6PwHcPwjNjWdfP7T7L7Tceih3*6l94FAEbzgAPwHcPwj<PwH7Zztppz0xb7Tce7T7L7Tceih3*TQNCFSAewGAB6SAew4EPJ1ZHih3P7Tce7T7L7Tceih3*fQfeWlPXzGAewGAB6SAewHAuwIAewIbhygE4ztJB7Tc*TP6PwH2xwID*7TZI7Tc*flPuZH6PwjcPwH3DZH6p7Tc*6h3*z0fhFg7vyh6Pw4ikwBWuwBiPwH2oSjbATA*Pw4wPwH3sygCP7Tc*RlfHyl8p7Tc*6lbezlkP7T70wTwBvH2uwID*7Tc*AlNQih7p7T70ZTwtvHwl7Tce7T7L7TceW0xbJ0FXWQjPwHcPwj<PwH7hygDBwGAewGAe6eAewd3ezlRkit6PwHcPwj<PwH71FgZrzeAewGAe6eAewdfBFh73FlfuJIAewGAB6SAew4kXqQPsz0<Pw4ikvH2PwH2oflPuF09tWeAew<EA7Tc*wT2uwIAB6GAewNJpzHij7TZI7Tc*qLijKSAew<N*W0xPflfGSlPj7T70ZTwtvHwl7Tc*K<Ccf<kw7T7L7Tc*z0PrFSAew<JPilCXKSAew<ZoWQ9CFSAeRH<BweD*vH2uwIAewNZbFQNeySAeRHABZeDBZGAewGAe6eAewQxbzQJkigJP7Tce7TZ37TceqQaC6jDPwHcPw4wPwH7Xz4xpzQAPwHcPwjNjWdfP7T7L7TceJlfGF17pJQfe7Tce7TZ3FQNsWlAPw4wPwH7UihFbRgEbiQxPFIAewGAB6gFbz1ZP7T7L7TceF0f*WQfHihRPFN7kz4N46hfHJ0PXz4fuFQ9eilfBSjNuzlEEzgPjqSAewGAB6gFbz1ZP7T7L7TceF0flygZPTgfCzt7E7Tce7TZ3OIAe6eAewQfuJgkPWQNjyg9uTt74FhcPwHcPwj<PZAcPwH7lFgE4zt7TJgcPwHcPw4wPwH7*WQ94JgZjAtfG7Tce7T7L7TceJQfuF09e7Tce7T7L7TcezgNDf09kilb6zlPuJ1wPwHcPw4wPwH7BilbPF1fsygEd7Tce7T7L7TceJhZPW4NHJ0PlihRpzlDPwHcPw4wPwH74zjEXJNReigZr7Tce7T7L7TceFlfXz09HihRpzlDPwHcPw4wPwH7HzlEuFgZjyg9u7Tce7T7L7TceW0xkFlPuWeAewGAe6eAewQkpzgfAqh3PWeAewGAe6eAewd34FPFpFhJPW4fuig7sFg6PwHcPw4wPwH7tFg7ryhRAFgk*zt7bWdPTJ09eigJP7Tce7T7L7TceJlfGylPjA0feWlPBJ0fuJNZjzt7bFlAPwHcPw4wPwH7tygE4ztJLzlEjWQ9sWj9lFh7sih4PwHcPw4wPwH7oih74JlNeFAZXzQZkWd7PzQZE7Tce7T7L7Tceil9XylPPRgEbiQxPFIAewGAe6eAewQN*W<ZXF0fOigkP7Tce7T7L7Tceih3*TQNCFSAewGAe6eAewQN*WNFPWdZpzlDPwHcPw4wPwH7*z0NjFQ9ezSAewGAe6eAewd3ezlRkit6PwHcPw4wPwH7kWlfe6gJPzd6PwHcPw4wPwH7sigEdJgNdFSAewGAe6eAewQxbzQJkigJPWeAewGAe6eAewQ9uT0PuFSAewGAe6eAewdJPiQReyhFPWGAewGAe6eAewQJPJ<Jbzgf*igRB7Tce7T7L7TceyQNliAfuig7sFg6PwHcPw4wPwH7BFgE46Qfbil9u7Tce7T7L7TceJQPGWQNjFSAewGAe6eAewQRPW17PilNjFgRSJgE3F<NkitRpzlENzQFXWQZPWjC3zQ9uqgkpJ14PwHcPw4wPwH7*WQ9jFgZjFgR3JgRpFgEHFSAewGAe6eAewQ7sJgfjzl9jyIAewGAe6eAewdZjzt7bFlfIJgZrFhRB7Tce7T7L7TceilxpW07Xih747Tce7T7L7Tceit7PF0fuJ0Pbz1wPwHcPw4wPwH7rFhPGzlNeFIAewGAe6eAewQkbzQNdFg6PwHcPw4wPwH7CFgRpiARPJQPHFhwPwHcPw4wPwH7BJ09eigJP7Tce7T7L7TceWlfeJQPHFfJXWQCPWGAewGAe6eAewdFpWdRkigxvFhPGzlNeFIAewGAe6eAewdJbylfwzlZr7Tce7T7L7TceF0flygZPTgfCzt7E7Tce7T7L7TceJhZPW4NdFgEjR0NjiSAewGAe6eAewQxXFlPu7Tce7T7L7TceygEr7Tce7T7L7Tcezgf4ygNLih3biQPsyhRpFhwPwHcPw4wPwH74FhFpilf6ztZjJh7P7Tce7T7L7Tcey0P47Tce7T7L7Tcez09HytwPwHcPw4wPwH7dW1APwHcPw4wPwH7CFgRpifZPWtZpzlDPwHcPw4wPwH7*Fh7CyhZByg9uWeAewGAe6eAewd3eFhZPzdRbJ0PXzGAewGAe6eAewdfBiGAewGAe6eAewdbe7Tce7T7L7TceWlfeygNs7Tce7T7L7TceigR3JgZjyg9u6l9CW09uFgEjWeAewGAe6eAewd7kz4N46hfHJ0PXzGAewGAe6eAewQZbz4xXigR3F<NkitRpzlE0FgEHFgR0WQNCFSAewGAe6eAewQZbzPZoih7P7Tce7T7L7TceWlbbWQAPwHcPw4wPwH7Hz0fbW4N*W<7bF0JP7Tce7T7L7TceFlfj6QNjJ0feqSAewGAe6eAewQJPJNfBFh7ZFgRpiSAewGAe6eAewd7PWhfPWtRZSAR76gZHFhZB7Tce7T7L7TceWQfxJgfBJ<kPF0PbSlfEAtPBJ0fC6gZHFhZB7Tce7T7L7TceWlfj6h3*6QN4FlAPwHcPw4wPwH7tFg7ryhR1FhRfWlfeTgf4yg<PwHcPw4wPwH7Hz0fbW49eygJpz4pXygEPF<N4SgEjFh7PWtR1WQ9kW1wPwHcPw4wPwH7HWQfbJ0f3JgZjyg9uTQ9uilAPwHcPw4wPwH7UzlPu6gR7zdRPWQfBJ<Jeztf*7Tce7T7L7Tcez0fbJQf3F<PuJ0feFhZjRt7XJh2PwHcPw4wPwH7kW0RbJ0f3F<PuJ0feFhZjRt7XJh3B7Tce7T7L7TceF0f*WQfHihRPFN7PW0xbilf7zPfSTGAewGAe6eAewQRPW17PilNjFgRfA4EAzkfSTIAewGAe6eAewQJPJ<PuWtRbz0xPFN7Pz0NjFgR3W13B7Tce7T7L7TceFlfjSgEjFh7PWtR1WQ9kW<N46hfHJ0PXz4RbJ0<PwHcPw4wPwH7eFgJpWtRPWP3eztRXil9sS0NuF0xPWGAewGAe6eAewdfuWQfdyhZjFh76WQ9jzlZXz<bbzQRsFhcPwHcPZA6PZj6Pw4wPwH7*7Tce7TZ37TfI7TJI7TcezQNCFSAewGAB6SAewP3<RGAewNFpFhJPWGAewGAtRIAe6eAt6GAewQEbzgAPwHcPwj<PwH7Ly17XzgAPwH36R<iPwH3gygftFhcPwHcPZj6Pw4wPZjcPwH7uigkP7Tce7TZ37Tce6lbezlkpJgjPwH36R<iPwH3gygftFhcPwHcPZj6Pw4wPZjcPwH7uigkP7Tce7TZ37TceTgPHWQ9BzlFj7Tc*RgRdFSAewN3<RGAewNFpFhJPWGAewGAtRIAe6eAt6GAewQEbzgAPwHcPwj<PwH7hFg7vyh6PwH3GJgPsJIkpzGAewN3<RGAewGAtRIAkRIAe6eAewdWPwHcPwj<PZjcPwH74FhFpilf6yhbPzN7bJ0PX7Tce7TZ3wSDk7T7L7TceWlZeFgfuf09*7Tce7TZ3wIAe6eAewdZHWQfPz4xPFd6PwHcPwj<*7TJ<7T7L7TceWeAewGAB6SAt6GAewQNligPsS0fpFlbj7Tce7TZ3OT<e7T7L7TceihFbygxhygRjyIAewGAB6T<jZL2Pw4wPwH7HzlxXW4RPW1Ro7Tce7TZ3wH6Pw4wPwH7oFgPdy16PwHcPwj<EZH2Pw4wPwH7tygRjyIAewGAB6T<jZL2Pw4wPwH7*yhbPz<RPW1Ro7Tce7TZ3wH6PZj6Pw4wPwH7BieAewGAB6SAt6GAew4NHJ0PlFA7XWQRPWGAewGAB6SAewd7diGa*7T7L7Tc*wIAe6eAewL2p7Tce7T7L7Tce6gZjyhFP6lN*J0PXzGAewGAB6SAewd7diGa*7T7L7Tc*wIAe6eAewL2p7Tce7T7L7Tce6h3*fl9eytZ*igZP7Tce7TZ37TceWQJGKLckZSAe6eAewLckZSAe6eAewLckZS4PwHcPw4wPwH7IigZrFt7XJgE47Tce7TZ37TceWQJGKLckZSAe6eAewLckZSAe6eAewLckZS4PwHcPw4wPwH7IJhRjzlE0igZP7Tce7TZ37TceWQJGKLcjwIAe6eAewLcjwIAe6eAewLcjwI4PwHcPw4wPwH7IJhRjzlEcygJoz0Pdy16PwHcPwj<PwH7eFlcowH6*7T7L7Tc*wH6*7T7L7Tc*wH6*KSAewGAe6eAew47kJ1RXzPZoigRXJeAewGAB6SAewd7diGaeZL2Pw4wPwH2eZL2Pw4wPwH2eZL2p7Tce7T7L7Tce6dfjJ09uf0fDJIAewGAB6SAewd7diGa*7T7L7Tc*wIAe6eAewL2p7Tce7T7L7Tce6lN*J0PXzPRPq16PwHcPwj<PwH7eFlcowIAe6eAewL2Pw4wPwH2*KSAewGAe6eAew4JeihPAFhbj7Tce7TZ37TceWQJGKL<*OSAe6eAewL<*OSAe6eAewL<*OS4PwHcPw4wPwH7cygJoz0Pdy16PwHcPwj<PwH7eFlcowIAe6eAewL<ewIAe6eAewLcxZS4PwHcPw4wPwH7cygJoz0Pdy1RAFhbj7Tce7TZ37TceWQJGKLckZSAe6eAewLckZSAe6eAewLckZS4PwHcPw4wPwH77zQNHJ0PlFA7XWQRPWGAewGAB6SAewd7diGa*7T7L7Tc*wIAe6eAewL2p7Tce7T7L7TceSgEbitRpJQfLih3jyg9u7Tce7TZ37TceWQJGKLckZSAe6eAewLckZSAe6eAewLckZS4PwHcPw4wPwH77zQNHJ0PlFAZbW1RpzlEAFhbj7Tce7TZ37TceWQJGKL<eOIAe6eAewL<eOIAe6eAewL<eOI4PwHcPw4wPwH77zQFX6QNHylJeztfuFIAewGAB6SAewd7diGaeZTAPw4wPwH2eZTAPw4wPwH2eZTAp7Tce7T7L7TceSgEQzkRPq16PwHcPwj<PwH7eFlcowIAe6eAewL2Pw4wPwH2*KSAewGAe6eAew4kPzdAPwHcPwj<PwH7eFlcowHAk7T7L7Tc*wHAk7T7L7Tc*wHAkKSAewGAe6eAew4kPzdfAFhbj7Tce7TZ37TceWQJGKL2Pw4wPwH2*7T7L7Tc*wI4PwHcPw4wPwH7Tit7Xz0xGihcPwHcPwj<PwH7eFlcowHAk7T7L7Tc*wHAk7T7L7Tc*wHAkKSAewGAe6eAewPRoWQfPR<RbWQCTy0N4ztWPwHcPwj<PwH7eFlcowIAe6eAewL2Pw4wPwH2*KSAewGAe6eAewPRoWQfPR<FbilAPwHcPwj<PwH7eFlcowH6*7T7L7Tc*wH6*7T7L7Tc*wH6*KSAewGAe6eAewPRoWQfPR<bpFlbsygJoJIAewGAB6SAewd7diGa*7T7L7Tc*wIAe6eAewL2p7Tce7T7L7Tcef0beFgf<T0Pdy1RTy0N4ztWPwHcPwj<PwH7eFlcowIAe6eAewL2Pw4wPwH2*KSAewGAe6eAewPRoWQfPRNZoigRXJeAewGAB6SAewd7diGa*7T7L7Tc*wIAe6eAewL2p7Tce7T7L7TceflPuF09t7Tce7TZ37TceWQJGKLckZSAe6eAewLckZSAe6eAewLckZS4PwHcPw4wPwH7hygE4ztJ0WQNCFSAewGAB6SAewd7diGa*7T7L7Tc*wIAe6eAewL2p7Tce7T7L7TceflPuF09tf0fDJIAewGAB6SAewd7diGa*7T7L7Tc*wIAe6eAewL2p7Tce7TJ<7T7L7TceWtwPwHcPwj<PZjcPwH7Hzl9rygAPwHcPwjNjWdfP7T7L7Tcez09HigxTJ09eigJP7Tce7TZ3J17kFSAe6eAewdZPWtZpzlETJ09eigJP7Tce7TZ3J17kFSAe6eAewQJszl7bzNZjzt7bFlAPwHcPwjNQigxBFSAe6eAewQPuF0fDFgR<6GAewGAB6hReJgAPZj6Pw4wPwH7jqGAewGAB6SjjOL2Pw4wPwH7syg*PwHcPwj<PwHcPwHcPw4wPwH7tyg*PwHcPwj<PwHcPwHcPw4wPwH7tySAewGAB6SAt6GAewQ9t7Tce7TZ3wT6jwIAe6eAewQ9o7Tce7TZ3OT<e7T7L7TceyhWPwHcPwj<xZL6*7T7L7TceygaPwHcPwj<tOT<Pw4wPwH7PJ0DPwHcPwj<PwHcPZA7XiQpPit6PwH3Nq1RPWQEbzIAkRIAewGAtRIAtR2/',
            "7ce72c04-4090-4f76-ba8e-9fc612cf57e5": 'a=7TJI7TceW0Pu7Tce7TZ37Tce7Tce7T7L7TcezlP47Tce7TZ37Tce7Tce7T7L7TceiQPmSg6PwHcPwj<PwH7T6ekTgf6PwHcPw4wPwH7QieAewGAB6SAewPZfAf7igAbgT<P7g<ZN64EfwH70fkaBwk6egAxOAkZcfjJZfkZFZPfiTBfLfkfKRfPTRjC<ZAx0SB6k6fb06ACTTjZyRBZNf<Z1TPb3AAwkZ4Cc649gAA<eRSAewGAe6eAewQkXF0APwHcPwj<PwH7BJ17pit6PwHcPw4wPwH7*7Tce7TZ37TceWeAewGAe6eAewQF*7Tce7TZ37TcewlZQOT7bOL6jwHbHZH3PZ0wjiQwxwlfGZLWeZlFQZB6PwHcPw4wPwH7HJ1P*FSAewGAB6T<Pw4wPwH7l7Tce7TZ37TceZIDevHauwIAewGAe6eAewd3l7Tce7TZ37TcewL7VzhRVZAxiSk8lwLikwB4twLADOSAewGAe6eAewQiPwHcPwj<PwHcB7Tce7T7L7TceWeAewGAB6SAewHNbwgFPO0wtiBaDOLZ4wL2eFT<DOL<jF0FPwHAEFTRP7Tce7T7L7TcezeAewGAB6SAewQk*ih4uzSEUFIEHzljPw4FCW0NEvQRHFHNPilijiTADigADZLZ4wlA*vQbjzg*PwHcPw4wPwH7xWeAewGAB6SAewQN*W<P47TZ<zf9<whFCfh<lweAeZd3bqAP47TZ<ZT<DZQABFT2tFT<BZLixwlcDFT2EZB<eiHbQZHitZg<PwHFXWQRPW4P47TZ<wB2EOLwEwT<lOTaD7TclJ<P47TZ<zh3bqSAewGAe6eAewQpBf0sPwHcPwj<PwH7UF06*wkZfAf7igAbgT<P7g<ZN64EfwH70fkaBwk6egAxOAkZcfjJZfkZFZPfiTBfLfkfKRfPTRjC<ZAx0SB6k6fb06ACTTjZyRBZNf<Z1TPb3AAwkZ4Cc649gAA<eRAN36ANZf4ZTA<jjZNP36AN36ARZf<N<wjfhfAZiZTRZgIAewGAe6eAewdNp7Tce7TZ37Tce7Tce7TJ</&d=7TJI7TceJ1wPwHcPwj<PZjcPwH74FhFpilfAygkP7Tce7TZ3wTWBOTa*ZBaDwL2eweAe6eAewQRPJQPHFAfuFNRpzgAPwHcPwj<xZBwEOL2tOLa*wLW*7TJ<7T7L7Tceil<PwHcPwj<PZjcPwH7jF<bbWlaPwHcPwj<PwHc*FQctFH<xOgAewg7GZQcxZlceiH34wBwBiTAlwTJGFGAewGAe6eAewQZXzdRPq1ROigkP7Tce7TZ37TceJlfGFl*Pw4ZPq13PWQPCFgEjig*CJlfGFl*PwHcPw4wPwH7tFg7dz1FPWdZpzlDPwHcPwj<PwH7hFg71TIAewL<uwIAewIb5W0fuRj*PwH3NAeAewLcuwIAew<ZoWQ9CyhfCKSAewGAe6eAewdZoigRpzQJwfGAewGAB6SAewPJPi4Jw7Tc*RjxTTIAew<fT7Tc*wSD*7Tc*K<9*FgE1TIAew<fT7Tc*RjxTTIAew<fT7Tc*wSD*7Tc*6lbezlkpJgjp7Tce7T7L7TceJQfuF09e7Tce7TZ37TceflfGSlPj7Tce7T7L7TceWQfuF0feFhcPwHcPwj<PwH7hFg7vyh6PwH3hFg71TIAewGAe6eAewQfDJ0fuWlPXzdwPwHcPwj<PZAcPwH73T4JwRf9pzdZjigEHFgRVih7eihPB7Tce7T7L7TceRfbAhl7sFgE4hlkpzQkbqIAewGAe6eAew4fifN9Hz0P*hlZXzdRezl*PwHcPw4wPwH7NgNRVil9szt7VidfQFQfehlbbz0FVFQxXih6PwHcPw4wPwH7NgNRVF0f*J0bVilxbzh2PwHcPw4wPwH7NgNRVF0PByQ9pzdRVJ0PCFh7VWhfPWd4PwHcPw4wPwH7NgNRVFQxXihRViQxPzQ6PwHcPw4wPwH7NgNRVFd7bFk94Fh3jyIAewGAe6eAew4fifN9*zlxEFl9uhl9QFdZPJN9Hz0NCWIAewGAe6eAew4fifN9By0N4Fh7VJ0fDJ1feFf9szl6PwHcPw4wPwH7NgNRVJ0fDJ1feFf9Hzlk*WQfBWlPXzP9GW1RH7Tce7T7L7TceRfbAhtRPq1RkWQfVil9CW17PWtZpzlEVWQJjieAewGAe6eAew4fifN9jFhbjJh7PhlFpz1RPWP9bzQPBztRezt3pieAewGAe6eAew4fifN9jFhbjJh7PhlkpWd7XWP9Hz0NCWN9jzk9PF0JP7Tce7T7L7TceRfbAhtZSRjcPwHcPw4wPwH7vSN7VW0NeigxsFgxVWlbbF0fehlZXzh3pz0APwHcPw4wPwH75RfZVFgxPzgfuJN9pzQRPqN9kygEj7Tce7T7L7TceTjfThlFGzk9eFgE4Fh7VzgP*zgN*7Tce7T7L7TceTjfThtZjigE4ih74hlRPWQPlihRpJQfB7Tce7T7L7TceTjfThtRPq1RkWQfVFQxXih6PwHcPw4wPwH75RfZVJ0fDJ1feFf9Qz09bJN9sygEPihcPwHcPw4wPwH75RfZVJ0fDJ1feFf9oigxQhlFszlNj7Tce7T7L7TceTjfThtRPq1RkWQfVy0NsFP9Qz09bJN9sygEPihcPwHcPw4wPwH75RfZVJQfeJ0fDhlNeWQNEhl9GyQfHJIAewGAe6eAewPJN64Jwhl7sFgE4hlFkzQZVFhbjFgE4Fg6PwHcPw4wPwH7hRA71TN9HzlxXWP9GJgFQFh7VFQxXih6PwHcPw4wPwH7hRA71TN9Hzlk*WQfBWlf4htRPq1RkWQfVWBZjieAewGAe6eAewPJN64JwhlZXzh3eFhZBFgRVJ0fDJ1feFf9BwtRHhtZeFlcPwHcPw4wPwH7hRA71TN94Fg7kFk9eFgE4Fh7PWP9pzQFX7Tce7T7L7TcefjfIRjxVF0fGJgJVWlbbF0feWeAewGAe6eAewPJN64JwhlRPW1RohtRPq1RkWQAPwHcPw4wPwH7hRA71TN94WQNthl7kFQFPWdwPwHcPw4wPwH7hRA71TN9sztZPhlZXzdRPq16PwHcPw4wPwH7hRA71TN9CJgxjyf94WQNt7Tce7T7L7TcefjfIRjxVW09sqgJXzP9CzlRP7Tce7Tf<7T7L7TceJtfl7Tce7TZ37TceRl9XFlxP7Tc*SgEHvGAewIb7zdRPzI4PwHcPw4wPwH7tJhcPwHcPwj<PwH73T4JwRSAewIb7zdRPzIAe6eAew<PuJ0fsKNcp7Tc*Sh7pWebSKSAewNbP7Tc*Rt7bW0bpitwPwH2ow1a*wL2*OA<jOS4PwH3<yh7Pit6BRL<x7Tc*JdZVZf8*7Tc*W1ZVZf8*7T7L7Tc*RLZ<wT<p7Tce7TJ<7T7L7TcezSAewGAB6SAt6GAewQZXzh3bJ<kXF0APwHcPwj<PwH7LAkwx6l9CW0Nj7Tce7TJ<7T7L7TcezGAewGAB6SAt6GAewdFPzQRXWPZkiGAewGAB6SAewGAewGAe6eAewd3ezlRkitRTJgcPwHcPwj<PwHcewL2BwL<*ZeAewGAe6eAewdFPzQRXWGAewGAB6SAew4JXzlJsFSAew<PuieDPwHcPw4wPwH7CihbAztfHyN3XygEjWeAewGAB6T<*7T7L7TceW0RQfQPPJlfeRgEbiQxPFIAewGAB6hReJgAPw4wPwH7oih74JlNeFAZXzQZkWd7PzQZE7Tce7TZ3OIAe6eAewQZXzlCpFAfuig7sFg6PwHcPwjNjWdfP7T7L7Tceih3*6l94FAEbzgAPwHcPwj<PwH7Zztppz0xb7Tce7T7L7Tceih3*TQNCFSAewGAB6SAew4EPJ1ZHih3P7Tce7T7L7Tceih3*fQfeWlPXzGAewGAB6SAewHAuwIAewIbhygE4ztJB7Tc*TP6PwH2xwID*7TZI7Tc*flPuZH6PwjcPwH3DZH6p7Tc*6h3*z0fhFg7vyh6Pw4ikwBWuwBiPwH2oSjbATA*Pw4wPwH3sygCP7Tc*RlfHyl8p7Tc*6lbezlkP7T70wTwBvH2uwID*7Tc*AlNQih7p7T70ZTwtvHwl7Tc*RgRd7T70wTwBvH2uwID*7Tce7T7L7TceW0xbJ0FXWQjPwHcPwj<PwH7hygDBwGAewGAe6eAewd3ezlRkit6PwHcPwj<PwH71FgZrzeAewGAe6eAewdfBFh73FlfuJIAewGAB6SAew4kXqQPsz0<Pw4ikvH2PwH2oflPuF09tWeAew<EA7Tc*wT2uwIAB6GAewNJpzHij7TZI7Tc*qLijKSAew<N*W0xPflfGSlPj7T70ZTwtvHwl7Tc*K<Ccf<kw7T7L7Tc*z0PrFSAew<JPilCXKSAew<ZoWQ9CFSAeRH<BweD*vH2uwIAewNZbFQNeySAeRHABZeDBZGAew<f4FeAeRH<BweD*vH2uwIAewGAe6eAewQxbzQJkigJP7Tce7TZ37TceqQaC6jDPwHcPw4wPwH7Xz4xpzQAPwHcPwjNjWdfP7T7L7TceJlfGF17pJQfe7Tce7TZ3FQNsWlAPw4wPwH7UihFbRgEbiQxPFIAewGAB6gFbz1ZP7T7L7TceF0f*WQfHihRPFN7kz4N46hfHJ0PXz4fuFQ9eilfBSjNuzlEEzgPjqSAewGAB6gFbz1ZP7T7L7TceF0flygZPTgfCzt7E7Tce7TZ3OIAe6eAewQfuJgkPWQNjyg9uTt74FhcPwHcPwj<PZAcPwH7lFgE4zt7TJgcPwHcPw4wPwH7*WQ94JgZjAtfG7Tce7T7L7TceJQfuF09e7Tce7T7L7TcezgNDf09kilb6zlPuJ1wPwHcPw4wPwH7BilbPF1fsygEd7Tce7T7L7TceJhZPW4NHJ0PlihRpzlDPwHcPw4wPwH74zjEXJNReigZr7Tce7T7L7TceFlfXz09HihRpzlDPwHcPw4wPwH7HzlEuFgZjyg9u7Tce7T7L7TceW0xkFlPuWeAewGAe6eAewQkpzgfAqh3PWeAewGAe6eAewd34FPFpFhJPW4fuig7sFg6PwHcPw4wPwH7tFg7ryhRAFgk*zt7bWdPTJ09eigJP7Tce7T7L7TceJlfGylPjA0feWlPBJ0fuJNZjzt7bFlAPwHcPw4wPwH7tygE4ztJLzlEjWQ9sWj9lFh7sih4PwHcPw4wPwH7oih74JlNeFAZXzQZkWd7PzQZE7Tce7T7L7Tceil9XylPPRgEbiQxPFIAewGAe6eAewQN*W<ZXF0fOigkP7Tce7T7L7Tceih3*TQNCFSAewGAe6eAewQN*WNFPWdZpzlDPwHcPw4wPwH7*z0NjFQ9ezSAewGAe6eAewd3ezlRkit6PwHcPw4wPwH7kWlfe6gJPzd6PwHcPw4wPwH7sigEdJgNdFSAewGAe6eAewQxbzQJkigJPWeAewGAe6eAewQ9uT0PuFSAewGAe6eAewdJPiQReyhFPWGAewGAe6eAewQJPJ<Jbzgf*igRB7Tce7T7L7TceyQNliAfuig7sFg6PwHcPw4wPwH7BFgE46Qfbil9u7Tce7T7L7TceJQPGWQNjFSAewGAe6eAewQRPW17PilNjFgRSJgE3F<NkitRpzlENzQFXWQZPWjC3zQ9uqgkpJ14PwHcPw4wPwH7*WQ9jFgZjFgR3JgRpFgEHFSAewGAe6eAewQ7sJgfjzl9jyIAewGAe6eAewdZjzt7bFlfIJgZrFhRB7Tce7T7L7TceilxpW07Xih747Tce7T7L7Tceit7PF0fuJ0Pbz1wPwHcPw4wPwH7rFhPGzlNeFIAewGAe6eAewQkbzQNdFg6PwHcPw4wPwH7CFgRpiARPJQPHFhwPwHcPw4wPwH7BJ09eigJP7Tce7T7L7TceWlfeJQPHFfJXWQCPWGAewGAe6eAewdFpWdRkigxvFhPGzlNeFIAewGAe6eAewdJbylfwzlZr7Tce7T7L7TceF0flygZPTgfCzt7E7Tce7T7L7TceJhZPW4NdFgEjR0NjiSAewGAe6eAewQxXFlPu7Tce7T7L7TceygEr7Tce7T7L7Tcezgf4ygNLih3biQPsyhRpFhwPwHcPw4wPwH74FhFpilf6ztZjJh7P7Tce7T7L7Tcey0P47Tce7T7L7Tcez09HytwPwHcPw4wPwH7dW1APwHcPw4wPwH7CFgRpifZPWtZpzlDPwHcPw4wPwH7*Fh7CyhZByg9uWeAewGAe6eAewd3eFhZPzdRbJ0PXzGAewGAe6eAewdfBiGAewGAe6eAewdbe7Tce7T7L7TceWlfeygNs7Tce7T7L7TceigR3JgZjyg9u6l9CW09uFgEjWeAewGAe6eAewd7kz4N46hfHJ0PXzGAewGAe6eAewQZbz4xXigR3F<NkitRpzlE0FgEHFgR0WQNCFSAewGAe6eAewQZbzPZoih7P7Tce7T7L7TceWlbbWQAPwHcPw4wPwH7Hz0fbW4N*W<7bF0JP7Tce7T7L7TceFlfj6QNjJ0feqSAewGAe6eAewQJPJNfBFh7ZFgRpiSAewGAe6eAewd7PWhfPWtRZSAR76gZHFhZB7Tce7T7L7TceWQfxJgfBJ<kPF0PbSlfEAtPBJ0fC6gZHFhZB7Tce7T7L7TceWlfj6h3*6QN4FlAPwHcPw4wPwH7tFg7ryhR1FhRfWlfeTgf4yg<PwHcPw4wPwH7Hz0fbW49eygJpz4pXygEPF<N4SgEjFh7PWtR1WQ9kW1wPwHcPw4wPwH7HWQfbJ0f3JgZjyg9uTQ9uilAPwHcPw4wPwH7UzlPu6gR7zdRPWQfBJ<Jeztf*7Tce7T7L7Tcez0fbJQf3F<PuJ0feFhZjRt7XJh2PwHcPw4wPwH7kW0RbJ0f3F<PuJ0feFhZjRt7XJh3B7Tce7T7L7TceF0f*WQfHihRPFN7PW0xbilf7zPfSTGAewGAe6eAewQRPW17PilNjFgRfA4EAzkfSTIAewGAe6eAewQJPJ<PuWtRbz0xPFN7Pz0NjFgR3W13B7Tce7T7L7TceFlfjSgEjFh7PWtR1WQ9kW<N46hfHJ0PXz4RbJ0<PwHcPw4wPwH7eFgJpWtRPWP3eztRXil9sS0NuF0xPWGAewGAe6eAewdfuWQfdyhZjFh76WQ9jzlZXz<bbzQRsFhcPwHcPZA6PZj6Pw4wPwH7*7Tce7TZ37TfI7TJI7TcezQNCFSAewGAB6SAewP3<RGAewNFpFhJPWGAewGAtRIAe6eAt6GAewQEbzgAPwHcPwj<PwH7Ly17XzgAPwH36R<iPwH3gygftFhcPwHcPZj6Pw4wPZjcPwH7uigkP7Tce7TZ37Tce6lbezlkpJgjPwH36R<iPwH3gygftFhcPwHcPZj6Pw4wPZjcPwH7uigkP7Tce7TZ37TceTgPHWQ9BzlFj7Tc*RgRdFSAewN3<RGAewNFpFhJPWGAewGAtRIAe6eAt6GAewQEbzgAPwHcPwj<PwH7hFg7vyh6PwH3GJgPsJIkpzGAewN3<RGAewGAtRIAkRIAe6eAewdWPwHcPwj<PZjcPwH74FhFpilf6yhbPzN7bJ0PX7Tce7TZ3wSDk7T7L7TceWlZeFgfuf09*7Tce7TZ3wIAe6eAewdZHWQfPz4xPFd6PwHcPwj<*7TJ<7T7L7TceWeAewGAB6SAt6GAewQNligPsS0fpFlbj7Tce7TZ3OT<e7T7L7TceihFbygxhygRjyIAewGAB6T<jZL2Pw4wPwH7HzlxXW4RPW1Ro7Tce7TZ3wH6Pw4wPwH7oFgPdy16PwHcPwj<EZH2Pw4wPwH7tygRjyIAewGAB6T<jZL2Pw4wPwH7*yhbPz<RPW1Ro7Tce7TZ3wH6PZj6Pw4wPwH7BieAewGAB6SAt6GAew4NHJ0PlFA7XWQRPWGAewGAB6SAewd7diGa*7T7L7Tc*wIAe6eAewL2p7Tce7T7L7Tce6gZjyhFP6lN*J0PXzGAewGAB6SAewd7diGa*7T7L7Tc*wIAe6eAewL2p7Tce7T7L7Tce6h3*fl9eytZ*igZP7Tce7TZ37TceWQJGKLckZSAe6eAewLckZSAe6eAewLckZS4PwHcPw4wPwH7IigZrFt7XJgE47Tce7TZ37TceWQJGKLckZSAe6eAewLckZSAe6eAewLckZS4PwHcPw4wPwH7IJhRjzlE0igZP7Tce7TZ37TceWQJGKLcjwIAe6eAewLcjwIAe6eAewLcjwI4PwHcPw4wPwH7IJhRjzlEcygJoz0Pdy16PwHcPwj<PwH7eFlcowH6*7T7L7Tc*wH6*7T7L7Tc*wH6*KSAewGAe6eAew47kJ1RXzPZoigRXJeAewGAB6SAewd7diGaeZL2Pw4wPwH2eZL2Pw4wPwH2eZL2p7Tce7T7L7Tce6dfjJ09uf0fDJIAewGAB6SAewd7diGa*7T7L7Tc*wIAe6eAewL2p7Tce7T7L7Tce6lN*J0PXzPRPq16PwHcPwj<PwH7eFlcowIAe6eAewL2Pw4wPwH2*KSAewGAe6eAew4JeihPAFhbj7Tce7TZ37TceWQJGKL<*OSAe6eAewL<*OSAe6eAewL<*OS4PwHcPw4wPwH7cygJoz0Pdy16PwHcPwj<PwH7eFlcowIAe6eAewL<ewIAe6eAewLcxZS4PwHcPw4wPwH7cygJoz0Pdy1RAFhbj7Tce7TZ37TceWQJGKLckZSAe6eAewLckZSAe6eAewLckZS4PwHcPw4wPwH77zQNHJ0PlFA7XWQRPWGAewGAB6SAewd7diGa*7T7L7Tc*wIAe6eAewL2p7Tce7T7L7TceSgEbitRpJQfLih3jyg9u7Tce7TZ37TceWQJGKLckZSAe6eAewLckZSAe6eAewLckZS4PwHcPw4wPwH77zQNHJ0PlFAZbW1RpzlEAFhbj7Tce7TZ37TceWQJGKL<eOIAe6eAewL<eOIAe6eAewL<eOI4PwHcPw4wPwH77zQFX6QNHylJeztfuFIAewGAB6SAewd7diGaeZTAPw4wPwH2eZTAPw4wPwH2eZTAp7Tce7T7L7TceSgEQzkRPq16PwHcPwj<PwH7eFlcowIAe6eAewL2Pw4wPwH2*KSAewGAe6eAew4kPzdAPwHcPwj<PwH7eFlcowHAk7T7L7Tc*wHAk7T7L7Tc*wHAkKSAewGAe6eAew4kPzdfAFhbj7Tce7TZ37TceWQJGKL2Pw4wPwH2*7T7L7Tc*wI4PwHcPw4wPwH7Tit7Xz0xGihcPwHcPwj<PwH7eFlcowHAk7T7L7Tc*wHAk7T7L7Tc*wHAkKSAewGAe6eAewPRoWQfPR<RbWQCTy0N4ztWPwHcPwj<PwH7eFlcowIAe6eAewL2Pw4wPwH2*KSAewGAe6eAewPRoWQfPR<FbilAPwHcPwj<PwH7eFlcowH6*7T7L7Tc*wH6*7T7L7Tc*wH6*KSAewGAe6eAewPRoWQfPR<bpFlbsygJoJIAewGAB6SAewd7diGa*7T7L7Tc*wIAe6eAewL2p7Tce7T7L7Tcef0beFgf<T0Pdy1RTy0N4ztWPwHcPwj<PwH7eFlcowIAe6eAewL2Pw4wPwH2*KSAewGAe6eAewPRoWQfPRNZoigRXJeAewGAB6SAewd7diGa*7T7L7Tc*wIAe6eAewL2p7Tce7T7L7TceflPuF09t7Tce7TZ37TceWQJGKLckZSAe6eAewLckZSAe6eAewLckZS4PwHcPw4wPwH7hygE4ztJ0WQNCFSAewGAB6SAewd7diGa*7T7L7Tc*wIAe6eAewL2p7Tce7T7L7TceflPuF09tf0fDJIAewGAB6SAewd7diGa*7T7L7Tc*wIAe6eAewL2p7Tce7TJ<7T7L7TceWtwPwHcPwj<PZjcPwH7Hzl9rygAPwHcPwjNjWdfP7T7L7Tcez09HigxTJ09eigJP7Tce7TZ3J17kFSAe6eAewdZPWtZpzlETJ09eigJP7Tce7TZ3J17kFSAe6eAewQJszl7bzNZjzt7bFlAPwHcPwjNQigxBFSAe6eAewQPuF0fDFgR<6GAewGAB6hReJgAPZj6Pw4wPwH7jqGAewGAB6SjjOL2Pw4wPwH7syg*PwHcPwj<PwHcPwHcPw4wPwH7tyg*PwHcPwj<PwHcPwHcPw4wPwH7tySAewGAB6SAt6GAewQ9t7Tce7TZ3wT6jwIAe6eAewQ9o7Tce7TZ3OT<e7T7L7TceyhWPwHcPwj<xZLwe7T7L7TceygaPwHcPwj<DwB6Pw4wPwH7PJ0DPwHcPwj<PwHcPZA7XiQpPit6PwH3Nq1RPWQEbzIAkRIAewGAtRIAtR2/',
            "417789d1-8884-41c0-98e0-b6f72076775e": 'a=7TJI7TceW0Pu7Tce7TZ37Tce7Tce7T7L7TcezlP47Tce7TZ37Tce7Tce7T7L7TceiQPmSg6PwHcPwj<PwH7dzlx4hljPwHcPw4wPwH7QieAewGAB6SAewHR1gNPhR4b3TAAjAA7SA<fvffR<Z<8eR48kRNp1THJvTP2eAP<tgAF1SNf3RjZTSBRgAA7wS<C5TTZhg4Jc6TRwT<b0A<ZcRjwlTNN7ALf6wkNKZPfOALFgASAewGAe6eAewQkXF0APwHcPwj<PwH7BJ17pit6PwHcPw4wPwH7*7Tce7TZ37TceWeAewGAe6eAewQF*7Tce7TZ37TceOLABiTfGZlwkOTAkiTaDiH2*FgNQZl<jiTPbwB2lilAPwHcPw4wPwH7HJ1P*FSAewGAB6T<Pw4wPwH7l7Tce7TZ37TceZIDevHauwIAewGAe6eAewd3l7Tce7TZ37TcewL7VzhRVZAxiSk8lwLikwB4twLADOSAewGAe6eAewQiPwHcPwj<PwHcB7Tce7T7L7TceWeAewGAB6SAewQAewHcDZ0ADZB6tiT4BZ0cDFQ6BOLZPZLAxZTwxF0cx7Tce7T7L7TcezeAewGAB6SAewdReigRPvQjuyQ6uil9C7T70zt74FhcPw4FXWQRPWQxpWtRVyQRCvdZoJ0ks7Tce7T7L7TceWhwPwHcPwj<PwH7BilfuFhFbzIABRLcPwHFUq1ZpFIABRL<twB4DwLaxZLA*wH4EOLwkZBak7Tclih3*6l94FSABR0kBw0ZbOTAxwT6PwHFXWQRPWPREW0APwjRbz0*PwHF*J0Nd7TZ<ZB<kZSDxvH<x7TclWl9kWQZP7TZ<zf9pzQEPWP9CqAp4vQ9eF0feRQxXzt7Vzt74Fh7syhZj7Tce7T7L7TceydZAyeAewGAB6SAewQp4FL2BZ<JigfJ0S<NZRTRR6P76RACff<6jTB70TBf<g4JOZjCOAL7SATJFR4JcfAN16kZvZNFR64xcSj9ZwkJyRjb3Z<xwS<F66jb16BFwAAP6Zf2BAAolfAE6ZPFR6AN36Akg6kwjTjpyAAN36AN36jNwgfoeA4FKT<jlRfNi7Tce7T7L7TceWg4PwHcPwj<PwHcPwHcPZj6/&d=7TJI7TceJ1wPwHcPwj<PZjcPwH74FhFpilfAygkP7Tce7TZ3wTWBOTa*OTAjZLajOIAe6eAewQRPJQPHFAfuFNRpzgAPwHcPwj<xZBwEOL2EZT6jOLik7TJ<7T7L7Tceil<PwHcPwj<PZjcPwH7jF<bbWlaPwHcPwj<PwHceZHixZBWtwTPQOL4xOTFQwBceiTWtFQ6kZLfbwHJGZIAewGAe6eAewQZXzdRPq1ROigkP7Tce7TZ37TceJlfGFl*Pw4ZPq13PWQPCFgEjig*CJlfGFl*PwHcPw4wPwH7tFg7dz1FPWdZpzlDPwHcPwj<PwH7hFg71TIAewL<uwIAewIb5W0fuRj*PwH3NAeAewLcuwIAew<ZoWQ9CyhfCKSAewGAe6eAewdZoigRpzQJwfGAewGAB6SAewPJPi4Jw7Tc*RjxTTIAew<fT7Tc*wSD*7Tc*K<9*FgE1TIAew<fT7Tc*RjxTTIAew<fT7Tc*wSD*7Tc*6lbezlkpJgjp7Tce7T7L7TceJQfuF09e7Tce7TZ37TceflfGSlPj7Tce7T7L7TceWQfuF0feFhcPwHcPwj<PwH7hFg7vyh6PwH3hFg71TIAewGAe6eAewQfDJ0fuWlPXzdwPwHcPwj<PZAcPwH73T4JwRf9pzdZjigEHFgRVih7eihPB7Tce7T7L7TceRfbAhl7sFgE4hlkpzQkbqIAewGAe6eAew4fifN9Hz0P*hlZXzdRezl*PwHcPw4wPwH7NgNRVil9szt7VidfQFQfehlbbz0FVFQxXih6PwHcPw4wPwH7NgNRVF0f*J0bVilxbzh2PwHcPw4wPwH7NgNRVF0PByQ9pzdRVJ0PCFh7VWhfPWd4PwHcPw4wPwH7NgNRVFQxXihRViQxPzQ6PwHcPw4wPwH7NgNRVFd7bFk94Fh3jyIAewGAe6eAew4fifN9*zlxEFl9uhl9QFdZPJN9Hz0NCWIAewGAe6eAew4fifN9By0N4Fh7VJ0fDJ1feFf9szl6PwHcPw4wPwH7NgNRVJ0fDJ1feFf9Hzlk*WQfBWlPXzP9GW1RH7Tce7T7L7TceRfbAhtRPq1RkWQfVil9CW17PWtZpzlEVWQJjieAewGAe6eAew4fifN9jFhbjJh7PhlFpz1RPWP9bzQPBztRezt3pieAewGAe6eAew4fifN9jFhbjJh7PhlkpWd7XWP9Hz0NCWN9jzk9PF0JP7Tce7T7L7TceRfbAhtZSRjcPwHcPw4wPwH7vSN7VW0NeigxsFgxVWlbbF0fehlZXzh3pz0APwHcPw4wPwH75RfZVFgxPzgfuJN9pzQRPqN9kygEj7Tce7T7L7TceTjfThlFGzk9eFgE4Fh7VzgP*zgN*7Tce7T7L7TceTjfThtZjigE4ih74hlRPWQPlihRpJQfB7Tce7T7L7TceTjfThtRPq1RkWQfVFQxXih6PwHcPw4wPwH75RfZVJ0fDJ1feFf9Qz09bJN9sygEPihcPwHcPw4wPwH75RfZVJ0fDJ1feFf9oigxQhlFszlNj7Tce7T7L7TceTjfThtRPq1RkWQfVy0NsFP9Qz09bJN9sygEPihcPwHcPw4wPwH75RfZVJQfeJ0fDhlNeWQNEhl9GyQfHJIAewGAe6eAewPJN64Jwhl7sFgE4hlFkzQZVFhbjFgE4Fg6PwHcPw4wPwH7hRA71TN9HzlxXWP9GJgFQFh7VFQxXih6PwHcPw4wPwH7hRA71TN9Hzlk*WQfBWlf4htRPq1RkWQfVWBZjieAewGAe6eAewPJN64JwhlZXzh3eFhZBFgRVJ0fDJ1feFf9BwtRHhtZeFlcPwHcPw4wPwH7hRA71TN94Fg7kFk9eFgE4Fh7PWP9pzQFX7Tce7T7L7TcefjfIRjxVF0fGJgJVWlbbF0feWeAewGAe6eAewPJN64JwhlRPW1RohtRPq1RkWQAPwHcPw4wPwH7hRA71TN94WQNthl7kFQFPWdwPwHcPw4wPwH7hRA71TN9sztZPhlZXzdRPq16PwHcPw4wPwH7hRA71TN9CJgxjyf94WQNt7Tce7T7L7TcefjfIRjxVW09sqgJXzP9CzlRP7Tce7Tf<7T7L7TceJtfl7Tce7TZ37TceRl9XFlxP7Tc*SgEHvGAewIb7zdRPzI4PwHcPw4wPwH7tJhcPwHcPwj<PwH73T4JwRSAewIb7zdRPzIAe6eAew<PuJ0fsKNcp7Tc*fAb<7Tc*Rt7bW0bpitwPwH2ow1a*wL2*OA73ZI4PwH3<yh7Pit6BRL<x7Tc*JdZVZf8*7Tc*W1ZVZf8*7T7L7Tc*RLZ<wT<p7Tce7TJ<7T7L7TcezSAewGAB6SAt6GAewQZXzh3bJ<kXF0APwHcPwj<PwH7LAkwx6l9CW0Nj7Tce7TJ<7T7L7TcezGAewGAB6SAt6GAewdFPzQRXWPZkiGAewGAB6SAewGAewGAe6eAewd3ezlRkitRTJgcPwHcPwj<PwHcewL2BwL<*ZeAewGAe6eAewdFPzQRXWGAewGAB6SAew4JXzlJsFSAew<PuieDPwHcPw4wPwH7CihbAztfHyN3XygEjWeAewGAB6T2Pw4wPwH7*F0FgygftFh7NzQNGz0f47Tce7TZ3J17kFSAe6eAewQbbWQRtih7P6l9uitfeWQfuit4PwHcPwj<D7T7L7Tceil9XylPPRgEbiQxPFIAewGAB6hReJgAPw4wPwH7bW13LzlRPTQNCFSAewGAB6SAew4kXqQPsz0<PwHcPw4wPwH7bW13OigkP7Tce7TZ37TceTQfjWlZbW0APwHcPw4wPwH7bW13gFh7Byg9u7Tce7TZ37TceZSD*7Tc*KNJpzQRXJtwPwH3OfIAewL<*vH2PwjcPwH3hygDlZIAB6GAew1alZI4PwH33W13sFfJPi4CpJIAeRHABZeDBZGAewIbvSNRZTIAe6eAew0xpylAPwH31FgZrze4PwH3Ly17XzgAPw4ixwBwuwID*vH2PwH3TigFbWQ4Pw4ikwBWuwBiPwHcPw4wPwH7*z0NjFQ9ezSAewGAB6SAewPJpzHwe7Tce7T7L7TceW17XF1fHJIAewGAB6SAew4JPilCX7Tce7T7L7TceJhZPW4NdFgEj7Tce7TZ37TceTg9mygxsiSAeRHAuwIAewIbhygE4ztJB7Tc*TP6PwH2xwID*7TZI7Tc*flPuZH6PwjcPwH3DZH6p7Tc*6h3*z0fhFg7vyh6Pw4ikwBWuwBiPwH2oSjbATA*Pw4wPwH3sygCP7Tc*RlfHyl8p7Tc*6lbezlkP7T70wTwBvH2uwID*7Tc*AlNQih7p7T70ZTwtvHwl7Tce7T7L7Tcez0NuFtfbFlAPwHcPwj<PwH7myIkLTGAewGAe6eAewQ9uT0PuFSAewGAB6hReJgAPw4wPwH7tFg74WQPlFhcPwHcPwjNQigxBFSAe6eAewQpbJQNNzQNGz0f47Tce7TZ3FQNsWlAPw4wPwH74Fh3eFgZbJ0f4Adfu6gR3JgZjyg9uRgEQzt7HFhZv6gEXzdPCyhRE7Tce7TZ3FQNsWlAPw4wPwH74FhFpilfZFgkXWd4PwHcPwj<D7T7L7TceFgEkzgfeihRpzlE5WQRPWGAewGAB6SAk6GAewdFPzQRXWPZkiGAewGAe6eAewd3ezlRkitRTJgcPwHcPw4wPwH7lFgE4ztcPwHcPw4wPwH7CihbAztfHyN3XygEjWeAewGAe6eAewdZHy0f4JgxpzQWPwHcPw4wPwH7kWlfe6gZjyhFbJ0PXzGAewGAe6eAewQRXTQ9jf17bilsPwHcPw4wPwH7dFg9szlZbJ0PXzGAewGAe6eAewQZXzQEPitRpzlDPwHcPw4wPwH7*z1fdygEB7Tce7T7L7TcezgPCFfREW0fB7Tce7T7L7TceW0RQfQPPJlfeRgEbiQxPFIAewGAe6eAewdJPiQCpJNRPzh3XWQNeqfZjzt7bFlAPwHcPw4wPwH7tFg7ryhR6Fh7ByhZjFgEjAtRXWQNdFSAewGAe6eAewdJpzQRXJjZXzdRezlxBTtFPWQxbqSAewGAe6eAewQbbWQRtih7P6l9uitfeWQfuit4PwHcPw4wPwH7Hzl9rygfNzQNGz0f47Tce7T7L7Tceih3*6l94FAEbzgAPwHcPw4wPwH7bW13OigkP7Tce7T7L7Tceih3*fQfeWlPXzGAewGAe6eAewd3sihRQzt7C7Tce7T7L7TceW17XF1fHJIAewGAe6eAewdfBFh73FlfuJIAewGAe6eAewQxbzQJkigJP7Tce7T7L7Tcez0NuFtfbFlfB7Tce7T7L7TcezlEwygEP7Tce7T7L7TceJlfGF17pJQfe7Tce7T7L7TceFlfjRlNCFh3bF1wPwHcPw4wPwH7UihFbRgEbiQxPFIAewGAe6eAewdZPzQRIFgNHzlDPwHcPw4wPwH7lyg7eihRP7Tce7T7L7TceF0f*WQfHihRPFN7kz4N46hfHJ0PXz4fuFQ9eilfBSjNuzlEEzgPjqSAewGAe6eAewd3eztRPitRPF<NkF0PPzQZP7Tce7T7L7TceiQxkFhRXztRo7Tce7T7L7TceWtRXWQNdFA7kilCPJ1wPwHcPw4wPwH7Hz0P*iQ9bWQ6PwHcPw4wPwH7HWQf4FgEjygNsWeAewGAe6eAewQCPqg7Xih747Tce7T7L7TcezgNuigJPFIAewGAe6eAewQkPF0PbR0flygZPWeAewGAe6eAewdZjzt7bFlAPwHcPw4wPwH7BFh7lygZPfl9eylfe7Tce7T7L7TceJQPeJ1fbz<CPqg7Xih747Tce7T7L7TceJlNrFAxXilsPwHcPw4wPwH74FhFpilfZFgkXWd4PwHcPw4wPwH7kWlfe6gJPzdR<ihRb7Tce7T7L7Tceil9XylPPR0f*WQfHihRpzlEwig7PzIAewGAe6eAewQxXFlPu7Tce7T7L7TceygEr7Tce7T7L7Tcezgf4ygNLih3biQPsyhRpFhwPwHcPw4wPwH74FhFpilf6ztZjJh7P7Tce7T7L7Tcey0P47Tce7T7L7Tcez09HytwPwHcPw4wPwH7dW1APwHcPw4wPwH7CFgRpifZPWtZpzlDPwHcPw4wPwH7*Fh7CyhZByg9uWeAewGAe6eAewd3eFhZPzdRbJ0PXzGAewGAe6eAewdfBiGAewGAe6eAewdbe7Tce7T7L7TceWlfeygNs7Tce7T7L7TceigR3JgZjyg9u6l9CW09uFgEjWeAewGAe6eAewd7kz4N46hfHJ0PXzGAewGAe6eAewQZbz4xXigR3F<NkitRpzlE0FgEHFgR0WQNCFSAewGAe6eAewQZbzPZoih7P7Tce7T7L7TceWlbbWQAPwHcPw4wPwH7Hz0fbW4N*W<7bF0JP7Tce7T7L7TceFlfj6QNjJ0feqSAewGAe6eAewQJPJNfBFh7ZFgRpiSAewGAe6eAewd7PWhfPWtRZSAR76gZHFhZB7Tce7T7L7TceWQfxJgfBJ<kPF0PbSlfEAtPBJ0fC6gZHFhZB7Tce7T7L7TceWlfj6h3*6QN4FlAPwHcPw4wPwH7tFg7ryhR1FhRfWlfeTgf4yg<PwHcPw4wPwH7Hz0fbW49eygJpz4pXygEPF<N4SgEjFh7PWtR1WQ9kW1wPwHcPw4wPwH7HWQfbJ0f3JgZjyg9uTQ9uilAPwHcPw4wPwH7UzlPu6gR7zdRPWQfBJ<Jeztf*7Tce7T7L7Tcez0fbJQf3F<PuJ0feFhZjRt7XJh2PwHcPw4wPwH7kW0RbJ0f3F<PuJ0feFhZjRt7XJh3B7Tce7T7L7TceF0f*WQfHihRPFN7PW0xbilf7zPfSTGAewGAe6eAewQRPW17PilNjFgRfA4EAzkfSTIAewGAe6eAewQJPJ<PuWtRbz0xPFN7Pz0NjFgR3W13B7Tce7T7L7TceFlfjSgEjFh7PWtR1WQ9kW<N46hfHJ0PXz4RbJ0<PwHcPw4wPwH7eFgJpWtRPWP3eztRXil9sS0NuF0xPWGAewGAe6eAewdfuWQfdyhZjFh76WQ9jzlZXz<bbzQRsFhcPwHcPZA6PZj6Pw4wPwH7*7Tce7TZ37TfI7TJI7TcezQNCFSAewGAB6SAewP3<RGAewNFpFhJPWGAewGAtRIAe6eAt6GAewQEbzgAPwHcPwj<PwH7Ly17XzgAPwH36R<iPwH3gygftFhcPwHcPZj6Pw4wPZjcPwH7uigkP7Tce7TZ37Tce6lbezlkpJgjPwH36R<iPwH3gygftFhcPwHcPZj6Pw4wPZjcPwH7uigkP7Tce7TZ37TceTgPHWQ9BzlFj7Tc*RgRdFSAewN3<RGAewNFpFhJPWGAewGAtRIAe6eAt6GAewQEbzgAPwHcPwj<PwH7hFg7vyh6PwH3GJgPsJIkpzGAewN3<RGAewGAtRIAkRIAe6eAewdWPwHcPwj<PZjcPwH74FhFpilf6yhbPzN7bJ0PX7Tce7TZ3wSAe6eAewdZHWQfPzPRXWIAewGAB6T2Pw4wPwH7Bit7PFgEwFgFj7Tce7TZ3wIAtRIAe6eAewdwPwHcPwj<PZjcPwH7bJQNpz<bPygJoJIAewGAB6T<*wBcPw4wPwH7bJQNpzNJpF1Ro7Tce7TZ3wT4ewIAe6eAewQZXz09eR0f*J0aPwHcPwj<eZIAe6eAewQbPygJoJIAewGAB6T<*OL2Pw4wPwH7tygRjyIAewGAB6T<EwH2Pw4wPwH7*yhbPz<RPW1Ro7Tce7TZ3wH6PZj6Pw4wPwH7BieAewGAB6SAt6GAew4NHJ0PlFA7XWQRPWGAewGAB6SAewd7diGa*7T7L7Tc*wIAe6eAewL2p7Tce7T7L7Tce6gZjyhFP6lN*J0PXzGAewGAB6SAewd7diGa*7T7L7Tc*wIAe6eAewL2p7Tce7T7L7Tce6h3*fl9eytZ*igZP7Tce7TZ37TceWQJGKLckZSAe6eAewLckZSAe6eAewLckZS4PwHcPw4wPwH7IigZrFt7XJgE47Tce7TZ37TceWQJGKLckZSAe6eAewLckZSAe6eAewLckZS4PwHcPw4wPwH7IJhRjzlE0igZP7Tce7TZ37TceWQJGKLcjwIAe6eAewLcjwIAe6eAewLcjwI4PwHcPw4wPwH7IJhRjzlEcygJoz0Pdy16PwHcPwj<PwH7eFlcowH6*7T7L7Tc*wH6*7T7L7Tc*wH6*KSAewGAe6eAew47kJ1RXzPZoigRXJeAewGAB6SAewd7diGaeZL2Pw4wPwH2eZL2Pw4wPwH2eZL2p7Tce7T7L7Tce6dfjJ09uf0fDJIAewGAB6SAewd7diGa*7T7L7Tc*wIAe6eAewL2p7Tce7T7L7Tce6lN*J0PXzPRPq16PwHcPwj<PwH7eFlcowIAe6eAewL2Pw4wPwH2*KSAewGAe6eAew4JeihPAFhbj7Tce7TZ37TceWQJGKL<*OSAe6eAewL<*OSAe6eAewL<*OS4PwHcPw4wPwH7cygJoz0Pdy16PwHcPwj<PwH7eFlcowIAe6eAewL<ewIAe6eAewLcxZS4PwHcPw4wPwH7cygJoz0Pdy1RAFhbj7Tce7TZ37TceWQJGKLckZSAe6eAewLckZSAe6eAewLckZS4PwHcPw4wPwH77zQNHJ0PlFA7XWQRPWGAewGAB6SAewd7diGa*7T7L7Tc*wIAe6eAewL2p7Tce7T7L7TceSgEbitRpJQfLih3jyg9u7Tce7TZ37TceWQJGKLckZSAe6eAewLckZSAe6eAewLckZS4PwHcPw4wPwH77zQNHJ0PlFAZbW1RpzlEAFhbj7Tce7TZ37TceWQJGKL<eOIAe6eAewL<eOIAe6eAewL<eOI4PwHcPw4wPwH77zQFX6QNHylJeztfuFIAewGAB6SAewd7diGaeZTAPw4wPwH2eZTAPw4wPwH2eZTAp7Tce7T7L7TceSgEQzkRPq16PwHcPwj<PwH7eFlcowIAe6eAewL2Pw4wPwH2*KSAewGAe6eAew4kPzdAPwHcPwj<PwH7eFlcowHAk7T7L7Tc*wHAk7T7L7Tc*wHAkKSAewGAe6eAew4kPzdfAFhbj7Tce7TZ37TceWQJGKL2Pw4wPwH2*7T7L7Tc*wI4PwHcPw4wPwH7Tit7Xz0xGihcPwHcPwj<PwH7eFlcowHAk7T7L7Tc*wHAk7T7L7Tc*wHAkKSAewGAe6eAewPRoWQfPR<RbWQCTy0N4ztWPwHcPwj<PwH7eFlcowIAe6eAewL2Pw4wPwH2*KSAewGAe6eAewPRoWQfPR<FbilAPwHcPwj<PwH7eFlcowH6*7T7L7Tc*wH6*7T7L7Tc*wH6*KSAewGAe6eAewPRoWQfPR<bpFlbsygJoJIAewGAB6SAewd7diGa*7T7L7Tc*wIAe6eAewL2p7Tce7T7L7Tcef0beFgf<T0Pdy1RTy0N4ztWPwHcPwj<PwH7eFlcowIAe6eAewL2Pw4wPwH2*KSAewGAe6eAewPRoWQfPRNZoigRXJeAewGAB6SAewd7diGa*7T7L7Tc*wIAe6eAewL2p7Tce7T7L7TceflPuF09t7Tce7TZ37TceWQJGKLckZSAe6eAewLckZSAe6eAewLckZS4PwHcPw4wPwH7hygE4ztJ0WQNCFSAewGAB6SAewd7diGa*7T7L7Tc*wIAe6eAewL2p7Tce7T7L7TceflPuF09tf0fDJIAewGAB6SAewd7diGa*7T7L7Tc*wIAe6eAewL2p7Tce7TJ<7T7L7TceWtwPwHcPwj<PZjcPwH7Hzl9rygAPwHcPwjNjWdfP7T7L7Tcez09HigxTJ09eigJP7Tce7TZ3J17kFSAe6eAewdZPWtZpzlETJ09eigJP7Tce7TZ3J17kFSAe6eAewQJszl7bzNZjzt7bFlAPwHcPwjNQigxBFSAe6eAewQPuF0fDFgR<6GAewGAB6hReJgAPZj6Pw4wPwH7jqGAewGAB6SjjOL2Pw4wPwH7syg*PwHcPwj<PwHcPwHcPw4wPwH7tyg*PwHcPwj<PwHcPwHcPw4wPwH7tySAewGAB6SAt6GAewQ9t7Tce7TZ3wT4ewIAe6eAewQ9o7Tce7TZ3wT2BwGAe6eAewQPt7Tce7TZ3wT4ewIAe6eAewQPo7Tce7TZ3OT<x7T7L7TceFhRu7Tce7TZ37Tce7TfIzl7UFgZj7Tc*RhbjFh7uig*PZA6PwHcPZj6PZj6/',
            "adef7126-2bb8-4b3d-bdee-dd96cbaa2d68": 'a=7TJI7TceW0Pu7Tce7TZ37Tce7Tce7T7L7TcezlP47Tce7TZ37Tce7Tce7T7L7TceiQPmSg6PwHcPwj<PwH7gSf7AfANwvf7N6jb3A4JN7Tce7T7L7TceFQwPwHcPwj<PwHcjRkbFfjFc6AkNZNNIAP3NSkfARLR5w4F5ZARyRjDtSjE6wP7RZkP0Rjbf6AJLAjsjfPNIT<bvTjjBfkp1S<<jT<xcRP3LS<JLZ4xRSf2kALZRSHFfTP2lfP<PwHcPw4wPwH7CzlRP7Tce7TZ37TceWtReygZj7Tce7T7L7TceWIAewGAB6SAewdwPwHcPw4wPwH7QWIAewGAB6SAewH2xwTWEwT6xigwjFgweili*igRQwLclFL<jZl<tZBRH7Tce7T7L7TceitREW0APwHcPwj<x7T7L7TceJGAewGAB6SAewH6uwGDDvH2PwHcPw4wPwH7*JGAewGAB6SAewH2ehlkjhBfwg<CVZH2lZTwEZB2kOL4PwHcPw4wPwH7Q7Tce7TZ37TceweAewGAe6eAewdwPwHcPwj<PwHcDilcligZ4Z0<kZHb4ig7bFgixiQiDw0wlOT6jwl6ewIAewGAe6eAewQ8PwHcPwj<PwH7eFgZoih7dFSECvQp4vQZXzSAeRQ9eF0feR0fjigPs7Tce7T7L7TceWhwPwHcPwj<PwH7XWQRPW4P47TZ<wB2EOLA*ZT2jZBij7TclWlfeJQPHFfREW0APwj6B7TclWl9kWQZP7TZ<ZL<PwHcPw4wPwH7UWkRr7Tce7TZ37TceyQR4wLwjRkbFfjFc6AkNZNNIAP3NSkfARLR5w4F5ZARyRjDtSjE6wP7RZkP0Rjbf6AJLAjsjfPNIT<bvTjjBfkp1S<<jT<xcRP3LS<JLZ4xRSf2kALZRSHFfTP2lfPN36AN3TfFLf<7hg<ZF6AN36AN<TPZZ6jAefjPZRN7gAfaPwHcPw4wPwH7xySAewGAB6SAewGAewGAtR2/&d=7TJI7TceJ1wPwHcPwj<PZjcPwH74FhFpilfAygkP7Tce7TZ3wTWBOTaxwLcjOTaEOSAe6eAewQRPJQPHFAfuFNRpzgAPwHcPwj<xZBwEOL<*wH6EOTcB7TJ<7T7L7Tceil<PwHcPwj<PZjcPwH7jF<bbWlaPwHcPwj<PwHceZHixZBWtwTPQOL4xOTFQwBceiTWtFQ6kZLfbwHJGZIAewGAe6eAewQZXzdRPq1ROigkP7Tce7TZ37TceJlfGFl*Pw4ZPq13PWQPCFgEjig*CJlfGFl*PwHcPw4wPwH7tFg7dz1FPWdZpzlDPwHcPwj<PwH7hFg71TIAewL<uwIAewIb5W0fuRj*PwH3NAeAewLcuwIAew<ZoWQ9CyhfCKSAewGAe6eAewdZoigRpzQJwfGAewGAB6SAewPJPi4Jw7Tc*RjxTTIAew<fT7Tc*wSD*7Tc*K<9*FgE1TIAew<fT7Tc*RjxTTIAew<fT7Tc*wSD*7Tc*6lbezlkpJgjp7Tce7T7L7TceJQfuF09e7Tce7TZ37TceflfGSlPj7Tce7T7L7TceWQfuF0feFhcPwHcPwj<PwH7hFg7vyh6PwH3hFg71TIAewGAe6eAewQfDJ0fuWlPXzdwPwHcPwj<PZAcPwH73T4JwRf9pzdZjigEHFgRVih7eihPB7Tce7T7L7TceRfbAhl7sFgE4hlkpzQkbqIAewGAe6eAew4fifN9Hz0P*hlZXzdRezl*PwHcPw4wPwH7NgNRVil9szt7VidfQFQfehlbbz0FVFQxXih6PwHcPw4wPwH7NgNRVF0f*J0bVilxbzh2PwHcPw4wPwH7NgNRVF0PByQ9pzdRVJ0PCFh7VWhfPWd4PwHcPw4wPwH7NgNRVFQxXihRViQxPzQ6PwHcPw4wPwH7NgNRVFd7bFk94Fh3jyIAewGAe6eAew4fifN9*zlxEFl9uhl9QFdZPJN9Hz0NCWIAewGAe6eAew4fifN9By0N4Fh7VJ0fDJ1feFf9szl6PwHcPw4wPwH7NgNRVJ0fDJ1feFf9Hzlk*WQfBWlPXzP9GW1RH7Tce7T7L7TceRfbAhtRPq1RkWQfVil9CW17PWtZpzlEVWQJjieAewGAe6eAew4fifN9jFhbjJh7PhlFpz1RPWP9bzQPBztRezt3pieAewGAe6eAew4fifN9jFhbjJh7PhlkpWd7XWP9Hz0NCWN9jzk9PF0JP7Tce7T7L7TceRfbAhtZSRjcPwHcPw4wPwH7vSN7VW0NeigxsFgxVWlbbF0fehlZXzh3pz0APwHcPw4wPwH75RfZVFgxPzgfuJN9pzQRPqN9kygEj7Tce7T7L7TceTjfThlFGzk9eFgE4Fh7VzgP*zgN*7Tce7T7L7TceTjfThtZjigE4ih74hlRPWQPlihRpJQfB7Tce7T7L7TceTjfThtRPq1RkWQfVFQxXih6PwHcPw4wPwH75RfZVJ0fDJ1feFf9Qz09bJN9sygEPihcPwHcPw4wPwH75RfZVJ0fDJ1feFf9oigxQhlFszlNj7Tce7T7L7TceTjfThtRPq1RkWQfVy0NsFP9Qz09bJN9sygEPihcPwHcPw4wPwH75RfZVJQfeJ0fDhlNeWQNEhl9GyQfHJIAewGAe6eAewPJN64Jwhl7sFgE4hlFkzQZVFhbjFgE4Fg6PwHcPw4wPwH7hRA71TN9HzlxXWP9GJgFQFh7VFQxXih6PwHcPw4wPwH7hRA71TN9Hzlk*WQfBWlf4htRPq1RkWQfVWBZjieAewGAe6eAewPJN64JwhlZXzh3eFhZBFgRVJ0fDJ1feFf9BwtRHhtZeFlcPwHcPw4wPwH7hRA71TN94Fg7kFk9eFgE4Fh7PWP9pzQFX7Tce7T7L7TcefjfIRjxVF0fGJgJVWlbbF0feWeAewGAe6eAewPJN64JwhlRPW1RohtRPq1RkWQAPwHcPw4wPwH7hRA71TN94WQNthl7kFQFPWdwPwHcPw4wPwH7hRA71TN9sztZPhlZXzdRPq16PwHcPw4wPwH7hRA71TN9CJgxjyf94WQNt7Tce7T7L7TcefjfIRjxVW09sqgJXzP9CzlRP7Tce7Tf<7T7L7TceJtfl7Tce7TZ37TceRl9XFlxP7Tc*SgEHvGAewIb7zdRPzI4PwHcPw4wPwH7tJhcPwHcPwj<PwH73T4JwRSAewIb7zdRPzIAe6eAew<PuJ0fsKNcp7Tc*fAb<7Tc*Rt7bW0bpitwPwH2ow1a*wL2*OA73ZI4PwH3<yh7Pit6BRL<x7Tc*JdZVZf8*7Tc*W1ZVZf8*7T7L7Tc*RLZ<wT<p7Tce7TJ<7T7L7TcezSAewGAB6SAt6GAewQZXzh3bJ<kXF0APwHcPwj<PwH7LAkwx6l9CW0Nj7Tce7TJ<7T7L7TcezGAewGAB6SAt6GAewdFPzQRXWPZkiGAewGAB6SAewGAewGAe6eAewd3ezlRkitRTJgcPwHcPwj<PwHcewL2BwL<*ZeAewGAe6eAewdFPzQRXWGAewGAB6SAew4JXzlJsFSAew<PuieDPwHcPw4wPwH7CihbAztfHyN3XygEjWeAewGAB6T2Pw4wPwH7*F0FgygftFh7NzQNGz0f47Tce7TZ3J17kFSAe6eAewQbbWQRtih7P6l9uitfeWQfuit4PwHcPwj<D7T7L7Tceil9XylPPRgEbiQxPFIAewGAB6hReJgAPw4wPwH7bW13LzlRPTQNCFSAewGAB6SAew4kXqQPsz0<PwHcPw4wPwH7bW13OigkP7Tce7TZ37TceTQfjWlZbW0APwHcPw4wPwH7bW13gFh7Byg9u7Tce7TZ37TceZSD*7Tc*KNJpzQRXJtwPwH3OfIAewL<*vH2PwjcPwH3hygDlZIAB6GAew1alZI4PwH33W13sFfJPi4CpJIAeRHABZeDBZGAewIbvSNRZTIAe6eAew0xpylAPwH31FgZrze4PwH3Ly17XzgAPw4ixwBwuwID*vH2PwH3TigFbWQ4Pw4ikwBWuwBiPwH3NF0WPw4ixwBwuwID*vH2PwHcPw4wPwH7*z0NjFQ9ezSAewGAB6SAewPJpzHwe7Tce7T7L7TceW17XF1fHJIAewGAB6SAew4JPilCX7Tce7T7L7TceJhZPW4NdFgEj7Tce7TZ37TceTg9mygxsiSAeRHAuwIAewIbhygE4ztJB7Tc*TP6PwH2xwID*7TZI7Tc*flPuZH6PwjcPwH3DZH6p7Tc*6h3*z0fhFg7vyh6Pw4ikwBWuwBiPwH2oSjbATA*Pw4wPwH3sygCP7Tc*RlfHyl8p7Tc*6lbezlkP7T70wTwBvH2uwID*7Tc*AlNQih7p7T70ZTwtvHwl7Tc*RgRd7T70wTwBvH2uwID*7Tce7T7L7Tcez0NuFtfbFlAPwHcPwj<PwH7myIkLTGAewGAe6eAewQ9uT0PuFSAewGAB6hReJgAPw4wPwH7tFg74WQPlFhcPwHcPwjNQigxBFSAe6eAewQpbJQNNzQNGz0f47Tce7TZ3FQNsWlAPw4wPwH74Fh3eFgZbJ0f4Adfu6gR3JgZjyg9uRgEQzt7HFhZv6gEXzdPCyhRE7Tce7TZ3FQNsWlAPw4wPwH74FhFpilfZFgkXWd4PwHcPwj<D7T7L7TceFgEkzgfeihRpzlE5WQRPWGAewGAB6SAk6GAewdFPzQRXWPZkiGAewGAe6eAewd3ezlRkitRTJgcPwHcPw4wPwH7lFgE4ztcPwHcPw4wPwH7CihbAztfHyN3XygEjWeAewGAe6eAewdZHy0f4JgxpzQWPwHcPw4wPwH7kWlfe6gZjyhFbJ0PXzGAewGAe6eAewQRXTQ9jf17bilsPwHcPw4wPwH7dFg9szlZbJ0PXzGAewGAe6eAewQZXzQEPitRpzlDPwHcPw4wPwH7*z1fdygEB7Tce7T7L7TcezgPCFfREW0fB7Tce7T7L7TceW0RQfQPPJlfeRgEbiQxPFIAewGAe6eAewdJPiQCpJNRPzh3XWQNeqfZjzt7bFlAPwHcPw4wPwH7tFg7ryhR6Fh7ByhZjFgEjAtRXWQNdFSAewGAe6eAewdJpzQRXJjZXzdRezlxBTtFPWQxbqSAewGAe6eAewQbbWQRtih7P6l9uitfeWQfuit4PwHcPw4wPwH7Hzl9rygfNzQNGz0f47Tce7T7L7Tceih3*6l94FAEbzgAPwHcPw4wPwH7bW13OigkP7Tce7T7L7Tceih3*fQfeWlPXzGAewGAe6eAewd3sihRQzt7C7Tce7T7L7TceW17XF1fHJIAewGAe6eAewdfBFh73FlfuJIAewGAe6eAewQxbzQJkigJP7Tce7T7L7Tcez0NuFtfbFlfB7Tce7T7L7TcezlEwygEP7Tce7T7L7TceJlfGF17pJQfe7Tce7T7L7TceFlfjRlNCFh3bF1wPwHcPw4wPwH7UihFbRgEbiQxPFIAewGAe6eAewdZPzQRIFgNHzlDPwHcPw4wPwH7lyg7eihRP7Tce7T7L7TceF0f*WQfHihRPFN7kz4N46hfHJ0PXz4fuFQ9eilfBSjNuzlEEzgPjqSAewGAe6eAewd3eztRPitRPF<NkF0PPzQZP7Tce7T7L7TceiQxkFhRXztRo7Tce7T7L7TceWtRXWQNdFA7kilCPJ1wPwHcPw4wPwH7Hz0P*iQ9bWQ6PwHcPw4wPwH7HWQf4FgEjygNsWeAewGAe6eAewQCPqg7Xih747Tce7T7L7TcezgNuigJPFIAewGAe6eAewQkPF0PbR0flygZPWeAewGAe6eAewdZjzt7bFlAPwHcPw4wPwH7BFh7lygZPfl9eylfe7Tce7T7L7TceJQPeJ1fbz<CPqg7Xih747Tce7T7L7TceJlNrFAxXilsPwHcPw4wPwH74FhFpilfZFgkXWd4PwHcPw4wPwH7kWlfe6gJPzdR<ihRb7Tce7T7L7Tcez09dygDPwHcPw4wPwH7pzQsPwHcPw4wPwH7CFgRpiAZbW0NGygxpJ0PPWeAewGAe6eAewQRPJQPHFf3XWtRkWQAPwHcPw4wPwH7oyg6PwHcPw4wPwH7szlZrWeAewGAe6eAewQJ*JSAewGAe6eAewQkPF0PbAlfBWlPXzGAewGAe6eAewd3PWQkpWtZpzlEB7Tce7T7L7TceW17PWlfuJ0Njyg9u7Tce7T7L7TceJhZG7Tce7T7L7Tceq1cPwHcPw4wPwH7BFh7pig*PwHcPw4wPwH7bF<NkitRpzlELzlk*zlEPzdRB7Tce7T7L7TceWdfu6gR3JgZjyg9u7Tce7T7L7TceilNuT09bF<N46hfHJ0PXz4FPzQZPF<FeigkP7Tce7T7L7TceilNuAlbbWQAPwHcPw4wPwH7By0NeFSAewGAe6eAewQZsFgNe6h3*6QN4FlAPwHcPw4wPwH7dFhRIihRjFh7E7Tce7T7L7TceFlfjfhZPW4kPF0Pb7Tce7T7L7TceWQfxJgfBJ<k7R<P3ilZPWtwPwHcPw4wPwH7eFhNkFhZjTgf4ygNvFhPTqhZjFgk3ilZPWtwPwHcPw4wPwH7BFhR3W13IigRdFSAewGAe6eAewdJPiQCpJ<JPJNfBFh7ZFgRpiSAewGAe6eAewQZsFgNeTt7pFlPuSQ9pzQf46gR7zdRPWQfBJ<Jeztf*WeAewGAe6eAewQZeFgNjFANkitRpzlEOzlEHFSAewGAe6eAewQpXygE3F<PuJ0feFhZjRt7XJh2PwHcPw4wPwH7sFgNlFAN4SgEjFh7PWtR1WQ9kWIAewGAe6eAewdf*F0NjFAN4SgEjFh7PWtR1WQ9kW1wPwHcPw4wPwH74Fh3eFgZbJ0f4AQf*z0NHFAPuff7O7Tce7T7L7TceF0f*WQfHihRPFNfSTPRXff7w7Tce7T7L7TceFlfjSgEBJ0Nsz0f4AQfsihRPF<N*W1wPwHcPw4wPwH7dFhR7zdRPWQfBJ<Jeztf*6gR3JgZjyg9uR0NjiSAewGAe6eAewd7PFlPBJ0feA17XJ09HzlxcigE4z0fe7Tce7T7L7TceJgEeFgJpWtRPWP3eztRXil9sS0NuF0xPWGAewGAkRIAtRIAe6eAewd2PwHcPwj<PZAcPZjcPwH7uigkP7Tce7TZ37TceA<R07Tc*fQPPJlfe7Tce7TJ<7T7L7TJI7TcezQNCFSAewGAB6SAew4ZoWQ9CFSAewN3<RGAewNFpFhJPWGAewGAtRIAe6eAt6GAewQEbzgAPwHcPwj<PwH7Ly17XzgPkzSAewN3<RGAewNFpFhJPWGAewGAtRIAe6eAt6GAewQEbzgAPwHcPwj<PwH7ZygZeztZXFd6PwH3NF0JP7Tc*A<R07Tc*fQPPJlfe7Tce7TJ<7T7L7TJI7TcezQNCFSAewGAB6SAewPJPi4CpJIAew07kygxjvgPu7Tc*A<R07Tce7TJ<7Tf<7T7L7TceJeAewGAB6SAt6GAewQRPJQPHFf3pq0fsAQNjyg8PwHcPwj<x7T7L7TceWlZeFgfuf09*7Tce7TZ3wIAe6eAewdZHWQfPz4xPFd6PwHcPwj<*7TJ<7T7L7TceWeAewGAB6SAt6GAewQNligPsS0fpFlbj7Tce7TZ3wT2BwGAe6eAewQNligPsflP4J0aPwHcPwj<xOTc*7T7L7Tceil9szt7<Fh3jyIAewGAB6Tcj7T7L7Tcey0fpFlbj7Tce7TZ3wT2DwIAe6eAewdJpF1Ro7Tce7TZ3wT4ewIAe6eAewd3pq0fsR0f*J0aPwHcPwj<eZIAtRIAe6eAewdZH7Tce7TZ37TJI7TJ<7T7L7TceWtwPwHcPwj<PZjcPwH7Hzl9rygAPwHcPwjNjWdfP7T7L7Tcez09HigxTJ09eigJP7Tce7TZ3J17kFSAe6eAewdZPWtZpzlETJ09eigJP7Tce7TZ3J17kFSAe6eAewQJszl7bzNZjzt7bFlAPwHcPwjNQigxBFSAe6eAewQPuF0fDFgR<6GAewGAB6hReJgAPZj6Pw4wPwH7jqGAewGAB6SjjOL2Pw4wPwH7syg*PwHcPwj<PwHcPwHcPw4wPwH7tyg*PwHcPwj<PwHcPwHcPw4wPwH7tySAewGAB6SAt6GAewQ9t7Tce7TZ3wT4ewIAe6eAewQ9o7Tce7TZ3wT2BwGAe6eAewQPt7Tce7TZ3wT4xwGAe6eAewQPo7Tce7TZ3OLWt7T7L7TceFhRu7Tce7TZ37Tce7TfIzl7UFgZj7Tc*RhbjFh7uig*PZA6PwHcPZj6PZj6/',
        }
        response = self.get_response(url=url, data=json_dict[device["base"]["deviceId"]])
        resp_json = response.json()
        self.eid = resp_json["data"]["eid"]
        self.eid_token = resp_json["data"]["token"]

    @staticmethod
    def decrypt_des(encrypted_data: str, key: str, mode: str = 'ECB') -> Union[dict, None]:
        """
        DES解密并解析JSON，支持多种模式

        Args:
            encrypted_data: 加密的数据
            key: 解密密钥
            mode: 加密模式 ('ECB', 'CBC', 等)

        Returns:
            解密并解析后的字典数据，如果失败返回None
        """
        try:
            # 确保key长度为8字节
            key = key.encode('utf-8')[:8].ljust(8, b'\0')

            # base64解码
            encrypted_bytes = base64.b64decode(encrypted_data)

            if mode == 'ECB':
                cipher = DES.new(key, DES.MODE_ECB)
            elif mode == 'CBC':
                # 如果使用CBC模式，需要IV
                iv = b'\0' * 8  # 替换为实际的IV
                cipher = DES.new(key, DES.MODE_CBC, iv)
            else:
                raise ValueError(f"Unsupported mode: {mode}")

            # 解密数据
            decrypted_data = cipher.decrypt(encrypted_bytes)

            # 使用PKCS7 unpadding
            decrypted_data = unpad(decrypted_data, DES.block_size)

            # 转换为文本
            decrypted_text = decrypted_data.decode('utf-8')

            # 解析JSON
            return json.loads(decrypted_text)
        except Exception as e:
            print(f"Decryption error: {str(e)}")
            return None
