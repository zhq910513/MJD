# -*- coding: UTF-8 -*-
import inspect
import logging
import os
import time

from concurrent_log_handler import ConcurrentRotatingFileHandler

loggerList = dict()
logLevelHandlers = dict()
Level = logging.DEBUG
color = False

for level in [logging.DEBUG, logging.INFO, logging.WARNING, logging.FATAL, logging.ERROR]:
    logger = logging.getLogger(str(level))
    console = logging.StreamHandler()
    logger.addHandler(console)
    logger.setLevel(level)
    logger.propagate = False
    loggerList[level] = logger


def remove_handler():
    for k, v in loggerList.items():
        log = logging.getLogger(str(k))
        log.removeHandler(v)


def InitLogConfig(loglevel: int = logging.DEBUG, dev: bool = True, c: bool = False):
    global color
    color = c
    return InitLogConfigWithPrefix(loglevel, "", dev, c)


def InitLogConfigWithPrefix(loglevel: int = logging.DEBUG, filePrefix: str = "", dev: bool = True, c: bool = False):
    global loggerList, logLevelHandlers, Level, color
    isDebug = dev
    Level = loglevel
    color = c
    update = time.strftime("%Y-%m-%d", time.localtime())
    year, month, day = update.split('-')
    if not isDebug:
        if filePrefix:
            logFilePrefix = filePrefix + f"/log/{year}{month}/"
        else:
            logFilePrefix = os.getcwd() + f"/log/{year}{month}/"
        if not os.path.isdir(logFilePrefix):
            try:
                os.makedirs(logFilePrefix)
            except:
                pass
        remove_handler()
        logLevelHandlers[logging.INFO] = ConcurrentRotatingFileHandler(
            filename=logFilePrefix + f"info.log",
            maxBytes=10240000,
            backupCount=5,
            encoding='utf-8'
        )
        logLevelHandlers[logging.DEBUG] = ConcurrentRotatingFileHandler(
            filename=logFilePrefix + f"debug.log",
            maxBytes=10240000,
            backupCount=5,
            encoding='utf-8'
        )
        logLevelHandlers[logging.ERROR] = ConcurrentRotatingFileHandler(
            filename=logFilePrefix + f"error.log",
            maxBytes=10240000,
            backupCount=5,
            encoding='utf-8'
        )
        logLevelHandlers[logging.WARNING] = ConcurrentRotatingFileHandler(
            filename=logFilePrefix + f"warn.log",
            maxBytes=10240000,
            backupCount=5,
            encoding='utf-8'
        )
        logLevelHandlers[logging.FATAL] = ConcurrentRotatingFileHandler(
            filename=logFilePrefix + f"fatal.log",
            maxBytes=10240000,
            backupCount=5,
            encoding='utf-8'
        )
        for lv, handle in logLevelHandlers.items():
            temp = logging.getLogger(str(lv))
            temp.setLevel(lv)
            remove_stream(temp)
            temp.addHandler(handle)
            temp.propagate = False
            loggerList[lv] = temp


def remove_stream(log):
    new_handler = []
    for i in log.handlers:
        if not isinstance(i, logging.StreamHandler):
            new_handler.append(i)
    log.handlers = new_handler


def onTime():
    return time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())


def getLogger(lv, message):
    frame, filename, lineNo, functionName, code, unknownField = inspect.stack()[
        2]
    pyName = filename.split("/")[-1]
    msg = "[%s] %s [%s] %s %s:%s" % (
        lv, onTime(), functionName, message, pyName, lineNo)
    if color:
        colorDict = {
            "INFO": "\033[32m%s\033[0m",
            "DEBUG": "\033[37m%s\033[0m",
            "ERROR": "\033[31m%s\033[0m",
            "FATAL": "\033[36m%s\033[0m",
            "WARN": "\033[33m%s\033[0m",
        }
        return colorDict[lv] % msg
    else:
        return msg


def info(msg, *args, **kwargs):
    InitLogConfig(dev=False)
    if Level in [logging.INFO, logging.DEBUG]:
        message = getLogger("INFO", msg)
        loggerList[logging.INFO].info(message, *args, **kwargs)


def debug(msg, *args, **kwargs):
    InitLogConfig(dev=False)
    if Level == logging.DEBUG:
        message = getLogger("DEBUG", msg)
        loggerList[logging.DEBUG].debug(message, *args, **kwargs)


def error(msg, *args, **kwargs):
    InitLogConfig(dev=False)
    if Level in [logging.ERROR, logging.DEBUG]:
        message = getLogger("ERROR", msg)
        loggerList[logging.ERROR].error(message, *args, **kwargs)


def fatal(msg, *args, **kwargs):
    InitLogConfig(dev=False)
    if Level in [logging.FATAL, logging.DEBUG]:
        message = getLogger("FATAL", msg)
        loggerList[logging.FATAL].fatal(message, *args, **kwargs)


def warning(msg, *args, **kwargs):
    InitLogConfig(dev=False)
    if Level in [logging.WARNING, logging.DEBUG]:
        message = getLogger("WARN", msg)
        loggerList[logging.WARNING].fatal(message, *args, **kwargs)


log_info = info
log_warn = warning
log_error = error
log_cri = fatal
