import axiosClient from './AxiosClient';

class MainServices {
    public static getAccounts(data: any) {
        return axiosClient.post('/GetAccounts', { data: data });
    }

    public static createMultipleAccount(data: any[]) {
        return axiosClient.post('/CreateMulitpleAccount', { data: data });
    }

    public static openMultipleAccount(data: any[]) {
        return axiosClient.post('/OpenChrome', { data: data });
    }
}

export default MainServices;
