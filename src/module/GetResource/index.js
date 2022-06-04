const BASE_URL = "http://124.221.249.219:8000/api"
async function GetResource(api){
    const url = BASE_URL+api 
    const response = await fetch(url)
    return response.json()
}
export default GetResource