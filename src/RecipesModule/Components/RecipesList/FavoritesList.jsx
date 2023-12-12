import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { AuthContext } from '../../../Context/AuthContext'
import Header from '../../../SharedModule/Components/Header/Header'
import noData from "../../../assets/images/no-data.png"
import { ToastContainer, toast } from 'react-toastify';
import { ToastContext } from '../../../Context/ToastContext';
export default function FavoritesList() {
  const [favList, setFavList] = useState([])
  const { baseUrl, requestHeaders } = useContext(AuthContext)
  const [itemId, setItemId] = useState(0);
  const [modelState, setModelState] = useState("close")
  const [searchString, setSearchString] = useState("");
  const { getToastValue } = useContext(ToastContext)
  const handleClose = () => setModelState("close");

  const showDeletModel = (id) => {
    setItemId(id);
    setModelState("delete-model")
  }


  const getallFavorites = () => {
    axios.get(`${baseUrl}/userRecipe/`, {
      headers: requestHeaders,
    })
      .then((response) => {
        console.log(response.data.data)
        setFavList(response.data.data)
      })
      .catch((error) =>
        console.log(error));
  }



  const deleteFavorites = () => {
    axios.delete(`${baseUrl}/userRecipe/${itemId}`, {
      headers: requestHeaders,
    })
      .then(response => {
        getToastValue("success", "Deleted Successfuly")
        handleClose();
        getallFavorites(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    getallFavorites()
  }, []);




  const getNameVAlue = (input) => {
    console.log(input);
    setSearchString(input.target.value);
    getallFavorites(1, input.target.value);
  }


  return (
    <>
     <ToastContainer />
      <Header
        title={'Favorite Items '}
        paragraph={'You can now add your items that any user can order it from the Application and you can edit'}

      />


      {/* Delete Recipe Model   */}
      <Modal show={modelState == "delete-model"} onHide={handleClose}>

        <Modal.Body>
          <div className='text-center'>
            <img src={noData} alt="" />
            <h5 className='my-3'>Delete This Recipe ?</h5>
            <span className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</span>
            <div className='text-end my-3'>
              <button onClick={deleteFavorites} className='btn btn-outline-danger'>Delete this item</button>

            </div>
          </div>


        </Modal.Body>

      </Modal>



      <div className="row mx-4 ">
      <div className="row my-2 ">
            <div className="col-md-4 ">
              <div className='icon-input position-relative'>
                <i className="icons fa-solid fa-search position-absolute text-success" />
                <input
                  onChange={getNameVAlue} placeholder='search by recipe name....' className='form-control my-2' type="text" />
              </div>


            </div>

          </div>
        {favList.map((fav) => (
          // <div className="col-md-4">
          //   <div>
          //     {fav?.recipe.imagePath ?
          //       <img
          //         className=' img-fluid'
          //         src={
          //           `https://upskilling-egypt.com/` +
          //           fav?.recipe.imagePath} alt="" /> : (
          //         <img className='img-fluid' src={noData} />
          //       )}
          //     <h2>{fav.recipe.name}</h2>
          //     <h2>{fav.id}</h2>
          //     <h3>{fav.recipe.description}</h3>
          //     <h3>{fav.recipe.price}</h3>
          //   </div>
          // </div>
          // // -------------------------
          <div key={fav.id} className="col-sm-6 col-md-4 p-2">
            <div className="card h-100">
              <div className='img-container card-img-equal-ratio' style={{ height: '200px', overflow: 'hidden' }}>
                {fav?.recipe.imagePath ?
                  <img
                    className=' img-fluid h-100 w-100'
                    src={
                      `https://upskilling-egypt.com/` +
                      fav?.recipe.imagePath} alt=""
                    style={{ objectFit: 'cover' }} /> :

                  <img className='img-fluid w-100' src={noData} style={{ objectFit: 'cover' }} />

                }
              </div>

              <div className="card-body m-3">
                <h5 class="card-title">{fav.recipe.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{fav.id}</h6>
                <p class="card-text">{fav.recipe.description}</p>
                <p class="card-text">{fav.recipe.price}</p>
                <div className="position-absolute top-0 end-0 m-3">
                  <i onClick={() => showDeletModel(fav.id)}
                    className="fa-solid fa-heart text-danger"></i>
                </div>


              </div>
            </div>
          </div>


        ))}
      </div>

    </>

  )
}
