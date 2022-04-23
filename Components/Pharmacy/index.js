import React from "react";

const Pharmacy = ({ item }) => {
    return (
        <div className="col-lg-4 col-md-6 col-12">
            <div className="card shadow h-100" >

                <div className="card-body">
                    <h5 className="card-title">{item.eczaneAdi}</h5>
                    <p className="card-text">{item.adres}</p>
                    {/* <a href="#" class="btn btn-primary mb-2">Harita</a>
                    <a href="#" class="btn btn-primary">Telefon</a> */}
                </div>
            </div>
        </div>
    );
}
export default Pharmacy;