from curl_cffi import requests

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

params = {
    'g_ty': 'ajax',
}

json_data = {
    'version': '3.1',
    'fp': '5931396482503861',
    'appId': '303a7',
    'timestamp': 1739721433760,
    'platform': 'web',
    'expandParams': '5e2976855ec13d55dbffcc514b657c9ec71b38bcd7d88f101ff260cf6b8a04fae8a99396e1282784963bc1d386b5684f791a6c8710dd1f7a12f19689ea0c944cf5deb0e2f9242196f7d8e4fd5216f37b3d9fa8786e04aa0519c762c096bb2f35ca2fcd07201e8107f8a9c50674a879a0ceeaf92f45019082ac327d4f0956bf72a372ef93472dbeecabf9fe241da9c7921979762be6662fb02565255ca9d03a8d778e5847d5485d23e48546da1bd146704fb27cbe988b849e6e56f7cca22176b0dd62a3b248ec2e10ba40cb917b1ef66de5ba528d623f25d2d8de5c2303da4005acca86b40307500c6191a4bb705817ae8b64be4080abc73c19492abb0a50002444846d1992cd54d350c49791e95ae383fbcb05d679646ff062749637defa462622874f438ab7404298859f429a07b736265721f14b1e7889e35cc93be8d2b701f7370962d005cdd33a52f87fb15edc0913d1b5d26473e123bd76897d237454529d8fa3549325ba0d522ed962f58a8358f7be4b0a02cc22f6d9db37ad9e61d4b1cdddc498177d3bd6fcbf1bb99fe22c4473608dc8959885db19dc0f2de4e404c31748795228c001726f243f01e00dcb66e6c6c52fb7d082d4f6f113c4e4fdadab72f9f0cb2e8e8540ef309ba8256b02cca1ee090c96b918e04eb17cd551f05441461c6cef87cc1aa59af30f3ec64c23794fea541a248d793ce40813bb410e90948a7df2bdae9104518de13588de2d19002850dbc775cf031480acc263576a5ff914065b96ac548482176af4d7caa0cbfc8f465609c059e467f9a34fd14069490567ceb106766f42f5d2cf50b09306f4714338632aa94f47fb2c1f357bc674bc7415fa861fa4e59c771d68f74b2e89b50be6c3a14980a47f9fe73dac3de67a828066837ce22589c9e772d90113faad3e64acea746ba68c06eeeff1a6dbca12d98c15d9f63b59ca12979fa248cfa7b534c466b7f20e9bb4b42bdca4d7e033c2135804840bb45db120e34a0af0ac9d564e9e2967be657b00df1441e14d45db12600f72abb66dbd9b6d8aff63723ab46b0987c1684a1507841bde58eedebbefb50c14f807e16a4d0af6404bdfa90ba6e0bffa364a81824b416dbdde19e9ffa4cfd280949742237ee5545f4fb7788189ac4a86',
    'fv': 'v3.2.0',
}

response = requests.post('https://cactus.jd.com/request_algo', params=params, headers=headers, json=json_data)
print(response.json())
