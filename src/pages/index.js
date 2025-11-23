
'use client';

import React, { useState } from "react";
import CarouselComponent from "@/components/home/Carousel";
import Card from "@/components/home/Card";
import cardData from "../store/cardData.json";
import { useAuth } from "@/utils/AuthContext";
import About from '@/components/layouts/About'; // ✅ import AuthContext

// --- 1. Price State Initialization ---
const allRetailPrices = cardData.map(p => Number(p.retailPrice || 0));
const initialMinPrice = Math.min(...allRetailPrices) || 0;
const initialMaxPrice = Math.max(...allRetailPrices) || 5000;

export default function Home() {
    const { user } = useAuth(); // ✅ get current user
    const [selectedGender, setSelectedGender] = useState('All');
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedFabrics, setSelectedFabrics] = useState([]);
    const [priceBounds, setPriceBounds] = useState({ min: initialMinPrice, max: initialMaxPrice });
    const [priceRange, setPriceRange] = useState({ min: initialMinPrice, max: initialMaxPrice });
    const [sortOrder, setSortOrder] = useState('default');
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCollections, setSelectedCollections] = useState([]);

    // Helper function to get unique filter options
    const getUniqueOptions = (key) => {
        const allOptions = cardData.flatMap(product => {
            if (key === 'colors' || key === 'color') {
                return Array.isArray(product.colors || product.color)
                    ? (product.colors || [])
                    : (product.color ? [product.color] : []);
            }
            return product[key] || '';
        });
        return [...new Set(allOptions.filter(Boolean))];
    };

    const uniqueCategories = getUniqueOptions('category');
    const uniqueColors = getUniqueOptions('color');
    const uniqueCollections = getUniqueOptions('collection');
    const uniqueFabrics = getUniqueOptions('fabric');

    const handleFilterChange = (setter, value) => {
        setter(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        );
    };

    // --- Filtering Logic ---
    const filteredData = cardData.filter(product => {
        const productPrice = Number(product.retailPrice || 0);
        const matchesGender = selectedGender === 'All' || product.gender === selectedGender;
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const productColors = Array.isArray(product.colors)
            ? product.colors
            : (product.color ? [product.color] : []);
        const matchesColor = selectedColors.length === 0 || selectedColors.some(color => productColors.includes(color));
        const matchesFabric = selectedFabrics.length === 0 || selectedFabrics.includes(product.fabric);
        const matchesPrice = productPrice >= priceRange.min && productPrice <= priceRange.max;
        const matchesCollection = selectedCollections.length === 0 || selectedCollections.includes(product.collection);
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesGender && matchesCategory && matchesColor && matchesFabric && matchesPrice && matchesCollection && matchesSearch;
    });

    // --- Sorting ---
    const sortedData = [...filteredData].sort((a, b) => {
        const priceA = Number(a.retailPrice || 0);
        const priceB = Number(b.retailPrice || 0);
        if (sortOrder === 'price-asc') return priceA - priceB;
        if (sortOrder === 'price-desc') return priceB - priceA;
        if (sortOrder === 'alpha-asc') return a.name.localeCompare(b.name);
        return 0;
    });

    const groupedProducts = sortedData.reduce((acc, product) => {
        const category = product.category;
        if (!acc[category]) acc[category] = [];
        acc[category].push(product);
        return acc;
    }, {});

    return (
        <>
            <CarouselComponent />
            <About/>

            <div className="container mx-auto p-4 relative">
                <h1 className="text-4xl font-bold text-center my-8">Our Products</h1>

                {/* Gender + Sort + Filter */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex space-x-4">
                        {['All', 'Men', 'Women'].map(g => (
                            <button
                                key={g}
                                onClick={() => setSelectedGender(g)}
                                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${selectedGender === g ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                                {g}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${isFilterPanelOpen ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            Filter
                        </button>
                        <label htmlFor="sort-select" className="font-semibold text-gray-700 ml-4">Sort by:</label>
                        <select
                            id="sort-select"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="default">Default</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="alpha-asc">Alphabetically: A-Z</option>
                        </select>
                    </div>
                </div>

                {/* Search */}
                <div className="flex justify-end mt-6 mb-8">
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border-2 border-white bg-transparent text-blue placeholder-gray-300 rounded-l-md p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Filter Panel */}
                <div className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-xl p-6 transform transition-transform duration-300 z-50 overflow-y-auto ${isFilterPanelOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">Filters</h3>
                        <button onClick={() => setIsFilterPanelOpen(false)} className="text-gray-500 hover:text-gray-700">
                            ✕
                        </button>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-6">
                        <h4 className="font-bold mb-2">Category</h4>
                        {uniqueCategories.map(category => (
                            <label key={category} className="flex items-center space-x-2 mb-1">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => handleFilterChange(setSelectedCategories, category)}
                                    className="rounded text-blue-600"
                                />
                                <span>{category}</span>
                            </label>
                        ))}
                    </div>

                    {/* Fabric Filter */}
                    <div className="mb-6">
                        <h4 className="font-bold mb-2">Fabric Type</h4>
                        {uniqueFabrics.map(fabric => (
                            <label key={fabric} className="flex items-center space-x-2 mb-1">
                                <input
                                    type="checkbox"
                                    checked={selectedFabrics.includes(fabric)}
                                    onChange={() => handleFilterChange(setSelectedFabrics, fabric)}
                                    className="rounded text-blue-600"
                                />
                                <span>{fabric}</span>
                            </label>
                        ))}
                    </div>

                    {/* Collection Filter */}
                    <div className="mt-4">
                        <h3 className="font-semibold mb-2">Collection</h3>
                        <ul className="space-y-2">
                            {uniqueCollections.map((collection) => (
                                <li key={collection} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={collection}
                                        checked={selectedCollections.includes(collection)}
                                        onChange={() => handleFilterChange(setSelectedCollections, collection)}
                                        className="mr-2 accent-blue-500"
                                    />
                                    <label htmlFor={collection} className="cursor-pointer">
                                        {collection}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Color Filter */}
                    <div className="mb-6 mt-6">
                        <h2 className="text-lg font-semibold mb-2">Colors</h2>
                        <div className="flex flex-wrap gap-3">
                            {uniqueColors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => handleFilterChange(setSelectedColors, color)}
                                    className={`flex items-center gap-2 px-3 py-1 rounded-full border transition ${
                                        selectedColors.includes(color)
                                            ? "border-black scale-105"
                                            : "border-gray-300"
                                    }`}
                                >
                                    <span className="w-5 h-5 rounded-full border" style={{ backgroundColor: color }}></span>
                                    <span className="text-sm">{color}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="mb-6">
                        <h4 className="font-bold mb-2">Price Range</h4>
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                min={priceBounds.min}
                                max={priceBounds.max}
                                value={priceRange.min}
                                onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                                className="w-1/2 p-2 border rounded-md"
                            />
                            <span>to</span>
                            <input
                                type="number"
                                min={priceBounds.min}
                                max={priceBounds.max}
                                value={priceRange.max}
                                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                                className="w-1/2 p-2 border rounded-md"
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                            Range: {priceBounds.min} – {priceBounds.max}
                        </p>
                    </div>
                </div>

                {/* Overlay */}
                {isFilterPanelOpen && (
                    <div
                        className="fixed inset-0 bg-blue-900 opacity-50 z-40"
                        onClick={() => setIsFilterPanelOpen(false)}
                    ></div>
                )}

                {/* Products */}
                {Object.keys(groupedProducts).length > 0 ? (
                    Object.keys(groupedProducts).map(category => (
                        <div key={category} className="mb-12">
                            <h2 className="text-3xl font-bold mt-8 mb-4 text-left">{category}</h2>
                            <hr className="my-4 border-2 border-blue-800" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                                {groupedProducts[category].map(product => (
                                    <Card key={product.id} foodData={product} user={user} /> // ✅ pass user if needed
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-xl mt-12">No products match your filter criteria.</p>
                )}
            </div>
        </>
    );
}

// 'use client';

// import React, { useState, useEffect, useCallback } from "react";
// import axios from 'axios';
// import CarouselComponent from "@/components/home/Carousel";
// import Card from "@/components/home/Card";
// // import cardData from "../store/cardData.json"; // 🛑 REMOVED STATIC IMPORT
// import { useAuth } from "@/utils/AuthContext";
// import About from '@/components/layouts/About';

// export default function Home() {
//     const { user } = useAuth(); // ✅ get current user
    
//     // 💡 NEW STATE for products and loading
//     const [cardData, setCardData] = useState([]);
//     const [loading, setLoading] = useState(true);
    
//     // --- 1. Price State Initialization (Default Fallbacks) ---
//     const initialMinPrice = 0;
//     const initialMaxPrice = 5000;

//     // --- 2. Filter States ---
//     const [selectedGender, setSelectedGender] = useState('All');
//     const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
//     const [selectedCategories, setSelectedCategories] = useState([]);
//     const [selectedColors, setSelectedColors] = useState([]);
//     const [selectedFabrics, setSelectedFabrics] = useState([]);
    
//     // Price range bounds and current range are initialized with fallbacks
//     const [priceBounds, setPriceBounds] = useState({ min: initialMinPrice, max: initialMaxPrice });
//     const [priceRange, setPriceRange] = useState({ min: initialMinPrice, max: initialMaxPrice });
    
//     const [sortOrder, setSortOrder] = useState('default');
//     const [searchTerm, setSearchTerm] = useState("");
//     const [selectedCollections, setSelectedCollections] = useState([]);

//     // --- 3. Dynamic Data Fetching Function ---
//     const fetchProducts = useCallback(async () => {
//         setLoading(true);
//         try {
//             // Fetch live data from the database
//             const response = await axios.get('pages/api/admin/products.js'); 
//             const products = response.data.products;

//             // 💡 Calculate price bounds based on fetched data
//             const allRetailPrices = products.map(p => Number(p.retailPrice || 0));
//             const minPrice = Math.min(...allRetailPrices) || initialMinPrice;
//             const maxPrice = Math.max(...allRetailPrices) || initialMaxPrice;

//             setPriceBounds({ min: minPrice, max: maxPrice });
//             setPriceRange({ min: minPrice, max: maxPrice });
//             setCardData(products);

//         } catch (error) {
//             console.error("Error fetching products:", error);
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     // Fetch data on component mount
//     useEffect(() => {
//         fetchProducts();
//     }, [fetchProducts]);

//     // --- Helper function to get unique filter options (Now uses cardData state) ---
//     const getUniqueOptions = (key) => {
//         const allOptions = cardData.flatMap(product => {
//             if (key === 'colors' || key === 'color') {
//                 return Array.isArray(product.colors || product.color)
//                     ? (product.colors || [])
//                     : (product.color ? [product.color] : []);
//             }
//             return product[key] || '';
//         });
//         return [...new Set(allOptions.filter(Boolean))];
//     };

//     const uniqueCategories = getUniqueOptions('category');
//     const uniqueColors = getUniqueOptions('color');
//     const uniqueCollections = getUniqueOptions('collection');
//     const uniqueFabrics = getUniqueOptions('fabric');

//     const handleFilterChange = (setter, value) => {
//         setter(prev =>
//             prev.includes(value)
//                 ? prev.filter(item => item !== value)
//                 : [...prev, value]
//         );
//     };

//     // --- Filtering Logic ---
//     const filteredData = cardData.filter(product => {
//         // 💡 Use the ORIGINAL retail price for filtering price range
//         const productPrice = Number(product.retailPrice || 0); 
        
//         const matchesGender = selectedGender === 'All' || product.gender === selectedGender;
//         const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
//         const productColors = Array.isArray(product.colors)
//             ? product.colors
//             : (product.color ? [product.color] : []);
//         const matchesColor = selectedColors.length === 0 || selectedColors.some(color => productColors.includes(color));
//         const matchesFabric = selectedFabrics.length === 0 || selectedFabrics.includes(product.fabric);
//         const matchesPrice = productPrice >= priceRange.min && productPrice <= priceRange.max;
//         const matchesCollection = selectedCollections.length === 0 || selectedCollections.includes(product.collection);
//         const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());

//         return matchesGender && matchesCategory && matchesColor && matchesFabric && matchesPrice && matchesCollection && matchesSearch;
//     });

//     // --- Sorting ---
//     const sortedData = [...filteredData].sort((a, b) => {
//         // 💡 Ensure sorting logic handles the retailPrice conversion safely
//         const priceA = Number(a.retailPrice || 0);
//         const priceB = Number(b.retailPrice || 0);
//         if (sortOrder === 'price-asc') return priceA - priceB;
//         if (sortOrder === 'price-desc') return priceB - priceA;
//         if (sortOrder === 'alpha-asc') return a.name.localeCompare(b.name);
//         return 0;
//     });

//     const groupedProducts = sortedData.reduce((acc, product) => {
//         const category = product.category;
//         if (!acc[category]) acc[category] = [];
//         acc[category].push(product);
//         return acc;
//     }, {});
    
//     if (loading) {
//         return <div className="text-center p-12 text-xl font-semibold">Loading products...</div>;
//     }

//     return (
//         <>
//             <CarouselComponent />
//             <About/>

//             <div className="container mx-auto p-4 relative">
//                 <h1 className="text-4xl font-bold text-center my-8">Our Products</h1>

//                 {/* Gender + Sort + Filter */}
//                 <div className="flex justify-between items-center mb-8">
//                     <div className="flex space-x-4">
//                         {['All', 'Men', 'Women'].map(g => (
//                             <button
//                                 key={g}
//                                 onClick={() => setSelectedGender(g)}
//                                 className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${selectedGender === g ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
//                             >
//                                 {g}
//                             </button>
//                         ))}
//                     </div>
//                     <div className="flex items-center space-x-2">
//                         <button
//                             onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
//                             className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${isFilterPanelOpen ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
//                         >
//                             Filter
//                         </button>
//                         <label htmlFor="sort-select" className="font-semibold text-gray-700 ml-4">Sort by:</label>
//                         <select
//                             id="sort-select"
//                             value={sortOrder}
//                             onChange={(e) => setSortOrder(e.target.value)}
//                             className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         >
//                             <option value="default">Default</option>
//                             <option value="price-asc">Price: Low to High</option>
//                             <option value="price-desc">Price: High to Low</option>
//                             <option value="alpha-asc">Alphabetically: A-Z</option>
//                         </select>
//                     </div>
//                 </div>

//                 {/* Search */}
//                 <div className="flex justify-end mt-6 mb-8">
//                     <div className="flex items-center">
//                         <input
//                             type="text"
//                             placeholder="Search by name..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="border-2 border-white bg-transparent text-blue placeholder-gray-300 rounded-l-md p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                         <button
//                             className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition"
//                         >
//                             Search
//                         </button>
//                     </div>
//                 </div>

//                 {/* Filter Panel (No changes needed) */}
//                 <div className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-xl p-6 transform transition-transform duration-300 z-50 overflow-y-auto ${isFilterPanelOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//                     <div className="flex justify-between items-center mb-6">
//                         <h3 className="text-xl font-bold">Filters</h3>
//                         <button onClick={() => setIsFilterPanelOpen(false)} className="text-gray-500 hover:text-gray-700">
//                             ✕
//                         </button>
//                     </div>

//                     {/* Category Filter */}
//                     <div className="mb-6">
//                         <h4 className="font-bold mb-2">Category</h4>
//                         {uniqueCategories.map(category => (
//                             <label key={category} className="flex items-center space-x-2 mb-1">
//                                 <input
//                                     type="checkbox"
//                                     checked={selectedCategories.includes(category)}
//                                     onChange={() => handleFilterChange(setSelectedCategories, category)}
//                                     className="rounded text-blue-600"
//                                 />
//                                 <span>{category}</span>
//                             </label>
//                         ))}
//                     </div>

//                     {/* Fabric Filter */}
//                     <div className="mb-6">
//                         <h4 className="font-bold mb-2">Fabric Type</h4>
//                         {uniqueFabrics.map(fabric => (
//                             <label key={fabric} className="flex items-center space-x-2 mb-1">
//                                 <input
//                                     type="checkbox"
//                                     checked={selectedFabrics.includes(fabric)}
//                                     onChange={() => handleFilterChange(setSelectedFabrics, fabric)}
//                                     className="rounded text-blue-600"
//                                 />
//                                 <span>{fabric}</span>
//                             </label>
//                         ))}
//                     </div>

//                     {/* Collection Filter */}
//                     <div className="mt-4">
//                         <h3 className="font-semibold mb-2">Collection</h3>
//                         <ul className="space-y-2">
//                             {uniqueCollections.map((collection) => (
//                                 <li key={collection} className="flex items-center">
//                                     <input
//                                         type="checkbox"
//                                         id={collection}
//                                         checked={selectedCollections.includes(collection)}
//                                         onChange={() => handleFilterChange(setSelectedCollections, collection)}
//                                         className="mr-2 accent-blue-500"
//                                     />
//                                     <label htmlFor={collection} className="cursor-pointer">
//                                         {collection}
//                                     </label>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* Color Filter */}
//                     <div className="mb-6 mt-6">
//                         <h2 className="text-lg font-semibold mb-2">Colors</h2>
//                         <div className="flex flex-wrap gap-3">
//                             {uniqueColors.map((color) => (
//                                 <button
//                                     key={color}
//                                     onClick={() => handleFilterChange(setSelectedColors, color)}
//                                     className={`flex items-center gap-2 px-3 py-1 rounded-full border transition ${
//                                         selectedColors.includes(color)
//                                             ? "border-black scale-105"
//                                             : "border-gray-300"
//                                     }`}
//                                 >
//                                     <span className="w-5 h-5 rounded-full border" style={{ backgroundColor: color }}></span>
//                                     <span className="text-sm">{color}</span>
//                                 </button>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Price Range */}
//                     <div className="mb-6">
//                         <h4 className="font-bold mb-2">Price Range</h4>
//                         <div className="flex items-center space-x-2">
//                             <input
//                                 type="number"
//                                 min={priceBounds.min}
//                                 max={priceBounds.max}
//                                 value={priceRange.min}
//                                 onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
//                                 className="w-1/2 p-2 border rounded-md"
//                             />
//                             <span>to</span>
//                             <input
//                                 type="number"
//                                 min={priceBounds.min}
//                                 max={priceBounds.max}
//                                 value={priceRange.max}
//                                 onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
//                                 className="w-1/2 p-2 border rounded-md"
//                             />
//                         </div>
//                         <p className="text-sm text-gray-500 mt-1">
//                             Range: {priceBounds.min} – {priceBounds.max}
//                         </p>
//                     </div>
//                 </div>

//                 {/* Overlay */}
//                 {isFilterPanelOpen && (
//                     <div
//                         className="fixed inset-0 bg-blue-900 opacity-50 z-40"
//                         onClick={() => setIsFilterPanelOpen(false)}
//                     ></div>
//                 )}

//                 {/* Products */}
//                 {Object.keys(groupedProducts).length > 0 ? (
//                     Object.keys(groupedProducts).map(category => (
//                         <div key={category} className="mb-12">
//                             <h2 className="text-3xl font-bold mt-8 mb-4 text-left">{category}</h2>
//                             <hr className="my-4 border-2 border-blue-800" />
//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
//                                 {groupedProducts[category].map(product => (
//                                     <Card key={product._id || product.id} foodData={product} user={user} />
//                                 ))}
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-center text-xl mt-12">No products match your filter criteria.</p>
//                 )}
//             </div>
//         </>
//     );
// }