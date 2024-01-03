
async function getPopularProduc(){
    const response = await fetch('http://localhost:3000/barang?pageSize=3&page=1&order=total_dibeli:DESC');
    const data = await response.json();
    
    return data;
}