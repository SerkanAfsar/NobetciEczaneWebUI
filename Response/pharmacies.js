import { axiosInstance } from "../Helper";

export const getPharmacyList = async (slug) => {
    return await axiosInstance.post(`/Pharmacies/PharmacyListBySlug`,
        {
            slugUrl: `/nobetci-eczaneler/${slug}`
        })
        .then(resp => {
            return {
                hasError: false,
                errorList: null,
                data: {
                    cityName: resp?.data?.entity?.city?.ilAdi,
                    pharmacyList: resp?.data?.entity?.pharmacies
                }
            }
        }).catch(err => {
            return {
                hasError: true,
                data: null,
                errorList: err.response != null ? err.response.data.errorList : new Array(err.message)
            }
        });
}