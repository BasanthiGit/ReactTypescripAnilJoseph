import axios from "axios";
import { useEffect, useState } from "react";
import {Product} from '../model/Product';
import './ListProducts.css'
import {useNavigate} from 'react-router-dom';

const baseUrl = "http://localhost:9000/products";

function ListProducts(){

    const [products, setProducts] = useState<Array<Product>>([]);
    const navigate = useNavigate();

    useEffect(() => {

        fetchProducts();
    }, []);

    async function fetchProducts(){

        try {
            
            const response = await axios.get<Array<Product>>(baseUrl);
            console.log(response.data);
            setProducts(response.data);
        } catch (error) {
            console.log("fetchProducts error: ", error);
        }
    }

    async function deleteProduct(product: Product){

        try {
            
            const url = `${baseUrl}/${product.id}`;
            await axios.delete(url);
           // fetchProducts();
            const copy_of_products = [...products];
            const index = copy_of_products.findIndex(item => item.id === product.id);
            if(index !== -1){
                copy_of_products.splice(index, 1);
                setProducts(copy_of_products);
            }


            alert(`product with id: ${product.id} deleted`)


        } catch (error) {
            alert(`product with id: ${product.id} not found`)
        }

    }
    function editProduct(product: Product){

        navigate("/products/" + product.id);
    }

    return(
        <div>
            <h4>List Products</h4>
            <div style={{display: "flex", flexFlow: "row wrap", justifyContent: "center"}}>
                {products.map((product) => {
                    return (
                        <div className="product" key={product.id}>
                            <p>Id: {product.id}</p>
                            <p>Name: {product.name}</p>
                            <p>{product.description}</p>
                            <p>{product.price}</p>
                            <div>
                                <button className="btn btn-danger" 
                                            onClick={() => {deleteProduct(product)}}>Delete</button>&nbsp;
                                <button className="btn btn-warning"
                                            onClick={() => editProduct(product)}>Edit</button>
                            </div>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ListProducts;