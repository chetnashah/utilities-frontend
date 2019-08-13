const baseUrl = (process.env.NODE_ENV === 'development') 
? 'http://localhost:3000' 
: "https://utilities.jayshah.co:3443";

module.exports ={
    baseUrl
};