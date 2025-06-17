// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';

// const FilterSidebar = () => {
//     const [searchParams, setSearchParams] = useSearchParams();
//     const [filters, setFilters] = useState({
//         category: "",
//         gender: "",
//         color: "",
//         size: [],
//         material: [],
//         brand: "",
//         minPrice: 0,
//         maxPrice: 100,
//     });

//     const categories = ["Top Wear", "Bottom Wear"];
//     const colors = ["Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Pink", "Black", "White", "Gray"];
//     const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
//     const materials = ["Cotton", "Polyester", "Wool", "Silk", "Linen", "Denim", "Leather", "Velvet", "Nylon", "Cashmere"];
//     const brands = ["Urban Threads", "Modern Fit", "Street Style", "Beach Breeze", "Fashionista", "ChicStyle"];
//     const genders = ["Men", "Women"];

//     useEffect(() => {
//         const params = Object.fromEntries([...searchParams]);
//         setFilters({
//             category: params.category || "",
//             gender: params.gender || "",
//             color: params.color || "",
//             size: params.size ? params.size.split(",") : [],
//             material: params.material ? params.material.split(",") : [],
//             brand: params.brand || "",
//             minPrice: params.minPrice || 0,
//             maxPrice: params.maxPrice || 100,
//         });
//     }, [searchParams]);

//     const updateFilters = (newFilters) => {
//         setFilters(prev => ({ ...prev, ...newFilters }));
//         setSearchParams({ ...filters, ...newFilters });
   
//     };
    

//     return (
//         <div className='p-4 h-screen overflow-y-auto sticky overflow-scroll lg:h-auto'>
//             <h3 className='text-xl font-medium text-gray-800 mb-4 sticky top-0 bg-white z-10'>Filter</h3>

//             {/* Category */}
//             <div className='mb-6'>
//                 <label className='block text-gray-600 font-medium mb-2'>Category</label>
//                 {categories.map(category => (
//                     <div key={category} className='flex items-center mb-1'>
//                         <input
//                             type="radio"
//                             name='category'
//                             value={category}
//                             checked={filters.category === category}
//                             onChange={() => updateFilters({ category })}
//                             className='mr-2 h-4 w-4 text-blue-500'
//                         />
//                         <span className='text-gray-700'>{category}</span>
//                     </div>
//                 ))}
//             </div>

//             {/* Gender */}
//             <div className='mb-6'>
//                 <label className='block text-gray-600 font-medium mb-2'>Gender</label>
//                 {genders.map(gender => (
//                     <div key={gender} className='flex items-center mb-1'>
//                         <input
//                             type="radio"
//                             name='gender'
//                             value={gender}
//                             checked={filters.gender === gender}
//                             onChange={() => updateFilters({ gender })}
//                             className='mr-2 h-4 w-4 text-blue-500'
//                         />
//                         <span className='text-gray-700'>{gender}</span>
//                     </div>
//                 ))}
//             </div>

//             {/* Color */}
//             <div className='mb-6'>
//                 <label className='block text-gray-600 font-medium mb-2'>Color</label>
//                 {colors.map(color => (
//                     <div key={color} className='flex items-center mb-1'>
//                         <input
//                             type="radio"
//                             name='color'
//                             value={color}
//                             checked={filters.color === color}
//                             onChange={() => updateFilters({ color })}
//                             className='mr-2 h-4 w-4 text-blue-500'
//                         />
//                         <span className='text-gray-700'>{color}</span>
//                     </div>
//                 ))}
//             </div>

//             {/* Size */}
//             <div className='mb-6'>
//                 <label className='block text-gray-600 font-medium mb-2'>Size</label>
//                 {sizes.map(size => (
//                     <div key={size} className='flex items-center mb-1'>
//                         <input
//                             type="checkbox"
//                             name='size'
//                             value={size}
//                             checked={filters.size.includes(size)}
//                             onChange={(e) => {
//                                 const newSize = e.target.checked
//                                     ? [...filters.size, size]
//                                     : filters.size.filter(s => s !== size);
//                                 updateFilters({ size: newSize });
//                             }}
//                             className='mr-2 h-4 w-4 text-blue-500'
//                         />
//                         <span className='text-gray-700'>{size}</span>
//                     </div>
//                 ))}
//             </div>

