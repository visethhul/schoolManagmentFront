import axios from 'axios';
//const base_url='http://localhost:3001/';
export const ApiRequest = async (url, method, data= null) => {
  const baseURI = `http://localhost:3001`;
  try{
    const response = await axios({
      url: `${baseURI}/${url}`,
      method,
      data,
      //headers: {
      //  "Content-Type": "application/json",
      // },
    });
    return response.data
  }catch(error){
    if (error.response){
      //Server responded with a status other then 200 range
      console.error('Server responded with an error:',error.response);
    }else if (error.request){
      //Request was made but not response was received
      console.error('No response received',error.request);
    }else{
      console.error('Error',error.message);
    }
    

    
    throw error
    //response ? 
    //error.response.data : new Error('Network Error')
  }
};
