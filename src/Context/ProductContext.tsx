// src/context/ProductContext.tsx
import React, { createContext, useState, ReactNode, useEffect, useContext } from "react";
import { app } from "../Firebase"; // Import Firestore instance
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Define Product type
interface Product {
    id: string;  // Firestore IDs are strings
    name: string;
    price: number;
    description: string;
}

// Define Context type
interface ProductContextProps {
    products: Product[];
    addProduct: (product: Product) => void;
}

// Create context
const ProductContext = createContext<ProductContextProps | undefined>(undefined);

// Create Provider
export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const db = getFirestore(app);
    // Fetch Data from Firestore
    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "product"));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log("Fetched Data:", data);
            setProducts(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Add Product (optional for now)
    // const addProduct = (product: Product) => {
    //     setProducts([...products, product]);
    // };

    return (
        <ProductContext.Provider value={{ products ,fetchData}}>
            {children}
        </ProductContext.Provider>
    );
};

// Custom hook for using Product Context
export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProduct must be used within a ProductProvider");
    }
    return context;
};
