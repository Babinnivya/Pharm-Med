import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";

function EditMedicine() {
    const {postId} = useParams();
    const [name, setname] = useState('');
    const [company, setCompany] = useState('');
    const [expiry_date, setexpiry_date] = useState('');
    var user = useSelector(store=>store.auth.user)
    let navigate = useNavigate();
    useEffect(()=>{
        if(user){
        axios.get('https://medicalstore.mashupstack.com/api/medicine/'+postId,{ headers:{'Authorization':"Bearer "+user.token}}).then(response=>{
            setname(response.data.name);
            setCompany(response.data.company);
            setexpiry_date(response.data.expiry_date);
        })
 } },[postId,user]);
    function updateMedicine(){
        axios.post('https://medicalstore.mashupstack.com/api/medicine/'+postId,{
            name: name,
            company: company,
            expiry_date:expiry_date,},
            {headers:{'Authorization':"Bearer "+user.token},
            
        }).then(response=>{
            alert(response.data.message)
        })
        navigate('/blog/posts');
    }
    return <div>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1 className="text-center">Edit Medicine</h1>
                    <div className="form-group">
                        <label>Name:</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        value={name} 
                        onChange={(event)=>{setname(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Company</label>
                        <textarea 
                        className="form-control" 
                        value={company} 
                        onChange={(event)=>{setCompany(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Expiry_Date</label>
                        <textarea 
                        className="form-control" 
                        value={expiry_date} 
                        onChange={(event)=>{setexpiry_date(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary float-right" onClick={updateMedicine}>Submit</button>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
}

export default EditMedicine;