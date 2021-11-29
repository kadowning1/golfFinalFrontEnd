import axios from 'axios';

export const axiosHelper = (
    {
        url,
        method,
        data,
        successMethod,
        failureMethod = e =>console.log(e)
    }) => {
    return axios({
        method,
        url,
        data,
    })
        .then(res => {
            console.log(res)
            successMethod(res.data)})
        .catch(er => failureMethod(er))
        ;
}