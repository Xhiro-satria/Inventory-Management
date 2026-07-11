import { Request, Response } from "express";
import categoryService from "../services/category.service";
import {
    createCategorySchema,
    updateCategorySchema,
} from "../validators/category.validator";

class CategoryController {
    async create(req: Request, res:Response){
        try{
            const data = createCategorySchema.parse(req.body)
            const category = await categoryService.create(data)
            res.status(200).json({
                success: true,
                data:category
            })
        }catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    async findAll(req: Request, res: Response) {
        const categories = await categoryService.findAll();
        res.json({
                success: true,
                data: categories,
        });
    }

    async findById(req: Request, res: Response) {
        const id = Number(req.params.id);
        const category = await categoryService.findById(id);
        res.json({
            success: true,
            data: category,
        });

    }

    async update(req: Request, res: Response) {
        try {
        const id = Number(req.params.id);
        const data = updateCategorySchema.parse(req.body);
        const category = await categoryService.update(id, data.name, data.description);
        res.json({
            success: true,
            data: category,
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
        await categoryService.delete(id);
        res.json({
            success: true,
            message: "Kategori berhasil dihapus",
        });
    }
}

export default new CategoryController()