//             {/* Material */}
//             <div className='mb-6'>
//                 <label className='block text-gray-600 font-medium mb-2'>Material</label>
//                 {materials.map(material => (
//                     <div key={material} className='flex items-center mb-1'>
//                         <input
//                             type="checkbox"
//                             name='material'
//                             value={material}
//                             checked={filters.material.includes(material)}
//                             onChange={(e) => {
//                                 const newMaterial = e.target.checked
//                                     ? [...filters.material, material]
//                                     : filters.material.filter(m => m !== material);
//                                 updateFilters({ material: newMaterial });
//                             }}
//                             className='mr-2 h-4 w-4 text-blue-500'
//                         />
//                         <span className='text-gray-700'>{material}</span>
//                     </div>
//                 ))}
//             </div>

//             {/* Brand */}
//             <div className='mb-6'>
//                 <label className='block text-gray-600 font-medium mb-2'>Brand</label>
//                 {brands.map(brand => (
//                     <div key={brand} className='flex items-center mb-1'>
//                         <input
//                             type="radio"
//                             name='brand'
//                             value={brand}
//                             checked={filters.brand === brand}
//                             onChange={() => updateFilters({ brand })}
//                             className='mr-2 h-4 w-4 text-blue-500'
//                         />
//                         <span className='text-gray-700'>{brand}</span>
//                     </div>
//                 ))}
//             </div>

