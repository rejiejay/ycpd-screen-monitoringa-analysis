import axios from 'axios';
// import { apibasics } from '@/components/apibasics';
import config from '@/config';

/**
 * 获取所有网点数据
 */
export function getDotData() {
    return axios({
        url: `${config.url.origin}/baseapi/Public/GetDotData`,
        method: 'get'
    });
}

/**
 * 获取网点服务动态数据
 * 开始时间和结束时间相差10分钟
 * @param {string} beginTime 开始时间 2019-02-15 15:13:54
 * @param {string} endTime 结束时间 2019-02-15 15:13:54
 */
export function getDotService(beginTime, endTime) {
    return axios({
        url: `${config.url.origin}/baseapi/Public/GetDotService?beginTime=${beginTime}&endTime=${endTime}`,
        method: 'get'
    });
}
