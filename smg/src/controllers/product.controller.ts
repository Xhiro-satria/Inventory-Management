import { Request, Response } from "express";
import productService from "../services/product.service";
import {
    createProductSchema,
    updateProductSchema,
} from "../validators/product.validator";

class ProductController {
    async create(req: Request, res: Response) {
        try {
            const data = createProductSchema.parse(req.body);
            const image = req.file?.filename;
            const product = await productService.create({...data, image});
            res.status(201).json({
                success: true,
                message: "Produk berhasil ditambahkan",
                data: product,
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    async findAll(req: Request, res: Response) {
    try {
        const search = req.query.search as string | undefined;
        const categoryId = req.query.category
            ? Number(req.query.category)
            : undefined;
        const products = await productService.findAll(
            search,
            categoryId
        );

        res.json({
            success: true,
            data: products,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

    async findById(req: Request, res: Response) {
        const id = Number(req.params.id);
        const product = await productService.findById(id);
        res.json({
            success: true,
            data: product,
        });
    }

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const data = updateProductSchema.parse(req.body);
            const image = (req as any).file?.filename;
            const product = await productService.update(id, {
                ...data,
                ...(image && {image})
            });
            res.json({
                success: true,
                message: "Produk berhasil diupdate",
                data: product,
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async delete(req: Request, res: Response) {
        const id = Number(req.params.id);
        await productService.delete(id);
        res.json({
            success: true,
            message: "Produk berhasil dihapus",
        });
    }
}

export default new ProductController();