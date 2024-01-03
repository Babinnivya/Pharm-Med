import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import PostListItem from "./MedicineListItem";
import { useSelector } from "react-redux";

function ListMedicines() {
  const [allMedicines, setAllMedicines] = useState([]); // Store all the fetched posts from the API
  const [filteredMedicines, setFilteredMedicines] = useState([]); // Store the filtered posts based on search term
  const [SearchMedicine, setSearchMedicine] = useState("");
  var user = useSelector(store=>store.auth.user)

  function fetchMedicines(){
    console.log(user);
    axios
      .get('https://medicalstore.mashupstack.com/api/medicine',
      { headers:{'Authorization':"Bearer "+user.token}}
       )
      .then((response) => {
        setAllMedicines(response.data);
        setFilteredMedicines(response.data); // Initialize filteredPosts with all the fetched posts
      });
    }
  useEffect(() => {
    if(user){
    fetchMedicines();
}}, [user]);

  const handleSearchInputChange = (event) => {
    event.preventDefault();
    setSearchMedicine(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (SearchMedicine.trim() === "") {
      setFilteredMedicines(allMedicines);
    } else {
      var filteredItems = allMedicines.filter((item) =>
      item.name.toLowerCase().startsWith(SearchMedicine.toLowerCase())
      );
      setFilteredMedicines(filteredItems);
    }
  };



  return (
    <div>
      <Navbar />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <form>
              <label>Search Medicine: </label>
              <input
                type="text"
                value={SearchMedicine}
                onChange={handleSearchInputChange}
              />{" "}
              &nbsp;
              <button
                className="btn btn-small btn-success"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
              &nbsp;
            </form>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center my-4">Medicine</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-8 offset-2">
            <Link to="/blog/posts/create" className="btn btn-warning
             mb-2">
              Create Medicine
            </Link>
            {filteredMedicines.length === 0 ? (
              <p>No matching medicines found.</p>
            ) : (
              filteredMedicines.map((post) => (
                <PostListItem key={post.id} post={post} refresh={fetchMedicines} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListMedicines;
