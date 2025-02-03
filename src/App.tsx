import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { getDatabase } from 'firebase/database';
// import {app } from './Firebase.js';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
// import CartPage from './pages/CartPage';
// import CheckoutPage from './pages/CheckoutPage';
import AuthPage from './pages/AuthPage';
import CategoryPage from './pages/CategoryPage';
// import { Cloudinary } from '@cloudinary/url-gen';
// import { auto } from '@cloudinary/url-gen/actions/resize';
// import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
// import { AdvancedImage } from '@cloudinary/react';
import { useState } from 'react';
import axios from 'axios';
import Login from './pages/Login.js';
import ScrollToTop from './components/ScrollToTop.js';
import NotFoundPage from './components/NotFoundPage.js';
import AddProduct from './pages/AddProduct.js';

// const db = getDatabase(app);
function App() {  
  const [uploadedImage, setUploadedImage] = useState<File  | null>(null);
  const [image, setImage] = useState<string | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadedImage(e.target.files?.[0] || null);
  };


  const handleImageUpload = async () => {
    // const file = e.target.files?.[0];
    if (!uploadedImage) {
      console.error("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("file", uploadedImage);
    formData.append("upload_preset", "DemoV1"); // Replace with your actual preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfl3ehbuu/image/upload", // Replace with your Cloudinary cloud name
        formData
      );
      console.log("Upload successful:", response.data);
      setImage(response.data.url); // Save the image public ID
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  // const cld = new Cloudinary({ cloud: { cloudName: 'dfl3ehbuu' } });

  // const img = image
  //   ? cld
  //       .image(image)
  //       .format('auto')
  //       .quality('auto')
  //       .resize(auto().gravity(autoGravity()).width(500).height(500))
  //   : null;
    
    // const putdata = async()=>{
    //   console.log("image ",img,image)
    //   set( ref(db, 'products'), {
    //     id: "1",
    //     name: "Engine Oil",
    //     price: 39.99,
    //     category: "Engine",
    //     description: "High-quality engine oil for improved performance",
    //     compatibility: ["All vehicles"],
    //     image: image,
    //     stock: 100
    //   })
    // }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
      <ScrollToTop />
        <Header />
        {/* <div>
      <input type="file" onChange={handleImageUpload} />
      {img && <AdvancedImage cldImg={img} />}
      <button onClick={putdata}>Save</button>
    </div> */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/Addproducts' element={<AddProduct handleFileChange={handleFileChange} handleImageUpload={handleImageUpload} uploadedImage={image} setImage ={setImage}/>}/>
            <Route path="/product/:id" element={<ProductPage />} />
            {/* <Route path="/cart" element={<CartPage />} /> */}
            {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path='/Login' element={<Login />}/>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;