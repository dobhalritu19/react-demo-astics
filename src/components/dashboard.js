import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import { CSVLink } from "react-csv";

const Dashboard = () => {
    const [itemList, setItemList] = useState([])
    const [filterItemList, setFilterItemList] = useState([])
    const [total, setTotal] = useState(0)
    const [activePage, setActivePage] = useState(1)

    const [itemName, setItemName] = useState("")
    const [itemPrice, setItemPrice] = useState(0)

    const perPage = 5;

    useEffect(() => {
        setTotal(Math.ceil(itemList.length / perPage))
        setItemName("")
        setItemPrice("")
        sortFn("itemName")
    }, [itemList])

    const addItems = (e) => {
        let tempObj = {};
        let tempArr = [];
        tempObj.id = itemList.length + 1;
        tempObj.itemName = itemName;
        tempObj.itemPrice = (itemPrice) ? parseInt(itemPrice) : 0;
        tempArr.push(tempObj);
        setItemList([...tempArr, ...itemList]);
        if (itemList.length <= 5) {
            setFilterItemList([...tempArr, ...itemList])
        }

    }

    const deleteItem = (id) => {
        const items = itemList.filter((item) => item.id != id)
        setFilterItemList(items)
        setItemList(items)
    }

    const searchItem = (value) => {
        let tempArray = itemList.filter((item) => item.itemName.includes(value))
        if (tempArray.length > 0) {
            setFilterItemList(tempArray);
        } else {
            tempArray = itemList.filter((item) => item.itemPrice == value)
            setFilterItemList(tempArray);
        }
        if (!value) {
            setFilterItemList(itemList)
        }
    }

    const [nameOrder, setNameOrder] = useState("Asc")
    const [priceOrder, setPriceOrder] = useState("Asc")

    const sortFn = (value) => {

        if (value == "itemName") {
            sortByName();

        } else if (value == "itemPrice") {
            sortByPrice()
        }
    }

    const sortByName = () => {
        let result = filterItemList.sort((a, b) => {

            let fa = a.itemName.toLowerCase(),
                fb = b.itemName.toLowerCase();
            if (nameOrder == "Asc") {
                setNameOrder("Desc")
                if (fa < fb) {
                    return 1;
                }
                if (fa > fb) {
                    return -1;
                }

            } else {
                setNameOrder("Asc")
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
            }


            return 0;
        })
        setFilterItemList([...result])
    }

    const sortByPrice = () => {
        let result = filterItemList.sort((a, b) => {

            if (priceOrder == "Asc") {

                setPriceOrder("Desc")
                return b.itemPrice - a.itemPrice;

            } else {

                setPriceOrder("Asc")
                return a.itemPrice - b.itemPrice;
            }


        });
        setFilterItemList([...result])
    }

    const changeList = (pageNo) => {
        setActivePage(pageNo)
        let min = (pageNo == 1) ? 0 : perPage * pageNo - perPage
        let max = 5 * pageNo
        max = (max > itemList.length) ? itemList.length : max
        let result = []
        for (let i = min; i < max; i++) {
            result.push(itemList[i])
        }
        setFilterItemList([...result])
    }


    const dispatch = useDispatch();

    const logoutFn = () => {
        dispatch({ type: "authentication", payload: false })
    }

    // console.log("filterItemList", filterItemList)

    const headers = [
        { label: "Id", key: "id" },
        { label: "Item Name", key: "itemName" },
        { label: "Price", key: "itemPrice" }
    ];

    return (
        <>
            <div className="topnav mb-3">
                <Link className="active" to="/dashboard">Dashboard</Link>
                <input placeholder="Search.." type="text" name="search" onChange={(event) => searchItem(event.target.value)} />

                <a onClick={(e) => logoutFn(e)} className="primary-btn">Logout</a>
            </div>

            <Form>
                <h5>
                    Add new item
                </h5>
                <Row className="mb-3">
                    <Col>
                        <Form.Control placeholder="Item Name" name="itemName" onChange={(event) => setItemName(event.target.value)} value={itemName} />
                    </Col>
                    <Col>
                        <Form.Control type="number" placeholder="Item Price" name="itemPrice" onChange={(event) => setItemPrice(event.target.value)} value={itemPrice} />
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={(event) => addItems(event)}>Add</Button>

                        <CSVLink data={filterItemList} headers={headers} className="export">Export</CSVLink>

                    </Col>
                </Row>
                <Row>

                </Row>
            </Form>

            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>#</th>
                        <th onClick={() => sortFn("itemName")}>Name({nameOrder})</th>
                        <th onClick={() => sortFn("itemPrice")}>Price({priceOrder})</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (filterItemList.length > 0) ?

                            filterItemList.map((value, index) => {

                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>

                                        <td>{value.itemName}</td>

                                        <td>{value.itemPrice}</td>
                                        <td>
                                            <Button variant="danger" onClick={() => deleteItem(value.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                )
                            }) :

                            <tr>
                                <td colSpan='4' className="no-record">No record Found</td>
                            </tr>
                    }

                </tbody>
            </Table>

            <ul className="pagination">
                {itemList.length > 5 &&

                    [...Array(total).keys()].map((obj, id) => {
                        return (
                            <li className="page-item" key={id} onClick={() => changeList(obj + 1)}>
                                <a className={(activePage == obj + 1) ? "page-link page-link-active" : "page-link"} role="button">{obj + 1}</a>
                            </li>
                        );
                    })
                }

            </ul>
        </>
    )
}

export default Dashboard