import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("should be albe to coreate a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "name",
            description: "description",
            daily_rate: 100,
            license_plate: "ABC-123",
            fine_amount: 60,
            brand: "BRAND",
            category_id: "category",
        });

        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a car with exists license plate", async () => {
        await createCarUseCase.execute({
            name: "name",
            description: "description",
            daily_rate: 100,
            license_plate: "ABC-123",
            fine_amount: 60,
            brand: "BRAND",
            category_id: "category",
        });

        await expect(
            createCarUseCase.execute({
                name: "name",
                description: "description",
                daily_rate: 100,
                license_plate: "ABC-123",
                fine_amount: 60,
                brand: "BRAND",
                category_id: "category",
            })
        ).rejects.toEqual(new AppError("Car already exist!"));
    });

    it("shoulbe able to create a car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car availablew",
            description: "description",
            daily_rate: 100,
            license_plate: "ABC-123",
            fine_amount: 60,
            brand: "BRAND",
            category_id: "category",
        });

        expect(car.available).toBe(true);
    });
});
