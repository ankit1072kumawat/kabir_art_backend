import Product from "./../../models/product.js"

/**
 * get all  products of a category
 */

export const getCategoryProducts = async (req, res) => {
    const query = { category: req.query.category }
    try {
        const data = await Product.find(query);
        if (data && data) {
            res.status(201).send({
                success: true,
                data: data,
                message: "products found successfully",
            });
        } else {
            res.status(401).send({
                success: false,
                message: "product found error",
            });
        }
    } catch (error) {
        res.status(500).json({ error: error })
        console.log(error)
    }
};


/**
 * Create new product
 */

export const createNewProduct = async (req, res) => {
    const { name, description, sku, quantity,
        category, type, featured, status, group,
        product_images,image, keyword, price, product_type,
        discounted_price, title } = req.body;
        console.log(">>>>>>>>>>",req.body)
    try {
        const product = await Product.create({
            name: name,
            title: title,
            image: image,
            description: description,
            sku: sku,
            keyword: keyword,
            group: group,
            status: status,
            featured: featured,
            product_type: product_type,
            type: type,
            price: price,
            discounted_price: discounted_price,
            quantity: quantity,
            category: category,
            product_images: product_images
        })
        if (product) {
            res.status(201).send({
                success: true,
                data: product,
                message: "product created successfully",
            });
        } else {
            res.status(401).send({
                success: false,
                message: "product created error",
            });
        }
    } catch (error) {
        res.status(500).json({ error: error })
        console.log(error)
    }
};


/**
 * get all products
 */

export const getAllProducts = async (req, res) => {
    // try {
        const data = await Product.find();
        if (data && data) {
            res.status(201).send({
                success: true,
                data: data,
                message: "products found successfully",
            });
        } else {
            res.status(401).send({
                success: false,
                message: "product found error",
            });
        }
            // } catch (error) {
            //     res.status(500).json({ error: error })
            //     console.log(error)
            // }
};


/**
 * get all products
 */

export const getProductDetail = async (req, res) => {
    try {
        const id = req.params.productId;
        const data = await Product.findOne({
            _id: id
        });
        if (data && data._id) {
            res.status(201).send({
                success: true,
                data: data,
                message: "product found successfully",
            });
        } else {
            res.status(401).send({
                success: false,
                message: "product found error",
            });
        }
    } catch (error) {
        res.status(500).json({ error: error })
        console.log(error)
    }
};

/**
 * Delete Product 
 */

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.productId;
        const data = await Product.deleteOne({
            _id: id
        });
        if (data) {
            res.status(201).send({
                success: true,
                data: data,
                message: "product deleted successfully",
            });
        } else {
            res.status(401).send({
                success: false,
                message: "product deleted error",
            });
        }
    } catch (error) {
        res.status(500).json({ error: error })
        console.log(error)
    }
};

/**
 * Update a Product 
 */

export const updateProductDetail = async (req, res) => {
    try {
        const id = req.params.productId;
        const updateOps = {};
        for (const ops in req.body) {
            console.log(ops)
            updateOps[ops] = req.body[ops];
        }
        console.log(updateOps)
        const data = Product.updateOne({ _id: id }, { $set: updateOps })
        if (data) {
            res.status(201).send({
                success: true,
                data: data,
                message: "product updated successfully",
            });
        } else {
            res.status(401).send({
                success: false,
                message: "product updated error",
            });
        }
    } catch (error) {
        res.status(500).json({ error: error })
        console.log(error)
    }
};