//             {/* Price Range */}
//             <div className='mb-6'>
//                 <label className='block text-gray-600 font-medium mb-2'>Price Range</label>
//                 <input
//                     type="range"
//                     min="0"
//                     max="1000"
//                     value={filters.maxPrice}
//                     onChange={(e) => updateFilters({ maxPrice: e.target.value })}
//                     className='w-full'
//                 />
//                 <div className='flex justify-between text-gray-700'>
//                     <span>$0</span>
//                     <span>${filters.maxPrice}</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FilterSidebar;
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const FilterSidebar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState({
        category: [],
        gender: "", // Single selection for gender
        color: [],
        size: [],
        material: [],
        brand: [],
        minPrice: 0,
        maxPrice: 100,
    });

    const categories = ["Top Wear", "Bottom Wear"];
    const colors = ["Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Pink", "Black", "White", "Gray"];
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const materials = ["Cotton", "Polyester", "Wool", "Silk", "Linen", "Denim", "Leather", "Velvet", "Nylon", "Cashmere"];
    const brands = ["Urban Threads", "Modern Fit", "Street Style", "Beach Breeze", "Fashionista", "ChicStyle"];
    const genders = ["Men", "Women"];

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        setFilters({
            category: params.category ? params.category.split(",") : [],
            gender: params.gender || "",
            color: params.color ? params.color.split(",") : [],
            size: params.size ? params.size.split(",") : [],
            material: params.material ? params.material.split(",") : [],
            brand: params.brand ? params.brand.split(",") : [],
            minPrice: parseInt(params.minPrice) || 0,
            maxPrice: parseInt(params.maxPrice) || 100,
        });
    }, [searchParams]);

    // Update multi-select filters
    const updateMultiSelectFilters = (key, value, isChecked) => {
        setFilters(prev => {
            const newArray = isChecked
                ? [...prev[key], value]
                : prev[key].filter(item => item !== value);
            const updatedFilters = { ...prev, [key]: newArray };
            const params = {
                ...updatedFilters,
                category: updatedFilters.category.join(","),
                gender: updatedFilters.gender,
                color: updatedFilters.color.join(","),
                size: updatedFilters.size.join(","),
                material: updatedFilters.material.join(","),
                brand: updatedFilters.brand.join(","),
            };
            setSearchParams(params);
            return updatedFilters;
        });
    };

    // Update single-select gender
    const updateGender = (gender) => {
        setFilters(prev => {
            const updatedFilters = { ...prev, gender };
            const params = {
                ...updatedFilters,
                category: updatedFilters.category.join(","),
                gender: updatedFilters.gender,
                color: updatedFilters.color.join(","),
                size: updatedFilters.size.join(","),
                material: updatedFilters.material.join(","),
                brand: updatedFilters.brand.join(","),
            };
            setSearchParams(params);
            return updatedFilters;
        });
    };

    // Update price
    const updatePrice = (key, value) => {
        setFilters(prev => {
            const updatedFilters = { ...prev, [key]: parseInt(value) };
            const params = {
                ...updatedFilters,
                category: updatedFilters.category.join(","),
                gender: updatedFilters.gender,
                color: updatedFilters.color.join(","),
                size: updatedFilters.size.join(","),
                material: updatedFilters.material.join(","),
                brand: updatedFilters.brand.join(","),
            };
            setSearchParams(params);
            return updatedFilters;
        });
    };

    return (
        <div className='p-4 h-screen overflow-y-auto lg:h-auto'>
            <h3 className='text-xl font-medium text-gray-800 mb-4 sticky top-0 bg-white z-10'>Filter</h3>

            {/* Category */}
            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2'>Category</label>
                {categories.map(category => (
                    <div key={category} className='flex items-center mb-1 cursor-pointer'>
                        <input
                            type="checkbox"
                            name='category'
                            value={category}
                            checked={filters.category.includes(category)}
                            onChange={(e) => updateMultiSelectFilters('category', category, e.target.checked)}
                            className='mr-2 h-4 w-4 text-blue-500 cursor-pointer'
                        />
                        <span className='text-gray-700'>{category}</span>
                    </div>
                ))}
            </div>

            {/* Gender (Single Select) */}
            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2'>Gender</label>
                {genders.map(gender => (
                    <div key={gender} className='flex items-center mb-1 cursor-pointer'>
                        <input
                            type="radio"
                            name='gender'
                            value={gender}
                            checked={filters.gender === gender}
                            onChange={() => updateGender(gender)}
                            className='mr-2 h-4 w-4 text-blue-500 cursor-pointer'
                        />
                        <span className='text-gray-700'>{gender}</span>
                    </div>
                ))}
            </div>

            {/* Color */}
            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2'>Color</label>
                {colors.map(color => (
                    <div key={color} className='flex items-center mb-1 cursor-pointer'>
                        <input
                            type="checkbox"
                            name='color'
                            value={color}
                            checked={filters.color.includes(color)}
                            onChange={(e) => updateMultiSelectFilters('color', color, e.target.checked)}
                            className='mr-2 h-4 w-4 text-blue-500 cursor-pointer'
                        />
                        <span className='text-gray-700'>{color}</span>
                    </div>
                ))}
            </div>

            {/* Size */}
            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2'>Size</label>
                {sizes.map(size => (
                    <div key={size} className='flex items-center mb-1 cursor-pointer'>
                        <input
                            type="checkbox"
                            name='size'
                            value={size}
                            checked={filters.size.includes(size)}
                            onChange={(e) => updateMultiSelectFilters('size', size, e.target.checked)}
                            className='mr-2 h-4 w-4 text-blue-500 cursor-pointer'
                        />
                        <span className='text-gray-700'>{size}</span>
                    </div>
                ))}
            </div>

            {/* Material */}
            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2'>Material</label>
                {materials.map(material => (
                    <div key={material} className='flex items-center mb-1 cursor-pointer'>
                        <input
                            type="checkbox"
                            name='material'
                            value={material}
                            checked={filters.material.includes(material)}
                            onChange={(e) => updateMultiSelectFilters('material', material, e.target.checked)}
                            className='mr-2 h-4 w-4 text-blue-500 cursor-pointer'
                        />
                        <span className='text-gray-700'>{material}</span>
                    </div>
                ))}
            </div>

            {/* Brand */}
            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2'>Brand</label>
                {brands.map(brand => (
                    <div key={brand} className='flex items-center mb-1 cursor-pointer'>
                        <input
                            type="checkbox"
                            name='brand'
                            value={brand}
                            checked={filters.brand.includes(brand)}
                            onChange={(e) => updateMultiSelectFilters('brand', brand, e.target.checked)}
                            className='mr-2 h-4 w-4 text-blue-500 cursor-pointer'
                        />
                        <span className='text-gray-700'>{brand}</span>
                    </div>
                ))}
            </div>

            {/* Price Range */}
            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2'>Price Range</label>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    value={filters.maxPrice}
                    onChange={(e) => updatePrice('maxPrice', e.target.value)}
                    className='w-full cursor-pointer'
                />
                <div className='flex justify-between text-gray-700'>
                    <span>$0</span>
                    <span>${filters.maxPrice}</span>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;