import { axiosInstance } from "../Helper";

export const getCityList = async () => {
    return await axiosInstance.get("/Cities/GetCityList").then((resp) => {

        const arr = resp.data.entities?.map(item => {
            return {
                seoUrl: item.seoUrl.split("/")[2],
                cityName: item.ilAdi
            }
        });
        return {
            hasError: false,
            data: arr,
            errorList: null
        };
    }).catch(err => {
        return {
            hasError: true,
            data: null,
            errorList: err.response != null ? err.response.data.errorList : new Array(err.message)
        }
    });
}