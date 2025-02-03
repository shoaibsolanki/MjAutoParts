import React, { useEffect, useState } from 'react';
import { app } from '../Firebase'; // Make sure to configure Firebase
import {  addDoc, collection  } from 'firebase/firestore';
import { getFirestore } from "firebase/firestore";
import { useSnackbar } from 'notistack';
import {admin} from 'firebase-admin'
interface AddProductProps {
    handleImageUpload: () => void;
    uploadedImage: string;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setImage: (image: string) => void;
}

const AddProduct: React.FC<AddProductProps> = ({ handleImageUpload, uploadedImage ,handleFileChange ,setImage}) => {
    const [productName, setProductName] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [category, setcategory] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const db = getFirestore(app)

    const handleSaveImaegandSumit = async (e: React.FormEvent)=>{
        e.preventDefault();
        if (!productName || !category || !productPrice || !productDescription) {
            enqueueSnackbar('Please fill in all fields and upload an image.', { variant: 'error' });
            return;
        }
        setIsLoading(true)
        handleImageUpload()
    }
    
    useEffect(() => {
        if(uploadedImage){
            if(!uploadedImage){
                setIsLoading(false)
                enqueueSnackbar('Something Wrong in Image Upload .', { variant: 'error' });
                return;
            }
         console.log(uploadedImage)
        handleSubmit()
     }
    }, [uploadedImage])
    

    const handleSubmit = async () => {
        // e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoading(false)
            enqueueSnackbar('No token found. Please log in.', { variant: 'error' });
            return;
        }

        try {
            // const user = await app.auth().verifyIdToken(token);
            // if (!user) {
            //     enqueueSnackbar('Invalid token. Please log in again.', { variant: 'error' });
            //     return;
            // }
          
            await addDoc(collection(db, "product"), {
                img:uploadedImage,
                name: productName,
                category: category,
                price: productPrice,
                Description: productDescription
            });
            setProductName('');
            setProductPrice('');
            setProductDescription('');
            setImage('');
            enqueueSnackbar('Product added successfully!', { variant: 'success' });
            setIsLoading(false)
        } catch (error) {
            console.error('Error adding product: ', error);
            enqueueSnackbar('Failed to add product.', { variant: 'error' });
            setIsLoading(false)
        }
    };

    

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-5 text-center">Add Product</h1>
            <form onSubmit={handleSaveImaegandSumit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productImage">
                            Product Image
                        </label>
                        <input
                            id="productImage"
                            type="file"
                            accept="image/*"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
                        Product Name
                    </label>
                    <input
                        id="productName"
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
                        Product Category
                    </label>
                    <input
                        id="productName"
                        type="text"
                        value={category}
                        onChange={(e) => setcategory(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productPrice">
                        Product Price
                    </label>
                    <input
                        id="productPrice"
                        type="number"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productDescription">
                        Product Description
                    </label>
                    <textarea
                        id="productDescription"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                    {isLoading ? 'Loading...' : 'Add Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;