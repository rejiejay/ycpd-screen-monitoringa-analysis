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
 * @param {string} endTime 结束时间 2019-02-16 15:13:54
 */
export function getDotService() {
    let beginTime = '2019-02-15 14:00:00'; // 测试数据
    let endTime = '2019-02-16 14:00:00'; // 测试数据
    // let beginTime = TimeConver.dateToYYYYmmDDhhMM(new Date());
    // let endTime = TimeConver.dateToYYYYmmDDhhMM(new Date(new Date().getTime() + (1000 * 60 * 10)));
    return axios({
        url: `${config.url.origin}/baseapi/Public/GetDotService?beginTime=${encodeURIComponent(beginTime)}&endTime=${encodeURIComponent(endTime)}`,
        method: 'get'
    });
}
