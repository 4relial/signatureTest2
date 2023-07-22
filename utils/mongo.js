const mongoose = require('mongoose');
const uri = "mongodb+srv://ilham:yQNNR8A7D28lkQhY@cluster0.mltvw71.mongodb.net/signatureTest?retryWrites=true&w=majority"
mongoose.connect(uri).catch(e => console.log(e))

const schemaData = new mongoose.Schema({
    nama: String,
    tanggal: Date,
    deskripsi: String,
    signature: String
});


const tambahData = async (nama, tanggal, deskripsi, signature) => {
    const collection = mongoose.model('data', schemaData);
    const add = new collection({
        nama: nama,
        tanggal: tanggal,
        deskripsi: deskripsi,
        signature: signature
    })
    await add.save()
    return "success"
}

const allData = async () => {
    const collection = mongoose.model('data', schemaData);
    const checkName = await collection.find()
    return checkName
}

const getData = async (id) => {
    const collection = mongoose.model('data', schemaData);
    const checkName = await collection.findOne({ _id: id })
    if (!checkName) {
        return 404
    } else {
        return checkName
    }
}

const editData = async (id, nama, harga, kemasan, typeKemasan, jumlahPenyakit, efektifitas, kadaluarsa) => {
    const collection = mongoose.model('data', schemaData);
    const checkName = await collection.findOne({ _id: id })
    if (!checkName) {
        return 404
    } else {
        await collection.updateOne({ _id: id }, {
            $set: {
                nama: nama,
                tanggal: tanggal,
                deskripsi: deskripsi,
                signature: signature
            }
        })
        const result = await collection.findOne({ _id: id })
        return result
    }
}

const hapusData = async (nama) => {
    const collection = mongoose.model('data', schemaData);
    collection.deleteOne({ _id: nama }).then(function () {
        console.log(`Data Dihapus`)
        return 200
    }).catch(function (error) {
        console.log(error)
        return 500
    });
}

module.exports = { tambahData, allData, getData, editData, hapusData }