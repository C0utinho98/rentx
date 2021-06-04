import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "../../repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let createCarSpecificationInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
    beforeEach(() => {
        createCarSpecificationInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            createCarSpecificationInMemory,
            specificationsRepositoryInMemory
        );
    });

    it("should not be able to add a new specification to a now-existent car", async () => {
        await expect(
            createCarSpecificationUseCase.execute({
                car_id: "1234",
                specifications_id: ["432"],
            })
        ).rejects.toEqual(new AppError("Car does not exists!"));
    });

    it("should be able to add a new specification to the car", async () => {
        const car = await createCarSpecificationInMemory.create({
            name: "Carro",
            description: "description",
            daily_rate: 100,
            license_plate: "ABC-123",
            fine_amount: 60,
            brand: "BRAND",
            category_id: "category",
        });

        const specification = await specificationsRepositoryInMemory.create({
            description: "test",
            name: "test",
        });

        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id: [specification.id],
        });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    });
});
