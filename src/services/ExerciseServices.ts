import { IExerciseRepository } from "../repository/IRepository"

const iExerciseRepository = new IExerciseRepository()
export class ExerciseService {

    async findAllExercise(query: any) {
        try {
            const result = await iExerciseRepository.findExercise(query)
            return result
        } catch (error) {
            throw error
        }

    }

    async createExercise(body: any) {
        try {
            const result = await iExerciseRepository.createExercise(body)
            return result
        } catch (error) {
            throw error
        }

    }
    async updateExercise(body: any, id: number) {
        try {
            const result = await iExerciseRepository.updateExercise(body, id)
            return result
        } catch (error) {
            throw error
        }

    }
    async deleteExercise(id: number) {
        try {
            const result = await iExerciseRepository.deleteExercise(id)
            return result
        } catch (error) {
            throw error
        }

    }
}