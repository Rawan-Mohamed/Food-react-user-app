import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../SharedModule/Components/Header/Header'
import axios from 'axios';
import NoData from '../../../SharedModule/Components/NoData/NoData';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import noData from "../../../assets/images/no-data.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../Context/AuthContext';
import { ToastContext } from '../../../Context/ToastContext';



export default function RecipesList() {
  const [recipesList, setRecipesList] = useState({});
  const [modelState, setModelState] = useState("close")
  const [itemId, setItemId] = useState(0);
  const [tagsList, setTagsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [recipe, setRecipe] = useState();
  const [pagesArray, setPagesArray] = useState([])
  const [visiblePages, setVisiblePages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchString, setSearchString] = useState("");
  const [selectedTagId, setSelectedTagId] = useState("");
  const [selectedCateId, setSelectedCateId] = useState("");
  const { requestHeaders, baseUrl } = useContext(AuthContext)
  const { getToastValue } = useContext(ToastContext)
  const [recipeDetails, setRecipeDetails] = useState({});

  const handleClose = () => setModelState("close");



  const showViewModel = (id) => {
    setItemId(id);
    setModelState("view-model")
    getRecipesDetails(id)
  }



  //Get Recipe API
  const getAllRecipes = (pageNo, name, tagId, categoryId) => {
    axios.get(`${baseUrl}/Recipe/`, {
      headers: requestHeaders,
      params: {
        pageSize: 5,
        pageNumber: pageNo,
        name: name,
        tagId: tagId,
        categoryId: categoryId,

      }

    })
      .then((response) => {
        // setPagesArray(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1));
        setTotalPages(response.data.totalNumberOfPages)
        setRecipesList(response?.data?.data);

      })
      .catch((error) => {
        console.log(error);
      })
  }

  //View Recipe API
  const getRecipesDetails = (id) => {
    axios
      .get(`${baseUrl}/Recipe/${id}`, {
        headers: requestHeaders,
      })

      .then((response) => {
        // getToastValue("success","deleted Successfuly")
        // handleClose();
        console.log(response.data);
        setRecipeDetails(response.data);

      })
      .catch((error) => {
        console.log(error);
      })
  }


  //Get Tag API
  const getAllTags = () => {
    // Fetch tags from the API
    axios.get(`${baseUrl}/tag/`, {
      headers: requestHeaders,
    })
      .then(response => {
        setTagsList(response?.data);
      })
      .catch(error => {
        console.error('Error fetching tags:', error);
      });
  };

  //Get Category List
  const getCategoryList = () => {
    // Fetch category from the API
    axios.get(`${baseUrl}/Category/`, {
      headers: requestHeaders,
    })
      .then(response => {
        setCategoriesList(response?.data?.data);
      })
      .catch(error => {
        console.error('Error fetching catgories:', error);
      });
  }

  const addToFavorit = () => {
    axios.post(`${baseUrl}/userRecipe/`,
      {
        recipeId: itemId,
      },
      {
        headers: requestHeaders
      })
      .then(response => {
        getToastValue("success", "Added Successfuly")
        handleClose();
        console.log(response)
      })
      .catch((error) =>
        console.log(error));
  }


  // useEffect(() => {
  //   getCategoryList();
  //   getAllTags();
  // }, []);


  const getNameVAlue = (input) => {
    // console.log(target);
    setSearchString(input.target.value);
    getAllRecipes(1, input.target.value, selectedTagId, selectedCateId);
  }

  const getTagValue = (select) => {
    setSelectedTagId(select.target.value)
    getAllRecipes(1, null, select.target.value, selectedCateId);
  };

  const getCategoryValue = (select) => {
    setSelectedCateId(select.target.value)
    getAllRecipes(1, null, selectedTagId, select.target.value);
  };

  const updateVisiblePages = () => {
    const rangeSize = 5; // Adjust the number of visible pages as needed
    const startPage = Math.max(1, currentPage - Math.floor(rangeSize / 2));
    const endPage = Math.min(totalPages, startPage + rangeSize - 1);
    setVisiblePages(Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i));
  };

  useEffect(() => {
    getCategoryList();
    getAllTags();
    getAllRecipes(currentPage);
  }, [currentPage]);

  useEffect(() => {
    updateVisiblePages();
  }, [currentPage, totalPages]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pagesArray.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <ToastContainer />

      <Header
        title={'Recipes Items '}
        paragraph={'You can now add your items that any user can order it from the Application and you can edit'}

      />

      {/* Delete Recipe Model   */}
      <Modal show={modelState === "view-model"} onHide={handleClose}>

        <Modal.Body>
          <h4 className=' text-success'> Recipe Details </h4>
          <div className='text-center'>
            {recipeDetails?.imagePath ?
              <img
                className=' img-fluid'
                src={`https://upskilling-egypt.com/` + recipeDetails?.imagePath} alt="" /> :
              <img className='img-fluid' src={noData} />
            }
            <p>Description:{recipeDetails?.description}</p>
            <p>Category:{recipeDetails?.category?.[0]?.name}</p>
            {/* <p>Category:{(recipeDetails || {}).category[0] || 'N/A'}</p> */}
            <p>Tag:{recipeDetails?.tag?.name}</p>

            <button onClick={addToFavorit} className='btn btn-outline-success '>Add to favorit</button>
          </div>

        </Modal.Body>

      </Modal>


      <div className='row mx-4 p-3'>
        <div className='col-md-6'>
          <div>
            <h6>Recipes Table Details</h6>
            <span className=' text-muted'>You can check all details</span>
          </div>
        </div>


        <div>
          <div className="row my-2 ">
            <div className="col-md-4 ">
              <div className='icon-input position-relative'>
                <i className="icons fa-solid fa-search position-absolute text-success" />
                <input
                  onChange={getNameVAlue} placeholder='search by recipe name....' className='form-control my-2' type="text" />
              </div>


            </div>

            <div className="col-md-4 p-2">
              <select
                onChange={getTagValue} className="form-select">
                <option >Select a Tag Id</option>
                {tagsList?.map((tag) => (
                  <option key={tag.id} value={tag.id}> {tag.name}</option>
                ))}

              </select>
            </div>

            <div className="col-md-4 p-2">
              <select
                onChange={getCategoryValue} className="form-select">
                <option >Select a Category Id</option>
                {categoriesList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}</option>
                ))}
              </select>
            </div>
          </div>

          {recipesList?.length > 0 ?
            <div>
              <table className="table table-striped">
                <thead className=' table-success'>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category</th>
                    <th scope="col">Tag</th>
                    <th scope="col">Action</th>

                  </tr>
                </thead>
                <tbody>
                  {recipesList?.map((recipe, index) => (

                    <tr key={recipe.id}>
                      <th scope="row">{index + 1}</th>
                      <td >{recipe.name}</td>
                      <td >
                        <div className='img-container' >
                          {/* <img
                            className=' img-fluid'
                            src={
                              `https://upskilling-egypt.com:443/` +
                              recipe.imagePath} alt="" /> */}
                          {recipe?.imagePath ?
                            <img
                              className=' img-fluid'
                              src={
                                `https://upskilling-egypt.com/` +
                                recipe?.imagePath} alt="" /> : (
                              <img className='img-fluid' src={noData} />
                            )}
                        </div>
                      </td>
                      <td >{recipe?.description}</td>
                      <td >{recipe?.price}</td>
                      <td >{recipe?.category[0]?.name}</td>

                      <td >
                        {recipe?.tag?.name}

                      </td>
                      <td >
                        <i onClick={() => showViewModel(recipe.id)}
                          className="fa-solid fa-eye text-success"></i>
                      </td>
                    </tr>

                  ))}
                </tbody>
              </table>

              {/* old pagination */}
              {/* <nav aria-label="...">
                <ul className="pagination justify-content-center pagination-sm">
                  {pagesArray.map((pageNo) => (
                    <li key={pageNo} onClick={() => handlePageChange(pageNo, searchString)} className="page-item">
                      <a className="page-link">
                        {pageNo}
                      </a>
                    </li>
                  ))}


                </ul>

              </nav> */}

              <div className='text-center'>
                <button onClick={handlePreviousPage}
                  className='prev'

                >&laquo;</button>
                {visiblePages.map((pageNo) => (
                  <button key={pageNo} onClick={() => handlePageChange(pageNo, searchString)}
                    style={{
                      backgroundColor: currentPage === pageNo ? '#009247' : 'white',
                      color: currentPage === pageNo ? 'white' : '#009247',
                      border: '1px solid #009247',
                      marginLeft: '5px',
                      borderRadius:'5px'
                    }} >
                    {pageNo}
                  </button>
                ))}
                <button onClick={handleNextPage}
                  className='next'>&raquo;</button>


              </div>
            </div>
            :

            <NoData />
          }

        </div>

      </div>


    </>

  )
}



