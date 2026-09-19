import {propertyDetailsActions} from "./propertyDetails-slice";
import {axiosInstance} from '../../utils/axios';

//fetch details of specific property using its id
//recive propertyId as parameter
//start loading
//call backend api
//wait for response
//get the property data
//store the data in redux store
//if error store error in redux


export const getPropertyDetails = (id) => async (dispatch) => {
    try {
        dispatch(propertyDetailsActions.getListRequest());
        const response = await axiosInstance.get(`v1/rent/listing/${id}`)
        console.log(response);
        if(!response){
            throw new Error('could not fetch any property details')
        }
        const property = response.data?.data || response.data;
        dispatch(propertyDetailsActions.getPropertyDetails(property));
    }catch (error) {
        dispatch(propertyDetailsActions.getErrors(error.response?.data?.message || error.response?.data?.error || error.message))
    }   
}