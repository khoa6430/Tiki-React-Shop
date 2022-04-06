import {useState,useEffect} from 'react'
import { set, ref, onValue, remove, update } from "firebase/database";
import { db } from "../../../../firebase";
export default function useProductDetail(productId){
    const [product,setProduct] = useState({})
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        (async ()=>{
            try{
                onValue(ref(db,'list-product'), (snapshot) => {
                    //do firebase 
                    var data = snapshot.val();
                    // var getProduct = {};
                    data = data.filter(x=>x.id == productId);
                    var getProduct = data[0];
                    setLoading(true);
                    setProduct(getProduct);

                });

            }catch(error){
                console.log('Failed to fetch product',error);
            }
            setLoading(false);
        })();
    },[productId])

    return {product,loading}
}