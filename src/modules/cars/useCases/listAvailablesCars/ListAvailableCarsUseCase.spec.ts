import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro",
            description: "É um carro",
            daily_rate: 100,
            license_plate: "ABC-7822",
            fine_amount: 50,
            brand: "Audi",
            category_id: "id",
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });
    it("should be albe to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro2",
            description: "É um carro",
            daily_rate: 100,
            license_plate: "ABC-7822",
            fine_amount: 50,
            brand: "Audi2",
            category_id: "id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Audi2",
        });

        expect(cars).toEqual([car]);
    });

    it("should be albe to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro3",
            description: "É um carro",
            daily_rate: 100,
            license_plate: "ABC-7822",
            fine_amount: 50,
            brand: "Audi2",
            category_id: "id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Carro3",
        });

        expect(cars).toEqual([car]);
    });

    it("should be albe to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro3",
            description: "É um carro",
            daily_rate: 100,
            license_plate: "ABC-7822",
            fine_amount: 50,
            brand: "Audi2",
            category_id: "12345",
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "12345",
        });

        expect(cars).toEqual([car]);
    });
});
