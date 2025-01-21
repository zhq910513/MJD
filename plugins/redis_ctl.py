# -*- coding: utf-8 -*-

import json
import logging

import redis

from settings import *


class RedisCtrl(redis.Redis):
    """操作redis基础类"""

    def __init__(self, host=REDIS_HOST, port=REDIS_PORT, password=REDIS_PASS, db=REDIS_DB):
        super().__init__(host=host, port=port, db=db, password=password)

    def pop_list(self, key, size):
        """
        :param key:
        :param size: int
        :return: 从_key中pop出指定数量的值
        """
        try:
            vals = []
            for _ in range(size):
                if _pop := self.lpop(key):
                    vals.append(_pop.decode())
            return vals
        except Exception as e:
            logging.error(f"redis读取失败：{e}")

    def copy_all(self, source_key, target_key):
        """
        :param source_key:
        :param target_key:
        :return: 备份redis数据，从source_key备份到target_key
        """
        try:
            vals = self.lrange(source_key, 0, -1)
            self.delete(target_key)
            for val in vals:
                self.rpush(target_key, val)
        except Exception as e:
            logging.error(f"redis复制失败：{e}")

    def lpop_zset(self, key):
        '''
        zset 取出优先级最高的一个
        @param key:
        @param lock_key:
        @return:
        '''
        pipe = self.pipeline()
        pipe.multi()
        pipe.zrange(key, 0, 0).zremrangebyrank(key, 0, 0)
        results, count = pipe.execute()
        if results:
            return json.loads(results[0])


if __name__ == "__main__":
    with RedisCtrl() as redis_client:
        redis_client.set('name', 'zhq')
        name = redis_client.get('name')
        print(name.decode('utf-8'))
