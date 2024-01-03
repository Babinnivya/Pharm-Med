import axios from "axios";
import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";

function CreateMedicine() {
    
    const [name, setname] = useState('');
    const [company, setcompany] = useState('');
    const [expiry_date,setexpiry_date] = useState('');
    var navigate = useNavigate()
    var user = useSelector(store=>store.auth.user)
    function addMedicine() {
        axios.post('https://medicalstore.mashupstack.com/api/medicine',{   
            name: name,
            company: company,
            expiry_date: expiry_date,},
           { headers:{'Authorization':"Bearer "+user.token}
        }).then(response=>{
            navigate('/blog/posts')
        })
    }

    return (<div>
        <Navbar></Navbar>
        <div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1 className="text-center">Create Medicine</h1>
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
                        <label>Company:</label>
                        <textarea 
                        className="form-control" 
                        value={company} 
                        onChange={(event)=>{setcompany(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Expiry_Date</label>
                        <input 
                        type="date"
                        className="form-control"
                        value={expiry_date} 
                        onChange={(event)=>{setexpiry_date(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary float-right" onClick={addMedicine}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default CreateMedicine;