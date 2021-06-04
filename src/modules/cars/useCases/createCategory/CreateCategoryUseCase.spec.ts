import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesReposisotoryInMemory: CategoriesRepositoryInMemory;

describe("Criar category", () => {
    beforeEach(() => {
        categoriesReposisotoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesReposisotoryInMemory
        );
    });

    it("should be able to create a new category", async () => {
        const category = {
            name: "Category",
            description: "Category descripyion",
        };

        await createCategoryUseCase.execute(category);

        const categoryCreated = await categoriesReposisotoryInMemory.findByName(
            category.name
        );

        expect(categoryCreated).toHaveProperty("id");
    });

    it("should not be able to create a new category with name exists", async () => {
        const category = {
            name: "Category",
            description: "Category descripyion",
        };

        await createCategoryUseCase.execute(category);

        await expect(createCategoryUseCase.execute(category)).rejects.toEqual(
            new AppError("Category already exists!")
        );
    });
});
