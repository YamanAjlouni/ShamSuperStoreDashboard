import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './CategoriesManagement.scss'

const CategoriesManagement = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [showAddCategory, setShowAddCategory] = useState(false)
    const [showAddSubcategory, setShowAddSubcategory] = useState(false)
    const [showAddSubSubcategory, setShowAddSubSubcategory] = useState(false)
    const [selectedParentCategory, setSelectedParentCategory] = useState('')
    const [selectedParentSubcategory, setSelectedParentSubcategory] = useState('')
    const [newCategoryName, setNewCategoryName] = useState('')
    const [newCategoryNameAr, setNewCategoryNameAr] = useState('')
    const [newCategoryDescription, setNewCategoryDescription] = useState('')
    const [newCategoryCommissionRate, setNewCategoryCommissionRate] = useState('')
    const [newCategoryUseOverride, setNewCategoryUseOverride] = useState(false)
    const [newSubcategoryName, setNewSubcategoryName] = useState('')
    const [newSubcategoryNameAr, setNewSubcategoryNameAr] = useState('')
    const [newSubcategoryDescription, setNewSubcategoryDescription] = useState('')
    const [newSubcategoryCommissionRate, setNewSubcategoryCommissionRate] = useState('')
    const [newSubcategoryUseOverride, setNewSubcategoryUseOverride] = useState(false)
    const [newSubSubcategoryName, setNewSubSubcategoryName] = useState('')
    const [newSubSubcategoryNameAr, setNewSubSubcategoryNameAr] = useState('')
    const [newSubSubcategoryDescription, setNewSubSubcategoryDescription] = useState('')
    const [newSubSubcategoryCommissionRate, setNewSubSubcategoryCommissionRate] = useState('')
    const [newSubSubcategoryUseOverride, setNewSubSubcategoryUseOverride] = useState(false)

    // Mock data - replace with actual API call
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true)
            // Simulate API call
            setTimeout(() => {
                const mockCategories = [
                    {
                        id: 'CAT001',
                        name: 'Electronics',
                        nameAr: 'الإلكترونيات',
                        description: 'Electronic devices and accessories',
                        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop',
                        status: 'active',
                        productsCount: 245,
                        subcategoriesCount: 4,
                        subSubcategoriesCount: 8,
                        createdAt: '2024-01-10',
                        defaultCommissionRate: 5.0,
                        commissionRateOverride: 7.5,
                        useCommissionOverride: true,
                        subcategories: [
                            {
                                id: 'SUB001',
                                name: 'Smartphones',
                                nameAr: 'الهواتف الذكية',
                                description: 'Mobile phones and accessories',
                                status: 'active',
                                productsCount: 89,
                                subSubcategoriesCount: 3,
                                createdAt: '2024-01-10',
                                defaultCommissionRate: 5.0,
                                commissionRateOverride: 8.0,
                                useCommissionOverride: true,
                                subSubcategories: [
                                    {
                                        id: 'SUBSUB001',
                                        name: 'iPhone',
                                        nameAr: 'آيفون',
                                        description: 'Apple iPhone devices and accessories',
                                        status: 'active',
                                        productsCount: 45,
                                        createdAt: '2024-01-10',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: null,
                                        useCommissionOverride: false
                                    },
                                    {
                                        id: 'SUBSUB002',
                                        name: 'Android',
                                        nameAr: 'أندرويد',
                                        description: 'Android smartphone devices',
                                        status: 'active',
                                        productsCount: 32,
                                        createdAt: '2024-01-10',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: 6.5,
                                        useCommissionOverride: true
                                    },
                                    {
                                        id: 'SUBSUB003',
                                        name: 'Phone Cases',
                                        nameAr: 'أغطية الهواتف',
                                        description: 'Protective cases for smartphones',
                                        status: 'active',
                                        productsCount: 12,
                                        createdAt: '2024-01-10',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: null,
                                        useCommissionOverride: false
                                    }
                                ]
                            },
                            {
                                id: 'SUB002',
                                name: 'Laptops',
                                nameAr: 'أجهزة الكمبيوتر المحمولة',
                                description: 'Portable computers and accessories',
                                status: 'active',
                                productsCount: 56,
                                subSubcategoriesCount: 2,
                                createdAt: '2024-01-10',
                                defaultCommissionRate: 5.0,
                                commissionRateOverride: null,
                                useCommissionOverride: false,
                                subSubcategories: [
                                    {
                                        id: 'SUBSUB004',
                                        name: 'Gaming Laptops',
                                        nameAr: 'أجهزة كمبيوتر الألعاب',
                                        description: 'High-performance gaming laptops',
                                        status: 'active',
                                        productsCount: 28,
                                        createdAt: '2024-01-10',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: 4.5,
                                        useCommissionOverride: true
                                    },
                                    {
                                        id: 'SUBSUB005',
                                        name: 'Business Laptops',
                                        nameAr: 'أجهزة كمبيوتر الأعمال',
                                        description: 'Professional laptops for business use',
                                        status: 'active',
                                        productsCount: 28,
                                        createdAt: '2024-01-10',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: null,
                                        useCommissionOverride: false
                                    }
                                ]
                            },
                            {
                                id: 'SUB003',
                                name: 'Audio & Headphones',
                                nameAr: 'الصوتيات وسماعات الرأس',
                                description: 'Headphones, speakers, and audio equipment',
                                status: 'active',
                                productsCount: 67,
                                subSubcategoriesCount: 2,
                                createdAt: '2024-01-10',
                                defaultCommissionRate: 5.0,
                                commissionRateOverride: 9.0,
                                useCommissionOverride: true,
                                subSubcategories: [
                                    {
                                        id: 'SUBSUB006',
                                        name: 'Wireless Headphones',
                                        nameAr: 'سماعات رأس لاسلكية',
                                        description: 'Bluetooth and wireless audio devices',
                                        status: 'active',
                                        productsCount: 40,
                                        createdAt: '2024-01-10',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: null,
                                        useCommissionOverride: false
                                    },
                                    {
                                        id: 'SUBSUB007',
                                        name: 'Speakers',
                                        nameAr: 'مكبرات الصوت',
                                        description: 'Portable and home speakers',
                                        status: 'active',
                                        productsCount: 27,
                                        createdAt: '2024-01-10',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: 10.0,
                                        useCommissionOverride: true
                                    }
                                ]
                            },
                            {
                                id: 'SUB004',
                                name: 'Gaming',
                                nameAr: 'الألعاب',
                                description: 'Gaming consoles and accessories',
                                status: 'inactive',
                                productsCount: 33,
                                subSubcategoriesCount: 1,
                                createdAt: '2024-01-10',
                                defaultCommissionRate: 5.0,
                                commissionRateOverride: null,
                                useCommissionOverride: false,
                                subSubcategories: [
                                    {
                                        id: 'SUBSUB008',
                                        name: 'Gaming Consoles',
                                        nameAr: 'أجهزة الألعاب',
                                        description: 'Video game consoles and controllers',
                                        status: 'inactive',
                                        productsCount: 33,
                                        createdAt: '2024-01-10',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: null,
                                        useCommissionOverride: false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 'CAT002',
                        name: 'Clothing & Fashion',
                        nameAr: 'الملابس والأزياء',
                        description: 'Apparel and fashion accessories',
                        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
                        status: 'active',
                        productsCount: 156,
                        subcategoriesCount: 3,
                        subSubcategoriesCount: 6,
                        createdAt: '2024-01-12',
                        defaultCommissionRate: 5.0,
                        commissionRateOverride: 12.0,
                        useCommissionOverride: true,
                        subcategories: [
                            {
                                id: 'SUB005',
                                name: "Men's Clothing",
                                nameAr: 'ملابس رجالية',
                                description: 'Clothing for men',
                                status: 'active',
                                productsCount: 78,
                                subSubcategoriesCount: 2,
                                createdAt: '2024-01-12',
                                defaultCommissionRate: 5.0,
                                commissionRateOverride: null,
                                useCommissionOverride: false,
                                subSubcategories: [
                                    {
                                        id: 'SUBSUB009',
                                        name: 'Shirts',
                                        nameAr: 'قمصان',
                                        description: 'Casual and formal shirts',
                                        status: 'active',
                                        productsCount: 45,
                                        createdAt: '2024-01-12',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: 15.0,
                                        useCommissionOverride: true
                                    },
                                    {
                                        id: 'SUBSUB010',
                                        name: 'Pants',
                                        nameAr: 'بناطيل',
                                        description: 'Jeans, trousers, and casual pants',
                                        status: 'active',
                                        productsCount: 33,
                                        createdAt: '2024-01-12',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: null,
                                        useCommissionOverride: false
                                    }
                                ]
                            },
                            {
                                id: 'SUB006',
                                name: "Women's Clothing",
                                nameAr: 'ملابس نسائية',
                                description: 'Clothing for women',
                                status: 'active',
                                productsCount: 65,
                                subSubcategoriesCount: 2,
                                createdAt: '2024-01-12',
                                defaultCommissionRate: 5.0,
                                commissionRateOverride: 11.5,
                                useCommissionOverride: true,
                                subSubcategories: [
                                    {
                                        id: 'SUBSUB011',
                                        name: 'Dresses',
                                        nameAr: 'فساتين',
                                        description: 'Casual and formal dresses',
                                        status: 'active',
                                        productsCount: 35,
                                        createdAt: '2024-01-12',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: null,
                                        useCommissionOverride: false
                                    },
                                    {
                                        id: 'SUBSUB012',
                                        name: 'Tops',
                                        nameAr: 'بلوزات',
                                        description: 'Blouses, t-shirts, and tops',
                                        status: 'active',
                                        productsCount: 30,
                                        createdAt: '2024-01-12',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: 13.0,
                                        useCommissionOverride: true
                                    }
                                ]
                            },
                            {
                                id: 'SUB007',
                                name: 'Accessories',
                                nameAr: 'إكسسوارات',
                                description: 'Fashion accessories and jewelry',
                                status: 'active',
                                productsCount: 13,
                                subSubcategoriesCount: 2,
                                createdAt: '2024-01-12',
                                defaultCommissionRate: 5.0,
                                commissionRateOverride: null,
                                useCommissionOverride: false,
                                subSubcategories: [
                                    {
                                        id: 'SUBSUB013',
                                        name: 'Jewelry',
                                        nameAr: 'مجوهرات',
                                        description: 'Necklaces, rings, and bracelets',
                                        status: 'active',
                                        productsCount: 8,
                                        createdAt: '2024-01-12',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: 20.0,
                                        useCommissionOverride: true
                                    },
                                    {
                                        id: 'SUBSUB014',
                                        name: 'Bags',
                                        nameAr: 'حقائب',
                                        description: 'Handbags, backpacks, and purses',
                                        status: 'active',
                                        productsCount: 5,
                                        createdAt: '2024-01-12',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: null,
                                        useCommissionOverride: false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 'CAT003',
                        name: 'Home & Garden',
                        nameAr: 'المنزل والحديقة',
                        description: 'Home improvement and garden supplies',
                        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
                        status: 'active',
                        productsCount: 98,
                        subcategoriesCount: 2,
                        subSubcategoriesCount: 4,
                        createdAt: '2024-01-15',
                        defaultCommissionRate: 5.0,
                        commissionRateOverride: null,
                        useCommissionOverride: false,
                        subcategories: [
                            {
                                id: 'SUB008',
                                name: 'Furniture',
                                nameAr: 'أثاث',
                                description: 'Home and office furniture',
                                status: 'active',
                                productsCount: 45,
                                subSubcategoriesCount: 2,
                                createdAt: '2024-01-15',
                                defaultCommissionRate: 5.0,
                                commissionRateOverride: 3.5,
                                useCommissionOverride: true,
                                subSubcategories: [
                                    {
                                        id: 'SUBSUB015',
                                        name: 'Living Room',
                                        nameAr: 'غرفة المعيشة',
                                        description: 'Sofas, chairs, and living room furniture',
                                        status: 'active',
                                        productsCount: 25,
                                        createdAt: '2024-01-15',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: null,
                                        useCommissionOverride: false
                                    },
                                    {
                                        id: 'SUBSUB016',
                                        name: 'Bedroom',
                                        nameAr: 'غرفة النوم',
                                        description: 'Beds, dressers, and bedroom furniture',
                                        status: 'active',
                                        productsCount: 20,
                                        createdAt: '2024-01-15',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: 4.0,
                                        useCommissionOverride: true
                                    }
                                ]
                            },
                            {
                                id: 'SUB009',
                                name: 'Garden Tools',
                                nameAr: 'أدوات الحديقة',
                                description: 'Tools and equipment for gardening',
                                status: 'active',
                                productsCount: 53,
                                subSubcategoriesCount: 2,
                                createdAt: '2024-01-15',
                                defaultCommissionRate: 5.0,
                                commissionRateOverride: null,
                                useCommissionOverride: false,
                                subSubcategories: [
                                    {
                                        id: 'SUBSUB017',
                                        name: 'Hand Tools',
                                        nameAr: 'أدوات يدوية',
                                        description: 'Shovels, pruners, and hand tools',
                                        status: 'active',
                                        productsCount: 30,
                                        createdAt: '2024-01-15',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: null,
                                        useCommissionOverride: false
                                    },
                                    {
                                        id: 'SUBSUB018',
                                        name: 'Power Tools',
                                        nameAr: 'أدوات كهربائية',
                                        description: 'Electric and battery-powered garden tools',
                                        status: 'active',
                                        productsCount: 23,
                                        createdAt: '2024-01-15',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: 6.0,
                                        useCommissionOverride: true
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 'CAT004',
                        name: 'Sports & Fitness',
                        nameAr: 'الرياضة واللياقة البدنية',
                        description: 'Sports equipment and fitness gear',
                        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
                        status: 'inactive',
                        productsCount: 67,
                        subcategoriesCount: 2,
                        subSubcategoriesCount: 4,
                        createdAt: '2024-01-18',
                        defaultCommissionRate: 5.0,
                        commissionRateOverride: 8.5,
                        useCommissionOverride: true,
                        subcategories: [
                            {
                                id: 'SUB010',
                                name: 'Fitness Equipment',
                                nameAr: 'معدات اللياقة البدنية',
                                description: 'Exercise and fitness equipment',
                                status: 'active',
                                productsCount: 34,
                                subSubcategoriesCount: 2,
                                createdAt: '2024-01-18',
                                defaultCommissionRate: 5.0,
                                commissionRateOverride: null,
                                useCommissionOverride: false,
                                subSubcategories: [
                                    {
                                        id: 'SUBSUB019',
                                        name: 'Cardio Equipment',
                                        nameAr: 'معدات كارديو',
                                        description: 'Treadmills, bikes, and cardio machines',
                                        status: 'active',
                                        productsCount: 20,
                                        createdAt: '2024-01-18',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: null,
                                        useCommissionOverride: false
                                    },
                                    {
                                        id: 'SUBSUB020',
                                        name: 'Strength Training',
                                        nameAr: 'تدريب القوة',
                                        description: 'Weights, resistance bands, and strength equipment',
                                        status: 'active',
                                        productsCount: 14,
                                        createdAt: '2024-01-18',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: 7.0,
                                        useCommissionOverride: true
                                    }
                                ]
                            },
                            {
                                id: 'SUB011',
                                name: 'Outdoor Sports',
                                nameAr: 'الرياضات الخارجية',
                                description: 'Equipment for outdoor sports activities',
                                status: 'inactive',
                                productsCount: 33,
                                subSubcategoriesCount: 2,
                                createdAt: '2024-01-18',
                                defaultCommissionRate: 5.0,
                                commissionRateOverride: 9.0,
                                useCommissionOverride: true,
                                subSubcategories: [
                                    {
                                        id: 'SUBSUB021',
                                        name: 'Team Sports',
                                        nameAr: 'الرياضات الجماعية',
                                        description: 'Soccer, basketball, and team sports equipment',
                                        status: 'inactive',
                                        productsCount: 18,
                                        createdAt: '2024-01-18',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: null,
                                        useCommissionOverride: false
                                    },
                                    {
                                        id: 'SUBSUB022',
                                        name: 'Individual Sports',
                                        nameAr: 'الرياضات الفردية',
                                        description: 'Tennis, golf, and individual sports equipment',
                                        status: 'inactive',
                                        productsCount: 15,
                                        createdAt: '2024-01-18',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: null,
                                        useCommissionOverride: false
                                    }
                                ]
                            }
                        ]
                    }
                ]
                setCategories(mockCategories)
                setLoading(false)
            }, 1000)
        }

        fetchCategories()
    }, [])

    // Filter categories based on search and status
    const filteredCategories = categories.filter(category => {
        const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || category.status === statusFilter
        return matchesSearch && matchesStatus
    })

    // Pagination
    const totalCategories = filteredCategories.length
    const totalPages = Math.ceil(totalCategories / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage)

    const handleViewCategory = (id) => {
        navigate(`/admin/categories/details/${id}`)
    }

    const handleToggleStatus = (id) => {
        setCategories(categories.map(category =>
            category.id === id
                ? { ...category, status: category.status === 'active' ? 'inactive' : 'active' }
                : category
        ))
    }

    const handleDeleteCategory = (id) => {
        if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
            setCategories(categories.filter(category => category.id !== id))
            console.log(`Deleting category ${id}`)
        }
    }

    const handleAddCategory = () => {
        if (newCategoryName.trim() && newCategoryNameAr.trim()) {
            const newCategory = {
                id: `CAT${String(categories.length + 1).padStart(3, '0')}`,
                name: newCategoryName,
                nameAr: newCategoryNameAr,
                description: newCategoryDescription,
                image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop',
                status: 'active',
                productsCount: 0,
                subcategoriesCount: 0,
                subSubcategoriesCount: 0,
                createdAt: new Date().toISOString().split('T')[0],
                subcategories: [],
                defaultCommissionRate: 5.0,
                commissionRateOverride: newCategoryUseOverride ? parseFloat(newCategoryCommissionRate) || null : null,
                useCommissionOverride: newCategoryUseOverride
            }
            setCategories([...categories, newCategory])
            setNewCategoryName('')
            setNewCategoryNameAr('')
            setNewCategoryDescription('')
            setNewCategoryCommissionRate('')
            setNewCategoryUseOverride(false)
            setShowAddCategory(false)
        }
    }

    const handleAddSubcategory = () => {
        if (newSubcategoryName.trim() && newSubcategoryNameAr.trim() && selectedParentCategory) {
            const newSubcategory = {
                id: `SUB${String(Date.now()).slice(-3)}`,
                name: newSubcategoryName,
                nameAr: newSubcategoryNameAr,
                description: newSubcategoryDescription,
                status: 'active',
                productsCount: 0,
                subSubcategoriesCount: 0,
                createdAt: new Date().toISOString().split('T')[0],
                subSubcategories: [],
                defaultCommissionRate: 5.0,
                commissionRateOverride: newSubcategoryUseOverride ? parseFloat(newSubcategoryCommissionRate) || null : null,
                useCommissionOverride: newSubcategoryUseOverride
            }

            setCategories(categories.map(category =>
                category.id === selectedParentCategory
                    ? {
                        ...category,
                        subcategories: [...category.subcategories, newSubcategory],
                        subcategoriesCount: category.subcategoriesCount + 1
                    }
                    : category
            ))

            setNewSubcategoryName('')
            setNewSubcategoryNameAr('')
            setNewSubcategoryDescription('')
            setNewSubcategoryCommissionRate('')
            setNewSubcategoryUseOverride(false)
            setSelectedParentCategory('')
            setShowAddSubcategory(false)
        }
    }

    const handleAddSubSubcategory = () => {
        if (newSubSubcategoryName.trim() && newSubSubcategoryNameAr.trim() && selectedParentCategory && selectedParentSubcategory) {
            const newSubSubcategory = {
                id: `SUBSUB${String(Date.now()).slice(-3)}`,
                name: newSubSubcategoryName,
                nameAr: newSubSubcategoryNameAr,
                description: newSubSubcategoryDescription,
                status: 'active',
                productsCount: 0,
                createdAt: new Date().toISOString().split('T')[0],
                defaultCommissionRate: 5.0,
                commissionRateOverride: newSubSubcategoryUseOverride ? parseFloat(newSubSubcategoryCommissionRate) || null : null,
                useCommissionOverride: newSubSubcategoryUseOverride
            }

            setCategories(categories.map(category =>
                category.id === selectedParentCategory
                    ? {
                        ...category,
                        subcategories: category.subcategories.map(subcategory =>
                            subcategory.id === selectedParentSubcategory
                                ? {
                                    ...subcategory,
                                    subSubcategories: [...(subcategory.subSubcategories || []), newSubSubcategory],
                                    subSubcategoriesCount: (subcategory.subSubcategoriesCount || 0) + 1
                                }
                                : subcategory
                        ),
                        subSubcategoriesCount: category.subSubcategoriesCount + 1
                    }
                    : category
            ))

            setNewSubSubcategoryName('')
            setNewSubSubcategoryNameAr('')
            setNewSubSubcategoryDescription('')
            setNewSubSubcategoryCommissionRate('')
            setNewSubSubcategoryUseOverride(false)
            setSelectedParentCategory('')
            setSelectedParentSubcategory('')
            setShowAddSubSubcategory(false)
        }
    }

    const getAvailableSubcategories = () => {
        const selectedCategory = categories.find(cat => cat.id === selectedParentCategory)
        return selectedCategory ? selectedCategory.subcategories.filter(sub => sub.status === 'active') : []
    }

    const getStatusBadge = (status) => {
        const statusClasses = {
            active: 'status-badge--success',
            inactive: 'status-badge--neutral'
        }

        return (
            <span className={`status-badge ${statusClasses[status]}`}>
                {status}
            </span>
        )
    }

    const getCommissionRate = (item) => {
        return item.useCommissionOverride && item.commissionRateOverride !== null
            ? item.commissionRateOverride
            : item.defaultCommissionRate
    }

    const getCommissionBadge = (item) => {
        const rate = getCommissionRate(item)
        const isOverride = item.useCommissionOverride && item.commissionRateOverride !== null

        return (
            <span className={`commission-badge ${isOverride ? 'commission-badge--override' : 'commission-badge--default'}`}>
                {rate}% {isOverride && '(Override)'}
            </span>
        )
    }

    if (loading) {
        return (
            <div className="categories-management">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading categories...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="categories-management">
            <div className="page-header">
                <div className="header-content">
                    <h1>Category Management</h1>
                    <p>Organize products into categories and subcategories with commission rates</p>
                </div>
                <div className="header-stats">
                    <div className="stat-item">
                        <span className="stat-number">{categories.length}</span>
                        <span className="stat-label">Categories</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">
                            {categories.reduce((sum, cat) => sum + cat.subcategoriesCount, 0)}
                        </span>
                        <span className="stat-label">Subcategories</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">
                            {categories.reduce((sum, cat) => sum + cat.subSubcategoriesCount, 0)}
                        </span>
                        <span className="stat-label">Sub-subcategories</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">
                            {categories.reduce((sum, cat) => sum + cat.productsCount, 0)}
                        </span>
                        <span className="stat-label">Total Products</span>
                    </div>
                </div>
            </div>

            <div className="categories-table-container">
                <div className="table-controls">
                    <div className="controls-left">
                        <div className="search-box">
                            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search categories..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            className="status-filter"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="controls-right">
                        <button
                            className="add-btn"
                            onClick={() => setShowAddSubSubcategory(true)}
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Sub-subcategory
                        </button>
                        <button
                            className="add-btn"
                            onClick={() => setShowAddSubcategory(true)}
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Subcategory
                        </button>
                        <button
                            className="add-btn add-btn--primary"
                            onClick={() => setShowAddCategory(true)}
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Category
                        </button>
                    </div>
                </div>

                <div className="categories-grid">
                    {paginatedCategories.map((category) => (
                        <div key={category.id} className="category-card">
                            <div className="card-header">
                                <div className="category-image">
                                    <img src={category.image} alt={category.name} />
                                </div>
                                <div className="category-info">
                                    <h3 className="category-name">{category.name}</h3>
                                    {category.nameAr && (
                                        <h4 className="category-name-ar" dir="rtl">{category.nameAr}</h4>
                                    )}
                                    <p className="category-description">{category.description}</p>
                                    <div className="category-meta">
                                        <span className="category-id">ID: {category.id}</span>
                                        {getStatusBadge(category.status)}
                                        {getCommissionBadge(category)}
                                    </div>
                                </div>
                            </div>

                            <div className="card-stats">
                                <div className="stat">
                                    <span className="stat-value">{category.productsCount}</span>
                                    <span className="stat-label">Products</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-value">{category.subcategoriesCount}</span>
                                    <span className="stat-label">Subcategories</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-value">{category.subSubcategoriesCount}</span>
                                    <span className="stat-label">Sub-subs</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-value">{new Date(category.createdAt).toLocaleDateString()}</span>
                                    <span className="stat-label">Created</span>
                                </div>
                            </div>

                            <div className="subcategories-section">
                                <h4>Subcategories</h4>
                                {category.subcategories.length > 0 ? (
                                    <div className="subcategories-list">
                                        {category.subcategories.slice(0, 2).map((sub) => (
                                            <div key={sub.id} className="subcategory-item">
                                                <div className="subcategory-info">
                                                    <div className="subcategory-header">
                                                        <div className="subcategory-names">
                                                            <span className="subcategory-name">{sub.name}</span>
                                                            {sub.nameAr && (
                                                                <span className="subcategory-name-ar" dir="rtl">{sub.nameAr}</span>
                                                            )}
                                                        </div>
                                                        <div className="subcategory-badges">
                                                            {getStatusBadge(sub.status)}
                                                            {getCommissionBadge(sub)}
                                                        </div>
                                                    </div>
                                                    <span className="subcategory-count">
                                                        {sub.productsCount} products • {sub.subSubcategoriesCount} sub-subs
                                                    </span>
                                                    {sub.subSubcategories && sub.subSubcategories.length > 0 && (
                                                        <div className="sub-subcategories-preview">
                                                            {sub.subSubcategories.slice(0, 2).map((subSub, index) => (
                                                                <div key={subSub.id} className="sub-subcategory-tag">
                                                                    <span className="sub-subcategory-name">{subSub.name}</span>
                                                                    {subSub.nameAr && (
                                                                        <span className="sub-subcategory-name-ar" dir="rtl">{subSub.nameAr}</span>
                                                                    )}
                                                                    <span className="sub-subcategory-commission">
                                                                        {getCommissionRate(subSub)}%
                                                                        {subSub.useCommissionOverride && subSub.commissionRateOverride !== null && ' *'}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                            {sub.subSubcategories.length > 2 && (
                                                                <span className="more-tags">+{sub.subSubcategories.length - 2}</span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                        {category.subcategories.length > 2 && (
                                            <div className="more-subcategories">
                                                +{category.subcategories.length - 2} more subcategories
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="no-subcategories">
                                        <span>No subcategories yet</span>
                                    </div>
                                )}
                            </div>

                            <div className="card-actions">
                                <button
                                    className="action-btn action-btn--view"
                                    onClick={() => handleViewCategory(category.id)}
                                    title="View Details"
                                >
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                                <button
                                    className={`action-btn ${category.status === 'active' ? 'action-btn--deactivate' : 'action-btn--activate'}`}
                                    onClick={() => handleToggleStatus(category.id)}
                                    title={category.status === 'active' ? 'Deactivate' : 'Activate'}
                                >
                                    {category.status === 'active' ? (
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                                        </svg>
                                    ) : (
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </button>
                                <button
                                    className="action-btn action-btn--delete"
                                    onClick={() => handleDeleteCategory(category.id)}
                                    title="Delete Category"
                                >
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pagination">
                    <button
                        className="pagination-btn"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                    </button>
                    <div className="pagination-info">
                        <span>Page {currentPage} of {totalPages}</span>
                    </div>
                    <button
                        className="pagination-btn"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Add Category Modal */}
            {showAddCategory && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h2>Add New Category</h2>
                            <button
                                className="close-btn"
                                onClick={() => setShowAddCategory(false)}
                            >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Category Name (English)*</label>
                                <input
                                    type="text"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    placeholder="Enter category name in English"
                                />
                            </div>
                            <div className="form-group">
                                <label>Category Name (Arabic)*</label>
                                <input
                                    type="text"
                                    dir="rtl"
                                    value={newCategoryNameAr}
                                    onChange={(e) => setNewCategoryNameAr(e.target.value)}
                                    placeholder="أدخل اسم الفئة بالعربية"
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={newCategoryDescription}
                                    onChange={(e) => setNewCategoryDescription(e.target.value)}
                                    placeholder="Enter category description"
                                    rows={3}
                                />
                            </div>
                            <div className="form-group commission-group">
                                <div className="commission-header">
                                    <label>Commission Rate</label>
                                    <div className="commission-toggle">
                                        <input
                                            type="checkbox"
                                            id="categoryCommissionOverride"
                                            checked={newCategoryUseOverride}
                                            onChange={(e) => setNewCategoryUseOverride(e.target.checked)}
                                        />
                                        <label htmlFor="categoryCommissionOverride">Override default rate (5.0%)</label>
                                    </div>
                                </div>
                                {newCategoryUseOverride && (
                                    <div className="commission-input">
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="100"
                                            value={newCategoryCommissionRate}
                                            onChange={(e) => setNewCategoryCommissionRate(e.target.value)}
                                            placeholder="Enter commission rate (%)"
                                        />
                                        <span className="commission-unit">%</span>
                                    </div>
                                )}
                                {!newCategoryUseOverride && (
                                    <div className="commission-default">
                                        <span>Using default commission rate: 5.0%</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn--secondary"
                                onClick={() => setShowAddCategory(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn--primary"
                                onClick={handleAddCategory}
                            >
                                Add Category
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Subcategory Modal */}
            {showAddSubcategory && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h2>Add New Subcategory</h2>
                            <button
                                className="close-btn"
                                onClick={() => setShowAddSubcategory(false)}
                            >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Parent Category</label>
                                <select
                                    value={selectedParentCategory}
                                    onChange={(e) => setSelectedParentCategory(e.target.value)}
                                >
                                    <option value="">Select a category</option>
                                    {categories.filter(cat => cat.status === 'active').map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name} ({category.nameAr})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Subcategory Name (English)*</label>
                                <input
                                    type="text"
                                    value={newSubcategoryName}
                                    onChange={(e) => setNewSubcategoryName(e.target.value)}
                                    placeholder="Enter subcategory name in English"
                                />
                            </div>
                            <div className="form-group">
                                <label>Subcategory Name (Arabic)*</label>
                                <input
                                    type="text"
                                    dir="rtl"
                                    value={newSubcategoryNameAr}
                                    onChange={(e) => setNewSubcategoryNameAr(e.target.value)}
                                    placeholder="أدخل اسم الفئة الفرعية بالعربية"
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={newSubcategoryDescription}
                                    onChange={(e) => setNewSubcategoryDescription(e.target.value)}
                                    placeholder="Enter subcategory description"
                                    rows={3}
                                />
                            </div>
                            <div className="form-group commission-group">
                                <div className="commission-header">
                                    <label>Commission Rate</label>
                                    <div className="commission-toggle">
                                        <input
                                            type="checkbox"
                                            id="subcategoryCommissionOverride"
                                            checked={newSubcategoryUseOverride}
                                            onChange={(e) => setNewSubcategoryUseOverride(e.target.checked)}
                                        />
                                        <label htmlFor="subcategoryCommissionOverride">Override default rate (5.0%)</label>
                                    </div>
                                </div>
                                {newSubcategoryUseOverride && (
                                    <div className="commission-input">
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="100"
                                            value={newSubcategoryCommissionRate}
                                            onChange={(e) => setNewSubcategoryCommissionRate(e.target.value)}
                                            placeholder="Enter commission rate (%)"
                                        />
                                        <span className="commission-unit">%</span>
                                    </div>
                                )}
                                {!newSubcategoryUseOverride && (
                                    <div className="commission-default">
                                        <span>Using default commission rate: 5.0%</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn--secondary"
                                onClick={() => setShowAddSubcategory(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn--primary"
                                onClick={handleAddSubcategory}
                            >
                                Add Subcategory
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Sub-subcategory Modal */}
            {showAddSubSubcategory && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h2>Add New Sub-subcategory</h2>
                            <button
                                className="close-btn"
                                onClick={() => setShowAddSubSubcategory(false)}
                            >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Parent Category</label>
                                <select
                                    value={selectedParentCategory}
                                    onChange={(e) => {
                                        setSelectedParentCategory(e.target.value)
                                        setSelectedParentSubcategory('')
                                    }}
                                >
                                    <option value="">Select a category</option>
                                    {categories.filter(cat => cat.status === 'active').map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name} ({category.nameAr})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Parent Subcategory</label>
                                <select
                                    value={selectedParentSubcategory}
                                    onChange={(e) => setSelectedParentSubcategory(e.target.value)}
                                    disabled={!selectedParentCategory}
                                >
                                    <option value="">Select a subcategory</option>
                                    {getAvailableSubcategories().map(subcategory => (
                                        <option key={subcategory.id} value={subcategory.id}>
                                            {subcategory.name} ({subcategory.nameAr})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Sub-subcategory Name (English)*</label>
                                <input
                                    type="text"
                                    value={newSubSubcategoryName}
                                    onChange={(e) => setNewSubSubcategoryName(e.target.value)}
                                    placeholder="Enter sub-subcategory name in English"
                                />
                            </div>
                            <div className="form-group">
                                <label>Sub-subcategory Name (Arabic)*</label>
                                <input
                                    type="text"
                                    dir="rtl"
                                    value={newSubSubcategoryNameAr}
                                    onChange={(e) => setNewSubSubcategoryNameAr(e.target.value)}
                                    placeholder="أدخل اسم الفئة الفرعية الثانوية بالعربية"
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={newSubSubcategoryDescription}
                                    onChange={(e) => setNewSubSubcategoryDescription(e.target.value)}
                                    placeholder="Enter sub-subcategory description"
                                    rows={3}
                                />
                            </div>
                            <div className="form-group commission-group">
                                <div className="commission-header">
                                    <label>Commission Rate</label>
                                    <div className="commission-toggle">
                                        <input
                                            type="checkbox"
                                            id="subSubcategoryCommissionOverride"
                                            checked={newSubSubcategoryUseOverride}
                                            onChange={(e) => setNewSubSubcategoryUseOverride(e.target.checked)}
                                        />
                                        <label htmlFor="subSubcategoryCommissionOverride">Override default rate (5.0%)</label>
                                    </div>
                                </div>
                                {newSubSubcategoryUseOverride && (
                                    <div className="commission-input">
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="100"
                                            value={newSubSubcategoryCommissionRate}
                                            onChange={(e) => setNewSubSubcategoryCommissionRate(e.target.value)}
                                            placeholder="Enter commission rate (%)"
                                        />
                                        <span className="commission-unit">%</span>
                                    </div>
                                )}
                                {!newSubSubcategoryUseOverride && (
                                    <div className="commission-default">
                                        <span>Using default commission rate: 5.0%</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn--secondary"
                                onClick={() => setShowAddSubSubcategory(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn--primary"
                                onClick={handleAddSubSubcategory}
                            >
                                Add Sub-subcategory
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CategoriesManagement