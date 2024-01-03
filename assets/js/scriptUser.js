
async function loginPengguna(){
    let data = {
        email: await document.getElementById('email').value,
        password: await document.getElementById('password').value
    }
    let response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    let result = await response.json();
    if(result.status == 200){
        localStorage.setItem('token', result.access_token);
        window.location.href = 'http://localhost:5500/pengguna/profil.html';
    }else{
        alert(result.message);
    }
}

async function checkLogin(){
    let token = localStorage.getItem('token');
    let response = await fetch('http://localhost:3000/auth/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    let result = await response.json();
    if(result.statusCode == 401){
        alert('Anda belum login');
        window.location.href = 'http://localhost:5500/pengguna/loginPengguna.html';
    }
}