async function login(data){
    try{
        const response = await fetch('http://localhost:3000/auth/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if(result.status == 200){
            localStorage.setItem('token',result.access_token);
            alert("Login berhasil");
            window.location.href = "http://localhost:5500/index.html";
        }else{
            alert(result.message);
        }
        return result;
    }catch(err){
        alert("gagal terhubung ke server");
    }
}

async function checkLogin(){
    try{
        const response = await fetch('http://localhost:3000/auth/profile',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token')
            }
        });
        const result = await response.json();
        if(!result.level){
            alert("Anda tidak memiliki akses ke halaman ini");
            window.location.href = "http://localhost:5500/login.html";
        }
    }catch(err){
        alert("gagal terhubung ke server");
    }
}

async function getPopularProduc(){
    try{
        const response = await fetch('http://localhost:3000/barang?pageSize=3&page=1&order=total_dibeli:DESC');
        const data = await response.json();
        return data;
    }catch(err){
        alert(err);
    }
}