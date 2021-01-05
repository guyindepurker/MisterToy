import axios from 'axios';

// AXIOS
export const uploadImg = async (ev) =>{
    // Defining our variables
    const UPLOAD_PRESET = 'iq3vux0y' // Insert yours
    const CLOUD_NAME = 'mstoysguy' // Insert yours
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const FORM_DATA = new FormData();
    // Building the request body
    FORM_DATA.append('file', ev.target.files[0])
    FORM_DATA.append('upload_preset',UPLOAD_PRESET)
    // Sending a post method request to Cloudniarys' API
    try {
        const res = await axios.post(UPLOAD_URL, FORM_DATA)
        return res.data;
    } catch(err) {
        console.error('ERROR!', err)
    }
}