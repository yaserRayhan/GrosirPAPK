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

async function getBarangByCaregory(category){
    try{
        const response = await fetch('http://localhost:3000/barang?kategori='+category);
        const data = await response.json();
        return data;
    }catch(err){
        alert(err);
    }
}

async function getCart(){
    try{
        const response = await fetch('http://localhost:3000/cart',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token')
            },
        });
        const data = await response.json();
        console.log(data);
        return data;
    }catch(err){
        alert(err);
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

async function bayar(noRekening, namaRekening, buktiPembayaran){
    try{
        const response = await fetch('http://localhost:3000/transaksi/pembelian',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token')
            },
            body: JSON.stringify({
                no_rekening_pembayar: noRekening,
                nama_pembayar: namaRekening,
                bukti_pembayaran: buktiPembayaran
            })
        });
        const result = await response.json();
        if(result?.transaksi?.id){
            alert("Pembayaran berhasil");
            window.location.href = "http://localhost:5500/index.html";
        }else{
            alert("Pembayaran gagal");
        }
        return result;
    }catch(err){
        alert("gagal terhubung ke server");
    }
}