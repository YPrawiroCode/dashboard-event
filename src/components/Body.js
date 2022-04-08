import React, { useEffect, useMemo, useState   } from "react";
import "./Body.css"
import { Button, Table, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TableHeader, Pagination, SearchBar } from "../components/DataTable/index";
import useFullPageLoader from "./hooks/useFullPageLoader";
// import GetData from "./GetData";

const Body = (props) => {
  const [repo, setRepo] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" })


  const getInitialState = () => {
    const value = 10;
    return value;
  };
  const [value, setValue] = useState(getInitialState);
  
  const ITEMS_PER_PAGE = parseInt(value);
  
  useEffect(() => {
    const getData = () => {
      showLoader();

      fetch("https://jsonplaceholder.typicode.com/comments")
        .then(response => response.json())
        .then(json => {
          hideLoader();
          setRepo(json);
        });
    }

    getData();
  }, []);

  const reposData = useMemo(() => {
    let computedRepos = repo;

    if(search){
      computedRepos = computedRepos.filter(
        repo => 
          repo.name.toLowerCase().includes( search.toLocaleLowerCase() ) ||
          repo.email.toLowerCase().includes( search.toLocaleLowerCase() )
      )
    }

    setTotalItems(computedRepos.length)

    //sorting data
    if( sorting.field ){
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedRepos = computedRepos.sort(
        (a,b) => 
          reversed * a[sorting.field].localeCompare(b[sorting.field])
      )
    }

    // Current Page slice
    return computedRepos
    .slice(
        (currentPage - 1) * ITEMS_PER_PAGE, 
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
    }, [repo, search, sorting.field, sorting.order, currentPage, ITEMS_PER_PAGE])

  console.log(repo)
  console.log(currentPage)
  console.log(ITEMS_PER_PAGE)

  const headers = [
    { name: "No", field:"id", sortable: false },
    { name: "Kategori", field:"name", sortable: true },
    { name: "Total Visitor", field:"email", sortable: true },
  ]

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return(
    <>
    <div className="main-body">
      <div className="wrap-content">
        <div className="section-a">
          <h3>Total Visitor</h3>
          <Button variant="primary">Download report</Button>
        </div>
        <div className="card-head-body">
            <p className="text-atas">Total Visitor</p>
            <p className="text-bawah">Total visitor semua mobil adalah { props.index } orang</p>
        </div>
        <div className="head-table">
          <p className="txt1">Show</p>
          <Form.Select value={value} onChange={handleChange} className='select-menu-show' aria-label="Default select example">
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </Form.Select>
          <p className="txt2">Entries</p>
          <SearchBar onSearch={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}/>
        </div>
        <div className="body-table">
          <Table striped bordered hover>
            <TableHeader 
              headers={headers} 
              onSorting={(field, order) => 
                setSorting({ field, order })
              }
            />
            <tbody>
              {reposData.map( (repo) => (
                <tr>
                  <th scope="row">{repo.id}</th>
                  <th>{repo.name}</th>
                  <th>{repo.email}</th>
                </tr>) )}
              {/* <GetData loop={value}/> */}
            </tbody>
          </Table>
        </div>
        <div className="footer-table">
          <p className="txt-footer-table">
            Showing 1 to { currentPage } of { totalItems } entries
          </p>          
              <Pagination
                total={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={ page => setCurrentPage(page) }
              />
        </div>
      </div>
    </div>
    {loader}
    </>
  )
}

export default Body