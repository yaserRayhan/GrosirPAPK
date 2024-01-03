
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
            window.location.href = "http://localhost:5500/admin/produk.html";
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
        if(result.level != 'admin'){
            alert("Anda tidak memiliki akses ke halaman ini");
            window.location.href = "http://localhost:5500/";
        }
    }catch(err){
        alert("gagal terhubung ke server");
    }
}

async function getAllProduk(){
    try{
        const response = await fetch('http://localhost:3000/barang');
        const data = await response.json();
        return data;
    }catch(err){
        alert(err);
    }
}

async function addProduk(data){
    try{
        const response = await fetch('http://localhost:3000/barang',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if(result.status == 200){
            // alert("Produk berhasil ditambahkan");
            window.location.href = "http://localhost:5500/admin/produk.html";
        }else{
            // alert(result.message);
        }
        return result;
    }catch(err){
        alert("gagal terhubung ke server");
    }
}

async function imageToBase64(file){
    return new Promise((resolve,reject)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

async function getProdukById(id){
    try{
        const response = await fetch(`http://localhost:3000/barang/${id}`);
        const data = await response.json();
        return data;
    }catch(err){
        alert(err);
    }

}

async function editProduk(id,data){
    try{
        const response = await fetch(`http://localhost:3000/barang/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if(result.affected){
            alert("Produk berhasil diedit");
        }else{
            alert("Produk gagal diedit");
        }
        return result;
    }catch(err){
        // alert("gagal terhubung ke server");
    }
}

async function deleteProduk(id){
    try{
        const response = await fetch(`http://localhost:3000/barang/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token')
            }
        });
        const result = await response.json();
        if(result.affected){
            alert("Produk berhasil dihapus");
        }else{
            alert("Produk gagal dihapus");
        }
        return result;
    }catch(err){
        alert("gagal terhubung ke server");
    }
}

async function logout(){
    localStorage.removeItem('token');
    alert("Logout berhasil");
    window.location.href = "http://localhost:5500/admin/login.html";
}

async function getPembayaran(){
    try{
        const response = await fetch('http://localhost:3000/transaksi',{
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('token'),
            },
        });
        const data = await response.json();
        return data;
    }catch(err){
        alert(err);
    }
}

async function getPembayaranById(id){
    try{
        const response= await fetch(`http://localhost:3000/transaksi/${id}`,{
            headers:{
                'Authorization': 'Bearer '+localStorage.getItem('token'),
            },
        });
        const data = await response.json();
        return data;
    }catch(err){
        alert(err);
    }
}

async function updatePembayaran(id){
    try{
        console.log(id);
        const response = await fetch(`http://localhost:3000/transaksi/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token'),
            },
            body: JSON.stringify({
                status: 'selesai'
            })
        });
        const result = await response.json();
        if(result.affected){
            alert("Pembayaran berhasil dikonfirmasi");
            window.location.reload();
        }else{
            alert("Pembayaran gagal dikonfirmasi");
        }
        return result;
    }catch(err){
        alert(err);
    }
}