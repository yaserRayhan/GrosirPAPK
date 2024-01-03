// fungsi ini digunakan untuk me routing halaman utama sehingga pada
// saat aplikasi pertama dijalankan , konten home akan langsung dibuka
let limit = 4; //jumlah data yang ditampilkan pertama
let start = 0;
let action = "inactive";
let search = "";
let result = 1;

$(document).ready(function () {
    home();
    $("#home").addClass("active");
    $("#katalog").removeClass("active");
    $("#profil").removeClass("active");
    });
    //fungsi ini digunakan sebagai router halaman konten home
    function home() {
        $.ajax({
        type: "GET",
        url: "home.html",
        data: "data",
        dataType: "html",
        success: function (response) {
        $("#content").html(response);
        $("#home").addClass("active");
        $("#katalog").removeClass("active");
        $("#profil").removeClass("active");
        $("#load_data").html("");
        start = 0;
        lazzy_loader(limit);
        if (action == "inactive") {
        action = "active";
        fetch(limit, start, search);
        }
        },
        });
        }
    //fungsi ini digunakan sebagai router halaman konten katalog
    function katalog() {
        $.ajax({
        type: "GET",
        url: "katalog.html",
        data: "data",
        dataType: "html",
        success: function (response) {
        $("#content").html(response);
        $("#home").removeClass("active");
        $("#katalog").addClass("active");
        $("#profil").removeClass("active");
        $("#load_data").html("");
        start = 0;
        lazzy_loader(limit);
        if (action == "inactive") {
        action = "active";
        fetch(limit, start, search);
        }
        },
        });
        }
        
        //fungsi ini digunakan sebagai router halaman konten profil
        function profil() {
        $.ajax({
        type: "GET",
        url: "profil.html",
        data: "data",
        dataType: "html",
        success: function (response) {
        $("#content").html(response);
        $("#home").removeClass("active");
        $("#katalog").removeClass("active");
        $("#profil").addClass("active");
        },
        });
        }
        //fungsi ini digunakan untuk menampilkan alert informasi menggunakan library sweetalert2
        function info() {
        Swal.fire({
        title: "Info",
        text: "Apps Toko Online v.1.0",
        icon: "info",
        confirmButtonText: "Tutup",
        confirmButtonColor: "#3085d6",
        });
        }
        //fungsi ini digunakan untuk mengambil data barang dari database melalui API

//fungsi ini digunakan untuk mem format angka kedalam format curency
function numFormat(x) {
return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function mdOpen() {
    $("#md-barang").modal("show");
    $("#md-barang-title").html("Tambah Barang");
    $("#image").attr("required", true);
    $("#form-barang")[0].reset();
    }
    $(function () {
    // when the form is submitted
    $("#form-barang").on("submit", function (e) {
    // if the validator does not prevent form submit
    if (!e.isDefaultPrevented()) {
    Swal.fire("Sedang menyimpan data");
    Swal.showLoading();
    $("#btnSubmit").text("Menyimpan...");
    $("#btnSubmit").attr("disabled", true);
    var formData = new FormData($("#form-barang")[0]);
    $.ajax({
    url: "http://localhost/api_toko_online/produk/simpan",
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,
    dataType: "JSON",
    success: function (data) {
    if (data.status) {
    $("#form-barang")[0].reset();
    $("#md-barang").modal("hide");
    fetch();
    Swal.fire({
    text: data.message,
    icon: "success",
confirmButtonText: "Ok",
});
} else {
Swal.fire({
text: data.message,
icon: "error",
confirmButtonText: "Ok",
});
}
$("#btnSubmit").text("Simpan");
$("#btnSubmit").attr("disabled", false);
},
});
return false;
}
});
});
function dialog(id) {
$("#md-dialog").modal("show");
$("#btnEdit").attr("data-id", id);
$("#btnHapus").attr("data-id", id);
}
function edit(id) {
$("#form-barang")[0].reset();
$("#md-dialog").modal("hide");
$("#md-barang").modal("show");
$("#md-barang-title").html("Edit Barang");
$("#image").attr("required", false);
$.ajax({
type: "GET",
url: "http://localhost/api_toko_online/produk/detail/" + id,
dataType: "JSON",
success: function (response) {
if (response.status) {
$("#id").val(response.data.id);
$("#nama").val(response.data.nama);
$("#harga").val(response.data.harga);
$("#deskripsi").val(response.data.deskripsi);
} else {
Swal.fire({
text: response.message,
icon: "error",
confirmButtonText: "Ok",
});
}
},
});
}
function hapus(id) {
Swal.fire({
title: "Data Barang Akan Dihapus?",
text: "Data yang di hapus tidak dapat di kembalikan",
icon: "question",
showCancelButton: true,
confirmButtonText: "Hapus",
confirmButtonColor: "#3085d6",
cancelButtonText: "Batal",
cancelButtonColor: "#d33",
}).then((result) => {
if (result.isConfirmed) {
Swal.fire("Sedang menghapus data");
Swal.showLoading();
$.ajax({
type: "GET",
url: "http://localhost/api_toko_online/produk/hapus/" + id,
dataType: "JSON",
success: function (response) {
if (response.status) {
Swal.fire({
text: response.message,
icon: "success",
confirmButtonText: "Ok",
});
fetch();
$("#md-dialog").modal("hide");
} else {
Swal.fire({
text: response.message,
icon: "error",
confirmButtonText: "Ok",
});
}
},
});
}
});
}
function fetch(limit, start, search) {
    $.ajax({
    url: "http://localhost/api_toko_online/produk/list",
    method: "POST",
    data: {
    limit: limit,
    start: start,
    search: search,
    },
    dataType: "JSON",
    cache: false,
    success: function (response) {
    result = response.result;
    if (response.status) {
    let card_data = "";
    $.each(response.data, function (i, v) {
        card_data = ` <a class="product-items w-50 flex-column" 
        href="javascript:void(0)" onclick="dialog('${
        v.id
        }');">
        <div class="product-cover mb-2" style="background-image: 
        url('${
        v.img
        }');"></div>
        <p class="bodytext1 semibold m-0 px-2 text-secondary">${
        v.nama
        }</p>
        <p class="bodytext2 color-black300 m-0 px-2">${v.deskripsi.substring(
        0,
        40
        )}</p>
        <p class="caption m-0 py-1 px-2 text-primary">Rp. 
        ${numFormat(
        v.harga
        )}</p>
        </a>`;
        $("#load_data").append(card_data);
        });
        action = "inactive";
        $("#load_data_message").html("");
        } else {
        $("#load_data").html("");
        $("#load_data_message").html(
        '<div class="col-12 text-center"><h4 class="text-danger">Oops, barang yang anda cari tidak di temukan</h4></div>'
        );
        action = "active";
        }
        },
        });
        }
        function lazzy_loader(limit) {
        var output = "";
        for (var count = 0; count < limit; count++) {
        output += `
        <a class="product-items w-50 flex-column shimmer" 
        href="javascript:void(0)">
        <div class="product-cover animate mb-2" ></div>
        <p class="bodytext1 semibold m-0 px-2 text-secondary animate 
        mb-2"></p>
        <p class="bodytext2 color-black300 m-0 px-2 animate mb-2"></p>
        <p class="caption m-0 py-1 px-2 text-primary animate"></p>
        </a>`;
        }
        $("#load_data_message").html(output);
        }
        $(window).scroll(function () {
        if (
        $(window).scrollTop() + $(window).height() > $("#load_data").height() 
        &&
        action == "inactive" &&
        result == 1
        ) {
        lazzy_loader(limit);
        action = "active";
        start = start + limit;
        setTimeout(function () {
        fetch(limit, start, search);
        }, 1000);
        }
        });
        function searchHandler() {
        $("#load_data").html("");
        search = $("#search").val();
        fetch(limit, start, search);
        }
